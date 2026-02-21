"use client";

import { useEffect, useRef } from "react";
import { Clock, ChevronDown } from "lucide-react";

// ─── Animated background: neural network topology dots + connecting lines ────

function NeuralBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animFrame: number;
    let width = 0;
    let height = 0;

    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
    }

    const NODES = 38;
    const MAX_DIST = 160;
    const nodes: Node[] = [];

    function resize() {
      width = canvas!.width = canvas!.offsetWidth;
      height = canvas!.height = canvas!.offsetHeight;
    }

    function init() {
      nodes.length = 0;
      for (let i = 0; i < NODES; i++) {
        nodes.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 0.25,
          vy: (Math.random() - 0.5) * 0.25,
        });
      }
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);

      // Move nodes
      for (const n of nodes) {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.04;
            ctx!.beginPath();
            ctx!.moveTo(nodes[i].x, nodes[i].y);
            ctx!.lineTo(nodes[j].x, nodes[j].y);
            ctx!.strokeStyle = `rgba(74,144,217,${alpha})`;
            ctx!.lineWidth = 1;
            ctx!.stroke();
          }
        }
      }

      // Draw dots
      for (const n of nodes) {
        ctx!.beginPath();
        ctx!.arc(n.x, n.y, 2, 0, Math.PI * 2);
        ctx!.fillStyle = "rgba(74,144,217,0.05)";
        ctx!.fill();
      }

      animFrame = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => {
      resize();
      init();
    });
    ro.observe(canvas);

    resize();
    init();
    draw();

    return () => {
      cancelAnimationFrame(animFrame);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ opacity: 1 }}
    />
  );
}

// ─── Brain/Neural SVG illustration ────────────────────────────────────────────

function NeuralBrainIllustration() {
  return (
    <svg
      viewBox="0 0 520 320"
      role="img"
      aria-labelledby="hero-svg-title"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full max-w-[520px] mx-auto"
      style={{ minWidth: 300 }}
    >
      <title id="hero-svg-title">
        Neural network brain emitting verified (green) and hallucinated (red) tokens
      </title>

      {/* Glow filter */}
      <defs>
        <filter id="hero-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="hero-glow-red" x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="5" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <radialGradient id="brain-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--accent-purple)" stopOpacity="0.3" />
          <stop offset="100%" stopColor="var(--forward-blue)" stopOpacity="0.05" />
        </radialGradient>
      </defs>

      {/* Background glow behind brain */}
      <ellipse cx="180" cy="160" rx="120" ry="100" fill="url(#brain-grad)" />

      {/* ── Brain shape (stylized, two lobes) ── */}
      {/* Left lobe */}
      <path
        d="M120,170 C105,140 108,110 125,100 C138,92 150,95 158,105
           C162,90 175,82 190,85 C205,88 212,100 210,115
           C222,108 235,112 238,125 C242,140 232,155 220,158
           C225,172 218,188 205,192 C192,196 180,188 175,178
           C168,190 152,196 140,190 C128,184 118,178 120,170 Z"
        fill="none"
        stroke="var(--accent-purple)"
        strokeWidth="2"
        strokeLinejoin="round"
        opacity="0.7"
      />
      {/* Right lobe */}
      <path
        d="M180,155 C182,145 188,138 198,136 C210,134 220,142 220,155
           C228,148 238,150 242,160 C246,172 238,182 228,182
           C226,190 218,196 208,194 C198,192 192,185 192,177
           C184,178 177,172 180,165 Z"
        fill="none"
        stroke="var(--forward-blue)"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.5"
      />

      {/* Neural network nodes inside the brain */}
      {[
        [145, 130], [165, 120], [185, 135], [200, 125], [175, 150],
        [155, 155], [195, 155], [168, 170], [185, 168], [210, 162],
      ].map(([cx, cy], i) => (
        <circle
          key={i}
          cx={cx}
          cy={cy}
          r="4"
          fill="var(--accent-purple)"
          opacity="0.5"
          filter="url(#hero-glow)"
        />
      ))}

      {/* Node connections */}
      {[
        [145, 130, 165, 120], [165, 120, 185, 135], [185, 135, 200, 125],
        [165, 120, 175, 150], [185, 135, 175, 150], [200, 125, 195, 155],
        [175, 150, 155, 155], [175, 150, 195, 155], [155, 155, 168, 170],
        [195, 155, 185, 168], [185, 168, 210, 162], [168, 170, 185, 168],
      ].map(([x1, y1, x2, y2], i) => (
        <line
          key={i}
          x1={x1} y1={y1} x2={x2} y2={y2}
          stroke="var(--forward-blue)"
          strokeWidth="1"
          opacity="0.3"
        />
      ))}

      {/* ── Output token stream arrows ── */}
      {/* Arrow from brain to tokens */}
      <path
        d="M248,155 L290,155"
        stroke="var(--text-tertiary)"
        strokeWidth="1.5"
        strokeDasharray="4 3"
        opacity="0.4"
        markerEnd="url(#arrow)"
      />
      <defs>
        <marker id="arrow" markerWidth="6" markerHeight="6" refX="5" refY="3" orient="auto">
          <path d="M0,0 L6,3 L0,6 Z" fill="var(--text-tertiary)" opacity="0.4" />
        </marker>
      </defs>

      {/* ── Token bubbles: green = verified, red = hallucinated ── */}

      {/* Token 1: verified — "Paris" */}
      <g filter="url(#hero-glow)" style={{ animation: "none" }}>
        <rect x="295" y="60" width="72" height="30" rx="6"
          fill="var(--verified-green)" fillOpacity="0.15"
          stroke="var(--verified-green)" strokeWidth="1.5" />
        <text x="331" y="79" textAnchor="middle"
          fill="var(--verified-green)" fontSize="12" fontFamily="monospace" fontWeight="600">
          &ldquo;Paris&rdquo;
        </text>
      </g>

      {/* Token 2: hallucinated — "Varghese v." */}
      <g filter="url(#hero-glow-red)">
        <rect x="295" y="103" width="96" height="30" rx="6"
          fill="var(--hallucination-red)" fillOpacity="0.15"
          stroke="var(--hallucination-red)" strokeWidth="1.5" />
        <text x="343" y="122" textAnchor="middle"
          fill="var(--hallucination-red)" fontSize="12" fontFamily="monospace" fontWeight="600">
          &ldquo;Varghese v.&rdquo;
        </text>
      </g>

      {/* Token 3: verified — "1969" */}
      <g filter="url(#hero-glow)">
        <rect x="295" y="146" width="68" height="30" rx="6"
          fill="var(--verified-green)" fillOpacity="0.15"
          stroke="var(--verified-green)" strokeWidth="1.5" />
        <text x="329" y="165" textAnchor="middle"
          fill="var(--verified-green)" fontSize="12" fontFamily="monospace" fontWeight="600">
          &ldquo;1969&rdquo;
        </text>
      </g>

      {/* Token 4: hallucinated — "677 F.3d" */}
      <g filter="url(#hero-glow-red)">
        <rect x="295" y="189" width="84" height="30" rx="6"
          fill="var(--hallucination-red)" fillOpacity="0.15"
          stroke="var(--hallucination-red)" strokeWidth="1.5" />
        <text x="337" y="208" textAnchor="middle"
          fill="var(--hallucination-red)" fontSize="12" fontFamily="monospace" fontWeight="600">
          &ldquo;677 F.3d&rdquo;
        </text>
      </g>

      {/* Token 5: verified — "true" */}
      <g filter="url(#hero-glow)">
        <rect x="295" y="232" width="64" height="30" rx="6"
          fill="var(--verified-green)" fillOpacity="0.15"
          stroke="var(--verified-green)" strokeWidth="1.5" />
        <text x="327" y="251" textAnchor="middle"
          fill="var(--verified-green)" fontSize="12" fontFamily="monospace" fontWeight="600">
          &ldquo;true&rdquo;
        </text>
      </g>

      {/* Connecting lines from arrow endpoint to tokens */}
      {[75, 118, 161, 204, 247].map((ty, i) => (
        <line key={i} x1="290" y1="155" x2="295" y2={ty}
          stroke="var(--text-tertiary)" strokeWidth="1" strokeDasharray="3 3" opacity="0.25" />
      ))}

      {/* Legend */}
      <g>
        <circle cx="300" cy="290" r="5" fill="var(--verified-green)" opacity="0.8" />
        <text x="310" y="294" fill="var(--verified-green)" fontSize="10" fontFamily="monospace" opacity="0.8">
          verified
        </text>
        <circle cx="368" cy="290" r="5" fill="var(--hallucination-red)" opacity="0.8" />
        <text x="378" y="294" fill="var(--hallucination-red)" fontSize="10" fontFamily="monospace" opacity="0.8">
          hallucinated
        </text>
      </g>
    </svg>
  );
}

