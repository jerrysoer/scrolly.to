"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import {
  privateLabelMetrics,
  privateLabelNames,
  chartData,
} from "@/components/explainers/trader-joes/data/part-2";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

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
          {entry.dataKey === "tj" ? "Trader Joe's" : "Supermarket"}:{" "}
          {entry.value.toLocaleString()}
          {label?.includes("%") ? "%" : ""}
        </p>
      ))}
    </div>
  );
}

function CustomLegend() {
  return (
    <div className="flex justify-center gap-6 mt-3">
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: "var(--accent-gold)" }}
        />
        <span
          className="text-xs"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-secondary)",
          }}
        >
          Trader Joe&apos;s
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div
          className="h-3 w-3 rounded-sm"
          style={{ backgroundColor: "var(--accent-navy)" }}
        />
        <span
          className="text-xs"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-secondary)",
          }}
        >
          Avg Supermarket
        </span>
      </div>
    </div>
  );
}

export default function PrivateLabelSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">04</span>
      </div>

      <SectionWrapper id="private-label" layout="split-right">
        {/* LEFT column: 3 mini BarCharts, one per metric */}
        <div>
          <p
            className="mb-4 text-xs uppercase tracking-widest"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            TJ&apos;s vs. Average Supermarket
          </p>

          <div className="flex flex-col gap-2">
            {chartData.map((metric) => (
              <div key={metric.category}>
                <ResponsiveContainer width="100%" height={90}>
                  <BarChart
                    data={[metric]}
                    layout="horizontal"
                    margin={{ top: 4, right: 16, bottom: 4, left: 4 }}
                    barGap={2}
                    barCategoryGap="20%"
                  >
                    <XAxis
                      type="number"
                      tick={{ fontSize: 10, fill: "var(--text-tertiary)", fontFamily: "var(--font-dm-mono), monospace" }}
                      stroke="var(--border)"
                      tickLine={false}
                      tickFormatter={(value: number) =>
                        metric.category.includes("%")
                          ? `${value}%`
                          : value >= 1000
                            ? `${(value / 1000).toFixed(0)}k`
                            : String(value)
                      }
                    />
                    <YAxis
                      type="category"
                      dataKey="category"
                      tick={{ fontSize: 11, fill: "var(--text-tertiary)", fontFamily: "var(--font-dm-mono), monospace" }}
                      stroke="var(--border)"
                      tickLine={false}
                      width={100}
                    />
                    <Tooltip
                      content={<CustomTooltip />}
                      cursor={{ fill: "var(--bg-secondary)", opacity: 0.4 }}
                    />
                    <Bar
                      dataKey="tj"
                      fill="var(--accent-gold)"
                      radius={[0, 4, 4, 0]}
                      name="Trader Joe's"
                      barSize={14}
                    />
                    <Bar
                      dataKey="supermarket"
                      fill="var(--accent-navy)"
                      radius={[0, 4, 4, 0]}
                      name="Avg Supermarket"
                      barSize={14}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            ))}
          </div>

          <CustomLegend />
        </div>

        {/* RIGHT column: heading, stats, brand names */}
        <div className="flex flex-col gap-6 justify-center">
          <h2
            className="text-3xl font-bold leading-tight sm:text-4xl"
            style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
          >
            The Private Label Revolution
          </h2>

          {/* Stat cards */}
          <div className="flex flex-col gap-4">
            <div
              className="rounded-lg border p-5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--accent-gold)",
              }}
            >
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-primary)",
                }}
              >
                {privateLabelMetrics.tjSkus.toLocaleString()}
              </p>
              <p
                className="mt-1 text-xs tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-tertiary)",
                }}
              >
                Curated SKUs (vs {privateLabelMetrics.supermarketSkus.toLocaleString()} at avg supermarket)
              </p>
            </div>

            <div
              className="rounded-lg border p-5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--accent-red)",
              }}
            >
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-primary)",
                }}
              >
                {privateLabelMetrics.tjPrivateLabelPct}%
              </p>
              <p
                className="mt-1 text-xs tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-tertiary)",
                }}
              >
                Private label (industry avg: {privateLabelMetrics.industryPrivateLabelPct}%)
              </p>
            </div>

            <div
              className="rounded-lg border p-5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
                borderLeftWidth: "4px",
                borderLeftColor: "var(--accent-green)",
              }}
            >
              <p
                className="text-2xl font-bold"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-primary)",
                }}
              >
                {privateLabelMetrics.priceAdvantageVsWholeFoods}
              </p>
              <p
                className="mt-1 text-xs tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-tertiary)",
                }}
              >
                Cheaper than Whole Foods
              </p>
            </div>
          </div>

          {/* Trading routes map */}
          <div className="overflow-hidden rounded-lg" style={{ aspectRatio: "16/9" }}>
            <img
              src="/a-collection-of-vintage-passport-stamps-arranged-o.png"
              alt="Vintage passport stamps representing Trader Joe's alter ego brands — Trader Giotto's, Trader José's, Trader Ming's, Trader Joe-San's, Pilgrim Joe's, and Arabian Joe's"
              className="h-full w-full object-cover"
              loading="lazy"
            />
          </div>

          {/* Private label brand names */}
          <div>
            <p
              className="mb-3 text-xs uppercase tracking-widest"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              The TJ&apos;s Alter Egos
            </p>
            <div className="flex flex-wrap gap-2">
              {privateLabelNames.map((item) => (
                <span
                  key={item.brand}
                  className="inline-flex items-baseline gap-1.5 rounded-full border px-3 py-1.5 text-xs"
                  style={{
                    backgroundColor: "var(--bg-secondary)",
                    borderColor: "var(--border)",
                  }}
                >
                  <span
                    className="font-semibold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {item.brand}
                  </span>
                  <span style={{ color: "var(--text-tertiary)" }}>
                    {item.origin}
                  </span>
                </span>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
