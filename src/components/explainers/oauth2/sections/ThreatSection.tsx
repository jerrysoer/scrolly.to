"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import RiskGauge from "./RiskGauge";
import { AlertTriangle, Lock, Fingerprint, ShieldCheck } from "lucide-react";

interface ThreatCard {
  id: string;
  icon: React.ElementType;
  iconColor: string;
  title: string;
  whatHappens: string;
  howPrevented: string;
  defenseDetails: string[];
}

const threats: ThreatCard[] = [
  {
    id: "token-theft",
    icon: AlertTriangle,
    iconColor: "#FFB84D",
    title: "Token Theft",
    whatHappens:
      "An attacker steals an access token from network traffic or storage.",
    howPrevented:
      "Short-lived tokens limit damage window. HTTPS required. Token binding and rotation.",
    defenseDetails: [
      "Tokens expire in minutes, not days",
      "TLS encrypts all traffic",
      "Refresh rotation detects reuse",
    ],
  },
  {
    id: "code-interception",
    icon: Lock,
    iconColor: "#F87171",
    title: "Code Interception",
    whatHappens:
      "An attacker intercepts the authorization code during the redirect.",
    howPrevented:
      "PKCE binds the code to the original client. The code is useless without the verifier.",
    defenseDetails: [
      "code_verifier is never sent over the wire",
      "SHA-256 challenge is one-way",
      "Code is single-use with short TTL",
    ],
  },
  {
    id: "csrf-attack",
    icon: Fingerprint,
    iconColor: "#9B7FD4",
    title: "CSRF Attack",
    whatHappens:
      "An attacker tricks a user into authorizing the attacker's account.",
    howPrevented:
      "The state parameter acts as a CSRF token. Client validates state before exchanging code.",
    defenseDetails: [
      "Random state generated per request",
      "Server rejects mismatched state",
      "Prevents session fixation attacks",
    ],
  },
];

