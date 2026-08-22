import Image from "next/image";

import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";

import {
  GraduationCap,
  BriefcaseBusiness,
  Building2,
} from "lucide-react";

export default function About({ data }) {
  if (!data) return null;

  return (
    <Section id="about">
      <Container>
        <div className="flex flex-col gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center">
            <SectionTitle title={data.sectionTitle} />
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
                  {data.imageUrl && <Image
                    src={data.imageUrl}
                    alt={data.heading}
                    width={700}
                    height={800}
                    className="h-auto w-full object-cover dark:opacity-90"
                    priority
                  />}
                </div>
              </div>

              {/* Content */}
              <div className="flex flex-col justify-center">
                <p className="text-brand-primary dark:text-brand-secondary font-medium mb-2 text-center lg:text-start">
                  {data.role}
                </p>

                <h3 className="font-heading text-4xl lg:text-5xl font-bold mb-6 text-heading-soft dark:text-heading-dark/80 text-center lg:text-start">
                  {data.heading}
                </h3>

                <p className="leading-relaxed text-text dark:text-text-dark/70 mb-8 text-center lg:text-start">
                  {data.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  {data.experiences.map((item, index) => (
                    <div key={item.id} className={`rounded-2xl p-4 text-center ${index % 2 ? "bg-brand-secondary/10" : "bg-brand-primary/10"}`}>
                      <h4 className={`text-2xl font-bold ${index % 2 ? "text-brand-secondary" : "text-brand-primary"}`}>{item.number}</h4>
                      <p className="text-xs">{item.title}</p>
                    </div>
                  ))}
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
                {data.education.map((item, index) => (
                  <div key={item.id} className={`border-l-2 pl-4 ${index % 2 ? "border-brand-secondary" : "border-brand-primary"}`}>
                    <div className="mb-2 flex items-center justify-between gap-4"><h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">{item.degree}</h4><p className="text-sm text-brand-primary">{item.year}</p></div>
                    <p className="text-text dark:text-text-dark/70">{item.institution}</p>
                  </div>
                ))}

                <div className="border-l-2 border-brand-primary pl-4 flex flex-col gap-4">
                  <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                    Professional Certifications
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {data.certificates.map((certificate) => (
                      <div
                        key={certificate.id}
                        className="
                    flex items-center gap-2
                    rounded-full
                    px-4 py-2
                    bg-brand-primary/10
                    dark:bg-brand-secondary/10
                  "
                      >
                        <Building2 size={18} />
                        <span className="font-medium">{certificate.name}</span>
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
                {data.jobExperiences.map((item) => (
                  <div
                    key={item.id}
                    className="border-l-2 border-brand-primary pl-4"
                  >
                    <div className="flex items-center justify-between gap-4 mb-2">
                      <h4 className="font-semibold text-heading-soft dark:text-heading-dark/90">
                        {item.role}
                      </h4>

                      <span className="text-sm text-brand-primary">
                        {item.year}
                      </span>
                    </div>

                    <p className="leading-relaxed text-text dark:text-text-dark/70">
                      {item.institution}
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
