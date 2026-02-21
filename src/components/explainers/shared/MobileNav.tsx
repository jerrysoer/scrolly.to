"use client";

import { useEffect, useState } from "react";

interface NavSection {
  id: string;
  label: string;
}

interface MobileNavProps {
  sections: NavSection[];
}

export default function MobileNav({ sections }: MobileNavProps) {
  const [activeSection, setActiveSection] = useState(sections[0]?.id ?? "");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const vis = entries.filter((e) => e.isIntersecting);
        if (vis.length > 0) {
          const best = vis.reduce((a, b) =>
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

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercent =
        window.scrollY /
        (document.documentElement.scrollHeight - window.innerHeight);
      setVisible(scrollPercent > 0.05 && scrollPercent < 0.95);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeIndex = sections.findIndex((s) => s.id === activeSection);

  if (!visible) return null;

  return (
    <div className="mobile-nav lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <span className="font-mono text-[10px] font-medium uppercase tracking-widest text-text-tertiary">
          {activeIndex + 1}/{sections.length}
        </span>

        <div className="scrollbar-none flex items-center gap-1.5 overflow-x-auto px-2">
          {sections.map(({ id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className="shrink-0"
              aria-label={`Navigate to ${id}`}
            >
              <span
                className="block rounded-full transition-all duration-200"
                style={{
                  width: activeSection === id ? 16 : 6,
                  height: 6,
                  backgroundColor:
                    activeSection === id
                      ? "var(--accent-blue)"
                      : "var(--text-tertiary)",
                  opacity: activeSection === id ? 1 : 0.3,
                }}
              />
            </button>
          ))}
        </div>

        <span className="max-w-[100px] truncate text-right font-sans text-[10px] font-medium text-text-tertiary">
          {sections.find((s) => s.id === activeSection)?.label}
        </span>
      </div>
    </div>
  );
}
