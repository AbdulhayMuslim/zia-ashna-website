import { redirect } from "next/navigation";
import { isSameOriginRequest } from "./request-security.js";
import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function isAdminAuthenticated(request) {
  if (request && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    if (!isSameOriginRequest(request)) return false;
  }
  const cookieStore = request?.cookies ?? await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !process.env.AUTH_SECRET || !(await verifySessionToken(token, process.env.AUTH_SECRET))) return false;
  try {
    const profile = await prisma.adminProfile.findUnique({ where: { id: 1 }, select: { sessionVersion: true } });
    return await verifySessionToken(token, process.env.AUTH_SECRET, profile?.sessionVersion ?? 0);
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) redirect("/admin/login");
}
