"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { emergenceTimeline } from "@/lib/explainers/butterfly";

// Wing expansion state per timeline index (0–4)
// Each entry drives scale, opacity, and vein visibility
const WING_STATES = [
  // Hour 0 — shell cracks, wings crumpled
  { scale: 0.12, opacity: 0.35, veinOpacity: 0, crumpleOpacity: 0.9, labelText: "wings crumpled" },
  // Hour 0.25 — pumping begins, just starting to unfurl
  { scale: 0.32, opacity: 0.52, veinOpacity: 0.15, crumpleOpacity: 0.55, labelText: "hemolymph pumping" },
  // Hour 1 — wings expanded
  { scale: 0.72, opacity: 0.75, veinOpacity: 0.55, crumpleOpacity: 0.15, labelText: "wings expanding" },
  // Hour 2 — drying, nearly full
  { scale: 0.93, opacity: 0.88, veinOpacity: 0.82, crumpleOpacity: 0.0, labelText: "wings drying" },
  // Hour 3 — first flight, fully open
  { scale: 1.0, opacity: 1.0, veinOpacity: 1.0, crumpleOpacity: 0.0, labelText: "wings fully open" },
];

export default function EmergenceSection() {
  const [activeHour, setActiveHour] = useState(0);

  const activeEvent = emergenceTimeline[activeHour];
  const wingState = WING_STATES[activeHour];

  // Clamp index for range slider
  const maxIndex = emergenceTimeline.length - 1;

  return (
    <SectionWrapper id="emergence" layout="centered" stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
        Stage 6 — Emergence
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Emergence
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
        After 10–14 days, the chrysalis becomes transparent. The butterfly inside
        pushes and cracks the shell — then begins the most critical hours of its life.
        Wings that crumple at emergence must expand fully within 3 hours, or they
        will harden in a useless shape.
      </p>

      {/* Timeline scrubber */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <p className="font-mono text-xs text-text-tertiary">Hour 0</p>
          <p className="font-mono text-xs text-text-tertiary">Hour 3</p>
        </div>

        <div className="relative">
          {/* Timeline track with tick buttons */}
          <div
            className="relative h-2 w-full rounded-full"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <div
              className="absolute left-0 top-0 h-2 rounded-full transition-all duration-300"
              style={{
                width: `${(activeHour / maxIndex) * 100}%`,
                background: "linear-gradient(90deg, var(--forest-green), var(--warm-amber))",
              }}
            />
            {/* Tick mark buttons — 44px touch targets */}
            {emergenceTimeline.map((event, i) => (
              <button
                key={i}
                onClick={() => setActiveHour(i)}
                className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 flex items-center justify-center transition-all duration-200"
                style={{
                  left: `${(i / maxIndex) * 100}%`,
                  width: 44,
                  height: 44,
                }}
                aria-label={`Select: ${event.event} at hour ${event.hour}`}
              >
                <span
                  className="block rounded-full border-2 transition-all duration-200"
                  style={{
                    width: i <= activeHour ? 18 : 14,
                    height: i <= activeHour ? 18 : 14,
                    backgroundColor: i <= activeHour ? "var(--forest-green)" : "var(--bg-card)",
                    borderColor: i <= activeHour ? "var(--forest-green)" : "var(--border)",
                    boxShadow: i === activeHour ? "0 0 0 3px color-mix(in srgb, var(--forest-green) 25%, transparent)" : "none",
                  }}
                />
              </button>
            ))}
          </div>

          {/* Range slider beneath for smooth dragging */}
          <div className="mt-3 px-0">
            <input
              type="range"
              min={0}
              max={maxIndex}
              step={1}
              value={activeHour}
              onChange={(e) => setActiveHour(Number(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(90deg, var(--forest-green) ${(activeHour / maxIndex) * 100}%, var(--bg-secondary) ${(activeHour / maxIndex) * 100}%)`,
              }}
              aria-label="Drag to explore wing expansion timeline"
            />
          </div>

          {/* Hour labels below */}
          <div className="mt-1 flex justify-between">
            {emergenceTimeline.map((event, i) => (
              <button
                key={i}
                onClick={() => setActiveHour(i)}
                className={`font-mono text-xs transition-colors ${
                  activeHour === i ? "text-forest-green font-semibold" : "text-text-tertiary"
                }`}
                style={{ width: `${100 / emergenceTimeline.length}%`, textAlign: "center" }}
              >
                {event.hour === 0 ? "0h" : `${event.hour}h`}
              </button>
            ))}
          </div>
        </div>

        {/* Active event detail card */}
        <div
          className="mt-8 rounded-2xl border p-7 transition-all duration-300"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-3">
            <span
              className="rounded-full px-3 py-1 font-mono text-xs font-bold text-white"
              style={{ backgroundColor: "var(--forest-green)" }}
            >
              Hour {activeEvent.hour === 0 ? "0" : activeEvent.hour}
            </span>
            <h3 className="font-serif text-xl font-bold text-text-primary">
              {activeEvent.event}
            </h3>
          </div>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            {activeEvent.detail}
          </p>

          {/* Butterfly wing expansion SVG */}
          <div
            className="mt-6 rounded-xl overflow-hidden flex items-center justify-center"
            style={{ backgroundColor: "var(--bg-secondary)", minHeight: 220 }}
          >
            <ButterflyWingSVG wingState={wingState} />
          </div>
        </div>
      </div>

      {/* Aside callout */}
      <aside
        className="mt-8 rounded-xl border p-5"
        style={{ backgroundColor: "var(--bg-secondary)", borderColor: "var(--border)" }}
      >
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-accent-purple mb-2">
          Critical window
        </p>
        <p className="font-sans text-sm leading-relaxed text-text-secondary">
          If the butterfly is disturbed or the air is too dry during emergence, wings can
          harden crumpled. In the wild, only about half of emerging butterflies survive
          the first hours without injury.
        </p>
      </aside>
    </SectionWrapper>
  );
}

// ── Butterfly Wing SVG ─────────────────────────────────────────────────────────
// viewBox="0 0 300 200" — body centered at (150, 110)
// Wings scale outward from body. Left = forest-green, Right = warm-amber.
// At hour 0: scale ~0.12 (tiny crumple). At hour 3: scale 1.0 (fully open).

interface WingStateProps {
  wingState: (typeof WING_STATES)[number];
}

function ButterflyWingSVG({ wingState }: WingStateProps) {
  const { scale, opacity, veinOpacity, crumpleOpacity, labelText } = wingState;

  // Body center
  const cx = 150;
  const cy = 108;

  // --- Forewing (upper wing) bezier paths ---
  // Left forewing: radiates upper-left from thorax top
  // Anchor at body top (cx, cy-14), sweeps upper-left, returns lower
  const leftForewing = buildLeftForewing(cx, cy, scale);
  const rightForewing = buildRightForewing(cx, cy, scale);

  // --- Hindwing (lower wing) bezier paths ---
  const leftHindwing = buildLeftHindwing(cx, cy, scale);
  const rightHindwing = buildRightHindwing(cx, cy, scale);

  // --- Wing veins ---
  const leftForeVeins = buildLeftForeVeins(cx, cy, scale);
  const rightForeVeins = buildRightForeVeins(cx, cy, scale);
  const leftHindVeins = buildLeftHindVeins(cx, cy, scale);
  const rightHindVeins = buildRightHindVeins(cx, cy, scale);

  return (
    <svg
      viewBox="0 0 300 200"
      className="w-full"
      style={{ maxWidth: 360, transition: "all 0.45s ease" }}
      role="img"
      aria-label={`Butterfly wing state: ${labelText}`}
    >
      <title>Butterfly wing expansion</title>

      {/* ── Left wings (forest green) ── */}
      <g style={{ transition: "all 0.45s ease" }}>
        {/* Left forewing */}
        <path
          d={leftForewing}
          fill="var(--forest-green)"
          fillOpacity={opacity * 0.75}
          stroke="var(--forest-green)"
          strokeOpacity={opacity}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Left hindwing */}
        <path
          d={leftHindwing}
          fill="var(--forest-green)"
          fillOpacity={opacity * 0.6}
          stroke="var(--forest-green)"
          strokeOpacity={opacity * 0.85}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Left wing veins */}
        <g opacity={veinOpacity} style={{ transition: "opacity 0.45s ease" }}>
          {leftForeVeins.map((d, i) => (
            <path key={`lf-vein-${i}`} d={d} stroke="var(--forest-green)" strokeWidth={0.6} strokeOpacity={0.55} fill="none" />
          ))}
          {leftHindVeins.map((d, i) => (
            <path key={`lh-vein-${i}`} d={d} stroke="var(--forest-green)" strokeWidth={0.5} strokeOpacity={0.45} fill="none" />
          ))}
        </g>
        {/* Crumple overlay for left wings at early hours */}
        <ellipse
          cx={cx - 6}
          cy={cy - 5}
          rx={8 * Math.max(scale, 0.12)}
          ry={6 * Math.max(scale, 0.12)}
          fill="var(--bg-secondary)"
          fillOpacity={crumpleOpacity * 0.7}
          style={{ transition: "all 0.45s ease" }}
        />
      </g>

      {/* ── Right wings (warm amber) ── */}
      <g style={{ transition: "all 0.45s ease" }}>
        {/* Right forewing */}
        <path
          d={rightForewing}
          fill="var(--warm-amber)"
          fillOpacity={opacity * 0.75}
          stroke="var(--warm-amber)"
          strokeOpacity={opacity}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Right hindwing */}
        <path
          d={rightHindwing}
          fill="var(--warm-amber)"
          fillOpacity={opacity * 0.6}
          stroke="var(--warm-amber)"
          strokeOpacity={opacity * 0.85}
          strokeWidth={0.8}
          strokeLinejoin="round"
        />
        {/* Right wing veins */}
        <g opacity={veinOpacity} style={{ transition: "opacity 0.45s ease" }}>
          {rightForeVeins.map((d, i) => (
            <path key={`rf-vein-${i}`} d={d} stroke="var(--warm-amber)" strokeWidth={0.6} strokeOpacity={0.55} fill="none" />
          ))}
          {rightHindVeins.map((d, i) => (
            <path key={`rh-vein-${i}`} d={d} stroke="var(--warm-amber)" strokeWidth={0.5} strokeOpacity={0.45} fill="none" />
          ))}
        </g>
        {/* Crumple overlay for right wings at early hours */}
        <ellipse
          cx={cx + 6}
          cy={cy - 5}
          rx={8 * Math.max(scale, 0.12)}
          ry={6 * Math.max(scale, 0.12)}
          fill="var(--bg-secondary)"
          fillOpacity={crumpleOpacity * 0.7}
          style={{ transition: "all 0.45s ease" }}
        />
      </g>

      {/* ── Butterfly body (drawn on top of wings) ── */}
      <ButterflyBody cx={cx} cy={cy} scale={scale} />

      {/* ── Wing-state label ── */}
      <text
        x={cx}
        y={188}
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize={9}
        fontFamily="var(--font-jetbrains), monospace"
        letterSpacing="0.06em"
      >
        {labelText}
      </text>
    </svg>
  );
}

// ── Body component: thorax + abdomen + head + legs + antennae ──────────────────
function ButterflyBody({ cx, cy, scale }: { cx: number; cy: number; scale: number }) {
  // Thorax: small oval at top of body
  const thoraxRx = 4.5;
  const thoraxRy = 5;
  const thoraxCy = cy - 6;

  // Abdomen: elongated tapered oval below thorax
  const abdomenRx = 3;
  const abdomenLen = 24;
  const abdomenTopY = cy - 1;
  const abdomenBotY = cy + abdomenLen;

  // Head: small circle above thorax
  const headCy = thoraxCy - thoraxRy - 3;

  // Legs (3 per side, from thorax) — visible only when scale > 0.3
  const legOpacity = Math.max(0, (scale - 0.2) / 0.4);

  // Antennae (2 curved lines from head, with small clubs at tips)
  const antennaOpacity = Math.max(0, (scale - 0.15) / 0.5);

  // Left antenna: curves up-left from head top
  const leftAntennaPath = `M ${cx - 1} ${headCy - 2} Q ${cx - 22} ${headCy - 30} ${cx - 28} ${headCy - 34}`;
  const rightAntennaPath = `M ${cx + 1} ${headCy - 2} Q ${cx + 22} ${headCy - 30} ${cx + 28} ${headCy - 34}`;

  return (
    <g>
      {/* Antennae */}
      <g opacity={antennaOpacity} style={{ transition: "opacity 0.45s ease" }}>
        <path d={leftAntennaPath} stroke="var(--text-primary)" strokeWidth={0.9} fill="none" strokeLinecap="round" />
        <circle cx={cx - 28} cy={headCy - 34} r={1.8} fill="var(--text-primary)" />
        <path d={rightAntennaPath} stroke="var(--text-primary)" strokeWidth={0.9} fill="none" strokeLinecap="round" />
        <circle cx={cx + 28} cy={headCy - 34} r={1.8} fill="var(--text-primary)" />
      </g>

      {/* Abdomen — tapered shape via path */}
      <path
        d={`
          M ${cx - abdomenRx} ${abdomenTopY}
          C ${cx - abdomenRx * 1.2} ${abdomenTopY + abdomenLen * 0.35}
            ${cx - abdomenRx * 0.6} ${abdomenTopY + abdomenLen * 0.75}
            ${cx} ${abdomenBotY}
          C ${cx + abdomenRx * 0.6} ${abdomenTopY + abdomenLen * 0.75}
            ${cx + abdomenRx * 1.2} ${abdomenTopY + abdomenLen * 0.35}
            ${cx + abdomenRx} ${abdomenTopY}
          Z
        `}
        fill="var(--text-primary)"
        fillOpacity={0.82}
      />

      {/* Abdominal segment lines */}
      {[0.25, 0.45, 0.62, 0.77].map((t, i) => {
        const segY = abdomenTopY + t * abdomenLen;
        const segHalfW = abdomenRx * (1 - t * 0.55);
        return (
          <line
            key={`seg-${i}`}
            x1={cx - segHalfW}
            y1={segY}
            x2={cx + segHalfW}
            y2={segY}
            stroke="var(--bg-primary)"
            strokeWidth={0.5}
            strokeOpacity={0.45}
          />
        );
      })}

      {/* Thorax */}
      <ellipse
        cx={cx}
        cy={thoraxCy}
        rx={thoraxRx}
        ry={thoraxRy}
        fill="var(--text-primary)"
        fillOpacity={0.88}
      />

      {/* Head */}
      <circle
        cx={cx}
        cy={headCy}
        r={4}
        fill="var(--text-primary)"
        fillOpacity={0.88}
      />

      {/* Compound eyes */}
      <circle cx={cx - 2} cy={headCy - 1} r={1.1} fill="var(--bg-primary)" fillOpacity={0.6} />
      <circle cx={cx + 2} cy={headCy - 1} r={1.1} fill="var(--bg-primary)" fillOpacity={0.6} />

      {/* Legs — 3 per side, attached at thorax */}
      <g opacity={legOpacity} style={{ transition: "opacity 0.45s ease" }}>
        {/* Left legs */}
        <line x1={cx - thoraxRx} y1={thoraxCy - 2} x2={cx - 18} y2={thoraxCy + 4} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={cx - thoraxRx} y1={thoraxCy + 1} x2={cx - 17} y2={thoraxCy + 10} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={cx - thoraxRx} y1={thoraxCy + 4} x2={cx - 16} y2={thoraxCy + 16} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
        {/* Right legs */}
        <line x1={cx + thoraxRx} y1={thoraxCy - 2} x2={cx + 18} y2={thoraxCy + 4} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={cx + thoraxRx} y1={thoraxCy + 1} x2={cx + 17} y2={thoraxCy + 10} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
        <line x1={cx + thoraxRx} y1={thoraxCy + 4} x2={cx + 16} y2={thoraxCy + 16} stroke="var(--text-primary)" strokeWidth={0.8} strokeLinecap="round" />
      </g>
    </g>
  );
}

// ── Wing path builders ─────────────────────────────────────────────────────────
// All wings are parametric: scale 0..1 drives how far they sweep outward.
// At scale ~0.12 they huddle close to body. At scale 1.0 they fully open.

// Wing origin points on the thorax
// Left side: attachment at (cx - 4, cy - 8) for forewing, (cx - 4, cy + 2) for hind
// Right side: mirrored

function buildLeftForewing(cx: number, cy: number, s: number): string {
  // Forewing: large, sweeps upper-left
  const ox = cx - 4;
  const oy = cy - 10;
  // Tip of wing at full scale:
  const tipX = cx - 90 * s;
  const tipY = cy - 72 * s;
  // Upper edge control point
  const c1x = cx - 55 * s;
  const c1y = cy - 90 * s;
  // Lower edge control point
  const c2x = cx - 80 * s;
  const c2y = cy - 12 * s;
  // Inner trailing edge (returns to body lower)
  const trailX = cx - 8;
  const trailY = cy + 4;

  return `
    M ${ox} ${oy}
    C ${c1x} ${c1y} ${c1x + 12 * s} ${tipY + 5 * s} ${tipX} ${tipY}
    C ${c2x - 5 * s} ${tipY + 30 * s} ${c2x} ${cy + 2 * s} ${trailX} ${trailY}
    C ${cx - 10} ${cy - 2} ${ox + 2} ${oy + 4} ${ox} ${oy}
    Z
  `;
}

function buildRightForewing(cx: number, cy: number, s: number): string {
  const ox = cx + 4;
  const oy = cy - 10;
  const tipX = cx + 90 * s;
  const tipY = cy - 72 * s;
  const c1x = cx + 55 * s;
  const c1y = cy - 90 * s;
  const c2x = cx + 80 * s;
  const c2y = cy - 12 * s;
  const trailX = cx + 8;
  const trailY = cy + 4;

  return `
    M ${ox} ${oy}
    C ${c1x} ${c1y} ${c1x - 12 * s} ${tipY + 5 * s} ${tipX} ${tipY}
    C ${c2x + 5 * s} ${tipY + 30 * s} ${c2x} ${cy + 2 * s} ${trailX} ${trailY}
    C ${cx + 10} ${cy - 2} ${ox - 2} ${oy + 4} ${ox} ${oy}
    Z
  `;
}

function buildLeftHindwing(cx: number, cy: number, s: number): string {
  // Hindwing: rounder, sweeps lower-left
  const ox = cx - 5;
  const oy = cy + 5;
  const tipX = cx - 70 * s;
  const tipY = cy + 42 * s;
  const c1x = cx - 78 * s;
  const c1y = cy + 8 * s;
  const c2x = cx - 60 * s;
  const c2y = cy + 65 * s;
  const trailX = cx - 4;
  const trailY = cy + 20;

  return `
    M ${ox} ${oy}
    C ${c1x} ${c1y} ${tipX - 8 * s} ${tipY - 20 * s} ${tipX} ${tipY}
    C ${tipX + 10 * s} ${c2y} ${c2x + 20 * s} ${trailY + 8 * s} ${trailX} ${trailY}
    C ${cx - 8} ${cy + 14} ${ox + 2} ${oy + 6} ${ox} ${oy}
    Z
  `;
}

function buildRightHindwing(cx: number, cy: number, s: number): string {
  const ox = cx + 5;
  const oy = cy + 5;
  const tipX = cx + 70 * s;
  const tipY = cy + 42 * s;
  const c1x = cx + 78 * s;
  const c1y = cy + 8 * s;
  const c2x = cx + 60 * s;
  const c2y = cy + 65 * s;
  const trailX = cx + 4;
  const trailY = cy + 20;

  return `
    M ${ox} ${oy}
    C ${c1x} ${c1y} ${tipX + 8 * s} ${tipY - 20 * s} ${tipX} ${tipY}
    C ${tipX - 10 * s} ${c2y} ${c2x - 20 * s} ${trailY + 8 * s} ${trailX} ${trailY}
    C ${cx + 8} ${cy + 14} ${ox - 2} ${oy + 6} ${ox} ${oy}
    Z
  `;
}

// ── Vein builders ─────────────────────────────────────────────────────────────
// Veins radiate from the wing base toward edges — 4-5 lines per wing

function buildLeftForeVeins(cx: number, cy: number, s: number): string[] {
  const ox = cx - 4;
  const oy = cy - 8;
  return [
    `M ${ox} ${oy} Q ${cx - 40 * s} ${cy - 80 * s} ${cx - 72 * s} ${cy - 68 * s}`,
    `M ${ox} ${oy} Q ${cx - 55 * s} ${cy - 58 * s} ${cx - 80 * s} ${cy - 40 * s}`,
    `M ${ox} ${oy} Q ${cx - 60 * s} ${cy - 30 * s} ${cx - 75 * s} ${cy - 8 * s}`,
    `M ${ox} ${oy} Q ${cx - 45 * s} ${cy - 10 * s} ${cx - 60 * s} ${cy + 2 * s}`,
  ];
}

function buildRightForeVeins(cx: number, cy: number, s: number): string[] {
  const ox = cx + 4;
  const oy = cy - 8;
  return [
    `M ${ox} ${oy} Q ${cx + 40 * s} ${cy - 80 * s} ${cx + 72 * s} ${cy - 68 * s}`,
    `M ${ox} ${oy} Q ${cx + 55 * s} ${cy - 58 * s} ${cx + 80 * s} ${cy - 40 * s}`,
    `M ${ox} ${oy} Q ${cx + 60 * s} ${cy - 30 * s} ${cx + 75 * s} ${cy - 8 * s}`,
    `M ${ox} ${oy} Q ${cx + 45 * s} ${cy - 10 * s} ${cx + 60 * s} ${cy + 2 * s}`,
  ];
}

function buildLeftHindVeins(cx: number, cy: number, s: number): string[] {
  const ox = cx - 5;
  const oy = cy + 6;
  return [
    `M ${ox} ${oy} Q ${cx - 60 * s} ${cy + 10 * s} ${cx - 65 * s} ${cy + 28 * s}`,
    `M ${ox} ${oy} Q ${cx - 50 * s} ${cy + 32 * s} ${cx - 52 * s} ${cy + 48 * s}`,
    `M ${ox} ${oy} Q ${cx - 30 * s} ${cy + 50 * s} ${cx - 30 * s} ${cy + 60 * s}`,
  ];
}

function buildRightHindVeins(cx: number, cy: number, s: number): string[] {
  const ox = cx + 5;
  const oy = cy + 6;
  return [
    `M ${ox} ${oy} Q ${cx + 60 * s} ${cy + 10 * s} ${cx + 65 * s} ${cy + 28 * s}`,
    `M ${ox} ${oy} Q ${cx + 50 * s} ${cy + 32 * s} ${cx + 52 * s} ${cy + 48 * s}`,
    `M ${ox} ${oy} Q ${cx + 30 * s} ${cy + 50 * s} ${cx + 30 * s} ${cy + 60 * s}`,
  ];
}
