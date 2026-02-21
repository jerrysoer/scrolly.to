"use client";

interface CompletionRateProps {
  rate: number; // 0–100
}

export default function CompletionRate({ rate }: CompletionRateProps) {
  const clamped = Math.min(100, Math.max(0, rate));
  const color =
    clamped >= 70
      ? "text-emerald-500"
      : clamped >= 40
      ? "text-amber-500"
      : "text-red-500";
  const bgColor =
    clamped >= 70
      ? "bg-emerald-500/15"
      : clamped >= 40
      ? "bg-amber-500/15"
      : "bg-red-500/15";

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-3">
        Completion Rate
      </p>
      <div className="flex items-baseline gap-2">
        <span className="font-display text-3xl font-medium tracking-tight tabular-nums text-text">
          {clamped.toFixed(1)}%
        </span>
        <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-[11px] font-medium ${bgColor} ${color}`}>
          {clamped >= 70 ? "Good" : clamped >= 40 ? "Fair" : "Low"}
        </span>
      </div>
      <p className="mt-2 text-xs text-text-muted">
        Sessions reaching 90%+ scroll depth
      </p>
    </div>
  );
}
