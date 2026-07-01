import Container from "@/components/ui/Container";
import ThemeToggle from "@/components/ui/ThemeToggle";
import { navigationLinks } from "@/data/navigation";

import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
} from "react-icons/fa6";

export default function Header() {
  return (
    <header className="fixed top-0 left-0 z-50 w-full py-4">
      <Container>
        <div className="flex items-center justify-between gap-4">
          {/* Navigation */}
          <nav
            className="
              flex-1

              rounded-full
              border border-black/5 dark:border-white/10

              bg-gray-200/60
              dark:bg-black/30

              backdrop-blur-sm

              px-2
              xsm:px-4
              py-2
              md:py-4
            "
          >
            <ul className="flex items-center justify-between">
              {navigationLinks.map((item) => {
                const Icon = item.icon;

                return (
                  <li key={item.href}>
                    <a
                      href={item.href}
                      aria-label={item.label}
                      title={item.label}
                      className="
                        group

                        flex items-center gap-2

                        rounded-full

                        px-2 lg:px-4
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
              <li>
                <ThemeToggle />
              </li>
            </ul>
          </nav>

          {/* Social Links */}
          <div
            className="
              hidden lg:flex

              items-center
              gap-4

              rounded-full

              border border-black/5
              dark:border-white/10

              bg-gray-200/60
              dark:bg-black/30

              backdrop-blur-sm

              px-5
              py-3
              md:py-4
            "
          >
            <a href="#" target="_blank" rel="noreferrer">
              <FaFacebook className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-110 duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaInstagram className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-110 duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaLinkedin className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-110 duration-300" />
            </a>

            <a href="#" target="_blank" rel="noreferrer">
              <FaXTwitter className="text-gray-400 hover:text-brand-primary dark:hover:text-brand-secondary hover:scale-110 duration-300" />
            </a>
          </div>
        </div>
      </Container>
    </header>
  );
}
