"use client";

interface BalanceIllustrationProps {
  threshold: number;
}

export default function BalanceIllustration({ threshold }: BalanceIllustrationProps) {
  return (
    <svg viewBox="0 0 200 160" className="mx-auto w-full max-w-xs">
      <defs>
        <linearGradient id="beam-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="var(--text-primary)" stopOpacity="0.7" />
          <stop offset="50%" stopColor="var(--text-primary)" />
          <stop offset="100%" stopColor="var(--text-primary)" stopOpacity="0.7" />
        </linearGradient>
      </defs>
      <path d="M100 150 L100 80" stroke="var(--text-primary)" strokeWidth="3" strokeLinecap="round" />
      <ellipse cx="100" cy="155" rx="30" ry="5" fill="var(--text-primary)" opacity="0.3" />
      <circle cx="100" cy="75" r="6" fill="var(--text-primary)" />
      <g
        style={{
          transform: `rotate(${(threshold - 50) * 0.15}deg)`,
          transformOrigin: "100px 75px",
          transition: "transform 0.5s ease-out",
        }}
      >
        <rect x="20" y="72" width="160" height="6" rx="3" fill="url(#beam-gradient)" />
        <line x1="35" y1="78" x2="35" y2="105" stroke="var(--text-primary)" strokeWidth="1.5" />
        <line x1="25" y1="78" x2="45" y2="78" stroke="var(--text-primary)" strokeWidth="1.5" />
        <path d="M20 105 Q35 115 50 105" stroke="var(--pr-terracotta)" strokeWidth="2.5" fill="none" />
        <text x="35" y="130" textAnchor="middle" fontSize="10" fill="var(--pr-terracotta)" fontWeight="500">
          Recall
        </text>
        <line x1="165" y1="78" x2="165" y2="105" stroke="var(--text-primary)" strokeWidth="1.5" />
        <line x1="155" y1="78" x2="175" y2="78" stroke="var(--text-primary)" strokeWidth="1.5" />
        <path d="M150 105 Q165 115 180 105" stroke="var(--pr-green)" strokeWidth="2.5" fill="none" />
        <text x="165" y="130" textAnchor="middle" fontSize="10" fill="var(--pr-green)" fontWeight="500">
          Precision
        </text>
      </g>
    </svg>
  );
}
