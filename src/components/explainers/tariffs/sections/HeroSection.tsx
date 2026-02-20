"use client";

import { ChevronDown } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="dispatch-hero">
      {/* Subtle SVG world map — atmospheric background only */}
      <div className="hero-bg absolute inset-0" style={{ zIndex: 0, position: "absolute" }}>
        <svg
          className="h-full w-full"
          viewBox="0 0 1200 700"
          preserveAspectRatio="xMidYMid slice"
          aria-hidden="true"
        >
          <defs>
            <radialGradient id="map-fade" cx="0.25" cy="0.35" r="0.7">
              <stop offset="0%" stopColor="var(--accent-blue)" stopOpacity="0.08" />
              <stop offset="100%" stopColor="var(--accent-blue)" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Soft glow behind US region */}
          <circle cx="280" cy="220" r="200" fill="url(#map-fade)" />

          {/* North America */}
          <path
            d="M180,160 L220,120 L280,110 L330,130 L350,180 L340,220 L310,260 L290,300 L260,310 L240,340 L210,350 L190,320 L170,280 L160,240 L170,200 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.04"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.2"
          />
          {/* South America */}
          <path
            d="M280,370 L310,360 L330,380 L340,420 L330,470 L310,520 L290,560 L270,580 L260,550 L250,500 L260,450 L270,400 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.02"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.12"
          />
          {/* Europe */}
          <path
            d="M520,120 L560,100 L600,110 L630,130 L620,160 L600,180 L570,190 L540,180 L520,160 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.02"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.12"
          />
          {/* Africa */}
          <path
            d="M540,220 L580,210 L620,230 L640,280 L630,340 L610,400 L580,440 L550,430 L530,380 L520,320 L530,270 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.02"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.1"
          />
          {/* Asia */}
          <path
            d="M680,100 L750,80 L830,90 L900,110 L950,140 L970,180 L960,220 L930,250 L880,260 L830,250 L780,230 L730,200 L700,170 L680,140 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.03"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.15"
          />
          {/* Oceania */}
          <path
            d="M900,380 L950,370 L1000,380 L1020,410 L1010,440 L970,450 L930,440 L910,410 Z"
            fill="var(--accent-blue)"
            fillOpacity="0.02"
            stroke="var(--accent-blue)"
            strokeWidth="0.8"
            opacity="0.08"
          />

          {/* US target dot */}
          <circle cx="280" cy="200" r="3" fill="var(--accent-red)" opacity="0.5" />
          <circle
            cx="280"
            cy="200"
            r="14"
            fill="none"
            stroke="var(--accent-red)"
            strokeWidth="0.5"
            opacity="0.15"
          />

          {/* Trade flow lines — very subtle dashes */}
          <line
            x1="830" y1="180" x2="290" y2="200"
            stroke="var(--accent-blue)"
            strokeWidth="0.6"
            opacity="0.12"
            className="trade-flow-line"
          />
          <line
            x1="570" y1="150" x2="290" y2="200"
            stroke="var(--accent-blue)"
            strokeWidth="0.6"
            opacity="0.12"
            className="trade-flow-line"
          />
          <line
            x1="300" y1="420" x2="280" y2="210"
            stroke="var(--accent-blue)"
            strokeWidth="0.6"
            opacity="0.08"
            className="trade-flow-line"
          />
          <line
            x1="570" y1="300" x2="285" y2="205"
            stroke="var(--accent-blue)"
            strokeWidth="0.6"
            opacity="0.08"
            className="trade-flow-line"
          />
          <line
            x1="960" y1="400" x2="290" y2="205"
            stroke="var(--accent-blue)"
            strokeWidth="0.6"
            opacity="0.06"
            className="trade-flow-line"
          />

          {/* Price tag indicators near US — static */}
          <rect x="300" y="188" width="14" height="10" rx="2" fill="var(--accent-red)" opacity="0.2" />
          <rect x="258" y="212" width="12" height="9" rx="2" fill="var(--accent-amber)" opacity="0.15" />
        </svg>
      </div>

      {/* Content — high z-index, guaranteed visible */}
      <div className="relative mx-auto max-w-4xl px-4 sm:px-6" style={{ zIndex: 10 }}>
        <div className="inline-block rounded-full border px-3 py-1" style={{ borderColor: "var(--accent-blue)", backgroundColor: "color-mix(in srgb, var(--accent-blue) 10%, transparent)" }}>
          <span className="font-mono text-[11px] font-semibold uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
            February 20, 2026
          </span>
        </div>

        <h1 className="chapter-heading mt-6">
          Tariffs sound simple.
          <br />
          <span style={{ color: "var(--accent-red)" }}>They&apos;re not.</span>
        </h1>

        <p className="mt-6 max-w-xl text-lg leading-relaxed text-text-secondary sm:text-xl">
          The Supreme Court just struck down the president&apos;s sweeping tariffs
          in a 6-3 ruling. Trillions of dollars in trade. Your grocery bill.
          Before you can understand what just happened, you need to understand
          what a tariff actually is — and who actually pays it.
        </p>

        <p className="mt-4 font-mono text-sm font-medium" style={{ color: "var(--accent-amber)" }}>
          Spoiler: it&apos;s probably you.
        </p>
      </div>

      {/* Scroll indicator */}
      <div className="relative mt-16 flex justify-center" style={{ zIndex: 10 }}>
        <a
          href="#what-is-a-tariff"
          aria-label="Scroll to first section"
          className="flex flex-col items-center gap-2 text-text-tertiary transition-colors hover:text-text-secondary"
        >
          <span className="font-mono text-[10px] uppercase tracking-widest opacity-50">
            Scroll
          </span>
          <ChevronDown className="h-5 w-5 opacity-50" />
        </a>
      </div>
    </section>
  );
}
