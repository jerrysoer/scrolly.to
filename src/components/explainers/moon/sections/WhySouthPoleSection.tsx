"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function WhySouthPoleSection() {
  return (
    <SectionWrapper id="why-south-pole" layout="split-right">
      {/* Left: SVG cross-section */}
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 320 320" className="h-72 w-auto sm:h-80" aria-label="Moon cross-section showing ice deposits at south pole">
          <title>Lunar south pole cross-section with ice deposits</title>
          <defs>
            <radialGradient id="moonCross" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="var(--text-tertiary)" stopOpacity="0.3" />
              <stop offset="70%" stopColor="var(--lunar-silver)" stopOpacity="0.2" />
              <stop offset="100%" stopColor="var(--lunar-silver)" stopOpacity="0.4" />
            </radialGradient>
            <linearGradient id="iceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--space-blue)" stopOpacity="0.8" />
              <stop offset="100%" stopColor="var(--space-blue)" stopOpacity="0.3" />
            </linearGradient>
          </defs>

          {/* Moon body */}
          <circle cx="160" cy="160" r="140" fill="url(#moonCross)" stroke="var(--lunar-silver)" strokeWidth="1.5" />

          {/* Internal layers hint */}
          <circle cx="160" cy="160" r="50" fill="var(--amber)" opacity="0.08" />
          <circle cx="160" cy="160" r="90" fill="none" stroke="var(--lunar-silver)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.3" />

          {/* Surface craters */}
          <ellipse cx="120" cy="60" rx="18" ry="5" fill="var(--text-tertiary)" opacity="0.2" />
          <ellipse cx="200" cy="50" rx="12" ry="4" fill="var(--text-tertiary)" opacity="0.15" />

          {/* South pole region highlight */}
          <path
            d="M100 280 Q130 260 160 270 Q190 260 220 280"
            fill="none"
            stroke="var(--space-blue)"
            strokeWidth="2"
            strokeDasharray="6 3"
          />

          {/* Permanently shadowed craters with ice */}
          <ellipse cx="130" cy="285" rx="20" ry="8" fill="var(--deep-space)" opacity="0.7" />
          <ellipse cx="130" cy="285" rx="14" ry="5" fill="url(#iceGrad)" />

          <ellipse cx="180" cy="278" rx="15" ry="6" fill="var(--deep-space)" opacity="0.7" />
          <ellipse cx="180" cy="278" rx="10" ry="4" fill="url(#iceGrad)" />

          <ellipse cx="155" cy="292" rx="12" ry="5" fill="var(--deep-space)" opacity="0.7" />
          <ellipse cx="155" cy="292" rx="8" ry="3" fill="url(#iceGrad)" />

          {/* Labels */}
          <text x="160" y="165" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)">CORE</text>
          <text x="160" y="245" textAnchor="middle" fill="var(--space-blue)" fontSize="10" fontFamily="var(--font-jetbrains)">SOUTH POLE</text>

          {/* Ice label with line */}
          <line x1="130" y1="285" x2="65" y2="260" stroke="var(--space-blue)" strokeWidth="1" opacity="0.6" />
          <text x="20" y="255" fill="var(--space-blue)" fontSize="9" fontFamily="var(--font-jetbrains)">WATER ICE</text>

          {/* Shadow label */}
          <line x1="180" y1="278" x2="250" y2="255" stroke="var(--text-tertiary)" strokeWidth="1" opacity="0.6" />
          <text x="252" y="250" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-jetbrains)">PERMANENT</text>
          <text x="252" y="260" fill="var(--text-tertiary)" fontSize="8" fontFamily="var(--font-jetbrains)">SHADOW</text>

          {/* Sun rays from top */}
          <g stroke="var(--amber)" strokeWidth="1" opacity="0.3">
            <line x1="100" y1="5" x2="110" y2="25" />
            <line x1="160" y1="0" x2="160" y2="20" />
            <line x1="220" y1="5" x2="210" y2="25" />
          </g>
          <text x="160" y="15" textAnchor="middle" fill="var(--amber)" fontSize="9" fontFamily="var(--font-jetbrains)" opacity="0.5">SUNLIGHT</text>
        </svg>
      </div>

      {/* Right: text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          Section 5
        </p>

        <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
          Why the South Pole?
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          The Moon&rsquo;s south pole has craters that haven&rsquo;t seen sunlight in
          billions of years. Inside those{" "}
          <JargonTerm
            term="permanently shadowed regions"
            definition="Areas in deep craters near the lunar poles that never receive direct sunlight due to the Moon's slight axial tilt (1.5 degrees). Temperatures can drop to -410 F (-246 C)."
          />
          , there&rsquo;s water ice.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          Water ice is everything. It&rsquo;s drinking water. Split it into hydrogen
          and oxygen, and you have breathable air and rocket fuel. The south pole
          isn&rsquo;t just a landing site &mdash; it&rsquo;s a{" "}
          <span className="font-semibold text-space-blue">gas station</span>.
        </p>

        {/* Callout card */}
        <div className="mt-8 rounded-xl border-2 border-space-blue/20 bg-bg-card p-6">
          <p className="font-mono text-sm font-semibold text-space-blue">
            Lunar ice = rocket fuel
          </p>
          <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
            Using{" "}
            <JargonTerm
              term="ISRU"
              definition="In-Situ Resource Utilization: using materials found at the destination (like lunar ice) instead of bringing everything from Earth."
            />
            {" "}to make fuel on the Moon could cut mission costs by up to{" "}
            <span className="font-semibold text-amber">80%</span>.
            Every kilogram you don&rsquo;t launch from Earth saves $10,000+.
          </p>
        </div>

        {/* India callout */}
        <div className="mt-4 rounded-lg border border-border bg-bg-secondary px-4 py-3">
          <p className="font-sans text-sm text-text-secondary">
            <span className="font-semibold text-amber">August 2023:</span> India&rsquo;s
            Chandrayaan-3 became the first mission to soft-land near the lunar south pole.
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
