"use client";

import { formatNumber } from "@/lib/format";

interface TrendProps {
  value: number; // percentage change
  label: string;
}

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
  trend?: TrendProps | null;
}

function TrendArrow({ direction }: { direction: "up" | "down" }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <>
          <polyline points="22 7 13.5 15.5 8.5 10.5 2 17" />
          <polyline points="16 7 22 7 22 13" />
        </>
      ) : (
        <>
          <polyline points="22 17 13.5 8.5 8.5 13.5 2 7" />
          <polyline points="16 17 22 17 22 11" />
        </>
      )}
    </svg>
  );
}

export default function MetricCard({ label, value, suffix, trend }: MetricCardProps) {
  return (
    <div className="p-5 rounded-xl border border-border bg-card-bg">
      <p className="text-xs font-medium uppercase tracking-wider text-text-muted mb-2">
        {label}
      </p>
      <p className="font-display text-3xl font-medium text-text tracking-tight">
        {formatNumber(value)}
        {suffix && (
          <span className="text-base font-body text-text-muted ml-1">{suffix}</span>
        )}
      </p>
      {trend && (
        <div className={`mt-2 flex items-center gap-1 text-xs font-medium ${
          trend.value > 0
            ? "text-emerald-500"
            : trend.value < 0
            ? "text-red-500"
            : "text-text-muted"
        }`}>
          {trend.value > 0 ? (
            <TrendArrow direction="up" />
          ) : trend.value < 0 ? (
            <TrendArrow direction="down" />
          ) : null}
          <span>
            {trend.value > 0 ? "+" : ""}
            {trend.value}%
          </span>
          <span className="text-text-muted font-normal">{trend.label}</span>
        </div>
      )}
    </div>
  );
}
