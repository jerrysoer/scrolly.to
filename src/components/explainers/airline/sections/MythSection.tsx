"use client";

import React from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function MythSection() {
  return (
    <SectionWrapper id="myth" layout="centered">
      <div className="max-w-3xl mx-auto">
        {/* Section label */}
        <p className="font-mono text-xs uppercase tracking-widest text-airline-blue mb-4">
          01
        </p>

        {/* Heading */}
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-6">
          The Myth
        </h2>

        {/* Body text */}
        <div className="space-y-4 text-lg sm:text-xl text-text-secondary leading-relaxed mb-12">
          <p>
            Most people think airlines make money flying you places. You book a
            flight, they operate it, they profit. Simple. Wrong.
          </p>
          <p className="font-semibold text-text-primary">
            The real product isn't the seat. It's the loyalty program attached
            to your credit card.
          </p>
        </div>

        {/* Interactive illustration */}
        <figure className="my-12">
          <svg
            viewBox="0 0 600 300"
            className="w-full max-w-2xl mx-auto"
            role="img"
            aria-labelledby="myth-illustration-title"
          >
            <title id="myth-illustration-title">
              Airplane crossed out, credit card highlighted as the real product
            </title>

            {/* Airplane silhouette */}
            <g className="airplane" opacity="0.6">
              {/* Fuselage */}
              <path
                d="M 150 150 L 250 150 L 270 140 L 275 140 L 275 160 L 270 160 L 250 150"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Wings */}
              <path
                d="M 180 150 L 160 120 L 180 120 Z"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M 180 150 L 160 180 L 180 180 Z"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {/* Tail */}
              <path
                d="M 150 150 L 140 130 L 150 130 Z"
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </g>

            {/* Big red X */}
            <g className="cross">
              <line
                x1="120"
                y1="110"
                x2="290"
                y2="190"
                stroke="var(--danger-red)"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.6"
              />
              <line
                x1="290"
                y1="110"
                x2="120"
                y2="190"
                stroke="var(--danger-red)"
                strokeWidth="8"
                strokeLinecap="round"
                opacity="0.6"
              />
            </g>

            {/* Credit card */}
            <g className="credit-card">
              {/* Card glow effect */}
              <rect
                x="330"
                y="115"
                width="240"
                height="150"
                rx="12"
                fill="var(--mile-gold)"
                opacity="0.15"
                className="airline-pulse-glow"
              />

              {/* Card body */}
              <rect
                x="335"
                y="120"
                width="230"
                height="140"
                rx="10"
                fill="var(--bg-card)"
                stroke="var(--mile-gold)"
                strokeWidth="2"
              />

              {/* Chip */}
              <rect
                x="355"
                y="150"
                width="35"
                height="30"
                rx="4"
                fill="var(--mile-gold)"
                opacity="0.7"
              />

              {/* Card number lines */}
              <line
                x1="355"
                y1="200"
                x2="420"
                y2="200"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
              />
              <line
                x1="430"
                y1="200"
                x2="495"
                y2="200"
                stroke="var(--text-tertiary)"
                strokeWidth="2"
                strokeLinecap="round"
                opacity="0.3"
              />

              {/* "Miles" label */}
              <text
                x="450"
                y="245"
                className="font-mono"
                fontSize="16"
                fill="var(--mile-gold)"
                textAnchor="middle"
                fontWeight="600"
              >
                MILES
              </text>
            </g>
          </svg>

          <figcaption className="text-center text-sm text-text-tertiary mt-6 font-mono">
            The airline business model, revealed
          </figcaption>
        </figure>
      </div>
    </SectionWrapper>
  );
}
