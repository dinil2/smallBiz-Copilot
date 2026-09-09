"use client";

import { useState, useRef, useEffect } from "react";
import { Sparkles, Send, X, Bot, User, Plus, Mic } from "lucide-react";
import { AnalyticsSummary } from "@/lib/analytics";

interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface AiChatPanelProps {
  isOpen: boolean;
  onClose: () => void;
  summary: AnalyticsSummary;
  shopName: string;
}

const QUICK_PROMPTS = [
  "Why did profit decrease this month?",
  "Which products should I stop stocking?",
  "How can I increase profit margin by 5%?",
];

export function AiChatPanel({ isOpen, onClose, summary, shopName }: AiChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "initial-1",
      role: "assistant",
      content: `Hello! I'm your SmallBiz AI Analyst. How can I help your business today?`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const handleSendMessage = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsg: ChatMessage = {
      id: "user-" + Date.now(),
      role: "user",
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: query,
          mode: "chat",
          analyticsSummary: {
            shopName,
            currentMonth: summary.currentMonth,
            previousMonth: summary.previousMonth,
            momChanges: summary.momChanges,
            healthScore: summary.healthScore,
            bestProducts: summary.bestProducts,
            worstProducts: summary.worstProducts,
            categories: summary.categories,
            alerts: summary.alerts,
          },
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to get response from AI Analyst");
      }

      const data = await res.json();
      const aiMsg: ChatMessage = {
        id: "ai-" + Date.now(),
        role: "assistant",
        content: data.answer || "I reviewed your numbers but couldn't generate an answer.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, aiMsg]);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error contacting AI";
      setMessages((prev) => [
        ...prev,
        {
          id: "err-" + Date.now(),
          role: "assistant",
          content: `⚠️ ${msg}. Please check your connection.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    /* Floating Right-Side Popup Widget matching ZAY-G reference image */
    <div className="fixed bottom-6 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[380px] h-[520px] max-h-[85vh] rounded-3xl bg-white/95 dark:bg-[#131823]/95 backdrop-blur-xl border border-gray-200/90 dark:border-gray-800 shadow-2xl shadow-indigo-500/15 flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-200">
      {/* Header matching Image 5 (ZAY-G style) */}
      <div className="p-4 pb-3 flex items-center justify-between border-b border-gray-100 dark:border-gray-800/80 bg-white/50 dark:bg-gray-900/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center text-white shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="font-sora font-bold text-xs text-gray-900 dark:text-white">
              SmallBiz AI Copilot
            </h4>
            <p className="text-[10px] text-gray-400 dark:text-gray-500">
              Grounded business advisor
            </p>
          </div>
        </div>

        {/* Circular Close Button (Image 5 style) */}
        <button
          onClick={onClose}
          className="w-7 h-7 rounded-full bg-gray-900 text-white dark:bg-gray-700 dark:text-gray-200 flex items-center justify-center hover:bg-gray-800 transition-all cursor-pointer shadow-xs"
          aria-label="Close chat"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Message Stream */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m) => (
          <div
            key={m.id}
            className={`flex flex-col ${m.role === "user" ? "items-end" : "items-start"}`}
          >
            <div
              className={`max-w-[85%] px-4 py-2.5 rounded-2xl text-xs leading-relaxed ${
                m.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-xs shadow-xs"
                  : "bg-gray-100 dark:bg-gray-800/80 text-gray-800 dark:text-gray-200 rounded-bl-xs border border-gray-200/50 dark:border-gray-700/50"
              }`}
            >
              {m.content}
            </div>
            <span className="text-[9px] text-gray-400 px-1 mt-0.5">{m.timestamp}</span>
          </div>
        ))}

        {loading && (
          <div className="flex flex-col items-start">
            <div className="bg-gray-100 dark:bg-gray-800/80 px-4 py-3 rounded-2xl rounded-bl-xs border border-gray-200/50 dark:border-gray-700/50 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.2s]"></span>
              <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-bounce [animation-delay:0.4s]"></span>
              <span className="text-[11px] text-gray-400 ml-1.5">Analyzing your numbers...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Chips */}
      <div className="px-3 py-1.5 bg-gray-50/50 dark:bg-gray-900/30 flex gap-1.5 overflow-x-auto no-scrollbar">
        {QUICK_PROMPTS.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSendMessage(prompt)}
            disabled={loading}
            className="shrink-0 text-[10px] px-2.5 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-300 hover:border-indigo-500 hover:text-indigo-600 transition-colors cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Rounded Pill Input Box (Image 5 exact style) */}
      <div className="p-3 bg-white/70 dark:bg-[#131823] border-t border-gray-100 dark:border-gray-800/80">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800/90 rounded-full px-3 py-1.5 border border-gray-200/60 dark:border-gray-700/60"
        >
          <div className="text-gray-400 p-0.5">
            <Plus className="w-3.5 h-3.5" />
          </div>

          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Chat here..."
            disabled={loading}
            className="flex-1 bg-transparent text-xs text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none"
          />

          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="w-7 h-7 rounded-full bg-indigo-600 text-white flex items-center justify-center hover:bg-indigo-700 disabled:opacity-40 transition-all cursor-pointer"
          >
            <Send className="w-3 h-3" />
          </button>
        </form>
      </div>
    </div>
  );
}
