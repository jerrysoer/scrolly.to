"use client";

const OPTIONS = [7, 14, 30, 90] as const;

interface DateRangePickerProps {
  value: number;
  onChange: (days: number) => void;
}

export default function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  return (
    <div className="flex gap-2">
      {OPTIONS.map((days) => (
        <button
          key={days}
          onClick={() => onChange(days)}
          className={`rounded-full border px-3.5 py-1 text-xs font-medium transition-all ${
            value === days
              ? "border-accent bg-accent text-white"
              : "border-border bg-card-bg text-text-muted hover:border-border-strong hover:text-text"
          }`}
        >
          {days}d
        </button>
      ))}
    </div>
  );
}
