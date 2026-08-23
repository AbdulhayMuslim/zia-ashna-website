import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    const count = await prisma.contactSubmission.count({ where: { status: "new" } });
    return Response.json({ data: { count } });
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
