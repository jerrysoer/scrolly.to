"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const hills = [
  { height: 100, label: "First hill", energy: 100 },
  { height: 78, label: "Second hill", energy: 82 },
  { height: 58, label: "Third hill", energy: 65 },
  { height: 42, label: "Fourth hill", energy: 50 },
  { height: 28, label: "Fifth hill", energy: 38 },
];

export default function FirstHillSection() {
  const [animating, setAnimating] = useState(false);
  const [carPosition, setCarPosition] = useState(0);
  const animRef = useRef<number | null>(null);

  const startAnimation = () => {
    setAnimating(true);
    setCarPosition(0);
    let pos = 0;

    const step = () => {
      pos += 0.3;
      if (pos > hills.length - 1) {
        pos = 0;
      }
      setCarPosition(pos);
      animRef.current = requestAnimationFrame(step);
    };

    animRef.current = requestAnimationFrame(step);
  };

  const stopAnimation = () => {
    setAnimating(false);
    if (animRef.current) {
      cancelAnimationFrame(animRef.current);
      animRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, []);

  const currentHillIndex = Math.min(Math.floor(carPosition), hills.length - 1);
  const currentEnergy = hills[currentHillIndex].energy;

  return (
    <SectionWrapper id="first-hill" layout="centered">
      <div className="space-y-8">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 08
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The First Hill Rules All
          </h2>
        </div>

        <p className="max-w-2xl font-sans text-lg leading-relaxed text-text-secondary">
          Every hill after the first is shorter. Why? Because some energy is
          always lost to friction and air resistance. The first hill sets the
          energy budget for the entire ride.
        </p>

        {/* Decreasing hills visualization */}
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <svg
            viewBox="0 0 700 280"
            className="w-full"
            aria-label="Decreasing roller coaster hills showing energy loss"
          >
            {/* Ground line */}
            <line x1="20" y1="250" x2="680" y2="250" stroke="var(--border)" strokeWidth="1" />

            {/* Hills */}
            {hills.map((hill, i) => {
              const x = 60 + i * 130;
              const topY = 250 - (hill.height / 100) * 200;
              const isActive = i === currentHillIndex && animating;

              return (
                <g key={i}>
                  {/* Hill shape */}
                  <path
                    d={`M${x - 40} 250 Q${x - 20} 250 ${x} ${topY} Q${x + 20} 250 ${x + 40} 250`}
                    stroke={isActive ? "var(--kinetic)" : "var(--text-tertiary)"}
                    strokeWidth={isActive ? "3" : "2"}
                    fill="none"
                  />

                  {/* Height indicator */}
                  <line
                    x1={x}
                    y1={topY}
                    x2={x}
                    y2={250}
                    stroke="var(--potential)"
                    strokeWidth="1"
                    strokeDasharray="4 3"
                    opacity="0.3"
                  />

                  {/* Height label */}
                  <text
                    x={x}
                    y={topY - 10}
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="10"
                    fontFamily="var(--font-jetbrains)"
                  >
                    {hill.height}%
                  </text>

                  {/* Hill name */}
                  <text
                    x={x}
                    y={268}
                    textAnchor="middle"
                    fill="var(--text-tertiary)"
                    fontSize="9"
                    fontFamily="var(--font-jetbrains)"
                  >
                    {hill.label}
                  </text>

                  {/* Energy lost arrow between hills */}
                  {i > 0 && (
                    <text
                      x={x - 65}
                      y={240}
                      textAnchor="middle"
                      fill="var(--force-red)"
                      fontSize="8"
                      fontFamily="var(--font-jetbrains)"
                      opacity="0.7"
                    >
                      friction
                    </text>
                  )}
                </g>
              );
            })}

            {/* Animated car */}
            {animating && (
              <rect
                x={60 + currentHillIndex * 130 - 8}
                y={250 - (hills[currentHillIndex].height / 100) * 200 - 12}
                width={16}
                height={10}
                rx={3}
                fill="var(--kinetic)"
              />
            )}

            {/* Energy remaining label */}
            <rect x="520" y="20" width="160" height="50" rx="8" fill="var(--bg-secondary)" stroke="var(--border)" strokeWidth="1" />
            <text x="600" y="40" textAnchor="middle" fill="var(--text-tertiary)" fontSize="10" fontFamily="var(--font-jetbrains)">
              Energy remaining
            </text>
            <text x="600" y="60" textAnchor="middle" fill="var(--kinetic)" fontSize="18" fontFamily="var(--font-jetbrains)" fontWeight="bold">
              {animating ? `${currentEnergy}%` : "100%"}
            </text>
          </svg>

          {/* Animation control */}
          <div className="mt-4 flex justify-center">
            <button
              onClick={animating ? stopAnimation : startAnimation}
              className="rounded-lg bg-kinetic px-6 py-2.5 font-mono text-sm font-medium text-white transition-all hover:opacity-90"
            >
              {animating ? "Stop" : "Animate the ride"}
            </button>
          </div>
        </div>

        {/* Energy budget breakdown */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-bg-card border border-border p-4 text-center">
            <p className="font-mono text-xl font-bold text-potential">100%</p>
            <p className="font-sans text-xs text-text-tertiary mt-1">Energy at first hill</p>
          </div>
          <div className="rounded-xl bg-bg-card border border-border p-4 text-center">
            <p className="font-mono text-xl font-bold text-force-red">&sim;5%</p>
            <p className="font-sans text-xs text-text-tertiary mt-1">Lost per hill (friction)</p>
          </div>
          <div className="rounded-xl bg-bg-card border border-border p-4 text-center">
            <p className="font-mono text-xl font-bold text-kinetic">Brakes</p>
            <p className="font-sans text-xs text-text-tertiary mt-1">Only at the end to stop</p>
          </div>
        </div>

        <div className="pull-quote max-w-2xl">
          Every hill after the first is shorter &mdash; because some energy is
          always lost to friction and air resistance.
        </div>
      </div>
    </SectionWrapper>
  );
}
