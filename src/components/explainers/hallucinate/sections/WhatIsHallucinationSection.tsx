"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

// ─── Accessibility ─────────────────────────────────────────────────────────

const SVG_TITLE_ID = "hallucination-comparison-title";
const SVG_DESC_ID = "hallucination-comparison-desc";

// ─── Gap-fill comparison SVG ──────────────────────────────────────────────────

function HallucinationComparisonSVG({ visible }: { visible: boolean }) {
  return (
    <svg
      viewBox="0 0 400 300"
      role="img"
      aria-labelledby={`${SVG_TITLE_ID} ${SVG_DESC_ID}`}
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[400px] mx-auto"
    >
      <title id={SVG_TITLE_ID}>
        Human vs AI Hallucination: Same gap-filling mechanism, different substrate
      </title>
      <desc id={SVG_DESC_ID}>
        Left: a human brain perceives an incomplete image and fills in the missing piece.
        Right: an AI neural network receives a prompt with a missing answer and generates
        a plausible but potentially wrong completion.
      </desc>

      {/* ── Shared defs ── */}
      <defs>
        <filter id="soft-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <clipPath id="brain-clip">
          <rect x="20" y="40" width="140" height="200" />
        </clipPath>
        <clipPath id="circuit-clip">
          <rect x="235" y="40" width="140" height="200" />
        </clipPath>

        {/* Animated gradient for the filled gap */}
        <linearGradient id="fill-grad-brain" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--accent-purple)" stopOpacity="0.5" />
        </linearGradient>
        <linearGradient id="fill-grad-ai" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--hallucination-red)" stopOpacity="0" />
          <stop offset="100%" stopColor="var(--hallucination-red)" stopOpacity="0.5" />
        </linearGradient>
      </defs>

      {/* ── Divider line ── */}
      <line x1="200" y1="20" x2="200" y2="280"
        stroke="var(--border)" strokeWidth="1" strokeDasharray="5 4" opacity="0.5" />

      {/* ════════════════════════════════
          LEFT SIDE — Human Hallucination
          ════════════════════════════════ */}

      {/* Panel label */}
      <text x="90" y="32" textAnchor="middle" fontSize="11"
        fontFamily="monospace" fill="var(--text-tertiary)" letterSpacing="1">
        HUMAN
      </text>

      {/* Brain outline */}
      <g clipPath="url(#brain-clip)" opacity="0.9">
        {/* Left lobe */}
        <path
          d="M55,180 C42,155 44,128 58,116 C68,107 80,110 87,120
             C91,107 102,99 116,102 C130,105 136,118 133,132
             C143,126 154,130 157,142 C160,155 151,167 140,170
             C145,182 138,196 126,199 C113,202 102,194 97,184
             C90,195 75,200 63,194 C52,188 44,183 55,180 Z"
          fill="none"
          stroke="var(--accent-purple)"
          strokeWidth="2"
          opacity="0.8"
        />
        {/* Brain stem */}
        <path d="M95,199 C95,210 98,218 100,222" stroke="var(--accent-purple)" strokeWidth="2" fill="none" opacity="0.6" />

        {/* Brain wrinkles / gyri */}
        <path d="M70,145 C80,138 90,142 95,150" stroke="var(--accent-purple)" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M100,130 C110,122 120,128 118,138" stroke="var(--accent-purple)" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M80,165 C88,158 98,162 100,172" stroke="var(--accent-purple)" strokeWidth="1.2" fill="none" opacity="0.4" />
        <path d="M115,155 C124,148 132,154 130,163" stroke="var(--accent-purple)" strokeWidth="1.2" fill="none" opacity="0.4" />
      </g>

      {/* Incomplete image below brain: partial circle with a missing segment */}
      <g transform="translate(90, 230)">
        {/* Background container */}
        <rect x="-38" y="-22" width="76" height="44" rx="4"
          fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1" opacity="0.6" />

        {/* Partial circle — 270 degrees visible (top-left 90° missing) */}
        <path
          d="M0,-15 A15,15 0 1,1 -15,0"
          fill="none"
          stroke="var(--text-tertiary)"
          strokeWidth="2.5"
          strokeLinecap="round"
          opacity="0.6"
        />

        {/* The "gap" — filled in by brain */}
        <path
          d="M-15,0 A15,15 0 0,1 0,-15"
          fill="none"
          stroke="var(--accent-purple)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeDasharray={visible ? "24 0" : "0 24"}
          style={{
            transition: "stroke-dasharray 0.9s ease 0.3s",
          }}
          opacity="0.9"
          filter="url(#soft-glow)"
        />

        {/* Gap label */}
        <text x="0" y="30" textAnchor="middle" fontSize="9"
          fontFamily="monospace" fill="var(--text-tertiary)" opacity="0.7">
          brain fills the gap
        </text>
      </g>

      {/* Arrow: brain → fills gap */}
      <path
        d="M90,195 L90,210"
        stroke="var(--accent-purple)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.5"
        markerEnd="url(#arrow-purple)"
      />
      <defs>
        <marker id="arrow-purple" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--accent-purple)" opacity="0.6" />
        </marker>
        <marker id="arrow-red" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--hallucination-red)" opacity="0.6" />
        </marker>
      </defs>

      {/* ═════════════════════════════
          RIGHT SIDE — AI Hallucination
          ═════════════════════════════ */}

      {/* Panel label */}
      <text x="305" y="32" textAnchor="middle" fontSize="11"
        fontFamily="monospace" fill="var(--text-tertiary)" letterSpacing="1">
        AI MODEL
      </text>

      {/* Neural network / circuit nodes */}
      <g clipPath="url(#circuit-clip)">
        {/* Input layer */}
        {[100, 135, 170].map((y, i) => (
          <g key={`in-${i}`}>
            <circle cx="248" cy={y} r="7"
              fill="var(--forward-blue)" fillOpacity="0.2"
              stroke="var(--forward-blue)" strokeWidth="1.5" opacity="0.7" />
          </g>
        ))}

        {/* Hidden layer */}
        {[115, 142, 168, 195].map((y, i) => (
          <circle key={`h-${i}`} cx="283" cy={y} r="6"
            fill="var(--accent-purple)" fillOpacity="0.2"
            stroke="var(--accent-purple)" strokeWidth="1.5" opacity="0.6" />
        ))}

        {/* Output layer */}
        {[128, 155, 182].map((y, i) => (
          <circle key={`out-${i}`} cx="318" cy={y} r="7"
            fill="var(--forward-blue)" fillOpacity="0.2"
            stroke="var(--forward-blue)" strokeWidth="1.5" opacity="0.7" />
        ))}

        {/* Connections: input → hidden */}
        {[100, 135, 170].flatMap((iy, ii) =>
          [115, 142, 168, 195].map((hy, hi) => (
            <line key={`ih-${ii}-${hi}`}
              x1="255" y1={iy} x2="277" y2={hy}
              stroke="var(--border)" strokeWidth="0.8" opacity="0.35" />
          ))
        )}

        {/* Connections: hidden → output */}
        {[115, 142, 168, 195].flatMap((hy, hi) =>
          [128, 155, 182].map((oy, oi) => (
            <line key={`ho-${hi}-${oi}`}
              x1="289" y1={hy} x2="311" y2={oy}
              stroke="var(--border)" strokeWidth="0.8" opacity="0.35" />
          ))
        )}
      </g>

      {/* Prompt input below circuit */}
      <g transform="translate(305, 230)">
        <rect x="-54" y="-22" width="108" height="44" rx="4"
          fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1" opacity="0.6" />

        {/* Prompt text (partial) */}
        <text x="-42" y="-5" fontSize="9" fontFamily="monospace" fill="var(--text-secondary)" opacity="0.7">
          &quot;The case is&quot;
        </text>

        {/* Hallucinated fill token */}
        <text
          x="-42"
          y="10"
          fontSize="9"
          fontFamily="monospace"
          fill="var(--hallucination-red)"
          opacity={visible ? 1 : 0}
          style={{ transition: "opacity 0.8s ease 0.5s" }}
        >
          &quot;Varghese v. ...&quot;
        </text>

        {/* Gap fill label */}
        <text x="0" y="30" textAnchor="middle" fontSize="9"
          fontFamily="monospace" fill="var(--text-tertiary)" opacity="0.7">
          model fills the gap
        </text>
      </g>

      {/* Arrow: circuit → fills gap */}
      <path
        d="M305,200 L305,210"
        stroke="var(--hallucination-red)"
        strokeWidth="1.5"
        strokeDasharray="3 3"
        opacity="0.5"
        markerEnd="url(#arrow-red)"
      />

      {/* ── Bottom caption ── */}
      <text x="200" y="292" textAnchor="middle" fontSize="10"
        fontFamily="monospace" fill="var(--text-tertiary)" opacity="0.65" letterSpacing="0.5">
        Same mechanism, different substrate
      </text>
    </svg>
  );
}

