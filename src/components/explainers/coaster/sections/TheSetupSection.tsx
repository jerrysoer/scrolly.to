"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

export default function TheSetupSection() {
  return (
    <SectionWrapper id="the-setup" layout="full-bleed">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 01
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Setup
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          A roller coaster has{" "}
          <strong className="text-text-primary">no engine</strong>. After the chain
          lift hauls the train up the first hill, everything that follows is pure{" "}
          <JargonTerm
            term="gravity"
            definition="The force that pulls all objects toward the center of Earth, accelerating them at 9.8 m/s squared."
          />
          .
        </p>

        {/* SVG coaster profile with energy labels */}
        <div className="relative mx-auto max-w-3xl">
          <svg
            viewBox="0 0 800 350"
            className="w-full"
            xmlns="http://www.w3.org/2000/svg"
            aria-label="Roller coaster track profile showing potential and kinetic energy"
          >
            {/* Grid lines */}
            <line x1="40" y1="300" x2="760" y2="300" stroke="var(--border)" strokeWidth="1" />

            {/* Track profile */}
            <path
              d="M60 290 L60 290 Q80 290 100 270 L140 160 Q160 80 180 40 Q200 80 220 160 L260 250 Q280 290 300 270 Q320 240 340 190 Q360 140 370 140 Q380 140 400 190 Q420 240 440 260 Q460 280 490 270 Q520 260 540 240 Q560 220 580 240 Q600 260 620 270 Q640 280 670 280 Q700 280 730 285 L760 290"
              stroke="var(--text-tertiary)"
              strokeWidth="2.5"
              fill="none"
            />

            {/* Chain lift indicator */}
            <line x1="60" y1="290" x2="180" y2="40" stroke="var(--kinetic)" strokeWidth="2" strokeDasharray="6 4" />
            <text x="80" y="155" fill="var(--kinetic)" fontSize="11" fontFamily="var(--font-jetbrains)">Chain lift</text>

            {/* PE label at top */}
            <rect x="140" y="10" width="80" height="24" rx="4" fill="var(--potential)" opacity="0.15" />
            <text x="180" y="27" fill="var(--potential)" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="middle">Max PE</text>

            {/* KE label at bottom */}
            <rect x="215" y="260" width="80" height="24" rx="4" fill="var(--kinetic)" opacity="0.15" />
            <text x="255" y="277" fill="var(--kinetic)" fontSize="11" fontFamily="var(--font-jetbrains)" textAnchor="middle">Max KE</text>

            {/* Loop indicator */}
            <circle cx="370" cy="165" r="45" stroke="var(--force-red)" strokeWidth="1.5" fill="none" strokeDasharray="4 3" />
            <text x="370" y="108" fill="var(--force-red)" fontSize="10" fontFamily="var(--font-jetbrains)" textAnchor="middle">Loop</text>

            {/* Decreasing hills label */}
            <text x="600" y="210" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)" textAnchor="middle">Each hill shorter</text>

            {/* Car icon at top of first hill */}
            <rect x="170" y="30" width="20" height="12" rx="3" fill="var(--kinetic)" />
            <circle cx="175" cy="44" r="3" fill="var(--text-tertiary)" />
            <circle cx="185" cy="44" r="3" fill="var(--text-tertiary)" />

            {/* Ground line label */}
            <text x="760" y="316" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)" textAnchor="end">Ground level</text>
          </svg>
        </div>

        <div className="pull-quote max-w-2xl">
          The first hill is the only place energy enters the system. Everything
          after that is a conversion between height and speed.
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { label: "Potential Energy (PE)", desc: "Stored energy from height. Maximum at the top of each hill.", color: "border-potential" },
            { label: "Kinetic Energy (KE)", desc: "Energy of motion. Maximum at the bottom of each valley.", color: "border-kinetic" },
            { label: "Total Energy", desc: "PE + KE stays nearly constant. Small losses go to friction and air resistance.", color: "border-force-red" },
          ].map((card) => (
            <div
              key={card.label}
              className={`rounded-xl border-l-4 ${card.color} bg-bg-card p-5`}
            >
              <p className="font-sans text-sm font-semibold text-text-primary">{card.label}</p>
              <p className="mt-1 font-sans text-sm text-text-secondary">{card.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
