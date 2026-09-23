import Section from "@/components/ui/Section";
import Container from "@/components/ui/Container";
import SectionTitle from "@/components/ui/SectionTitle";
import FadeUp from "@/components/animations/FadeUp";
import { ICONS } from "@/lib/icons";

export default function History({ data }) {
  if (!data) return null;

  return (
    <Section id="history">
      <Container>
        <div className="flex flex-col items-center gap-12 lg:gap-16">
          {/* Header */}
          <div className="flex max-w-3xl flex-col items-center gap-4 text-center">
            <SectionTitle title={data.sectionTitle} />

            <h2 className="font-heading text-3xl font-bold text-brand-primary dark:text-brand-secondary lg:text-4xl">
              {data.heading}
            </h2>

            <p className="text-md text-text dark:text-text-dark/70">
              {data.description}
            </p>
          </div>

          {/* Timeline */}
          <div className="relative w-full max-w-5xl">
            {/* Glow */}
            <div className="pointer-events-none absolute left-1/2 top-0 hidden h-full w-32 -translate-x-1/2 bg-brand-primary/10 blur-3xl lg:block" />

            {/* Center Line */}
            <div className="absolute left-1/2 top-0 hidden h-full w-0.5 -translate-x-1/2 rounded-full bg-brand-primary lg:block" />

            <div className="flex flex-col gap-10">
              {data.cards.map((item, index) => {
                const Icon = ICONS[item.icon] || ICONS.Rocket;
                const isLeft = index % 2 === 0;

                return (
                  <FadeUp key={item.id}>
                    <div className="relative flex w-full items-center">
                      {/* Desktop Timeline Layout */}
                      <div
                        className={`hidden w-full items-center justify-between lg:flex ${
                          isLeft ? "flex-row" : "flex-row-reverse"
                        }`}
                      >
                        {/* Timeline Card */}
                        <div className="relative w-[44%]">
                          {/* Connector */}
                          <div
                            className={`absolute top-1/2 hidden h-0.5 w-12 -translate-y-1/2 bg-brand-primary/40 lg:block ${
                              isLeft ? "-right-12" : "-left-12"
                            }`}
                          />

                          <div
                            className="
                              group
                              relative
                              rounded-[28px]
                              border
                              border-black/5
                              bg-white/50
                              p-5
                              shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                              backdrop-blur-xl
                              transition-all
                              duration-300
                              hover:-translate-y-2
                              hover:scale-[1.02]
                              dark:border-white/10
                              dark:bg-gray-900
                            "
                          >
                            {/* Card Header */}
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
                                {item.number}
                              </span>
                            </div>

                            {/* Description */}
                            <p className="leading-relaxed text-text dark:text-text-dark/70">
                              {item.description}
                            </p>
                          </div>
                        </div>

                        {/* Outlined Montserrat Title */}
                        <div
                          className={`flex w-[44%] items-center ${
                            isLeft
                              ? "justify-start pl-8"
                              : "justify-end pr-8 text-right"
                          }`}
                        >
                          <h3
                            className="
    [font-family:var(--font-montserrat)]
    text-2xl
    font-extrabold
    uppercase
    leading-tight
    tracking-wide
    text-brand-primary
    dark:text-brand-secondary
  "
                          >
                            {item.heading}
                          </h3>
                        </div>
                      </div>

                      {/* Mobile Timeline Card */}
                      <div className="relative w-full lg:hidden">
                        <div
                          className="
                            group
                            relative
                            rounded-[28px]
                            border
                            border-black/5
                            bg-white/50
                            p-5
                            shadow-[0_10px_40px_rgba(0,0,0,0.06)]
                            backdrop-blur-xl
                            transition-all
                            duration-300
                            hover:-translate-y-2
                            hover:scale-[1.02]
                            dark:border-white/10
                            dark:bg-gray-900
                          "
                        >
                          {/* Card Header */}
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
                              {item.number}
                            </span>
                          </div>

                          {/* Mobile Title */}
                          <h3 className="mb-3 font-heading text-xl font-bold text-brand-primary dark:text-brand-secondary">
                            {item.heading}
                          </h3>

                          {/* Description */}
                          <p className="leading-relaxed text-text dark:text-text-dark/70">
                            {item.description}
                          </p>
                        </div>
                      </div>

                      {/* Center Node */}
                      <div
                        className="
                          absolute
                          left-1/2
                          top-1/2
                          z-20
                          hidden
                          h-10
                          w-10
                          -translate-x-1/2
                          -translate-y-1/2
                          items-center
                          justify-center
                          rounded-full
                          bg-brand-primary
                          shadow-[0_0_30px_rgba(59,130,246,.25)]
                          lg:flex
                        "
                      >
                        <Icon size={20} className="text-white" />
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
