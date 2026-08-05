"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminNav } from "@/data/admin-nav";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/admin",
    },
  ];

  const currentSection = adminNav.find(
    (item) => item.href !== "/admin" && pathname.startsWith(item.href),
  );

  if (currentSection) {
    breadcrumbs.push({
      title: currentSection.title,
      href: currentSection.href,
    });
  }

  // Blog Create Page
  if (pathname === "/admin/blog/create") {
    breadcrumbs.push({
      title: "New Post",
      href: pathname,
    });
  }

  // Blog Edit Page
  else if (
    pathname.startsWith("/admin/blog/") &&
    pathname !== "/admin/blog" &&
    pathname !== "/admin/blog/create"
  ) {
    breadcrumbs.push({
      title: "Edit Post",
      href: pathname,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.href} className="flex items-center gap-2">
            {isLast ? (
              <span className="font-medium text-heading dark:text-heading-dark">
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-text hover:text-brand-primary transition-colors"
              >
                {item.title}
              </Link>
            )}

            {!isLast && <ChevronRight className="h-4 w-4 text-text-muted" />}
          </div>
        );
      })}
    </nav>
  );
}
