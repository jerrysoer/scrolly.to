"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { BRANCHES, TOTAL_MEMBERS } from "@/lib/explainers/oscars";

// ─── Types ────────────────────────────────────────────────────────────────────

type Tab = "branch-size" | "what-they-vote-on";

// ─── BranchBarChart ───────────────────────────────────────────────────────────

const MAX_MEMBERS = Math.max(...BRANCHES.map((b) => b.members)); // 1302 (Actors)

function BranchBarChart() {
  return (
    <div
      className="overflow-y-auto pr-1"
      style={{
        maxHeight: "420px",
        scrollbarWidth: "thin",
        scrollbarColor: "var(--border) transparent",
      }}
    >
      <svg
        role="img"
        aria-label="Horizontal bar chart of Academy branch member counts"
        viewBox={`0 0 480 ${BRANCHES.length * 32}`}
        className="w-full"
        style={{ minHeight: `${BRANCHES.length * 32}px` }}
      >
        {BRANCHES.map((branch, i) => {
          const y = i * 32;
          const barMaxWidth = 280; // px in SVG units
          const barWidth = (branch.members / MAX_MEMBERS) * barMaxWidth;
          const isActors = branch.name === "Actors";
          const labelX = 140; // right-align branch names at x=140
          const barStartX = 148;

          return (
            <g key={branch.name}>
              {/* Branch label — right-aligned */}
              <text
                x={labelX}
                y={y + 20}
                textAnchor="end"
                fontSize="11"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill="var(--text-secondary)"
              >
                {branch.name}
              </text>

              {/* Bar track */}
              <rect
                x={barStartX}
                y={y + 10}
                width={barMaxWidth}
                height={14}
                rx="4"
                fill="var(--border)"
                opacity="0.4"
              />

              {/* Filled bar */}
              <rect
                x={barStartX}
                y={y + 10}
                width={barWidth}
                height={14}
                rx="4"
                fill={isActors ? "var(--forward-blue)" : "var(--text-tertiary)"}
                opacity={isActors ? 1 : 0.6}
              />

              {/* Member count */}
              <text
                x={barStartX + barWidth + 6}
                y={y + 21}
                fontSize="10"
                fontFamily="system-ui, -apple-system, sans-serif"
                fill={isActors ? "var(--forward-blue)" : "var(--text-tertiary)"}
                fontWeight={isActors ? "700" : "400"}
              >
                {branch.members.toLocaleString()}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}

// ─── WhatTheyVoteOn ───────────────────────────────────────────────────────────

function WhatTheyVoteOn() {
  return (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))" }}
    >
      {BRANCHES.map((branch) => (
        <div
          key={branch.name}
          className="rounded-xl p-3 border"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p
            className="text-xs font-semibold mb-2"
            style={{ color: "var(--text-primary)" }}
          >
            {branch.name}
          </p>
          <div className="flex flex-wrap gap-1">
            {branch.categories.map((cat) => (
              <span
                key={cat}
                className="text-[10px] font-medium px-2 py-0.5 rounded-full"
                style={{
                  background:
                    "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-card))",
                  color: "var(--forward-blue)",
                  border:
                    "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))",
                  lineHeight: "1.4",
                }}
              >
                {cat}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── BranchToggle ─────────────────────────────────────────────────────────────

const TABS: { id: Tab; label: string }[] = [
  { id: "branch-size", label: "Branch Size" },
  { id: "what-they-vote-on", label: "What They Vote On" },
];

function BranchToggle() {
  const [activeTab, setActiveTab] = useState<Tab>("branch-size");

  return (
    <div className="flex flex-col gap-4">
      {/* Tab bar */}
      <div
        className="flex rounded-lg p-1 gap-1 w-fit"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
        }}
        role="tablist"
        aria-label="Branch information tabs"
      >
        {TABS.map((tab) => (
          <button
            key={tab.id}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            id={`tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id)}
            className="text-sm font-medium px-4 py-1.5 rounded-md transition-all duration-200"
            style={{
              background:
                activeTab === tab.id ? "var(--forward-blue)" : "transparent",
              color:
                activeTab === tab.id
                  ? "#ffffff"
                  : "var(--text-secondary)",
              cursor: "pointer",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab panels */}
      <div
        id={`tabpanel-branch-size`}
        role="tabpanel"
        aria-labelledby="tab-branch-size"
        hidden={activeTab !== "branch-size"}
      >
        <BranchBarChart />
      </div>

      <div
        id={`tabpanel-what-they-vote-on`}
        role="tabpanel"
        aria-labelledby="tab-what-they-vote-on"
        hidden={activeTab !== "what-they-vote-on"}
      >
        <WhatTheyVoteOn />
      </div>
    </div>
  );
}

// ─── AcademySection ───────────────────────────────────────────────────────────

export default function AcademySection() {
  return (
    <SectionWrapper id="academy" layout="split-left" stagger>
      {/* ── LEFT COLUMN ── */}
      <div className="flex flex-col gap-6">
        {/* Section number divider */}
        <div className="section-number-divider" aria-hidden="true">
          <span className="section-number-badge">01</span>
        </div>

        {/* Heading */}
        <div className="flex flex-col gap-2">
          <h2
            className="text-2xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            The Academy
          </h2>
          <p
            className="text-base font-semibold"
            style={{ color: "var(--forward-blue)" }}
          >
            ~{TOTAL_MEMBERS.toLocaleString()} members in 17 branches
          </p>
        </div>

        {/* Stat box */}
        <div className="stat-box">
          <p
            className="text-sm leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            Most members are{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              active industry professionals
            </strong>
            . Membership is by{" "}
            <strong style={{ color: "var(--text-primary)" }}>
              invitation only
            </strong>
            —nominees are often invited after their first Oscar nomination, but
            sponsorship by existing members is also a path.
          </p>
        </div>

        {/* Decorative callout card (photo placeholder) */}
        <div
          className="rounded-xl overflow-hidden"
          style={{
            background: "linear-gradient(145deg, #141622, #1e293b)",
            border: "1px solid rgba(148,163,184,0.12)",
          }}
        >
          <div className="px-5 py-6 flex flex-col gap-3">
            {/* Simulated widescreen photo placeholder */}
            <div
              className="w-full rounded-lg flex items-center justify-center"
              style={{
                aspectRatio: "16/9",
                background:
                  "linear-gradient(135deg, rgba(59,130,246,0.1) 0%, rgba(245,158,11,0.08) 100%)",
                border: "1px solid rgba(148,163,184,0.1)",
              }}
              aria-label="Dolby Theatre red carpet"
            >
              <div className="flex flex-col items-center gap-2 text-center px-4">
                <svg
                  width="36"
                  height="36"
                  viewBox="0 0 24 24"
                  fill="none"
                  aria-hidden="true"
                >
                  <rect
                    x="3"
                    y="6"
                    width="18"
                    height="13"
                    rx="2"
                    stroke="rgba(148,163,184,0.4)"
                    strokeWidth="1.5"
                  />
                  <circle
                    cx="12"
                    cy="12"
                    r="3"
                    stroke="rgba(148,163,184,0.4)"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M3 9h2"
                    stroke="rgba(148,163,184,0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
                <p
                  className="text-xs italic leading-snug"
                  style={{ color: "rgba(148,163,184,0.55)" }}
                >
                  Red carpet,
                  <br />
                  2009 Academy Awards
                </p>
              </div>
            </div>

            {/* Attribution */}
            <p
              className="text-xs"
              style={{ color: "var(--text-tertiary)" }}
            >
              Photo: slgckgc, CC BY 2.0, via Wikimedia Commons
            </p>
          </div>
        </div>
      </div>

      {/* ── RIGHT COLUMN ── */}
      <div className="flex flex-col gap-4">
        <BranchToggle />
      </div>
    </SectionWrapper>
  );
}
