"use client";

import { useEffect, useRef, useState } from "react";

interface TimelineStep {
  year: string;
  title: string;
  description: string;
}

interface TimelineStepperProps {
  steps: TimelineStep[];
}

export default function TimelineStepper({ steps }: TimelineStepperProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="my-12">
      {/* Desktop: horizontal timeline */}
      <div className="hidden md:block">
        <div className="relative">
          {/* Connecting line */}
          <div
            className="absolute left-0 right-0 top-6 h-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="grid gap-4" style={{ gridTemplateColumns: `repeat(${steps.length}, 1fr)` }}>
            {steps.map((step, i) => (
              <div
                key={step.year}
                className="relative pt-12 transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                {/* Dot */}
                <div
                  className="absolute top-3 left-1/2 -translate-x-1/2 h-6 w-6 rounded-full border-2"
                  style={{
                    borderColor: "var(--accent-gold)",
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <div
                    className="absolute inset-1 rounded-full"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  />
                </div>

                {/* Content card */}
                <div
                  className="card-lift rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <p
                    className="font-mono text-xs font-bold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {step.year}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile: vertical timeline */}
      <div className="md:hidden">
        <div className="relative pl-8">
          {/* Vertical line */}
          <div
            className="absolute left-3 top-0 bottom-0 w-px"
            style={{ backgroundColor: "var(--border)" }}
          />

          <div className="flex flex-col gap-6">
            {steps.map((step, i) => (
              <div
                key={step.year}
                className="relative transition-all duration-500"
                style={{
                  opacity: visible ? 1 : 0,
                  transform: visible ? "translateY(0)" : "translateY(16px)",
                  transitionDelay: `${i * 150}ms`,
                }}
              >
                {/* Dot */}
                <div
                  className="absolute -left-5 top-1 h-4 w-4 rounded-full border-2"
                  style={{
                    borderColor: "var(--accent-gold)",
                    backgroundColor: "var(--bg-primary)",
                  }}
                >
                  <div
                    className="absolute inset-0.5 rounded-full"
                    style={{ backgroundColor: "var(--accent-gold)" }}
                  />
                </div>

                <div
                  className="rounded-lg border p-4"
                  style={{
                    backgroundColor: "var(--bg-card)",
                    borderColor: "var(--border)",
                  }}
                >
                  <p
                    className="font-mono text-xs font-bold"
                    style={{ color: "var(--accent-gold)" }}
                  >
                    {step.year}
                  </p>
                  <p
                    className="mt-1 text-sm font-semibold"
                    style={{
                      fontFamily: "var(--font-playfair), Georgia, serif",
                      color: "var(--text-primary)",
                    }}
                  >
                    {step.title}
                  </p>
                  <p
                    className="mt-1 text-xs leading-relaxed"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
