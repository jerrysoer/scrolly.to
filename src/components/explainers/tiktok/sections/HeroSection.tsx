"use client";

import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";

const videoCards = [
  { emoji: "\u{1F35D}", label: "Pasta hack", creator: "@quickchef", likes: "2.1M" },
  { emoji: "\u{1F916}", label: "AI tools ranked", creator: "@techbro", likes: "890K" },
  { emoji: "\u{1F602}", label: "POV: Monday morning", creator: "@skitgod", likes: "4.7M" },
  { emoji: "\u{1F3B5}", label: "New sound alert", creator: "@beatmaker", likes: "1.3M" },
];

export default function HeroSection() {
  const [currentVideo, setCurrentVideo] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentVideo((prev) => (prev + 1) % videoCards.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="mx-auto max-w-4xl px-4 py-20 sm:px-6 text-center">
        {/* Phone mockup */}
        <div className="mx-auto mb-12 relative">
          <div className="mx-auto w-48 sm:w-56 rounded-[2rem] border-2 border-border bg-bg-card p-2 shadow-xl">
            <div className="rounded-[1.5rem] bg-bg-secondary overflow-hidden aspect-[9/16] relative">
              {videoCards.map((card, i) => (
                <div
                  key={i}
                  className={`absolute inset-0 flex flex-col items-center justify-center p-4 transition-all duration-500 ${
                    i === currentVideo
                      ? "opacity-100 translate-y-0"
                      : i === (currentVideo + videoCards.length - 1) % videoCards.length
                      ? "opacity-0 -translate-y-full"
                      : "opacity-0 translate-y-full"
                  }`}
                >
                  <span className="text-5xl sm:text-6xl mb-3">{card.emoji}</span>
                  <p className="font-sans text-sm font-semibold text-text-primary">{card.label}</p>
                  <p className="font-sans text-xs text-text-tertiary mt-1">{card.creator}</p>
                  <div className="mt-3 flex items-center gap-1">
                    <span className="text-xs text-backward-orange">&#9829;</span>
                    <span className="font-mono text-xs text-text-secondary">{card.likes}</span>
                  </div>
                </div>
              ))}
              {/* Scroll indicator dots */}
              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                {videoCards.map((_, i) => (
                  <span
                    key={i}
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      i === currentVideo ? "w-4 bg-forward-blue" : "w-1.5 bg-text-tertiary/30"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="font-serif text-4xl font-bold leading-tight tracking-tight text-text-primary sm:text-5xl md:text-6xl animate-fade-in">
          The Infinite Scroll Machine
        </h1>
        <p className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed text-text-secondary sm:text-xl animate-rise-up">
          Every day, over{" "}
          <span className="font-semibold text-forward-blue">one billion users</span>{" "}
          open TikTok and encounter a feed that feels eerily personal. No two feeds are alike.
          Here is how the algorithm behind the world&apos;s most addictive app actually works.
        </p>

        {/* Stat callout */}
        <div className="mt-10 inline-flex items-center gap-3 rounded-full border border-border bg-bg-card px-5 py-2.5 shadow-sm animate-rise-up">
          <span className="font-mono text-sm font-medium text-forward-blue">1B+</span>
          <span className="text-sm text-text-secondary">monthly active users served personalized feeds</span>
        </div>

        {/* Scroll down */}
        <div className="mt-16 animate-pulse-glow">
          <button
            onClick={() => document.getElementById("signals")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex flex-col items-center gap-1 text-text-tertiary hover:text-text-secondary transition-colors"
            aria-label="Scroll to next section"
          >
            <span className="text-xs font-sans">Scroll to explore</span>
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
