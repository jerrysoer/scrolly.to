"use client";

import { useState } from "react";
import {
  Landmark,
  Vote,
  Hash,
  BarChart2,
  Megaphone,
  Trophy,
  ChevronDown,
  Check,
  Copy,
  Calendar,
  MapPin,
} from "lucide-react";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RecapItem {
  icon: React.ReactNode;
  text: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

// ─── Recap data ───────────────────────────────────────────────────────────────

const RECAP_ITEMS: RecapItem[] = [
  {
    icon: <Landmark className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "The Academy has ~10,820 members in 17 professional branches",
  },
  {
    icon: <Vote className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "Each branch nominates only their own categories via ranked ballot",
  },
  {
    icon: <Hash className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "Best Picture uses STV — the most broadly acceptable film wins, not just the most loved",
  },
  {
    icon: <BarChart2 className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "All other final votes are simple plurality — most votes wins",
  },
  {
    icon: <Megaphone className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "Campaign season (Jan–Mar) can reshape outcomes through FYC screenings, billboards, and screeners",
  },
  {
    icon: <Trophy className="w-5 h-5 flex-shrink-0" style={{ color: "var(--forward-blue)" }} aria-hidden="true" />,
    text: "DGA Award (84% correlation) is the strongest single predictor of Best Director Oscar",
  },
];

// ─── FAQ data ─────────────────────────────────────────────────────────────────

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "How do Oscar nominations work?",
    answer:
      "Oscar nominations are voted on by the Academy's 17 branches, each made up of industry professionals. Each branch nominates only in their own category — cinematographers vote for Best Cinematography, directors for Best Director, and so on. Best Picture is the exception: all ~10,820 members vote. Nominations use a ranked-choice ballot (STV), so you rank your top five choices.",
  },
  {
    question: "What is the preferential ballot (STV) for Best Picture?",
    answer:
      "The Academy uses Single Transferable Vote (STV) for Best Picture. Voters rank their choices. If no film exceeds 50% of first-choice votes, the film with the fewest votes is eliminated and those ballots redistribute to the voters' next choice. This continues until one film passes the threshold. The result: a film that's broadly acceptable beats one passionately loved by only half the room.",
  },
  {
    question: "Who are the Academy members?",
    answer:
      "The Academy of Motion Picture Arts and Sciences has approximately 10,820 members organized into 17 branches — from actors (1,302 members) to visual effects artists (298 members). Membership is by invitation only, typically granted to working professionals with significant credits in their field.",
  },
  {
    question: "How does campaign season influence Oscar outcomes?",
    answer:
      "Studios spend millions on For Your Consideration (FYC) campaigns between nominations (January 19) and final voting (February 28 – March 8). Tactics include private screenings for Academy members, FYC billboards on Sunset Boulevard, streaming screeners, press tours, and targeted outreach to specific branches. Many analysts argue campaign execution matters as much as the films themselves.",
  },
  {
    question: "What guild awards best predict the Oscars?",
    answer:
      "The Directors Guild of America (DGA) Award has historically correlated with the Best Director Oscar about 84% of the time. The American Society of Cinematographers (ASC) correlates at ~73%. The Writers Guild (WGA) and Screen Actors Guild (SAG) ensemble award are lower predictors, partly because guild eligibility rules differ from Academy eligibility.",
  },
  {
    question: "What records did Sinners set at the 98th Academy Awards?",
    answer:
      "Ryan Coogler's Sinners received 16 Oscar nominations at the 98th Academy Awards (2026), the most of any film in a single year — surpassing the previous record of 14 held by All About Eve (1950), Titanic (1997), and La La Land (2016). The film also ties the record for most Black individuals nominated for a single film (10), matching Judas and the Black Messiah (2021). Coogler became only the second Black filmmaker (after Jordan Peele) to be nominated for producing, directing, and writing the same film in a single year.",
  },
];

// ─── Tweet text ───────────────────────────────────────────────────────────────

const TWEET_TEXT =
  "How the Oscars actually work — including the preferential voting math that means your favorite film can lose even if it gets the most votes. scrolly.to/learn/how-the-oscars-work";

// ─── FaqAccordion ─────────────────────────────────────────────────────────────

