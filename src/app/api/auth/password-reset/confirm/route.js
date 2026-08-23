import { z } from "zod";

import { databaseErrorResponse } from "@/lib/api-error";
import { createPasswordHash } from "@/lib/password";
import { hashResetToken } from "@/lib/password-reset";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, getClientKey } from "@/lib/rate-limit";
import { SESSION_COOKIE } from "@/lib/session";

const confirmSchema = z
  .object({
    token: z.string().min(40).max(100),
    newPassword: z.string().min(8, "Use at least 8 characters.").max(128),
    confirmPassword: z.string().max(128),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

export async function POST(request) {
  const rateLimit = await consumeRateLimit({
    scope: "password-reset-confirm",
    key: getClientKey(request),
    limit: 8,
    windowMs: 30 * 60 * 1000,
  });
  if (!rateLimit.allowed)
    return Response.json(
      { message: "Too many attempts. Request a new reset link." },
      { status: 429 },
    );
  const result = confirmSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!result.success)
    return Response.json(
      {
        message:
          result.error.issues[0]?.message || "Check the password fields.",
      },
      { status: 400 },
    );

  const tokenHash = hashResetToken(result.data.token);
  const next = createPasswordHash(result.data.newPassword);
  try {
    const changedAt = new Date();
    await prisma.$transaction(async (tx) => {
      const consumed = await tx.passwordResetToken.deleteMany({
        where: { tokenHash, expiresAt: { gt: changedAt } },
      });
      if (consumed.count !== 1) throw new Error("INVALID_RESET_TOKEN");
      await tx.adminProfile.update({
        where: { id: 1 },
        data: {
          passwordHash: next.hash,
          passwordSalt: next.salt,
          passwordChangedAt: changedAt,
        },
      });
      await tx.passwordResetToken.deleteMany({});
    });

    const response = Response.json({ message: "Password reset successfully." });
    response.headers.append(
      "Set-Cookie",
      `${SESSION_COOKIE}=; Path=/; HttpOnly; SameSite=Strict; Max-Age=0${process.env.NODE_ENV === "production" ? "; Secure" : ""}`,
    );
    return response;
  } catch (error) {
    if (error instanceof Error && error.message === "INVALID_RESET_TOKEN")
      return Response.json(
        {
          message:
            "This reset link is invalid or has expired. Request a new one.",
        },
        { status: 400 },
      );
    return databaseErrorResponse(error);
  }
}
