import { createSessionToken, SESSION_COOKIE } from "@/lib/session";
import { readJsonBody } from "@/lib/request-security";
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
        changedAt: profile?.passwordChangedAt ?? null,
      },
    });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

export async function PUT(request) {
  if (!(await isAdminAuthenticated(request)))
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  const rateLimit = await allowPasswordAttempt(request);
  if (!rateLimit.allowed)
    return Response.json(
      { message: "Too many password attempts. Try again later." },
      { status: 429 },
    );
  const result = changePasswordSchema.safeParse(
    await readJsonBody(request),
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
    if (!credentials)
      return Response.json(
        { message: "Admin password credentials are not configured." },
        { status: 503 },
      );
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
    const updatedProfile = await prisma.adminProfile.upsert({
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
        sessionVersion: { increment: 1 },
      },
    });
    const response = Response.json({
      data: {
        changedAt: new Date(),
      },
      message: "Password updated.",
    });
    await renewSession(response, updatedProfile);
    return response;
  } catch (error) {
    return databaseErrorResponse(error);
  }
}

async function renewSession(response, profile) {
  const token = await createSessionToken(profile.username, process.env.AUTH_SECRET, profile.sessionVersion);
  response.headers.append("Set-Cookie", `${SESSION_COOKIE}=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=28800${process.env.NODE_ENV === "production" ? "; Secure" : ""}`);
}
