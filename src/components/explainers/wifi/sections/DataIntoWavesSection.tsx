"use client";

import { useState, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const steps = [
  { label: "Text", display: "Hi", description: "Start with a simple message" },
  { label: "ASCII", display: "72, 105", description: "Convert each character to a number" },
  { label: "Binary", display: "01001000 01101001", description: "Convert numbers to 1s and 0s" },
  { label: "Wave", display: "~", description: "Modulate a radio wave with the binary pattern" },
];

function WaveVisualization({ binary }: { binary: string }) {
  const bits = binary.replace(/\s/g, "").split("");
  const segmentWidth = 20;
  const height = 60;
  const mid = height / 2;

  let path = `M 0 ${mid}`;
  bits.forEach((bit, i) => {
    const x = i * segmentWidth;
    const nextX = (i + 1) * segmentWidth;
    if (bit === "1") {
      path += ` L ${x} ${mid - 20} L ${nextX} ${mid - 20} L ${nextX} ${mid}`;
    } else {
      path += ` L ${x} ${mid + 20} L ${nextX} ${mid + 20} L ${nextX} ${mid}`;
    }
  });

  return (
    <svg viewBox={`0 0 ${bits.length * segmentWidth} ${height}`} className="w-full h-16" aria-label="Binary encoded as wave pattern">
      <title>Wave pattern</title>
      <line x1="0" y1={mid} x2={bits.length * segmentWidth} y2={mid} stroke="var(--border)" strokeWidth="0.5" strokeDasharray="2 2" />
      <path d={path} fill="none" stroke="var(--accent-blue)" strokeWidth="2.5" strokeLinecap="round" />
      {bits.map((bit, i) => (
        <text
          key={i}
          x={i * segmentWidth + segmentWidth / 2}
          y={bit === "1" ? mid - 24 : mid + 34}
          textAnchor="middle"
          fontSize="9"
          fill="var(--text-tertiary)"
          fontFamily="var(--font-jetbrains)"
        >
          {bit}
        </text>
      ))}
    </svg>
  );
}

export default function DataIntoWavesSection() {
  const [activeStep, setActiveStep] = useState(0);

  const advance = useCallback(() => {
    setActiveStep((s) => (s + 1) % steps.length);
  }, []);

  return (
    <SectionWrapper id="data-into-waves" layout="full-bleed" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 03
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Data Into Waves
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Every YouTube video, every email, every meme &mdash; encoded as 1s and 0s,
          then shaped into invisible waves. Here&rsquo;s the encoding pipeline.
        </p>
      </div>

      {/* Step visualization */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        {/* Step indicators */}
        <div className="flex gap-2 mb-6">
          {steps.map((step, i) => (
            <button
              key={step.label}
              onClick={() => setActiveStep(i)}
              className="flex-1 rounded-lg px-3 py-2 text-center font-mono text-xs transition-all duration-200"
              style={{
                backgroundColor: activeStep === i ? "var(--accent-blue)" : "var(--bg-secondary)",
                color: activeStep === i ? "white" : "var(--text-tertiary)",
              }}
            >
              {step.label}
            </button>
          ))}
        </div>

        {/* Display area */}
        <div className="flex flex-col items-center gap-4 py-8">
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>{steps[activeStep].description}</p>

          {activeStep < 3 ? (
            <p className="font-mono text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
              {steps[activeStep].display}
            </p>
          ) : (
            <div className="w-full max-w-lg">
              <WaveVisualization binary="01001000 01101001" />
            </div>
          )}

          {/* Flow arrow */}
          {activeStep < steps.length - 1 && (
            <button
              onClick={advance}
              className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition"
              style={{ backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--accent-blue)" }}
            >
              Next step &rarr;
            </button>
          )}
          {activeStep === steps.length - 1 && (
            <button
              onClick={() => setActiveStep(0)}
              className="mt-4 flex items-center gap-2 rounded-lg px-4 py-2 font-mono text-sm transition"
              style={{ backgroundColor: "rgba(245, 158, 11, 0.1)", color: "var(--accent-amber)" }}
            >
              Start over
            </button>
          )}
        </div>
      </div>

      <div className="mt-6 pull-quote">
        Every YouTube video, every email, every meme &mdash; encoded as 1s and 0s, then shaped into invisible waves.
      </div>
    </SectionWrapper>
  );
}
