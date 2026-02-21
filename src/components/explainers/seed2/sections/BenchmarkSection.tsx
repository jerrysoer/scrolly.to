"use client";

import { useState } from "react";
import { Lightbulb } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import {
  benchmarks,
  benchmarkCategories,
  benchmarkInsight,
  modelColors,
  type BenchmarkCategory,
  type BenchmarkEntry,
} from "@/lib/explainers/seed2-benchmarks";

const modelKeys = [
  { key: "Seed2.0 Pro", dataKey: "seed2Pro" },
  { key: "GPT-5.2", dataKey: "gpt52" },
  { key: "Claude Opus", dataKey: "claudeOpus" },
  { key: "Gemini-3-Pro", dataKey: "gemini3Pro" },
] as const;

function transformToChartData(entries: BenchmarkEntry[]) {
  return entries.map((b) => ({
    name: b.benchmark,
    "Seed2.0 Pro": b.seed2Pro,
    "GPT-5.2": b.gpt52,
    "Claude Opus": b.claudeOpus,
    "Gemini-3-Pro": b.gemini3Pro,
  }));
}

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

function CustomTooltip({ active, payload, label }: CustomTooltipProps) {
  if (!active || !payload || payload.length === 0) return null;

  const isElo = label === "Codeforces Elo";

  return (
    <div className="rounded-lg border border-border bg-bg-card p-3 shadow-lg">
      <p className="mb-2 font-sans text-sm font-semibold text-text-primary">
        {label}
      </p>
      <div className="flex flex-col gap-1">
        {payload.map((entry) => (
          <div
            key={entry.name}
            className="flex items-center justify-between gap-4"
          >
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: entry.color }}
              />
              <span className="font-sans text-xs text-text-secondary">
                {entry.name}
              </span>
            </div>
            <span className="font-mono text-xs font-medium text-text-primary">
              {isElo ? entry.value.toLocaleString() : `${entry.value}%`}
            </span>
          </div>
        ))}
      </div>
      {isElo && (
        <p className="mt-2 border-t border-border pt-2 font-sans text-[10px] text-text-tertiary">
          Elo rating scale (higher = better)
        </p>
      )}
    </div>
  );
}

