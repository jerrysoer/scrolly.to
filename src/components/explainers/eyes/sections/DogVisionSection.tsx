"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { parkScene, simulateDogVision, dogVisionInfo } from "@/lib/explainers/eyes/color-vision";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0"))
      .join("")
  );
}

// ─── Park Scene SVG ───────────────────────────────────────────────────────────

interface ParkSceneSVGProps {
  isDogVision: boolean;
  colors: Record<string, string>;
}

function ParkSceneSVG({ isDogVision, colors }: ParkSceneSVGProps) {
  const c = colors;

  return (
    <svg
      viewBox="0 0 500 350"
      width="100%"
      role="img"
      aria-labelledby="park-scene-title"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <title id="park-scene-title">
        {isDogVision
          ? "A park scene as a dog sees it — blues and yellows predominate, reds and greens appear as muddy brown-yellow"
          : "A park scene as humans see it — blue sky, green grass, red flowers, and a bright yellow-green tennis ball"}
      </title>

      <defs>
        {/* Sky gradient */}
        <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.sky} stopOpacity="1" />
          <stop offset="100%" stopColor={c.sky} stopOpacity="0.7" />
        </linearGradient>

        {/* Grass gradient */}
        <linearGradient id="grassGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={c.grass} stopOpacity="1" />
          <stop offset="100%" stopColor={c.grass} stopOpacity="0.75" />
        </linearGradient>

        {/* Tree shadow */}
        <radialGradient id="treeShadow" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor="#00000022" />
          <stop offset="100%" stopColor="#00000000" />
        </radialGradient>

        {/* Soft glow filter for sun */}
        <filter id="sunGlow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* ── Sky ─────────────────────────────────────────────────── */}
      <rect
        x="0" y="0" width="500" height="230"
        fill={c.sky}
        style={{ transition: "fill 0.6s ease" }}
      />

      {/* ── Sun ─────────────────────────────────────────────────── */}
      <circle
        cx="430" cy="55" r="34"
        fill={c.sun}
        filter="url(#sunGlow)"
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Sun rays */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x1 = 430 + 40 * Math.cos(rad);
        const y1 = 55 + 40 * Math.sin(rad);
        const x2 = 430 + 52 * Math.cos(rad);
        const y2 = 55 + 52 * Math.sin(rad);
        return (
          <line
            key={i}
            x1={x1} y1={y1} x2={x2} y2={y2}
            stroke={c.sun}
            strokeWidth="3"
            strokeLinecap="round"
            opacity="0.7"
            style={{ transition: "stroke 0.6s ease" }}
          />
        );
      })}

      {/* ── Ground / Grass ──────────────────────────────────────── */}
      <rect
        x="0" y="225" width="500" height="125"
        fill={c.grass}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Grass texture bumps */}
      <ellipse cx="80" cy="225" rx="40" ry="10" fill={c.grass} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="200" cy="223" rx="55" ry="12" fill={c.grass} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="340" cy="226" rx="45" ry="10" fill={c.grass} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="460" cy="224" rx="38" ry="11" fill={c.grass} style={{ transition: "fill 0.6s ease" }} />

      {/* ── Tree ────────────────────────────────────────────────── */}
      {/* Trunk */}
      <rect
        x="186" y="160" width="28" height="80"
        rx="8" ry="8"
        fill={c["tree-trunk"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Tree shadow */}
      <ellipse cx="200" cy="244" rx="40" ry="10" fill="url(#treeShadow)" />
      {/* Foliage — layered rounded blobs for a children's-book feel */}
      <ellipse
        cx="200" cy="140" rx="72" ry="58"
        fill={c["tree-leaves"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      <ellipse
        cx="172" cy="155" rx="44" ry="38"
        fill={c["tree-leaves"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      <ellipse
        cx="228" cy="152" rx="44" ry="38"
        fill={c["tree-leaves"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      <ellipse
        cx="200" cy="105" rx="50" ry="44"
        fill={c["tree-leaves"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Leaf highlight */}
      <ellipse
        cx="185" cy="98" rx="20" ry="16"
        fill="white"
        fillOpacity="0.08"
      />

      {/* ── Red Flowers ─────────────────────────────────────────── */}
      {/* Cluster near left */}
      {[
        { cx: 52, cy: 233 },
        { cx: 70, cy: 228 },
        { cx: 88, cy: 234 },
        { cx: 60, cy: 240 },
        { cx: 78, cy: 236 },
      ].map((pos, i) => (
        <g key={`rf-${i}`}>
          {/* Stem */}
          <line
            x1={pos.cx} y1={pos.cy + 8}
            x2={pos.cx} y2={pos.cy + 18}
            stroke={c.grass}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: "stroke 0.6s ease" }}
          />
          {/* Petals */}
          {[0, 72, 144, 216, 288].map((a, pi) => {
            const r = (a * Math.PI) / 180;
            return (
              <ellipse
                key={pi}
                cx={pos.cx + 6 * Math.cos(r)}
                cy={pos.cy + 6 * Math.sin(r)}
                rx="4" ry="3"
                fill={c["flowers-red"]}
                style={{ transition: "fill 0.6s ease" }}
                transform={`rotate(${a} ${pos.cx + 6 * Math.cos(r)} ${pos.cy + 6 * Math.sin(r)})`}
              />
            );
          })}
          {/* Center */}
          <circle
            cx={pos.cx} cy={pos.cy}
            r="3.5"
            fill={c.sun}
            style={{ transition: "fill 0.6s ease" }}
          />
        </g>
      ))}

      {/* ── Yellow Flowers ──────────────────────────────────────── */}
      {[
        { cx: 295, cy: 235 },
        { cx: 315, cy: 229 },
        { cx: 333, cy: 236 },
        { cx: 305, cy: 242 },
      ].map((pos, i) => (
        <g key={`yf-${i}`}>
          <line
            x1={pos.cx} y1={pos.cy + 8}
            x2={pos.cx} y2={pos.cy + 18}
            stroke={c.grass}
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: "stroke 0.6s ease" }}
          />
          {[0, 72, 144, 216, 288].map((a, pi) => {
            const r = (a * Math.PI) / 180;
            return (
              <ellipse
                key={pi}
                cx={pos.cx + 6 * Math.cos(r)}
                cy={pos.cy + 6 * Math.sin(r)}
                rx="4" ry="3"
                fill={c["flowers-yellow"]}
                style={{ transition: "fill 0.6s ease" }}
                transform={`rotate(${a} ${pos.cx + 6 * Math.cos(r)} ${pos.cy + 6 * Math.sin(r)})`}
              />
            );
          })}
          <circle
            cx={pos.cx} cy={pos.cy}
            r="3.5"
            fill="#FF8C00"
            opacity="0.8"
          />
        </g>
      ))}

      {/* ── Tennis Ball ─────────────────────────────────────────── */}
      <circle
        cx="385" cy="268" r="18"
        fill={c.ball}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Tennis ball seam */}
      <path
        d="M 370,260 Q 380,268 370,276"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      <path
        d="M 400,260 Q 390,268 400,276"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeOpacity="0.55"
        strokeLinecap="round"
      />
      {/* Ball highlight */}
      <ellipse cx="378" cy="261" rx="5" ry="4" fill="white" fillOpacity="0.3" />

      {/* ── Fire Hydrant ────────────────────────────────────────── */}
      {/* Base */}
      <rect
        x="136" y="268" width="28" height="10"
        rx="4" ry="4"
        fill={c["fire-hydrant"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Body */}
      <rect
        x="140" y="240" width="20" height="30"
        rx="6" ry="6"
        fill={c["fire-hydrant"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Cap */}
      <ellipse
        cx="150" cy="240" rx="12" ry="6"
        fill={c["fire-hydrant"]}
        style={{ transition: "fill 0.6s ease" }}
      />
      {/* Nozzles (side bolts) */}
      <circle cx="134" cy="253" r="5" fill={c["fire-hydrant"]} style={{ transition: "fill 0.6s ease" }} />
      <circle cx="166" cy="253" r="5" fill={c["fire-hydrant"]} style={{ transition: "fill 0.6s ease" }} />
      {/* Highlight */}
      <rect x="143" y="244" width="5" height="14" rx="2" fill="white" fillOpacity="0.2" />

      {/* ── Distant tree (right) ────────────────────────────────── */}
      <rect x="454" y="185" width="16" height="50" rx="5" ry="5" fill={c["tree-trunk"]} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="462" cy="168" rx="38" ry="32" fill={c["tree-leaves"]} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="448" cy="178" rx="24" ry="22" fill={c["tree-leaves"]} style={{ transition: "fill 0.6s ease" }} />
      <ellipse cx="476" cy="176" rx="24" ry="22" fill={c["tree-leaves"]} style={{ transition: "fill 0.6s ease" }} />

      {/* ── Fluffy clouds ───────────────────────────────────────── */}
      <g opacity="0.88">
        <ellipse cx="110" cy="68" rx="44" ry="22" fill="white" />
        <ellipse cx="88" cy="74" rx="28" ry="18" fill="white" />
        <ellipse cx="136" cy="73" rx="28" ry="17" fill="white" />
        <ellipse cx="110" cy="58" rx="30" ry="20" fill="white" />
      </g>
      <g opacity="0.82">
        <ellipse cx="290" cy="45" rx="36" ry="18" fill="white" />
        <ellipse cx="270" cy="50" rx="22" ry="15" fill="white" />
        <ellipse cx="312" cy="50" rx="22" ry="14" fill="white" />
        <ellipse cx="290" cy="36" rx="24" ry="16" fill="white" />
      </g>
    </svg>
  );
}

// ─── Color Comparison Strip ───────────────────────────────────────────────────

interface ComparisonStripProps {
  humanColors: Record<string, string>;
  dogColors: Record<string, string>;
}

function ColorComparisonStrip({ humanColors, dogColors }: ComparisonStripProps) {
  const items = parkScene.map((obj) => ({
    id: obj.id,
    name: obj.name,
    human: humanColors[obj.id],
    dog: dogColors[obj.id],
  }));

  return (
    <div className="mt-4 rounded-xl border border-border bg-bg-secondary/50 px-4 py-3">
      <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-3">
        Color comparison
      </p>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col items-center gap-1">
            {/* Swatch pair */}
            <div className="flex rounded-lg overflow-hidden border border-border shadow-sm" style={{ height: "28px" }}>
              <div
                title={`Human: ${item.human}`}
                style={{ width: "28px", backgroundColor: item.human }}
              />
              <div
                title={`Dog: ${item.dog}`}
                style={{ width: "28px", backgroundColor: item.dog }}
              />
            </div>
            {/* Label */}
            <span className="font-mono text-[9px] leading-none text-text-tertiary text-center max-w-[56px] truncate">
              {item.name}
            </span>
          </div>
        ))}
      </div>
      {/* Legend */}
      <div className="flex gap-4 mt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-border bg-border" />
          <span className="font-mono text-[9px] text-text-tertiary">Left = Human</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded-sm border border-border bg-border" />
          <span className="font-mono text-[9px] text-text-tertiary">Right = Dog</span>
        </div>
      </div>
    </div>
  );
}

