import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navigationLinks } from "@/data/navigation";
import SocialMedia from "../ui/SocialMedia";
import Image from "next/image";
import Link from "next/link";

export default function Header({ settings, socialLinks }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-clip py-3 sm:py-4">
      <Container className="px-3 sm:px-6 lg:px-8">
        <div className="flex w-full items-center gap-4">
          {settings?.logoUrl && <Link href="/" aria-label={settings.siteName || "Home"} className="hidden shrink-0 lg:block"><Image src={settings.logoUrl} alt={settings.siteName || "Site logo"} width={120} height={48} className="h-12 w-auto object-contain" priority /></Link>}
          {/* Navigation */}
          <nav
            className="
              w-full min-w-0 lg:w-auto lg:flex-1

              rounded-full
              border border-black/5 dark:border-white/10

              bg-gray-200/60 shadow-lg shadow-black/5
              dark:bg-black/30 dark:shadow-black/20

              backdrop-blur-md

              px-1.5
              sm:px-4
              py-2
              md:py-4
            "
          >
            <ul className="flex min-w-0 items-center justify-between">
              {navigationLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href} className="flex min-w-0 flex-1 lg:flex-none">
                    <a
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      className="
                        group

                        mx-auto flex items-center justify-center gap-2

                        rounded-full

                        px-1.5 sm:px-3 lg:px-4
                        py-2

                        text-sm

                        transition-all
                        duration-300

                        hover:bg-brand-primary/20

                        outline-none

                      "
                    >
                      <Icon
                        className="
                          h-5
                          w-5

                          text-brand-primary
                          dark:text-brand-secondary

                          transition-transform
                          duration-300

                          group-hover:scale-110
                        "
                      />

                      <span
                        className="
                          hidden lg:block

                          text-heading
                          dark:text-heading-dark

                          font-medium
                        "
                      >
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}

              {/* Theme Toggle */}
              <li className="flex min-w-0 flex-1 justify-center lg:flex-none">
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          <SocialMedia links={socialLinks} />
        </div>
      </Container>
    </header>
  );
}
