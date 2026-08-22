import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const posts = await prisma.post.findMany({ where: { status: "published" }, select: { slug: true, updatedAt: true } });
  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({ url: `${baseUrl}/blog/${post.slug}`, lastModified: post.updatedAt, changeFrequency: "monthly", priority: 0.7 })),
  ];
}