export default function BenchmarkSection() {
  const [activeCategory, setActiveCategory] = useState<BenchmarkCategory>("All");

  const filtered =
    activeCategory === "All"
      ? benchmarks
      : benchmarks.filter((b) => b.category === activeCategory);

  const chartData = transformToChartData(filtered);

  const hasElo = filtered.some((b) => b.benchmark === "Codeforces Elo");
  const allValues = filtered.flatMap((b) => [
    b.seed2Pro,
    b.gpt52,
    b.claudeOpus,
    b.gemini3Pro,
  ]);
  const minVal = Math.min(...allValues);
  const maxVal = Math.max(...allValues);

  const yDomain: [number, number] = hasElo
    ? [Math.floor(minVal * 0.9), Math.ceil(maxVal * 1.05)]
    : [0, 100];

  return (
    <SectionWrapper id="benchmarks">
      {/* Section header */}
      <div className="mb-10">
        <p className="mb-3 font-serif text-base italic text-text-tertiary">
          Think of benchmarks like standardized tests for AI &mdash; imperfect, but the common yardstick everyone uses.
        </p>
        <h2 className="font-serif text-3xl font-semibold tracking-tight text-text-primary sm:text-4xl">
          The Scoreboard
        </h2>
        <p className="mt-3 max-w-2xl font-sans text-base text-text-secondary sm:text-lg">
          How Seed2.0 Pro stacks up against GPT-5.2, Claude Opus, and Gemini-3-Pro
          across reasoning, code, math, and general benchmarks &mdash; including{" "}
          <JargonTerm
            term="MMLU-Pro"
            definition="Massive Multitask Language Understanding (Pro edition). Tests broad knowledge across 57 subjects including STEM, humanities, and social sciences."
          />,{" "}
          <JargonTerm
            term="AIME"
            definition="American Invitational Mathematics Examination. A prestigious math competition that serves as a qualifier for the USA Mathematical Olympiad."
          />,{" "}
          <JargonTerm
            term="Codeforces Elo"
            definition="A competitive programming rating system. Ratings above 2400 are 'International Grandmaster' level. Seed2.0 Pro's 3020 would rank among the top human competitors."
          />, and{" "}
          <JargonTerm
            term="SWE-Bench"
            definition="Software Engineering Benchmark. Tests whether AI can solve real GitHub issues from popular open-source projects \u2014 a proxy for real-world coding ability."
          />.
        </p>
      </div>

      {/* Category toggle pills */}
      <div className="mb-8 flex flex-wrap gap-2">
        {benchmarkCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`
              rounded-full px-4 py-2 font-sans text-sm font-medium
              transition-all duration-200
              ${
                activeCategory === cat
                  ? "bg-forward-blue text-white shadow-sm"
                  : "bg-bg-secondary text-text-secondary hover:bg-bg-card"
              }
            `}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Legend */}
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {modelKeys.map(({ key }) => (
          <div key={key} className="flex items-center gap-2">
            <span
              className="inline-block h-3 w-3 rounded-sm"
              style={{ backgroundColor: modelColors[key] }}
            />
            <span className="font-sans text-xs text-text-secondary">{key}</span>
          </div>
        ))}
      </div>

      {/* Chart */}
      <div className="rounded-xl border border-border bg-bg-card p-4">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={chartData}
            margin={{ top: 8, right: 8, bottom: 8, left: 0 }}
            barCategoryGap="18%"
            barGap={2}
          >
            <XAxis
              dataKey="name"
              tick={{
                fontSize: 12,
                fontFamily: "var(--font-dm-sans), sans-serif",
                fill: "var(--text-tertiary)",
              }}
              tickLine={false}
              axisLine={{ stroke: "var(--border)" }}
              interval={0}
              angle={filtered.length > 4 ? -20 : 0}
              textAnchor={filtered.length > 4 ? "end" : "middle"}
              height={filtered.length > 4 ? 60 : 40}
            />
            <YAxis
              domain={yDomain}
              hide
            />
            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "var(--bg-secondary)", opacity: 0.5 }}
            />
            {modelKeys.map(({ key }) => (
              <Bar
                key={key}
                dataKey={key}
                fill={modelColors[key]}
                radius={[4, 4, 0, 0]}
                maxBarSize={48}
              >
                {chartData.map((entry, index) => {
                  const isLeader =
                    key === "Seed2.0 Pro" &&
                    entry["Seed2.0 Pro"] >=
                      Math.max(
                        entry["GPT-5.2"],
                        entry["Claude Opus"],
                        entry["Gemini-3-Pro"]
                      );
                  return (
                    <Cell
                      key={`cell-${index}`}
                      fillOpacity={isLeader ? 1 : 0.85}
                    />
                  );
                })}
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>

        {hasElo && (
          <p className="mt-2 text-center font-sans text-xs text-text-tertiary">
            Codeforces Elo uses an absolute rating scale (higher is better); other benchmarks
            are accuracy percentages.
          </p>
        )}
      </div>

      {/* Insight callout */}
      <div className="mt-8 flex items-start gap-3 rounded-xl bg-bg-secondary p-4">
        <Lightbulb className="mt-0.5 h-5 w-5 flex-shrink-0 text-accent-amber" />
        <p className="font-sans text-sm leading-relaxed text-text-secondary">
          {benchmarkInsight}
        </p>
      </div>

      {/* Why Should I Care? */}
      <div className="mt-6 border-l-2 border-forward-blue pl-4">
        <p className="font-serif text-sm italic leading-relaxed text-text-secondary">
          <span className="font-semibold not-italic text-text-primary">Why should I care?</span>{" "}
          This is why the team evaluating AI vendors for your company can now include a provider
          that was barely on the radar six months ago.
        </p>
      </div>
    </SectionWrapper>
  );
}
