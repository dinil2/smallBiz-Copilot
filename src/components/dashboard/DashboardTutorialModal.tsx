"use client";

import { useState } from "react";
import {
  X,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  PlusCircle,
  BarChart3,
  TrendingUp,
  Sliders,
  Bot,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  HelpCircle,
} from "lucide-react";

interface DashboardTutorialModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenAddModal: () => void;
  onLoadDemoData: () => void;
}

interface TutorialStep {
  stepNumber: number;
  badge: string;
  title: string;
  subtitle: string;
  description: string;
  bulletPoints: { title: string; desc: string; icon: React.ReactNode }[];
  highlightTip?: string;
}

export function DashboardTutorialModal({
  isOpen,
  onClose,
  onOpenAddModal,
  onLoadDemoData,
}: DashboardTutorialModalProps) {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const steps: TutorialStep[] = [
    {
      stepNumber: 1,
      badge: "Welcome Tour",
      title: "Welcome to SmallBiz Copilot",
      subtitle: "A calm, intelligent financial control center for your business",
      description:
        "SmallBiz Copilot was engineered specifically for retail shop owners, restaurants, and SME entrepreneurs in Sri Lanka who want complete clarity over their business without the headaches of messy Excel formulas or complex accounting software.",
      bulletPoints: [
        {
          title: "Real & Multi-Tenant",
          desc: "Your data is strictly private and isolated under enterprise Supabase Row Level Security.",
          icon: <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Zero Fake Numbers",
          desc: "New accounts start with a 100% fresh, clean ledger. You decide what sales to record.",
          icon: <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "LKR Currency First",
          desc: "All sales, costs, margins, and AI recommendations are natively computed in Sri Lankan Rupees (Rs.).",
          icon: <Sparkles className="w-4 h-4 text-amber-500" />,
        },
      ],
      highlightTip: "You can read through all steps using the arrows below or re-open this guide anytime from the top bar.",
    },
    {
      stepNumber: 2,
      badge: "Step 1: Adding Sales Data",
      title: "How to Feed In Your Sales Data",
      subtitle: "Record transactions one by one or import past spreadsheets",
      description:
        "Your dashboard generates insights directly from the sales transactions you record. You have two flexible ways to input your data:",
      bulletPoints: [
        {
          title: "+ Record New Sale (One by One)",
          desc: "Click '+ Record Sale' anytime to log a single transaction: item name, category, quantity, unit selling price, and unit cost price. Net profit is computed instantly.",
          icon: <PlusCircle className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Upload CSV Spreadsheet",
          desc: "Have sales records from Excel, POS, or Google Sheets? Click 'Upload CSV' to bulk import hundreds of rows in seconds.",
          icon: <FileSpreadsheet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Load Demo Catalog (Optional Safety Net)",
          desc: "Want to explore how the graphs look before typing your sales? Click 'Load Demo Catalog' to populate a realistic sample dataset tailored to your trade.",
          icon: <Layers className="w-4 h-4 text-violet-500" />,
        },
      ],
      highlightTip: "Unit cost is optional but recommended — it allows the system to tell you your true profit margin!",
    },
    {
      stepNumber: 3,
      badge: "Step 2: Metrics & Health Score",
      title: "Understanding Your KPIs & Health Score",
      subtitle: "Four vital signs and an objective 0–100 business vitality index",
      description:
        "At the top of your dashboard, you'll find four primary financial metric cards plus your proprietary Business Health Score:",
      bulletPoints: [
        {
          title: "Gross Revenue & Operating Costs",
          desc: "Tracks total incoming customer payments vs the wholesale inventory purchase cost for those goods.",
          icon: <BarChart3 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Net Profit & Gross Margin %",
          desc: "Your actual profit remaining in Rs. and percentage margin, along with month-over-month (MoM) performance comparisons.",
          icon: <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Business Health Score (0–100)",
          desc: "A pure mathematical formula weighing 4 pillars: sales velocity, profit safety margin, expense discipline, and category concentration risk.",
          icon: <ShieldCheck className="w-4 h-4 text-violet-600 dark:text-violet-400" />,
        },
      ],
      highlightTip: "Scores above 80 indicate strong cash flow and safe margins in the Sri Lankan retail benchmark.",
    },
    {
      stepNumber: 4,
      badge: "Step 3: Charts & Anomaly Alerts",
      title: "Trend Analytics & Anomaly Detection",
      subtitle: "Automated watches that alert you when margins slip",
      description:
        "Never get blindsided by unexpected cost increases. The pure TypeScript analytics engine continuously audits your ledger:",
      bulletPoints: [
        {
          title: "Revenue vs Cost Trajectory",
          desc: "An interactive area chart showing your monthly revenue growth alongside product procurement costs over the last 90 days.",
          icon: <TrendingUp className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Category Contribution Breakdown",
          desc: "A donut visualizer illustrating which departments (e.g. Apparel vs Footwear) generate the lion's share of your profit.",
          icon: <Layers className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Automated Anomaly Warnings",
          desc: "The system automatically flags warning cards if any product category experiences a profit drop greater than 15% versus the previous month.",
          icon: <Sparkles className="w-4 h-4 text-rose-500" />,
        },
      ],
      highlightTip: "The charts update in real time as soon as you record a sale or upload a batch.",
    },
    {
      stepNumber: 5,
      badge: "Step 4: AI Analyst & Simulator",
      title: "Interactive Strategy Simulator & AI CFO",
      subtitle: "Forecast price changes and chat with your grounded business copilot",
      description:
        "Instead of guessing how to grow, use data-backed simulations and conversational AI:",
      bulletPoints: [
        {
          title: "Price Strategy Simulator",
          desc: "Drag the interactive slider to simulate what a +5% or +15% price adjustment would do to your monthly net profit before altering shelf prices.",
          icon: <Sliders className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Grounded AI Copilot (Bottom Right)",
          desc: "Click the floating purple bubble in the lower-right corner to open your AI Analyst. Ask questions like 'Which products should I stop stocking?' or 'Why did profit drop?'",
          icon: <Bot className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Zero Hallucinations",
          desc: "The AI is bound strictly by system rules to reason ONLY from your computed ledger numbers — it never fabricates data.",
          icon: <CheckCircle2 className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
      ],
      highlightTip: "Sub-second inference powered by Groq Llama 3.3 server infrastructure.",
    },
    {
      stepNumber: 6,
      badge: "Ready to Begin",
      title: "You're Ready to Take Control",
      subtitle: "Choose how you'd like to get started today",
      description:
        "You now have a complete overview of SmallBiz Copilot. Start recording your daily sales, or load the sample demo catalog if you want to explore the features first.",
      bulletPoints: [
        {
          title: "Option A: Record Sales One by One",
          desc: "Recommended for live production shops. Record your transactions daily as sales occur.",
          icon: <PlusCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />,
        },
        {
          title: "Option B: Upload Existing Spreadsheet",
          desc: "Have a CSV from your POS or billing system? Drop it into our CSV mapper.",
          icon: <FileSpreadsheet className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />,
        },
        {
          title: "Option C: Explore With Demo Catalog",
          desc: "Instantly inject 120 sample transactions to see the full analytics engine in action.",
          icon: <Layers className="w-4 h-4 text-amber-500" />,
        },
      ],
      highlightTip: "You can reopen this tutorial at any time by clicking the 'Guide' button in the dashboard bar.",
    },
  ];

  const step = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      localStorage.setItem("smallbiz_tutorial_completed", "true");
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleDismiss = () => {
    localStorage.setItem("smallbiz_tutorial_completed", "true");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-2xl rounded-3xl bg-white dark:bg-[#0E131F] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Top Header Bar */}
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-black text-white dark:bg-white dark:text-black">
              {step.badge}
            </span>
            <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">
              Step {step.stepNumber} of {steps.length}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDismiss}
              className="text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white px-2.5 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              Skip Tour
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
          {/* Main Title & Description */}
          <div>
            <h2 className="font-sora text-xl sm:text-2xl font-bold text-gray-900 dark:text-white tracking-tight">
              {step.title}
            </h2>
            <p className="text-xs sm:text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
              {step.subtitle}
            </p>
            <p className="mt-3 text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
              {step.description}
            </p>
          </div>

          {/* Key Feature Bullet Points */}
          <div className="space-y-3.5 pt-1">
            {step.bulletPoints.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-gray-50/90 dark:bg-gray-900/50 border border-gray-200/70 dark:border-gray-800 flex items-start gap-3.5"
              >
                <div className="p-2 rounded-xl bg-white dark:bg-gray-800 border border-gray-200/80 dark:border-gray-700 shrink-0 mt-0.5 shadow-xs">
                  {item.icon}
                </div>
                <div>
                  <h4 className="font-sora font-semibold text-xs sm:text-sm text-gray-900 dark:text-white">
                    {item.title}
                  </h4>
                  <p className="mt-0.5 text-xs text-gray-600 dark:text-gray-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Highlight Tip Banner */}
          {step.highlightTip && (
            <div className="p-3.5 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/40 flex items-center gap-2.5 text-xs text-indigo-900 dark:text-indigo-200">
              <Sparkles className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
              <span>
                <strong>Pro-Tip: </strong>
                {step.highlightTip}
              </span>
            </div>
          )}

          {/* Quick Action buttons on the last step */}
          {currentStep === steps.length - 1 && (
            <div className="pt-2 flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => {
                  handleDismiss();
                  onOpenAddModal();
                }}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-black dark:bg-white text-white dark:text-black font-semibold text-sm hover:scale-[1.02] active:scale-[0.98] transition-all shadow-md cursor-pointer"
              >
                <PlusCircle className="w-4 h-4" />
                <span>Record My First Sale</span>
              </button>

              <button
                onClick={() => {
                  handleDismiss();
                  onLoadDemoData();
                }}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 font-semibold text-sm hover:bg-gray-200 dark:hover:bg-gray-700 transition-all cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Explore Demo Catalog</span>
              </button>
            </div>
          )}
        </div>

        {/* Bottom Navigation Control Footer with Back & Forward Arrows */}
        <div className="p-4 sm:p-6 border-t border-gray-100 dark:border-gray-800/80 bg-gray-50/70 dark:bg-[#0E131F] flex items-center justify-between">
          {/* Back Arrow Button */}
          <button
            onClick={handlePrevious}
            disabled={currentStep === 0}
            className={`inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold rounded-xl border border-gray-200 dark:border-gray-700 transition-all ${
              currentStep === 0
                ? "opacity-40 cursor-not-allowed text-gray-400 bg-transparent"
                : "text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
            }`}
          >
            <ChevronLeft className="w-4 h-4" />
            <span>Previous</span>
          </button>

          {/* Visual Step Progress Dots */}
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentStep === i
                    ? "w-6 bg-black dark:bg-white"
                    : "w-2 bg-gray-300 dark:bg-gray-700 hover:bg-gray-400"
                }`}
                aria-label={`Go to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Forward Arrow Button */}
          <button
            onClick={handleNext}
            className="inline-flex items-center gap-1.5 px-5 py-2 text-sm font-semibold rounded-xl bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-100 shadow-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>{currentStep === steps.length - 1 ? "Get Started" : "Next"}</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
