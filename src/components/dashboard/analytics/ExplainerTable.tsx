"use client";

import { useState } from "react";
import Link from "next/link";
import { ExplainerStats } from "@/lib/types";
import { formatNumber } from "@/lib/format";
import EngagementScore from "./EngagementScore";

interface ExplainerTableProps {
  data: ExplainerStats[];
}

type SortKey = "name" | "total" | "last7d" | "last30d" | "engagementScore";

export default function ExplainerTable({ data }: ExplainerTableProps) {
  const [sortBy, setSortBy] = useState<SortKey>("total");
  const [sortAsc, setSortAsc] = useState(false);

  function handleSort(key: SortKey) {
    if (sortBy === key) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(key);
      setSortAsc(false);
    }
  }

  const sorted = [...data].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortBy === "name") return dir * a.name.localeCompare(b.name);
    return dir * (a[sortBy] - b[sortBy]);
  });

  const header = (key: SortKey, label: string, align: string = "text-right") => (
    <button
      onClick={() => handleSort(key)}
      className={`${align} text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-text-secondary transition-colors cursor-pointer`}
    >
      {label}
      {sortBy === key && (
        <span className="ml-1 text-accent">{sortAsc ? "\u2191" : "\u2193"}</span>
      )}
    </button>
  );

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-card-bg p-6 text-center text-text-muted text-sm">
        No explainer data yet.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border border-border bg-card-bg p-6 overflow-x-auto">
      <h3 className="text-[10px] font-semibold uppercase tracking-[0.12em] text-text-muted mb-5">
        Explainer Breakdown
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="pb-3 text-left">{header("name", "Explainer", "text-left")}</th>
            <th className="pb-3 text-right">{header("total", "Total")}</th>
            <th className="pb-3 text-right">{header("last7d", "7d")}</th>
            <th className="pb-3 text-right">{header("last30d", "30d")}</th>
            <th className="pb-3 text-right">{header("engagementScore", "Score")}</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, i) => (
            <tr
              key={row.id}
              className="border-b border-border/50 last:border-0 hover:bg-surface/50 transition-colors"
              style={{ animationDelay: `${i * 30}ms` }}
            >
              <td className="py-3 text-text-secondary font-medium">
                <Link
                  href={`/dashboard/explainer/${row.id}`}
                  className="hover:text-accent transition-colors"
                >
                  {row.name}
                </Link>
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {formatNumber(row.total)}
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {formatNumber(row.last7d)}
              </td>
              <td className="py-3 text-right font-mono text-text-muted tabular-nums">
                {formatNumber(row.last30d)}
              </td>
              <td className="py-3 text-right">
                <EngagementScore score={row.engagementScore} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
