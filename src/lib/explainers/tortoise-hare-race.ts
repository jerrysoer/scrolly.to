// Pre-computed race position data for various speed combos
export interface RaceDataPoint {
  time: number;
  tortoise: number;
  hare: number;
  label?: string;
}

export function generateRaceData(
  hareSpeed: number,
  napStart: number,
  napDuration: number,
  tortoiseSpeed: number,
  totalTime: number = 100
): RaceDataPoint[] {
  const data: RaceDataPoint[] = [];
  let harePos = 0;
  let tortoisePos = 0;
  let overtakeTime: number | null = null;

  for (let t = 0; t <= totalTime; t++) {
    // Hare runs at full speed, then naps, then runs again
    const isNapping = t >= napStart && t < napStart + napDuration;
    if (!isNapping) {
      harePos += hareSpeed;
    }
    tortoisePos += tortoiseSpeed;

    const label =
      t === napStart
        ? "Hare naps"
        : t === napStart + napDuration
          ? "Hare wakes"
          : overtakeTime === null && tortoisePos >= harePos && t > 0
            ? "Tortoise overtakes!"
            : undefined;

    if (overtakeTime === null && tortoisePos >= harePos && t > 0) {
      overtakeTime = t;
    }

    data.push({
      time: t,
      tortoise: Math.round(tortoisePos * 100) / 100,
      hare: Math.round(harePos * 100) / 100,
      label,
    });
  }

  return data;
}

// Default presets
export const defaultRaceParams = {
  hareSpeed: 3,
  napStart: 25,
  napDuration: 50,
  tortoiseSpeed: 1.2,
  totalTime: 100,
};

export const presetRaces = {
  classic: { hareSpeed: 3, napStart: 20, napDuration: 55, tortoiseSpeed: 1.2 },
  closeCall: { hareSpeed: 4, napStart: 30, napDuration: 45, tortoiseSpeed: 1.5 },
  blowout: { hareSpeed: 2.5, napStart: 15, napDuration: 65, tortoiseSpeed: 1.0 },
};
