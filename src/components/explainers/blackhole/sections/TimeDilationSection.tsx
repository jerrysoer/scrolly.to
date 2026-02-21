"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function TimeDilationSection() {
  // Distance from horizon: 0 = at horizon, 100 = far away
  const [distance, setDistance] = useState(50);

  // Simplified Schwarzschild time dilation: t_observer / t_faller = 1 / sqrt(1 - rs/r)
  // We model rs/r as (100 - distance) / 100
  const ratio = distance <= 1
    ? Infinity
    : 1 / Math.sqrt(distance / 100);

  const clockSpeed = distance <= 1 ? 0 : (distance / 100);

  return (
    <SectionWrapper id="time-dilation" layout="split-right" stagger>
      {/* Left: interactive viz */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          05 &mdash; Time Slows Down
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Time Dilation
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          <JargonTerm
            term="Gravitational time dilation"
            definition="Time passes more slowly in stronger gravitational fields. Near a black hole, a clock runs slower than a clock far from the gravitational source."
          />{" "}
          means that clocks near a black hole tick slower than clocks far away. At the
          event horizon, your clock stops entirely relative to a distant observer.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          One hour near the event horizon could equal years, decades, or centuries for
          someone watching from a safe distance. The closer you get, the more extreme
          the difference.
        </p>

        {/* Clock viz */}
        <div className="mt-8 rounded-xl border border-border bg-bg-card p-6">
          <div className="flex items-center justify-between gap-8">
            {/* Your clock */}
            <div className="flex-1 text-center">
              <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-label="Your clock near the black hole">
                <title>Your clock</title>
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" fill="var(--space-blue)" />
                {/* Hour hand - moves at dilated speed */}
                <line
                  x1="50" y1="50"
                  x2={50 + 25 * Math.sin((clockSpeed * Math.PI * 2) / 4)}
                  y2={50 - 25 * Math.cos((clockSpeed * Math.PI * 2) / 4)}
                  stroke="var(--space-blue)"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {/* Minute hand */}
                <line
                  x1="50" y1="50"
                  x2={50 + 35 * Math.sin(clockSpeed * Math.PI * 2)}
                  y2={50 - 35 * Math.cos(clockSpeed * Math.PI * 2)}
                  stroke="var(--text-secondary)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
              <p className="mt-2 font-sans text-xs text-text-tertiary">Your clock</p>
              <p className="font-mono text-sm text-space-blue">
                {clockSpeed <= 0 ? "Stopped" : `${(clockSpeed * 100).toFixed(0)}% speed`}
              </p>
            </div>

            {/* Arrow */}
            <div className="text-text-tertiary">vs</div>

            {/* Distant clock */}
            <div className="flex-1 text-center">
              <svg viewBox="0 0 100 100" className="mx-auto h-24 w-24" aria-label="Distant observer's clock">
                <title>Distant clock</title>
                <circle cx="50" cy="50" r="45" fill="none" stroke="var(--border)" strokeWidth="2" />
                <circle cx="50" cy="50" r="3" fill="var(--amber)" />
                <line x1="50" y1="50" x2="50" y2="25" stroke="var(--amber)" strokeWidth="2.5" strokeLinecap="round" />
                <line x1="50" y1="50" x2="75" y2="50" stroke="var(--text-secondary)" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="mt-2 font-sans text-xs text-text-tertiary">Distant clock</p>
              <p className="font-mono text-sm text-amber">100% speed</p>
            </div>
          </div>

          <div className="mt-6">
            <label className="flex items-center justify-between text-sm text-text-secondary">
              <span>Distance from horizon</span>
              <span className="font-mono text-space-blue">{distance}%</span>
            </label>
            <input
              type="range"
              min={0}
              max={100}
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="mt-2 w-full accent-space-blue"
            />
            <div className="mt-1 flex justify-between text-xs text-text-tertiary">
              <span>At horizon</span>
              <span>Far away</span>
            </div>
          </div>

          <div className="mt-4 rounded-lg bg-bg-secondary p-3 text-center">
            <p className="font-mono text-sm text-text-secondary">
              Time ratio:{" "}
              <span className="text-space-blue font-bold">
                {distance <= 1 ? "\u221E" : `1:${ratio.toFixed(2)}`}
              </span>
            </p>
            <p className="mt-1 font-sans text-xs text-text-tertiary">
              {distance <= 1
                ? "Your clock has stopped. An infinite amount of time passes outside."
                : distance < 20
                ? "1 hour for you = days or more outside."
                : distance < 50
                ? "Noticeable time difference. Your clock runs slower."
                : "Minimal time dilation at this distance."}
            </p>
          </div>
        </div>
      </div>

      {/* Right: concept summary */}
      <div className="flex flex-col justify-center">
        <blockquote className="pull-quote">
          At the event horizon, your clock stops. One second for you becomes eternity for
          everyone else.
        </blockquote>

        <div className="mt-6 space-y-3">
          {[
            { label: "GPS satellites", effect: "38\u00B5s/day correction needed" },
            { label: "Near neutron star", effect: "~30% slower" },
            { label: "Near BH horizon", effect: "Clock approaches zero" },
            { label: "At the horizon", effect: "Time stops (from outside)" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-3 rounded-lg border border-border bg-bg-card p-3">
              <div className="h-2 w-2 rounded-full bg-space-blue" />
              <div>
                <p className="font-sans text-sm font-medium text-text-primary">{item.label}</p>
                <p className="font-mono text-xs text-text-tertiary">{item.effect}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
