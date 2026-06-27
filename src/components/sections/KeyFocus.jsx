import Section from "../ui/Section";
import Container from "../ui/Container";
import ZoomIn from "../animations/ZoomIn";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import {
  Rocket,
  Handshake,
  TrendingUp,
  Lightbulb,
  Crown,
  Banknote,
} from "lucide-react";

export default function KeyFocus() {
  return (
    <>
      <Section id="keyfocus" className="pb-20">
        <Container className="flex flex-col items-center justify-center gap-4">
          <SectionTitle title="Key Focus Areas" />

          {/* Cards */}
          <ZoomIn>
            <div className="pt-4 lg:pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-6 sm:grid-rows-3 lg:grid-rows-2 items-stretch gap-4 place-items-center">
              <Card
                icon={Rocket}
                number="01"
                title="Entrepreneurship"
                content="Building ventures that create value, solve problems, and scale through innovation and leadership."
              />
              <Card
                icon={Handshake}
                number="02"
                title="Business Development"
                content="Creating partnerships that unlock opportunities, growth, and expansion."
              />
              <Card
                icon={TrendingUp}
                number="03"
                title="Strategic Growth"
                content="Developing strategies that strengthen performance, growth, and resilience."
              />
              <Card
                icon={Lightbulb}
                number="04"
                title="Innovation"
                content="Transforming ideas into solutions that drive progress and meaningful differentiation."
              />
              <Card
                icon={Crown}
                number="05"
                title="Leadership"
                content="Guiding teams with vision, purpose, accountability, and operational excellence."
              />
              <Card
                icon={Banknote}
                number="06"
                title="Investment"
                content="Building alliances and investments that accelerate growth and success."
              />
            </div>
          </ZoomIn>
        </Container>
      </Section>
    </>
  );
}
