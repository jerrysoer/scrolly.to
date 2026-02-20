"use client";

import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { DailyViews } from "@/lib/types";
import { formatDate } from "@/lib/format";

interface ViewsOverTimeProps {
  data: DailyViews[];
  label?: string;
}

export default function ViewsOverTime({ data, label }: ViewsOverTimeProps) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted text-sm">
        No view data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        {label ?? "Views — Last 30 Days"}
      </h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -20 }}>
            <defs>
              <linearGradient id="viewsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--accent)" stopOpacity={0.25} />
                <stop offset="60%" stopColor="var(--accent)" stopOpacity={0.06} />
                <stop offset="100%" stopColor="var(--accent)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="var(--border)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatDate}
              tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "var(--text-muted)", fontFamily: "var(--font-mono)" }}
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
              labelFormatter={(l) => formatDate(String(l))}
              cursor={{ stroke: "var(--accent)", strokeWidth: 1, strokeDasharray: "4 4" }}
            />
            <Area
              type="monotone"
              dataKey="views"
              stroke="var(--accent)"
              strokeWidth={2}
              fill="url(#viewsGradient)"
              dot={false}
              activeDot={{
                r: 4,
                stroke: "var(--accent)",
                strokeWidth: 2,
                fill: "var(--card-bg)",
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
