"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function NewtonSection() {
  const [distance, setDistance] = useState(1);

  const gravityStrength = 100 / (distance * distance);
  const arrowOpacity = Math.max(1 / (distance * distance), 0.1);
  const arrowWidth = Math.max(1 / (distance * distance) * 4, 0.5);

  const svgWidth = 420;
  const svgHeight = 160;
  const centerY = svgHeight / 2;
  const earthX = 80;
  const moonBaseX = 200;
  const moonX = moonBaseX + (distance - 1) * 70;

  return (
    <SectionWrapper id="newton">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* Text side */}
        <div className="lg:w-1/2">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
          >
            Section 04
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Newton&rsquo;s Big{" "}
            <span style={{ color: "var(--gravity-blue)" }}>Insight</span>
          </h2>

          <p
            className="text-lg leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            In 1687, Isaac Newton realized something radical: the force pulling
            an apple to the ground is the <em>exact same force</em> keeping the
            Moon in orbit around Earth.
          </p>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            He captured it in a single equation — and it worked for everything
            from cannonballs to comets.
          </p>

          <div
            className="rounded-xl p-5 mb-6"
            style={{
              backgroundColor: "var(--bg-secondary)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
            >
              Key Insight
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              The same force pulling the apple down is the same force keeping
              the Moon in orbit. Gravity has infinite range — it just gets
              weaker.
            </p>
          </div>

          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--gravity-amber)",
              borderLeftWidth: "4px",
            }}
          >
            <p
              className="text-sm font-semibold uppercase tracking-wider mb-2"
              style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
            >
              Whoa
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
            >
              Newton published his law in 1687. It worked so well we used it to
              land on the Moon — 282 years later.
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
              style={{ maxHeight: "160px" }}
            >
              <circle
                cx={earthX}
                cy={centerY}
                r={30}
                fill="var(--gravity-blue)"
                opacity={0.25}
              />
              <circle
                cx={earthX}
                cy={centerY}
                r={30}
                fill="none"
                stroke="var(--gravity-blue)"
                strokeWidth={2}
              />
              <text
                x={earthX}
                y={centerY + 4}
                textAnchor="middle"
                fill="var(--gravity-blue)"
                fontSize="11"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                Earth
              </text>

              <line
                x1={earthX + 34}
                y1={centerY}
                x2={moonX - 19}
                y2={centerY}
                stroke="var(--text-tertiary)"
                strokeWidth={1}
                strokeDasharray="6 4"
                opacity={0.5}
              />

              <line
                x1={moonX - 18}
                y1={centerY}
                x2={earthX + 34}
                y2={centerY}
                stroke="var(--gravity-blue)"
                strokeWidth={arrowWidth}
                strokeLinecap="round"
                opacity={arrowOpacity}
              />
              <polygon
                points={`${earthX + 34},${centerY} ${earthX + 46},${centerY - 5} ${earthX + 46},${centerY + 5}`}
                fill="var(--gravity-blue)"
                opacity={arrowOpacity}
              />

              <circle
                cx={moonX}
                cy={centerY}
                r={15}
                fill="var(--text-tertiary)"
                opacity={0.3}
              />
              <circle
                cx={moonX}
                cy={centerY}
                r={15}
                fill="none"
                stroke="var(--text-tertiary)"
                strokeWidth={1.5}
              />
              <text
                x={moonX}
                y={centerY + 4}
                textAnchor="middle"
                fill="var(--text-secondary)"
                fontSize="10"
                fontFamily="var(--font-mono)"
                fontWeight="600"
              >
                Moon
              </text>

              <text
                x={(earthX + moonX) / 2}
                y={centerY + 40}
                textAnchor="middle"
                fill="var(--text-tertiary)"
                fontSize="11"
                fontFamily="var(--font-mono)"
              >
                {distance.toFixed(1)}x distance
              </text>
            </svg>

            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <label
                  className="text-sm font-medium"
                  style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
                >
                  Distance
                </label>
                <span
                  className="text-sm"
                  style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
                >
                  {distance.toFixed(1)}x
                </span>
              </div>
              <input
                type="range"
                min={1}
                max={4}
                step={0.1}
                value={distance}
                onChange={(e) => setDistance(Number(e.target.value))}
                className="w-full"
              />
              <div
                className="flex justify-between text-xs mt-1"
                style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
              >
                <span>1x</span>
                <span>4x</span>
              </div>
            </div>

            <div
              className="rounded-lg p-4 text-center mb-5"
              style={{ backgroundColor: "var(--bg-secondary)" }}
            >
              <p
                className="text-sm mb-1"
                style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
              >
                Gravity strength
              </p>
              <p
                className="text-2xl font-bold"
                style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
              >
                {gravityStrength.toFixed(1)}%
              </p>
            </div>

            <div
              className="rounded-lg p-4 text-center"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--gravity-amber)",
                borderStyle: "dashed",
              }}
            >
              <p
                className="text-sm font-semibold"
                style={{ color: "var(--gravity-amber)", fontFamily: "var(--font-mono)" }}
              >
                Double the distance = quarter the pull
              </p>
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
