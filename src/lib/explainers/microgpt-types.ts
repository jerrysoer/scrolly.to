export interface VocabEntry {
  char: string;
  id: number;
  label: string;
}

export interface Token {
  char: string;
  id: number;
  position: number;
}

export interface TrainingSnapshot {
  step: number;
  loss: number;
  learningRate: number;
  sampleName: string;
}

export interface AttentionHead {
  name: string;
  description: string;
  weights: number[][];
}

export interface AttentionPattern {
  name: string;
  tokens: string[];
  heads: AttentionHead[];
  steps: AttentionStep[];
}

export interface AttentionStep {
  label: string;
  description: string;
  formula: string;
}

export interface GenerationStep {
  position: number;
  probabilities: { token: string; prob: number }[];
  selectedToken: string;
  selectedProb: number;
}

export interface GenerationSample {
  temperature: number;
  names: string[];
  walkthrough: GenerationStep[];
}

export interface ComputationNode {
  id: string;
  label: string;
  type: 'input' | 'operation' | 'output';
  x: number;
  y: number;
  value: number | null;
  gradient: number | null;
  formula?: string;
}

export interface ComputationEdge {
  from: string;
  to: string;
}

export interface ArchitectureBlock {
  id: string;
  label: string;
  category: 'embedding' | 'normalization' | 'attention' | 'mlp' | 'output' | 'residual';
  description: string;
  code: string;
  formula: string;
}
