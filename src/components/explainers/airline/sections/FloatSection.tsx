"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { deferredRevenueData } from "@/lib/explainers/airline-loyalty";

export default function FloatSection() {
  const chartRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (chartRef.current) {
      observer.observe(chartRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Find max value for scaling
  const maxValue = Math.max(
    ...deferredRevenueData.map((d) => Math.max(d.deferred, d.redeemed))
  );

  return (
    <SectionWrapper id="the-float" layout="split-right" tinted>
      {/* Left column: Chart visual */}
      <figure className="flex flex-col gap-6">
        <div
          ref={chartRef}
          className="flex items-end justify-between gap-2 sm:gap-3 md:gap-4 h-64 sm:h-80 md:h-96"
        >
          {deferredRevenueData.map((item, index) => {
            const deferredHeight = (item.deferred / maxValue) * 100;
            const redeemedHeight = (item.redeemed / maxValue) * 100;

            return (
              <div
                key={item.year}
                className="flex-1 flex flex-col items-center gap-1 min-w-[40px]"
              >
                {/* Bar container */}
                <div className="w-full flex flex-col items-center gap-1 flex-1 justify-end">
                  {/* Deferred bar */}
                  <div className="w-full flex flex-col items-center">
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-airline-blue mb-1">
                      ${item.deferred}B
                    </span>
                    <div
                      className="w-full bg-airline-blue rounded-t transition-all duration-700 ease-out"
                      style={{
                        height: isVisible ? `${deferredHeight}%` : "0%",
                        transitionDelay: `${index * 100}ms`,
                      }}
                    />
                  </div>

                  {/* Redeemed bar */}
                  <div className="w-full flex flex-col items-center">
                    <div
                      className="w-full bg-mile-gold rounded-b transition-all duration-700 ease-out"
                      style={{
                        height: isVisible ? `${redeemedHeight}%` : "0%",
                        transitionDelay: `${index * 100 + 50}ms`,
                      }}
                    />
                    <span className="text-[10px] sm:text-xs font-mono font-semibold text-mile-gold mt-1">
                      ${item.redeemed}B
                    </span>
                  </div>
                </div>

                {/* Year label */}
                <span className="text-xs sm:text-sm font-mono text-text-secondary mt-2">
                  {item.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-airline-blue rounded" />
            <span className="font-sans text-text-secondary">Deferred</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-mile-gold rounded" />
            <span className="font-sans text-text-secondary">Redeemed</span>
          </div>
        </div>

        <figcaption className="text-xs sm:text-sm text-text-tertiary leading-relaxed border-l-2 border-airline-blue pl-4">
          Deferred revenue = cash collected but not yet earned. It&apos;s a
          liability on paper, but airlines use it like free capital.
        </figcaption>
      </figure>

      {/* Right column: Narrative text */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs uppercase tracking-widest text-airline-blue">
            04
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-text-primary">
            The Float
          </h2>
        </div>

        <div className="flex flex-col gap-4 text-text-secondary leading-relaxed">
          <p>
            Airlines book revenue when miles are sold, not when they&apos;re
            redeemed. Billions sit on their balance sheet as &quot;deferred
            revenue&quot; — your miles are their interest-free loan.
          </p>

          <p>
            Think of it like a gift card. The store has your money the moment
            you buy it. If you never use it, they keep the cash and owe you
            nothing.
          </p>

          <blockquote className="pull-quote">
            Your unredeemed miles are the best kind of debt — interest-free, and
            30% of it disappears on its own.
          </blockquote>
        </div>
      </div>
    </SectionWrapper>
  );
}
