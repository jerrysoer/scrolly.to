"use client";

import { useEffect, useRef, useState } from "react";

function SpacetimeFabric() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const [sunPlaced, setSunPlaced] = useState(false);
  const sunRef = useRef({ placed: false, x: 0, y: 0 });

  useEffect(() => {
    sunRef.current.placed = sunPlaced;
  }, [sunPlaced]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sunRef.current.x = w / 2;
      sunRef.current.y = h / 2;
    };

    resize();
    window.addEventListener("resize", resize);

    const GRID_SPACING = 30;
    const SUN_MASS = 4000;
    const SUN_RADIUS = 22;
    let earthAngle = 0;
    const startTime = Date.now();

    const draw = () => {
      const t = (Date.now() - startTime) / 1000;
      ctx.clearRect(0, 0, w, h);

      const sunX = sunRef.current.x;
      const sunY = sunRef.current.y;
      const placed = sunRef.current.placed;

      const cols = Math.ceil(w / GRID_SPACING) + 1;
      const rows = Math.ceil(h / GRID_SPACING) + 1;

      const getDisplacement = (gx: number, gy: number): [number, number] => {
        if (!placed) return [gx, gy];
        const dx = gx - sunX;
        const dy = gy - sunY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 5) return [gx, gy];

        const warpStrength = SUN_MASS / (dist * dist + 200);
        const cappedWarp = Math.min(warpStrength, GRID_SPACING * 0.8);

        const nx = dx / dist;
        const ny = dy / dist;
        return [
          gx - nx * cappedWarp * 0.3,
          gy - ny * cappedWarp * 0.3 + cappedWarp * 0.7,
        ];
      };

      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const gx = c * GRID_SPACING;
          const gy = r * GRID_SPACING;
          const [px, py] = getDisplacement(gx, gy);
          if (c === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(96, 165, 250, 0.2)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const gx = c * GRID_SPACING;
          const gy = r * GRID_SPACING;
          const [px, py] = getDisplacement(gx, gy);
          if (r === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.strokeStyle = "rgba(96, 165, 250, 0.15)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      if (placed) {
        const glow = ctx.createRadialGradient(sunX, sunY, SUN_RADIUS * 0.5, sunX, sunY, SUN_RADIUS * 4);
        glow.addColorStop(0, "rgba(251, 191, 36, 0.2)");
        glow.addColorStop(1, "rgba(251, 191, 36, 0)");
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(sunX, sunY, SUN_RADIUS * 4, 0, Math.PI * 2);
        ctx.fill();

        const sunGrad = ctx.createRadialGradient(
          sunX - SUN_RADIUS * 0.3,
          sunY - SUN_RADIUS * 0.3,
          SUN_RADIUS * 0.1,
          sunX,
          sunY,
          SUN_RADIUS
        );
        sunGrad.addColorStop(0, "#fde68a");
        sunGrad.addColorStop(0.5, "#fbbf24");
        sunGrad.addColorStop(1, "#d97706");
        ctx.fillStyle = sunGrad;
        ctx.beginPath();
        ctx.arc(sunX, sunY, SUN_RADIUS, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(251, 191, 36, 0.8)";
        ctx.font = "11px var(--font-mono)";
        ctx.textAlign = "center";
        ctx.fillText("Sun", sunX, sunY - SUN_RADIUS - 8);

        const orbitRadius = Math.min(w, h) * 0.28;
        earthAngle += 0.012;
        const earthX = sunX + Math.cos(earthAngle) * orbitRadius;
        const earthY = sunY + Math.sin(earthAngle) * orbitRadius * 0.85;

        ctx.strokeStyle = "rgba(96, 165, 250, 0.12)";
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 8]);
        ctx.beginPath();
        ctx.ellipse(sunX, sunY, orbitRadius, orbitRadius * 0.85, 0, 0, Math.PI * 2);
        ctx.stroke();
        ctx.setLineDash([]);

        for (let i = 1; i <= 20; i++) {
          const trailAngle = earthAngle - i * 0.015;
          const tx = sunX + Math.cos(trailAngle) * orbitRadius;
          const ty = sunY + Math.sin(trailAngle) * orbitRadius * 0.85;
          ctx.fillStyle = `rgba(96, 165, 250, ${0.4 * (1 - i / 20)})`;
          ctx.beginPath();
          ctx.arc(tx, ty, 3 * (1 - i / 25), 0, Math.PI * 2);
          ctx.fill();
        }

        const earthGlow = ctx.createRadialGradient(earthX, earthY, 2, earthX, earthY, 14);
        earthGlow.addColorStop(0, "rgba(96, 165, 250, 0.4)");
        earthGlow.addColorStop(1, "rgba(96, 165, 250, 0)");
        ctx.fillStyle = earthGlow;
        ctx.beginPath();
        ctx.arc(earthX, earthY, 14, 0, Math.PI * 2);
        ctx.fill();

        const earthGrad = ctx.createRadialGradient(
          earthX - 2,
          earthY - 2,
          1,
          earthX,
          earthY,
          7
        );
        earthGrad.addColorStop(0, "#93c5fd");
        earthGrad.addColorStop(0.6, "#3b82f6");
        earthGrad.addColorStop(1, "#1d4ed8");
        ctx.fillStyle = earthGrad;
        ctx.beginPath();
        ctx.arc(earthX, earthY, 7, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "rgba(96, 165, 250, 0.8)";
        ctx.font = "11px var(--font-mono)";
        ctx.textAlign = "center";
        ctx.fillText("Earth", earthX, earthY - 14);
      }

      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137.508 + 50) % w);
        const sy = ((i * 71.137 + 30) % h);
        const brightness = 0.15 + 0.15 * Math.sin(t * 0.5 + i * 2.1);
        ctx.fillStyle = `rgba(255,255,255,${brightness})`;
        ctx.beginPath();
        ctx.arc(sx, sy, 0.7, 0, Math.PI * 2);
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

  const handleCanvasClick = () => {
    setSunPlaced((prev) => !prev);
  };

  return (
    <div className="relative w-full" style={{ minHeight: "400px" }}>
      <canvas
        ref={canvasRef}
        className="w-full rounded-2xl cursor-pointer"
        style={{ background: "#020617", height: "450px" }}
        onClick={handleCanvasClick}
      />
      <div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full text-sm"
        style={{
          backgroundColor: "rgba(255,255,255,0.08)",
          color: "#94a3b8",
          fontFamily: "var(--font-body)",
          backdropFilter: "blur(8px)",
        }}
      >
        {sunPlaced ? "Tap to remove the Sun" : "Tap to place the Sun"}
      </div>
    </div>
  );
}

