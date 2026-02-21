"use client";

import { useState, type ReactNode } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

const traders = [
  { name: "Fisher", has: "Fish", needs: "Shoes", color: "#3b82f6" },
  { name: "Cobbler", has: "Shoes", needs: "Bread", color: "#f59e0b" },
  { name: "Baker", has: "Bread", needs: "Fish", color: "#ef4444" },
];

const traderIcons: Record<string, ReactNode> = {
  Fish: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <ellipse cx="20" cy="20" rx="14" ry="8" fill="currentColor" opacity="0.8" />
      <polygon points="34,20 40,14 40,26" fill="currentColor" opacity="0.6" />
      <circle cx="12" cy="18" r="2" fill="var(--bg-card)" />
    </svg>
  ),
  Shoes: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <path d="M5 28 L5 20 Q5 15 15 15 L30 15 Q38 15 38 22 L38 28 Z" fill="currentColor" opacity="0.8" />
      <rect x="3" y="26" width="37" height="4" rx="2" fill="currentColor" opacity="0.6" />
    </svg>
  ),
  Bread: (
    <svg viewBox="0 0 40 40" className="h-10 w-10">
      <ellipse cx="20" cy="22" rx="16" ry="10" fill="currentColor" opacity="0.8" />
      <ellipse cx="20" cy="20" rx="14" ry="8" fill="currentColor" opacity="0.6" />
      <path d="M10 18 Q15 14 20 16 Q25 14 30 18" fill="none" stroke="var(--bg-card)" strokeWidth="1.5" opacity="0.5" />
    </svg>
  ),
};

export default function BeforeMoneySection() {
  const [attempted, setAttempted] = useState(false);
  const [selectedPair, setSelectedPair] = useState<[number, number] | null>(null);

  const handleTryMatch = (i: number, j: number) => {
    setSelectedPair([i, j]);
    setAttempted(true);
  };

  const canTrade = (a: number, b: number) => {
    return traders[a].has === traders[b].needs && traders[b].has === traders[a].needs;
  };

  return (
    <SectionWrapper id="before-money" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
        Section 1
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        Before Money
      </h2>

      <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
        Imagine a world with no money. You have something someone wants, and they have
        something you want. Simple, right? Try it.
      </p>

      {/* Barter puzzle */}
      <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {traders.map((trader, i) => (
          <div
            key={trader.name}
            className="rounded-xl border p-6 text-center transition-all duration-200 hover:shadow-md"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: selectedPair && selectedPair.includes(i) ? trader.color : "var(--border)",
              boxShadow: selectedPair && selectedPair.includes(i) ? `0 0 0 2px ${trader.color}30` : undefined,
            }}
          >
            <div style={{ color: trader.color }}>{traderIcons[trader.has]}</div>
            <p className="mt-3 font-sans text-lg font-semibold text-text-primary">{trader.name}</p>
            <p className="mt-1 font-sans text-sm text-text-secondary">
              Has: <span className="font-semibold">{trader.has}</span>
            </p>
            <p className="font-sans text-sm text-text-secondary">
              Needs: <span className="font-semibold">{trader.needs}</span>
            </p>
          </div>
        ))}
      </div>

      {/* Match buttons */}
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {[[0, 1], [1, 2], [0, 2]].map(([a, b]) => (
          <button
            key={`${a}-${b}`}
            onClick={() => handleTryMatch(a, b)}
            className="rounded-lg border border-border bg-bg-card px-4 py-2 font-sans text-sm font-medium text-text-primary transition-all hover:border-money-green hover:shadow-sm"
          >
            {traders[a].name} &harr; {traders[b].name}
          </button>
        ))}
      </div>

      {/* Result */}
      {attempted && selectedPair && (
        <div
          className="mt-6 rounded-xl border p-5"
          style={{
            backgroundColor: canTrade(selectedPair[0], selectedPair[1]) ? "var(--money-green)" : "var(--bg-secondary)",
            borderColor: "var(--border)",
            animation: "fade-in 0.4s ease-out both",
          }}
        >
          <p className="font-sans text-base font-semibold text-inflation-red">
            Trade fails!
          </p>
          <p className="mt-1 font-sans text-sm text-text-secondary">
            {traders[selectedPair[0]].name} has {traders[selectedPair[0]].has} but{" "}
            {traders[selectedPair[1]].name} needs {traders[selectedPair[1]].needs}, not{" "}
            {traders[selectedPair[0]].has}.
            No pair can trade directly &mdash; everyone wants what someone else has, but nobody wants what their trading partner offers.
          </p>
        </div>
      )}

      {/* Callout */}
      <div className="mt-8 rounded-xl border border-border bg-bg-card p-6">
        <p className="font-sans text-sm font-semibold text-text-primary">
          This is the{" "}
          <JargonTerm
            term="double coincidence of wants"
            definition="Both parties in a trade must want exactly what the other has. As societies grow, this becomes nearly impossible."
          />
          {" "}problem.
        </p>
        <p className="mt-2 font-sans text-sm text-text-secondary">
          With 3 people, it&rsquo;s annoying. With 3,000 people in a village, it&rsquo;s
          impossible. This is why humans invented money &mdash; a thing everyone agrees to
          accept, even if they don&rsquo;t personally need it.
        </p>
      </div>

      {/* Fun fact */}
      <div className="mt-6 pull-quote">
        &ldquo;Salary&rdquo; comes from &ldquo;sal&rdquo; (salt) &mdash; Roman soldiers were
        sometimes paid in salt, one of history&rsquo;s first forms of money.
      </div>
    </SectionWrapper>
  );
}