function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div
      className="flex flex-col divide-y"
      style={{ borderColor: "var(--border)" }}
      role="list"
      aria-label="Frequently asked questions"
    >
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={item.question} role="listitem">
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between gap-4 py-4 text-left"
              style={{
                background: "transparent",
                border: "none",
                cursor: "pointer",
                fontFamily: "system-ui, sans-serif",
              }}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${i}`}
              id={`faq-question-${i}`}
            >
              <span
                className="text-sm font-semibold"
                style={{ color: "var(--text-primary)" }}
              >
                {item.question}
              </span>
              <ChevronDown
                className="w-4 h-4 flex-shrink-0 transition-transform duration-300"
                style={{
                  color: "var(--text-secondary)",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
                aria-hidden="true"
              />
            </button>

            <div
              id={`faq-answer-${i}`}
              role="region"
              aria-labelledby={`faq-question-${i}`}
              className={`accordion-content${isOpen ? " open" : ""}`}
            >
              <div>
                <p
                  className="text-sm leading-relaxed pb-4"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard API unavailable; silently fail
    }
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200"
      style={{
        background: copied
          ? "color-mix(in srgb, #22c55e 15%, var(--bg-secondary))"
          : "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-secondary))",
        color: copied ? "var(--success-green)" : "var(--forward-blue)",
        border: copied
          ? "1px solid color-mix(in srgb, #22c55e 30%, var(--border))"
          : "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))",
        cursor: "pointer",
        fontFamily: "system-ui, sans-serif",
      }}
      aria-label={copied ? "Copied to clipboard" : "Copy tweet text"}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4" aria-hidden="true" />
          Copied
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" aria-hidden="true" />
          Copy
        </>
      )}
    </button>
  );
}

// ─── CompletionSection ────────────────────────────────────────────────────────

export default function CompletionSection() {
  return (
    <section
      id="complete"
      style={{ background: "var(--bg-secondary)", padding: "5rem 1.5rem" }}
    >
      <div style={{ maxWidth: "48rem", margin: "0 auto" }}>

        {/* Completion card */}
        <div
          style={{
            background: "var(--bg-card)",
            border: "1px solid var(--border)",
            borderRadius: "1rem",
            borderTop: "4px solid var(--forward-blue)",
            overflow: "hidden",
            boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
          }}
        >
          {/* Header */}
          <div style={{ padding: "2.5rem 2rem 0" }}>
            <h2
              style={{
                fontSize: "clamp(1.5rem, 4vw, 2rem)",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                color: "var(--text-primary)",
                marginBottom: "0.75rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Now You Know How It Works
            </h2>
            <p
              style={{
                fontSize: "1rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                fontFamily: "system-ui, sans-serif",
                marginBottom: "2rem",
              }}
            >
              From the ballot to the billboard, the Oscars are a system — and
              knowing the system changes how you watch.
            </p>
          </div>

          {/* Recap bullets */}
          <div style={{ padding: "0 2rem 2rem" }}>
            <p
              style={{
                fontSize: "0.7rem",
                fontWeight: 700,
                textTransform: "uppercase",
                letterSpacing: "0.1em",
                color: "var(--text-tertiary)",
                marginBottom: "1rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Key Takeaways
            </p>
            <ul
              style={{
                listStyle: "none",
                margin: 0,
                padding: 0,
                display: "flex",
                flexDirection: "column",
                gap: "0.875rem",
              }}
              aria-label="Key takeaways"
            >
              {RECAP_ITEMS.map((item, i) => (
                <li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.75rem",
                  }}
                >
                  {item.icon}
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      lineHeight: 1.6,
                      color: "var(--text-secondary)",
                      fontFamily: "system-ui, sans-serif",
                    }}
                  >
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "0 2rem",
            }}
            aria-hidden="true"
          />

          {/* Share section */}
          <div style={{ padding: "2rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "1rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Share this explainer
            </h3>

            {/* Tweet blockquote */}
            <blockquote
              style={{
                borderLeft: "3px solid var(--forward-blue)",
                paddingLeft: "1rem",
                marginBottom: "1rem",
                fontStyle: "italic",
                fontSize: "0.9375rem",
                lineHeight: 1.7,
                color: "var(--text-secondary)",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              {TWEET_TEXT}
            </blockquote>

            <CopyButton text={TWEET_TEXT} />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "0 2rem",
            }}
            aria-hidden="true"
          />

          {/* FAQ Accordion */}
          <div style={{ padding: "2rem" }}>
            <h3
              style={{
                fontSize: "1rem",
                fontWeight: 700,
                color: "var(--text-primary)",
                marginBottom: "0.5rem",
                fontFamily: "system-ui, sans-serif",
              }}
            >
              Frequently Asked Questions
            </h3>
            <FaqAccordion />
          </div>

          {/* Divider */}
          <div
            style={{
              height: "1px",
              background: "var(--border)",
              margin: "0 2rem",
            }}
            aria-hidden="true"
          />

          {/* 98th Oscars callout */}
          <div
            style={{
              padding: "1.5rem 2rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              alignItems: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.875rem",
                borderRadius: "9999px",
                background: "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-secondary))",
                border: "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))",
              }}
            >
              <Calendar
                className="w-3.5 h-3.5"
                style={{ color: "var(--forward-blue)" }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--forward-blue)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                The 98th Academy Awards ceremony: March 15, 2026
              </span>
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.4rem 0.875rem",
                borderRadius: "9999px",
                background: "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-secondary))",
                border: "1px solid color-mix(in srgb, var(--forward-blue) 25%, var(--border))",
              }}
            >
              <MapPin
                className="w-3.5 h-3.5"
                style={{ color: "var(--forward-blue)" }}
                aria-hidden="true"
              />
              <span
                style={{
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: "var(--forward-blue)",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                Hosted at the Dolby Theatre, Hollywood
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
