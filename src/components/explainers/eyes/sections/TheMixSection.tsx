"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { computeConeResponse, colorPresets } from "@/lib/explainers/eyes/cones";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0").toUpperCase())
      .join("")
  );
}

// ─── Slider ───────────────────────────────────────────────────────────────────

interface ColorSliderProps {
  label: string;
  value: number;
  onChange: (v: number) => void;
  color: string;
  cssVar: string;
}

function ColorSlider({ label, value, onChange, color, cssVar }: ColorSliderProps) {
  return (
    <div className="flex flex-col items-center gap-2 flex-1 min-w-0">
      {/* Letter label */}
      <span
        className="font-mono text-sm font-bold tracking-wider"
        style={{ color }}
        aria-hidden="true"
      >
        {label}
      </span>

      {/* Vertical slider wrapper — rotate a horizontal range input */}
      <div
        className="relative flex items-center justify-center"
        style={{ height: "160px", width: "44px" }}
      >
        <input
          type="range"
          min={0}
          max={255}
          step={1}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          aria-label={`${label === "R" ? "Red" : label === "G" ? "Green" : "Blue"} channel (0–255)`}
          style={{
            writingMode: "vertical-lr" as React.CSSProperties["writingMode"],
            direction: "rtl",
            width: "160px",
            height: "44px",
            transform: "rotate(180deg)",
            background: `linear-gradient(to top, ${color} 0%, ${color} ${(value / 255) * 100}%, var(--bg-secondary) ${(value / 255) * 100}%, var(--bg-secondary) 100%)`,
            appearance: "none",
            WebkitAppearance: "none",
            // Pass channel color as CSS var so the ::-webkit-slider-thumb override below can use it
            ["--range-thumb-color" as string]: color,
          }}
        />
      </div>

      {/* Numeric value */}
      <span
        className="font-mono text-sm font-semibold tabular-nums"
        style={{ color }}
      >
        {value}
      </span>
    </div>
  );
}

// ─── Cone Activation Bar ──────────────────────────────────────────────────────

interface ConeBarProps {
  label: string;
  sublabel: string;
  activation: number; // 0–1
  color: string;
}

function ConeBar({ label, sublabel, activation, color }: ConeBarProps) {
  const pct = Math.round(activation * 100);
  return (
    <div className="flex-1 min-w-0">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="font-mono text-xs font-semibold" style={{ color }}>
          {label}
        </span>
        <span className="font-mono text-xs text-text-tertiary">{sublabel}</span>
        <span
          className="font-mono text-xs font-bold tabular-nums ml-1"
          style={{ color }}
        >
          {pct}%
        </span>
      </div>
      <div
        className="w-full rounded-full overflow-hidden"
        style={{ height: "10px", background: "var(--bg-secondary)" }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`${label} ${sublabel} activation ${pct}%`}
      >
        <div
          className="h-full rounded-full transition-all duration-150"
          style={{
            width: `${pct}%`,
            background: color,
            boxShadow: pct > 5 ? `0 0 8px ${color}66` : "none",
          }}
        />
      </div>
    </div>
  );
}

// ─── Preset Button ────────────────────────────────────────────────────────────

interface PresetButtonProps {
  name: string;
  r: number;
  g: number;
  b: number;
  isSelected: boolean;
  onClick: () => void;
}

function PresetButton({ name, r, g, b, isSelected }: PresetButtonProps) {
  const hex = toHex(r, g, b);
  // Decide border color: white on light bg needs a visible stroke
  const needsBorder = r > 240 && g > 240 && b > 240;
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div
        className="rounded-full transition-all duration-150 cursor-pointer"
        style={{
          width: "36px",
          height: "36px",
          backgroundColor: hex,
          border: isSelected
            ? "3px solid var(--forward-blue)"
            : needsBorder
            ? "2px solid var(--border)"
            : "2px solid transparent",
          boxShadow: isSelected
            ? `0 0 0 2px var(--forward-blue), 0 0 12px ${hex}55`
            : `0 2px 6px ${hex}44`,
          transform: isSelected ? "scale(1.15)" : "scale(1)",
        }}
        role="button"
        tabIndex={0}
        aria-label={`Select ${name} preset`}
        aria-pressed={isSelected}
      />
      <span className="font-mono text-[10px] text-text-tertiary leading-tight text-center max-w-[44px]">
        {name}
      </span>
    </div>
  );
}

// ─── RGB Mixer Widget ─────────────────────────────────────────────────────────

