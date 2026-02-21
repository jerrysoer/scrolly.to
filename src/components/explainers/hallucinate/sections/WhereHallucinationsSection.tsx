"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { failureModes } from "@/lib/explainers/hallucinate";
import { Shuffle, TrendingUp, ThumbsUp, ChevronDown } from "lucide-react";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const iconMap: Record<string, React.ReactNode> = {
  GitMerge: <Shuffle size={22} aria-hidden="true" />,
  TrendingUp: <TrendingUp size={22} aria-hidden="true" />,
  ThumbsUp: <ThumbsUp size={22} aria-hidden="true" />,
};

// ─── Danger level badge colors ────────────────────────────────────────────────

const dangerColors: Record<string, { bg: string; text: string; label: string }> = {
  high: {
    bg: "rgba(239,68,68,0.12)",
    text: "var(--hallucination-red)",
    label: "HIGH",
  },
  critical: {
    bg: "rgba(239,68,68,0.18)",
    text: "var(--hallucination-red)",
    label: "CRITICAL",
  },
  medium: {
    bg: "rgba(245,158,11,0.12)",
    text: "var(--accent-amber)",
    label: "MEDIUM",
  },
};

// ─── Step type color for category badge ──────────────────────────────────────

const categoryColors: Record<string, string> = {
  citation: "var(--forward-blue)",
  temporal: "var(--accent-purple)",
  factual: "var(--accent-amber)",
};

// ─── Custom SVG illustrations ─────────────────────────────────────────────────

function InterpolationSVG() {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[120px]"
    >
      {/* Left circle — blue */}
      <circle
        cx="42"
        cy="40"
        r="28"
        fill="var(--forward-blue)"
        fillOpacity="0.12"
        stroke="var(--forward-blue)"
        strokeWidth="1.5"
      />
      {/* Right circle — purple */}
      <circle
        cx="78"
        cy="40"
        r="28"
        fill="var(--accent-purple)"
        fillOpacity="0.12"
        stroke="var(--accent-purple)"
        strokeWidth="1.5"
      />
      {/* Overlap — red (fake hybrid) */}
      <path
        d="M60,14 A28,28 0 0,1 60,66 A28,28 0 0,1 60,14 Z"
        fill="var(--hallucination-red)"
        fillOpacity="0.25"
        stroke="var(--hallucination-red)"
        strokeWidth="1.5"
      />
      {/* Labels */}
      <text
        x="31"
        y="43"
        textAnchor="middle"
        fill="var(--forward-blue)"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        Real A
      </text>
      <text
        x="90"
        y="43"
        textAnchor="middle"
        fill="var(--accent-purple)"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        Real B
      </text>
      <text
        x="60"
        y="38"
        textAnchor="middle"
        fill="var(--hallucination-red)"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="700"
      >
        FAKE
      </text>
      <text
        x="60"
        y="48"
        textAnchor="middle"
        fill="var(--hallucination-red)"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="700"
      >
        HYBRID
      </text>
    </svg>
  );
}

function ExtrapolationSVG() {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[120px]"
    >
      {/* Axis */}
      <line
        x1="10"
        y1="70"
        x2="110"
        y2="70"
        stroke="var(--border)"
        strokeWidth="1"
      />
      <line
        x1="10"
        y1="10"
        x2="10"
        y2="70"
        stroke="var(--border)"
        strokeWidth="1"
      />

      {/* Solid known-data line */}
      <polyline
        points="15,62 30,50 45,40 60,32"
        fill="none"
        stroke="var(--forward-blue)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Cutoff vertical dashed line */}
      <line
        x1="60"
        y1="10"
        x2="60"
        y2="70"
        stroke="var(--text-tertiary)"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <text
        x="62"
        y="18"
        fill="var(--text-tertiary)"
        fontSize="7"
        fontFamily="monospace"
      >
        cutoff
      </text>

      {/* Dotted extrapolated line — extends into unknown territory */}
      <polyline
        points="60,32 75,22 90,15 105,10"
        fill="none"
        stroke="var(--hallucination-red)"
        strokeWidth="2"
        strokeDasharray="4 3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Question mark at the end */}
      <text
        x="101"
        y="14"
        fill="var(--hallucination-red)"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="700"
      >
        ?
      </text>

      {/* Known label */}
      <text
        x="22"
        y="68"
        fill="var(--forward-blue)"
        fontSize="7"
        fontFamily="monospace"
      >
        known
      </text>
      {/* Invented label */}
      <text
        x="65"
        y="68"
        fill="var(--hallucination-red)"
        fontSize="7"
        fontFamily="monospace"
      >
        invented
      </text>
    </svg>
  );
}

