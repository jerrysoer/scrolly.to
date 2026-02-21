"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function WrongPictureSection() {
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDismissed(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SectionWrapper id="wrong-picture">
      <div className="text-center max-w-3xl mx-auto">
        <p
          className="text-sm font-semibold uppercase tracking-widest mb-4"
          style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
        >
          Section 01
        </p>

        <h2
          className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          The Wrong Picture
        </h2>

        <p
          className="text-lg mb-12"
          style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
        >
          What you were taught in school
        </p>

        {/* SVG diagram */}
        <div className="relative flex justify-center mb-10">
          <svg
            width="220"
            height="260"
            viewBox="0 0 220 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="transition-opacity duration-500"
            style={{ opacity: dismissed ? 0.4 : 1 }}
          >
            <circle
              cx="110"
              cy="200"
              r="50"
              fill="var(--gravity-blue)"
              opacity={0.2}
              stroke="var(--gravity-blue)"
              strokeWidth={2}
            />
            <text
              x="110"
              y="205"
              textAnchor="middle"
              fill="var(--gravity-blue)"
              fontSize="13"
              fontFamily="var(--font-mono)"
            >
              Earth
            </text>

            <line
              x1="110"
              y1="20"
              x2="110"
              y2="130"
              stroke="var(--text-secondary)"
              strokeWidth={3}
              strokeLinecap="round"
            />
            <polygon
              points="110,140 100,122 120,122"
              fill="var(--text-secondary)"
            />

            <text
              x="145"
              y="80"
              fill="var(--text-tertiary)"
              fontSize="12"
              fontFamily="var(--font-mono)"
            >
              g = 9.8 m/s²
            </text>

            {dismissed && (
              <>
                <line
                  x1="40"
                  y1="20"
                  x2="180"
                  y2="240"
                  stroke="#ef4444"
                  strokeWidth={4}
                  strokeLinecap="round"
                  className="animate-cross-out"
                />
                <line
                  x1="180"
                  y1="20"
                  x2="40"
                  y2="240"
                  stroke="#ef4444"
                  strokeWidth={4}
                  strokeLinecap="round"
                  className="animate-cross-out"
                  style={{ animationDelay: "0.15s" }}
                />
              </>
            )}
          </svg>

          {!dismissed && (
            <button
              onClick={() => setDismissed(true)}
              className="absolute inset-0 cursor-pointer"
              aria-label="Dismiss diagram"
            />
          )}
        </div>

        <div
          className="transition-all duration-700"
          style={{
            opacity: dismissed ? 1 : 0,
            transform: dismissed ? "translateY(0)" : "translateY(16px)",
          }}
        >
          <p
            className="text-2xl sm:text-3xl font-bold mb-8"
            style={{
              fontFamily: "var(--font-heading)",
              color: "var(--gravity-amber)",
            }}
          >
            It&rsquo;s not that simple.
          </p>

          <p
            className="text-lg leading-relaxed mb-10 max-w-2xl mx-auto"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            Most people picture gravity as an invisible rope tugging you toward
            Earth&rsquo;s center. That image works for homework — but it&rsquo;s
            not what&rsquo;s actually happening.
          </p>

          <div
            className="rounded-xl p-6"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-base"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              So what <span style={{ color: "var(--gravity-blue)", fontWeight: 600 }}>IS</span>{" "}
              actually happening? Let&rsquo;s start with what we do know...
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
