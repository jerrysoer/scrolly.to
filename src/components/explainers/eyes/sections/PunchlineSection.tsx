"use client";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function PunchlineSection() {
  return (
    <SectionWrapper id="punchline" layout="centered-card" room="spacious">
      <div className="text-center max-w-2xl mx-auto">
        <p className="font-mono text-xs uppercase tracking-widest text-forward-blue mb-3">
          SECTION 07
        </p>
        <h2 className="font-serif text-3xl font-bold text-text-primary sm:text-4xl mb-8">
          The Punchline
        </h2>

        <div className="space-y-8">
          <p className="font-serif text-xl sm:text-2xl leading-relaxed text-text-primary">
            Every person sees a slightly different version of &ldquo;red.&rdquo;
          </p>

          <p className="font-serif text-lg leading-relaxed text-text-secondary">
            We agree on the word. We point at the same apple and say &ldquo;red.&rdquo;
            But we can&rsquo;t prove we see the same thing.
          </p>

          <p className="font-serif text-lg leading-relaxed text-text-secondary">
            Your red might be my blue. We&rsquo;d never know.
            Because you can&rsquo;t show someone else the inside of your experience.
          </p>

          <div className="pt-4">
            <p className="font-serif text-xl sm:text-2xl italic text-text-primary leading-relaxed">
              &ldquo;Color isn&rsquo;t out there in the world.<br />
              It&rsquo;s a story your brain tells itself<br />
              based on three little detectors.&rdquo;
            </p>
          </div>

          <p className="font-sans text-sm text-text-tertiary mt-8">
            Philosophers call this the problem of <em>qualia</em> — the subjective character of conscious experience.
            Science can measure wavelengths. It cannot measure what red <em>feels like</em> to you.
          </p>
        </div>

        {/* Decorative SVG — three overlapping translucent circles in R, G, B */}
        <div className="mt-12 flex justify-center" aria-hidden="true">
          <svg width="200" height="180" viewBox="0 0 200 180">
            <defs>
              <filter id="punchline-blur">
                <feGaussianBlur stdDeviation="2" />
              </filter>
            </defs>
            <circle cx="80" cy="80" r="50" fill="var(--cone-red)" opacity="0.3" filter="url(#punchline-blur)" />
            <circle cx="120" cy="80" r="50" fill="var(--cone-green)" opacity="0.3" filter="url(#punchline-blur)" />
            <circle cx="100" cy="115" r="50" fill="var(--cone-blue)" opacity="0.3" filter="url(#punchline-blur)" />
            {/* Center overlap = white/light area */}
            <circle cx="100" cy="90" r="8" fill="var(--bg-card)" opacity="0.8" />
            <text x="100" y="94" textAnchor="middle" fill="var(--text-tertiary)" fontSize="8" fontFamily="system-ui">?</text>
          </svg>
        </div>
      </div>
    </SectionWrapper>
  );
}
