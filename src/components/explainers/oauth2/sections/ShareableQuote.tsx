"use client";

import { useEffect, useRef, useState } from "react";

interface ShareableQuoteProps {
  quote: string;
  gradient?: string;
}

export default function ShareableQuote({
  quote,
  gradient = "linear-gradient(135deg, #1a1c2e, #2d1b4e, #1a2a3e)",
}: ShareableQuoteProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="shareable-quote my-12"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(24px)",
        transition: "opacity 0.7s ease-out, transform 0.7s ease-out",
      }}
    >
      <div
        style={{
          background: gradient,
          position: "relative",
          overflow: "hidden",
          padding: "clamp(3rem, 6vw, 5rem) clamp(2rem, 5vw, 4rem)",
        }}
      >
        {/* Film grain overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            opacity: 0.035,
            mixBlendMode: "overlay",
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 1,
            maxWidth: "48rem",
            margin: "0 auto",
            textAlign: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.12)",
              display: "block",
              marginBottom: "-1rem",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {"\u201C"}
          </span>

          <blockquote
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              lineHeight: 1.5,
              color: "rgba(255,255,255,0.92)",
              margin: 0,
              padding: "0 1rem",
            }}
          >
            {quote}
          </blockquote>

          <span
            style={{
              fontFamily: "var(--font-heading, Georgia, serif)",
              fontSize: "clamp(3rem, 6vw, 5rem)",
              lineHeight: 1,
              color: "rgba(255,255,255,0.12)",
              display: "block",
              marginTop: "-0.5rem",
              userSelect: "none",
            }}
            aria-hidden="true"
          >
            {"\u201D"}
          </span>

          <span
            style={{
              fontFamily: "var(--font-mono, 'Courier New', monospace)",
              fontSize: "0.75rem",
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.05em",
              display: "block",
              marginTop: "1.5rem",
            }}
          >
            scrolly.to
          </span>
        </div>
      </div>
    </div>
  );
}
