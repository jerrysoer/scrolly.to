"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const G = 500;
const SUN_RADIUS = 15;
const EARTH_RADIUS = 6;
const TRAIL_LENGTH = 60;

type SimState = "running" | "crashed" | "escaped";

export default function OrbitsSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number>(0);
  const stateRef = useRef<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    trail: { x: number; y: number }[];
    simState: SimState;
  }>({
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    trail: [],
    simState: "running",
  });

  const [speed, setSpeed] = useState(1.0);
  const [simState, setSimState] = useState<SimState>("running");
  const speedRef = useRef(speed);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  const initSim = useCallback((canvasWidth: number, canvasHeight: number, initialSpeed: number) => {
    const cx = canvasWidth / 2;
    const cy = canvasHeight / 2;
    const startX = cx + 120;
    const startY = cy;

    stateRef.current = {
      x: startX,
      y: startY,
      vx: 0,
      vy: -initialSpeed * 2.0,
      trail: [{ x: startX, y: startY }],
      simState: "running",
    };
    setSimState("running");
  }, []);

  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const w = canvas.width / dpr;
    const h = canvas.height / dpr;
    const cx = w / 2;
    const cy = h / 2;
    const state = stateRef.current;

    if (state.simState === "running") {
      const dx = cx - state.x;
      const dy = cy - state.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < SUN_RADIUS + EARTH_RADIUS) {
        state.simState = "crashed";
        setSimState("crashed");
      } else if (dist > Math.max(w, h)) {
        state.simState = "escaped";
        setSimState("escaped");
      } else {
        const force = G / (dist * dist);
        const ax = (dx / dist) * force;
        const ay = (dy / dist) * force;

        state.vx += ax;
        state.vy += ay;
        state.x += state.vx;
        state.y += state.vy;

        state.trail.push({ x: state.x, y: state.y });
        if (state.trail.length > TRAIL_LENGTH) {
          state.trail.shift();
        }
      }
    }

    ctx.clearRect(0, 0, w, h);
    ctx.fillStyle = "#020617";
    ctx.fillRect(0, 0, w, h);

    ctx.fillStyle = "rgba(148, 163, 184, 0.3)";
    for (let i = 0; i < 40; i++) {
      const sx = ((i * 7919 + 104729) % 1000) / 1000 * w;
      const sy = ((i * 6271 + 73856) % 1000) / 1000 * h;
      ctx.fillRect(sx, sy, 1, 1);
    }

    for (let i = 0; i < state.trail.length; i++) {
      const alpha = (i / state.trail.length) * 0.6;
      ctx.beginPath();
      ctx.arc(state.trail[i].x, state.trail[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(96, 165, 250, ${alpha})`;
      ctx.fill();
    }

    const gradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, SUN_RADIUS * 3);
    gradient.addColorStop(0, "rgba(251, 191, 36, 0.3)");
    gradient.addColorStop(1, "rgba(251, 191, 36, 0)");
    ctx.beginPath();
    ctx.arc(cx, cy, SUN_RADIUS * 3, 0, Math.PI * 2);
    ctx.fillStyle = gradient;
    ctx.fill();

    ctx.beginPath();
    ctx.arc(cx, cy, SUN_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = "#f59e0b";
    ctx.fill();

    if (state.simState !== "crashed") {
      ctx.beginPath();
      ctx.arc(state.x, state.y, EARTH_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = "#3b82f6";
      ctx.fill();

      ctx.beginPath();
      ctx.arc(state.x, state.y, EARTH_RADIUS + 3, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(59, 130, 246, 0.3)";
      ctx.lineWidth = 2;
      ctx.stroke();
    }

    if (state.simState === "crashed") {
      ctx.font = `bold 20px sans-serif`;
      ctx.fillStyle = "#ef4444";
      ctx.textAlign = "center";
      ctx.fillText("Crashed!", cx, cy + SUN_RADIUS + 40);
    } else if (state.simState === "escaped") {
      ctx.font = `bold 20px sans-serif`;
      ctx.fillStyle = "#60a5fa";
      ctx.textAlign = "center";
      ctx.fillText("Escaped!", cx, cy + SUN_RADIUS + 40);
    }

    if (state.simState === "running") {
      animFrameRef.current = requestAnimationFrame(drawFrame);
    }
  }, []);

  const setupCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const rect = container.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const w = rect.width;
    const h = Math.min(rect.width * 0.75, 400);

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(dpr, dpr);
    }

    return { w, h };
  }, []);

  const startSimulation = useCallback((spd?: number) => {
    cancelAnimationFrame(animFrameRef.current);

    const dims = setupCanvas();
    if (!dims) return;

    initSim(dims.w, dims.h, spd ?? speedRef.current);
    animFrameRef.current = requestAnimationFrame(drawFrame);
  }, [setupCanvas, initSim, drawFrame]);

  useEffect(() => {
    startSimulation();

    const handleResize = () => {
      if (stateRef.current.simState !== "running") {
        setupCanvas();
        drawFrame();
      } else {
        startSimulation();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => {
      cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener("resize", handleResize);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSpeedChange = useCallback((newSpeed: number) => {
    setSpeed(newSpeed);
    speedRef.current = newSpeed;
    startSimulation(newSpeed);
  }, [startSimulation]);

  const handleReset = useCallback(() => {
    startSimulation();
  }, [startSimulation]);

  return (
    <SectionWrapper id="orbits">
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-start">
        {/* LEFT — Interactive canvas */}
        <div className="w-full lg:w-7/12" ref={containerRef}>
          <canvas
            ref={canvasRef}
            className="rounded-xl w-full"
            style={{ border: "1px solid var(--border)" }}
          />

          <div className="mt-5">
            <div className="flex items-center justify-between mb-2">
              <label
                className="text-sm font-medium"
                style={{ color: "var(--text-secondary)", fontFamily: "var(--font-mono)" }}
              >
                Sideways velocity
              </label>
              <span
                className="text-sm tabular-nums"
                style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
              >
                {speed.toFixed(1)}x
              </span>
            </div>

            <input
              type="range"
              min="0.5"
              max="3.0"
              step="0.1"
              value={speed}
              onChange={(e) => handleSpeedChange(parseFloat(e.target.value))}
              className="w-full"
            />

            <div className="flex justify-between mt-1">
              <span
                className="text-xs font-medium"
                style={{ color: "#ef4444", fontFamily: "var(--font-mono)" }}
              >
                Crash
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--gravity-green)", fontFamily: "var(--font-mono)" }}
              >
                Orbit
              </span>
              <span
                className="text-xs font-medium"
                style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
              >
                Escape
              </span>
            </div>
          </div>

          <button
            onClick={handleReset}
            className="mt-4 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:scale-105 cursor-pointer"
            style={{
              backgroundColor: "var(--bg-secondary)",
              color: "var(--text-primary)",
              border: "1px solid var(--border)",
              fontFamily: "var(--font-mono)",
            }}
          >
            Reset
          </button>
        </div>

        {/* RIGHT — Text */}
        <div className="w-full lg:w-5/12">
          <p
            className="text-sm font-semibold uppercase tracking-widest mb-4"
            style={{ color: "var(--gravity-blue)", fontFamily: "var(--font-mono)" }}
          >
            Section 06
          </p>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}
          >
            Why Orbits{" "}
            <span style={{ color: "var(--gravity-blue)" }}>Don&rsquo;t Crash</span>
          </h2>

          <p
            className="text-lg leading-relaxed mb-8"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            If gravity pulls Earth toward the Sun, why don&rsquo;t we fall in?
            Because Earth is also moving sideways — fast enough that as it falls,
            the Sun&rsquo;s surface curves away. It&rsquo;s permanent
            falling-and-missing.
          </p>

          <p
            className="text-base leading-relaxed mb-6"
            style={{ color: "var(--text-secondary)", fontFamily: "var(--font-body)" }}
          >
            Use the slider to change Earth&rsquo;s initial sideways velocity. Too
            slow and it crashes into the Sun. Too fast and it escapes into deep
            space. Just right, and you get a stable orbit.
          </p>

          <div
            className="rounded-xl p-5"
            style={{
              backgroundColor: "var(--bg-card)",
              border: "1px solid var(--border)",
            }}
          >
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--text-tertiary)", fontFamily: "var(--font-mono)" }}
            >
              The International Space Station orbits at 17,500 mph — falling
              toward Earth every second, but moving sideways fast enough to keep
              missing it. The astronauts inside are in perpetual free-fall.
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
