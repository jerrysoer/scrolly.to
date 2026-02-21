"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { dressAssumptions, actualDressColors, dressFacts } from "@/lib/explainers/eyes/dress";

// ─── Dress SVG Illustration ───────────────────────────────────────────────────

interface DressSVGProps {
  stripe1: string;
  stripe2: string;
  lightMode: "warm" | "cool" | "ambiguous";
}

function DressSVG({ stripe1, stripe2, lightMode }: DressSVGProps) {
  // Overlay tint based on lighting assumption
  const overlayColor =
    lightMode === "warm"
      ? "rgba(255, 180, 60, 0.22)"
      : lightMode === "cool"
      ? "rgba(60, 100, 200, 0.20)"
      : "rgba(0, 0, 0, 0)";

  return (
    <svg
      viewBox="0 0 300 500"
      width="100%"
      role="img"
      aria-labelledby="dress-svg-title"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block", maxWidth: "260px", margin: "0 auto" }}
    >
      <title id="dress-svg-title">
        An illustration of a striped dress. The perceived colors change depending
        on your brain&apos;s assumption about the light source.
      </title>

      <defs>
        {/* Subtle fabric texture filter */}
        <filter id="fabricTexture" x="0%" y="0%" width="100%" height="100%">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="3"
            result="noise"
          />
          <feColorMatrix
            type="saturate"
            values="0"
            in="noise"
            result="grayNoise"
          />
          <feBlend in="SourceGraphic" in2="grayNoise" mode="overlay" result="blend" />
          <feComposite in="blend" in2="SourceGraphic" operator="in" />
        </filter>

        {/* Card glow filter for the dress container */}
        <filter id="dressGlow" x="-8%" y="-8%" width="116%" height="116%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.29  0 0 0 0 0.56  0 0 0 0 0.85  0 0 0 0.35 0"
            in="blur"
            result="coloredBlur"
          />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Dress body clip path — A-line silhouette */}
        <clipPath id="dressSilhouette">
          {/* Bodice */}
          <path d="
            M 100,95
            C 100,85 120,75 150,72
            C 180,75 200,85 200,95
            L 215,180
            C 240,182 260,185 265,190
            C 258,196 240,200 218,202
            L 240,450
            C 240,458 230,465 150,465
            C 70,465 60,458 60,450
            L 82,202
            C 60,200 42,196 35,190
            C 40,185 60,182 85,180
            Z
          " />
        </clipPath>

        {/* Lace pattern filter for neckline */}
        <pattern
          id="lacePattern"
          x="0"
          y="0"
          width="12"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="3" cy="4" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          <circle cx="9" cy="4" r="1.5" fill="none" stroke="currentColor" strokeWidth="0.5" opacity="0.35" />
          <line x1="4.5" y1="4" x2="7.5" y2="4" stroke="currentColor" strokeWidth="0.4" opacity="0.2" />
        </pattern>
      </defs>

      {/* ── Dress shadow / ground suggestion ──────────────────────── */}
      <ellipse
        cx="150"
        cy="472"
        rx="72"
        ry="8"
        fill="var(--text-primary)"
        opacity="0.07"
      />

      {/* ── Dress body — striped fill (clipped to silhouette) ─────── */}
      <g clipPath="url(#dressSilhouette)" style={{ transition: "all 0.5s ease" }}>
        {/* Full body base */}
        <rect x="35" y="72" width="230" height="400" fill={stripe2} style={{ transition: "fill 0.6s ease" }} />

        {/* Horizontal stripes — alternating */}
        {/* Bodice stripes */}
        <rect x="35" y="72"  width="230" height="18" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="108" width="230" height="16" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="142" width="230" height="16" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />

        {/* Skirt stripes */}
        <rect x="35" y="202" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="242" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="282" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="322" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="362" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="402" width="230" height="20" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />
        <rect x="35" y="440" width="230" height="25" fill={stripe1} style={{ transition: "fill 0.6s ease" }} />

        {/* Lighting overlay tint — smooth transition */}
        <rect
          x="35"
          y="72"
          width="230"
          height="400"
          fill={overlayColor}
          style={{ transition: "fill 0.6s ease" }}
        />
      </g>

      {/* ── Dress outline silhouette ───────────────────────────────── */}
      {/* Bodice outline */}
      <path
        d="
          M 100,95
          C 100,85 120,75 150,72
          C 180,75 200,85 200,95
          L 215,180
          C 240,182 260,185 265,190
          C 258,196 240,200 218,202
          L 240,450
          C 240,458 230,465 150,465
          C 70,465 60,458 60,450
          L 82,202
          C 60,200 42,196 35,190
          C 40,185 60,182 85,180
          Z
        "
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="1.5"
        strokeOpacity="0.25"
        strokeLinejoin="round"
      />

      {/* Waist seam line */}
      <path
        d="M 88,200 C 110,204 135,206 150,206 C 165,206 190,204 212,200"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="1"
        strokeOpacity="0.18"
        strokeDasharray="4,3"
      />

      {/* ── Neckline — lace suggestion ────────────────────────────── */}
      <path
        d="M 100,95 C 115,108 130,116 150,118 C 170,116 185,108 200,95"
        fill="url(#lacePattern)"
        stroke="var(--text-primary)"
        strokeWidth="1"
        strokeOpacity="0.2"
        opacity="0.5"
      />
      {/* Neckline arc */}
      <path
        d="M 108,90 Q 150,122 192,90"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="1.2"
        strokeOpacity="0.3"
        strokeLinecap="round"
      />
      {/* Small lace dots at neckline */}
      {[118, 128, 138, 150, 162, 172, 182].map((x, i) => (
        <circle
          key={i}
          cx={x}
          cy={i % 2 === 0 ? 99 : 103}
          r="1.2"
          fill="var(--text-primary)"
          opacity="0.18"
        />
      ))}

      {/* ── Shoulder straps ────────────────────────────────────────── */}
      <path
        d="M 118,72 Q 110,58 108,44"
        fill="none"
        stroke={stripe2}
        strokeWidth="10"
        strokeLinecap="round"
        style={{ transition: "stroke 0.6s ease" }}
      />
      <path
        d="M 182,72 Q 190,58 192,44"
        fill="none"
        stroke={stripe2}
        strokeWidth="10"
        strokeLinecap="round"
        style={{ transition: "stroke 0.6s ease" }}
      />
      {/* Strap overlay tint */}
      <path
        d="M 118,72 Q 110,58 108,44"
        fill="none"
        stroke={overlayColor}
        strokeWidth="10"
        strokeLinecap="round"
        style={{ transition: "stroke 0.6s ease" }}
      />
      <path
        d="M 182,72 Q 190,58 192,44"
        fill="none"
        stroke={overlayColor}
        strokeWidth="10"
        strokeLinecap="round"
        style={{ transition: "stroke 0.6s ease" }}
      />
      {/* Strap outlines */}
      <path
        d="M 118,72 Q 110,58 108,44"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />
      <path
        d="M 182,72 Q 190,58 192,44"
        fill="none"
        stroke="var(--text-primary)"
        strokeWidth="1"
        strokeOpacity="0.2"
        strokeLinecap="round"
      />

      {/* ── Lighting mode annotation ───────────────────────────────── */}
      {lightMode !== "ambiguous" && (
        <g>
          <line
            x1="265"
            y1="140"
            x2="290"
            y2="120"
            stroke={lightMode === "warm" ? "#F5A623" : "#4A90D9"}
            strokeWidth="1.2"
            strokeOpacity="0.5"
            strokeDasharray="3,2"
          />
          <circle
            cx="290"
            cy="114"
            r="8"
            fill={lightMode === "warm" ? "#F5A623" : "#4A90D9"}
            opacity="0.2"
          />
          <circle
            cx="290"
            cy="114"
            r="4"
            fill={lightMode === "warm" ? "#F5A623" : "#4A90D9"}
            opacity="0.7"
          />
          {/* Light rays */}
          {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const x1 = 290 + Math.cos(rad) * 5.5;
            const y1 = 114 + Math.sin(rad) * 5.5;
            const x2 = 290 + Math.cos(rad) * 10;
            const y2 = 114 + Math.sin(rad) * 10;
            return (
              <line
                key={i}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke={lightMode === "warm" ? "#F5A623" : "#4A90D9"}
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.5"
              />
            );
          })}
        </g>
      )}
    </svg>
  );
}

