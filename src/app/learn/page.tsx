import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import LearnGrid from "@/components/LearnGrid";
import SuggestionBox from "@/components/SuggestionBox";
import { ExplainerCardData } from "@/components/ExplainerCard";

export const metadata: Metadata = {
  title: "Learn — scrolly.to",
  description:
    "Interactive explainers that break down complex topics step by step. Browse published scrolly explainers.",
  alternates: {
    canonical: "https://scrolly.to/learn",
  },
  openGraph: {
    title: "Learn — scrolly.to",
    description:
      "Interactive explainers that break down complex topics step by step.",
    url: "https://scrolly.to/learn",
    images: [
      {
        url: "https://scrolly.to/og-learn.png",
        width: 1200,
        height: 630,
        alt: "scrolly.to Learn — Interactive Explainers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Learn — scrolly.to",
    description:
      "Interactive explainers that break down complex topics step by step.",
    images: ["https://scrolly.to/og-learn.png"],
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
    title: "Going Back to the Moon",
    desc: "Artemis, Gateway, and the tech that makes a lunar return possible 50 years later.",
    category: "Space",
    gradient: "from-[#1e293b] to-[#334155]",
    darkText: true,
    url: "https://jerrysoer.github.io/going-back-to-the-moon/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {[[18,12],[42,28],[130,18],[145,70],[20,90],[95,8],[60,105]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1.2" fill="rgba(255,255,255,0.45)" />
        ))}
        <circle cx="100" cy="55" r="30" fill="rgba(226,232,240,0.85)" />
        <circle cx="90" cy="45" r="6" fill="rgba(148,163,184,0.25)" />
        <circle cx="108" cy="62" r="4" fill="rgba(148,163,184,0.2)" />
        <circle cx="95" cy="70" r="3" fill="rgba(148,163,184,0.18)" />
        <circle cx="112" cy="48" r="2.5" fill="rgba(148,163,184,0.15)" />
        <rect x="38" y="48" width="8" height="22" rx="4" fill="rgba(255,255,255,0.85)" />
        <polygon points="42,44 38,52 46,52" fill="rgba(255,255,255,0.9)" />
        <ellipse cx="42" cy="73" rx="3" ry="5" fill="rgba(251,146,60,0.6)" />
        <ellipse cx="42" cy="72" rx="1.5" ry="3" fill="rgba(253,224,71,0.7)" />
        <path d="M46 60 Q58 40 70 45" stroke="rgba(255,255,255,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      </svg>
    ),
  },
  {
    title: "How Money Actually Works",
    desc: "From barter to banks to bytes — the surprisingly weird system behind every dollar.",
    category: "Economics",
    gradient: "from-[#ecfdf5] to-[#d1fae5]",
    url: "https://jerrysoer.github.io/how-money-works/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect x="25" y="30" width="50" height="30" rx="4" fill="rgba(22,163,74,0.12)" stroke="rgba(22,163,74,0.4)" strokeWidth="1.5" />
        <text x="50" y="50" textAnchor="middle" fontSize="14" fill="rgba(22,163,74,0.5)" fontFamily="system-ui" fontWeight="bold">$</text>
        {[0,1,2].map((i)=>(
          <g key={i}>
            <ellipse cx="115" cy={70 - i * 10} rx="16" ry="5" fill={`rgba(234,179,8,${0.2 + i * 0.1})`} stroke="rgba(202,138,4,0.4)" strokeWidth="1" />
          </g>
        ))}
        <path d="M78 45 Q90 35 105 50" stroke="rgba(22,163,74,0.3)" strokeWidth="1.5" fill="none" markerEnd="url(#arrowG)" />
        <path d="M105 75 Q90 90 78 80" stroke="rgba(202,138,4,0.3)" strokeWidth="1.5" fill="none" />
        <rect x="60" y="75" width="28" height="20" rx="2" fill="rgba(22,163,74,0.08)" stroke="rgba(22,163,74,0.25)" strokeWidth="1" />
        <polygon points="60,75 74,65 88,75" fill="rgba(22,163,74,0.1)" stroke="rgba(22,163,74,0.25)" strokeWidth="1" />
        <line x1="67" y1="78" x2="67" y2="92" stroke="rgba(22,163,74,0.2)" strokeWidth="2" />
        <line x1="74" y1="78" x2="74" y2="92" stroke="rgba(22,163,74,0.2)" strokeWidth="2" />
        <line x1="81" y1="78" x2="81" y2="92" stroke="rgba(22,163,74,0.2)" strokeWidth="2" />
      </svg>
    ),
  },
  {
    title: "How Dinosaurs Went Extinct",
    desc: "Asteroid impact, nuclear winter, and the chain reaction that ended an era.",
    category: "Science",
    gradient: "from-[#fef3c7] to-[#fde68a]",
    url: "https://jerrysoer.github.io/dinosaur-extinction/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <path d="M0 95 Q40 88 80 92 Q120 96 160 90 L160 120 L0 120 Z" fill="rgba(120,113,108,0.15)" />
        <path d="M25 85 Q28 60 35 55 Q38 53 40 55 L40 60 Q42 58 44 60 L44 65 Q50 62 55 65 L55 75 Q58 72 60 75 L58 85" fill="rgba(120,113,108,0.3)" stroke="rgba(120,113,108,0.4)" strokeWidth="1" />
        <path d="M35 55 Q30 40 28 35 Q27 32 30 32 Q33 32 34 35 Q35 38 35 55" fill="rgba(120,113,108,0.3)" stroke="rgba(120,113,108,0.4)" strokeWidth="1" />
        <circle cx="120" cy="25" r="10" fill="rgba(239,68,68,0.4)" />
        <circle cx="120" cy="25" r="6" fill="rgba(239,68,68,0.6)" />
        <path d="M130 15 Q140 8 148 5" stroke="rgba(251,146,60,0.4)" strokeWidth="3" strokeLinecap="round" />
        <path d="M128 18 Q138 12 145 10" stroke="rgba(251,146,60,0.25)" strokeWidth="2" strokeLinecap="round" />
        <ellipse cx="120" cy="25" rx="18" ry="14" fill="rgba(251,146,60,0.1)" />
        <circle cx="85" cy="80" r="8" fill="rgba(168,162,158,0.12)" />
        <circle cx="100" cy="75" r="10" fill="rgba(168,162,158,0.1)" />
        <circle cx="110" cy="82" r="7" fill="rgba(168,162,158,0.08)" />
      </svg>
    ),
  },
  {
    title: "Dividing Fractions",
    desc: "Every 5th grader is taught to 'flip and multiply.' Almost none are told why. Here's the visual proof.",
    category: "Math",
    gradient: "from-[#eff6ff] to-[#fef3c7]",
    url: "https://jerrysoer.github.io/dividing-fractions/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <line x1="55" y1="60" x2="105" y2="60" stroke="rgba(59,130,246,0.5)" strokeWidth="3" strokeLinecap="round" />
        <text x="80" y="48" textAnchor="middle" fontSize="28" fill="rgba(59,130,246,0.45)" fontFamily="system-ui" fontWeight="bold">3</text>
        <text x="80" y="85" textAnchor="middle" fontSize="28" fill="rgba(245,158,11,0.5)" fontFamily="system-ui" fontWeight="bold">4</text>
        <text x="130" y="68" textAnchor="middle" fontSize="32" fill="rgba(59,130,246,0.2)" fontFamily="system-ui" fontWeight="bold">÷</text>
        <circle cx="30" cy="35" r="12" fill="rgba(249,115,22,0.15)" stroke="rgba(249,115,22,0.3)" strokeWidth="1" />
        <path d="M30 35 L30 23 A12 12 0 0 1 40.4 41 Z" fill="rgba(245,158,11,0.25)" />
        <circle cx="30" cy="90" r="10" fill="rgba(249,115,22,0.1)" stroke="rgba(249,115,22,0.25)" strokeWidth="1" />
        <path d="M30 90 L30 80 A10 10 0 0 1 38.7 95 Z" fill="rgba(245,158,11,0.2)" />
      </svg>
    ),
  },
  {
    title: "Fall Into a Black Hole",
    desc: "If you fell into a black hole, you'd be fine. The problem is everyone else's perspective.",
    category: "Space",
    gradient: "from-[#020617] to-[#1e293b]",
    darkText: true,
    url: "https://jerrysoer.github.io/fall-into-black-hole/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {[[12,15],[140,10],[25,100],[135,95],[70,8],[150,55]].map(([x,y],i)=>(
          <circle key={i} cx={x} cy={y} r="1" fill="rgba(255,255,255,0.4)" />
        ))}
        <circle cx="80" cy="60" r="25" fill="rgba(0,0,0,0.8)" />
        <ellipse cx="80" cy="60" rx="40" ry="10" fill="none" stroke="rgba(96,165,250,0.3)" strokeWidth="1.5" />
        <ellipse cx="80" cy="60" rx="35" ry="8" fill="none" stroke="rgba(251,146,60,0.2)" strokeWidth="1" />
        <circle cx="80" cy="60" r="28" fill="none" stroke="rgba(96,165,250,0.15)" strokeWidth="8" />
        <circle cx="80" cy="60" r="36" fill="none" stroke="rgba(96,165,250,0.06)" strokeWidth="4" />
      </svg>
    ),
  },
  {
    title: "Roller Coaster Physics",
    desc: "At the top of a loop you're upside down at 60 mph with nothing holding you in but physics.",
    category: "Physics",
    gradient: "from-[#fefce8] to-[#fef08a]",
    url: "https://jerrysoer.github.io/roller-coaster-physics/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <path d="M10 95 L10 25 Q10 15 20 15 Q30 15 30 25 L30 55 Q30 75 45 75 Q55 75 60 60 Q65 45 75 45 Q85 45 85 55 L85 65 Q85 80 100 80 Q110 80 115 70 Q120 60 130 60 Q140 60 140 68 L140 95" stroke="rgba(59,130,246,0.35)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="15" cy="20" r="4" fill="rgba(245,158,11,0.5)" stroke="rgba(245,158,11,0.7)" strokeWidth="1" />
        <path d="M60 55 Q67 32 75 32 Q83 32 85 55" stroke="rgba(239,68,68,0.3)" strokeWidth="1.5" fill="none" strokeDasharray="3 2" />
        <text x="20" y="110" fontSize="7" fill="rgba(59,130,246,0.3)" fontFamily="system-ui">PE</text>
        <text x="75" y="110" fontSize="7" fill="rgba(245,158,11,0.3)" fontFamily="system-ui">KE</text>
        <rect x="18" y="103" width="12" height="4" rx="1" fill="rgba(59,130,246,0.15)" />
        <rect x="73" y="103" width="12" height="4" rx="1" fill="rgba(245,158,11,0.15)" />
      </svg>
    ),
  },
  {
    title: "How WiFi Works",
    desc: "Your router is a radio station. Your phone is a decoder. Here's how cat videos become invisible waves.",
    category: "Technology",
    gradient: "from-[#eff6ff] to-[#dbeafe]",
    url: "https://jerrysoer.github.io/how-wifi-works/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <rect x="70" y="65" width="20" height="25" rx="3" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1.5" />
        <rect x="76" y="58" width="8" height="8" rx="1" fill="rgba(59,130,246,0.2)" />
        <circle cx="80" cy="75" r="2" fill="rgba(59,130,246,0.35)" />
        {[22, 30, 38].map((r, i) => (
          <path key={i} d={`M${80-r} ${55-r*0.3} A${r} ${r} 0 0 1 ${80+r} ${55-r*0.3}`} stroke={`rgba(59,130,246,${0.35 - i * 0.1})`} strokeWidth="2" fill="none" strokeLinecap="round" />
        ))}
        <rect x="20" y="80" width="16" height="24" rx="2" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        <rect x="124" y="78" width="22" height="16" rx="2" fill="rgba(59,130,246,0.08)" stroke="rgba(59,130,246,0.2)" strokeWidth="1" />
        <path d="M36 90 Q55 70 70 75" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
        <path d="M90 75 Q105 70 124 86" stroke="rgba(59,130,246,0.15)" strokeWidth="1" strokeDasharray="3 3" fill="none" />
      </svg>
    ),
  },
  // --- Placeholder (clickable → waitlist) ---
  {
    title: "What would you like to see?",
    desc: "Suggest a topic and we'll turn it into an interactive explainer.",
    category: "Your idea",
    gradient: "from-[#f1f0ee] to-[#e8e6e2]",
    url: "#suggest",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        <circle cx="80" cy="56" r="22" stroke="rgba(0,0,0,0.1)" strokeWidth="2" strokeDasharray="6 4" fill="none" />
        <text x="80" y="64" textAnchor="middle" fontSize="24" fill="rgba(0,0,0,0.12)" fontFamily="system-ui">?</text>
      </svg>
    ),
  },
];

const LIVE_COUNT = CARDS.filter((c) => c.url && c.category !== "Your idea").length;

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
    itemListElement: CARDS.filter((c) => c.url && c.category !== "Your idea").map((card, i) => ({
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

            <LearnGrid cards={CARDS} />
          </div>
        </section>

        {/* Suggestion Box */}
        <SuggestionBox />

        {/* Scrolly analytics — learn page views */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://scrolly.to/pixel?s=hosted&e=learn-page-view&v=1"
          width={1}
          height={1}
          style={{ position: "absolute", bottom: 0, left: 0, opacity: 0, pointerEvents: "none" }}
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
