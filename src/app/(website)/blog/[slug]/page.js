import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import BackButton from "@/components/ui/BackButton";
import Container from "@/components/ui/Container";
import {
  formatPost,
  getPublishedPost,
  getRelatedPublishedPosts,
} from "@/lib/public-data";
import { sanitizeRichText } from "@/lib/sanitize-content";

export async function generateMetadata({ params }) {
  const slug = (await params).slug;
  const post = await getPublishedPost(slug);

  if (!post) {
    return {
      title: "Post not found",
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      type: "article",
      url: `/blog/${slug}`,
      title: post.title,
      description: post.excerpt,
      images: post.featuredImage
        ? [
            {
              url: post.featuredImage,
              alt: post.title,
            },
          ]
        : [],
    },
  };
}

export default async function BlogPost({ params }) {
  const slug = (await params).slug;
  const record = await getPublishedPost(slug);

  if (!record) {
    notFound();
  }

  const post = formatPost(record);
  const safeContent = sanitizeRichText(post.content);

  const relatedPosts = await getRelatedPublishedPosts({
    categoryId: record.categoryId,
    excludePostId: record.id,
    take: 2,
  });

  return (
    <main className="min-h-screen py-30">
      <Container className="mx-auto max-w-7xl">
        <BackButton />

        <div className="grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left Column: Post Content */}
          <article className="min-w-0">
            <h1 className="mb-8 font-heading text-3xl font-bold leading-tight text-heading-soft dark:text-heading-dark/80 lg:text-5xl">
              {post.title}
            </h1>

            <div
              className="blog-content whitespace-pre-line text-lg leading-relaxed text-text dark:text-text-dark"
              dangerouslySetInnerHTML={{
                __html: safeContent,
              }}
            />
          </article>

          {/* Right Column: Sticky Sidebar */}
          <div className="relative min-w-0 self-start">
            <aside className="self-start lg:sticky lg:top-28">
              <div className="space-y-8">
                {/* Featured Image */}
                {post.featuredImage && (
                  <div className="relative aspect-[16/10] w-full overflow-hidden rounded-3xl">
                    <Image
                      src={post.featuredImage}
                      alt={post.title}
                      fill
                      priority
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                )}

                {/* Category */}
                {post.category && (
                  <div className="flex justify-end">
                    <span className="inline-flex rounded-full bg-brand-primary/10 px-4 py-2 text-sm font-medium text-brand-primary">
                      {post.category}
                    </span>
                  </div>
                )}

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                  <section>
                    <h2 className="mb-5 font-heading text-2xl font-semibold text-heading dark:text-heading-dark">
                      Related Posts
                    </h2>

                    <div className="grid grid-cols-2 gap-4">
                      {relatedPosts.map((relatedPost) => (
                        <Link
                          key={relatedPost.id}
                          href={`/blog/${relatedPost.slug}`}
                          className="group flex min-w-0 flex-col overflow-hidden rounded-2xl border-2 border-border-strong bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-brand-primary hover:shadow-lg dark:border-border-dark dark:bg-card-dark"
                        >
                          {/* Related Post Image */}
                          {relatedPost.featuredImage && (
                            <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden">
                              <Image
                                src={relatedPost.featuredImage}
                                alt={relatedPost.title}
                                fill
                                sizes="(max-width: 1024px) 50vw, 25vw"
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                          )}

                          {/* Related Post Content */}
                          <div className="flex flex-1 flex-col p-4">
                            <h3 className="line-clamp-2 font-heading text-sm font-semibold leading-snug text-heading transition-colors group-hover:text-brand-primary dark:text-heading-dark">
                              {relatedPost.title}
                            </h3>

                            {/* Two-Line Excerpt */}
                            {relatedPost.excerpt && (
                              <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-text/70 dark:text-text-dark/70">
                                {relatedPost.excerpt}
                              </p>
                            )}

                            {/* Category */}
                            <p className="mt-3 text-xs font-medium text-brand-primary">
                              {relatedPost.category}
                            </p>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </section>
                )}
              </div>
            </aside>
          </div>
        </div>
      </Container>
    </main>
  );
}
