"use client";

import { formatNumber } from "@/lib/format";

interface TrendProps {
  value: number;
  label: string;
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  trend?: TrendProps | null;
  featured?: boolean;
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <path d="M7 17l5-5 5 5M12 12V3" />
      ) : (
        <path d="M7 7l5 5 5-5M12 12v9" />
      )}
    </svg>
  );
}

export default function MetricCard({ label, value, suffix, trend, featured }: MetricCardProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:border-border-strong ${
        featured
          ? "bg-accent/[0.04] border-accent/20 p-6"
          : "bg-card-bg border-border p-5"
      }`}
    >
      {featured && (
        <div className="absolute top-0 right-0 w-24 h-24 bg-accent/[0.06] rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
      )}
      <p className="relative text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-3">
        {label}
      </p>
      <div className="relative flex items-baseline gap-1.5">
        <span
          className={`font-display tracking-tight tabular-nums ${
            featured ? "text-4xl font-medium text-text" : "text-3xl font-medium text-text"
          }`}
        >
          {suffix ? suffix : formatNumber(value)}
        </span>
        {!suffix && value === 0 && null}
      </div>
      {trend && (
        <div
          className={`relative mt-3 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
            trend.value > 0
              ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
              : trend.value < 0
              ? "bg-red-500/10 text-red-500"
              : "text-text-muted"
          }`}
        >
          {trend.value !== 0 && <TrendArrow direction={trend.value > 0 ? "up" : "down"} />}
          <span className="tabular-nums">
            {trend.value > 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-text-muted/60 font-normal ml-0.5">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
