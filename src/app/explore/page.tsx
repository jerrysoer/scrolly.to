import type { Metadata } from "next";
import { ReactNode } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SuggestionBox from "@/components/SuggestionBox";
import { getBySection } from "@/lib/explainers/registry";

export const metadata: Metadata = {
  title: "Explore — scrolly.to",
  description:
    "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
  alternates: {
    canonical: "https://scrolly.to/explore",
  },
  openGraph: {
    title: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    url: "https://scrolly.to/explore",
    images: [
      {
        url: "https://scrolly.to/og-explore.png",
        width: 1200,
        height: 630,
        alt: "scrolly.to Explore — Interactive Guides",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    images: ["https://scrolly.to/og-explore.png"],
  },
};

/* ── Card illustrations keyed by slug ── */
const CARD_ART: Record<string, { gradient: string; svg: ReactNode }> = {
  "trader-joes": {
    gradient: "from-[#faf8f4] to-[#f5edd6]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Hawaiian shirt pattern dots */}
        {[
          [25, 20], [45, 25], [65, 18], [85, 30], [105, 22], [125, 28],
          [30, 45], [50, 50], [70, 42], [90, 55], [110, 48], [130, 52],
          [20, 70], [40, 75], [60, 68], [80, 78], [100, 72], [120, 80],
          [35, 95], [55, 100], [75, 92], [95, 102], [115, 98]
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="2.5" fill={`rgba(184,134,11,${0.15 + (i % 3) * 0.08})`} />
        ))}
        {/* Shopping bag */}
        <path
          d="M55 50 L50 90 L90 90 L85 50 Z"
          fill="rgba(184,134,11,0.08)"
          stroke="rgba(184,134,11,0.4)"
          strokeWidth="1.5"
        />
        {/* Bag handles */}
        <path
          d="M60 50 Q60 40 70 40 Q80 40 80 50"
          fill="none"
          stroke="rgba(184,134,11,0.4)"
          strokeWidth="1.5"
        />
        {/* $0 price tag floating above */}
        <rect
          x="50"
          y="15"
          width="40"
          height="22"
          rx="4"
          fill="rgba(250,248,244,0.95)"
          stroke="rgba(184,134,11,0.5)"
          strokeWidth="1.5"
        />
        <text x="70" y="31" textAnchor="middle" fontSize="14" fill="rgba(184,134,11,0.8)" fontFamily="system-ui" fontWeight="700">$0</text>
        {/* "Ad Spend" label */}
        <text x="70" y="105" textAnchor="middle" fontSize="7" fill="rgba(184,134,11,0.6)" fontFamily="system-ui">Ad Spend</text>
      </svg>
    ),
  },
  "claude-code-skills-explainer": {
    gradient: "from-[#1e1b4b] to-[#312e81]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect x="30" y="25" width="100" height="70" rx="6" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.3)" strokeWidth="1.5" />
        <text x="40" y="44" fontSize="10" fontFamily="monospace" fill="rgba(167,139,250,0.6)">/skill</text>
        <line x1="40" y1="52" x2="110" y2="52" stroke="rgba(139,92,246,0.15)" strokeWidth="1" />
        <rect x="40" y="58" width="50" height="6" rx="2" fill="rgba(167,139,250,0.2)" />
        <rect x="40" y="68" width="35" height="6" rx="2" fill="rgba(139,92,246,0.15)" />
        <rect x="40" y="78" width="60" height="6" rx="2" fill="rgba(167,139,250,0.12)" />
        <circle cx="120" cy="42" r="8" fill="rgba(139,92,246,0.2)" />
        <path d="M117 42 L119.5 44.5 L123 39.5" stroke="rgba(167,139,250,0.6)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  "git-worktrees-explainer": {
    gradient: "from-[#14532d] to-[#166534]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <line x1="80" y1="20" x2="80" y2="100" stroke="rgba(74,222,128,0.25)" strokeWidth="2" />
        <line x1="80" y1="45" x2="120" y2="45" stroke="rgba(74,222,128,0.2)" strokeWidth="1.5" />
        <line x1="120" y1="45" x2="120" y2="80" stroke="rgba(74,222,128,0.2)" strokeWidth="1.5" />
        <line x1="80" y1="65" x2="45" y2="65" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" />
        <line x1="45" y1="65" x2="45" y2="90" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" />
        <circle cx="80" cy="30" r="5" fill="rgba(74,222,128,0.3)" stroke="rgba(74,222,128,0.5)" strokeWidth="1" />
        <circle cx="80" cy="55" r="5" fill="rgba(74,222,128,0.3)" stroke="rgba(74,222,128,0.5)" strokeWidth="1" />
        <circle cx="80" cy="85" r="5" fill="rgba(74,222,128,0.3)" stroke="rgba(74,222,128,0.5)" strokeWidth="1" />
        <circle cx="120" cy="60" r="4" fill="rgba(74,222,128,0.2)" stroke="rgba(74,222,128,0.4)" strokeWidth="1" />
        <circle cx="120" cy="80" r="4" fill="rgba(74,222,128,0.2)" stroke="rgba(74,222,128,0.4)" strokeWidth="1" />
        <circle cx="45" cy="78" r="4" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
        <circle cx="45" cy="90" r="4" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
      </svg>
    ),
  },
  "microgpt-explainer": {
    gradient: "from-[#1c1917] to-[#292524]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Neural network layers */}
        {[35, 55, 75, 95].map((y) => (
          <circle key={`l1-${y}`} cx="40" cy={y} r="4" fill="rgba(251,146,60,0.25)" stroke="rgba(251,146,60,0.4)" strokeWidth="1" />
        ))}
        {[40, 60, 80].map((y) => (
          <circle key={`l2-${y}`} cx="80" cy={y} r="4" fill="rgba(251,191,36,0.25)" stroke="rgba(251,191,36,0.4)" strokeWidth="1" />
        ))}
        {[50, 70].map((y) => (
          <circle key={`l3-${y}`} cx="120" cy={y} r="4" fill="rgba(253,224,71,0.25)" stroke="rgba(253,224,71,0.4)" strokeWidth="1" />
        ))}
        {/* Connections */}
        {[35, 55, 75, 95].flatMap((y1) =>
          [40, 60, 80].map((y2) => (
            <line key={`c1-${y1}-${y2}`} x1="44" y1={y1} x2="76" y2={y2} stroke="rgba(251,146,60,0.1)" strokeWidth="0.5" />
          ))
        )}
        {[40, 60, 80].flatMap((y1) =>
          [50, 70].map((y2) => (
            <line key={`c2-${y1}-${y2}`} x1="84" y1={y1} x2="116" y2={y2} stroke="rgba(251,191,36,0.1)" strokeWidth="0.5" />
          ))
        )}
        <text x="30" y="110" fontSize="8" fontFamily="monospace" fill="rgba(253,224,71,0.35)">GPT</text>
      </svg>
    ),
  },
  "oauth2-explainer": {
    gradient: "from-[#172554] to-[#1e3a5f]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Lock */}
        <rect x="62" y="55" width="36" height="28" rx="4" fill="rgba(59,130,246,0.15)" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" />
        <path d="M70 55 V45 A10 10 0 0 1 90 45 V55" stroke="rgba(96,165,250,0.4)" strokeWidth="1.5" fill="none" />
        <circle cx="80" cy="67" r="3" fill="rgba(96,165,250,0.5)" />
        <line x1="80" y1="70" x2="80" y2="76" stroke="rgba(96,165,250,0.5)" strokeWidth="1.5" />
        {/* Flow arrows */}
        <path d="M30 40 L55 40" stroke="rgba(59,130,246,0.25)" strokeWidth="1" markerEnd="url(#arrow)" />
        <path d="M105 40 L130 40" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
        <path d="M130 40 L130 90 L105 90" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
        <path d="M55 90 L30 90" stroke="rgba(59,130,246,0.25)" strokeWidth="1" />
        {/* User icon */}
        <circle cx="22" cy="38" r="5" fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
        {/* Server icon */}
        <rect x="132" y="34" width="12" height="12" rx="2" fill="rgba(96,165,250,0.15)" stroke="rgba(96,165,250,0.3)" strokeWidth="1" />
        <text x="60" y="105" fontSize="8" fontFamily="monospace" fill="rgba(96,165,250,0.35)">OAuth 2.0</text>
      </svg>
    ),
  },
  "openclaw-explainer": {
    gradient: "from-[#0c0a09] to-[#1c1917]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Gateway hub */}
        <circle cx="80" cy="60" r="16" fill="rgba(234,179,8,0.1)" stroke="rgba(234,179,8,0.3)" strokeWidth="1.5" />
        <circle cx="80" cy="60" r="6" fill="rgba(234,179,8,0.2)" />
        {/* Spokes to channels */}
        {[
          { x: 30, y: 35 }, { x: 130, y: 35 },
          { x: 30, y: 85 }, { x: 130, y: 85 },
          { x: 80, y: 15 },
        ].map((p, i) => (
          <g key={i}>
            <line x1="80" y1="60" x2={p.x} y2={p.y} stroke="rgba(234,179,8,0.15)" strokeWidth="1" />
            <rect x={p.x - 8} y={p.y - 6} width="16" height="12" rx="3" fill="rgba(234,179,8,0.12)" stroke="rgba(234,179,8,0.25)" strokeWidth="1" />
          </g>
        ))}
        <text x="58" y="108" fontSize="8" fontFamily="monospace" fill="rgba(234,179,8,0.35)">OpenClaw</text>
      </svg>
    ),
  },
  "precision-recall-explainer": {
    gradient: "from-[#3b0764] to-[#581c87]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Confusion matrix */}
        <rect x="40" y="25" width="35" height="30" rx="3" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
        <rect x="85" y="25" width="35" height="30" rx="3" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
        <rect x="40" y="65" width="35" height="30" rx="3" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.25)" strokeWidth="1" />
        <rect x="85" y="65" width="35" height="30" rx="3" fill="rgba(34,197,94,0.12)" stroke="rgba(34,197,94,0.25)" strokeWidth="1" />
        <text x="49" y="44" fontSize="9" fontFamily="monospace" fill="rgba(34,197,94,0.5)">TP</text>
        <text x="95" y="44" fontSize="9" fontFamily="monospace" fill="rgba(239,68,68,0.4)">FP</text>
        <text x="49" y="84" fontSize="9" fontFamily="monospace" fill="rgba(239,68,68,0.4)">FN</text>
        <text x="95" y="84" fontSize="9" fontFamily="monospace" fill="rgba(34,197,94,0.4)">TN</text>
        {/* Balance beam */}
        <line x1="35" y1="108" x2="125" y2="108" stroke="rgba(192,132,252,0.2)" strokeWidth="1" />
        <polygon points="80,100 75,108 85,108" fill="rgba(192,132,252,0.25)" />
      </svg>
    ),
  },
  "seed2-explainer": {
    gradient: "from-[#052e16] to-[#14532d]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Seedling */}
        <line x1="80" y1="90" x2="80" y2="55" stroke="rgba(34,197,94,0.4)" strokeWidth="2" />
        <path d="M80 55 Q65 40 55 45 Q50 55 65 60 Q72 58 80 55" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
        <path d="M80 65 Q95 52 105 58 Q108 68 95 70 Q88 68 80 65" fill="rgba(74,222,128,0.15)" stroke="rgba(74,222,128,0.3)" strokeWidth="1" />
        {/* Ground */}
        <ellipse cx="80" cy="95" rx="30" ry="4" fill="rgba(34,197,94,0.1)" />
        {/* Benchmark bars */}
        <rect x="20" y="20" width="22" height="5" rx="2" fill="rgba(74,222,128,0.25)" />
        <rect x="20" y="28" width="18" height="5" rx="2" fill="rgba(34,197,94,0.2)" />
        <rect x="20" y="36" width="25" height="5" rx="2" fill="rgba(74,222,128,0.15)" />
        <text x="112" y="28" fontSize="8" fontFamily="monospace" fill="rgba(74,222,128,0.35)">Seed2.0</text>
      </svg>
    ),
  },
  "stripe-payments-explainer": {
    gradient: "from-[#2e1065] to-[#4c1d95]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Credit card */}
        <rect x="35" y="30" width="90" height="56" rx="6" fill="rgba(139,92,246,0.1)" stroke="rgba(167,139,250,0.35)" strokeWidth="1.5" />
        <rect x="35" y="48" width="90" height="10" fill="rgba(139,92,246,0.1)" />
        <rect x="45" y="65" width="30" height="6" rx="2" fill="rgba(167,139,250,0.15)" />
        <rect x="85" y="65" width="18" height="6" rx="2" fill="rgba(167,139,250,0.15)" />
        {/* Payment flow arrow */}
        <path d="M80 92 L80 105" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M75 100 L80 107 L85 100" stroke="rgba(167,139,250,0.3)" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        {/* Stripe S hint */}
        <path d="M130 20 Q136 20 136 26 Q136 32 130 32 Q124 32 124 38 Q124 44 130 44" stroke="rgba(167,139,250,0.25)" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  "tiktok-algorithm-explainer": {
    gradient: "from-[#0f172a] to-[#1e293b]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Phone outline */}
        <rect x="55" y="10" width="50" height="90" rx="8" fill="rgba(236,72,153,0.06)" stroke="rgba(236,72,153,0.25)" strokeWidth="1.5" />
        <rect x="60" y="20" width="40" height="65" rx="2" fill="rgba(236,72,153,0.08)" />
        {/* Play button */}
        <polygon points="74,48 74,60 86,54" fill="rgba(236,72,153,0.3)" />
        {/* Hearts floating */}
        <path d="M115 35 C115 30 120 28 122 32 C124 28 129 30 129 35 C129 42 122 46 122 46 C122 46 115 42 115 35" fill="rgba(236,72,153,0.2)" />
        <path d="M25 55 C25 51 29 49 31 52 C33 49 37 51 37 55 C37 60 31 63 31 63 C31 63 25 60 25 55" fill="rgba(6,182,212,0.2)" />
        {/* Signal lines */}
        <line x1="30" y1="30" x2="50" y2="40" stroke="rgba(6,182,212,0.15)" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="110" y1="70" x2="130" y2="80" stroke="rgba(236,72,153,0.15)" strokeWidth="1" strokeDasharray="2 2" />
      </svg>
    ),
  },
  "tortoise-hare-explainer": {
    gradient: "from-[#422006] to-[#713f12]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Race track */}
        <line x1="20" y1="85" x2="140" y2="85" stroke="rgba(234,179,8,0.2)" strokeWidth="1" />
        <line x1="20" y1="65" x2="140" y2="65" stroke="rgba(234,179,8,0.2)" strokeWidth="1" />
        {/* Tortoise (slow, ahead) */}
        <ellipse cx="110" cy="82" rx="10" ry="6" fill="rgba(34,197,94,0.25)" stroke="rgba(34,197,94,0.4)" strokeWidth="1" />
        <circle cx="118" cy="78" r="3" fill="rgba(34,197,94,0.2)" stroke="rgba(34,197,94,0.35)" strokeWidth="1" />
        {/* Hare (fast, behind) */}
        <ellipse cx="50" cy="62" rx="8" ry="5" fill="rgba(239,68,68,0.2)" stroke="rgba(239,68,68,0.35)" strokeWidth="1" />
        <circle cx="56" cy="58" r="3" fill="rgba(239,68,68,0.15)" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
        <line x1="58" y1="55" x2="62" y2="48" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
        <line x1="58" y1="55" x2="64" y2="50" stroke="rgba(239,68,68,0.3)" strokeWidth="1" />
        {/* Finish flag */}
        <line x1="140" y1="55" x2="140" y2="90" stroke="rgba(234,179,8,0.3)" strokeWidth="1.5" />
        <rect x="140" y="55" width="10" height="8" fill="rgba(234,179,8,0.2)" stroke="rgba(234,179,8,0.35)" strokeWidth="1" />
        {/* Compound curve */}
        <path d="M20 45 Q60 44 80 40 Q110 30 140 15" stroke="rgba(34,197,94,0.2)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
      </svg>
    ),
  },
};

