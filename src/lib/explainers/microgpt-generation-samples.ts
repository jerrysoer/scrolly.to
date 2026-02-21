import { GenerationSample, GenerationStep } from './microgpt-types';

// Helper to create a probability distribution for top tokens
function topProbs(entries: [string, number][]): { token: string; prob: number }[] {
  return entries.map(([token, prob]) => ({ token, prob: Math.round(prob * 1000) / 1000 }));
}

// ---- Temperature 0.1: Very peaked, repetitive ----
const walkthrough01: GenerationStep[] = [
  { position: 0, selectedToken: 'e', selectedProb: 0.42, probabilities: topProbs([['e', 0.42], ['a', 0.21], ['s', 0.12], ['m', 0.08], ['j', 0.05], ['l', 0.04], ['o', 0.03], ['n', 0.02], ['i', 0.015], ['d', 0.01]]) },
  { position: 1, selectedToken: 'm', selectedProb: 0.68, probabilities: topProbs([['m', 0.68], ['l', 0.12], ['v', 0.06], ['t', 0.04], ['r', 0.03], ['d', 0.02], ['n', 0.015], ['s', 0.01], ['a', 0.008], ['i', 0.007]]) },
  { position: 2, selectedToken: 'm', selectedProb: 0.72, probabilities: topProbs([['m', 0.72], ['i', 0.1], ['a', 0.07], ['e', 0.04], ['p', 0.02], ['b', 0.015], ['l', 0.01], ['y', 0.008], ['o', 0.005], ['r', 0.002]]) },
  { position: 3, selectedToken: 'a', selectedProb: 0.85, probabilities: topProbs([['a', 0.85], ['e', 0.06], ['i', 0.03], ['y', 0.02], ['o', 0.015], ['u', 0.01], ['.', 0.008], ['s', 0.004], ['n', 0.002], ['l', 0.001]]) },
  { position: 4, selectedToken: '.', selectedProb: 0.91, probabilities: topProbs([['.', 0.91], ['n', 0.03], ['l', 0.02], ['r', 0.01], ['s', 0.008], ['h', 0.006], ['t', 0.005], ['d', 0.004], ['b', 0.003], ['m', 0.002]]) },
];

// ---- Temperature 0.3: Mostly common ----
const walkthrough03: GenerationStep[] = [
  { position: 0, selectedToken: 'e', selectedProb: 0.35, probabilities: topProbs([['e', 0.35], ['a', 0.2], ['s', 0.13], ['m', 0.09], ['j', 0.06], ['l', 0.05], ['o', 0.04], ['n', 0.03], ['i', 0.02], ['d', 0.015]]) },
  { position: 1, selectedToken: 'm', selectedProb: 0.52, probabilities: topProbs([['m', 0.52], ['l', 0.15], ['v', 0.08], ['t', 0.06], ['r', 0.05], ['d', 0.04], ['n', 0.03], ['s', 0.02], ['a', 0.015], ['i', 0.01]]) },
  { position: 2, selectedToken: 'm', selectedProb: 0.58, probabilities: topProbs([['m', 0.58], ['i', 0.13], ['a', 0.1], ['e', 0.06], ['p', 0.04], ['b', 0.03], ['l', 0.02], ['y', 0.015], ['o', 0.012], ['r', 0.008]]) },
  { position: 3, selectedToken: 'a', selectedProb: 0.72, probabilities: topProbs([['a', 0.72], ['e', 0.1], ['i', 0.06], ['y', 0.04], ['o', 0.03], ['u', 0.02], ['.', 0.015], ['s', 0.008], ['n', 0.005], ['l', 0.002]]) },
  { position: 4, selectedToken: '.', selectedProb: 0.82, probabilities: topProbs([['.', 0.82], ['n', 0.06], ['l', 0.04], ['r', 0.025], ['s', 0.02], ['h', 0.012], ['t', 0.008], ['d', 0.006], ['b', 0.004], ['m', 0.001]]) },
];

