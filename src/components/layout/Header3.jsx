import Image from "next/image";
import Link from "next/link";

import Container from "@/components/ui/Container";
import SocialMedia from "../ui/SocialMedia";
import ActiveNavigation from "./ActiveNavigation";

export default function Header({ settings, socialLinks }) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 overflow-x-clip py-3 sm:py-4">
      <Container className="px-3 sm:px-6 lg:px-8">
        <div className="flex w-full items-center gap-4">
          {/* Logo */}
          {settings?.logoUrl && (
            <Link
              href="/"
              aria-label={settings.siteName || "Home"}
              className="hidden shrink-0 lg:block"
            >
              <Image
                src={settings.logoUrl}
                alt={settings.siteName || "Site logo"}
                width={120}
                height={48}
                className="h-12 w-auto object-contain"
                priority
              />
            </Link>
          )}

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
            <ActiveNavigation />
          </nav>

          {/* Social Media */}
          <SocialMedia links={socialLinks} />
        </div>
      </Container>
    </header>
  );
}
