"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function SummarySection() {
  return (
    <SectionWrapper id="summary" layout="centered">
      <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
        Section 7
      </p>

      <h2 className="mt-4 font-serif text-4xl font-bold text-text-primary sm:text-5xl">
        The Whole Picture
      </h2>

      <div className="mt-8 space-y-6 max-w-2xl">
        <div className="rounded-xl border border-border bg-bg-card px-6 py-5">
          <p className="font-serif text-lg font-semibold text-text-primary">
            1. Division asks a question
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-text-secondary">
            &ldquo;How many of <em>this</em> fit inside <em>that</em>?&rdquo; &mdash; Whether
            you&rsquo;re dividing whole numbers or fractions, the question is always the same.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-bg-card px-6 py-5">
          <p className="font-serif text-lg font-semibold text-text-primary">
            2. Smaller divisors make more pieces
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-text-secondary">
            When you divide by a fraction smaller than 1, you always get a number <em>bigger</em> than
            what you started with. More small pieces fit inside.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-bg-card px-6 py-5">
          <p className="font-serif text-lg font-semibold text-text-primary">
            3. Flip and multiply is a shortcut
          </p>
          <p className="mt-2 font-sans text-base leading-relaxed text-text-secondary">
            Multiplying by the reciprocal gives the same answer as counting groups.
            It&rsquo;s not a trick &mdash; it&rsquo;s the same question, rephrased.
          </p>
        </div>
      </div>

      <div className="mt-10 pull-quote max-w-lg">
        <p>
          Dividing by a fraction asks: how many of these fit in that?
          Flipping and multiplying gives the same answer &mdash; always.
        </p>
      </div>
    </SectionWrapper>
  );
}
