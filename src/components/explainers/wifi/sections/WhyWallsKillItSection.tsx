"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const materials = [
  { name: "Air", loss: 0, percent: 100, color: "var(--accent-green)" },
  { name: "Drywall", loss: 3, percent: 50, color: "var(--accent-blue)" },
  { name: "Plywood", loss: 4, percent: 40, color: "var(--accent-blue)" },
  { name: "Glass", loss: 4, percent: 40, color: "var(--accent-blue)" },
  { name: "Brick", loss: 6, percent: 25, color: "var(--accent-amber)" },
  { name: "Concrete", loss: 10, percent: 10, color: "var(--accent-amber)" },
  { name: "Water/Body", loss: 15, percent: 3, color: "#ef4444" },
  { name: "Metal", loss: 20, percent: 1, color: "#ef4444" },
];

export default function WhyWallsKillItSection() {
  return (
    <SectionWrapper id="why-walls-kill-it" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 08
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          Why Walls Kill Your WiFi
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          Every wall between you and the router cuts signal strength in half &mdash; or worse.
          Different materials absorb WiFi signals at dramatically different rates.
        </p>
      </div>

      {/* Material absorption chart */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <p className="mb-6 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          Signal Loss by Material (dB)
        </p>

        <div className="space-y-4">
          {materials.map((mat) => (
            <div key={mat.name} className="flex items-center gap-4">
              <span className="w-24 shrink-0 font-sans text-sm font-medium text-right" style={{ color: "var(--text-primary)" }}>
                {mat.name}
              </span>
              <div className="flex-1 relative">
                <div className="h-8 rounded-lg overflow-hidden" style={{ backgroundColor: "var(--bg-secondary)" }}>
                  <div
                    className="h-full rounded-lg flex items-center justify-end pr-3 transition-all duration-700"
                    style={{
                      width: `${Math.max(100 - mat.loss * 4.5, 5)}%`,
                      backgroundColor: mat.color,
                      opacity: 0.8,
                    }}
                  >
                    <span className="font-mono text-xs font-bold text-white drop-shadow-sm">
                      {mat.percent}%
                    </span>
                  </div>
                </div>
              </div>
              <span className="w-16 shrink-0 font-mono text-xs text-right" style={{ color: "var(--text-tertiary)" }}>
                {mat.loss === 0 ? "~0 dB" : `-${mat.loss} dB`}
              </span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-4 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-green)" }} /> No loss
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-blue)" }} /> Mild loss
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "var(--accent-amber)" }} /> Significant loss
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: "#ef4444" }} /> Severe loss
          </span>
        </div>
      </div>

      {/* Key insight */}
      <div className="mt-6 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <p className="font-mono text-xs uppercase tracking-wider mb-3" style={{ color: "var(--text-tertiary)" }}>What -3 dB Means</p>
        <p className="font-sans text-base leading-relaxed" style={{ color: "var(--text-secondary)" }}>
          Every <strong style={{ color: "var(--text-primary)" }}>3 dB of loss cuts signal strength in half</strong>.
          So a single concrete wall (-10 dB) reduces your signal to roughly
          <strong style={{ color: "var(--accent-blue)" }}> 10% </strong> of its original strength. Two walls?
          You&rsquo;re down to <strong style={{ color: "var(--accent-amber)" }}>1%</strong>.
        </p>
      </div>

      <div className="mt-6 pull-quote">
        Every wall between you and the router cuts signal strength in half &mdash; or worse.
      </div>
    </SectionWrapper>
  );
}
