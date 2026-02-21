"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { coneTypes } from "@/lib/explainers/eyes/cones";

// ─── Eye Cross-Section SVG ────────────────────────────────────────────────────

function EyeCrossSectionSVG() {
  return (
    <svg
      viewBox="0 0 500 400"
      width="100%"
      role="img"
      aria-labelledby="eye-cross-section-title"
      xmlns="http://www.w3.org/2000/svg"
      style={{ display: "block" }}
    >
      <title id="eye-cross-section-title">
        Cross-section of the human eye showing the lens, retina, and three
        types of cone cells: S-cones (blue), M-cones (green), and L-cones
        (red), each tuned to a different wavelength of light.
      </title>

      <defs>
        {/* Sclera gradient — off-white with organic warm tint */}
        <radialGradient id="scleraGrad" cx="38%" cy="42%" r="60%">
          <stop offset="0%" stopColor="var(--bg-card)" stopOpacity="1" />
          <stop offset="100%" stopColor="var(--bg-secondary)" stopOpacity="0.85" />
        </radialGradient>

        {/* Vitreous humor — subtle blue-tinted clear gel */}
        <radialGradient id="vitreousGrad" cx="45%" cy="45%" r="55%">
          <stop offset="0%" stopColor="var(--forward-blue)" stopOpacity="0.06" />
          <stop offset="100%" stopColor="var(--bg-card)" stopOpacity="0.0" />
        </radialGradient>

        {/* Lens gradient — crystalline */}
        <radialGradient id="lensGrad" cx="35%" cy="30%" r="65%">
          <stop offset="0%" stopColor="var(--bg-card)" stopOpacity="0.95" />
          <stop offset="70%" stopColor="var(--forward-blue)" stopOpacity="0.12" />
          <stop offset="100%" stopColor="var(--forward-blue)" stopOpacity="0.08" />
        </radialGradient>

        {/* Retina gradient — warm organic tissue */}
        <linearGradient id="retinaGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--backward-orange)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--accent-amber)" stopOpacity="0.18" />
        </linearGradient>

        {/* Cone glow filter */}
        <filter id="coneGlowXS" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Soft ambient glow for the whole eye */}
        <filter id="eyeAmbient" x="-5%" y="-5%" width="110%" height="110%">
          <feGaussianBlur stdDeviation="2.5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Light ray gradient */}
        <linearGradient id="lightRayGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-amber)" stopOpacity="0.9" />
          <stop offset="40%" stopColor="var(--forward-blue)" stopOpacity="0.7" />
          <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.15" />
        </linearGradient>

        {/* Second light ray */}
        <linearGradient id="lightRayGrad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--correct-green)" stopOpacity="0.8" />
          <stop offset="40%" stopColor="var(--forward-blue)" stopOpacity="0.6" />
          <stop offset="100%" stopColor="var(--cone-green)" stopOpacity="0.1" />
        </linearGradient>

        {/* Third light ray */}
        <linearGradient id="lightRayGrad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--cone-blue)" stopOpacity="0.85" />
          <stop offset="40%" stopColor="var(--forward-blue)" stopOpacity="0.55" />
          <stop offset="100%" stopColor="var(--cone-blue)" stopOpacity="0.08" />
        </linearGradient>

        {/* Clip path — main eye boundary */}
        <clipPath id="eyeBoundaryClip">
          <ellipse cx="248" cy="200" rx="196" ry="168" />
        </clipPath>
      </defs>

      {/* ── Outer eye body (sclera) ───────────────────────────────── */}
      <ellipse
        cx="248"
        cy="200"
        rx="196"
        ry="168"
        fill="url(#scleraGrad)"
        stroke="var(--text-primary)"
        strokeWidth="2"
        strokeOpacity="0.55"
      />

      {/* ── Vitreous humor fill (inside) ─────────────────────────── */}
      <ellipse
        cx="248"
        cy="200"
        rx="180"
        ry="152"
        fill="url(#vitreousGrad)"
      />

      {/* ── Optic nerve attachment (back of eye) ─────────────────── */}
      <path
        d="M 442,218 C 456,214 468,210 480,208"
        fill="none"
        stroke="var(--text-tertiary)"
        strokeWidth="5"
        strokeLinecap="round"
        strokeOpacity="0.5"
      />
      <path
        d="M 442,218 L 448,200 L 448,220 Z"
        fill="var(--text-tertiary)"
        fillOpacity="0.3"
      />

      {/* ── Retina (curved surface at back) ──────────────────────── */}
      {/* Retina inner surface arc */}
      <path
        d="M 160,80 Q 470,100 470,200 Q 470,300 160,320"
        fill="none"
        stroke="url(#retinaGrad)"
        strokeWidth="12"
        strokeLinecap="round"
        strokeOpacity="0.9"
      />
      {/* Retina outer edge — thinner darker line */}
      <path
        d="M 160,80 Q 470,100 470,200 Q 470,300 160,320"
        fill="none"
        stroke="var(--backward-orange)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeOpacity="0.35"
      />

      {/* ── Light rays entering through lens ─────────────────────── */}
      {/* Ray 1 — converges through lens toward retina (top) */}
      <path
        d="M 30,120 L 148,165 L 148,183 L 400,140"
        fill="none"
        stroke="url(#lightRayGrad)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />
      {/* Ray 2 — horizontal center ray */}
      <path
        d="M 30,198 L 148,200 L 400,200"
        fill="none"
        stroke="url(#lightRayGrad2)"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.65"
      />
      {/* Ray 3 — converges through lens toward retina (bottom) */}
      <path
        d="M 30,278 L 148,217 L 148,233 L 400,260"
        fill="none"
        stroke="url(#lightRayGrad3)"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.75"
      />

      {/* ── Cornea (front curve) ─────────────────────────────────── */}
      <path
        d="M 130,128 Q 58,170 58,200 Q 58,230 130,272"
        fill="var(--bg-card)"
        fillOpacity="0.55"
        stroke="var(--text-primary)"
        strokeWidth="1.8"
        strokeOpacity="0.4"
      />

      {/* ── Lens ─────────────────────────────────────────────────── */}
      {/* Lens body */}
      <ellipse
        cx="150"
        cy="200"
        rx="22"
        ry="40"
        fill="url(#lensGrad)"
        stroke="var(--forward-blue)"
        strokeWidth="1.2"
        strokeOpacity="0.45"
      />
      {/* Lens highlight */}
      <ellipse
        cx="144"
        cy="185"
        rx="7"
        ry="12"
        fill="white"
        fillOpacity="0.35"
        transform="rotate(-8 144 185)"
      />

      {/* ── Iris ring around lens ─────────────────────────────────── */}
      <ellipse
        cx="120"
        cy="200"
        rx="14"
        ry="48"
        fill="none"
        stroke="var(--forward-blue)"
        strokeWidth="6"
        strokeOpacity="0.22"
      />

      {/* ── Cone cell clusters on retina ─────────────────────────── */}

      {/* L-cones (long/red) — large cluster, upper-center retina */}
      {/* ~64% of cones: most abundant */}
      <g filter="url(#coneGlowXS)">
        {/* Cluster body / density blob */}
        <ellipse cx="368" cy="148" rx="28" ry="16" fill="var(--cone-red)" fillOpacity="0.18" />
        {/* Individual cone shapes (simplified trapezoids) */}
        <rect x="346" y="136" width="7" height="16" rx="2" ry="6" fill="var(--cone-red)" opacity="0.85" transform="rotate(-12 350 144)" />
        <rect x="358" y="134" width="7" height="18" rx="2" ry="6" fill="var(--cone-red)" opacity="0.90" transform="rotate(-8 362 143)" />
        <rect x="370" y="133" width="7" height="18" rx="2" ry="6" fill="var(--cone-red)" opacity="0.88" transform="rotate(-4 374 142)" />
        <rect x="382" y="134" width="7" height="17" rx="2" ry="6" fill="var(--cone-red)" opacity="0.82" transform="rotate(2 386 142)" />
        <rect x="352" y="150" width="6" height="14" rx="2" ry="5" fill="var(--cone-red)" opacity="0.65" transform="rotate(-10 355 157)" />
        <rect x="364" y="149" width="6" height="15" rx="2" ry="5" fill="var(--cone-red)" opacity="0.60" transform="rotate(-2 367 156)" />
        <rect x="376" y="150" width="6" height="14" rx="2" ry="5" fill="var(--cone-red)" opacity="0.55" transform="rotate(4 379 157)" />
      </g>

      {/* M-cones (medium/green) — medium cluster, center retina */}
      {/* ~32% of cones */}
      <g filter="url(#coneGlowXS)">
        <ellipse cx="390" cy="200" rx="22" ry="14" fill="var(--cone-green)" fillOpacity="0.16" />
        <rect x="372" y="190" width="7" height="16" rx="2" ry="6" fill="var(--cone-green)" opacity="0.88" transform="rotate(-4 376 198)" />
        <rect x="384" y="189" width="7" height="17" rx="2" ry="6" fill="var(--cone-green)" opacity="0.92" transform="rotate(0 388 197)" />
        <rect x="396" y="190" width="7" height="16" rx="2" ry="6" fill="var(--cone-green)" opacity="0.85" transform="rotate(4 400 198)" />
        <rect x="378" y="204" width="6" height="13" rx="2" ry="5" fill="var(--cone-green)" opacity="0.58" transform="rotate(-2 381 210)" />
        <rect x="390" y="205" width="6" height="12" rx="2" ry="5" fill="var(--cone-green)" opacity="0.52" transform="rotate(2 393 211)" />
      </g>

      {/* S-cones (short/blue) — small cluster, lower-center retina */}
      {/* ~2% of cones: least abundant */}
      <g filter="url(#coneGlowXS)">
        <ellipse cx="368" cy="252" rx="16" ry="12" fill="var(--cone-blue)" fillOpacity="0.18" />
        <rect x="356" y="244" width="7" height="15" rx="2" ry="6" fill="var(--cone-blue)" opacity="0.86" transform="rotate(4 360 251)" />
        <rect x="368" y="243" width="7" height="16" rx="2" ry="6" fill="var(--cone-blue)" opacity="0.90" transform="rotate(8 372 251)" />
        <rect x="362" y="257" width="6" height="12" rx="2" ry="5" fill="var(--cone-blue)" opacity="0.55" transform="rotate(6 365 263)" />
      </g>

      {/* ── Cone labels with leader lines ────────────────────────── */}

      {/* L-cone label */}
      <line x1="368" y1="130" x2="368" y2="110" stroke="var(--cone-red)" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="3,2" />
      <text
        x="368"
        y="105"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        fill="var(--cone-red)"
        fontWeight="600"
      >
        L-cone
      </text>
      <text
        x="368"
        y="94"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9"
        fill="var(--text-tertiary)"
      >
        580 nm
      </text>

      {/* M-cone label */}
      <line x1="408" y1="196" x2="436" y2="180" stroke="var(--cone-green)" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="3,2" />
      <text
        x="436"
        y="175"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        fill="var(--cone-green)"
        fontWeight="600"
      >
        M-cone
      </text>
      <text
        x="436"
        y="164"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9"
        fill="var(--text-tertiary)"
      >
        530 nm
      </text>

      {/* S-cone label */}
      <line x1="368" y1="262" x2="368" y2="282" stroke="var(--cone-blue)" strokeWidth="1" strokeOpacity="0.7" strokeDasharray="3,2" />
      <text
        x="368"
        y="294"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="11"
        fill="var(--cone-blue)"
        fontWeight="600"
      >
        S-cone
      </text>
      <text
        x="368"
        y="305"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9"
        fill="var(--text-tertiary)"
      >
        440 nm
      </text>

      {/* ── Lens label ───────────────────────────────────────────── */}
      <line x1="150" y1="160" x2="150" y2="130" stroke="var(--text-tertiary)" strokeWidth="1" strokeOpacity="0.5" strokeDasharray="3,2" />
      <text
        x="150"
        y="124"
        textAnchor="middle"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        fill="var(--text-tertiary)"
      >
        lens
      </text>

      {/* ── Retina label ─────────────────────────────────────────── */}
      <text
        x="468"
        y="340"
        textAnchor="end"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="10"
        fill="var(--backward-orange)"
        opacity="0.75"
      >
        retina
      </text>

      {/* ── Light entry annotation ───────────────────────────────── */}
      <text
        x="30"
        y="80"
        textAnchor="start"
        fontFamily="var(--font-jetbrains), monospace"
        fontSize="9.5"
        fill="var(--text-tertiary)"
        opacity="0.7"
      >
        light in
      </text>
      <path
        d="M 46,84 L 60,108"
        fill="none"
        stroke="var(--text-tertiary)"
        strokeWidth="1"
        strokeOpacity="0.45"
        markerEnd="none"
      />
    </svg>
  );
}

