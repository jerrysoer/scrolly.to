"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

const hormones = [
  {
    name: "Juvenile Hormone (JH)",
    role: "Keeps the caterpillar in larval form during molts",
    color: "var(--warm-amber)",
    highLow: "High during larval stage",
    icon: "⬆",
  },
  {
    name: "Ecdysone",
    role: "Triggers molting and, at the right moment, metamorphosis",
    color: "var(--forest-green)",
    highLow: "Surges to trigger change",
    icon: "⚡",
  },
];

// SVG path data helpers — all computed for viewBox 600 x 280
// Y-axis: 40 (top/max) → 220 (bottom/min). X-axis: 60 (start) → 570 (end).

const CHART = {
  x0: 60,   // left edge (Y-axis)
  x1: 570,  // right edge
  yTop: 40,
  yBot: 220,
  width: 510,
  height: 180,
};

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function yAt(fraction: number) {
  // fraction 0 = bottom (zero), 1 = top (max)
  return lerp(CHART.yBot, CHART.yTop, fraction);
}

function xAt(fraction: number) {
  return lerp(CHART.x0, CHART.x1, fraction);
}

// ------------------------------------------------------------------
// JH line — smooth cubic bezier path
// Larval mode:  stays high (0.85) the whole time
// Metamorphosis mode: starts high, curves down to near-zero by end
// ------------------------------------------------------------------
function jhPath(mode: "larval" | "metamorphosis") {
  if (mode === "larval") {
    // Flat high line with a slight undulation
    const y = yAt(0.85);
    return `M ${xAt(0)} ${y}
      C ${xAt(0.2)} ${y - 4} ${xAt(0.5)} ${y + 6} ${xAt(0.75)} ${y - 3}
      S ${xAt(0.9)} ${y - 1} ${xAt(1)} ${y}`;
  }
  // Exponential-ish decay: high at start → near zero by ~75% then flat
  return `M ${xAt(0)} ${yAt(0.85)}
    C ${xAt(0.15)} ${yAt(0.82)} ${xAt(0.35)} ${yAt(0.65)} ${xAt(0.55)} ${yAt(0.28)}
    S ${xAt(0.75)} ${yAt(0.06)} ${xAt(1)} ${yAt(0.04)}`;
}

// ------------------------------------------------------------------
// Ecdysone line — discrete pulses at each molt, huge spike at end
// Larval mode:  3 moderate pulses, final spike smaller
// Metamorphosis mode: 2 moderate pulses, HUGE final spike
// ------------------------------------------------------------------
function ecdysonePath(mode: "larval" | "metamorphosis") {
  const base = yAt(0.0); // baseline
  const moltH = mode === "larval" ? 0.45 : 0.42;
  const finalH = mode === "larval" ? 0.55 : 0.98;

  // Pulse generator: returns smooth spike string segment
  // We'll use a polyline-like path through key points
  const pts: [number, number][] = [
    [xAt(0), base],
  ];

  // Molt 1
  const m1 = 0.18;
  pts.push([xAt(m1 - 0.04), base]);
  pts.push([xAt(m1), yAt(moltH)]);
  pts.push([xAt(m1 + 0.04), base]);

  // Molt 2
  const m2 = 0.42;
  pts.push([xAt(m2 - 0.04), base]);
  pts.push([xAt(m2), yAt(moltH)]);
  pts.push([xAt(m2 + 0.04), base]);

  if (mode === "larval") {
    // Molt 3 (extra in larval)
    const m3 = 0.64;
    pts.push([xAt(m3 - 0.04), base]);
    pts.push([xAt(m3), yAt(moltH)]);
    pts.push([xAt(m3 + 0.04), base]);
  }

  // Final metamorphosis spike
  const mFinal = mode === "larval" ? 0.88 : 0.88;
  pts.push([xAt(mFinal - 0.04), base]);
  pts.push([xAt(mFinal), yAt(finalH)]);
  pts.push([xAt(mFinal + 0.055), base]);
  pts.push([xAt(1), base]);

  return "M " + pts.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(" L ");
}

