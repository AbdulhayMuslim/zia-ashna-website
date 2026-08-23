import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { compressPostImage, POST_IMAGE_COMPRESSION_THRESHOLD_BYTES, POST_IMAGE_MAX_BYTES } from "../src/lib/image-processing.js";
import { formatMediaSize, formatMediaType } from "../src/lib/media-format.js";
import { createSessionToken, verifySessionToken } from "../src/lib/session.js";
import { createPasswordHash, verifyPassword } from "../src/lib/password.js";
import { createPostApiSchema, updatePostStatusSchema } from "../src/validations/blog.js";
import { aboutSchema, contactSchema, settingsSchema } from "../src/validations/cms.js";

test("session tokens verify and reject tampering", async () => {
  const token = await createSessionToken("admin", "test-secret");
  assert.equal(await verifySessionToken(token, "test-secret"), true);
  assert.equal(await verifySessionToken(`${token}x`, "test-secret"), false);
});

test("admin passwords are salted, hashed, and verified", () => {
  const first = createPasswordHash("a-secure-password");
  const second = createPasswordHash("a-secure-password");
  assert.notEqual(first.hash, second.hash);
  assert.equal(verifyPassword("a-secure-password", first.hash, first.salt), true);
  assert.equal(verifyPassword("wrong-password", first.hash, first.salt), false);
});

test("post validation accepts complete CMS content", () => {
  const result = createPostApiSchema.safeParse({ title: "A valid post title", slug: "valid-post-title", category: "technology", excerpt: "A sufficiently descriptive post excerpt.", content: "This is sufficiently long content for a valid blog post created in the CMS.", status: "published", featured: false, tagIds: [] });
  assert.equal(result.success, true);
});

test("post status validation rejects unsupported states", () => {
  assert.equal(updatePostStatusSchema.safeParse({ status: "deleted" }).success, false);
});

test("CMS schemas support database-driven image and social fields", () => {
  const about = aboutSchema.safeParse({ sectionTitle: "About", role: "Founder", heading: "Name", description: "Bio", imageUrl: "/uploads/profile.webp", experiences: [], jobExperiences: [], education: [], certificates: [] });
  const settings = settingsSchema.safeParse({ siteName: "Site", siteDescription: "Description", whatsapp: "https://wa.me/123" });
  assert.equal(about.success, true);
  assert.equal(settings.success, true);
});

test("contact CMS accepts ordered addresses and social profiles", () => {
  const result = contactSchema.safeParse({
    sectionTitle: "Contact",
    heading: "Get in touch",
    description: "Contact details",
    cards: [],
    addresses: [{ label: "Email", value: "hello@example.com", icon: "Mail", linkUrl: "mailto:hello@example.com" }],
    socialLinks: [{ label: "LinkedIn", icon: "LinkedIn", url: "https://linkedin.com/in/example" }],
  });
  assert.equal(result.success, true);
});

test("post image processing produces WebP below 2 MB", async () => {
  const source = await sharp({ create: { width: 2600, height: 1800, channels: 3, background: "#9f4d16" } }).png().toBuffer();
  const output = await compressPostImage(source);
  const metadata = await sharp(output).metadata();
  assert.equal(metadata.format, "webp");
  assert.ok(output.length <= POST_IMAGE_MAX_BYTES);
});

test("post image limits and media metadata are formatted correctly", () => {
  assert.equal(POST_IMAGE_MAX_BYTES, 2 * 1024 * 1024);
  assert.equal(POST_IMAGE_COMPRESSION_THRESHOLD_BYTES, 200 * 1024);
  assert.equal(formatMediaSize(1536 * 1024), "1.50 MB");
  assert.equal(formatMediaType("image/jpeg"), "JPG");
  assert.equal(formatMediaType("image/webp"), "WEBP");
});
