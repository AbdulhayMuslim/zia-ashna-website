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
      className="bg-gray-200 dark:bg-gray-800 p-3 rounded-tl-3xl rounded-br-3xl"
      aria-label="Toggle theme"
    >
      {theme === "dark" ? (
        <Sun className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:-w-8 text-yellow-500" />
      ) : (
        <Moon className="h-6 sm:h-7 lg:h-8 w-6 sm:w-7 lg:-w-8 text-gray-600" />
      )}
    </button>
  );
}
