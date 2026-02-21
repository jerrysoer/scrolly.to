"use client";

import { VisitorTypeBreakdown } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

interface ReturnVisitorsProps {
  data: VisitorTypeBreakdown[];
}

const COLORS: Record<string, string> = {
  new: "var(--accent)",
  returning: "var(--accent-muted)",
};

export default function ReturnVisitors({ data }: ReturnVisitorsProps) {
  const total = data.reduce((sum, d) => sum + d.visitor_count, 0);

  if (data.length === 0 || total === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No visitor data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        New vs Returning Visitors
      </h3>
      <div className="h-52 relative">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="visitor_count"
              nameKey="visitor_type"
              cx="50%"
              cy="50%"
              innerRadius={50}
              outerRadius={80}
              strokeWidth={0}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.visitor_type}
                  fill={COLORS[entry.visitor_type] ?? "var(--border-strong)"}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center label */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <span className="block text-2xl font-medium tabular-nums text-text">
              {formatNumber(total)}
            </span>
            <span className="block text-[10px] uppercase tracking-[0.12em] text-text-muted">
              total
            </span>
          </div>
        </div>
      </div>
      {/* Legend */}
      <div className="mt-4 flex items-center justify-center gap-6">
        {data.map((entry) => (
          <div key={entry.visitor_type} className="flex items-center gap-2">
            <span
              className="inline-block w-2.5 h-2.5 rounded-full"
              style={{
                backgroundColor:
                  COLORS[entry.visitor_type] ?? "var(--border-strong)",
              }}
            />
            <span className="text-xs text-text-secondary capitalize">
              {entry.visitor_type}
            </span>
            <span className="font-mono text-xs text-text-muted tabular-nums">
              {formatNumber(entry.visitor_count)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
