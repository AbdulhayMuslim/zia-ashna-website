"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { adminNav } from "@/data/admin-nav";

export default function Breadcrumbs() {
  const pathname = usePathname();

  const currentItem = adminNav.find(
    (item) =>
      pathname === item.href ||
      (item.href !== "/admin" && pathname.startsWith(item.href)),
  );

  const breadcrumbs = [
    {
      title: "Dashboard",
      href: "/admin",
    },
  ];

  if (currentItem && currentItem.href !== "/admin") {
    breadcrumbs.push({
      title: currentItem.title,
      href: currentItem.href,
    });
  }

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-sm">
      {breadcrumbs.map((item, index) => {
        const isLast = index === breadcrumbs.length - 1;

        return (
          <div key={item.href} className="flex items-center gap-2">
            {isLast ? (
              <span className="font-medium text-gray-900 dark:text-gray-100">
                {item.title}
              </span>
            ) : (
              <Link
                href={item.href}
                className="text-gray-500 transition-colors hover:text-brand-primary"
              >
                {item.title}
              </Link>
            )}

            {!isLast && <ChevronRight className="h-4 w-4 text-gray-400" />}
          </div>
        );
      })}
    </nav>
  );
}
