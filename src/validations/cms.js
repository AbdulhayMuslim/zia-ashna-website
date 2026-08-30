import { z } from "zod";

const text = (max = 500) => z.string().trim().max(max);
const requiredText = (max = 500) => text(max).min(1, "This field is required.");
const webUrl = z
  .url()
  .max(1000)
  .refine((value) => /^https?:\/\//i.test(value), "Use a valid HTTP or HTTPS URL.");
const localAssetPath = z
  .string()
  .trim()
  .max(1000)
  .regex(/^\/(?!\/)/, "Use a valid image path.");
const assetUrl = z.union([webUrl, localAssetPath]);
const navigationUrl = z.union([
  z.string().trim().max(500).regex(/^#[-\w]+$/, "Use a valid section link."),
  z.string().trim().max(500).regex(/^\/(?!\/)/, "Use a valid local path."),
  webUrl,
]);
const nullableUrl = z.union([z.literal(""), webUrl]).optional().nullable();
const nullableAssetUrl = z.union([
  z.literal(""),
  assetUrl,
]).optional().nullable();
const ordered = { sortOrder: z.coerce.number().int().min(0).optional() };
const concurrency = { expectedUpdatedAt: z.iso.datetime().optional() };
const contactLink = z.union([
  z.literal(""),
  z.literal("#"),
  webUrl,
  z.string().trim().max(1000).regex(/^(mailto:|tel:)/, "Use a valid website, email, or phone link."),
]).optional().nullable();

export const heroSchema = z.object({
  ...concurrency,
  sectionTitle: requiredText(120),
  name: requiredText(160),
  description: text(5000),
  buttonLabel: text(80),
  buttonUrl: navigationUrl,
  heroImageUrl: nullableAssetUrl,
  logos: z.array(z.object({
    name: text(120), imageUrl: assetUrl, linkUrl: nullableUrl, ...ordered,
  })).max(20),
});

export const aboutSchema = z.object({
  ...concurrency,
  sectionTitle: requiredText(120), role: text(160), heading: text(240), description: text(10000), imageUrl: nullableAssetUrl,
  experiences: z.array(z.object({ number: requiredText(40), title: requiredText(160), ...ordered })).max(30),
  jobExperiences: z.array(z.object({ role: requiredText(160), institution: requiredText(200), year: requiredText(80), ...ordered })).max(50),
  education: z.array(z.object({ degree: requiredText(200), institution: requiredText(200), year: requiredText(40), ...ordered })).max(30),
  certificates: z.array(z.object({ name: requiredText(200), ...ordered })).max(50),
});

export const activitySchema = z.object({
  ...concurrency,
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ icon: text(80).default("Rocket"), number: requiredText(40), heading: requiredText(160), description: text(3000), ...ordered })).max(50),
});

export const historySchema = z.object({
  ...concurrency,
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ icon: text(80).default("Rocket"), number: requiredText(80), heading: requiredText(200), description: text(5000), ...ordered })).max(100),
});

export const contactSchema = z.object({
  ...concurrency,
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ title: requiredText(200), icon: text(80).optional(), ...ordered })).max(30),
  addresses: z.array(z.object({
    label: requiredText(120), value: requiredText(500), icon: text(80).default("MapPin"), linkUrl: contactLink, ...ordered,
  })).max(30),
  socialLinks: z.array(z.object({
    label: requiredText(100), icon: text(80).default("Globe"), url: contactLink.refine(Boolean, "A social media link is required."), ...ordered,
  })).max(30),
});

export const settingsSchema = z.object({
  ...concurrency,
  siteName: requiredText(160), siteDescription: text(5000), logoUrl: nullableUrl, faviconUrl: nullableUrl,
  contactEmail: z.union([z.literal(""), z.email().max(254)]).optional().nullable(), phone: text(60).optional(), address: text(2000).optional(),
  seoTitle: text(200).optional(), seoDescription: text(1000).optional(), facebook: nullableUrl, twitter: nullableUrl,
  instagram: nullableUrl, linkedin: nullableUrl, youtube: nullableUrl, copyright: text(300).optional(),
  whatsapp: nullableUrl,
});

export const profileSchema = z.object({
  ...concurrency,
  fullName: text(160), username: requiredText(100), email: z.union([z.literal(""), z.email().max(254)]).optional().nullable(),
  phone: text(60).optional(), jobTitle: text(160).optional(), avatarUrl: nullableAssetUrl,
});

export const mediaSchema = z.object({
  name: requiredText(255), url: assetUrl, mimeType: requiredText(120),
  sizeBytes: z.coerce.number().int().min(0), altText: text(300).optional(),
});

export const cmsSchemas = {
  hero: heroSchema,
  about: aboutSchema,
  activity: activitySchema,
  history: historySchema,
  contact: contactSchema,
  settings: settingsSchema,
  profile: profileSchema,
};
