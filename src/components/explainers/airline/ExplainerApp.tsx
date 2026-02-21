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
import MythSection from "./sections/MythSection";
import RealBusinessSection from "./sections/RealBusinessSection";
import MoneyChainSection from "./sections/MoneyChainSection";
import FloatSection from "./sections/FloatSection";
import RedemptionSection from "./sections/RedemptionSection";
import TodaysNewsSection from "./sections/TodaysNewsSection";
import TakeawaySection from "./sections/TakeawaySection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "hero", label: "Introduction" },
  { id: "myth", label: "The Myth" },
  { id: "real-business", label: "The Real Business" },
  { id: "money-chain", label: "The Money Chain" },
  { id: "the-float", label: "The Float" },
  { id: "redemption-game", label: "Redemption Game" },
  { id: "todays-news", label: "Today's News" },
  { id: "takeaway", label: "The Takeaway" },
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
      <ShareButton title="How Airlines Make More Money From Your Credit Card Than Your Ticket" />
      <MobileNav sections={navSections} />

      <main>
        <article>
          <HeroSection />
          <SectionDivider number="01" />
          <MythSection />
          <SectionDivider number="02" />
          <RealBusinessSection />
          <SectionDivider number="03" />
          <MoneyChainSection />
          <SectionDivider number="04" />
          <FloatSection />
          <SectionDivider number="05" />
          <RedemptionSection />
          <SectionDivider number="06" />
          <TodaysNewsSection />
          <SectionDivider number="07" />
          <TakeawaySection />
        </article>
      </main>

      <FAQSection />

      <CompletionCard
        variant="dashboard"
        title="Now You Know the Game"
        subtitle="You're not a frequent flyer. You're a revenue source for a financial product that happens to have airplanes."
        highlights={[
          { value: "$22B", label: "MileagePlus valuation" },
          { value: "30%", label: "miles never redeemed" },
          { value: "2.2x", label: "loyalty vs airline value" },
          { value: "0x", label: "basic economy earn (no card)" },
        ]}
        sharePrompt="Most people think airlines make money flying you places. Here's the real business model."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
