'use client';

import { useState, useCallback, useRef } from 'react';
import { Play, RotateCcw, ArrowLeft } from 'lucide-react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import {
  COMPUTATION_NODES,
  COMPUTATION_EDGES,
  CHAIN_RULES,
} from '@/lib/explainers/microgpt-computation-graph';

type Mode = 'idle' | 'forward' | 'backward';
type NodeState = 'default' | 'forward-active' | 'backward-active' | 'completed';
type EdgeState = 'default' | 'forward' | 'backward';

const FORWARD_ORDER = ['a', 'b', 'c', 'mul', 'add', 'out'];
const BACKWARD_ORDER = ['out', 'add', 'mul', 'c', 'b', 'a'];

const FORWARD_EXPLANATIONS: Record<string, string> = {
  a: 'Input a = 2 enters the graph.',
  b: 'Input b = -3 enters the graph.',
  c: 'Input c = 10 enters the graph.',
  mul: 'Multiply: a x b = 2 x (-3) = -6',
  add: 'Add: (a x b) + c = -6 + 10 = 4',
  out: 'Output L = 4. Forward pass complete.',
};

const BACKWARD_EXPLANATIONS: Record<string, string> = {
  out: 'Start backprop: dL/dL = 1 (gradient of output w.r.t. itself).',
  add: 'Addition passes gradient through unchanged: dL/d(add) = 1.',
  mul: 'Multiplication distributes: dL/d(mul) = dL/d(add) x 1 = 1.',
  c: 'dL/dc = dL/d(add) x d(add)/dc = 1 x 1 = 1.',
  b: 'dL/db = dL/d(mul) x d(mul)/db = 1 x a = 1 x 2 = 2.',
  a: 'dL/da = dL/d(mul) x d(mul)/da = 1 x b = 1 x (-3) = -3.',
};

function getNodeById(id: string) {
  return COMPUTATION_NODES.find((n) => n.id === id)!;
}

function getChainRule(nodeId: string) {
  return CHAIN_RULES.find((r) => r.nodeId === nodeId)?.formula;
}

