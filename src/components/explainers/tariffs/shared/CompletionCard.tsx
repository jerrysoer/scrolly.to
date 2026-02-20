"use client";

import { useEffect, useRef, useState } from "react";

interface Highlight {
  value: string;
  label: string;
  color?: string;
}

interface CompletionCardProps {
  variant?: "confetti" | "minimal" | "dashboard";
  title?: string;
  subtitle?: string;
  quote?: string;
  highlights?: Highlight[];
  sharePrompt?: string;
}

export default function CompletionCard({
  variant = "dashboard",
  title = "You Made It",
  subtitle,
  quote,
  highlights = [],
  sharePrompt = "Found this interesting? Share it with someone curious.",
}: CompletionCardProps) {
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
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  if (variant === "dashboard") {
    return (
      <div
        ref={ref}
        data-completion-card
        className={`mx-auto max-w-3xl px-4 py-20 text-center transition-all duration-1000 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
        }`}
      >
        <div
          className="relative overflow-hidden rounded-2xl border border-border bg-bg-primary p-8 shadow-xl sm:p-14"
          style={{ background: "var(--bg-primary)" }}
        >
          <div
            className="absolute left-0 right-0 top-0 h-1"
            style={{
              background:
                "linear-gradient(90deg, var(--accent-blue), var(--accent-red))",
            }}
          />

          <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
            Explainer complete
          </p>

          <h3 className="mt-5 font-sans text-3xl font-bold text-text-primary sm:text-4xl">
            {title}
          </h3>

          {subtitle && (
            <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-text-secondary">
              {subtitle}
            </p>
          )}

          {highlights.length > 0 && (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {highlights.map((h) => (
                <div
                  key={h.label}
                  className="rounded-xl border border-border bg-bg-card p-4"
                >
                  <p
                    className="font-mono text-2xl font-bold"
                    style={{
                      color: h.color ?? "var(--accent-blue)",
                    }}
                  >
                    {h.value}
                  </p>
                  <p className="mt-0.5 font-sans text-xs text-text-tertiary">
                    {h.label}
                  </p>
                </div>
              ))}
            </div>
          )}

          {quote && (
            <blockquote className="mx-auto mt-8 max-w-lg font-sans text-base leading-relaxed text-text-secondary italic">
              &ldquo;{quote}&rdquo;
            </blockquote>
          )}

          <p className="mt-8 font-sans text-sm text-text-tertiary">
            {sharePrompt}
          </p>
        </div>
      </div>
    );
  }

  // Minimal fallback
  return (
    <div
      ref={ref}
      data-completion-card
      className={`mx-auto max-w-3xl px-4 py-20 text-center transition-all duration-1000 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      }`}
    >
      <div className="relative rounded-2xl border border-border bg-bg-card p-8 shadow-lg sm:p-14">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-text-tertiary">
          Explainer complete
        </p>
        <h3 className="mt-5 font-sans text-3xl font-bold text-text-primary sm:text-4xl">
          {title}
        </h3>
        {subtitle && (
          <p className="mx-auto mt-4 max-w-lg font-sans text-base leading-relaxed text-text-secondary">
            {subtitle}
          </p>
        )}
        <p className="mt-8 font-sans text-sm text-text-tertiary">
          {sharePrompt}
        </p>
      </div>
    </div>
  );
}
