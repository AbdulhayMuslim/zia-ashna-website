import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { mediaSchema } from "@/validations/cms";

export async function GET() {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  try {
    return Response.json({ data: await prisma.mediaAsset.findMany({ orderBy: { uploadedAt: "desc" } }) });
  } catch (error) { return databaseErrorResponse(error); }
}

export async function POST(request) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const result = mediaSchema.safeParse(await request.json().catch(() => null));
  if (!result.success) return Response.json({ message: "Invalid media details.", errors: result.error.flatten().fieldErrors }, { status: 400 });
  try {
    return Response.json({ data: await prisma.mediaAsset.create({ data: result.data }) }, { status: 201 });
  } catch (error) { return databaseErrorResponse(error); }
}
