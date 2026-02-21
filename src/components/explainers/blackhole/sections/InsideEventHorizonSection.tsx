"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function InsideEventHorizonSection() {
  return (
    <SectionWrapper id="inside-event-horizon" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest text-space-blue">
          06 &mdash; Past the Point of No Return
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
          Inside the Event Horizon
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
          Once inside, the rules change. Space and time swap roles. Moving forward in
          time means moving toward the center. You can no more avoid the singularity than
          you can avoid tomorrow.
        </p>
        <p className="mt-3 font-sans text-base leading-relaxed text-text-secondary">
          Every direction you look, every path you take, every effort to turn around &mdash;
          all lead to the singularity. It&rsquo;s not a place in space. It&rsquo;s a moment
          in your future.
        </p>

        {/* Spacetime diagram */}
        <div className="mt-10 mx-auto max-w-lg rounded-xl border border-border bg-bg-card p-6">
          <svg viewBox="0 0 400 350" className="w-full" aria-label="Spacetime diagram showing light cones tilting inside black hole">
            <title>Spacetime diagram inside a black hole</title>
            <defs>
              <linearGradient id="insideGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="var(--bg-secondary)" />
                <stop offset="50%" stopColor="var(--bg-secondary)" />
                <stop offset="50%" stopColor="var(--event-horizon)" stopOpacity="0.3" />
                <stop offset="100%" stopColor="var(--deep-space)" stopOpacity="0.5" />
              </linearGradient>
            </defs>

            <rect x="0" y="0" width="400" height="350" fill="url(#insideGrad)" rx="8" />

            {/* Axes */}
            <line x1="40" y1="310" x2="380" y2="310" stroke="var(--text-tertiary)" strokeWidth="1" />
            <line x1="40" y1="310" x2="40" y2="20" stroke="var(--text-tertiary)" strokeWidth="1" />
            <text x="380" y="325" textAnchor="end" fill="var(--text-tertiary)" fontSize="10">Space</text>
            <text x="15" y="20" fill="var(--text-tertiary)" fontSize="10">Time</text>

            {/* Event horizon */}
            <line x1="200" y1="20" x2="200" y2="310" stroke="var(--redshift)" strokeWidth="2" strokeDasharray="6 4" />
            <text x="200" y="15" textAnchor="middle" fill="var(--redshift)" fontSize="10">Event Horizon</text>

            {/* Outside light cones - upright */}
            {[100, 140].map((x) => (
              <g key={`outside-${x}`}>
                <polygon
                  points={`${x},200 ${x - 20},160 ${x + 20},160`}
                  fill="var(--space-blue)"
                  opacity="0.2"
                  stroke="var(--space-blue)"
                  strokeWidth="1"
                />
                <line x1={x} y1={200} x2={x - 20} y2={160} stroke="var(--space-blue)" strokeWidth="1.5" />
                <line x1={x} y1={200} x2={x + 20} y2={160} stroke="var(--space-blue)" strokeWidth="1.5" />
                <circle cx={x} cy={200} r="3" fill="var(--space-blue)" />
              </g>
            ))}

            {/* Inside light cones - tilted inward (toward singularity) */}
            {[260, 310, 350].map((x, i) => {
              const tilt = 15 + i * 10;
              return (
                <g key={`inside-${x}`}>
                  <polygon
                    points={`${x},200 ${x - 20 - tilt},160 ${x + 20 - tilt},160`}
                    fill="var(--redshift)"
                    opacity="0.15"
                    stroke="var(--redshift)"
                    strokeWidth="1"
                  />
                  <line x1={x} y1={200} x2={x - 20 - tilt} y2={160} stroke="var(--redshift)" strokeWidth="1.5" />
                  <line x1={x} y1={200} x2={x + 20 - tilt} y2={160} stroke="var(--redshift)" strokeWidth="1.5" />
                  <circle cx={x} cy={200} r="3" fill="var(--redshift)" />
                </g>
              );
            })}

            {/* Labels */}
            <text x="100" y="240" textAnchor="middle" fill="var(--space-blue)" fontSize="9">
              Light cones upright
            </text>
            <text x="100" y="252" textAnchor="middle" fill="var(--space-blue)" fontSize="9">
              (can escape)
            </text>
            <text x="310" y="240" textAnchor="middle" fill="var(--redshift)" fontSize="9">
              Light cones tilted
            </text>
            <text x="310" y="252" textAnchor="middle" fill="var(--redshift)" fontSize="9">
              (all paths lead inward)
            </text>

            {/* Singularity indicator */}
            <text x="390" y="290" textAnchor="end" fill="var(--text-tertiary)" fontSize="9" fontStyle="italic">
              singularity &rarr;
            </text>
          </svg>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-lg bg-bg-secondary p-3 text-center">
              <div className="mx-auto h-2 w-2 rounded-full bg-space-blue" />
              <p className="mt-1 font-sans text-xs text-text-tertiary">Outside: future includes escape</p>
            </div>
            <div className="rounded-lg bg-bg-secondary p-3 text-center">
              <div className="mx-auto h-2 w-2 rounded-full bg-redshift" />
              <p className="mt-1 font-sans text-xs text-text-tertiary">Inside: all futures point inward</p>
            </div>
          </div>
        </div>

        <blockquote className="pull-quote mt-8">
          Space and time swap roles. Moving forward in time means moving toward the center.
          The singularity isn&rsquo;t a place &mdash; it&rsquo;s a moment in your future you cannot avoid.
        </blockquote>
      </div>
    </SectionWrapper>
  );
}
