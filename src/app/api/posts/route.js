import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export async function GET(request) {
  const limit = Math.min(Math.max(Number(new URL(request.url).searchParams.get("limit")) || 20, 1), 100);
  try {
    const data = await prisma.post.findMany({
      where: { status: "published" }, orderBy: { publishedAt: "desc" }, take: limit,
      include: { category: true, tags: { include: { tag: true } } },
    });
    return Response.json({ data }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
  } catch (error) { return databaseErrorResponse(error); }
}
