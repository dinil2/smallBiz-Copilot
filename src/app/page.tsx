import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CashFlowSection } from "@/components/CashFlowSection";
import { ClientPreviewWrapper } from "@/components/ClientPreviewWrapper";
import {
  ArrowRight,
  Sparkles,
  BarChart3,
  TrendingUp,
  ShieldCheck,
  Zap,
  CheckCircle2,
  FileSpreadsheet,
  Cpu,
  Coins,
  Bot,
  MessageSquare,
  TrendingDown,
  Check,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAF9] dark:bg-[#0B0F17] transition-colors" suppressHydrationWarning>
      <Navbar />

      <main className="flex-1" suppressHydrationWarning>
        {/* HERO SECTION (Modeled after Inspiration Image 1: Cadence) */}
        <section className="relative pt-12 sm:pt-20 pb-16 overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[900px] h-[500px] rounded-full bg-gradient-to-tr from-indigo-200/30 via-violet-100/30 to-rose-100/20 dark:from-indigo-900/15 dark:via-purple-900/10 dark:to-transparent blur-3xl opacity-70" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            {/* Announcement Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white dark:bg-gray-800/90 border border-gray-200/90 dark:border-gray-700 shadow-xs mb-8 hover:border-indigo-300 dark:hover:border-indigo-600 transition-all cursor-pointer">
              <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping"></span>
              <span className="text-xs font-semibold text-indigo-600 dark:text-indigo-400">
                New
              </span>
              <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                AI Business Analyst powered by Groq Llama 3.3
              </span>
              <ArrowRight className="w-3 h-3 text-gray-400" />
            </div>

            {/* Main Headline (Image 1 Typography & Cadence) */}
            <h1 className="font-sora text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white leading-[1.1] max-w-5xl mx-auto">
              Every business signal,{" "}
              <span className="bg-gradient-to-r from-indigo-600 via-violet-600 to-rose-500 bg-clip-text text-transparent">
                one calm dashboard
              </span>
            </h1>

            {/* Sub-headline */}
            <p className="mt-6 sm:mt-8 text-base sm:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              SmallBiz Copilot turns raw sales into profit margins, inventory trends, and clear recommendations you can actually act on — in minutes, not quarters. No SQL, no data team, no spreadsheet headaches.
            </p>

            {/* Dual CTAs */}
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#preview"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-gray-800 dark:text-gray-100 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-full shadow-xs transition-all hover:scale-105"
              >
                <span>See it in motion</span>
              </a>

              <Link
                href="/signup"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 text-sm font-semibold text-white bg-gray-950 dark:bg-indigo-600 hover:bg-gray-800 dark:hover:bg-indigo-500 rounded-full shadow-lg shadow-gray-900/10 dark:shadow-indigo-600/20 transition-all hover:scale-105 active:scale-95"
              >
                <span>Start free</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            {/* Social Proof (Image 1 Style) */}
            <div className="mt-8 flex items-center justify-center gap-3 text-xs text-gray-500 dark:text-gray-400">
              <div className="flex -space-x-2">
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-white font-bold">
                  SK
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-white font-bold">
                  AM
                </div>
                <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 border-2 border-white dark:border-gray-900 flex items-center justify-center text-[10px] text-white font-bold">
                  DL
                </div>
              </div>
              <span>
                Trusted by <strong className="text-gray-800 dark:text-gray-200">500+ shops & restaurants</strong> across Sri Lanka
              </span>
            </div>

            {/* Floating Live Interactive Preview (Image 1 Mockup) */}
            <div id="preview" className="mt-14 sm:mt-18 pt-2 scroll-mt-20">
              <ClientPreviewWrapper />
            </div>
          </div>
        </section>

        {/* WHY SMALLBIZ COPILOT (Problem & Solution) */}
        <section id="engine" className="py-20 border-t border-gray-200/60 dark:border-gray-800/60 bg-white dark:bg-[#0D121F] transition-colors scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400 mb-3">
                Architected For Truth
              </h2>
              <p className="font-sora text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                Not ChatGPT with a spreadsheet. Real deterministic analytics.
              </p>
              <p className="mt-4 text-base text-gray-600 dark:text-gray-300">
                Most AI tools hallucinate financial numbers. SmallBiz Copilot separates pure TypeScript math from AI explanation — guaranteeing 100% reliable numbers every single time.
              </p>
            </div>

            {/* Feature Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-6">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Pure Analytics Engine
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Revenue, cost, margin, MoM change, and anomaly flags (&gt;15% profit drops) are computed by deterministic code. The AI never invents numbers; it only interprets computed facts.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-6">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Business Health Score
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  An objective 0–100 health index weighing revenue momentum, gross margin safety, expense discipline, and category concentration risk.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="p-8 rounded-2xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 hover:border-indigo-300 dark:hover:border-indigo-500/50 transition-all hover:shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400 flex items-center justify-center mb-6">
                  <Sparkles className="w-6 h-6" />
                </div>
                <h3 className="font-sora text-xl font-bold text-gray-900 dark:text-white mb-2">
                  Grounded AI Business Analyst
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Chat with an AI CFO that answers in plain English: &quot;Why did profit decrease this month?&quot; or &quot;Which items should I discount?&quot; Powered by Groq Cloud in under 1 second.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* DEDICATED AI ANALYST INTERACTIVE SECTION (#ai anchor) */}
        <section id="ai" className="py-20 bg-gray-50 dark:bg-[#0B0F17] border-t border-gray-200/60 dark:border-gray-800/60 transition-colors scroll-mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200/60 dark:border-indigo-800/60 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-4">
                  <Bot className="w-3.5 h-3.5" />
                  <span>Interactive AI Copilot</span>
                </div>
                <h2 className="font-sora text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white tracking-tight">
                  Ask hard questions. Get crystal clear business answers.
                </h2>
                <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
                  No need to decipher pivot tables. SmallBiz Copilot acts as your in-house CFO, analyzing your sales velocity and inventory turns in real time.
                </p>

                <div className="mt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Zero guessing — answers reason strictly from your recorded numbers.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Formatted in Sri Lankan Rupees (Rs.) for local retail contexts.
                    </span>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3 h-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-gray-700 dark:text-gray-300 font-medium">
                      Sub-second inference via Groq cloud infrastructure.
                    </span>
                  </div>
                </div>

                <div className="mt-8">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition-all hover:scale-105"
                  >
                    <span>Launch AI Analyst in Sandbox</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Chat Simulation Card (ZAY-G style) */}
              <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-xl max-w-lg mx-auto w-full">
                <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center shadow-xs">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-sora font-bold text-sm text-gray-900 dark:text-white">
                        AI CFO Simulation
                      </div>
                      <div className="text-[11px] text-gray-400">Grounded analysis</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-full">
                    Live
                  </span>
                </div>

                <div className="mt-4 space-y-3 text-xs">
                  <div className="flex justify-end">
                    <div className="bg-indigo-600 text-white px-4 py-2.5 rounded-2xl rounded-tr-xs max-w-[80%]">
                      Why did my profit decrease this month?
                    </div>
                  </div>
                  <div className="flex justify-start">
                    <div className="bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 px-4 py-3 rounded-2xl rounded-tl-xs max-w-[90%] leading-relaxed border border-gray-200/60 dark:border-gray-700/60">
                      While gross revenue rose <span className="font-semibold text-emerald-600 dark:text-emerald-400">+12.4%</span>, your operating costs increased <span className="font-semibold text-rose-500">+18.2%</span>. Specifically, supplier price hikes in the Apparel category eroded net margins by 3.8%. I recommend renegotiating supplier terms or adjusting unit prices on your top 3 velocity items.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SCENIC CASH FLOW SECTION (Image 2 exact style) */}
        <CashFlowSection />
      </main>

      <Footer />
    </div>
  );
}
