"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { first24Hours } from "@/lib/explainers/extinction";

function ImpactIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16">
      {/* Explosion burst */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => (
        <line
          key={angle}
          x1="40"
          y1="40"
          x2={40 + 30 * Math.cos((angle * Math.PI) / 180)}
          y2={40 + 30 * Math.sin((angle * Math.PI) / 180)}
          stroke="var(--firestorm-hot)"
          strokeWidth="2"
          strokeLinecap="round"
          opacity="0.7"
        />
      ))}
      <circle cx="40" cy="40" r="12" fill="var(--firestorm-hot)" />
      <circle cx="40" cy="40" r="6" fill="#fbbf24" />
      <circle cx="40" cy="40" r="18" fill="none" stroke="var(--firestorm)" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}

function FireIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16">
      <path
        d="M40 10 C45 25, 60 30, 60 50 C60 67, 51 75, 40 75 C29 75, 20 67, 20 50 C20 30, 35 25, 40 10"
        fill="var(--firestorm)"
        opacity="0.8"
      />
      <path
        d="M40 30 C43 38, 50 42, 50 52 C50 60, 46 65, 40 65 C34 65, 30 60, 30 52 C30 42, 37 38, 40 30"
        fill="var(--firestorm-hot)"
        opacity="0.9"
      />
      <path
        d="M40 45 C42 48, 45 50, 45 55 C45 59, 43 62, 40 62 C37 62, 35 59, 35 55 C35 50, 38 48, 40 45"
        fill="#fbbf24"
      />
    </svg>
  );
}

function DarknessIcon() {
  return (
    <svg viewBox="0 0 80 80" className="h-16 w-16">
      {/* Darkened sun */}
      <circle cx="40" cy="35" r="14" fill="var(--winter-blue)" opacity="0.4" />
      <circle cx="40" cy="35" r="10" fill="var(--winter-cold)" opacity="0.6" />
      {/* Ash/dust cloud below */}
      <ellipse cx="30" cy="60" rx="18" ry="8" fill="var(--winter-blue)" opacity="0.3" />
      <ellipse cx="50" cy="58" rx="16" ry="10" fill="var(--winter-cold)" opacity="0.3" />
      <ellipse cx="40" cy="55" rx="22" ry="9" fill="var(--winter-blue)" opacity="0.2" />
      {/* Falling ash particles */}
      {[25, 35, 45, 55, 65].map((x) => (
        <circle key={x} cx={x} cy={42 + Math.random() * 10} r="1.5" fill="var(--winter-blue)" opacity="0.4" />
      ))}
    </svg>
  );
}

const icons: Record<string, React.ReactNode> = {
  impact: <ImpactIcon />,
  fire: <FireIcon />,
  darkness: <DarknessIcon />,
};

export default function First24HoursSection() {
  const [step, setStep] = useState(0);
  const current = first24Hours[step];

  return (
    <SectionWrapper id="first-24-hours">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 3
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        The First 24 Hours
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        In less than a day, the planet transformed from a lush greenhouse to an
        inferno, then darkness. Here is what happened, hour by hour.
      </p>

      {/* Step navigation */}
      <div className="mt-8 flex items-center justify-center gap-2">
        {first24Hours.map((h, i) => (
          <button
            key={h.hour}
            onClick={() => setStep(i)}
            className={`rounded-full px-4 py-2 font-mono text-sm font-medium transition-all ${
              step === i
                ? "text-white"
                : "bg-bg-secondary text-text-secondary hover:text-text-primary"
            }`}
            style={{
              backgroundColor: step === i ? h.color : undefined,
            }}
          >
            {h.hour}
          </button>
        ))}
      </div>

      {/* Step content */}
      <div
        className="mt-10 mx-auto max-w-2xl rounded-2xl border border-border bg-bg-card p-8 transition-all duration-500"
        style={{
          borderColor: current.color,
          borderWidth: "1px",
        }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Icon */}
          <div className="mb-4">{icons[current.icon]}</div>

          <p
            className="font-mono text-xs font-bold uppercase tracking-widest"
            style={{ color: current.color }}
          >
            {current.hour}
          </p>
          <h3 className="mt-2 font-serif text-2xl font-bold text-text-primary sm:text-3xl">
            {current.title}
          </h3>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            {current.description}
          </p>
        </div>

        {/* Color bar at bottom */}
        <div
          className="mt-6 h-1 w-full rounded-full"
          style={{
            background: `linear-gradient(90deg, ${
              step === 0
                ? "var(--firestorm-hot), var(--firestorm)"
                : step === 1
                  ? "var(--firestorm), var(--firestorm-hot)"
                  : "var(--winter-blue), var(--winter-cold)"
            })`,
          }}
        />
      </div>

      {/* Key fact callout */}
      <div className="mt-8 mx-auto max-w-lg rounded-lg bg-bg-secondary p-4">
        <p className="text-center text-sm text-text-secondary">
          <span className="font-mono font-bold text-firestorm">Fact:</span>{" "}
          Fish preserved in North Dakota &mdash; 2,000 miles from the crater
          &mdash; died within minutes of impact. Impact glass was found lodged
          in their gills.
        </p>
      </div>
    </SectionWrapper>
  );
}
