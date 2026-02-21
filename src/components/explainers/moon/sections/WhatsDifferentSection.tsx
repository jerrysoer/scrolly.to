"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Rocket, Globe2, Building2 } from "lucide-react";

const shifts = [
  {
    icon: Rocket,
    title: "Private Companies",
    description:
      "SpaceX, Blue Origin, and others now build rockets faster and cheaper than any government agency. Starship costs a fraction of Saturn V.",
    color: "var(--space-blue)",
  },
  {
    icon: Globe2,
    title: "Global Competition",
    description:
      "China, India, and the EU all have active lunar programs. India landed at the south pole in 2023. This isn't a two-horse race anymore.",
    color: "var(--amber)",
  },
  {
    icon: Building2,
    title: "Permanent Base",
    description:
      "Apollo was plant-the-flag-and-leave. Artemis is build-a-base-and-stay. The goal is sustained presence, not a visit.",
    color: "var(--success-green)",
  },
];

export default function WhatsDifferentSection() {
  return (
    <SectionWrapper id="whats-different" layout="centered" stagger>
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 3
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        What&rsquo;s Different Now
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Three fundamental shifts make this return to the Moon different from
        anything that came before.
      </p>

      {/* Apollo vs Artemis comparison */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Apollo (1969-72)
          </p>
          <div className="mt-4 flex justify-center">
            <svg viewBox="0 0 200 160" className="h-32 w-auto" aria-label="Apollo mission profile">
              <title>Apollo: plant flag and leave</title>
              {/* Surface */}
              <rect x="0" y="120" width="200" height="40" fill="var(--lunar-silver)" opacity="0.3" rx="4" />
              {/* LM simple */}
              <rect x="80" y="80" width="40" height="40" fill="var(--text-tertiary)" rx="4" />
              <rect x="85" y="65" width="30" height="20" fill="var(--text-tertiary)" rx="10" />
              {/* Flag */}
              <line x1="140" y1="85" x2="140" y2="115" stroke="var(--amber)" strokeWidth="2" />
              <rect x="140" y="85" width="20" height="14" fill="var(--amber)" opacity="0.8" rx="1" />
              {/* Footprints away */}
              <circle cx="160" cy="118" r="2" fill="var(--text-tertiary)" opacity="0.5" />
              <circle cx="170" cy="116" r="2" fill="var(--text-tertiary)" opacity="0.4" />
              <circle cx="180" cy="118" r="2" fill="var(--text-tertiary)" opacity="0.3" />
              {/* Arrow up */}
              <path d="M100 60 L100 30 L90 40 M100 30 L110 40" stroke="var(--text-tertiary)" strokeWidth="2" fill="none" />
            </svg>
          </div>
          <p className="mt-3 text-center font-sans text-sm text-text-tertiary">
            Plant flag. Collect rocks. Leave.
          </p>
        </div>

        <div className="rounded-xl border-2 border-space-blue/30 bg-bg-card p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
            Artemis (2025+)
          </p>
          <div className="mt-4 flex justify-center">
            <svg viewBox="0 0 200 160" className="h-32 w-auto" aria-label="Artemis mission profile">
              <title>Artemis: build base and stay</title>
              {/* Surface */}
              <rect x="0" y="120" width="200" height="40" fill="var(--lunar-silver)" opacity="0.3" rx="4" />
              {/* Habitat dome */}
              <ellipse cx="70" cy="110" rx="35" ry="20" fill="var(--space-blue)" opacity="0.3" />
              <ellipse cx="70" cy="110" rx="35" ry="20" fill="none" stroke="var(--space-blue)" strokeWidth="1.5" />
              {/* Solar panels */}
              <rect x="110" y="95" width="25" height="3" fill="var(--amber)" rx="1" />
              <rect x="110" y="100" width="25" height="3" fill="var(--amber)" rx="1" />
              <line x1="108" y1="93" x2="108" y2="112" stroke="var(--text-tertiary)" strokeWidth="1.5" />
              {/* Rover */}
              <rect x="145" y="108" width="25" height="12" fill="var(--text-primary)" opacity="0.6" rx="3" />
              <circle cx="150" cy="122" r="4" fill="var(--text-tertiary)" />
              <circle cx="165" cy="122" r="4" fill="var(--text-tertiary)" />
              {/* Gateway in orbit */}
              <ellipse cx="100" cy="25" rx="60" ry="15" fill="none" stroke="var(--space-blue)" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.5" />
              <rect x="90" y="18" width="20" height="10" fill="var(--space-blue)" opacity="0.5" rx="2" />
              <rect x="80" y="21" width="10" height="4" fill="var(--amber)" opacity="0.5" rx="1" />
              <rect x="110" y="21" width="10" height="4" fill="var(--amber)" opacity="0.5" rx="1" />
            </svg>
          </div>
          <p className="mt-3 text-center font-sans text-sm text-space-blue font-medium">
            Build habitat. Extract resources. Stay.
          </p>
        </div>
      </div>

      {/* Three shifts grid */}
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {shifts.map((shift) => (
          <div
            key={shift.title}
            className="rounded-xl border border-border bg-bg-card p-6 transition-all hover:ring-2 hover:ring-space-blue/20"
          >
            <div
              className="flex h-10 w-10 items-center justify-center rounded-lg"
              style={{ backgroundColor: shift.color, opacity: 0.15 }}
            >
              <shift.icon size={20} style={{ color: shift.color }} />
            </div>
            <h3 className="mt-4 font-sans text-base font-semibold text-text-primary">
              {shift.title}
            </h3>
            <p className="mt-2 font-sans text-sm leading-relaxed text-text-secondary">
              {shift.description}
            </p>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
