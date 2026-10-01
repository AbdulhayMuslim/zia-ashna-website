import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

function s3Config() {
  const values = {
    bucket: process.env.S3_BUCKET?.trim(),
    publicUrl: process.env.S3_PUBLIC_URL?.trim().replace(/\/$/, ""),
    accessKeyId: process.env.S3_ACCESS_KEY_ID?.trim(),
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY?.trim(),
  };
  const configured = Object.values(values).some(Boolean);
  if (!configured) return null;
  if (Object.values(values).some((value) => !value)) {
    const error = new Error("S3 media storage configuration is incomplete.");
    error.code = "MEDIA_STORAGE_MISCONFIGURED";
    throw error;
  }
  const { bucket, publicUrl, accessKeyId, secretAccessKey } = values;
  return {
    bucket,
    publicUrl,
    client: new S3Client({
      region: process.env.S3_REGION || "auto",
      endpoint: process.env.S3_ENDPOINT || undefined,
      forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
      credentials: { accessKeyId, secretAccessKey },
    }),
  };
}

export async function storeMedia({ buffer, filename, contentType }) {
  const objectKey = `uploads/${filename}`;
  const s3 = s3Config();
  if (s3) {
    await s3.client.send(new PutObjectCommand({ Bucket: s3.bucket, Key: objectKey, Body: buffer, ContentType: contentType, CacheControl: "public, max-age=31536000, immutable" }));
    return `${s3.publicUrl}/${objectKey}`;
  }
  if (process.env.NODE_ENV === "production") {
    const error = new Error("Production media storage is not configured.");
    error.code = "MEDIA_STORAGE_NOT_CONFIGURED";
    throw error;
  }
  const directory = path.join(process.cwd(), "public", "uploads");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, filename), buffer, { flag: "wx" });
  return `/uploads/${filename}`;
}

export async function deleteStoredMedia(url) {
  const s3 = s3Config();
  if (s3 && url.startsWith(`${s3.publicUrl}/uploads/`)) {
    const key = url.slice(s3.publicUrl.length + 1);
    await s3.client.send(new DeleteObjectCommand({ Bucket: s3.bucket, Key: key }));
    return;
  }
  if (url.startsWith("/uploads/")) {
    const relative = url.slice(1).split("/");
    if (relative.length !== 2 || !/^[a-zA-Z0-9][a-zA-Z0-9._-]*$/.test(relative[1]) || relative[1].includes("..")) return;
    await unlink(path.join(process.cwd(), "public", ...relative)).catch((error) => {
      if (error.code !== "ENOENT") throw error;
    });
  }
}
