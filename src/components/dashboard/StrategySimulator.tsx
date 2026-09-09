"use client";

import { useState } from "react";
import { Sliders, TrendingUp, Sparkles, AlertCircle } from "lucide-react";
import { formatLKR } from "@/lib/analytics";

interface StrategySimulatorProps {
  baseRevenue: number;
  baseCost: number;
  baseProfit: number;
}

export function StrategySimulator({ baseRevenue, baseCost, baseProfit }: StrategySimulatorProps) {
  const [priceChange, setPriceChange] = useState<number>(5); // default +5%
  const [adBudget, setAdBudget] = useState<number>(15000); // Rs. 15,000 ad spend
  const [trafficIncrease, setTrafficIncrease] = useState<number>(10); // +10% foot traffic

  // Safe fallback if base numbers are 0
  const activeRev = baseRevenue > 0 ? baseRevenue : 850000;
  const activeCost = baseCost > 0 ? baseCost : 480000;
  const activeProfit = activeRev - activeCost;

  // Formula:
  // New revenue = activeRev * (1 + trafficIncrease / 100) * (1 + priceChange / 100)
  // New cost = (activeCost * (1 + trafficIncrease / 100)) + adBudget
  // New profit = New revenue - New cost
  const simulatedRev = activeRev * (1 + trafficIncrease / 100) * (1 + priceChange / 100);
  const simulatedCost = activeCost * (1 + trafficIncrease / 100) + adBudget;
  const simulatedProfit = simulatedRev - simulatedCost;
  const profitDifference = simulatedProfit - activeProfit;
  const isPositive = profitDifference >= 0;

  return (
    <div className="p-6 rounded-2xl bg-white dark:bg-gray-900/70 border border-gray-200/80 dark:border-gray-800 shadow-2xs">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
            <Sliders className="w-4 h-4" />
          </div>
          <h3 className="font-sora font-bold text-sm text-gray-900 dark:text-white">
            Strategy Simulator
          </h3>
        </div>
        <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider">
          What-If Forecast
        </span>
      </div>

      <p className="text-xs text-gray-500 dark:text-gray-400 mb-6">
        Simulate pricing, promotion, and foot traffic adjustments against your actual monthly baseline.
      </p>

      {/* Sliders */}
      <div className="space-y-4">
        {/* Slider 1: Price Change */}
        <div>
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-700 dark:text-gray-300">Price Change (%)</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {priceChange > 0 ? `+${priceChange}%` : `${priceChange}%`}
            </span>
          </div>
          <input
            type="range"
            min="-10"
            max="25"
            step="1"
            value={priceChange}
            onChange={(e) => setPriceChange(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Slider 2: Ad / Promotion Budget */}
        <div>
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-700 dark:text-gray-300">Marketing & Promotion Budget</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              {formatLKR(adBudget)}
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="80000"
            step="2500"
            value={adBudget}
            onChange={(e) => setAdBudget(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>

        {/* Slider 3: Traffic Increase */}
        <div>
          <div className="flex justify-between text-xs font-medium mb-1.5">
            <span className="text-gray-700 dark:text-gray-300">Customer Foot Traffic Gain</span>
            <span className="font-semibold text-indigo-600 dark:text-indigo-400">
              +{trafficIncrease}%
            </span>
          </div>
          <input
            type="range"
            min="0"
            max="50"
            step="2"
            value={trafficIncrease}
            onChange={(e) => setTrafficIncrease(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
          />
        </div>
      </div>

      {/* Forecast Result Box */}
      <div className="mt-6 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200/60 dark:border-gray-700/60">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-500 dark:text-gray-400">Projected Net Impact:</span>
          <span
            className={`font-sora font-bold text-sm ${
              isPositive ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"
            }`}
          >
            {isPositive ? `+${formatLKR(profitDifference)}/mo` : `-${formatLKR(Math.abs(profitDifference))}/mo`}
          </span>
        </div>
        <div className="mt-2 text-[11px] text-gray-500 dark:text-gray-400">
          Estimated new monthly profit: <strong className="text-gray-800 dark:text-gray-200">{formatLKR(simulatedProfit)}</strong>
        </div>
      </div>
    </div>
  );
}
