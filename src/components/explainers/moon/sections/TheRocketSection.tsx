"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { missionStack } from "@/lib/explainers/moon";

export default function TheRocketSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <SectionWrapper id="the-rocket" layout="centered" stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 6
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Hardware Stack
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Getting to the Moon takes a chain of vehicles, each handing off to the next.
        The Space Launch System is taller than the Statue of Liberty.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        {/* Rocket diagram */}
        <div className="flex justify-center">
          <svg viewBox="0 0 200 420" className="h-80 w-auto" aria-label="Artemis mission hardware stack">
            <title>SLS, Orion, Gateway, and Starship HLS</title>

            {/* SLS - bottom */}
            <g
              className="cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === 0 ? null : 0)}
              opacity={activeIndex === null || activeIndex === 0 ? 1 : 0.4}
            >
              <rect x="60" y="280" width="80" height="120" fill="var(--space-blue)" opacity="0.7" rx="6" />
              <rect x="55" y="380" width="90" height="20" fill="var(--space-blue)" opacity="0.5" rx="4" />
              {/* Boosters */}
              <rect x="35" y="310" width="20" height="90" fill="var(--amber)" opacity="0.5" rx="4" />
              <rect x="145" y="310" width="20" height="90" fill="var(--amber)" opacity="0.5" rx="4" />
              {/* Flames */}
              <ellipse cx="45" cy="405" rx="8" ry="12" fill="var(--amber)" opacity="0.3" />
              <ellipse cx="100" cy="408" rx="12" ry="15" fill="var(--amber)" opacity="0.3" />
              <ellipse cx="155" cy="405" rx="8" ry="12" fill="var(--amber)" opacity="0.3" />
              <text x="100" y="350" textAnchor="middle" fill="white" fontSize="12" fontFamily="var(--font-jetbrains)" fontWeight="bold">SLS</text>
            </g>

            {/* Orion - above SLS */}
            <g
              className="cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === 1 ? null : 1)}
              opacity={activeIndex === null || activeIndex === 1 ? 1 : 0.4}
            >
              <path d="M80 280 L100 240 L120 280 Z" fill="var(--amber)" opacity="0.7" />
              <rect x="82" y="258" width="36" height="22" fill="var(--amber)" opacity="0.6" rx="3" />
              <text x="100" y="274" textAnchor="middle" fill="white" fontSize="9" fontFamily="var(--font-jetbrains)" fontWeight="bold">ORION</text>
            </g>

            {/* Gateway - middle */}
            <g
              className="cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === 2 ? null : 2)}
              opacity={activeIndex === null || activeIndex === 2 ? 1 : 0.4}
            >
              <rect x="75" y="160" width="50" height="30" fill="var(--space-blue)" opacity="0.4" stroke="var(--space-blue)" strokeWidth="1" rx="4" />
              {/* Solar arrays */}
              <rect x="40" y="168" width="35" height="8" fill="var(--amber)" opacity="0.4" rx="2" />
              <rect x="125" y="168" width="35" height="8" fill="var(--amber)" opacity="0.4" rx="2" />
              <text x="100" y="180" textAnchor="middle" fill="var(--space-blue)" fontSize="8" fontFamily="var(--font-jetbrains)" fontWeight="bold">GATEWAY</text>
              {/* Orbit hint */}
              <ellipse cx="100" cy="175" rx="70" ry="20" fill="none" stroke="var(--space-blue)" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.3" />
            </g>

            {/* Starship HLS - top */}
            <g
              className="cursor-pointer"
              onClick={() => setActiveIndex(activeIndex === 3 ? null : 3)}
              opacity={activeIndex === null || activeIndex === 3 ? 1 : 0.4}
            >
              <rect x="78" y="60" width="44" height="70" fill="var(--success-green)" opacity="0.5" rx="6" />
              <path d="M78 60 L100 25 L122 60 Z" fill="var(--success-green)" opacity="0.6" />
              {/* Legs */}
              <line x1="78" y1="130" x2="68" y2="145" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              <line x1="122" y1="130" x2="132" y2="145" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              <text x="100" y="100" textAnchor="middle" fill="white" fontSize="8" fontFamily="var(--font-jetbrains)" fontWeight="bold">STARSHIP</text>
              <text x="100" y="112" textAnchor="middle" fill="white" fontSize="7" fontFamily="var(--font-jetbrains)">HLS</text>
            </g>

            {/* Connection arrows */}
            <path d="M100 240 L100 195" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" markerEnd="url(#arrowhead)" />
            <path d="M100 160 L100 135" stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" />

            <defs>
              <marker id="arrowhead" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                <path d="M0 0 L6 3 L0 6 Z" fill="var(--text-tertiary)" />
              </marker>
            </defs>
          </svg>
        </div>

        {/* Detail cards */}
        <div className="space-y-3">
          {missionStack.map((item, i) => (
            <button
              key={item.name}
              onClick={() => setActiveIndex(activeIndex === i ? null : i)}
              className={`w-full rounded-xl border p-5 text-left transition-all ${
                activeIndex === i
                  ? "border-space-blue/40 ring-2 ring-space-blue/20 bg-bg-card"
                  : "border-border bg-bg-card hover:border-space-blue/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className="block h-3 w-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="font-sans text-base font-semibold text-text-primary">
                  {item.name}
                </span>
                <span className="font-sans text-xs text-text-tertiary">
                  {item.role}
                </span>
              </div>
              {activeIndex === i && (
                <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
                  {item.detail}
                </p>
              )}
            </button>
          ))}

          {/* Statue of Liberty callout */}
          <div className="mt-4 rounded-lg border border-amber/30 bg-bg-secondary px-4 py-3">
            <p className="font-sans text-sm text-text-secondary">
              <span className="font-semibold text-amber">Fun fact:</span> SpaceX Starship
              is 397 feet tall &mdash; taller than the Statue of Liberty (305 ft including
              its pedestal).
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
