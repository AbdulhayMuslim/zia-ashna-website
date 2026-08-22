import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PostCard from "../ui/PostCard";
import FadeRight from "../animations/FadeRight";
import Link from "next/link";
import { ArrowRightCircle } from "lucide-react";

export default function Publications({ posts = [] }) {
  const visiblePosts = posts.slice(0, 4);

  return (
    <Section
      id="publications"
      className="relative bg-brand-primary/10 dark:bg-brand-secondary/10 pb-15"
    >
      <div className="opacity-70 dark:opacity-10 absolute top-0 left-0 h-full w-full bg-[url('/images/herobg2.png')] bg-cover bg-center bg-no-repeat" />
      <Container className="relative z-10 flex flex-col gap-15 items-center justify-center">
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
          {visiblePosts.map((post, index) => (
            <div
              key={post.id}
              className={
                index === 3
                  ? "hidden h-full sm:block lg:hidden [&>a]:h-full"
                  : "h-full [&>a]:h-full"
              }
            >
              <PostCard
                image={post.image}
                category={post.category}
                date={post.date}
                title={post.title}
                text={post.excerpt}
                btn="Read Article"
                href={`/blog/${post.slug}`}
              />
            </div>
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
