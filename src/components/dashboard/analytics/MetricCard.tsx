"use client";

import { formatNumber } from "@/lib/format";

interface MetricCardProps {
  label: string;
  value: number;
  suffix?: string;
}

export default function MetricCard({ label, value, suffix }: MetricCardProps) {
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
    </div>
  );
}
