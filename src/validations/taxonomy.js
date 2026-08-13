import { z } from "zod";

const slugSchema = z
  .string()
  .trim()
  .min(2, "Slug is required.")
  .max(100, "Slug cannot exceed 100 characters.")
  .regex(
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
    "Use lowercase letters, numbers, and single hyphens only.",
  );

export const taxonomySchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: slugSchema,
  description: z.string().trim().max(500).optional().default(""),
  status: z.enum(["draft", "published"]),
});

export const createCategorySchema = taxonomySchema;
export const createTagSchema = taxonomySchema;
