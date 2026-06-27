import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "../ui/SectionTitle";
import Image from "next/image";
import asantech from "@/assets/images/asantech logo.png";
import tawangar from "@/assets/images/tawangar logo.png";
import hamkar from "@/assets/images/hamkar logo.png";
import VentureCard from "../ui/VentureCard";
import FadeRight from "../animations/FadeRight";

export default function Ventures() {
  return (
    <Section id="ventures" className="bg-sky-700 dark:bg-[#201336] pb-15">
      <Container className="flex flex-col gap-4 items-center justify-center">
        <SectionTitle
          title="My Ventures"
          className="bg-gray-200 dark:bg-bg-dark"
        />

        <FadeRight>
          <div className="grid grid-cols-1 lg:grid-cols-3 grid-rows-3 lg:grid-rows-1 pt-10 gap-4 place-items-center items-stretch">
            <VentureCard
              image={asantech}
              href="https://asantech.net/"
              title="Asan Technology"
              text="Asan Technology is a Kabul based IT company established in 2018
              that focuses on helping businesses grow through modern digital
              solutions. The company provides a wide range of services including
              web and mobile application development, custom software solutions,
              hosting, domain registration, digital marketing, and branding.
              With a strong focus on small and medium sized businesses in
              Afghanistan, AsanTech aims to deliver practical, scalable, and
              reliable technology services that support digital transformation
              and online growth."
            />

            <VentureCard
              image={tawangar}
              href="https://tawangar.com/"
              title="Tawangar Educational Consultancy"
              text="Tawangar is an emerging digital platform designed to provide
              modern web based services and solutions for businesses and
              individuals. The platform focuses on creating accessible and
              efficient digital experiences while supporting clients with
              technology driven tools that improve online presence and
              operational efficiency. Through its services, Tawangar aims to
              contribute to the growing digital ecosystem by offering
              streamlined solutions tailored to contemporary business needs."
            />

            <VentureCard
              image={hamkar}
              href="https://hamkar.edu.af/"
              title="Hamkar Educational Consultancy"
              text="Hamkar Education is an Afghan educational institution dedicated to
              improving access to quality learning opportunities and academic
              development. The platform focuses on delivering structured
              educational programs, training resources, and skill building
              opportunities for students and professionals. With an emphasis on
              practical knowledge and capacity building, Hamkar Education works
              to empower learners and support workforce development in
              Afghanistan."
            />
          </div>
        </FadeRight>
      </Container>
    </Section>
  );
}
