"use client";

import { useState } from "react";
import Papa from "papaparse";
import { Upload, X, CheckCircle2, AlertCircle, FileText } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

interface CsvUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  userId: string;
  onSuccess: () => void;
}

export function CsvUploadModal({ isOpen, onClose, userId, onSuccess }: CsvUploadModalProps) {
  const [file, setFile] = useState<File | null>(null);
  const [parsing, setParsing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successCount, setSuccessCount] = useState<number | null>(null);

  if (!isOpen) return null;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
      setErrorMsg(null);
      setSuccessCount(null);
    }
  };

  const handleUpload = () => {
    if (!file) {
      setErrorMsg("Please select a valid CSV file first.");
      return;
    }

    setParsing(true);
    setErrorMsg(null);

    // Client-side CSV parsing with PapaParse (Instruction 1 & 3)
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        try {
          const rawData = results.data as Record<string, string>[];
          if (!rawData || rawData.length === 0) {
            setErrorMsg("The CSV file appears to be empty.");
            setParsing(false);
            return;
          }

          // Map CSV headers flexibly
          const mappedRows = rawData.map((row) => {
            const date = row.date || row.Date || row.transaction_date || new Date().toISOString().split("T")[0];
            const product_name = row.product_name || row.Product || row.product || row.Item || "Unknown Item";
            const category = row.category || row.Category || "General";
            const quantity = parseInt(row.quantity || row.Quantity || row.qty || "1", 10) || 1;
            const unit_price = parseFloat(row.unit_price || row.UnitPrice || row.price || row.Price || "0") || 0;
            const cost_price = parseFloat(row.cost_price || row.CostPrice || row.cost || row.Cost || "0") || Math.round(unit_price * 0.6);
            const revenue = parseFloat(row.revenue || row.Revenue || "0") || (unit_price * quantity);
            const cost = parseFloat(row.cost || row.TotalCost || "0") || (cost_price * quantity);
            const profit = revenue - cost;

            return {
              user_id: userId,
              date,
              product_name,
              category,
              quantity,
              unit_price,
              cost_price,
              revenue,
              cost,
              profit,
            };
          });

          // Insert into Supabase
          const supabase = createClient();
          const { error } = await supabase.from("transactions").insert(mappedRows);

          if (error) {
            throw new Error(error.message);
          }

          setSuccessCount(mappedRows.length);
          setParsing(false);
          setTimeout(() => {
            onSuccess();
            onClose();
          }, 1200);
        } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : "Failed to import CSV.";
          setErrorMsg(msg);
          setParsing(false);
        }
      },
      error: (error) => {
        setErrorMsg("Error parsing CSV: " + error.message);
        setParsing(false);
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 p-6 shadow-2xl">
        <div className="flex items-center justify-between pb-4 border-b border-gray-100 dark:border-gray-800">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <Upload className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-sora font-bold text-base text-gray-900 dark:text-white">
                Import Sales CSV
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Parsed securely in your browser via PapaParse
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {errorMsg && (
          <div className="mt-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-800 text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        {successCount !== null && (
          <div className="mt-4 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>Successfully imported {successCount} sales transactions!</span>
          </div>
        )}

        <div className="mt-6">
          <label className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-2xl p-8 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-500 hover:bg-indigo-50/20 dark:hover:bg-indigo-950/10 transition-all text-center">
            <FileText className="w-10 h-10 text-gray-400 dark:text-gray-500 mb-2" />
            <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">
              {file ? file.name : "Click to select or drag CSV file"}
            </span>
            <span className="text-xs text-gray-400 dark:text-gray-500 mt-1">
              Supports POS exports, Shopify, WooCommerce, Excel CSV
            </span>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>

        <div className="mt-4 text-[11px] text-gray-400 dark:text-gray-500">
          Expected headers: <code className="text-indigo-600 dark:text-indigo-400">date, product_name, category, quantity, unit_price, cost_price</code> (auto-mapped)
        </div>

        <div className="mt-6 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-xl transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={!file || parsing}
            className="px-5 py-2 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-xs disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer"
          >
            {parsing ? "Parsing & Storing..." : "Upload Transactions"}
          </button>
        </div>
      </div>
    </div>
  );
}
