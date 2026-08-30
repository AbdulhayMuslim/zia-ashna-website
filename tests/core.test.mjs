import assert from "node:assert/strict";
import test from "node:test";

import sharp from "sharp";

import { compressPostImage, POST_IMAGE_COMPRESSION_THRESHOLD_BYTES, POST_IMAGE_MAX_BYTES } from "../src/lib/image-processing.js";
import { formatMediaSize, formatMediaType } from "../src/lib/media-format.js";
import { createSessionToken, verifySessionToken } from "../src/lib/session.js";
import { sanitizeRichText } from "../src/lib/sanitize-content.js";
import { createPasswordHash, verifyPassword } from "../src/lib/password.js";
import { createPostApiSchema, updatePostStatusSchema } from "../src/validations/blog.js";
import robots from "../src/app/robots.js";
import { aboutSchema, contactSchema, heroSchema, mediaSchema, profileSchema, settingsSchema } from "../src/validations/cms.js";

test("session tokens verify and reject tampering", async () => {
  const token = await createSessionToken("admin", "test-secret");
  assert.equal(await verifySessionToken(token, "test-secret"), true);
  assert.equal(await verifySessionToken(`${token}x`, "test-secret"), false);
});

test("session versions revoke previously issued tokens", async () => {
  const token = await createSessionToken("admin", "test-secret", 4);
  assert.equal(await verifySessionToken(token, "test-secret", 4), true);
  assert.equal(await verifySessionToken(token, "test-secret", 5), false);
});

test("rich text sanitization removes executable content", () => {
  const sanitized = sanitizeRichText('<p onclick="alert(1)">Safe</p><script>alert(1)</script><a href="javascript:alert(1)">link</a>');
  assert.equal(sanitized.includes("onclick"), false);
  assert.equal(sanitized.includes("<script"), false);
  assert.equal(sanitized.includes("javascript:"), false);
});

test("session verification rejects missing, malformed, and expired tokens", async () => {
  assert.equal(await verifySessionToken("", "test-secret"), false);
  assert.equal(await verifySessionToken("not-a-token", "test-secret"), false);

  const originalNow = Date.now;
  try {
    Date.now = () => 1_000;
    const token = await createSessionToken("admin", "test-secret");
    Date.now = () => 1_000 + 8 * 60 * 60 * 1000 + 1;
    assert.equal(await verifySessionToken(token, "test-secret"), false);
  } finally {
    Date.now = originalNow;
  }
});

test("admin passwords are salted, hashed, and verified", () => {
  const first = createPasswordHash("a-secure-password");
  const second = createPasswordHash("a-secure-password");
  assert.notEqual(first.hash, second.hash);
  assert.equal(verifyPassword("a-secure-password", first.hash, first.salt), true);
  assert.equal(verifyPassword("wrong-password", first.hash, first.salt), false);
});

test("password verification safely rejects incomplete and malformed credentials", () => {
  assert.equal(verifyPassword("password", "invalid-hash", "salt"), false);
  assert.equal(verifyPassword("", "a".repeat(128), "salt"), false);
  assert.equal(verifyPassword("password", "a".repeat(128), ""), false);
});

test("post validation accepts complete CMS content", () => {
  const result = createPostApiSchema.safeParse({ title: "A valid post title", slug: "valid-post-title", category: "technology", excerpt: "A sufficiently descriptive post excerpt.", content: "This is sufficiently long content for a valid blog post created in the CMS.", status: "published", featured: false, tagIds: [] });
  assert.equal(result.success, true);
});

test("post status validation rejects unsupported states", () => {
  assert.equal(updatePostStatusSchema.safeParse({ status: "deleted" }).success, false);
});

test("post validation rejects unsafe slugs and excessive tag assignments", () => {
  const basePost = {
    title: "A valid post title",
    slug: "valid-post-title",
    category: "technology",
    excerpt: "A sufficiently descriptive post excerpt.",
    content: "This is sufficiently long content for a valid blog post created in the CMS.",
    status: "published",
    featured: false,
  };

  assert.equal(createPostApiSchema.safeParse({ ...basePost, slug: "Invalid Slug", tagIds: [] }).success, false);
  assert.equal(createPostApiSchema.safeParse({ ...basePost, tagIds: Array.from({ length: 21 }, (_, index) => index + 1) }).success, false);
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

test("CMS schemas reject unsafe asset, social, and media values", () => {
  const hero = heroSchema.safeParse({
    sectionTitle: "Hero",
    name: "Name",
    description: "Description",
    buttonLabel: "Read more",
    buttonUrl: "/about",
    heroImageUrl: "//untrusted.example/image.png",
    logos: [],
  });
  const contact = contactSchema.safeParse({
    sectionTitle: "Contact",
    heading: "Get in touch",
    description: "Contact details",
    cards: [],
    addresses: [],
    socialLinks: [{ label: "Unsafe", icon: "Globe", url: "javascript:alert(1)" }],
  });
  const media = mediaSchema.safeParse({ name: "Image", url: "not-a-url", mimeType: "image/png", sizeBytes: -1 });

  assert.equal(hero.success, false);
  assert.equal(contact.success, false);
  assert.equal(media.success, false);
  assert.equal(profileSchema.safeParse({ fullName: "Admin", username: "", avatarUrl: "" }).success, false);
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

test("robots metadata exposes public pages and protects admin and API routes", () => {
  const previousSiteUrl = process.env.NEXT_PUBLIC_SITE_URL;
  process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
  try {
    const metadata = robots();
    assert.deepEqual(metadata.rules, [
      { userAgent: "*", allow: "/", disallow: ["/admin/", "/api/"] },
    ]);
    assert.equal(metadata.sitemap, "https://example.com/sitemap.xml");
  } finally {
    if (previousSiteUrl === undefined) delete process.env.NEXT_PUBLIC_SITE_URL;
    else process.env.NEXT_PUBLIC_SITE_URL = previousSiteUrl;
  }
});
