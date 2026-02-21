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
import TokenizationSection from "./sections/TokenizationSection";
import AuthorizationSection from "./sections/AuthorizationSection";
import DeclineSection from "./sections/DeclineSection";
import FraudSection from "./sections/FraudSection";
import SettlementSection from "./sections/SettlementSection";
import WebhooksSection from "./sections/WebhooksSection";

const navSections = [
  { id: "hero", label: "Intro" },
  { id: "tokenization", label: "Tokenization" },
  { id: "authorization", label: "Authorization" },
  { id: "decline", label: "Declines" },
  { id: "fraud", label: "Fraud" },
  { id: "settlement", label: "Settlement" },
  { id: "webhooks", label: "Webhooks" },
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
      <ShareButton title="Stripe Payment Flow" />
      <MobileNav sections={navSections} />
      <main className="relative">
        <HeroSection />
        <div className="stripe-divider" />
        <TokenizationSection />
        <div className="stripe-divider" />
        <AuthorizationSection />
        <div className="stripe-divider" />
        <DeclineSection />
        <div className="stripe-divider" />
        <FraudSection />
        <div className="stripe-divider" />
        <SettlementSection />
        <div className="stripe-divider" />
        <WebhooksSection />
      </main>
      <CompletionCard
        variant="dashboard"
        title="Now you know how Stripe processes payments."
        subtitle="This explainer was built with Scrolly — an AI-powered scrollytelling platform that turns complex topics into interactive experiences."
        highlights={[
          { value: "~2s", label: "Total payment time" },
          { value: "7", label: "Players involved" },
          { value: "2.9%", label: "Processing fee" },
          { value: "1000+", label: "Fraud signals" },
        ]}
        sharePrompt="Ever wonder what happens in the 2 seconds between clicking Pay and seeing Payment Confirmed? Here's every hop, every millisecond."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
