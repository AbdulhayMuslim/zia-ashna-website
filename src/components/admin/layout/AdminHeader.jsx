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
        dark:border-gray-800
        dark:bg-gray-900
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
              text-gray-600
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-700
              dark:border-gray-700
              dark:bg-gray-800
              dark:text-gray-300
            "
          >
            <UserCircle2 className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </header>
  );
}
