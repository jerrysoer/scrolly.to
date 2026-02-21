"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const devices = [
  { name: "Phone", x: 75, y: 25, icon: "M8 2h8a2 2 0 012 2v16a2 2 0 01-2 2H8a2 2 0 01-2-2V4a2 2 0 012-2zm4 18h.01" },
  { name: "Laptop", x: 80, y: 60, icon: "M4 6h16a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm-2 12h20" },
  { name: "Tablet", x: 70, y: 85, icon: "M9 2h6a3 3 0 013 3v14a3 3 0 01-3 3H9a3 3 0 01-3-3V5a3 3 0 013-3zm3 16h.01" },
];

export default function RouterRadioSection() {
  const [activeRing, setActiveRing] = useState(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveRing((r) => (r + 1) % 4);
    }, 600);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <SectionWrapper id="router-radio" layout="split-left">
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 02
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Your Router Is a Radio Station
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Your router is a tiny radio station. It broadcasts on a specific frequency and
          your devices tune in &mdash; just like turning a dial to your favorite FM station,
          except the &ldquo;music&rdquo; is your internet traffic.
        </p>
        <div className="mt-6 pull-quote">
          Your router broadcasts. Your devices tune in. That&rsquo;s it.
        </div>
      </div>

      {/* Router broadcast SVG */}
      <div className="flex items-center justify-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-md" aria-label="Router broadcasting signal rings to devices">
          <title>Router broadcasting to devices</title>

          {/* Concentric signal rings */}
          {[40, 70, 100, 130].map((r, i) => (
            <circle
              key={r}
              cx="90"
              cy="150"
              r={r}
              fill="none"
              stroke="var(--accent-blue)"
              strokeWidth="1.5"
              opacity={activeRing === i ? 0.6 : 0.15}
              style={{
                transition: "opacity 0.4s ease-out",
              }}
            />
          ))}

          {/* Router icon */}
          <rect x="70" y="135" width="40" height="30" rx="4" fill="var(--accent-blue)" opacity="0.9" />
          <line x1="80" y1="135" x2="80" y2="120" stroke="var(--accent-blue)" strokeWidth="2" />
          <line x1="100" y1="135" x2="100" y2="118" stroke="var(--accent-blue)" strokeWidth="2" />
          <circle cx="80" cy="118" r="3" fill="var(--accent-blue)" />
          <circle cx="100" cy="116" r="3" fill="var(--accent-blue)" />
          <circle cx="80" cy="148" r="2" fill="var(--bg-primary)" />
          <circle cx="90" cy="148" r="2" fill="var(--accent-green)" />
          <circle cx="100" cy="148" r="2" fill="var(--bg-primary)" />

          {/* Devices */}
          {devices.map((d) => {
            const dx = (d.x / 100) * 300;
            const dy = (d.y / 100) * 300;
            return (
              <g key={d.name}>
                <circle cx={dx} cy={dy} r="18" fill="var(--bg-card)" stroke="var(--border)" strokeWidth="1.5" />
                <g transform={`translate(${dx - 10}, ${dy - 10}) scale(0.85)`}>
                  <path d={d.icon} stroke="var(--text-secondary)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </g>
                <text x={dx} y={dy + 30} textAnchor="middle" fontSize="10" fill="var(--text-tertiary)" fontFamily="var(--font-inter)">
                  {d.name}
                </text>
                {/* Connection line */}
                <line
                  x1="90"
                  y1="150"
                  x2={dx}
                  y2={dy}
                  stroke="var(--accent-blue)"
                  strokeWidth="0.5"
                  strokeDasharray="4 4"
                  opacity="0.3"
                />
              </g>
            );
          })}
        </svg>
      </div>
    </SectionWrapper>
  );
}
