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
      {/* Mobile Overlay */}
      <div
        onClick={() => setSidebarOpen(false)}
        className={cn(
          "fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden",
          sidebarOpen ? "visible opacity-100" : "invisible opacity-0",
        )}
      />

      {/* Sidebar */}
      <aside
        style={{
          background: "red",
          border: "5px solid yellow",
        }}
        className={cn(
          "fixed left-0 top-0 z-50 flex h-screen w-72 flex-col",
          "transition-transform duration-300",
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        {/* Brand */}
        <div className="flex h-16 items-center justify-between border-b border-gray-200 px-6 dark:border-gray-800">
          <div>
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {cmsConfig.name}
            </h1>

            <p className="text-xs text-gray-500 dark:text-gray-400">
              {cmsConfig.description}
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-800 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Navigation */}
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
                      "flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition",
                      active
                        ? "bg-blue-600 text-heading-dark"
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

        {/* Logout */}
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
