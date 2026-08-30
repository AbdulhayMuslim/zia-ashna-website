import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createTagSchema } from "@/validations/taxonomy";

async function getId(params) { const id = Number((await params).id); return Number.isInteger(id) && id > 0 ? id : null; }
export async function GET(_request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); if (!id) return Response.json({ message: "Invalid ID." }, { status: 400 });
  try { const data = await prisma.tag.findUnique({ where: { id } }); return data ? Response.json({ data }) : Response.json({ message: "Not found." }, { status: 404 }); }
  catch (error) { return databaseErrorResponse(error); }
}
export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); const result = createTagSchema.safeParse(await request.json().catch(() => null));
  if (!id || !result.success) return Response.json({ message: "Invalid tag." }, { status: 400 });
  try { return Response.json({ data: await prisma.tag.update({ where: { id }, data: result.data }) }); }
  catch (error) { return databaseErrorResponse(error); }
}
export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); if (!id) return Response.json({ message: "Invalid ID." }, { status: 400 });
  try { await prisma.tag.delete({ where: { id } }); return new Response(null, { status: 204 }); }
  catch (error) { return databaseErrorResponse(error); }
}
