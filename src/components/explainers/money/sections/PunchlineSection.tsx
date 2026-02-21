"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function PunchlineSection() {
  return (
    <SectionWrapper id="punchline" layout="centered">
      <div className="flex flex-col items-center text-center py-8">
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-money-green">
          The Punchline
        </p>

        <h2 className="mt-8 font-serif text-4xl font-bold leading-tight text-text-primary sm:text-5xl lg:text-6xl">
          Money is a{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--money-green), var(--accent-blue))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            story
          </span>
        </h2>

        <blockquote className="mx-auto mt-8 max-w-2xl font-serif text-xl leading-relaxed italic text-text-secondary sm:text-2xl">
          &ldquo;Every dollar in your pocket is worth something because millions of people
          all agree it is. The moment they stop believing, it&rsquo;s just paper &mdash;
          or just numbers on a screen.&rdquo;
        </blockquote>

        <div className="mx-auto mt-10 max-w-xl space-y-4">
          <p className="font-sans text-base leading-relaxed text-text-secondary">
            Gold was a story about the earth. Paper was a story about governments.
            Bitcoin is a story about mathematics.
          </p>
          <p className="font-sans text-base leading-relaxed text-text-secondary">
            The form changes. The underlying principle never does: money works because
            we all agree it does. Nothing more. Nothing less.
          </p>
          <p className="font-sans text-base leading-relaxed text-text-secondary">
            That agreement &mdash; fragile, invisible, powerful &mdash; is civilization&rsquo;s
            greatest achievement. And its greatest vulnerability.
          </p>
        </div>

        {/* Visual accent */}
        <div className="mt-12 flex items-center gap-4" aria-hidden="true">
          <div className="h-px w-12 bg-border" />
          <svg viewBox="0 0 24 24" className="h-5 w-5 text-money-green opacity-40">
            <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="1.5" />
            <text x="12" y="16" textAnchor="middle" fontSize="12" fill="currentColor" fontFamily="Georgia, serif">$</text>
          </svg>
          <div className="h-px w-12 bg-border" />
        </div>
      </div>
    </SectionWrapper>
  );
}
