import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { createPostApiSchema } from "@/validations/blog";
import { revalidatePath } from "next/cache";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    const data = await prisma.post.findMany({ take: 1000, orderBy: { createdAt: "desc" }, include: { category: true, tags: { include: { tag: true } } } });
    return Response.json({ data });
  } catch (error) { return databaseErrorResponse(error); }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated(request))) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const result = createPostApiSchema.safeParse(
    await request.json().catch(() => null),
  );

  if (!result.success) {
    return Response.json(
      { message: "Invalid post data.", errors: result.error.flatten().fieldErrors },
      { status: 400 },
    );
  }

  const { category, tagIds, status, ...data } = result.data;

  try {
    const post = await prisma.post.create({
      data: {
        ...data,
        status,
        publishedAt: status === "published" ? new Date() : null,
        category: { connect: { slug: category } },
        tags: {
          create: tagIds.map((tagId) => ({ tag: { connect: { id: tagId } } })),
        },
      },
      select: { id: true, slug: true },
    });
    revalidatePath("/blog");
    revalidatePath(`/blog/${post.slug}`);

    return Response.json(post, { status: 201 });
  } catch (error) {
    if (error?.code === "P2002") {
      return Response.json({ message: "That post slug already exists." }, { status: 409 });
    }
    if (error?.code === "P2025") {
      return Response.json({ message: "The selected category or tag does not exist." }, { status: 400 });
    }
    return databaseErrorResponse(error);
  }
}