// ─── Lighting Toggle Buttons ──────────────────────────────────────────────────

interface LightingToggleProps {
  selected: "warm" | "cool" | "ambiguous";
  onChange: (mode: "warm" | "cool" | "ambiguous") => void;
}

function LightingToggle({ selected, onChange }: LightingToggleProps) {
  const options: Array<{
    id: "warm" | "cool" | "ambiguous";
    label: string;
    sublabel: string;
    icon: string;
    accentColor: string;
    borderColor: string;
  }> = [
    {
      id: "warm",
      label: "I see it in shadow",
      sublabel: "warm light",
      icon: "☀",
      accentColor: "#F5A623",
      borderColor: "rgba(245, 166, 35, 0.5)",
    },
    {
      id: "ambiguous",
      label: "Ambiguous",
      sublabel: "original photo",
      icon: "◑",
      accentColor: "var(--text-tertiary)",
      borderColor: "rgba(138, 138, 130, 0.4)",
    },
    {
      id: "cool",
      label: "I see it in bright light",
      sublabel: "cool light",
      icon: "❄",
      accentColor: "#4A90D9",
      borderColor: "rgba(74, 144, 217, 0.5)",
    },
  ];

  return (
    <div className="flex flex-col sm:flex-row gap-3 w-full" role="radiogroup" aria-label="Select lighting assumption">
      {options.map((opt) => {
        const isSelected = selected === opt.id;
        return (
          <button
            key={opt.id}
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(opt.id)}
            className="flex-1 rounded-xl border px-4 py-4 text-left transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-forward-blue"
            style={{
              borderColor: isSelected ? opt.borderColor : "var(--border)",
              backgroundColor: isSelected
                ? `color-mix(in srgb, ${opt.accentColor} 8%, var(--bg-card))`
                : "var(--bg-card)",
              boxShadow: isSelected
                ? `0 0 0 2px ${opt.borderColor}, 0 4px 16px color-mix(in srgb, ${opt.accentColor} 15%, transparent)`
                : "none",
            }}
            onMouseEnter={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 2px 8px color-mix(in srgb, ${opt.accentColor} 10%, transparent)`;
                (e.currentTarget as HTMLElement).style.borderColor = opt.borderColor;
              }
            }}
            onMouseLeave={(e) => {
              if (!isSelected) {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
                (e.currentTarget as HTMLElement).style.borderColor = "var(--border)";
              }
            }}
          >
            <div className="flex items-start gap-3">
              <span
                className="text-xl leading-none flex-shrink-0 mt-0.5"
                aria-hidden="true"
                style={{ color: opt.accentColor }}
              >
                {opt.icon}
              </span>
              <div>
                <p
                  className="font-sans text-sm font-semibold leading-tight"
                  style={{ color: isSelected ? opt.accentColor : "var(--text-primary)" }}
                >
                  {opt.label}
                </p>
                <p className="font-mono text-xs text-text-tertiary mt-0.5">
                  {opt.sublabel}
                </p>
              </div>
              {isSelected && (
                <span
                  className="ml-auto flex-shrink-0 w-4 h-4 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: opt.accentColor }}
                  aria-hidden="true"
                >
                  <svg viewBox="0 0 10 10" width="8" height="8">
                    <path
                      d="M2 5 L4 7 L8 3"
                      fill="none"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Explanation Card ─────────────────────────────────────────────────────────

interface ExplanationCardProps {
  mode: "warm" | "cool" | "ambiguous";
  visible: boolean;
}

function ExplanationCard({ mode, visible }: ExplanationCardProps) {
  const assumption = dressAssumptions.find((a) => a.id === mode);

  const ambiguousContent = {
    name: "Ambiguous lighting",
    explanation:
      "This is the raw photo with no assumed light source. The colors are genuinely ambiguous — your brain has no strong cue to anchor its interpretation. This is what made the photo go viral: the absence of context forced everyone's brain to guess.",
    perceivedColors: actualDressColors,
  };

  const content = assumption ?? ambiguousContent;
  const stripe1Color = assumption
    ? assumption.perceivedColors.stripe1
    : actualDressColors.stripe1;
  const stripe2Color = assumption
    ? assumption.perceivedColors.stripe2
    : actualDressColors.stripe2;

  return (
    <div
      className="rounded-xl border border-border bg-bg-card px-5 py-4 transition-all duration-300"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
      }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="flex items-start gap-3">
        {/* Color swatch pair */}
        <div className="flex flex-col gap-1.5 flex-shrink-0 mt-0.5" aria-hidden="true">
          <span
            className="block w-5 h-5 rounded-md border border-black/10"
            style={{ backgroundColor: stripe1Color, transition: "background-color 0.5s ease" }}
          />
          <span
            className="block w-5 h-5 rounded-md border border-black/10"
            style={{ backgroundColor: stripe2Color, transition: "background-color 0.5s ease" }}
          />
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
            Brain&apos;s interpretation
          </p>
          <p className="font-serif text-base sm:text-lg text-text-primary leading-relaxed">
            {content.explanation}
          </p>
          {assumption && (
            <p className="mt-2 font-mono text-xs text-text-tertiary">
              Perceived:{" "}
              <span style={{ color: stripe1Color, fontWeight: 600 }}>
                {mode === "warm" ? "white" : "blue"}
              </span>
              {" & "}
              <span style={{ color: stripe2Color, fontWeight: 600 }}>
                {mode === "warm" ? "gold" : "black"}
              </span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Fun Facts Strip ──────────────────────────────────────────────────────────

interface FactCardProps {
  fact: string;
  index: number;
  visible: boolean;
}

function FactCard({ fact, index, visible }: FactCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="rounded-xl border bg-bg-card px-4 py-3 cursor-default"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: `opacity 0.4s ease ${index * 80}ms, transform 0.4s ease ${index * 80}ms, box-shadow 0.2s ease, border-color 0.2s ease`,
        borderColor: hovered ? "var(--forward-blue)" : "var(--border)",
        boxShadow: hovered
          ? "0 0 0 1px var(--forward-blue), 0 4px 16px rgba(74, 144, 217, 0.12)"
          : "none",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-2.5">
        <span
          className="flex-shrink-0 mt-0.5 font-mono text-xs font-bold"
          style={{ color: "var(--backward-orange)" }}
          aria-hidden="true"
        >
          {String(index + 1).padStart(2, "0")}
        </span>
        <p className="font-sans text-sm text-text-secondary leading-relaxed">{fact}</p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function TheDressSection() {
  const [lightMode, setLightMode] = useState<"warm" | "cool" | "ambiguous">("ambiguous");
  const [cardVisible, setCardVisible] = useState(true);
  const factsRef = useRef<HTMLDivElement>(null);
  const [factsVisible, setFactsVisible] = useState(false);

  // Get current dress colors based on mode
  const currentColors =
    lightMode === "warm"
      ? dressAssumptions[0].perceivedColors
      : lightMode === "cool"
      ? dressAssumptions[1].perceivedColors
      : actualDressColors;

  // Brief fade-out/in when mode changes for the explanation card
  function handleModeChange(mode: "warm" | "cool" | "ambiguous") {
    setCardVisible(false);
    setTimeout(() => {
      setLightMode(mode);
      setCardVisible(true);
    }, 160);
  }

  // Stagger facts on scroll
  useEffect(() => {
    const el = factsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setFactsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="the-dress" layout="full-bleed" room="spacious">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">

        {/* ── Section header ──────────────────────────────────────── */}
        <p className="font-mono text-xs uppercase tracking-widest text-backward-orange mb-4">
          SECTION 06
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
          The Dress
        </h2>

        {/* ── Analogy ─────────────────────────────────────────────── */}
        <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed max-w-2xl mb-4">
          Imagine you&rsquo;re in a room and someone turns on a yellow-tinted lamp.
          Your brain automatically adjusts&nbsp;&mdash; it &ldquo;subtracts&rdquo; the yellow
          from everything so you still see true colors. It does this all day, every day,
          without you noticing. But what if the lamp color was <em>ambiguous</em>?
        </p>

        {/* ── Technical explanation ────────────────────────────────── */}
        <p className="font-sans text-sm text-text-tertiary leading-relaxed max-w-xl mb-12">
          In February 2015, a photo of a dress broke the internet. Half saw white &amp; gold.
          Half saw blue &amp; black. The answer: the photo had ambiguous lighting cues, and
          everyone&rsquo;s brain made a different assumption about the light source.
        </p>

        {/* ── Interactive: Dress + toggle ──────────────────────────── */}
        <div className="rounded-2xl border border-border bg-bg-card shadow-sm overflow-hidden">
          {/* Card header */}
          <div className="px-5 pt-5 pb-0">
            <p className="font-mono text-xs uppercase tracking-wider text-text-tertiary mb-1">
              Interactive &mdash; what does your brain assume?
            </p>
          </div>

          <div className="p-5 flex flex-col lg:flex-row gap-8 items-start">
            {/* Left: Dress illustration */}
            <div className="w-full lg:w-auto flex flex-col items-center gap-3 lg:flex-shrink-0">
              <div
                className="w-48 sm:w-56 rounded-xl overflow-hidden"
                aria-label="Dress illustration"
              >
                <DressSVG
                  stripe1={currentColors.stripe1}
                  stripe2={currentColors.stripe2}
                  lightMode={lightMode}
                />
              </div>

              {/* Color swatch labels */}
              <div className="flex gap-3 items-center">
                <div className="flex items-center gap-1.5">
                  <span
                    className="block w-3.5 h-3.5 rounded-full border border-black/10 transition-colors duration-500"
                    style={{ backgroundColor: currentColors.stripe1 }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-text-tertiary">
                    {lightMode === "warm" ? "white" : lightMode === "cool" ? "blue" : "ambiguous"}
                  </span>
                </div>
                <span className="text-text-tertiary text-xs">&amp;</span>
                <div className="flex items-center gap-1.5">
                  <span
                    className="block w-3.5 h-3.5 rounded-full border border-black/10 transition-colors duration-500"
                    style={{ backgroundColor: currentColors.stripe2 }}
                    aria-hidden="true"
                  />
                  <span className="font-mono text-xs text-text-tertiary">
                    {lightMode === "warm" ? "gold" : lightMode === "cool" ? "black" : "ambiguous"}
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Toggle + explanation */}
            <div className="flex-1 w-full flex flex-col gap-4">
              <LightingToggle selected={lightMode} onChange={handleModeChange} />
              <ExplanationCard mode={lightMode} visible={cardVisible} />
            </div>
          </div>
        </div>

        {/* ── Pull-quote callout ───────────────────────────────────── */}
        <div className="my-12 mx-auto max-w-2xl text-center">
          <div className="border-t border-text-tertiary/30 mx-auto w-16 mb-6" />
          <p className="font-serif text-xl sm:text-2xl italic text-text-primary leading-relaxed">
            &ldquo;Your brain doesn&rsquo;t show you reality. It shows you a{" "}
            <em>useful story</em> about reality. And sometimes, two people&rsquo;s
            brains tell different stories about the same photo.&rdquo;
          </p>
          <div className="border-b border-text-tertiary/30 mx-auto w-16 mt-6" />
        </div>

        {/* ── Fun facts strip ──────────────────────────────────────── */}
        <div ref={factsRef}>
          <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-4">
            The Dress by the numbers
          </p>
          <div className="flex flex-col gap-2.5">
            {dressFacts.map((fact, i) => (
              <FactCard
                key={i}
                fact={fact}
                index={i}
                visible={factsVisible}
              />
            ))}
          </div>
        </div>

        {/* ── Closing organic aside ────────────────────────────────── */}
        <aside
          className="mt-10 rounded-xl border border-border bg-bg-secondary/60 px-6 py-5 flex gap-4 items-start"
          aria-label="Color constancy science note"
        >
          <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <BrainWaveIcon />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
              The science
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              This is called{" "}
              <strong className="text-text-primary font-semibold">chromatic adaptation</strong>
              &nbsp;&mdash; your visual system continuously re-calibrates color perception based
              on inferred illumination. The dress exposed how this unconscious process varies
              between individuals, spawning over 20 peer-reviewed papers.
            </p>
          </div>
        </aside>

      </div>
    </SectionWrapper>
  );
}

// ─── Decorative brain-wave icon ───────────────────────────────────────────────

function BrainWaveIcon() {
  return (
    <svg
      viewBox="0 0 40 40"
      width="36"
      height="36"
      role="img"
      aria-label="Brain icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Brain outline — organic rounded shape */}
      <path
        d="M 20,6
           C 26,6 32,10 33,16
           C 35,17 37,19 37,22
           C 37,25 35,27 33,28
           C 32,33 27,36 22,36
           L 18,36
           C 13,36 8,33 7,28
           C 5,27 3,25 3,22
           C 3,19 5,17 7,16
           C 8,10 14,6 20,6 Z"
        fill="none"
        stroke="var(--accent-purple)"
        strokeWidth="1.4"
        strokeOpacity="0.5"
      />
      {/* Brain center fold */}
      <line
        x1="20" y1="8"
        x2="20" y2="35"
        stroke="var(--accent-purple)"
        strokeWidth="0.8"
        strokeOpacity="0.25"
        strokeDasharray="2,2"
      />
      {/* Neural wave lines */}
      <path
        d="M 10,20 Q 13,16 16,20 Q 19,24 22,20 Q 25,16 28,20 Q 31,24 30,22"
        fill="none"
        stroke="var(--accent-purple)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Glow dots */}
      <circle cx="10" cy="20" r="1.5" fill="var(--accent-purple)" opacity="0.5" />
      <circle cx="30" cy="22" r="1.5" fill="var(--accent-purple)" opacity="0.5" />
    </svg>
  );
}
