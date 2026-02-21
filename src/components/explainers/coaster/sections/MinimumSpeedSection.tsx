"use client";

import { useState, useMemo } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function MinimumSpeedSection() {
  const [speed, setSpeed] = useState(50);

  const g = 9.8;
  const radius = 15;
  const criticalSpeed = Math.sqrt(g * radius);
  const criticalMph = criticalSpeed * 2.237;

  const isSafe = speed >= criticalMph;
  const safetyMargin = ((speed - criticalMph) / criticalMph * 100).toFixed(0);

  const loopAngle = useMemo(() => {
    if (isSafe) return 360;
    const fraction = speed / criticalMph;
    return Math.min(360, Math.max(0, fraction * 280));
  }, [speed, criticalMph, isSafe]);

  return (
    <SectionWrapper id="minimum-speed" layout="split-left">
      {/* Left: explanation */}
      <div className="flex flex-col justify-center space-y-6">
        <div>
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-kinetic">
            Section 04
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Critical Speed
          </h2>
        </div>

        <p className="font-sans text-lg leading-relaxed text-text-secondary">
          For a loop with radius <strong className="text-text-primary">{radius}m</strong>,
          the minimum speed at the top is{" "}
          <strong className="text-kinetic">
            {criticalSpeed.toFixed(1)} m/s ({criticalMph.toFixed(0)} mph)
          </strong>.
        </p>

        <div className="rounded-xl bg-bg-card p-5 border border-border">
          <p className="font-mono text-sm text-text-tertiary mb-3">v = &radic;(g &times; r)</p>
          <p className="font-mono text-sm text-text-tertiary">
            v = &radic;({g} &times; {radius}) = <strong className="text-kinetic">{criticalSpeed.toFixed(1)} m/s</strong>
          </p>
        </div>

        <div className="pull-quote">
          There&rsquo;s an exact speed below which you&rsquo;d fall. Engineers don&rsquo;t cut
          it close.
        </div>

        <p className="font-sans text-sm text-text-secondary">
          Real coasters run <strong className="text-text-primary">20-40% faster</strong> than
          the minimum to account for friction, wind, and different car weights.
        </p>
      </div>

      {/* Right: interactive */}
      <div className="flex flex-col items-center justify-center">
        <div className="w-full max-w-sm rounded-xl border border-border bg-bg-card p-6">
          {/* Loop visualization */}
          <svg viewBox="0 0 240 260" className="w-full mb-4" aria-label="Loop completion visualization">
            {/* Full loop outline */}
            <circle
              cx="120"
              cy="130"
              r="80"
              stroke="var(--border)"
              strokeWidth="2"
              fill="none"
              strokeDasharray="6 4"
            />

            {/* Completed portion */}
            <circle
              cx="120"
              cy="130"
              r="80"
              stroke={isSafe ? "var(--potential)" : "var(--force-red)"}
              strokeWidth="3"
              fill="none"
              strokeDasharray={`${(loopAngle / 360) * 502} 502`}
              strokeDashoffset="125"
              transform="rotate(-90, 120, 130)"
            />

            {/* Car position */}
            <circle
              cx="120"
              cy={isSafe ? 50 : 130 - 80 * Math.sin((loopAngle / 360) * Math.PI)}
              r="8"
              fill={isSafe ? "var(--kinetic)" : "var(--force-red)"}
            />

            {/* Status text */}
            <text
              x="120"
              y="240"
              textAnchor="middle"
              fill={isSafe ? "var(--potential)" : "var(--force-red)"}
              fontSize="16"
              fontFamily="var(--font-jetbrains)"
              fontWeight="bold"
            >
              {isSafe ? "COMPLETES LOOP" : "FALLS OFF"}
            </text>
          </svg>

          {/* Speed slider */}
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="font-mono text-xs text-text-tertiary">Speed at top</span>
              <span className={`font-mono text-sm font-bold ${isSafe ? "text-kinetic" : "text-force-red"}`}>
                {speed} mph
              </span>
            </div>
            <input
              type="range"
              min="0"
              max="80"
              step="1"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
              className="w-full accent-kinetic"
              aria-label="Adjust car speed"
            />
            <div className="flex justify-between text-xs text-text-tertiary font-mono">
              <span>0 mph</span>
              <span className={isSafe ? "text-potential" : "text-force-red"}>
                min: {criticalMph.toFixed(0)} mph
              </span>
              <span>80 mph</span>
            </div>
          </div>

          {/* Safety margin */}
          <div className="mt-4 rounded-lg bg-bg-secondary p-3 text-center">
            <p className="font-mono text-xs text-text-tertiary">
              Safety margin:{" "}
              <strong className={isSafe ? "text-success-green" : "text-force-red"}>
                {isSafe ? `+${safetyMargin}%` : `${safetyMargin}%`}
              </strong>
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
