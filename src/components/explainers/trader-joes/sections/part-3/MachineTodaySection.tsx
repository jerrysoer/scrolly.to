"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import {
  storeGrowthData,
  machineTodayStats,
  aldiComparison,
  codaText,
} from "@/components/explainers/trader-joes/data/part-3";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  ReferenceArea,
} from "recharts";

function CustomTooltip({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { era: string } }>;
  label?: number;
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-xl border-2 px-4 py-3"
      style={{
        background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
        borderColor: "var(--accent-gold)",
        borderStyle: "dashed",
      }}
    >
      <p
        className="text-xs font-bold uppercase tracking-wide"
        style={{
          fontFamily: "var(--font-dm-mono), monospace",
          color: "var(--accent-gold)",
        }}
      >
        {label} · {payload[0].payload.era} era
      </p>
      <p
        className="mt-1 text-lg font-bold"
        style={{
          fontFamily: "var(--font-source-serif), Georgia, serif",
          color: "var(--text-primary)",
        }}
      >
        {payload[0].value.toLocaleString()} stores
      </p>
    </div>
  );
}

const CEO_ERAS = [
  { name: "Coulombe", start: 1967, end: 1988, color: "#8B4513" },
  { name: "Shields", start: 1988, end: 2001, color: "#B8860B" },
  { name: "Bane", start: 2001, end: 2023, color: "#DAA520" },
  { name: "Palbaum", start: 2023, end: 2025, color: "#CD853F" },
];

function getEraFromYear(year: number | undefined) {
  if (!year) return null;
  return CEO_ERAS.find(era => year >= era.start && year <= era.end) || null;
}

