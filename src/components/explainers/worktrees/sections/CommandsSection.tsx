"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { ChevronDown, ChevronUp } from "lucide-react";
import { commands, type Command } from "@/lib/explainers/worktrees";

function CommandCard({ cmd }: { cmd: Command }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      style={{
        border: "1px solid var(--border)",
        borderRadius: "0.625rem",
        background: "var(--bg-card)",
        overflow: "hidden",
        transition: "border-color 0.2s",
      }}
    >
      <button
        onClick={() => setExpanded((v) => !v)}
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
          minHeight: "44px",
        }}
      >
        <div>
          <code
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.9375rem",
              fontWeight: 600,
              color: "var(--git-blue)",
            }}
          >
            {cmd.name}
          </code>
          <p
            style={{
              fontSize: "0.875rem",
              color: "var(--text-secondary)",
              marginTop: "0.1875rem",
              fontFamily: "var(--font-body)",
            }}
          >
            {cmd.description}
          </p>
        </div>
        {expanded ? (
          <ChevronUp size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
        ) : (
          <ChevronDown size={16} style={{ color: "var(--text-tertiary)", flexShrink: 0 }} />
        )}
      </button>

      {expanded && (
        <div
          style={{
            padding: "0 1.25rem 1.25rem",
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Syntax */}
          <div
            className="terminal-bg"
            style={{ padding: "0.75rem 1rem", marginTop: "1rem", marginBottom: "1rem" }}
          >
            <code style={{ fontSize: "0.875rem" }}>{cmd.syntax}</code>
          </div>

          {/* Flags */}
          {cmd.flags.length > 0 && (
            <div style={{ marginBottom: "1rem" }}>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-tertiary)",
                  marginBottom: "0.5rem",
                }}
              >
                Flags
              </p>
              {cmd.flags.map((f) => (
                <div
                  key={f.flag}
                  style={{
                    display: "flex",
                    gap: "0.75rem",
                    marginBottom: "0.375rem",
                    alignItems: "baseline",
                  }}
                >
                  <code
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.8125rem",
                      color: "var(--accent-amber)",
                      flexShrink: 0,
                      minWidth: "160px",
                    }}
                  >
                    {f.flag}
                  </code>
                  <span
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      fontFamily: "var(--font-body)",
                    }}
                  >
                    {f.description}
                  </span>
                </div>
              ))}
            </div>
          )}

          {/* Examples */}
          {cmd.examples.length > 0 && (
            <div>
              <p
                style={{
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  letterSpacing: "0.1em",
                  color: "var(--text-tertiary)",
                  marginBottom: "0.5rem",
                }}
              >
                Examples
              </p>
              {cmd.examples.map((ex) => (
                <div key={ex.command} style={{ marginBottom: "0.625rem" }}>
                  <div
                    className="terminal-bg"
                    style={{ padding: "0.5rem 0.875rem", marginBottom: "0.25rem" }}
                  >
                    <code style={{ fontSize: "0.8125rem" }}>
                      <span style={{ color: "#6A9955" }}>$ </span>
                      {ex.command}
                    </code>
                  </div>
                  <p
                    style={{
                      fontSize: "0.8125rem",
                      color: "var(--text-tertiary)",
                      fontFamily: "var(--font-body)",
                      paddingLeft: "0.5rem",
                    }}
                  >
                    {ex.explanation}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function CommandsSection() {
  return (
    <SectionWrapper id="commands" layout="centered-card">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          04 &mdash; Commands
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          Every git worktree command, explained.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          Click any command to expand its flags, syntax, and real-world examples.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginTop: "2rem" }}>
        {commands.map((cmd) => (
          <CommandCard key={cmd.name} cmd={cmd} />
        ))}
      </div>
    </SectionWrapper>
  );
}
