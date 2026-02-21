"use client";

import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const stats = [
  "4 of 6 benchmarks \u2014 leading or matching frontier models",
  "~10x cheaper \u2014 than Claude Opus on input tokens",
  "100M+ DAU \u2014 already powering Doubao at scale",
] as const;

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const scrollToNext = () => {
    document.getElementById("benchmarks")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center px-4 sm:px-6"
    >
      <div className="mx-auto max-w-3xl text-center">
        {/* Analogy opener */}
        <p className="animate-fade-in mb-6 font-serif text-base italic text-text-tertiary sm:text-lg">
          Imagine discovering a restaurant that matches a Michelin-starred kitchen &mdash; at fast-food prices.
        </p>

        {/* Headline */}
        <h1 className="animate-fade-in font-serif text-5xl font-semibold tracking-tight text-text-primary sm:text-6xl md:text-7xl">
          The Quiet Disruption
        </h1>

        {/* Subtitle */}
        <p className="animate-rise-up mt-6 font-serif text-xl italic text-text-secondary sm:text-2xl md:text-3xl">
          A new contender just matched the best models
          <br className="hidden sm:block" />
          {" "}at a fraction of the cost
        </p>

        {/* Cycling stat pill */}
        <div className="mt-12 flex min-h-[56px] items-center justify-center">
          <div className="relative">
            {stats.map((stat, i) => (
              <span
                key={i}
                className={`
                  inline-block rounded-full border border-border px-6 py-3
                  font-mono text-sm text-text-secondary sm:text-base
                  transition-all duration-500 ease-in-out
                  ${
                    i === activeIndex
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-3 pointer-events-none absolute inset-0"
                  }
                `}
              >
                {stat}
              </span>
            ))}
          </div>
        </div>

        {/* Stat pips */}
        <div className="mt-6 flex items-center justify-center gap-2">
          {stats.map((_, i) => (
            <button
              key={i}
              onClick={() => setActiveIndex(i)}
              aria-label={`Show stat ${i + 1}`}
              className={`
                block rounded-full transition-all duration-300
                ${
                  i === activeIndex
                    ? "h-2 w-6 bg-forward-blue"
                    : "h-2 w-2 bg-text-tertiary/40 hover:bg-text-tertiary"
                }
              `}
            />
          ))}
        </div>
      </div>

      {/* Scroll-down chevron */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-text-tertiary transition-colors hover:text-text-secondary"
        aria-label="Scroll to benchmarks"
      >
        <ChevronDown className="h-8 w-8 animate-bounce" />
      </button>
    </section>
  );
}
