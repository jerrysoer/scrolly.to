"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { cookiePairs } from "../data/cookieNames";

interface FlipCardProps {
  emoji: string;
  frontName: string;
  backName: string;
  isSameName: boolean;
  delay: number;
}

function FlipCard({ emoji, frontName, backName, isSameName, delay }: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="stagger-item perspective-1000"
      style={{ animationDelay: `${delay}ms` }}
    >
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="relative w-full h-48 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-accent-purple)] focus:ring-offset-2 rounded-xl"
        aria-label={`Flip card to see alternate name for ${frontName}`}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <div
          className={`relative w-full h-full transition-transform duration-500 ${
            isFlipped ? "rotate-y-180" : ""
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden bg-[var(--color-bg-card)] border-2 border-[var(--color-border)] rounded-xl p-6 flex flex-col items-center justify-center shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="text-6xl mb-4">{emoji}</div>
            <h3 className="text-xl font-bold text-[var(--color-text-primary)] text-center">
              {frontName}
            </h3>
            <p className="text-sm text-[var(--color-text-tertiary)] mt-2">
              Tap to flip
            </p>
          </div>

          {/* Back */}
          <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-[var(--color-accent-purple)] to-[var(--color-backward-orange)] rounded-xl p-6 flex flex-col items-center justify-center shadow-lg rotate-y-180">
            <div className="text-6xl mb-4">{emoji}</div>
            <h3 className="text-xl font-bold text-white text-center">
              {backName}
            </h3>
            {isSameName && (
              <div className="mt-3 px-4 py-2 bg-white/20 rounded-full">
                <p className="text-sm font-semibold text-white">
                  Same name! 🤯
                </p>
              </div>
            )}
            <p className="text-sm text-white/80 mt-2">
              Tap to flip back
            </p>
          </div>
        </div>
      </button>
    </div>
  );
}

export default function Section3NameGame() {
  return (
    <SectionWrapper id="name-game" stagger>
      <div className="text-center mb-12">
        <h2 className="text-4xl sm:text-5xl font-bold mb-6 text-[var(--color-text-primary)]">
          Wait… are these the same cookie?
        </h2>
        <p className="text-xl text-[var(--color-text-secondary)] max-w-3xl mx-auto leading-relaxed">
          Samoas. Caramel deLites. Tagalongs. Peanut Butter Patties. They look the same. 
          They taste almost the same. But they have different names depending on where you buy them.
        </p>
      </div>

      {/* Flip Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {cookiePairs.map((pair, index) => (
          <FlipCard
            key={pair.littleBrownie}
            emoji={pair.emoji}
            frontName={pair.littleBrownie}
            backName={pair.abcBakers}
            isSameName={pair.littleBrownie === pair.abcBakers}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Fun Fact */}
      <div className="bg-gradient-to-r from-[var(--color-bg-secondary)] to-[var(--color-bg-card)] border-2 border-[var(--color-border)] rounded-xl p-8 text-center">
        <div className="text-5xl mb-4">🤯</div>
        <p className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
          Fun Fact
        </p>
        <p className="text-xl text-[var(--color-text-secondary)]">
          Only Thin Mints and Adventurefuls have the{" "}
          <span className="font-bold text-[var(--color-correct-green)]">
            SAME name
          </span>{" "}
          from both bakers.
        </p>
      </div>
    </SectionWrapper>
  );
}
