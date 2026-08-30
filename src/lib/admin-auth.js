import { cookies } from "next/headers";
import { SESSION_COOKIE, verifySessionToken } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function isAdminAuthenticated(request) {
  if (request && !["GET", "HEAD", "OPTIONS"].includes(request.method)) {
    const origin = request.headers.get("origin");
    const fetchSite = request.headers.get("sec-fetch-site");
    if ((origin && origin !== new URL(request.url).origin) || (fetchSite && fetchSite !== "same-origin" && fetchSite !== "none")) return false;
  }
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;
  if (!token || !process.env.AUTH_SECRET) return false;
  try {
    const profile = await prisma.adminProfile.findUnique({ where: { id: 1 }, select: { sessionVersion: true } });
    return verifySessionToken(token, process.env.AUTH_SECRET, profile?.sessionVersion ?? 0);
  } catch (error) {
    console.error("Admin authentication failed:", error);
    return false;
  }
}

export async function requireAdmin() {
  if (!(await isAdminAuthenticated())) throw new Error("UNAUTHORIZED");
}
