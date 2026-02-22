"use client";

import { ListOrdered, CheckSquare } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

// ─── Comparison Card ─────────────────────────────────────────────────────────

function ComparisonCard() {
  return (
    <div className="flex flex-col gap-4">
      {/* Two-column panel grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {/* Left: Best Picture / STV */}
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "color-mix(in srgb, var(--forward-blue) 6%, var(--bg-card))",
            border: "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <span
              className="p-1.5 rounded-lg"
              style={{
                background: "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-card))",
              }}
            >
              <ListOrdered
                size={16}
                style={{ color: "var(--forward-blue)" }}
                aria-hidden="true"
              />
            </span>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: "var(--forward-blue)" }}
            >
              Best Picture
            </span>
          </div>

          {/* Method label */}
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
            Single Transferable Vote
          </span>

          {/* Feature list */}
          <ul className="flex flex-col gap-1.5">
            {[
              "Ranked ballot (rank up to 10 films)",
              "Multiple elimination rounds",
              "Winner needs majority (>50%)",
              "All ~10,820 members vote",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--forward-blue)", marginTop: "6px" }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Right: All Other Finals / Plurality */}
        <div
          className="rounded-xl p-5 flex flex-col gap-3"
          style={{
            background: "color-mix(in srgb, var(--accent-amber) 6%, var(--bg-card))",
            border: "1px solid color-mix(in srgb, var(--accent-amber) 25%, var(--border))",
          }}
        >
          {/* Header */}
          <div className="flex items-center gap-2">
            <span
              className="p-1.5 rounded-lg"
              style={{
                background: "color-mix(in srgb, var(--accent-amber) 12%, var(--bg-card))",
              }}
            >
              <CheckSquare
                size={16}
                style={{ color: "var(--accent-amber)" }}
                aria-hidden="true"
              />
            </span>
            <span
              className="text-sm font-bold tracking-tight"
              style={{ color: "var(--accent-amber)" }}
            >
              All Other Finals
            </span>
          </div>

          {/* Method label */}
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: "var(--text-tertiary)" }}
          >
            Plurality Voting
          </span>

          {/* Feature list */}
          <ul className="flex flex-col gap-1.5">
            {[
              "One vote per member",
              "Single round",
              "Most votes wins",
              "Branch-specific members vote",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2">
                <span
                  className="mt-0.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
                  style={{ background: "var(--accent-amber)", marginTop: "6px" }}
                  aria-hidden="true"
                />
                <span
                  className="text-sm leading-relaxed"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Third note spanning both columns */}
      <div
        className="rounded-xl px-5 py-4 flex items-start gap-3"
        style={{
          background: "var(--bg-secondary)",
          border: "1px solid var(--border)",
        }}
      >
        <span
          className="text-base flex-shrink-0"
          role="img"
          aria-label="Note"
          style={{ lineHeight: "1.5" }}
        >
          ℹ️
        </span>
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>Note:</strong> Nominations
          for ALL categories use ranked-choice voting. Only the final Best Picture winner
          uses STV.
        </p>
      </div>
    </div>
  );
}

// ─── SVG Diagram ─────────────────────────────────────────────────────────────

