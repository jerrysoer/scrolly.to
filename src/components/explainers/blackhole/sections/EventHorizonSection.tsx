"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function EventHorizonSection() {
  const [crossing, setCrossing] = useState(false);
  const animRef = useRef<number | null>(null);
  const [shipX, setShipX] = useState(20);

  useEffect(() => {
    if (crossing) {
      let x = 20;
      const animate = () => {
        x += 0.3;
        if (x > 85) {
          x = 20;
          setCrossing(false);
        }
        setShipX(x);
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [crossing]);

  const pastHorizon = shipX > 50;

  return (
    <SectionWrapper id="event-horizon" layout="full-bleed" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          02 &mdash; The Point of No Return
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Event Horizon
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          The{" "}
          <JargonTerm
            term="event horizon"
            definition="The boundary around a black hole beyond which no light or matter can escape. It's not a physical surface — just a mathematical boundary in spacetime."
          />{" "}
          is the boundary around a black hole beyond which nothing can escape.
          Not a surface. Not a wall. Just a boundary in spacetime where light itself
          isn&rsquo;t fast enough.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          The strange part? If you fell in, you wouldn&rsquo;t notice crossing it.
          There&rsquo;s no sign, no barrier, no sudden darkness. The horizon is invisible
          to the person falling through.
        </p>

        {/* Interactive animation */}
        <div className="mt-10">
          <div className="mx-auto max-w-2xl rounded-xl border border-border bg-bg-card p-6">
            <svg viewBox="0 0 500 200" className="w-full" aria-label="Event horizon crossing animation">
              <title>Event horizon boundary</title>
              <defs>
                <linearGradient id="horizonGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="var(--deep-space)" stopOpacity="0.1" />
                  <stop offset="48%" stopColor="var(--space-blue)" stopOpacity="0.1" />
                  <stop offset="50%" stopColor="var(--redshift)" stopOpacity="0.4" />
                  <stop offset="52%" stopColor="var(--space-blue)" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#000000" stopOpacity="0.3" />
                </linearGradient>
              </defs>

              {/* Background gradient */}
              <rect x="0" y="0" width="500" height="200" fill="url(#horizonGrad)" />

              {/* Event horizon line */}
              <line
                x1="250" y1="0" x2="250" y2="200"
                stroke="var(--redshift)"
                strokeWidth="2"
                strokeDasharray="6 4"
                opacity="0.7"
              />

              {/* Labels */}
              <text x="125" y="25" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-inter)">
                Outside: you can escape
              </text>
              <text x="375" y="25" textAnchor="middle" fill="var(--redshift)" fontSize="11" fontFamily="var(--font-inter)">
                Inside: no escape possible
              </text>

              {/* Ship indicator */}
              <g transform={`translate(${shipX * 5}, 100)`}>
                <circle r="6" fill={pastHorizon ? "var(--redshift)" : "var(--space-blue)"} />
                <circle r="10" fill="none" stroke={pastHorizon ? "var(--redshift)" : "var(--space-blue)"} strokeWidth="1" opacity="0.4" />
                {/* Trailing light */}
                {pastHorizon && (
                  <line x1="-15" y1="0" x2="-30" y2="0" stroke="var(--redshift)" strokeWidth="2" opacity={Math.max(0, 1 - (shipX - 50) / 35)} />
                )}
              </g>

              {/* Status text */}
              <text x="250" y="185" textAnchor="middle" fill="var(--text-secondary)" fontSize="12" fontFamily="var(--font-inter)">
                {pastHorizon ? "Past the horizon \u2014 all paths lead inward" : "Approaching the event horizon\u2026"}
              </text>
            </svg>

            <button
              onClick={() => { setShipX(20); setCrossing(true); }}
              className="mt-4 w-full rounded-lg bg-space-blue px-4 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:opacity-90"
            >
              {crossing ? "Falling\u2026" : "Fall past the horizon"}
            </button>
          </div>
        </div>

        <blockquote className="pull-quote mt-8">
          Not a surface. Not a wall. Just a boundary in spacetime where light itself
          isn&rsquo;t fast enough to escape.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