function SycophancySVG() {
  return (
    <svg
      viewBox="0 0 120 80"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      className="w-full max-w-[120px]"
    >
      {/* User bubble — blue, left */}
      <rect
        x="6"
        y="10"
        width="48"
        height="28"
        rx="8"
        fill="var(--forward-blue)"
        fillOpacity="0.15"
        stroke="var(--forward-blue)"
        strokeWidth="1.5"
      />
      {/* Tail for left bubble */}
      <polygon
        points="10,38 20,38 14,46"
        fill="var(--forward-blue)"
        fillOpacity="0.15"
        stroke="var(--forward-blue)"
        strokeWidth="1.5"
      />
      <text
        x="30"
        y="27"
        textAnchor="middle"
        fill="var(--forward-blue)"
        fontSize="9"
        fontFamily="monospace"
        fontWeight="600"
      >
        &ldquo;Right?&rdquo;
      </text>

      {/* AI bubble — right, red (hallucinated agreement) */}
      <rect
        x="66"
        y="10"
        width="48"
        height="28"
        rx="8"
        fill="var(--hallucination-red)"
        fillOpacity="0.15"
        stroke="var(--hallucination-red)"
        strokeWidth="1.5"
      />
      {/* Tail for right bubble */}
      <polygon
        points="100,38 110,38 106,46"
        fill="var(--hallucination-red)"
        fillOpacity="0.15"
        stroke="var(--hallucination-red)"
        strokeWidth="1.5"
      />
      <text
        x="90"
        y="22"
        textAnchor="middle"
        fill="var(--hallucination-red)"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        {"\"Absolutely"}
      </text>
      <text
        x="90"
        y="32"
        textAnchor="middle"
        fill="var(--hallucination-red)"
        fontSize="8"
        fontFamily="monospace"
        fontWeight="600"
      >
        {"right!\""}
      </text>

      {/* Warning label */}
      <text
        x="60"
        y="68"
        textAnchor="middle"
        fill="var(--hallucination-red)"
        fontSize="7"
        fontFamily="monospace"
        fontWeight="700"
      >
        FALSE CONFIRMATION
      </text>
    </svg>
  );
}

const svgMap: Record<string, React.ReactNode> = {
  interpolation: <InterpolationSVG />,
  extrapolation: <ExtrapolationSVG />,
  sycophancy: <SycophancySVG />,
};

// ─── Chat dialogue component ──────────────────────────────────────────────────

