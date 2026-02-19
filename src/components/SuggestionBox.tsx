"use client";

import { useState, type FormEvent } from "react";
import { checkProfanity } from "@/lib/profanity";

type Status = "idle" | "loading" | "success" | "error" | "warning";

const COOLDOWN_KEY = "scrolly-suggestion-ts";
const COOLDOWN_MS = 60_000;

export default function SuggestionBox() {
  const [topic, setTopic] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setMessage("");

    // Client-side profanity check
    const flagged = checkProfanity(topic);
    if (flagged) {
      setStatus("warning");
      setMessage("Please remove inappropriate language and try again.");
      return;
    }

    // Client-side cooldown
    const lastTs = localStorage.getItem(COOLDOWN_KEY);
    if (lastTs && Date.now() - Number(lastTs) < COOLDOWN_MS) {
      setStatus("error");
      setMessage("You just submitted a suggestion. Please wait a minute.");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/suggestions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic: topic.trim(), email: email.trim() || undefined }),
      });
      const data = await res.json();

      if (data.success) {
        localStorage.setItem(COOLDOWN_KEY, String(Date.now()));
        setStatus("success");
        setTopic("");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  return (
    <section id="suggest" className="scroll-mt-16 px-6 pb-20">
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          Suggest a Topic
        </h2>
        <p className="mt-4 text-text-muted">
          What should we explain next? Drop your idea and we&apos;ll turn it
          into an interactive explainer.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-xl border border-green/20 bg-green/5 p-6">
            <p className="font-medium text-green">Suggestion received!</p>
            <p className="mt-1 text-sm text-text-muted">
              Thanks for the idea — we&apos;ll review it soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-3">
            <div className="relative">
              <textarea
                required
                minLength={5}
                maxLength={200}
                placeholder="e.g. How do vaccines work?"
                value={topic}
                onChange={(e) => {
                  setTopic(e.target.value);
                  if (status === "warning" || status === "error") setStatus("idle");
                }}
                disabled={status === "loading"}
                rows={3}
                className="w-full resize-none rounded-xl border border-border-strong bg-card-bg px-5 py-3 text-sm text-text placeholder:text-text-muted/60 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20 disabled:opacity-60"
              />
              <span className="absolute right-3 bottom-2 text-xs text-text-muted/50">
                {topic.length}/200
              </span>
            </div>

            <input
              type="email"
              placeholder="Email (optional — get notified when it ships)"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="h-12 rounded-full border border-border-strong bg-card-bg px-5 text-sm text-text placeholder:text-text-muted/60 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20 disabled:opacity-60"
            />

            <button
              type="submit"
              disabled={status === "loading" || topic.trim().length < 5}
              className="h-12 rounded-full bg-green px-7 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {status === "loading" ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                  Sending…
                </span>
              ) : (
                "Submit suggestion"
              )}
            </button>
          </form>
        )}

        {status === "warning" && (
          <p className="mt-3 text-sm text-amber-600">{message}</p>
        )}
        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{message}</p>
        )}
      </div>
    </section>
  );
}
