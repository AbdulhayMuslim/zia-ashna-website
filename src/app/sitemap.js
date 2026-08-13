import { posts } from "@/data/posts";

export default function sitemap() {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  return [
    { url: baseUrl, changeFrequency: "monthly", priority: 1 },
    { url: `${baseUrl}/blog`, changeFrequency: "weekly", priority: 0.8 },
    ...posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
