import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Learn — scrolly.to",
  description:
    "Interactive explainers that break down complex topics step by step. Browse published scrolly explainers.",
  openGraph: {
    title: "Learn — scrolly.to",
    description:
      "Interactive explainers that break down complex topics step by step.",
    url: "https://scrolly.to/learn",
  },
};

const CARDS = [
  {
    title: "How Butterflies Transform",
    desc: "From caterpillar to chrysalis to flight — the four stages of metamorphosis explained.",
    category: "Biology",
    gradient: "from-[#fff7ed] to-[#fed7aa]",
    url: "https://jerrysoer.github.io/butterfly-metamorphosis-explainer",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Body */}
        <ellipse cx="80" cy="60" rx="3" ry="20" fill="rgba(180,83,9,0.5)" />
        {/* Left wing */}
        <path
          d="M77 50 Q55 25 40 35 Q30 50 50 60 Q60 65 77 55"
          fill="rgba(251,146,60,0.35)"
          stroke="rgba(234,88,12,0.5)"
          strokeWidth="1.5"
        />
        <path
          d="M77 65 Q55 75 45 90 Q55 95 65 85 Q75 75 77 65"
          fill="rgba(251,191,36,0.3)"
          stroke="rgba(234,88,12,0.4)"
          strokeWidth="1"
        />
        {/* Right wing */}
        <path
          d="M83 50 Q105 25 120 35 Q130 50 110 60 Q100 65 83 55"
          fill="rgba(251,146,60,0.35)"
          stroke="rgba(234,88,12,0.5)"
          strokeWidth="1.5"
        />
        <path
          d="M83 65 Q105 75 115 90 Q105 95 95 85 Q85 75 83 65"
          fill="rgba(251,191,36,0.3)"
          stroke="rgba(234,88,12,0.4)"
          strokeWidth="1"
        />
        {/* Wing patterns */}
        <circle cx="60" cy="45" r="5" fill="rgba(180,83,9,0.15)" />
        <circle cx="100" cy="45" r="5" fill="rgba(180,83,9,0.15)" />
        {/* Antennae */}
        <path
          d="M78 42 Q72 28 68 24"
          stroke="rgba(180,83,9,0.4)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <path
          d="M82 42 Q88 28 92 24"
          stroke="rgba(180,83,9,0.4)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="68" cy="24" r="2" fill="rgba(180,83,9,0.3)" />
        <circle cx="92" cy="24" r="2" fill="rgba(180,83,9,0.3)" />
      </svg>
    ),
  },
  {
    title: "How Your Eye Sees Color",
    desc: "Cones, rods, and the spectrum — how light becomes the colors you perceive.",
    category: "Science",
    gradient: "from-[#ede9fe] to-[#e0f2fe]",
    url: "https://jerrysoer.github.io/how-eyes-see-color",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Light source */}
        <circle cx="25" cy="60" r="10" fill="rgba(250,204,21,0.3)" />
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1="35"
            y1="60"
            x2="65"
            y2={42 + i * 9}
            stroke="rgba(250,204,21,0.25)"
            strokeWidth="1"
          />
        ))}
        {/* Prism */}
        <polygon
          points="65,40 85,60 65,80"
          fill="rgba(139,92,246,0.1)"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="1.5"
        />
        {/* Spectrum rays */}
        {[
          { color: "rgba(239,68,68,0.5)", y: 42 },
          { color: "rgba(249,115,22,0.5)", y: 48 },
          { color: "rgba(234,179,8,0.5)", y: 54 },
          { color: "rgba(34,197,94,0.5)", y: 60 },
          { color: "rgba(59,130,246,0.5)", y: 66 },
          { color: "rgba(99,102,241,0.5)", y: 72 },
          { color: "rgba(168,85,247,0.5)", y: 78 },
        ].map((ray, i) => (
          <line
            key={i}
            x1="85"
            y1="60"
            x2="140"
            y2={ray.y}
            stroke={ray.color}
            strokeWidth="2"
            strokeLinecap="round"
          />
        ))}
        {/* Eye outline */}
        <path
          d="M115 95 Q125 85 135 95 Q125 105 115 95"
          fill="rgba(59,130,246,0.1)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1.5"
        />
        <circle cx="125" cy="95" r="3" fill="rgba(59,130,246,0.35)" />
        <circle cx="125" cy="95" r="1.5" fill="rgba(15,23,42,0.5)" />
      </svg>
    ),
  },
  {
    title: "Coming Soon",
    desc: "New explainer dropping soon.",
    category: "TBD",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect
          x="55"
          y="35"
          width="50"
          height="50"
          rx="12"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />
        <line
          x1="80"
          y1="50"
          x2="80"
          y2="70"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="60"
          x2="90"
          y2="60"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Coming Soon",
    desc: "New explainer dropping soon.",
    category: "Engineering",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect
          x="55"
          y="35"
          width="50"
          height="50"
          rx="12"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />
        <line
          x1="80"
          y1="50"
          x2="80"
          y2="70"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="60"
          x2="90"
          y2="60"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Coming Soon",
    desc: "New explainer dropping soon.",
    category: "Business",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect
          x="55"
          y="35"
          width="50"
          height="50"
          rx="12"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />
        <line
          x1="80"
          y1="50"
          x2="80"
          y2="70"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="60"
          x2="90"
          y2="60"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    title: "Coming Soon",
    desc: "New explainer dropping soon.",
    category: "Algorithms",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect
          x="55"
          y="35"
          width="50"
          height="50"
          rx="12"
          stroke="rgba(0,0,0,0.12)"
          strokeWidth="2"
          strokeDasharray="6 4"
          fill="none"
        />
        <line
          x1="80"
          y1="50"
          x2="80"
          y2="70"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <line
          x1="70"
          y1="60"
          x2="90"
          y2="60"
          stroke="rgba(0,0,0,0.15)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
];

export default function LearnPage() {
  return (
    <main className="min-h-screen bg-bg pt-14">
      <section className="px-6 py-20 sm:py-28">
        <div className="mx-auto max-w-5xl">
          <h1 className="text-center font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
            Learn
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-center text-text-muted">
            Interactive explainers that break down complex topics step by step.
          </p>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {CARDS.map((card, i) => {
              const Wrapper = card.url ? "a" : "div";
              const linkProps = card.url
                ? {
                    href: card.url,
                    target: "_blank" as const,
                    rel: "noopener noreferrer",
                  }
                : {};
              return (
                <Wrapper
                  key={`${card.title}-${i}`}
                  {...linkProps}
                  className={`group overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card.url ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className={`flex h-40 items-center justify-center bg-gradient-to-br p-6 ${card.gradient}`}
                  >
                    <div className="h-full w-full">{card.svg}</div>
                  </div>
                  <div className="p-5">
                    <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                      {card.category}
                    </span>
                    <h3 className="mt-2 font-condensed text-lg font-semibold uppercase text-text">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-sm text-text-muted">{card.desc}</p>
                  </div>
                </Wrapper>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