// ─── Toggle Switch ────────────────────────────────────────────────────────────

interface VisionToggleProps {
  isDogVision: boolean;
  onChange: (isDog: boolean) => void;
}

function VisionToggle({ isDogVision, onChange }: VisionToggleProps) {
  return (
    <div
      className="inline-flex rounded-full border border-border bg-bg-secondary p-1"
      role="radiogroup"
      aria-label="Vision mode selector"
    >
      <button
        role="radio"
        aria-checked={!isDogVision}
        onClick={() => onChange(false)}
        className="relative rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-all duration-200 min-h-[44px] min-w-[130px] cursor-pointer"
        style={
          !isDogVision
            ? {
                backgroundColor: "var(--forward-blue)",
                color: "#ffffff",
                boxShadow: "0 2px 8px var(--forward-blue)44",
              }
            : {
                color: "var(--text-secondary)",
              }
        }
      >
        Human Vision
      </button>
      <button
        role="radio"
        aria-checked={isDogVision}
        onClick={() => onChange(true)}
        className="relative rounded-full px-5 py-2.5 font-mono text-sm font-medium transition-all duration-200 min-h-[44px] min-w-[110px] cursor-pointer"
        style={
          isDogVision
            ? {
                backgroundColor: "var(--forward-blue)",
                color: "#ffffff",
                boxShadow: "0 2px 8px var(--forward-blue)44",
              }
            : {
                color: "var(--text-secondary)",
              }
        }
      >
        Dog Vision
      </button>
    </div>
  );
}