// ─── HeroSection ──────────────────────────────────────────────────────────────

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 py-24 overflow-hidden"
    >
      {/* Animated neural background */}
      <NeuralBackground />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto w-full flex flex-col items-center gap-10 lg:flex-row lg:items-center lg:gap-16">

        {/* Left: text */}
        <div className="flex-1 text-center lg:text-left max-w-xl">
          {/* Hook quote */}
          <blockquote
            className="font-serif text-sm sm:text-base italic leading-relaxed mb-8 border-l-2 pl-4 text-left"
            style={{
              borderColor: "var(--hallucination-red)",
              color: "var(--text-secondary)",
            }}
          >
            &ldquo;ChatGPT once cited six court cases to a lawyer. Every single case was
            made up. The AI wasn&rsquo;t lying &mdash; it didn&rsquo;t know how to say
            &lsquo;I don&rsquo;t know.&rsquo;&rdquo;
          </blockquote>

          {/* Label */}
          <p
            className="font-mono text-xs uppercase tracking-widest mb-4"
            style={{ color: "var(--forward-blue)" }}
          >
            Interactive Explainer
          </p>

          {/* Main title */}
          <h1
            className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            style={{ color: "var(--text-primary)" }}
          >
            Why Do AIs
            <br />
            <span style={{ color: "var(--hallucination-red)" }}>Hallucinate?</span>
          </h1>

          {/* Subtitle */}
          <p
            className="font-sans text-base sm:text-lg leading-relaxed mb-6 max-w-md lg:max-w-none"
            style={{ color: "var(--text-secondary)" }}
          >
            An interactive exploration of why AI language models confidently state
            false information — and what we can do about it.
          </p>

          {/* Reading time */}
          <div
            className="inline-flex items-center gap-2 font-mono text-xs"
            style={{ color: "var(--text-tertiary)" }}
          >
            <Clock size={14} aria-hidden="true" />
            <span>~8 min read</span>
          </div>
        </div>

        {/* Right: SVG illustration */}
        <div className="flex-1 w-full max-w-sm lg:max-w-none">
          <NeuralBrainIllustration />
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1"
        style={{ color: "var(--text-tertiary)" }}
        aria-label="Scroll to continue"
      >
        <span className="font-mono text-xs uppercase tracking-widest mb-1" style={{ color: "var(--text-tertiary)" }}>
          scroll
        </span>
        <ChevronDown
          size={24}
          aria-hidden="true"
          style={{
            animation: "bounce-down 1.6s ease-in-out infinite",
          }}
        />
      </div>
    </section>
  );
}
