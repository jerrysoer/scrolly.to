"use client";

import { CampaignStats } from "@/lib/types";
import { formatNumber } from "@/lib/format";

interface CampaignTableProps {
  data: CampaignStats[];
}

function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  return m > 0 ? `${m}m ${s}s` : `${s}s`;
}

export default function CampaignTable({ data }: CampaignTableProps) {
  const sorted = [...data].sort((a, b) => b.views - a.views).slice(0, 10);

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No campaign data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6 overflow-x-auto">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        UTM Campaigns
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Source
            </th>
            <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Campaign
            </th>
            <th className="pb-3 text-left text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Medium
            </th>
            <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Views
            </th>
            <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Avg Duration
            </th>
            <th className="pb-3 text-right text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted">
              Completion %
            </th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={`${row.utm_source}-${row.utm_campaign}-${i}`}
              className="border-b border-border/50 last:border-0 hover:bg-surface/50 transition-colors"
            >
              <td className="py-3 text-text-secondary font-medium">
                {row.utm_source}
              </td>
              <td className="py-3 text-text-muted">
                {row.utm_campaign ?? "\u2014"}
              </td>
              <td className="py-3 text-text-muted">
                {row.utm_medium ?? "\u2014"}
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {formatNumber(row.views)}
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {formatDuration(row.avg_duration)}
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {Math.round(row.completion_rate)}%
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
