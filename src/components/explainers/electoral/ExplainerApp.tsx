"use client";

import { useState, useEffect } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";
import HeroSection from "./sections/HeroSection";
import BigIdeaSection from "./sections/BigIdeaSection";
import MathSection from "./sections/MathSection";
import WinnerTakeAllSection from "./sections/WinnerTakeAllSection";
import SwingStatesSection from "./sections/SwingStatesSection";
import ElectionNightSection from "./sections/ElectionNightSection";
import DebateSection from "./sections/DebateSection";
import FAQSection from "./sections/FAQSection";
import {
  navSections,
  completionHighlights,
} from "@/lib/explainers/electoral";

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="The Electoral College Explained" />
      <MobileNav sections={navSections} />

      <main>
        <article>
          <HeroSection />

          <WaveDivider />
          <BigIdeaSection />

          <WaveDivider variant={1} />
          <MathSection />

          <WaveDivider variant={2} />
          <WinnerTakeAllSection />

          <WaveDivider />
          <SwingStatesSection />

          <WaveDivider variant={1} />
          <ElectionNightSection />

          <WaveDivider variant={2} />
          <DebateSection />

          <WaveDivider />
          <FAQSection />
        </article>
      </main>

      <CompletionCard
        variant="dashboard"
        title="You Understand the Electoral College"
        subtitle="Democracy is not a spectator sport — now you know how the game is scored."
        highlights={completionHighlights}
        sharePrompt="538 electors, 270 to win. I just learned how the Electoral College actually works."
      />

      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}

/** Wave SVG divider — organic style per education template. Three variants for visual variety. */
function WaveDivider({ variant = 0 }: { variant?: number }) {
  const paths = [
    "M0 20 Q300 0 600 20 T1200 20",
    "M0 15 Q200 30 500 15 Q800 0 1200 15",
    "M0 25 Q400 5 600 25 Q900 10 1200 25",
  ];

  return (
    <div className="relative w-full overflow-hidden" aria-hidden="true">
      <svg
        className="w-full text-border"
        viewBox="0 0 1200 40"
        fill="none"
        preserveAspectRatio="none"
        style={{ height: "32px", display: "block" }}
      >
        <path
          d={paths[variant % paths.length]}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          opacity="0.4"
        />
      </svg>
    </div>
  );
}
