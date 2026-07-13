"use client";

import { Menu, Search, UserCircle2 } from "lucide-react";

import Breadcrumbs from "./Breadcrumbs";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function AdminHeader({ setSidebarOpen }) {
  return (
    <header
      className="
    sticky
    top-0
    z-20
    h-16
    border-b
    border-gray-300
    bg-gray-50
    dark:bg-gray-800
    dark:border-gray-700
  "
    >
      <div className="flex h-full items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left Side */}
        <div className="flex items-center gap-4">
          {/* Mobile Sidebar Button */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="
              rounded-lg
              p-2
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
              lg:hidden
            "
            aria-label="Open sidebar"
          >
            <Menu className="h-5 w-5" />
          </button>

          <Breadcrumbs />
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3">
          {/* Desktop Search */}
          <div className="relative hidden lg:block">
            <Search
              className="
                pointer-events-none
                absolute
                left-3
                top-1/2
                h-4
                w-4
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="search"
              placeholder="Search..."
              className="
                h-10
                w-64
                rounded-xl
                border
                border-gray-200
                bg-gary-50
                pl-10
                pr-4
                text-sm
                text-gray-900
                outline-none
                transition
                placeholder:text-gray-400
                focus:border-brand-primary
                dark:border-gray-700
                dark:bg-gray-900
                dark:text-gray-100
              "
            />
          </div>

          {/* Mobile Search */}
          <button
            type="button"
            className="
              rounded-lg
              p-2
              transition
              hover:bg-gray-100
              dark:hover:bg-gray-800
              lg:hidden
            "
            aria-label="Search"
          >
            <Search className="h-5 w-5" />
          </button>

          <ThemeToggle />

          {/* User Menu */}
          <button
            type="button"
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-gray-200
              bg-gray-50
              text-gray-600
              transition
              hover:bg-gray-100
              dark:border-gray-700
              dark:bg-gray-900
              dark:text-gray-300
              dark:hover:bg-gray-800
            "
            aria-label="User menu"
          >
            <UserCircle2 className="h-6 w-6" />
          </button>
        </div>
      </div>
    </header>
  );
}
