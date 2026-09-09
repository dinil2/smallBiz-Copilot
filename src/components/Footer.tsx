import Link from "next/link";
import { BarChart3, Heart, ExternalLink } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-[#0B0F17] transition-colors" suppressHydrationWarning>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand Col */}
          <div className="space-y-4 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-sora font-bold text-base tracking-tight text-gray-900 dark:text-white">
                SmallBiz <span className="text-gray-950 dark:text-white font-extrabold">Copilot</span>
              </span>
            </Link>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
              Empowering Sri Lankan retailers, restaurants, and SME shops with automated financial analytics and grounded AI decision support.
            </p>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-3">
              Product
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link href="#preview" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Calm Dashboard
                </Link>
              </li>
              <li>
                <Link href="#engine" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Pure Analytics Engine
                </Link>
              </li>
              <li>
                <Link href="#ai" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Grounded AI Business Analyst
                </Link>
              </li>
              <li>
                <Link href="/dashboard" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors">
                  Live Demo Sandbox
                </Link>
              </li>
            </ul>
          </div>

          {/* Business Types */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-3">
              Supported Businesses
            </h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li>Clothing & Fashion Boutiques</li>
              <li>Cafés & Restaurants</li>
              <li>Electronics & Repair Stores</li>
              <li>Pharmacies & Health Outlets</li>
              <li>Salons, Spas & Grocery Stores</li>
            </ul>
          </div>

          {/* Trust & Architecture */}
          <div>
            <h4 className="text-xs font-semibold text-gray-900 dark:text-gray-200 uppercase tracking-wider mb-3">
              Infrastructure
            </h4>
            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed mb-3">
              Zero-knowledge multi-tenant PostgreSQL with Row Level Security on Supabase Cloud. Lightning inference via Groq Cloud LLM.
            </p>
            <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              All Systems Operational
            </div>
          </div>
        </div>

        {/* Bottom Bar with Developer Credit & LinkedIn Link */}
        <div className="pt-8 border-t border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500 dark:text-gray-400">
          <p>© {new Date().getFullYear()} SmallBiz Copilot. All rights reserved.</p>

          <div className="flex items-center gap-2">
            <span>Designed & Developed with precision by</span>
            <a
              href="https://www.linkedin.com/in/dinil-bhashana/"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-1 font-semibold text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 underline decoration-indigo-400/40 hover:decoration-indigo-500 transition-all"
            >
              <span>Dinil Bhashana</span>
              <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
