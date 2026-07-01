"use client";

import { useState } from "react";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import PostCard from "@/components/ui/PostCard";
import ZoomIn from "@/components/animations/ZoomIn";
import BackButton from "@/components/ui/BackButton";

import { ChevronLeft, ChevronRight } from "lucide-react";

import { posts } from "@/data/posts";

const POSTS_PER_PAGE = 9;

export default function Blog() {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(posts.length / POSTS_PER_PAGE);

  const startIndex = (currentPage - 1) * POSTS_PER_PAGE;
  const endIndex = startIndex + POSTS_PER_PAGE;

  const visiblePosts = posts.slice(startIndex, endIndex);

  return (
    <Section className="bg-gray-200 dark:bg-gray-800">
      <BackButton />

      <Container className="flex flex-col items-center gap-12 pt-23 md:pt-25">
        <SectionTitle title="Blog Posts" />

        {/* Posts */}
        <ZoomIn
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
        </ZoomIn>

        {/* Pagination */}
        {totalPages > 1 && (
          <nav
            aria-label="Pagination"
            className="flex items-center justify-center gap-2 flex-wrap"
          >
            {/* Previous */}
            <button
              onClick={() => setCurrentPage((p) => p - 1)}
              disabled={currentPage === 1}
              className="
                flex items-center justify-center
                w-11 h-11
                rounded-xl

                bg-bg
                dark:bg-bg-dark

                border border-brand-primary/20

                text-brand-primary
                dark:text-brand-secondary

                duration-300

                hover:bg-brand-primary
                hover:text-white

                disabled:opacity-40
                disabled:pointer-events-none
              "
            >
              <ChevronLeft size={18} />
            </button>

            {/* Page Numbers */}
            {Array.from({ length: totalPages }).map((_, index) => {
              const page = index + 1;

              return (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`
                    w-11
                    h-11
                    rounded-xl
                    text-sm
                    font-medium
                    duration-300
                    border

                    ${
                      currentPage === page
                        ? "bg-brand-primary text-white border-brand-primary"
                        : "bg-bg dark:bg-bg-dark border-brand-primary/20 text-brand-primary dark:text-brand-secondary hover:bg-brand-primary hover:text-white"
                    }
                  `}
                >
                  {page}
                </button>
              );
            })}

            {/* Next */}
            <button
              onClick={() => setCurrentPage((p) => p + 1)}
              disabled={currentPage === totalPages}
              className="
                flex items-center justify-center
                w-11 h-11
                rounded-xl

                bg-bg
                dark:bg-bg-dark

                border border-brand-primary/20

                text-brand-primary
                dark:text-brand-secondary

                duration-300

                hover:bg-brand-primary
                hover:text-white

                disabled:opacity-40
                disabled:pointer-events-none
              "
            >
              <ChevronRight size={18} />
            </button>
          </nav>
        )}
      </Container>
    </Section>
  );
}
