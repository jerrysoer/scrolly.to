// Color vision deficiency simulation matrices
// Applied as: [R', G', B'] = matrix × [R, G, B]
// Based on Brettel et al. (1997) simulation

export interface ColorVisionType {
  id: string;
  name: string;
  technicalName: string;
  description: string;
  prevalence: string;
  affectedCone: string;
  matrix: number[][]; // 3x3 transformation matrix
}

export const colorVisionTypes: ColorVisionType[] = [
  {
    id: "normal",
    name: "Normal Vision",
    technicalName: "Trichromacy",
    description: "Three working cone types — full color range",
    prevalence: "~92% of men, ~99.5% of women",
    affectedCone: "none",
    matrix: [
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ],
  },
  {
    id: "protanopia",
    name: "Red-Green (no red)",
    technicalName: "Protanopia",
    description: "Missing L-cones. Red looks dark. Confuse reds with greens and browns.",
    prevalence: "~1% of men",
    affectedCone: "L (red)",
    matrix: [
      [0.567, 0.433, 0.000],
      [0.558, 0.442, 0.000],
      [0.000, 0.242, 0.758],
    ],
  },
  {
    id: "deuteranopia",
    name: "Red-Green (no green)",
    technicalName: "Deuteranopia",
    description: "Missing M-cones. Similar to protanopia but reds appear brighter.",
    prevalence: "~1% of men",
    affectedCone: "M (green)",
    matrix: [
      [0.625, 0.375, 0.000],
      [0.700, 0.300, 0.000],
      [0.000, 0.300, 0.700],
    ],
  },
  {
    id: "tritanopia",
    name: "Blue-Yellow",
    technicalName: "Tritanopia",
    description: "Missing S-cones. Blues look greenish. Yellows look pinkish or light.",
    prevalence: "~0.003% of population",
    affectedCone: "S (blue)",
    matrix: [
      [0.950, 0.050, 0.000],
      [0.000, 0.433, 0.567],
      [0.000, 0.475, 0.525],
    ],
  },
];

// Apply color vision simulation to an RGB color
export function simulateColorVision(
  r: number, g: number, b: number,
  type: string
): { r: number; g: number; b: number } {
  const cvType = colorVisionTypes.find(t => t.id === type);
  if (!cvType) return { r, g, b };

  const m = cvType.matrix;
  return {
    r: Math.round(Math.min(255, Math.max(0, m[0][0] * r + m[0][1] * g + m[0][2] * b))),
    g: Math.round(Math.min(255, Math.max(0, m[1][0] * r + m[1][1] * g + m[1][2] * b))),
    b: Math.round(Math.min(255, Math.max(0, m[2][0] * r + m[2][1] * g + m[2][2] * b))),
  };
}

// Dog vision simulation
// Dogs have 2 cone types: blue (~430nm) and yellow (~555nm)
// They cannot distinguish red from green
export interface DogVisionInfo {
  humanCones: number;
  dogCones: number;
  description: string;
  missingColors: string[];
  canSee: string[];
}

export const dogVisionInfo: DogVisionInfo = {
  humanCones: 3,
  dogCones: 2,
  description: "Dogs have blue and yellow cones but no red cone. Their world is similar to a human with red-green color blindness.",
  missingColors: ["Red", "Orange", "Green (as distinct from yellow)"],
  canSee: ["Blue", "Yellow", "Gray", "Brown (dark yellow)"],
};

// Dog vision color transform (dichromatic simulation)
export function simulateDogVision(r: number, g: number, b: number): { r: number; g: number; b: number } {
  // Dogs see roughly like deuteranopia (missing green/red distinction)
  // but with a blue-yellow axis
  return {
    r: Math.round(Math.min(255, 0.625 * r + 0.375 * g)),
    g: Math.round(Math.min(255, 0.700 * r + 0.300 * g)),
    b: Math.round(Math.min(255, 0.300 * g + 0.700 * b)),
  };
}

// Sample scene colors for the human vs dog vision comparison
export interface SceneObject {
  id: string;
  name: string;
  humanColor: string; // hex
  humanRgb: { r: number; g: number; b: number };
}

export const parkScene: SceneObject[] = [
  { id: "sky", name: "Sky", humanColor: "#87CEEB", humanRgb: { r: 135, g: 206, b: 235 } },
  { id: "sun", name: "Sun", humanColor: "#FFD700", humanRgb: { r: 255, g: 215, b: 0 } },
  { id: "tree-leaves", name: "Leaves", humanColor: "#228B22", humanRgb: { r: 34, g: 139, b: 34 } },
  { id: "tree-trunk", name: "Trunk", humanColor: "#8B4513", humanRgb: { r: 139, g: 69, b: 19 } },
  { id: "grass", name: "Grass", humanColor: "#32CD32", humanRgb: { r: 50, g: 205, b: 50 } },
  { id: "flowers-red", name: "Red Flowers", humanColor: "#FF4444", humanRgb: { r: 255, g: 68, b: 68 } },
  { id: "flowers-yellow", name: "Yellow Flowers", humanColor: "#FFD700", humanRgb: { r: 255, g: 215, b: 0 } },
  { id: "ball", name: "Tennis Ball", humanColor: "#CCFF00", humanRgb: { r: 204, g: 255, b: 0 } },
  { id: "fire-hydrant", name: "Fire Hydrant", humanColor: "#CC0000", humanRgb: { r: 204, g: 0, b: 0 } },
];

// Test colors for colorblindness section (color wheel + common items)
export const testColors: { name: string; hex: string; r: number; g: number; b: number }[] = [
  { name: "Red", hex: "#ef4444", r: 239, g: 68, b: 68 },
  { name: "Orange", hex: "#f97316", r: 249, g: 115, b: 22 },
  { name: "Yellow", hex: "#eab308", r: 234, g: 179, b: 8 },
  { name: "Green", hex: "#22c55e", r: 34, g: 197, b: 94 },
  { name: "Teal", hex: "#14b8a6", r: 20, g: 184, b: 166 },
  { name: "Blue", hex: "#3b82f6", r: 59, g: 130, b: 246 },
  { name: "Indigo", hex: "#6366f1", r: 99, g: 102, b: 241 },
  { name: "Purple", hex: "#a855f7", r: 168, g: 85, b: 247 },
  { name: "Pink", hex: "#ec4899", r: 236, g: 72, b: 153 },
  { name: "Brown", hex: "#92400e", r: 146, g: 64, b: 14 },
  { name: "Skin", hex: "#fcd9b6", r: 252, g: 217, b: 182 },
  { name: "Forest", hex: "#166534", r: 22, g: 101, b: 52 },
];
