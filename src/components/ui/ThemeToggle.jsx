"use client";

import cn from "@/utils/cn";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle({ className }) {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className={cn(
        "outline-none px-1.5 py-1 rounded-full border border-brand-primary/30 dark:border-gray-700 shadow-sm",
        className,
      )}
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:-w-7 text-yellow-500" />
      ) : (
        <Moon className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:-w-7 text-gray-400" />
      )}
    </button>
  );
}