export default function MachineTodaySection() {
  const [activeEra, setActiveEra] = useState<string | null>(null);

  return (
    <>
      <style jsx>{`
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        @keyframes pulse-glow {
          0%, 100% { box-shadow: 0 4px 20px rgba(184, 134, 11, 0.2); }
          50% { box-shadow: 0 8px 32px rgba(184, 134, 11, 0.35); }
        }
        .stat-card {
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
        .stat-card:hover {
          transform: translateY(-8px) rotate(1deg) scale(1.03);
        }
        .comparison-card {
          transition: all 0.3s ease;
        }
        .comparison-card:hover {
          transform: translateX(8px);
          box-shadow: 0 12px 40px rgba(184, 134, 11, 0.25);
        }
        .grain-overlay {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.08'/%3E%3C/svg%3E");
          pointer-events: none;
          mix-blend-mode: overlay;
          opacity: 0.5;
        }
        .ledger-stamp {
          animation: float-slow 8s ease-in-out infinite;
        }
        .era-badge {
          transition: all 0.3s ease;
          opacity: 0.4;
        }
        .era-badge.active {
          opacity: 1;
          transform: scale(1.1);
        }
        .era-badge:hover {
          opacity: 1;
          transform: scale(1.05);
        }
      `}</style>

      <div className="section-divider-numbered">
        <span className="number">08</span>
      </div>

      <SectionWrapper id="machine-today" layout="centered-card">
        <div className="flex flex-col gap-12">
          {/* Hero */}
          <div className="text-center">
            <div
              className="inline-block px-4 py-2 mb-4 border-2 rounded-full"
              style={{
                borderColor: "rgba(184, 134, 11, 0.3)",
                borderStyle: "dashed",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
              }}
            >
              Present Day
            </div>
            <h2
              className="text-4xl sm:text-5xl font-bold mb-4"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                color: "var(--text-primary)",
              }}
            >
              The Machine Today
            </h2>
            <p
              className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                color: "var(--text-secondary)",
              }}
            >
              From one store in Pasadena to 631 locations across 43 states. The machine Joe built has never stopped growing.
            </p>
          </div>

          {/* Billboard Stats - Floating Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {machineTodayStats.map((stat, i) => (
              <div
                key={i}
                className="stat-card relative px-6 py-8 rounded-2xl"
                style={{
                  background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                  border: "2px solid var(--accent-gold)",
                  transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                {/* Corner pins */}
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)", top: "10px", left: "10px" }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)", top: "10px", right: "10px" }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)", bottom: "10px", left: "10px" }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{ backgroundColor: "var(--accent-gold)", bottom: "10px", right: "10px" }}
                />

                <div className="text-center relative z-10">
                  <CounterAnimation
                    target={stat.target}
                    prefix={stat.prefix}
                    suffix={stat.suffix}
                    className="block text-4xl sm:text-5xl font-bold"
                    style={{
                      fontFamily: "var(--font-source-serif), Georgia, serif",
                      background: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  />
                  <p
                    className="mt-2 text-xs tracking-wider uppercase"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      color: "var(--text-tertiary)",
                    }}
                  >
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Store Growth Chart - Organic Textured */}
          <div
            className="relative rounded-2xl border-2 p-6 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
              borderColor: "rgba(184, 134, 11, 0.3)",
              borderStyle: "dashed",
            }}
          >
            <div className="grain-overlay" />
            <div className="flex items-center justify-between mb-6">
              <p
                className="text-xs font-bold uppercase tracking-wider"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--accent-gold)",
                }}
              >
                Store Growth · 1967 &ndash; 2025
              </p>
              {activeEra && (
                <p
                  className="text-xs font-bold uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    color: "var(--accent-gold)",
                  }}
                >
                  {activeEra} Era
                </p>
              )}
            </div>

            {/* CEO Era Badges */}
            <div className="flex gap-2 mb-4 flex-wrap justify-center">
              {CEO_ERAS.map((era) => (
                <button
                  key={era.name}
                  className={`era-badge px-3 py-1.5 rounded-full border-2 cursor-pointer ${
                    activeEra === era.name ? "active" : ""
                  }`}
                  style={{
                    borderColor: era.color,
                    backgroundColor: activeEra === era.name ? `${era.color}20` : "transparent",
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontSize: "0.65rem",
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: era.color,
                  }}
                  onMouseEnter={() => setActiveEra(era.name)}
                  onMouseLeave={() => setActiveEra(null)}
                >
                  {era.name} {era.start}–{era.end}
                </button>
              ))}
            </div>

            <ResponsiveContainer width="100%" height={320}>
              <AreaChart
                data={storeGrowthData}
                margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
                onMouseMove={(data: any) => {
                  if (data && data.activeLabel) {
                    const era = getEraFromYear(data.activeLabel);
                    if (era) setActiveEra(era.name);
                  }
                }}
                onMouseLeave={() => setActiveEra(null)}
              >
                <defs>
                  <linearGradient id="organicGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#B8860B" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#DAA520" stopOpacity={0.05} />
                  </linearGradient>
                  {CEO_ERAS.map((era) => (
                    <linearGradient key={`gradient-${era.name}`} id={`gradient-${era.name}`} x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor={era.color} stopOpacity={0.6} />
                      <stop offset="100%" stopColor={era.color} stopOpacity={0.1} />
                    </linearGradient>
                  ))}
                </defs>

                {/* Highlight active era background */}
                {activeEra && CEO_ERAS.map((era) => {
                  if (era.name === activeEra) {
                    return (
                      <ReferenceArea
                        key={`area-${era.name}`}
                        x1={era.start}
                        x2={era.end}
                        fill={era.color}
                        fillOpacity={0.15}
                        strokeOpacity={0}
                      />
                    );
                  }
                  return null;
                })}
                <XAxis
                  dataKey="year"
                  tick={{
                    fill: "var(--text-tertiary)",
                    fontSize: 11,
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                  axisLine={{ stroke: "rgba(184, 134, 11, 0.3)", strokeDasharray: "3 3" }}
                  tickLine={false}
                />
                <YAxis
                  tick={{
                    fill: "var(--text-tertiary)",
                    fontSize: 11,
                    fontFamily: "var(--font-dm-mono), monospace",
                  }}
                  axisLine={false}
                  tickLine={false}
                  width={45}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine
                  x={1988}
                  stroke="var(--accent-gold)"
                  strokeDasharray="3 3"
                  strokeOpacity={0.6}
                  label={{
                    value: "Shields",
                    position: "top",
                    fill: "var(--accent-gold)",
                    fontSize: 10,
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontWeight: "bold",
                  }}
                />
                <ReferenceLine
                  x={2001}
                  stroke="var(--accent-gold)"
                  strokeDasharray="3 3"
                  strokeOpacity={0.6}
                  label={{
                    value: "Bane",
                    position: "top",
                    fill: "var(--accent-gold)",
                    fontSize: 10,
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontWeight: "bold",
                  }}
                />
                <ReferenceLine
                  x={2023}
                  stroke="var(--accent-gold)"
                  strokeDasharray="3 3"
                  strokeOpacity={0.6}
                  label={{
                    value: "Palbaum",
                    position: "top",
                    fill: "var(--accent-gold)",
                    fontSize: 10,
                    fontFamily: "var(--font-dm-mono), monospace",
                    fontWeight: "bold",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="stores"
                  stroke={activeEra ? CEO_ERAS.find(e => e.name === activeEra)?.color || "#B8860B" : "#B8860B"}
                  strokeWidth={3}
                  fill={activeEra ? `url(#gradient-${activeEra})` : "url(#organicGradient)"}
                  style={{ transition: "all 0.3s ease" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Aldi Comparison - Visual Cards */}
          <div>
            <p
              className="text-center mb-6 text-xs uppercase tracking-widest font-bold"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              The Family Comparison
            </p>
            <div className="grid grid-cols-1 gap-4">
              {aldiComparison.map((row, i) => (
                <div
                  key={i}
                  className="comparison-card rounded-xl p-5 border"
                  style={{
                    background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                    borderColor: "rgba(184, 134, 11, 0.2)",
                  }}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <p
                      className="text-xs uppercase tracking-wider font-bold"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {row.metric}
                    </p>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-8 rounded-full"
                        style={{ backgroundColor: "var(--accent-gold)" }}
                      />
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide"
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            color: "var(--accent-gold)",
                            fontSize: "0.65rem",
                          }}
                        >
                          Trader Joe's
                        </p>
                        <p
                          className="text-base font-bold"
                          style={{
                            fontFamily: "var(--font-source-serif), Georgia, serif",
                            color: "var(--text-primary)",
                          }}
                        >
                          {row.tj}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div
                        className="w-1.5 h-8 rounded-full"
                        style={{ backgroundColor: "var(--text-tertiary)", opacity: 0.3 }}
                      />
                      <div>
                        <p
                          className="text-xs uppercase tracking-wide"
                          style={{
                            fontFamily: "var(--font-dm-mono), monospace",
                            color: "var(--text-tertiary)",
                            fontSize: "0.65rem",
                          }}
                        >
                          Aldi (US)
                        </p>
                        <p
                          className="text-base"
                          style={{
                            fontFamily: "var(--font-source-serif), Georgia, serif",
                            color: "var(--text-secondary)",
                          }}
                        >
                          {row.aldi}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expansion Branches - Organic Growth Visual */}
          <div
            className="relative rounded-2xl p-8 overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
              border: "2px solid rgba(184, 134, 11, 0.3)",
            }}
          >
            <p
              className="text-center mb-6 text-xs uppercase tracking-widest font-bold"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              Geographic Expansion
            </p>
            <div className="flex flex-col items-center gap-4 max-w-md mx-auto">
              {[
                { era: "1967-1988", region: "California Origins", stores: "1 → 27" },
                { era: "1988-2001", region: "Pacific Northwest", stores: "27 → 158" },
                { era: "2001-2023", region: "National Expansion", stores: "158 → 543" },
                { era: "2023-Present", region: "43 States & Counting", stores: "543 → 631" },
              ].map((phase, i) => (
                <div key={i} className="w-full flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-full border-4 flex items-center justify-center flex-shrink-0"
                    style={{
                      backgroundColor: "#faf8f4",
                      borderColor: "var(--accent-gold)",
                      boxShadow: "0 0 0 4px rgba(184, 134, 11, 0.15)",
                    }}
                  >
                    <p
                      className="text-xs font-bold"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: "var(--accent-gold)",
                      }}
                    >
                      {i + 1}
                    </p>
                  </div>
                  <div className="flex-1 px-4 py-3 rounded-lg border" style={{
                    borderColor: "rgba(184, 134, 11, 0.2)",
                    borderStyle: "dashed",
                  }}>
                    <p
                      className="text-xs uppercase tracking-wide mb-1"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: "var(--text-tertiary)",
                      }}
                    >
                      {phase.era}
                    </p>
                    <p
                      className="text-sm font-bold"
                      style={{
                        fontFamily: "var(--font-source-serif), Georgia, serif",
                        color: "var(--text-primary)",
                      }}
                    >
                      {phase.region}
                    </p>
                    <p
                      className="text-xs mt-1"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: "var(--accent-gold)",
                      }}
                    >
                      {phase.stores} stores
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Ledger Stamp Coda */}
          <div className="flex flex-col items-center gap-6 mt-8">
            <div
              className="w-px h-12"
              style={{
                background: "linear-gradient(180deg, var(--accent-gold) 0%, transparent 100%)",
                opacity: 0.3,
              }}
            />
            <div
              className="ledger-stamp relative w-48 h-48 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                border: "3px solid var(--accent-gold)",
                boxShadow: "0 8px 32px rgba(184, 134, 11, 0.2), inset 0 2px 8px rgba(184, 134, 11, 0.1)",
              }}
            >
              {/* Decorative border dots */}
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    top: "50%",
                    left: "50%",
                    transform: `translate(-50%, -50%) rotate(${i * 30}deg) translateY(-88px)`,
                  }}
                />
              ))}
              <p
                className="text-center text-lg leading-tight max-w-[140px] italic relative z-10"
                style={{
                  fontFamily: "var(--font-source-serif), Georgia, serif",
                  color: "var(--text-primary)",
                }}
              >
                {codaText}
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