function ChatDialogue({
  prompt,
  response,
  reality,
}: {
  prompt: string;
  response: string;
  reality: string;
}) {
  return (
    <div className="flex flex-col gap-3 mt-4">
      {/* User prompt — left aligned, blue */}
      <div className="flex items-start gap-2">
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold"
          style={{
            backgroundColor: "rgba(74,144,217,0.15)",
            color: "var(--forward-blue)",
          }}
          aria-label="User"
        >
          U
        </span>
        <div
          className="rounded-2xl rounded-tl-sm px-3 py-2 text-xs font-sans leading-relaxed max-w-[85%]"
          style={{
            backgroundColor: "rgba(74,144,217,0.12)",
            border: "1px solid rgba(74,144,217,0.3)",
            color: "var(--text-primary)",
          }}
        >
          {prompt}
        </div>
      </div>

      {/* AI response — right aligned, red (hallucinated) */}
      <div className="flex items-start gap-2 flex-row-reverse">
        <span
          className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center font-mono text-xs font-bold"
          style={{
            backgroundColor: "rgba(239,68,68,0.15)",
            color: "var(--hallucination-red)",
          }}
          aria-label="AI (hallucinated response)"
        >
          AI
        </span>
        <div
          className="rounded-2xl rounded-tr-sm px-3 py-2 text-xs font-sans leading-relaxed max-w-[85%] relative"
          style={{
            backgroundColor: "rgba(239,68,68,0.10)",
            border: "1px solid rgba(239,68,68,0.35)",
            color: "var(--text-primary)",
          }}
        >
          <span
            className="block font-mono text-[10px] font-bold mb-1 uppercase tracking-wider"
            style={{ color: "var(--hallucination-red)" }}
          >
            Hallucinated
          </span>
          {response}
        </div>
      </div>

      {/* Reality check — green */}
      <div
        className="flex items-start gap-2 rounded-xl px-3 py-2 mt-1"
        style={{
          backgroundColor: "rgba(34,197,94,0.08)",
          border: "1px solid rgba(34,197,94,0.25)",
        }}
      >
        <span
          className="shrink-0 font-bold text-sm"
          style={{ color: "var(--verified-green)" }}
          aria-hidden="true"
        >
          ✓
        </span>
        <div>
          <span
            className="block font-mono text-[10px] font-bold mb-1 uppercase tracking-wider"
            style={{ color: "var(--verified-green)" }}
          >
            Reality
          </span>
          <p className="text-xs font-sans leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {reality}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Failure Mode Card (accordion item) ───────────────────────────────────────

function FailureModeCard({
  mode,
  isExpanded,
  onToggle,
  delayMs,
}: {
  mode: (typeof failureModes)[0];
  isExpanded: boolean;
  onToggle: () => void;
  delayMs: number;
}) {
  const danger = dangerColors[mode.dangerLevel] ?? dangerColors.medium;
  const catColor = categoryColors[mode.category] ?? "var(--forward-blue)";

  return (
    <div
      className="stagger-item rounded-2xl border cursor-pointer outline-none"
      tabIndex={0}
      role="button"
      aria-expanded={isExpanded}
      aria-controls={`failure-detail-${mode.id}`}
      onClick={onToggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onToggle();
        }
      }}
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: isExpanded ? "var(--forward-blue)" : "var(--border)",
        transition: "all 0.2s ease",
        boxShadow: isExpanded
          ? "0 0 0 2px var(--forward-blue)"
          : "none",
        transitionDelay: `${delayMs}ms`,
      }}
      onMouseEnter={(e) => {
        if (!isExpanded) {
          (e.currentTarget as HTMLDivElement).style.boxShadow =
            "0 0 0 2px var(--forward-blue)";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--forward-blue)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isExpanded) {
          (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
          (e.currentTarget as HTMLDivElement).style.borderColor =
            "var(--border)";
        }
      }}
    >
      {/* Card Header — always visible */}
      <div className="flex items-start gap-3 p-4">
        {/* Icon */}
        <div
          className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center"
          style={{
            backgroundColor: "rgba(74,144,217,0.12)",
            color: "var(--forward-blue)",
          }}
        >
          {iconMap[mode.icon] ?? <Shuffle size={22} aria-hidden="true" />}
        </div>

        {/* Title + badges */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center flex-wrap gap-2 mb-1">
            <span
              className="font-serif text-base font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {mode.title}
            </span>
            {/* Danger badge */}
            <span
              className="font-mono text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: danger.bg,
                color: danger.text,
              }}
            >
              {danger.label}
            </span>
            {/* Category badge */}
            <span
              className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full"
              style={{
                backgroundColor: `${catColor}18`,
                color: catColor,
              }}
            >
              {mode.category}
            </span>
          </div>
          <p
            className="font-sans text-xs leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {mode.shortName}
          </p>
        </div>

        {/* Expand chevron */}
        <ChevronDown
          size={18}
          aria-hidden="true"
          style={{
            color: "var(--text-tertiary)",
            flexShrink: 0,
            transition: "transform 0.25s ease",
            transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            marginTop: 2,
          }}
        />
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div
          id={`failure-detail-${mode.id}`}
          className="px-4 pb-4 border-t"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Custom SVG illustration */}
          <div className="flex justify-center py-4">
            {svgMap[mode.id]}
          </div>

          {/* Description */}
          <p
            className="font-sans text-sm leading-relaxed mb-4"
            style={{ color: "var(--text-secondary)" }}
          >
            {mode.description}
          </p>

          {/* Chat dialogue */}
          <ChatDialogue
            prompt={mode.example.prompt}
            response={mode.example.response}
            reality={mode.example.reality}
          />

          {/* Analogy */}
          <p
            className="mt-4 font-serif text-sm italic leading-relaxed"
            style={{ color: "var(--text-tertiary)" }}
          >
            {mode.analogy}
          </p>
        </div>
      )}
    </div>
  );
}

