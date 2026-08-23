import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ContactForm from "../forms/ContactForm";
import SectionTitle from "../ui/SectionTitle";
import FadeLeft from "../animations/FadeLeft";
import { ICONS } from "@/lib/icons";
import ZoomIn from "../animations/ZoomIn";

export default function Contact({ data }) {
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

          {data.addresses?.length > 0 && (
            <div className="grid w-full gap-3 sm:grid-cols-2">
              {data.addresses.map((address) => {
                const Icon = ICONS[address.icon] || ICONS.MapPin;
                const content = (
                  <>
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-brand-primary/10 text-brand-primary dark:text-brand-secondary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-xs font-medium uppercase tracking-wide text-text-muted dark:text-text-muted-dark">{address.label}</span>
                      <span className="mt-1 block break-words text-sm font-medium text-heading dark:text-heading-dark">{address.value}</span>
                    </span>
                  </>
                );
                const className = "flex min-w-0 items-center gap-3 rounded-2xl border border-brand-primary/10 bg-card/80 p-3.5 text-start shadow-sm transition dark:border-white/10 dark:bg-white/5";
                return address.linkUrl ? (
                  <a key={address.id} href={address.linkUrl} className={`${className} hover:-translate-y-0.5 hover:border-brand-primary/30 hover:shadow-md`}>{content}</a>
                ) : (
                  <div key={address.id} className={className}>{content}</div>
                );
              })}
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
