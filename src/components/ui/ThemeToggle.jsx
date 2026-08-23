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
        "flex h-10 w-10 items-center justify-center border border-gray-300 bg-transparent text-gray-600 shadow-sm outline-none transition-colors rounded-xl",
        "hover:border-brand-primary/40 hover:bg-brand-primary/10 hover:text-brand-primary",
        "dark:border-gray-600 dark:bg-gray-800 dark:text-orange-400",
        "dark:hover:border-brand-secondary/50 dark:hover:bg-brand-secondary/10 dark:hover:text-brand-secondary",
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
