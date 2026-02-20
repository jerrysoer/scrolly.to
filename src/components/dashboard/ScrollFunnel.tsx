interface ScrollFunnelProps {
  data: Record<string, number>;
  total: number;
}

const THRESHOLDS = ["25", "50", "75", "100"] as const;

export default function ScrollFunnel({ data, total }: ScrollFunnelProps) {
  if (!total) {
    return (
      <div className="rounded-xl border border-border bg-card-bg p-5 text-center text-sm text-text-muted">
        No data yet
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-border bg-card-bg p-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Scroll Depth
      </h3>
      <div className="space-y-3">
        {THRESHOLDS.map((pct) => {
          const count = data[pct] ?? 0;
          const ratio = total > 0 ? count / total : 0;
          return (
            <div key={pct} className="flex items-center gap-3">
              <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted">
                {pct}%
              </span>
              <div className="relative h-6 flex-1 overflow-hidden rounded-full bg-surface">
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all"
                  style={{ width: `${Math.max(ratio * 100, 1)}%`, opacity: 0.85 }}
                />
              </div>
              <span className="w-16 shrink-0 text-right font-mono text-xs text-text">
                {Math.round(ratio * 100)}% <span className="text-text-muted">({count})</span>
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
