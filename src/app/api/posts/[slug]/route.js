import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function GET(_request, { params }) {
  const { slug } = await params;
  try {
    const data = await prisma.post.findFirst({ where: { slug, status: "published" }, include: { category: true, tags: { include: { tag: true } } } });
    if (!data) return Response.json({ message: "Post not found." }, { status: 404 });
    return Response.json({ data }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
  } catch (error) { return databaseErrorResponse(error); }
}
