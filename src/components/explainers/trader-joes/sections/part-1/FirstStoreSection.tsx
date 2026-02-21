"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import Link from "next/link";
import { firstStoreData, cliffhangerText } from "@/components/explainers/trader-joes/data/part-1";

export default function FirstStoreSection() {
  return (
    <>
      <div className="section-divider-numbered">
        <span className="number">10</span>
      </div>

      <SectionWrapper id="first-store" layout="full-bleed">
        {/* Date display */}
        <p
          className="mb-2 text-5xl font-bold sm:text-7xl"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--accent-gold)",
          }}
        >
          {firstStoreData.date}
        </p>
        <p
          className="mb-10 text-sm tracking-wide sm:text-base"
          style={{
            fontFamily: "var(--font-dm-mono), monospace",
            color: "var(--text-tertiary)",
          }}
        >
          {firstStoreData.address}
        </p>

        {/* Hero image */}
        <div className="slow-zoom">
          <div className="overflow-hidden rounded-xl">
            <img
              src="/joe-coulombe-wine.png"
              alt="Joe Coulombe holding a bottle of wine surrounded by cases of wine inside one of his Trader Joe's stores"
              className="w-full object-cover"
              style={{ aspectRatio: "16/9", objectPosition: "center 20%" }}
            />
          </div>
          <p
            className="mt-2 text-right text-[10px] tracking-wide"
            style={{
              fontFamily: "var(--font-dm-mono), monospace",
              color: "var(--text-tertiary)",
            }}
          >
            Ken Lubas / Los Angeles Times
          </p>
        </div>

        {/* Detail paragraphs */}
        <div className="mt-12 space-y-6">
          {firstStoreData.details.map((detail, i) => (
            <p
              key={i}
              className="text-base leading-relaxed sm:text-lg"
              style={{ color: "var(--text-secondary)" }}
            >
              {detail}
            </p>
          ))}
        </div>

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
            {cliffhangerText}
          </p>
          <div className="mt-8 text-center">
            <Link
              href="/part-2"
              className="inline-block text-lg font-medium transition-opacity duration-300 hover:opacity-80"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              Continue to Part 2: The Aldi Paradox &rarr;
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
