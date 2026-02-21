"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function TwoPerspectivesSection() {
  const [time, setTime] = useState(0);
  const [playing, setPlaying] = useState(false);
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    if (playing) {
      const animate = () => {
        setTime((t) => {
          if (t >= 100) {
            setPlaying(false);
            return 100;
          }
          return t + 0.4;
        });
        animRef.current = requestAnimationFrame(animate);
      };
      animRef.current = requestAnimationFrame(animate);
    }
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [playing]);

  // Falling person: crosses horizon at t=50, reaches singularity at t=100
  const fallerY = Math.min(time * 2.5, 250);
  const fallerOpacity = 1;

  // Outside observer: sees them slow down and redshift, never cross
  const observerY = time < 50 ? time * 2 : 100 + 20 * Math.log10(1 + (time - 50));
  const redshiftAmount = time < 50 ? 0 : Math.min((time - 50) / 50, 1);
  const observerOpacity = 1 - redshiftAmount * 0.8;

  return (
    <SectionWrapper id="two-perspectives" layout="full-bleed" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          04 &mdash; Relativity in Action
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Two Perspectives
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          The most mind-bending part of falling into a black hole: two observers
          see completely different things. Both are correct.
        </p>

        {/* Side-by-side panels */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2">
          {/* Your perspective */}
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-space-blue">
              What You Experience
            </h3>
            <svg viewBox="0 0 250 280" className="mt-4 w-full" aria-label="Faller's perspective">
              <title>Your perspective falling in</title>
              <rect x="0" y="0" width="250" height="280" fill="var(--bg-secondary)" rx="8" opacity="0.5" />
              {/* Event horizon line */}
              <line x1="0" y1="140" x2="250" y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="245" y="135" textAnchor="end" fill="var(--text-tertiary)" fontSize="9">event horizon</text>
              {/* Falling person - smooth uninterrupted fall */}
              <circle
                cx={125}
                cy={10 + fallerY}
                r="8"
                fill="var(--space-blue)"
                opacity={fallerOpacity}
              />
              {/* Clock showing normal time */}
              <text x="125" y={30 + fallerY} textAnchor="middle" fill="var(--text-secondary)" fontSize="10">
                {time < 100 ? `t = ${(time / 10).toFixed(1)}s` : "singularity"}
              </text>
            </svg>
            <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary">
              You fall in. Time feels normal. You cross the horizon without noticing.
              Nothing special happens at the boundary.
            </p>
          </div>

          {/* Friend's perspective */}
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-amber">
              What Your Friend Sees
            </h3>
            <svg viewBox="0 0 250 280" className="mt-4 w-full" aria-label="Observer's perspective">
              <title>Your friend&apos;s perspective watching</title>
              <rect x="0" y="0" width="250" height="280" fill="var(--bg-secondary)" rx="8" opacity="0.5" />
              {/* Event horizon line */}
              <line x1="0" y1="140" x2="250" y2="140" stroke="var(--border)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="245" y="135" textAnchor="end" fill="var(--text-tertiary)" fontSize="9">event horizon</text>
              {/* Falling person - slows and redshifts */}
              <circle
                cx={125}
                cy={10 + observerY}
                r="8"
                fill={redshiftAmount > 0 ? `var(--redshift)` : "var(--space-blue)"}
                opacity={observerOpacity}
              />
              {/* Clock showing dilated time */}
              <text x="125" y={30 + observerY} textAnchor="middle" fill="var(--text-secondary)" fontSize="10" opacity={observerOpacity}>
                {time < 50 ? `t = ${(time / 10).toFixed(1)}s` : "freezing\u2026"}
              </text>
              {/* Redshift indicator */}
              {redshiftAmount > 0 && (
                <text x="125" y="270" textAnchor="middle" fill="var(--redshift)" fontSize="10" opacity={redshiftAmount}>
                  light redshifting\u2026 fading\u2026
                </text>
              )}
            </svg>
            <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary">
              Your friend watches. You slow down. Your light redshifts from blue to red
              to infrared. You freeze and fade at the horizon &mdash; forever.
            </p>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-4">
          <button
            onClick={() => { setTime(0); setPlaying(true); }}
            className="rounded-lg bg-space-blue px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:opacity-90"
          >
            {playing ? "Falling\u2026" : "Watch both perspectives"}
          </button>
          <button
            onClick={() => { setTime(0); setPlaying(false); }}
            className="rounded-lg border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary"
          >
            Reset
          </button>
        </div>
      </div>
    </SectionWrapper>
  );
}
