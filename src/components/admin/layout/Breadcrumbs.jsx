"use client";

import Link from "next/link";
import { ChevronRight, Home, MoreHorizontal } from "lucide-react";
import { usePathname } from "next/navigation";

const LABELS = {
  admin: "Dashboard",
  blog: "Blog Posts",
  categories: "Categories",
  tags: "Tags",
  create: "Create",
  media: "Media",
  profile: "Profile",
  settings: "Settings",
  hero: "Hero Section",
  about: "About Section",
  activity: "Activity Section",
  history: "History Section",
  contact: "Contact Section",
};

function titleFor(segment, index, segments) {
  if (/^\d+$/.test(segment)) return "Edit";
  if (index === segments.length - 1 && segments[index - 1] === "blog") {
    return segment === "create" ? "New Post" : "Edit Post";
  }

  return LABELS[segment] ?? segment.replaceAll("-", " ");
}

function getBreadcrumbs(pathname) {
  const segments = pathname.split("/").filter(Boolean);

  return segments.map((segment, index) => ({
    title: titleFor(segment, index, segments),
    href: `/${segments.slice(0, index + 1).join("/")}`,
  }));
}

export default function Breadcrumbs() {
  const pathname = usePathname();
  const breadcrumbs = getBreadcrumbs(pathname);
  const hasHiddenItems = breadcrumbs.length > 2;

  return (
    <nav aria-label="Breadcrumb" className="min-w-0 flex-1">
      <ol className="flex min-w-0 items-center gap-1 text-sm sm:gap-2">
        {breadcrumbs.map((item, index) => {
          const isFirst = index === 0;
          const isLast = index === breadcrumbs.length - 1;
          const hideOnMobile = !isFirst && !isLast;

          return (
            <li
              key={item.href}
              className={`${hideOnMobile ? "hidden sm:flex" : "flex"} min-w-0 items-center gap-1 sm:gap-2`}
            >
              {index > 0 && (
                <ChevronRight
                  aria-hidden="true"
                  className="h-4 w-4 shrink-0 text-text-muted"
                />
              )}

              {isLast ? (
                <span
                  aria-current="page"
                  className="max-w-32 truncate font-medium capitalize text-heading dark:text-heading-dark sm:max-w-52 lg:max-w-80"
                  title={item.title}
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  href={item.href}
                  aria-label={isFirst ? "Dashboard" : undefined}
                  className="max-w-32 truncate text-text transition-colors hover:text-brand-primary dark:text-text-dark sm:max-w-44"
                  title={item.title}
                >
                  {isFirst ? (
                    <span className="flex items-center gap-1.5">
                      <Home aria-hidden="true" className="h-4 w-4 shrink-0" />
                      <span className="hidden md:inline">{item.title}</span>
                    </span>
                  ) : (
                    item.title
                  )}
                </Link>
              )}

              {isFirst && hasHiddenItems && (
                <span className="flex items-center gap-1 sm:hidden">
                  <ChevronRight
                    aria-hidden="true"
                    className="h-4 w-4 shrink-0 text-text-muted"
                  />
                  <MoreHorizontal
                    aria-label="Intermediate pages omitted"
                    className="h-4 w-4 shrink-0 text-text-muted"
                  />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
