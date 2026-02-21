"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function WhyYouDontFallSection() {
  const [fast, setFast] = useState(true);

  return (
    <SectionWrapper id="why-you-dont-fall" layout="full-bleed">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 03
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            Why You Don&rsquo;t Fall
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          At the top of a loop, gravity pulls you down. But if the car is moving
          fast enough,{" "}
          <JargonTerm
            term="centripetal acceleration"
            definition="The inward acceleration that keeps an object moving in a circle. For a roller coaster loop, it equals v squared divided by the radius."
          />{" "}
          pushes you into the seat harder than gravity pulls you out.
        </p>

        {/* Toggle between slow and fast */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => setFast(false)}
            className={`rounded-lg px-5 py-2.5 font-mono text-sm font-medium transition-all ${
              !fast
                ? "bg-force-red text-white"
                : "bg-bg-secondary text-text-secondary hover:bg-bg-card"
            }`}
          >
            Too Slow
          </button>
          <button
            onClick={() => setFast(true)}
            className={`rounded-lg px-5 py-2.5 font-mono text-sm font-medium transition-all ${
              fast
                ? "bg-potential text-white"
                : "bg-bg-secondary text-text-secondary hover:bg-bg-card"
            }`}
          >
            Fast Enough
          </button>
        </div>

        {/* Force diagram */}
        <div className="mx-auto max-w-lg">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <svg
              viewBox="0 0 400 400"
              className="w-full"
              aria-label={`Force diagram at top of loop: ${fast ? "fast enough - stay on track" : "too slow - fall off"}`}
            >
              {/* Loop circle */}
              <circle
                cx="200"
                cy="200"
                r="140"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="8 4"
                opacity="0.4"
              />

              {/* Track arc (top portion) */}
              <path
                d="M60 200 A140 140 0 0 1 340 200"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                fill="none"
              />

              {/* Car at the top */}
              <rect
                x="185"
                y="52"
                width="30"
                height="16"
                rx="4"
                fill="var(--kinetic)"
              />
              {/* Rider */}
              <circle cx="200" cy="48" r="6" fill="var(--text-tertiary)" />
              <line x1="200" y1="54" x2="200" y2="42" stroke="var(--text-tertiary)" strokeWidth="1.5" />

              {/* Gravity arrow (always down) */}
              <line
                x1="200"
                y1="80"
                x2="200"
                y2="140"
                stroke="var(--force-red)"
                strokeWidth="3"
                markerEnd="url(#arrowRed)"
              />
              <text x="215" y="115" fill="var(--force-red)" fontSize="13" fontFamily="var(--font-jetbrains)">
                Gravity
              </text>

              {/* Centripetal force arrow (toward center = down when at top) */}
              {fast && (
                <>
                  <line
                    x1="200"
                    y1="80"
                    x2="200"
                    y2="180"
                    stroke="var(--potential)"
                    strokeWidth="3"
                    markerEnd="url(#arrowBlue)"
                  />
                  <text x="130" y="145" fill="var(--potential)" fontSize="12" fontFamily="var(--font-jetbrains)">
                    Centripetal
                  </text>
                  <text x="140" y="160" fill="var(--potential)" fontSize="12" fontFamily="var(--font-jetbrains)">
                    force
                  </text>
                </>
              )}

              {/* Result indicator */}
              <rect
                x="120"
                y="260"
                width="160"
                height="40"
                rx="8"
                fill={fast ? "var(--potential)" : "var(--force-red)"}
                opacity="0.12"
              />
              <text
                x="200"
                y="285"
                textAnchor="middle"
                fill={fast ? "var(--potential)" : "var(--force-red)"}
                fontSize="14"
                fontFamily="var(--font-jetbrains)"
                fontWeight="bold"
              >
                {fast ? "v\u00B2 > g \u00D7 r \u2192 SAFE" : "v\u00B2 < g \u00D7 r \u2192 FALL"}
              </text>

              {/* Falling car indicator when slow */}
              {!fast && (
                <>
                  <line
                    x1="200"
                    y1="80"
                    x2="200"
                    y2="110"
                    stroke="var(--force-red)"
                    strokeWidth="2"
                    strokeDasharray="4 3"
                    opacity="0.6"
                  />
                  <rect
                    x="187"
                    y="115"
                    width="26"
                    height="14"
                    rx="3"
                    fill="var(--force-red)"
                    opacity="0.5"
                    style={{ animation: "float 1.5s ease-in-out infinite" }}
                  />
                </>
              )}

              {/* Arrow marker definitions */}
              <defs>
                <marker id="arrowRed" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0 0 L8 4 L0 8 Z" fill="var(--force-red)" />
                </marker>
                <marker id="arrowBlue" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
                  <path d="M0 0 L8 4 L0 8 Z" fill="var(--potential)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        <div className="pull-quote max-w-2xl">
          Speed creates a force that pushes harder than gravity pulls. Go fast
          enough and you&rsquo;re pressed into your seat &mdash; even upside down.
        </div>
      </div>
    </SectionWrapper>
  );
}
