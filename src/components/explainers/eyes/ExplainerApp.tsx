"use client";

import { useEffect, useState } from "react";
import ProgressBar from "@/components/explainers/shared/ProgressBar";
import ThemeToggle from "@/components/explainers/shared/ThemeToggle";
import SectionNav from "@/components/explainers/shared/SectionNav";
import ShareButton from "@/components/explainers/shared/ShareButton";
import MobileNav from "@/components/explainers/shared/MobileNav";
import CompletionCard from "@/components/explainers/shared/CompletionCard";
import ScrollyFooter from "@/components/explainers/shared/ScrollyFooter";
import SectionDivider from "./SectionDivider";

import HeroSection from "./sections/HeroSection";
import SpectrumSection from "./sections/SpectrumSection";
import DetectorsSection from "./sections/DetectorsSection";
import TheMixSection from "./sections/TheMixSection";
import DogVisionSection from "./sections/DogVisionSection";
import ColorBlindnessSection from "./sections/ColorBlindnessSection";
import TheDressSection from "./sections/TheDressSection";
import PunchlineSection from "./sections/PunchlineSection";
import FAQSection from "./sections/FAQSection";

const navSections = [
  { id: "spectrum", label: "Light Is Waves" },
  { id: "detectors", label: "3 Detectors" },
  { id: "the-mix", label: "The Mix" },
  { id: "dog-vision", label: "Dog Vision" },
  { id: "color-blindness", label: "Color Blindness" },
  { id: "the-dress", label: "The Dress" },
  { id: "punchline", label: "The Punchline" },
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
      <ShareButton title="How Your Eye Sees Color" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <SectionDivider variant={0} />
          <SpectrumSection />
          <SectionDivider variant={1} />
          <DetectorsSection />
          <SectionDivider variant={2} />
          <TheMixSection />
          <SectionDivider variant={0} flip />
          <DogVisionSection />
          <SectionDivider variant={1} flip />
          <ColorBlindnessSection />
          <SectionDivider variant={2} flip />
          <TheDressSection />
          <SectionDivider variant={0} />
          <PunchlineSection />
          <FAQSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how your eye sees color."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "3", label: "Cone types" },
          { value: "1M+", label: "Colors perceived" },
          { value: "0.0035%", label: "Of EM spectrum" },
          { value: "120M", label: "Rods in your eye" },
        ]}
        sharePrompt="Color doesn't exist outside your brain. Here's how 3 types of cone cells create a million colors from just light waves."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
