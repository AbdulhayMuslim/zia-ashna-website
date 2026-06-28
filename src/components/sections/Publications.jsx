import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import asantech from "@/assets/images/asantech logo.png";
import tawangar from "@/assets/images/tawangar logo.png";
import hamkar from "@/assets/images/hamkar logo.png";
import PostCard from "../ui/PostCard";
import FadeRight from "../animations/FadeRight";
import profile from "@/assets/images/profile.jpg";

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

        <FadeRight className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-3 sm:grid-rows-2 lg:grid-rows-1 place-items-center gap-4">
          <PostCard
            image={profile}
            category="Entrepreneurship"
            date="June 28, 2026"
            title="How Building Multiple Ventures Creates Long Term Value"
            text="ayed Zia Ashna is an entrepreneur, founder, and business
                  leader with a strong background in technology."
            btn="Read More"
          />
          <PostCard
            image={profile}
            category="Entrepreneurship"
            date="June 28, 2026"
            title="How Building Multiple Ventures Creates Long Term Value"
            text="ayed Zia Ashna is an entrepreneur, founder, and business
                  leader with a strong background in technology."
            btn="Read More"
          />
          <PostCard
            image={profile}
            category="Entrepreneurship"
            date="June 28, 2026"
            title="How Building Multiple Ventures Creates Long Term Value"
            text="ayed Zia Ashna is an entrepreneur, founder, and business
                  leader with a strong background in technology."
            btn="Read More"
          />
        </FadeRight>
      </Container>
    </Section>
  );
}
