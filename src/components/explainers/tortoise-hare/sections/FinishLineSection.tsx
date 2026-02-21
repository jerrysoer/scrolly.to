"use client";

import { useState, useEffect } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const quotes = [
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle (paraphrased by Will Durant)",
  },
  {
    text: "The man who moves a mountain begins by carrying away small stones.",
    author: "Confucius",
  },
  {
    text: "It does not matter how slowly you go as long as you do not stop.",
    author: "Confucius",
  },
  {
    text: "Dripping water hollows out stone, not through force but through persistence.",
    author: "Ovid",
  },
  {
    text: "Success is the sum of small efforts, repeated day in and day out.",
    author: "Robert Collier",
  },
  {
    text: "The secret of getting ahead is getting started.",
    author: "Mark Twain",
  },
  {
    text: "Patience is not passive waiting. Patience is active acceptance of the process required to attain your goals.",
    author: "Ray Davis",
  },
  {
    text: "Long-term consistency trumps short-term intensity.",
    author: "Bruce Lee",
  },
];

export default function FinishLineSection() {
  const [currentQuote, setCurrentQuote] = useState(0);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState("out");
      setTimeout(() => {
        setCurrentQuote((prev) => (prev + 1) % quotes.length);
        setFadeState("in");
      }, 500);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  const quote = quotes[currentQuote];

  return (
    <SectionWrapper id="finish-line" className="py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <p className="font-mono text-xs tracking-[0.2em] uppercase text-accent-purple mb-4">
            The Moral
          </p>
          <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-light mb-6">
            The Finish Line is a Lie
          </h2>
          <p className="font-body text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto leading-relaxed">
            The real moral of the tortoise and the hare isn&apos;t about winning a race.
            It&apos;s that <em className="text-text-primary">there is no finish line</em> -- only
            the daily practice of showing up.
          </p>
        </div>

        {/* Infinite track animation */}
        <div className="relative h-24 mb-16 overflow-hidden rounded-2xl bg-bg-card border border-border">
          <div className="absolute inset-0 flex items-center">
            <div className="th-animate-slide-track flex whitespace-nowrap">
              {/* Duplicate the track for infinite loop */}
              {[...Array(2)].map((_, setIndex) => (
                <div key={setIndex} className="flex items-center gap-8 px-8">
                  {[...Array(20)].map((_, i) => (
                    <div key={i} className="flex items-center gap-8">
                      <div className="w-1 h-8 bg-border rounded" />
                      <span className="text-text-tertiary font-mono text-xs">
                        {i % 5 === 0 ? `${i * 10}m` : ""}
                      </span>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          {/* Tortoise on the track */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
            <svg width="48" height="32" viewBox="0 0 48 32" aria-hidden="true">
              <ellipse cx="24" cy="16" rx="16" ry="11" fill="var(--correct-green)" opacity="0.9" />
              <ellipse cx="24" cy="16" rx="12" ry="8" fill="none" stroke="var(--correct-green)" strokeWidth="1" opacity="0.4" />
              <circle cx="38" cy="18" r="5" fill="var(--correct-green)" opacity="0.8" />
              <circle cx="40" cy="16" r="1.5" fill="var(--bg-primary)" />
              <rect x="14" y="24" width="4" height="5" rx="2" fill="var(--correct-green)" opacity="0.6" />
              <rect x="30" y="24" width="4" height="5" rx="2" fill="var(--correct-green)" opacity="0.6" />
            </svg>
          </div>
        </div>

        {/* Quote carousel */}
        <div className="bg-bg-card border border-border rounded-2xl p-8 sm:p-12 text-center min-h-[200px] flex flex-col items-center justify-center">
          <div
            className={`transition-opacity duration-500 ${
              fadeState === "in" ? "opacity-100" : "opacity-0"
            }`}
          >
            <blockquote className="font-heading text-xl sm:text-2xl md:text-3xl italic text-text-primary leading-relaxed max-w-2xl mx-auto">
              &ldquo;{quote.text}&rdquo;
            </blockquote>
            <cite className="block mt-6 text-sm text-text-tertiary font-body not-italic">
              -- {quote.author}
            </cite>
          </div>

          {/* Progress dots */}
          <div className="flex justify-center gap-2 mt-8">
            {quotes.map((_, i) => (
              <button
                key={i}
                onClick={() => {
                  setFadeState("out");
                  setTimeout(() => {
                    setCurrentQuote(i);
                    setFadeState("in");
                  }, 300);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  currentQuote === i
                    ? "bg-accent-purple w-6"
                    : "bg-text-tertiary/30 hover:bg-text-tertiary/60"
                }`}
                aria-label={`Quote ${i + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Final message */}
        <div className="mt-16 text-center">
          <p className="font-heading text-2xl sm:text-3xl font-light text-text-secondary italic">
            The tortoise is still walking.
          </p>
          <div className="mt-8 inline-block">
            <div className="w-2 h-2 rounded-full bg-correct-green th-animate-pulse-glow mx-auto" />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
