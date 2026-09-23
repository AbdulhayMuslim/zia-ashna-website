"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { navigationLinks } from "@/data/navigation";
import ThemeToggle from "../ui/ThemeToggle";

export default function ActiveNavigation() {
  const [activeSection, setActiveSection] = useState("home");

  const getSectionId = (href) => {
    if (href.startsWith("/#")) {
      return href.substring(2);
    }

    if (href.startsWith("#")) {
      return href.substring(1);
    }

    return null;
  };

  useEffect(() => {
    const sections = navigationLinks
      .map((item) => {
        const sectionId = getSectionId(item.href);

        if (!sectionId) {
          return null;
        }

        const element = document.getElementById(sectionId);

        if (!element) {
          return null;
        }

        return {
          id: sectionId,
          element,
        };
      })
      .filter(Boolean);

    if (!sections.length) {
      return;
    }

    const updateActiveSection = () => {
      const scrollPosition = window.scrollY;
      const headerOffset = 140;

      const firstSection = sections[0];

      const firstSectionTop =
        firstSection.element.getBoundingClientRect().top + window.scrollY;

      if (scrollPosition + headerOffset < firstSectionTop) {
        setActiveSection("home");
        return;
      }

      let currentSection = firstSection.id;

      for (const section of sections) {
        const sectionTop =
          section.element.getBoundingClientRect().top + window.scrollY;

        if (scrollPosition + headerOffset >= sectionTop) {
          currentSection = section.id;
        }
      }

      setActiveSection(currentSection);
    };

    updateActiveSection();

    window.addEventListener("scroll", updateActiveSection, {
      passive: true,
    });

    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return (
    <ul className="flex min-w-0 items-center justify-between">
      {navigationLinks.map((item) => {
        const Icon = item.icon;

        const sectionId = item.href === "/" ? "home" : getSectionId(item.href);

        const isActive = sectionId === activeSection;

        return (
          <li key={item.href} className="flex min-w-0 flex-1 lg:flex-none">
            <Link
              href={item.href}
              aria-label={item.label}
              title={item.label}
              className="
                group relative mx-auto flex items-center
                justify-center gap-2 rounded-full
                px-1.5 py-2 sm:px-3 lg:px-4
                text-sm outline-none
              "
            >
              {/* Animated Active Background */}
              {isActive && (
                <motion.span
                  layoutId="active-navigation-background"
                  className="
                    absolute inset-0 -z-10
                    rounded-full
                    bg-brand-primary/20
                  "
                  transition={{
                    type: "spring",
                    stiffness: 450,
                    damping: 32,
                    mass: 0.7,
                  }}
                />
              )}

              {/* Hover Background */}
              {!isActive && (
                <span
                  className="
                    absolute inset-0 -z-10
                    rounded-full
                    bg-transparent
                    transition-colors duration-300
                    group-hover:bg-brand-primary/20
                  "
                />
              )}

              <Icon
                className="
                  relative z-10 h-5 w-5
                  text-brand-primary
                  dark:text-brand-secondary
                  transition-transform duration-300
                  group-hover:scale-110
                "
              />

              <span
                className="
                  relative z-10 hidden
                  font-medium
                  text-heading
                  dark:text-heading-dark
                  lg:block
                "
              >
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}

      {/* Theme Toggle */}
      <li className="flex min-w-0 flex-1 justify-center lg:flex-none">
        <ThemeToggle />
      </li>
    </ul>
  );
}
