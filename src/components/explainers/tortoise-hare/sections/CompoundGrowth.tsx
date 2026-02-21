"use client";

import { useState, useMemo } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceDot,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { compoundDatasets, timeHorizons, generateCompoundData } from "@/lib/explainers/tortoise-hare-compound";

export default function CompoundGrowth() {
  const [days, setDays] = useState(90);

  const data = useMemo(() => {
    const key = String(days);
    return compoundDatasets[key] || generateCompoundData(days);
  }, [days]);

  const crossoverPoint = useMemo(
    () => data.find((d) => d.label === "Crossover!"),
    [data]
  );

  const finalTortoise = data[data.length - 1]?.tortoise || 1;
  const finalHare = data[data.length - 1]?.hare || 1;

  const horizon = timeHorizons.find((h) => h.value === days);

  return (
    <SectionWrapper id="compound-growth" tinted className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            Section II
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light mb-4">
            The Math of Consistency
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            One percent better every day versus a ten percent burst followed by stagnation.
            The crossover comes sooner than you think.
          </p>
        </div>

        {/* Time horizon selector */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {timeHorizons.map((h) => (
            <button
              key={h.value}
              onClick={() => setDays(h.value)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                days === h.value
                  ? "bg-accent-purple text-white shadow-md"
                  : "bg-bg-card text-text-secondary border border-border hover:border-accent-purple"
              }`}
            >
              {h.label}
            </button>
          ))}
        </div>

        {/* Chart */}
        <div className="bg-bg-card border border-border rounded-2xl p-4 sm:p-8">
          <div className="h-[350px] sm:h-[420px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="gradTortoiseC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--correct-green)" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="var(--correct-green)" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient id="gradHareC" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="var(--backward-orange)" stopOpacity={0.2} />
                    <stop offset="100%" stopColor="var(--backward-orange)" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
                <XAxis
                  dataKey="day"
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Days", position: "insideBottom", offset: -5, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <YAxis
                  stroke="var(--text-tertiary)"
                  tick={{ fontSize: 12, fontFamily: "var(--font-mono)" }}
                  label={{ value: "Growth (x)", angle: -90, position: "insideLeft", offset: 10, fontSize: 12, fill: "var(--text-tertiary)" }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--bg-card)",
                    border: "1px solid var(--border)",
                    borderRadius: "12px",
                    fontSize: "13px",
                    fontFamily: "var(--font-mono)",
                  }}
                  formatter={(value: number | undefined, name: string | undefined) => [
                    `${(value ?? 0).toFixed(2)}x`,
                    name === "tortoise" ? "1% Daily (Tortoise)" : "10% Burst (Hare)",
                  ]}
                />
                {crossoverPoint && (
                  <ReferenceDot
                    x={crossoverPoint.day}
                    y={crossoverPoint.tortoise}
                    r={6}
                    fill="var(--accent-purple)"
                    stroke="var(--bg-card)"
                    strokeWidth={2}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="hare"
                  stroke="var(--backward-orange)"
                  fill="url(#gradHareC)"
                  strokeWidth={2}
                  dot={false}
                  name="hare"
                />
                <Area
                  type="monotone"
                  dataKey="tortoise"
                  stroke="var(--correct-green)"
                  fill="url(#gradTortoiseC)"
                  strokeWidth={2.5}
                  dot={false}
                  name="tortoise"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-correct-green mb-1">
              1% Daily After {horizon?.label}
            </p>
            <p className="text-3xl font-mono font-bold text-correct-green">
              {finalTortoise.toFixed(1)}x
            </p>
          </div>
          <div className="bg-bg-card border border-border rounded-xl p-5 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-backward-orange mb-1">
              10% Burst After {horizon?.label}
            </p>
            <p className="text-3xl font-mono font-bold text-backward-orange">
              {finalHare.toFixed(2)}x
            </p>
          </div>
          <div className="bg-accent-purple/10 border border-accent-purple/30 rounded-xl p-5 text-center">
            <p className="text-xs font-mono uppercase tracking-wider text-accent-purple mb-1">
              Crossover Point
            </p>
            <p className="text-3xl font-mono font-bold text-accent-purple">
              {crossoverPoint ? `Day ${crossoverPoint.day}` : "N/A"}
            </p>
          </div>
        </div>

        {/* Key insight */}
        <div className="mt-10 bg-bg-card border border-border rounded-2xl p-6 sm:p-8 text-center">
          <blockquote className="font-heading text-xl sm:text-2xl italic text-text-primary leading-relaxed">
            &ldquo;The first rule of compounding: never interrupt it unnecessarily.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-sm text-text-tertiary font-body not-italic">
            -- Charlie Munger
          </cite>
        </div>
      </div>
    </SectionWrapper>
  );
}
