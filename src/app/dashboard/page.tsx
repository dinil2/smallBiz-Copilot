"use client";

import { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Transaction, Profile, BusinessType } from "@/lib/supabase/types";
import { computeAnalytics, formatLKR, formatPercent, AnalyticsSummary } from "@/lib/analytics";
import { generateSyntheticTransactions } from "@/lib/demo-data";
import { ThemeToggle } from "@/components/ThemeToggle";
import { StrategySimulator } from "@/components/dashboard/StrategySimulator";
import { AiRecommendations } from "@/components/dashboard/AiRecommendations";
import { AiChatPanel } from "@/components/dashboard/AiChatPanel";
import { ProductsTable } from "@/components/dashboard/ProductsTable";
import { CsvUploadModal } from "@/components/dashboard/CsvUploadModal";
import { AddTransactionModal } from "@/components/dashboard/AddTransactionModal";
import { DashboardTutorialModal } from "@/components/dashboard/DashboardTutorialModal";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Upload,
  ShieldCheck,
  Bot,
  LogOut,
  Sliders,
  DollarSign,
  PieChart as PieIcon,
  Package,
  AlertCircle,
  MessageSquare,
  PlusCircle,
  HelpCircle,
  Trash2,
  ReceiptText,
  FileSpreadsheet,
  ArrowRight,
  RefreshCw,
} from "lucide-react";

