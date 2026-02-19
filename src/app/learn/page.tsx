import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ExplainerCard, { ExplainerCardData } from "@/components/ExplainerCard";

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

const CARDS: ExplainerCardData[] = [
  {
    title: "How Butterflies Transform",
    desc: "From caterpillar to chrysalis to flight — the four stages of metamorphosis explained.",
    category: "Biology",
    gradient: "from-[#fff7ed] to-[#fed7aa]",
    url: "https://jerrysoer.github.io/butterfly-metamorphosis-explainer",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <ellipse cx="80" cy="60" rx="3" ry="20" fill="rgba(180,83,9,0.5)" />
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
        <circle cx="60" cy="45" r="5" fill="rgba(180,83,9,0.15)" />
        <circle cx="100" cy="45" r="5" fill="rgba(180,83,9,0.15)" />
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
        <polygon
          points="65,40 85,60 65,80"
          fill="rgba(139,92,246,0.1)"
          stroke="rgba(139,92,246,0.4)"
          strokeWidth="1.5"
        />
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
    title: "Seed2.0 LLM",
    desc: "How ByteDance's frontier model hits GPT-5 benchmarks at 1/10th the cost.",
    category: "AI Models",
    gradient: "from-[#dbeafe] to-[#bfdbfe]",
    url: "https://jerrysoer.github.io/seed2-explainer/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <ellipse cx="80" cy="95" rx="30" ry="8" fill="rgba(30,64,175,0.08)" />
        <path
          d="M80 90 L80 50"
          stroke="rgba(30,64,175,0.4)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <path
          d="M80 65 Q95 50 105 55 Q95 65 80 65"
          fill="rgba(34,197,94,0.3)"
          stroke="rgba(34,197,94,0.5)"
          strokeWidth="1"
        />
        <path
          d="M80 75 Q65 60 55 65 Q65 75 80 75"
          fill="rgba(34,197,94,0.25)"
          stroke="rgba(34,197,94,0.45)"
          strokeWidth="1"
        />
        {[
          { x: 30, h: 28, o: 0.15 },
          { x: 50, h: 35, o: 0.2 },
          { x: 70, h: 38, o: 0.25 },
          { x: 90, h: 40, o: 0.3 },
          { x: 110, h: 32, o: 0.2 },
        ].map((bar, i) => (
          <rect
            key={i}
            x={bar.x}
            y={8}
            width="12"
            height={bar.h}
            rx="3"
            fill={`rgba(30,64,175,${bar.o})`}
          />
        ))}
        <text x="80" y="108" textAnchor="middle" fontSize="8" fill="rgba(30,64,175,0.5)" fontFamily="system-ui">
          1/10th cost
        </text>
      </svg>
    ),
  },
  {
    title: "Claude Model Lineup",
    desc: "Haiku, Sonnet, and Opus — benchmarks, pricing, and the right model for you.",
    category: "AI Models",
    gradient: "from-[#fff5e6] to-[#fde8d0]",
    url: "https://jerrysoer.github.io/claude-models-explainer-v2/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <circle cx="40" cy="85" r="14" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
        <text x="40" y="89" textAnchor="middle" fontSize="10" fill="rgba(16,185,129,0.9)" fontFamily="system-ui">&#x26A1;</text>
        <text x="40" y="110" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Haiku</text>
        <circle cx="80" cy="55" r="18" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
        <text x="80" y="59" textAnchor="middle" fontSize="12" fill="rgba(59,130,246,0.9)" fontFamily="system-ui">&#x1F9E0;</text>
        <text x="80" y="82" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Sonnet</text>
        <circle cx="120" cy="30" r="22" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
        <text x="120" y="35" textAnchor="middle" fontSize="14" fill="rgba(139,92,246,0.9)" fontFamily="system-ui">&#x2728;</text>
        <text x="120" y="60" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Opus</text>
        <line x1="52" y1="78" x2="65" y2="65" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
        <line x1="95" y1="48" x2="103" y2="42" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
      </svg>
    ),
  },
  // --- Placeholder cards with unique SVGs and teaser text ---
  {
    title: "Coming Soon",
    desc: "Engineering deep-dive dropping soon.",
    category: "Engineering",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Lightbulb */}
        <circle cx="80" cy="48" r="18" stroke="rgba(0,0,0,0.12)" strokeWidth="2" fill="rgba(250,204,21,0.08)" />
        <path d="M72 62 L72 72 Q72 78 80 78 Q88 78 88 72 L88 62" stroke="rgba(0,0,0,0.12)" strokeWidth="2" fill="none" />
        <line x1="74" y1="68" x2="86" y2="68" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
        <line x1="74" y1="73" x2="86" y2="73" stroke="rgba(0,0,0,0.1)" strokeWidth="1.5" />
        {/* Filament */}
        <path d="M76 52 Q80 40 84 52" stroke="rgba(250,204,21,0.3)" strokeWidth="1.5" fill="none" />
        {/* Rays */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const r1 = 24, r2 = 30;
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={angle}
              x1={80 + r1 * Math.cos(rad)}
              y1={48 + r1 * Math.sin(rad)}
              x2={80 + r2 * Math.cos(rad)}
              y2={48 + r2 * Math.sin(rad)}
              stroke="rgba(250,204,21,0.2)"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    ),
  },
  {
    title: "Coming Soon",
    desc: "Algorithm breakdown in the works.",
    category: "Algorithms",
    gradient: "from-[#f0f1f3] to-[#e4e6ea]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Gears */}
        <circle cx="65" cy="55" r="16" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="5 3" fill="none" />
        <circle cx="65" cy="55" r="5" fill="rgba(0,0,0,0.08)" />
        <circle cx="95" cy="65" r="12" stroke="rgba(0,0,0,0.12)" strokeWidth="2" strokeDasharray="4 3" fill="none" />
        <circle cx="95" cy="65" r="4" fill="rgba(0,0,0,0.08)" />
        {/* Gear teeth (simplified) */}
        {[0, 60, 120, 180, 240, 300].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`g1-${angle}`}
              x1={65 + 14 * Math.cos(rad)}
              y1={55 + 14 * Math.sin(rad)}
              x2={65 + 20 * Math.cos(rad)}
              y2={55 + 20 * Math.sin(rad)}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="3"
              strokeLinecap="round"
            />
          );
        })}
        {[0, 72, 144, 216, 288].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          return (
            <line
              key={`g2-${angle}`}
              x1={95 + 10 * Math.cos(rad)}
              y1={65 + 10 * Math.sin(rad)}
              x2={95 + 15 * Math.cos(rad)}
              y2={65 + 15 * Math.sin(rad)}
              stroke="rgba(0,0,0,0.1)"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          );
        })}
      </svg>
    ),
  },
];

