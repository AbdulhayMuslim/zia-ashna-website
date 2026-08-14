"use client";

import { Menu, UserCircle2 } from "lucide-react";
import Link from "next/link";

import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AdminHeader({ setSidebarOpen }) {
  return (
    <header
      className="
        sticky
        top-0
        z-30
        h-16
        border-b
        border-gray-200
        bg-white
        dark:border-gray-700
        dark:bg-gray-800
      "
    >
      <div className="flex h-full min-w-0 items-center justify-between gap-2 px-3 sm:gap-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            aria-label="Open navigation"
            className="
              shrink-0
              rounded-lg
              p-2
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
              lg:hidden
            "
          >
            <Menu className="h-5 w-5" />
          </button>

          <Breadcrumbs />
        </div>

        {/* Right */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <ThemeToggle className="rounded-xl" />

          <Link
            href="/admin/profile"
            aria-label="Profile and account settings"
            title="Profile and account settings"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-xl
              border
              border-gray-200
              bg-gray-50
              text-gray-600
              shadow-sm
              outline-none
              transition-colors
              hover:border-brand-primary/40
              hover:bg-brand-primary/10
              hover:text-brand-primary
              focus-visible:ring-2
              focus-visible:ring-brand-primary/30
              dark:border-gray-600
              dark:bg-gray-900
              dark:text-gray-200
              dark:hover:border-brand-secondary/50
              dark:hover:bg-brand-secondary/10
              dark:hover:text-brand-secondary
              dark:focus-visible:ring-brand-secondary/30
            "
          >
            <UserCircle2 className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
