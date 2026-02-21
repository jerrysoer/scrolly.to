"use client";

import { useState, useEffect, useRef } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function RealBusinessSection() {
  return (
    <SectionWrapper id="real-business" layout="split-left" tinted>
      {/* Left column: narrative */}
      <div className="space-y-6">
        <div className="font-mono text-xs uppercase tracking-widest text-airline-blue">
          02
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
          The Real Business
        </h2>
        <p className="text-lg text-text-secondary leading-relaxed">
          In 2020, United Airlines needed emergency cash. So they pledged their
          most valuable asset as loan collateral. Not the planes. Not the
          airport gates. The frequent flyer program.
        </p>
        <p className="text-lg text-text-secondary leading-relaxed">
          MileagePlus was independently valued at $22 billion. United's entire
          airline — planes, routes, crew, everything — was worth about $10
          billion on the stock market.
        </p>
        <div className="bg-bg-card border border-border rounded-lg p-6 card-glow">
          <p className="font-serif text-xl font-semibold text-text-primary">
            The loyalty program was worth{" "}
            <span className="text-airline-blue">2.2x</span> the airline itself
          </p>
        </div>
      </div>

      {/* Right column: animated bar chart */}
      <div>
        <ValueComparisonChart />
      </div>
    </SectionWrapper>
  );
}

function ValueComparisonChart() {
  const [isVisible, setIsVisible] = useState(false);
  const [mileagePlusValue, setMileagePlusValue] = useState(0);
  const [unitedValue, setUnitedValue] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  // IntersectionObserver to trigger animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate counter when visible
  useEffect(() => {
    if (!isVisible) return;

    const duration = 1500; // 1.5 seconds
    const targetMileagePlus = 22;
    const targetUnited = 10;
    const startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function (easeOutCubic)
      const eased = 1 - Math.pow(1 - progress, 3);

      setMileagePlusValue(Math.floor(targetMileagePlus * eased));
      setUnitedValue(Math.floor(targetUnited * eased));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Ensure final values are exact
        setMileagePlusValue(targetMileagePlus);
        setUnitedValue(targetUnited);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible]);

  const mileagePlusWidth = isVisible ? 100 : 0;
  const unitedWidth = isVisible ? 45.45 : 0; // 10/22 = 45.45%

  return (
    <div ref={containerRef} className="space-y-8">
      {/* MileagePlus bar */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-sans text-lg font-semibold text-text-primary">
            MileagePlus
          </h3>
          <span className="font-mono text-2xl font-bold text-airline-blue">
            ${mileagePlusValue}B
          </span>
        </div>
        <div className="h-16 bg-bg-secondary rounded-lg overflow-hidden">
          <div
            className="h-full bg-airline-blue rounded-lg transition-all duration-1500 ease-out"
            style={{ width: `${mileagePlusWidth}%` }}
          />
        </div>
      </div>

      {/* United Airlines bar */}
      <div className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h3 className="font-sans text-lg font-semibold text-text-primary">
            United Airlines
          </h3>
          <span className="font-mono text-2xl font-bold text-mile-gold">
            ${unitedValue}B
          </span>
        </div>
        <div className="h-16 bg-bg-secondary rounded-lg overflow-hidden">
          <div
            className="h-full bg-mile-gold rounded-lg transition-all duration-1500 ease-out"
            style={{ width: `${unitedWidth}%` }}
          />
        </div>
      </div>

      {/* Source annotation */}
      <p className="text-sm text-text-tertiary font-mono">
        Source: United Airlines SEC filing, June 2020
      </p>
    </div>
  );
}
