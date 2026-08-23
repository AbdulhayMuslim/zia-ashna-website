import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import {
  createAndSendPasswordReset,
  isPasswordResetEmailConfigured,
} from "@/lib/password-reset";
import { prisma } from "@/lib/prisma";
import { consumeRateLimit, getClientKey } from "@/lib/rate-limit";

const requestSchema = z.object({
  email: z.union([z.literal(""), z.email().max(254)]).optional(),
});

const GENERIC_MESSAGE =
  "If that email matches the administrator profile, a reset link has been sent.";

export async function POST(request) {
  const rateLimit = await consumeRateLimit({
    scope: "password-reset-request",
    key: getClientKey(request),
    limit: 4,
    windowMs: 30 * 60 * 1000,
  });
  if (!rateLimit.allowed)
    return Response.json(
      { message: "Too many reset requests. Try again later." },
      { status: 429 },
    );

  const result = requestSchema.safeParse(
    await request.json().catch(() => ({})),
  );
  if (!result.success)
    return Response.json(
      {
        message:
          result.error.issues[0]?.message || "Enter a valid email address.",
      },
      { status: 400 },
    );

  if (!isPasswordResetEmailConfigured()) {
    return Response.json(
      { message: "Password-reset email delivery is not configured." },
      { status: 503 },
    );
  }

  const authenticated = await isAdminAuthenticated();
  try {
    const profile = await prisma.adminProfile.findUnique({
      where: { id: 1 },
      select: { email: true, fullName: true },
    });
    const savedEmail = profile?.email?.trim();
    if (!savedEmail) {
      if (authenticated)
        return Response.json(
          {
            message:
              "Add an email address to your profile before requesting a reset link.",
          },
          { status: 409 },
        );
      return Response.json({ message: GENERIC_MESSAGE });
    }

    const submittedEmail = result.data.email?.trim().toLowerCase();
    if (!authenticated && submittedEmail !== savedEmail.toLowerCase())
      return Response.json({ message: GENERIC_MESSAGE });

    await createAndSendPasswordReset({
      email: savedEmail,
      fullName: profile.fullName,
      requestUrl: request.url,
    });
    return Response.json({
      message: authenticated
        ? `A reset link was sent to ${savedEmail}.`
        : GENERIC_MESSAGE,
    });
  } catch (error) {
    console.error("Password reset request failed:", error);
    if (authenticated) {
      const message =
        error instanceof Error && error.message.includes("not configured")
          ? error.message
          : "Unable to send the reset email. Check the SMTP settings and try again.";
      return Response.json({ message }, { status: 503 });
    }
    // Keep public responses indistinguishable so the saved administrator email
    // cannot be discovered by probing this endpoint.
    return Response.json({ message: GENERIC_MESSAGE });
  }
}
