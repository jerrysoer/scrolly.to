"use client";

import { ReadingQuality as ReadingQualityType } from "@/lib/types";

interface ReadingQualityProps {
  data: ReadingQualityType[];
}

const QUADRANTS: Record<
  string,
  { label: string; description: string; color: string; bg: string }
> = {
  "deep-reader": {
    label: "Deep Reader",
    description: "High duration + high depth",
    color: "text-emerald-600 dark:text-emerald-400",
    bg: "bg-emerald-500/10",
  },
  skimmer: {
    label: "Skimmer",
    description: "Low duration + high depth",
    color: "text-amber-600 dark:text-amber-400",
    bg: "bg-amber-500/10",
  },
  stuck: {
    label: "Stuck",
    description: "High duration + low depth",
    color: "text-blue-600 dark:text-blue-400",
    bg: "bg-blue-500/10",
  },
  bounced: {
    label: "Bounced",
    description: "Low all",
    color: "text-red-500 dark:text-red-400",
    bg: "bg-red-500/10",
  },
};

const QUADRANT_ORDER = ["deep-reader", "skimmer", "stuck", "bounced"] as const;

export default function ReadingQuality({ data }: ReadingQualityProps) {
  const lookup = Object.fromEntries(data.map((d) => [d.quadrant, d.count]));

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No reading quality data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Reading Quality
      </h3>
      <div className="grid grid-cols-2 gap-3">
        {QUADRANT_ORDER.map((key) => {
          const q = QUADRANTS[key];
          const count = lookup[key] ?? 0;
          return (
            <div
              key={key}
              className={`rounded-xl ${q.bg} p-4 flex flex-col items-center justify-center text-center`}
            >
              <span
                className={`text-2xl font-medium tabular-nums ${q.color}`}
              >
                {count}
              </span>
              <span
                className={`mt-1 text-xs font-semibold ${q.color}`}
              >
                {q.label}
              </span>
              <span className="mt-0.5 text-[10px] text-text-muted">
                {q.description}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
