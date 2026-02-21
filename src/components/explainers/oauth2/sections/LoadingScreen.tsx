"use client";

import { useEffect, useState } from "react";
import { Lock } from "lucide-react";

interface LoadingScreenProps {
  duration?: number;
}

export default function LoadingScreen({ duration = 600 }: LoadingScreenProps) {
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    const fadeTimer = setTimeout(() => setPhase("fading"), duration);
    const doneTimer = setTimeout(() => setPhase("done"), duration + 500);
    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(doneTimer);
    };
  }, [duration]);

  if (phase === "done") return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        background: "var(--bg-primary)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "1.5rem",
        animation: phase === "fading" ? "loading-fade-out 0.5s ease forwards" : undefined,
      }}
    >
      <div style={{ position: "relative", width: 80, height: 80 }}>
        <svg
          width="80"
          height="80"
          viewBox="0 0 100 100"
          style={{ position: "absolute", inset: 0, transform: "rotate(-90deg)" }}
        >
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--border)"
            strokeWidth="3"
          />
          <circle
            cx="50"
            cy="50"
            r="45"
            fill="none"
            stroke="var(--accent-primary)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeDasharray="283"
            style={{ animation: `loading-ring ${duration}ms ease-out forwards` }}
          />
        </svg>
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lock size={28} style={{ color: "var(--text-secondary)" }} />
        </div>
      </div>

      <span
        style={{
          fontFamily: "var(--font-mono, 'Courier New', monospace)",
          fontSize: "0.8rem",
          color: "var(--text-tertiary)",
          letterSpacing: "0.05em",
        }}
      >
        Loading...
      </span>
    </div>
  );
}
