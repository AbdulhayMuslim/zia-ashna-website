import { isMediaInUse } from "@/lib/media-references";
import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";
import { deleteStoredMedia } from "@/lib/media-storage";

export async function DELETE(request, { params }) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const id = Number((await params).id);
  if (!Number.isInteger(id) || id < 1) return Response.json({ message: "Invalid media ID." }, { status: 400 });
  try {
    const media = await prisma.mediaAsset.findUnique({ where: { id } });
    if (!media) return Response.json({ message: "Media not found." }, { status: 404 });
    if (await isMediaInUse(prisma, media.url)) return Response.json({ message: "This image is still used by website content. Remove its references before deleting it." }, { status: 409 });
    await prisma.mediaAsset.delete({ where: { id } });
    try {
      await deleteStoredMedia(media.url);
    } catch (storageError) {
      await prisma.mediaAsset.create({ data: media }).catch((restoreError) => console.error("Media record restoration failed:", restoreError));
      throw storageError;
    }
    return new Response(null, { status: 204 });
  } catch (error) {
    if (error?.code === "P2025") return Response.json({ message: "Media not found." }, { status: 404 });
    return databaseErrorResponse(error);
  }
}
