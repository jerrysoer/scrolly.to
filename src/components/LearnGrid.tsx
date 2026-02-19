"use client";

import { useState } from "react";
import ExplainerCard, { ExplainerCardData } from "./ExplainerCard";

interface LearnGridProps {
  cards: ExplainerCardData[];
}

export default function LearnGrid({ cards }: LearnGridProps) {
  const liveCards = cards.filter((c) => c.url && c.category !== "Your idea");
  const categories = ["All", ...Array.from(new Set(liveCards.map((c) => c.category)))];
  const [active, setActive] = useState("All");

  const filtered =
    active === "All"
      ? cards
      : cards.filter((c) => c.category === active || !c.url);

  return (
    <>
      {/* Card count */}
      <p className="mt-2 text-center text-sm text-text-muted">
        {liveCards.length} explainers and counting
      </p>

      {/* Category filter pills */}
      <div className="mt-8 flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActive(cat)}
            className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all ${
              active === cat
                ? "border-green bg-green text-white"
                : "border-border bg-card-bg text-text-muted hover:border-border-strong hover:text-text"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Card grid */}
      <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((card, i) => (
          <ExplainerCard
            key={`${card.title}-${i}`}
            card={card}
            index={i}
            animate
          />
        ))}
      </div>
    </>
  );
}
