"use client";

import { useState } from "react";
import { ChevronRight, ChevronLeft } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

interface Stage {
  id: string;
  title: string;
  confidence: number;
  competence: number;
  description: string;
  hareLesson: string;
  tortoiseLesson: string;
  x: number;
  y: number;
}

const stages: Stage[] = [
  {
    id: "peak-ignorance",
    title: "Peak of Ignorance",
    confidence: 90,
    competence: 10,
    description:
      "You know just enough to feel invincible. The Dunning-Kruger peak: maximum confidence, minimum competence.",
    hareLesson: 'The hare at the starting line. "This will be easy."',
    tortoiseLesson: "The tortoise knows the road is long.",
    x: 15,
    y: 10,
  },
  {
    id: "valley-despair",
    title: "Valley of Despair",
    confidence: 20,
    competence: 30,
    description:
      'Reality hits. You realize how much you don\'t know. Most people quit here.',
    hareLesson: "The hare mid-nap, vaguely aware of footsteps approaching.",
    tortoiseLesson: "The tortoise is simply walking. No drama, no despair.",
    x: 40,
    y: 80,
  },
  {
    id: "slope-enlightenment",
    title: "Slope of Enlightenment",
    confidence: 55,
    competence: 65,
    description:
      "Deliberate practice begins to pay off. Confidence rebuilds, but grounded in reality.",
    hareLesson: "The hare wakes up and starts running again -- but is it too late?",
    tortoiseLesson: "The tortoise passes the halfway mark. No celebration, just walking.",
    x: 65,
    y: 40,
  },
  {
    id: "plateau-mastery",
    title: "Plateau of Mastery",
    confidence: 75,
    competence: 90,
    description:
      "High competence with calibrated confidence. You know what you know -- and what you don't.",
    hareLesson: "Too late. The finish line is behind the tortoise.",
    tortoiseLesson: 'The tortoise crosses the line. "There\'s another race tomorrow."',
    x: 90,
    y: 25,
  },
];

