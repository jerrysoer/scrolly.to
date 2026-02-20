"use client";

import { useState } from "react";
import { timeAgo } from "@/lib/format";

interface DashboardHeaderProps {
  dateLabel: string;
  generatedAt: string;
}

function RefreshIcon({ spinning }: { spinning: boolean }) {
  return (
    <svg
      width={12}
      height={12}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={spinning ? "animate-spin" : ""}
    >
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
    </svg>
  );
}

export default function DashboardHeader({ dateLabel, generatedAt }: DashboardHeaderProps) {
  const [refreshState, setRefreshState] = useState<"idle" | "loading" | "triggered" | "error">("idle");

  async function handleRefresh() {
    setRefreshState("loading");
    try {
      const res = await fetch("/api/refresh", { method: "POST" });
      if (res.ok) {
        setRefreshState("triggered");
        setTimeout(() => setRefreshState("idle"), 10_000);
      } else {
        setRefreshState("error");
        setTimeout(() => setRefreshState("idle"), 5_000);
      }
    } catch {
      setRefreshState("error");
      setTimeout(() => setRefreshState("idle"), 5_000);
    }
  }

  return (
    <div className="flex items-center gap-2 text-sm text-text-muted font-body pb-6 mb-8 border-b border-border">
      <span className="font-medium text-text-secondary">{dateLabel}</span>
      <span className="text-border-strong">/</span>
      <span>Updated {timeAgo(generatedAt)}</span>

      <button
        onClick={handleRefresh}
        disabled={refreshState === "loading" || refreshState === "triggered"}
        title="Trigger a fresh feed build"
        className="ml-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-mono
          bg-surface border border-border hover:border-border-strong
          text-text-muted hover:text-text-secondary
          disabled:opacity-50 disabled:cursor-not-allowed
          transition-colors duration-150 cursor-pointer"
      >
        <RefreshIcon spinning={refreshState === "loading"} />
        {refreshState === "idle" && "Refresh"}
        {refreshState === "loading" && "Triggering..."}
        {refreshState === "triggered" && "Pipeline running"}
        {refreshState === "error" && "Failed"}
      </button>

      <div className="ml-auto hidden sm:flex items-center gap-1.5 text-xs text-text-muted">
        <kbd className="px-1.5 py-0.5 rounded bg-kbd-bg font-mono text-[10px]">ESC</kbd>
        <span>close drawer</span>
      </div>
    </div>
  );
}