function VotingDiagram() {
  return (
    <div className="flex flex-col gap-5">
      {/* STV diagram */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="px-4 py-2.5 border-b"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--forward-blue) 5%, var(--bg-card))",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--forward-blue)" }}
          >
            STV — Best Picture
          </span>
        </div>
        <div className="p-4">
          <svg
            viewBox="0 0 240 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-label="Ranked Choice STV diagram showing vote transfers between rounds"
            role="img"
          >
            {/* Ballot column: ranked choices */}
            {[
              { rank: "1st", label: "Film A", y: 20, opacity: 1 },
              { rank: "2nd", label: "Film B", y: 54, opacity: 0.85 },
              { rank: "3rd", label: "Film C", y: 88, opacity: 0.7 },
              { rank: "4th", label: "Film D", y: 122, opacity: 0.55 },
              { rank: "5th", label: "Film E", y: 156, opacity: 0.4 },
            ].map(({ rank, label, y, opacity }) => (
              <g key={rank}>
                <rect
                  x="8"
                  y={y}
                  width="100"
                  height="26"
                  rx="5"
                  fill={`rgba(59,130,246,${opacity * 0.15})`}
                  stroke={`rgba(59,130,246,${opacity * 0.5})`}
                  strokeWidth="1"
                />
                <text
                  x="18"
                  y={y + 17}
                  fontSize="9"
                  fontWeight="700"
                  fill={`rgba(59,130,246,${opacity})`}
                  fontFamily="system-ui"
                >
                  {rank}
                </text>
                <text
                  x="52"
                  y={y + 17}
                  fontSize="9"
                  fill={`rgba(30,41,59,${opacity})`}
                  fontFamily="system-ui"
                >
                  {label}
                </text>
              </g>
            ))}

            {/* "If Film A is eliminated" callout */}
            <g>
              {/* Arrow from 1st box going right */}
              <path
                d="M 110 33 C 125 33 125 90 140 90"
                stroke="rgba(245,158,11,0.7)"
                strokeWidth="1.5"
                strokeDasharray="4 3"
                fill="none"
              />
              <polygon
                points="137,86 143,90 137,94"
                fill="rgba(245,158,11,0.7)"
              />
              {/* Transfer destination box */}
              <rect
                x="143"
                y="74"
                width="90"
                height="28"
                rx="5"
                fill="rgba(245,158,11,0.12)"
                stroke="rgba(245,158,11,0.5)"
                strokeWidth="1"
              />
              <text
                x="153"
                y="85"
                fontSize="8"
                fontWeight="700"
                fill="rgba(245,158,11,0.9)"
                fontFamily="system-ui"
              >
                Transfer
              </text>
              <text
                x="153"
                y="96"
                fontSize="8"
                fill="rgba(30,41,59,0.7)"
                fontFamily="system-ui"
              >
                votes to #2
              </text>
            </g>

            {/* Label */}
            <text
              x="8"
              y="192"
              fontSize="8.5"
              fill="rgba(100,116,139,0.9)"
              fontFamily="system-ui"
            >
              Lowest film eliminated each round until 50%+ reached
            </text>
          </svg>
        </div>
      </div>

      {/* Plurality diagram */}
      <div
        className="rounded-xl overflow-hidden"
        style={{
          background: "var(--bg-card)",
          border: "1px solid var(--border)",
        }}
      >
        <div
          className="px-4 py-2.5 border-b"
          style={{
            borderColor: "var(--border)",
            background: "color-mix(in srgb, var(--accent-amber) 5%, var(--bg-card))",
          }}
        >
          <span
            className="text-xs font-semibold tracking-widest uppercase"
            style={{ color: "var(--accent-amber)" }}
          >
            Plurality — All Other Finals
          </span>
        </div>
        <div className="p-4">
          <svg
            viewBox="0 0 240 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            aria-label="Plurality voting diagram showing single checkmark vote"
            role="img"
          >
            {/* Three voter circles */}
            {[30, 90, 150].map((cx, i) => (
              <g key={i}>
                <circle
                  cx={cx}
                  cy="35"
                  r="18"
                  fill="rgba(100,116,139,0.1)"
                  stroke="rgba(100,116,139,0.4)"
                  strokeWidth="1"
                />
                {/* Person icon */}
                <circle cx={cx} cy="28" r="5" fill="rgba(100,116,139,0.5)" />
                <path
                  d={`M${cx - 8} 45 Q${cx} 35 ${cx + 8} 45`}
                  stroke="rgba(100,116,139,0.5)"
                  strokeWidth="1.5"
                  fill="none"
                />
                {/* Checkmark on each voter */}
                <text
                  x={cx + 10}
                  y="24"
                  fontSize="12"
                  fill="rgba(245,158,11,0.9)"
                  fontFamily="system-ui"
                >
                  ✓
                </text>
                {/* Arrow down */}
                <line
                  x1={cx}
                  y1="55"
                  x2={cx}
                  y2="68"
                  stroke="rgba(100,116,139,0.4)"
                  strokeWidth="1"
                  strokeDasharray="3 2"
                />
              </g>
            ))}

            {/* Result box */}
            <rect
              x="10"
              y="70"
              width="160"
              height="22"
              rx="5"
              fill="rgba(245,158,11,0.1)"
              stroke="rgba(245,158,11,0.45)"
              strokeWidth="1"
            />
            <text
              x="90"
              y="85"
              fontSize="9"
              fontWeight="700"
              fill="rgba(245,158,11,0.9)"
              fontFamily="system-ui"
              textAnchor="middle"
            >
              Most votes wins — one round
            </text>

            {/* "1 vote each" label */}
            <text
              x="188"
              y="38"
              fontSize="8.5"
              fill="rgba(100,116,139,0.8)"
              fontFamily="system-ui"
            >
              1 vote
            </text>
            <text
              x="188"
              y="49"
              fontSize="8.5"
              fill="rgba(100,116,139,0.8)"
              fontFamily="system-ui"
            >
              each
            </text>
          </svg>
        </div>
      </div>

      {/* "Why does this matter" callout */}
      <div
        className="rounded-xl p-4"
        style={{
          background: "color-mix(in srgb, var(--accent-amber) 5%, var(--bg-secondary))",
          border: "1px solid color-mix(in srgb, var(--accent-amber) 20%, var(--border))",
        }}
      >
        <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          <strong style={{ color: "var(--text-primary)" }}>Why does this matter?</strong>{" "}
          A film can win Best Director, Best Editing, AND Best Screenplay in
          plurality — while losing Best Picture in STV to a different film that
          was everyone&apos;s #2.
        </p>
      </div>
    </div>
  );
}

// ─── PluralitySection ─────────────────────────────────────────────────────────

export default function PluralitySection() {
  return (
    <SectionWrapper id="plurality" layout="split-right">
      {/* ── Left column (3fr) ── */}
      <div className="flex flex-col gap-6">
        {/* Section number divider */}
        <div className="section-number-divider">
          <span className="section-number-badge" aria-label="Section 04">
            04
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-3xl sm:text-4xl font-extrabold leading-tight tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Two Voting Systems in One Show
        </h2>

        {/* Body */}
        <p
          className="text-base sm:text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          The Oscars use two completely different voting methods depending on the
          category. Understanding the difference explains a lot about which films
          win.
        </p>

        {/* Comparison card */}
        <ComparisonCard />
      </div>

      {/* ── Right column (2fr) ── */}
      <div className="flex flex-col gap-5 lg:pt-16">
        <VotingDiagram />
      </div>
    </SectionWrapper>
  );
}
