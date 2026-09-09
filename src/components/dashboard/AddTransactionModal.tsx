"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { Transaction, BusinessType } from "@/lib/supabase/types";
import { X, PlusCircle, CheckCircle2, DollarSign, Calendar, Tag, Package, AlertCircle } from "lucide-react";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  businessType?: BusinessType;
  onSuccess: (newTx: Transaction) => void;
}

const CATEGORY_SUGGESTIONS: Record<string, string[]> = {
  "Clothing & Fashion": ["Apparel", "Footwear", "Accessories", "Ethnic Wear", "Denim", "Outerwear"],
  "Restaurant / Café": ["Main Course", "Beverages", "Desserts", "Starters", "Breakfast", "Bakery"],
  "Electronics": ["Smartphones", "Audio & Sound", "Accessories", "Laptops & PC", "Cables & Power", "Gaming"],
  "Pharmacy": ["Prescription Rx", "Over-the-Counter", "Vitamins & Wellness", "Personal Care", "First Aid"],
  "Salon & Beauty": ["Hair Care", "Skin Treatments", "Cosmetics", "Nail Services", "Fragrances"],
  "Grocery / Supermarket": ["Produce & Fresh", "Dairy & Bakery", "Packaged Goods", "Beverages", "Household"],
  "Online Store": ["Top Sellers", "New Arrivals", "Seasonal", "Clearance", "Bundles"],
  "Other": ["General Merchandise", "Services", "Custom Orders", "Miscellaneous"],
};

export function AddTransactionModal({
  isOpen,
  onClose,
  userId,
  businessType = "Clothing & Fashion",
  onSuccess,
}: AddTransactionModalProps) {
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState(CATEGORY_SUGGESTIONS[businessType]?.[0] || "General");
  const [customCategory, setCustomCategory] = useState("");
  const [quantity, setQuantity] = useState("1");
  const [unitPrice, setUnitPrice] = useState("");
  const [costPrice, setCostPrice] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen) return null;

  const qtyNum = Math.max(1, parseInt(quantity, 10) || 1);
  const unitPriceNum = Math.max(0, parseFloat(unitPrice) || 0);
  const costPriceNum = Math.max(0, parseFloat(costPrice) || 0);

  const totalRevenue = qtyNum * unitPriceNum;
  const totalCost = qtyNum * costPriceNum;
  const totalProfit = totalRevenue - totalCost;
  const marginPct = totalRevenue > 0 ? ((totalProfit / totalRevenue) * 100).toFixed(1) : "0.0";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!productName.trim()) {
      setErrorMsg("Please enter a product or item name.");
      return;
    }
    if (unitPriceNum <= 0) {
      setErrorMsg("Please enter a valid selling price greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const activeCategory = category === "Other_Custom" ? (customCategory.trim() || "General") : category;

      const newTxPayload = {
        user_id: userId,
        date: date,
        product_name: productName.trim(),
        category: activeCategory,
        quantity: qtyNum,
        unit_price: unitPriceNum,
        cost_price: costPriceNum,
        revenue: totalRevenue,
        cost: totalCost,
        profit: totalProfit,
      };

      if (userId && userId !== "demo-user-id") {
        const supabase = createClient();
        const { data, error } = await supabase
          .from("transactions")
          .insert([newTxPayload])
          .select()
          .single();

        if (error) {
          throw new Error(error.message);
        }

        onSuccess(data as Transaction);
      } else {
        // Fallback for guest demo session
        const mockSaved: Transaction = {
          id: `manual-${Date.now()}`,
          ...newTxPayload,
          created_at: new Date().toISOString(),
        };
        onSuccess(mockSaved);
      }

      // Reset fields
      setProductName("");
      setUnitPrice("");
      setCostPrice("");
      setQuantity("1");
      onClose();
    } catch (err: unknown) {
      console.error("Save transaction error:", err);
      setErrorMsg(err instanceof Error ? err.message : "Failed to record transaction.");
    } finally {
      setLoading(false);
    }
  };

  const categories = CATEGORY_SUGGESTIONS[businessType] || CATEGORY_SUGGESTIONS["Other"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-[#0E131F] border border-gray-200 dark:border-gray-800 shadow-2xl overflow-hidden transition-all">
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-gray-100 dark:border-gray-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-black dark:bg-white text-white dark:text-black flex items-center justify-center shadow-xs">
              <PlusCircle className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sora text-base sm:text-lg font-bold text-gray-900 dark:text-white">
                Record New Sale
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Manually record a transaction in your ledger
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Error Alert */}
        {errorMsg && (
          <div className="mx-6 mt-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/60 flex items-center gap-2 text-xs text-rose-700 dark:text-rose-400">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Date */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-gray-400" />
                <span>Transaction Date</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5 text-gray-400" />
                <span>Category</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
                <option value="Other_Custom">+ Other (Type Custom)</option>
              </select>
            </div>
          </div>

          {/* Custom Category Input if selected */}
          {category === "Other_Custom" && (
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                Custom Category Name
              </label>
              <input
                type="text"
                placeholder="e.g. Specialty Crafts"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5 flex items-center gap-1.5">
              <Package className="w-3.5 h-3.5 text-gray-400" />
              <span>Product / Item Name</span>
            </label>
            <input
              type="text"
              placeholder="e.g. Batik Cotton Saree, Linen Shirt, Espresso"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition-all placeholder:text-gray-400"
            />
          </div>

          {/* Pricing & Quantity Grid */}
          <div className="grid grid-cols-3 gap-3">
            {/* Quantity */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Quantity
              </label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {/* Unit Selling Price */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Selling Price (Rs.)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="4500"
                value={unitPrice}
                onChange={(e) => setUnitPrice(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>

            {/* Unit Cost Price */}
            <div>
              <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 mb-1.5">
                Cost Price (Rs.)
              </label>
              <input
                type="number"
                min="0"
                step="any"
                placeholder="2500"
                value={costPrice}
                onChange={(e) => setCostPrice(e.target.value)}
                required
                className="w-full px-3 py-2 text-sm rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white"
              />
            </div>
          </div>

          {/* Real-time Financial Breakdown Preview Card */}
          <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-gray-900/60 border border-gray-200/80 dark:border-gray-800 space-y-2">
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Gross Revenue:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs. {totalRevenue.toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <span>Operating Cost:</span>
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs. {totalCost.toLocaleString()}
              </span>
            </div>
            <div className="pt-2 border-t border-gray-200/60 dark:border-gray-800 flex items-center justify-between text-xs">
              <span className="font-bold text-gray-800 dark:text-gray-200">Estimated Net Profit:</span>
              <div className="flex items-center gap-2 font-bold font-sora">
                <span className={totalProfit >= 0 ? "text-emerald-600 dark:text-emerald-400" : "text-rose-600 dark:text-rose-400"}>
                  Rs. {totalProfit.toLocaleString()}
                </span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${
                  totalProfit >= 0
                    ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"
                    : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"
                }`}>
                  {marginPct}% margin
                </span>
              </div>
            </div>
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold text-white bg-black hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200 rounded-xl shadow-sm transition-all disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <>
                  <span className="w-3.5 h-3.5 border-2 border-white dark:border-black border-t-transparent rounded-full animate-spin" />
                  <span>Recording...</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Save Transaction</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
