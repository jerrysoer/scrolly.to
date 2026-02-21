"use client";

import { type ReactNode } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { trustComparison } from "@/lib/explainers/money";
import { Building2, Gem, Cpu } from "lucide-react";

const iconMap: Record<string, ReactNode> = {
  building: <Building2 className="h-8 w-8" />,
  gem: <Gem className="h-8 w-8" />,
  cpu: <Cpu className="h-8 w-8" />,
};

export default function CryptoSection() {
  return (
    <SectionWrapper id="crypto" layout="split-left">
      {/* Left narrative */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
          Section 8
        </p>

        <h2 className="mt-4 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          The Trust Spectrum
        </h2>

        <p className="mt-5 font-sans text-base leading-relaxed text-text-secondary">
          All money requires trust. The question is: trust in <em>what?</em>
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          The dollar asks you to trust a government. Gold asks you to trust the earth
          won&rsquo;t produce more than it can. Bitcoin asks you to trust mathematics.
        </p>

        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          None is perfect. Each is a different answer to the same ancient question: &ldquo;Why
          should I believe this has value?&rdquo;
        </p>
      </div>

      {/* Right cards */}
      <div className="space-y-4">
        {trustComparison.map((item) => (
          <div
            key={item.name}
            className="rounded-xl border border-border bg-bg-card p-6 transition-all duration-200 hover:shadow-md"
            style={{ borderLeftWidth: "4px", borderLeftColor: item.color }}
          >
            <div className="flex items-center gap-3">
              <div
                className="flex h-12 w-12 items-center justify-center rounded-lg"
                style={{ backgroundColor: `${item.color}15`, color: item.color }}
              >
                {iconMap[item.icon]}
              </div>
              <div>
                <p className="font-sans text-lg font-semibold text-text-primary">{item.name}</p>
                <p className="font-mono text-xs" style={{ color: item.color }}>
                  {item.trustModel}
                </p>
              </div>
            </div>

            <p className="mt-3 font-sans text-sm leading-relaxed text-text-secondary">
              {item.description}
            </p>

            <div className="mt-3 space-y-2">
              <div className="flex gap-2">
                <span className="font-sans text-xs font-semibold text-text-tertiary shrink-0">Supply:</span>
                <span className="font-sans text-xs text-text-secondary">{item.supply}</span>
              </div>
              <div className="flex gap-2">
                <span className="font-sans text-xs font-semibold text-text-tertiary shrink-0">Weakness:</span>
                <span className="font-sans text-xs text-text-secondary">{item.weakness}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
