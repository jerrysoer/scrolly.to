"use client";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-28 sm:px-6"
      style={{ backgroundColor: "var(--bg-primary)" }}
    >
      {/* ── Floating organic leaf shapes ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        {/* Leaf 1 — top-left, forest-green */}
        <svg
          viewBox="0 0 120 180"
          className="absolute"
          style={{
            top: "8%",
            left: "6%",
            width: "clamp(60px, 8vw, 110px)",
            opacity: 0.07,
            fill: "var(--forest-green)",
            animation: "leafDrift1 18s ease-in-out infinite",
          }}
        >
          <path d="M60 170 C10 140 -20 90 20 40 C40 10 80 5 100 40 C130 85 110 145 60 170 Z" />
        </svg>

        {/* Leaf 2 — bottom-right, warm-amber */}
        <svg
          viewBox="0 0 100 160"
          className="absolute"
          style={{
            bottom: "10%",
            right: "5%",
            width: "clamp(50px, 7vw, 90px)",
            opacity: 0.08,
            fill: "var(--warm-amber)",
            animation: "leafDrift2 22s ease-in-out infinite",
          }}
        >
          <path d="M50 155 C5 125 -15 75 18 30 C35 5 70 2 88 35 C115 78 100 130 50 155 Z" />
        </svg>

        {/* Leaf 3 — top-right, warm-amber, rotated */}
        <svg
          viewBox="0 0 80 130"
          className="absolute"
          style={{
            top: "14%",
            right: "10%",
            width: "clamp(40px, 5vw, 72px)",
            opacity: 0.06,
            fill: "var(--warm-amber)",
            transform: "rotate(-35deg)",
            animation: "leafDrift3 26s ease-in-out infinite",
          }}
        >
          <path d="M40 125 C4 100 -10 58 14 22 C26 2 58 0 70 26 C90 62 76 104 40 125 Z" />
        </svg>

        {/* Leaf 4 — lower-left, forest-green, rotated */}
        <svg
          viewBox="0 0 90 140"
          className="absolute"
          style={{
            bottom: "18%",
            left: "8%",
            width: "clamp(45px, 6vw, 80px)",
            opacity: 0.06,
            fill: "var(--forest-green)",
            transform: "rotate(25deg)",
            animation: "leafDrift2 20s ease-in-out infinite reverse",
          }}
        >
          <path d="M45 135 C4 108 -12 64 16 24 C30 2 64 0 78 28 C102 68 86 112 45 135 Z" />
        </svg>

        {/* Leaf 5 — center-right, forest-green, small */}
        <svg
          viewBox="0 0 60 100"
          className="absolute"
          style={{
            top: "45%",
            right: "3%",
            width: "clamp(30px, 4vw, 55px)",
            opacity: 0.05,
            fill: "var(--forest-green)",
            transform: "rotate(15deg)",
            animation: "leafDrift1 30s ease-in-out infinite reverse",
          }}
        >
          <path d="M30 96 C3 76 -8 44 10 16 C18 2 44 0 52 18 C68 46 56 80 30 96 Z" />
        </svg>
      </div>

      {/* ── Radial orbs (existing, kept) ── */}
      <div
        className="pointer-events-none absolute left-1/4 top-1/4 h-72 w-72 rounded-full opacity-10 blur-3xl"
        style={{ backgroundColor: "var(--forest-green)" }}
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full blur-3xl"
        style={{ backgroundColor: "var(--warm-amber)", opacity: 0.08 }}
        aria-hidden="true"
      />

      {/* ── Butterfly silhouette SVG ── */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <svg
          viewBox="0 0 600 400"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            width: "min(90vw, 700px)",
            maxHeight: "80vh",
            opacity: 0.09,
          }}
        >
          <title>Butterfly silhouette illustration</title>
          <defs>
            <radialGradient id="leftWingGrad" cx="35%" cy="45%" r="65%">
              <stop offset="0%" stopColor="var(--forest-green)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--forest-green)" stopOpacity="0.4" />
            </radialGradient>
            <radialGradient id="rightWingGrad" cx="65%" cy="45%" r="65%">
              <stop offset="0%" stopColor="var(--warm-amber)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--warm-amber)" stopOpacity="0.4" />
            </radialGradient>
          </defs>

          {/* ── Left forewing (upper-left) ── */}
          <path
            d="
              M 295 190
              C 270 170, 210 120, 160 80
              C 110 40,  60 30,  40 60
              C 15  95,  30 155, 80 190
              C 120 218, 185 225, 235 215
              C 260 210, 285 200, 295 190
              Z
            "
            fill="url(#leftWingGrad)"
          />

          {/* ── Left hindwing (lower-left) ── */}
          <path
            d="
              M 295 200
              C 275 210, 230 225, 185 240
              C 135 258,  80 260,  55 235
              C 28  208,  38 168,  80 190
              C 120 210, 195 218, 250 210
              C 270 206, 287 202, 295 200
              Z
            "
            fill="url(#leftWingGrad)"
            opacity="0.85"
          />

          {/* ── Right forewing (upper-right) ── */}
          <path
            d="
              M 305 190
              C 330 170, 390 120, 440 80
              C 490 40,  540 30,  560 60
              C 585 95,  570 155, 520 190
              C 480 218, 415 225, 365 215
              C 340 210, 315 200, 305 190
              Z
            "
            fill="url(#rightWingGrad)"
          />

          {/* ── Right hindwing (lower-right) ── */}
          <path
            d="
              M 305 200
              C 325 210, 370 225, 415 240
              C 465 258, 520 260, 545 235
              C 572 208, 562 168, 520 190
              C 480 210, 405 218, 350 210
              C 330 206, 313 202, 305 200
              Z
            "
            fill="url(#rightWingGrad)"
            opacity="0.85"
          />

          {/* ── Wing vein system — left forewing ── */}
          <g stroke="var(--forest-green)" strokeWidth="1.2" fill="none" opacity="0.55">
            {/* Primary costa vein */}
            <path d="M 295 192 C 255 165, 200 130, 140 82" />
            {/* Secondary veins branching */}
            <path d="M 260 175 C 235 185, 190 195, 145 200" />
            <path d="M 225 162 C 195 172, 155 178, 110 175" />
            <path d="M 190 148 C 165 158, 130 162, 92 155" />
            <path d="M 155 132 C 130 142, 100 145, 72 138" />
            {/* Cross veins */}
            <path d="M 235 186 C 220 175, 210 165, 200 152" />
            <path d="M 200 172 C 188 162, 178 150, 170 136" />
            <path d="M 168 158 C 158 148, 148 136, 140 122" />
          </g>

          {/* ── Wing vein system — right forewing ── */}
          <g stroke="var(--warm-amber)" strokeWidth="1.2" fill="none" opacity="0.55">
            <path d="M 305 192 C 345 165, 400 130, 460 82" />
            <path d="M 340 175 C 365 185, 410 195, 455 200" />
            <path d="M 375 162 C 405 172, 445 178, 490 175" />
            <path d="M 410 148 C 435 158, 470 162, 508 155" />
            <path d="M 445 132 C 470 142, 500 145, 528 138" />
            <path d="M 365 186 C 380 175, 390 165, 400 152" />
            <path d="M 400 172 C 412 162, 422 150, 430 136" />
            <path d="M 432 158 C 442 148, 452 136, 460 122" />
          </g>

          {/* ── Wing vein system — left hindwing ── */}
          <g stroke="var(--forest-green)" strokeWidth="1" fill="none" opacity="0.4">
            <path d="M 293 202 C 260 215, 215 228, 165 238" />
            <path d="M 270 208 C 240 218, 200 224, 155 222" />
            <path d="M 245 212 C 215 220, 178 224, 135 218" />
            <path d="M 220 214 C 190 220, 155 222, 112 215" />
            {/* Cross veins hindwing */}
            <path d="M 240 218 C 228 210, 218 202, 210 194" />
            <path d="M 200 222 C 190 214, 180 206, 175 197" />
          </g>

          {/* ── Wing vein system — right hindwing ── */}
          <g stroke="var(--warm-amber)" strokeWidth="1" fill="none" opacity="0.4">
            <path d="M 307 202 C 340 215, 385 228, 435 238" />
            <path d="M 330 208 C 360 218, 400 224, 445 222" />
            <path d="M 355 212 C 385 220, 422 224, 465 218" />
            <path d="M 380 214 C 410 220, 445 222, 488 215" />
            <path d="M 360 218 C 372 210, 382 202, 390 194" />
            <path d="M 400 222 C 410 214, 420 206, 425 197" />
          </g>

          {/* ── Body (abdomen + thorax) ── */}
          <ellipse
            cx="300"
            cy="205"
            rx="7"
            ry="52"
            fill="var(--forest-green)"
            opacity="0.9"
          />
          {/* Thorax bulge */}
          <ellipse
            cx="300"
            cy="187"
            rx="9"
            ry="14"
            fill="var(--forest-green)"
            opacity="0.9"
          />

          {/* ── Antennae ── */}
          <g stroke="var(--forest-green)" strokeWidth="1.5" fill="none" opacity="0.8">
            {/* Left antenna — gentle curve */}
            <path d="M 296 176 C 280 155, 262 130, 248 108" />
            {/* Left club tip */}
            <circle cx="247" cy="105" r="3.5" fill="var(--forest-green)" />
            {/* Right antenna */}
            <path d="M 304 176 C 320 155, 338 130, 352 108" />
            {/* Right club tip */}
            <circle cx="353" cy="105" r="3.5" fill="var(--forest-green)" />
          </g>

          {/* ── Decorative wing spots — left ── */}
          <g fill="var(--forest-green)" opacity="0.35">
            <circle cx="170" cy="145" r="12" />
            <circle cx="120" cy="170" r="8" />
            <circle cx="210" cy="200" r="7" />
          </g>

          {/* ── Decorative wing spots — right ── */}
          <g fill="var(--warm-amber)" opacity="0.35">
            <circle cx="430" cy="145" r="12" />
            <circle cx="480" cy="170" r="8" />
            <circle cx="390" cy="200" r="7" />
          </g>
        </svg>
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 mx-auto max-w-4xl text-center">
        {/* Eyebrow label */}
        <p
          className="font-mono text-xs font-medium uppercase tracking-widest"
          style={{ color: "var(--forest-green)", animation: "fade-in 0.6s ease-out 0.1s both" }}
        >
          scrolly.to &mdash; Interactive Explainer
        </p>

        {/* H1 */}
        <h1
          className="mt-6 font-serif text-5xl font-bold leading-tight sm:text-6xl lg:text-7xl"
          style={{
            color: "var(--text-primary)",
            animation: "rise-up 0.8s ease-out 0.2s both",
          }}
        >
          How Butterflies{" "}
          <span
            style={{
              background: "linear-gradient(135deg, var(--forest-green), var(--warm-amber))",
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Transform
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="mx-auto mt-6 max-w-2xl font-sans text-lg leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            animation: "rise-up 0.8s ease-out 0.35s both",
          }}
        >
          A caterpillar doesn&rsquo;t simply grow wings. It dissolves most of its body into
          soup — and rebuilds from scratch. Here&rsquo;s exactly how.
        </p>

        {/* Reading time */}
        <p
          className="mt-3 font-mono text-xs"
          style={{
            color: "var(--text-tertiary)",
            animation: "fade-in 0.6s ease-out 0.45s both",
          }}
        >
          7 min read
        </p>

        {/* Pull-quote */}
        <blockquote
          className="mx-auto mt-8 max-w-xl font-serif text-lg italic leading-relaxed sm:text-xl"
          style={{
            color: "var(--text-secondary)",
            borderLeft: "3px solid var(--forest-green)",
            paddingLeft: "1.25rem",
            textAlign: "left",
            animation: "rise-up 0.8s ease-out 0.5s both",
          }}
        >
          <span
            style={{
              display: "block",
              fontSize: "2.5rem",
              lineHeight: "0.5",
              color: "var(--forest-green)",
              opacity: 0.35,
              fontFamily: "Georgia, serif",
              marginBottom: "0.25rem",
            }}
            aria-hidden="true"
          >
            &ldquo;
          </span>
          Inside a chrysalis, the caterpillar doesn&rsquo;t just grow wings. It dissolves into
          liquid soup.
        </blockquote>

        {/* Key numbers row */}
        <div
          className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10"
          style={{ animation: "fade-in 0.6s ease-out 0.65s both" }}
        >
          {[
            { value: "4", label: "life stages" },
            { value: "100x", label: "weight before change" },
            { value: "10-14", label: "days inside chrysalis" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p
                className="font-mono text-3xl font-bold sm:text-4xl"
                style={{ color: "var(--forest-green)" }}
              >
                {stat.value}
              </p>
              <p className="mt-1 font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Scroll cue */}
        <div
          className="mt-16 flex flex-col items-center gap-2"
          style={{ animation: "fade-in 0.6s ease-out 0.8s both" }}
        >
          <p className="font-sans text-sm" style={{ color: "var(--text-tertiary)" }}>
            Scroll to explore
          </p>
          <svg
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="none"
            style={{ color: "var(--text-tertiary)", animation: "float 2s ease-in-out infinite" }}
            aria-hidden="true"
          >
            <path
              d="M10 4v12M5 11l5 5 5-5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      {/* ── Leaf drift keyframes (inline style tag) ── */}
      <style>{`
        @keyframes leafDrift1 {
          0%   { transform: translateY(0px)   rotate(0deg)   scale(1);    }
          25%  { transform: translateY(-18px) rotate(6deg)   scale(1.04); }
          50%  { transform: translateY(-8px)  rotate(-4deg)  scale(0.97); }
          75%  { transform: translateY(-22px) rotate(8deg)   scale(1.02); }
          100% { transform: translateY(0px)   rotate(0deg)   scale(1);    }
        }
        @keyframes leafDrift2 {
          0%   { transform: translateY(0px)   rotate(0deg)   scale(1);    }
          30%  { transform: translateY(-14px) rotate(-5deg)  scale(1.03); }
          60%  { transform: translateY(-24px) rotate(7deg)   scale(0.98); }
          80%  { transform: translateY(-10px) rotate(-3deg)  scale(1.01); }
          100% { transform: translateY(0px)   rotate(0deg)   scale(1);    }
        }
        @keyframes leafDrift3 {
          0%   { transform: translateY(0px)   rotate(-35deg) scale(1);    }
          35%  { transform: translateY(-20px) rotate(-28deg) scale(1.05); }
          65%  { transform: translateY(-6px)  rotate(-40deg) scale(0.96); }
          100% { transform: translateY(0px)   rotate(-35deg) scale(1);    }
        }
      `}</style>
    </section>
  );
}
