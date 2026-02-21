"use client";

import { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import AnimatedCounter from "./AnimatedCounter";
import {
  confidenceDistribution,
  hallucinationRates,
} from "@/lib/explainers/hallucinate";

// ─── Sorted hallucination data (high → low) ──────────────────────────────────
const sortedRates = [...hallucinationRates].sort((a, b) => b.rate - a.rate);

function barColor(rate: number): string {
  if (rate >= 15) return "var(--hallucination-red)";
  if (rate >= 10) return "var(--accent-amber)";
  return "var(--forward-blue)";
}

// ─── Custom Pie tooltip ───────────────────────────────────────────────────────
function PieTooltipContent({
  active,
  payload,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; payload: { description: string } }>;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = payload[0];
  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-lg text-xs font-sans max-w-[200px]"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-1">{entry.name}</p>
      <p style={{ color: "var(--forward-blue)" }} className="font-mono text-sm">
        {entry.value}%
      </p>
      <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
        {entry.payload.description}
      </p>
    </div>
  );
}

// ─── Custom Bar tooltip ───────────────────────────────────────────────────────
function BarTooltipContent({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload || payload.length === 0) return null;
  const entry = sortedRates.find((r) => r.domain === label);
  return (
    <div
      className="rounded-lg border px-4 py-3 shadow-lg text-xs font-sans max-w-[220px]"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <p className="font-semibold mb-1">{label}</p>
      <p
        className="font-mono text-sm"
        style={{ color: barColor(payload[0].value) }}
      >
        {payload[0].value}% hallucination rate
      </p>
      {entry && (
        <>
          <p className="mt-1" style={{ color: "var(--text-secondary)" }}>
            Sample: {entry.sampleSize}
          </p>
          <p className="mt-0.5" style={{ color: "var(--text-tertiary)" }}>
            {entry.source}
          </p>
        </>
      )}
    </div>
  );
}

