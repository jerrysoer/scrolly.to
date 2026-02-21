"use client";

import { useEffect, useRef, useState } from "react";

interface PullQuoteProps {
  quote: string;
  attribution?: string;
  variant?: "standard" | "editorial";
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

  if (variant === "editorial") {
    return (
      <div
        ref={ref}
        className={`my-12 transition-all duration-700 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <div className="relative mx-auto max-w-2xl text-center">
          <svg
            className="mx-auto mb-4"
            width="48"
            height="36"
            viewBox="0 0 48 36"
            fill="none"
            aria-hidden="true"
          >
            <path
              d="M0 36V20.4C0 14.4 1.2 9.6 3.6 6C6 2.4 10 0.4 15.6 0L17.6 5.6C14.4 6.4 12 7.8 10.4 9.8C8.8 11.8 8 14.2 8 17H16V36H0ZM28 36V20.4C28 14.4 29.2 9.6 31.6 6C34 2.4 38 0.4 43.6 0L45.6 5.6C42.4 6.4 40 7.8 38.4 9.8C36.8 11.8 36 14.2 36 17H44V36H28Z"
              style={{ fill: "var(--accent-gold)", opacity: 0.2 }}
            />
          </svg>
          <p
            className="text-2xl font-medium italic leading-relaxed sm:text-3xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "var(--text-primary)",
            }}
          >
            {quote}
          </p>
          {attribution && (
            <p
              className="mt-4 font-mono text-sm"
              style={{ color: "var(--text-tertiary)" }}
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
      <blockquote className="pull-quote">
        {quote}
        {attribution && (
          <footer
            className="mt-3 font-mono text-xs not-italic"
            style={{ color: "var(--text-tertiary)" }}
          >
            — {attribution}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
