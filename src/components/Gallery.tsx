const CARDS = [
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
    title: "Transformer Architecture",
    desc: "Self-attention: how tokens learn to look at each other.",
    category: "Machine Learning",
    gradient: "from-[#ede9fe] to-[#ddd6fe]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {[0, 1, 2, 3].map((row) =>
          [0, 1, 2].map((col) => (
            <circle
              key={`${row}-${col}`}
              cx={40 + col * 40}
              cy={20 + row * 28}
              r="6"
              fill={`rgba(124,58,237,${0.25 + ((row + col) % 3) * 0.15})`}
            />
          ))
        )}
        <path
          d="M40 20 Q80 48 120 20 M40 48 Q80 76 120 48 M80 20 Q60 76 40 104 M80 48 Q100 76 120 104"
          stroke="rgba(124,58,237,0.3)"
          strokeWidth="1.5"
          fill="none"
        />
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
        <text x="40" y="89" textAnchor="middle" fontSize="10" fill="rgba(16,185,129,0.9)" fontFamily="system-ui">⚡</text>
        <text x="40" y="110" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Haiku</text>
        {/* Sonnet node */}
        <circle cx="80" cy="55" r="18" fill="rgba(59,130,246,0.12)" stroke="rgba(59,130,246,0.5)" strokeWidth="1.5" />
        <text x="80" y="59" textAnchor="middle" fontSize="12" fill="rgba(59,130,246,0.9)" fontFamily="system-ui">🧠</text>
        <text x="80" y="82" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Sonnet</text>
        {/* Opus node */}
        <circle cx="120" cy="30" r="22" fill="rgba(139,92,246,0.12)" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
        <text x="120" y="35" textAnchor="middle" fontSize="14" fill="rgba(139,92,246,0.9)" fontFamily="system-ui">✨</text>
        <text x="120" y="60" textAnchor="middle" fontSize="7" fill="rgba(74,74,74,0.7)" fontFamily="system-ui">Opus</text>
        {/* Connection lines */}
        <line x1="52" y1="78" x2="65" y2="65" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
        <line x1="95" y1="48" x2="103" y2="42" stroke="rgba(148,163,184,0.3)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    title: "Spotify Recommendations",
    desc: "Collaborative filtering: connecting listeners through taste graphs.",
    category: "Algorithms",
    gradient: "from-[#064e3b] to-[#065f46]",
    darkText: true,
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Edges */}
        <line
          x1="80"
          y1="55"
          x2="40"
          y2="30"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="55"
          x2="120"
          y2="25"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="55"
          x2="35"
          y2="80"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="55"
          x2="125"
          y2="85"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="80"
          y1="55"
          x2="80"
          y2="100"
          stroke="rgba(52,211,153,0.3)"
          strokeWidth="1.5"
        />
        <line
          x1="40"
          y1="30"
          x2="120"
          y2="25"
          stroke="rgba(52,211,153,0.15)"
          strokeWidth="1"
        />
        <line
          x1="35"
          y1="80"
          x2="80"
          y2="100"
          stroke="rgba(52,211,153,0.15)"
          strokeWidth="1"
        />
        {/* Outer nodes */}
        {[
          [40, 30],
          [120, 25],
          [35, 80],
          [125, 85],
          [80, 100],
        ].map(([x, y], i) => (
          <circle
            key={i}
            cx={x}
            cy={y}
            r="8"
            fill="rgba(52,211,153,0.2)"
            stroke="rgba(52,211,153,0.5)"
            strokeWidth="1"
          />
        ))}
        {/* Center node */}
        <circle
          cx="80"
          cy="55"
          r="12"
          fill="rgba(52,211,153,0.4)"
          stroke="rgba(52,211,153,0.8)"
          strokeWidth="1.5"
        />
        <text
          x="80"
          y="58"
          textAnchor="middle"
          fontSize="7"
          fill="rgba(255,255,255,0.9)"
          fontWeight="bold"
          fontFamily="system-ui"
        >
          YOU
        </text>
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
          {CARDS.map((card) => {
            const Wrapper = card.url ? "a" : "div";
            const linkProps = card.url
              ? { href: card.url, target: "_blank", rel: "noopener noreferrer" }
              : {};
            return (
              <Wrapper
                key={card.title}
                {...linkProps}
                className={`group overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg ${card.url ? "cursor-pointer" : "cursor-default"}`}
              >
                <div
                  className={`flex h-40 items-center justify-center bg-gradient-to-br p-6 ${card.gradient}`}
                >
                  <div className="h-full w-full">{card.svg}</div>
                </div>
                <div className="p-5">
                  <span
                    className={`inline-block rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
                      card.darkText
                        ? "bg-white/20 text-white/80"
                        : "bg-surface text-text-muted"
                    }`}
                    style={
                      card.darkText
                        ? { background: "rgba(0,0,0,0.08)" }
                        : undefined
                    }
                  >
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
  );
}
