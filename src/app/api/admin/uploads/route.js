import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { isAdminAuthenticated } from "@/lib/admin-auth";
import { databaseErrorResponse } from "@/lib/api-error";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";

const MAX_SIZE = 5 * 1024 * 1024;
const imageExtensions = new Map([
  ["image/jpeg", ".jpg"], ["image/png", ".png"], ["image/webp", ".webp"],
  ["image/gif", ".gif"], ["image/svg+xml", ".svg"],
]);

export async function POST(request) {
  if (!(await isAdminAuthenticated())) return Response.json({ message: "Unauthorized." }, { status: 401 });
  const formData = await request.formData().catch(() => null);
  const file = formData?.get("file");
  if (!(file instanceof File) || !file.size) return Response.json({ message: "Choose an image to upload." }, { status: 400 });
  if (file.size > MAX_SIZE) return Response.json({ message: "Images must be 5 MB or smaller." }, { status: 413 });
  const extension = imageExtensions.get(file.type);
  if (!extension) return Response.json({ message: "Use a JPG, PNG, WebP, GIF, or SVG image." }, { status: 415 });

  const filename = `${randomUUID()}${extension}`;
  const uploadDirectory = path.join(process.cwd(), "public", "uploads");
  const filePath = path.join(uploadDirectory, filename);
  const url = `/uploads/${filename}`;
  await mkdir(uploadDirectory, { recursive: true });
  await writeFile(filePath, Buffer.from(await file.arrayBuffer()), { flag: "wx" });

  try {
    const media = await prisma.mediaAsset.create({ data: { name: file.name.slice(0, 255), url, mimeType: file.type, sizeBytes: file.size } });
    return Response.json({ data: media }, { status: 201 });
  } catch (error) {
    await unlink(filePath).catch(() => {});
    return databaseErrorResponse(error);
  }
}
