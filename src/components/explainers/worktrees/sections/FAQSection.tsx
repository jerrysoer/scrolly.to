"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { ChevronDown, ChevronUp, GitFork } from "lucide-react";
import { faqs } from "@/lib/explainers/worktrees";

function FAQItem({ faq }: { faq: { q: string; a: string } }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.5rem",
        background: "var(--bg-card)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((v) => !v)}
        style={{
          width: "100%",
          padding: "1rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: "1rem",
          minHeight: "52px",
        }}
        aria-expanded={open}
      >
        <span
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "1rem",
            fontWeight: 500,
            color: "var(--text-primary)",
          }}
        >
          {faq.q}
        </span>
        {open ? (
          <ChevronUp size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
        )}
      </button>
      {open && (
        <div
          style={{
            padding: "0 1.25rem 1rem",
            borderTop: "1px solid var(--border)",
            paddingTop: "0.875rem",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.9375rem",
              color: "var(--text-secondary)",
              lineHeight: 1.65,
            }}
          >
            {faq.a}
          </p>
        </div>
      )}
    </div>
  );
}

export default function FAQSection() {
  return (
    <SectionWrapper id="faq" layout="centered-card">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          07 &mdash; FAQ
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Common questions answered.
        </h2>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.625rem", marginTop: "2rem" }}>
        {faqs.map((faq) => (
          <FAQItem key={faq.q} faq={faq} />
        ))}
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          paddingTop: "3rem",
          marginTop: "3rem",
          borderTop: "1px solid var(--border)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem", marginBottom: "0.5rem" }}>
          <GitFork size={16} style={{ color: "var(--git-blue)" }} />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--git-blue)", fontWeight: 600 }}>
            git worktree
          </span>
        </div>
        <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--text-tertiary)" }}>
          A{" "}
          <a
            href="https://scrolly.to"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "var(--git-blue)", textDecoration: "underline" }}
          >
            Scrolly Explainer
          </a>{" "}
          &mdash; interactive deep dives into developer tools and concepts.
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.75rem", color: "var(--text-tertiary)", marginTop: "0.5rem" }}>
          <JargonTerm term="git worktree" definition="A linked working directory sharing the same .git database as its parent repository.">
            git worktree
          </JargonTerm>{" "}
          &mdash; available in Git 2.5+
        </p>
      </div>
    </SectionWrapper>
  );
}
