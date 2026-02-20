"use client";

import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { DeviceStats } from "@/lib/types";

interface DeviceBreakdownProps {
  devices: DeviceStats[];
  browsers: DeviceStats[];
}

const COLORS = [
  "var(--accent)",
  "var(--accent-muted)",
  "var(--text-muted)",
  "var(--border-strong)",
  "var(--score-text)",
  "var(--category-pill-text)",
];

function DonutChart({ data, title }: { data: DeviceStats[]; title: string }) {
  if (data.length === 0) {
    return (
      <div className="p-8 text-center text-text-muted text-sm">
        No data yet.
      </div>
    );
  }

  return (
    <div>
      <h4 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-3">
        {title}
      </h4>
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="count"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={70}
              paddingAngle={2}
              strokeWidth={0}
            >
              {data.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                background: "var(--card-bg)",
                border: "1px solid var(--border-strong)",
                borderRadius: "8px",
                fontSize: "12px",
                color: "var(--text)",
              }}
            />
            <Legend
              wrapperStyle={{ fontSize: "11px", color: "var(--text-secondary)" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function AnalyticsDeviceBreakdown({ devices, browsers }: DeviceBreakdownProps) {
  return (
    <div className="p-5 rounded-xl border border-border bg-card-bg">
      <h3 className="text-xs font-semibold uppercase tracking-wider text-text-muted mb-4">
        Devices & Browsers
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <DonutChart data={devices} title="Device Type" />
        <DonutChart data={browsers} title="Browser" />
      </div>
    </div>
  );
}
