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
import ItsAllWavesSection from "./sections/ItsAllWavesSection";
import RouterRadioSection from "./sections/RouterRadioSection";
import DataIntoWavesSection from "./sections/DataIntoWavesSection";
import HandshakeSection from "./sections/HandshakeSection";
import ChannelsSection from "./sections/ChannelsSection";
import FrequencySection from "./sections/FrequencySection";
import DataRateSection from "./sections/DataRateSection";
import WhyWallsKillItSection from "./sections/WhyWallsKillItSection";

const navSections = [
  { id: "hero", label: "Introduction" },
  { id: "its-all-waves", label: "It's All Waves" },
  { id: "router-radio", label: "Router Radio" },
  { id: "data-into-waves", label: "Data Into Waves" },
  { id: "handshake", label: "The Handshake" },
  { id: "channels", label: "Channels" },
  { id: "frequency", label: "Frequency" },
  { id: "data-rate", label: "Data Rate" },
  { id: "why-walls-kill-it", label: "Why Walls Kill It" },
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
      <ShareButton title="How WiFi Works" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <ItsAllWavesSection />
          <RouterRadioSection />
          <DataIntoWavesSection />
          <HandshakeSection />
          <ChannelsSection />
          <FrequencySection />
          <DataRateSection />
          <WhyWallsKillItSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="You're Connected"
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "2.4", label: "GHz frequency" },
          { value: "5", label: "GHz alt frequency" },
          { value: "186K", label: "miles/sec speed" },
          { value: "11", label: "channels available" },
        ]}
        sharePrompt="Found this fascinating? Share it with someone browsing on WiFi right now."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
