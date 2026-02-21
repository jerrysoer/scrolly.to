"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, CheckCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import JargonTerm from "@/components/explainers/shared/JargonTerm";
import { completionExamples } from "@/lib/explainers/hallucinate";

// ─── Custom Tooltip for recharts ──────────────────────────────────────────────

interface TooltipPayload {
  value: number;
  name: string;
}

function CustomTooltip({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) {
  if (!active || !payload?.length) return null;
  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs font-mono shadow-lg"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
        color: "var(--text-primary)",
      }}
    >
      <span style={{ color: "var(--text-secondary)" }}>probability: </span>
      <span style={{ color: "var(--forward-blue)", fontWeight: 700 }}>
        {(payload[0].value * 100).toFixed(0)}%
      </span>
    </div>
  );
}

// ─── Bar color helper ─────────────────────────────────────────────────────────

function getBarColor(index: number, probability: number): string {
  if (index === 0) return "var(--forward-blue)";
  if (probability >= 0.15) return "var(--accent-purple)";
  if (probability >= 0.07) return "var(--accent-amber)";
  return "var(--text-tertiary)";
}

// ─── Token Prediction Explorer ────────────────────────────────────────────────

function TokenPredictionExplorer() {
  const [activeIndex, setActiveIndex] = useState(0);

  const example = completionExamples[activeIndex];

  // Sort predictions by probability desc for display
  const sorted = [...example.predictions].sort((a, b) => b.probability - a.probability);

  const chartData = sorted.map((p) => ({
    token: p.token,
    probability: p.probability,
  }));

  function prev() {
    setActiveIndex((i) => (i === 0 ? completionExamples.length - 1 : i - 1));
  }

  function next() {
    setActiveIndex((i) => (i === completionExamples.length - 1 ? 0 : i + 1));
  }

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{
        backgroundColor: "var(--bg-card)",
        borderColor: "var(--border)",
      }}
    >
      {/* Explorer header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
      >
        <span
          className="font-mono text-xs uppercase tracking-widest"
          style={{ color: "var(--text-tertiary)" }}
        >
          Token Prediction Explorer
        </span>
        <div className="flex items-center gap-1">
          {completionExamples.map((_, i) => (
            <button
              key={i}
              aria-label={`Example ${i + 1}`}
              onClick={() => setActiveIndex(i)}
              className="w-2 h-2 rounded-full transition-all duration-200"
              style={{
                backgroundColor: i === activeIndex ? "var(--forward-blue)" : "var(--border)",
                minWidth: 8,
                minHeight: 8,
              }}
            />
          ))}
        </div>
      </div>

      <div className="p-5 flex flex-col gap-5">
        {/* Prompt display */}
        <div>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--text-tertiary)" }}
          >
            Prompt
          </p>
          <div
            className="rounded-lg px-4 py-3 font-mono text-sm leading-relaxed"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              borderLeft: "3px solid var(--forward-blue)",
            }}
          >
            {example.prompt}
            <span
              className="inline-block w-2 h-4 ml-1 align-middle"
              style={{
                backgroundColor: "var(--forward-blue)",
                animation: "pulse-glow 1.2s ease-in-out infinite",
                opacity: 0.8,
              }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bar chart */}
        <div>
          <p
            className="font-mono text-xs uppercase tracking-widest mb-3"
            style={{ color: "var(--text-tertiary)" }}
          >
            Top Next-Token Predictions
          </p>

          <div style={{ height: 180 }}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{ top: 0, right: 48, bottom: 0, left: 8 }}
                barCategoryGap="20%"
              >
                <XAxis
                  type="number"
                  domain={[0, 1]}
                  tickFormatter={(v) => `${(v * 100).toFixed(0)}%`}
                  tick={{
                    fontSize: 10,
                    fontFamily: "monospace",
                    fill: "var(--text-tertiary)",
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  type="category"
                  dataKey="token"
                  width={80}
                  tick={{
                    fontSize: 11,
                    fontFamily: "monospace",
                    fill: "var(--text-primary)",
                    fontWeight: 600,
                  }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(74,144,217,0.05)" }} />
                <Bar dataKey="probability" radius={[0, 4, 4, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={getBarColor(index, entry.probability)}
                      fillOpacity={0.85}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Correct token indicator */}
          <div
            className="flex items-center gap-2 mt-2 pt-3 border-t"
            style={{ borderColor: "var(--border)" }}
          >
            <CheckCircle
              size={14}
              aria-hidden="true"
              style={{ color: "var(--verified-green)", flexShrink: 0 }}
            />
            <span
              className="font-mono text-xs"
              style={{ color: "var(--text-secondary)" }}
            >
              Highest-prob token:{" "}
              <strong style={{ color: "var(--verified-green)" }}>
                &ldquo;{example.correctToken}&rdquo;
              </strong>
            </span>
          </div>
        </div>

        {/* Note */}
        {example.note && (
          <p
            className="font-sans text-xs italic leading-relaxed border-t pt-3"
            style={{
              color: "var(--text-tertiary)",
              borderColor: "var(--border)",
            }}
          >
            {example.note}
          </p>
        )}
      </div>

      {/* Navigation */}
      <div
        className="flex items-center justify-between px-4 py-3 border-t"
        style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-secondary)" }}
      >
        <button
          onClick={prev}
          aria-label="Previous example"
          className="flex items-center gap-1 rounded-lg px-3 py-2 font-mono text-xs transition-all duration-200"
          style={{
            color: "var(--text-secondary)",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            minWidth: 44,
            minHeight: 44,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 0 2px var(--forward-blue)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--forward-blue)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
          }}
        >
          <ChevronLeft size={14} aria-hidden="true" />
          Prev
        </button>

        <span
          className="font-mono text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          {activeIndex + 1} / {completionExamples.length}
        </span>

        <button
          onClick={next}
          aria-label="Next example"
          className="flex items-center gap-1 rounded-lg px-3 py-2 font-mono text-xs transition-all duration-200"
          style={{
            color: "var(--text-secondary)",
            backgroundColor: "var(--bg-card)",
            border: "1px solid var(--border)",
            minWidth: 44,
            minHeight: 44,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow =
              "0 0 0 2px var(--forward-blue)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--forward-blue)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLButtonElement).style.boxShadow = "";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
          }}
        >
          Next
          <ChevronRight size={14} aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

// ─── HowLLMsWorkSection ────────────────────────────────────────────────────────

export default function HowLLMsWorkSection() {
  return (
    <SectionWrapper id="how-llms-work" layout="centered-card" stagger>
      {/* Section header */}
      <div className="text-center mb-12 stagger-item">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-3"
          style={{ color: "var(--forward-blue)" }}
        >
          Section 02
        </p>
        <h2
          className="font-serif text-3xl font-bold sm:text-4xl"
          style={{ color: "var(--text-primary)" }}
        >
          How LLMs Actually Work
        </h2>
        <p
          className="mx-auto mt-4 max-w-2xl font-sans text-base leading-relaxed sm:text-lg"
          style={{ color: "var(--text-secondary)" }}
        >
          Not knowledge. Not memory. Just very confident pattern completion.
        </p>
      </div>

      {/* Body text */}
      <div className="flex flex-col gap-5 mb-10">
        <p
          className="font-sans text-base leading-relaxed sm:text-lg stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          An{" "}
          <JargonTerm
            term="LLM"
            definition="Large Language Model — an AI trained on massive amounts of text to predict the next word in a sequence"
          >
            LLM
          </JargonTerm>{" "}
          doesn&rsquo;t &ldquo;know&rdquo; facts the way you know your name. It learned
          statistical patterns across billions of text samples. It predicts the most
          plausible next word given everything before it. That&rsquo;s it.
        </p>

        <p
          className="font-sans text-base leading-relaxed sm:text-lg stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          There is no lookup table, no verified database, no internal fact-checker.
          When you ask &ldquo;Who won the 1987 World Series?&rdquo; the model
          doesn&rsquo;t retrieve the answer — it generates the most likely continuation
          of that sentence based on patterns it absorbed during training.
        </p>

        {/* Analogy card */}
        <div
          className="rounded-xl border p-5 stagger-item transition-all duration-200"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow =
              "0 0 0 2px var(--forward-blue), 0 6px 24px rgba(74,144,217,0.1)";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLDivElement).style.boxShadow = "";
          }}
        >
          <p
            className="font-mono text-xs uppercase tracking-widest mb-2"
            style={{ color: "var(--accent-purple)" }}
          >
            Analogy
          </p>
          <p
            className="font-sans text-base leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            Think of it like the world&rsquo;s most sophisticated autocomplete — the
            same feature that finishes your texts, but trained on the entire internet.
            When your phone suggests &ldquo;on my way&rdquo; after &ldquo;I&rsquo;ll
            be there&rdquo;, it doesn&rsquo;t know if you&rsquo;re actually on your
            way. An LLM operates on the same principle, at vastly larger scale.
          </p>
        </div>

        <p
          className="font-sans text-base leading-relaxed sm:text-lg stagger-item"
          style={{ color: "var(--text-secondary)" }}
        >
          This design is what makes LLMs so fluent and capable. It&rsquo;s also
          exactly what makes them hallucinate. The model predicts{" "}
          <em>plausible</em> text — and plausible is not the same as{" "}
          <em>true</em>.
        </p>
      </div>

      {/* Interactive: Token Prediction Explorer */}
      <div className="stagger-item">
        <p
          className="font-mono text-xs uppercase tracking-widest mb-4 text-center"
          style={{ color: "var(--text-tertiary)" }}
        >
          Try it — see what token the model predicts next
        </p>
        <TokenPredictionExplorer />
      </div>
    </SectionWrapper>
  );
}