// ---- Temperature 0.5: Varied common ----
const walkthrough05: GenerationStep[] = [
  { position: 0, selectedToken: 's', selectedProb: 0.14, probabilities: topProbs([['e', 0.22], ['a', 0.18], ['s', 0.14], ['m', 0.1], ['j', 0.08], ['l', 0.07], ['o', 0.06], ['n', 0.05], ['i', 0.04], ['d', 0.03]]) },
  { position: 1, selectedToken: 'o', selectedProb: 0.28, probabilities: topProbs([['o', 0.28], ['a', 0.18], ['h', 0.14], ['t', 0.1], ['e', 0.08], ['u', 0.06], ['i', 0.05], ['w', 0.04], ['p', 0.035], ['c', 0.025]]) },
  { position: 2, selectedToken: 'p', selectedProb: 0.32, probabilities: topProbs([['p', 0.32], ['n', 0.18], ['l', 0.14], ['r', 0.1], ['m', 0.08], ['d', 0.06], ['f', 0.04], ['v', 0.03], ['s', 0.025], ['t', 0.015]]) },
  { position: 3, selectedToken: 'h', selectedProb: 0.45, probabilities: topProbs([['h', 0.45], ['e', 0.15], ['i', 0.1], ['a', 0.08], ['o', 0.06], ['u', 0.05], ['r', 0.04], ['n', 0.025], ['l', 0.02], ['s', 0.015]]) },
  { position: 4, selectedToken: 'i', selectedProb: 0.52, probabilities: topProbs([['i', 0.52], ['e', 0.15], ['a', 0.1], ['o', 0.07], ['y', 0.05], ['.', 0.04], ['u', 0.025], ['s', 0.015], ['n', 0.01], ['r', 0.008]]) },
  { position: 5, selectedToken: 'a', selectedProb: 0.58, probabilities: topProbs([['a', 0.58], ['e', 0.14], ['.', 0.1], ['o', 0.06], ['i', 0.04], ['n', 0.03], ['s', 0.02], ['r', 0.015], ['l', 0.01], ['t', 0.005]]) },
  { position: 6, selectedToken: '.', selectedProb: 0.78, probabilities: topProbs([['.', 0.78], ['n', 0.07], ['h', 0.04], ['s', 0.03], ['r', 0.025], ['l', 0.02], ['m', 0.015], ['t', 0.01], ['d', 0.005], ['k', 0.005]]) },
];

// ---- Temperature 0.7: More diverse ----
const walkthrough07: GenerationStep[] = [
  { position: 0, selectedToken: 'j', selectedProb: 0.09, probabilities: topProbs([['e', 0.16], ['a', 0.14], ['s', 0.12], ['m', 0.1], ['j', 0.09], ['l', 0.08], ['o', 0.07], ['n', 0.06], ['i', 0.05], ['d', 0.045]]) },
  { position: 1, selectedToken: 'a', selectedProb: 0.2, probabilities: topProbs([['a', 0.2], ['o', 0.16], ['u', 0.12], ['e', 0.11], ['i', 0.09], ['r', 0.08], ['h', 0.07], ['w', 0.06], ['y', 0.05], ['n', 0.04]]) },
  { position: 2, selectedToken: 'r', selectedProb: 0.18, probabilities: topProbs([['m', 0.2], ['r', 0.18], ['n', 0.14], ['s', 0.12], ['c', 0.1], ['d', 0.08], ['v', 0.06], ['l', 0.05], ['k', 0.04], ['z', 0.03]]) },
  { position: 3, selectedToken: 'e', selectedProb: 0.22, probabilities: topProbs([['e', 0.22], ['i', 0.18], ['a', 0.15], ['o', 0.12], ['u', 0.09], ['y', 0.07], ['.', 0.06], ['s', 0.04], ['d', 0.035], ['n', 0.025]]) },
  { position: 4, selectedToken: 't', selectedProb: 0.16, probabilities: topProbs([['t', 0.16], ['n', 0.15], ['s', 0.14], ['l', 0.12], ['d', 0.1], ['.', 0.09], ['r', 0.07], ['th', 0.06], ['m', 0.05], ['k', 0.04]]) },
  { position: 5, selectedToken: 'h', selectedProb: 0.28, probabilities: topProbs([['h', 0.28], ['.', 0.22], ['e', 0.14], ['a', 0.1], ['i', 0.08], ['o', 0.06], ['s', 0.04], ['r', 0.03], ['n', 0.025], ['y', 0.015]]) },
  { position: 6, selectedToken: '.', selectedProb: 0.65, probabilities: topProbs([['.', 0.65], ['e', 0.1], ['a', 0.07], ['i', 0.05], ['o', 0.04], ['s', 0.03], ['r', 0.02], ['n', 0.015], ['y', 0.01], ['u', 0.005]]) },
];

