"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function AttractionSection() {
  const [massA, setMassA] = useState(50);
  const [massB, setMassB] = useState(30);

  const pullStrength = (massA * massB) / 100;
  const arrowWidth = Math.min((massA * massB) / 500, 8);
  const radiusA = 20 + massA * 0.3;
  const radiusB = 20 + massB * 0.3;

  const svgWidth = 400;
  const svgHeight = 200;
  const centerY = svgHeight / 2;
  const objAx = 100;
  const objBx = 300;

  return (
    <SectionWrapper id="attraction">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Text side */}
        <div className="lg:w-1/2">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
          >
            Section 02
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            It Attracts{" "}
            <span style={{ color: "var(--gravity-blue)" }}>Everything</span>
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            Every object with mass pulls on every other object with mass. You,
            your phone, the chair you&rsquo;re sitting on — all of them are
            gravitationally attracted to each other, right now.
          </p>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            The more massive the objects, the stronger the pull. Slide the
            masses to see how the force changes.
          </p>

          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
            >
              Key Insight
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              You&rsquo;re pulling Earth toward you right now — just too weakly
              to notice.
            </p>
          </div>
        </div>

        {/* Interactive side */}
        <div className="lg:w-1/2 w-full">
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <svg
              viewBox={`0 0 ${svgWidth} ${svgHeight}`}
              className="w-full mb-6"
              style={{ maxHeight: "200px" }}
            >
              <line
                x1={objAx + radiusA + 8}
                y1={centerY}
                x2={objBx - radiusB - 8}
                y2={centerY}
                stroke="var(--gravity-blue)"
                strokeWidth={arrowWidth}
                strokeLinecap="round"
                opacity={0.6}
              />
              <polygon
                points={`${objAx + radiusA + 8},${centerY} ${objAx + radiusA + 20},${centerY - 6} ${objAx + radiusA + 20},${centerY + 6}`}
                fill="var(--gravity-blue)"
                opacity={0.8}
              />
              <polygon
                points={`${objBx - radiusB - 8},${centerY} ${objBx - radiusB - 20},${centerY - 6} ${objBx - radiusB - 20},${centerY + 6}`}
                fill="var(--gravity-blue)"
                opacity={0.8}
              />

              <circle
                cx={objAx}
                cy={centerY}
                r={radiusA}
                fill="var(--gravity-amber)"
                opacity={0.25}
              />
              <circle
                cx={objAx}
                cy={centerY}
                r={radiusA}
                fill="none"
                stroke="var(--gravity-amber)"
                strokeWidth={2}
              />
              <text
                x={objAx}
                y={centerY + 4}
                textAnchor="middle"
                fill="var(--gravity-amber)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                A
              </text>

              <circle
                cx={objBx}
                cy={centerY}
                r={radiusB}
                fill="var(--gravity-blue)"
                opacity={0.25}
              />
              <circle
                cx={objBx}
                cy={centerY}
                r={radiusB}
                fill="none"
                stroke="var(--gravity-blue)"
                strokeWidth={2}
              />
              <text
                x={objBx}
                y={centerY + 4}
                textAnchor="middle"
                fill="var(--gravity-blue)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                B
              </text>
            </svg>

            <div className="space-y-5">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
                  >
                    Object A mass
                  </label>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
                  >
                    {massA}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={massA}
                  onChange={(e) => setMassA(Number(e.target.value))}
                  className="w-full"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label
                    className="text-sm font-medium"
                    style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
                  >
                    Object B mass
                  </label>
                  <span
                    className="text-sm"
                    style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
                  >
                    {massB}
                  </span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={massB}
                  onChange={(e) => setMassB(Number(e.target.value))}
                  className="w-full"
                />
              </div>
            </div>

            <div
              className="mt-6 rounded-lg p-4 text-center"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
              >
                Pull strength
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
              >
                {pullStrength.toFixed(1)}x
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
