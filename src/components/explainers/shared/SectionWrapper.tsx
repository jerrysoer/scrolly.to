"use client";

import { useEffect, useRef, useState } from "react";

interface SectionWrapperProps {
  id: string;
  children: React.ReactNode;
  className?: string;
  tinted?: boolean;
  stagger?: boolean;
  layout?: "centered" | "centered-card" | "split-left" | "split-right" | "full-bleed";
  room?: "normal" | "compact" | "spacious";
}

export default function SectionWrapper({
  id,
  children,
  className = "",
  tinted = false,
  stagger = false,
  layout = "centered",
  room = "normal",
}: SectionWrapperProps) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const paddingY = room === "compact" ? "py-12 sm:py-16" : room === "spacious" ? "py-24 sm:py-36" : "py-20 sm:py-28";

  const innerClass = (() => {
    switch (layout) {
      case "split-left":
        return `grid grid-cols-1 lg:grid-cols-[2fr_3fr] gap-8 mx-auto max-w-6xl px-4 ${paddingY} sm:px-6`;
      case "split-right":
        return `grid grid-cols-1 lg:grid-cols-[3fr_2fr] gap-8 mx-auto max-w-6xl px-4 ${paddingY} sm:px-6`;
      case "full-bleed":
        return `mx-auto max-w-5xl px-4 ${paddingY} sm:px-6`;
      case "centered-card":
      case "centered":
      default:
        return `mx-auto max-w-4xl px-4 ${paddingY} sm:px-6`;
    }
  })();

  return (
    <section
      ref={ref}
      id={id}
      className={`section-fade-in ${visible ? "visible" : ""} ${tinted ? "section-tinted" : ""} ${layout === "full-bleed" ? "bg-bg-secondary" : ""} ${className}`}
    >
      <div
        className={`${innerClass} ${stagger ? `stagger-children ${visible ? "visible" : ""}` : ""}`}
      >
        {children}
      </div>
    </section>
  );
}
