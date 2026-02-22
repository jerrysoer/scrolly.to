"use client";

import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { series } from "../data/series";

interface PartNavProps {
  currentPart: 1 | 2 | 3;
  onPartChange: (part: 1 | 2 | 3) => void;
}

export default function PartNav({ currentPart, onPartChange }: PartNavProps) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    let lastScrollY = 0;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setCollapsed(currentScrollY > 100 && currentScrollY > lastScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const current = series.find((p) => p.number === currentPart);
  const prev = series.find((p) => p.number === currentPart - 1);
  const next = series.find((p) => p.number === currentPart + 1);

  if (!current) return null;

  return (
    <div
      className={`fixed left-0 right-0 z-40 transition-all duration-300 ${
        collapsed ? "-translate-y-full opacity-0" : "translate-y-0 opacity-100"
      }`}
      style={{ top: "3px" }}
    >
      <div
        className="border-b backdrop-blur-md"
        style={{
          backgroundColor: "color-mix(in srgb, var(--bg-primary) 90%, transparent)",
          borderColor: "var(--border)",
        }}
      >
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 pr-16 sm:pr-4">
          <div className="flex items-center gap-3">
            {prev ? (
              <button
                onClick={() => onPartChange(prev.number as 1 | 2 | 3)}
                className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
                style={{ color: "var(--text-tertiary)" }}
                aria-label={`Go to Part ${prev.number}`}
              >
                <ChevronLeft size={14} />
                Part {prev.number}
              </button>
            ) : (
              <span className="w-16" />
            )}
          </div>

          <div className="text-center">
            <p
              className="font-mono text-[10px] font-medium uppercase tracking-widest"
              style={{ color: "var(--accent-gold)" }}
            >
              Part {current.number} of 3
            </p>
            <p
              className="text-xs font-medium"
              style={{
                color: "var(--text-primary)",
              }}
            >
              {current.title}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {next ? (
              next.status === "live" ? (
                <button
                  onClick={() => onPartChange(next.number as 1 | 2 | 3)}
                  className="flex items-center gap-1 text-xs transition-colors hover:opacity-80"
                  style={{ color: "var(--text-tertiary)" }}
                  aria-label={`Go to Part ${next.number}`}
                >
                  Part {next.number}
                  <ChevronRight size={14} />
                </button>
              ) : (
                <span
                  className="flex items-center gap-1 text-xs"
                  style={{ color: "var(--text-tertiary)", opacity: 0.5 }}
                >
                  Part {next.number}
                  <ChevronRight size={14} />
                </span>
              )
            ) : (
              <span className="w-16" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
