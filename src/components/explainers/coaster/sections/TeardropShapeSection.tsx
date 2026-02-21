"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function TeardropShapeSection() {
  const [activeLoop, setActiveLoop] = useState<"circular" | "clothoid">("clothoid");

  return (
    <SectionWrapper id="teardrop-shape" layout="full-bleed">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 06
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Teardrop Shape
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          Early loop designs were perfect circles. The problem? A circular loop
          creates brutal g-forces at the bottom (&sim;6g) and near-weightlessness at
          the top. The breakthrough was the{" "}
          <JargonTerm
            term="clothoid loop"
            definition="A loop shape where the radius gradually decreases toward the top. This produces a teardrop shape that keeps g-forces within comfortable limits throughout."
          />{" "}
          &mdash; a teardrop that keeps g-forces smooth all the way around.
        </p>

        {/* Toggle */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setActiveLoop("circular")}
            className={`rounded-lg px-5 py-2.5 font-mono text-sm font-medium transition-all ${
              activeLoop === "circular"
                ? "bg-force-red text-white"
                : "bg-bg-secondary text-text-secondary hover:bg-bg-card"
            }`}
          >
            Circular Loop
          </button>
          <button
            onClick={() => setActiveLoop("clothoid")}
            className={`rounded-lg px-5 py-2.5 font-mono text-sm font-medium transition-all ${
              activeLoop === "clothoid"
                ? "bg-potential text-white"
                : "bg-bg-secondary text-text-secondary hover:bg-bg-card"
            }`}
          >
            Clothoid (Teardrop)
          </button>
        </div>

        {/* Side-by-side comparison */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* Circular loop */}
          <div
            className={`rounded-xl border p-6 transition-all ${
              activeLoop === "circular" ? "border-force-red bg-bg-card" : "border-border bg-bg-secondary opacity-60"
            }`}
          >
            <h3 className="font-mono text-sm font-bold text-force-red mb-4">Circular Loop</h3>
            <svg viewBox="0 0 240 280" className="w-full mb-4" aria-label="Circular loop with g-force markers">
              {/* Circle */}
              <circle cx="120" cy="130" r="90" stroke="var(--force-red)" strokeWidth="2.5" fill="none" />
              {/* Entry/exit track */}
              <line x1="30" y1="220" x2="120" y2="220" stroke="var(--text-tertiary)" strokeWidth="2" />
              <line x1="120" y1="220" x2="210" y2="220" stroke="var(--text-tertiary)" strokeWidth="2" />

              {/* G-force labels */}
              <rect x="85" y="246" width="70" height="20" rx="4" fill="var(--force-red)" opacity="0.15" />
              <text x="120" y="260" textAnchor="middle" fill="var(--force-red)" fontSize="11" fontFamily="var(--font-jetbrains)" fontWeight="bold">~6g bottom</text>

              <rect x="85" y="18" width="70" height="20" rx="4" fill="var(--potential)" opacity="0.15" />
              <text x="120" y="32" textAnchor="middle" fill="var(--potential)" fontSize="11" fontFamily="var(--font-jetbrains)" fontWeight="bold">~0g top</text>

              {/* Radius lines */}
              <line x1="120" y1="130" x2="120" y2="40" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
              <line x1="120" y1="130" x2="120" y2="220" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
              <text x="132" y="130" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-jetbrains)">same r</text>
            </svg>
            <p className="font-sans text-sm text-text-secondary">
              Same radius everywhere means extreme g-force variation. Riders blacked
              out on early designs.
            </p>
          </div>

          {/* Clothoid loop */}
          <div
            className={`rounded-xl border p-6 transition-all ${
              activeLoop === "clothoid" ? "border-potential bg-bg-card" : "border-border bg-bg-secondary opacity-60"
            }`}
          >
            <h3 className="font-mono text-sm font-bold text-potential mb-4">Clothoid (Teardrop)</h3>
            <svg viewBox="0 0 240 280" className="w-full mb-4" aria-label="Clothoid teardrop loop with g-force markers">
              {/* Teardrop shape */}
              <path
                d="M120 220 Q40 220 50 140 Q55 90 80 60 Q100 35 120 30 Q140 35 160 60 Q185 90 190 140 Q200 220 120 220"
                stroke="var(--potential)"
                strokeWidth="2.5"
                fill="none"
              />
              {/* Entry/exit track */}
              <line x1="30" y1="220" x2="120" y2="220" stroke="var(--text-tertiary)" strokeWidth="2" />
              <line x1="120" y1="220" x2="210" y2="220" stroke="var(--text-tertiary)" strokeWidth="2" />

              {/* G-force labels */}
              <rect x="75" y="246" width="90" height="20" rx="4" fill="var(--potential)" opacity="0.15" />
              <text x="120" y="260" textAnchor="middle" fill="var(--potential)" fontSize="11" fontFamily="var(--font-jetbrains)" fontWeight="bold">~3.5g bottom</text>

              <rect x="80" y="8" width="80" height="20" rx="4" fill="var(--potential)" opacity="0.15" />
              <text x="120" y="22" textAnchor="middle" fill="var(--potential)" fontSize="11" fontFamily="var(--font-jetbrains)" fontWeight="bold">~1.5g top</text>

              {/* Varying radius indicators */}
              <line x1="120" y1="125" x2="120" y2="30" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
              <text x="132" y="70" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-jetbrains)">small r</text>
              <line x1="120" y1="170" x2="55" y2="140" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
              <text x="68" y="170" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-jetbrains)">large r</text>
            </svg>
            <p className="font-sans text-sm text-text-secondary">
              Smaller radius at the top (where speed is lowest) and larger radius at
              the bottom (where speed is highest) keeps g-forces between 3&ndash;4g
              throughout.
            </p>
          </div>
        </div>

        <div className="pull-quote max-w-2xl">
          The teardrop shape was the breakthrough that made modern coasters possible.
          Before it, loops were a medical liability.
        </div>
      </div>
    </SectionWrapper>
  );
}
