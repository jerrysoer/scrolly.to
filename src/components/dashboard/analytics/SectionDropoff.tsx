"use client";

import { SectionDropoff as SectionDropoffData } from "@/lib/types";

interface SectionDropoffProps {
  data: SectionDropoffData[];
}

export default function SectionDropoff({ data }: SectionDropoffProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No section data yet.
      </div>
    );
  }

  const sorted = [...data].sort((a, b) => b.view_count - a.view_count);
  const maxViews = Math.max(...sorted.map((s) => s.view_count), 1);

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Section Drop-off
      </h3>
      <div className="space-y-2.5">
        {sorted.map((row) => {
          const totalWidth = (row.view_count / maxViews) * 100;
          const exitWidth =
            row.view_count > 0
              ? (row.exit_count / row.view_count) * totalWidth
              : 0;
          const viewWidth = totalWidth - exitWidth;

          return (
            <div key={row.section_id} className="group flex items-center gap-3">
              <span className="w-28 shrink-0 truncate text-sm text-text-secondary font-medium">
                {row.section_id}
              </span>
              <div className="relative h-6 flex-1 overflow-hidden rounded-lg bg-surface">
                <div
                  className="absolute inset-y-0 left-0 rounded-l-lg bg-accent/70 transition-all duration-500 group-hover:bg-accent/90"
                  style={{ width: `${Math.max(viewWidth, 1)}%` }}
                />
                {exitWidth > 0 && (
                  <div
                    className="absolute inset-y-0 rounded-r-lg bg-red-500/60 transition-all duration-500 group-hover:bg-red-500/80"
                    style={{
                      left: `${viewWidth}%`,
                      width: `${Math.max(exitWidth, 1)}%`,
                    }}
                  />
                )}
              </div>
              <div className="w-20 shrink-0 text-right font-mono text-xs text-text-muted tabular-nums">
                {row.view_count}
                {row.exit_count > 0 && (
                  <span className="text-red-500/80 ml-1">-{row.exit_count}</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-4 flex items-center gap-4 text-[10px] text-text-muted">
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-accent/70" />
          Views
        </span>
        <span className="flex items-center gap-1.5">
          <span className="inline-block w-2.5 h-2.5 rounded-sm bg-red-500/60" />
          Exits
        </span>
      </div>
    </div>
  );
}
