"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [7, 14, 30, 90] as const;

export default function AnalyticsDatePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = parseInt(searchParams.get("days") ?? "30", 10) || 30;

  return (
    <div className="flex items-center gap-1 rounded-full border border-border bg-surface/50 p-0.5">
      {OPTIONS.map((days) => (
        <button
          key={days}
          onClick={() => router.push(`/dashboard/analytics?days=${days}`)}
          className={`relative rounded-full px-3 py-1 text-xs font-medium transition-all duration-200 ${
            current === days
              ? "bg-card-bg text-text shadow-sm"
              : "text-text-muted hover:text-text"
          }`}
        >
          {days}d
        </button>
      ))}
    </div>
  );
}
