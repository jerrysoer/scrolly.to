"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const equations = [
  { label: "Density", normal: "\u03C1 = M/V", breakdown: "\u03C1 \u2192 \u221E", delay: 0 },
  { label: "Curvature", normal: "R\u03BC\u03BD = finite", breakdown: "R\u03BC\u03BD \u2192 \u221E", delay: 200 },
  { label: "Tidal force", normal: "F \u221D 1/r\u00B3", breakdown: "F \u2192 \u221E", delay: 400 },
  { label: "Temperature", normal: "T = finite", breakdown: "T \u2192 \u221E", delay: 600 },
];

export default function SingularitySection() {
  const [breaking, setBreaking] = useState(false);
  const [revealed, setRevealed] = useState<boolean[]>(equations.map(() => false));
  const timerRefs = useRef<ReturnType<typeof setTimeout>[]>([]);

  const triggerBreakdown = () => {
    setBreaking(true);
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];

    equations.forEach((eq, i) => {
      const timer = setTimeout(() => {
        setRevealed((prev) => {
          const next = [...prev];
          next[i] = true;
          return next;
        });
      }, eq.delay);
      timerRefs.current.push(timer);
    });
  };

  const reset = () => {
    setBreaking(false);
    setRevealed(equations.map(() => false));
    timerRefs.current.forEach(clearTimeout);
    timerRefs.current = [];
  };

  useEffect(() => {
    return () => timerRefs.current.forEach(clearTimeout);
  }, []);

  return (
    <SectionWrapper id="singularity" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          07 &mdash; Where Physics Breaks
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Singularity
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          At the very center, general relativity predicts a point of infinite density
          and zero volume. Every physical quantity we can calculate diverges to infinity.
          Our equations don&rsquo;t give wrong answers &mdash; they give no answers at all.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          The singularity isn&rsquo;t really a &ldquo;place&rdquo; in the usual sense.
          It&rsquo;s a moment in time &mdash; a future you cannot avoid once inside the
          horizon. Most physicists believe the singularity signals where our current
          theory fails, not a real infinite point.
        </p>

        {/* Physics breakdown viz */}
        <div className="mt-10 mx-auto max-w-lg">
          <div className="space-y-3">
            {equations.map((eq, i) => (
              <div
                key={eq.label}
                className={`rounded-xl border p-4 transition-all duration-500 ${
                  revealed[i]
                    ? "border-redshift bg-redshift/5"
                    : "border-border bg-bg-card"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-medium text-text-primary">{eq.label}</span>
                  <span
                    className={`font-mono text-sm transition-all duration-300 ${
                      revealed[i] ? "text-redshift font-bold scale-110" : "text-text-secondary"
                    }`}
                  >
                    {revealed[i] ? eq.breakdown : eq.normal}
                  </span>
                </div>
                {revealed[i] && (
                  <p className="mt-2 font-sans text-xs text-redshift/70">
                    Equation breaks down &mdash; no meaningful result
                  </p>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center gap-4">
            <button
              onClick={triggerBreakdown}
              disabled={breaking}
              className="rounded-lg bg-space-blue px-5 py-2.5 font-sans text-sm font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
            >
              {breaking ? "Physics breaking\u2026" : "Approach the singularity"}
            </button>
            {breaking && (
              <button
                onClick={reset}
                className="rounded-lg border border-border bg-bg-card px-5 py-2.5 font-sans text-sm font-medium text-text-secondary transition-colors hover:bg-bg-secondary"
              >
                Reset
              </button>
            )}
          </div>
        </div>

        <blockquote className="pull-quote mt-8">
          Not a place. A moment in your future you cannot avoid.
          Where density is infinite, volume is zero, and our equations give up.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
