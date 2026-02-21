"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { liquorInsight, vennData } from "@/components/explainers/trader-joes/data/part-1";

export default function LiquorSection() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [svgVisible, setSvgVisible] = useState(false);

  useEffect(() => {
    const el = svgRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSvgVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">09</span>
      </div>

      <SectionWrapper id="liquor" layout="centered">
        <h2
          className="mb-4 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          The Hard Liquor Moat
        </h2>

        <p
          className="mb-10 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          California capped the number of hard liquor licenses a retailer could
          hold. Joe&apos;s Pronto stores already had them. By pivoting to a
          gourmet wine-and-spirits concept, he&apos;d lock in a regulatory
          advantage that 7-Eleven could never replicate.
        </p>

        {/* Venn diagram */}
        <div
          className="my-10 flex justify-center"
          style={{
            transition: "opacity 0.8s ease, transform 0.8s ease",
            opacity: svgVisible ? 1 : 0,
            transform: svgVisible ? "translateY(0)" : "translateY(20px)",
          }}
        >
          <svg
            ref={svgRef}
            viewBox="0 0 500 320"
            className="w-full max-w-xl"
            aria-label="Venn diagram: Gourmet Taste, Discount Prices, and Trader Joe's overlap"
            role="img"
          >
            {/* Left circle — Gourmet Taste */}
            <circle
              cx="175"
              cy="160"
              r="120"
              fill="var(--accent-red)"
              fillOpacity="0.12"
              stroke="var(--accent-red)"
              strokeWidth="1.5"
            />
            {/* Right circle — Discount Prices */}
            <circle
              cx="325"
              cy="160"
              r="120"
              fill="var(--accent-navy)"
              fillOpacity="0.12"
              stroke="var(--accent-navy)"
              strokeWidth="1.5"
            />

            {/* Left label */}
            <text
              x="120"
              y="100"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent-red)"
              fontFamily="var(--font-dm-mono), monospace"
            >
              {vennData.left.label}
            </text>
            {vennData.left.items.map((item, i) => (
              <text
                key={item}
                x="120"
                y={125 + i * 22}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {item}
              </text>
            ))}

            {/* Right label */}
            <text
              x="380"
              y="100"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent-navy)"
              fontFamily="var(--font-dm-mono), monospace"
            >
              {vennData.right.label}
            </text>
            {vennData.right.items.map((item, i) => (
              <text
                key={item}
                x="380"
                y={125 + i * 22}
                textAnchor="middle"
                fontSize="11"
                fill="var(--text-secondary)"
              >
                {item}
              </text>
            ))}

            {/* Overlap label */}
            <text
              x="250"
              y="130"
              textAnchor="middle"
              fontSize="13"
              fontWeight="700"
              fill="var(--accent-gold)"
              fontFamily="var(--font-dm-mono), monospace"
            >
              {vennData.overlap.label}
            </text>
            {vennData.overlap.items.map((item, i) => (
              <text
                key={item}
                x="250"
                y={155 + i * 22}
                textAnchor="middle"
                fontSize="10"
                fill="var(--text-primary)"
              >
                {item}
              </text>
            ))}
          </svg>
        </div>

        {/* Intel callout */}
        <div className="intel-callout mt-8">
          <p
            className="mb-2 text-xs font-semibold uppercase tracking-wider"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--accent-gold)",
            }}
          >
            Strategic insight
          </p>
          <p
            className="text-base leading-relaxed"
            style={{ color: "var(--text-secondary)" }}
          >
            {liquorInsight}
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
