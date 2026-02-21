"use client";

import {
  GitBranch,
  GitFork,
  Terminal,
  ArrowRight,
} from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "5rem 1.25rem 3rem",
        textAlign: "center",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Grid background decoration */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `
            linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
          opacity: 0.4,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "0.5rem",
            background: "color-mix(in srgb, var(--git-blue) 10%, transparent)",
            border: "1px solid color-mix(in srgb, var(--git-blue) 30%, transparent)",
            borderRadius: "9999px",
            padding: "0.375rem 0.875rem",
            marginBottom: "1.5rem",
          }}
        >
          <GitBranch size={14} style={{ color: "var(--git-blue)" }} />
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--git-blue)",
              fontWeight: 600,
            }}
          >
            git worktree
          </span>
        </div>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontWeight: 700,
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            color: "var(--text-primary)",
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            maxWidth: "800px",
          }}
        >
          Work on multiple branches{" "}
          <span style={{ color: "var(--git-blue)" }}>simultaneously.</span>
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: "var(--text-secondary)",
            lineHeight: 1.65,
            maxWidth: "560px",
            margin: "0 auto 2rem",
          }}
        >
          Git worktrees let you check out multiple branches at the same time — no stashing,
          no cloning, no lost context. A deep dive into one of git&apos;s most useful features.
        </p>

        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.75rem",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
            marginBottom: "1.5rem",
          }}
        >
          6 min read
        </p>

        <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center", flexWrap: "wrap" }}>
          <button
            onClick={() => {
              document.getElementById("problem")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              background: "var(--git-blue)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              transition: "opacity 0.2s",
              minHeight: "44px",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
          >
            Start exploring
            <ArrowRight size={16} />
          </button>
          <button
            onClick={() => {
              document.getElementById("commands")?.scrollIntoView({ behavior: "smooth" });
            }}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.75rem 1.5rem",
              borderRadius: "0.5rem",
              background: "transparent",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              cursor: "pointer",
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "0.9375rem",
              minHeight: "44px",
              transition: "border-color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--git-blue)")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
          >
            <Terminal size={16} />
            Jump to commands
          </button>
        </div>

        {/* Stats strip */}
        <div
          style={{
            display: "flex",
            gap: "2rem",
            justifyContent: "center",
            flexWrap: "wrap",
            marginTop: "3rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {[
            { label: "Git version", value: "2.5+" },
            { label: "Setup time", value: "< 1s" },
            { label: "Commands covered", value: "5" },
            { label: "Disk overhead", value: "~0%" },
          ].map(({ label, value }) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "1.5rem",
                  fontWeight: 700,
                  color: "var(--git-blue)",
                }}
              >
                {value}
              </div>
              <div
                style={{
                  fontSize: "0.75rem",
                  color: "var(--text-tertiary)",
                  fontFamily: "var(--font-body)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                }}
              >
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Decorative branching SVG */}
        <div style={{ marginTop: "2rem", maxWidth: "400px", margin: "2rem auto 0" }} aria-hidden="true">
          <svg viewBox="0 0 400 120" width="100%" style={{ height: "auto" }}>
            <path d="M 40 60 L 120 60" stroke="var(--border)" strokeWidth="3" fill="none" strokeLinecap="round" />
            <circle cx="120" cy="60" r="8" fill="var(--bg-card)" stroke="var(--git-blue)" strokeWidth="3" />
            <path d="M 128 60 L 360 60" stroke="var(--git-blue)" strokeWidth="2.5" fill="none" strokeLinecap="round" />
            <circle cx="360" cy="60" r="6" fill="var(--git-blue)" />
            <text x="360" y="82" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-mono)">main/</text>
            <path d="M 128 56 C 160 40, 200 25, 280 25" stroke="var(--backward-orange)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="280" cy="25" r="5" fill="var(--backward-orange)" />
            <text x="280" y="16" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-mono)">hotfix/</text>
            <path d="M 128 64 C 160 80, 200 95, 320 95" stroke="var(--accent-purple)" strokeWidth="2" fill="none" strokeLinecap="round" />
            <circle cx="320" cy="95" r="5" fill="var(--accent-purple)" />
            <text x="320" y="114" textAnchor="middle" fill="var(--text-tertiary)" fontSize="11" fontFamily="var(--font-mono)">feature/</text>
            <circle cx="40" cy="60" r="5" fill="var(--border)" />
            <rect x="50" y="42" width="56" height="16" rx="3" fill="color-mix(in srgb, var(--git-blue) 15%, transparent)" />
            <text x="78" y="53" textAnchor="middle" fill="var(--git-blue)" fontSize="9" fontFamily="var(--font-mono)" fontWeight="600">.git/</text>
          </svg>
        </div>
      </div>
    </section>
  );
}
