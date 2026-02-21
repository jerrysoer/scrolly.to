import { AttentionPattern, AttentionHead, AttentionStep } from './microgpt-types';

// Helper: normalize rows to sum to 1.0 (softmax-like)
function normalizeRows(matrix: number[][]): number[][] {
  return matrix.map((row) => {
    const sum = row.reduce((a, b) => a + b, 0);
    if (sum === 0) return row.map(() => 1 / row.length);
    return row.map((v) => Math.round((v / sum) * 1000) / 1000);
  });
}

// Apply causal mask: zero out future positions, then renormalize
function causalMask(matrix: number[][]): number[][] {
  const masked = matrix.map((row, i) => row.map((v, j) => (j <= i ? v : 0)));
  return normalizeRows(masked);
}

// ---- "emma" (tokens: ['.', 'e', 'm', 'm', 'a']) ----

const emmaRecency: number[][] = causalMask([
  [1.0, 0, 0, 0, 0],
  [0.1, 0.9, 0, 0, 0],
  [0.05, 0.15, 0.8, 0, 0],
  [0.03, 0.07, 0.2, 0.7, 0],
  [0.02, 0.03, 0.1, 0.25, 0.6],
]);

const emmaVowelTracker: number[][] = causalMask([
  [1.0, 0, 0, 0, 0],
  [0.3, 0.7, 0, 0, 0],
  [0.1, 0.7, 0.2, 0, 0],
  [0.08, 0.62, 0.15, 0.15, 0],
  [0.05, 0.45, 0.1, 0.1, 0.3],
]);

const emmaBigramDetector: number[][] = causalMask([
  [1.0, 0, 0, 0, 0],
  [0.8, 0.2, 0, 0, 0],
  [0.1, 0.8, 0.1, 0, 0],
  [0.05, 0.1, 0.8, 0.05, 0],
  [0.05, 0.05, 0.1, 0.7, 0.1],
]);

const emmaPositionEncoder: number[][] = causalMask([
  [1.0, 0, 0, 0, 0],
  [0.5, 0.5, 0, 0, 0],
  [0.35, 0.35, 0.3, 0, 0],
  [0.28, 0.27, 0.25, 0.2, 0],
  [0.24, 0.22, 0.2, 0.18, 0.16],
]);

const emmaHeads: AttentionHead[] = [
  { name: 'Head 0: Recency Bias', description: 'Heavily weights the most recent token, creating a strong diagonal-adjacent pattern useful for capturing local character dependencies.', weights: emmaRecency },
  { name: 'Head 1: Vowel Tracker', description: 'Attends strongly to vowel positions (e, a), helping the model learn vowel-consonant patterns common in names.', weights: emmaVowelTracker },
  { name: 'Head 2: Bigram Detector', description: 'Pairs of consecutive characters receive high attention, capturing common letter combinations like "em", "mm", "ma".', weights: emmaBigramDetector },
  { name: 'Head 3: Position Encoder', description: 'Nearly uniform attention with slight positional preference, providing a broad context view across all preceding tokens.', weights: emmaPositionEncoder },
];

// ---- "sophia" (tokens: ['.', 's', 'o', 'p', 'h', 'i', 'a']) ----

const sophiaRecency: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0, 0],
  [0.1, 0.9, 0, 0, 0, 0, 0],
  [0.05, 0.1, 0.85, 0, 0, 0, 0],
  [0.03, 0.05, 0.12, 0.8, 0, 0, 0],
  [0.02, 0.03, 0.05, 0.2, 0.7, 0, 0],
  [0.01, 0.02, 0.04, 0.08, 0.25, 0.6, 0],
  [0.01, 0.02, 0.03, 0.05, 0.09, 0.3, 0.5],
]);

const sophiaVowelTracker: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0, 0],
  [0.3, 0.7, 0, 0, 0, 0, 0],
  [0.15, 0.2, 0.65, 0, 0, 0, 0],
  [0.1, 0.15, 0.55, 0.2, 0, 0, 0],
  [0.08, 0.12, 0.45, 0.15, 0.2, 0, 0],
  [0.05, 0.1, 0.35, 0.1, 0.15, 0.25, 0],
  [0.04, 0.08, 0.25, 0.08, 0.1, 0.2, 0.25],
]);

const sophiaBigramDetector: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0, 0],
  [0.8, 0.2, 0, 0, 0, 0, 0],
  [0.1, 0.75, 0.15, 0, 0, 0, 0],
  [0.05, 0.1, 0.75, 0.1, 0, 0, 0],
  [0.05, 0.05, 0.1, 0.7, 0.1, 0, 0],
  [0.03, 0.05, 0.07, 0.1, 0.65, 0.1, 0],
  [0.02, 0.03, 0.05, 0.08, 0.12, 0.6, 0.1],
]);

