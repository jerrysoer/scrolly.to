"use client";

interface SectionHeatmapProps {
  data: Record<string, number>;
}

export default function SectionHeatmap({ data }: SectionHeatmapProps) {
  const entries = Object.entries(data).sort((a, b) => b[1] - a[1]);

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-card-bg p-5 text-center text-sm text-text-muted">
        No section data yet
      </div>
    );
  }

  const maxCount = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="rounded-xl border border-border bg-card-bg p-5">
      <h3 className="mb-4 text-xs font-semibold uppercase tracking-wider text-text-muted">
        Section Engagement
      </h3>
      <div className="space-y-2">
        {entries.map(([section, count]) => (
          <div key={section} className="flex items-center gap-3">
            <span className="w-32 shrink-0 truncate text-sm text-text" title={section}>
              {section}
            </span>
            <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-surface">
              <div
                className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all"
                style={{ width: `${(count / maxCount) * 100}%`, opacity: 0.75 }}
              />
            </div>
            <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted">
              {count}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
