"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { Layers } from "lucide-react";

export default function WhatIsWorktreeSection() {
  return (
    <SectionWrapper id="what-is-worktree" layout="centered-card">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          02 &mdash; What Is a Worktree
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          One repository. Many working directories.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          A git worktree is an additional checkout of your repository in a separate folder.
          Each worktree has its own branch, index, and working files &mdash; but they all share a single .git database.
        </p>
      </div>

      {/* Visual diagram */}
      <div
        style={{
          border: "1px solid var(--border)",
          borderRadius: "0.75rem",
          background: "var(--bg-card)",
          padding: "1.5rem",
          marginTop: "2rem",
          marginBottom: "1.5rem",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.6875rem",
            color: "var(--text-tertiary)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: "1.25rem",
          }}
        >
          Repository layout with worktrees
        </p>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            alignItems: "center",
          }}
        >
          {/* Shared .git box */}
          <div
            style={{
              padding: "0.875rem 1.5rem",
              borderRadius: "0.5rem",
              background: "color-mix(in srgb, var(--git-blue) 12%, transparent)",
              border: "2px solid var(--git-blue)",
              textAlign: "center",
              minWidth: "240px",
            }}
          >
            <code
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.875rem",
                color: "var(--git-blue)",
                fontWeight: 700,
              }}
            >
              .git/
            </code>
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "0.75rem",
                color: "var(--text-secondary)",
                marginTop: "0.25rem",
              }}
            >
              Shared object database, refs, history
            </p>
          </div>

          {/* Connector lines */}
          <div style={{ display: "flex", gap: "2rem", alignItems: "flex-start" }}>
            {["main/", "hotfix/", "feature/"].map((name, i) => (
              <div key={name} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}>
                <div style={{ width: "1px", height: "1.5rem", background: "var(--border)" }} />
                <div
                  style={{
                    padding: "0.625rem 1rem",
                    borderRadius: "0.375rem",
                    background: "var(--bg-secondary)",
                    border: "1px solid var(--border)",
                    textAlign: "center",
                    minWidth: "90px",
                  }}
                >
                  <code
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.75rem",
                      color: "var(--text-primary)",
                      fontWeight: 600,
                    }}
                  >
                    {name}
                  </code>
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.625rem",
                      color: "var(--text-tertiary)",
                      marginTop: "0.125rem",
                    }}
                  >
                    {["main branch", "hotfix branch", "feature branch"][i]}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Key facts */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "0.875rem" }}>
        {[
          { label: "Shared", items: ["git objects (commits, blobs, trees)", "Refs and branches", "Stash"] },
          { label: "Independent per worktree", items: ["HEAD (which commit is checked out)", "Index (staging area)", "Working files"] },
        ].map(({ label, items }) => (
          <div
            key={label}
            style={{
              background: "var(--bg-secondary)",
              border: "1px solid var(--border)",
              borderRadius: "0.5rem",
              padding: "1rem",
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                textTransform: "uppercase",
                letterSpacing: "0.08em",
                color: "var(--git-blue)",
                marginBottom: "0.625rem",
              }}
            >
              {label}
            </p>
            {items.map((item) => (
              <div
                key={item}
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  alignItems: "center",
                  marginBottom: "0.375rem",
                }}
              >
                <Layers size={12} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
                <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--text-secondary)" }}>
                  {item}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
}
