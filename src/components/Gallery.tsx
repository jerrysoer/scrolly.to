const CARDS = [
  {
    title: "TCP/IP Protocol Stack",
    desc: "How data travels from app to wire in four layers.",
    category: "Networking",
    gradient: "from-[#dbeafe] to-[#bfdbfe]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {["Application", "Transport", "Internet", "Link"].map((label, i) => (
          <g key={label}>
            <rect
              x="20"
              y={10 + i * 27}
              width="120"
              height="22"
              rx="6"
              fill={`rgba(30,64,175,${0.15 + i * 0.1})`}
              stroke="rgba(30,64,175,0.3)"
              strokeWidth="1"
            />
            <text
              x="80"
              y={24 + i * 27}
              textAnchor="middle"
              fontSize="10"
              fill="rgba(30,64,175,0.8)"
              fontFamily="system-ui"
            >
              {label}
            </text>
          </g>
        ))}
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
    title: "Kubernetes Cluster",
    desc: "Nodes, pods, and containers — orchestration at a glance.",
    category: "DevOps",
    gradient: "from-[#f1f5f9] to-[#e2e8f0]",
    svg: (
      <svg viewBox="0 0 160 120" fill="none" className="h-full w-full">
        {/* Node 1 */}
        <rect
          x="10"
          y="15"
          width="65"
          height="90"
          rx="8"
          fill="rgba(71,85,105,0.08)"
          stroke="rgba(71,85,105,0.25)"
          strokeWidth="1"
        />
        <text
          x="42"
          y="30"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(71,85,105,0.6)"
          fontFamily="system-ui"
        >
          Node 1
        </text>
        <rect
          x="18"
          y="38"
          width="22"
          height="16"
          rx="3"
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1"
        />
        <rect
          x="44"
          y="38"
          width="22"
          height="16"
          rx="3"
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1"
        />
        <rect
          x="18"
          y="60"
          width="22"
          height="16"
          rx="3"
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1"
        />
        {/* Node 2 */}
        <rect
          x="85"
          y="15"
          width="65"
          height="90"
          rx="8"
          fill="rgba(71,85,105,0.08)"
          stroke="rgba(71,85,105,0.25)"
          strokeWidth="1"
        />
        <text
          x="117"
          y="30"
          textAnchor="middle"
          fontSize="8"
          fill="rgba(71,85,105,0.6)"
          fontFamily="system-ui"
        >
          Node 2
        </text>
        <rect
          x="93"
          y="38"
          width="22"
          height="16"
          rx="3"
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1"
        />
        <rect
          x="119"
          y="38"
          width="22"
          height="16"
          rx="3"
          fill="rgba(59,130,246,0.2)"
          stroke="rgba(59,130,246,0.4)"
          strokeWidth="1"
        />
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
          {CARDS.map((card) => (
            <div
              key={card.title}
              className="group cursor-default overflow-hidden rounded-2xl border border-border bg-card-bg transition-all duration-200 hover:-translate-y-1 hover:shadow-lg"
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
