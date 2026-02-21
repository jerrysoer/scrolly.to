"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ChevronDown, User, KeyRound, AppWindow, AlertTriangle } from "lucide-react";
import { useState, useEffect, useRef } from "react";

function ExpandableDeepDive({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden bg-bg-card">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-bg-secondary transition-colors"
        style={{ fontFamily: "var(--font-body)" }}
      >
        <span className="font-semibold text-text-primary">{label}</span>
        <ChevronDown
          className={`w-5 h-5 text-accent-primary transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        className="accordion-content"
        style={{
          display: "grid",
          gridTemplateRows: isOpen ? "1fr" : "0fr",
          transition: "grid-template-rows 0.3s ease-in-out",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div
            className="px-6 pb-4 text-text-secondary leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ProblemSection() {
  const diagramRef = useRef<HTMLDivElement>(null);
  const [cascadeStage, setCascadeStage] = useState(0);

  useEffect(() => {
    const el = diagramRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCascadeStage(1);
          setTimeout(() => setCascadeStage(2), 800);
          setTimeout(() => setCascadeStage(3), 1200);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="problem" layout="centered">
      <div className="flex flex-col gap-10 max-w-3xl mx-auto">
        {/* Section heading */}
        <h2
          className="text-4xl sm:text-5xl font-bold text-text-primary tracking-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          The Password Problem
        </h2>

        {/* Analogy opener — pull-quote style */}
        <blockquote className="border-l-4 border-accent-danger pl-6 py-2">
          <p
            className="text-xl sm:text-2xl text-text-primary leading-relaxed italic"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Imagine handing your house keys to every delivery driver, dog
            walker, and plumber who needs access to your home.
          </p>
        </blockquote>

        <p
          className="text-base text-text-secondary leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          That&rsquo;s what sharing your password with apps used to look like.
          In the early days of the web, third-party apps asked for your username
          and password directly. They stored these credentials on their
          servers—often in plain text—and had full access to your account.
        </p>

        <p
          className="text-base text-text-secondary leading-relaxed"
          style={{ fontFamily: "var(--font-body)" }}
        >
          The problem wasn&rsquo;t just the security risk. You couldn&rsquo;t
          revoke access to one app without changing your password everywhere.
          There was no way to limit what an app could do, no audit trail of who
          accessed what, and no expiration on that access. It was all-or-nothing
          trust in every single service.
        </p>
      </div>

      {/* Full-bleed dark stat break */}
      <div
        className="relative overflow-hidden py-20 sm:py-28 my-12"
        style={{
          width: "100vw",
          marginLeft: "calc(-50vw + 50%)",
          background: "linear-gradient(160deg, #0a0a12, #151520, #0d0d18)",
        }}
      >
        {/* Background photo at low opacity */}
        <img
          src="/explainers/oauth2/generated/problem-breach.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/30 to-transparent" />

        {/* Film grain */}
        <div
          className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundSize: "200px 200px",
          }}
        />

        <div className="relative z-10 text-center px-4">
          {/* Giant stat number */}
          <div
            className="font-bold leading-none mb-6"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "clamp(6rem, 18vw, 14rem)",
              background: "linear-gradient(135deg, #ff6b6b, #ee5a24, #ff8a5c)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 0 60px rgba(238, 90, 36, 0.2))",
            }}
          >
            81%
          </div>
          <p
            className="text-white/55 text-base sm:text-lg max-w-md mx-auto mb-3 leading-relaxed"
            style={{ fontFamily: "var(--font-body)" }}
          >
            of data breaches involve stolen or weak credentials
          </p>
          <p
            className="text-white/25 text-xs tracking-wider"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            — Verizon Data Breach Investigations Report
          </p>
        </div>
      </div>

      {/* Cascade Diagram — dark editorial card */}
      <div className="max-w-3xl mx-auto">
        <div className="w-full max-w-xl mx-auto my-4" ref={diagramRef}>
          <div
            className="relative overflow-hidden rounded-2xl p-8 sm:p-10 shadow-2xl"
            style={{
              background: "linear-gradient(145deg, #141622, #1c1e30, #141622)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}
          >
            {/* Decorative glow */}
            <div className="absolute -top-24 -right-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(232, 93, 93, 0.08)' }} />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 rounded-full blur-3xl pointer-events-none" style={{ background: 'rgba(74, 144, 217, 0.06)' }} />

            {/* Title */}
            <div className="text-center mb-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.15em]" style={{ fontFamily: "var(--font-mono)", color: 'rgba(232, 93, 93, 0.8)' }}>
                <AlertTriangle className="w-3.5 h-3.5" />
                The password-sharing model
              </span>
            </div>

            <div className="flex items-center justify-between gap-4 sm:gap-8">
              {/* User column */}
              <div className="flex flex-col items-center gap-3 flex-shrink-0">
                <div
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full flex items-center justify-center"
                  style={{
                    background: 'rgba(74, 144, 217, 0.12)',
                    border: '2px solid rgba(74, 144, 217, 0.4)',
                    boxShadow: '0 0 24px rgba(74, 144, 217, 0.1)',
                  }}
                >
                  <User className="w-8 h-8 sm:w-10 sm:h-10" style={{ color: '#5B9FE8' }} />
                </div>
                <span className="text-sm font-semibold" style={{ color: 'rgba(255,255,255,0.85)' }}>You</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ color: 'rgba(255,255,255,0.35)', background: 'rgba(255,255,255,0.05)' }}>password123</span>
              </div>

              {/* Arrows + Keys column */}
              <div className="flex-1 flex flex-col gap-5 sm:gap-6 py-2">
                {[
                  { label: "Email App", delay: 0, breached: cascadeStage >= 2 },
                  { label: "Calendar", delay: 0.2, breached: cascadeStage >= 3 },
                  { label: "Social Tool", delay: 0.4, breached: cascadeStage >= 3 },
                ].map((app) => (
                  <div
                    key={app.label}
                    className="flex items-center gap-2 sm:gap-3"
                    style={{
                      opacity: cascadeStage >= 1 ? 1 : 0,
                      transform: cascadeStage >= 1 ? "translateX(0)" : "translateX(-20px)",
                      transition: `opacity 0.5s ease-out ${app.delay}s, transform 0.5s ease-out ${app.delay}s`,
                    }}
                  >
                    <div className="flex-1" style={{ borderTop: '1px dashed rgba(232, 93, 93, 0.3)' }} />
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300"
                      style={{
                        background: app.breached ? '#E85D5D' : 'rgba(255,255,255,0.08)',
                        boxShadow: app.breached ? '0 0 20px rgba(232, 93, 93, 0.4)' : 'none',
                      }}
                    >
                      <KeyRound className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1" style={{ borderTop: '1px dashed rgba(232, 93, 93, 0.3)' }} />
                  </div>
                ))}
              </div>

              {/* App column */}
              <div className="flex flex-col gap-3 sm:gap-4 flex-shrink-0">
                {[
                  { label: "Email App", color: "#FF8A5C", shaking: cascadeStage >= 3, delay: 0 },
                  { label: "Calendar", color: "#9B7FD4", shaking: cascadeStage >= 3, delay: 0.3 },
                  { label: "Social", color: "#FFB84D", shaking: cascadeStage >= 3, delay: 0.6 },
                ].map((app) => (
                  <div
                    key={app.label}
                    className="flex items-center gap-2 sm:gap-3 px-3 py-2 sm:px-4 sm:py-3 rounded-lg"
                    style={{
                      background: 'rgba(255,255,255,0.04)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      animation: app.shaking ? `cascade-shake 0.4s ease-out ${app.delay}s both` : "none",
                    }}
                  >
                    <AppWindow className="w-5 h-5 flex-shrink-0" style={{ color: app.color }} />
                    <span className="text-sm font-medium whitespace-nowrap" style={{ color: 'rgba(255,255,255,0.75)' }}>
                      {app.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Breach warning */}
            <div
              className="mt-8 text-center transition-all duration-500"
              style={{
                opacity: cascadeStage >= 2 ? 1 : 0,
                transform: cascadeStage >= 2 ? "translateY(0)" : "translateY(10px)",
              }}
            >
              <span
                className="inline-block px-5 py-2 text-sm font-semibold rounded-full"
                style={{
                  background: 'rgba(232, 93, 93, 0.12)',
                  color: '#F87171',
                  border: '1px solid rgba(232, 93, 93, 0.2)',
                }}
              >
                One breach compromises everything
              </span>
            </div>
          </div>
        </div>

        {/* Expandable Deep Dive */}
        <div className="mt-8">
          <ExpandableDeepDive label="How bad was password sharing?">
            In the early 2000s, services like early Twitter clients and email
            aggregators literally asked for your Gmail password. They stored it
            on their servers, often in plaintext. If any single service was
            compromised, attackers got the keys to your entire digital life.
          </ExpandableDeepDive>
        </div>
      </div>
    </SectionWrapper>
  );
}