// ─── Cone Count Comparison ────────────────────────────────────────────────────

function ConeCountBar() {
  const items = [
    { label: "Mantis shrimp", count: 16, color: "var(--accent-purple)" },
    { label: "Humans", count: 3, color: "var(--forward-blue)" },
    { label: "Dogs", count: 2, color: "var(--accent-amber)" },
  ];
  const max = 16;

  return (
    <div className="mt-6 flex flex-col gap-3" aria-label="Cone count comparison">
      {items.map((item) => (
        <div key={item.label} className="flex items-center gap-3">
          <span className="font-mono text-xs text-text-tertiary w-28 shrink-0 text-right">
            {item.label}
          </span>
          <div className="flex-1 h-3 rounded-full bg-bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${(item.count / max) * 100}%`,
                backgroundColor: item.color,
                boxShadow: `0 0 6px ${item.color}66`,
              }}
            />
          </div>
          <span
            className="font-mono text-xs font-semibold w-5 shrink-0"
            style={{ color: item.color }}
          >
            {item.count}
          </span>
        </div>
      ))}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DogVisionSection() {
  const [isDogVision, setIsDogVision] = useState(false);

  // Pre-compute both color maps
  const humanColors = useMemo(() => {
    return Object.fromEntries(
      parkScene.map((obj) => [obj.id, obj.humanColor])
    );
  }, []);

  const dogColors = useMemo(() => {
    return Object.fromEntries(
      parkScene.map((obj) => {
        const { r, g, b } = simulateDogVision(obj.humanRgb.r, obj.humanRgb.g, obj.humanRgb.b);
        return [obj.id, rgbToHex(r, g, b)];
      })
    );
  }, []);

  const activeColors = isDogVision ? dogColors : humanColors;

  return (
    <SectionWrapper id="dog-vision" layout="split-right">
      {/* ── Left: Interactive Visual ─────────────────────────── */}
      <div className="lg:col-span-3">
        {/* Toggle */}
        <div className="mb-4 flex justify-center lg:justify-start">
          <VisionToggle isDogVision={isDogVision} onChange={setIsDogVision} />
        </div>

        {/* Park Scene Card */}
        <div
          className="rounded-2xl border border-border bg-bg-card overflow-hidden shadow-sm transition-all duration-300"
          style={
            isDogVision
              ? {
                  boxShadow:
                    "0 0 0 2px var(--forward-blue)44, 0 4px 24px var(--forward-blue)1A",
                }
              : {}
          }
        >
          <ParkSceneSVG isDogVision={isDogVision} colors={activeColors} />

          {/* Vision mode label inside card */}
          <div className="px-4 py-2 border-t border-border flex items-center justify-between bg-bg-secondary/40">
            <span className="font-mono text-xs text-text-tertiary">
              {isDogVision ? "Dichromatic (2 cones)" : "Trichromatic (3 cones)"}
            </span>
            <span
              className="font-mono text-xs font-semibold"
              style={{ color: "var(--forward-blue)" }}
            >
              {isDogVision ? "Dog Vision" : "Human Vision"}
            </span>
          </div>
        </div>

        {/* Color Comparison Strip */}
        <ColorComparisonStrip humanColors={humanColors} dogColors={dogColors} />

        {/* Mantis Shrimp Aside */}
        <aside className="mt-8 pl-4 border-l-0 text-text-tertiary text-sm font-sans leading-relaxed max-w-md">
          <span className="font-mono text-xs uppercase tracking-wider text-accent-purple">
            Meanwhile in the ocean...
          </span>
          <p className="mt-1">
            Mantis shrimp have{" "}
            <strong className="text-text-primary">16 types of cone cells</strong>. Humans have
            3. Dogs have 2. We can barely imagine what their world looks like.
          </p>
          <ConeCountBar />
        </aside>
      </div>

      {/* ── Right: Text Content ──────────────────────────────── */}
      <div className="lg:col-span-2 mt-8 lg:mt-0">
        {/* Overline */}
        <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-4">
          SECTION 04
        </p>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
          Why Dogs See Less
        </h2>

        {/* Analogy */}
        <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed mb-5">
          Imagine listening to music, but you can only hear bass and treble&nbsp;&mdash; no
          midrange. You&rsquo;d still hear the song, but you&rsquo;d miss the richness.
          That&rsquo;s what color vision is like for dogs.
        </p>

        {/* Technical */}
        <p className="font-sans text-sm text-text-tertiary leading-relaxed mb-6">
          Dogs have <strong className="text-text-primary">2 types of cone cells</strong> (blue
          and yellow) vs. our 3. They see blues and yellows clearly, but reds and greens blur
          into brownish-yellow.
        </p>

        {/* Detail cards */}
        <div className="flex flex-col gap-3">
          {/* What dogs can see */}
          <div
            className="rounded-xl border border-border bg-bg-card px-4 py-4 transition-all duration-200 cursor-default"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 2px var(--forward-blue)44, 0 4px 20px var(--forward-blue)18";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-forward-blue mb-2">
              Dogs can see
            </p>
            <div className="flex flex-wrap gap-2">
              {dogVisionInfo.canSee.map((color) => (
                <span
                  key={color}
                  className="inline-block rounded-full px-3 py-1 bg-bg-secondary border border-border font-sans text-xs text-text-secondary"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* What dogs miss */}
          <div
            className="rounded-xl border border-border bg-bg-card px-4 py-4 transition-all duration-200 cursor-default"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 2px var(--backward-orange)44, 0 4px 20px var(--backward-orange)18";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-backward-orange mb-2">
              Appears muddy
            </p>
            <div className="flex flex-wrap gap-2">
              {dogVisionInfo.missingColors.map((color) => (
                <span
                  key={color}
                  className="inline-block rounded-full px-3 py-1 bg-bg-secondary border border-border font-sans text-xs text-text-secondary"
                >
                  {color}
                </span>
              ))}
            </div>
          </div>

          {/* Fun context stat */}
          <div
            className="rounded-xl border border-border bg-bg-card px-4 py-4 transition-all duration-200 cursor-default"
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 0 0 2px var(--correct-green)44, 0 4px 20px var(--correct-green)18";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "";
            }}
          >
            <p className="font-mono text-xs uppercase tracking-wider text-correct-green mb-2">
              Why the tennis ball trick works
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Dogs can&rsquo;t see the bright yellow-green of a tennis ball the way we do. To
              them, it blends into a yellowish hue — which is still easily spotted against green
              grass in their blue-yellow world.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
