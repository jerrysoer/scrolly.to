"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { artemisPhases } from "@/lib/explainers/moon";

export default function MeetArtemisSection() {
  const [activePhase, setActivePhase] = useState(0);
  const phase = artemisPhases[activePhase];

  return (
    <SectionWrapper id="meet-artemis" layout="full-bleed">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 4
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Meet Artemis
      </h2>

      <p className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        Named after Apollo&rsquo;s twin sister in Greek mythology, Artemis is NASA&rsquo;s
        program to return humans to the Moon &mdash; and this time, stay.
      </p>

      {/* Phase tabs */}
      <div className="mt-10 flex gap-2 rounded-lg border border-border bg-bg-secondary p-1">
        {artemisPhases.map((p, i) => (
          <button
            key={i}
            onClick={() => setActivePhase(i)}
            className={`flex-1 rounded-md px-4 py-3 font-sans text-sm font-medium transition-all ${
              activePhase === i
                ? "bg-space-blue text-white shadow-sm"
                : "text-text-secondary hover:text-text-primary"
            }`}
          >
            <span className="block font-mono text-xs opacity-70">Phase {p.phase}</span>
            <span className="block mt-0.5">{p.name}</span>
          </button>
        ))}
      </div>

      {/* Phase content */}
      <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <h3 className="font-serif text-2xl font-bold text-text-primary">
            {phase.title}
          </h3>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            {phase.description}
          </p>
          <ul className="mt-6 space-y-3">
            {phase.details.map((detail, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-1.5 block h-2 w-2 shrink-0 rounded-full bg-space-blue" />
                <span className="font-sans text-sm text-text-secondary">{detail}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Phase SVG illustration */}
        <div className="flex items-center justify-center">
          <svg viewBox="0 0 300 240" className="h-56 w-auto" aria-label={`Artemis Phase ${phase.phase} illustration`}>
            <title>{phase.title}</title>
            {/* Moon */}
            <circle cx="150" cy="200" r="120" fill="var(--lunar-silver)" opacity="0.15" />
            <path d="M30 200 Q150 160 270 200" fill="var(--lunar-silver)" opacity="0.2" />

            {activePhase === 0 && (
              <>
                {/* Orbit path */}
                <ellipse cx="150" cy="120" rx="120" ry="40" fill="none" stroke="var(--space-blue)" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.6" />
                {/* Orion capsule */}
                <g transform="translate(250, 108)">
                  <ellipse cx="0" cy="0" rx="12" ry="8" fill="var(--space-blue)" />
                  <rect x="-4" y="-12" width="8" height="6" fill="var(--amber)" rx="1" />
                </g>
                <text x="150" y="60" textAnchor="middle" fill="var(--space-blue)" fontSize="11" fontFamily="var(--font-jetbrains)">ORBIT</text>
              </>
            )}

            {activePhase === 1 && (
              <>
                {/* Landing trajectory */}
                <path d="M80 40 Q120 100 150 170" fill="none" stroke="var(--space-blue)" strokeWidth="2" strokeDasharray="6 4" />
                {/* Starship lander */}
                <g transform="translate(140, 150)">
                  <rect x="-8" y="-30" width="16" height="30" fill="var(--text-primary)" opacity="0.7" rx="4" />
                  <rect x="-12" y="-35" width="24" height="8" fill="var(--space-blue)" opacity="0.5" rx="2" />
                  {/* Legs */}
                  <line x1="-8" y1="0" x2="-14" y2="8" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                  <line x1="8" y1="0" x2="14" y2="8" stroke="var(--text-tertiary)" strokeWidth="1.5" />
                </g>
                {/* Astronaut */}
                <g transform="translate(175, 172)">
                  <circle cx="0" cy="-8" r="5" fill="var(--amber)" opacity="0.8" />
                  <rect x="-4" y="-3" width="8" height="12" fill="var(--amber)" opacity="0.6" rx="2" />
                </g>
                <text x="150" y="40" textAnchor="middle" fill="var(--amber)" fontSize="11" fontFamily="var(--font-jetbrains)">LAND</text>
              </>
            )}

            {activePhase === 2 && (
              <>
                {/* Gateway in orbit */}
                <ellipse cx="150" cy="60" rx="80" ry="20" fill="none" stroke="var(--space-blue)" strokeWidth="1" strokeDasharray="4 3" opacity="0.4" />
                <rect x="140" y="52" width="20" height="10" fill="var(--space-blue)" opacity="0.6" rx="2" />
                <rect x="128" y="55" width="12" height="4" fill="var(--amber)" opacity="0.5" rx="1" />
                <rect x="160" y="55" width="12" height="4" fill="var(--amber)" opacity="0.5" rx="1" />

                {/* Base camp */}
                <ellipse cx="130" cy="180" rx="30" ry="15" fill="var(--space-blue)" opacity="0.2" stroke="var(--space-blue)" strokeWidth="1" />
                <ellipse cx="170" cy="185" rx="20" ry="12" fill="var(--space-blue)" opacity="0.15" stroke="var(--space-blue)" strokeWidth="1" />
                {/* Solar */}
                <rect x="195" y="172" width="18" height="3" fill="var(--amber)" rx="1" />
                <rect x="195" y="177" width="18" height="3" fill="var(--amber)" rx="1" />
                <line x1="193" y1="170" x2="193" y2="185" stroke="var(--text-tertiary)" strokeWidth="1" />
                {/* Rover */}
                <rect x="85" y="182" width="20" height="8" fill="var(--text-primary)" opacity="0.5" rx="2" />
                <circle cx="89" cy="192" r="3" fill="var(--text-tertiary)" />
                <circle cx="101" cy="192" r="3" fill="var(--text-tertiary)" />
                <text x="150" y="40" textAnchor="middle" fill="var(--success-green)" fontSize="11" fontFamily="var(--font-jetbrains)">STAY</text>
              </>
            )}
          </svg>
        </div>
      </div>
    </SectionWrapper>
  );
}
