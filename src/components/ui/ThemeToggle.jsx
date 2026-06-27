"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);

  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="bg-gray-200 dark:bg-gray-800 outline-none px-1.5 py-1 rounded-full border border-gray-300 dark:border-gray-700 shadow-sm"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:-w-7 text-yellow-500" />
      ) : (
        <Moon className="h-5 sm:h-6 lg:h-7 w-5 sm:w-6 lg:-w-7 text-gray-600" />
      )}
    </button>
  );
}
