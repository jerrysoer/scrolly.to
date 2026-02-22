"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, Play, RotateCcw, Trophy } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { STV_DEMO, STV_FILMS, runSTV, generateRandomBallots } from "@/lib/explainers/oscars";
import type { STVRound } from "@/lib/explainers/oscars";

// ─── Types ────────────────────────────────────────────────────────────────────

interface RoundDisplayProps {
  round: STVRound;
  roundIndex: number;
  totalRounds: number;
  winner?: string;
  visible: boolean;
}

// ─── AnimatedBar ──────────────────────────────────────────────────────────────

function AnimatedBar({
  label,
  count,
  total,
  isLeader,
  isEliminated,
  visible,
  winner,
}: {
  label: string;
  count: number;
  total: number;
  isLeader: boolean;
  isEliminated: boolean;
  visible: boolean;
  winner?: string;
}) {
  const pct = Math.round((count / total) * 100);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (!visible) {
      setWidth(0);
      return;
    }
    // Slight stagger to let the row appear first
    const t = setTimeout(() => setWidth(pct), 80);
    return () => clearTimeout(t);
  }, [visible, pct]);

  const isWinner = label === winner;

  let barColor: string;
  if (isEliminated) {
    barColor = "var(--color-rose-500, #f43f5e)";
  } else if (isWinner) {
    barColor = "var(--accent-amber)";
  } else if (isLeader) {
    barColor = "var(--forward-blue)";
  } else {
    barColor = "color-mix(in srgb, var(--text-secondary) 40%, var(--bg-secondary))";
  }

  return (
    <div
      className="flex items-center gap-3 py-2"
      style={{
        opacity: isEliminated ? 0.45 : 1,
        transition: "opacity 0.6s ease",
      }}
    >
      {/* Label */}
      <div
        className="text-sm font-medium shrink-0"
        style={{
          width: "9rem",
          color: isEliminated
            ? "var(--text-tertiary)"
            : isWinner
            ? "var(--accent-amber)"
            : isLeader
            ? "var(--forward-blue)"
            : "var(--text-primary)",
          textDecoration: isEliminated ? "line-through" : "none",
        }}
      >
        {label}
        {isEliminated && (
          <span
            className="ml-1 text-xs font-semibold tracking-wide"
            style={{ color: "#f87171" }}
          >
            OUT
          </span>
        )}
        {isWinner && (
          <Trophy
            size={12}
            className="inline ml-1"
            style={{ color: "var(--accent-amber)" }}
          />
        )}
      </div>

      {/* Bar track */}
      <div
        className="relative flex-1 rounded-full overflow-hidden"
        style={{ height: "10px", background: "var(--bg-secondary)" }}
      >
        <div
          style={{
            height: "100%",
            width: `${width}%`,
            background: barColor,
            borderRadius: "9999px",
            transition: "width 0.7s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </div>

      {/* Count */}
      <div
        className="text-sm tabular-nums shrink-0 font-semibold"
        style={{
          width: "4rem",
          textAlign: "right",
          color: isEliminated ? "var(--text-tertiary)" : "var(--text-secondary)",
        }}
      >
        {count} <span className="font-normal text-xs">({pct}%)</span>
      </div>
    </div>
  );
}

// ─── RoundDisplay ─────────────────────────────────────────────────────────────

function RoundDisplay({ round, roundIndex, totalRounds, winner, visible }: RoundDisplayProps) {
  const isLastRound = roundIndex === totalRounds - 1;
  const entries = Object.entries(round.counts).sort((a, b) => b[1] - a[1]);
  const leaderFilm = entries[0]?.[0];

  return (
    <div
      className="rounded-xl border p-5"
      style={{
        background: "var(--bg-card)",
        borderColor: "var(--border)",
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(12px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}
    >
      {/* Round header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className="text-xs font-bold tracking-widest uppercase px-2.5 py-1 rounded-full"
          style={{
            background: "color-mix(in srgb, var(--forward-blue) 12%, var(--bg-secondary))",
            color: "var(--forward-blue)",
          }}
        >
          Round {roundIndex + 1} / {totalRounds}
        </span>
        {isLastRound && winner && (
          <span
            className="text-xs font-semibold px-2.5 py-1 rounded-full"
            style={{
              background: "color-mix(in srgb, var(--accent-amber) 15%, var(--bg-secondary))",
              color: "var(--accent-amber)",
            }}
          >
            Winner declared
          </span>
        )}
      </div>

      {/* Bars */}
      <div className="space-y-0.5">
        {entries.map(([film, count]) => (
          <AnimatedBar
            key={film}
            label={film}
            count={count}
            total={round.total}
            isLeader={film === leaderFilm && !isLastRound}
            isEliminated={film === round.eliminated && !isLastRound}
            visible={visible}
            winner={isLastRound ? winner : undefined}
          />
        ))}
      </div>

      {/* Elimination note */}
      {!isLastRound && round.eliminated && (
        <p
          className="mt-3 text-xs"
          style={{ color: "var(--text-tertiary)" }}
        >
          Eliminated: <strong style={{ color: "#f87171" }}>{round.eliminated}</strong> — votes transfer to each
          ballot&apos;s next ranked choice.
        </p>
      )}

      {/* Winner note */}
      {isLastRound && winner && (
        <p
          className="mt-3 text-xs font-medium"
          style={{ color: "var(--accent-amber)" }}
        >
          Winner: <strong>{winner}</strong> crossed 50% of remaining votes.
        </p>
      )}
    </div>
  );
}

// ─── DemoAnimation ────────────────────────────────────────────────────────────

function DemoAnimation() {
  const [currentRound, setCurrentRound] = useState<number>(-1); // -1 = not started
  const [isPlaying, setIsPlaying] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const ROUND_DELAY = 1200;

  // All rounds including a synthetic "final" round showing only the winner
  const allRounds = STV_DEMO.rounds;
  const totalRounds = allRounds.length;

  const reset = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setCurrentRound(-1);
    setIsPlaying(false);
  }, []);

  const playNext = useCallback(
    (round: number) => {
      if (round >= totalRounds) {
        setIsPlaying(false);
        return;
      }
      setCurrentRound(round);
      timerRef.current = setTimeout(() => playNext(round + 1), ROUND_DELAY);
    },
    [totalRounds]
  );

  const handlePlay = useCallback(() => {
    reset();
    setIsPlaying(true);
    // Small initial delay so the reset state renders first
    timerRef.current = setTimeout(() => playNext(0), 100);
  }, [reset, playNext]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const hasStarted = currentRound >= 0;

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex items-center gap-3">
        <button
          onClick={handlePlay}
          disabled={isPlaying}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: isPlaying
              ? "var(--bg-secondary)"
              : "var(--forward-blue)",
            color: isPlaying ? "var(--text-tertiary)" : "#ffffff",
            cursor: isPlaying ? "not-allowed" : "pointer",
            border: "none",
          }}
          aria-label="Play STV animation"
        >
          <Play size={14} />
          {isPlaying ? "Playing…" : hasStarted ? "Replay" : "Play Animation"}
        </button>

        {hasStarted && !isPlaying && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium transition-all"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
            }}
            aria-label="Reset animation"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      {/* Round cards */}
      {!hasStarted && (
        <div
          className="rounded-xl border p-8 text-center"
          style={{ background: "var(--bg-secondary)", borderColor: "var(--border)" }}
        >
          <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
            Press <strong style={{ color: "var(--forward-blue)" }}>Play Animation</strong> to watch
            the votes redistribute round by round.
          </p>
        </div>
      )}

      <div className="space-y-4">
        {allRounds.map((round, i) => (
          <RoundDisplay
            key={i}
            round={round}
            roundIndex={i}
            totalRounds={totalRounds}
            winner={i === totalRounds - 1 ? STV_DEMO.winner : undefined}
            visible={i <= currentRound}
          />
        ))}
      </div>
    </div>
  );
}

