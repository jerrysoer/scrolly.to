"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { moneyChainSteps } from "@/lib/explainers/airline-loyalty";
import {
  CreditCard,
  Building2,
  DollarSign,
  TrendingUp,
  HelpCircle,
  Check,
  ArrowRight,
  ArrowDown,
} from "lucide-react";

const iconMap = {
  "credit-card": CreditCard,
  building: Building2,
  "dollar-sign": DollarSign,
  "trending-up": TrendingUp,
  "help-circle": HelpCircle,
};

export default function MoneyChainSection() {
  const [activeStep, setActiveStep] = useState(-1);

  const handleNext = () => {
    if (activeStep === moneyChainSteps.length - 1) {
      setActiveStep(-1); // Restart
    } else {
      setActiveStep(activeStep + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > -1) {
      setActiveStep(activeStep - 1);
    }
  };

  const getNextButtonLabel = () => {
    if (activeStep === -1) return "Start";
    if (activeStep === moneyChainSteps.length - 1) return "Restart";
    return "Next Step";
  };

  const allCompleted = activeStep === moneyChainSteps.length - 1;

  return (
    <SectionWrapper id="money-chain" layout="full-bleed">
      <div className="max-w-6xl mx-auto px-6 py-16 sm:py-24">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="font-mono text-xs uppercase tracking-widest text-airline-blue mb-3">
            03
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary mb-4">
            The Money Chain
          </h2>
          <p className="text-text-secondary text-lg max-w-2xl mx-auto">
            Follow the money from your credit card swipe to United's balance
            sheet.
          </p>
        </div>

        {/* Flow Diagram - Desktop Horizontal */}
        <div className="hidden lg:block mb-12">
          <div className="flex items-center justify-between gap-4">
            {moneyChainSteps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <div key={step.id} className="flex items-center flex-1">
                  {/* Node */}
                  <div
                    className={`
                      relative rounded-xl border p-5 transition-all duration-300
                      ${
                        isActive
                          ? "border-airline-blue bg-bg-card scale-[1.02] shadow-lg"
                          : isCompleted
                            ? "border-border bg-bg-card opacity-70"
                            : "border-border bg-bg-card opacity-40"
                      }
                      ${isActive ? "card-glow" : ""}
                      flex-1 min-h-[140px]
                    `}
                  >
                    {/* Checkmark for completed */}
                    {isCompleted && (
                      <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-revenue-green p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`mb-3 ${isActive ? "text-airline-blue" : "text-text-tertiary"}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Label */}
                    <div
                      className={`font-sans font-semibold text-sm mb-2 ${isActive ? "text-text-primary" : "text-text-secondary"}`}
                    >
                      {step.label}
                    </div>

                    {/* Detail */}
                    {(isActive || isCompleted) && (
                      <div className="text-text-tertiary text-xs leading-relaxed">
                        {step.detail}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {index < moneyChainSteps.length - 1 && (
                    <div className="flex items-center justify-center px-3">
                      <div
                        className={`
                          transition-all duration-300
                          ${
                            index < activeStep
                              ? "text-airline-blue flow-arrow"
                              : index === activeStep
                                ? "text-airline-blue flow-arrow"
                                : "text-border opacity-40"
                          }
                        `}
                      >
                        <ArrowRight className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Flow Diagram - Mobile Vertical */}
        <div className="lg:hidden mb-12">
          <div className="flex flex-col gap-4 max-w-md mx-auto">
            {moneyChainSteps.map((step, index) => {
              const Icon = iconMap[step.icon as keyof typeof iconMap];
              const isActive = index === activeStep;
              const isCompleted = index < activeStep;

              return (
                <div key={step.id} className="flex flex-col items-center">
                  {/* Node */}
                  <div
                    className={`
                      relative rounded-xl border p-5 transition-all duration-300 w-full
                      ${
                        isActive
                          ? "border-airline-blue bg-bg-card scale-[1.02] shadow-lg"
                          : isCompleted
                            ? "border-border bg-bg-card opacity-70"
                            : "border-border bg-bg-card opacity-40"
                      }
                      ${isActive ? "card-glow" : ""}
                    `}
                  >
                    {/* Checkmark for completed */}
                    {isCompleted && (
                      <div className="absolute top-3 right-3">
                        <div className="rounded-full bg-revenue-green p-1">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                    )}

                    {/* Icon */}
                    <div
                      className={`mb-3 ${isActive ? "text-airline-blue" : "text-text-tertiary"}`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>

                    {/* Label */}
                    <div
                      className={`font-sans font-semibold text-sm mb-2 ${isActive ? "text-text-primary" : "text-text-secondary"}`}
                    >
                      {step.label}
                    </div>

                    {/* Detail */}
                    {(isActive || isCompleted) && (
                      <div className="text-text-tertiary text-xs leading-relaxed">
                        {step.detail}
                      </div>
                    )}
                  </div>

                  {/* Arrow */}
                  {index < moneyChainSteps.length - 1 && (
                    <div className="flex items-center justify-center py-3">
                      <div
                        className={`
                          transition-all duration-300
                          ${
                            index < activeStep
                              ? "text-airline-blue flow-arrow"
                              : index === activeStep
                                ? "text-airline-blue flow-arrow"
                                : "text-border opacity-40"
                          }
                        `}
                      >
                        <ArrowDown className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <button
            onClick={handleBack}
            disabled={activeStep === -1}
            className="border border-border text-text-secondary rounded-lg px-5 py-2.5 min-h-[44px] font-sans font-medium transition-all hover:border-airline-blue hover:text-airline-blue disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-border disabled:hover:text-text-secondary"
          >
            Back
          </button>
          <button
            onClick={handleNext}
            className="bg-airline-blue text-white rounded-lg px-5 py-2.5 min-h-[44px] font-sans font-medium transition-all hover:opacity-90"
          >
            {getNextButtonLabel()}
          </button>
        </div>

        {/* Summary Line */}
        {allCompleted && (
          <div className="text-center">
            <p className="text-text-primary font-sans text-base sm:text-lg italic max-w-2xl mx-auto animate-fade-in">
              Every credit card swipe generates revenue for United — whether you
              ever fly or not.
            </p>
          </div>
        )}
      </div>
    </SectionWrapper>
  );
}
