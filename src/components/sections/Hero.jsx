import Section from "../ui/Section";
import Container from "../ui/Container";
import Button from "@/components/ui/Button";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import asantech from "@/assets/images/asantech logo.png";
import tawangar from "@/assets/images/tawangar logo.png";
import hamkar from "@/assets/images/hamkar logo.png";
import FadeLeft from "../animations/FadeLeft";
import zia from "@/assets/images/zia ashna.webp";
import { ArrowRight } from "lucide-react";
import FadeUp from "../animations/FadeUp";
import ZoomIn from "../animations/ZoomIn";
import FadeRight from "../animations/FadeRight";

export default function Hero() {
  return (
    <Section id="home" className="dark:bg-[#222] pt-23 md:pt-25">
      <Container>
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Section */}
          <div className="flex flex-col gap-4 lg:gap-6 justify-center items-center lg:items-start lg:pl-10 lg:w-[50%]">
            <SectionTitle title="Entrepreneur | Founder" />

            <FadeLeft>
              <h1 className="text-brand-primary dark:text-brand-secondary text-5xl lg:text-6xl text-center lg:text-start font-bold leading-tight">
                Sayed Zia Ashna
              </h1>
            </FadeLeft>

            <FadeLeft delay={0.2}>
              <p className="text-center text-md lg:text-start text-text dark:text-text-dark/60">
                Co-Founder @ Asan Technology, Tawangar Educational Consultancy
                and Hamkar Educational Consultancy.
              </p>
            </FadeLeft>

            <FadeUp>
              <Button href="#contact" label="Get In Touch" icon={ArrowRight} />
            </FadeUp>

            <ZoomIn className="flex justify-center lg:justify-start">
              <div className="grid grid-cols-1 xsm:grid-cols-2 grid-rows-4 xsm:grid-rows-2 place-items-center gap-4 mt-4 md:w-[80%]">
                <a
                  href="https://asantech.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4
              bg-bg dark:bg-gray-600 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-2 duration-300"
                >
                  <Image src={asantech} alt="Asan Tech Logo" />
                </a>

                <a
                  href="https://tawangar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4
              bg-bg dark:bg-gray-600 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-2 duration-300"
                >
                  <Image src={tawangar} alt="Tawangar Logo" />
                </a>

                <a
                  href="https://hamkar.edu.af/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4
              bg-bg dark:bg-gray-600 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-2 duration-300"
                >
                  <Image src={hamkar} alt="Hamkar Logo" />
                </a>

                <a
                  href="https://asantech.net/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center p-4
              bg-bg dark:bg-gray-600 rounded-xl shadow-[0_0_30px_rgba(0,0,0,0.12)]
              hover:-translate-y-2 duration-300"
                >
                  <Image src={asantech} alt="asan tech logo" />
                </a>
              </div>
            </ZoomIn>
          </div>

          {/* Right Section */}
          <div className="lg:w-[50%] flex items-center justify-center lg:justify-end -mb-10">
            <FadeRight className="flex justify-center lg:justify-end">
              <Image
                src={zia}
                alt="Sayed Zia Ashna Image"
                className="w-[90%]"
              />
            </FadeRight>
          </div>
        </div>
      </Container>
    </Section>
  );
}