// ---- Temperature 1.0: Creative mix ----
const walkthrough10: GenerationStep[] = [
  { position: 0, selectedToken: 'z', selectedProb: 0.04, probabilities: topProbs([['e', 0.1], ['a', 0.09], ['s', 0.08], ['m', 0.07], ['j', 0.07], ['l', 0.06], ['o', 0.06], ['n', 0.055], ['i', 0.05], ['z', 0.04]]) },
  { position: 1, selectedToken: 'e', selectedProb: 0.12, probabilities: topProbs([['e', 0.12], ['a', 0.11], ['o', 0.1], ['i', 0.09], ['u', 0.08], ['r', 0.07], ['h', 0.07], ['y', 0.06], ['w', 0.055], ['n', 0.05]]) },
  { position: 2, selectedToken: 'p', selectedProb: 0.08, probabilities: topProbs([['n', 0.11], ['l', 0.1], ['p', 0.08], ['r', 0.08], ['s', 0.08], ['m', 0.07], ['d', 0.07], ['v', 0.06], ['t', 0.06], ['f', 0.05]]) },
  { position: 3, selectedToken: 'h', selectedProb: 0.1, probabilities: topProbs([['h', 0.1], ['e', 0.1], ['i', 0.09], ['a', 0.09], ['o', 0.08], ['u', 0.07], ['r', 0.07], ['y', 0.06], ['.', 0.05], ['s', 0.05]]) },
  { position: 4, selectedToken: 'i', selectedProb: 0.12, probabilities: topProbs([['i', 0.12], ['e', 0.11], ['a', 0.1], ['o', 0.09], ['y', 0.08], ['.', 0.08], ['u', 0.07], ['r', 0.06], ['s', 0.05], ['n', 0.05]]) },
  { position: 5, selectedToken: 'r', selectedProb: 0.1, probabilities: topProbs([['r', 0.1], ['n', 0.1], ['s', 0.09], ['.', 0.09], ['l', 0.08], ['a', 0.08], ['d', 0.07], ['t', 0.07], ['m', 0.06], ['k', 0.05]]) },
  { position: 6, selectedToken: 'a', selectedProb: 0.14, probabilities: topProbs([['a', 0.14], ['.', 0.13], ['e', 0.11], ['i', 0.1], ['o', 0.09], ['u', 0.07], ['y', 0.06], ['s', 0.05], ['n', 0.05], ['r', 0.04]]) },
  { position: 7, selectedToken: '.', selectedProb: 0.55, probabilities: topProbs([['.', 0.55], ['n', 0.1], ['s', 0.08], ['h', 0.06], ['l', 0.05], ['r', 0.04], ['d', 0.04], ['t', 0.03], ['m', 0.025], ['k', 0.02]]) },
];

// ---- Temperature 1.5: Unusual ----
const walkthrough15: GenerationStep[] = [
  { position: 0, selectedToken: 'x', selectedProb: 0.04, probabilities: topProbs([['e', 0.06], ['a', 0.06], ['s', 0.055], ['x', 0.04], ['m', 0.05], ['j', 0.045], ['l', 0.045], ['o', 0.045], ['z', 0.04], ['q', 0.035]]) },
  { position: 1, selectedToken: 'y', selectedProb: 0.05, probabilities: topProbs([['a', 0.07], ['e', 0.065], ['o', 0.06], ['i', 0.055], ['y', 0.05], ['u', 0.05], ['r', 0.045], ['h', 0.04], ['w', 0.04], ['n', 0.04]]) },
  { position: 2, selectedToken: 'm', selectedProb: 0.05, probabilities: topProbs([['n', 0.06], ['m', 0.05], ['l', 0.05], ['r', 0.05], ['s', 0.05], ['p', 0.045], ['d', 0.045], ['v', 0.04], ['t', 0.04], ['f', 0.04]]) },
  { position: 3, selectedToken: 'o', selectedProb: 0.06, probabilities: topProbs([['o', 0.06], ['e', 0.055], ['a', 0.055], ['i', 0.05], ['u', 0.05], ['y', 0.045], ['r', 0.04], ['.', 0.04], ['s', 0.04], ['h', 0.035]]) },
  { position: 4, selectedToken: 'r', selectedProb: 0.05, probabilities: topProbs([['r', 0.05], ['n', 0.05], ['s', 0.05], ['l', 0.048], ['t', 0.045], ['d', 0.045], ['.', 0.04], ['m', 0.04], ['a', 0.04], ['k', 0.035]]) },
  { position: 5, selectedToken: 'a', selectedProb: 0.06, probabilities: topProbs([['a', 0.06], ['.', 0.055], ['e', 0.055], ['i', 0.05], ['o', 0.045], ['u', 0.04], ['y', 0.04], ['s', 0.035], ['n', 0.035], ['r', 0.035]]) },
  { position: 6, selectedToken: '.', selectedProb: 0.15, probabilities: topProbs([['.', 0.15], ['n', 0.08], ['s', 0.07], ['r', 0.065], ['l', 0.06], ['h', 0.055], ['a', 0.05], ['e', 0.05], ['t', 0.045], ['d', 0.04]]) },
];

