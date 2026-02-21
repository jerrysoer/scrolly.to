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
import WeDidItOnceSection from "./sections/WeDidItOnceSection";
import WhyDidWeStopSection from "./sections/WhyDidWeStopSection";
import WhatsDifferentSection from "./sections/WhatsDifferentSection";
import MeetArtemisSection from "./sections/MeetArtemisSection";
import WhySouthPoleSection from "./sections/WhySouthPoleSection";
import TheRocketSection from "./sections/TheRocketSection";
import CompetitionSection from "./sections/CompetitionSection";
import WhatComesAfterSection from "./sections/WhatComesAfterSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "we-did-it-once", label: "We Did It Once" },
  { id: "why-did-we-stop", label: "Why We Stopped" },
  { id: "whats-different", label: "What's Different" },
  { id: "meet-artemis", label: "Meet Artemis" },
  { id: "why-south-pole", label: "South Pole" },
  { id: "the-rocket", label: "The Rocket" },
  { id: "competition", label: "Competition" },
  { id: "what-comes-after", label: "What's Next" },
  { id: "faq", label: "FAQ" },
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
      <ShareButton title="Going Back to the Moon" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <WeDidItOnceSection />
          <WhyDidWeStopSection />
          <WhatsDifferentSection />
          <MeetArtemisSection />
          <WhySouthPoleSection />
          <TheRocketSection />
          <CompetitionSection />
          <WhatComesAfterSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know why going back is harder."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "50+", label: "Years since Apollo" },
          { value: "8.8M", label: "Lbs of thrust (SLS)" },
          { value: "3", label: "Countries racing" },
          { value: "2027", label: "Artemis III target" },
        ]}
        sharePrompt="We went to the moon with less computing power than your calculator. Here's why going back is harder — and way more ambitious."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
