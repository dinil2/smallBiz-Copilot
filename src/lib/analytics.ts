import { Transaction } from "./supabase/types";

export interface CategorySummary {
  category: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
  itemsSold: number;
  prevProfit?: number;
  profitChangePct?: number;
  alert?: string;
}

export interface ProductPerformance {
  product_name: string;
  category: string;
  quantity: number;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
}

export interface TrendDataPoint {
  label: string; // e.g., "Jul 2026", "Week 1", etc.
  date: string;
  revenue: number;
  cost: number;
  profit: number;
  margin: number;
}

export interface AnalyticsSummary {
  currentMonth: {
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
    transactionCount: number;
  };
  previousMonth: {
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
    transactionCount: number;
  };
  momChanges: {
    revenuePct: number;
    costPct: number;
    profitPct: number;
    marginDiffPct: number; // e.g. +3.2%
  };
  totalAllTime: {
    revenue: number;
    cost: number;
    profit: number;
    margin: number;
    transactionCount: number;
  };
  healthScore: {
    score: number; // 0 - 100
    rating: "Critical" | "Fair" | "Good" | "Excellent";
    breakdown: {
      revenueGrowthScore: number;
      profitGrowthScore: number;
      marginHealthScore: number;
      categoryBalanceScore: number;
    };
  };
  bestProducts: ProductPerformance[];
  worstProducts: ProductPerformance[];
  categories: CategorySummary[];
  alerts: string[];
  monthlyTrends: TrendDataPoint[];
  dailyTrends: TrendDataPoint[];
}

export function formatLKR(amount: number): string {
  return "Rs. " + Math.round(amount).toLocaleString("en-US");
}

export function formatPercent(val: number): string {
  const sign = val > 0 ? "+" : "";
  return `${sign}${val.toFixed(1)}%`;
}

export function computeMoM(current: number, previous: number): number {
  if (previous === 0) return current > 0 ? 100 : 0;
  return Number((((current - previous) / Math.abs(previous)) * 100).toFixed(1));
}

