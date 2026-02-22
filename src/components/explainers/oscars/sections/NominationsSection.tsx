"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { BRANCHES, TOTAL_MEMBERS } from "@/lib/explainers/oscars";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------

interface CategoryInfo {
  id: string;
  label: string;
  branch: string;
  members: number;
}

const DIAGRAM_CATEGORIES: CategoryInfo[] = [
  {
    id: "director",
    label: "Best Director",
    branch: "Directors",
    members: BRANCHES.find((b) => b.name === "Directors")?.members ?? 487,
  },
  {
    id: "actor",
    label: "Best Actor/Actress",
    branch: "Actors",
    members: BRANCHES.find((b) => b.name === "Actors")?.members ?? 1302,
  },
  {
    id: "picture",
    label: "Best Picture",
    branch: "All Members",
    members: TOTAL_MEMBERS,
  },
  {
    id: "cinematography",
    label: "Best Cinematography",
    branch: "Cinematographers",
    members: BRANCHES.find((b) => b.name === "Cinematographers")?.members ?? 228,
  },
  {
    id: "score",
    label: "Best Original Score",
    branch: "Composers",
    members: BRANCHES.find((b) => b.name === "Composers")?.members ?? 268,
  },
];

// Which diagram categories light up per scroll step
const STEP_HIGHLIGHTS: Record<number, string[]> = {
  0: ["director", "cinematography", "score"],
  1: ["actor"],
  2: ["picture"],
  3: ["director", "actor", "picture", "cinematography", "score"],
};

// ---------------------------------------------------------------------------
// Scroll step card data
// ---------------------------------------------------------------------------

const STEPS = [
  {
    number: "01",
    heading: "Who Nominates What?",
    body: "Each of the Academy's 17 branches votes only in their own category. Cinematographers pick Best Cinematography. Directors pick Best Director. This peer-review model means specialists judge specialist work.",
  },
  {
    number: "02",
    heading: "Actors Vote for Actors",
    body: "The Actors branch — the largest at 1,302 members — nominates all four acting categories. They're the only ones who vote for Best Actor, Best Actress, Best Supporting Actor, and Best Supporting Actress.",
  },
  {
    number: "03",
    heading: "The Best Picture Exception",
    body: "Best Picture breaks the rules. All ~10,820 Academy members — every branch — vote for Best Picture nominations. It's the only category where everyone has a say.",
  },
  {
    number: "04",
    heading: "The Ranked Ballot",
    body: "Nominations don't use simple plurality voting. Members rank their top 5 choices. This Single Transferable Vote system means a film needs genuine, broad support to earn a nomination spot — not just a passionate fan club in one branch.",
  },
];

// ---------------------------------------------------------------------------
// SVG Flowchart
// ---------------------------------------------------------------------------

interface FlowchartProps {
  activeStep: number;
  selectedCategory: string | null;
}

