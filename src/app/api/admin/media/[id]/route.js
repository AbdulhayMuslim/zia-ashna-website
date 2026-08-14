import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function DELETE(_request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return Response.json({ message: "Invalid media ID." }, { status: 400 });
  try {
    await prisma.mediaAsset.delete({ where: { id } });
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error?.code === "P2025") return Response.json({ message: "Media not found." }, { status: 404 });
    return databaseErrorResponse(error);
  }
}
