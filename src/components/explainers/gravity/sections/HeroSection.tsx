"use client";

import { useEffect, useRef } from "react";

const HERO_STATS = [
  { value: "9.8 m/s\u00B2", label: "Earth's pull" },
  { value: "1687", label: "Newton's law" },
  { value: "1915", label: "Einstein's upgrade" },
  { value: "?", label: "Still unsolved" },
];

function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const stars: { x: number; y: number; r: number; phase: number }[] = [];

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);

      stars.length = 0;
      const count = Math.floor((rect.width * rect.height) / 3000);
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * rect.width,
          y: Math.random() * rect.height,
          r: Math.random() * 1.2 + 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    resize();
    window.addEventListener("resize", resize);

    const startTime = Date.now();

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const t = (Date.now() - startTime) / 1000;

      ctx.clearRect(0, 0, w, h);

      for (const star of stars) {
        const twinkle = 0.3 + 0.7 * ((Math.sin(t * 0.8 + star.phase) + 1) / 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${twinkle * 0.8})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="gravity-dark-section relative px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl py-20 sm:py-28">
        <div className="relative">
          <Starfield />

          <div className="relative z-10 text-center mb-8">
            <p
              className="text-sm font-semibold tracking-widest uppercase mb-6"
              style={{ color: "#60a5fa", fontFamily: "var(--font-body)" }}
            >
              Interactive Explainer
            </p>
            <h1
              className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold leading-[1.1] mb-8"
              style={{ fontFamily: "var(--font-heading)", color: "#f1f5f9" }}
            >
              What Is{" "}
              <span
                className="bg-clip-text text-transparent"
                style={{
                  backgroundImage:
                    "linear-gradient(135deg, #60a5fa 0%, #a78bfa 50%, #fbbf24 100%)",
                }}
              >
                Gravity
              </span>
              ?
            </h1>
            <p
              className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed mb-4"
              style={{ fontFamily: "var(--font-heading)", color: "#94a3b8", fontStyle: "italic" }}
            >
              &ldquo;Gravity isn&apos;t a force pulling you down.
              It&apos;s the shape of space itself &mdash; and you&apos;re rolling
              toward the heaviest thing nearby.&rdquo;
            </p>
            <p
              className="text-base max-w-2xl mx-auto"
              style={{ fontFamily: "var(--font-body)", color: "#64748b" }}
            >
              From Newton&apos;s apple to Einstein&apos;s spacetime fabric.
              An interactive journey through the force that shapes the universe.
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-4 mt-16 max-w-3xl mx-auto">
            {HERO_STATS.map((stat) => (
              <div
                key={stat.label}
                className="text-center p-4 rounded-xl"
                style={{
                  backgroundColor: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                <p
                  className="text-2xl sm:text-3xl font-bold mb-1"
                  style={{ fontFamily: "var(--font-mono)", color: "#60a5fa" }}
                >
                  {stat.value}
                </p>
                <p
                  className="text-xs sm:text-sm"
                  style={{ fontFamily: "var(--font-body)", color: "#94a3b8" }}
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </div>

          <div className="relative z-10 flex justify-center mt-20">
            <button
              onClick={() =>
                document
                  .getElementById("wrong-picture")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="flex flex-col items-center gap-2 group"
              style={{ color: "#94a3b8" }}
            >
              <span
                className="text-sm"
                style={{ fontFamily: "var(--font-body)" }}
              >
                Scroll to explore
              </span>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
