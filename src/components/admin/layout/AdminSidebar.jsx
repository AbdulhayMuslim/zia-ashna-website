"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, LogOut } from "lucide-react";

import { adminNav, cmsConfig } from "@/data/admin-nav";
import cn from "@/utils/cn";

export default function AdminSidebar({ sidebarOpen, setSidebarOpen }) {
  const pathname = usePathname();

  return (
    <>
      {/* Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/50 transition-opacity lg:hidden",
          sidebarOpen ? "opacity-100 visible" : "opacity-0 invisible",
        )}
      />

      <aside
        className={cn(
          "fixed left-0 top-0 z-50",
          "flex h-screen w-72 flex-col",
          "border-r border-gray-200",
          "bg-white dark:border-gray-800 dark:bg-gray-900",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Logo Area */}
        <div className="border-b border-gray-200 px-6 py-5 dark:border-gray-800">
          <h1 className="text-xl font-bold text-gray-900 dark:text-white">
            {cmsConfig.name}
          </h1>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            {cmsConfig.description}
          </p>

          <button
            onClick={() => setSidebarOpen(false)}
            className="
              absolute
              right-4
              top-4
              rounded-lg
              p-2
              hover:bg-gray-100
              dark:hover:bg-gray-800
              lg:hidden
            "
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {adminNav.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all",
                      active
                        ? "bg-brand-primary text-white"
                        : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Footer */}
        <div className="border-t border-gray-200 p-4 dark:border-gray-800">
          <button
            className="
              flex
              w-full
              items-center
              gap-3
              rounded-xl
              px-4
              py-3
              text-sm
              font-medium
              text-gray-700
              transition
              hover:bg-gray-100
              dark:text-gray-300
              dark:hover:bg-gray-800
            "
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>
    </>
  );
}