const CATEGORY_COLORS = ["#5B4FE0", "#10B981", "#F59E0B", "#EC4899", "#8B5CF6", "#06B6D4", "#64748B"];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false);
  const [isAddTxModalOpen, setIsAddTxModalOpen] = useState(false);
  const [isTutorialModalOpen, setIsTutorialModalOpen] = useState(false);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);
  const [timeRange, setTimeRange] = useState<"7d" | "30d" | "90d">("30d");

  // Health Score AI explanation state
  const [healthNarration, setHealthNarration] = useState<string>("");
  const [loadingNarration, setLoadingNarration] = useState(false);

  // 1. Load User & Transactions from Supabase
  const loadUserData = async () => {
    setLoading(true);
    try {
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Fetch Profile
        const { data: prof } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .single();

        if (prof) {
          setProfile(prof as Profile);
        } else {
          setProfile({
            id: user.id,
            full_name: user.user_metadata?.full_name || "Business Owner",
            phone: user.user_metadata?.phone || "",
            shop_name: user.user_metadata?.shop_name || "Colombo Retail Store",
            business_type: user.user_metadata?.business_type || "Clothing & Fashion",
            business_type_other: null,
          });
        }

        // Fetch Transactions with RLS
        const { data: txList } = await supabase
          .from("transactions")
          .select("*")
          .eq("user_id", user.id)
          .order("date", { ascending: true });

        if (txList && txList.length > 0) {
          setTransactions(txList);
        } else {
          // New real user account starts completely fresh and clean!
          setTransactions([]);
        }
      } else {
        // Demo / Guest mode fallback
        const fallbackShop = localStorage.getItem("smallbiz_active_shop") || "Colombo Silk & Linen";
        const fallbackType = (localStorage.getItem("smallbiz_active_type") as BusinessType) || "Clothing & Fashion";

        setProfile({
          id: "demo-user-id",
          full_name: "Dinil Bhashana",
          phone: "+94 77 123 4567",
          shop_name: fallbackShop,
          business_type: fallbackType,
          business_type_other: null,
        });

        // Check if guest has stored data, else start clean
        setTransactions([]);
      }
    } catch (e) {
      console.error("Data loading error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUserData();

    // Auto-open guided onboarding tutorial on first visit
    const hasSeenTutorial = localStorage.getItem("smallbiz_tutorial_completed");
    if (!hasSeenTutorial) {
      setIsTutorialModalOpen(true);
    }
  }, []);

  // 2. Compute Analytics through pure mathematical engine
  const summary: AnalyticsSummary = useMemo(() => {
    return computeAnalytics(transactions);
  }, [transactions]);

  // Fetch AI explanation for Health Score
  useEffect(() => {
    if (summary.healthScore.score > 0 && !healthNarration) {
      setLoadingNarration(true);
      fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: "Summarize this business health score in one sharp, insightful sentence.",
          mode: "health_narration",
          analyticsSummary: {
            score: summary.healthScore.score,
            rating: summary.healthScore.rating,
            momChanges: summary.momChanges,
            margin: summary.currentMonth.margin,
            alerts: summary.alerts,
          },
        }),
      })
        .then((r) => r.json())
        .then((d) => {
          if (d.answer) setHealthNarration(d.answer);
        })
        .catch(() => {})
        .finally(() => setLoadingNarration(false));
    }
  }, [summary.healthScore.score]);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/login");
  };

  // Filter trends based on selected period
  const chartData = useMemo(() => {
    if (timeRange === "7d") {
      return summary.dailyTrends.slice(-7);
    }
    if (timeRange === "30d") {
      return summary.dailyTrends.slice(-30);
    }
    return summary.monthlyTrends;
  }, [summary, timeRange]);

  // Load Demo Data On-Demand (Explicit Safety Net)
  const handleLoadDemoCatalog = async () => {
    setLoading(true);
    try {
      const activeType = profile?.business_type || "Clothing & Fashion";
      const targetUserId = profile?.id || "demo-user-id";
      const demoList = generateSyntheticTransactions(targetUserId, activeType, 120);

      if (targetUserId && targetUserId !== "demo-user-id") {
        const supabase = createClient();
        await supabase.from("transactions").insert(demoList);
      }
      setTransactions(demoList as Transaction[]);
    } catch (e) {
      console.error("Demo load error:", e);
    } finally {
      setLoading(false);
    }
  };

  // Clear All Transactions to Reset to Pure Fresh State
  const handleClearTransactions = async () => {
    if (!window.confirm("Are you sure you want to clear all transactions from your ledger? This action cannot be undone.")) {
      return;
    }
    setLoading(true);
    try {
      if (profile?.id && profile.id !== "demo-user-id") {
        const supabase = createClient();
        await supabase.from("transactions").delete().eq("user_id", profile.id);
      }
      setTransactions([]);
    } catch (e) {
      console.error("Clear error:", e);
    } finally {
      setLoading(false);
    }
  };

  const handleAddTransactionSuccess = (newTx: Transaction) => {
    setTransactions((prev) => [newTx, ...prev]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0B0F17] text-gray-900 dark:text-gray-100 transition-colors">
      {/* Top Navigation Bar (Image 3 Buildly Inspired) */}
      <header className="sticky top-0 z-30 border-b border-gray-200/80 dark:border-gray-800/80 bg-white/90 dark:bg-[#0E131F]/90 backdrop-blur-md">
        <div className="max-w-7xl 2xl:max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          {/* Brand & Workspace Title */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-8 h-8 rounded-xl bg-black dark:bg-white flex items-center justify-center text-white dark:text-black shadow-sm group-hover:scale-105 transition-transform">
                <BarChart3 className="w-4 h-4" />
              </div>
              <span className="font-sora font-bold text-base tracking-tight hidden sm:inline text-gray-900 dark:text-white">
                SmallBiz <span className="text-gray-950 dark:text-white font-extrabold">Copilot</span>
              </span>
            </Link>

            <div className="h-5 w-px bg-gray-200 dark:bg-gray-800 hidden sm:block" />

            <div className="flex items-center gap-2">
              <span className="font-semibold text-xs sm:text-sm text-gray-800 dark:text-gray-200">
                {profile?.shop_name || "My Retail Shop"}
              </span>
              <span className="text-[10px] font-semibold text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800 px-2 py-0.5 rounded-full border border-gray-200 dark:border-gray-700">
                {profile?.business_type || "Clothing & Fashion"}
              </span>
            </div>
          </div>

          {/* Action Buttons: Add Sale, Upload CSV, Guide Tour, Theme, Logout */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Record Sale Button */}
            <button
              onClick={() => setIsAddTxModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white text-xs font-semibold shadow-xs transition-all hover:scale-105 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">+ Record Sale</span>
              <span className="sm:hidden">+ Sale</span>
            </button>

            {/* Upload CSV */}
            <button
              onClick={() => setIsCsvModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200 text-xs font-medium border border-gray-200 dark:border-gray-700 shadow-2xs transition-all cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-gray-500" />
              <span className="hidden md:inline">Upload CSV</span>
            </button>

            {/* Guided Tour Trigger */}
            <button
              onClick={() => setIsTutorialModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 text-xs font-semibold border border-indigo-200/60 dark:border-indigo-800/60 shadow-2xs transition-all cursor-pointer"
              title="Open Guided Dashboard Tour"
            >
              <HelpCircle className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />
              <span className="hidden md:inline">Guide Tour</span>
            </button>

            {/* AI Analyst Trigger */}
            <button
              onClick={() => setIsAiChatOpen(true)}
              className="relative p-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-sm hover:scale-105 transition-all cursor-pointer"
              title="Open AI Business Copilot"
            >
              <Bot className="w-4 h-4" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-white dark:border-gray-900 animate-pulse"></span>
            </button>

            <ThemeToggle />

            {/* Logout */}
            <button
              onClick={handleLogout}
              className="p-2 rounded-xl text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Content */}
      <main className="flex-1 max-w-7xl 2xl:max-w-[1440px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
        {/* Welcome & Time Filters Row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2">
          <div>
            <h1 className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
              Welcome back, {profile?.full_name?.split(" ")[0] || "Owner"} 👋
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
              {transactions.length > 0
                ? "Here is your financial performance overview and profit health analysis."
                : "Your financial ledger is ready. Start by recording your sales or importing a spreadsheet."}
            </p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            {/* Load Demo Data Safety Net */}
            {transactions.length === 0 ? (
              <button
                onClick={handleLoadDemoCatalog}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800 hover:bg-amber-100 dark:hover:bg-amber-900/60 transition-all cursor-pointer"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Load Demo Catalog</span>
              </button>
            ) : (
              <button
                onClick={handleClearTransactions}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-xl text-gray-500 hover:text-rose-600 dark:text-gray-400 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                title="Reset to clean ledger"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear Data</span>
              </button>
            )}

            {/* Period Selector Tabs (7D, 30D, 90D) */}
            {transactions.length > 0 && (
              <div className="flex items-center gap-1 bg-white dark:bg-gray-900 p-1 rounded-xl border border-gray-200 dark:border-gray-800 shadow-2xs">
                {(["7d", "30d", "90d"] as const).map((r) => (
                  <button
                    key={r}
                    onClick={() => setTimeRange(r)}
                    className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer ${
                      timeRange === r
                        ? "bg-black text-white dark:bg-white dark:text-black shadow-xs"
                        : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    {r.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CONDITIONAL RENDER: Empty State vs Live Dashboard */}
        {transactions.length === 0 ? (
          /* EMPTY STATE FOR NEW REAL USERS */
          <div className="p-8 sm:p-14 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 text-center max-w-3xl mx-auto space-y-6 shadow-sm">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-gray-800 flex items-center justify-center mx-auto text-gray-700 dark:text-gray-300">
              <ReceiptText className="w-8 h-8" />
            </div>

            <div className="max-w-xl mx-auto">
              <h2 className="font-sora text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                Your Ledger is Fresh & Clean
              </h2>
              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                You haven&apos;t added any sales transactions to your account yet. SmallBiz Copilot calculates profit margins, inventory trends, and grounded AI insights directly from your actual numbers.
              </p>
            </div>

            {/* Three Action Choices */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-left pt-4">
              {/* Option 1: Record Sale */}
              <div
                onClick={() => setIsAddTxModalOpen(true)}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center mb-3">
                  <PlusCircle className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                  <span>Record Sale</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Log sales one by one as they happen in your shop today.
                </p>
              </div>

              {/* Option 2: Upload CSV */}
              <div
                onClick={() => setIsCsvModalOpen(true)}
                className="p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/80 dark:border-gray-700 hover:border-black dark:hover:border-white transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-indigo-600 text-white flex items-center justify-center mb-3">
                  <FileSpreadsheet className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-sm text-gray-900 dark:text-white flex items-center gap-1">
                  <span>Upload CSV</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                  Import an existing sales spreadsheet from Excel or your POS.
                </p>
              </div>

              {/* Option 3: Explore Demo */}
              <div
                onClick={handleLoadDemoCatalog}
                className="p-5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/70 dark:border-amber-800 hover:border-amber-400 transition-all cursor-pointer group shadow-xs hover:shadow-md"
              >
                <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center mb-3">
                  <Sparkles className="w-5 h-5" />
                </div>
                <h3 className="font-sora font-bold text-sm text-amber-900 dark:text-amber-200 flex items-center gap-1">
                  <span>Demo Catalog</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </h3>
                <p className="mt-1 text-xs text-amber-800/80 dark:text-amber-300/80 leading-relaxed">
                  Load 120 sample transactions to see how charts and AI work.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setIsTutorialModalOpen(true)}
                className="inline-flex items-center gap-2 text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Need a walkthrough? Open the 6-step Guided Dashboard Tour</span>
              </button>
            </div>
          </div>
        ) : (
          /* LIVE ACTIVE DASHBOARD (When transactions exist) */
          <>
            {/* FOUR PRIMARY KPI CARDS & BUSINESS HEALTH SCORE (Image 3 Buildly Inspired) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {/* Card 1: Total Revenue */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-700">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  <span>Gross Revenue</span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                      summary.momChanges.revenuePct >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-500"
                    }`}
                  >
                    {summary.momChanges.revenuePct >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {formatPercent(summary.momChanges.revenuePct)} MoM
                  </span>
                </div>
                <div className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {formatLKR(summary.currentMonth.revenue)}
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                  Across {summary.currentMonth.transactionCount} recorded sales
                </p>
              </div>

              {/* Card 2: Total Cost / Expenses */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-700">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  <span>Operating Expenses</span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                      summary.momChanges.costPct <= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-500"
                    }`}
                  >
                    {summary.momChanges.costPct >= 0 ? "+" : ""}
                    {summary.momChanges.costPct.toFixed(1)}% MoM
                  </span>
                </div>
                <div className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                  {formatLKR(summary.currentMonth.cost)}
                </div>
                <p className="text-[11px] text-gray-400 dark:text-gray-500 mt-2">
                  Inventory wholesale & procurement costs
                </p>
              </div>

              {/* Card 3: Net Profit */}
              <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm transition-all hover:border-gray-300 dark:hover:border-gray-700">
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                  <span>Net Profit</span>
                  <span
                    className={`inline-flex items-center gap-0.5 text-[11px] font-bold ${
                      summary.momChanges.profitPct >= 0
                        ? "text-emerald-600 dark:text-emerald-400"
                        : "text-rose-500"
                    }`}
                  >
                    {summary.momChanges.profitPct >= 0 ? (
                      <TrendingUp className="w-3 h-3" />
                    ) : (
                      <TrendingDown className="w-3 h-3" />
                    )}
                    {formatPercent(summary.momChanges.profitPct)} MoM
                  </span>
                </div>
                <div className="font-sora text-2xl sm:text-3xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {formatLKR(summary.currentMonth.profit)}
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <span className="text-[11px] font-semibold text-gray-500 dark:text-gray-400">
                    Margin: {summary.currentMonth.margin.toFixed(1)}%
                  </span>
                </div>
              </div>

              {/* Card 4: Business Health Score (0-100 Weighted formula) */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-indigo-50/90 to-violet-50/50 dark:from-indigo-950/40 dark:to-purple-950/20 border border-indigo-100 dark:border-indigo-900/50 shadow-sm">
                <div className="flex items-center justify-between text-xs font-bold text-indigo-700 dark:text-indigo-300 mb-2">
                  <span>Health Score</span>
                  <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="font-sora text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    {summary.healthScore.score}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">/ 100</span>
                  <span className="ml-auto text-[10px] font-bold text-emerald-600 bg-white/90 dark:bg-indigo-900/80 px-2 py-0.5 rounded-full border border-emerald-200/60 dark:border-emerald-800/40">
                    {summary.healthScore.rating}
                  </span>
                </div>
                {/* AI narration sentence */}
                <p className="text-[11px] text-gray-600 dark:text-gray-300 mt-2 line-clamp-2 leading-tight">
                  {loadingNarration ? (
                    <span className="animate-pulse">Generating AI diagnosis...</span>
                  ) : (
                    healthNarration ||
                    "Healthy revenue velocity and disciplined margin control across top trade categories."
                  )}
                </p>
              </div>
            </div>

            {/* CHARTS SECTION (Image 3: Area Chart + Donut Pie) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Main Area Trend Chart (2 Cols on desktop) */}
              <div className="lg:col-span-2 p-5 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                  <div>
                    <h2 className="font-sora text-base font-bold text-gray-900 dark:text-white">
                      Revenue &amp; Cost Trajectory
                    </h2>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      Comparing cash collection vs inventory expense
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-semibold">
                    <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-indigo-600"></span>
                      Revenue
                    </span>
                    <span className="flex items-center gap-1.5 text-gray-700 dark:text-gray-300">
                      <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                      Expenses
                    </span>
                  </div>
                </div>

                <div className="h-[280px] sm:h-[320px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#5B4FE0" stopOpacity={0.3} />
                          <stop offset="95%" stopColor="#5B4FE0" stopOpacity={0.0} />
                        </linearGradient>
                        <linearGradient id="colorCost" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#EF4444" stopOpacity={0.2} />
                          <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <XAxis
                        dataKey="label"
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                      />
                      <YAxis
                        tick={{ fontSize: 11, fill: "#9CA3AF" }}
                        axisLine={false}
                        tickLine={false}
                        tickFormatter={(v) => `Rs.${(v / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderRadius: "12px",
                          border: "none",
                          fontSize: "12px",
                          color: "#fff",
                        }}
                        formatter={(val: unknown) => [formatLKR(Number(val) || 0), ""]}
                      />
                      <Area
                        type="monotone"
                        dataKey="revenue"
                        stroke="#5B4FE0"
                        strokeWidth={2.5}
                        fillOpacity={1}
                        fill="url(#colorRev)"
                        name="Revenue"
                      />
                      <Area
                        type="monotone"
                        dataKey="cost"
                        stroke="#EF4444"
                        strokeWidth={2}
                        fillOpacity={1}
                        fill="url(#colorCost)"
                        name="Cost"
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Category Breakdown (Donut Pie) */}
              <div className="p-5 sm:p-6 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200/90 dark:border-gray-800 shadow-sm flex flex-col">
                <div className="mb-4">
                  <h2 className="font-sora text-base font-bold text-gray-900 dark:text-white">
                    Category Profit Share
                  </h2>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Distribution of margins by department
                  </p>
                </div>

                <div className="h-[200px] w-full relative flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={summary.categories}
                        dataKey="profit"
                        nameKey="category"
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={80}
                        paddingAngle={3}
                      >
                        {summary.categories.map((_, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={CATEGORY_COLORS[idx % CATEGORY_COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "#1F2937",
                          borderRadius: "12px",
                          border: "none",
                          fontSize: "12px",
                          color: "#fff",
                        }}
                        formatter={(val: unknown) => [formatLKR(Number(val) || 0), "Profit"]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className="text-[11px] text-gray-400 font-medium">Top Margin</span>
                    <span className="font-sora text-sm font-bold text-gray-900 dark:text-white">
                      {summary.categories[0]?.category || "Apparel"}
                    </span>
                  </div>
                </div>

                {/* Category Legend List */}
                <div className="mt-4 space-y-2 overflow-y-auto max-h-[140px] pr-1">
                  {summary.categories.map((cat, i) => (
                    <div
                      key={cat.category}
                      className="flex items-center justify-between text-xs py-1 border-b border-gray-100 dark:border-gray-800/60 last:border-0"
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full shrink-0"
                          style={{ backgroundColor: CATEGORY_COLORS[i % CATEGORY_COLORS.length] }}
                        />
                        <span className="text-gray-700 dark:text-gray-300 font-medium truncate max-w-[120px]">
                          {cat.category}
                        </span>
                      </div>
                      <div className="flex items-center gap-2 font-mono">
                        <span className="font-semibold text-gray-900 dark:text-white">
                          {formatLKR(cat.profit)}
                        </span>
                        <span className="text-[10px] text-gray-400">
                          ({cat.margin.toFixed(0)}%)
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* STRATEGY SIMULATOR (Interactive Scenario Planning) */}
            <StrategySimulator
              baseRevenue={summary.currentMonth.revenue}
              baseCost={summary.currentMonth.cost}
              baseProfit={summary.currentMonth.profit}
            />

            {/* AI RECOMMENDATIONS (Image 3 Style 3-card grid) */}
            <AiRecommendations summary={summary} shopName={profile?.shop_name || "Your Shop"} />

            {/* OPERATIONAL ANOMALY ALERTS */}
            {summary.alerts.length > 0 && (
              <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-800/40 flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="text-xs text-amber-800 dark:text-amber-300 space-y-1">
                  <span className="font-bold uppercase tracking-wider block text-[10px] text-amber-700 dark:text-amber-400">
                    Operational Anomaly Alerts
                  </span>
                  {summary.alerts.map((a, i) => (
                    <div key={i} className="leading-relaxed font-medium">
                      {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* PRODUCTS PERFORMANCE TABLE (Image 3 Style) */}
            <ProductsTable products={summary.bestProducts.concat(summary.worstProducts)} />
          </>
        )}
      </main>

      {/* Floating AI Business Analyst Launcher Button */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 cursor-pointer"
      >
        <Bot className="w-5 h-5" />
        <span className="text-xs font-bold">Ask AI Copilot</span>
      </button>

      {/* Floating AI Popup Widget (Image 5 - ZAY-G style) */}
      <AiChatPanel
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
        summary={summary}
        shopName={profile?.shop_name || "Your Shop"}
      />

      {/* CSV Upload Modal */}
      <CsvUploadModal
        isOpen={isCsvModalOpen}
        onClose={() => setIsCsvModalOpen(false)}
        userId={profile?.id || "demo-user-id"}
        onSuccess={() => loadUserData()}
      />

      {/* Add Transaction (One-by-One) Modal */}
      <AddTransactionModal
        isOpen={isAddTxModalOpen}
        onClose={() => setIsAddTxModalOpen(false)}
        userId={profile?.id || "demo-user-id"}
        businessType={(profile?.business_type as BusinessType) || "Clothing & Fashion"}
        onSuccess={handleAddTransactionSuccess}
      />

      {/* Guided Onboarding Tutorial Modal (with Prev & Next arrows) */}
      <DashboardTutorialModal
        isOpen={isTutorialModalOpen}
        onClose={() => setIsTutorialModalOpen(false)}
        onOpenAddModal={() => setIsAddTxModalOpen(true)}
        onLoadDemoData={handleLoadDemoCatalog}
      />
    </div>
  );
}
