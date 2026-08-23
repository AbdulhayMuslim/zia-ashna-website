import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import {
  createPasswordHash,
  getAdminPasswordCredentials,
  verifyPassword,
} from "@/lib/password";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, getClientKey } from "@/lib/rate-limit";

const changePasswordSchema = z
  .object({
    currentPassword: z.string().min(1, "Enter your current password.").max(200),
    newPassword: z.string().min(8, "Use at least 8 characters.").max(128),
    confirmPassword: z.string().max(128),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Passwords do not match.",
  });

const resetPasswordSchema = z.object({
  currentPassword: z.string().min(1).max(200),
});

async function getProfile() {
  return prisma.adminProfile.findUnique({
    where: { id: 1 },
    select: { passwordHash: true, passwordSalt: true, passwordChangedAt: true },
  });
}

async function allowPasswordAttempt(request) {
  return consumeRateLimit({
    scope: "admin-password",
    key: getClientKey(request),
    limit: 6,
    windowMs: 15 * 60 * 1000,
  });
}

export async function GET() {
  if (!(await isAdminAuthenticated()))
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    const profile = await getProfile();
    return Response.json({
      data: {
        customPassword: Boolean(profile?.passwordHash && profile?.passwordSalt),
        changedAt: profile?.passwordChangedAt ?? null,
        canReset: Boolean(
          process.env.ADMIN_PASSWORD_SCRYPT && process.env.ADMIN_PASSWORD_SALT,
        ),
      },
    });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

export async function PUT(request) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  const rateLimit = await allowPasswordAttempt(request);
  if (!rateLimit.allowed)
    return Response.json(
      { message: "Too many password attempts. Try again later." },
      { status: 429 },
    );
  const result = changePasswordSchema.safeParse(
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
  try {
    const profile = await getProfile();
    const credentials = getAdminPasswordCredentials(profile);
    if (
      !verifyPassword(
        result.data.currentPassword,
        credentials.hash,
        credentials.salt,
      )
    )
      return Response.json(
        { message: "Current password is incorrect." },
        { status: 400 },
      );
    if (
      verifyPassword(
        result.data.newPassword,
        credentials.hash,
        credentials.salt,
      )
    )
      return Response.json(
        { message: "Choose a password different from your current password." },
        { status: 400 },
      );
    const next = createPasswordHash(result.data.newPassword);
    await prisma.adminProfile.upsert({
      where: { id: 1 },
      create: {
        id: 1,
        passwordHash: next.hash,
        passwordSalt: next.salt,
        passwordChangedAt: new Date(),
      },
      update: {
        passwordHash: next.hash,
        passwordSalt: next.salt,
        passwordChangedAt: new Date(),
      },
    });
    return Response.json({
      data: {
        customPassword: true,
        changedAt: new Date(),
        canReset: Boolean(
          process.env.ADMIN_PASSWORD_SCRYPT && process.env.ADMIN_PASSWORD_SALT,
        ),
      },
      message: "Password updated.",
    });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

export async function DELETE(request) {
  if (!(await isAdminAuthenticated()))
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  const rateLimit = await allowPasswordAttempt(request);
  if (!rateLimit.allowed)
    return Response.json(
      { message: "Too many password attempts. Try again later." },
      { status: 429 },
    );
  const result = resetPasswordSchema.safeParse(
    await request.json().catch(() => null),
  );
  if (!result.success)
    return Response.json(
      { message: "Enter your current password." },
      { status: 400 },
    );
  if (!process.env.ADMIN_PASSWORD_SCRYPT || !process.env.ADMIN_PASSWORD_SALT)
    return Response.json(
      {
        message:
          "A server fallback password is not configured, so this password cannot be reset.",
      },
      { status: 409 },
    );
  try {
    const profile = await getProfile();
    const credentials = getAdminPasswordCredentials(profile);
    if (
      !verifyPassword(
        result.data.currentPassword,
        credentials.hash,
        credentials.salt,
      )
    )
      return Response.json(
        { message: "Current password is incorrect." },
        { status: 400 },
      );
    await prisma.adminProfile.update({
      where: { id: 1 },
      data: {
        passwordHash: null,
        passwordSalt: null,
        passwordChangedAt: new Date(),
      },
    });
    return Response.json({
      data: { customPassword: false, changedAt: new Date(), canReset: true },
      message: "Password reset to the server-configured password.",
    });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
