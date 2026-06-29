"use client";

import { useMediaQuery } from "usehooks-ts";
import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PostCard from "../ui/PostCard";
import FadeRight from "../animations/FadeRight";
import { posts } from "@/data/posts";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function Publications() {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const isTablet = useMediaQuery("(min-width: 640px) and (max-width: 1023px)");

  const visiblePosts = isDesktop
    ? posts.slice(0, 3)
    : isTablet
      ? posts.slice(0, 4)
      : posts.slice(0, 3);

  return (
    <Section
      id="publications"
      className="bg-brand-primary/10 dark:bg-brand-secondary/10 pb-15"
    >
      <Container className="flex flex-col gap-15 items-center justify-center">
        <SectionTitle
          title="Publications"
          className="bg-gray-200 dark:bg-bg-dark"
        />

        <FadeRight
          className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-4
          
        "
        >
          {visiblePosts.map((post) => (
            <PostCard
              key={post.id}
              image={post.image}
              category={post.category}
              date={post.date}
              title={post.title}
              text={post.excerpt}
              btn="Read Article"
              href={`/blog/${post.slug}`}
            />
          ))}
        </FadeRight>

        <Link
          href="/blog"
          className="group bg-brand-primary py-1 px-3 rounded-full text-bg flex items-center gap-2 duration-300 hover:scale-95"
        >
          View All Posts
          <ArrowRightCircle
            size={16}
            className="duration-300 group-hover:translate-x-1"
          />
        </Link>
      </Container>
    </Section>
  );
}
