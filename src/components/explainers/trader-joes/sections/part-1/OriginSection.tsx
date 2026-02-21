"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import { joeCoulombeBio, joeCoulombeQuote } from "@/components/explainers/trader-joes/data/part-1";

export default function OriginSection() {
  const steps = [
    {
      id: "bio-1",
      content: (
        <p
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {joeCoulombeBio[0]}
        </p>
      ),
    },
    {
      id: "bio-2",
      content: (
        <p
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {joeCoulombeBio[1]}
        </p>
      ),
    },
    {
      id: "bio-3",
      content: (
        <p
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {joeCoulombeBio[2]}
        </p>
      ),
    },
    {
      id: "bio-quote",
      content: (
        <PullQuote quote={joeCoulombeQuote} attribution="Joe Coulombe" />
      ),
    },
  ];

  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">02</span>
      </div>

      <StickyDiagram
        id="origin"
        visualSide="left"
        steps={steps}
        renderVisual={() => (
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/joe-coulombe-real.jpg"
                alt="Joe Coulombe, founder of Trader Joe's, holding a wheel of cheese in one of his stores"
                className="w-full object-cover"
                style={{ aspectRatio: "3/4", objectPosition: "center 20%" }}
              />
            </div>
            <p
              className="mt-2 text-right text-[10px] tracking-wide"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              John Blackmer / Orange County Register / Getty Images
            </p>
          </div>
        )}
      />
    </>
  );
}
