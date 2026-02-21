"use client";

import { useState, useCallback, useEffect } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { RefreshCw, Zap, Shuffle } from "lucide-react";

interface BubbleItem {
  id: number;
  label: string;
  category: string;
  x: number;
  y: number;
  size: number;
}

const initialCategories = [
  "Cooking",
  "Tech",
  "Comedy",
  "Education",
  "Cooking",
  "Tech",
  "Cooking",
  "Tech",
  "Cooking",
  "Tech",
  "Comedy",
  "Education",
];

const diverseCategories = [
  "Travel",
  "Art",
  "Sports",
  "Music",
  "Fashion",
  "Nature",
  "Science",
  "Dance",
  "Gaming",
  "History",
  "Pets",
  "DIY",
];

const categoryColors: Record<string, string> = {
  Cooking: "var(--backward-orange)",
  Tech: "var(--forward-blue)",
  Comedy: "var(--accent-amber)",
  Education: "var(--correct-green)",
  Travel: "var(--accent-purple)",
  Art: "var(--accent-purple)",
  Sports: "var(--correct-green)",
  Music: "var(--accent-amber)",
  Fashion: "var(--backward-orange)",
  Nature: "var(--correct-green)",
  Science: "var(--forward-blue)",
  Dance: "var(--accent-purple)",
  Gaming: "var(--backward-orange)",
  History: "var(--accent-amber)",
  Pets: "var(--correct-green)",
  DIY: "var(--forward-blue)",
};

function generateBubbles(
  categories: string[],
  spread: number
): BubbleItem[] {
  return categories.map((cat, i) => {
    const angle = (i / categories.length) * Math.PI * 2;
    const radius = 20 + spread * 15;
    const jitter = (Math.sin(i * 7.3) * 8) + (Math.cos(i * 3.1) * 5);
    return {
      id: i,
      label: cat,
      category: cat,
      x: 50 + Math.cos(angle) * radius + jitter,
      y: 50 + Math.sin(angle) * radius + (Math.sin(i * 2.7) * 5),
      size: 3 + Math.abs(Math.sin(i * 1.7)) * 2,
    };
  });
}

