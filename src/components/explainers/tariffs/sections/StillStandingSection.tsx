"use client";

import { useEffect, useRef, useState } from "react";
import { X, Check } from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import ExpandableDeepDive from "@/components/explainers/shared/ExpandableDeepDive";
import { struckDownTariffs, standingTariffs } from "@/lib/explainers/tariffs";

export default function StillStandingSection() {
  const listRef = useRef<HTMLDivElement>(null);
  const [listVisible, setListVisible] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setListVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <SectionWrapper id="still-standing" layout="centered">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24">
        <h2 className="chapter-heading">
          Not all tariffs are gone. Not even close.
        </h2>

        <div
          className="mt-2 h-px w-16 transition-all duration-500"
          style={{ backgroundColor: "var(--accent-blue)" }}
        />

        <p className="mt-6 text-base leading-relaxed text-text-secondary">
          The Supreme Court ruling was narrow in scope. It only struck down
          tariffs imposed under IEEPA. Tariffs built on other legal
          foundations remain fully intact.
        </p>

        {/* Two-column comparison */}
        <div
          ref={listRef}
          className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2"
        >
          {/* Struck Down column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent-red)" }}
              />
              <h3
                className="font-mono text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent-red)" }}
              >
                Struck Down (IEEPA)
              </h3>
            </div>

            <div className="space-y-3">
              {struckDownTariffs.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-lg border p-4"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-card)",
                    opacity: listVisible ? 1 : 0,
                    transform: listVisible
                      ? "translateY(0)"
                      : "translateY(16px)",
                    transition: `opacity 0.5s ease-out ${i * 120}ms, transform 0.5s ease-out ${i * 120}ms`,
                  }}
                >
                  <X
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "var(--accent-red)" }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-tertiary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Still Standing column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: "var(--accent-green)" }}
              />
              <h3
                className="font-mono text-sm font-semibold uppercase tracking-widest"
                style={{ color: "var(--accent-green)" }}
              >
                Still in Effect
              </h3>
            </div>

            <div className="space-y-3">
              {standingTariffs.map((item, i) => (
                <div
                  key={item.label}
                  className="flex items-start gap-3 rounded-lg border p-4"
                  style={{
                    borderColor: "var(--border)",
                    backgroundColor: "var(--bg-card)",
                    opacity: listVisible ? 1 : 0,
                    transform: listVisible
                      ? "translateY(0)"
                      : "translateY(16px)",
                    transition: `opacity 0.5s ease-out ${(i + 3) * 120}ms, transform 0.5s ease-out ${(i + 3) * 120}ms`,
                  }}
                >
                  <Check
                    className="mt-0.5 h-5 w-5 shrink-0"
                    style={{ color: "var(--accent-green)" }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-text-primary">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs leading-relaxed text-text-tertiary">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Deep dive */}
        <div className="mt-10">
          <ExpandableDeepDive label="How the administration can repackage tariffs under 232/301">
            <div className="space-y-3">
              <p>
                The SCOTUS ruling does not prevent the executive branch from
                imposing tariffs entirely — it prevents using IEEPA as the legal
                basis. The administration has two established paths:
              </p>
              <p>
                <strong>Section 232 (Trade Expansion Act, 1962)</strong>: Requires
                a Commerce Department investigation into whether imports threaten
                national security. The process takes months but has been upheld by
                courts. Steel and aluminum tariffs already use this authority.
              </p>
              <p>
                <strong>Section 301 (Trade Act, 1974)</strong>: Requires a USTR
                investigation into unfair trade practices. The original China
                tariffs from 2018-19 used this path and survived legal challenges.
                Biden expanded them further.
              </p>
              <p>
                The key difference: both paths require investigation, findings,
                and a paper trail. IEEPA required none of that — which is exactly
                why the Court struck it down.
              </p>
            </div>
          </ExpandableDeepDive>
        </div>
      </div>
    </SectionWrapper>
  );
}
