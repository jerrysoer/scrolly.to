"use client";

import { DayOfWeekAvg } from "@/lib/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Cell,
  Tooltip,
  CartesianGrid,
} from "recharts";

interface DayOfWeekBarsProps {
  data: DayOfWeekAvg[];
}

const DAY_LABELS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function DayOfWeekBars({ data }: DayOfWeekBarsProps) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No day-of-week data yet.
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    label: DAY_LABELS[d.day] ?? `D${d.day}`,
  }));

  const maxViews = Math.max(...chartData.map((d) => d.avgViews));

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Avg Views by Day of Week
      </h3>
      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={chartData}
            margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{
                fontSize: 10,
                fill: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{
                fontSize: 10,
                fill: "var(--text-muted)",
                fontFamily: "var(--font-mono)",
              }}
              axisLine={false}
              tickLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-strong)",
                borderRadius: "10px",
                fontSize: "12px",
                color: "var(--text)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
                padding: "8px 12px",
              }}
              formatter={(value) => [
                typeof value === "number" ? value.toFixed(1) : String(value ?? 0),
                "Avg Views",
              ]}
              cursor={{ fill: "var(--accent)", opacity: 0.06 }}
            />
            <Bar dataKey="avgViews" radius={[6, 6, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={index}
                  fill="var(--accent)"
                  fillOpacity={entry.avgViews === maxViews ? 1 : 0.7}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