// ------------------------------------------------------------------
// Molt marker x positions
// ------------------------------------------------------------------
const MOLT_LARVAL = [0.18, 0.42, 0.64, 0.88];
const MOLT_META = [0.18, 0.42, 0.88];

const INSTAR_LABELS = ["1st", "2nd", "3rd", "4th", "5th", "Pupa"];

export default function SignalSection() {
  const [mode, setMode] = useState<"larval" | "metamorphosis">("larval");

  const isLarval = mode === "larval";
  const moltPositions = isLarval ? MOLT_LARVAL : MOLT_META;

  return (
    <SectionWrapper id="the-signal" layout="centered" tinted stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
        Stage 2 — The Trigger
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Signal
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
        Metamorphosis doesn&rsquo;t just happen — it&rsquo;s commanded by hormones. Two molecules
        control the caterpillar&rsquo;s fate:{" "}
        <JargonTerm
          term="ecdysone"
          definition="A steroid hormone produced in the prothoracic glands. It triggers molting in insects and, when juvenile hormone drops, triggers metamorphosis."
        />{" "}
        and{" "}
        <JargonTerm
          term="juvenile hormone"
          definition="A sesquiterpenoid hormone that maintains larval characteristics. As long as JH is present, molting produces another larva. When JH drops, metamorphosis begins."
        />
        .
      </p>

      <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
        When the caterpillar reaches the right size and nutritional state, its brain
        signals the{" "}
        <JargonTerm
          term="prothoracic glands"
          definition="Endocrine glands in the thorax of insects that produce ecdysone. They receive signals from the brain to release hormone bursts that trigger molting or metamorphosis."
        />{" "}
        to release a pulse of ecdysone — this time without juvenile hormone to suppress it.
        The body reads this as: <em>&ldquo;stop being a caterpillar.&rdquo;</em>
      </p>

      {/* ── Interactive Hormone Diagram ── */}
      <div
        className="mt-10 rounded-2xl border p-6 sm:p-8"
        style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
      >
        {/* Toggle pill switch */}
        <div className="mb-6 flex items-center justify-between gap-4 flex-wrap">
          <p className="font-mono text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            Hormone levels
          </p>

          <div
            role="group"
            aria-label="Hormone phase selector"
            className="relative flex items-center rounded-full p-1"
            style={{ backgroundColor: "var(--bg-secondary)", border: "1px solid var(--border)" }}
          >
            {/* Sliding indicator */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1 bottom-1 rounded-full transition-all duration-300 ease-in-out"
              style={{
                width: "calc(50% - 4px)",
                left: isLarval ? "4px" : "calc(50%)",
                backgroundColor: isLarval ? "var(--warm-amber)" : "var(--forest-green)",
                opacity: 0.18,
              }}
            />

            <button
              onClick={() => setMode("larval")}
              className="relative z-10 rounded-full px-5 py-2 font-sans text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-pressed={isLarval}
              style={{
                color: isLarval ? "var(--warm-amber)" : "var(--text-tertiary)",
              }}
            >
              Larval Phase
            </button>

            <button
              onClick={() => setMode("metamorphosis")}
              className="relative z-10 rounded-full px-5 py-2 font-sans text-sm font-semibold transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2"
              aria-pressed={!isLarval}
              style={{
                color: !isLarval ? "var(--forest-green)" : "var(--text-tertiary)",
              }}
            >
              Metamorphosis
            </button>
          </div>
        </div>

        {/* SVG diagram */}
        <div className="w-full overflow-x-auto">
          <svg
            viewBox="0 0 600 280"
            role="img"
            aria-labelledby="hormone-chart-title"
            className="w-full"
            style={{ minWidth: "320px" }}
          >
            <title id="hormone-chart-title">
              {isLarval
                ? "Larval phase: Juvenile Hormone remains high, Ecdysone produces moderate molting pulses"
                : "Metamorphosis phase: Juvenile Hormone drops to near zero, Ecdysone surges dramatically"}
            </title>

            {/* Grid lines */}
            {[0.25, 0.5, 0.75, 1.0].map((f) => (
              <line
                key={f}
                x1={CHART.x0}
                y1={yAt(f)}
                x2={CHART.x1}
                y2={yAt(f)}
                stroke="var(--border)"
                strokeWidth="1"
                strokeDasharray="4 4"
                opacity="0.6"
              />
            ))}

            {/* Y-axis */}
            <line
              x1={CHART.x0}
              y1={CHART.yTop - 10}
              x2={CHART.x0}
              y2={CHART.yBot + 10}
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* X-axis */}
            <line
              x1={CHART.x0}
              y1={CHART.yBot}
              x2={CHART.x1 + 10}
              y2={CHART.yBot}
              stroke="var(--border)"
              strokeWidth="1.5"
            />

            {/* X-axis arrow tip */}
            <polygon
              points={`${CHART.x1 + 10},${CHART.yBot - 4} ${CHART.x1 + 18},${CHART.yBot} ${CHART.x1 + 10},${CHART.yBot + 4}`}
              fill="var(--border)"
            />

            {/* Y-axis label */}
            <text
              x={CHART.x0 - 12}
              y={(CHART.yTop + CHART.yBot) / 2}
              textAnchor="middle"
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="10"
              fill="var(--text-tertiary)"
              transform={`rotate(-90, ${CHART.x0 - 12}, ${(CHART.yTop + CHART.yBot) / 2})`}
            >
              Hormone level
            </text>

            {/* X-axis label */}
            <text
              x={(CHART.x0 + CHART.x1) / 2}
              y={CHART.yBot + 36}
              textAnchor="middle"
              fontFamily="var(--font-jetbrains), monospace"
              fontSize="10"
              fill="var(--text-tertiary)"
            >
              Larval instars → Pupa
            </text>

            {/* Instar tick labels */}
            {INSTAR_LABELS.map((label, i) => {
              const x = xAt(i / (INSTAR_LABELS.length - 1));
              return (
                <g key={label}>
                  <line
                    x1={x}
                    y1={CHART.yBot}
                    x2={x}
                    y2={CHART.yBot + 6}
                    stroke="var(--border)"
                    strokeWidth="1.5"
                  />
                  <text
                    x={x}
                    y={CHART.yBot + 18}
                    textAnchor="middle"
                    fontFamily="var(--font-jetbrains), monospace"
                    fontSize="9"
                    fill={label === "Pupa" && !isLarval ? "var(--forest-green)" : "var(--text-tertiary)"}
                    fontWeight={label === "Pupa" && !isLarval ? "700" : "400"}
                  >
                    {label}
                  </text>
                </g>
              );
            })}

            {/* Molt vertical markers */}
            {moltPositions.map((pos, i) => {
              const isFinal = i === moltPositions.length - 1;
              return (
                <line
                  key={pos}
                  x1={xAt(pos)}
                  y1={CHART.yTop - 8}
                  x2={xAt(pos)}
                  y2={CHART.yBot}
                  stroke={isFinal && !isLarval ? "var(--forest-green)" : "var(--border)"}
                  strokeWidth={isFinal && !isLarval ? "1.5" : "1"}
                  strokeDasharray={isFinal ? "none" : "3 3"}
                  opacity={isFinal && !isLarval ? 0.5 : 0.4}
                />
              );
            })}

            {/* "JH low = metamorphosis" annotation in meta mode */}
            {!isLarval && (
              <g>
                <text
                  x={xAt(0.72)}
                  y={yAt(0.25)}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontSize="9"
                  fill="var(--warm-amber)"
                  opacity="0.85"
                >
                  JH ≈ 0
                </text>
                <text
                  x={xAt(0.72)}
                  y={yAt(0.25) + 13}
                  textAnchor="middle"
                  fontFamily="var(--font-jetbrains), monospace"
                  fontSize="9"
                  fill="var(--forest-green)"
                  opacity="0.85"
                >
                  signal ON ↑
                </text>
              </g>
            )}

            {/* Ecdysone fill area (subtle) */}
            <path
              d={`${ecdysonePath(mode)} L ${CHART.x1},${CHART.yBot} L ${CHART.x0},${CHART.yBot} Z`}
              fill="var(--forest-green)"
              fillOpacity="0.07"
              style={{ transition: "d 0.6s ease-in-out" }}
            />

            {/* JH fill area (subtle) */}
            <path
              d={`${jhPath(mode)} L ${CHART.x1},${CHART.yBot} L ${CHART.x0},${CHART.yBot} Z`}
              fill="var(--warm-amber)"
              fillOpacity="0.07"
              style={{ transition: "d 0.6s ease-in-out" }}
            />

            {/* Ecdysone line */}
            <path
              d={ecdysonePath(mode)}
              fill="none"
              stroke="var(--forest-green)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ transition: "d 0.6s ease-in-out" }}
            />

            {/* JH line */}
            <path
              d={jhPath(mode)}
              fill="none"
              stroke="var(--warm-amber)"
              strokeWidth="2.5"
              strokeLinejoin="round"
              strokeLinecap="round"
              style={{ transition: "d 0.6s ease-in-out" }}
            />

            {/* Legend */}
            <g>
              {/* JH legend */}
              <line
                x1={CHART.x0 + 4}
                y1={CHART.yTop - 22}
                x2={CHART.x0 + 22}
                y2={CHART.yTop - 22}
                stroke="var(--warm-amber)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x={CHART.x0 + 28}
                y={CHART.yTop - 18}
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="10"
                fill="var(--warm-amber)"
              >
                Juvenile Hormone
              </text>

              {/* Ecdysone legend */}
              <line
                x1={CHART.x0 + 168}
                y1={CHART.yTop - 22}
                x2={CHART.x0 + 186}
                y2={CHART.yTop - 22}
                stroke="var(--forest-green)"
                strokeWidth="2.5"
                strokeLinecap="round"
              />
              <text
                x={CHART.x0 + 192}
                y={CHART.yTop - 18}
                fontFamily="var(--font-jetbrains), monospace"
                fontSize="10"
                fill="var(--forest-green)"
              >
                Ecdysone
              </text>
            </g>
          </svg>
        </div>

        {/* Caption below chart */}
        <p
          className="mt-3 text-center font-mono text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          {isLarval
            ? "Larval mode: JH stays high — each ecdysone pulse produces another larval molt"
            : "Metamorphosis: JH collapses — the final ecdysone surge commands transformation"}
        </p>
      </div>

      {/* Hormone cards */}
      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
        {hormones.map((h) => (
          <div
            key={h.name}
            className="rounded-xl border p-6 transition-all duration-200 hover:ring-2"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
              // @ts-expect-error CSS custom property
              "--tw-ring-color": `${h.color}33`,
            }}
          >
            <div className="flex items-start gap-4">
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-lg font-bold"
                style={{ backgroundColor: `${h.color}22`, color: h.color }}
              >
                {h.icon}
              </span>
              <div>
                <p className="font-sans text-sm font-semibold text-text-primary">{h.name}</p>
                <p className="mt-1 font-sans text-sm leading-relaxed text-text-secondary">
                  {h.role}
                </p>
                <p
                  className="mt-2 font-mono text-xs"
                  style={{ color: h.color }}
                >
                  {h.highLow}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pull quote */}
      <blockquote className="pull-quote mt-10">
        The caterpillar doesn&rsquo;t decide to transform. A hormonal cascade makes the decision
        for it — and the body has no choice but to comply.
      </blockquote>
    </SectionWrapper>
  );
}
