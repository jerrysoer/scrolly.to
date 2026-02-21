import { ComputationNode, ComputationEdge } from './microgpt-types';

export const COMPUTATION_NODES: ComputationNode[] = [
  {
    id: 'a',
    label: 'a',
    type: 'input',
    x: 50,
    y: 100,
    value: 2,
    gradient: -3,
  },
  {
    id: 'b',
    label: 'b',
    type: 'input',
    x: 50,
    y: 250,
    value: -3,
    gradient: 2,
  },
  {
    id: 'c',
    label: 'c',
    type: 'input',
    x: 50,
    y: 400,
    value: 10,
    gradient: 1,
  },
  {
    id: 'mul',
    label: '\u00D7',
    type: 'operation',
    x: 250,
    y: 175,
    value: -6,
    gradient: 1,
    formula: '\u2202L/\u2202(a\u00D7b) = \u2202L/\u2202out \u00D7 1',
  },
  {
    id: 'add',
    label: '+',
    type: 'operation',
    x: 450,
    y: 280,
    value: 4,
    gradient: 1,
    formula: '\u2202L/\u2202out = 1',
  },
  {
    id: 'out',
    label: 'L',
    type: 'output',
    x: 600,
    y: 280,
    value: 4,
    gradient: 1,
  },
];

export const COMPUTATION_EDGES: ComputationEdge[] = [
  { from: 'a', to: 'mul' },
  { from: 'b', to: 'mul' },
  { from: 'mul', to: 'add' },
  { from: 'c', to: 'add' },
  { from: 'add', to: 'out' },
];

export const CHAIN_RULES: { nodeId: string; formula: string }[] = [
  {
    nodeId: 'a',
    formula: '\u2202L/\u2202a = \u2202L/\u2202(a\u00D7b) \u00D7 \u2202(a\u00D7b)/\u2202a = 1 \u00D7 b = -3',
  },
  {
    nodeId: 'b',
    formula: '\u2202L/\u2202b = \u2202L/\u2202(a\u00D7b) \u00D7 \u2202(a\u00D7b)/\u2202b = 1 \u00D7 a = 2',
  },
  {
    nodeId: 'c',
    formula: '\u2202L/\u2202c = \u2202L/\u2202(a+c) \u00D7 \u2202(a+c)/\u2202c = 1 \u00D7 1 = 1',
  },
];
