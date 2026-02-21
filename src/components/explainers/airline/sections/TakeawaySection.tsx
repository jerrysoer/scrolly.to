"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function TakeawaySection() {
  const takeaways = [
    "Airlines make more from selling miles to banks than from flying passengers",
    "Your unredeemed miles are an interest-free loan to the airline",
    "Every loyalty program change is designed to sell more credit cards",
  ];

  return (
    <SectionWrapper id="takeaway" layout="centered">
      <div className="mb-2 font-mono text-xs uppercase tracking-widest text-airline-blue">
        07
      </div>
      <h2 className="font-serif text-3xl font-bold sm:text-4xl">
        You're Not a Frequent Flyer
      </h2>
      <p className="mt-4 leading-relaxed text-text-secondary">
        You're a revenue source for a financial product that happens to have
        airplanes. The loyalty program isn't a perk of flying — flying is a
        perk of the loyalty program.
      </p>

      {/* Editorial Illustration */}
      <figure className="my-12">
        <svg
          viewBox="0 0 400 200"
          className="mx-auto w-full max-w-md text-text-primary"
          role="img"
          aria-labelledby="transformation-title"
        >
          <title id="transformation-title">
            Transformation from Frequent Flyer to Revenue Source
          </title>

          {/* Left Side - Crossed Out Person */}
          <g>
            {/* Person Icon */}
            <circle cx="60" cy="60" r="20" fill="none" stroke="currentColor" strokeWidth="2" />
            <path
              d="M 40 120 Q 60 90 80 120"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            />
            <line x1="50" y1="140" x2="50" y2="170" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="140" x2="70" y2="170" stroke="currentColor" strokeWidth="2" />
            <line x1="50" y1="100" x2="30" y2="130" stroke="currentColor" strokeWidth="2" />
            <line x1="70" y1="100" x2="90" y2="130" stroke="currentColor" strokeWidth="2" />

            {/* X Cross Out */}
            <line
              x1="30"
              y1="40"
              x2="90"
              y2="180"
              stroke="var(--danger-red)"
              strokeWidth="3"
            />
            <line
              x1="90"
              y1="40"
              x2="30"
              y2="180"
              stroke="var(--danger-red)"
              strokeWidth="3"
            />
          </g>

          {/* Label */}
          <text
            x="60"
            y="195"
            textAnchor="middle"
            className="fill-current text-xs font-sans"
            style={{ textDecoration: "line-through" }}
          >
            Frequent Flyer
          </text>

          {/* Arrow */}
          <g>
            <line
              x1="130"
              y1="100"
              x2="190"
              y2="100"
              stroke="currentColor"
              strokeWidth="2"
            />
            <polygon
              points="190,100 180,95 180,105"
              fill="currentColor"
            />
          </g>

          {/* Right Side - Dollar Sign */}
          <g>
            <circle cx="300" cy="100" r="50" fill="none" stroke="var(--revenue-green)" strokeWidth="3" />
            <text
              x="300"
              y="120"
              textAnchor="middle"
              className="fill-revenue-green font-serif text-5xl font-bold"
            >
              $
            </text>
          </g>

          {/* Label */}
          <text
            x="300"
            y="195"
            textAnchor="middle"
            className="fill-current text-xs font-sans font-semibold"
          >
            Revenue Source
          </text>
        </svg>
        <figcaption className="sr-only">
          Illustration showing the shift from viewing customers as frequent
          flyers to revenue sources
        </figcaption>
      </figure>

      {/* Key Takeaways */}
      <div className="mt-12 space-y-4">
        {takeaways.map((takeaway, i) => (
          <div
            key={i}
            className="card-glow rounded-xl border border-border bg-bg-card p-5"
          >
            <div className="flex items-start gap-4">
              <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-bg-secondary font-mono text-xs font-semibold text-airline-blue">
                0{i + 1}
              </div>
              <p className="flex-1 pt-1 leading-relaxed text-text-primary">
                {takeaway}
              </p>
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
