"use client";

import { useEffect, useRef, useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { timeline } from "../data/timeline";

export default function Section6Timeline() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftShadow, setShowLeftShadow] = useState(false);
  const [showRightShadow, setShowRightShadow] = useState(true);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftShadow(scrollLeft > 10);
      setShowRightShadow(scrollLeft < scrollWidth - clientWidth - 10);
    };

    container.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check

    return () => container.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <SectionWrapper id="timeline" layout="full-bleed">
      <div className="space-y-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto px-4">
          <h2 className="text-4xl sm:text-5xl font-bold text-text-primary mb-4">
            How Long Has This Been Going On?
          </h2>
          <p className="text-xl sm:text-2xl text-text-secondary mb-6">
            The first Girl Scout cookie was sold in 1917.
          </p>
          <p className="text-lg text-text-tertiary leading-relaxed">
            Before iPhones. Before TV. Before your grandparents were born. A
            troop in Oklahoma baked cookies in their home kitchen and sold them
            at their school. That's where this whole thing started.
          </p>
        </div>

        {/* Horizontal Scroll Timeline */}
        <div className="relative">
          {/* Left shadow indicator */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-bg-secondary to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              showLeftShadow ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Right shadow indicator */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-bg-secondary to-transparent z-10 pointer-events-none transition-opacity duration-300 ${
              showRightShadow ? "opacity-100" : "opacity-0"
            }`}
          />

          {/* Scroll container */}
          <div
            ref={scrollRef}
            className="overflow-x-auto overflow-y-hidden scrollbar-hide snap-x snap-mandatory"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <div className="inline-flex gap-6 px-4 py-8 min-w-full">
              {timeline.map((event, index) => (
                <div
                  key={event.year}
                  className="snap-center flex-shrink-0 w-80 sm:w-96"
                >
                  {/* Timeline card */}
                  <div className="relative">
                    {/* Connecting line */}
                    {index < timeline.length - 1 && (
                      <div className="absolute top-12 left-full w-6 h-0.5 bg-border z-0" />
                    )}

                    {/* Card with lift interaction */}
                    <div className="timeline-card bg-bg-card border border-border rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                      {/* Icon circle */}
                      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-bg-secondary border-2 border-border mb-4 text-3xl">
                        {event.icon}
                      </div>

                      {/* Year */}
                      <div className="text-sm font-semibold text-accent-amber mb-2">
                        {event.year}
                      </div>

                      {/* Title */}
                      <h3 className="text-2xl font-bold text-text-primary mb-3">
                        {event.title}
                      </h3>

                      {/* Description */}
                      <p className="text-base text-text-secondary leading-relaxed">
                        {event.description}
                      </p>

                      {/* WWII highlight */}
                      {event.year === 1942 && (
                        <div className="mt-4 pt-4 border-t border-border">
                          <p className="text-sm text-accent-purple font-medium">
                            📅 Fun Fact: During World War II, they had to stop
                            selling cookies because there wasn't enough sugar
                            and butter. They sold calendars instead.
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mobile scroll hint */}
        <div className="text-center text-sm text-text-tertiary sm:hidden">
          ← Scroll to explore the timeline →
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </SectionWrapper>
  );
}
