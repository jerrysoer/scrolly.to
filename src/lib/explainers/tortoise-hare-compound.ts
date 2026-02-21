// Growth curves at different rates for compound growth visualization
export interface CompoundDataPoint {
  day: number;
  tortoise: number;
  hare: number;
  label?: string;
}

/**
 * Tortoise: compounds at `dailyRate` every single day
 * Hare: big initial burst, then plateaus/declines
 */
export function generateCompoundData(days: number): CompoundDataPoint[] {
  const data: CompoundDataPoint[] = [];
  const dailyRate = 0.01; // 1% daily improvement
  const hareBurstRate = 0.10; // 10% initial burst
  const hareBurstDays = 7; // burst lasts ~1 week
  const harePlateauDecay = 0.001; // slight daily decay after burst

  let tortoiseValue = 1;
  let hareValue = 1;
  let crossoverDay: number | null = null;

  for (let d = 0; d <= days; d++) {
    if (d > 0) {
      // Tortoise: steady 1% compound growth
      tortoiseValue *= 1 + dailyRate;

      // Hare: 10% burst for first week, then slight decay
      if (d <= hareBurstDays) {
        hareValue *= 1 + hareBurstRate;
      } else {
        hareValue *= 1 - harePlateauDecay;
      }
    }

    const label =
      crossoverDay === null && tortoiseValue >= hareValue && d > hareBurstDays
        ? "Crossover!"
        : undefined;

    if (crossoverDay === null && tortoiseValue >= hareValue && d > hareBurstDays) {
      crossoverDay = d;
    }

    data.push({
      day: d,
      tortoise: Math.round(tortoiseValue * 1000) / 1000,
      hare: Math.round(hareValue * 1000) / 1000,
      label,
    });
  }

  return data;
}

// Pre-computed datasets for common time horizons
export const compoundDatasets: Record<string, CompoundDataPoint[]> = {
  "7": generateCompoundData(7),
  "30": generateCompoundData(30),
  "90": generateCompoundData(90),
  "180": generateCompoundData(180),
  "365": generateCompoundData(365),
};

export const timeHorizons = [
  { value: 7, label: "1 Week" },
  { value: 30, label: "1 Month" },
  { value: 90, label: "3 Months" },
  { value: 180, label: "6 Months" },
  { value: 365, label: "1 Year" },
];
