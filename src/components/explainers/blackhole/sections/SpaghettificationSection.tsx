"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function SpaghettificationSection() {
  const [distance, setDistance] = useState(80);

  // Stretch factor increases as distance decreases
  const stretch = 1 + (100 - distance) * 0.04;
  const squeeze = 1 / Math.sqrt(stretch);

  return (
    <SectionWrapper id="spaghettification" layout="split-left" stagger>
      {/* Left: text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          03 &mdash; Tidal Forces
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Spaghettification
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          <JargonTerm
            term="Spaghettification"
            definition="The vertical stretching and horizontal compression of objects into long, thin shapes (like spaghetti) in a very strong gravitational field."
          />{" "}
          is the stretching of objects by extreme tidal forces near a black hole.
          The gravity pulling on your feet is significantly stronger than the gravity
          at your head &mdash; so you get stretched into a long, thin strand.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          Near a stellar-mass black hole, spaghettification happens well outside the
          event horizon. But near a supermassive black hole, tidal forces at the horizon
          are gentle &mdash; you wouldn&rsquo;t feel anything unusual until deep inside.
        </p>

        {/* Slider */}
        <div className="mt-6">
          <label className="flex items-center justify-between text-sm text-text-secondary">
            <span>Distance from singularity</span>
            <span className="font-mono text-space-blue">{distance}%</span>
          </label>
          <input
            type="range"
            min={5}
            max={100}
            value={distance}
            onChange={(e) => setDistance(Number(e.target.value))}
            className="mt-2 w-full accent-space-blue"
          />
          <div className="mt-1 flex justify-between text-xs text-text-tertiary">
            <span>Singularity</span>
            <span>Far away</span>
          </div>
        </div>
      </div>

      {/* Right: stick figure visualization */}
      <div className="flex items-center justify-center">
        <div className="rounded-xl border border-border bg-bg-card p-8">
          <svg viewBox="0 0 200 300" className="mx-auto h-64 w-32" aria-label="Spaghettification visualization">
            <title>Human figure stretching under tidal forces</title>
            {/* Background gradient showing gravity strength */}
            <defs>
              <linearGradient id="gravGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="var(--space-blue)" stopOpacity="0.05" />
                <stop offset="100%" stopColor="var(--redshift)" stopOpacity="0.15" />
              </linearGradient>
            </defs>
            <rect x="0" y="0" width="200" height="300" fill="url(#gravGrad)" rx="8" />

            {/* Arrow indicating direction of gravity */}
            <text x="180" y="150" fill="var(--text-tertiary)" fontSize="8" textAnchor="middle" transform="rotate(90 180 150)">
              stronger gravity
            </text>

            {/* Stick figure — stretches vertically, compresses horizontally */}
            <g transform={`translate(100, 150)`}>
              {/* Head */}
              <ellipse
                cx={0}
                cy={-60 * stretch}
                rx={14 * squeeze}
                ry={14}
                fill="none"
                stroke="var(--text-primary)"
                strokeWidth="2"
              />
              {/* Body */}
              <line
                x1={0}
                y1={-46 * stretch}
                x2={0}
                y2={30 * stretch}
                stroke="var(--text-primary)"
                strokeWidth="2"
              />
              {/* Arms */}
              <line
                x1={-25 * squeeze}
                y1={-20 * stretch}
                x2={25 * squeeze}
                y2={-20 * stretch}
                stroke="var(--text-primary)"
                strokeWidth="2"
              />
              {/* Left leg */}
              <line
                x1={0}
                y1={30 * stretch}
                x2={-18 * squeeze}
                y2={65 * stretch}
                stroke="var(--text-primary)"
                strokeWidth="2"
              />
              {/* Right leg */}
              <line
                x1={0}
                y1={30 * stretch}
                x2={18 * squeeze}
                y2={65 * stretch}
                stroke="var(--text-primary)"
                strokeWidth="2"
              />
            </g>
          </svg>

          <p className="mt-4 text-center font-mono text-xs text-text-tertiary">
            Stretch: {stretch.toFixed(1)}x | Squeeze: {squeeze.toFixed(2)}x
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
