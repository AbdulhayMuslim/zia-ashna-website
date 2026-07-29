import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ContactForm from "../forms/ContactForm";
import SectionTitle from "../ui/SectionTitle";
import FadeLeft from "../animations/FadeLeft";
import { CheckCircle } from "lucide-react";
import ZoomIn from "../animations/ZoomIn";

export default function Contact() {
  return (
    <Section id="contact">
      <Container className="flex flex-col lg:flex-row items-center gap-6 justify-between">
        <div className="flex flex-col items-center lg:items-start gap-6 lg:pr-10 lg:w-[55%]">
          <SectionTitle
            title="You Want To Work With Us?"
            className="text-center lg:text-start"
          />
          <h3 className="text-3xl font-semibold text-center lg:text-start text-brand-primary dark:text-brand-secondary">
            Recruitment Process
          </h3>

          <FadeLeft delay={0.2}>
            <p className="text-center text-md lg:text-start text-text dark:text-text-dark/60">
              Our recruitment process is simple, transparent, and designed to
              help us find the right talent while providing a smooth experience
              for every candidate.
            </p>
          </FadeLeft>

          {/* Steps */}
          <ZoomIn className="w-full">
            <div className="w-full grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Application</h4>
              </div>

              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Evaluation</h4>
              </div>

              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Shortlising</h4>
              </div>

              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Interview</h4>
              </div>

              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Internship</h4>
              </div>

              <div className="rounded-xl bg-brand-primary/10 text-brand-primary p-4 flex flex-col justify-center items-center h-full w-full gap-2">
                <CheckCircle />
                <h4 className="text-brand-primary">Staff</h4>
              </div>
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
