import { z } from "zod";

const text = (max = 500) => z.string().trim().max(max);
const requiredText = (max = 500) => text(max).min(1, "This field is required.");
const nullableUrl = z.union([z.literal(""), z.url().max(1000)]).optional().nullable();
const ordered = { sortOrder: z.coerce.number().int().min(0).optional() };

export const heroSchema = z.object({
  sectionTitle: requiredText(120),
  name: requiredText(160),
  description: text(5000),
  buttonLabel: text(80),
  buttonUrl: text(500),
  heroImageUrl: nullableUrl,
  logos: z.array(z.object({
    name: text(120), imageUrl: requiredText(1000), linkUrl: nullableUrl, ...ordered,
  })).max(20),
});

export const aboutSchema = z.object({
  sectionTitle: requiredText(120), role: text(160), heading: text(240), description: text(10000),
  experiences: z.array(z.object({ number: requiredText(40), title: requiredText(160), ...ordered })).max(30),
  education: z.array(z.object({ degree: requiredText(200), institution: requiredText(200), year: requiredText(40), ...ordered })).max(30),
  certificates: z.array(z.object({ name: requiredText(200), ...ordered })).max(50),
});

export const activitySchema = z.object({
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ icon: text(80).default("Rocket"), number: requiredText(40), heading: requiredText(160), description: text(3000), ...ordered })).max(50),
});

export const historySchema = z.object({
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ icon: text(80).default("Rocket"), number: requiredText(80), heading: requiredText(200), description: text(5000), ...ordered })).max(100),
});

export const contactSchema = z.object({
  sectionTitle: requiredText(120), heading: text(240), description: text(5000),
  cards: z.array(z.object({ title: requiredText(200), icon: text(80).optional(), ...ordered })).max(30),
});

export const settingsSchema = z.object({
  siteName: requiredText(160), siteDescription: text(5000), logoUrl: nullableUrl, faviconUrl: nullableUrl,
  contactEmail: z.union([z.literal(""), z.email().max(254)]).optional().nullable(), phone: text(60).optional(), address: text(2000).optional(),
  seoTitle: text(200).optional(), seoDescription: text(1000).optional(), facebook: nullableUrl, twitter: nullableUrl,
  instagram: nullableUrl, linkedin: nullableUrl, youtube: nullableUrl, copyright: text(300).optional(),
});

export const profileSchema = z.object({
  fullName: text(160), username: requiredText(100), email: z.union([z.literal(""), z.email().max(254)]).optional().nullable(),
  phone: text(60).optional(), jobTitle: text(160).optional(), avatarUrl: nullableUrl,
  loginAlerts: z.boolean(), twoFactor: z.boolean(), contentUpdates: z.boolean(),
});

export const mediaSchema = z.object({
  name: requiredText(255), url: z.url().max(1000), mimeType: requiredText(120),
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