function RGBMixer() {
  const [r, setR] = useState(255);
  const [g, setG] = useState(255);
  const [b, setB] = useState(0);
  const [selectedPreset, setSelectedPreset] = useState<string | null>("Yellow");

  const cones = computeConeResponse(r, g, b);
  const hex = toHex(r, g, b);
  const rgbLabel = `rgb(${r}, ${g}, ${b})`;

  // Need subtle border so white swatch is visible
  const swatchNeedsBorder = r > 230 && g > 230 && b > 230;

  const applyPreset = useCallback(
    (preset: (typeof colorPresets)[number]) => {
      setR(preset.r);
      setG(preset.g);
      setB(preset.b);
      setSelectedPreset(preset.name);
    },
    []
  );

  // Clear preset selection when a slider moves manually
  const handleRChange = (v: number) => {
    setR(v);
    setSelectedPreset(null);
  };
  const handleGChange = (v: number) => {
    setG(v);
    setSelectedPreset(null);
  };
  const handleBChange = (v: number) => {
    setB(v);
    setSelectedPreset(null);
  };

  const activePreset = colorPresets.find((p) => p.name === selectedPreset);

  return (
    <div className="rgb-mixer rounded-2xl border border-border bg-bg-card p-6 sm:p-8 transition-all duration-200 hover:ring-2 hover:ring-[var(--forward-blue)]/20">
      {/* Scoped slider thumb styles */}
      <style dangerouslySetInnerHTML={{ __html: SLIDER_STYLES }} />
      {/* ── Main two-column area ─────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row gap-8">

        {/* Left column: sliders + cone bars */}
        <div className="flex-1 flex flex-col gap-6">

          {/* Three vertical sliders */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-4">
              Mix your color
            </p>
            <div className="flex items-end justify-around gap-2">
              <ColorSlider
                label="R"
                value={r}
                onChange={handleRChange}
                color="var(--cone-red)"
                cssVar="--cone-red"
              />
              <ColorSlider
                label="G"
                value={g}
                onChange={handleGChange}
                color="var(--cone-green)"
                cssVar="--cone-green"
              />
              <ColorSlider
                label="B"
                value={b}
                onChange={handleBChange}
                color="var(--cone-blue)"
                cssVar="--cone-blue"
              />
            </div>
          </div>

          {/* Cone activation bars */}
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-3">
              Cone activation
            </p>
            <div className="flex flex-col gap-3">
              <ConeBar
                label="L-cone"
                sublabel="red"
                activation={cones.L}
                color="var(--cone-red)"
              />
              <ConeBar
                label="M-cone"
                sublabel="green"
                activation={cones.M}
                color="var(--cone-green)"
              />
              <ConeBar
                label="S-cone"
                sublabel="blue"
                activation={cones.S}
                color="var(--cone-blue)"
              />
            </div>
          </div>
        </div>

        {/* Right column: swatch */}
        <div className="flex flex-col items-center justify-center gap-4 sm:w-40 shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
            Your color
          </p>

          {/* Color swatch circle */}
          <div
            className="rounded-full transition-colors duration-100"
            style={{
              width: "128px",
              height: "128px",
              backgroundColor: hex,
              border: swatchNeedsBorder
                ? "2px solid var(--border)"
                : "2px solid transparent",
              boxShadow: `0 8px 32px ${hex}55, 0 2px 8px rgba(0,0,0,0.12)`,
            }}
            role="img"
            aria-label={`Mixed color: ${hex}, ${rgbLabel}`}
          />

          {/* Hex value */}
          <div className="text-center">
            <p className="font-mono text-base font-bold text-text-primary tracking-widest">
              {hex}
            </p>
            <p className="font-mono text-xs text-text-tertiary mt-0.5">
              {rgbLabel}
            </p>
          </div>
        </div>
      </div>

      {/* ── Preset buttons ───────────────────────────────────────── */}
      <div className="mt-7">
        <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-3">
          Try a preset
        </p>
        <div
          className="flex flex-wrap gap-3"
          role="group"
          aria-label="Color presets"
        >
          {colorPresets.map((preset) => (
            <button
              key={preset.name}
              type="button"
              onClick={() => applyPreset(preset)}
              className="focus:outline-none focus-visible:ring-2 focus-visible:ring-forward-blue rounded-full"
              aria-label={`Select ${preset.name}`}
            >
              <PresetButton
                name={preset.name}
                r={preset.r}
                g={preset.g}
                b={preset.b}
                isSelected={selectedPreset === preset.name}
                onClick={() => applyPreset(preset)}
              />
            </button>
          ))}
        </div>
      </div>

      {/* ── Selected preset note ─────────────────────────────────── */}
      <div
        className="mt-4 min-h-[2rem] transition-all duration-200"
        aria-live="polite"
        aria-atomic="true"
      >
        {activePreset && (
          <p className="font-sans text-sm text-text-secondary italic leading-relaxed">
            <span className="font-semibold not-italic text-text-primary">
              {activePreset.name}:
            </span>{" "}
            {activePreset.note}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Whoa Fact ────────────────────────────────────────────────────────────────

function WhoaFact() {
  return (
    <aside
      className="mt-8 rounded-xl border border-border bg-bg-secondary/60 px-5 py-4 flex gap-3 items-start"
      aria-label="Fascinating fact about yellow"
    >
      {/* Organic icon — painter's palette shape */}
      <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
        <PainterIcon />
      </div>
      <div>
        <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
          Whoa fact
        </p>
        <p className="font-sans text-sm text-text-secondary leading-relaxed">
          &ldquo;Yellow&rdquo; as a pure wavelength (580&thinsp;nm) and &ldquo;yellow&rdquo; as R+G
          mixed look identical to your brain. It literally cannot tell the
          difference. Your monitor has no yellow pixels&nbsp;&mdash; only red
          and green ones pretending.
        </p>
      </div>
    </aside>
  );
}

// ─── Decorative painter palette icon ─────────────────────────────────────────

function PainterIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      width="32"
      height="32"
      role="img"
      aria-label="Painter's palette icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Palette body */}
      <ellipse
        cx="18"
        cy="20"
        rx="14"
        ry="12"
        fill="var(--bg-card)"
        stroke="var(--border)"
        strokeWidth="1.5"
      />
      {/* Thumb hole */}
      <ellipse cx="12" cy="12" rx="4" ry="4" fill="var(--bg-primary)" stroke="var(--border)" strokeWidth="1" />
      {/* Color blobs */}
      <circle cx="10" cy="20" r="3" fill="var(--cone-red)" opacity="0.85" />
      <circle cx="18" cy="26" r="3" fill="var(--cone-green)" opacity="0.85" />
      <circle cx="26" cy="20" r="3" fill="var(--cone-blue)" opacity="0.85" />
      <circle cx="22" cy="13" r="2.5" fill="var(--accent-amber)" opacity="0.80" />
    </svg>
  );
}

// ─── Scoped slider thumb styles ───────────────────────────────────────────────
// The global CSS sets the thumb color to var(--forward-blue). We inject a
// scoped rule that reads from the --range-thumb-color CSS variable set inline
// on each input so each channel's thumb matches its color.

const SLIDER_STYLES = `
  .rgb-mixer input[type="range"]::-webkit-slider-thumb {
    background: var(--range-thumb-color, var(--forward-blue));
  }
  .rgb-mixer input[type="range"]::-moz-range-thumb {
    background: var(--range-thumb-color, var(--forward-blue));
  }
`;

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function TheMixSection() {
  return (
    <SectionWrapper id="the-mix" layout="centered-card">

      {/* ── Overline ─────────────────────────────────────────────── */}
      <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-4">
        SECTION 03
      </p>

      {/* ── Headline ─────────────────────────────────────────────── */}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
        The Mix
      </h2>

      {/* ── Analogy ──────────────────────────────────────────────── */}
      <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed mb-5">
        Imagine a painter with only three tubes of paint&nbsp;&mdash; red,
        green, and blue. Every color in the sunset, every shade of your
        favorite shirt, is just different amounts of those three. Your brain
        is that painter.
      </p>

      {/* ── Technical explanation ─────────────────────────────────── */}
      <p className="font-sans text-sm text-text-tertiary leading-relaxed mb-10">
        Your brain doesn&rsquo;t see &ldquo;yellow.&rdquo; It sees: red cone
        firing at 97%, green cone at 75%, blue cone silent. And from that ratio
        alone, it invents the experience of yellow. This is{" "}
        <JargonTerm
          term="trichromacy"
          definition="Color vision based on three types of cone cells. Tri = three, chromacy = color."
        >
          trichromacy
        </JargonTerm>
        &nbsp;&mdash; color built from three independent signals.
      </p>

      {/* ── RGB Mixer Widget ──────────────────────────────────────── */}
      <RGBMixer />

      {/* ── Whoa fact ─────────────────────────────────────────────── */}
      <WhoaFact />
    </SectionWrapper>
  );
}
