"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { inflationData } from "@/lib/explainers/money";

export default function InfinitePrintingSection() {
  const [sliderIndex, setSliderIndex] = useState(0);
  const current = inflationData[sliderIndex];

  return (
    <SectionWrapper id="infinite-printing" layout="split-right">
      {/* Left narrative */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
          Section 6
        </p>

        <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Infinite Printing Problem
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          If banks can create money from nothing, what stops them from creating too much?
          In theory: regulation. In practice: sometimes nothing.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          When the money supply grows faster than the economy, each dollar buys less.
          That&rsquo;s{" "}
          <strong className="text-inflation-red">inflation</strong> &mdash; and it&rsquo;s
          the hidden tax on everyone who holds cash.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          The US had about $2 trillion in physical bills. Total money supply? Over $21
          trillion. The rest is just numbers in computers.
        </p>

        {/* Zimbabwe callout */}
        <div className="mt-6 rounded-xl border-l-4 border-l-inflation-red bg-bg-card p-5 border border-border">
          <p className="font-sans text-sm font-semibold text-inflation-red">
            Zimbabwe, November 2008
          </p>
          <p className="mt-1 font-sans text-sm text-text-secondary">
            Peak inflation hit 89.7 sextillion percent per month. Prices doubled every 24
            hours. A loaf of bread cost 35 million Zimbabwe dollars. The currency became
            worthless.
          </p>
        </div>
      </div>

      {/* Right interactive slider */}
      <div className="flex flex-col items-center">
        <div className="w-full rounded-2xl border border-border bg-bg-card p-6 sm:p-8">
          <p className="text-center font-sans text-sm font-medium text-text-tertiary">
            What $100 buys as money supply grows
          </p>

          {/* Visual: shrinking dollar */}
          <div className="mt-6 flex flex-col items-center">
            <div className="relative flex h-40 items-end justify-center">
              <div
                className="flex items-center justify-center rounded-xl border-2 transition-all duration-500"
                style={{
                  width: `${Math.max(30, current.power * 1.2)}px`,
                  height: `${Math.max(30, current.power * 1.2)}px`,
                  borderColor: current.power > 50 ? "var(--money-green)" : "var(--inflation-red)",
                  backgroundColor: current.power > 50 ? "var(--money-green)" : "var(--inflation-red)",
                  opacity: 0.15,
                }}
              >
                <span
                  className="font-mono font-bold transition-all duration-500"
                  style={{
                    fontSize: `${Math.max(12, current.power * 0.3)}px`,
                    color: current.power > 50 ? "var(--money-green)" : "var(--inflation-red)",
                  }}
                >
                  $
                </span>
              </div>
            </div>

            {/* Value display */}
            <p
              className="mt-4 font-mono text-4xl font-bold transition-colors duration-300"
              style={{
                color: current.power > 50 ? "var(--money-green)" : "var(--inflation-red)",
              }}
            >
              ${current.power}
            </p>
            <p className="mt-1 font-sans text-sm text-text-tertiary">
              purchasing power of $100
            </p>
          </div>

          {/* Slider */}
          <div className="mt-6">
            <input
              type="range"
              min={0}
              max={inflationData.length - 1}
              value={sliderIndex}
              onChange={(e) => setSliderIndex(Number(e.target.value))}
              className="w-full"
              style={{
                background: `linear-gradient(90deg, var(--money-green) 0%, var(--inflation-red) 100%)`,
              }}
            />
            <div className="mt-2 flex justify-between">
              <span className="font-mono text-xs text-text-tertiary">{inflationData[0].label}</span>
              <span className="font-mono text-xs text-text-tertiary">
                {inflationData[inflationData.length - 1].label}
              </span>
            </div>
          </div>

          {/* Money supply label */}
          <div className="mt-4 text-center">
            <p className="font-sans text-sm text-text-secondary">
              Money supply: <span className="font-mono font-semibold text-text-primary">{current.label}</span>
            </p>
            <p className="font-sans text-xs text-text-tertiary">{current.year}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
