import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ContactForm from "../forms/ContactForm";
import SectionTitle from "../ui/SectionTitle";
import FadeLeft from "../animations/FadeLeft";
import { ICONS } from "@/lib/icons";
import ZoomIn from "../animations/ZoomIn";

export default function Contact({ data, settings }) {
  if (!data) return null;
  return (
    <Section id="contact">
      <Container className="flex flex-col lg:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col items-center lg:items-start gap-6 lg:pr-10 lg:w-[55%]">
          <SectionTitle
            title={data.sectionTitle}
            className="text-center lg:text-start"
          />
          <h3 className="text-3xl font-semibold text-center lg:text-start text-brand-primary dark:text-brand-secondary">
            {data.heading}
          </h3>

          <FadeLeft delay={0.2}>
            <p className="text-center text-md lg:text-start text-text dark:text-text-dark/60">
              {data.description}
            </p>
          </FadeLeft>

          {(settings?.contactEmail || settings?.phone || settings?.address) && (
            <div className="flex flex-wrap justify-center gap-3 text-sm text-text dark:text-text-dark lg:justify-start">
              {settings.contactEmail && <a href={`mailto:${settings.contactEmail}`} className="rounded-full bg-brand-primary/10 px-3 py-2 hover:text-brand-primary">{settings.contactEmail}</a>}
              {settings.phone && <a href={`tel:${settings.phone}`} className="rounded-full bg-brand-primary/10 px-3 py-2 hover:text-brand-primary">{settings.phone}</a>}
              {settings.address && <span className="rounded-full bg-brand-primary/10 px-3 py-2">{settings.address}</span>}
            </div>
          )}

          {/* Steps */}
          <ZoomIn className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
              {data.cards.map((item) => {
                const Icon = ICONS[item.icon] || ICONS.CheckCircle;
                return <div key={item.id} className="flex h-full w-full flex-col items-center justify-center gap-2 rounded-xl bg-brand-primary/10 p-4 text-brand-primary"><Icon /><h4>{item.title}</h4></div>;
              })}
            </div>
          </ZoomIn>
        </div>

        <div className="w-full md:w-[70%] lg:w-[45%]">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
