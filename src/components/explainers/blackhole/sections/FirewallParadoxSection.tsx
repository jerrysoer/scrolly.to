"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function FirewallParadoxSection() {
  const [view, setView] = useState<"lost" | "escapes">("lost");

  return (
    <SectionWrapper id="firewall-paradox" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          09 &mdash; The Deepest Mystery
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Firewall Paradox
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          When a black hole evaporates through Hawking radiation, what happens to the
          information that fell in? Quantum mechanics says information can never be
          destroyed. General relativity says nothing can escape. They can&rsquo;t both be right.
        </p>

        {/* Toggle */}
        <div className="mt-10 mx-auto max-w-lg">
          <div className="flex rounded-xl border border-border bg-bg-card p-1">
            <button
              onClick={() => setView("lost")}
              className={`flex-1 rounded-lg px-4 py-3 font-sans text-sm font-medium transition-all duration-200 ${
                view === "lost"
                  ? "bg-redshift text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Information is destroyed
            </button>
            <button
              onClick={() => setView("escapes")}
              className={`flex-1 rounded-lg px-4 py-3 font-sans text-sm font-medium transition-all duration-200 ${
                view === "escapes"
                  ? "bg-space-blue text-white shadow-sm"
                  : "text-text-secondary hover:text-text-primary"
              }`}
            >
              Information escapes
            </button>
          </div>

          {/* Explanation panel */}
          <div className="mt-6 rounded-xl border border-border bg-bg-card p-6 transition-all duration-300">
            {view === "lost" ? (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-redshift/10">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-redshift" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0" strokeLinecap="round" />
                      <line x1="12" y1="2" x2="12" y2="12" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-text-primary">
                    Option A: Information is lost forever
                  </h3>
                </div>
                <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary">
                  If information is truly destroyed when a black hole evaporates, it breaks
                  a fundamental principle of quantum mechanics:{" "}
                  <span className="font-semibold text-text-primary">unitarity</span>. This
                  principle states that information is always preserved &mdash; you can always
                  reconstruct the past from the present.
                </p>
                <div className="mt-4 rounded-lg bg-redshift/5 border border-redshift/20 p-3">
                  <p className="font-sans text-xs text-redshift">
                    Consequence: Quantum mechanics is fundamentally incomplete. The universe can
                    &ldquo;forget&rdquo; things permanently.
                  </p>
                </div>
              </div>
            ) : (
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-space-blue/10">
                    <svg viewBox="0 0 24 24" className="h-5 w-5 text-space-blue" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M12 2L2 7l10 5 10-5-10-5z" />
                      <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                    </svg>
                  </div>
                  <h3 className="font-sans text-base font-semibold text-text-primary">
                    Option B: Information escapes somehow
                  </h3>
                </div>
                <p className="mt-4 font-sans text-sm leading-relaxed text-text-secondary">
                  If information does escape through Hawking radiation, it means there must be
                  some mechanism at the horizon that encodes information in the outgoing particles.
                  But this creates a &ldquo;firewall&rdquo; &mdash; a wall of high-energy radiation
                  at the horizon.
                </p>
                <div className="mt-4 rounded-lg bg-space-blue/5 border border-space-blue/20 p-3">
                  <p className="font-sans text-xs text-space-blue">
                    Consequence: General relativity is wrong about the horizon being a smooth,
                    uneventful boundary. Falling in would incinerate you.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Visual diagram */}
          <div className="mt-6 rounded-xl border border-border bg-bg-card p-6">
            <svg viewBox="0 0 400 160" className="w-full" aria-label="Information paradox diagram">
              <title>The information paradox</title>
              {/* Black hole */}
              <circle cx="200" cy="80" r="40" fill="var(--deep-space)" stroke="var(--border)" strokeWidth="1" />
              <circle cx="200" cy="80" r="55" fill="none" stroke="var(--redshift)" strokeWidth="1" strokeDasharray="4 3" />
              <text x="200" y="84" textAnchor="middle" fill="var(--text-tertiary)" fontSize="9">BH</text>

              {/* Information going in */}
              <path d="M50 80 L140 80" stroke="var(--space-blue)" strokeWidth="2" markerEnd="url(#arrowIn)" />
              <text x="95" y="70" textAnchor="middle" fill="var(--space-blue)" fontSize="9">info in</text>

              {/* Hawking radiation going out */}
              <path d="M260 60 L340 30" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M260 80 L350 80" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="3 2" />
              <path d="M260 100 L340 130" stroke="var(--amber)" strokeWidth="1.5" strokeDasharray="3 2" />

              <text x="340" y="20" fill="var(--amber)" fontSize="9">Hawking</text>
              <text x="340" y="32" fill="var(--amber)" fontSize="9">radiation</text>

              {/* Question mark */}
              <text x="200" y="145" textAnchor="middle" fill="var(--text-primary)" fontSize="16" fontWeight="bold">?</text>
              <text x="200" y="158" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8">Does information survive?</text>
            </svg>
          </div>
        </div>

        <blockquote className="pull-quote mt-8">
          One of the deepest unsolved problems in physics. Either quantum mechanics breaks,
          or general relativity does. We don&rsquo;t yet know which.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
