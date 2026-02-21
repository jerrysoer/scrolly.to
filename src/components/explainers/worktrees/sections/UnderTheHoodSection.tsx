"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { worktreeRepoTree, scrollSteps, type FileNode } from "@/lib/explainers/worktrees";

function FileTreeNode({
  node,
  depth = 0,
  activeHighlights,
}: {
  node: FileNode;
  depth?: number;
  activeHighlights: string[];
}) {
  const isHighlighted = node.highlight && activeHighlights.includes(node.name);

  return (
    <div style={{ paddingLeft: depth > 0 ? "1.25rem" : 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "0.5rem",
          padding: "0.125rem 0.375rem",
          borderRadius: "0.25rem",
          background: isHighlighted ? "color-mix(in srgb, var(--git-blue) 12%, transparent)" : "transparent",
          transition: "background 0.3s",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "0.8125rem",
            color: isHighlighted
              ? "var(--git-blue)"
              : node.type === "symlink"
              ? "var(--accent-purple)"
              : node.type === "dir"
              ? "var(--text-primary)"
              : "var(--text-secondary)",
            fontWeight: isHighlighted ? 600 : 400,
          }}
        >
          {node.type === "symlink" ? "\u2197 " : node.type === "dir" ? "" : "  "}
          {node.name}
        </span>
        {node.label && (
          <span
            style={{
              fontSize: "0.6875rem",
              fontFamily: "var(--font-mono)",
              color: "var(--text-tertiary)",
              background: "var(--bg-secondary)",
              padding: "0.1em 0.4em",
              borderRadius: "0.2rem",
              whiteSpace: "nowrap",
            }}
          >
            {node.label}
          </span>
        )}
      </div>
      {node.children?.map((child) => (
        <FileTreeNode key={child.name} node={child} depth={depth + 1} activeHighlights={activeHighlights} />
      ))}
    </div>
  );
}

export default function UnderTheHoodSection() {
  const [activeScrollStep, setActiveScrollStep] = useState(0);

  return (
    <SectionWrapper id="under-the-hood" layout="full-bleed">
      <div>
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--git-blue)" }}
        >
          03 &mdash; Under the Hood
        </p>
        <h2
          className="mt-3 text-3xl font-bold sm:text-4xl"
          style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
        >
          How git worktrees work internally.
        </h2>
        <p
          className="mt-4 text-base leading-relaxed sm:text-lg"
          style={{ fontFamily: "var(--font-body)", color: "var(--text-secondary)" }}
        >
          Behind the scenes, git uses a simple but elegant mechanism: a .git file (not directory)
          in each worktree that points back to the main repository&apos;s administrative files.
        </p>
      </div>

      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}
        className="under-hood-grid"
      >
        {/* Step selector */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {scrollSteps.map((step, i) => (
            <button
              key={i}
              onClick={() => setActiveScrollStep(i)}
              style={{
                display: "flex",
                gap: "0.875rem",
                alignItems: "flex-start",
                background: activeScrollStep === i ? "var(--bg-card)" : "transparent",
                border: `1px solid ${activeScrollStep === i ? "var(--git-blue)" : "var(--border)"}`,
                borderRadius: "0.5rem",
                padding: "0.875rem 1rem",
                cursor: "pointer",
                textAlign: "left",
                transition: "all 0.2s",
                minHeight: "44px",
              }}
            >
              <span
                style={{
                  width: "24px",
                  height: "24px",
                  borderRadius: "50%",
                  background: activeScrollStep === i ? "var(--git-blue)" : "var(--bg-card)",
                  border: `2px solid ${activeScrollStep === i ? "var(--git-blue)" : "var(--border)"}`,
                  color: activeScrollStep === i ? "#fff" : "var(--text-tertiary)",
                  fontSize: "0.6875rem",
                  fontFamily: "var(--font-mono)",
                  fontWeight: 600,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  transition: "all 0.2s",
                }}
              >
                {i + 1}
              </span>
              <div>
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontWeight: 600,
                    fontSize: "0.9375rem",
                    color: activeScrollStep === i ? "var(--text-primary)" : "var(--text-secondary)",
                    marginBottom: "0.25rem",
                    transition: "color 0.2s",
                  }}
                >
                  {step.title}
                </p>
                {activeScrollStep === i && (
                  <p
                    style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "0.875rem",
                      color: "var(--text-secondary)",
                      lineHeight: 1.6,
                    }}
                  >
                    {step.text}
                  </p>
                )}
              </div>
            </button>
          ))}
        </div>

        {/* File tree visualization */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "0.625rem",
            padding: "1.25rem",
            fontFamily: "var(--font-mono)",
          }}
        >
          <div
            style={{
              display: "flex",
              gap: "0.375rem",
              marginBottom: "0.875rem",
            }}
          >
            {["#FF5F57", "#FFBD2E", "#28C840"].map((color) => (
              <div key={color} style={{ width: "10px", height: "10px", borderRadius: "50%", background: color }} />
            ))}
          </div>
          <FileTreeNode
            node={worktreeRepoTree}
            activeHighlights={scrollSteps[activeScrollStep].highlightPaths}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