export default function AutogradSection() {
  const [mode, setMode] = useState<Mode>('idle');
  const [nodeStates, setNodeStates] = useState<Record<string, NodeState>>({});
  const [edgeStates, setEdgeStates] = useState<Record<string, EdgeState>>({});
  const [explanation, setExplanation] = useState('Press "Forward Pass" to begin computing values through the graph.');
  const [forwardDone, setForwardDone] = useState(false);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimeouts = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];
  }, []);

  const reset = useCallback(() => {
    clearTimeouts();
    setMode('idle');
    setNodeStates({});
    setEdgeStates({});
    setForwardDone(false);
    setExplanation('Press "Forward Pass" to begin computing values through the graph.');
  }, [clearTimeouts]);

  const runForward = useCallback(() => {
    clearTimeouts();
    setMode('forward');
    setNodeStates({});
    setEdgeStates({});
    setForwardDone(false);

    FORWARD_ORDER.forEach((nodeId, i) => {
      const t = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, [nodeId]: 'forward-active' }));
        setExplanation(FORWARD_EXPLANATIONS[nodeId]);

        // Activate edges leading to this node
        COMPUTATION_EDGES.forEach((edge) => {
          if (edge.to === nodeId) {
            setEdgeStates((prev) => ({
              ...prev,
              [`${edge.from}-${edge.to}`]: 'forward',
            }));
          }
        });

        if (i === FORWARD_ORDER.length - 1) {
          const doneTimeout = setTimeout(() => {
            setForwardDone(true);
            setExplanation('Forward pass complete. All values computed. Now try the backward pass.');
          }, 400);
          timeoutsRef.current.push(doneTimeout);
        }
      }, i * 500);
      timeoutsRef.current.push(t);
    });
  }, [clearTimeouts]);

  const runBackward = useCallback(() => {
    if (!forwardDone) return;
    clearTimeouts();
    setMode('backward');

    // Keep forward values visible by marking all as completed
    const completedNodes: Record<string, NodeState> = {};
    FORWARD_ORDER.forEach((id) => {
      completedNodes[id] = 'completed';
    });
    setNodeStates(completedNodes);
    setEdgeStates({});

    BACKWARD_ORDER.forEach((nodeId, i) => {
      const t = setTimeout(() => {
        setNodeStates((prev) => ({ ...prev, [nodeId]: 'backward-active' }));
        setExplanation(BACKWARD_EXPLANATIONS[nodeId]);

        // Activate edges flowing backward from this node
        COMPUTATION_EDGES.forEach((edge) => {
          if (edge.to === nodeId) {
            setEdgeStates((prev) => ({
              ...prev,
              [`${edge.from}-${edge.to}`]: 'backward',
            }));
          }
        });

        if (i === BACKWARD_ORDER.length - 1) {
          const doneTimeout = setTimeout(() => {
            // Mark all as completed with gradients
            const final: Record<string, NodeState> = {};
            COMPUTATION_NODES.forEach((n) => {
              final[n.id] = 'completed';
            });
            setNodeStates(final);
            setExplanation('Backward pass complete. Every node now has a gradient showing how the output changes with respect to that value.');
          }, 400);
          timeoutsRef.current.push(doneTimeout);
        }
      }, i * 600);
      timeoutsRef.current.push(t);
    });
  }, [forwardDone, clearTimeouts]);

  const nodeRadius = (type: string) => {
    if (type === 'output') return 36;
    if (type === 'operation') return 28;
    return 30;
  };

  const nodeColor = (id: string, state: NodeState | undefined) => {
    switch (state) {
      case 'forward-active':
        return {
          fill: 'rgba(74, 144, 217, 0.15)',
          stroke: 'var(--forward-blue)',
          strokeWidth: 2.5,
        };
      case 'backward-active':
        return {
          fill: 'rgba(232, 115, 74, 0.15)',
          stroke: 'var(--backward-orange)',
          strokeWidth: 2.5,
        };
      case 'completed':
        return {
          fill: 'var(--bg-card)',
          stroke: 'var(--border)',
          strokeWidth: 2,
        };
      default:
        return {
          fill: 'var(--bg-card)',
          stroke: 'var(--border)',
          strokeWidth: 1.5,
        };
    }
  };

  return (
    <SectionWrapper id="autograd">
      <div className="py-24 px-6">
        <div className="max-w-4xl mx-auto">
          {/* Heading */}
          <h2 className="font-serif text-4xl md:text-5xl text-text-primary mb-4">
            The Engine of Learning
          </h2>
          <p className="text-lg text-text-secondary mb-12 max-w-2xl">
            Autograd traces every computation, then flows gradients backward to learn.
          </p>

          {/* SVG Graph */}
          <div className="flex justify-center mb-8">
            <svg
              viewBox="0 0 700 500"
              className="w-full max-w-3xl"
              style={{ minHeight: 320 }}
            >
              <defs>
                <marker
                  id="arrow-default"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--text-tertiary)" />
                </marker>
                <marker
                  id="arrow-blue"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--forward-blue)" />
                </marker>
                <marker
                  id="arrow-orange"
                  viewBox="0 0 10 10"
                  refX="10"
                  refY="5"
                  markerWidth="6"
                  markerHeight="6"
                  orient="auto-start-reverse"
                >
                  <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--backward-orange)" />
                </marker>
              </defs>

              {/* Edges */}
              {COMPUTATION_EDGES.map((edge) => {
                const from = getNodeById(edge.from);
                const to = getNodeById(edge.to);
                const r = nodeRadius(to.type);
                const edgeKey = `${edge.from}-${edge.to}`;
                const state = edgeStates[edgeKey];

                // Calculate direction to offset endpoint by radius
                const dx = to.x - from.x;
                const dy = to.y - from.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const endX = to.x - (dx / dist) * (r + 6);
                const endY = to.y - (dy / dist) * (r + 6);
                const startX = from.x + (dx / dist) * (nodeRadius(from.type) + 6);
                const startY = from.y + (dy / dist) * (nodeRadius(from.type) + 6);

                const isForward = state === 'forward';
                const isBackward = state === 'backward';
                const markerEnd = isForward
                  ? 'url(#arrow-blue)'
                  : isBackward
                  ? 'url(#arrow-orange)'
                  : 'url(#arrow-default)';

                return (
                  <line
                    key={edgeKey}
                    x1={startX}
                    y1={startY}
                    x2={endX}
                    y2={endY}
                    stroke={
                      isForward
                        ? 'var(--forward-blue)'
                        : isBackward
                        ? 'var(--backward-orange)'
                        : 'var(--text-tertiary)'
                    }
                    strokeWidth={isForward || isBackward ? 2.5 : 1.5}
                    strokeDasharray={isForward || isBackward ? '8 4' : 'none'}
                    markerEnd={markerEnd}
                    style={
                      isForward
                        ? { animation: 'flow-forward 0.8s ease-out forwards' }
                        : isBackward
                        ? { animation: 'flow-backward 0.8s ease-out forwards' }
                        : undefined
                    }
                    opacity={isForward || isBackward ? 1 : 0.4}
                  />
                );
              })}

              {/* Nodes */}
              {COMPUTATION_NODES.map((node) => {
                const state = nodeStates[node.id];
                const r = nodeRadius(node.type);
                const colors = nodeColor(node.id, state);
                const showValue =
                  state === 'forward-active' || state === 'completed';
                const showGradient =
                  state === 'backward-active' || state === 'completed';
                const chainRule = getChainRule(node.id);

                return (
                  <g key={node.id}>
                    {/* Node circle */}
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r}
                      fill={colors.fill}
                      stroke={colors.stroke}
                      strokeWidth={colors.strokeWidth}
                      className="transition-all duration-300"
                    />

                    {/* Label above node */}
                    <text
                      x={node.x}
                      y={node.y - r - 12}
                      textAnchor="middle"
                      className="text-sm font-mono"
                      fill="var(--text-secondary)"
                    >
                      {node.type === 'operation' ? '' : node.label}
                    </text>

                    {/* Operator or label inside */}
                    <text
                      x={node.x}
                      y={node.y + 1}
                      textAnchor="middle"
                      dominantBaseline="central"
                      className={`font-semibold ${
                        node.type === 'operation' ? 'text-[20px]' : 'text-[15px]'
                      }`}
                      fill={
                        state === 'forward-active'
                          ? 'var(--forward-blue)'
                          : state === 'backward-active'
                          ? 'var(--backward-orange)'
                          : 'var(--text-primary)'
                      }
                    >
                      {node.type === 'operation' ? node.label : node.label}
                    </text>

                    {/* Value (below node, shown on forward) */}
                    {showValue && node.value !== null && (
                      <text
                        x={node.x}
                        y={node.y + r + 18}
                        textAnchor="middle"
                        className="text-sm font-mono"
                        fill="var(--forward-blue)"
                      >
                        val={node.value}
                      </text>
                    )}

                    {/* Gradient (below value, shown on backward) */}
                    {showGradient && node.gradient !== null && (
                      <text
                        x={node.x}
                        y={node.y + r + (showValue ? 34 : 18)}
                        textAnchor="middle"
                        className="text-sm font-mono"
                        fill="var(--backward-orange)"
                      >
                        grad={node.gradient}
                      </text>
                    )}

                    {/* Chain rule formula (shown during backward for inputs) */}
                    {state === 'backward-active' && chainRule && (
                      <foreignObject
                        x={node.x - 120}
                        y={node.y + r + 42}
                        width={240}
                        height={40}
                      >
                        <div className="text-xs sm:text-sm font-mono text-backward-orange text-center bg-bg-primary/80 rounded px-1 py-0.5">
                          {chainRule}
                        </div>
                      </foreignObject>
                    )}
                  </g>
                );
              })}
            </svg>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
            <button
              onClick={runForward}
              disabled={mode === 'forward'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-medium text-sm
                bg-forward-blue text-white transition-all hover:opacity-90
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <Play size={16} />
              Forward Pass
            </button>
            <button
              onClick={runBackward}
              disabled={!forwardDone || mode === 'backward'}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-medium text-sm
                bg-backward-orange text-white transition-all hover:opacity-90
                disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <ArrowLeft size={16} />
              Backward Pass
            </button>
            <button
              onClick={reset}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg font-sans font-medium text-sm
                border border-border text-text-secondary bg-bg-card
                transition-all hover:bg-bg-secondary"
            >
              <RotateCcw size={16} />
              Reset
            </button>
          </div>

          {/* Explanation panel */}
          <div className="bg-bg-card border border-border rounded-xl px-6 py-4 max-w-2xl mx-auto">
            <p className="text-sm text-text-secondary font-sans leading-relaxed transition-all duration-300">
              {explanation}
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
