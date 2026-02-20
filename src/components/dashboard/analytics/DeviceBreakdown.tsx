"use client";

import { DeviceStats } from "@/lib/types";

interface DeviceBreakdownProps {
  devices: DeviceStats[];
  browsers: DeviceStats[];
}

const PALETTE = [
  "var(--accent)",
  "var(--accent-muted)",
  "var(--text-muted)",
  "var(--border-strong)",
];

function SegmentedBar({ data, title }: { data: DeviceStats[]; title: string }) {
  const total = data.reduce((sum, d) => sum + d.count, 0);
  if (!total) {
    return (
      <div className="text-center text-text-muted text-sm py-4">No data yet.</div>
    );
  }

  return (
    <div>
      <h4 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-3">
        {title}
      </h4>
      {/* Segmented bar */}
      <div className="flex h-3 rounded-full overflow-hidden gap-0.5">
        {data.slice(0, 4).map((item, i) => (
          <div
            key={item.label}
            className="h-full rounded-full transition-all duration-500 first:rounded-l-full last:rounded-r-full"
            style={{
              width: `${Math.max((item.count / total) * 100, 2)}%`,
              backgroundColor: PALETTE[i % PALETTE.length],
              opacity: 0.8,
            }}
          />
        ))}
      </div>
      {/* Legend */}
      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5">
        {data.slice(0, 4).map((item, i) => (
          <div key={item.label} className="flex items-center gap-1.5">
            <span
              className="inline-block w-2 h-2 rounded-full"
              style={{ backgroundColor: PALETTE[i % PALETTE.length], opacity: 0.8 }}
            />
            <span className="text-xs text-text-secondary">{item.label}</span>
            <span className="text-xs text-text-muted tabular-nums font-mono">
              {Math.round((item.count / total) * 100)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function AnalyticsDeviceBreakdown({ devices, browsers }: DeviceBreakdownProps) {
  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Devices & Browsers
      </h3>
      <div className="space-y-6">
        <SegmentedBar data={devices} title="Device Type" />
        <SegmentedBar data={browsers} title="Browser" />
      </div>
    </div>
  );
}