export default function FilterBubbleSection() {
  const [cycleStep, setCycleStep] = useState(0);
  const [isDiversified, setIsDiversified] = useState(false);
  const [bubbles, setBubbles] = useState<BubbleItem[]>(() =>
    generateBubbles(initialCategories, 1)
  );

  const cycleSteps = [
    {
      label: "Watch",
      description: "You watch a cooking video to completion",
      icon: "\u{1F440}",
    },
    {
      label: "Signal",
      description: "Algorithm registers strong food interest",
      icon: "\u{1F4E1}",
    },
    {
      label: "Recommend",
      description: "More cooking videos appear in your feed",
      icon: "\u{1F3AF}",
    },
    {
      label: "Watch More",
      description: "You watch those too \u2014 reinforcing the signal",
      icon: "\u{1F504}",
    },
    {
      label: "Narrow",
      description: "Feed converges: 80% cooking, 20% everything else",
      icon: "\u{1FAE7}",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCycleStep((prev) => (prev + 1) % cycleSteps.length);
    }, 2500);
    return () => clearInterval(timer);
  }, [cycleSteps.length]);

  const diversify = useCallback(() => {
    setIsDiversified(true);
    const mixed = initialCategories.map((cat, i) =>
      i % 2 === 0 ? diverseCategories[i % diverseCategories.length] : cat
    );
    setBubbles(generateBubbles(mixed, 2.5));
  }, []);

  const reset = useCallback(() => {
    setIsDiversified(false);
    setBubbles(generateBubbles(initialCategories, 1));
  }, []);

  return (
    <SectionWrapper id="filter-bubble">
      <div className="text-center mb-12">
        <p className="font-mono text-xs uppercase tracking-widest text-backward-orange mb-3">
          Section 06
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Filter Bubble Machine
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed text-text-secondary sm:text-lg">
          The same mechanism that makes TikTok addictive also traps you.
          Every interaction tightens the loop — watch, signal, recommend,
          repeat — until your feed becomes an echo chamber of your
          existing interests.
        </p>
      </div>

      {/* Feedback loop visualization */}
      <div className="mb-12">
        <div className="mx-auto max-w-md">
          {/* Cycle diagram */}
          <div className="relative">
            <div className="grid grid-cols-5 gap-2">
              {cycleSteps.map((step, i) => (
                <div
                  key={i}
                  className={`flex flex-col items-center text-center transition-all duration-300 ${
                    i === cycleStep
                      ? "scale-110 opacity-100"
                      : "scale-95 opacity-40"
                  }`}
                >
                  <div
                    className={`flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full text-xl sm:text-2xl transition-all ${
                      i === cycleStep
                        ? "bg-backward-orange/15 shadow-sm"
                        : "bg-bg-secondary"
                    }`}
                  >
                    {step.icon}
                  </div>
                  <span
                    className={`mt-2 font-sans text-[11px] sm:text-xs font-medium ${
                      i === cycleStep ? "text-text-primary" : "text-text-tertiary"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
              ))}
            </div>
            {/* Arrow indicators */}
            <div className="flex justify-between px-8 mt-1">
              {[0, 1, 2, 3].map((i) => (
                <span
                  key={i}
                  className={`text-text-tertiary/30 text-xs ${
                    i === cycleStep || i === (cycleStep + cycleSteps.length - 1) % cycleSteps.length
                      ? "text-backward-orange/50"
                      : ""
                  }`}
                >
                  &rarr;
                </span>
              ))}
            </div>
          </div>

          {/* Current step description */}
          <div className="mt-6 text-center rounded-xl bg-bg-card border border-border p-4" key={cycleStep}>
            <p className="font-sans text-sm text-text-secondary animate-slide-up">
              {cycleSteps[cycleStep].description}
            </p>
          </div>
        </div>
      </div>

      {/* Bubble visualization */}
      <div className="rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-serif text-lg font-semibold text-text-primary">
            Your Content Bubble
          </h3>
          <div className="flex gap-2">
            {isDiversified ? (
              <button
                onClick={reset}
                className="inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 font-sans text-xs font-medium text-text-secondary hover:text-text-primary transition-all"
              >
                <RefreshCw className="h-3 w-3" />
                Reset
              </button>
            ) : (
              <button
                onClick={diversify}
                className="inline-flex items-center gap-1.5 rounded-full border border-forward-blue/30 bg-forward-blue/5 px-3 py-1.5 font-sans text-xs font-medium text-forward-blue hover:bg-forward-blue/10 transition-all"
              >
                <Shuffle className="h-3 w-3" />
                Diversify
              </button>
            )}
          </div>
        </div>

        {/* SVG bubble chart */}
        <div className="aspect-square max-w-sm mx-auto relative">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            {/* Bubble boundary */}
            <circle
              cx="50"
              cy="50"
              r={isDiversified ? 45 : 30}
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.3"
              strokeDasharray="2 2"
              className="transition-all duration-700"
            />
            {/* Bubbles */}
            {bubbles.map((bubble) => (
              <g key={bubble.id} className="transition-all duration-700">
                <circle
                  cx={bubble.x}
                  cy={bubble.y}
                  r={bubble.size}
                  fill={categoryColors[bubble.category] || "var(--text-tertiary)"}
                  opacity={0.6}
                  className="transition-all duration-700"
                />
                <text
                  x={bubble.x}
                  y={bubble.y + 0.8}
                  textAnchor="middle"
                  fontSize="2.2"
                  fill="var(--text-primary)"
                  fontFamily="var(--font-inter), system-ui, sans-serif"
                  className="transition-all duration-700"
                >
                  {bubble.label}
                </text>
              </g>
            ))}
            {/* Center label */}
            <text
              x="50"
              y="50"
              textAnchor="middle"
              fontSize="3"
              fill="var(--text-tertiary)"
              fontFamily="var(--font-inter), system-ui, sans-serif"
              fontWeight="600"
            >
              You
            </text>
          </svg>
        </div>

        <p className="mt-4 font-sans text-sm text-text-secondary text-center">
          {isDiversified ? (
            <>
              <Zap className="inline h-4 w-4 text-forward-blue mr-1" />
              Diversified: the bubble expands as new categories enter your feed.
            </>
          ) : (
            <>
              Notice how tightly clustered the content is — mostly cooking and tech.
              Click <strong>Diversify</strong> to inject variety.
            </>
          )}
        </p>
      </div>
    </SectionWrapper>
  );
}
