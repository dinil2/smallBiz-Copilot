"use client";

import { useState } from "react";
import { Search, Filter, ArrowUpDown, TrendingUp, TrendingDown, AlertTriangle } from "lucide-react";
import { ProductPerformance, formatLKR } from "@/lib/analytics";

interface ProductsTableProps {
  products: ProductPerformance[];
}

export function ProductsTable({ products }: ProductsTableProps) {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortField, setSortField] = useState<"profit" | "revenue" | "margin">("profit");
  const [sortAsc, setSortAsc] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))];

  const filtered = products
    .filter((p) => {
      const matchSearch = p.product_name.toLowerCase().includes(search.toLowerCase());
      const matchCat = selectedCategory === "All" || p.category === selectedCategory;
      return matchSearch && matchCat;
    })
    .sort((a, b) => {
      const factor = sortAsc ? 1 : -1;
      return (a[sortField] - b[sortField]) * factor;
    });

  const toggleSort = (field: "profit" | "revenue" | "margin") => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  return (
    <div className="rounded-2xl bg-white dark:bg-gray-900/80 border border-gray-200/80 dark:border-gray-800 shadow-2xs overflow-hidden">
      {/* Header & Filters */}
      <div className="p-4 sm:p-6 border-b border-gray-100 dark:border-gray-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-sora font-bold text-base text-gray-900 dark:text-white">
            Product Performance & Margins
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            Real profit breakdown per product computed from your sales ledger
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {/* Search */}
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Category Dropdown */}
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-1.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 text-xs text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 cursor-pointer"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Responsive Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-gray-600 dark:text-gray-300">
          <thead className="bg-gray-50 dark:bg-gray-800/50 text-[11px] font-semibold text-gray-400 dark:text-gray-400 uppercase tracking-wider border-b border-gray-100 dark:border-gray-800">
            <tr>
              <th className="px-6 py-3.5">Product</th>
              <th className="px-6 py-3.5">Category</th>
              <th className="px-6 py-3.5">Units Sold</th>
              <th
                onClick={() => toggleSort("revenue")}
                className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Revenue</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => toggleSort("profit")}
                className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Net Profit</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th
                onClick={() => toggleSort("margin")}
                className="px-6 py-3.5 cursor-pointer hover:text-indigo-600 dark:hover:text-indigo-400 select-none"
              >
                <div className="flex items-center gap-1">
                  <span>Margin</span>
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-6 py-3.5">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800/60">
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={7} className="px-6 py-8 text-center text-gray-400 text-xs">
                  No products matched your search.
                </td>
              </tr>
            ) : (
              filtered.map((item, idx) => {
                const isHighMargin = item.margin >= 40;
                const isLowMargin = item.margin < 25;

                return (
                  <tr
                    key={idx}
                    className="hover:bg-gray-50/60 dark:hover:bg-gray-800/40 transition-colors"
                  >
                    <td className="px-6 py-3.5 font-medium text-gray-900 dark:text-white">
                      {item.product_name}
                    </td>
                    <td className="px-6 py-3.5 text-gray-500 dark:text-gray-400">
                      {item.category}
                    </td>
                    <td className="px-6 py-3.5">{item.quantity} pcs</td>
                    <td className="px-6 py-3.5 font-semibold text-gray-900 dark:text-white">
                      {formatLKR(item.revenue)}
                    </td>
                    <td className="px-6 py-3.5 font-semibold text-emerald-600 dark:text-emerald-400">
                      {formatLKR(item.profit)}
                    </td>
                    <td className="px-6 py-3.5 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span>{item.margin}%</span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
                      {isHighMargin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border border-emerald-200/60 dark:border-emerald-800/60">
                          <TrendingUp className="w-3 h-3" />
                          <span>Star Earner</span>
                        </span>
                      ) : isLowMargin ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60">
                          <AlertTriangle className="w-3 h-3" />
                          <span>Watch Margin</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300">
                          Healthy
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
