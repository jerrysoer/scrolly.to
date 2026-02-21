"use client";

import { useEffect, useRef, useState } from "react";
import { Database, HelpCircle, CheckSquare, Anchor, ChevronDown, Check, X } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { fixApproaches, type RichFixApproach } from "@/lib/explainers/hallucinate";

// ─── Icon lookup ───────────────────────────────────────────────────────────────

function ApproachIcon({ name, size = 20 }: { name: string; size?: number }) {
  const props = { size, "aria-hidden": true as const };
  switch (name) {
    case "Database":
      return <Database {...props} />;
    case "HelpCircle":
      return <HelpCircle {...props} />;
    case "CheckSquare":
      return <CheckSquare {...props} />;
    case "Anchor":
      return <Anchor {...props} />;
    default:
      return <Database {...props} />;
  }
}

// ─── Maturity config ──────────────────────────────────────────────────────────

const maturityConfig: Record<
  RichFixApproach["maturity"],
  { label: string; color: string; barColor: string; bgColor: string }
> = {
  production: {
    label: "Production",
    color: "var(--verified-green)",
    barColor: "var(--verified-green)",
    bgColor: "rgba(34, 197, 94, 0.12)",
  },
  growing: {
    label: "Growing",
    color: "var(--forward-blue)",
    barColor: "var(--forward-blue)",
    bgColor: "rgba(74, 144, 217, 0.12)",
  },
  early: {
    label: "Early",
    color: "var(--accent-amber)",
    barColor: "var(--accent-amber)",
    bgColor: "rgba(245, 158, 11, 0.12)",
  },
  research: {
    label: "Research",
    color: "var(--accent-purple)",
    barColor: "var(--accent-purple)",
    bgColor: "rgba(124, 92, 191, 0.12)",
  },
};

// ─── Animated progress bar ────────────────────────────────────────────────────

