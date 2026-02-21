"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import { lightningBolt1, lightningBolt2 } from "@/components/explainers/trader-joes/data/part-1";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

const enrollmentData = [
  { year: "1945", value: 1 },
  { year: "1950", value: 2.2 },
  { year: "1955", value: 3 },
  { year: "1960", value: 4.5 },
  { year: "1965", value: 7 },
];

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number }>;
  label?: string;
}) {
  if (!active || !payload?.length) return null;

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
      <p
        className="mt-1 text-sm font-semibold"
        style={{ color: "var(--text-primary)" }}
      >
        {payload[0].value}M enrolled
      </p>
    </div>
  );
}

export default function LightningSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">08</span>
      </div>

      <SectionWrapper id="lightning" layout="split-left">
      {/* LEFT column: chart */}
      <div>
        <h2
          className="mb-6 text-3xl font-bold leading-tight sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          Two Bolts of Lightning
        </h2>

        <p
          className="mb-6 text-xs uppercase tracking-widest"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-tertiary)",
          }}
        >
          U.S. College Enrollment, 1945&ndash;1965
        </p>

        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={enrollmentData}
            margin={{ top: 8, right: 16, bottom: 8, left: 8 }}
          >
            <XAxis
              dataKey="year"
              tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
              stroke="var(--border)"
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 12, fill: "var(--text-tertiary)" }}
              stroke="var(--border)"
              tickLine={false}
              label={{
                value: "Millions enrolled",
                angle: -90,
                position: "insideLeft",
                offset: 0,
                style: {
                  fontSize: 11,
                  fill: "var(--text-tertiary)",
                  fontFamily: "var(--font-dm-mono), monospace",
                },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--accent-red)"
              strokeWidth={3}
              dot={{
                r: 5,
                fill: "var(--accent-red)",
                stroke: "var(--bg-primary)",
                strokeWidth: 2,
              }}
              activeDot={{
                r: 7,
                fill: "var(--accent-red)",
                stroke: "var(--accent-gold)",
                strokeWidth: 2,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* RIGHT column: stat cards */}
      <div className="flex flex-col gap-6 justify-center">
        {/* Card 1: Overeducated Consumer */}
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            borderLeftWidth: "4px",
            borderLeftColor: "var(--accent-gold)",
          }}
        >
          <h3
            className="mb-2 text-lg font-bold"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "var(--text-primary)",
            }}
          >
            {lightningBolt1.title}
          </h3>
          <p
            className="mb-4 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {lightningBolt1.description}
          </p>
          <CounterAnimation
            target={700}
            suffix="%"
            className="block text-3xl font-bold"
          />
          <p
            className="mt-1 text-xs tracking-wide uppercase"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            {lightningBolt1.statLabel}
          </p>
        </div>

        {/* Card 2: Fair Trade Laws */}
        <div
          className="rounded-lg border p-6"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
            borderLeftWidth: "4px",
            borderLeftColor: "var(--accent-gold)",
          }}
        >
          <h3
            className="mb-2 text-lg font-bold"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "var(--text-primary)",
            }}
          >
            {lightningBolt2.title}
          </h3>
          <p
            className="mb-4 text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {lightningBolt2.description}
          </p>
          <p
            className="text-3xl font-bold"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-primary)",
            }}
          >
            {lightningBolt2.stat}
          </p>
          <p
            className="mt-1 text-xs tracking-wide uppercase"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            {lightningBolt2.statLabel}
          </p>
        </div>
      </div>
    </SectionWrapper>
    </>
  );
}
