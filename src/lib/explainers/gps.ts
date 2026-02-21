// ── GPS Explainer Data ──

export const CONSTELLATION_STATS = {
  activeSatellites: 31,
  orbitalPlanes: 6,
  altitudeKm: 20200,
  orbitalPeriodHours: 11.97,
  signalSpeedMs: 299792458,
  signalTravelTimeMs: 67.3,
} as const;

export const ORBITAL_PLANES = [
  { id: "A", inclination: 55, rightAscension: 0, satellites: 5 },
  { id: "B", inclination: 55, rightAscension: 60, satellites: 5 },
  { id: "C", inclination: 55, rightAscension: 120, satellites: 6 },
  { id: "D", inclination: 55, rightAscension: 180, satellites: 5 },
  { id: "E", inclination: 55, rightAscension: 240, satellites: 5 },
  { id: "F", inclination: 55, rightAscension: 300, satellites: 5 },
] as const;

export const SATELLITE_FACTS = [
  {
    label: "Active Satellites",
    value: "31",
    description: "Currently in orbit",
  },
  {
    label: "Orbital Planes",
    value: "6",
    description: "Evenly spaced around Earth",
  },
  {
    label: "Altitude",
    value: "20,200 km",
    description: "Medium Earth Orbit",
  },
  {
    label: "Signal Speed",
    value: "299,792,458 m/s",
    description: "Speed of light",
  },
] as const;

// ── Trilateration ──

export interface SatellitePoint {
  id: string;
  x: number;
  y: number;
  color: string;
  label: string;
}

export const DEFAULT_SATELLITES: SatellitePoint[] = [
  { id: "sat-1", x: 200, y: 80, color: "#4A90D9", label: "Satellite A" },
  { id: "sat-2", x: 80, y: 320, color: "#E8734A", label: "Satellite B" },
  { id: "sat-3", x: 380, y: 280, color: "#7C5CBF", label: "Satellite C" },
];

export function computeTrilateration(
  satellites: SatellitePoint[],
  radii: number[]
): { x: number; y: number } | null {
  if (satellites.length < 3 || radii.length < 3) return null;

  const [s1, s2, s3] = satellites;
  const [r1, r2, r3] = radii;

  const A = 2 * (s2.x - s1.x);
  const B = 2 * (s2.y - s1.y);
  const C =
    r1 * r1 -
    r2 * r2 -
    s1.x * s1.x +
    s2.x * s2.x -
    s1.y * s1.y +
    s2.y * s2.y;

  const D = 2 * (s3.x - s2.x);
  const E = 2 * (s3.y - s2.y);
  const F =
    r2 * r2 -
    r3 * r3 -
    s2.x * s2.x +
    s3.x * s3.x -
    s2.y * s2.y +
    s3.y * s3.y;

  const det = A * E - B * D;
  if (Math.abs(det) < 0.001) {
    return {
      x: (s1.x + s2.x + s3.x) / 3,
      y: (s1.y + s2.y + s3.y) / 3,
    };
  }

  const x = (C * E - F * B) / det;
  const y = (A * F - D * C) / det;

  return { x, y };
}

export function computeRadii(
  satellites: SatellitePoint[],
  receiver: { x: number; y: number }
): number[] {
  return satellites.map((sat) =>
    Math.sqrt(
      Math.pow(receiver.x - sat.x, 2) + Math.pow(receiver.y - sat.y, 2)
    )
  );
}

// ── Error Budget ──

export interface ErrorSource {
  id: string;
  name: string;
  errorMeters: number;
  color: string;
  description: string;
  correctable: boolean;
}

export const ERROR_SOURCES: ErrorSource[] = [
  {
    id: "ionospheric",
    name: "Ionospheric Delay",
    errorMeters: 5.0,
    color: "#4A90D9",
    description:
      "Charged particles in the ionosphere (60-1,000 km) slow the GPS signal, adding ~5m of uncertainty. Dual-frequency receivers can largely correct this.",
    correctable: true,
  },
  {
    id: "orbital",
    name: "Orbital Errors",
    errorMeters: 2.5,
    color: "#7C5CBF",
    description:
      "Slight inaccuracies in the predicted satellite positions broadcast in the navigation message. Ground stations continuously track and update these.",
    correctable: true,
  },
  {
    id: "satellite-clock",
    name: "Satellite Clock Error",
    errorMeters: 2.0,
    color: "#E8734A",
    description:
      "Even atomic clocks drift. Each satellite carries rubidium and cesium clocks accurate to ~1 nanosecond, but that still means ~0.3m per ns of drift.",
    correctable: true,
  },
  {
    id: "multipath",
    name: "Multipath Reflection",
    errorMeters: 1.0,
    color: "#F5A623",
    description:
      "GPS signals bounce off buildings, mountains, and other surfaces before reaching your receiver, creating ghost signals that confuse positioning.",
    correctable: false,
  },
  {
    id: "tropospheric",
    name: "Tropospheric Delay",
    errorMeters: 0.5,
    color: "#4CAF50",
    description:
      "Water vapor and temperature variations in the lower atmosphere (0-12 km) cause small signal delays. Weather models help correct this.",
    correctable: true,
  },
  {
    id: "receiver-noise",
    name: "Receiver Noise",
    errorMeters: 0.3,
    color: "#9B7FD4",
    description:
      "Thermal noise and processing limitations in your GPS receiver chip add a small baseline error to every measurement.",
    correctable: false,
  },
];