function ProgressBar({
  target,
  color,
}: {
  target: number;
  color: string;
}) {
  const [width, setWidth] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !started.current) {
          started.current = true;
          observer.disconnect();
          // Small delay so the card fade-in starts first
          const timer = setTimeout(() => {
            setWidth(target);
          }, 200);
          return () => clearTimeout(timer);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div
      ref={barRef}
      className="h-2 w-full rounded-full overflow-hidden"
      style={{ backgroundColor: "var(--bg-secondary)" }}
      role="meter"
      aria-valuenow={target}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={`Maturity: ${target}%`}
    >
      <div
        className="h-full rounded-full"
        style={{
          width: `${width}%`,
          backgroundColor: color,
          transition: "width 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  );
}

// ─── Approach card ────────────────────────────────────────────────────────────

function ApproachCard({ approach }: { approach: RichFixApproach }) {
  const [expanded, setExpanded] = useState(false);
  const config = maturityConfig[approach.maturity];

  return (
    <div
      className="stagger-item rounded-2xl border p-5 flex flex-col gap-4 cursor-pointer transition-shadow"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        outline: "2px solid transparent",
        outlineOffset: "2px",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.outline = `2px solid var(--forward-blue)`;
        (e.currentTarget as HTMLDivElement).style.boxShadow = `0 0 0 2px var(--forward-blue)`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.outline = "2px solid transparent";
        (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
      }}
      onClick={() => setExpanded((v) => !v)}
      role="button"
      aria-expanded={expanded}
      aria-label={`${approach.name}: click to ${expanded ? "collapse" : "expand"} details`}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setExpanded((v) => !v);
        }
      }}
    >
      {/* Icon + maturity badge row */}
      <div className="flex items-start justify-between gap-3">
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: config.bgColor, color: config.color }}
          aria-hidden="true"
        >
          <ApproachIcon name={approach.icon ?? ""} size={18} />
        </div>

        {/* Maturity badge */}
        <span
          className="font-mono text-xs font-semibold uppercase tracking-widest px-2 py-1 rounded-md"
          style={{
            backgroundColor: config.bgColor,
            color: config.color,
          }}
        >
          {config.label}
        </span>
      </div>

      {/* Name + acronym */}
      <div>
        <h3
          className="font-serif text-base font-bold leading-snug"
          style={{ color: "var(--text-primary)" }}
        >
          {approach.acronym ? (
            <JargonTerm
              term={approach.acronym}
              definition={
                approach.id === "rag"
                  ? "Retrieval Augmented Generation — grounding AI responses in retrieved documents from verified sources"
                  : approach.description.slice(0, 120) + "…"
              }
            >
              {approach.name}
            </JargonTerm>
          ) : (
            approach.name
          )}
        </h3>
      </div>

      {/* Progress bar */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <span
            className="font-mono text-xs uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
            Maturity
          </span>
          <span
            className="font-mono text-xs font-semibold"
            style={{ color: config.color }}
          >
            {approach.maturityPercent}%
          </span>
        </div>
        <ProgressBar target={approach.maturityPercent} color={config.barColor} />
      </div>

      {/* Description */}
      <p
        className="font-sans text-sm leading-relaxed"
        style={{ color: "var(--text-secondary)" }}
      >
        {approach.description.split(". ").slice(0, 2).join(". ") + "."}
      </p>

      {/* Expand toggle */}
      <div
        className="flex items-center gap-1.5 mt-auto pt-2 border-t"
        style={{ borderColor: "var(--border)" }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--forward-blue)" }}
        >
          {expanded ? "Less" : "Details"}
        </span>
        <ChevronDown
          size={12}
          aria-hidden="true"
          style={{
            color: "var(--forward-blue)",
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s ease",
          }}
        />
      </div>

      {/* Expanded: pros / cons / example */}
      {expanded && (
        <div
          className="border-t pt-4 flex flex-col gap-4"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Pros */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--verified-green)" }}
            >
              Pros
            </p>
            <ul className="flex flex-col gap-1.5">
              {approach.pros.map((pro, i) => (
                <li key={i} className="flex items-start gap-2">
                  <Check
                    size={13}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--verified-green)" }}
                  />
                  <span
                    className="font-sans text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {pro}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Cons */}
          <div>
            <p
              className="font-mono text-xs uppercase tracking-widest mb-2"
              style={{ color: "var(--hallucination-red)" }}
            >
              Cons
            </p>
            <ul className="flex flex-col gap-1.5">
              {approach.cons.map((con, i) => (
                <li key={i} className="flex items-start gap-2">
                  <X
                    size={13}
                    aria-hidden="true"
                    className="mt-0.5 shrink-0"
                    style={{ color: "var(--hallucination-red)" }}
                  />
                  <span
                    className="font-sans text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {con}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Real-world example */}
          <div
            className="rounded-lg p-3"
            style={{ backgroundColor: "var(--bg-secondary)" }}
          >
            <p
              className="font-mono text-xs uppercase tracking-widest mb-1"
              style={{ color: "var(--text-tertiary)" }}
            >
              Real-world example
            </p>
            <p
              className="font-sans text-xs italic leading-relaxed"
              style={{ color: "var(--text-secondary)" }}
            >
              {approach.realWorldExample}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function HowItsBeingFixedSection() {
  return (
    <SectionWrapper id="how-its-being-fixed" layout="centered-card" stagger>
      {/* Header */}
      <div className="text-center mb-12">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--forward-blue)" }}
        >
          Section 08
        </p>
        <h2
          className="font-serif text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          How It&rsquo;s Being Fixed
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Four approaches are actively reducing hallucination rates. None fully
          solve the problem yet.
        </p>
      </div>

      {/* 2×2 grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        {fixApproaches.map((approach) => (
          <ApproachCard key={approach.id} approach={approach} />
        ))}
      </div>

      {/* Footer note */}
      <p
        className="mt-8 text-center font-sans text-sm italic"
        style={{ color: "var(--text-tertiary)" }}
      >
        Click any card to see pros, cons, and real-world deployments.
      </p>
    </SectionWrapper>
  );
}
