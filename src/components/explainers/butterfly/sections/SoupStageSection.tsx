"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

type ViewMode = "caterpillar" | "soup";

// Imaginal disc definitions — position is relative to the chrysalis viewBox (0 0 600 400)
const IMAGINAL_DISCS = [
  // Wing discs — two pairs flanking the thorax
  { id: "wing-l1", cx: 172, cy: 188, r: 10, label: "Wing disc (fore)", labelX: 92, labelY: 172, side: "left" },
  { id: "wing-r1", cx: 428, cy: 188, r: 10, label: "Wing disc (fore)", labelX: 468, labelY: 172, side: "right" },
  { id: "wing-l2", cx: 185, cy: 222, r: 9,  label: "Wing disc (hind)", labelX: 92, labelY: 238, side: "left" },
  { id: "wing-r2", cx: 415, cy: 222, r: 9,  label: "Wing disc (hind)", labelX: 468, labelY: 238, side: "right" },
  // Eye discs — near head zone
  { id: "eye-l",   cx: 247, cy: 148, r: 7,  label: "Eye disc",         labelX: 190, labelY: 130, side: "left" },
  { id: "eye-r",   cx: 353, cy: 148, r: 7,  label: "Eye disc",         labelX: 382, labelY: 130, side: "right" },
  // Antenna discs — close to eye discs
  { id: "ant-l",   cx: 265, cy: 133, r: 5,  label: "Antenna disc",     labelX: 190, labelY: 112, side: "left" },
  { id: "ant-r",   cx: 335, cy: 133, r: 5,  label: "Antenna disc",     labelX: 382, labelY: 112, side: "right" },
  // Leg discs — three pairs along ventral midline
  { id: "leg-l1",  cx: 253, cy: 260, r: 6,  label: "Leg disc (1)",     labelX: 190, labelY: 268, side: "left" },
  { id: "leg-r1",  cx: 347, cy: 260, r: 6,  label: "Leg disc (1)",     labelX: 382, labelY: 268, side: "right" },
  { id: "leg-l2",  cx: 258, cy: 282, r: 6,  label: "Leg disc (2)",     labelX: 190, labelY: 296, side: "left" },
  { id: "leg-r2",  cx: 342, cy: 282, r: 6,  label: "Leg disc (2)",     labelX: 382, labelY: 296, side: "right" },
  { id: "leg-l3",  cx: 262, cy: 304, r: 6,  label: "Leg disc (3)",     labelX: 190, labelY: 320, side: "left" },
  { id: "leg-r3",  cx: 338, cy: 304, r: 6,  label: "Leg disc (3)",     labelX: 382, labelY: 320, side: "right" },
];

// Floating soup particles — random-ish positions inside chrysalis
const SOUP_PARTICLES = [
  { cx: 230, cy: 195 }, { cx: 310, cy: 175 }, { cx: 370, cy: 210 },
  { cx: 285, cy: 245 }, { cx: 340, cy: 260 }, { cx: 255, cy: 305 },
  { cx: 325, cy: 290 }, { cx: 295, cy: 170 }, { cx: 360, cy: 305 },
  { cx: 240, cy: 270 }, { cx: 380, cy: 245 }, { cx: 220, cy: 235 },
  { cx: 395, cy: 285 }, { cx: 270, cy: 195 }, { cx: 345, cy: 185 },
  { cx: 305, cy: 330 }, { cx: 265, cy: 345 }, { cx: 340, cy: 345 },
  { cx: 215, cy: 310 }, { cx: 405, cy: 310 }, { cx: 300, cy: 215 },
];

