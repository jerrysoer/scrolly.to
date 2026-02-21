"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function WorldBeforeSection() {
  const [era, setEra] = useState<"today" | "cretaceous">("today");

  return (
    <SectionWrapper id="world-before">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 1
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        The World Before
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        For 165 million years, dinosaurs dominated every continent. The
        Cretaceous period was warmer than today &mdash; no ice caps, higher sea
        levels, and lush vegetation from pole to pole.
      </p>

      {/* Toggle */}
      <div className="mt-8 flex items-center justify-center gap-2">
        <button
          onClick={() => setEra("today")}
          className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
            era === "today"
              ? "bg-firestorm text-white"
              : "bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
        >
          Earth Today
        </button>
        <button
          onClick={() => setEra("cretaceous")}
          className={`rounded-full px-5 py-2 font-sans text-sm font-medium transition-all ${
            era === "cretaceous"
              ? "bg-firestorm text-white"
              : "bg-bg-secondary text-text-secondary hover:text-text-primary"
          }`}
        >
          Cretaceous Earth (66M years ago)
        </button>
      </div>

      {/* Earth visualization */}
      <div className="mt-10 flex items-center justify-center">
        <div className="relative">
          <svg
            viewBox="0 0 400 400"
            className="h-64 w-64 sm:h-80 sm:w-80 transition-all duration-700"
          >
            {/* Ocean */}
            <circle
              cx="200"
              cy="200"
              r="180"
              fill={era === "today" ? "#1e40af" : "#1e3a5f"}
            />

            {era === "today" ? (
              <>
                {/* Modern continents - simplified shapes */}
                {/* North America */}
                <path
                  d="M80 100 L130 90 L150 120 L140 160 L110 180 L80 170 L70 130 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* South America */}
                <path
                  d="M120 210 L150 200 L160 240 L150 290 L130 310 L110 280 L115 240 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* Europe */}
                <path
                  d="M200 90 L230 85 L240 100 L235 120 L210 115 L200 100 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* Africa */}
                <path
                  d="M210 150 L250 140 L270 180 L265 250 L240 280 L215 260 L200 200 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* Asia */}
                <path
                  d="M250 80 L320 70 L340 110 L330 160 L290 170 L260 140 L250 110 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* Australia */}
                <path
                  d="M300 260 L340 250 L350 280 L330 300 L300 290 Z"
                  fill="#4ade80"
                  opacity="0.8"
                />
                {/* Ice caps */}
                <ellipse cx="200" cy="35" rx="100" ry="20" fill="white" opacity="0.7" />
                <ellipse cx="200" cy="365" rx="120" ry="25" fill="white" opacity="0.7" />
              </>
            ) : (
              <>
                {/* Cretaceous continents - still connected, different positions */}
                {/* Laurasia (combined North America + Europe + Asia) */}
                <path
                  d="M60 100 L180 80 L280 90 L320 120 L310 170 L240 180 L160 170 L100 180 L60 150 Z"
                  fill="#16a34a"
                  opacity="0.8"
                />
                {/* Gondwana fragments - South America + Africa still close */}
                <path
                  d="M100 220 L160 200 L220 210 L280 200 L300 240 L280 290 L230 310 L170 300 L120 280 L90 260 Z"
                  fill="#16a34a"
                  opacity="0.8"
                />
                {/* India - island on the way north */}
                <path
                  d="M290 190 L310 185 L315 210 L295 215 Z"
                  fill="#16a34a"
                  opacity="0.8"
                />
                {/* Antarctica + Australia still connected */}
                <path
                  d="M150 330 L280 325 L320 340 L310 365 L170 370 L140 350 Z"
                  fill="#16a34a"
                  opacity="0.8"
                />
                {/* Lush vegetation indicators - small tree shapes */}
                {[120, 200, 260, 150, 230].map((x, i) => (
                  <circle
                    key={i}
                    cx={x}
                    cy={[130, 120, 140, 250, 260][i]}
                    r="8"
                    fill="#15803d"
                    opacity="0.5"
                  />
                ))}
                {/* No ice caps text */}
              </>
            )}

            {/* Atmosphere glow */}
            <circle
              cx="200"
              cy="200"
              r="180"
              fill="none"
              stroke={era === "today" ? "#60a5fa" : "#fbbf24"}
              strokeWidth="2"
              opacity="0.3"
            />
          </svg>

          {/* Labels */}
          <div className="mt-4 text-center">
            <p className="font-mono text-sm font-medium text-firestorm">
              {era === "today" ? "Modern Earth" : "Cretaceous Earth"}
            </p>
            <p className="mt-1 text-xs text-text-tertiary">
              {era === "today"
                ? "7 continents, ice caps at both poles"
                : "No ice caps, 15\u00B0C warmer, lush forests pole to pole"}
            </p>
          </div>
        </div>
      </div>

      {/* Key facts */}
      <div className="mt-10 grid gap-4 sm:grid-cols-3">
        {[
          {
            stat: "165M years",
            desc: "of dinosaur dominance before the impact",
          },
          {
            stat: "15\u00B0C warmer",
            desc: "than today \u2014 no permanent ice anywhere",
          },
          {
            stat: "1,000+ species",
            desc: "of dinosaurs alive at the end of the Cretaceous",
          },
        ].map((item) => (
          <div
            key={item.stat}
            className="rounded-xl border border-border bg-bg-card p-5"
          >
            <p className="font-mono text-xl font-bold text-firestorm">
              {item.stat}
            </p>
            <p className="mt-1 text-sm text-text-secondary">{item.desc}</p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
