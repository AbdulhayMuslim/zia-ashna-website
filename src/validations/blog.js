import { z } from "zod";

export const createBlogSchema = z.object({
  title: z
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters.")
    .max(200, "Title cannot exceed 200 characters."),

  slug: z
    .string()
    .trim()
    .min(3, "Slug is required.")
    .max(200, "Slug cannot exceed 200 characters."),

  category: z.string().min(1, "Please select a category."),

  excerpt: z
    .string()
    .trim()
    .min(20, "Excerpt must be at least 20 characters.")
    .max(500, "Excerpt cannot exceed 500 characters."),

  content: z.string().trim().min(50, "Content must be at least 50 characters."),

  status: z.enum(["draft", "published"]),

  featured: z.boolean(),
});
