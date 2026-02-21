"use client";

import SectionWrapper from "@/components/explainers/shared/SectionWrapper";

export default function Section5Lesson() {
  return (
    <SectionWrapper id="lesson" layout="full-bleed">
      <div className="relative overflow-hidden rounded-2xl border border-[var(--color-border)] bg-gradient-to-br from-[#4A7C59] to-[#3a6449] p-8 sm:p-12 lg:p-16">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
                <path d="M 32 0 L 0 0 0 32" fill="none" stroke="white" strokeWidth="0.5"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 items-center">
          {/* Left: Content */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
              The cookie is just the homework.
            </h2>

            <p className="text-lg sm:text-xl text-white/90 leading-relaxed max-w-2xl">
              Girl Scouts learn how to set goals, talk to strangers, handle money, and run a booth — all before middle school. Most adults still haven't done that.
            </p>

            {/* Skills grid */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              {[
                { icon: "🎯", label: "Goal Setting", desc: "300-box targets" },
                { icon: "💬", label: "Communication", desc: "Pitch to strangers" },
                { icon: "💵", label: "Money Handling", desc: "Cash & change" },
                { icon: "📊", label: "Operations", desc: "Booth logistics" }
              ].map((skill, i) => (
                <div
                  key={skill.label}
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 transition-all duration-300 hover:bg-white/15 hover:scale-105 hover:shadow-xl"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <div className="text-3xl mb-2">{skill.icon}</div>
                  <div className="text-sm font-semibold text-white mb-1">{skill.label}</div>
                  <div className="text-xs text-white/70">{skill.desc}</div>
                </div>
              ))}
            </div>

            {/* Stat callout */}
            <div className="inline-flex items-baseline gap-3 bg-white/15 backdrop-blur-sm rounded-xl px-6 py-4 border border-white/30 mt-6">
              <div className="text-5xl sm:text-6xl font-bold text-white">700+</div>
              <div className="text-sm text-white/80">
                boxes sold by<br />top performers
              </div>
            </div>
          </div>

          {/* Right: Illustration */}
          <div className="flex justify-center lg:justify-end">
            <CookieBoothIllustration />
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

function CookieBoothIllustration() {
  return (
    <svg
      viewBox="0 0 400 500"
      className="w-full max-w-[300px] lg:max-w-[400px] drop-shadow-2xl"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Cookie booth table */}
      <g id="booth">
        {/* Table legs */}
        <rect x="80" y="320" width="12" height="80" fill="#8B6F47" rx="2" />
        <rect x="308" y="320" width="12" height="80" fill="#8B6F47" rx="2" />

        {/* Table surface */}
        <rect x="60" y="300" width="280" height="20" fill="#D4824A" rx="4" />
        <rect x="70" y="305" width="260" height="10" fill="#B86F3A" rx="2" />

        {/* Tablecloth drape */}
        <path
          d="M 60 320 Q 80 330, 100 320 T 140 320 T 180 320 T 220 320 T 260 320 T 300 320 T 340 320 L 340 325 L 60 325 Z"
          fill="#4A7C59"
          opacity="0.3"
        />

        {/* Cookie boxes on table */}
        <g id="cookie-boxes">
          {/* Stack of boxes - left */}
          <rect x="90" y="260" width="60" height="40" fill="#8B5A8E" rx="2" />
          <rect x="95" y="265" width="50" height="8" fill="#9B6A9E" />
          <text x="120" y="285" fontSize="10" fill="white" textAnchor="middle" fontWeight="bold">SOLD</text>

          {/* Stack of boxes - center */}
          <rect x="170" y="245" width="60" height="55" fill="#4A7C59" rx="2" />
          <rect x="175" y="250" width="50" height="10" fill="#5A8C69" />
          <text x="200" y="278" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Thin</text>
          <text x="200" y="288" fontSize="9" fill="white" textAnchor="middle" fontWeight="bold">Mints</text>

          {/* Stack of boxes - right */}
          <rect x="250" y="265" width="60" height="35" fill="#D4824A" rx="2" />
          <rect x="255" y="270" width="50" height="8" fill="#E4925A" />
          <text x="280" y="288" fontSize="8" fill="white" textAnchor="middle" fontWeight="bold">Samoas</text>
        </g>

        {/* Sign */}
        <g id="sign">
          <rect x="120" y="180" width="160" height="60" fill="white" rx="6" stroke="#4A7C59" strokeWidth="3" />
          <text x="200" y="205" fontSize="20" fill="#4A7C59" textAnchor="middle" fontWeight="bold">SOLD OUT!</text>
          <text x="200" y="228" fontSize="12" fill="#D4824A" textAnchor="middle" fontWeight="600">Come back tomorrow!</text>
        </g>
      </g>

      {/* Girl Scout - proud and successful */}
      <g id="girl-scout">
        {/* Body - Girl Scout vest */}
        <ellipse cx="200" cy="270" rx="35" ry="45" fill="#4A7C59" />

        {/* Vest details - badges */}
        <circle cx="180" cy="255" r="6" fill="#F5A623" opacity="0.9" />
        <circle cx="195" cy="265" r="5" fill="#8B5A8E" opacity="0.9" />
        <circle cx="180" cy="280" r="5" fill="#D4824A" opacity="0.9" />
        <circle cx="220" cy="260" r="6" fill="#4CAF50" opacity="0.9" />
        <circle cx="210" cy="275" r="5" fill="#F5A623" opacity="0.9" />

        {/* Arms - one raised in celebration! */}
        {/* Left arm raised */}
        <path
          d="M 170 265 Q 150 250, 140 230"
          stroke="#E8C4A0"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="140" cy="230" r="9" fill="#E8C4A0" />

        {/* Right arm at side */}
        <path
          d="M 230 270 Q 250 280, 260 295"
          stroke="#E8C4A0"
          strokeWidth="14"
          fill="none"
          strokeLinecap="round"
        />
        <circle cx="260" cy="295" r="9" fill="#E8C4A0" />

        {/* Neck */}
        <rect x="190" y="225" width="20" height="15" fill="#E8C4A0" rx="3" />

        {/* Head */}
        <circle cx="200" cy="210" r="28" fill="#E8C4A0" />

        {/* Hair - ponytail */}
        <ellipse cx="200" cy="200" rx="32" ry="25" fill="#5A3825" />
        <ellipse cx="230" cy="205" rx="18" ry="22" fill="#5A3825" />

        {/* Face features */}
        {/* Eyes - happy/proud */}
        <ellipse cx="190" cy="208" rx="3" ry="5" fill="#2D1810" />
        <ellipse cx="210" cy="208" rx="3" ry="5" fill="#2D1810" />

        {/* Big smile */}
        <path
          d="M 185 220 Q 200 228, 215 220"
          stroke="#2D1810"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />

        {/* Rosy cheeks */}
        <circle cx="178" cy="215" r="6" fill="#FF8B94" opacity="0.4" />
        <circle cx="222" cy="215" r="6" fill="#FF8B94" opacity="0.4" />

        {/* Legs */}
        <rect x="185" y="310" width="12" height="50" fill="#2D1810" rx="6" />
        <rect x="203" y="310" width="12" height="50" fill="#2D1810" rx="6" />

        {/* Shoes */}
        <ellipse cx="191" cy="365" rx="10" ry="6" fill="#2D1810" />
        <ellipse cx="209" cy="365" rx="10" ry="6" fill="#2D1810" />
      </g>

      {/* Celebration confetti */}
      <g id="confetti" opacity="0.8">
        <circle cx="130" cy="200" r="3" fill="#F5A623" />
        <circle cx="270" cy="210" r="2.5" fill="#8B5A8E" />
        <circle cx="150" cy="170" r="2" fill="#4CAF50" />
        <circle cx="280" cy="180" r="3" fill="#D4824A" />
        <rect x="140" y="190" width="4" height="4" fill="#4A7C59" rx="1" />
        <rect x="260" y="200" width="3" height="3" fill="#F5A623" rx="1" />
        <path d="M 155 185 L 158 188 L 155 191 L 152 188 Z" fill="#8B5A8E" />
        <path d="M 275 195 L 278 198 L 275 201 L 272 198 Z" fill="#4CAF50" />
      </g>

      {/* Shadow under table */}
      <ellipse cx="200" cy="405" rx="140" ry="15" fill="#000000" opacity="0.1" />
    </svg>
  );
}
