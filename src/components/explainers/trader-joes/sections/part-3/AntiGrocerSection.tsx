"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  antiGrocerRefusals,
  radarChartData,
  antiGrocerInsight,
  antiGrocerPunchline,
} from "@/components/explainers/trader-joes/data/part-3";
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  Tooltip,
} from "recharts";
import { X } from "lucide-react";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; dataKey: string; color: string }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

  const nameMap: Record<string, string> = {
    tj: "Trader Joe's",
    walmart: "Walmart",
    wholeFoods: "Whole Foods",
  };

  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-lg"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wide"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--accent-gold)",
        }}
      >
        {label}
      </p>
      {payload.map((entry) => (
        <p
          key={entry.dataKey}
          className="mt-1 text-sm font-semibold"
          style={{ color: entry.color }}
        >
          {nameMap[entry.dataKey] || entry.dataKey}: {entry.value}
        </p>
      ))}
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex justify-center gap-6 mt-3">
      {[
        { label: "Trader Joe\u2019s", color: "var(--accent-gold)" },
        { label: "Walmart", color: "var(--accent-navy)" },
        { label: "Whole Foods", color: "var(--accent-green)" },
      ].map((item) => (
        <div key={item.label} className="flex items-center gap-2">
          <div
            className="h-3 w-3 rounded-full"
            style={{ backgroundColor: item.color }}
          />
          <span
            className="text-xs"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-secondary)",
            }}
          >
            {item.label}
          </span>
        </div>
      ))}
    </div>
  );
}

export default function AntiGrocerSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">04</span>
      </div>

      <SectionWrapper id="anti-grocer" layout="centered" tinted={true}>
        <div className="text-center mb-12">
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            Competitive Radar
          </p>
          <h2
            className="text-3xl font-bold leading-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            The Anti-Grocer
          </h2>
          <p
            className="mt-4 text-lg leading-relaxed max-w-2xl mx-auto"
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              color: "var(--text-secondary)",
            }}
          >
            What Trader Joe&apos;s refuses to do is more revealing than what it
            does.
          </p>
        </div>

        {/* Radar Chart */}
        <div className="mx-auto max-w-xl mb-14">
          <ResponsiveContainer width="100%" height={350}>
            <RadarChart data={radarChartData} cx="50%" cy="50%">
              <PolarGrid stroke="var(--border)" />
              <PolarAngleAxis
                dataKey="axis"
                tick={{
                  fontSize: 11,
                  fill: "var(--text-tertiary)",
                  fontFamily: "var(--font-dm-mono), monospace",
                }}
              />
              <PolarRadiusAxis
                angle={90}
                domain={[0, 100]}
                tick={false}
                axisLine={false}
              />
              <Tooltip content={<CustomTooltip />} />
              <Radar
                name="Trader Joe's"
                dataKey="tj"
                stroke="var(--accent-gold)"
                fill="var(--accent-gold)"
                fillOpacity={0.3}
              />
              <Radar
                name="Walmart"
                dataKey="walmart"
                stroke="var(--accent-navy)"
                fill="var(--accent-navy)"
                fillOpacity={0.1}
              />
              <Radar
                name="Whole Foods"
                dataKey="wholeFoods"
                stroke="var(--accent-green)"
                fill="var(--accent-green)"
                fillOpacity={0.1}
              />
              <Legend content={<CustomLegend />} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Refusal Grid */}
        <div className="mb-14">
          <p
            className="mb-6 text-center text-xs uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            The Six Refusals
          </p>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
            {antiGrocerRefusals.map((refusal) => (
              <div
                key={refusal.item}
                className="card-lift flex items-center gap-3 rounded-lg border p-4"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                <X
                  size={18}
                  strokeWidth={2.5}
                  style={{ color: "var(--accent-red)", flexShrink: 0 }}
                />
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {refusal.item}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Intel Callout */}
        <div
          className="intel-callout rounded-lg border p-6 mb-14"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            borderLeftWidth: "4px",
            borderLeftColor: "var(--accent-gold)",
          }}
        >
          <p
            className="mb-1 text-xs font-bold uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--accent-gold)",
            }}
          >
            {antiGrocerInsight.title}
          </p>
          <p
            className="text-sm leading-relaxed"
            style={{
              fontFamily: "var(--font-source-serif), Georgia, serif",
              color: "var(--text-secondary)",
            }}
          >
            {antiGrocerInsight.description}
          </p>
        </div>

        {/* Punchline Stat */}
        <div className="text-center">
          <p
            className="mb-2 text-xs uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            Revenue per Square Foot
          </p>
          <div className="flex items-baseline justify-center gap-3">
            <span
              className="text-4xl font-bold sm:text-5xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              {antiGrocerPunchline.tjRevenuePerSqft}
            </span>
            <span
              className="text-lg"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              vs
            </span>
            <span
              className="text-4xl font-bold sm:text-5xl"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-navy)",
              }}
            >
              {antiGrocerPunchline.walmartRevenuePerSqft}
            </span>
          </div>
          <div className="mt-2 flex justify-center gap-8">
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Trader Joe&apos;s
            </span>
            <span
              className="text-xs"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Walmart
            </span>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
