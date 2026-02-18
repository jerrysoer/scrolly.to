"use client";

import { useState, type FormEvent } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function Waitlist() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();

      if (data.success) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMsg(data.error || "Something went wrong");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please try again.");
    }
  };

  return (
    <section id="waitlist" className="scroll-mt-16 px-6 py-20 sm:py-28">
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-condensed text-3xl font-bold uppercase tracking-tight text-text sm:text-4xl">
          Get Updates
        </h2>
        <p className="mt-4 text-text-muted">
          New explainer templates, features, and community highlights. No spam,
          unsubscribe anytime.
        </p>

        {status === "success" ? (
          <div className="mt-8 rounded-xl border border-green/20 bg-green/5 p-6">
            <p className="font-medium text-green">
              You&apos;re on the list!
            </p>
            <p className="mt-1 text-sm text-text-muted">
              We&apos;ll be in touch when there&apos;s something worth sharing.
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="mt-8 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === "loading"}
              className="h-12 flex-1 rounded-full border border-border-strong bg-card-bg px-5 text-sm text-text placeholder:text-text-muted/60 focus:border-green focus:outline-none focus:ring-2 focus:ring-green/20 disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={status === "loading"}
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
                  Joining…
                </span>
              ) : (
                "Join waitlist"
              )}
            </button>
          </form>
        )}

        {status === "error" && (
          <p className="mt-3 text-sm text-red-600">{errorMsg}</p>
        )}
      </div>
    </section>
  );
}
