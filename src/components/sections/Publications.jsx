import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../ui/SectionTitle";
import PostCard from "../ui/PostCard";
import FadeRight from "../animations/FadeRight";
import { posts } from "@/data/posts";

export default function Publications() {
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
          items-stretch
        "
        >
          {posts.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </FadeRight>
      </Container>
    </Section>
  );
}
