"use client";

import { useState, useRef } from "react";

interface JargonTermProps {
  term: string;
  definition: string;
  children: React.ReactNode;
}

export default function JargonTerm({ term, definition, children }: JargonTermProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  return (
    <span
      ref={ref}
      style={{ position: "relative", display: "inline" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onClick={() => setOpen((v) => !v)}
    >
      <span
        title={term}
        style={{
          borderBottom: "1px dotted var(--accent-blue)",
          cursor: "help",
          color: "inherit",
        }}
      >
        {children}
      </span>

      {open && (
        <span
          role="tooltip"
          aria-label={`${term}: ${definition}`}
          style={{
            position: "absolute",
            bottom: "calc(100% + 8px)",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9995,
            minWidth: "200px",
            maxWidth: "280px",
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "0.5rem",
            padding: "0.625rem 0.875rem",
            boxShadow: "0 4px 16px rgba(0,0,0,0.12)",
            pointerEvents: "none",
          }}
          className="jargon-tooltip"
        >
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-mono, monospace)",
              fontSize: "0.6875rem",
              fontWeight: 600,
              color: "var(--accent-blue)",
              marginBottom: "0.25rem",
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            {term}
          </span>
          <span
            style={{
              display: "block",
              fontFamily: "var(--font-body, sans-serif)",
              fontSize: "0.8125rem",
              color: "var(--text-primary)",
              lineHeight: 1.5,
            }}
          >
            {definition}
          </span>
          <span
            style={{
              position: "absolute",
              bottom: "-5px",
              left: "50%",
              transform: "translateX(-50%) rotate(45deg)",
              width: "8px",
              height: "8px",
              background: "var(--bg-card)",
              border: "1px solid var(--border)",
              borderTop: "none",
              borderLeft: "none",
            }}
          />
        </span>
      )}
    </span>
  );
}
