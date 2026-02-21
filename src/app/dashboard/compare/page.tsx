"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
} from "recharts";
import DateRangePicker from "@/components/dashboard/DateRangePicker";
import { formatNumber, formatDate } from "@/lib/format";

interface ExplainerData {
  explainer: { id: string; name: string; url: string } | null;
  totalViews: number;
  avgDuration: number;
  completionRate: number;
  dailyViews: Array<{ day: string; views: number }>;
  scrollFunnel: Record<string, number>;
  sectionBreakdown: Record<string, number>;
  geo: Array<{
    country: string;
    region: string | null;
    city: string;
    views: number;
  }>;
  referrers: Array<{ referrer_domain: string; views: number }>;
  devices: {
    browsers: Record<string, number>;
    os: Record<string, number>;
    deviceTypes: Record<string, number>;
  };
}

function formatDuration(seconds: number): string {
  if (!seconds || seconds < 0) return "0s";
  const m = Math.floor(seconds / 60);
  const s = Math.round(seconds % 60);
  if (m === 0) return `${s}s`;
  return `${m}m ${s}s`;
}

const FUNNEL_THRESHOLDS = ["25", "50", "75", "100"] as const;

export default function ComparePage() {
  return (
    <Suspense fallback={<div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-sm text-text-muted">Loading...</div>}>
      <CompareContent />
    </Suspense>
  );
}

function CompareContent() {
  const searchParams = useSearchParams();
  const ids = searchParams.get("ids")?.split(",").filter(Boolean) ?? [];
  const [days, setDays] = useState(30);
  const [dataA, setDataA] = useState<ExplainerData | null>(null);
  const [dataB, setDataB] = useState<ExplainerData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (ids.length < 2) {
      setLoading(false);
      return;
    }
    setLoading(true);
    Promise.all([
      fetch(`/api/dashboard/explainer/${ids[0]}?days=${days}`).then((r) =>
        r.json()
      ),
      fetch(`/api/dashboard/explainer/${ids[1]}?days=${days}`).then((r) =>
        r.json()
      ),
    ])
      .then(([a, b]) => {
        setDataA(a);
        setDataB(b);
      })
      .catch(() => {
        setDataA(null);
        setDataB(null);
      })
      .finally(() => setLoading(false));
  }, [ids[0], ids[1], days]);

  if (ids.length < 2) {
    return (
      <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <Link
          href="/dashboard/analytics"
          className="text-sm text-text-muted transition-colors hover:text-text-secondary"
        >
          &larr; Back to analytics
        </Link>
        <p className="mt-12 text-center text-sm text-text-muted">
          Select two explainers to compare. Add{" "}
          <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-xs">
            ?ids=explainer-a,explainer-b
          </code>{" "}
          to the URL.
        </p>
      </div>
    );
  }

  // Merge daily views into a single dataset keyed by date
  const mergedDaily = (() => {
    if (!dataA || !dataB) return [];
    const map = new Map<
      string,
      { date: string; viewsA: number; viewsB: number }
    >();
    for (const d of dataA.dailyViews) {
      map.set(d.day, { date: d.day, viewsA: d.views, viewsB: 0 });
    }
    for (const d of dataB.dailyViews) {
      const existing = map.get(d.day);
      if (existing) {
        existing.viewsB = d.views;
      } else {
        map.set(d.day, { date: d.day, viewsA: 0, viewsB: d.views });
      }
    }
    return Array.from(map.values()).sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
    );
  })();

  const nameA = dataA?.explainer?.name ?? ids[0];
  const nameB = dataB?.explainer?.name ?? ids[1];

  return (
    <div className="max-w-[1480px] mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Back link */}
      <Link
        href="/dashboard/analytics"
        className="text-sm text-text-muted transition-colors hover:text-text-secondary"
      >
        &larr; Back to analytics
      </Link>

      {loading ? (
        <p className="mt-12 text-center text-sm text-text-muted">Loading...</p>
      ) : !dataA || !dataB ? (
        <p className="mt-12 text-center text-sm text-text-muted">
          Could not load data for one or both explainers.
        </p>
      ) : (
        <>
          {/* Header */}
          <div className="mt-4 flex items-center justify-between">
            <h1 className="font-display text-2xl font-medium tracking-tight text-text">
              Compare Explainers
            </h1>
            <DateRangePicker value={days} onChange={setDays} />
          </div>

          <div className="mt-8 space-y-6">
            {/* Explainer name labels */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[var(--accent)]" />
                <span className="text-sm font-medium text-text truncate">
                  {nameA}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-emerald-500" />
                <span className="text-sm font-medium text-text truncate">
                  {nameB}
                </span>
              </div>
            </div>

            {/* Side-by-side metric cards */}
            <div className="grid grid-cols-2 gap-4">
              {/* Total Views */}
              <CompareMetric
                label="Total Views"
                valueA={formatNumber(dataA.totalViews)}
                valueB={formatNumber(dataB.totalViews)}
              />
              {/* Avg Duration */}
              <CompareMetric
                label="Avg Duration"
                valueA={formatDuration(dataA.avgDuration)}
                valueB={formatDuration(dataB.avgDuration)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Completion Rate */}
              <CompareMetric
                label="Completion Rate"
                valueA={`${Math.round(dataA.completionRate)}%`}
                valueB={`${Math.round(dataB.completionRate)}%`}
              />
            </div>

            {/* Overlaid daily views chart */}
            <div className="rounded-2xl border border-border bg-card-bg p-6">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
                Daily Views Comparison
              </h3>
              <div className="h-72">
                {mergedDaily.length === 0 ? (
                  <p className="flex h-full items-center justify-center text-sm text-text-muted">
                    No view data yet.
                  </p>
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={mergedDaily}
                      margin={{ top: 4, right: 4, bottom: 0, left: -20 }}
                    >
                      <defs>
                        <linearGradient
                          id="gradA"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="var(--accent)"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="var(--accent)"
                            stopOpacity={0}
                          />
                        </linearGradient>
                        <linearGradient
                          id="gradB"
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="1"
                        >
                          <stop
                            offset="0%"
                            stopColor="#10b981"
                            stopOpacity={0.2}
                          />
                          <stop
                            offset="100%"
                            stopColor="#10b981"
                            stopOpacity={0}
                          />
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
                        tick={{
                          fontSize: 10,
                          fill: "var(--text-muted)",
                          fontFamily: "var(--font-mono)",
                        }}
                        axisLine={false}
                        tickLine={false}
                        interval="preserveStartEnd"
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
                        labelFormatter={(l) => formatDate(String(l))}
                        cursor={{
                          stroke: "var(--text-muted)",
                          strokeWidth: 1,
                          strokeDasharray: "4 4",
                        }}
                      />
                      <Legend
                        verticalAlign="top"
                        align="right"
                        iconType="circle"
                        iconSize={8}
                        wrapperStyle={{ fontSize: "11px", paddingBottom: "8px" }}
                      />
                      <Area
                        type="monotone"
                        dataKey="viewsA"
                        name={nameA}
                        stroke="var(--accent)"
                        strokeWidth={2}
                        fill="url(#gradA)"
                        dot={false}
                        activeDot={{
                          r: 4,
                          stroke: "var(--accent)",
                          strokeWidth: 2,
                          fill: "var(--card-bg)",
                        }}
                      />
                      <Area
                        type="monotone"
                        dataKey="viewsB"
                        name={nameB}
                        stroke="#10b981"
                        strokeWidth={2}
                        fill="url(#gradB)"
                        dot={false}
                        activeDot={{
                          r: 4,
                          stroke: "#10b981",
                          strokeWidth: 2,
                          fill: "var(--card-bg)",
                        }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>

            {/* Scroll funnel comparison */}
            <div className="rounded-2xl border border-border bg-card-bg p-6">
              <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
                Scroll Depth Comparison
              </h3>
              <div className="grid grid-cols-2 gap-8">
                {/* Funnel A */}
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-medium text-text">
                    <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                    {nameA}
                  </p>
                  <div className="space-y-2.5">
                    {FUNNEL_THRESHOLDS.map((pct) => {
                      const count = dataA.scrollFunnel[pct] ?? 0;
                      const ratio =
                        dataA.totalViews > 0 ? count / dataA.totalViews : 0;
                      return (
                        <div key={pct} className="flex items-center gap-3">
                          <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted">
                            {pct}%
                          </span>
                          <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-surface">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-accent transition-all"
                              style={{
                                width: `${Math.max(ratio * 100, 1)}%`,
                                opacity: 0.85,
                              }}
                            />
                          </div>
                          <span className="w-14 shrink-0 text-right font-mono text-xs text-text">
                            {Math.round(ratio * 100)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Funnel B */}
                <div>
                  <p className="mb-3 flex items-center gap-2 text-xs font-medium text-text">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    {nameB}
                  </p>
                  <div className="space-y-2.5">
                    {FUNNEL_THRESHOLDS.map((pct) => {
                      const count = dataB.scrollFunnel[pct] ?? 0;
                      const ratio =
                        dataB.totalViews > 0 ? count / dataB.totalViews : 0;
                      return (
                        <div key={pct} className="flex items-center gap-3">
                          <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted">
                            {pct}%
                          </span>
                          <div className="relative h-5 flex-1 overflow-hidden rounded-full bg-surface">
                            <div
                              className="absolute inset-y-0 left-0 rounded-full bg-emerald-500 transition-all"
                              style={{
                                width: `${Math.max(ratio * 100, 1)}%`,
                                opacity: 0.85,
                              }}
                            />
                          </div>
                          <span className="w-14 shrink-0 text-right font-mono text-xs text-text">
                            {Math.round(ratio * 100)}%
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

/* ── Inline comparison metric card ─────────────────────────────── */

function CompareMetric({
  label,
  valueA,
  valueB,
}: {
  label: string;
  valueA: string;
  valueB: string;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <p className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        {label}
      </p>
      <div className="flex items-baseline justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
          <span className="font-display text-2xl font-medium tracking-tight tabular-nums text-text">
            {valueA}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          <span className="font-display text-2xl font-medium tracking-tight tabular-nums text-text">
            {valueB}
          </span>
        </div>
      </div>
    </div>
  );
}
