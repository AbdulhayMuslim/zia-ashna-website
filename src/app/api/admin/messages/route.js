import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    return Response.json({ data: await prisma.contactSubmission.findMany({ orderBy: { createdAt: "desc" } }) });
  } catch (error) { return databaseErrorResponse(error); }
}
