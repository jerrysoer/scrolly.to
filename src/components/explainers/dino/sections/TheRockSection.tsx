"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

const comparisons = [
  {
    name: "Chicxulub Asteroid",
    miles: 6,
    color: "var(--firestorm-hot)",
    maxBarWidth: 100,
  },
  {
    name: "Mount Everest",
    miles: 5.5,
    color: "var(--winter-blue)",
    maxBarWidth: 92,
  },
  {
    name: "Chicxulub Crater",
    miles: 93,
    color: "var(--firestorm)",
    maxBarWidth: 100,
  },
];

export default function TheRockSection() {
  return (
    <SectionWrapper id="the-rock" className="section-tinted">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
        Section 2
      </p>
      <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
        The Rock
      </h2>
      <p className="mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary">
        A chunk of rock and metal roughly 6 miles across &mdash; slightly taller
        than Mount Everest &mdash; was hurtling toward Earth at{" "}
        <JargonTerm
          term="45,000 mph"
          definition="About 60 times the speed of sound. It crossed the distance from New York to LA in under 4 minutes."
        />
        . It struck a shallow sea covering what is now the Yucatan Peninsula.
      </p>

      {/* Scale comparison visualization */}
      <div className="mt-12 space-y-6">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-text-tertiary">
          Size comparison
        </h3>

        {/* SVG side-by-side comparison */}
        <div className="flex items-end justify-center gap-6 sm:gap-12">
          {/* Asteroid */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
              <defs>
                <radialGradient id="asteroid-grad" cx="40%" cy="40%">
                  <stop offset="0%" stopColor="#fbbf24" />
                  <stop offset="50%" stopColor="#b45309" />
                  <stop offset="100%" stopColor="#78350f" />
                </radialGradient>
              </defs>
              {/* Irregular asteroid shape */}
              <path
                d="M60 10 C80 8, 105 25, 110 50 C115 75, 100 100, 75 110 C50 115, 20 105, 12 80 C5 55, 15 25, 40 12 Z"
                fill="url(#asteroid-grad)"
              />
              {/* Craters */}
              <circle cx="50" cy="40" r="8" fill="#92400e" opacity="0.5" />
              <circle cx="75" cy="65" r="6" fill="#92400e" opacity="0.4" />
              <circle cx="40" cy="75" r="5" fill="#92400e" opacity="0.3" />
              {/* Hot glow */}
              <path
                d="M60 10 C80 8, 105 25, 110 50 C115 75, 100 100, 75 110 C50 115, 20 105, 12 80 C5 55, 15 25, 40 12 Z"
                fill="none"
                stroke="#fbbf24"
                strokeWidth="2"
                opacity="0.4"
              />
            </svg>
            <p className="mt-2 font-mono text-lg font-bold text-firestorm-hot">
              6 mi
            </p>
            <p className="text-xs text-text-tertiary">Asteroid</p>
          </div>

          {/* Mount Everest */}
          <div className="flex flex-col items-center">
            <svg viewBox="0 0 120 120" className="h-28 w-28 sm:h-36 sm:w-36">
              <path
                d="M10 110 L50 25 L60 40 L70 20 L90 50 L110 110 Z"
                fill="var(--winter-blue)"
                opacity="0.6"
              />
              {/* Snow cap */}
              <path
                d="M50 25 L60 40 L70 20 L62 35 L55 30 Z"
                fill="white"
                opacity="0.8"
              />
              <path
                d="M10 110 L50 25 L60 40 L70 20 L90 50 L110 110 Z"
                fill="none"
                stroke="var(--winter-blue)"
                strokeWidth="1.5"
              />
            </svg>
            <p className="mt-2 font-mono text-lg font-bold text-winter-blue">
              5.5 mi
            </p>
            <p className="text-xs text-text-tertiary">Mt. Everest</p>
          </div>
        </div>

        {/* Crater width bar */}
        <div className="mx-auto mt-8 max-w-lg">
          <div className="rounded-lg border border-border bg-bg-card p-5">
            <div className="flex items-center justify-between">
              <span className="text-sm text-text-secondary">
                Resulting crater width
              </span>
              <span className="font-mono text-sm font-bold text-firestorm">
                93 miles
              </span>
            </div>
            <div className="mt-3 h-4 w-full overflow-hidden rounded-full bg-bg-secondary">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: "100%",
                  background:
                    "linear-gradient(90deg, var(--firestorm-hot), var(--firestorm))",
                }}
              />
            </div>
            <p className="mt-2 text-xs text-text-tertiary">
              Still visible from space. Wider than the state of Connecticut.
            </p>
          </div>
        </div>
      </div>

      {/* Speed + energy callouts */}
      <div className="mt-10 grid gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="stat-hero">45K</p>
          <p className="mt-1 text-sm text-text-secondary">
            mph at impact &mdash; 60x the speed of sound
          </p>
        </div>
        <div className="rounded-xl border border-border bg-bg-card p-5">
          <p className="stat-hero">10B</p>
          <p className="mt-1 text-sm text-text-secondary">
            times the energy of the Hiroshima bomb
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
