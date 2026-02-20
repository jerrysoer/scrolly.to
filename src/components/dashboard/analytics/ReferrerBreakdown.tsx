"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { ReferrerGroup } from "@/lib/types";

interface ReferrerBreakdownProps {
  data: ReferrerGroup[];
}

export default function ReferrerBreakdown({ data }: ReferrerBreakdownProps) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted text-sm">
        No referrer data yet.
      </div>
    );
  }

  return (
    <div className="p-5 rounded-xl border border-border bg-card-bg">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
        Traffic Sources — Top 10
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 0, right: 4, bottom: 0, left: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: "var(--text-muted)" }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <YAxis
              type="category"
              dataKey="domain"
              tick={{ fontSize: 11, fill: "var(--text-secondary)" }}
              axisLine={false}
              tickLine={false}
              width={120}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-strong)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--text)",
              }}
            />
            <Bar
              dataKey="count"
              fill="var(--accent)"
              radius={[0, 4, 4, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