export default function ThreatSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [visibleCards, setVisibleCards] = useState<Set<number>>(new Set());

  const setCardRef = useCallback(
    (index: number) => (el: HTMLDivElement | null) => {
      cardRefs.current[index] = el;
    },
    []
  );

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    cardRefs.current.forEach((el, index) => {
      if (!el) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => new Set([...prev, index]));
            observer.unobserve(el);
          }
        },
        { threshold: 0.3 }
      );

      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const protectionProgress = visibleCards.size / threats.length;
  const gaugeColor =
    visibleCards.size === threats.length
      ? "#66BB6A"
      : visibleCards.size >= 2
      ? "#FFB84D"
      : "#F87171";
  const gaugeLabel =
    visibleCards.size === threats.length ? "Protected" : "Analyzing";

  return (
    <SectionWrapper id="threats" layout="full-bleed">
      {/* Full-bleed dark container */}
      <div
        ref={sectionRef}
        className="relative"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          background: "linear-gradient(160deg, #0a0a12, #151520, #0d0d18)",
        }}
      >
        {/* Film grain overlay */}
        <div
          className="absolute inset-0 pointer-events-none mix-blend-overlay"
          style={{
            opacity: 0.035,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)'/%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />

        <div className="relative z-10 max-w-5xl mx-auto px-4 py-24 sm:px-6 sm:py-32">
          {/* Section heading */}
          <div className="text-center mb-16">
            <h2
              className="text-4xl sm:text-5xl font-heading font-bold mb-4"
              style={{ color: "rgba(255, 255, 255, 0.95)" }}
            >
              Threats OAuth Prevents
            </h2>
            <p
              className="text-lg max-w-2xl mx-auto"
              style={{ color: "rgba(255, 255, 255, 0.55)" }}
            >
              OAuth 2.0 was designed to defend against specific, well-understood
              attack vectors. Here are the three most critical.
            </p>
          </div>

          {/* Threat cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {threats.map((threat, index) => {
              const Icon = threat.icon;
              const isVisible = visibleCards.has(index);

              return (
                <div
                  key={threat.id}
                  ref={setCardRef(index)}
                  className="relative rounded-xl overflow-hidden"
                  style={{
                    background:
                      "linear-gradient(145deg, #141622, #1a1c2e)",
                    border: "1px solid rgba(255, 255, 255, 0.06)",
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible
                      ? "translateY(0) scale(1)"
                      : "translateY(30px) scale(0.95)",
                    transition: `opacity 0.6s ease-out ${index * 0.15}s, transform 0.6s ease-out ${index * 0.15}s`,
                  }}
                >
                  {/* Threat name badge */}
                  <div
                    className="flex items-center gap-2 px-4 py-3"
                    style={{
                      background: "rgba(248, 113, 113, 0.08)",
                      borderBottom: "1px solid rgba(248, 113, 113, 0.15)",
                    }}
                  >
                    <Icon
                      className="w-5 h-5 flex-shrink-0"
                      style={{ color: threat.iconColor }}
                    />
                    <span
                      className="text-sm font-bold uppercase tracking-wider"
                      style={{ color: threat.iconColor }}
                    >
                      {threat.title}
                    </span>
                  </div>

                  <div className="p-5 space-y-5">
                    {/* What happens */}
                    <div>
                      <p
                        className="text-xs font-semibold uppercase tracking-wider mb-2"
                        style={{ color: "rgba(255, 255, 255, 0.35)" }}
                      >
                        The Attack
                      </p>
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: "rgba(255, 255, 255, 0.75)" }}
                      >
                        {threat.whatHappens}
                      </p>
                    </div>

                    {/* Mini attack/defense SVG */}
                    <div className="flex justify-center">
                      <svg
                        width="140"
                        height="60"
                        viewBox="0 0 140 60"
                        aria-label={`${threat.title} attack deflected by defense`}
                        role="img"
                      >
                        <line
                          x1="10"
                          y1="30"
                          x2="65"
                          y2="30"
                          stroke="#F87171"
                          strokeWidth="2"
                          strokeDasharray="4 3"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 0.4s ease-out ${0.3 + index * 0.15}s`,
                          }}
                        />
                        <circle
                          cx="10"
                          cy="30"
                          r="4"
                          fill="#F87171"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 0.4s ease-out ${0.3 + index * 0.15}s`,
                          }}
                        />
                        <polygon
                          points="60,26 68,30 60,34"
                          fill="#F87171"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 0.4s ease-out ${0.4 + index * 0.15}s`,
                          }}
                        />
                        <path
                          d="M 75 10 A 20 20 0 0 1 75 50"
                          fill="none"
                          stroke="#66BB6A"
                          strokeWidth="3"
                          strokeLinecap="round"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 0.5s ease-out ${0.5 + index * 0.15}s`,
                          }}
                        />
                        <line
                          x1="80"
                          y1="25"
                          x2="130"
                          y2="10"
                          stroke="#66BB6A"
                          strokeWidth="1.5"
                          strokeDasharray="3 3"
                          style={{
                            opacity: isVisible ? 0.6 : 0,
                            transition: `opacity 0.5s ease-out ${0.6 + index * 0.15}s`,
                          }}
                        />
                        <text
                          x="85"
                          y="34"
                          fontSize="14"
                          fill="#66BB6A"
                          style={{
                            opacity: isVisible ? 1 : 0,
                            transition: `opacity 0.5s ease-out ${0.5 + index * 0.15}s`,
                          }}
                        >
                          &#x1F6E1;
                        </text>
                      </svg>
                    </div>

                    {/* Defense section */}
                    <div
                      className="rounded-lg p-4"
                      style={{
                        background: "rgba(102, 187, 106, 0.06)",
                        border: "1px solid rgba(102, 187, 106, 0.15)",
                      }}
                    >
                      <div className="flex items-center gap-2 mb-3">
                        <ShieldCheck
                          className="w-4 h-4 flex-shrink-0"
                          style={{ color: "#66BB6A" }}
                        />
                        <span
                          className="text-xs font-bold uppercase tracking-wider"
                          style={{ color: "#66BB6A" }}
                        >
                          Defense
                        </span>
                      </div>
                      <p
                        className="text-sm leading-relaxed mb-3"
                        style={{ color: "rgba(255, 255, 255, 0.7)" }}
                      >
                        {threat.howPrevented}
                      </p>
                      <ul className="space-y-1.5">
                        {threat.defenseDetails.map((detail, i) => (
                          <li
                            key={i}
                            className="flex items-start gap-2 text-xs"
                            style={{ color: "rgba(255, 255, 255, 0.5)" }}
                          >
                            <span
                              className="mt-1 w-1.5 h-1.5 rounded-full flex-shrink-0"
                              style={{ background: "#66BB6A" }}
                            />
                            {detail}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Risk Gauge */}
          <div className="flex flex-col items-center">
            <RiskGauge
              progress={protectionProgress}
              label={gaugeLabel}
              color={gaugeColor}
            />
            <p
              className="mt-4 text-sm text-center max-w-md"
              style={{
                color:
                  visibleCards.size === threats.length
                    ? "rgba(102, 187, 106, 0.8)"
                    : "rgba(255, 255, 255, 0.4)",
                transition: "color 0.5s ease",
              }}
            >
              {visibleCards.size === threats.length
                ? "All three attack vectors are accounted for. OAuth 2.0 + PKCE provides defense in depth."
                : `${visibleCards.size} of ${threats.length} threats analyzed. Scroll to reveal more.`}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
