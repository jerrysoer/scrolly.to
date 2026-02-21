"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

// Animated counter that counts from 0 to target
function AnimatedCounter({ target }: { target: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasAnimated(true);
          const duration = 1500; // 1.5 seconds
          const start = performance.now();
          const startValue = 0;

          const animate = (currentTime: number) => {
            const elapsed = currentTime - start;
            const progress = Math.min(elapsed / duration, 1);

            // Ease-out cubic
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(startValue + (target - startValue) * easeOut);

            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(animate);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(animate);
          observer.unobserve(el);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target, hasAnimated]);

  return (
    <div ref={ref} className="text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight">
      {count.toLocaleString()}
    </div>
  );
}

// Animated globe with cookie boxes orbiting
function GlobeIllustration() {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<SVGSVGElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const cookieTypes = [
    { name: 'Thin\nMints', color: '#4A7C59', accent: '#5A8C6A' },
    { name: 'Samoas', color: '#8B5A8E', accent: '#9B6A9E' },
    { name: 'Tagalongs', color: '#D4824A', accent: '#E4926A' },
    { name: 'Do-si-dos', color: '#F5A623', accent: '#FFB643' },
    { name: 'Trefoils', color: '#8B6F47', accent: '#9B7F57' },
    { name: 'Thin\nMints', color: '#4A7C59', accent: '#5A8C6A' },
    { name: 'Samoas', color: '#8B5A8E', accent: '#9B6A9E' },
    { name: 'Tagalongs', color: '#D4824A', accent: '#E4926A' },
  ];

  return (
    <svg
      ref={ref}
      viewBox="0 0 400 400"
      className="w-full max-w-md mx-auto"
      role="img"
      aria-label="Globe with cookie boxes orbiting around it"
    >
      {/* Definitions */}
      <defs>
        {/* Enhanced globe gradient with more depth */}
        <radialGradient id="globeGradient" cx="40%" cy="30%">
          <stop offset="0%" stopColor="#7AB88C" />
          <stop offset="50%" stopColor="#5A8C6A" />
          <stop offset="100%" stopColor="#3A6C4A" />
        </radialGradient>

        {/* Ocean gradient for more realism */}
        <radialGradient id="oceanGradient" cx="45%" cy="35%">
          <stop offset="0%" stopColor="#6A9C7A" />
          <stop offset="100%" stopColor="#4A7C59" />
        </radialGradient>

        {/* Dynamic box gradients for each cookie type */}
        {cookieTypes.map((cookie, i) => (
          <radialGradient key={`box-grad-${i}`} id={`boxGradient${i}`} cx="30%" cy="25%">
            <stop offset="0%" stopColor={cookie.accent} />
            <stop offset="100%" stopColor={cookie.color} />
          </radialGradient>
        ))}

        {/* Glow filter for boxes */}
        <filter id="glow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>

      {/* Outer glow around globe */}
      <circle
        cx="200"
        cy="200"
        r="90"
        fill="rgba(74, 124, 89, 0.15)"
        className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Main globe */}
      <circle
        cx="200"
        cy="200"
        r="80"
        fill="url(#oceanGradient)"
        className={`transition-all duration-1000 ${isVisible ? "opacity-100 scale-100" : "opacity-0 scale-50"}`}
        style={{ transformOrigin: "200px 200px" }}
      />

      {/* Enhanced latitude lines with better visibility */}
      <ellipse
        cx="200"
        cy="200"
        rx="80"
        ry="15"
        fill="none"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.5"
        className={`transition-all duration-1000 delay-100 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      <ellipse
        cx="200"
        cy="200"
        rx="80"
        ry="40"
        fill="none"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="1.5"
        className={`transition-all duration-1000 delay-150 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      <ellipse
        cx="200"
        cy="200"
        rx="80"
        ry="65"
        fill="none"
        stroke="rgba(255, 255, 255, 0.15)"
        strokeWidth="1.5"
        className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Longitude lines */}
      <ellipse
        cx="200"
        cy="200"
        rx="15"
        ry="80"
        fill="none"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="1.5"
        className={`transition-all duration-1000 delay-200 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      <ellipse
        cx="200"
        cy="200"
        rx="50"
        ry="80"
        fill="none"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="1.5"
        className={`transition-all duration-1000 delay-250 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Enhanced continents - North America */}
      <path
        d="M 170 160 Q 175 155, 185 158 Q 195 160, 198 168 Q 200 176, 195 180 Q 188 183, 180 178 Q 172 173, 170 160 Z"
        fill="rgba(255, 255, 255, 0.5)"
        stroke="rgba(255, 255, 255, 0.3)"
        strokeWidth="0.5"
        className={`transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      {/* Europe/Africa */}
      <path
        d="M 210 185 Q 218 180, 228 188 Q 235 195, 232 205 Q 228 212, 218 210 Q 210 207, 210 185 Z"
        fill="rgba(255, 255, 255, 0.45)"
        stroke="rgba(255, 255, 255, 0.25)"
        strokeWidth="0.5"
        className={`transition-all duration-1000 delay-350 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />
      {/* Asia */}
      <path
        d="M 215 168 Q 225 165, 235 172 Q 238 180, 232 185 Q 225 188, 215 168 Z"
        fill="rgba(255, 255, 255, 0.4)"
        stroke="rgba(255, 255, 255, 0.2)"
        strokeWidth="0.5"
        className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Orbit path (invisible) */}
      <circle
        cx="200"
        cy="200"
        r="130"
        fill="none"
        stroke="rgba(74, 124, 89, 0.1)"
        strokeWidth="2"
        strokeDasharray="6 4"
        className={`transition-all duration-1000 delay-400 ${isVisible ? "opacity-100" : "opacity-0"}`}
      />

      {/* Cookie boxes orbiting - 8 boxes positioned around the circle */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const x = 200 + 130 * Math.cos(rad);
        const y = 200 + 130 * Math.sin(rad);
        const delay = 500 + i * 75;

        return (
          <g
            key={angle}
            className={`transition-all duration-1000`}
            style={{
              transitionDelay: `${delay}ms`,
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? "scale(1)" : "scale(0)",
              transformOrigin: `${x}px ${y}px`,
            }}
          >
            {/* Cookie box */}
            <rect
              x={x - 12}
              y={y - 8}
              width="24"
              height="16"
              rx="2"
              fill="url(#boxGradient)"
              stroke="#2D1810"
              strokeWidth="1"
            />
            {/* Box highlight */}
            <rect
              x={x - 10}
              y={y - 6}
              width="8"
              height="3"
              fill="rgba(255, 255, 255, 0.4)"
            />
            {/* Box text detail */}
            <line
              x1={x - 8}
              y1={y}
              x2={x + 8}
              y2={y}
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="1"
            />
            <line
              x1={x - 8}
              y1={y + 3}
              x2={x + 8}
              y2={y + 3}
              stroke="rgba(0, 0, 0, 0.2)"
              strokeWidth="1"
            />

            {/* Rotating animation */}
            <animateTransform
              attributeName="transform"
              type="rotate"
              from={`0 200 200`}
              to={`360 200 200`}
              dur="20s"
              repeatCount="indefinite"
              begin={isVisible ? `${delay}ms` : "indefinite"}
            />
          </g>
        );
      })}
    </svg>
  );
}

