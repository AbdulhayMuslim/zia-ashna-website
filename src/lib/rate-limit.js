import { createHash } from "node:crypto";

import { prisma } from "@/lib/prisma";

function hashKey(value) {
  return createHash("sha256").update(`${process.env.AUTH_SECRET || "rate-limit"}:${value}`).digest("hex");
}

export async function consumeRateLimit({ scope, key, limit, windowMs }) {
  const keyHash = hashKey(key);
  const now = new Date();
  const cutoff = new Date(now.getTime() - windowMs);
  let count;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      count = await prisma.$transaction(async (tx) => {
        const existing = await tx.rateLimitBucket.findUnique({ where: { scope_keyHash: { scope, keyHash } } });
        if (!existing) {
          const created = await tx.rateLimitBucket.create({ data: { scope, keyHash, windowStart: now, count: 1 } });
          return created.count;
        }
        const updated = await tx.rateLimitBucket.update({
          where: { scope_keyHash: { scope, keyHash } },
          data: existing.windowStart < cutoff
            ? { windowStart: now, count: 1 }
            : { count: { increment: 1 } },
        });
        return updated.count;
      }, { isolationLevel: "Serializable" });
      break;
    } catch (error) {
      if (attempt === 2 || !["P2002", "P2034"].includes(error?.code)) throw error;
    }
  }
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

export function getClientKey(request) {
  const trustedForwarding = process.env.TRUST_PROXY_HEADERS === "true" || Boolean(process.env.VERCEL || process.env.CF_PAGES);
  return (trustedForwarding ? request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() : null)
    || (process.env.CF_PAGES ? request.headers.get("cf-connecting-ip")?.trim() : null)
    || "local";
}
