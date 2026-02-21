"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import { albrechtSteps, albrechtSecrecyQuote } from "@/components/explainers/trader-joes/data/part-2";

export default function AlbrechtSection() {
  const steps = [
    ...albrechtSteps.map((step) => ({
      id: step.id,
      content: (
        <p
          className="text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          {step.content}
        </p>
      ),
    })),
    {
      id: "albrecht-quote",
      content: (
        <PullQuote quote={albrechtSecrecyQuote} variant="editorial" />
      ),
    },
  ];

  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">02</span>
      </div>

      <StickyDiagram
        id="albrecht"
        visualSide="right"
        steps={steps}
        renderVisual={() => (
          <div className="sticky top-24">
            <div className="overflow-hidden rounded-xl">
              <img
                src="/albrecht-brothers.png"
                alt="Two 1950s German businessmen"
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
              Nanobanana / AI-generated illustration
            </p>
          </div>
        )}
      />
    </>
  );
}
