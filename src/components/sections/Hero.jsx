import Section from "../ui/Section";
import Container from "../ui/Container";
import Button from "@/components/ui/Button";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import FadeLeft from "../animations/FadeLeft";
import { ArrowRight } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import ZoomIn from "../animations/ZoomIn";
import FadeRight from "../animations/FadeRight";

export default function Hero({ data }) {
  if (!data) return null;
  const nameParts = data.name.trim().split(/\s+/);
  const lastName = nameParts.pop();

  return (
    <Section
      id="home"
      className="relative bg-gray-200 dark:bg-[#222] pt-23 md:pt-25"
    >
      <div className="opacity-70 dark:opacity-10 absolute top-0 left-0 h-full w-full bg-[url('/images/herobg.png')] bg-cover bg-center bg-no-repeat" />
      <Container className="relative">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center lg:items-start lg:pl-10 lg:w-[50%]">
            <SectionTitle title={data.sectionTitle} />

            <FadeLeft>
              <h1 className="text-heading-soft dark:text-heading-dark/80 text-5xl lg:text-6xl text-center lg:text-start font-bold leading-tight">
                {nameParts.join(" ")}{" "}
                <span className="text-brand-primary dark:text-brand-secondary">
                  {lastName}
                </span>
              </h1>
            </FadeLeft>

            <FadeLeft delay={0.2}>
              <p className="text-center text-md lg:text-start text-text dark:text-text-dark/60">
                {data.description}
              </p>
            </FadeLeft>

            <FadeUp>
              <Button href={data.buttonUrl || "#contact"} label={data.buttonLabel} icon={ArrowRight} />
            </FadeUp>

            <ZoomIn className="flex justify-center lg:justify-start">
              <div className="grid grid-cols-1 xsm:grid-cols-2 grid-rows-4 xsm:grid-rows-2 place-items-center gap-4 mt-4 md:w-[80%]">
                {data.logos.map((logo) => (
                  <a key={logo.id} href={logo.linkUrl || "#"} target={logo.linkUrl ? "_blank" : undefined} rel={logo.linkUrl ? "noopener noreferrer" : undefined} className="flex items-center justify-center rounded-xl bg-bg p-4 shadow-[0_0_30px_rgba(0,0,0,0.12)] duration-300 hover:-translate-y-2 dark:bg-gray-600">
                    <Image src={logo.imageUrl} alt={`${logo.name} logo`} width={180} height={80} className="h-16 w-auto object-contain" />
                  </a>
                ))}
              </div>
            </ZoomIn>
          </div>

          {/* Right Section */}
          <div className="lg:w-[50%] flex items-center justify-center lg:justify-end -mb-10">
            <FadeRight className="flex justify-center lg:justify-end">
              {data.heroImageUrl && <Image src={data.heroImageUrl} alt={data.name} width={800} height={900} priority className="h-auto w-[90%]" />}
            </FadeRight>
          </div>
        </div>
      </Container>
    </Section>
  );
}