function NominationFlowchart({ activeStep, selectedCategory }: FlowchartProps) {
  // Determine which category IDs are highlighted
  const stepHighlights = STEP_HIGHLIGHTS[activeStep] ?? [];
  const highlights = new Set<string>(
    selectedCategory ? [selectedCategory] : stepHighlights
  );

  // Layout constants
  const W = 380;
  const H = 360;

  // Academy box at top
  const academyBox = { x: 90, y: 18, w: 200, h: 38 };

  // Branch row (3 branches shown, representative)
  const branchBoxes = [
    { id: "director", x: 20, y: 110, w: 90, h: 32, label: "Directors", sub: "487" },
    { id: "actor", x: 145, y: 110, w: 90, h: 32, label: "Actors", sub: "1,302" },
    { id: "picture_branch", x: 270, y: 110, w: 90, h: 32, label: "All Branches", sub: `${TOTAL_MEMBERS.toLocaleString()}` },
  ];

  // Arrow midpoints from academy to each branch box
  const arrowFromAcademy = [
    { x1: 150, y1: 56, x2: 65, y2: 110 },  // to directors (left)
    { x1: 190, y1: 56, x2: 190, y2: 110 }, // to actors (center)
    { x1: 230, y1: 56, x2: 315, y2: 110 }, // to all branches (right)
  ];

  // Category boxes at bottom
  const catBoxes = [
    { id: "director", x: 20, y: 220, w: 90, h: 28, label: "Best Director" },
    { id: "actor", x: 145, y: 220, w: 90, h: 28, label: "Best Actor/Actress" },
    { id: "picture", x: 270, y: 220, w: 90, h: 28, label: "Best Picture" },
    { id: "cinematography", x: 20, y: 270, w: 90, h: 28, label: "Best Cinematography" },
    { id: "score", x: 145, y: 270, w: 90, h: 28, label: "Best Score" },
  ];

  // Arrows from branch to category
  const branchToCat = [
    { fromId: "director", toId: "director", x1: 65, y1: 142, x2: 65, y2: 220 },
    { fromId: "actor", toId: "actor", x1: 190, y1: 142, x2: 190, y2: 220 },
    { fromId: "picture_branch", toId: "picture", x1: 315, y1: 142, x2: 315, y2: 220 },
    { fromId: "actor", toId: "actor", x1: 190, y1: 142, x2: 190, y2: 220 },
    // extra arrows from branches not shown individually
    { fromId: "director", toId: "cinematography", x1: 50, y1: 142, x2: 50, y2: 270 },
    { fromId: "actor", toId: "score", x1: 175, y1: 142, x2: 175, y2: 270 },
  ];

  const blue = "var(--forward-blue)";
  const amber = "var(--accent-amber)";
  const cardBg = "var(--bg-card)";
  const border = "var(--border)";
  const textPrimary = "var(--text-primary)";
  const textSecondary = "var(--text-secondary)";

  function isHighlighted(id: string) {
    return highlights.has(id);
  }

  // For arrows: highlight if either connected endpoint is highlighted
  function arrowHighlighted(fromId: string, toId: string) {
    return isHighlighted(toId) || (toId === "picture" && highlights.has("picture"));
  }

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      aria-label="Academy nomination flowchart"
      style={{ display: "block", maxWidth: "380px", margin: "0 auto" }}
    >
      {/* ---- Academy master box ---- */}
      <rect
        x={academyBox.x}
        y={academyBox.y}
        width={academyBox.w}
        height={academyBox.h}
        rx={8}
        fill={highlights.size > 0 ? `color-mix(in srgb, ${blue} 12%, ${cardBg})` : cardBg}
        stroke={blue}
        strokeWidth={1.5}
      />
      <text
        x={academyBox.x + academyBox.w / 2}
        y={academyBox.y + 15}
        textAnchor="middle"
        fontSize={10}
        fontWeight="700"
        fill={blue}
        fontFamily="system-ui, sans-serif"
      >
        THE ACADEMY
      </text>
      <text
        x={academyBox.x + academyBox.w / 2}
        y={academyBox.y + 28}
        textAnchor="middle"
        fontSize={9}
        fill={textSecondary}
        fontFamily="system-ui, sans-serif"
      >
        17 branches · {TOTAL_MEMBERS.toLocaleString()} members
      </text>

      {/* ---- Arrows: Academy → branches ---- */}
      {arrowFromAcademy.map((a, i) => {
        const branchId = branchBoxes[i].id;
        const lit =
          (branchId === "director" && (highlights.has("director") || highlights.has("cinematography") || highlights.has("score"))) ||
          (branchId === "actor" && highlights.has("actor")) ||
          (branchId === "picture_branch" && highlights.has("picture"));
        return (
          <line
            key={i}
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke={lit ? blue : border}
            strokeWidth={lit ? 1.5 : 1}
            strokeDasharray={lit ? "none" : "4 3"}
            opacity={lit ? 1 : 0.5}
          />
        );
      })}

      {/* ---- Branch boxes ---- */}
      {branchBoxes.map((b) => {
        const lit =
          (b.id === "director" && (highlights.has("director") || highlights.has("cinematography") || highlights.has("score"))) ||
          (b.id === "actor" && highlights.has("actor")) ||
          (b.id === "picture_branch" && highlights.has("picture"));
        return (
          <g key={b.id}>
            <rect
              x={b.x}
              y={b.y}
              width={b.w}
              height={b.h}
              rx={6}
              fill={lit ? `color-mix(in srgb, ${blue} 15%, ${cardBg})` : cardBg}
              stroke={lit ? blue : border}
              strokeWidth={lit ? 1.5 : 1}
              opacity={lit ? 1 : 0.6}
            />
            <text
              x={b.x + b.w / 2}
              y={b.y + 13}
              textAnchor="middle"
              fontSize={9}
              fontWeight="600"
              fill={lit ? blue : textPrimary}
              fontFamily="system-ui, sans-serif"
            >
              {b.label}
            </text>
            <text
              x={b.x + b.w / 2}
              y={b.y + 24}
              textAnchor="middle"
              fontSize={8}
              fill={textSecondary}
              fontFamily="system-ui, sans-serif"
            >
              {b.sub} members
            </text>
          </g>
        );
      })}

      {/* ---- Arrows: branches → categories ---- */}
      {branchToCat.map((a, i) => {
        const lit = arrowHighlighted(a.fromId, a.toId);
        return (
          <line
            key={i}
            x1={a.x1}
            y1={a.y1}
            x2={a.x2}
            y2={a.y2}
            stroke={lit ? blue : border}
            strokeWidth={lit ? 1.5 : 1}
            strokeDasharray={lit ? "none" : "4 3"}
            opacity={lit ? 1 : 0.4}
          />
        );
      })}

      {/* ---- Category boxes ---- */}
      {catBoxes.map((c) => {
        const lit = isHighlighted(c.id);
        const isPic = c.id === "picture";
        return (
          <g key={c.id}>
            <rect
              x={c.x}
              y={c.y}
              width={c.w}
              height={c.h}
              rx={5}
              fill={
                lit && isPic
                  ? `color-mix(in srgb, ${amber} 20%, ${cardBg})`
                  : lit
                  ? `color-mix(in srgb, ${blue} 18%, ${cardBg})`
                  : cardBg
              }
              stroke={lit ? (isPic ? amber : blue) : border}
              strokeWidth={lit ? 1.5 : 1}
              opacity={lit ? 1 : 0.55}
            />
            <text
              x={c.x + c.w / 2}
              y={c.y + 18}
              textAnchor="middle"
              fontSize={8.5}
              fontWeight={lit ? "700" : "500"}
              fill={lit ? (isPic ? amber : blue) : textSecondary}
              fontFamily="system-ui, sans-serif"
            >
              {c.label}
            </text>
          </g>
        );
      })}

      {/* ---- "Nominations" label row ---- */}
      <text
        x={W / 2}
        y={H - 18}
        textAnchor="middle"
        fontSize={9}
        fill={textSecondary}
        fontFamily="system-ui, sans-serif"
        opacity={0.7}
      >
        ↑ Nomination ballots voted by branch peers
      </text>
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Category explorer pill + tooltip
// ---------------------------------------------------------------------------

interface CategoryExplorerProps {
  selected: string | null;
  onSelect: (id: string | null) => void;
}

function CategoryExplorer({ selected, onSelect }: CategoryExplorerProps) {
  const blue = "var(--forward-blue)";

  return (
    <div style={{ marginTop: "1.5rem" }}>
      <p
        style={{
          fontSize: "0.7rem",
          fontWeight: 600,
          textTransform: "uppercase",
          letterSpacing: "0.08em",
          color: "var(--text-tertiary)",
          marginBottom: "0.625rem",
        }}
      >
        Explore a category
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
        {DIAGRAM_CATEGORIES.map((cat) => {
          const isActive = selected === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelect(isActive ? null : cat.id)}
              style={{
                padding: "0.3rem 0.75rem",
                borderRadius: "9999px",
                fontSize: "0.75rem",
                fontWeight: 600,
                fontFamily: "system-ui, sans-serif",
                border: `1.5px solid ${isActive ? blue : "var(--border)"}`,
                background: isActive
                  ? `color-mix(in srgb, ${blue} 15%, var(--bg-card))`
                  : "var(--bg-card)",
                color: isActive ? blue : "var(--text-secondary)",
                cursor: "pointer",
                transition: "all 0.15s ease",
              }}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Tooltip callout */}
      {selected && (() => {
        const cat = DIAGRAM_CATEGORIES.find((c) => c.id === selected);
        if (!cat) return null;
        return (
          <div
            style={{
              marginTop: "0.875rem",
              padding: "0.75rem 1rem",
              borderRadius: "0.5rem",
              background: `color-mix(in srgb, ${blue} 10%, var(--bg-secondary))`,
              border: `1px solid color-mix(in srgb, ${blue} 25%, var(--border))`,
              fontSize: "0.8rem",
              lineHeight: 1.6,
              color: "var(--text-primary)",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span style={{ fontWeight: 700, color: blue }}>{cat.label}</span>
            <br />
            <span style={{ color: "var(--text-secondary)" }}>
              Nominated by:{" "}
              <strong style={{ color: "var(--text-primary)" }}>{cat.branch}</strong>
              {" "}—{" "}
              <strong style={{ color: "var(--text-primary)" }}>
                {cat.members.toLocaleString()}
              </strong>{" "}
              members
            </span>
          </div>
        );
      })()}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function NominationsSection() {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setStepRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      stepRefs.current[index] = el;
    },
    []
  );

  // IntersectionObserver: activate step when 50%+ visible
  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    STEPS.forEach((_, i) => {
      const el = stepRefs.current[i];
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(i);
          }
        },
        { threshold: 0.5 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  // When a category pill is selected, override the active-step highlight
  const diagramActiveStep = selectedCategory !== null ? -1 : activeStep;

  return (
    <section id="nominations" style={{ padding: "4rem 0 5rem" }}>
      {/* Wave divider (matches SectionWrapper pattern) */}
      <div
        style={{ position: "relative", width: "100%", overflow: "hidden" }}
        aria-hidden="true"
      >
        <svg
          style={{ width: "100%", height: "32px", display: "block", color: "var(--border)" }}
          viewBox="0 0 1200 40"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0 20 Q300 0 600 20 T1200 20"
            stroke="currentColor"
            strokeWidth="1"
            fill="none"
            opacity="0.4"
          />
        </svg>
      </div>

      {/* Section number divider */}
      <div
        style={{ maxWidth: "72rem", margin: "0 auto", padding: "0 1.5rem" }}
      >
        <div className="section-number-divider">
          <span className="section-number-badge">02</span>
        </div>

        {/* Section headline */}
        <h2
          style={{
            textAlign: "center",
            fontSize: "clamp(1.6rem, 4vw, 2.5rem)",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            lineHeight: 1.2,
            color: "var(--text-primary)",
            marginBottom: "2.5rem",
            fontFamily: "system-ui, sans-serif",
          }}
        >
          The Nomination System
        </h2>
      </div>

      {/* Sticky layout: left diagram + right scrolling steps */}
      <div
        className="sticky-diagram-layout"
        style={{
          maxWidth: "72rem",
          margin: "0 auto",
          padding: "0 1.5rem",
          alignItems: "start",
        }}
      >
        {/* LEFT: Sticky diagram panel */}
        <div className="sticky-diagram-left">
          <div
            style={{
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderRadius: "1rem",
              padding: "1.5rem",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
          >
            {/* Panel label */}
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-tertiary)",
                marginBottom: "1rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Nomination Flow
            </p>

            {/* Step title label */}
            <p
              style={{
                fontSize: "0.875rem",
                fontWeight: 600,
                color: "var(--forward-blue)",
                marginBottom: "0.75rem",
                minHeight: "1.25rem",
                fontFamily: "system-ui, sans-serif",
                transition: "color 0.2s ease",
              }}
            >
              {selectedCategory
                ? DIAGRAM_CATEGORIES.find((c) => c.id === selectedCategory)?.label
                : STEPS[activeStep]?.heading}
            </p>

            {/* SVG diagram */}
            <NominationFlowchart
              activeStep={diagramActiveStep}
              selectedCategory={selectedCategory}
            />

            {/* Category explorer */}
            <CategoryExplorer
              selected={selectedCategory}
              onSelect={setSelectedCategory}
            />
          </div>
        </div>

        {/* RIGHT: Scrolling narrative steps */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
        >
          {STEPS.map((step, i) => {
            const isActive = activeStep === i && selectedCategory === null;
            return (
              <div
                key={i}
                ref={setStepRef(i)}
                style={{
                  minHeight: "300px",
                  padding: "2rem",
                  borderRadius: "1rem",
                  background: isActive
                    ? `color-mix(in srgb, var(--forward-blue) 6%, var(--bg-card))`
                    : "var(--bg-card)",
                  border: `1.5px solid ${
                    isActive
                      ? "color-mix(in srgb, var(--forward-blue) 35%, var(--border))"
                      : "var(--border)"
                  }`,
                  boxShadow: isActive
                    ? "0 4px 20px color-mix(in srgb, var(--forward-blue) 10%, transparent)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                  transition: "all 0.3s ease",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "0.75rem",
                }}
              >
                {/* Step number badge */}
                <span
                  style={{
                    display: "inline-block",
                    width: "1.75rem",
                    height: "1.75rem",
                    borderRadius: "50%",
                    border: `1.5px solid ${isActive ? "var(--forward-blue)" : "var(--border)"}`,
                    lineHeight: "1.75rem",
                    textAlign: "center",
                    fontSize: "0.65rem",
                    fontWeight: 700,
                    color: isActive ? "var(--forward-blue)" : "var(--text-tertiary)",
                    fontFamily: "system-ui, sans-serif",
                    flexShrink: 0,
                    transition: "all 0.3s ease",
                  }}
                >
                  {step.number}
                </span>

                {/* Step heading */}
                <h3
                  style={{
                    fontSize: "1.15rem",
                    fontWeight: 700,
                    lineHeight: 1.3,
                    color: isActive ? "var(--text-primary)" : "var(--text-secondary)",
                    fontFamily: "system-ui, sans-serif",
                    margin: 0,
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.heading}
                </h3>

                {/* Step body */}
                <p
                  style={{
                    fontSize: "0.9375rem",
                    lineHeight: 1.7,
                    color: isActive ? "var(--text-secondary)" : "var(--text-tertiary)",
                    fontFamily: "system-ui, sans-serif",
                    margin: 0,
                    transition: "color 0.3s ease",
                  }}
                >
                  {step.body}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
