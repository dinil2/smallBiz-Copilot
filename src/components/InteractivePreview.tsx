"use client";

import { useState } from "react";
import {
  TrendingUp,
  TrendingDown,
  Sparkles,
  ShoppingBag,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from "lucide-react";

export function InteractivePreview() {
  const [selectedPeriod, setSelectedPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const periodData = {
    "7d": {
      revenue: "Rs. 384,500",
      revChange: "+14.2%",
      profit: "Rs. 162,200",
      margin: "42.2%",
      marginChange: "+3.1%",
      health: 89,
      topItem: "Pure Linen Shirt",
      topItemRev: "Rs. 92,800",
    },
    "30d": {
      revenue: "Rs. 1,485,200",
      revChange: "+18.6%",
      profit: "Rs. 624,800",
      margin: "42.1%",
      marginChange: "+2.4%",
      health: 92,
      topItem: "Batik Summer Dress",
      topItemRev: "Rs. 345,600",
    },
    "90d": {
      revenue: "Rs. 4,210,000",
      revChange: "+22.4%",
      profit: "Rs. 1,810,300",
      margin: "43.0%",
      marginChange: "+4.8%",
      health: 95,
      topItem: "Handloom Cotton Saree",
      topItemRev: "Rs. 875,000",
    },
  };

  const current = periodData[selectedPeriod];

  return (
    <div className="relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-b from-gray-200/80 via-gray-100 to-gray-200/40 dark:from-indigo-500/20 dark:via-gray-800/60 dark:to-gray-900/80 shadow-2xl shadow-indigo-500/10 transition-all" suppressHydrationWarning>
      {/* Outer Shell */}
      <div className="rounded-[15px] bg-white dark:bg-[#0D121F] border border-gray-200/90 dark:border-gray-800 p-4 sm:p-6 transition-colors" suppressHydrationWarning>
        {/* Mockup Header Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 pb-5 border-b border-gray-100 dark:border-gray-800/80">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-3 h-3 rounded-full bg-red-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-400/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-400/80"></span>
            </div>
            <span className="text-xs font-medium text-gray-400 dark:text-gray-500 hidden sm:inline">
              smallbiz-copilot.app / live-preview
            </span>
          </div>

          {/* Timeframe selector pills */}
          <div className="flex items-center gap-1 bg-gray-100 dark:bg-gray-800/80 p-1 rounded-xl border border-gray-200/60 dark:border-gray-700/60">
            {(["7d", "30d", "90d"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setSelectedPeriod(period)}
                className={`px-3 py-1 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                  selectedPeriod === period
                    ? "bg-white dark:bg-gray-900 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                {period === "7d" ? "Last 7 Days" : period === "30d" ? "Past 30 Days" : "Quarter (90d)"}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded-full border border-emerald-200 dark:border-emerald-800/40">
            <Zap className="w-3.5 h-3.5" />
            <span>AI Analyst Active</span>
          </div>
        </div>

        {/* Dashboard Grid Mockup */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-5">
          {/* Card 1: Revenue */}
          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Gross Revenue</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-[11px] gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {current.revChange}
              </span>
            </div>
            <div className="font-sora text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {current.revenue}
            </div>
            {/* Sparkline Graphic */}
            <div className="mt-3 h-6 flex items-end gap-1">
              {[40, 55, 45, 60, 75, 70, 85, 90, 95].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-xs bg-indigo-500/30 dark:bg-indigo-400/30 hover:bg-indigo-600 transition-all"
                ></div>
              ))}
            </div>
          </div>

          {/* Card 2: Net Profit */}
          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Net Profit</span>
              <span className="inline-flex items-center text-emerald-600 dark:text-emerald-400 font-medium text-[11px] gap-0.5">
                <TrendingUp className="w-3 h-3" />
                {current.revChange}
              </span>
            </div>
            <div className="font-sora text-xl sm:text-2xl font-bold text-emerald-600 dark:text-emerald-400 tracking-tight">
              {current.profit}
            </div>
            <div className="mt-3 h-6 flex items-end gap-1">
              {[30, 45, 50, 48, 65, 70, 72, 88, 92].map((h, i) => (
                <div
                  key={i}
                  style={{ height: `${h}%` }}
                  className="flex-1 rounded-xs bg-emerald-500/30 dark:bg-emerald-400/30 hover:bg-emerald-500 transition-all"
                ></div>
              ))}
            </div>
          </div>

          {/* Card 3: Margin */}
          <div className="p-4 rounded-xl bg-gray-50/80 dark:bg-gray-900/50 border border-gray-100 dark:border-gray-800">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
              <span>Profit Margin</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">
                {current.marginChange}
              </span>
            </div>
            <div className="font-sora text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {current.margin}
            </div>
            <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
              Top 15% tier in Sri Lankan retail
            </p>
          </div>

          {/* Card 4: Health Score */}
          <div className="p-4 rounded-xl bg-gradient-to-br from-indigo-50/90 to-violet-50/50 dark:from-indigo-950/40 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50">
            <div className="flex items-center justify-between text-xs text-indigo-700 dark:text-indigo-300 font-semibold mb-1">
              <span>Health Score</span>
              <ShieldCheck className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="font-sora text-xl sm:text-2xl font-bold text-indigo-600 dark:text-indigo-400">
              {current.health} / 100
            </div>
            <span className="inline-block mt-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400 bg-white/80 dark:bg-indigo-900/60 px-2 py-0.5 rounded-md">
              Excellent Health
            </span>
          </div>
        </div>

        {/* AI Insight Pill Banner inside Preview */}
        <div className="mt-4 p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100/80 dark:border-indigo-900/40 flex items-start gap-3">
          <div className="p-1.5 rounded-lg bg-indigo-600 text-white shrink-0 mt-0.5">
            <Sparkles className="w-3.5 h-3.5" />
          </div>
          <div className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed" suppressHydrationWarning>
            <span className="font-bold text-gray-900 dark:text-white">AI Copilot Recommendation: </span>
            Your highest velocity item is <span className="font-semibold text-indigo-600 dark:text-indigo-400">{current.topItem}</span> ({current.topItemRev} generated). Re-order inventory 8 days earlier to prevent stockout losses before the weekend rush.
          </div>
        </div>
      </div>
    </div>
  );
}
