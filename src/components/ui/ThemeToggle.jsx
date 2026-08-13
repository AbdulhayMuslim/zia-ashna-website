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
        "outline-none px-1.5 py-1 rounded-full border border-brand-primary/30 dark:border-gray-700 shadow-sm",
        className,
      )}
      aria-label="Toggle theme"
    >
      <Sun className="hidden h-5 w-5 text-yellow-500 dark:block sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
      <Moon className="h-5 w-5 text-gray-400 dark:hidden sm:h-6 sm:w-6 lg:h-7 lg:w-7" />
    </button>
  );
}
