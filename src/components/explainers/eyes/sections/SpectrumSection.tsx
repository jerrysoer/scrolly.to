"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import AnimatedCounter from "../AnimatedCounter";
import { spectrumBands, visibleSpectrum, type SpectrumBand } from "@/lib/explainers/eyes/spectrum";

// Proportional widths for the EM spectrum visualization (log-scale feel, designed for clarity)
const BAND_WEIGHTS: Record<string, number> = {
  radio:       9,
  microwave:   7,
  infrared:    8,
  visible:     4,
  ultraviolet: 7,
  xray:        7,
  gamma:       6,
};

const TOTAL_WEIGHT = Object.values(BAND_WEIGHTS).reduce((a, b) => a + b, 0);

function getBandPercent(id: string): number {
  return ((BAND_WEIGHTS[id] ?? 6) / TOTAL_WEIGHT) * 100;
}

// Build rainbow gradient stop string for the visible band SVG rect
function buildRainbowGradient(): string {
  const stops = visibleSpectrum
    .map((entry, i) => {
      const pct = (i / (visibleSpectrum.length - 1)) * 100;
      return `${entry.color} ${pct.toFixed(1)}%`;
    })
    .join(", ");
  return `linear-gradient(90deg, ${stops})`;
}

// Wave paths to overlay inside each band rectangle (decorative EM wave lines)
function WaveLines({ x, width, y, height, color }: { x: number; width: number; y: number; height: number; color: string }) {
  const lines = [];
  const waveCount = Math.max(2, Math.floor(width / 22));
  const amplitude = height * 0.22;
  const cy = y + height / 2;

  for (let i = 0; i < waveCount; i++) {
    const segW = width / waveCount;
    const sx = x + i * segW;
    const mx = sx + segW / 2;
    const ex = sx + segW;
    lines.push(
      <path
        key={i}
        d={`M ${sx} ${cy} Q ${sx + segW * 0.25} ${cy - amplitude} ${mx} ${cy} Q ${mx + segW * 0.25} ${cy + amplitude} ${ex} ${cy}`}
        fill="none"
        stroke={color}
        strokeWidth="0.8"
        opacity="0.18"
        strokeLinecap="round"
      />
    );
  }
  return <>{lines}</>;
}

interface TooltipCardProps {
  band: SpectrumBand;
  onClose: () => void;
}