// ─── HowSTVWorks (expandable) ─────────────────────────────────────────────────

function HowSTVWorks() {
  const [open, setOpen] = useState(false);

  const steps = [
    {
      num: "01",
      text: "Every voter ranks all nominees in order of preference (1st, 2nd, 3rd…)",
    },
    {
      num: "02",
      text: "Count only first-choice votes. If any film gets more than 50%, it wins immediately.",
    },
    {
      num: "03",
      text: "If no film clears 50%, the film with the fewest votes is eliminated.",
    },
    {
      num: "04",
      text: "Each ballot that ranked the eliminated film first now transfers to that voter's next ranked choice.",
    },
    {
      num: "05",
      text: "Repeat the count. Continue eliminating and transferring until one film crosses 50%.",
    },
  ];

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ borderColor: "var(--border)" }}
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
        style={{
          background: open
            ? "color-mix(in srgb, var(--forward-blue) 6%, var(--bg-card))"
            : "var(--bg-card)",
        }}
        aria-expanded={open}
        aria-controls="how-stv-content"
      >
        <span
          className="text-sm font-semibold"
          style={{ color: "var(--text-primary)" }}
        >
          How STV Works — Step by Step
        </span>
        {open ? (
          <ChevronUp size={16} style={{ color: "var(--forward-blue)" }} />
        ) : (
          <ChevronDown size={16} style={{ color: "var(--text-tertiary)" }} />
        )}
      </button>

      <div
        id="how-stv-content"
        className={`accordion-content ${open ? "open" : ""}`}
        aria-hidden={!open}
      >
        <div
          className="px-5 pb-5 pt-2 space-y-3"
          style={{ background: "var(--bg-card)" }}
        >
          {steps.map(({ num, text }) => (
            <div key={num} className="flex gap-3 items-start">
              <span
                className="text-xs font-bold tabular-nums shrink-0 w-6 h-6 rounded-full flex items-center justify-center mt-0.5"
                style={{
                  background: "color-mix(in srgb, var(--forward-blue) 15%, var(--bg-secondary))",
                  color: "var(--forward-blue)",
                  fontSize: "0.65rem",
                }}
              >
                {num}
              </span>
              <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                {text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── RankingWidget ─────────────────────────────────────────────────────────────

interface WidgetRound {
  counts: Record<string, number>;
  eliminated: string;
  total: number;
}

interface WidgetResult {
  rounds: WidgetRound[];
  winner: string;
}

function RankingWidget() {
  const [ranking, setRanking] = useState<string[]>([...STV_FILMS]);
  const [result, setResult] = useState<WidgetResult | null>(null);
  const [animatedRound, setAnimatedRound] = useState<number>(-1);
  const [isRunning, setIsRunning] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const moveUp = (idx: number) => {
    if (idx === 0) return;
    setRanking((prev) => {
      const next = [...prev];
      [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]];
      return next;
    });
    setResult(null);
  };

  const moveDown = (idx: number) => {
    if (idx === ranking.length - 1) return;
    setRanking((prev) => {
      const next = [...prev];
      [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]];
      return next;
    });
    setResult(null);
  };

  const countVotes = useCallback(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setResult(null);
    setAnimatedRound(-1);
    setIsRunning(true);

    const randomBallots = generateRandomBallots(STV_FILMS, 49);
    const allBallots = [...randomBallots, [...ranking]];
    const stvResult = runSTV(allBallots);
    setResult(stvResult);

    // Animate rounds with delay
    const playRound = (idx: number) => {
      if (idx >= stvResult.rounds.length) {
        setIsRunning(false);
        return;
      }
      setAnimatedRound(idx);
      timerRef.current = setTimeout(() => playRound(idx + 1), 1200);
    };
    timerRef.current = setTimeout(() => playRound(0), 100);
  }, [ranking]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const reset = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setRanking([...STV_FILMS]);
    setResult(null);
    setAnimatedRound(-1);
    setIsRunning(false);
  };

  return (
    <div className="space-y-6">
      {/* Ranking list */}
      <div
        className="rounded-xl border overflow-hidden"
        style={{ borderColor: "var(--border)" }}
      >
        <div
          className="px-4 py-3 border-b"
          style={{
            background: "var(--bg-secondary)",
            borderColor: "var(--border)",
          }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: "var(--text-tertiary)" }}>
            Your Ballot — Rank from Most to Least Preferred
          </p>
        </div>

        <div style={{ background: "var(--bg-card)" }}>
          {ranking.map((film, idx) => (
            <div
              key={film}
              className="flex items-center gap-3 px-4 py-3 border-b last:border-b-0"
              style={{ borderColor: "var(--border)" }}
            >
              {/* Rank badge */}
              <span
                className="text-sm font-bold tabular-nums shrink-0 w-7 h-7 rounded-full flex items-center justify-center"
                style={{
                  background:
                    idx === 0
                      ? "color-mix(in srgb, var(--accent-amber) 20%, var(--bg-secondary))"
                      : "var(--bg-secondary)",
                  color: idx === 0 ? "var(--accent-amber)" : "var(--text-tertiary)",
                  fontSize: "0.75rem",
                }}
              >
                {idx + 1}
              </span>

              {/* Film name */}
              <span
                className="flex-1 text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {film}
              </span>

              {/* Arrow buttons */}
              <div className="flex gap-1">
                <button
                  onClick={() => moveUp(idx)}
                  disabled={idx === 0}
                  className="p-1.5 rounded-md transition-colors"
                  style={{
                    color: idx === 0 ? "var(--text-tertiary)" : "var(--forward-blue)",
                    background: idx === 0 ? "transparent" : "color-mix(in srgb, var(--forward-blue) 10%, var(--bg-secondary))",
                    cursor: idx === 0 ? "not-allowed" : "pointer",
                    border: "none",
                    opacity: idx === 0 ? 0.3 : 1,
                  }}
                  aria-label={`Move ${film} up`}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  onClick={() => moveDown(idx)}
                  disabled={idx === ranking.length - 1}
                  className="p-1.5 rounded-md transition-colors"
                  style={{
                    color: idx === ranking.length - 1 ? "var(--text-tertiary)" : "var(--forward-blue)",
                    background:
                      idx === ranking.length - 1
                        ? "transparent"
                        : "color-mix(in srgb, var(--forward-blue) 10%, var(--bg-secondary))",
                    cursor: idx === ranking.length - 1 ? "not-allowed" : "pointer",
                    border: "none",
                    opacity: idx === ranking.length - 1 ? 0.3 : 1,
                  }}
                  aria-label={`Move ${film} down`}
                >
                  <ChevronDown size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3 flex-wrap">
        <button
          onClick={countVotes}
          disabled={isRunning}
          className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-semibold transition-all"
          style={{
            background: isRunning ? "var(--bg-secondary)" : "var(--accent-amber)",
            color: isRunning ? "var(--text-tertiary)" : "#0f172a",
            cursor: isRunning ? "not-allowed" : "pointer",
            border: "none",
          }}
          aria-label="Count the votes"
        >
          <Trophy size={14} />
          {isRunning ? "Counting…" : "Count the Votes"}
        </button>

        {result && !isRunning && (
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium"
            style={{
              background: "var(--bg-secondary)",
              color: "var(--text-secondary)",
              border: "1px solid var(--border)",
              cursor: "pointer",
            }}
            aria-label="Reset widget"
          >
            <RotateCcw size={13} />
            Reset
          </button>
        )}
      </div>

      {/* Disclaimer note */}
      <p className="text-xs" style={{ color: "var(--text-tertiary)" }}>
        Your ballot is 1 of 50 simulated votes. Each run is different.
      </p>

      {/* Results */}
      {result && (
        <div className="space-y-4">
          <h4
            className="text-sm font-bold tracking-wide uppercase"
            style={{ color: "var(--text-secondary)" }}
          >
            Results — {result.rounds.length} round{result.rounds.length !== 1 ? "s" : ""}
          </h4>

          {result.rounds.map((round, i) => (
            <RoundDisplay
              key={i}
              round={round}
              roundIndex={i}
              totalRounds={result.rounds.length}
              winner={i === result.rounds.length - 1 ? result.winner : undefined}
              visible={i <= animatedRound}
            />
          ))}

          {/* Winner callout */}
          {animatedRound >= result.rounds.length - 1 && (
            <div
              className="rounded-xl border p-5 text-center"
              style={{
                background: "color-mix(in srgb, var(--accent-amber) 10%, var(--bg-card))",
                borderColor: "color-mix(in srgb, var(--accent-amber) 30%, var(--border))",
                animation: "fade-in 0.5s ease-out both",
              }}
            >
              <Trophy
                size={28}
                className="mx-auto mb-2"
                style={{ color: "var(--accent-amber)" }}
              />
              <p
                className="text-xl font-bold"
                style={{ color: "var(--accent-amber)" }}
              >
                {result.winner}
              </p>
              <p className="text-sm mt-1" style={{ color: "var(--text-secondary)" }}>
                wins Best Picture
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ─── STVSection ───────────────────────────────────────────────────────────────

export default function STVSection() {
  return (
    <SectionWrapper id="stv" layout="centered">
      {/* Section number divider */}
      <div className="flex items-center gap-4 mb-10">
        <span
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border-2 text-base font-bold shrink-0"
          style={{
            borderColor: "var(--forward-blue)",
            color: "var(--forward-blue)",
            background: "color-mix(in srgb, var(--forward-blue) 8%, var(--bg-card))",
          }}
          aria-label="Section 03"
        >
          03
        </span>
        <div
          className="flex-1 h-px"
          style={{ background: "var(--border)" }}
          aria-hidden="true"
        />
      </div>

      {/* Heading */}
      <div className="mb-10 space-y-3">
        <h2
          className="font-extrabold leading-tight"
          style={{
            fontSize: "clamp(1.875rem, 4vw, 3rem)",
            color: "var(--text-primary)",
            letterSpacing: "-0.02em",
          }}
        >
          The Preferential Ballot
        </h2>
        <p
          className="text-lg leading-relaxed max-w-2xl"
          style={{ color: "var(--text-secondary)" }}
        >
          Why your favorite film can lose even if it gets the most first-choice
          votes.
        </p>
      </div>

      {/* Part 1: Animated STV Demo */}
      <div className="mb-12 space-y-5">
        <div className="space-y-1">
          <h3
            className="text-base font-bold tracking-wide uppercase"
            style={{ color: "var(--text-tertiary)", fontSize: "0.7rem", letterSpacing: "0.15em" }}
          >
            Part 1
          </h3>
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Animated STV Demo
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            100 ballots, 5 films, 4 rounds. Watch the votes redistribute until
            one film crosses 50%.
          </p>
        </div>

        <DemoAnimation />

        {/* Stat box callout */}
        <div className="stat-box mt-6">
          <p
            className="text-sm font-semibold leading-relaxed"
            style={{ color: "var(--text-primary)" }}
          >
            &ldquo;A film that&apos;s everyone&apos;s safe second choice can beat
            one passionately loved by half the room.&rdquo;
          </p>
        </div>
      </div>

      {/* Divider */}
      <div
        className="w-full h-px mb-10"
        style={{ background: "var(--border)" }}
        aria-hidden="true"
      />

      {/* Part 2: Interactive Widget */}
      <div className="mb-10 space-y-5">
        <div className="space-y-1">
          <h3
            className="text-base font-bold tracking-wide uppercase"
            style={{ color: "var(--text-tertiary)", fontSize: "0.7rem", letterSpacing: "0.15em" }}
          >
            Part 2
          </h3>
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Run Your Own Oscar Race
          </h3>
          <p className="text-sm" style={{ color: "var(--text-secondary)" }}>
            Rank the five nominees in your preferred order, then count the votes
            to see what happens.
          </p>
        </div>

        <RankingWidget />
      </div>

      {/* How STV Works expandable */}
      <HowSTVWorks />
    </SectionWrapper>
  );
}
