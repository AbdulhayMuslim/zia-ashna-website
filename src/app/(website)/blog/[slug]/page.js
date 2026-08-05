import Image from "next/image";
import { notFound } from "next/navigation";
import BackButton from "@/components/ui/BackButton";

import Container from "@/components/ui/Container";
import { posts } from "@/data/posts";

export default async function BlogPost({ params }) {
  const { slug } = await params;

  const post = posts.find((post) => post.slug === slug);

  if (!post) {
    notFound();
  }

  return (
    <main className="min-h-screen py-30">
      <Container className="max-w-5xl mx-auto">
        {/* Hero Image */}
        <div className="overflow-hidden flex justify-center mb-10">
          <Image
            src={post.image}
            alt={post.title}
            priority
            className="w-[90%] lg:w-2/3 rounded-3xl object-cover"
          />
        </div>

        {/* Meta */}
        <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
          <span
            className="
              px-3 py-1
              rounded-full
              bg-brand-primary/10
              text-brand-primary
              text-sm
            "
          >
            {post.category}
          </span>

          <span className="text-sm text-text dark:text-text-dark/70">
            {post.date}
          </span>
        </div>

        {/* Title */}
        <h1
          className="
            text-3xl lg:text-5xl
            font-bold
            mb-8
            text-heading-soft dark:text-heading-dark/80            
          "
        >
          {post.title}
        </h1>

        {/* Content */}
        <article
          className="
            whitespace-pre-line

            text-md lg:text-lg
            leading-relaxed

            text-text
            dark:text-text-dark/70
          "
        >
          {post.content}
        </article>
      </Container>
    </main>
  );
}
