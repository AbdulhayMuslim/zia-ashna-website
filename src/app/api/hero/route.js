import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const hero = await prisma.heroSection.findUnique({
      where: { id: 1 },
      include: {
        logos: {
          orderBy: {
            sortOrder: "asc",
          },
        },
      },
    });

    return Response.json(hero);
  } catch (error) {
    console.error("Failed to fetch hero:", error);

    return Response.json(
      { error: "Failed to fetch hero section" },
      { status: 500 },
    );
  }
}
