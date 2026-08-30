import Image from "next/image";
import { notFound } from "next/navigation";

import BackButton from "@/components/ui/BackButton";
import Container from "@/components/ui/Container";
import { formatPost, getPublishedPost } from "@/lib/public-data";
import { sanitizeRichText } from "@/lib/sanitize-content";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const post = await getPublishedPost(slug);
  if (!post) return { title: "Post not found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      publishedTime: post.publishedAt?.toISOString(),
      images: post.featuredImage ? [{ url: post.featuredImage, alt: post.title }] : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const record = await getPublishedPost((await params).slug);
  if (!record) notFound();
  const post = formatPost(record);
  const safeContent = sanitizeRichText(post.content);

  return (
    <main className="min-h-screen py-30">
      <Container className="mx-auto max-w-5xl">
        <BackButton />
        {post.featuredImage && (
          <div className="relative mx-auto mb-10 aspect-[16/9] w-[90%] overflow-hidden rounded-3xl lg:w-2/3">
            <Image src={post.featuredImage} alt={post.title} fill priority sizes="(max-width: 1024px) 90vw, 670px" className="object-cover" />
          </div>
        )}
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <span className="rounded-full bg-brand-primary/10 px-3 py-1 text-sm text-brand-primary">{post.category}</span>
          <time dateTime={record.publishedAt?.toISOString()} className="text-sm text-text dark:text-text-dark/70">{post.date}</time>
        </div>
        <h1 className="mb-8 font-heading text-3xl font-bold text-heading-soft dark:text-heading-dark/80 lg:text-5xl">{post.title}</h1>
        <article className="whitespace-pre-line text-lg leading-relaxed text-text dark:text-text-dark/70" dangerouslySetInnerHTML={{ __html: safeContent }} />
      </Container>
    </main>
  );
}
