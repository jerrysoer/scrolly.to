"use client";

import { useState } from "react";
import { ReferrerGroup } from "@/lib/types";

interface ReferrerCategoriesProps {
  data: ReferrerGroup[];
}

interface CategoryGroup {
  category: string;
  total: number;
  referrers: ReferrerGroup[];
}

export default function ReferrerCategories({ data }: ReferrerCategoriesProps) {
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No referrer data yet.
      </div>
    );
  }

  // Group by category
  const groupMap = new Map<string, ReferrerGroup[]>();
  for (const ref of data) {
    const cat = ref.category || "Other";
    if (!groupMap.has(cat)) groupMap.set(cat, []);
    groupMap.get(cat)!.push(ref);
  }

  const groups: CategoryGroup[] = Array.from(groupMap.entries())
    .map(([category, referrers]) => ({
      category,
      total: referrers.reduce((sum, r) => sum + r.count, 0),
      referrers: referrers.sort((a, b) => b.count - a.count),
    }))
    .sort((a, b) => b.total - a.total);

  const maxCategoryTotal = Math.max(...groups.map((g) => g.total), 1);

  function toggle(category: string) {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(category)) next.delete(category);
      else next.add(category);
      return next;
    });
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Referrer Categories
      </h3>
      <div className="space-y-1.5">
        {groups.map((group) => {
          const isOpen = expanded.has(group.category);
          const innerMax = Math.max(...group.referrers.map((r) => r.count), 1);

          return (
            <div key={group.category}>
              <button
                onClick={() => toggle(group.category)}
                className="group flex w-full items-center gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-surface/50"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={`shrink-0 text-text-muted transition-transform duration-200 ${
                    isOpen ? "rotate-90" : ""
                  }`}
                >
                  <path d="M9 18l6-6-6-6" />
                </svg>
                <span className="w-20 shrink-0 text-left text-sm text-text-secondary font-medium">
                  {group.category}
                </span>
                <div className="relative h-5 flex-1 overflow-hidden rounded-lg bg-surface">
                  <div
                    className="absolute inset-y-0 left-0 rounded-lg bg-accent/70 transition-all duration-500 group-hover:bg-accent/90"
                    style={{
                      width: `${Math.max((group.total / maxCategoryTotal) * 100, 2)}%`,
                    }}
                  />
                </div>
                <span className="w-12 shrink-0 text-right font-mono text-xs text-text-muted tabular-nums">
                  {group.total}
                </span>
              </button>

              {isOpen && (
                <div className="ml-7 mt-1 mb-2 space-y-1.5 border-l border-border pl-4">
                  {group.referrers.map((ref) => (
                    <div key={ref.domain} className="group flex items-center gap-3">
                      <span className="w-24 shrink-0 truncate text-xs text-text-muted">
                        {ref.domain}
                      </span>
                      <div className="relative h-4 flex-1 overflow-hidden rounded-lg bg-surface">
                        <div
                          className="absolute inset-y-0 left-0 rounded-lg bg-accent/70 transition-all duration-500 group-hover:bg-accent/90"
                          style={{
                            width: `${Math.max((ref.count / innerMax) * 100, 2)}%`,
                          }}
                        />
                      </div>
                      <span className="w-10 shrink-0 text-right font-mono text-xs text-text-muted tabular-nums">
                        {ref.count}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
