"use client";

import { useTheme } from "@/context/ThemeContext";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className = "" }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Light / Dark Mode"
      className={`relative p-2 rounded-xl transition-all duration-200 border border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 shadow-sm cursor-pointer ${className}`}
      title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
    >
      {theme === "light" ? (
        <Moon className="w-4 h-4 text-gray-700 hover:text-indigo-600 transition-colors" />
      ) : (
        <Sun className="w-4 h-4 text-amber-400 hover:text-amber-300 transition-colors" />
      )}
    </button>
  );
}
