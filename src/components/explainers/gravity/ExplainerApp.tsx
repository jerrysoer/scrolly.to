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
import WrongPictureSection from "./sections/WrongPictureSection";
import AttractionSection from "./sections/AttractionSection";
import FallingSpeedSection from "./sections/FallingSpeedSection";
import NewtonSection from "./sections/NewtonSection";
import TrampolineSection from "./sections/TrampolineSection";
import OrbitsSection from "./sections/OrbitsSection";
import WeirdEffectsSection from "./sections/WeirdEffectsSection";
import UnsolvedSection from "./sections/UnsolvedSection";

const navSections = [
  { id: "wrong-picture", label: "Misconception" },
  { id: "attraction", label: "Attraction" },
  { id: "falling-speed", label: "Falling" },
  { id: "newton", label: "Newton" },
  { id: "trampoline", label: "Spacetime" },
  { id: "orbits", label: "Orbits" },
  { id: "weird-effects", label: "Weird Effects" },
  { id: "unsolved", label: "Unsolved" },
];

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="What Is Gravity?" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WrongPictureSection />
          <AttractionSection />
          <FallingSpeedSection />
          <NewtonSection />
          <TrampolineSection />
          <OrbitsSection />
          <WeirdEffectsSection />
          <UnsolvedSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="You Just Explored Gravity"
        subtitle="We can predict gravity well enough to land a rover on Mars from 140 million miles away. We still don't know what it actually is. That's not a failure — that's what makes physics worth doing."
        highlights={[
          { value: "1687", label: "Newton" },
          { value: "1915", label: "Einstein" },
          { value: "2015", label: "Gravitational waves" },
          { value: "?", label: "Still unsolved" },
        ]}
        sharePrompt="Gravity isn't a force pulling you down. It's the shape of space — and we still don't fully know why. Here's everything we DO know, from Newton to Einstein to GPS satellites."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
