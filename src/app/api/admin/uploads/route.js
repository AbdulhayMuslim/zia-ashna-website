import { readBoundedBody, RequestBodyTooLargeError } from "@/lib/request-security";
import { randomUUID } from "node:crypto";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { compressPostImage, validatePostImage, POST_IMAGE_COMPRESSION_THRESHOLD_BYTES, POST_IMAGE_MAX_BYTES } from "@/lib/image-processing";
import { deleteStoredMedia, storeMedia } from "@/lib/media-storage";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const allowedImageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);

export async function POST(request) {
  if (!(await isAdminAuthenticated(request))) return Response.json({ message: "Unauthorized." }, { status: 401 });
  let formData;
  try {
    const body = await readBoundedBody(request, POST_IMAGE_MAX_BYTES + 64 * 1024);
    formData = await new Response(body, { headers: { "Content-Type": request.headers.get("content-type") || "" } }).formData();
  } catch (error) {
    return Response.json({ message: "Invalid upload or maximum 2 MB upload limit exceeded." }, { status: error instanceof RequestBodyTooLargeError ? 413 : 400 });
  }
  const file = formData?.get("file");
  if (!(file instanceof File) || !file.size) return Response.json({ message: "Choose an image to upload." }, { status: 400 });
  if (!allowedImageTypes.has(file.type)) return Response.json({ message: "Supported image formats are JPG, PNG, and WebP." }, { status: 415 });
  if (file.size > POST_IMAGE_MAX_BYTES) return Response.json({ message: "The image is larger than the maximum 2 MB upload limit." }, { status: 413 });

  try {
    const source = Buffer.from(await file.arrayBuffer());
    try { await validatePostImage(source, file.type); } catch {
      return Response.json({ message: "Choose a valid JPG, PNG, or WebP image with no more than 25 million pixels." }, { status: 400 });
    }
    let compressed = false;
    let buffer = source;
    if (file.size > POST_IMAGE_COMPRESSION_THRESHOLD_BYTES) {
      const candidate = await compressPostImage(source);
      if (candidate.length < source.length) {
        buffer = candidate;
        compressed = true;
      }
    }
    const extension = compressed ? ".webp" : ({ "image/jpeg": ".jpg", "image/png": ".png", "image/webp": ".webp", "image/gif": ".gif" }[file.type]);
    const mimeType = compressed ? "image/webp" : file.type;
    const filename = `${randomUUID()}${extension}`;
    const url = await storeMedia({ buffer, filename, contentType: mimeType });
    try {
      const media = await prisma.mediaAsset.create({ data: { name: file.name.slice(0, 255), url, mimeType, sizeBytes: buffer.length } });
      return Response.json({ data: { ...media, compressed, originalSizeBytes: file.size } }, { status: 201 });
    } catch (error) {
      await deleteStoredMedia(url).catch((cleanupError) => console.error("Upload cleanup failed:", cleanupError));
      return databaseErrorResponse(error);
    }
  } catch {
    return Response.json({ message: "Unable to process or store the image. Please try again." }, { status: 400 });
  }
}
