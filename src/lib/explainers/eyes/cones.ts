export interface ConeSensitivity {
  wavelength: number; // nm
  S: number; // Short (blue) cone response 0-1
  M: number; // Medium (green) cone response 0-1
  L: number; // Long (red) cone response 0-1
}

// Simplified cone sensitivity curves (sampled every 10nm from 380-700nm)
// Based on CIE 2006 cone fundamentals, normalized to peak = 1.0
export const coneSensitivityCurve: ConeSensitivity[] = [
  { wavelength: 380, S: 0.02, M: 0.00, L: 0.00 },
  { wavelength: 390, S: 0.06, M: 0.00, L: 0.00 },
  { wavelength: 400, S: 0.17, M: 0.01, L: 0.00 },
  { wavelength: 410, S: 0.38, M: 0.02, L: 0.01 },
  { wavelength: 420, S: 0.64, M: 0.04, L: 0.01 },
  { wavelength: 430, S: 0.88, M: 0.07, L: 0.02 },
  { wavelength: 440, S: 1.00, M: 0.12, L: 0.03 },
  { wavelength: 450, S: 0.95, M: 0.17, L: 0.04 },
  { wavelength: 460, S: 0.81, M: 0.24, L: 0.06 },
  { wavelength: 470, S: 0.61, M: 0.33, L: 0.09 },
  { wavelength: 480, S: 0.40, M: 0.46, L: 0.14 },
  { wavelength: 490, S: 0.23, M: 0.59, L: 0.21 },
  { wavelength: 500, S: 0.12, M: 0.73, L: 0.31 },
  { wavelength: 510, S: 0.06, M: 0.85, L: 0.44 },
  { wavelength: 520, S: 0.03, M: 0.95, L: 0.57 },
  { wavelength: 530, S: 0.01, M: 1.00, L: 0.69 },
  { wavelength: 540, S: 0.01, M: 0.98, L: 0.79 },
  { wavelength: 550, S: 0.00, M: 0.93, L: 0.87 },
  { wavelength: 560, S: 0.00, M: 0.85, L: 0.93 },
  { wavelength: 570, S: 0.00, M: 0.75, L: 0.97 },
  { wavelength: 580, S: 0.00, M: 0.63, L: 1.00 },
  { wavelength: 590, S: 0.00, M: 0.51, L: 0.98 },
  { wavelength: 600, S: 0.00, M: 0.38, L: 0.92 },
  { wavelength: 610, S: 0.00, M: 0.27, L: 0.82 },
  { wavelength: 620, S: 0.00, M: 0.17, L: 0.70 },
  { wavelength: 630, S: 0.00, M: 0.10, L: 0.56 },
  { wavelength: 640, S: 0.00, M: 0.06, L: 0.42 },
  { wavelength: 650, S: 0.00, M: 0.03, L: 0.29 },
  { wavelength: 660, S: 0.00, M: 0.02, L: 0.19 },
  { wavelength: 670, S: 0.00, M: 0.01, L: 0.11 },
  { wavelength: 680, S: 0.00, M: 0.00, L: 0.06 },
  { wavelength: 690, S: 0.00, M: 0.00, L: 0.03 },
  { wavelength: 700, S: 0.00, M: 0.00, L: 0.02 },
];

export interface ConeType {
  id: string;
  name: string;
  fullName: string;
  peakWavelength: number;
  color: string;
  description: string;
}

export const coneTypes: ConeType[] = [
  { id: "S", name: "S-cone", fullName: "Short wavelength", peakWavelength: 440, color: "#3b82f6", description: "Responds to blue-violet light. Only ~2% of your cones." },
  { id: "M", name: "M-cone", fullName: "Medium wavelength", peakWavelength: 530, color: "#22c55e", description: "Responds to green light. About 32% of your cones." },
  { id: "L", name: "L-cone", fullName: "Long wavelength", peakWavelength: 580, color: "#ef4444", description: "Responds to red-yellow light. About 64% of your cones." },
];

// Pre-computed cone responses for the RGB mixer
// Given R,G,B values (0-255), compute approximate cone activation (0-1)
export function computeConeResponse(r: number, g: number, b: number): { S: number; M: number; L: number } {
  // Simplified mapping based on cone sensitivity to RGB primaries
  const rNorm = r / 255;
  const gNorm = g / 255;
  const bNorm = b / 255;

  return {
    S: Math.min(1, 0.02 * rNorm + 0.12 * gNorm + 0.95 * bNorm),
    M: Math.min(1, 0.21 * rNorm + 0.72 * gNorm + 0.07 * bNorm),
    L: Math.min(1, 0.67 * rNorm + 0.33 * gNorm + 0.00 * bNorm),
  };
}

// Named color presets for the mixer
export const colorPresets: { name: string; r: number; g: number; b: number; note: string }[] = [
  { name: "Pure Red", r: 255, g: 0, b: 0, note: "L-cone fires strongly, M-cone a bit" },
  { name: "Pure Green", r: 0, g: 255, b: 0, note: "M-cone dominates, L-cone responds too" },
  { name: "Pure Blue", r: 0, g: 0, b: 255, note: "Almost only S-cone fires" },
  { name: "Yellow", r: 255, g: 255, b: 0, note: "R+G = Yellow. No yellow cone exists!" },
  { name: "Cyan", r: 0, g: 255, b: 255, note: "G+B. S-cone and M-cone both active" },
  { name: "Magenta", r: 255, g: 0, b: 255, note: "R+B. Not in the rainbow — your brain invents it" },
  { name: "White", r: 255, g: 255, b: 255, note: "All three cones fire equally" },
  { name: "Skin tone", r: 255, g: 205, b: 148, note: "A complex mix — mostly R+G with a hint of B" },
];
