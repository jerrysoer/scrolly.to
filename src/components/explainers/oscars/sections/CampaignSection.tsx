"use client";

import { useEffect, useRef, useState } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface TimelinePhase {
  label: string;
  sublabel: string;
  type: "dot" | "band" | "star";
  color: string;
}

interface TacticCard {
  emoji: string;
  title: string;
  body: string;
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const TIMELINE_PHASES: TimelinePhase[] = [
  {
    label: "Release Window",
    sublabel: "Oct – Dec",
    type: "dot",
    color: "#60a5fa",
  },
  {
    label: "Nominations Announced",
    sublabel: "Jan 19",
    type: "dot",
    color: "#60a5fa",
  },
  {
    label: "Campaign Season",
    sublabel: "Jan – Feb",
    type: "band",
    color: "#F59E0B",
  },
  {
    label: "Guild Awards",
    sublabel: "Feb",
    type: "dot",
    color: "#60a5fa",
  },
  {
    label: "Final Voting",
    sublabel: "Feb 28 – Mar 8",
    type: "dot",
    color: "#60a5fa",
  },
  {
    label: "Ceremony",
    sublabel: "Mar 15",
    type: "star",
    color: "#F59E0B",
  },
];

const CAMPAIGN_TACTICS: TacticCard[] = [
  {
    emoji: "🎬",
    title: "FYC Screenings",
    body: "Private screenings for Academy members at studios or dedicated theaters. Sometimes with Q&As with directors and talent.",
  },
  {
    emoji: "🪧",
    title: "Billboards",
    body: "For Your Consideration billboards blanket Sunset Boulevard and Beverly Hills from January through March.",
  },
  {
    emoji: "📦",
    title: "Screeners",
    body: "Studios mail or stream digital screeners to all voting members. Physical DVDs still exist.",
  },
  {
    emoji: "🎤",
    title: "Press Tours",
    body: "Cast and directors do targeted interviews with trade publications (Variety, The Hollywood Reporter) timed to voting windows.",
  },
  {
    emoji: "🤝",
    title: "Guild Strategy",
    body: "Studios court specific branch members with tailored outreach. A Best Sound campaign targets the Sound branch. A Best Director campaign targets Directors.",
  },
];

// ─── Timeline (Desktop: horizontal, Mobile: vertical) ────────────────────────

function AwardsTimeline() {
  return (
    <>
      {/* Desktop horizontal timeline */}
      <div className="hidden sm:block w-full" aria-label="Awards Season Timeline">
        <svg
          viewBox="0 0 700 140"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full"
          role="img"
          aria-label="Horizontal timeline of the awards campaign season from October through March"
        >
          {/* Track line */}
          <line
            x1="40"
            y1="55"
            x2="660"
            y2="55"
            stroke="rgba(255,255,255,0.15)"
            strokeWidth="2"
          />

          {/* Campaign Season band highlight (phases 2→4, roughly x=170 to x=520) */}
          <rect
            x="170"
            y="42"
            width="350"
            height="26"
            rx="4"
            fill="rgba(245,158,11,0.12)"
            stroke="rgba(245,158,11,0.35)"
            strokeWidth="1"
          />
          <text
            x="345"
            y="59"
            fontSize="8.5"
            fontWeight="700"
            fill="rgba(245,158,11,0.85)"
            fontFamily="system-ui"
            textAnchor="middle"
          >
            CAMPAIGN SEASON
          </text>

          {/* Phases */}
          {TIMELINE_PHASES.map((phase, i) => {
            const x = 40 + i * 124;
            const isStar = phase.type === "star";
            const isBand = phase.type === "band";

            return (
              <g key={phase.label}>
                {/* Node */}
                {isStar ? (
                  /* Gold star for ceremony */
                  <text
                    x={x - 10}
                    y={55 + 8}
                    fontSize="18"
                    fontFamily="system-ui"
                    fill="#F59E0B"
                  >
                    ★
                  </text>
                ) : isBand ? (
                  /* Amber filled circle for Campaign Season start */
                  <circle
                    cx={x}
                    cy={55}
                    r={8}
                    fill="rgba(245,158,11,0.25)"
                    stroke="rgba(245,158,11,0.9)"
                    strokeWidth="2"
                  />
                ) : (
                  <circle
                    cx={x}
                    cy={55}
                    r={6}
                    fill="rgba(15,23,42,0.8)"
                    stroke={phase.color}
                    strokeWidth="2"
                  />
                )}

                {/* Label above */}
                <text
                  x={x}
                  y={35}
                  fontSize="8.5"
                  fontWeight="600"
                  fill="rgba(255,255,255,0.9)"
                  fontFamily="system-ui"
                  textAnchor="middle"
                >
                  {phase.label}
                </text>

                {/* Sublabel below */}
                <text
                  x={x}
                  y={78}
                  fontSize="8"
                  fill="rgba(148,163,184,0.8)"
                  fontFamily="system-ui"
                  textAnchor="middle"
                >
                  {phase.sublabel}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Mobile vertical timeline */}
      <div className="sm:hidden flex flex-col gap-0" aria-label="Awards Season Timeline">
        {TIMELINE_PHASES.map((phase, i) => {
          const isLast = i === TIMELINE_PHASES.length - 1;
          const isBand = phase.type === "band";
          const isStar = phase.type === "star";

          return (
            <div key={phase.label} className="flex gap-4">
              {/* Left: connector + node */}
              <div className="flex flex-col items-center" style={{ width: "28px" }}>
                {/* Node */}
                <div
                  className="flex items-center justify-center flex-shrink-0"
                  style={{ width: "28px", height: "28px", marginTop: "2px" }}
                >
                  {isStar ? (
                    <span style={{ fontSize: "18px", lineHeight: 1 }}>★</span>
                  ) : (
                    <div
                      style={{
                        width: isBand ? "14px" : "12px",
                        height: isBand ? "14px" : "12px",
                        borderRadius: "50%",
                        background: isBand
                          ? "rgba(245,158,11,0.25)"
                          : "rgba(15,23,42,0.8)",
                        border: `2px solid ${phase.color}`,
                      }}
                    />
                  )}
                </div>
                {/* Connector line below */}
                {!isLast && (
                  <div
                    style={{
                      flex: 1,
                      width: "2px",
                      background: "rgba(255,255,255,0.12)",
                      minHeight: "24px",
                    }}
                  />
                )}
              </div>

              {/* Right: text */}
              <div
                className="pb-5"
                style={{
                  paddingTop: "4px",
                  background:
                    isBand ? "rgba(245,158,11,0.05)" : "transparent",
                  borderLeft: isBand
                    ? "2px solid rgba(245,158,11,0.3)"
                    : "none",
                  paddingLeft: isBand ? "8px" : undefined,
                  marginLeft: isBand ? "-4px" : undefined,
                  borderRadius: isBand ? "0 4px 4px 0" : undefined,
                }}
              >
                <p
                  className="text-sm font-semibold leading-tight"
                  style={{
                    color: isBand ? "rgba(245,158,11,0.95)" : "rgba(255,255,255,0.9)",
                  }}
                >
                  {phase.label}
                </p>
                <p
                  className="text-xs mt-0.5"
                  style={{ color: "rgba(148,163,184,0.8)" }}
                >
                  {phase.sublabel}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

// ─── Stagger-reveal tactic cards ──────────────────────────────────────────────

function TacticCards() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 stagger-children ${
        visible ? "visible" : ""
      }`}
    >
      {CAMPAIGN_TACTICS.map((tactic) => (
        <div
          key={tactic.title}
          className="rounded-xl p-5 flex flex-col gap-3 card-glow"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
          }}
        >
          {/* Icon + title row */}
          <div className="flex items-center gap-3">
            <span
              className="text-xl flex-shrink-0"
              role="img"
              aria-hidden="true"
            >
              {tactic.emoji}
            </span>
            <span
              className="text-sm font-bold"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              {tactic.title}
            </span>
          </div>

          {/* Body */}
          <p
            className="text-sm leading-relaxed"
            style={{ color: "rgba(203,213,225,0.8)" }}
          >
            {tactic.body}
          </p>
        </div>
      ))}
    </div>
  );
}

// ─── CampaignSection ──────────────────────────────────────────────────────────

export default function CampaignSection() {
  return (
    <>
      {/* Wavy section divider */}
      <div className="relative w-full overflow-hidden" aria-hidden="true">
        <svg
          className="w-full"
          viewBox="0 0 1200 40"
          fill="none"
          preserveAspectRatio="none"
          style={{ height: "32px", display: "block", color: "rgba(255,255,255,0.08)" }}
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

      <section
        id="campaign"
        style={{
          background: "#1e293b",
        }}
      >
        {/* Force dark bg in dark mode too */}
        <style>{`
          [data-theme="dark"] #campaign {
            background: #0f172a;
          }
        `}</style>

        <div className="mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 flex flex-col gap-10">
          {/* Section number divider */}
          <div
            className="flex items-center gap-4"
            style={{ padding: "0 0 0.5rem" }}
          >
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
            <div
              style={{
                width: "2rem",
                height: "2rem",
                borderRadius: "50%",
                border: "1.5px solid #60a5fa",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "0.7rem",
                fontWeight: 700,
                color: "#60a5fa",
                flexShrink: 0,
                fontVariantNumeric: "tabular-nums",
                letterSpacing: "0.05em",
              }}
              aria-label="Section 05"
            >
              05
            </div>
            <div style={{ flex: 1, height: "1px", background: "rgba(255,255,255,0.1)" }} />
          </div>

          {/* Heading */}
          <h2
            className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight"
            style={{ color: "rgba(255,255,255,0.97)" }}
          >
            The Campaign Behind the Curtain
          </h2>

          {/* Pull quote — forced dark override */}
          <blockquote
            style={{
              position: "relative",
              paddingLeft: "1.5rem",
              borderLeft: "3px solid #60a5fa",
              fontStyle: "italic",
              fontSize: "1.2rem",
              lineHeight: "1.7",
              color: "rgba(203,213,225,0.9)",
              margin: 0,
            }}
          >
            {/* Opening quote mark */}
            <span
              aria-hidden="true"
              style={{
                position: "absolute",
                left: "-0.2rem",
                top: "-0.6rem",
                fontSize: "3rem",
                color: "#60a5fa",
                opacity: 0.3,
                fontFamily: "Georgia, serif",
                lineHeight: 1,
              }}
            >
              &ldquo;
            </span>
            The Oscars aren&apos;t just about the best film. They&apos;re about
            which studio ran the best campaign.
          </blockquote>

          {/* Timeline */}
          <div className="flex flex-col gap-4">
            <h3
              className="text-sm font-semibold uppercase tracking-widest"
              style={{ color: "rgba(148,163,184,0.8)" }}
            >
              Awards Season Timeline
            </h3>
            <div
              className="rounded-2xl p-5 sm:p-6"
              style={{
                background: "rgba(15,23,42,0.6)",
                border: "1px solid rgba(255,255,255,0.08)",
              }}
            >
              <AwardsTimeline />
            </div>
          </div>

          {/* Tactics heading */}
          <div className="flex flex-col gap-2">
            <h3
              className="text-lg font-bold"
              style={{ color: "rgba(255,255,255,0.95)" }}
            >
              5 Campaign Tactics Studios Use
            </h3>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "rgba(148,163,184,0.85)" }}
            >
              From private screenings to targeted guild outreach, awards
              campaigns are sophisticated lobbying operations.
            </p>
          </div>

          {/* Stagger-reveal tactic cards */}
          <TacticCards />
        </div>
      </section>
    </>
  );
}
