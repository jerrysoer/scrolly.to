"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { impactScenarios } from "@/lib/explainers/extinction";

export default function WhatIfItMissedSection() {
  const [scenario, setScenario] = useState<"land" | "ocean">("land");
  const data = impactScenarios[scenario];

  return (
    <SectionWrapper id="what-if-it-missed" className="section-tinted">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 8
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        What If It Missed?
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        The asteroid struck a sulfur-rich continental shelf. If it had arrived
        just 30 minutes later, Earth&rsquo;s rotation would have placed deep
        Atlantic ocean in the impact zone. Everything would be different.
      </p>

      {/* Toggle */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => setScenario("land")}
          className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
            scenario === "land"
              ? "bg-firestorm-hot text-white"
              : "bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
        >
          Hits Land
        </button>
        <button
          onClick={() => setScenario("ocean")}
          className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
            scenario === "ocean"
              ? "bg-winter-blue text-white"
              : "bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
        >
          Hits Ocean (30 Min Later)
        </button>
      </div>

      {/* Scenario card */}
      <div className="mt-10 mx-auto max-w-2xl">
        <div
          className="rounded-2xl border bg-bg-card p-8 transition-all duration-500"
          style={{
            borderColor:
              scenario === "land" ? "var(--firestorm-hot)" : "var(--winter-blue)",
          }}
        >
          {/* Impact visualization */}
          <div className="mb-6 flex justify-center">
            <svg viewBox="0 0 200 100" className="w-full max-w-xs">
              {scenario === "land" ? (
                <>
                  {/* Land surface */}
                  <rect x="0" y="60" width="200" height="40" fill="var(--firestorm)" opacity="0.2" />
                  <path d="M0 60 Q50 55 100 60 Q150 65 200 60" fill="none" stroke="var(--firestorm)" strokeWidth="1.5" />
                  {/* Sulfur clouds rising */}
                  {[40, 80, 120, 160].map((x) => (
                    <ellipse
                      key={x}
                      cx={x}
                      cy={30 + Math.random() * 10}
                      rx="20"
                      ry="12"
                      fill="var(--firestorm)"
                      opacity="0.15"
                    />
                  ))}
                  {/* Impact point */}
                  <circle cx="100" cy="60" r="8" fill="var(--firestorm-hot)" opacity="0.8" />
                  <circle cx="100" cy="60" r="15" fill="none" stroke="var(--firestorm-hot)" strokeWidth="1" opacity="0.4" />
                  {/* Debris ejection lines */}
                  {[30, 60, 120, 150, 170].map((angle) => (
                    <line
                      key={angle}
                      x1="100"
                      y1="60"
                      x2={100 + 40 * Math.cos((angle * Math.PI) / 180)}
                      y2={60 - 30 * Math.sin((angle * Math.PI) / 180)}
                      stroke="var(--firestorm-hot)"
                      strokeWidth="1"
                      opacity="0.5"
                    />
                  ))}
                  <text x="100" y="95" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-jetbrains)">
                    Sulfur-rich continental shelf
                  </text>
                </>
              ) : (
                <>
                  {/* Ocean */}
                  <rect x="0" y="40" width="200" height="60" fill="var(--winter-blue)" opacity="0.15" />
                  {/* Ocean waves */}
                  <path d="M0 40 Q25 35 50 40 Q75 45 100 40 Q125 35 150 40 Q175 45 200 40" fill="none" stroke="var(--winter-blue)" strokeWidth="1.5" />
                  <path d="M0 50 Q25 45 50 50 Q75 55 100 50 Q125 45 150 50 Q175 55 200 50" fill="none" stroke="var(--winter-blue)" strokeWidth="0.8" opacity="0.4" />
                  {/* Impact point underwater */}
                  <circle cx="100" cy="60" r="6" fill="var(--winter-blue)" opacity="0.6" />
                  <circle cx="100" cy="60" r="12" fill="none" stroke="var(--winter-blue)" strokeWidth="1" opacity="0.3" />
                  {/* Tsunami waves spreading */}
                  {[20, 35, 50].map((r) => (
                    <ellipse
                      key={r}
                      cx="100"
                      cy="50"
                      rx={r}
                      ry={r * 0.3}
                      fill="none"
                      stroke="var(--winter-blue)"
                      strokeWidth="0.8"
                      opacity={0.5 - r * 0.008}
                    />
                  ))}
                  {/* Small water splash */}
                  <path d="M95 35 Q100 20 105 35" fill="none" stroke="var(--winter-blue)" strokeWidth="1" opacity="0.5" />
                  <text x="100" y="95" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9" fontFamily="var(--font-jetbrains)">
                    Deep Atlantic ocean
                  </text>
                </>
              )}
            </svg>
          </div>

          <h3
            className="font-serif text-xl font-bold"
            style={{
              color:
                scenario === "land"
                  ? "var(--firestorm-hot)"
                  : "var(--winter-blue)",
            }}
          >
            {data.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-text-secondary">
            {data.description}
          </p>

          <ul className="mt-4 space-y-2">
            {data.consequences.map((c, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-text-secondary">
                <span
                  className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{
                    backgroundColor:
                      scenario === "land"
                        ? "var(--firestorm-hot)"
                        : "var(--winter-blue)",
                  }}
                />
                {c}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Timing callout */}
      <div className="mt-8 mx-auto max-w-lg rounded-lg bg-bg-secondary p-4 text-center">
        <p className="font-mono text-3xl font-bold text-firestorm">
          30 minutes
        </p>
        <p className="mt-1 text-sm text-text-secondary">
          The difference between human existence and a world still ruled by
          dinosaurs.
        </p>
      </div>
    </SectionWrapper>
  );
}
