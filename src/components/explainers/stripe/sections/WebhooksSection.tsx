"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  Webhook,
  Play,
  CheckCircle2,
  Clock,
  ChevronRight,
} from "lucide-react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";
import { webhookEvents, webhookHeaders } from "@/lib/explainers/stripe-webhooks";

function syntaxHighlight(json: string): string {
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?)/g,
    (match) => {
      let cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return `<span class="${cls}">${match}</span>`;
    }
  );
}

export default function WebhooksSection() {
  const [firedEvents, setFiredEvents] = useState<string[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);
  const [isAutoPlaying, setIsAutoPlaying] = useState(false);
  const terminalRef = useRef<HTMLDivElement>(null);

  const fireEvent = useCallback((eventId: string) => {
    setFiredEvents((prev) => prev.includes(eventId) ? prev : [...prev, eventId]);
    setSelectedEvent(eventId);
  }, []);

  const autoPlay = () => {
    setIsAutoPlaying(true);
    setFiredEvents([]);
    setSelectedEvent(null);

    webhookEvents.forEach((event, i) => {
      setTimeout(() => {
        fireEvent(event.id);
        if (i === webhookEvents.length - 1) {
          setIsAutoPlaying(false);
        }
      }, (i + 1) * 1000);
    });
  };

  const reset = () => {
    setFiredEvents([]);
    setSelectedEvent(null);
    setIsAutoPlaying(false);
  };

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [selectedEvent]);

  const activeEvent = webhookEvents.find((e) => e.id === selectedEvent);

  return (
    <SectionWrapper id="webhooks">
      <div className="mb-10 sm:mb-14">
        <span className="stripe-section-number">06</span>
        <h2 className="stripe-section-title">Webhooks: The Nervous System</h2>
        <p className="stripe-section-subtitle">
          Stripe notifies your server about every state change via webhooks. Fire events and watch the JSON payloads arrive in real time.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-5">
        {/* Event timeline */}
        <div
          className="rounded-2xl border p-6 lg:col-span-2"
          style={{
            backgroundColor: "var(--bg-card)",
            borderColor: "var(--border)",
          }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold flex items-center gap-2" style={{ fontFamily: "var(--font-heading)", color: "var(--text-primary)" }}>
              <Webhook size={18} style={{ color: "var(--stripe-purple)" }} />
              Event Timeline
            </h3>
            <div className="flex gap-2">
              <button
                onClick={autoPlay}
                disabled={isAutoPlaying}
                className="flex h-8 items-center gap-1.5 rounded-lg px-3 text-xs font-medium text-white transition-all duration-200 hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: "var(--stripe-purple)" }}
              >
                <Play size={12} />
                Auto
              </button>
              <button
                onClick={reset}
                className="flex h-8 items-center rounded-lg border px-3 text-xs font-medium transition-all duration-200 hover:opacity-80"
                style={{
                  backgroundColor: "var(--bg-secondary)",
                  borderColor: "var(--border)",
                  color: "var(--text-secondary)",
                }}
              >
                Reset
              </button>
            </div>
          </div>

          <div className="space-y-0">
            {webhookEvents.map((event, i) => {
              const isFired = firedEvents.includes(event.id);
              const isSelected = selectedEvent === event.id;
              return (
                <div key={event.id}>
                  <button
                    onClick={() => fireEvent(event.id)}
                    className="flex w-full items-start gap-3 rounded-lg p-3 text-left transition-all duration-200"
                    style={{
                      backgroundColor: isSelected
                        ? "var(--bg-secondary)"
                        : "transparent",
                    }}
                  >
                    <div className="flex flex-col items-center pt-1">
                      <div
                        className="flex h-6 w-6 items-center justify-center rounded-full transition-all duration-300"
                        style={{
                          backgroundColor: isFired
                            ? "var(--correct-green)"
                            : "var(--bg-secondary)",
                          border: isFired
                            ? "none"
                            : "1px solid var(--border)",
                        }}
                      >
                        {isFired ? (
                          <CheckCircle2 size={14} color="#fff" />
                        ) : (
                          <Clock
                            size={12}
                            style={{ color: "var(--text-tertiary)" }}
                          />
                        )}
                      </div>
                      {i < webhookEvents.length - 1 && (
                        <div
                          className="h-6 w-0.5 mt-1"
                          style={{
                            backgroundColor: isFired
                              ? "var(--correct-green)"
                              : "var(--border)",
                            opacity: isFired ? 0.4 : 1,
                          }}
                        />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <code
                          className="text-xs font-mono font-medium truncate"
                          style={{
                            color: isFired
                              ? "var(--stripe-purple)"
                              : "var(--text-secondary)",
                          }}
                        >
                          {event.type}
                        </code>
                        {isSelected && (
                          <ChevronRight
                            size={12}
                            style={{ color: "var(--stripe-purple)" }}
                          />
                        )}
                      </div>
                      <span className="text-[10px] font-mono" style={{ color: "var(--text-tertiary)" }}>
                        {event.timing}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Terminal/JSON viewer */}
        <div className="lg:col-span-3">
          <div
            className="rounded-2xl overflow-hidden"
            style={{
              border: "1px solid #2a2a3e",
            }}
          >
            {/* Terminal header */}
            <div
              className="flex items-center gap-2 px-4 py-3"
              style={{
                backgroundColor: "#181825",
                borderBottom: "1px solid #2a2a3e",
              }}
            >
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-[#f38ba8]" />
                <div className="h-3 w-3 rounded-full bg-[#fab387]" />
                <div className="h-3 w-3 rounded-full bg-[#a6e3a1]" />
              </div>
              <span className="ml-2 text-xs font-mono text-[#6c7086]">
                stripe webhooks --listen
              </span>
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-4 sm:p-6 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed"
              style={{
                backgroundColor: "#1e1e2e",
                color: "#cdd6f4",
                minHeight: "400px",
                maxHeight: "600px",
              }}
            >
              {!activeEvent ? (
                <div className="text-[#6c7086]">
                  <p>
                    {">"} Ready! Listening for events on your account...
                  </p>
                  <p className="mt-2">
                    {">"} Click an event on the left or press Auto to simulate
                    the webhook flow.
                  </p>
                  <span className="inline-block w-2 h-4 bg-[#cdd6f4] animate-pulse ml-1" />
                </div>
              ) : (
                <div className="animate-fade-in">
                  {/* Event type header */}
                  <div className="mb-3">
                    <span className="text-[#a6e3a1]">{">"}</span>{" "}
                    <span className="text-[#89b4fa]">{activeEvent.type}</span>{" "}
                    <span className="text-[#6c7086]">[{activeEvent.timing}]</span>
                  </div>

                  {/* Description */}
                  <div className="mb-4 text-[#a6adc8] text-xs leading-relaxed pl-4 border-l-2 border-[#313244]">
                    {activeEvent.description}
                  </div>

                  {/* Headers */}
                  <div className="mb-3">
                    <div className="text-[#6c7086] mb-1">
                      {"// "}Headers
                    </div>
                    {Object.entries(webhookHeaders).map(([key, value]) => (
                      <div key={key} className="pl-2">
                        <span className="text-[#89b4fa]">{key}</span>
                        <span className="text-[#6c7086]">: </span>
                        <span className="text-[#a6e3a1] break-all">
                          {String(value).length > 60
                            ? `${String(value).slice(0, 60)}...`
                            : String(value)}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Payload */}
                  <div>
                    <div className="text-[#6c7086] mb-1">
                      {"// "}Payload
                    </div>
                    <pre
                      className="whitespace-pre-wrap break-words"
                      dangerouslySetInnerHTML={{
                        __html: syntaxHighlight(
                          JSON.stringify(activeEvent.payload, null, 2)
                        ),
                      }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Webhook tips */}
          {activeEvent && (
            <div
              className="mt-4 rounded-xl border p-4 animate-fade-in"
              style={{
                backgroundColor: "var(--bg-card)",
                borderColor: "var(--border)",
              }}
            >
              <h4 className="text-sm font-medium mb-2" style={{ color: "var(--text-primary)" }}>
                Best Practices
              </h4>
              <ul className="space-y-1.5 text-xs" style={{ color: "var(--text-secondary)" }}>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--correct-green)" }}>&#10003;</span>
                  Always verify the <code className="font-mono px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: "var(--bg-secondary)" }}>Stripe-Signature</code> header to prevent spoofing
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--correct-green)" }}>&#10003;</span>
                  Return a 200 status quickly — do heavy processing async
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--correct-green)" }}>&#10003;</span>
                  Handle events idempotently — Stripe may retry on failure
                </li>
                <li className="flex items-start gap-2">
                  <span style={{ color: "var(--correct-green)" }}>&#10003;</span>
                  Use <code className="font-mono px-1 py-0.5 rounded text-[10px]" style={{ backgroundColor: "var(--bg-secondary)" }}>payment_intent.succeeded</code> as your primary success signal
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </SectionWrapper>
  );
}
