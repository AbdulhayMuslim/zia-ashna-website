import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createPostApiSchema } from "@/validations/blog";

async function getId(params) { const id = Number((await params).id); return Number.isInteger(id) && id > 0 ? id : null; }

export async function GET(_request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); if (!id) return Response.json({ message: "Invalid ID." }, { status: 400 });
  try {
    const data = await prisma.post.findUnique({ where: { id }, include: { category: true, tags: { include: { tag: true } } } });
    return data ? Response.json({ data }) : Response.json({ message: "Post not found." }, { status: 404 });
  } catch (error) { return databaseErrorResponse(error); }
}

export async function PUT(request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); const result = createPostApiSchema.safeParse(await request.json().catch(() => null));
  if (!id || !result.success) return Response.json({ message: "Invalid post data." }, { status: 400 });
  const { category, tagIds, status, ...data } = result.data;
  try {
    const post = await prisma.post.update({ where: { id }, data: {
      ...data, status, publishedAt: status === "published" ? new Date() : null,
      category: { connect: { slug: category } },
      tags: { deleteMany: {}, create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })) },
    }, include: { category: true, tags: { include: { tag: true } } } });
    return Response.json({ data: post });
  } catch (error) { return databaseErrorResponse(error); }
}

export async function DELETE(_request, { params }) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = await getId(params); if (!id) return Response.json({ message: "Invalid ID." }, { status: 400 });
  try { await prisma.post.delete({ where: { id } }); return new Response(null, { status: 204 }); }
  catch (error) { return databaseErrorResponse(error); }
}
