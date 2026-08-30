import { z } from "zod";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

async function idFrom(params) {
  const id = Number((await params).id);
  return Number.isInteger(id) && id > 0 ? id : null;
}

export async function PATCH(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await idFrom(params);
  const result = z.object({ status: z.enum(["new", "read"]) }).safeParse(await request.json().catch(() => null));
  if (!id || !result.success) return Response.json({ message: "Invalid message update." }, { status: 400 });
  try { return Response.json({ data: await prisma.contactSubmission.update({ where: { id }, data: result.data }) }); }
  catch (error) { return databaseErrorResponse(error); }
}

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await idFrom(params);
  if (!id) return Response.json({ message: "Invalid message ID." }, { status: 400 });
  try { await prisma.contactSubmission.delete({ where: { id } }); return new Response(null, { status: 204 }); }
  catch (error) { return databaseErrorResponse(error); }
}