export default function TrampolineSection() {
  return (
    <section
      id="trampoline"
      className="gravity-dark-section relative px-4 sm:px-6"
    >
      <div className="mx-auto max-w-5xl py-20 sm:py-28">
        <div className="text-center mb-10">
          <p
            className="text-sm font-semibold tracking-widest uppercase mb-4"
            style={{ color: "#fbbf24", fontFamily: "var(--font-body)" }}
          >
            Section 5
          </p>
          <h2
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "#f1f5f9" }}
          >
            The Trampoline{" "}
            <span style={{ color: "#fbbf24" }}>Analogy</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "#94a3b8", fontFamily: "var(--font-body)" }}
          >
            Einstein&apos;s upgrade: space isn&apos;t empty.
            It&apos;s a fabric. Mass bends that fabric &mdash; like a bowling ball on a trampoline.
            Other objects roll toward the dent.
          </p>
        </div>

        <SpacetimeFabric />

        <div className="mt-10 max-w-2xl mx-auto text-center">
          <div
            className="rounded-2xl p-6 sm:p-8 mb-8"
            style={{
              backgroundColor: "rgba(251, 191, 36, 0.08)",
              border: "1px solid rgba(251, 191, 36, 0.15)",
            }}
          >
            <p
              className="text-xl sm:text-2xl font-bold mb-3"
              style={{ fontFamily: "var(--font-heading)", color: "#fbbf24" }}
            >
              You&apos;re not being pulled &mdash; you&apos;re following the curve
            </p>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "#94a3b8", fontFamily: "var(--font-body)" }}
            >
              That rolling IS gravity. Every object with mass creates a dip in the fabric of space.
              The bigger the mass, the deeper the dip. Other objects naturally follow those curves &mdash;
              not because they&apos;re being pulled, but because curved space IS the shortest path.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
