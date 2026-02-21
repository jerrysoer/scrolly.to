"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import AnimatedCounter from "../AnimatedCounter";
import { colorVisionTypes, simulateColorVision, testColors } from "@/lib/explainers/eyes/color-vision";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => Math.round(v).toString(16).padStart(2, "0"))
      .join("")
  );
}

// ─── Vision Type Pill Button ──────────────────────────────────────────────────

interface VisionPillProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function VisionPill({ label, isActive, onClick }: VisionPillProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "min-h-[44px] px-4 py-2 rounded-full font-mono text-xs font-semibold tracking-wide",
        "border transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-purple",
        isActive
          ? "bg-accent-purple text-white border-accent-purple shadow-md"
          : "bg-bg-card text-text-secondary border-border hover:border-accent-purple hover:text-accent-purple",
      ].join(" ")}
      aria-pressed={isActive}
    >
      {label}
    </button>
  );
}

// ─── Color Swatch ─────────────────────────────────────────────────────────────

interface SwatchProps {
  name: string;
  originalHex: string;
  r: number;
  g: number;
  b: number;
  selectedType: string;
}

function ColorSwatch({ name, r, g, b, selectedType }: SwatchProps) {
  const simulated = simulateColorVision(r, g, b, selectedType);
  const simulatedHex = rgbToHex(simulated.r, simulated.g, simulated.b);

  return (
    <div className="flex flex-col items-center gap-2">
      <div
        className="w-full rounded-xl"
        style={{
          backgroundColor: simulatedHex,
          minHeight: "64px",
          transition: "background-color 0.5s ease",
          boxShadow: `0 2px 8px ${simulatedHex}55`,
        }}
        role="img"
        aria-label={`${name} as seen with ${selectedType} vision: ${simulatedHex}`}
      />
      <span className="font-mono text-[10px] text-text-tertiary text-center leading-tight">
        {name}
      </span>
    </div>
  );
}

// ─── Vision Info Card ─────────────────────────────────────────────────────────

interface VisionInfoCardProps {
  selectedType: string;
}

function VisionInfoCard({ selectedType }: VisionInfoCardProps) {
  const type = colorVisionTypes.find((t) => t.id === selectedType);
  if (!type) return null;

  // Accent color for the affected cone label
  const coneAccentColor =
    type.affectedCone === "none"
      ? "var(--correct-green)"
      : type.affectedCone.startsWith("L")
      ? "var(--cone-red)"
      : type.affectedCone.startsWith("M")
      ? "var(--cone-green)"
      : "var(--cone-blue)";

  return (
    <div
      className="rounded-2xl border border-border bg-bg-card p-5 sm:p-6 transition-all duration-200"
      style={{
        boxShadow:
          type.id === "normal"
            ? "0 0 0 0 transparent"
            : `0 0 0 1px var(--accent-purple)22, 0 4px 24px var(--accent-purple)18`,
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          `0 0 0 2px var(--accent-purple)44, 0 8px 32px var(--accent-purple)22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow =
          type.id === "normal"
            ? "0 0 0 0 transparent"
            : `0 0 0 1px var(--accent-purple)22, 0 4px 24px var(--accent-purple)18`;
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap mb-3">
        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
            Vision type
          </p>
          <h3 className="font-serif text-xl font-bold text-text-primary leading-tight">
            {type.name}
          </h3>
          <p
            className="font-mono text-sm mt-0.5"
            style={{ color: "var(--accent-purple)" }}
          >
            {type.technicalName}
          </p>
        </div>

        {/* Prevalence badge */}
        <div className="rounded-xl border border-border bg-bg-secondary px-4 py-2 text-center shrink-0">
          <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-0.5">
            Prevalence
          </p>
          <p className="font-mono text-xs font-semibold text-text-primary">
            {type.prevalence}
          </p>
        </div>
      </div>

      {/* Affected cone */}
      <div className="flex items-center gap-2 mb-3">
        <span className="font-mono text-xs text-text-tertiary">
          Affected cone:
        </span>
        <span
          className="font-mono text-xs font-semibold"
          style={{ color: coneAccentColor }}
        >
          {type.affectedCone === "none" ? "none — all three working" : type.affectedCone}
        </span>
      </div>

      {/* Description */}
      <p className="font-sans text-sm text-text-secondary leading-relaxed">
        {type.description}
      </p>
    </div>
  );
}

// ─── Color Vision Simulator ───────────────────────────────────────────────────

function ColorVisionSimulator() {
  const [selectedType, setSelectedType] = useState("normal");

  return (
    <div className="mt-10 rounded-2xl border border-border bg-bg-card p-5 sm:p-7 transition-all duration-200 hover:ring-2 hover:ring-accent-purple/20">
      {/* Widget label */}
      <p className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary mb-4">
        Color Vision Simulator
      </p>

      {/* Vision type selector — pill buttons */}
      <div
        className="flex flex-wrap gap-2 mb-6"
        role="group"
        aria-label="Select vision type"
      >
        {colorVisionTypes.map((type) => (
          <VisionPill
            key={type.id}
            label={type.id === "normal" ? "Normal Vision" : type.technicalName}
            isActive={selectedType === type.id}
            onClick={() => setSelectedType(type.id)}
          />
        ))}
      </div>

      {/* Color grid — 4 cols desktop, 3 tablet, 2 mobile */}
      <div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mb-6"
        aria-label="Color swatches"
      >
        {testColors.map((color) => (
          <ColorSwatch
            key={color.name}
            name={color.name}
            originalHex={color.hex}
            r={color.r}
            g={color.g}
            b={color.b}
            selectedType={selectedType}
          />
        ))}
      </div>

      {/* Info card for selected vision type */}
      <VisionInfoCard selectedType={selectedType} />
    </div>
  );
}

// ─── Main Section ─────────────────────────────────────────────────────────────

export default function ColorBlindnessSection() {
  return (
    <SectionWrapper id="color-blindness" layout="centered-card">

      {/* Overline */}
      <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-4">
        SECTION 05
      </p>

      {/* Headline */}
      <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
        Color Blindness
      </h2>

      {/* Analogy */}
      <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed mb-5">
        Imagine your keyboard is missing the letter &ldquo;E&rdquo;. You can
        still type&nbsp;&mdash; you&rsquo;d find workarounds, use different
        words. Color blindness isn&rsquo;t seeing in grayscale. It&rsquo;s
        having a slightly different alphabet for color.
      </p>

      {/* Technical explanation */}
      <p className="font-sans text-sm text-text-tertiary leading-relaxed mb-2">
        Color vision deficiency occurs when one cone type is missing or has
        shifted sensitivity. The most common form&nbsp;&mdash; red-green
        &mdash; affects about 1 in 12 men.
      </p>

      {/* Interactive simulator */}
      <ColorVisionSimulator />

      {/* Stat box callout */}
      <div className="mt-12 flex justify-center">
        <div className="rounded-2xl bg-accent-purple/10 px-8 py-6 text-center">
          <div className="font-serif text-5xl sm:text-6xl font-bold text-accent-purple">
            <AnimatedCounter target={8} suffix="%" />
          </div>
          <p className="mt-2 font-sans text-sm text-text-secondary max-w-xs">
            of men have some form of color vision deficiency
          </p>
        </div>
      </div>

    </SectionWrapper>
  );
}
