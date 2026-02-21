"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { temperatureData } from "@/lib/explainers/extinction";

export default function LongWinterSection() {
  const [month, setMonth] = useState(0);

  const currentData = temperatureData[month];
  const temp = currentData.temp;

  const colorProgress = useMemo(() => {
    // 0 = warm (amber), 1 = cold (blue)
    const normalized = Math.max(0, Math.min(1, (18 - temp) / 23));
    return normalized;
  }, [temp]);

  const bgStyle = useMemo(() => {
    const r = Math.round(245 * (1 - colorProgress) + 148 * colorProgress);
    const g = Math.round(158 * (1 - colorProgress) + 163 * colorProgress);
    const b = Math.round(11 * (1 - colorProgress) + 184 * colorProgress);
    return `rgb(${r}, ${g}, ${b})`;
  }, [colorProgress]);

  return (
    <SectionWrapper id="long-winter" className="section-tinted">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left — Narrative */}
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
            Section 4
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Long Winter
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            The asteroid hit a shallow sea covering sulfur-rich rock. Billions
            of tons of sulfur compounds were vaporized and launched into the
            stratosphere, where they combined with water to form sulfuric acid
            aerosols.
          </p>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            These particles blocked sunlight for nearly two years. Global
            temperatures plummeted 15&ndash;20&deg;C. Photosynthesis stopped.
            Plants died. Herbivores starved. Predators followed. The food chain
            collapsed from the bottom up.
          </p>

          <div className="pull-quote mt-8">
            The asteroid was the trigger. The sulfur was the bullet.
          </div>
        </div>

        {/* Right — Temperature slider */}
        <div className="flex flex-col items-center">
          {/* Temperature display */}
          <div
            className="flex h-40 w-40 items-center justify-center rounded-full border-4 transition-all duration-500"
            style={{
              borderColor: bgStyle,
              backgroundColor: `color-mix(in srgb, ${bgStyle} 10%, var(--bg-card))`,
            }}
          >
            <div className="text-center">
              <p
                className="font-mono text-4xl font-bold transition-colors duration-500"
                style={{ color: bgStyle }}
              >
                {temp}&deg;C
              </p>
              <p className="text-xs text-text-tertiary">global avg</p>
            </div>
          </div>

          {/* Slider */}
          <div className="mt-8 w-full max-w-sm">
            <input
              type="range"
              min="0"
              max={temperatureData.length - 1}
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(90deg, var(--firestorm), var(--firestorm-hot), var(--winter-blue), var(--winter-cold), var(--winter-blue))`,
              }}
              aria-label="Timeline month slider"
            />
            <div className="mt-2 flex justify-between text-xs text-text-tertiary">
              <span>Impact</span>
              <span>6 months</span>
              <span>1 year</span>
              <span>2 years</span>
            </div>
          </div>

          {/* Month label */}
          <p className="mt-4 font-mono text-sm font-medium text-text-secondary">
            {currentData.label
              ? currentData.label
              : `Month ${currentData.month}`}
          </p>

          {/* Mini chart - temperature over time */}
          <div className="mt-6 w-full max-w-sm">
            <svg viewBox="0 0 300 80" className="w-full">
              {/* Zero line */}
              <line
                x1="0"
                y1={40 - (0 / 20) * 35}
                x2="300"
                y2={40 - (0 / 20) * 35}
                stroke="var(--border)"
                strokeWidth="0.5"
                strokeDasharray="4 4"
              />
              <text
                x="295"
                y={40 - (0 / 20) * 35 - 3}
                fill="var(--text-tertiary)"
                fontSize="7"
                textAnchor="end"
              >
                0&deg;C
              </text>

              {/* Temperature line */}
              <polyline
                fill="none"
                stroke={bgStyle}
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                points={temperatureData
                  .map(
                    (d, i) =>
                      `${(i / (temperatureData.length - 1)) * 290 + 5},${
                        40 - (d.temp / 20) * 35
                      }`
                  )
                  .join(" ")}
              />

              {/* Current position marker */}
              <circle
                cx={
                  (month / (temperatureData.length - 1)) * 290 + 5
                }
                cy={40 - (temp / 20) * 35}
                r="4"
                fill={bgStyle}
                stroke="var(--bg-card)"
                strokeWidth="2"
              />
            </svg>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