// ---- Temperature 2.0: Chaotic ----
const walkthrough20: GenerationStep[] = [
  { position: 0, selectedToken: 'x', selectedProb: 0.038, probabilities: topProbs([['x', 0.038], ['q', 0.038], ['z', 0.038], ['j', 0.038], ['k', 0.038], ['w', 0.038], ['b', 0.038], ['p', 0.038], ['v', 0.037], ['f', 0.037]]) },
  { position: 1, selectedToken: 'q', selectedProb: 0.038, probabilities: topProbs([['q', 0.038], ['z', 0.038], ['x', 0.038], ['j', 0.038], ['k', 0.038], ['w', 0.037], ['m', 0.037], ['b', 0.037], ['v', 0.037], ['r', 0.037]]) },
  { position: 2, selectedToken: 'z', selectedProb: 0.038, probabilities: topProbs([['z', 0.038], ['j', 0.038], ['k', 0.038], ['w', 0.037], ['x', 0.037], ['q', 0.037], ['m', 0.037], ['b', 0.037], ['r', 0.037], ['t', 0.037]]) },
  { position: 3, selectedToken: 'j', selectedProb: 0.038, probabilities: topProbs([['j', 0.038], ['k', 0.038], ['w', 0.038], ['z', 0.037], ['x', 0.037], ['q', 0.037], ['m', 0.037], ['b', 0.037], ['r', 0.037], ['t', 0.037]]) },
  { position: 4, selectedToken: 'k', selectedProb: 0.038, probabilities: topProbs([['k', 0.038], ['w', 0.038], ['z', 0.037], ['j', 0.037], ['x', 0.037], ['q', 0.037], ['m', 0.037], ['b', 0.037], ['r', 0.037], ['.', 0.037]]) },
  { position: 5, selectedToken: 'w', selectedProb: 0.038, probabilities: topProbs([['w', 0.038], ['.', 0.038], ['z', 0.037], ['k', 0.037], ['j', 0.037], ['x', 0.037], ['q', 0.037], ['m', 0.037], ['b', 0.037], ['r', 0.037]]) },
  { position: 6, selectedToken: '.', selectedProb: 0.06, probabilities: topProbs([['.', 0.06], ['z', 0.04], ['k', 0.04], ['j', 0.04], ['x', 0.04], ['w', 0.04], ['q', 0.038], ['m', 0.038], ['b', 0.038], ['r', 0.038]]) },
];

export const GENERATION_SAMPLES: GenerationSample[] = [
  {
    temperature: 0.1,
    names: ['emma', 'emma', 'emma', 'anna', 'anna', 'emma', 'anna', 'emma'],
    walkthrough: walkthrough01,
  },
  {
    temperature: 0.3,
    names: ['emma', 'anna', 'sophia', 'emma', 'olivia', 'anna', 'sophia', 'emma'],
    walkthrough: walkthrough03,
  },
  {
    temperature: 0.5,
    names: ['emma', 'sophia', 'james', 'olivia', 'liam', 'anna', 'noah', 'mia'],
    walkthrough: walkthrough05,
  },
  {
    temperature: 0.7,
    names: ['emma', 'jareth', 'sophia', 'kael', 'mira', 'tobin', 'lena', 'drew'],
    walkthrough: walkthrough07,
  },
  {
    temperature: 1.0,
    names: ['emma', 'zephira', 'kvothe', 'nimue', 'theron', 'aelara', 'brix', 'solene'],
    walkthrough: walkthrough10,
  },
  {
    temperature: 1.5,
    names: ['xymora', 'jquenthis', 'aeliox', 'brvanna', 'kwipho', 'zeltrix', 'umfara', 'pvoth'],
    walkthrough: walkthrough15,
  },
  {
    temperature: 2.0,
    names: ['xqzjkw', 'mmtbrfv', 'aaazzz', 'jjxqwp', 'rrrtbm', 'zzzqqq', 'xxmmvv', 'ppllkk'],
    walkthrough: walkthrough20,
  },
];