const LIVE_COUNT = CARDS.filter((c) => c.url).length;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Learn — scrolly.to",
  description:
    "Interactive explainers that break down complex topics step by step.",
  url: "https://scrolly.to/learn",
  mainEntity: {
    "@type": "ItemList",
    numberOfItems: LIVE_COUNT,
    itemListElement: CARDS.filter((c) => c.url).map((card, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: card.title,
      description: card.desc,
      url: card.url,
    })),
  },
};

export default function LearnPage() {
  return (
    <>
      <Nav />
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
              {CARDS.map((card, i) => (
                <ExplainerCard
                  key={`${card.title}-${i}`}
                  card={card}
                  index={i}
                  animate
                />
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section className="px-6 pb-20">
          <div className="mx-auto max-w-xl text-center">
            <p className="text-lg text-text-muted">
              Have a topic in mind?{" "}
              <a
                href="/#waitlist"
                className="font-medium text-green underline decoration-green/30 underline-offset-4 transition-colors hover:text-text hover:decoration-text/30"
              >
                Get on the list
              </a>{" "}
              or{" "}
              <a
                href="https://github.com/jerrysoer/scrolly.to"
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-green underline decoration-green/30 underline-offset-4 transition-colors hover:text-text hover:decoration-text/30"
              >
                open an issue on GitHub
              </a>
              .
            </p>
          </div>
        </section>

        {/* JSON-LD */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </main>
      <Footer />
    </>
  );
}
