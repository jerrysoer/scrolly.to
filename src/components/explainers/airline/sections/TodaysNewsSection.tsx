"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { earnRateComparison } from "@/lib/explainers/airline-loyalty";

export default function TodaysNewsSection() {
  const [activeTab, setActiveTab] = useState<"before" | "after">("before");
  const data = activeTab === "before" ? earnRateComparison.before : earnRateComparison.after;

  return (
    <SectionWrapper id="todays-news" layout="centered">
      <div className="mb-2 font-mono text-xs uppercase tracking-widest text-airline-blue">
        06
      </div>
      <h2 className="font-serif text-3xl font-bold sm:text-4xl">
        United's April 2026 Playbook
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">
        United's new MileagePlus rules aren't about rewarding flyers — they're
        about driving credit card adoption. More cardholders = more miles sold
        to Chase = more revenue, independent of flights.
      </p>

      {/* Tab Toggle */}
      <div className="mt-8 flex justify-center">
        <div className="inline-flex rounded-full border border-border bg-bg-secondary p-1">
          <button
            onClick={() => setActiveTab("before")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "before"
                ? "bg-bg-card text-text-primary shadow-sm"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            Before
          </button>
          <button
            onClick={() => setActiveTab("after")}
            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${
              activeTab === "after"
                ? "bg-bg-card text-text-primary shadow-sm"
                : "text-text-tertiary hover:text-text-secondary"
            }`}
          >
            After
          </button>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mt-6 overflow-hidden rounded-xl border border-border">
        <table className="w-full">
          <thead>
            <tr className="bg-bg-secondary">
              <th className="px-4 py-3 text-left font-sans text-sm font-semibold text-text-primary">
                Category
              </th>
              <th className="px-4 py-3 text-left font-sans text-sm font-semibold text-text-primary">
                With Card
              </th>
              <th className="px-4 py-3 text-left font-sans text-sm font-semibold text-text-primary">
                Without Card
              </th>
            </tr>
          </thead>
          <tbody>
            {data.rates.map((rate) => (
              <tr key={rate.category} className="border-t border-border">
                <td className="px-4 py-3 font-sans text-sm text-text-primary">
                  {rate.category}
                </td>
                <td
                  className={`px-4 py-3 font-mono text-sm ${
                    activeTab === "after" &&
                    (rate.withCard.includes("10x") ||
                      rate.withCard.includes("14x") ||
                      rate.withCard.includes("22x"))
                      ? "font-semibold text-revenue-green"
                      : "text-text-secondary"
                  }`}
                >
                  {rate.withCard}
                </td>
                <td
                  className={`px-4 py-3 font-mono text-sm ${
                    activeTab === "after" && rate.withoutCard === "0x"
                      ? "font-semibold text-danger-red"
                      : "text-text-secondary"
                  }`}
                >
                  {rate.withoutCard}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Callout */}
      <div className="mt-8 rounded-xl border border-border bg-bg-card p-6">
        <p className="text-center font-medium leading-relaxed text-text-primary">
          The message is clear: no card, no miles. United wants you as a
          cardholder, not just a passenger.
        </p>
      </div>
    </SectionWrapper>
  );
}
