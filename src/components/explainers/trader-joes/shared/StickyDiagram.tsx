"use client";

import { useEffect, useRef, useState } from "react";

interface StickyDiagramProps {
  id: string;
  visualSide?: "left" | "right";
  steps: { id: string; content: React.ReactNode }[];
  renderVisual: (activeStepIndex: number) => React.ReactNode;
}

export default function StickyDiagram({
  id,
  visualSide = "left",
  steps,
  renderVisual,
}: StickyDiagramProps) {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    stepRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(index);
          }
        },
        { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, [steps.length]);

  const visual = (
    <div className="sticky-diagram-visual lg:min-h-[40vh]">
      {renderVisual(activeStep)}
    </div>
  );

  const narrative = (
    <div className="flex flex-col gap-[40vh] py-[20vh] first:pt-0 last:pb-0 lg:py-[30vh]">
      {steps.map((step, i) => (
        <div
          key={step.id}
          ref={(el) => { stepRefs.current[i] = el; }}
          className={`transition-opacity duration-500 ${
            activeStep === i ? "opacity-100" : "opacity-30"
          }`}
        >
          <div
            className="rounded-xl border p-6 shadow-sm"
            style={{
              backgroundColor: "var(--bg-card)",
              borderColor: "var(--border)",
            }}
          >
            {step.content}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <section id={id} className="px-4 sm:px-6">
      {/* Mobile: stacked layout */}
      <div className="lg:hidden">
        <div className="mx-auto max-w-xl">
          <div className="mb-8">{renderVisual(activeStep)}</div>
          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div
                key={step.id}
                ref={(el) => { stepRefs.current[i] = el; }}
                className="rounded-xl border p-5 shadow-sm"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                {step.content}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Desktop: side-by-side sticky layout */}
      <div className="hidden lg:block">
        <div className="mx-auto max-w-6xl">
          <div
            className={`grid grid-cols-2 gap-12 ${
              visualSide === "right" ? "" : ""
            }`}
          >
            {visualSide === "left" ? (
              <>
                <div>{visual}</div>
                <div>{narrative}</div>
              </>
            ) : (
              <>
                <div>{narrative}</div>
                <div>{visual}</div>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