export default function SoupStageSection() {
  const [viewMode, setViewMode] = useState<ViewMode>("caterpillar");
  const isSoup = viewMode === "soup";

  return (
    <SectionWrapper id="soup-stage" layout="full-bleed" stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-warm-amber">
        Stage 4 — The Dissolution
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Soup Stage
      </h2>

      {/* ── Star diagram ── */}
      <div className="mt-8 max-w-2xl mx-auto">
        {/* Toggle button */}
        <div className="flex items-center justify-center gap-2 mb-4">
          <button
            onClick={() => setViewMode("caterpillar")}
            aria-pressed={!isSoup}
            className="px-4 py-2 rounded-lg font-mono text-xs font-medium uppercase tracking-widest transition-all duration-300"
            style={{
              backgroundColor: !isSoup ? "var(--forest-green)" : "var(--bg-secondary)",
              color: !isSoup ? "#fff" : "var(--text-secondary)",
              border: "1px solid",
              borderColor: !isSoup ? "var(--forest-green)" : "var(--border)",
            }}
          >
            Caterpillar view
          </button>
          <button
            onClick={() => setViewMode("soup")}
            aria-pressed={isSoup}
            className="px-4 py-2 rounded-lg font-mono text-xs font-medium uppercase tracking-widest transition-all duration-300"
            style={{
              backgroundColor: isSoup ? "var(--warm-amber)" : "var(--bg-secondary)",
              color: isSoup ? "#fff" : "var(--text-secondary)",
              border: "1px solid",
              borderColor: isSoup ? "var(--warm-amber)" : "var(--border)",
            }}
          >
            Soup view
          </button>
        </div>

        {/* Chrysalis cross-section SVG */}
        <div
          className="rounded-2xl border overflow-hidden"
          style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
        >
          <svg
            viewBox="0 0 600 420"
            width="100%"
            role="img"
            aria-label={isSoup ? "Chrysalis cross-section: soup stage with imaginal discs" : "Chrysalis cross-section: caterpillar with hidden imaginal discs"}
            style={{ fontFamily: "system-ui, -apple-system, sans-serif", display: "block" }}
          >
            <title>
              {isSoup
                ? "Chrysalis cross-section showing dissolved soup and surviving imaginal discs"
                : "Chrysalis cross-section showing intact caterpillar with faint imaginal disc locations"}
            </title>

            {/* ── Gradient defs ── */}
            <defs>
              {/* Amber soup gradient */}
              <radialGradient id="soupGrad" cx="50%" cy="45%" r="52%">
                <stop offset="0%"   stopColor="var(--warm-amber)" stopOpacity="0.55" />
                <stop offset="60%"  stopColor="var(--warm-amber)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--golden)"     stopOpacity="0.18" />
              </radialGradient>

              {/* Caterpillar body gradient */}
              <linearGradient id="catGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%"   stopColor="var(--forest-green)" stopOpacity="0.75" />
                <stop offset="100%" stopColor="var(--forest-green)" stopOpacity="0.45" />
              </linearGradient>

              {/* Chrysalis shell gradient */}
              <linearGradient id="shellGrad" x1="0" y1="0" x2="0.3" y2="1">
                <stop offset="0%"   stopColor="var(--forest-green)" stopOpacity="0.28" />
                <stop offset="100%" stopColor="var(--forest-green)" stopOpacity="0.14" />
              </linearGradient>

              {/* Disc glow filter */}
              <filter id="discGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* Shell texture filter */}
              <filter id="roughen">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" seed="3" />
                <feDisplacementMap in="SourceGraphic" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* ── Background fill ── */}
            <rect width="600" height="420" fill="var(--bg-card)" />

            {/* ── Chrysalis outer shell — rough texture path ── */}
            {/* Smooth base shell */}
            <ellipse
              cx="300" cy="250"
              rx="180" ry="145"
              fill="url(#shellGrad)"
              stroke="var(--forest-green)"
              strokeWidth="2.5"
              strokeOpacity="0.6"
            />
            {/* Texture overlay — slightly wobbly second path */}
            <ellipse
              cx="300" cy="250"
              rx="182" ry="147"
              fill="none"
              stroke="var(--forest-green)"
              strokeWidth="1"
              strokeOpacity="0.18"
              filter="url(#roughen)"
            />
            {/* Chrysalis tip at top */}
            <path
              d="M 285 105 Q 300 90 315 105 L 310 118 Q 300 112 290 118 Z"
              fill="var(--forest-green)"
              fillOpacity="0.45"
              stroke="var(--forest-green)"
              strokeWidth="1.5"
              strokeOpacity="0.6"
            />
            {/* Chrysalis attachment thread */}
            <line x1="300" y1="90" x2="300" y2="50" stroke="var(--forest-green)" strokeWidth="1.5" strokeOpacity="0.5" />
            {/* Attachment pad */}
            <ellipse cx="300" cy="48" rx="18" ry="5" fill="var(--forest-green)" fillOpacity="0.35" stroke="var(--forest-green)" strokeWidth="1" strokeOpacity="0.5" />

            {/* ── Gold accent ridge lines on shell ── */}
            {[0, 1, 2].map((i) => (
              <ellipse
                key={i}
                cx="300"
                cy="250"
                rx={155 - i * 22}
                ry={122 - i * 17}
                fill="none"
                stroke="var(--golden)"
                strokeWidth="0.75"
                strokeOpacity="0.2"
                strokeDasharray="6 4"
              />
            ))}

            {/* ══════════════════════════════════════
                CATERPILLAR VIEW
                ══════════════════════════════════════ */}
            <g
              style={{
                opacity: isSoup ? 0 : 1,
                transition: "opacity 0.6s ease-in-out",
                pointerEvents: isSoup ? "none" : "auto",
              }}
            >
              {/* Caterpillar body — segmented oval */}
              <ellipse
                cx="300" cy="255"
                rx="130" ry="105"
                fill="url(#catGrad)"
                stroke="var(--forest-green)"
                strokeWidth="1.5"
                strokeOpacity="0.4"
              />
              {/* Segment lines */}
              {[-60, -30, 0, 30, 60].map((offset, i) => (
                <ellipse
                  key={i}
                  cx="300"
                  cy={255 + offset * 0.2}
                  rx={128 - Math.abs(offset) * 0.4}
                  ry="5"
                  fill="none"
                  stroke="var(--forest-green)"
                  strokeWidth="1"
                  strokeOpacity="0.3"
                />
              ))}
              {/* Caterpillar head zone label */}
              <text
                x="300" y="168"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontWeight="500"
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{ opacity: 0.7 }}
              >
                Head zone
              </text>
              <text
                x="300" y="345"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontWeight="500"
                fontFamily="system-ui, -apple-system, sans-serif"
                style={{ opacity: 0.7 }}
              >
                Tail zone
              </text>
              {/* Faint imaginal disc locations in caterpillar view */}
              {IMAGINAL_DISCS.map((d) => (
                <circle
                  key={d.id}
                  cx={d.cx} cy={d.cy} r={d.r}
                  fill="var(--warm-amber)"
                  fillOpacity="0.22"
                  stroke="var(--warm-amber)"
                  strokeWidth="1"
                  strokeOpacity="0.35"
                />
              ))}
              {/* Caterpillar legend */}
              <g transform="translate(300, 395)">
                <circle cx="-10" cy="0" r="5" fill="var(--warm-amber)" fillOpacity="0.3" stroke="var(--warm-amber)" strokeWidth="1" strokeOpacity="0.5" />
                <text x="4" y="4" fill="var(--text-tertiary)" fontSize="11" fontFamily="system-ui, -apple-system, sans-serif">
                  Imaginal discs (dormant)
                </text>
              </g>
            </g>

            {/* ══════════════════════════════════════
                SOUP VIEW
                ══════════════════════════════════════ */}
            <g
              style={{
                opacity: isSoup ? 1 : 0,
                transition: "opacity 0.6s ease-in-out",
                pointerEvents: isSoup ? "auto" : "none",
              }}
            >
              {/* Amber liquid soup fill */}
              <ellipse
                cx="300" cy="250"
                rx="172" ry="137"
                fill="url(#soupGrad)"
              />

              {/* Dissolved caterpillar dashed ghost outline */}
              <ellipse
                cx="300" cy="255"
                rx="130" ry="105"
                fill="none"
                stroke="var(--forest-green)"
                strokeWidth="1.5"
                strokeOpacity="0.2"
                strokeDasharray="6 5"
              />

              {/* Floating soup particles */}
              {SOUP_PARTICLES.map((p, i) => (
                <circle
                  key={i}
                  cx={p.cx} cy={p.cy}
                  r={1.5 + (i % 3) * 0.8}
                  fill="var(--warm-amber)"
                  fillOpacity={0.55 + (i % 4) * 0.1}
                  style={{
                    animation: `pulse-glow ${2.2 + (i % 5) * 0.4}s ease-in-out infinite`,
                    animationDelay: `${(i * 0.13) % 2}s`,
                  }}
                />
              ))}

              {/* ── Imaginal discs — labeled ── */}
              {IMAGINAL_DISCS.map((d) => {
                const isLeft = d.side === "left";
                return (
                  <g key={d.id} filter="url(#discGlow)">
                    {/* Disc glow halo */}
                    <circle
                      cx={d.cx} cy={d.cy}
                      r={d.r + 5}
                      fill="var(--warm-amber)"
                      fillOpacity="0.18"
                    />
                    {/* Disc body */}
                    <circle
                      cx={d.cx} cy={d.cy}
                      r={d.r}
                      fill="var(--warm-amber)"
                      fillOpacity="0.9"
                      stroke="var(--golden)"
                      strokeWidth="1.5"
                    />
                    {/* Disc inner dot */}
                    <circle
                      cx={d.cx} cy={d.cy}
                      r={d.r * 0.38}
                      fill="var(--golden)"
                      fillOpacity="0.85"
                    />
                    {/* Leader line to label */}
                    <line
                      x1={d.cx}
                      y1={d.cy}
                      x2={isLeft ? d.cx - 12 : d.cx + 12}
                      y2={d.labelY + 4}
                      stroke="var(--text-tertiary)"
                      strokeWidth="1"
                      strokeOpacity="0.55"
                    />
                    <line
                      x1={isLeft ? d.cx - 12 : d.cx + 12}
                      y1={d.labelY + 4}
                      x2={d.labelX + (isLeft ? 52 : -4)}
                      y2={d.labelY + 4}
                      stroke="var(--text-tertiary)"
                      strokeWidth="1"
                      strokeOpacity="0.55"
                    />
                    {/* Label text */}
                    <text
                      x={d.labelX + (isLeft ? 0 : 0)}
                      y={d.labelY + 4}
                      textAnchor={isLeft ? "end" : "start"}
                      fill="var(--text-secondary)"
                      fontSize="11"
                      fontWeight="500"
                      fontFamily="system-ui, -apple-system, sans-serif"
                    >
                      {d.label}
                    </text>
                  </g>
                );
              })}

              {/* Zone annotation: "Proteinaceous soup" */}
              <rect
                x="224" y="204"
                width="152" height="22"
                rx="6"
                fill="var(--bg-card)"
                fillOpacity="0.75"
                stroke="var(--border)"
                strokeWidth="1"
              />
              <text
                x="300" y="219"
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="11"
                fontWeight="500"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Proteinaceous soup
              </text>

              {/* Dashed ghost annotation */}
              <text
                x="300" y="395"
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="system-ui, -apple-system, sans-serif"
              >
                Dashed line = former caterpillar boundary
              </text>
            </g>

            {/* ── Always-visible chrysalis label ── */}
            <text
              x="300" y="34"
              textAnchor="middle"
              fill="var(--text-secondary)"
              fontSize="13"
              fontWeight="600"
              fontFamily="system-ui, -apple-system, sans-serif"
              letterSpacing="0.03em"
            >
              Chrysalis cross-section
            </text>
          </svg>
        </div>

        {/* View label below diagram */}
        <p
          className="mt-2 text-center font-mono text-xs tracking-widest uppercase transition-all duration-300"
          style={{ color: isSoup ? "var(--warm-amber)" : "var(--forest-green)" }}
        >
          {isSoup ? "Soup view — dissolved state, imaginal discs active" : "Caterpillar view — imaginal discs dormant, awaiting signal"}
        </p>
      </div>

      {/* ── Two-column text + stats ── */}
      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
        {/* Left — what happens */}
        <div>
          <p className="font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
            Inside the sealed chrysalis, something extraordinary happens. The caterpillar
            releases{" "}
            <JargonTerm
              term="proteolytic enzymes"
              definition="Enzymes that break down proteins. Inside the chrysalis, the caterpillar uses these to dissolve its own muscles, organs, and tissues into a nutrient-rich liquid soup."
            />{" "}
            that dissolve <strong className="text-text-primary">most of its own body</strong>.
            Muscles, organs, and larval tissues break down into a cellular broth.
          </p>

          <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
            This isn&rsquo;t chaos — it&rsquo;s controlled demolition. What appears to be
            destruction is actually the delivery of raw materials: amino acids, lipids, and
            cellular components that will be repurposed for building an entirely new organism.
          </p>

          {/* Pull quote */}
          <blockquote className="pull-quote mt-8">
            The chrysalis isn&rsquo;t a cocoon of sleep. It&rsquo;s an active manufacturing
            facility running at full capacity.
          </blockquote>
        </div>

        {/* Right — what survives */}
        <div>
          <div
            className="rounded-2xl border p-6"
            style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
          >
            <p className="font-mono text-xs font-medium uppercase tracking-widest text-forest-green">
              What survives the soup
            </p>
            <h3 className="mt-3 font-serif text-xl font-bold text-text-primary">
              Imaginal Discs
            </h3>
            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
              Scattered throughout the caterpillar&rsquo;s body are clusters of cells that
              resist the dissolving enzymes completely. These are{" "}
              <JargonTerm
                term="imaginal discs"
                definition="Small, disc-shaped clusters of cells in the caterpillar body. They are programmed from the egg stage to become specific adult butterfly body parts. They survive dissolution and use the soup as building material."
              />
              {" "}— the blueprint cells.
            </p>

            <div className="mt-5 space-y-3">
              {[
                { label: "~16,000", desc: "imaginal disc cells survive dissolution", source: "Nature Reviews" },
                { label: "0", desc: "caterpillar muscles survive intact", source: "developmental biology research" },
                { label: "Some", desc: "neural connections persist, enabling memory retention", source: "Georgetown Univ. 2008" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4 rounded-lg p-3"
                  style={{ backgroundColor: "var(--bg-secondary)" }}
                >
                  <span
                    className="font-mono text-xl font-bold"
                    style={{ color: "var(--forest-green)" }}
                  >
                    {item.label}
                  </span>
                  <div>
                    <p className="font-sans text-sm text-text-secondary">{item.desc}</p>
                    <p className="font-mono text-xs text-text-tertiary">Source: {item.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
