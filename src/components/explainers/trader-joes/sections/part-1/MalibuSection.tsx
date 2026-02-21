"use client";

import StickyDiagram from "@/components/explainers/trader-joes/shared/StickyDiagram";
import { malibuSteps } from "@/components/explainers/trader-joes/data/part-1";

export default function MalibuSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">06</span>
      </div>

      <StickyDiagram
        id="malibu"
        visualSide="left"
        steps={malibuSteps.map((step) => ({
          id: step.id,
          content: (
            <p
              className="text-base leading-relaxed sm:text-lg"
              style={{
                fontFamily: "var(--font-playfair), Georgia, serif",
                color: "var(--text-secondary)",
                borderLeft: "2px solid var(--accent-navy)",
                paddingLeft: "1rem",
              }}
            >
              {step.content}
            </p>
          ),
        }))}
        renderVisual={(activeStepIndex) => (
          <div className={`sticky top-24 ${activeStepIndex >= 2 ? "slow-zoom" : ""}`}>
            <div className="overflow-hidden rounded-xl">
              <img
                src="/mission-food-mart.png"
                alt="Mission Food Mart storefront in the 1960s — a small convenience store with stone facade, selling deli, meats, liquor, vegetables, and fruits"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "center" }}
              />
            </div>
            <p
              className="mt-2 text-right text-[10px] tracking-wide"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              South Pasadena Public Library
            </p>
          </div>
        )}
      />
    </>
  );
}
