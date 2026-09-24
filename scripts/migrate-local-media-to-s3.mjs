import "dotenv/config";

import { readdir, readFile } from "node:fs/promises";
import path from "node:path";

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mariadb from "mariadb";

import { mysqlConfigFromUrl } from "../src/lib/mysql-config.js";

const apply = process.argv.includes("--apply");
const uploadsDirectory = path.join(process.cwd(), "public", "uploads");
const required = ["DATABASE_URL", "S3_BUCKET", "S3_PUBLIC_URL", "S3_ACCESS_KEY_ID", "S3_SECRET_ACCESS_KEY"];
const missing = required.filter((name) => !process.env[name]);
if (missing.length) throw new Error(`Missing environment variables: ${missing.join(", ")}`);

const publicUrl = process.env.S3_PUBLIC_URL.replace(/\/$/, "");
const s3 = new S3Client({
  region: process.env.S3_REGION || "auto",
  endpoint: process.env.S3_ENDPOINT || undefined,
  forcePathStyle: process.env.S3_FORCE_PATH_STYLE === "true",
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
  },
});

const contentTypes = new Map([
  [".jpg", "image/jpeg"],
  [".jpeg", "image/jpeg"],
  [".png", "image/png"],
  [".webp", "image/webp"],
]);
const filenames = (await readdir(uploadsDirectory))
  .filter((name) => contentTypes.has(path.extname(name).toLowerCase()))
  .sort();

console.log(`${apply ? "Applying" : "Dry run:"} ${filenames.length} local media file(s) found.`);
for (const filename of filenames) {
  console.log(`/uploads/${filename} -> ${publicUrl}/uploads/${filename}`);
}
if (!apply) {
  console.log("No files or database records were changed. Re-run with --apply after backing up MySQL and object storage.");
  process.exit(0);
}

for (const filename of filenames) {
  const extension = path.extname(filename).toLowerCase();
  await s3.send(new PutObjectCommand({
    Bucket: process.env.S3_BUCKET,
    Key: `uploads/${filename}`,
    Body: await readFile(path.join(uploadsDirectory, filename)),
    ContentType: contentTypes.get(extension),
    CacheControl: "public, max-age=31536000, immutable",
  }));
}

const replacements = [
  ['Post', 'featuredImage'],
  ['Post', 'content'],
  ['HeroSection', 'heroImageUrl'],
  ['HeroLogo', 'imageUrl'],
  ['AboutSection', 'imageUrl'],
  ['SiteSettings', 'logoUrl'],
  ['SiteSettings', 'faviconUrl'],
  ['AdminProfile', 'avatarUrl'],
  ['MediaAsset', 'url'],
];
const pool = mariadb.createPool(mysqlConfigFromUrl(process.env.DATABASE_URL));
const client = await pool.getConnection();
try {
  await client.beginTransaction();
  for (const filename of filenames) {
    const oldUrl = `/uploads/${filename}`;
    const newUrl = `${publicUrl}/uploads/${filename}`;
    for (const [table, column] of replacements) {
      await client.query(
        `UPDATE \`${table}\` SET \`${column}\` = replace(\`${column}\`, ?, ?) WHERE \`${column}\` LIKE concat('%', ?, '%')`,
        [oldUrl, newUrl, oldUrl],
      );
    }
  }
  await client.commit();
} catch (error) {
  await client.rollback();
  throw error;
} finally {
  client.release();
  await pool.end();
}

console.log(`Uploaded ${filenames.length} file(s) and updated matching MySQL media references.`);