export default function CantSayIDontKnowSection() {
  const [activeSlice, setActiveSlice] = useState<number | null>(null);

  const activeSliceData =
    activeSlice !== null ? confidenceDistribution[activeSlice] : null;

  return (
    <SectionWrapper id="cant-say-i-dont-know" layout="full-bleed">
      {/* Full-bleed outer container */}
      <div
        className="w-full px-4 py-16 sm:py-24"
        style={{ backgroundColor: "var(--bg-secondary)" }}
      >
        <div className="max-w-6xl mx-auto">
          {/* ── Section header ── */}
          <div className="text-center mb-12">
            <p
              className="font-mono text-xs uppercase tracking-widest mb-3"
              style={{ color: "var(--forward-blue)" }}
            >
              Section 04
            </p>
            <h2
              className="font-serif text-3xl font-bold sm:text-4xl"
              style={{ color: "var(--text-primary)" }}
            >
              Why It Can&rsquo;t Say &ldquo;I Don&rsquo;t Know&rdquo;
            </h2>
            <p
              className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              The model was trained on text where humans answer questions.
              Confident answers appear far more in{" "}
              <JargonTerm
                term="training data"
                definition="The massive collection of text an AI model learns from — books, websites, forums, articles, code"
              >
                training data
              </JargonTerm>{" "}
              than &ldquo;I&rsquo;m not sure.&rdquo; So the model learned:
              questions get answered. It has no built-in uncertainty detector
              &mdash; it just keeps predicting.
            </p>
          </div>

          {/* ── Stat box ── */}
          <div className="flex justify-center mb-12">
            <div
              className="rounded-2xl border px-10 py-8 text-center hover:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                // @ts-expect-error custom property
                "--tw-ring-color": "var(--forward-blue)",
              }}
            >
              <p
                className="font-serif text-6xl font-bold sm:text-7xl tabular-nums"
                style={{ color: "var(--forward-blue)" }}
                aria-label="52 percent"
              >
                <AnimatedCounter target={52} suffix="%" duration={1600} />
              </p>
              <p
                className="mt-3 font-sans text-sm sm:text-base max-w-xs"
                style={{ color: "var(--text-secondary)" }}
              >
                of internet text consists of confident assertions
              </p>
            </div>
          </div>

          {/* ── Two-column charts ── */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left: Pie chart — confidence distribution */}
            <div
              className="rounded-2xl border p-6 hover:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                // @ts-expect-error custom property
                "--tw-ring-color": "var(--forward-blue)",
              }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--forward-blue)" }}
              >
                Training Data Composition
              </h3>
              <p
                className="font-sans text-sm mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                What kind of text does an AI actually learn from?
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                {/* Donut chart */}
                <div style={{ width: 200, height: 200, flexShrink: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={confidenceDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={55}
                        outerRadius={90}
                        dataKey="percentage"
                        nameKey="category"
                        strokeWidth={2}
                        stroke="var(--bg-card)"
                        onMouseEnter={(_, index) => setActiveSlice(index)}
                        onMouseLeave={() => setActiveSlice(null)}
                        onClick={(_, index) =>
                          setActiveSlice(activeSlice === index ? null : index)
                        }
                        aria-label="Training data confidence distribution"
                        role="img"
                      >
                        {confidenceDistribution.map((entry, index) => (
                          <Cell
                            key={entry.category}
                            fill={entry.color}
                            opacity={
                              activeSlice === null || activeSlice === index
                                ? 1
                                : 0.35
                            }
                            style={{ cursor: "pointer", outline: "none" }}
                          />
                        ))}
                      </Pie>
                      <Tooltip
                        content={<PieTooltipContent />}
                        wrapperStyle={{ zIndex: 50 }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                {/* Legend */}
                <div className="flex flex-col gap-2 flex-1 min-w-0">
                  {confidenceDistribution.map((entry, index) => (
                    <button
                      key={entry.category}
                      className="flex items-center gap-2 text-left rounded-lg px-2 py-1.5 transition-colors w-full"
                      style={{
                        backgroundColor:
                          activeSlice === index
                            ? "var(--bg-secondary)"
                            : "transparent",
                        minHeight: 44,
                      }}
                      onMouseEnter={() => setActiveSlice(index)}
                      onMouseLeave={() => setActiveSlice(null)}
                      onClick={() =>
                        setActiveSlice(activeSlice === index ? null : index)
                      }
                      aria-pressed={activeSlice === index}
                      aria-label={`${entry.category}: ${entry.percentage}%`}
                    >
                      <span
                        className="inline-block w-3 h-3 rounded-full shrink-0"
                        style={{ backgroundColor: entry.color }}
                        aria-hidden="true"
                      />
                      <span className="flex-1 min-w-0">
                        <span
                          className="font-sans text-xs block truncate"
                          style={{ color: "var(--text-primary)" }}
                        >
                          {entry.category}
                        </span>
                      </span>
                      <span
                        className="font-mono text-xs shrink-0"
                        style={{ color: entry.color }}
                      >
                        {entry.percentage}%
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Active slice description */}
              <div
                className="mt-4 rounded-lg border px-4 py-3 min-h-[52px] transition-all"
                style={{
                  borderColor: activeSliceData
                    ? activeSliceData.color
                    : "var(--border)",
                  backgroundColor: "var(--bg-secondary)",
                }}
                aria-live="polite"
                aria-atomic="true"
              >
                {activeSliceData ? (
                  <>
                    <p
                      className="font-mono text-xs uppercase tracking-wide mb-0.5"
                      style={{ color: activeSliceData.color }}
                    >
                      {activeSliceData.category} &mdash; {activeSliceData.percentage}%
                    </p>
                    <p
                      className="font-sans text-xs"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {activeSliceData.description}
                    </p>
                  </>
                ) : (
                  <p
                    className="font-sans text-xs italic"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    Hover or tap a segment to learn more.
                  </p>
                )}
              </div>

              {/* Key insight */}
              <p
                className="mt-4 font-sans text-xs leading-relaxed"
                style={{ color: "var(--text-secondary)" }}
              >
                Only{" "}
                <strong style={{ color: "var(--verified-green)" }}>8%</strong>{" "}
                of the text an AI learns from expresses any uncertainty. The
                model learned that questions deserve confident answers.
              </p>
            </div>

            {/* Right: Horizontal bar chart — hallucination rates by domain */}
            <div
              className="rounded-2xl border p-6 hover:ring-2 transition-all"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                // @ts-expect-error custom property
                "--tw-ring-color": "var(--forward-blue)",
              }}
            >
              <h3
                className="font-mono text-xs uppercase tracking-widest mb-1"
                style={{ color: "var(--forward-blue)" }}
              >
                Hallucination Rate by Domain
              </h3>
              <p
                className="font-sans text-sm mb-5"
                style={{ color: "var(--text-secondary)" }}
              >
                Not all topics are equally risky.
              </p>

              <ResponsiveContainer width="100%" height={320}>
                <BarChart
                  data={sortedRates}
                  layout="vertical"
                  margin={{ top: 0, right: 48, bottom: 0, left: 0 }}
                  barCategoryGap="20%"
                >
                  <XAxis
                    type="number"
                    domain={[0, 30]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{
                      fontSize: 10,
                      fill: "var(--text-tertiary)",
                      fontFamily: "var(--font-jetbrains-mono)",
                    }}
                    axisLine={{ stroke: "var(--border)" }}
                    tickLine={{ stroke: "var(--border)" }}
                  />
                  <YAxis
                    type="category"
                    dataKey="domain"
                    width={140}
                    tick={{
                      fontSize: 11,
                      fill: "var(--text-secondary)",
                      fontFamily: "var(--font-source-sans)",
                    }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    content={<BarTooltipContent />}
                    cursor={{ fill: "var(--bg-secondary)" }}
                  />
                  <Bar dataKey="rate" radius={[0, 4, 4, 0]}>
                    {sortedRates.map((entry) => (
                      <Cell
                        key={entry.domain}
                        fill={barColor(entry.rate)}
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>

              {/* Risk legend */}
              <div className="mt-4 flex flex-wrap gap-3">
                {[
                  { label: "High risk (≥15%)", color: "var(--hallucination-red)" },
                  { label: "Medium risk (10–15%)", color: "var(--accent-amber)" },
                  { label: "Lower risk (<10%)", color: "var(--forward-blue)" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-1.5">
                    <span
                      className="inline-block w-2.5 h-2.5 rounded-sm"
                      style={{ backgroundColor: item.color }}
                      aria-hidden="true"
                    />
                    <span
                      className="font-sans text-xs"
                      style={{ color: "var(--text-tertiary)" }}
                    >
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Source note */}
              <p
                className="mt-3 font-sans text-xs"
                style={{ color: "var(--text-tertiary)" }}
              >
                Rates are approximate mid-point estimates from published
                benchmarks circa 2024. Hover bars for source details.
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
