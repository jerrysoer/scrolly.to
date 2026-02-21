"use client";

interface SectionDividerProps {
  variant?: "line" | "dots" | "gradient" | "wave" | "section-number" | "chapter";
  number?: number;
}

export default function SectionDivider({ variant = "line", number }: SectionDividerProps) {
  if (variant === "section-number" && number) {
    return (
      <div className="relative flex items-center justify-center py-12">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-[var(--color-border)]" />
        </div>
        <div className="relative flex items-center justify-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-[var(--color-forward-blue)] text-white font-bold text-lg shadow-lg">
            {number.toString().padStart(2, "0")}
          </div>
        </div>
      </div>
    );
  }

  if (variant === "dots") {
    return (
      <div className="flex items-center justify-center gap-2 py-12">
        <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
        <div className="w-2 h-2 rounded-full bg-[var(--color-border)]" />
      </div>
    );
  }

  if (variant === "gradient") {
    return (
      <div className="py-12">
        <div className="h-[2px] bg-gradient-to-r from-transparent via-[var(--color-border)] to-transparent" />
      </div>
    );
  }

  if (variant === "wave") {
    return (
      <div className="py-12">
        <svg
          className="w-full h-4"
          viewBox="0 0 1200 20"
          preserveAspectRatio="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0,10 Q300,0 600,10 T1200,10"
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="2"
          />
        </svg>
      </div>
    );
  }

  if (variant === "chapter") {
    return (
      <div className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <div className="border-t-2 border-[var(--color-border)]" />
        </div>
      </div>
    );
  }

  // Default: simple line
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <div className="border-t border-[var(--color-border)]" />
      </div>
    </div>
  );
}
