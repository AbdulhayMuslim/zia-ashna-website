import { z } from "zod";
const safe = (value) => !/[\\\x00-\x20\x7f]/.test(value);
export const webUrl = z.url().max(1000).refine((value) => /^https?:\/\//i.test(value) && safe(value), "Use a valid HTTP or HTTPS URL.");
export const localAssetPath = z.string().trim().max(1000).refine((value) => /^\/(?!\/)/.test(value) && safe(value), "Use a valid local path.");
export const assetUrl = z.union([webUrl, localAssetPath]);
export const nullableAssetUrl = z.union([z.literal(""), assetUrl]).optional().nullable();
