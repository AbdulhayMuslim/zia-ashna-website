import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import ContactForm from "../forms/ContactForm";
import SectionTitle from "../ui/SectionTitle";
import FadeLeft from "../animations/FadeLeft";
import { CheckCircle } from "lucide-react";
import Card from "../ui/Card";

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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            </p>
            <p className="pt-4 text-center text-md lg:text-start text-text dark:text-text-dark/60">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          </FadeLeft>

          {/* Steps */}
          <div className="w-full grid grid-cols-3 grid-rows-2 gap-4 place-items-center">
            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Application</h4>
            </div>

            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Evaluation</h4>
            </div>

            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Shortlising</h4>
            </div>

            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Interview</h4>
            </div>

            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Intern</h4>
            </div>

            <div className="rounded-xl bg-gray-200 dark:bg-[#222] p-4 flex flex-col justify-center items-center h-full w-full gap-2">
              <CheckCircle />
              <h4>Staff</h4>
            </div>
          </div>
        </div>

        <div className="w-full md:w-[70%] lg:w-[45%]">
          <ContactForm />
        </div>
      </Container>
    </Section>
  );
}
