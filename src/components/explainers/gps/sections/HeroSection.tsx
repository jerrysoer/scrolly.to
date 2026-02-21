"use client";

import { useEffect, useRef } from "react";
import { SATELLITE_FACTS } from "@/lib/explainers/gps";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

function OrbitalVisualization() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener("resize", resize);

    const ORBITAL_PLANES = 6;
    const SATS_PER_PLANE = 5;
    const startTime = Date.now();

    const draw = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      const cx = w / 2;
      const cy = h / 2;
      const earthR = Math.min(w, h) * 0.12;
      const orbitR = Math.min(w, h) * 0.38;
      const elapsed = (Date.now() - startTime) / 1000;

      ctx.clearRect(0, 0, w, h);

      // Stars
      ctx.save();
      for (let i = 0; i < 80; i++) {
        const sx = (i * 137.508) % w;
        const sy = (i * 71.137) % h;
        const brightness = 0.2 + 0.3 * Math.sin(elapsed * 0.5 + i);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.8, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      // Earth glow
      const glow = ctx.createRadialGradient(
        cx,
        cy,
        earthR * 0.5,
        cx,
        cy,
        earthR * 2
      );
      glow.addColorStop(0, "rgba(74,144,217,0.15)");
      glow.addColorStop(1, "rgba(74,144,217,0)");
      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(cx, cy, earthR * 2, 0, Math.PI * 2);
      ctx.fill();

      // Earth
      const earthGrad = ctx.createRadialGradient(
        cx - earthR * 0.3,
        cy - earthR * 0.3,
        earthR * 0.1,
        cx,
        cy,
        earthR
      );
      earthGrad.addColorStop(0, "#5BA3E8");
      earthGrad.addColorStop(0.5, "#2E7BBF");
      earthGrad.addColorStop(1, "#1A4A7A");
      ctx.fillStyle = earthGrad;
      ctx.beginPath();
      ctx.arc(cx, cy, earthR, 0, Math.PI * 2);
      ctx.fill();

      // Continents hint
      ctx.fillStyle = "rgba(76,175,80,0.3)";
      ctx.beginPath();
      ctx.ellipse(
        cx - earthR * 0.1,
        cy - earthR * 0.2,
        earthR * 0.3,
        earthR * 0.2,
        -0.3,
        0,
        Math.PI * 2
      );
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(
        cx + earthR * 0.2,
        cy + earthR * 0.1,
        earthR * 0.2,
        earthR * 0.35,
        0.2,
        0,
        Math.PI * 2
      );
      ctx.fill();

      // Orbital paths and satellites
      for (let p = 0; p < ORBITAL_PLANES; p++) {
        const tilt = (p * Math.PI) / ORBITAL_PLANES;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(tilt);
        ctx.strokeStyle = "rgba(74,144,217,0.15)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.ellipse(0, 0, orbitR, orbitR * 0.4, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();

        for (let s = 0; s < SATS_PER_PLANE; s++) {
          const angle =
            (s / SATS_PER_PLANE) * Math.PI * 2 +
            elapsed * 0.15 +
            (p * Math.PI) / 3;

          const sx2 =
            cx +
            Math.cos(tilt) * Math.cos(angle) * orbitR -
            Math.sin(tilt) * Math.sin(angle) * orbitR * 0.4;
          const sy2 =
            cy +
            Math.sin(tilt) * Math.cos(angle) * orbitR +
            Math.cos(tilt) * Math.sin(angle) * orbitR * 0.4;

          const distFromCenter = Math.sqrt(
            (sx2 - cx) ** 2 + (sy2 - cy) ** 2
          );
          const sinAngle = Math.sin(angle);
          const isBehind = sinAngle > 0.3 && distFromCenter < orbitR * 0.5;

          if (isBehind) continue;

          if ((s + p) % 3 === 0) {
            const signalAlpha = 0.1 + 0.05 * Math.sin(elapsed * 2 + p + s);
            ctx.strokeStyle = `rgba(74,144,217,${signalAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.setLineDash([2, 6]);
            ctx.beginPath();
            ctx.moveTo(sx2, sy2);
            ctx.lineTo(cx, cy);
            ctx.stroke();
            ctx.setLineDash([]);
          }

          const satGlow = ctx.createRadialGradient(sx2, sy2, 0, sx2, sy2, 6);
          satGlow.addColorStop(0, "rgba(255,255,255,0.9)");
          satGlow.addColorStop(0.5, "rgba(74,144,217,0.6)");
          satGlow.addColorStop(1, "rgba(74,144,217,0)");
          ctx.fillStyle = satGlow;
          ctx.beginPath();
          ctx.arc(sx2, sy2, 6, 0, Math.PI * 2);
          ctx.fill();

          ctx.fillStyle = "#fff";
          ctx.beginPath();
          ctx.arc(sx2, sy2, 2, 0, Math.PI * 2);
          ctx.fill();
        }
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
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-2xl"
        style={{ background: "#0a0f1a" }}
      />
    </div>
  );
}

export default function HeroSection() {
  return (
    <SectionWrapper id="hero" className="gps-hero-dark">
      <div className="text-center mb-8">
        <p
          className="text-sm font-semibold tracking-widest uppercase mb-4"
          style={{ color: "#5B9FE8", fontFamily: "var(--font-inter)" }}
        >
          Interactive Explainer
        </p>
        <h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
          style={{ fontFamily: "var(--font-fraunces)", color: "#E8E8E3" }}
        >
          31 Satellites,
          <br />
          <span style={{ color: "#5B9FE8" }}>20,200 Kilometers Up</span>
        </h1>
        <p
          className="text-lg sm:text-xl max-w-2xl mx-auto leading-relaxed mb-12"
          style={{ fontFamily: "var(--font-inter)", color: "#A8A8A0" }}
        >
          How a constellation of atomic clocks orbiting Earth at 14,000 km/h
          pinpoints your location to within a few meters. From military secret
          to the chip in your pocket.
        </p>
      </div>

      <OrbitalVisualization />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-12">
        {SATELLITE_FACTS.map((fact) => (
          <div
            key={fact.label}
            className="text-center p-4 rounded-xl"
            style={{
              backgroundColor: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            <p
              className="text-2xl sm:text-3xl font-bold mb-1"
              style={{
                fontFamily: "var(--font-jetbrains)",
                color: "#5B9FE8",
              }}
            >
              {fact.value}
            </p>
            <p
              className="text-xs sm:text-sm font-medium"
              style={{ fontFamily: "var(--font-inter)", color: "#A8A8A0" }}
            >
              {fact.label}
            </p>
            <p
              className="text-xs mt-1"
              style={{ fontFamily: "var(--font-inter)", color: "#6A6A62" }}
            >
              {fact.description}
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-16">
        <button
          onClick={() =>
            document
              .getElementById("atomic-clocks")
              ?.scrollIntoView({ behavior: "smooth" })
          }
          className="flex flex-col items-center gap-2 group"
          style={{ color: "#A8A8A0" }}
        >
          <span
            className="text-sm"
            style={{ fontFamily: "var(--font-inter)" }}
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
    </SectionWrapper>
  );
}
