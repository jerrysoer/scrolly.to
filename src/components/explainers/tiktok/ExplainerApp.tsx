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
import SignalsSection from "./sections/SignalsSection";
import VideoInfoSection from "./sections/VideoInfoSection";
import ColdStartSection from "./sections/ColdStartSection";
import InterestGraphSection from "./sections/InterestGraphSection";
import FilterBubbleSection from "./sections/FilterBubbleSection";
import DiversitySection from "./sections/DiversitySection";

const navSections = [
  { id: "hero", label: "The Infinite Scroll Machine" },
  { id: "signals", label: "Your Every Move, Measured" },
  { id: "video-info", label: "Reading Between the Frames" },
  { id: "cold-start", label: "The Cold Start Sprint" },
  { id: "interest-graph", label: "Interest Graph vs Social Graph" },
  { id: "filter-bubble", label: "The Filter Bubble Machine" },
  { id: "diversity", label: "Breaking the Loop" },
];

function SectionDivider({ number }: { number: string }) {
  return (
    <div className="section-number-divider" aria-hidden="true">
      <span className="number">{number}</span>
    </div>
  );
}

export default function ExplainerApp() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="min-h-screen" />;

  return (
    <>
      <ProgressBar />
      <ThemeToggle />
      <SectionNav sections={navSections} />
      <ShareButton title="TikTok Algorithm Explained" />
      <MobileNav sections={navSections} />

      <main>
        <article>
          <HeroSection />
          <SectionDivider number="02" />
          <SignalsSection />
          <SectionDivider number="03" />
          <VideoInfoSection />
          <SectionDivider number="04" />
          <ColdStartSection />
          <SectionDivider number="05" />
          <InterestGraphSection />
          <SectionDivider number="06" />
          <FilterBubbleSection />
          <SectionDivider number="07" />
          <DiversitySection />
        </article>
      </main>

      <CompletionCard
        variant="dashboard"
        title="Now You See the Machine"
        subtitle="TikTok's algorithm is neither magic nor malice — it's a mirror that reflects your attention back at you, one swipe at a time."
        highlights={[
          { value: "1B+", label: "monthly active users" },
          { value: "~30min", label: "cold start time" },
          { value: "6", label: "key signals tracked" },
          { value: "37%", label: "diversity injection" },
        ]}
        sharePrompt="Most people think TikTok's algorithm is random. It's not. Here's how it actually works."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
