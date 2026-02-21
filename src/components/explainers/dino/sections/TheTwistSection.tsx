"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function TRexSkeleton() {
  return (
    <svg viewBox="0 0 200 180" className="w-full max-w-[200px]">
      {/* Spine */}
      <path
        d="M40 60 Q60 50 80 55 Q100 50 120 55 Q140 50 160 60"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Skull */}
      <path
        d="M30 55 Q20 40 25 30 Q30 20 45 22 Q55 25 55 35 Q55 50 40 60"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2.5"
      />
      {/* Jaw */}
      <path
        d="M30 55 Q25 60 30 62 Q40 65 50 58"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2"
      />
      {/* Teeth */}
      {[30, 34, 38, 42].map((x) => (
        <line
          key={x}
          x1={x}
          y1={55}
          x2={x + 1}
          y2={60}
          stroke="var(--firestorm)"
          strokeWidth="1.5"
        />
      ))}
      {/* Eye socket */}
      <circle cx="38" cy="35" r="4" fill="none" stroke="var(--firestorm)" strokeWidth="1.5" />
      {/* Ribs */}
      {[80, 95, 110, 125].map((x) => (
        <path
          key={x}
          d={`M${x} 55 Q${x - 5} 75 ${x - 10} 95`}
          fill="none"
          stroke="var(--firestorm)"
          strokeWidth="1.5"
        />
      ))}
      {/* Tiny arms */}
      <path
        d="M65 62 Q60 72 55 78"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2"
      />
      <path
        d="M55 78 Q52 80 50 78"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="1.5"
      />
      {/* Back legs */}
      <path
        d="M130 60 Q125 90 120 110 Q118 125 115 140"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2.5"
      />
      <path
        d="M115 140 L105 142 L120 145"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2"
      />
      <path
        d="M145 60 Q150 90 148 110 Q150 125 152 140"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2.5"
      />
      <path
        d="M152 140 L142 142 L157 145"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2"
      />
      {/* Tail */}
      <path
        d="M160 60 Q175 55 190 65 Q195 68 200 75"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      {/* Pelvis */}
      <path
        d="M125 55 Q135 70 145 55"
        fill="none"
        stroke="var(--firestorm)"
        strokeWidth="2"
      />
      {/* Label */}
      <text
        x="100"
        y="170"
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize="11"
        fontFamily="var(--font-jetbrains)"
      >
        T-Rex
      </text>
    </svg>
  );
}

function ChickenSkeleton() {
  return (
    <svg viewBox="0 0 120 180" className="w-full max-w-[120px]">
      {/* Spine */}
      <path
        d="M30 70 Q45 65 60 68 Q75 65 85 70"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* Skull */}
      <path
        d="M22 65 Q15 55 20 48 Q25 42 33 44 Q38 47 36 55 Q34 62 28 68"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.8"
      />
      {/* Beak */}
      <path
        d="M18 55 L10 54 L18 58"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
      />
      {/* Eye */}
      <circle cx="26" cy="50" r="2.5" fill="none" stroke="var(--life-green)" strokeWidth="1" />
      {/* Ribs */}
      {[45, 55, 65].map((x) => (
        <path
          key={x}
          d={`M${x} 68 Q${x - 3} 78 ${x - 5} 88`}
          fill="none"
          stroke="var(--life-green)"
          strokeWidth="1.2"
        />
      ))}
      {/* Wing bones */}
      <path
        d="M50 70 Q45 60 40 55 L35 52"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
      />
      {/* Keel/breastbone */}
      <path
        d="M50 72 Q48 85 50 95"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
      />
      {/* Legs */}
      <path
        d="M70 72 Q68 95 65 110 Q63 120 60 130"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="2"
      />
      <path
        d="M60 130 L52 133 L62 135 L68 132"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
      />
      <path
        d="M80 72 Q82 95 84 110 Q85 120 86 130"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="2"
      />
      <path
        d="M86 130 L78 133 L88 135 L94 132"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
      />
      {/* Tail */}
      <path
        d="M85 70 Q92 68 95 72"
        fill="none"
        stroke="var(--life-green)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      {/* Label */}
      <text
        x="55"
        y="170"
        textAnchor="middle"
        fill="var(--text-tertiary)"
        fontSize="11"
        fontFamily="var(--font-jetbrains)"
      >
        Chicken
      </text>
    </svg>
  );
}

export default function TheTwistSection() {
  return (
    <SectionWrapper id="the-twist">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Left content */}
        <div className="order-2 lg:order-1">
          <p className="font-mono text-xs font-medium uppercase tracking-widest text-firestorm">
            Section 7
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-text-primary sm:text-4xl">
            The Twist
          </h2>
          <p className="mt-4 font-sans text-base leading-relaxed text-text-secondary">
            The dinosaurs never actually went extinct. One lineage survived &mdash;
            and thrived. Birds are theropod dinosaurs, classified within{" "}
            <span className="font-semibold text-text-primary">
              class Dinosauria
            </span>
            . Every sparrow, eagle, and chicken is technically a dinosaur.
          </p>

          <div className="mt-6 space-y-4">
            <div className="rounded-lg bg-bg-secondary p-4">
              <p className="font-mono text-sm font-bold text-life-green">
                10,000 species
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                of dinosaurs alive today &mdash; more than mammals (6,400)
              </p>
            </div>

            <div className="rounded-lg bg-bg-secondary p-4">
              <p className="text-sm text-text-secondary">
                <span className="font-mono font-bold text-firestorm">
                  DNA fact:
                </span>{" "}
                T-Rex shares more DNA with a chicken than with a Stegosaurus.
                Stegosaurus lived 80 million years before T-Rex &mdash; further
                in the past than T-Rex is from us.
              </p>
            </div>
          </div>
        </div>

        {/* Right — Skeleton comparison */}
        <div className="order-1 lg:order-2 flex items-center justify-center">
          <div className="flex items-end gap-6 sm:gap-10 rounded-2xl border border-border bg-bg-card p-6 sm:p-10">
            <TRexSkeleton />
            <div className="flex flex-col items-center gap-2 self-center">
              <svg viewBox="0 0 40 20" className="w-10 text-text-tertiary">
                <path
                  d="M2 10 L30 10 M26 5 L32 10 L26 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
              <p className="text-[10px] font-mono text-text-tertiary text-center">
                same<br />lineage
              </p>
              <svg viewBox="0 0 40 20" className="w-10 text-text-tertiary rotate-180">
                <path
                  d="M2 10 L30 10 M26 5 L32 10 L26 15"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <ChickenSkeleton />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
