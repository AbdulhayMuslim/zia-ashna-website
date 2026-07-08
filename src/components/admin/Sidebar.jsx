"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { adminNavigation } from "@/config/adminNavigation";

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 h-screen border-r bg-white p-5">
      {/* Logo */}
      <h1 className="mb-10 text-2xl font-bold">CMS</h1>

      {adminNavigation.map((section) => (
        <div key={section.title} className="mb-8">
          <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-gray-500">
            {section.title}
          </h2>

          <ul className="space-y-1">
            {section.items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`block rounded-lg px-3 py-2 transition-colors ${
                    pathname === item.href
                      ? "bg-brand-primary dark:bg-gray-800 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </aside>
  );
}
