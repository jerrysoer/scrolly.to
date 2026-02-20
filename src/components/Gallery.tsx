import ExplainerCard, { ExplainerCardData } from "./ExplainerCard";

const CARDS: ExplainerCardData[] = [
  {
    title: "Seed2.0 LLM",
    desc: "How ByteDance's frontier model hits GPT-5 benchmarks at 1/10th the cost.",
    category: "AI Models",
    gradient: "from-[#dbeafe] to-[#bfdbfe]",
    url: "https://jerrysoer.github.io/seed2-explainer/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Seed/sprout icon */}
        <ellipse cx="80" cy="95" rx="30" ry="8" fill="rgba(30,64,175,0.08)" />
        <path
          d="M80 90 L80 50"
          stroke="rgba(30,64,175,0.4)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Leaves */}
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
        {/* Benchmark bars rising from top */}
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
        {/* Cost label */}
        <text x="80" y="108" textAnchor="middle" fontSize="8" fill="rgba(30,64,175,0.5)" fontFamily="system-ui">
          1/10th cost
        </text>
      </svg>
    ),
  },
  {
    title: "Git Worktrees",
    desc: "Multiple branches, zero stashing — how worktrees let you work in parallel.",
    category: "Developer Tools",
    gradient: "from-[#ede9fe] to-[#ddd6fe]",
    url: "https://jerrysoer.github.io/git-worktrees-explainer/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Main trunk */}
        <line x1="80" y1="15" x2="80" y2="105" stroke="rgba(124,58,237,0.4)" strokeWidth="2.5" strokeLinecap="round" />
        {/* Branch left */}
        <path d="M80 40 Q60 40 45 55 L45 90" stroke="rgba(124,58,237,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Branch right */}
        <path d="M80 55 Q100 55 115 65 L115 90" stroke="rgba(124,58,237,0.3)" strokeWidth="2" strokeLinecap="round" fill="none" />
        {/* Commit dots on main */}
        {[25, 40, 55, 70, 85, 100].map((y, i) => (
          <circle key={i} cx={80} cy={y} r="4" fill={`rgba(124,58,237,${0.3 + i * 0.08})`} />
        ))}
        {/* Commit dots on left branch */}
        {[60, 75, 90].map((y, i) => (
          <circle key={`l${i}`} cx={45} cy={y} r="3.5" fill={`rgba(168,85,247,${0.3 + i * 0.1})`} />
        ))}
        {/* Commit dots on right branch */}
        {[70, 82, 90].map((y, i) => (
          <circle key={`r${i}`} cx={115} cy={y} r="3.5" fill={`rgba(168,85,247,${0.3 + i * 0.1})`} />
        ))}
        {/* Folder icons */}
        <rect x="32" y="94" width="26" height="16" rx="3" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="45" y="106" textAnchor="middle" fontSize="7" fill="rgba(124,58,237,0.7)" fontFamily="system-ui">feat</text>
        <rect x="67" y="94" width="26" height="16" rx="3" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="80" y="106" textAnchor="middle" fontSize="7" fill="rgba(124,58,237,0.7)" fontFamily="system-ui">main</text>
        <rect x="102" y="94" width="26" height="16" rx="3" fill="rgba(124,58,237,0.15)" stroke="rgba(124,58,237,0.3)" strokeWidth="1" />
        <text x="115" y="106" textAnchor="middle" fontSize="7" fill="rgba(124,58,237,0.7)" fontFamily="system-ui">fix</text>
      </svg>
    ),
  },
  {
    title: "SaaS Revenue Metrics",
    desc: "MRR, churn, and expansion revenue visualized quarter by quarter.",
    category: "Business",
    gradient: "from-[#dcfce7] to-[#bbf7d0]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {[
          { h: 35, label: "Q1" },
          { h: 50, label: "Q2" },
          { h: 60, label: "Q3" },
          { h: 75, label: "Q4" },
          { h: 90, label: "YR2" },
        ].map((bar, i) => (
          <g key={bar.label}>
            <rect
              x={16 + i * 28}
              y={105 - bar.h}
              width="20"
              height={bar.h}
              rx="4"
              fill={`rgba(22,163,74,${0.25 + i * 0.1})`}
            />
            <text
              x={26 + i * 28}
              y="116"
              textAnchor="middle"
              fontSize="8"
              fill="rgba(22,163,74,0.7)"
              fontFamily="system-ui"
            >
              {bar.label}
            </text>
          </g>
        ))}
      </svg>
    ),
  },
  {
    title: "Falcon 9 Launch",
    desc: "Stages, separation, and landing — the rocket science of reuse.",
    category: "Engineering",
    gradient: "from-[#1e293b] to-[#0f172a]",
    darkText: true,
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Stars */}
        {[
          [20, 15],
          [45, 30],
          [130, 20],
          [110, 50],
          [25, 80],
          [140, 90],
          [70, 10],
          [95, 85],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="1.5"
            fill="rgba(255,255,255,0.4)"
          />
        ))}
        {/* Rocket body */}
        <rect
          x="72"
          y="20"
          width="16"
          height="55"
          rx="8"
          fill="rgba(255,255,255,0.85)"
        />
        <polygon points="80,12 72,28 88,28" fill="rgba(255,255,255,0.9)" />
        {/* Fins */}
        <polygon points="72,65 64,78 72,75" fill="rgba(255,255,255,0.5)" />
        <polygon points="88,65 96,78 88,75" fill="rgba(255,255,255,0.5)" />
        {/* Flame */}
        <ellipse
          cx="80"
          cy="82"
          rx="6"
          ry="12"
          fill="rgba(251,146,60,0.7)"
          style={{ animation: "rocket-flame 0.8s ease-in-out infinite" }}
        />
        <ellipse
          cx="80"
          cy="80"
          rx="3"
          ry="8"
          fill="rgba(253,224,71,0.8)"
          style={{ animation: "rocket-flame 0.6s ease-in-out infinite" }}
        />
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
        {/* Haiku node */}
        <circle cx="40" cy="85" r="14" fill="rgba(16,185,129,0.12)" stroke="rgba(16,185,129,0.5)" strokeWidth="1.5" />
        <text x="40" y="89" textAnchor="middle" fontSize="10" fill="rgba(16,185,129,0.9)" fontFamily="system-ui">&#x26A1;</text>
        <text x="40" y="110" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Haiku</text>
        {/* Sonnet node */}
        <circle cx="80" cy="55" r="18" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
        <text x="80" y="59" textAnchor="middle" fontSize="12" fill="rgba(59,130,246,0.9)" fontFamily="system-ui">&#x1F9E0;</text>
        <text x="80" y="82" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Sonnet</text>
        {/* Opus node */}
        <circle cx="120" cy="30" r="22" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
        <text x="120" y="35" textAnchor="middle" fontSize="14" fill="rgba(139,92,246,0.9)" fontFamily="system-ui">&#x2728;</text>
        <text x="120" y="60" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Opus</text>
        {/* Connection lines */}
        <line x1="52" y1="78" x2="65" y2="65" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
        <line x1="95" y1="48" x2="103" y2="42" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Airline Credit Card Money",
    desc: "How loyalty programs became worth more than the airlines themselves.",
    category: "Business",
    gradient: "from-[#fef3c7] to-[#fde68a]",
    url: "https://jerrysoer.github.io/airline-credit-card-money/",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Credit card */}
        <rect x="20" y="35" width="56" height="36" rx="5" fill="rgba(37,99,235,0.12)" stroke="rgba(37,99,235,0.3)" strokeWidth="1.2" />
        <rect x="26" y="44" width="16" height="10" rx="2" fill="rgba(37,99,235,0.2)" />
        <line x1="26" y1="60" x2="48" y2="60" stroke="rgba(37,99,235,0.15)" strokeWidth="2" />
        <line x1="26" y1="64" x2="40" y2="64" stroke="rgba(37,99,235,0.1)" strokeWidth="1.5" />
        {/* Arrow */}
        <path d="M82 53 L96 53" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" strokeDasharray="3 2" />
        <path d="M94 50 L98 53 L94 56" stroke="rgba(217,119,6,0.4)" strokeWidth="1.5" fill="none" />
        {/* Dollar sign in circle */}
        <circle cx="118" cy="53" r="18" fill="rgba(217,119,6,0.1)" stroke="rgba(217,119,6,0.3)" strokeWidth="1.2" />
        <text x="118" y="59" textAnchor="middle" fontSize="18" fill="rgba(217,119,6,0.5)" fontFamily="system-ui" fontWeight="700">$</text>
        {/* Small stat: $22B */}
        <text x="118" y="82" textAnchor="middle" fontSize="9" fill="rgba(37,99,235,0.4)" fontFamily="system-ui" fontWeight="600">$22B</text>
        {/* Airplane silhouette crossed out */}
        <path d="M30 90 L50 85 L45 90 L50 95 Z" fill="rgba(0,0,0,0.06)" />
        <line x1="28" y1="95" x2="52" y2="82" stroke="rgba(220,38,38,0.25)" strokeWidth="1.2" />
      </svg>
    ),
  },
];

export default function Gallery() {
  return (
    <section id="gallery" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-5xl">
        <h2 className="text-center font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          Example Explainers
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-center text-text-muted">
          Each of these was generated by a single AI command. Real explainers,
          real topics, real output.
        </p>

        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {CARDS.map((card) => (
            <ExplainerCard key={card.title} card={card} />
          ))}
        </div>
      </div>
    </section>
  );
}