export default function ExplorePage() {
  const explainers = getBySection("explore");
  const categories = [
    "All",
    ...Array.from(new Set(explainers.map((e) => e.category))),
  ];

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Explore — scrolly.to",
    description:
      "Interactive guides for teams and practitioners. Deep-dive explainers on engineering, business, and ML topics.",
    url: "https://scrolly.to/explore",
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: explainers.length,
      itemListElement: explainers.map((e, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: e.title,
        description: e.description,
        url: `https://scrolly.to/explore/${e.slug}`,
      })),
    },
  };

  return (
    <>
      <Nav />
      <main className="min-h-screen bg-bg pt-14">
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-5xl">
            <h1 className="text-center font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
              Explore
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-center text-text-muted">
              Interactive guides for teams and practitioners. Deep-dive
              explainers on engineering, business, and ML topics.
            </p>

            {explainers.length > 0 ? (
              <>
                <p className="mt-2 text-center text-sm text-text-muted">
                  {explainers.length} guide{explainers.length !== 1 ? "s" : ""}{" "}
                  and counting
                </p>

                {categories.length > 2 && (
                  <div className="mt-8 flex flex-wrap justify-center gap-2">
                    {categories.map((cat) => (
                      <span
                        key={cat}
                        className="rounded-full border border-border bg-card-bg px-3.5 py-1 text-xs font-medium text-text-muted"
                      >
                        {cat}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {explainers.map((e, i) => {
                    const art = CARD_ART[e.slug];
                    return (
                      <a
                        key={e.slug}
                        href={`/explore/${e.slug}`}
                        className="group overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
                        style={{
                          opacity: 0,
                          animation: `fade-in-up 0.5s ease forwards`,
                          animationDelay: `${i * 0.08}s`,
                        }}
                      >
                        <div
                          className={`flex h-40 items-center justify-center bg-gradient-to-br p-6 ${
                            art?.gradient ?? "from-[#1e293b] to-[#334155]"
                          }`}
                        >
                          {art?.svg ?? (
                            <span className="text-4xl font-bold text-white/20">
                              {e.title.charAt(0)}
                            </span>
                          )}
                        </div>
                        <div className="p-5">
                          <span className="inline-block rounded-full bg-surface px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-text-muted">
                            {e.category}
                          </span>
                          <h3 className="mt-2 font-condensed text-lg font-semibold uppercase text-text">
                            {e.title}
                          </h3>
                          <p className="mt-1 text-sm text-text-muted">
                            {e.description}
                          </p>
                        </div>
                      </a>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="mt-16 text-center">
                <p className="text-lg text-text-muted">
                  Professional explainers coming soon.
                </p>
                <p className="mt-2 text-sm text-text-muted">
                  Suggest a topic below and we&apos;ll build it.
                </p>
              </div>
            )}
          </div>
        </section>

        <SuggestionBox />

        {/* Scrolly analytics — explore page views */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://scrolly.to/pixel?s=hosted&e=explore-page-view&v=1"
          width={1}
          height={1}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            opacity: 0,
            pointerEvents: "none",
          }}
          alt=""
          loading="lazy"
          decoding="async"
        />

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
