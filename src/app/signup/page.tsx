"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { BusinessType } from "@/lib/supabase/types";
import { generateSyntheticTransactions } from "@/lib/demo-data";
import { Eye, EyeOff, BarChart3, ArrowRight, Sparkles, Building2, Store } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";

const BUSINESS_TYPE_OPTIONS: BusinessType[] = [
  "Clothing & Fashion",
  "Restaurant / Café",
  "Electronics",
  "Pharmacy",
  "Salon & Beauty",
  "Grocery / Supermarket",
  "Online Store",
  "Other",
];

export default function SignupPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [shopName, setShopName] = useState("");
  const [businessType, setBusinessType] = useState<BusinessType>("Clothing & Fashion");
  const [businessTypeOther, setBusinessTypeOther] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const supabase = createClient();

      // 1. Sign up user via Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            phone,
            shop_name: shopName,
            business_type: businessType,
          },
        },
      });

      if (authError) {
        setErrorMsg(authError.message);
        setLoading(false);
        return;
      }

      const userId = authData.user?.id;

      if (userId) {
        // 2. Insert into profiles table
        const { error: profileError } = await supabase.from("profiles").upsert({
          id: userId,
          full_name: fullName,
          phone,
          shop_name: shopName,
          business_type: businessType,
          business_type_other: businessType === "Other" ? businessTypeOther : null,
          updated_at: new Date().toISOString(),
        });

        if (profileError) {
          console.error("Profile creation warning:", profileError.message);
        }
      }

      // Save local fallback state for quick offline demo access
      localStorage.setItem("smallbiz_active_shop", shopName || "My Retail Shop");
      localStorage.setItem("smallbiz_active_type", businessType);

      router.push("/dashboard");
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to create account";
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
          {/* Left Form (Image 4 exact style extended with business fields) */}
          <div className="max-w-md w-full mx-auto p-2 sm:p-4">
            <h1 className="font-sora text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 dark:text-white">
              Get started for free
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
              Create your account to unlock AI-powered margin analytics for your business.
            </p>

            {errorMsg && (
              <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 font-medium">
                {errorMsg}
              </div>
            )}

            <form onSubmit={handleSignup} className="mt-6 space-y-3.5">
              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Dinil Bhashana"
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+94 77 123 4567"
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Shop Name & Business Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Shop / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    placeholder="Colombo Silk & Linen"
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Business Type *
                  </label>
                  <select
                    value={businessType}
                    onChange={(e) => setBusinessType(e.target.value as BusinessType)}
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
                  >
                    {BUSINESS_TYPE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* If "Other" is selected, show specify input (Instruction 2) */}
              {businessType === "Other" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                    Please specify business category *
                  </label>
                  <input
                    type="text"
                    required
                    value={businessTypeOther}
                    onChange={(e) => setBusinessTypeOther(e.target.value)}
                    placeholder="e.g. Handmade Crafts, Bookstore, Bakery"
                    className="w-full px-3.5 py-2.5 rounded-full border border-indigo-300 dark:border-indigo-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              )}

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@yourshop.lk"
                  className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1">
                  Password (min 6 chars) *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 pr-10"
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
                className="w-full mt-3 py-3.5 px-6 rounded-full bg-indigo-600 dark:bg-indigo-600 text-white font-semibold text-sm hover:bg-indigo-700 dark:hover:bg-indigo-500 shadow-md transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                ) : (
                  <span>Create Account & Seed Demo Data</span>
                )}
              </button>
            </form>

            {/* Switch to Login */}
            <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                href="/login"
                className="font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
              >
                Log in here
              </Link>
            </p>
          </div>

          {/* Right Visual Card (Image 4 zen card) */}
          <div className="hidden lg:flex flex-col items-center justify-center p-10 rounded-3xl bg-gradient-to-b from-indigo-50/70 via-purple-50/40 to-slate-50 dark:from-indigo-950/20 dark:via-gray-900/40 dark:to-gray-900/80 border border-indigo-100/80 dark:border-gray-800 relative overflow-hidden min-h-[520px]">
            <div className="w-56 h-56 rounded-full border-2 border-indigo-400/30 dark:border-indigo-500/20 flex items-center justify-center relative mb-6">
              <div className="w-36 h-36 rounded-full bg-indigo-100 dark:bg-indigo-900/40 flex items-center justify-center shadow-inner">
                <span className="text-6xl select-none">📈</span>
              </div>

              <div className="absolute -bottom-4 -left-6 bg-white dark:bg-gray-800 p-3 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold text-xs">
                    Rs
                  </div>
                  <div>
                    <div className="text-[11px] font-bold text-gray-800 dark:text-gray-200">
                      LKR Currency Ready
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-gray-400">
                      100+ Transactions
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h3 className="font-sora text-xl font-bold text-gray-900 dark:text-white text-center mt-4">
              Designed for Solo & SME Owners
            </h3>
            <p className="text-xs text-gray-600 dark:text-gray-300 text-center max-w-xs mt-2 leading-relaxed">
              Every shop owner gets an isolated, secure database partition protected by Supabase Row Level Security.
            </p>

            <div className="flex items-center gap-1.5 mt-8">
              <span className="w-5 h-2 rounded-full bg-indigo-600 dark:bg-indigo-400"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
              <span className="w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
