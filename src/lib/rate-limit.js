import { createHash } from "node:crypto";

import { prisma } from "@/lib/prisma";

function hashKey(value) {
  return createHash("sha256").update(`${process.env.AUTH_SECRET || "rate-limit"}:${value}`).digest("hex");
}

export async function consumeRateLimit({ scope, key, limit, windowMs }) {
  const keyHash = hashKey(key);
  const cutoff = new Date(Date.now() - windowMs);
  const [, , count] = await prisma.$transaction([
    prisma.rateLimitEvent.deleteMany({ where: { createdAt: { lt: cutoff } } }),
    prisma.rateLimitEvent.create({ data: { scope, keyHash } }),
    prisma.rateLimitEvent.count({ where: { scope, keyHash, createdAt: { gte: cutoff } } }),
  ]);
  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}

export function getClientKey(request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim()
    || request.headers.get("x-real-ip")?.trim()
    || "local";
}
