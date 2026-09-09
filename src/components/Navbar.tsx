"use client";

import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { Menu, X, ArrowRight, BarChart3 } from "lucide-react";
import { smoothScrollTo } from "@/lib/smooth-scroll";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    if (typeof window !== "undefined" && window.location.pathname === "/") {
      e.preventDefault();
      smoothScrollTo(targetId);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-gray-200/80 dark:border-gray-800/80 bg-white/80 dark:bg-[#0B0F17]/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-md shadow-black/10 group-hover:scale-105 transition-transform">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-sora font-bold text-lg tracking-tight text-gray-900 dark:text-white flex items-center gap-1.5">
              SmallBiz <span className="text-gray-950 dark:text-white font-extrabold">Copilot</span>
            </span>
          </div>
        </Link>

        {/* Desktop Nav Links (Silky smooth deceleration scrolling) */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600 dark:text-gray-300">
          <Link
            href="/#preview"
            onClick={(e) => handleNavClick(e, "preview")}
            className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Product
          </Link>
          <Link
            href="/#engine"
            onClick={(e) => handleNavClick(e, "engine")}
            className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Analytics Engine
          </Link>
          <Link
            href="/#ai"
            onClick={(e) => handleNavClick(e, "ai")}
            className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            AI Analyst
          </Link>
          <Link
            href="/#cashflow"
            onClick={(e) => handleNavClick(e, "cashflow")}
            className="hover:text-black dark:hover:text-white transition-colors cursor-pointer"
          >
            Cash Flow
          </Link>
        </nav>

        {/* Action Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <Link
            href="/login"
            className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-black dark:hover:text-white transition-colors"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 rounded-xl shadow-sm transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <span>Start free</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F17] px-4 pt-3 pb-5 space-y-3">
          <nav className="flex flex-col space-y-2.5 text-sm font-medium text-gray-700 dark:text-gray-200">
            <Link
              href="/#preview"
              onClick={(e) => handleNavClick(e, "preview")}
              className="px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Product
            </Link>
            <Link
              href="/#engine"
              onClick={(e) => handleNavClick(e, "engine")}
              className="px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Analytics Engine
            </Link>
            <Link
              href="/#ai"
              onClick={(e) => handleNavClick(e, "ai")}
              className="px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              AI Analyst
            </Link>
            <Link
              href="/#cashflow"
              onClick={(e) => handleNavClick(e, "cashflow")}
              className="px-2 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Cash Flow
            </Link>
          </nav>
          <div className="pt-2 border-t border-gray-100 dark:border-gray-800 flex flex-col gap-2">
            <Link
              href="/login"
              className="w-full text-center py-2.5 text-sm font-medium text-gray-800 dark:text-gray-100 bg-gray-100 dark:bg-gray-800 rounded-xl"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="w-full text-center py-2.5 text-sm font-semibold text-white bg-black dark:bg-white dark:text-black hover:bg-gray-800 rounded-xl shadow-sm"
            >
              Start free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
