"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { fedRateEffects } from "@/lib/explainers/money";

export default function FederalReserveSection() {
  const [rateSide, setRateSide] = useState<"low" | "high">("low");
  const data = fedRateEffects[rateSide];

  // Dial angle: low = -60deg, high = 60deg
  const dialAngle = rateSide === "low" ? -60 : 60;

  return (
    <SectionWrapper id="federal-reserve" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Section 7
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Federal Reserve
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        So who controls how much money exists? In the US, it&rsquo;s the Federal Reserve.
        Their main tool is the{" "}
        <strong>interest rate</strong> &mdash; the price of borrowing money. Think of it as
        a thermostat for the economy.
      </p>

      {/* Dial visualization */}
      <div className="mt-10 rounded-2xl border border-border bg-bg-card p-8 sm:p-10">
        <div className="flex flex-col items-center">
          {/* Semi-circular dial */}
          <svg viewBox="0 0 200 130" className="h-40 w-56 sm:h-48 sm:w-64">
            {/* Dial arc background */}
            <path
              d="M20 110 A80 80 0 0 1 180 110"
              fill="none"
              stroke="var(--border)"
              strokeWidth="8"
              strokeLinecap="round"
            />
            {/* Gradient arc: blue (cold) to red (hot) */}
            <defs>
              <linearGradient id="dialGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--accent-blue)" />
                <stop offset="50%" stopColor="var(--money-green)" />
                <stop offset="100%" stopColor="var(--inflation-red)" />
              </linearGradient>
            </defs>
            <path
              d="M20 110 A80 80 0 0 1 180 110"
              fill="none"
              stroke="url(#dialGrad)"
              strokeWidth="8"
              strokeLinecap="round"
              opacity="0.6"
            />
            {/* Needle */}
            <g
              style={{
                transform: `rotate(${dialAngle}deg)`,
                transformOrigin: "100px 110px",
                transition: "transform 0.6s ease-out",
              }}
            >
              <line
                x1="100"
                y1="110"
                x2="100"
                y2="40"
                stroke={rateSide === "low" ? "var(--accent-blue)" : "var(--inflation-red)"}
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle
                cx="100"
                cy="40"
                r="4"
                fill={rateSide === "low" ? "var(--accent-blue)" : "var(--inflation-red)"}
              />
            </g>
            {/* Center pivot */}
            <circle cx="100" cy="110" r="6" fill="var(--text-primary)" />
            {/* Labels */}
            <text x="15" y="125" fontSize="10" fill="var(--accent-blue)" fontFamily="monospace" fontWeight="bold">LOW</text>
            <text x="155" y="125" fontSize="10" fill="var(--inflation-red)" fontFamily="monospace" fontWeight="bold">HIGH</text>
          </svg>

          {/* Rate display */}
          <p
            className="mt-4 font-mono text-3xl font-bold transition-colors duration-300"
            style={{
              color: rateSide === "low" ? "var(--accent-blue)" : "var(--inflation-red)",
            }}
          >
            {data.rate}
          </p>
          <p className="font-sans text-sm text-text-tertiary">{data.label}</p>
        </div>

        {/* Toggle */}
        <div className="mt-6 flex justify-center">
          <div className="inline-flex rounded-xl border border-border bg-bg-secondary p-1">
            <button
              onClick={() => setRateSide("low")}
              className={`rounded-lg px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 ${
                rateSide === "low"
                  ? "bg-accent-blue text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Low Rates
            </button>
            <button
              onClick={() => setRateSide("high")}
              className={`rounded-lg px-5 py-2.5 font-sans text-sm font-medium transition-all duration-200 ${
                rateSide === "high"
                  ? "bg-inflation-red text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              High Rates
            </button>
          </div>
        </div>

        {/* Effects list */}
        <div className="mt-6 space-y-3" key={rateSide} style={{ animation: "fade-in 0.4s ease-out both" }}>
          {data.effects.map((effect, i) => (
            <div
              key={i}
              className="flex items-start gap-3 rounded-lg bg-bg-secondary p-4"
            >
              <span
                className="mt-1 block h-2 w-2 shrink-0 rounded-full"
                style={{
                  backgroundColor: rateSide === "low" ? "var(--accent-blue)" : "var(--inflation-red)",
                }}
              />
              <p className="font-sans text-sm text-text-secondary">{effect}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