// ─── WhatIsHallucinationSection ───────────────────────────────────────────────

export default function WhatIsHallucinationSection() {
  const [svgVisible, setSvgVisible] = useState(false);
  const svgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSvgVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="what-is-hallucination" layout="split-left" tinted stagger>
      {/* ── Left: Text ── */}
      <div className="flex flex-col gap-6">
        {/* Section header */}
        <div className="stagger-item">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--forward-blue)" }}
          >
            Section 01
          </p>
          <h2
            className="font-serif text-3xl font-bold sm:text-4xl"
            style={{ color: "var(--text-primary)" }}
          >
            What Hallucination Actually Means
          </h2>
        </div>

        {/* Body copy */}
        <p
          className="font-sans text-base leading-relaxed sm:text-lg stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          In AI, a{" "}
          <JargonTerm
            term="Hallucination"
            definition="When an AI generates information that sounds plausible but is factually incorrect or fabricated"
          >
            hallucination
          </JargonTerm>{" "}
          means confidently stating something false. Not a glitch. Not a bug. A
          structural feature of how language models work.
        </p>

        <p
          className="font-sans text-base leading-relaxed sm:text-lg stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          The term comes from psychology: perceiving something that isn&rsquo;t there.
          A patient sees a face on a blank wall; an AI generates a court case that
          never existed. The mechanism is remarkably similar: a pattern-completing
          system that has no way to flag when the pattern it&rsquo;s completing is
          ungrounded in reality.
        </p>

        {/* Whoa fact */}
        <div
          className="rounded-lg border p-4 stagger-item hover:ring-2 transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.setProperty("--tw-ring-color", "var(--forward-blue)");
            (e.currentTarget as HTMLDivElement).style.boxShadow = "0 0 0 2px var(--forward-blue), 0 4px 20px rgba(74,144,217,0.15)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-amber)" }}
          >
            Whoa fact
          </p>
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            The term &ldquo;hallucination&rdquo; in AI was first used academically around
            2018 &mdash; it&rsquo;s newer than most people think. Before that, researchers
            just called these outputs &ldquo;errors.&rdquo;
          </p>
        </div>

        {/* Key distinction */}
        <p
          className="font-sans text-base leading-relaxed stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          The critical distinction: a human who makes something up usually{" "}
          <em>knows</em> they&rsquo;re doing it. An AI has no such awareness. It
          generates the most statistically plausible continuation of your prompt —
          whether or not that continuation is true.
        </p>
      </div>

      {/* ── Right: SVG comparison ── */}
      <div ref={svgRef} className="flex items-center justify-center stagger-item">
        <div
          className="rounded-xl border p-6 w-full transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 0 2px var(--accent-purple), 0 8px 32px rgba(124,92,191,0.12)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          }}
        >
          <HallucinationComparisonSVG visible={svgVisible} />
        </div>
      </div>
    </SectionWrapper>
  );
}
