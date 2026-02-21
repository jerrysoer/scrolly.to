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
import WhatIsBlackHoleSection from "./sections/WhatIsBlackHoleSection";
import EventHorizonSection from "./sections/EventHorizonSection";
import SpaghettificationSection from "./sections/SpaghettificationSection";
import TwoPerspectivesSection from "./sections/TwoPerspectivesSection";
import TimeDilationSection from "./sections/TimeDilationSection";
import InsideEventHorizonSection from "./sections/InsideEventHorizonSection";
import SingularitySection from "./sections/SingularitySection";
import HawkingRadiationSection from "./sections/HawkingRadiationSection";
import FirewallParadoxSection from "./sections/FirewallParadoxSection";

const navSections = [
  { id: "what-is-black-hole", label: "The Basics" },
  { id: "event-horizon", label: "Event Horizon" },
  { id: "spaghettification", label: "Spaghettification" },
  { id: "two-perspectives", label: "Two Perspectives" },
  { id: "time-dilation", label: "Time Dilation" },
  { id: "inside-event-horizon", label: "Inside" },
  { id: "singularity", label: "Singularity" },
  { id: "hawking-radiation", label: "Hawking Radiation" },
  { id: "firewall-paradox", label: "Firewall Paradox" },
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
      <ShareButton title="Fall Into a Black Hole" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WhatIsBlackHoleSection />
          <EventHorizonSection />
          <SpaghettificationSection />
          <TwoPerspectivesSection />
          <TimeDilationSection />
          <InsideEventHorizonSection />
          <SingularitySection />
          <HawkingRadiationSection />
          <FirewallParadoxSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know what happens when you fall into a black hole."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "0", label: "Escape possible" },
          { value: "\u221E", label: "Density at center" },
          { value: "9", label: "Sections explored" },
          { value: "10", label: "Min read" },
        ]}
        sharePrompt="If you fell into a black hole, you'd be fine. The problem is everyone else's perspective. Here's the physics."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
