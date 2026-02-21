/*
VARIETY RECIPE for Girl Scout Cookies Explainer:
- Layouts: centered-card (hero), full-bleed (S1), split-left (S2), centered-card (S3), split-right (S4), full-bleed (S5), horizontal-scroll (S6)
- Dividers: section-number (playful 01, 02, 03 circles)
- Callouts: stat-box (S1, S5), pull-quote (S4)
- Card interaction: lift (all sections)
*/

"use client";

import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import ShareButton from "@/components/explainers/shared/ShareButton";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";
import SectionDivider from "@/components/explainers/shared/SectionDivider";

import HeroSection from "./sections/HeroSection";
import Section1Hook from "./sections/Section1Hook";
import Section2Bakers from "./sections/Section2Bakers";
import Section3NameGame from "./sections/Section3NameGame";
import Section4Money from "./sections/Section4Money";
import Section5Lesson from "./sections/Section5Lesson";
import Section6Timeline from "./sections/Section6Timeline";

export default function ExplainerApp() {
  return (
    <>
      {/* Progress bar at top */}
      <ProgressBar />

      {/* Theme toggle button */}
      <ThemeToggle />

      {/* Share button (appears after 25% scroll) */}
      <ShareButton />

      <main className="min-h-screen bg-[var(--color-bg-primary)]">
        {/* Hero */}
        <HeroSection />

        <SectionDivider variant="section-number" number={1} />

        {/* Section 1: Hook - 200M boxes */}
        <Section1Hook />

        <SectionDivider variant="section-number" number={2} />

        {/* Section 2: The Secret Bakers */}
        <Section2Bakers />

        <SectionDivider variant="section-number" number={3} />

        {/* Section 3: Name Game */}
        <Section3NameGame />

        <SectionDivider variant="section-number" number={4} />

        {/* Section 4: Money Trail */}
        <Section4Money />

        <SectionDivider variant="section-number" number={5} />

        {/* Section 5: The Real Lesson */}
        <Section5Lesson />

        <SectionDivider variant="section-number" number={6} />

        {/* Section 6: Timeline */}
        <Section6Timeline />

        {/* Completion Card */}
        <CompletionCard
          variant="confetti"
          title="Now you know the cookie secret. 🍪"
          subtitle="Next time you buy a box, you're not just getting a snack. You're funding a business run by a kid."
          sharePrompt="Share this with someone who loves Thin Mints →"
        />
      </main>

      {/* Footer */}
      <ScrollyFooter />
    </>
  );
}
