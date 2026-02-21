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
import TokenizerSection from "./sections/TokenizerSection";
import AutogradSection from "./sections/AutogradSection";
import ArchitectureSection from "./sections/ArchitectureSection";
import AttentionSection from "./sections/AttentionSection";
import TrainingSection from "./sections/TrainingSection";
import InferenceSection from "./sections/InferenceSection";

const navSections = [
  { id: "hero", label: "Hero" },
  { id: "tokenizer", label: "Tokenizer" },
  { id: "autograd", label: "Autograd" },
  { id: "architecture", label: "Architecture" },
  { id: "attention", label: "Attention" },
  { id: "training", label: "Training" },
  { id: "inference", label: "Inference" },
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
      <ShareButton title="Micro-Level GPT Architecture" />
      <MobileNav sections={navSections} />
      <main>
        <article>
          <HeroSection />
          <TokenizerSection />
          <AutogradSection />
          <ArchitectureSection />
          <AttentionSection />
          <TrainingSection />
          <InferenceSection />
        </article>
      </main>
      <CompletionCard
        variant="dashboard"
        title="Algorithm Complete"
        subtitle="You've explored every layer of a character-level GPT — from tokenization to generation. This is the complete algorithm; everything else is just efficiency."
        highlights={[
          { value: "~150", label: "lines of Python" },
          { value: "27", label: "token vocabulary" },
          { value: "4", label: "attention heads" },
          { value: "1000", label: "training steps" },
        ]}
        sharePrompt="Understood GPT from the ground up? Share this explainer with someone curious about how language models actually work."
      />
      <ScrollyFooter attribution="Built with Scrolly" />
    </>
  );
}
