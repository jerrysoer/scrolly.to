"use client";

import { useState } from "react";
import { Factory, Ship, Building2, ShoppingBag, ArrowRight } from "lucide-react";
import DateStampedChapter from "@/components/explainers/shared/DateStampedChapter";
import { tariffFlowSteps } from "@/lib/explainers/tariffs";

const iconMap: Record<string, React.ElementType> = {
  Factory,
  Ship,
  Building2,
  ShoppingBag,
};

export default function WhatIsATariffSection() {
  const [revealed, setRevealed] = useState(false);

  return (
    <DateStampedChapter
      id="what-is-a-tariff"
      date="THE BASICS"
      title="A tariff is a tax. But not on who you think."
    >
      <p className="text-base leading-relaxed text-text-secondary">
        A tariff is a tax on imported goods, collected at the border by US
        Customs. Politicians often say tariffs punish foreign countries, but the
        money comes out of American pockets. The foreign factory doesn&apos;t
        write the check &mdash; the US company importing the goods does.
      </p>

      {/* 4-step flow */}
      <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr]">
        {tariffFlowSteps.map((step, i) => {
          const Icon = iconMap[step.icon];
          return (
            <div key={step.id} className="contents">
              {/* Card */}
              <div
                className="flex flex-col items-center rounded-xl border p-5 text-center"
                style={{
                  backgroundColor: "var(--bg-card)",
                  borderColor: "var(--border)",
                }}
              >
                {Icon && (
                  <Icon
                    className="mb-3 h-7 w-7"
                    style={{
                      color:
                        i === 2 ? "var(--accent-red)" : "var(--accent-blue)",
                    }}
                  />
                )}
                <span className="font-sans text-sm font-semibold text-text-primary">
                  {step.label}
                </span>
                <span className="mt-1 text-xs text-text-tertiary">
                  {step.description}
                </span>
              </div>

              {/* Connecting arrow (hidden after last card) */}
              {i < tariffFlowSteps.length - 1 && (
                <div className="hidden items-center justify-center lg:flex">
                  <ArrowRight
                    className="h-5 w-5 text-text-tertiary opacity-40"
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile arrows (between cards, visible only on small screens) */}
      <div className="mt-2 flex flex-col items-center gap-2 sm:hidden">
        {/* Arrows are already implicit in vertical stack; optional enhancement */}
      </div>

      {/* Interactive toggle */}
      <div className="mt-10">
        <button
          onClick={() => setRevealed((prev) => !prev)}
          className="rounded-lg px-5 py-3 font-sans text-sm font-semibold transition-colors"
          style={{
            backgroundColor: revealed ? "var(--bg-card)" : "var(--accent-blue)",
            color: revealed ? "var(--text-primary)" : "white",
            border: revealed ? "1px solid var(--border)" : "none",
          }}
        >
          {revealed ? "Got it" : "Who pays the tariff?"}
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateRows: revealed ? "1fr" : "0fr",
            transition: "grid-template-rows 400ms ease",
          }}
        >
          <div style={{ overflow: "hidden" }}>
            <div
              className="mt-4 rounded-xl border p-5"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--accent-red)",
              }}
            >
              <p
                className="font-sans text-lg font-bold"
                style={{ color: "var(--accent-red)" }}
              >
                The American importer. Not China.
              </p>
              <p className="mt-2 text-sm leading-relaxed text-text-secondary">
                When goods arrive at a US port, the American company that
                ordered them pays the tariff to US Customs. That cost is then
                passed on through the supply chain &mdash; to distributors,
                retailers, and ultimately, to consumers.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DateStampedChapter>
  );
}