const sophiaPositionEncoder: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0, 0],
  [0.5, 0.5, 0, 0, 0, 0, 0],
  [0.35, 0.33, 0.32, 0, 0, 0, 0],
  [0.27, 0.26, 0.25, 0.22, 0, 0, 0],
  [0.22, 0.21, 0.2, 0.19, 0.18, 0, 0],
  [0.19, 0.18, 0.17, 0.16, 0.15, 0.15, 0],
  [0.17, 0.16, 0.15, 0.14, 0.14, 0.13, 0.11],
]);

const sophiaHeads: AttentionHead[] = [
  { name: 'Head 0: Recency Bias', description: 'Strong diagonal pattern showing preference for the most recent token, decaying for earlier positions.', weights: sophiaRecency },
  { name: 'Head 1: Vowel Tracker', description: 'High attention to vowel positions (o at position 2, i at 5, a at 6), tracking the vowel rhythm of the name.', weights: sophiaVowelTracker },
  { name: 'Head 2: Bigram Detector', description: 'Strong adjacent-pair attention capturing bigrams: so, op, ph, hi, ia.', weights: sophiaBigramDetector },
  { name: 'Head 3: Position Encoder', description: 'Roughly uniform attention distribution providing global context across all positions.', weights: sophiaPositionEncoder },
];

// ---- "james" (tokens: ['.', 'j', 'a', 'm', 'e', 's']) ----

const jamesRecency: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0],
  [0.1, 0.9, 0, 0, 0, 0],
  [0.05, 0.12, 0.83, 0, 0, 0],
  [0.03, 0.07, 0.15, 0.75, 0, 0],
  [0.02, 0.04, 0.09, 0.25, 0.6, 0],
  [0.01, 0.03, 0.06, 0.1, 0.3, 0.5],
]);

const jamesVowelTracker: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0],
  [0.3, 0.7, 0, 0, 0, 0],
  [0.15, 0.15, 0.7, 0, 0, 0],
  [0.1, 0.1, 0.6, 0.2, 0, 0],
  [0.07, 0.08, 0.35, 0.1, 0.4, 0],
  [0.05, 0.07, 0.3, 0.08, 0.35, 0.15],
]);

const jamesBigramDetector: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0],
  [0.8, 0.2, 0, 0, 0, 0],
  [0.1, 0.75, 0.15, 0, 0, 0],
  [0.05, 0.1, 0.75, 0.1, 0, 0],
  [0.04, 0.06, 0.1, 0.7, 0.1, 0],
  [0.03, 0.05, 0.07, 0.1, 0.65, 0.1],
]);

const jamesPositionEncoder: number[][] = causalMask([
  [1.0, 0, 0, 0, 0, 0],
  [0.5, 0.5, 0, 0, 0, 0],
  [0.35, 0.33, 0.32, 0, 0, 0],
  [0.27, 0.26, 0.25, 0.22, 0, 0],
  [0.22, 0.21, 0.2, 0.19, 0.18, 0],
  [0.19, 0.18, 0.17, 0.16, 0.15, 0.15],
]);

const jamesHeads: AttentionHead[] = [
  { name: 'Head 0: Recency Bias', description: 'Strong recency weighting with most attention on the immediately preceding token.', weights: jamesRecency },
  { name: 'Head 1: Vowel Tracker', description: 'Tracks vowel positions (a at position 2, e at position 4) across the sequence.', weights: jamesVowelTracker },
  { name: 'Head 2: Bigram Detector', description: 'Captures consecutive character pairs: ja, am, me, es.', weights: jamesBigramDetector },
  { name: 'Head 3: Position Encoder', description: 'Broadly uniform attention providing positional context.', weights: jamesPositionEncoder },
];

// ---- Attention mechanism steps ----

const attentionSteps: AttentionStep[] = [
  {
    label: 'Input Embeddings',
    description: 'Token + position vectors',
    formula: 'x = tok_emb(token) + pos_emb(position)',
  },
  {
    label: 'Q, K, V Projection',
    description: 'Linear projections: Q=XW_Q, K=XW_K, V=XW_V',
    formula: 'Q = XW_Q,  K = XW_K,  V = XW_V',
  },
  {
    label: 'Dot Product',
    description: 'Attention scores: QK^T',
    formula: 'scores = Q \u00D7 K\u1D40',
  },
  {
    label: 'Scale + Softmax',
    description: 'Normalize: softmax(QK^T / \u221Ad_k)',
    formula: 'attn = softmax(scores / \u221Ad_k)',
  },
  {
    label: 'Weighted Sum',
    description: 'Output: Attention \u00D7 V',
    formula: 'out = attn \u00D7 V',
  },
];

export const ATTENTION_PATTERNS: AttentionPattern[] = [
  {
    name: 'emma',
    tokens: ['.', 'e', 'm', 'm', 'a'],
    heads: emmaHeads,
    steps: attentionSteps,
  },
  {
    name: 'sophia',
    tokens: ['.', 's', 'o', 'p', 'h', 'i', 'a'],
    heads: sophiaHeads,
    steps: attentionSteps,
  },
  {
    name: 'james',
    tokens: ['.', 'j', 'a', 'm', 'e', 's'],
    heads: jamesHeads,
    steps: attentionSteps,
  },
];
