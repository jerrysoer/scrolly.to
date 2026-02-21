"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";

const timeline = [
  {
    type: "Stellar BH",
    mass: "~10 solar masses",
    evapTime: "10\u2076\u2077 years",
    note: "Far longer than the age of the universe (1.4 \u00D7 10\u00B9\u2070 years)",
    width: "25%",
  },
  {
    type: "Intermediate BH",
    mass: "~1,000 solar masses",
    evapTime: "10\u2077\u2076 years",
    note: "A number so large it has no physical meaning to us",
    width: "50%",
  },
  {
    type: "Supermassive BH",
    mass: "~10\u2079 solar masses",
    evapTime: "10\u00B9\u2070\u2070 years",
    note: "The last things to exist in the universe",
    width: "95%",
  },
];

export default function HawkingRadiationSection() {
  return (
    <SectionWrapper id="hawking-radiation" layout="split-left" stagger>
      {/* Left: text */}
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          08 &mdash; Quantum Effects
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Hawking Radiation
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          In 1974, Stephen Hawking showed that black holes aren&rsquo;t completely black.
          Quantum effects near the event horizon cause black holes to emit faint
          thermal radiation and slowly lose mass.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          The mechanism involves{" "}
          <JargonTerm
            term="virtual particle pairs"
            definition="Pairs of particles that quantum mechanics allows to briefly pop into existence near the event horizon. If one falls in and the other escapes, the black hole loses a tiny bit of mass."
          />
          . Near the horizon, one particle can fall in while the other escapes. Over
          unimaginable timescales, this drains the black hole entirely.
        </p>

        <blockquote className="pull-quote mt-6">
          Even black holes die. Just not on any timescale that matters to us.
        </blockquote>
      </div>

      {/* Right: timeline viz */}
      <div className="flex flex-col justify-center">
        <div className="rounded-xl border border-border bg-bg-card p-6">
          <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-text-tertiary">
            Evaporation timeline
          </h3>

          <div className="mt-6 space-y-5">
            {timeline.map((item) => (
              <div key={item.type}>
                <div className="flex items-center justify-between">
                  <span className="font-sans text-sm font-medium text-text-primary">{item.type}</span>
                  <span className="font-mono text-xs text-space-blue">{item.evapTime}</span>
                </div>
                <div className="mt-2 h-3 w-full rounded-full bg-bg-secondary">
                  <div
                    className="h-3 rounded-full"
                    style={{
                      width: item.width,
                      background: "linear-gradient(90deg, var(--space-blue), var(--redshift))",
                    }}
                  />
                </div>
                <p className="mt-1 font-sans text-xs text-text-tertiary">{item.mass}</p>
                <p className="font-sans text-xs text-text-tertiary italic">{item.note}</p>
              </div>
            ))}
          </div>

          {/* Comparison */}
          <div className="mt-6 rounded-lg bg-bg-secondary p-3">
            <p className="font-sans text-xs text-text-secondary">
              <span className="font-semibold text-amber">For context:</span> The current age of the universe
              is ~1.4 &times; 10<sup>10</sup> years. A stellar black hole takes 10<sup>67</sup> years
              to evaporate &mdash; that&rsquo;s 10<sup>57</sup> times the current age of the universe.
            </p>
          </div>
        </div>

        {/* Virtual particle pair diagram */}
        <div className="mt-6 rounded-xl border border-border bg-bg-card p-6">
          <svg viewBox="0 0 300 140" className="w-full" aria-label="Hawking radiation particle pair diagram">
            <title>Virtual particle pairs near event horizon</title>
            {/* Event horizon */}
            <line x1="100" y1="0" x2="100" y2="140" stroke="var(--redshift)" strokeWidth="2" strokeDasharray="4 3" />
            <text x="95" y="12" textAnchor="end" fill="var(--text-tertiary)" fontSize="8">inside</text>
            <text x="105" y="12" textAnchor="start" fill="var(--text-tertiary)" fontSize="8">outside</text>

            {/* Particle pair 1 */}
            <circle cx="80" cy="50" r="6" fill="var(--redshift)" opacity="0.7" />
            <circle cx="140" cy="50" r="6" fill="var(--space-blue)" />
            <line x1="86" y1="50" x2="134" y2="50" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2" />
            <text x="80" y="70" textAnchor="middle" fill="var(--redshift)" fontSize="8">falls in</text>
            <text x="140" y="70" textAnchor="middle" fill="var(--space-blue)" fontSize="8">escapes</text>

            {/* Particle pair 2 */}
            <circle cx="70" cy="110" r="6" fill="var(--redshift)" opacity="0.7" />
            <circle cx="160" cy="100" r="6" fill="var(--space-blue)" />
            <line x1="76" y1="110" x2="154" y2="100" stroke="var(--border)" strokeWidth="1" strokeDasharray="3 2" />

            {/* Escaping radiation arrow */}
            <path d="M160 50 L220 30 L260 25" fill="none" stroke="var(--space-blue)" strokeWidth="1.5" />
            <polygon points="260,25 252,20 254,30" fill="var(--space-blue)" />
            <text x="230" y="50" fill="var(--space-blue)" fontSize="9" fontStyle="italic">Hawking</text>
            <text x="230" y="62" fill="var(--space-blue)" fontSize="9" fontStyle="italic">radiation</text>
          </svg>
        </div>
      </div>
    </SectionWrapper>
  );
}