// ─── WhereHallucinationsSection ───────────────────────────────────────────────

export default function WhereHallucinationsSection() {
  const [expandedId, setExpandedId] = useState<string | null>("interpolation");

  function handleToggle(id: string) {
    setExpandedId((prev) => (prev === id ? null : id));
  }

  return (
    <SectionWrapper id="where-hallucinations" layout="split-right" stagger tinted>
      {/* Left: three-panel failure mode explorer */}
      <div className="flex flex-col gap-4">
        {failureModes.map((mode, i) => (
          <FailureModeCard
            key={mode.id}
            mode={mode}
            isExpanded={expandedId === mode.id}
            onToggle={() => handleToggle(mode.id)}
            delayMs={i * 100}
          />
        ))}
      </div>

      {/* Right: introductory text (split-right layout places this on the right on lg) */}
      <div>
        {/* Section header */}
        <div className="mb-8">
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--forward-blue)" }}
          >
            Section 05
          </p>
          <h2
            className="font-serif text-3xl font-bold sm:text-4xl mb-4"
            style={{ color: "var(--text-primary)" }}
          >
            Where Hallucinations Come From
          </h2>
          <p
            className="font-sans text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-secondary)" }}
          >
            Not all AI errors are the same. There are three distinct failure
            modes, each with a different root cause — and each requiring a
            different response from the people who use these systems.
          </p>
        </div>

        {/* Three categories summary */}
        <div className="flex flex-col gap-4">
          {[
            {
              color: "var(--forward-blue)",
              bg: "rgba(74,144,217,0.10)",
              label: "Interpolation",
              desc:
                "Blending real things — institutions, names, facts — into a convincing hybrid that never existed.",
            },
            {
              color: "var(--hallucination-red)",
              bg: "rgba(239,68,68,0.10)",
              label: "Extrapolation",
              desc:
                "Confidently extending beyond the training data cutoff, inventing future events, quotes, and figures.",
            },
            {
              color: "var(--accent-amber)",
              bg: "rgba(245,158,11,0.10)",
              label: "Sycophancy",
              desc:
                "Validating false premises because RLHF training rewarded agreement over accuracy.",
            },
          ].map(({ color, bg, label, desc }) => (
            <div
              key={label}
              className="flex items-start gap-3 rounded-xl p-4"
              style={{
                backgroundColor: bg,
                border: `1px solid ${color}30`,
              }}
            >
              <span
                className="shrink-0 w-2 h-2 rounded-full mt-2"
                style={{ backgroundColor: color }}
                aria-hidden="true"
              />
              <div>
                <span
                  className="block font-mono text-xs font-bold uppercase tracking-wider mb-1"
                  style={{ color }}
                >
                  {label}
                </span>
                <p
                  className="font-sans text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Call to action / hint */}
        <p
          className="mt-6 font-mono text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          Tap each card to see a real example and the reality check.
        </p>
      </div>
    </SectionWrapper>
  );
}
