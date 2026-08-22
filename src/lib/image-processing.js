import sharp from "sharp";

export const POST_IMAGE_MAX_BYTES = 2 * 1024 * 1024;
export const POST_IMAGE_COMPRESSION_THRESHOLD_BYTES = 200 * 1024;

export async function compressPostImage(input) {
  const candidates = await Promise.all([88, 84, 80].map((quality) =>
    sharp(input, { animated: false }).rotate().resize({ width: 2560, height: 1920, fit: "inside", withoutEnlargement: true }).webp({ quality, effort: 5 }).toBuffer(),
  ));
  return candidates.reduce((smallest, candidate) => candidate.length < smallest.length ? candidate : smallest);
}
