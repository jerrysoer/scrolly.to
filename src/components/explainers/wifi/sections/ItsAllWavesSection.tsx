"use client";

import { useState } from "react";
import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

const spectrum = [
  { name: "Gamma Rays", freq: "300 EHz", wavelength: "< 0.01 nm", color: "#9333ea" },
  { name: "X-Rays", freq: "30 EHz", wavelength: "0.01-10 nm", color: "#7c3aed" },
  { name: "Ultraviolet", freq: "750 THz", wavelength: "10-400 nm", color: "#6366f1" },
  { name: "Visible Light", freq: "430-750 THz", wavelength: "400-700 nm", color: "#22c55e" },
  { name: "Infrared", freq: "300 GHz-430 THz", wavelength: "700 nm-1 mm", color: "#ef4444" },
  { name: "Microwaves", freq: "300 MHz-300 GHz", wavelength: "1 mm-1 m", color: "#f97316" },
  { name: "Radio Waves", freq: "3 Hz-300 MHz", wavelength: "1 m-100,000 km", color: "#3b82f6" },
  { name: "WiFi (2.4 GHz)", freq: "2.4 GHz", wavelength: "~12.5 cm", color: "#3b82f6", highlight: true },
  { name: "WiFi (5 GHz)", freq: "5 GHz", wavelength: "~6 cm", color: "#60a5fa", highlight: true },
];

export default function ItsAllWavesSection() {
  const [selected, setSelected] = useState(7);

  return (
    <SectionWrapper id="its-all-waves" layout="centered" stagger>
      <div>
        <p className="font-mono text-xs font-medium uppercase tracking-widest" style={{ color: "var(--accent-blue)" }}>
          Section 01
        </p>
        <h2 className="mt-3 font-serif text-3xl font-bold sm:text-4xl" style={{ color: "var(--text-primary)" }}>
          It&rsquo;s All Waves
        </h2>
        <p className="mt-4 font-sans text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-secondary)" }}>
          WiFi is just radio waves &mdash; the same physics as FM radio, just a different
          frequency. It sits on the electromagnetic spectrum alongside visible light,
          X-rays, and microwaves. The only difference is the wavelength.
        </p>
      </div>

      {/* EM Spectrum slider */}
      <div className="mt-8 rounded-xl border p-6" style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}>
        <p className="mb-4 font-mono text-xs uppercase tracking-wider" style={{ color: "var(--text-tertiary)" }}>
          Electromagnetic Spectrum
        </p>

        {/* Spectrum bar */}
        <div className="flex h-10 overflow-hidden rounded-lg">
          {spectrum.map((band, i) => (
            <button
              key={band.name}
              onClick={() => setSelected(i)}
              className={`flex-1 transition-all duration-200 ${
                selected === i ? "scale-y-125 ring-2 ring-white/40" : "opacity-70 hover:opacity-90"
              }`}
              style={{ backgroundColor: band.color }}
              aria-label={band.name}
            />
          ))}
        </div>

        {/* Slider */}
        <input
          type="range"
          min={0}
          max={spectrum.length - 1}
          value={selected}
          onChange={(e) => setSelected(Number(e.target.value))}
          className="mt-4 w-full"
          aria-label="Select spectrum band"
        />

        {/* Selected detail */}
        <div className="mt-4 flex items-center gap-4 rounded-lg p-4" style={{ backgroundColor: "var(--bg-secondary)" }}>
          <div
            className="h-12 w-12 shrink-0 rounded-lg"
            style={{ backgroundColor: spectrum[selected].color }}
          />
          <div>
            <p className="font-sans text-lg font-bold" style={{ color: spectrum[selected].highlight ? "var(--accent-blue)" : "var(--text-primary)" }}>
              {spectrum[selected].name}
              {spectrum[selected].highlight && (
                <span className="ml-2 rounded-full px-2 py-0.5 font-mono text-xs" style={{ backgroundColor: "rgba(59, 130, 246, 0.15)", color: "var(--accent-blue)" }}>
                  WiFi
                </span>
              )}
            </p>
            <p className="font-mono text-sm" style={{ color: "var(--text-secondary)" }}>
              {spectrum[selected].freq} &bull; {spectrum[selected].wavelength}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 pull-quote">
        WiFi is just radio waves &mdash; the same physics as FM radio, just a different frequency.
      </div>
    </SectionWrapper>
  );
}
