import { TrainingSnapshot } from './microgpt-types';

export const RANDOM_LOSS = Math.log(27); // ~3.296

// Deterministic seeded random for reproducibility
function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9301 + 49297) * 49297;
  return x - Math.floor(x);
}

const sampleNamesByRange: Record<string, string[]> = {
  early: ['xqmzb.', 'jjjjj.', 'rrrrr.', 'zzqxm.', 'bbbbb.', 'ttttt.', 'mmxqz.', 'nnnnn.', 'wwwww.', 'lllll.'],
  emerging: ['emlla.', 'soohi.', 'jarr.', 'annna.', 'liimm.', 'mikke.', 'noohh.', 'sarha.', 'daavd.', 'joohn.'],
  structured: ['emia.', 'soph.', 'jame.', 'oliv.', 'liam.', 'noha.', 'miae.', 'ella.', 'lucs.', 'arya.'],
  good: [
    'emma.', 'sophia.', 'james.', 'olivia.', 'liam.', 'noah.', 'mia.', 'ella.', 'lucas.', 'aria.',
    'anna.', 'ethan.', 'isla.', 'leo.', 'nora.', 'jack.', 'lily.', 'owen.', 'maya.', 'drew.',
  ],
};

function getSampleName(step: number, seed: number): string {
  const idx = Math.floor(seededRandom(seed) * 10);
  if (step <= 50) return sampleNamesByRange.early[idx % sampleNamesByRange.early.length];
  if (step <= 200) return sampleNamesByRange.emerging[idx % sampleNamesByRange.emerging.length];
  if (step <= 500) return sampleNamesByRange.structured[idx % sampleNamesByRange.structured.length];
  return sampleNamesByRange.good[Math.floor(seededRandom(seed + 1) * sampleNamesByRange.good.length)];
}

function generateSnapshots(): TrainingSnapshot[] {
  const snapshots: TrainingSnapshot[] = [];

  for (let step = 0; step <= 1000; step++) {
    // Loss: exponential decay from ~3.3 to ~2.0 with noise
    const noise = (seededRandom(step * 7 + 3) - 0.5) * 0.1;
    const baseLoss = 2.0 + 1.3 * Math.exp(-step / 200) + noise * Math.exp(-step / 500);
    const loss = Math.max(1.8, baseLoss);

    // Learning rate: cosine decay from 0.01 to 0.001
    const cosineDecay = 0.5 * (1 + Math.cos((Math.PI * step) / 1000));
    const learningRate = 0.001 + (0.01 - 0.001) * cosineDecay;

    const sampleName = getSampleName(step, step);

    snapshots.push({
      step,
      loss: Math.round(loss * 1000) / 1000,
      learningRate: Math.round(learningRate * 100000) / 100000,
      sampleName,
    });
  }

  return snapshots;
}

export const TRAINING_SNAPSHOTS: TrainingSnapshot[] = generateSnapshots();
