"use client";

import { useEffect, useState } from "react";

interface RiskGaugeProps {
  progress: number; // 0-1
  label: string;
  color: string;
}

export default function RiskGauge({ progress, label, color }: RiskGaugeProps) {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  useEffect(() => {
    // Small delay so the animation is visible on mount
    const timeout = setTimeout(() => {
      setAnimatedProgress(progress);
    }, 100);
    return () => clearTimeout(timeout);
  }, [progress]);

  const size = 160;
  const strokeWidth = 12;
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius * 1.5; // 270-degree arc
  const offset = circumference - animatedProgress * circumference;

  // Rotate so the arc starts at bottom-left, sweeps to bottom-right (270deg arc)
  const startAngle = 135; // degrees

  const percentage = Math.round(animatedProgress * 100);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          aria-label={`${label}: ${percentage}%`}
          role="img"
        >
          {/* Background arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255, 255, 255, 0.08)"
            strokeWidth={strokeWidth}
            strokeDasharray={`${circumference} ${Math.PI * radius * 2 - circumference}`}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
          />
          {/* Progress arc */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform={`rotate(${startAngle} ${size / 2} ${size / 2})`}
            style={{
              transition: "stroke-dashoffset 1s ease-out, stroke 0.5s ease",
              filter: `drop-shadow(0 0 6px ${color})`,
            }}
          />
        </svg>
        {/* Center text */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center"
          style={{ paddingBottom: 8 }}
        >
          <span
            className="text-3xl font-bold font-mono"
            style={{ color, transition: "color 0.5s ease" }}
          >
            {percentage}%
          </span>
        </div>
      </div>
      <span
        className="text-sm font-semibold tracking-wide uppercase"
        style={{ color: "rgba(255, 255, 255, 0.6)", transition: "color 0.5s ease" }}
      >
        {label}
      </span>
    </div>
  );
}
