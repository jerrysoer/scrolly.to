"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function RedemptionSection() {
  const [breakageRate, setBreakageRate] = useState(30);
  const totalMilesSold = 10.7; // billions
  const breakageValue = (breakageRate / 100) * totalMilesSold;

  // Calculate conic gradient segments
  const segments = [
    { label: "Redeemed", percent: 70, color: "var(--airline-blue)" },
    { label: "Expired", percent: 15, color: "var(--danger-red)" },
    { label: "Devalued", percent: 10, color: "var(--mile-gold)" },
    { label: "Forgotten", percent: 5, color: "var(--text-tertiary)" },
  ];

  let currentAngle = 0;
  const gradientStops = segments.map((seg) => {
    const startAngle = currentAngle;
    const endAngle = currentAngle + (seg.percent / 100) * 360;
    currentAngle = endAngle;
    return `${seg.color} ${startAngle}deg ${endAngle}deg`;
  }).join(", ");

  return (
    <SectionWrapper id="redemption-game" layout="split-right">
      <div className="flex flex-col items-center justify-center">
        {/* Donut Chart */}
        <div
          className="relative"
          style={{
            width: "200px",
            height: "200px",
            borderRadius: "50%",
            background: `conic-gradient(${gradientStops})`,
          }}
        >
          <div
            className="absolute inset-0 m-auto rounded-full bg-bg-card"
            style={{ width: "120px", height: "120px" }}
          />
        </div>

        {/* Legend */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-3">
          {segments.map((seg) => (
            <div key={seg.label} className="flex items-center gap-2">
              <div
                className="h-3 w-3 rounded-full"
                style={{ backgroundColor: seg.color }}
              />
              <span className="text-sm text-text-secondary">
                {seg.percent}% {seg.label}
              </span>
            </div>
          ))}
        </div>

        {/* Breakage Slider */}
        <div className="mt-12 w-full max-w-md rounded-xl border border-border bg-bg-card p-6">
          <label
            htmlFor="breakage-slider"
            className="mb-4 block text-sm font-medium text-text-primary"
          >
            If unredeemed miles = $X billion in breakage profit, what's that
            worth per passenger?
          </label>
          <input
            id="breakage-slider"
            type="range"
            min="20"
            max="40"
            value={breakageRate}
            onChange={(e) => setBreakageRate(Number(e.target.value))}
            className="airline-range-slider h-11 w-full cursor-pointer appearance-none rounded-lg bg-bg-secondary"
            style={{
              WebkitAppearance: "none",
              height: "8px",
            }}
          />
          <div className="mt-4 text-center">
            <div className="font-mono text-3xl font-bold text-revenue-green">
              ${breakageValue.toFixed(2)}B
            </div>
            <div className="mt-1 text-xs text-text-tertiary">
              at {breakageRate}% breakage rate
            </div>
          </div>
        </div>
      </div>

      <div>
        <div className="mb-2 font-mono text-xs uppercase tracking-widest text-airline-blue">
          05
        </div>
        <h2 className="font-serif text-3xl font-bold sm:text-4xl">
          The Redemption Game
        </h2>
        <p className="mt-4 leading-relaxed text-text-secondary">
          Most miles expire, are devalued before use, or redeemed for less than
          face value. Only about 70% of miles issued are ever redeemed.
        </p>

        {/* Stat Callout */}
        <div className="mt-8 rounded-xl border border-border bg-bg-card p-6">
          <div className="font-serif text-6xl font-bold text-danger-red">
            30%
          </div>
          <p className="mt-2 text-sm leading-relaxed text-text-secondary">
            of all miles issued are never redeemed — pure profit for airlines
          </p>
        </div>
      </div>
    </SectionWrapper>
  );
}