// ─── Cone Info Card ───────────────────────────────────────────────────────────

interface ConeCardProps {
  id: string;
  name: string;
  fullName: string;
  peakWavelength: number;
  color: string;
  description: string;
  index: number;
  isVisible: boolean;
}

function ConeCard({ name, fullName, peakWavelength, color, description, index, isVisible }: ConeCardProps) {
  return (
    <div
      className="stagger-item rounded-2xl border border-border bg-bg-card px-5 py-4 flex items-start gap-4 transition-all duration-200 cursor-default hover:ring-2 hover:shadow-lg"
      style={{
        transitionDelay: `${index * 100}ms`,
        ...(isVisible ? { opacity: 1, transform: "translateY(0)" } : {}),
        // Dynamic glow color on hover via CSS variable trick
        "--glow-color": color,
      } as React.CSSProperties}
      // Inline hover ring color tied to cone color
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 0 0 2px ${color}33, 0 4px 20px ${color}22`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "";
      }}
    >
      {/* Color dot indicator */}
      <div className="flex-shrink-0 mt-1">
        <span
          className="block w-3 h-3 rounded-full"
          style={{ backgroundColor: color, boxShadow: `0 0 6px ${color}88` }}
          aria-hidden="true"
        />
      </div>

      <div className="min-w-0">
        {/* Name + wavelength row */}
        <div className="flex items-baseline gap-2 flex-wrap">
          <span
            className="font-mono text-sm font-semibold"
            style={{ color }}
          >
            {name}
          </span>
          <span className="font-mono text-xs text-text-tertiary">
            {fullName}
          </span>
          <span
            className="ml-auto font-mono text-xs font-medium"
            style={{ color }}
          >
            peak {peakWavelength} nm
          </span>
        </div>

        {/* Description */}
        <p className="mt-1 font-sans text-sm text-text-secondary leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function DetectorsSection() {
  const cardsRef = useRef<HTMLDivElement>(null);
  const [cardsVisible, setCardsVisible] = useState(false);

  useEffect(() => {
    const el = cardsRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="detectors" layout="split-left">
      {/* ── Left: Text content ─────────────────────────────────── */}
      <div className="lg:col-span-2">
        {/* Overline */}
        <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-4">
          SECTION 02
        </p>

        {/* Headline */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary leading-tight mb-6">
          Your Eye Has 3 Detectors
        </h2>

        {/* Analogy */}
        <p className="font-serif text-lg sm:text-xl text-text-secondary leading-relaxed mb-5">
          Think of your eye like a camera with only three color filters&nbsp;&mdash;
          red, green, and blue. Every color you&rsquo;ve ever seen is just those
          three filters reporting different signal strengths.
        </p>

        {/* Technical explanation with JargonTerms */}
        <p className="font-sans text-sm text-text-tertiary leading-relaxed">
          Your{" "}
          <JargonTerm
            term="retina"
            definition="The light-sensitive layer at the back of your eye that converts light into nerve signals."
          >
            retina
          </JargonTerm>{" "}
          contains ~6 million{" "}
          <JargonTerm
            term="cone cells"
            definition="Light-sensitive cells in the retina that detect color. Named for their cone shape."
          >
            cone cells
          </JargonTerm>
          , each tuned to a different wavelength range. They&rsquo;re called
          S-cones&nbsp;(short/blue), M-cones&nbsp;(medium/green), and
          L-cones&nbsp;(long/red).
        </p>
      </div>

      {/* ── Right: Visual content ──────────────────────────────── */}
      <div className="lg:col-span-3 mt-8 lg:mt-0">
        {/* Eye cross-section SVG */}
        <div className="rounded-2xl border border-border bg-bg-card p-4 sm:p-6 shadow-sm">
          <EyeCrossSectionSVG />
        </div>

        {/* Cone info cards */}
        <div
          ref={cardsRef}
          className="mt-5 flex flex-col gap-3"
          aria-label="Cone cell types"
        >
          {coneTypes.map((cone, i) => (
            <ConeCard
              key={cone.id}
              {...cone}
              index={i}
              isVisible={cardsVisible}
            />
          ))}
        </div>

        {/* "Whoa" fact aside */}
        <aside
          className="mt-5 rounded-xl border border-border bg-bg-secondary/60 px-5 py-4 flex gap-3 items-start"
          aria-label="Fascinating fact about cone cells"
        >
          {/* Organic icon — stylized cone cell shape */}
          <div className="flex-shrink-0 mt-0.5" aria-hidden="true">
            <ConeCellIcon />
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary mb-1">
              Whoa fact
            </p>
            <p className="font-sans text-sm text-text-secondary leading-relaxed">
              Your cone cells burn out and are replaced every ~10 days. You&rsquo;re
              literally seeing with different cells than you were two weeks ago.
            </p>
          </div>
        </aside>
      </div>
    </SectionWrapper>
  );
}

// ─── Decorative cone cell icon ────────────────────────────────────────────────

function ConeCellIcon() {
  return (
    <svg
      viewBox="0 0 36 36"
      width="32"
      height="32"
      role="img"
      aria-label="Cone cell icon"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* S-cone (blue) */}
      <path
        d="M 9,8 L 6,28 L 12,28 Z"
        fill="var(--cone-blue)"
        opacity="0.7"
      />
      {/* M-cone (green) */}
      <path
        d="M 18,6 L 14,28 L 22,28 Z"
        fill="var(--cone-green)"
        opacity="0.75"
      />
      {/* L-cone (red) */}
      <path
        d="M 27,8 L 24,28 L 30,28 Z"
        fill="var(--cone-red)"
        opacity="0.7"
      />
      {/* Base line (retinal surface) */}
      <line
        x1="4"
        y1="28"
        x2="32"
        y2="28"
        stroke="var(--backward-orange)"
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.55"
      />
    </svg>
  );
}
