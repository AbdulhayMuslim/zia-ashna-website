import BlogPageClient from "@/components/sections/BlogPageClient";
import { getPublishedPosts } from "@/lib/public-data";

export const metadata = {
  title: "Blog",
  description: "Articles and insights from Sayed Zia Ashna.",
};

export default async function BlogPage() {
  const posts = await getPublishedPosts();
  return <BlogPageClient posts={posts} />;
}
