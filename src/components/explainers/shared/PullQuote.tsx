"use client";

import { useEffect, useRef, useState } from "react";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  variant?: "standard" | "pull-quote";
}

export default function PullQuote({
  quote,
  attribution,
  variant = "standard",
}: PullQuoteProps) {
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

  if (variant === "pull-quote") {
    return (
      <div
        ref={ref}
        className={`my-12 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div
          className="relative border-l-4 py-6 pl-6"
          style={{
            borderColor: "var(--color-forward-blue)",
            background: "var(--color-bg-secondary)",
          }}
        >
          <p
            className="text-xl font-semibold italic leading-relaxed sm:text-2xl"
            style={{
              color: "var(--color-text-primary)",
            }}
          >
            {quote}
          </p>
          {attribution && (
            <p
              className="mt-3 text-sm font-medium"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              — {attribution}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className={`my-8 transition-all duration-700 ${
        visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
      }`}
    >
      <blockquote
        className="rounded-lg p-6 text-lg italic leading-relaxed"
        style={{
          background: "var(--color-bg-secondary)",
          color: "var(--color-text-secondary)",
          borderLeft: "4px solid var(--color-forward-blue)",
        }}
      >
        {quote}
        {attribution && (
          <footer
            className="mt-3 text-sm font-medium not-italic"
            style={{ color: "var(--color-text-tertiary)" }}
          >
            — {attribution}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
