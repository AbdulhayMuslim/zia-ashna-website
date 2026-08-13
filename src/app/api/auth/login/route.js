import { scryptSync, timingSafeEqual } from "node:crypto";
import { z } from "zod";
import { createSessionToken, SESSION_COOKIE } from "@/lib/session";

const credentialsSchema = z.object({
  username: z.string().trim().min(1).max(100),
  password: z.string().min(4).max(200),
});

function safeEqual(left, right) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  return a.length === b.length && timingSafeEqual(a, b);
}

export async function POST(request) {
  const result = credentialsSchema.safeParse(await request.json().catch(() => null));
  const username = process.env.ADMIN_USERNAME?.trim();
  const passwordHash = process.env.ADMIN_PASSWORD_SCRYPT?.trim().toLowerCase();
  const passwordSalt = process.env.ADMIN_PASSWORD_SALT;
  const secret = process.env.AUTH_SECRET;

  if (!username || !passwordHash || !passwordSalt || !secret) {
    return Response.json({ message: "Admin authentication is not configured." }, { status: 503 });
  }

  const submittedHash = result.success
    ? scryptSync(result.data.password, passwordSalt, 64).toString("hex")
    : "0".repeat(64);
  const valid =
    result.success &&
    safeEqual(result.data.username, username) &&
    safeEqual(submittedHash, passwordHash);

  if (!valid) {
    return Response.json({ message: "Invalid username or password." }, { status: 401 });
  }

  const token = await createSessionToken(username, secret);
  const response = Response.json({ message: "Signed in." });
  response.headers.append(
    "Set-Cookie",
    `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
  );
  return response;
}
