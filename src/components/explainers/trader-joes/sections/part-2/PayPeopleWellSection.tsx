"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import Link from "next/link";
import { payContrast, payQuote, cliffhangerText2 } from "@/components/explainers/trader-joes/data/part-2";

export default function PayPeopleWellSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">08</span>
      </div>

      <SectionWrapper id="pay-people-well" layout="full-bleed">
        {/* Dramatic stat hero */}
        <div className="mb-12 text-center">
          <CounterAnimation
            target={2}
            suffix="×"
            className="block text-5xl font-bold sm:text-7xl"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--accent-gold)",
            }}
          />
          <p
            className="mt-2 text-sm tracking-wide sm:text-base"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            minimum wage starting pay
          </p>
        </div>

        {/* Hawaiian shirt evolution */}
        <div className="mt-10 mb-4">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/tj-shirts-evolution.gif"
              alt="Animated evolution of Trader Joe's iconic Hawaiian shirts from 1967 to present day, displayed on a cedar-plank wall with warm spotlight"
              className="w-full"
              loading="lazy"
            />
          </div>
        </div>

        {/* 4-column stat grid */}
        <div className="stagger-children mt-12 grid grid-cols-2 gap-6 md:grid-cols-4">
          {payContrast.map((stat, i) => (
            <div
              key={i}
              className="rounded-xl border p-6 text-center"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <p
                className="text-3xl font-bold sm:text-4xl"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: stat.color,
                }}
              >
                {stat.value}
              </p>
              <p
                className="mt-2 text-xs tracking-wide uppercase"
                style={{
                  fontFamily: "var(--font-dm-mono), monospace",
                  color: "var(--text-tertiary)",
                }}
              >
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <PullQuote
          quote={payQuote}
          attribution="Joe Coulombe"
          variant="editorial"
        />

        {/* Cliffhanger */}
        <div className="mt-16">
          <hr
            className="mb-10"
            style={{ borderColor: "var(--accent-gold)", opacity: 0.3 }}
          />
          <p
            className="mx-auto max-w-2xl text-center text-xl italic leading-relaxed sm:text-2xl"
            style={{
              fontFamily: "var(--font-playfair), Georgia, serif",
              color: "var(--text-primary)",
            }}
          >
            {cliffhangerText2}
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/part-3"
              className="inline-block text-lg font-medium transition-opacity duration-300 hover:opacity-80"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              Continue to Part 3: The Cult Machine &rarr;
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
