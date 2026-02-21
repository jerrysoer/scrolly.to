"use client";

import { useEffect, useState } from "react";

export interface NavSection {
  id: string;
  label: string;
  shortLabel?: string;
}

interface SectionNavProps {
  sections: NavSection[];
}

export default function SectionNav({ sections }: SectionNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          const best = visible.reduce((a, b) =>
            a.intersectionRatio > b.intersectionRatio ? a : b
          );
          setActiveSection(best.target.id);
        }
      },
      { threshold: 0.3 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav
      className="fixed right-6 top-1/2 z-50 hidden -translate-y-1/2 lg:flex flex-col gap-3"
      aria-label="Section navigation"
    >
      {sections.map(({ id, label }) => (
        <button
          key={id}
          onClick={() => scrollTo(id)}
          className="group flex items-center gap-3 justify-end"
          aria-label={`Navigate to ${label}`}
        >
          <span
            className={`text-xs font-sans font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 translate-x-2 group-hover:translate-x-0 whitespace-nowrap ${
              activeSection === id ? "text-text-primary" : "text-text-tertiary"
            }`}
          >
            {label}
          </span>
          <span
            className={`block rounded-full transition-all duration-300 ${
              activeSection === id
                ? "h-3 w-3 shadow-sm"
                : "h-2 w-2 bg-text-tertiary/40 group-hover:bg-text-tertiary"
            }`}
            style={
              activeSection === id
                ? { backgroundColor: "var(--accent-blue)" }
                : undefined
            }
          />
        </button>
      ))}
    </nav>
  );
}
