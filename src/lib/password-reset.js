import { createHash, randomBytes } from "node:crypto";
import nodemailer from "nodemailer";

import { prisma } from "@/lib/prisma";

export const PASSWORD_RESET_TTL_MS = 30 * 60 * 1000;

export function hashResetToken(token) {
  return createHash("sha256").update(token).digest("hex");
}

function smtpConfig() {
  const port = Number(process.env.SMTP_PORT || 587);
  const host = process.env.SMTP_HOST?.trim();
  const user = process.env.SMTP_USER?.trim();
  const password = process.env.SMTP_PASSWORD;
  const from = process.env.SMTP_FROM?.trim();
  if (!host || !user || !password || !from || !Number.isInteger(port)) return null;
  return { host, port, secure: process.env.SMTP_SECURE === "true", auth: { user, pass: password }, from };
}

export function isPasswordResetEmailConfigured() {
  return Boolean(smtpConfig());
}

export async function createAndSendPasswordReset({ email, fullName, requestUrl }) {
  const smtp = smtpConfig();
  if (!smtp) throw new Error("Password-reset email delivery is not configured.");

  const token = randomBytes(32).toString("base64url");
  const tokenHash = hashResetToken(token);
  const expiresAt = new Date(Date.now() + PASSWORD_RESET_TTL_MS);
  const resetUrl = new URL("/reset-password", process.env.NEXT_PUBLIC_SITE_URL || requestUrl);
  resetUrl.searchParams.set("token", token);

  await prisma.$transaction([
    prisma.passwordResetToken.deleteMany({}),
    prisma.passwordResetToken.create({ data: { tokenHash, expiresAt } }),
  ]);

  const transporter = nodemailer.createTransport({
    host: smtp.host,
    port: smtp.port,
    secure: smtp.secure,
    auth: smtp.auth,
  });

  try {
    await transporter.sendMail({
      from: smtp.from,
      to: email,
      subject: "Reset your CMS password",
      text: `Hello ${fullName || "Administrator"},\n\nUse this link to reset your CMS password. It expires in 30 minutes and can be used once:\n\n${resetUrl}\n\nIf you did not request this, you can ignore this email.`,
      html: `<p>Hello ${escapeHtml(fullName || "Administrator")},</p><p>Use the button below to reset your CMS password. This link expires in 30 minutes and can be used once.</p><p><a href="${escapeHtml(resetUrl.toString())}" style="display:inline-block;padding:12px 20px;border-radius:12px;background:#ff6b35;color:#fff;text-decoration:none;font-weight:600">Reset password</a></p><p>If you did not request this, you can ignore this email.</p>`,
    });
  } catch (error) {
    await prisma.passwordResetToken.deleteMany({ where: { tokenHash } }).catch(() => {});
    throw error;
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"]/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[character]);
}
