"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function TrackClampSection() {
  return (
    <SectionWrapper id="track-clamp" layout="centered">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 07
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Three-Wheel Clamp
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          You&rsquo;re not held in by luck or centripetal force alone. Every roller
          coaster car is physically clamped to the track from three directions.
          Even if the car stopped at the top of a loop, it couldn&rsquo;t fall off.
        </p>

        {/* Cross-section diagram */}
        <div className="mx-auto max-w-md">
          <div className="rounded-xl border border-border bg-bg-card p-6">
            <svg
              viewBox="0 0 320 340"
              className="w-full"
              aria-label="Cross-section of roller coaster wheel assembly showing three wheel types"
            >
              {/* Rail cross-section - I-beam shape */}
              <rect x="140" y="100" width="40" height="140" rx="2" fill="var(--text-tertiary)" opacity="0.3" />
              <rect x="120" y="90" width="80" height="20" rx="3" fill="var(--text-tertiary)" opacity="0.5" />
              <rect x="120" y="230" width="80" height="20" rx="3" fill="var(--text-tertiary)" opacity="0.5" />

              {/* Rail label */}
              <text x="160" y="180" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-jetbrains)">Rail</text>

              {/* Road wheels (on top) */}
              <circle cx="120" cy="80" r="18" fill="none" stroke="var(--kinetic)" strokeWidth="3" />
              <circle cx="120" cy="80" r="3" fill="var(--kinetic)" />
              <circle cx="200" cy="80" r="18" fill="none" stroke="var(--kinetic)" strokeWidth="3" />
              <circle cx="200" cy="80" r="3" fill="var(--kinetic)" />

              {/* Road wheel label */}
              <line x1="230" y1="80" x2="275" y2="55" stroke="var(--kinetic)" strokeWidth="1" />
              <text x="278" y="50" fill="var(--kinetic)" fontSize="11" fontFamily="var(--font-jetbrains)">Road wheels</text>
              <text x="278" y="63" fill="var(--kinetic)" fontSize="9" fontFamily="var(--font-jetbrains)">(ride on top)</text>

              {/* Guide wheels (sides) */}
              <circle cx="108" cy="160" r="14" fill="none" stroke="var(--potential)" strokeWidth="3" />
              <circle cx="108" cy="160" r="2.5" fill="var(--potential)" />
              <circle cx="212" cy="160" r="14" fill="none" stroke="var(--potential)" strokeWidth="3" />
              <circle cx="212" cy="160" r="2.5" fill="var(--potential)" />

              {/* Guide wheel label */}
              <line x1="234" y1="160" x2="275" y2="145" stroke="var(--potential)" strokeWidth="1" />
              <text x="278" y="140" fill="var(--potential)" fontSize="11" fontFamily="var(--font-jetbrains)">Guide wheels</text>
              <text x="278" y="153" fill="var(--potential)" fontSize="9" fontFamily="var(--font-jetbrains)">(grip sides)</text>

              {/* Upstop wheels (underneath) */}
              <circle cx="120" cy="260" r="18" fill="none" stroke="var(--force-red)" strokeWidth="3" />
              <circle cx="120" cy="260" r="3" fill="var(--force-red)" />
              <circle cx="200" cy="260" r="18" fill="none" stroke="var(--force-red)" strokeWidth="3" />
              <circle cx="200" cy="260" r="3" fill="var(--force-red)" />

              {/* Upstop wheel label */}
              <line x1="230" y1="260" x2="275" y2="275" stroke="var(--force-red)" strokeWidth="1" />
              <text x="278" y="270" fill="var(--force-red)" fontSize="11" fontFamily="var(--font-jetbrains)">Upstop wheels</text>
              <text x="278" y="283" fill="var(--force-red)" fontSize="9" fontFamily="var(--font-jetbrains)">(prevent lift-off)</text>

              {/* Direction arrows showing clamping */}
              <path d="M120 55 L120 62" stroke="var(--kinetic)" strokeWidth="2" markerEnd="url(#arrowDown)" />
              <path d="M200 55 L200 62" stroke="var(--kinetic)" strokeWidth="2" markerEnd="url(#arrowDown)" />

              <path d="M96 160 L104 160" stroke="var(--potential)" strokeWidth="2" />
              <path d="M216 160 L224 160" stroke="var(--potential)" strokeWidth="2" />

              <path d="M120 285 L120 278" stroke="var(--force-red)" strokeWidth="2" />
              <path d="M200 285 L200 278" stroke="var(--force-red)" strokeWidth="2" />

              {/* Title */}
              <text x="160" y="325" textAnchor="middle" fill="var(--text-primary)" fontSize="12" fontFamily="var(--font-jetbrains)" fontWeight="bold">Cross-section view</text>

              <defs>
                <marker id="arrowDown" markerWidth="6" markerHeight="6" refX="3" refY="6" orient="auto">
                  <path d="M0 0 L3 6 L6 0" fill="var(--kinetic)" />
                </marker>
              </defs>
            </svg>
          </div>
        </div>

        {/* Three wheel types explanation */}
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border-l-4 border-kinetic bg-bg-card p-5">
            <p className="font-mono text-sm font-bold text-kinetic">Road Wheels</p>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              Sit on top of the rail. These carry the weight and are what most
              people picture as &ldquo;train wheels.&rdquo;
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-potential bg-bg-card p-5">
            <p className="font-mono text-sm font-bold text-potential">Guide Wheels</p>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              Grip the sides of the rail. These keep the car centered and prevent
              lateral movement on turns.
            </p>
          </div>
          <div className="rounded-xl border-l-4 border-force-red bg-bg-card p-5">
            <p className="font-mono text-sm font-bold text-force-red">Upstop Wheels</p>
            <p className="mt-2 font-sans text-sm text-text-secondary">
              Ride under the rail. These prevent the car from lifting off the track
              &mdash; the critical safety feature.
            </p>
          </div>
        </div>

        <div className="pull-quote max-w-2xl">
          You&rsquo;re not held in by luck. You&rsquo;re clamped to the track from
          three directions.
        </div>
      </div>
    </SectionWrapper>
  );
}
