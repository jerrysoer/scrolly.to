"use client";

import { useRouter, useSearchParams } from "next/navigation";

const OPTIONS = [7, 14, 30, 90] as const;

export default function AnalyticsDatePicker() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const current = parseInt(searchParams.get("days") ?? "30", 10) || 30;

  return (
    <div className="flex gap-2">
      {OPTIONS.map((days) => (
        <button
          key={days}
          onClick={() => router.push(`/dashboard/analytics?days=${days}`)}
          className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all ${
            current === days
              ? "border-accent bg-accent text-white"
              : "border-border bg-card-bg text-text-muted hover:border-border-strong hover:text-text"
          }`}
        >
          {days}d
        </button>
      ))}
    </div>
  );
}
