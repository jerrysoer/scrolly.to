"use client";

import { useEffect, useRef, useState } from "react";

interface DateStampedChapterProps {
  id: string;
  date?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  className?: string;
}

export default function DateStampedChapter({
  id,
  date,
  title,
  subtitle,
  children,
  className = "",
}: DateStampedChapterProps) {
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

  return (
    <section
      ref={ref}
      id={id}
      className={`section-fade-in ${visible ? "visible" : ""} ${className}`}
    >
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        {date && (
          <div
            className={`transition-all duration-700 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            <span className="date-stamp">{date}</span>
          </div>
        )}

        <h2
          className={`chapter-heading ${date ? "mt-3" : ""} transition-all duration-700 delay-100 ${
            visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
          }`}
        >
          {title}
        </h2>

        {subtitle && (
          <p
            className={`chapter-subtitle mt-4 transition-all duration-700 delay-200 ${
              visible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"
            }`}
          >
            {subtitle}
          </p>
        )}

        <div
          className={`mt-6 h-px w-16 transition-all duration-500 delay-300 ${
            visible ? "opacity-100 w-16" : "opacity-0 w-0"
          }`}
          style={{ backgroundColor: "var(--accent-blue)" }}
        />

        <div
          className={`mt-8 space-y-6 transition-all duration-700 delay-400 ${
            visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          }`}
        >
          {children}
        </div>
      </div>
    </section>
  );
}
