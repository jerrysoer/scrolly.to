"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function WeightlessnessSection() {
  const [gForce, setGForce] = useState(1);

  const handleSlider = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setGForce(parseFloat(e.target.value));
  }, []);

  const getLabel = (g: number) => {
    if (g <= 0.1) return "Weightless (0g)";
    if (g < 0.5) return "Floating";
    if (g < 1.2) return "Normal (1g)";
    if (g < 2.5) return "Heavy";
    if (g < 3.5) return "Very Heavy";
    return "Extreme (4g+)";
  };

  const getColor = (g: number) => {
    if (g <= 0.3) return "var(--potential)";
    if (g < 1.5) return "var(--success-green)";
    if (g < 3) return "var(--kinetic)";
    return "var(--force-red)";
  };

  const getScenario = (g: number) => {
    if (g <= 0.3) return "Top of a hill — you float off your seat";
    if (g < 1.5) return "Flat track — normal gravity";
    if (g < 3) return "Entering a valley — pressed into your seat";
    return "Bottom of a deep dip — feel 4x your weight";
  };

  const meterHeight = Math.min(gForce / 4.5, 1) * 100;

  return (
    <SectionWrapper id="weightlessness" layout="split-right">
      {/* Left: G-force meter */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-border bg-bg-card p-6">
          <h3 className="text-center font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary mb-4">
            G-Force Meter
          </h3>

          {/* Meter visualization */}
          <div className="mx-auto flex items-end gap-4 h-48 mb-4">
            {/* Vertical bar */}
            <div className="relative flex-1 h-full rounded-lg bg-bg-secondary overflow-hidden">
              <div
                className="absolute bottom-0 w-full rounded-lg transition-all duration-300"
                style={{
                  height: `${meterHeight}%`,
                  backgroundColor: getColor(gForce),
                }}
              />
              {/* Scale marks */}
              {[0, 1, 2, 3, 4].map((mark) => (
                <div
                  key={mark}
                  className="absolute left-0 right-0 border-t border-border"
                  style={{ bottom: `${(mark / 4.5) * 100}%` }}
                >
                  <span className="absolute -left-6 -top-2 font-mono text-[10px] text-text-tertiary">
                    {mark}g
                  </span>
                </div>
              ))}
            </div>

            {/* Rider visualization */}
            <div className="flex flex-col items-center gap-2 w-20">
              <svg viewBox="0 0 60 80" className="w-16" aria-hidden="true">
                {/* Seat */}
                <rect x="10" y="50" width="40" height="25" rx="4" fill="var(--border)" />
                {/* Rider body */}
                <circle cx="30" cy="20" r="10" fill="var(--text-tertiary)" />
                <rect
                  x="22"
                  y="30"
                  width="16"
                  height="20"
                  rx="3"
                  fill="var(--text-tertiary)"
                  style={{
                    transform: `translateY(${gForce <= 0.3 ? -8 : 0}px)`,
                    transition: "transform 0.3s ease",
                  }}
                />
                {/* Float indicator */}
                {gForce <= 0.3 && (
                  <text x="30" y="12" textAnchor="middle" fill="var(--potential)" fontSize="8" fontFamily="var(--font-jetbrains)">
                    floating!
                  </text>
                )}
              </svg>
            </div>
          </div>

          {/* Current reading */}
          <div className="text-center mb-4">
            <p className="font-mono text-3xl font-bold" style={{ color: getColor(gForce) }}>
              {gForce.toFixed(1)}g
            </p>
            <p className="font-mono text-xs text-text-tertiary mt-1">
              {getLabel(gForce)}
            </p>
          </div>

          {/* Slider */}
          <input
            type="range"
            min="0"
            max="4.5"
            step="0.1"
            value={gForce}
            onChange={handleSlider}
            className="w-full accent-kinetic"
            aria-label="Adjust g-force"
          />

          {/* Scenario */}
          <p className="mt-3 text-center font-sans text-sm text-text-secondary">
            {getScenario(gForce)}
          </p>
        </div>
      </div>

      {/* Right: explanation */}
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 05
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            Weightlessness
          </h2>
        </div>

        <p className="font-sans text-lg leading-relaxed text-text-secondary">
          You don&rsquo;t need space to feel weightless. At the top of a hill on a
          roller coaster, you and the car are both in freefall &mdash; your body
          lifts off the seat and you experience{" "}
          <strong className="text-potential">0g</strong>.
        </p>

        <p className="font-sans text-lg leading-relaxed text-text-secondary">
          At the bottom of a dip, you&rsquo;re pressed down with up to{" "}
          <strong className="text-force-red">4g</strong> &mdash; four times your
          weight. That&rsquo;s the same force fighter pilots experience in tight
          turns.
        </p>

        <div className="grid gap-3 grid-cols-2">
          <div className="rounded-lg bg-bg-card border border-border p-4 text-center">
            <p className="font-mono text-2xl font-bold text-potential">0g</p>
            <p className="font-sans text-xs text-text-tertiary mt-1">Top of hill</p>
          </div>
          <div className="rounded-lg bg-bg-card border border-border p-4 text-center">
            <p className="font-mono text-2xl font-bold text-force-red">4g</p>
            <p className="font-sans text-xs text-text-tertiary mt-1">Bottom of dip</p>
          </div>
        </div>

        <div className="pull-quote">
          You don&rsquo;t need space to feel weightless. You just need the right hill.
        </div>
      </div>
    </SectionWrapper>
  );
}
