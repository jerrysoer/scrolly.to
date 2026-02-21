"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import CounterAnimation from "@/components/explainers/trader-joes/shared/CounterAnimation";
import PullQuote from "@/components/explainers/trader-joes/shared/PullQuote";
import { buyoutAmount, buyoutYear, buyoutQuote } from "@/components/explainers/trader-joes/data/part-1";

export default function BuyoutSection() {
  const barRef = useRef<HTMLDivElement>(null);
  const [barVisible, setBarVisible] = useState(false);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setBarVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.4 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">05</span>
      </div>

      <SectionWrapper id="buyout" layout="centered">
        <h2
          className="mb-4 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-playfair), Georgia, serif" }}
        >
          The $25,000 Bet
        </h2>

        <p
          className="mb-8 text-lg leading-relaxed"
          style={{ color: "var(--text-secondary)" }}
        >
          In {buyoutYear}, Joe Coulombe scraped together everything he had to buy
          the Pronto Markets chain outright from Rexall Drug. Six tiny
          convenience stores, all losing ground to 7-Eleven. It was either a
          stroke of genius or financial suicide.
        </p>

        <PullQuote quote={buyoutQuote} attribution="Joe Coulombe" />

        {/* Animated bar showing $25,000 */}
        <div ref={barRef} className="my-10">
          <div className="mb-3 flex items-baseline justify-between">
            <span
              className="text-xs uppercase tracking-wide"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--text-tertiary)",
              }}
            >
              Total investment
            </span>
            <span style={{ fontFamily: "var(--font-dm-mono), monospace" }}>
              <CounterAnimation
                target={buyoutAmount}
                prefix="$"
                className="text-2xl font-bold"
              />
            </span>
          </div>
          <div
            className="h-3 w-full overflow-hidden rounded-full"
            style={{ background: "var(--bg-secondary)" }}
          >
            <div
              className="h-full rounded-full"
              style={{
                width: barVisible ? "100%" : "0%",
                background:
                  "linear-gradient(90deg, var(--accent-navy), var(--accent-gold))",
                transition: "width 1.8s cubic-bezier(0.25, 0.1, 0.25, 1)",
              }}
            />
          </div>
          <p
            className="mt-2 text-xs"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            6 stores &middot; {buyoutYear}
          </p>
        </div>
      </SectionWrapper>
    </>
  );
}
