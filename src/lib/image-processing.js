import sharp from "sharp";
export const POST_IMAGE_MAX_BYTES = 2 * 1024 * 1024;
export const POST_IMAGE_COMPRESSION_THRESHOLD_BYTES = 200 * 1024;
export const IMAGE_MAX_PIXELS = 25_000_000;
const options = { animated: false, limitInputPixels: IMAGE_MAX_PIXELS, failOn: "warning" };
const formats = { "image/jpeg": "jpeg", "image/png": "png", "image/webp": "webp" };
export async function validatePostImage(input, mimeType) {
  const image = sharp(input, options), metadata = await image.metadata();
  if (!formats[mimeType] || metadata.format !== formats[mimeType] || !metadata.width || !metadata.height || metadata.width * metadata.height > IMAGE_MAX_PIXELS) throw new Error("Invalid image.");
  await image.stats();
}
export async function compressPostImage(input) {
  let smallest;
  for (const quality of [88, 84, 80]) {
    const candidate = await sharp(input, options).rotate().resize({ width: 2560, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer();
    if (!smallest || candidate.length < smallest.length) smallest = candidate;
  }
  return smallest;
}