export default function Section1Hook() {
  return (
    <SectionWrapper id="hook" layout="full-bleed" className="relative overflow-hidden">
      {/* Full-bleed background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#4A7C59] via-[#5A8C6A] to-[#4A7C59] dark:from-[#3A5F45] dark:via-[#4A7C59] dark:to-[#3A5F45]" />

      {/* Subtle pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center px-4 py-16 sm:py-24">
        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 sm:mb-8 leading-tight">
          200 Million Boxes.
          <br />
          <span className="block mt-2">Every. Single. Year.</span>
        </h1>

        {/* Subheading */}
        <p className="text-xl sm:text-2xl md:text-3xl text-white/90 mb-12 sm:mb-16 max-w-3xl mx-auto">
          That&apos;s enough boxes to circle the Earth… twice.
        </p>

        {/* Globe illustration */}
        <figure className="mb-12 sm:mb-16">
          <GlobeIllustration />
          <figcaption className="sr-only">
            Illustration of cookie boxes orbiting around Earth
          </figcaption>
        </figure>

        {/* Stat box with counter */}
        <div className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-8 sm:p-12 shadow-2xl hover:translate-y-[-2px] hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-300">
          <div className="text-white mb-4">
            <AnimatedCounter target={200000000} />
          </div>
          <div className="text-lg sm:text-xl md:text-2xl text-white/90 font-medium">
            boxes sold annually
          </div>
          <div className="mt-4 pt-4 border-t border-white/20 text-sm sm:text-base text-white/75 max-w-sm mx-auto">
            Generated by just 2 bakeries across America
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
