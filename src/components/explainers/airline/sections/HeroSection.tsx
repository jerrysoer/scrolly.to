"use client";

import React from "react";
import { ChevronDown, CreditCard, DollarSign } from "lucide-react";

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-bg-primary"
    >
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Radial gradient orb */}
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, var(--airline-blue) 0%, transparent 70%)",
            opacity: 0.08,
          }}
        />

        {/* Floating dollar signs */}
        <DollarSign
          className="absolute top-[15%] left-[10%] w-16 h-16 text-mile-gold"
          style={{ opacity: 0.06 }}
        />
        <DollarSign
          className="absolute top-[25%] right-[15%] w-12 h-12 text-mile-gold"
          style={{ opacity: 0.05 }}
        />
        <DollarSign
          className="absolute bottom-[30%] left-[20%] w-10 h-10 text-mile-gold"
          style={{ opacity: 0.07 }}
        />

        {/* Floating credit cards */}
        <CreditCard
          className="absolute top-[40%] right-[8%] w-14 h-14 text-airline-blue"
          style={{ opacity: 0.05 }}
        />
        <CreditCard
          className="absolute bottom-[20%] right-[25%] w-12 h-12 text-airline-blue"
          style={{ opacity: 0.06 }}
        />
        <CreditCard
          className="absolute top-[60%] left-[12%] w-16 h-16 text-airline-blue"
          style={{ opacity: 0.08 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center">
        <p
          className="font-mono text-xs uppercase tracking-widest text-airline-blue mb-6 opacity-0 animate-fade-in"
          style={{ animationDelay: "0.1s", animationFillMode: "forwards" }}
        >
          scrolly.to — Interactive Explainer
        </p>

        <h1
          className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 opacity-0 animate-rise-up"
          style={{ animationDelay: "0.3s", animationFillMode: "forwards" }}
        >
          How Airlines Make More Money From{" "}
          <span
            className="bg-gradient-to-r from-airline-blue to-mile-gold bg-clip-text"
            style={{ WebkitTextFillColor: "transparent" }}
          >
            Your Credit Card
          </span>{" "}
          Than Your Ticket
        </h1>

        <p
          className="text-lg sm:text-xl md:text-2xl text-text-secondary max-w-3xl mx-auto leading-relaxed mb-6 opacity-0 animate-rise-up"
          style={{ animationDelay: "0.5s", animationFillMode: "forwards" }}
        >
          United just admitted its loyalty program isn't about flying.
          MileagePlus was valued at $22 billion — more than twice what the
          airline itself was worth.
        </p>

        <p
          className="font-mono text-xs text-text-tertiary opacity-0 animate-fade-in"
          style={{ animationDelay: "0.7s", animationFillMode: "forwards" }}
        >
          6 min read
        </p>
      </div>

      {/* Scroll cue */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0 animate-fade-in"
        style={{ animationDelay: "0.9s", animationFillMode: "forwards" }}
      >
        <p className="font-mono text-xs text-text-tertiary uppercase tracking-wider">
          Scroll to explore
        </p>
        <ChevronDown className="w-6 h-6 text-airline-blue animate-bounce" />
      </div>
    </section>
  );
}
