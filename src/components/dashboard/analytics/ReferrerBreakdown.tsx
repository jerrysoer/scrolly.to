"use client";

import { ReferrerGroup } from "@/lib/types";

interface ReferrerBreakdownProps {
  data: ReferrerGroup[];
}

export default function ReferrerBreakdown({ data }: ReferrerBreakdownProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No referrer data yet.
      </div>
    );
  }

  const maxCount = Math.max(...data.map((r) => r.count), 1);

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Traffic Sources
      </h3>
      <div className="space-y-2.5">
        {data.slice(0, 8).map((row) => (
          <div key={row.domain} className="group flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-sm text-text-secondary font-medium">
              {row.domain}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-lg bg-surface">
              <div
                className="absolute inset-y-0 left-0 rounded-lg bg-accent/70 transition-all duration-500 group-hover:bg-accent/90"
                style={{ width: `${Math.max((row.count / maxCount) * 100, 2)}%` }}
              />
            </div>
            <span className="w-12 shrink-0 text-right font-mono text-xs text-text-muted tabular-nums">
              {row.count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
