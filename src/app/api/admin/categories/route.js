import { isAdminAuthenticated } from "@/lib/admin-auth";
import { prisma } from "@/lib/prisma";
import { createCategorySchema } from "@/validations/taxonomy";

export async function POST(request) {
  if (!(await isAdminAuthenticated())) {
    return Response.json({ message: "Unauthorized." }, { status: 401 });
  }

  const result = createCategorySchema.safeParse(await request.json().catch(() => null));
  if (!result.success) {
    return Response.json({ message: "Invalid category data.", errors: result.error.flatten().fieldErrors }, { status: 400 });
  }

  try {
    const category = await prisma.category.create({ data: result.data });
    return Response.json(category, { status: 201 });
  } catch (error) {
    if (error?.code === "P2002") {
      return Response.json({ message: "That category name or slug already exists." }, { status: 409 });
    }
    throw error;
  }
}
