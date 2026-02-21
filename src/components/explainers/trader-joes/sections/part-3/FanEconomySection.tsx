"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { fanMilestones, bellCodes } from "@/components/explainers/trader-joes/data/part-3";

export default function FanEconomySection() {
  return (
    <>
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        .float-gentle {
          animation: float 6s ease-in-out infinite;
        }
        .metric-card {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .metric-card:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 8px 24px rgba(184, 134, 11, 0.15);
        }
        .bell-item {
          transition: all 0.2s ease;
        }
        .bell-item:hover {
          transform: translateX(4px);
        }
        .milestone-card {
          transition: all 0.3s ease;
        }
        .milestone-card:hover {
          transform: scale(1.03);
          box-shadow: 0 12px 32px rgba(184, 134, 11, 0.2);
        }
        .price-tag {
          transition: all 0.3s ease;
        }
        .price-tag:hover {
          transform: rotate(-2deg) scale(1.05);
        }
      `}</style>

      <div className="section-divider-numbered">
        <span className="number">05</span>
      </div>

      <SectionWrapper id="fan-economy" layout="centered-card">
        <div className="flex flex-col gap-12">
          {/* Hero area */}
          <div className="flex flex-col items-center text-center gap-4">
            {/* Eyebrow */}
            <div
              className="px-3 py-1.5 border-2 rounded-full"
              style={{
                borderColor: "rgba(184, 134, 11, 0.3)",
                borderStyle: "dashed",
                fontFamily: "var(--font-dm-mono), monospace",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                color: "var(--accent-gold)",
              }}
            >
              Organic Reach
            </div>

            {/* Headline */}
            <h2
              className="text-4xl sm:text-5xl font-bold leading-tight max-w-3xl"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                color: "var(--text-primary)",
              }}
            >
              The Fan Economy
            </h2>

            {/* $0 Price Tag */}
            <div className="relative my-4 float-gentle">
              <div
                className="price-tag relative px-8 py-5 rounded-2xl shadow-lg cursor-default"
                style={{
                  background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                  border: "3px solid var(--accent-gold)",
                  transform: "rotate(-2deg)",
                }}
              >
                {/* Corner dots */}
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    top: "8px",
                    left: "8px",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    top: "8px",
                    right: "8px",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    bottom: "8px",
                    left: "8px",
                  }}
                />
                <div
                  className="absolute w-2 h-2 rounded-full"
                  style={{
                    backgroundColor: "var(--accent-gold)",
                    bottom: "8px",
                    right: "8px",
                  }}
                />

                {/* Content */}
                <div className="flex flex-col items-center gap-1">
                  <p
                    className="text-xs uppercase tracking-wider"
                    style={{
                      fontFamily: "var(--font-dm-mono), monospace",
                      color: "var(--accent-navy)",
                    }}
                  >
                    Annual Ad Spend
                  </p>
                  <p
                    className="text-7xl sm:text-8xl font-bold leading-none"
                    style={{
                      fontFamily: "var(--font-source-serif), Georgia, serif",
                      background: "linear-gradient(135deg, #B8860B 0%, #DAA520 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    $0
                  </p>
                </div>
              </div>
            </div>

            {/* Subheadline */}
            <p
              className="text-base sm:text-lg max-w-2xl leading-relaxed"
              style={{
                fontFamily: "var(--font-source-serif), Georgia, serif",
                color: "var(--text-secondary)",
              }}
            >
              While competitors pour billions into marketing, Trader Joe's spends nothing. Their customers do it for them.
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { value: "1.5M", label: "Followers (@TraderJoesList)" },
              { value: "1.2B", label: "TikTok impressions" },
              { value: "86/100", label: "ACSI score (#1 grocer)" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="metric-card px-5 py-6 rounded-xl cursor-pointer"
                style={{
                  background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                  border: "1px solid rgba(184, 134, 11, 0.2)",
                }}
              >
                <p
                  className="text-4xl sm:text-5xl font-bold mb-1.5"
                  style={{
                    fontFamily: "var(--font-source-serif), Georgia, serif",
                    background: "linear-gradient(135deg, var(--accent-navy) 0%, var(--accent-red) 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs uppercase tracking-wider"
                  style={{
                    fontFamily: "var(--font-dm-mono), monospace",
                    color: "var(--text-tertiary)",
                  }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          {/* Photo */}
          <div className="w-full overflow-hidden rounded-2xl shadow-lg" style={{ transition: "transform 0.3s ease" }}>
            <img
              src="/generated/fan-economy-haul.png"
              alt="Watercolor illustration of a Trader Joe's shopping haul spread on a table with Hawaiian shirt fabric in the background"
              className="w-full h-auto"
              style={{ transition: "transform 0.5s ease" }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              loading="lazy"
            />
          </div>

          {/* Ship's Bell Codes */}
          <div
            className="mx-auto max-w-2xl px-6 py-6 rounded-xl"
            style={{
              background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
              border: "2px solid rgba(184, 134, 11, 0.3)",
            }}
          >
            <p
              className="text-center mb-4 text-xs uppercase tracking-widest font-bold"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              Ship's Bell Codes
            </p>
            <div className="flex flex-col gap-3">
              {Object.entries(bellCodes).map(([key, meaning], index) => {
                const bellCount = key === "one" ? 1 : key === "two" ? 2 : 3;
                const isHighlighted = bellCount === 3;

                return (
                  <div
                    key={key}
                    className="bell-item flex items-center gap-4 px-4 py-2.5 rounded-lg cursor-pointer"
                    style={{
                      border: isHighlighted
                        ? "2px solid var(--accent-gold)"
                        : "1px dashed rgba(184, 134, 11, 0.3)",
                      background: isHighlighted
                        ? "rgba(184, 134, 11, 0.1)"
                        : "transparent",
                    }}
                  >
                    <span
                      className="text-base font-bold"
                      style={{
                        fontFamily: "var(--font-dm-mono), monospace",
                        color: isHighlighted ? "var(--accent-gold)" : "var(--accent-navy)",
                        minWidth: "3rem",
                      }}
                    >
                      {Array.from({ length: bellCount }, () => "●").join(" ")}
                    </span>
                    <span
                      className="text-sm"
                      style={{
                        fontFamily: "var(--font-source-serif), Georgia, serif",
                        color: "var(--text-secondary)",
                      }}
                    >
                      {meaning}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Fan Milestones - Alternating Timeline */}
          <div className="relative max-w-4xl mx-auto w-full">
            <p
              className="text-center mb-8 text-xs uppercase tracking-widest font-bold"
              style={{
                fontFamily: "var(--font-dm-mono), monospace",
                color: "var(--accent-gold)",
              }}
            >
              Fan Milestones
            </p>

            {/* Center line */}
            <div
              className="absolute left-1/2 top-12 bottom-0 w-px -translate-x-1/2 hidden md:block"
              style={{
                background: "linear-gradient(180deg, var(--accent-gold) 0%, transparent 100%)",
                opacity: 0.3,
              }}
            />

            <div className="flex flex-col gap-8">
              {fanMilestones.map((milestone, index) => {
                const isLeft = index % 2 === 0;

                return (
                  <div
                    key={milestone.year}
                    className={`flex items-center gap-6 ${
                      isLeft ? "md:flex-row" : "md:flex-row-reverse"
                    } flex-col md:gap-8`}
                  >
                    {/* Content card */}
                    <div
                      className={`milestone-card flex-1 px-5 py-4 rounded-xl cursor-pointer ${
                        isLeft ? "md:text-right" : "md:text-left"
                      } text-left`}
                      style={{
                        background: "linear-gradient(135deg, #faf8f4 0%, #f5f1e8 100%)",
                        border: "1px solid rgba(184, 134, 11, 0.2)",
                        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.05)",
                      }}
                    >
                      <p
                        className="text-xs font-bold uppercase tracking-wider mb-1.5"
                        style={{
                          fontFamily: "var(--font-dm-mono), monospace",
                          color: "var(--accent-gold)",
                        }}
                      >
                        {milestone.year}
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{
                          fontFamily: "var(--font-source-serif), Georgia, serif",
                          color: "var(--text-secondary)",
                        }}
                      >
                        {milestone.event}
                      </p>
                    </div>

                    {/* Center dot */}
                    <div
                      className="w-3.5 h-3.5 rounded-full border-3 flex-shrink-0 hidden md:block"
                      style={{
                        backgroundColor: "#faf8f4",
                        borderColor: "var(--accent-gold)",
                        borderWidth: "3px",
                        borderStyle: "solid",
                        boxShadow: "0 0 0 4px rgba(184, 134, 11, 0.2)",
                        transition: "all 0.3s ease",
                      }}
                    />

                    {/* Spacer for alignment */}
                    <div className="flex-1 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  );
}
