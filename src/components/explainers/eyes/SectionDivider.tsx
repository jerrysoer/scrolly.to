"use client";

const waveShapes = [
  "M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z",
  "M0,40 C150,10 350,50 600,25 C850,0 1050,45 1200,20 L1200,60 L0,60 Z",
  "M0,20 C300,50 600,10 900,40 C1050,55 1150,15 1200,30 L1200,60 L0,60 Z",
];

interface SectionDividerProps {
  variant?: number;
  flip?: boolean;
}

export default function SectionDivider({ variant = 0, flip = false }: SectionDividerProps) {
  const path = waveShapes[variant % waveShapes.length];
  return (
    <div className={`wave-divider ${flip ? "rotate-180" : ""}`} aria-hidden="true">
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path d={path} fill="var(--bg-secondary)" opacity="0.5" />
      </svg>
    </div>
  );
}
