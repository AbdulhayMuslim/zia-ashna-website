import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/animations/FadeUp";
import { Rocket, GraduationCap, Handshake, Sparkles } from "lucide-react";

const journey = [
  {
    icon: Rocket,
    title: "Founded Asan Technology",
    metric: "100+ Projects",
    description:
      "Started a technology company focused on helping businesses grow through modern digital solutions, software development, and digital transformation.",
  },
  {
    icon: GraduationCap,
    title: "Educational Impact",
    metric: "1000+ Students Reached",
    description:
      "Built educational consultancy ventures dedicated to helping students discover better academic and career opportunities.",
  },
  {
    icon: Handshake,
    title: "Strategic Partnerships",
    metric: "Growing Business Network",
    description:
      "Established long-term partnerships and collaborations across industries, creating sustainable opportunities and growth.",
  },
  {
    icon: Sparkles,
    title: "Building The Future",
    metric: "Innovation & New Ventures",
    description:
      "Continuously exploring new opportunities, investing in innovation, and creating ventures that generate long-term impact.",
  },
];

export default function Achievements() {
  return (
    <Section id="achievements" className="bg-gray-200 dark:bg-[#222]">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex flex-col items-center gap-4 text-center max-w-3xl">
            <SectionTitle title="Achievements" />

            <h2 className="font-heading text-3xl lg:text-4xl font-bold text-brand-primary dark:text-brand-secondary">
              Founder Journey
            </h2>

            <p className="text-md text-text dark:text-text-dark/70">
              A path shaped by entrepreneurship, innovation, technology, and
              creating opportunities for others.
            </p>
          </div>

          {/* Timeline */}
          <div className="relative w-full max-w-5xl">
            {/* Glow */}
            <div className="absolute left-1/2 top-0 hidden h-full w-32 -translate-x-1/2 bg-brand-primary/10 blur-3xl pointer-events-none lg:block" />

            {/* Center Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.75 -translate-x-1/2 rounded-full bg-linear-to-b from-brand-primary via-brand-secondary to-brand-primary lg:block" />

            <div className="flex flex-col gap-8">
              {journey.map((item, index) => {
                const Icon = item.icon;
                const isLeft = index % 2 === 0;

                return (
                  <FadeUp key={item.title}>
                    <div
                      className={`relative flex ${
                        isLeft ? "lg:justify-start" : "lg:justify-end"
                      }`}
                    >
                      <div
                        className="
                          group
                          relative
                          w-full
                          lg:w-[44%]
                          rounded-[28px]
                          border
                          border-black/5
                          dark:border-white/10
                          bg-white/50
                          dark:bg-gray-900
                          backdrop-blur-xl
                          p-5
                          lg:p-8
                          shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                          transition-all
                          duration-300
                          hover:-translate-y-2
                          hover:scale-[1.02]
                        "
                      >
                        {/* Connector */}
                        <div
                          className={`absolute top-1/2 hidden h-0.5 w-12 bg-brand-primary/40 lg:block ${
                            isLeft ? "-right-12" : "-left-12"
                          }`}
                        />

                        <div className="mb-4 flex items-center gap-4">
                          <div
                            className="
                              flex
                              h-12
                              w-12
                              items-center
                              justify-center
                              rounded-xl
                              bg-brand-primary/10
                              dark:bg-brand-secondary/10
                            "
                          >
                            <Icon
                              size={24}
                              className="text-brand-primary dark:text-brand-secondary"
                            />
                          </div>

                          <span className="text-sm font-semibold text-brand-primary dark:text-brand-secondary">
                            {item.metric}
                          </span>
                        </div>

                        <h3 className="mb-3 text-xl lg:text-2xl font-bold text-brand-primary dark:text-brand-secondary">
                          {item.title}
                        </h3>

                        <p className="leading-relaxed text-text dark:text-text-dark/70">
                          {item.description}
                        </p>
                      </div>

                      {/* Center Node */}
                      <div
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          hidden
                          h-16
                          w-16
                          -translate-x-1/2
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-linear-to-br
                          from-brand-primary
                          to-brand-secondary
                          shadow-[0_0_40px_rgba(59,130,246,.35)]
                          lg:flex
                          z-20
                        "
                      >
                        <Icon size={28} className="text-white" />
                      </div>
                    </div>
                  </FadeUp>
                );
              })}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
