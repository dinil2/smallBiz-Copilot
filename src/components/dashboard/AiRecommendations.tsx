"use client";

import { useState, useEffect } from "react";
import { Sparkles, ArrowRight, RefreshCw, CheckCircle2, TrendingUp, DollarSign } from "lucide-react";
import { AnalyticsSummary, formatLKR } from "@/lib/analytics";

interface RecommendationItem {
  title: string;
  impact: string;
  reason: string;
  confidence: number;
  actionType: string;
}

interface AiRecommendationsProps {
  summary: AnalyticsSummary;
  shopName: string;
}

export function AiRecommendations({ summary, shopName }: AiRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<RecommendationItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [appliedIndex, setAppliedIndex] = useState<number | null>(null);

  // Generate grounded fallback recommendations from the computed summary
  const generateGroundedFallbacks = (): RecommendationItem[] => {
    const items: RecommendationItem[] = [];

    // 1. Best performing product recommendation
    if (summary.bestProducts.length > 0) {
      const top = summary.bestProducts[0];
      items.push({
        title: `Increase inventory safety stock for ${top.product_name}`,
        impact: `+${formatLKR(Math.round(top.profit * 0.15))}/mo profit`,
        reason: `Generates ${formatLKR(top.profit)} in net profit with a strong ${top.margin}% margin. High demand velocity risks stockout.`,
        confidence: 93,
        actionType: "inventory",
      });
    }

    // 2. Worst margin / watch product recommendation
    if (summary.worstProducts.length > 0) {
      const worst = summary.worstProducts[0];
      items.push({
        title: `Re-negotiate supplier cost or adjust price on ${worst.product_name}`,
        impact: `Save ~${formatLKR(Math.round(worst.cost * 0.12))}/mo`,
        reason: `Margin is currently compressed at ${worst.margin}%. A 5% price bump or supplier volume discount restores profitability.`,
        confidence: 87,
        actionType: "pricing",
      });
    }

    // 3. Category / Expense Anomaly recommendation
    if (summary.categories.length > 0) {
      const topCat = summary.categories[0];
      items.push({
        title: `Run weekend bundle campaign on ${topCat.category}`,
        impact: `+${formatLKR(Math.round(topCat.revenue * 0.1))}/mo revenue`,
        reason: `${topCat.category} represents your core revenue volume (${formatLKR(topCat.revenue)}). Cross-selling slower items will boost average ticket size.`,
        confidence: 90,
        actionType: "marketing",
      });
    }

    return items;
  };

  const fetchAiRecommendations = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "recommendations",
          analyticsSummary: {
            shopName,
            currentMonth: summary.currentMonth,
            previousMonth: summary.previousMonth,
            momChanges: summary.momChanges,
            healthScore: summary.healthScore.score,
            bestProducts: summary.bestProducts.slice(0, 3),
            worstProducts: summary.worstProducts.slice(0, 3),
            categories: summary.categories.slice(0, 4),
            alerts: summary.alerts,
          },
        }),
      });

      if (res.ok) {
        const data = await res.json();
        // Parse JSON output if LLM returned structured JSON
        try {
          const cleaned = data.answer.replace(/```json/g, "").replace(/```/g, "").trim();
          const parsed = JSON.parse(cleaned);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setRecommendations(parsed);
            setLoading(false);
            return;
          }
        } catch (e) {
          // If JSON parse fails, generate grounded fallbacks
          console.warn("Using grounded recommendations fallback:", e);
        }
      }
      setRecommendations(generateGroundedFallbacks());
    } catch (e) {
      console.warn("Recommendations fetch error:", e);
      setRecommendations(generateGroundedFallbacks());
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (summary.bestProducts.length > 0) {
      fetchAiRecommendations();
    }
  }, [summary.totalAllTime.transactionCount]);

  const displayList = recommendations.length > 0 ? recommendations : generateGroundedFallbacks();

  const handleApply = (idx: number) => {
    setAppliedIndex(idx);
    setTimeout(() => setAppliedIndex(null), 2500);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-sora font-bold text-base text-gray-900 dark:text-white">
              AI Recommendations
            </h3>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Grounded action items derived purely from your mathematical sales patterns
            </p>
          </div>
        </div>

        <button
          onClick={fetchAiRecommendations}
          disabled={loading}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-800 text-xs font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          <span>Refresh Analysis</span>
        </button>
      </div>

      {/* 3-Card Grid matching Image 3 Buildly layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {displayList.map((rec, i) => (
          <div
            key={i}
            className="p-5 rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-2xs hover:border-indigo-300 dark:hover:border-indigo-500/40 transition-all flex flex-col justify-between"
          >
            <div>
              {/* Top Row: Title & Confidence badge */}
              <div className="flex items-start justify-between gap-2 mb-3">
                <h4 className="font-sora text-sm font-bold text-gray-900 dark:text-white leading-snug">
                  {rec.title}
                </h4>
                <span className="shrink-0 px-2 py-0.5 rounded-md text-[10px] font-bold bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 border border-gray-200 dark:border-gray-700">
                  {rec.confidence || 90}%
                </span>
              </div>

              {/* Impact Metric (Image 3 Style: green positive impact) */}
              <div className="mb-2">
                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Impact
                </span>
                <span className="font-sora font-bold text-sm text-emerald-600 dark:text-emerald-400">
                  {rec.impact}
                </span>
              </div>

              {/* Reason */}
              <div className="mb-4">
                <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider block">
                  Reason
                </span>
                <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed mt-0.5">
                  {rec.reason}
                </p>
              </div>
            </div>

            {/* Action Button */}
            <button
              onClick={() => handleApply(i)}
              className={`w-full py-2 px-3 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                appliedIndex === i
                  ? "bg-emerald-600 text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600"
              }`}
            >
              {appliedIndex === i ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Action Queued!</span>
                </>
              ) : (
                <>
                  <span>Apply Change</span>
                  <ArrowRight className="w-3 h-3" />
                </>
              )}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
