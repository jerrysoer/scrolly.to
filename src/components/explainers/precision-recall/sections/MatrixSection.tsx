"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface MatrixSectionProps {
  truePositives: number;
  falseNegatives: number;
  falsePositives: number;
  trueNegatives: number;
}

function ConfusionMatrix({ truePositives, falseNegatives, falsePositives, trueNegatives }: MatrixSectionProps) {
  const dotSize = 4;
  const dotsPerRow = 10;

  const renderDots = (count: number, color: string, startX: number, startY: number) =>
    Array.from({ length: count }).map((_, i) => {
      const row = Math.floor(i / dotsPerRow);
      const col = i % dotsPerRow;
      return (
        <circle
          key={i}
          cx={startX + col * (dotSize + 2)}
          cy={startY + row * (dotSize + 2)}
          r={dotSize / 2}
          fill={color}
          style={{ transition: "all 0.5s ease-out", transitionDelay: `${i * 10}ms` }}
        />
      );
    });

  return (
    <div className="story-card p-6 md:p-8">
      <h3 className="pr-display text-2xl text-center mb-6">Confusion Matrix</h3>
      <p className="pr-body text-base text-center mb-8" style={{ color: "var(--text-tertiary)" }}>
        100 samples visualized as dots
      </p>

      <svg viewBox="0 0 320 200" className="mx-auto w-full max-w-md">
        <text x="100" y="20" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" fontWeight="500">
          Predicted Positive
        </text>
        <text x="240" y="20" textAnchor="middle" fontSize="11" fill="var(--text-tertiary)" fontWeight="500">
          Predicted Negative
        </text>
        <text x="15" y="75" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontWeight="500" transform="rotate(-90, 15, 75)">
          Actually Positive
        </text>
        <text x="15" y="150" textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontWeight="500" transform="rotate(-90, 15, 150)">
          Actually Negative
        </text>

        <rect x="40" y="30" width="100" height="70" rx="6" className="matrix-box tp" />
        <rect x="180" y="30" width="100" height="70" rx="6" className="matrix-box fn" />
        <rect x="40" y="110" width="100" height="70" rx="6" className="matrix-box fp" />
        <rect x="180" y="110" width="100" height="70" rx="6" className="matrix-box tn" />

        <text x="90" y="45" textAnchor="middle" fontSize="9" fill="var(--pr-green)" fontWeight="600">
          TP: {truePositives}
        </text>
        <text x="230" y="45" textAnchor="middle" fontSize="9" fill="var(--pr-terracotta)" fontWeight="600">
          FN: {falseNegatives}
        </text>
        <text x="90" y="125" textAnchor="middle" fontSize="9" fill="var(--pr-terracotta)" fontWeight="600">
          FP: {falsePositives}
        </text>
        <text x="230" y="125" textAnchor="middle" fontSize="9" fill="var(--text-tertiary)" fontWeight="600">
          TN: {trueNegatives}
        </text>

        {renderDots(truePositives, "var(--pr-green)", 50, 52)}
        {renderDots(falseNegatives, "var(--pr-terracotta)", 190, 52)}
        {renderDots(falsePositives, "var(--pr-terracotta)", 50, 132)}
        {renderDots(trueNegatives, "var(--text-tertiary)", 190, 132)}
      </svg>
    </div>
  );
}

export default function MatrixSection(props: MatrixSectionProps) {
  return (
    <SectionWrapper id="matrix" tinted>
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 text-center">
          <p className="pr-body text-sm tracking-[0.2em] uppercase mb-4" style={{ color: "var(--text-tertiary)" }}>
            Visualization
          </p>
          <h2 className="pr-display text-4xl md:text-5xl mb-4">See the Numbers</h2>
          <p className="pr-body text-lg" style={{ color: "var(--text-tertiary)" }}>
            Watch dots move as you adjust the threshold above
          </p>
        </div>
        <ConfusionMatrix {...props} />
      </div>
    </SectionWrapper>
  );
}
