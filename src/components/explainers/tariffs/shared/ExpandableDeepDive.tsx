"use client";

import { useState, useId } from "react";
import { ChevronDown } from "lucide-react";

interface ExpandableDeepDiveProps {
  label: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}

export default function ExpandableDeepDive({
  label,
  children,
  defaultOpen = false,
}: ExpandableDeepDiveProps) {
  const [open, setOpen] = useState(defaultOpen);
  const contentId = useId();
  const triggerId = useId();

  return (
    <div
      className="rounded-xl border overflow-hidden"
      style={{ backgroundColor: "var(--bg-card)", borderColor: "var(--border)" }}
    >
      <button
        id={triggerId}
        onClick={() => setOpen((prev) => !prev)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
        aria-expanded={open}
        aria-controls={contentId}
      >
        <span className="font-sans text-base font-semibold text-text-primary pr-4">
          {label}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-text-tertiary transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <div
        id={contentId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          display: "grid",
          gridTemplateRows: open ? "1fr" : "0fr",
          transition: "grid-template-rows 300ms ease",
        }}
      >
        <div style={{ overflow: "hidden" }}>
          <div className="px-6 pb-5 font-sans text-base leading-relaxed text-text-secondary">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
