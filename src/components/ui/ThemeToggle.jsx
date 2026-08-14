"use client";

import cn from "@/utils/cn";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle({ className }) {
  const { resolvedTheme, setTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className={cn(
        "flex h-10 w-10 items-center justify-center border border-gray-200 bg-gray-50 text-gray-600 shadow-sm outline-none transition-colors",
        "hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-brand-primary",
        "focus-visible:ring-2 focus-visible:ring-brand-primary/30",
        "dark:border-gray-600 dark:bg-gray-900 dark:text-gray-200",
        "dark:hover:border-brand-secondary/50 dark:hover:bg-brand-secondary/10 dark:hover:text-brand-secondary",
        "dark:focus-visible:ring-brand-secondary/30",
        className,
      )}
      aria-label="Toggle theme"
      title="Toggle color theme"
    >
      <Sun className="hidden h-5 w-5 dark:block" />
      <Moon className="h-5 w-5 dark:hidden" />
    </button>
  );
}
