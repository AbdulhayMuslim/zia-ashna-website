import Section from "../ui/Section";
import Container from "../ui/Container";
import ZoomIn from "../animations/ZoomIn";
import SectionTitle from "../ui/SectionTitle";
import Card from "../ui/Card";
import { ICONS } from "@/lib/icons";

export default function Activity({ data }) {
  if (!data) return null;
  return (
    <>
      <Section id="activity" className="pb-20 bg-gray-200 dark:bg-[#222]">
        <Container className="flex flex-col items-center justify-center gap-4">
          <SectionTitle title={data.sectionTitle} />
          {data.heading && <h2 className="font-heading text-3xl font-bold text-brand-primary dark:text-brand-secondary">{data.heading}</h2>}
          {data.description && <p className="max-w-3xl text-center text-text dark:text-text-dark/70">{data.description}</p>}

          {/* Cards */}
          <ZoomIn>
            <div className="pt-4 lg:pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 grid-rows-6 sm:grid-rows-3 lg:grid-rows-2 items-stretch gap-4 place-items-center">
              {data.cards.map((item) => <Card key={item.id} icon={ICONS[item.icon] || ICONS.Rocket} number={item.number} title={item.heading} content={item.description} />)}
            </div>
          </ZoomIn>
        </Container>
      </Section>
    </>
  );
}