export default function OverconfidenceSection() {
  const [currentStage, setCurrentStage] = useState(0);
  const stage = stages[currentStage];

  const pathData = stages
    .map((s, i) => `${i === 0 ? "M" : "C"} ${i === 0 ? "" : `${stages[i - 1].x + 10},${stages[i - 1].y} ${s.x - 10},${s.y} `}${s.x},${s.y}`)
    .join(" ");

  return (
    <SectionWrapper id="overconfidence" className="py-24 sm:py-32 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            Section III
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl font-light mb-4">
            The Psychology of Overconfidence
          </h2>
          <p className="font-body text-lg text-text-secondary max-w-2xl mx-auto">
            The Dunning-Kruger effect mapped onto the fable. Click through each stage
            to see where the hare&apos;s mindset fails -- and why the tortoise is immune.
          </p>
        </div>

        {/* Interactive chart */}
        <div className="bg-bg-card border border-border rounded-2xl p-4 sm:p-8 mb-8">
          <svg viewBox="0 0 100 100" className="w-full max-w-3xl mx-auto" style={{ aspectRatio: "2 / 1" }}>
            {/* Grid lines */}
            {[20, 40, 60, 80].map((v) => (
              <line
                key={`h-${v}`}
                x1="5"
                y1={v}
                x2="95"
                y2={v}
                stroke="var(--border)"
                strokeWidth="0.2"
              />
            ))}

            {/* Axes */}
            <line x1="5" y1="95" x2="95" y2="95" stroke="var(--text-tertiary)" strokeWidth="0.3" />
            <line x1="5" y1="5" x2="5" y2="95" stroke="var(--text-tertiary)" strokeWidth="0.3" />

            {/* Labels */}
            <text x="50" y="99" textAnchor="middle" fill="var(--text-tertiary)" fontSize="3" fontFamily="var(--font-mono)">
              COMPETENCE
            </text>
            <text x="2" y="50" textAnchor="middle" fill="var(--text-tertiary)" fontSize="3" fontFamily="var(--font-mono)" transform="rotate(-90 2 50)">
              CONFIDENCE
            </text>

            {/* Curve */}
            <path
              d={pathData}
              fill="none"
              stroke="var(--accent-purple)"
              strokeWidth="0.6"
              opacity={0.4}
            />

            {/* Stage dots */}
            {stages.map((s, i) => (
              <g key={s.id}>
                <circle
                  cx={s.x}
                  cy={s.y}
                  r={currentStage === i ? 3 : 2}
                  fill={currentStage === i ? "var(--accent-purple)" : "var(--text-tertiary)"}
                  className="cursor-pointer transition-all duration-300"
                  onClick={() => setCurrentStage(i)}
                  opacity={currentStage === i ? 1 : 0.5}
                />
                {currentStage === i && (
                  <circle
                    cx={s.x}
                    cy={s.y}
                    r={5}
                    fill="none"
                    stroke="var(--accent-purple)"
                    strokeWidth="0.3"
                    opacity={0.5}
                    className="th-animate-pulse-glow"
                  />
                )}
                <text
                  x={s.x}
                  y={s.y - 5}
                  textAnchor="middle"
                  fill={currentStage === i ? "var(--text-primary)" : "var(--text-tertiary)"}
                  fontSize="2.5"
                  fontFamily="var(--font-body)"
                  className="pointer-events-none"
                >
                  {s.title}
                </text>
              </g>
            ))}
          </svg>
        </div>

        {/* Stage details */}
        <div className="bg-bg-card border border-border rounded-2xl p-6 sm:p-8">
          <div className="flex items-center justify-between mb-6">
            <button
              onClick={() => setCurrentStage(Math.max(0, currentStage - 1))}
              disabled={currentStage === 0}
              className="p-2 rounded-lg hover:bg-bg-secondary disabled:opacity-30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Previous stage"
            >
              <ChevronLeft size={20} />
            </button>
            <div className="text-center">
              <p className="font-mono text-xs text-accent-purple uppercase tracking-wider">
                Stage {currentStage + 1} of {stages.length}
              </p>
              <h3 className="font-heading text-2xl sm:text-3xl font-light mt-1">
                {stage.title}
              </h3>
            </div>
            <button
              onClick={() => setCurrentStage(Math.min(stages.length - 1, currentStage + 1))}
              disabled={currentStage === stages.length - 1}
              className="p-2 rounded-lg hover:bg-bg-secondary disabled:opacity-30 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Next stage"
            >
              <ChevronRight size={20} />
            </button>
          </div>

          <p className="text-text-secondary text-center mb-8 max-w-xl mx-auto">
            {stage.description}
          </p>

          {/* Confidence vs Competence bars */}
          <div className="grid grid-cols-2 gap-6 mb-8 max-w-lg mx-auto">
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-text-tertiary">Confidence</span>
                <span className="text-accent-purple">{stage.confidence}%</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-accent-purple rounded-full transition-all duration-700"
                  style={{ width: `${stage.confidence}%` }}
                />
              </div>
            </div>
            <div>
              <div className="flex justify-between text-xs font-mono mb-1">
                <span className="text-text-tertiary">Competence</span>
                <span className="text-forward-blue">{stage.competence}%</span>
              </div>
              <div className="h-2 bg-bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-forward-blue rounded-full transition-all duration-700"
                  style={{ width: `${stage.competence}%` }}
                />
              </div>
            </div>
          </div>

          {/* Hare vs Tortoise mindset */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-backward-orange/5 border border-backward-orange/20 rounded-xl p-4">
              <p className="text-xs font-mono text-backward-orange uppercase tracking-wider mb-2">
                The Hare&apos;s Mindset
              </p>
              <p className="text-sm text-text-secondary italic">&ldquo;{stage.hareLesson}&rdquo;</p>
            </div>
            <div className="bg-correct-green/5 border border-correct-green/20 rounded-xl p-4">
              <p className="text-xs font-mono text-correct-green uppercase tracking-wider mb-2">
                The Tortoise&apos;s Mindset
              </p>
              <p className="text-sm text-text-secondary italic">&ldquo;{stage.tortoiseLesson}&rdquo;</p>
            </div>
          </div>
        </div>

        {/* Progress dots for mobile */}
        <div className="flex justify-center gap-2 mt-6 sm:hidden">
          {stages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentStage(i)}
              className={`w-3 h-3 rounded-full transition-all ${
                currentStage === i ? "bg-accent-purple scale-125" : "bg-text-tertiary/30"
              }`}
              aria-label={`Go to stage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
