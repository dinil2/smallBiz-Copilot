"use client";

import { useEffect, useState } from "react";
import { InteractivePreview } from "./InteractivePreview";

export function ClientPreviewWrapper() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="relative mx-auto max-w-5xl rounded-2xl p-1 bg-gradient-to-b from-gray-200/80 via-gray-100 to-gray-200/40 dark:from-indigo-500/20 dark:via-gray-800/60 dark:to-gray-900/80 shadow-2xl shadow-indigo-500/10 min-h-[420px] transition-all">
        <div className="rounded-[15px] bg-white dark:bg-[#0D121F] border border-gray-200/90 dark:border-gray-800 p-6 min-h-[420px] flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <span className="w-2 h-2 rounded-full bg-indigo-600 animate-ping" />
            <span>Loading Copilot Interactive Engine...</span>
          </div>
        </div>
      </div>
    );
  }

  return <InteractivePreview />;
}