export function computeAnalytics(transactions: Transaction[]): AnalyticsSummary {
  if (!transactions || transactions.length === 0) {
    return {
      currentMonth: { revenue: 0, cost: 0, profit: 0, margin: 0, transactionCount: 0 },
      previousMonth: { revenue: 0, cost: 0, profit: 0, margin: 0, transactionCount: 0 },
      momChanges: { revenuePct: 0, costPct: 0, profitPct: 0, marginDiffPct: 0 },
      totalAllTime: { revenue: 0, cost: 0, profit: 0, margin: 0, transactionCount: 0 },
      healthScore: {
        score: 50,
        rating: "Fair",
        breakdown: { revenueGrowthScore: 15, profitGrowthScore: 15, marginHealthScore: 10, categoryBalanceScore: 10 },
      },
      bestProducts: [],
      worstProducts: [],
      categories: [],
      alerts: ["No sales transactions recorded yet. Load demo data or import a CSV to generate insights."],
      monthlyTrends: [],
      dailyTrends: [],
    };
  }

  // Sort transactions by date ascending
  const sorted = [...transactions].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  // Determine latest transaction date to establish current month & previous month
  const latestDate = new Date(sorted[sorted.length - 1].date);
  const currentYear = latestDate.getFullYear();
  const currentMonthIdx = latestDate.getMonth(); // 0-11

  // Previous month index and year
  const prevDate = new Date(currentYear, currentMonthIdx - 1, 1);
  const prevYear = prevDate.getFullYear();
  const prevMonthIdx = prevDate.getMonth();

  let curRev = 0, curCost = 0, curCount = 0;
  let prevRev = 0, prevCost = 0, prevCount = 0;
  let totalRev = 0, totalCost = 0;

  // Monthly buckets for trends
  const monthBuckets: Record<string, { revenue: number; cost: number; profit: number; count: number; date: string }> = {};

  // Product aggregations
  const productMap: Record<string, { product_name: string; category: string; quantity: number; revenue: number; cost: number; profit: number }> = {};

  // Category aggregations: total and current vs previous
  const catTotalMap: Record<string, { revenue: number; cost: number; profit: number; itemsSold: number }> = {};
  const catCurProfit: Record<string, number> = {};
  const catPrevProfit: Record<string, number> = {};

  for (const t of sorted) {
    const d = new Date(t.date);
    const yr = d.getFullYear();
    const mo = d.getMonth();
    const rev = Number(t.revenue) || 0;
    const cst = Number(t.cost) || 0;
    const prf = Number(t.profit) || (rev - cst);
    const qty = Number(t.quantity) || 1;

    totalRev += rev;
    totalCost += cst;

    // Monthly bucket key: "YYYY-MM"
    const mKey = `${yr}-${String(mo + 1).padStart(2, "0")}`;
    if (!monthBuckets[mKey]) {
      monthBuckets[mKey] = { revenue: 0, cost: 0, profit: 0, count: 0, date: t.date };
    }
    monthBuckets[mKey].revenue += rev;
    monthBuckets[mKey].cost += cst;
    monthBuckets[mKey].profit += prf;
    monthBuckets[mKey].count += 1;

    // Current Month vs Previous Month
    if (yr === currentYear && mo === currentMonthIdx) {
      curRev += rev;
      curCost += cst;
      curCount += 1;
      catCurProfit[t.category] = (catCurProfit[t.category] || 0) + prf;
    } else if (yr === prevYear && mo === prevMonthIdx) {
      prevRev += rev;
      prevCost += cst;
      prevCount += 1;
      catPrevProfit[t.category] = (catPrevProfit[t.category] || 0) + prf;
    }

    // Product Map
    if (!productMap[t.product_name]) {
      productMap[t.product_name] = {
        product_name: t.product_name,
        category: t.category,
        quantity: 0,
        revenue: 0,
        cost: 0,
        profit: 0,
      };
    }
    productMap[t.product_name].quantity += qty;
    productMap[t.product_name].revenue += rev;
    productMap[t.product_name].cost += cst;
    productMap[t.product_name].profit += prf;

    // Category Map
    if (!catTotalMap[t.category]) {
      catTotalMap[t.category] = { revenue: 0, cost: 0, profit: 0, itemsSold: 0 };
    }
    catTotalMap[t.category].revenue += rev;
    catTotalMap[t.category].cost += cst;
    catTotalMap[t.category].profit += prf;
    catTotalMap[t.category].itemsSold += qty;
  }

  const curProfit = curRev - curCost;
  const curMargin = curRev > 0 ? (curProfit / curRev) * 100 : 0;

  const prevProfit = prevRev - prevCost;
  const prevMargin = prevRev > 0 ? (prevProfit / prevRev) * 100 : 0;

  const momChanges = {
    revenuePct: computeMoM(curRev, prevRev),
    costPct: computeMoM(curCost, prevCost),
    profitPct: computeMoM(curProfit, prevProfit),
    marginDiffPct: Number((curMargin - prevMargin).toFixed(1)),
  };

  // Products sorted by profit
  const productList: ProductPerformance[] = Object.values(productMap).map((p) => ({
    ...p,
    margin: p.revenue > 0 ? Number(((p.profit / p.revenue) * 100).toFixed(1)) : 0,
  }));
  productList.sort((a, b) => b.profit - a.profit);

  const bestProducts = productList.slice(0, 5);
  const worstProducts = [...productList].sort((a, b) => a.profit - b.profit).slice(0, 5);

  // Category breakdown with anomaly detection (>15% drop in profit)
  const alerts: string[] = [];
  const categories: CategorySummary[] = Object.keys(catTotalMap).map((cat) => {
    const c = catTotalMap[cat];
    const margin = c.revenue > 0 ? Number(((c.profit / c.revenue) * 100).toFixed(1)) : 0;
    const curP = catCurProfit[cat] || 0;
    const prevP = catPrevProfit[cat] || 0;
    let changePct: number | undefined;
    let alertMsg: string | undefined;

    if (prevP > 0) {
      changePct = computeMoM(curP, prevP);
      if (changePct <= -15) {
        alertMsg = `Profit dropped by ${Math.abs(changePct)}% MoM in ${cat}`;
        alerts.push(`Category Alert: ${cat} experienced a sharp ${Math.abs(changePct)}% drop in profit compared to last month.`);
      }
    }

    return {
      category: cat,
      revenue: c.revenue,
      cost: c.cost,
      profit: c.profit,
      margin,
      itemsSold: c.itemsSold,
      prevProfit: prevP,
      profitChangePct: changePct,
      alert: alertMsg,
    };
  });
  categories.sort((a, b) => b.revenue - a.revenue);

  // If cost increased faster than revenue, add margin alert
  if (momChanges.costPct > momChanges.revenuePct && momChanges.costPct > 5) {
    alerts.push(
      `Expense Alert: Operating costs rose +${momChanges.costPct}% this month, outpacing revenue growth (+${momChanges.revenuePct}%).`
    );
  }

  // Monthly trends formatted for Recharts
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthlyTrends: TrendDataPoint[] = Object.keys(monthBuckets)
    .sort()
    .map((mKey) => {
      const item = monthBuckets[mKey];
      const [y, m] = mKey.split("-");
      const label = `${monthNames[parseInt(m, 10) - 1]} ${y.slice(2)}`;
      const margin = item.revenue > 0 ? Number(((item.profit / item.revenue) * 100).toFixed(1)) : 0;
      return {
        label,
        date: item.date,
        revenue: item.revenue,
        cost: item.cost,
        profit: item.profit,
        margin,
      };
    });

  // Recent 30 daily data points for finer charts
  const dailyBuckets: Record<string, { revenue: number; cost: number; profit: number; count: number }> = {};
  for (const t of sorted.slice(-60)) {
    const key = t.date;
    if (!dailyBuckets[key]) {
      dailyBuckets[key] = { revenue: 0, cost: 0, profit: 0, count: 0 };
    }
    const r = Number(t.revenue) || 0;
    const c = Number(t.cost) || 0;
    dailyBuckets[key].revenue += r;
    dailyBuckets[key].cost += c;
    dailyBuckets[key].profit += (r - c);
  }
  const dailyTrends: TrendDataPoint[] = Object.keys(dailyBuckets)
    .sort()
    .slice(-30)
    .map((dStr) => {
      const b = dailyBuckets[dStr];
      const dt = new Date(dStr);
      const label = `${monthNames[dt.getMonth()]} ${dt.getDate()}`;
      return {
        label,
        date: dStr,
        revenue: b.revenue,
        cost: b.cost,
        profit: b.profit,
        margin: b.revenue > 0 ? Number(((b.profit / b.revenue) * 100).toFixed(1)) : 0,
      };
    });

  // Calculate Business Health Score (0 - 100)
  // 1. Revenue Trajectory (max 30 pts): positive MoM up to +20% yields max
  const revGrowth = momChanges.revenuePct;
  const revScore = Math.max(5, Math.min(30, Math.round(15 + revGrowth * 0.75)));

  // 2. Profit Growth & Health (max 30 pts)
  const profGrowth = momChanges.profitPct;
  const profScore = Math.max(5, Math.min(30, Math.round(15 + profGrowth * 0.75)));

  // 3. Margin Health (max 25 pts): margin >= 30% is great
  const marginScore = Math.max(5, Math.min(25, Math.round((curMargin / 40) * 25)));

  // 4. Category Balance / Diversification (max 15 pts): top category shouldn't be > 75%
  let categoryScore = 15;
  if (categories.length > 0) {
    const topShare = categories[0].revenue / (totalRev || 1);
    if (topShare > 0.7) categoryScore = 8;
    else if (topShare > 0.5) categoryScore = 12;
  }

  const rawScore = revScore + profScore + marginScore + categoryScore;
  const finalScore = Math.max(10, Math.min(98, rawScore));

  let rating: "Critical" | "Fair" | "Good" | "Excellent" = "Fair";
  if (finalScore >= 80) rating = "Excellent";
  else if (finalScore >= 65) rating = "Good";
  else if (finalScore >= 45) rating = "Fair";
  else rating = "Critical";

  return {
    currentMonth: {
      revenue: curRev,
      cost: curCost,
      profit: curProfit,
      margin: Number(curMargin.toFixed(1)),
      transactionCount: curCount,
    },
    previousMonth: {
      revenue: prevRev,
      cost: prevCost,
      profit: prevProfit,
      margin: Number(prevMargin.toFixed(1)),
      transactionCount: prevCount,
    },
    momChanges,
    totalAllTime: {
      revenue: totalRev,
      cost: totalCost,
      profit: totalRev - totalCost,
      margin: totalRev > 0 ? Number((((totalRev - totalCost) / totalRev) * 100).toFixed(1)) : 0,
      transactionCount: sorted.length,
    },
    healthScore: {
      score: finalScore,
      rating,
      breakdown: {
        revenueGrowthScore: revScore,
        profitGrowthScore: profScore,
        marginHealthScore: marginScore,
        categoryBalanceScore: categoryScore,
      },
    },
    bestProducts,
    worstProducts,
    categories,
    alerts,
    monthlyTrends,
    dailyTrends,
  };
}
