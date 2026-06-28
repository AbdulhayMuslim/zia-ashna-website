import Image from "next/image";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import profile from "@/assets/images/profile.jpg";

import {
  GraduationCap,
  BriefcaseBusiness,
  Award,
  Building2,
} from "lucide-react";

export default function About() {
  const certifications = ["MCITP", "CCNA", "CCNP", "AWS Professional"];

  const experiences = [
    {
      title: "University Professor",
      period: "5+ Years",
      description:
        "Delivered higher education courses across Khana Noor University, Mashal University, Jahan University, and Kabul Education University.",
    },
    {
      title: "Advisor, IT Administration",
      period: "2018 — 2020",
      description:
        "Served at the National Statistics & Information Authority, providing strategic guidance for IT administration and digital initiatives.",
    },
    {
      title: "Director of Telecommunications",
      period: "2021",
      description:
        "Led telecommunications operations and development initiatives for Panjshir Province, Afghanistan.",
    },
  ];

  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionTitle title="About Me" />
          </div>

          {/* Main Profile Card */}
          <div
            className="
              relative overflow-hidden
             
            "
          >
            <div className="relative grid lg:grid-cols-2 gap-10 p-6">
              {/* Image */}
              <div className="flex justify-center">
                <div
                  className="
                    relative overflow-hidden
                    rounded-4xl
                    bg-gray-200 dark:bg-gray-800
                    max-w-md
                  "
                >
                  <Image
                    src={profile}
                    alt="Sayed Zia Ashna"
                    className="object-cover dark:opacity-90"
                    priority
                  />
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="text-brand-primary dark:text-brand-secondary font-medium mb-2 text-center lg:text-start">
                  Entrepreneur • Founder • Business Leader
                </p>

                <h3 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-heading-soft dark:text-heading-dark/80 text-center lg:text-start">
                  Sayed Zia ASHNA
                </h3>

                <p className="leading-relaxed text-text dark:text-text-dark/70 mb-8 text-center lg:text-start">
                  Sayed Zia Ashna is an entrepreneur, founder, and business
                  leader with a strong background in technology, education, and
                  digital innovation. With experience spanning academia,
                  government institutions, and private sector ventures, he has
                  dedicated his career to building impactful organizations,
                  empowering communities, and creating sustainable opportunities
                  through technology and entrepreneurship.
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-brand-primary/10 p-4 text-center">
                    <h4 className="text-2xl font-bold text-brand-primary">
                      5+
                    </h4>
                    <p className="text-xs">Years Teaching</p>
                  </div>

                  <div className="rounded-2xl bg-brand-secondary/10 p-4 text-center">
                    <h4 className="text-2xl font-bold text-brand-secondary">
                      4
                    </h4>
                    <p className="text-xs">Institutions</p>
                  </div>

                  <div className="rounded-2xl bg-brand-primary/10 p-4 text-center">
                    <h4 className="text-2xl font-bold text-brand-primary">2</h4>
                    <p className="text-xs">Degrees</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Education + Experience */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Education */}
            <div
              className="
                rounded-4xl
                border border-black/5 dark:border-white/10
                bg-white/80 dark:bg-white/5
                backdrop-blur-xl
                p-6 lg:p-8
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <GraduationCap className="text-brand-primary" />
                <h3 className="text-2xl font-bold text-heading-soft dark:text-heading-dark/80">
                  Education
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                <div className="border-l-2 border-brand-primary pl-4">
                  <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                    Master of Science (MSc) in Data Science
                  </h4>
                  <p className="text-text dark:text-text-dark/70">
                    University of East London (UEL)
                  </p>
                </div>

                <div className="border-l-2 border-brand-secondary pl-4">
                  <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                    Bachelor of Computer Science
                  </h4>
                  <p className="text-text dark:text-text-dark/70">
                    Balkh University, Afghanistan
                  </p>
                </div>

                <div className="border-l-2 border-brand-primary pl-4 flex flex-col gap-4">
                  <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                    Professional Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {certifications.map((cert) => (
                      <div
                        key={cert}
                        className="
                    flex items-center gap-2
                    rounded-full
                    px-4 py-2
                    bg-brand-primary/10
                    dark:bg-brand-secondary/10
                  "
                      >
                        <Building2 size={18} />
                        <span className="font-medium">{cert}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Experience */}
            <div
              className="
                rounded-4xl
                border border-black/5 dark:border-white/10
                bg-white/80 dark:bg-white/5
                backdrop-blur-xl
                p-6 lg:p-8
              "
            >
              <div className="flex items-center gap-3 mb-6">
                <BriefcaseBusiness className="text-brand-secondary" />
                <h3 className="text-2xl font-bold text-heading-soft dark:text-heading-dark/80">
                  Experience
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {experiences.map((item) => (
                  <div
                    key={item.title}
                    className="border-l-2 border-brand-primary pl-4"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                        {item.title}
                      </h4>

                      <span className="text-sm text-brand-primary">
                        {item.period}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-text dark:text-text-dark/70">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
