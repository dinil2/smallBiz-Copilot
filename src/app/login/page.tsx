"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Eye, EyeOff, BarChart3, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
        setLoading(false);
        return;
      }

      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to sign in";
      setErrorMsg(msg);
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-[#0B0F17] transition-colors">
      {/* Top minimal bar */}
      <div className="p-4 sm:p-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm group-hover:scale-105 transition-transform">
            <BarChart3 className="w-4 h-4" />
          </div>
          <span className="font-sora font-bold text-base tracking-tight text-gray-900 dark:text-white">
            SmallBiz <span className="text-gray-950 dark:text-white font-extrabold">Copilot</span>
          </span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Form (Image 4 exact style) */}
          <div className="max-w-md w-full mx-auto p-2 sm:p-4">
            <h1 className="font-sora text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back!
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Simplify your cash flow and boost your shop&apos;s profit with SmallBiz Copilot.
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@yourshop.lk"
                  className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Password
                  </label>
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      alert("Demo mode: You can reset your password or register a new free account.");
                    }}
                    className="text-xs text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                  >
                    Forgot Password?
                  </a>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all shadow-2xs pr-11"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Pill Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full mt-2 py-3.5 px-6 rounded-full bg-gray-950 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-gray-800 dark:hover:bg-indigo-500 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Login</span>
                )}
              </button>
            </form>

            {/* Quick Demo Access Button */}
            <div className="mt-4 pt-3 border-t border-gray-100 dark:border-gray-800 text-center">
              <button
                type="button"
                onClick={() => router.push("/dashboard")}
                className="w-full py-2.5 px-4 rounded-full border border-indigo-200 dark:border-indigo-800/80 bg-indigo-50/50 dark:bg-indigo-950/30 text-indigo-700 dark:text-indigo-300 text-xs font-semibold hover:bg-indigo-100/60 dark:hover:bg-indigo-900/40 transition-colors flex items-center justify-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Instant Demo Bypass (Direct Live Dashboard)</span>
              </button>
            </div>

            {/* Social Divider */}
            <div className="mt-6 flex items-center gap-3">
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
              <span className="text-xs text-gray-400">or continue with</span>
              <div className="flex-1 h-px bg-gray-200 dark:bg-gray-800" />
            </div>

            {/* Social Icons (Image 4) */}
            <div className="mt-4 flex items-center justify-center gap-4">
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => router.push("/dashboard")}
                title="Google"
              >
                <span className="font-bold text-sm">G</span>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => router.push("/dashboard")}
                title="Apple"
              >
                <span className="font-bold text-sm">🍎</span>
              </button>
              <button
                type="button"
                className="w-10 h-10 rounded-full border border-gray-300 dark:border-gray-700 flex items-center justify-center text-gray-800 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
                onClick={() => router.push("/dashboard")}
                title="Facebook"
              >
                <span className="font-bold text-sm">f</span>
              </button>
            </div>

            {/* Switch to Register */}
            <p className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
              Not a member?{" "}
              <Link
                href="/signup"
                className="font-semibold text-emerald-600 dark:text-emerald-400 hover:underline"
              >
                Register now
              </Link>
            </p>
          </div>

          {/* Right Visual Card (Image 4 zen card) */}
          <div className="hidden lg:flex flex-col items-center justify-center p-10 rounded-3xl bg-gradient-to-b from-emerald-50/70 via-teal-50/40 to-slate-50 dark:from-emerald-950/20 dark:via-gray-900/40 dark:to-gray-900/80 border border-emerald-100/80 dark:border-gray-800 relative overflow-hidden min-h-[520px]">
            {/* Soft Ambient decorative ring */}
            <div className="w-56 h-56 rounded-full border-2 border-emerald-400/30 dark:border-emerald-500/20 flex items-center justify-center relative mb-6">
              {/* Mascot / Avatar Zen Graphic */}
              <div className="w-36 h-36 rounded-full bg-emerald-100 dark:bg-emerald-900/40 flex items-center justify-center shadow-inner">
                <span className="text-6xl select-none">🧘‍♀️</span>
              </div>

              {/* Floating Task Badge */}
              <div className="absolute -bottom-4 -left-6 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center font-bold text-xs">
                    ✓
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                      Profit Analysis
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      100% Verified
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge Right */}
              <div className="absolute -top-2 -right-4 bg-white dark:bg-gray-800 p-2.5 rounded-full shadow-lg border border-gray-100 dark:border-gray-700">
                <span className="text-xl">📊</span>
              </div>
            </div>

            {/* Motivational Text */}
            <h3 className="font-sora text-xl font-bold text-gray-900 dark:text-white text-center mt-4">
              Make your business calmer and organized
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center max-w-xs mt-2 leading-relaxed">
              Real-time margin alerts, AI inventory recommendations, and multi-tenant security designed for retail owners.
            </p>

            {/* Slider Dots Indicator */}
            <div className="flex items-center gap-1.5 mt-8">
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="w-5 h-2 rounded-full bg-gray-900 dark:bg-indigo-400"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
