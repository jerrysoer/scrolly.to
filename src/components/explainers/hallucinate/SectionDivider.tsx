interface SectionDividerProps {
  number: number;
}

export default function SectionDivider({ number }: SectionDividerProps) {
  const label = String(number).padStart(2, "0");

  return (
    <div className="relative flex items-center w-full max-w-3xl mx-auto px-4 py-8">
      {/* Left rule */}
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "var(--border)" }}
      />

      {/* Circled number */}
      <div
        className="mx-4 flex items-center justify-center w-8 h-8 rounded-full border flex-shrink-0"
        style={{
          backgroundColor: "var(--bg-card)",
          borderColor: "var(--border)",
        }}
      >
        <span
          className="font-mono text-xs leading-none select-none"
          style={{ color: "var(--text-tertiary)" }}
        >
          {label}
        </span>
      </div>

      {/* Right rule */}
      <div
        className="flex-1 h-px"
        style={{ backgroundColor: "var(--border)" }}
      />
    </div>
  );
}
