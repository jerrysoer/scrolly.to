"use client";

interface SectionDwellTimeProps {
  data: Record<string, number>; // section_id -> average seconds
}

function formatDwell(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

export default function SectionDwellTime({ data }: SectionDwellTimeProps) {
  const entries = Object.entries(data).sort(([, a], [, b]) => b - a);

  if (entries.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No dwell time data yet.
      </div>
    );
  }

  const maxTime = Math.max(...entries.map(([, v]) => v), 1);

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Section Dwell Time
      </h3>
      <div className="space-y-2.5">
        {entries.map(([sectionId, seconds]) => (
          <div key={sectionId} className="group flex items-center gap-3">
            <span className="w-28 shrink-0 truncate text-sm text-text-secondary font-medium">
              {sectionId}
            </span>
            <div className="relative h-6 flex-1 overflow-hidden rounded-lg bg-surface">
              <div
                className="absolute inset-y-0 left-0 rounded-lg bg-accent/70 transition-all duration-500 group-hover:bg-accent/90"
                style={{ width: `${Math.max((seconds / maxTime) * 100, 2)}%` }}
              />
            </div>
            <span className="w-14 shrink-0 text-right font-mono text-xs text-text-muted tabular-nums">
              {formatDwell(seconds)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
