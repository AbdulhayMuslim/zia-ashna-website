import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const profile = await prisma.adminProfile.findUnique({
      where: { id: 1 },
      select: { fullName: true, jobTitle: true, avatarUrl: true, updatedAt: true },
    });
    return Response.json(
      {
        data: profile
          ? { ...profile, role: profile.jobTitle ?? "", jobTitle: undefined }
          : { fullName: "", role: "", avatarUrl: "", updatedAt: null },
      },
      { headers: { "Cache-Control": "no-store, max-age=0" } },
    );
  } catch (error) {
    return databaseErrorResponse(error);
  }
}
