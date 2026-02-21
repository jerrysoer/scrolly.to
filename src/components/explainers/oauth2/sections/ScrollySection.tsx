"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollStep {
  label: string;
  content: React.ReactNode;
}

interface ScrollySectionProps {
  id: string;
  steps: ScrollStep[];
  stickyDiagram: (activeStep: number) => React.ReactNode;
  className?: string;
}

export default function ScrollySection({
  id,
  steps,
  stickyDiagram,
  className = "",
}: ScrollySectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = stepRefs.current.indexOf(
              entry.target as HTMLDivElement
            );
            if (index !== -1) {
              setActiveStep(index);
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "-20% 0px -20% 0px" }
    );

    stepRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, [steps.length]);

  return (
    <section id={id} className={className}>
      <div
        ref={containerRef}
        className="relative mx-auto max-w-6xl px-4 sm:px-6"
      >
        <div className="flex flex-col lg:flex-row lg:gap-12">
          {/* Sticky diagram panel — dark editorial card */}
          <div className="lg:sticky lg:top-24 lg:h-[calc(100vh-6rem)] lg:w-1/2 lg:flex lg:items-center">
            <div
              className="w-full rounded-2xl p-6 shadow-2xl overflow-hidden"
              style={{
                background: "linear-gradient(145deg, #141622, #1a1c2e, #12141e)",
                border: "1px solid rgba(255,255,255,0.06)",
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.03)",
              }}
            >
              {stickyDiagram(activeStep)}
            </div>
          </div>

          {/* Scroll steps */}
          <div className="lg:w-1/2 overflow-hidden">
            {steps.map((step, i) => (
              <div
                key={i}
                ref={(el) => {
                  stepRefs.current[i] = el;
                }}
                className={`flex min-h-[70vh] items-center py-12 transition-opacity duration-500 ${
                  activeStep === i ? "opacity-100" : "opacity-30"
                }`}
              >
                <div className="max-w-full overflow-hidden">
                  <span className="mb-2 inline-block rounded-full bg-accent-primary/10 px-3 py-1 font-mono text-xs font-medium text-accent-primary">
                    Step {i + 1}
                  </span>
                  <h3 className="mt-2 font-heading text-xl font-semibold text-text-primary sm:text-2xl">
                    {step.label}
                  </h3>
                  <div className="mt-4 font-body text-base leading-relaxed text-text-secondary">
                    {step.content}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