function TooltipCard({ band, onClose }: TooltipCardProps) {
  const isVisible = band.isVisible;
  return (
    <div
      className="mt-4 rounded-2xl border border-border bg-bg-card px-6 py-5 shadow-lg animate-slide-up transition-all"
      role="region"
      aria-label={`Details for ${band.name}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <span
            className="inline-block w-4 h-4 rounded-full flex-shrink-0"
            style={
              isVisible
                ? { background: buildRainbowGradient() }
                : { background: band.color }
            }
            aria-hidden="true"
          />
          <h3 className="font-serif text-lg font-bold text-text-primary">{band.name}</h3>
          {isVisible && (
            <span className="font-mono text-xs uppercase tracking-widest text-forward-blue border border-forward-blue/30 rounded px-2 py-0.5">
              visible
            </span>
          )}
        </div>
        <button
          onClick={onClose}
          className="text-text-tertiary hover:text-text-primary transition-colors text-xl leading-none flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-bg-secondary"
          aria-label="Close band details"
        >
          ×
        </button>
      </div>
      <dl className="mt-3 grid grid-cols-2 gap-x-6 gap-y-2">
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-text-tertiary">Wavelength</dt>
          <dd className="font-sans text-sm text-text-primary mt-0.5">
            {band.wavelengthMin < 1
              ? `${band.wavelengthMin}–${band.wavelengthMax} nm`
              : band.wavelengthMax >= 1e9
              ? `${(band.wavelengthMin / 1e9).toFixed(0)}–${(band.wavelengthMax / 1e9).toFixed(0)} m (radio scale)`
              : band.wavelengthMax >= 1e6
              ? `${(band.wavelengthMin / 1e6).toFixed(1)}–${(band.wavelengthMax / 1e6).toFixed(0)} mm`
              : `${band.wavelengthMin}–${band.wavelengthMax} nm`}
          </dd>
        </div>
        <div>
          <dt className="font-mono text-xs uppercase tracking-wider text-text-tertiary">Frequency</dt>
          <dd className="font-sans text-sm text-text-primary mt-0.5">{band.frequencyRange}</dd>
        </div>
      </dl>
      <p className="mt-3 font-sans text-sm text-text-secondary leading-relaxed">{band.description}</p>
    </div>
  );
}

// The main SVG spectrum bar
function SpectrumBarSVG({
  activeBand,
  onBandClick,
}: {
  activeBand: string | null;
  onBandClick: (id: string) => void;
}) {
  const svgHeight = 80;
  const labelHeight = 36;
  const totalH = svgHeight + labelHeight;
  const [hovered, setHovered] = useState<string | null>(null);

  // Pre-compute band x positions and widths as percentages
  let cursor = 0;
  const bandLayout = spectrumBands.map((band) => {
    const pct = getBandPercent(band.id);
    const x = cursor;
    cursor += pct;
    return { band, x, width: pct };
  });

  const visibleIndex = bandLayout.findIndex((bl) => bl.band.isVisible);
  const visibleLayout = bandLayout[visibleIndex];

  return (
    <svg
      viewBox={`0 0 100 ${totalH}`}
      width="100%"
      preserveAspectRatio="none"
      role="img"
      aria-label="Electromagnetic spectrum visualization"
      style={{ display: "block", minHeight: "90px" }}
    >
      <title>Electromagnetic spectrum from radio waves to gamma rays, with visible light highlighted</title>

      <defs>
        {/* Rainbow gradient for visible band */}
        <linearGradient id="visibleRainbow" x1="0%" y1="0%" x2="100%" y2="0%">
          {visibleSpectrum.map((entry, i) => (
            <stop
              key={entry.wavelength}
              offset={`${(i / (visibleSpectrum.length - 1)) * 100}%`}
              stopColor={entry.color}
            />
          ))}
        </linearGradient>

        {/* Glow filter for visible band */}
        <filter id="specGlow" x="-10%" y="-30%" width="120%" height="160%">
          <feGaussianBlur stdDeviation="0.6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Subtle shadow for active/hovered bands */}
        <filter id="bandHover" x="-5%" y="-20%" width="110%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="0.5" floodColor="#000" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Band rectangles */}
      {bandLayout.map(({ band, x, width }) => {
        const isActive = activeBand === band.id;
        const isHovered = hovered === band.id;
        const yPos = isActive || isHovered ? 1 : 2;
        const rectH = isActive || isHovered ? svgHeight - 2 : svgHeight - 4;

        return (
          <g key={band.id}>
            {/* Clickable/hoverable band */}
            <rect
              x={x + 0.15}
              y={yPos}
              width={width - 0.3}
              height={rectH}
              rx="0.8"
              fill={band.isVisible ? "url(#visibleRainbow)" : band.color}
              opacity={isActive ? 1 : isHovered ? 0.88 : 0.72}
              filter={isActive ? "url(#bandHover)" : band.isVisible ? "url(#specGlow)" : "none"}
              style={{ transition: "opacity 0.15s, y 0.1s" }}
              className="cursor-pointer"
              onClick={() => onBandClick(band.id)}
              onMouseEnter={() => setHovered(band.id)}
              onMouseLeave={() => setHovered(null)}
              tabIndex={0}
              role="button"
              aria-label={`${band.name} — click for details`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onBandClick(band.id);
                }
              }}
            />

            {/* Wave lines inside band */}
            <WaveLines
              x={x + 0.15}
              width={width - 0.3}
              y={yPos}
              height={rectH}
              color={band.isVisible ? "#ffffff" : "#ffffff"}
            />

            {/* Active indicator: top edge line */}
            {isActive && (
              <rect
                x={x + 0.15}
                y={1}
                width={width - 0.3}
                height={0.5}
                fill="white"
                opacity={0.6}
                rx="0.25"
              />
            )}
          </g>
        );
      })}

      {/* Visible band bracket annotation */}
      {visibleLayout && (
        <g>
          {/* Bracket line below visible band */}
          <line
            x1={visibleLayout.x + 0.5}
            y1={svgHeight - 1}
            x2={visibleLayout.x + visibleLayout.width - 0.5}
            y2={svgHeight - 1}
            stroke="white"
            strokeWidth="0.4"
            opacity="0.6"
          />
          {/* Bracket end ticks */}
          <line
            x1={visibleLayout.x + 0.5}
            y1={svgHeight - 1}
            x2={visibleLayout.x + 0.5}
            y2={svgHeight - 3.5}
            stroke="white"
            strokeWidth="0.4"
            opacity="0.6"
          />
          <line
            x1={visibleLayout.x + visibleLayout.width - 0.5}
            y1={svgHeight - 1}
            x2={visibleLayout.x + visibleLayout.width - 0.5}
            y2={svgHeight - 3.5}
            stroke="white"
            strokeWidth="0.4"
            opacity="0.6"
          />
        </g>
      )}

      {/* Band labels */}
      {bandLayout.map(({ band, x, width }) => {
        const cx = x + width / 2;
        const labelY = svgHeight + 8;
        const isActive = activeBand === band.id;

        // Short labels for small bands
        const label =
          band.id === "ultraviolet"
            ? "UV"
            : band.id === "infrared"
            ? "IR"
            : band.id === "xray"
            ? "X-Ray"
            : band.id === "gamma"
            ? "Gamma"
            : band.id === "radio"
            ? "Radio"
            : band.id === "microwave"
            ? "Micro"
            : "Visible";

        return (
          <text
            key={band.id}
            x={cx}
            y={labelY}
            textAnchor="middle"
            fontFamily="var(--font-inter), sans-serif"
            fontSize="2.6"
            fill={
              band.isVisible
                ? "var(--forward-blue)"
                : isActive
                ? "var(--text-primary)"
                : "var(--text-tertiary)"
            }
            fontWeight={band.isVisible || isActive ? "600" : "400"}
            style={{ transition: "fill 0.15s" }}
          >
            {label}
          </text>
        );
      })}

      {/* "YOU ARE HERE" pointer for visible band */}
      {visibleLayout && (
        <g>
          <text
            x={visibleLayout.x + visibleLayout.width / 2}
            y={svgHeight + 14}
            textAnchor="middle"
            fontFamily="var(--font-jetbrains), monospace"
            fontSize="2"
            fill="var(--forward-blue)"
            opacity="0.75"
          >
            you are here
          </text>
        </g>
      )}
    </svg>
  );
}

export default function SpectrumSection() {
  const [activeBandId, setActiveBandId] = useState<string | null>(null);

  const activeBand = activeBandId
    ? spectrumBands.find((b) => b.id === activeBandId) ?? null
    : null;

  function handleBandClick(id: string) {
    setActiveBandId((prev) => (prev === id ? null : id));
  }

  return (
    <SectionWrapper id="spectrum" layout="full-bleed" room="spacious">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">

        {/* Section header */}
        <div className="mb-10">
          <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-3">
            SECTION 01
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight">
            Light Is Just Waves
          </h2>
        </div>

        {/* Analogy intro */}
        <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mb-4">
          Imagine a piano keyboard that stretches from here to the moon. Light is like sound&nbsp;&mdash; it
          comes in different frequencies. But of all those keys, your eye can hear just{" "}
          <em>one tiny octave</em>.
        </p>

        {/* Technical explanation */}
        <p className="font-sans text-sm text-text-tertiary leading-relaxed max-w-xl mb-12">
          Visible light is electromagnetic radiation with wavelengths between{" "}
          <span className="font-mono text-text-secondary">380&ndash;700 nm</span>. Below that is
          infrared and radio. Above it is ultraviolet, X-rays, and gamma rays. Your eye is tuned
          to an impossibly narrow slice.
        </p>

        {/* EM Spectrum interactive bar */}
        <div className="rounded-2xl overflow-hidden border border-border bg-bg-card shadow-sm hover:ring-2 hover:ring-[var(--forward-blue)]/20 transition-all">
          <div className="px-5 pt-5 pb-2">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-4">
              The Electromagnetic Spectrum &mdash; tap any band
            </p>
            <SpectrumBarSVG activeBand={activeBandId} onBandClick={handleBandClick} />
          </div>

          {/* Tooltip card for active band */}
          <div
            className="px-5 pb-5"
            aria-live="polite"
            aria-atomic="true"
          >
            {activeBand ? (
              <TooltipCard band={activeBand} onClose={() => setActiveBandId(null)} />
            ) : (
              <p className="mt-2 font-sans text-xs text-text-tertiary italic">
                Select a band above to learn more.
              </p>
            )}
          </div>
        </div>

        {/* Stat box */}
        <div className="mt-12 flex justify-center">
          <div className="rounded-2xl bg-backward-orange/10 px-8 py-6 text-center">
            <div className="font-serif text-4xl sm:text-5xl font-bold text-backward-orange">
              <AnimatedCounter target={0.0035} decimals={4} prefix="< " suffix="%" />
            </div>
            <p className="mt-2 font-sans text-sm text-text-secondary max-w-xs">
              of the electromagnetic spectrum is visible to you
            </p>
          </div>
        </div>

        {/* "Whoa" bee fact aside */}
        <aside
          className="mt-10 mx-auto max-w-lg rounded-xl border border-border bg-bg-secondary/60 px-6 py-5 flex gap-4 items-start"
          aria-label="Fascinating fact"
        >
          {/* Organic biology accent — a simple hexagonal bee-hive motif */}
          <div
            className="flex-shrink-0 mt-0.5"
            aria-hidden="true"
          >
            <BeeSVGIcon />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
              Whoa fact
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Bees can see ultraviolet light. Flowers have patterns invisible to us&nbsp;&mdash; landing
              strips only bees can follow. What else are you missing?
            </p>
          </div>
        </aside>

      </div>
    </SectionWrapper>
  );
}

function BeeSVGIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      width="36"
      height="36"
      role="img"
      aria-label="Bee icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Honeycomb hex */}
      <polygon
        points="20,4 34,12 34,28 20,36 6,28 6,12"
        fill="none"
        stroke="var(--accent-amber)"
        strokeWidth="1.5"
        opacity="0.5"
      />
      {/* Inner hex */}
      <polygon
        points="20,10 29,15 29,25 20,30 11,25 11,15"
        fill="var(--accent-amber)"
        opacity="0.15"
      />
      {/* UV wave suggestion */}
      <path
        d="M12,20 Q16,16 20,20 Q24,24 28,20"
        fill="none"
        stroke="var(--accent-purple)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}
