import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    const messages = await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } });
    return Response.json({ data: messages.map((message) => ({ ...message, status: message.status === "new" ? "new" : "read" })) });
  } catch (error) { return databaseErrorResponse(error); }
}