export const CORRECTION_SYSTEMS = [
  {
    name: "WAAS",
    fullName: "Wide Area Augmentation System",
    improvement: "Reduces error to ~1-2m",
    region: "North America",
  },
  {
    name: "DGPS",
    fullName: "Differential GPS",
    improvement: "Reduces error to ~0.1-1m",
    region: "Near reference stations",
  },
  {
    name: "RTK",
    fullName: "Real-Time Kinematic",
    improvement: "Reduces error to ~1-2cm",
    region: "Near base station",
  },
];

// ── History / Timeline ──

export interface TimelineEvent {
  year: number;
  title: string;
  description: string;
  accuracy: string;
  milestone: string;
  icon: "shield" | "plane" | "satellite" | "unlock" | "globe" | "smartphone";
}

export const TIMELINE_EVENTS: TimelineEvent[] = [
  {
    year: 1973,
    title: "Project Born",
    description:
      "The U.S. Department of Defense consolidates competing navigation programs into NAVSTAR GPS. The goal: a satellite-based system that works anywhere on Earth, in any weather, 24/7.",
    accuracy: "Concept only",
    milestone: "DoD approves GPS development",
    icon: "shield",
  },
  {
    year: 1978,
    title: "First Satellites Launch",
    description:
      "The first Block I GPS satellite is launched from Vandenberg Air Force Base. Over the next 7 years, 11 experimental satellites will follow, proving the concept works.",
    accuracy: "~100m (military)",
    milestone: "Block I satellite constellation begins",
    icon: "satellite",
  },
  {
    year: 1983,
    title: "Civilian Access Begins",
    description:
      "After Korean Air Lines Flight 007 is shot down after straying into Soviet airspace, President Reagan announces GPS will be made available for civilian aviation safety.",
    accuracy: "~100m (degraded for civilians)",
    milestone: "KAL 007 disaster opens GPS to civilians",
    icon: "plane",
  },
  {
    year: 1995,
    title: "Full Constellation",
    description:
      "The 24-satellite constellation reaches Full Operational Capability. For the first time, GPS provides continuous worldwide coverage with at least 4 satellites visible from any point on Earth.",
    accuracy: "~100m civilian / ~10m military",
    milestone: "24 satellites operational worldwide",
    icon: "satellite",
  },
  {
    year: 2000,
    title: "Selective Availability Off",
    description:
      "President Clinton orders the intentional degradation of civilian GPS signals (Selective Availability) to be turned off. Overnight, civilian accuracy jumps from ~100m to ~10m.",
    accuracy: "~10m (10x improvement overnight)",
    milestone: "SA turned off, civilian accuracy jumps",
    icon: "unlock",
  },
  {
    year: 2020,
    title: "Multi-Constellation Era",
    description:
      "Modern phones use signals from GPS (USA), GLONASS (Russia), Galileo (EU), and BeiDou (China) simultaneously. With 100+ satellites overhead, accuracy reaches 1-3 meters.",
    accuracy: "~1-3m (multi-constellation)",
    milestone: "GPS + GLONASS + Galileo + BeiDou",
    icon: "globe",
  },
  {
    year: 2025,
    title: "GPS III & Beyond",
    description:
      "Next-generation GPS III satellites bring new civilian signals (L1C, L5), anti-jamming improvements, and compatibility with international systems. Dual-frequency phones achieve sub-meter accuracy.",
    accuracy: "<1m with dual-frequency",
    milestone: "Sub-meter accuracy on phones",
    icon: "smartphone",
  },
];

export const CONSTELLATION_SYSTEMS = [
  { name: "GPS", country: "United States", satellites: 31, year: 1978 },
  { name: "GLONASS", country: "Russia", satellites: 24, year: 1982 },
  { name: "Galileo", country: "European Union", satellites: 28, year: 2005 },
  { name: "BeiDou", country: "China", satellites: 35, year: 2000 },
];
