"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const objects = [
  { name: "Earth", radius: 12, mass: "1 Earth mass", color: "var(--space-blue)", desc: "If crushed to a black hole: 9mm radius" },
  { name: "Sun", radius: 28, mass: "1 solar mass", color: "var(--amber)", desc: "If crushed to a black hole: 3km radius" },
  { name: "Stellar BH", radius: 8, mass: "3\u201310 solar masses", color: "var(--text-primary)", desc: "Born from a dying massive star", isBH: true },
  { name: "Supermassive BH", radius: 60, mass: "Millions\u2013billions of solar masses", color: "var(--text-primary)", desc: "Found at the center of galaxies", isBH: true },
];

export default function WhatIsBlackHoleSection() {
  const [selected, setSelected] = useState(2);

  return (
    <SectionWrapper id="what-is-black-hole" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          01 &mdash; The Basics
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          What Is a Black Hole?
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          A black hole is what happens when gravity wins. When a massive star collapses,
          it can crush matter into an infinitely dense point. The gravity is so intense
          that nothing &mdash; not even light &mdash; can escape.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          They come in sizes: stellar black holes (a few solar masses), intermediate
          (thousands), and supermassive (millions to billions). The one at the center of
          our galaxy, Sagittarius A*, is 4 million solar masses.
        </p>

        {/* Scale comparison viz */}
        <div className="mt-10 flex flex-col items-center">
          <svg viewBox="0 0 400 200" className="w-full max-w-lg" aria-label="Scale comparison of celestial objects">
            <title>Scale comparison</title>
            {/* Grid lines */}
            <line x1="0" y1="180" x2="400" y2="180" stroke="var(--border)" strokeWidth="1" opacity="0.3" />

            {objects.map((obj, i) => {
              const cx = 50 + i * 100;
              const cy = 180 - obj.radius;
              const isSelected = i === selected;
              return (
                <g key={obj.name} onClick={() => setSelected(i)} style={{ cursor: "pointer" }}>
                  {obj.isBH ? (
                    <>
                      <circle cx={cx} cy={cy} r={obj.radius + 4} fill="none" stroke="var(--space-blue)" strokeWidth="1" opacity={isSelected ? 0.6 : 0.2} />
                      <circle cx={cx} cy={cy} r={obj.radius} fill="#000000" stroke="var(--border)" strokeWidth="0.5" />
                      {isSelected && (
                        <circle cx={cx} cy={cy} r={obj.radius + 8} fill="none" stroke="var(--space-blue)" strokeWidth="1.5" opacity="0.4" strokeDasharray="4 3" />
                      )}
                    </>
                  ) : (
                    <>
                      <circle cx={cx} cy={cy} r={obj.radius} fill={obj.color} opacity={isSelected ? 0.9 : 0.5} />
                      {isSelected && (
                        <circle cx={cx} cy={cy} r={obj.radius + 6} fill="none" stroke={obj.color} strokeWidth="1.5" opacity="0.4" />
                      )}
                    </>
                  )}
                  <text
                    x={cx}
                    y={192}
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="9"
                    fontFamily="var(--font-inter)"
                  >
                    {obj.name}
                  </text>
                </g>
              );
            })}
          </svg>

          {/* Selected info card */}
          <div className="mt-6 w-full max-w-md rounded-xl border border-border bg-bg-card p-4 text-center">
            <p className="font-sans text-sm font-semibold text-text-primary">{objects[selected].name}</p>
            <p className="mt-1 font-mono text-xs text-space-blue">{objects[selected].mass}</p>
            <p className="mt-2 font-sans text-sm text-text-secondary">{objects[selected].desc}</p>
          </div>
        </div>

        <blockquote className="pull-quote mt-8">
          A black hole is not a thing. It&rsquo;s a region of spacetime where gravity has won
          so completely that nothing can leave.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
