'use client';

import { useState } from 'react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import CodeBlock from '../CodeBlock';
import { ArchitectureBlock } from '@/lib/explainers/microgpt-types';
import { ChevronDown } from 'lucide-react';

const blocks: ArchitectureBlock[] = [
  {
    id: 'token-embed',
    label: 'Token Embedding',
    category: 'embedding',
    description:
      'Maps each token ID (0-26) to a learned vector of size n_embd. The model learns what each character "means" in a high-dimensional space.',
    code: 'tok_emb = nn.Embedding(vocab_size, n_embd)  # (27, 64)',
    formula: 'e_token = W_E[token_id]  \u2208 \u211D^{n_embd}',
  },
  {
    id: 'pos-embed',
    label: 'Position Embedding',
    category: 'embedding',
    description:
      "Adds a learned vector based on position (0 to block_size-1). Without this, the model wouldn't know if \"a\" came first or last.",
    code: 'pos_emb = nn.Embedding(block_size, n_embd)  # (8, 64)',
    formula: 'x = e_token + e_position',
  },
  {
    id: 'rmsnorm1',
    label: 'RMSNorm',
    category: 'normalization',
    description:
      'Root Mean Square normalization. Stabilizes training by normalizing activation magnitudes without shifting the mean.',
    code: 'def forward(self, x):\n    rms = (x ** 2).mean(-1, keepdim=True).sqrt()\n    return x / (rms + 1e-8) * self.weight',
    formula: 'RMSNorm(x) = x / \u221A(mean(x\u00B2) + \u03B5) \u00B7 \u03B3',
  },
  {
    id: 'attention',
    label: 'Multi-Head Attention',
    category: 'attention',
    description:
      'The core mechanism. Each head learns different patterns: one might track recency, another vowels. Causal masking ensures tokens only attend to previous positions.',
    code: 'Q, K, V = self.qkv(x).split(n_embd, dim=-1)\nattn = (Q @ K.T) / math.sqrt(d_k)\nattn = attn.masked_fill(mask == 0, -1e9)\nattn = F.softmax(attn, dim=-1)\nout = attn @ V',
    formula: 'Attention(Q,K,V) = softmax(QK\u1D40 / \u221Ad_k) \u00B7 V',
  },
  {
    id: 'residual1',
    label: 'Residual Connection',
    category: 'residual',
    description:
      'Adds the attention output back to the input. This "skip connection" helps gradients flow and lets the model choose how much to modify each token\'s representation.',
    code: 'x = x + self.attn(self.ln1(x))',
    formula: 'x = x + Attention(RMSNorm(x))',
  },
  {
    id: 'rmsnorm2',
    label: 'RMSNorm',
    category: 'normalization',
    description:
      'Second normalization before the MLP, again stabilizing activation magnitudes.',
    code: 'self.ln2 = RMSNorm(n_embd)',
    formula: 'RMSNorm(x) = x / \u221A(mean(x\u00B2) + \u03B5) \u00B7 \u03B3',
  },
  {
    id: 'mlp',
    label: 'MLP (Feed-Forward)',
    category: 'mlp',
    description:
      'A two-layer neural network that processes each token independently. The hidden layer is 4x wider, giving the model room to compute complex features before projecting back down.',
    code: 'def forward(self, x):\n    x = self.fc1(x)     # (n_embd \u2192 4*n_embd)\n    x = F.gelu(x)       # non-linearity\n    return self.fc2(x)  # (4*n_embd \u2192 n_embd)',
    formula: 'MLP(x) = W\u2082 \u00B7 GELU(W\u2081 \u00B7 x + b\u2081) + b\u2082',
  },
  {
    id: 'residual2',
    label: 'Residual Connection',
    category: 'residual',
    description:
      'Second skip connection, adding MLP output back to create the final block output.',
    code: 'x = x + self.mlp(self.ln2(x))',
    formula: 'x = x + MLP(RMSNorm(x))',
  },
  {
    id: 'output',
    label: 'Output Logits',
    category: 'output',
    description:
      'A final linear layer projects from n_embd to vocab_size (27), producing a score for each possible next character. Softmax converts these to probabilities.',
    code: 'logits = self.lm_head(x)  # (n_embd \u2192 27)',
    formula: 'logits = W_out \u00B7 x + b  \u2192  P(next) = softmax(logits)',
  },
];

const categoryColors: Record<ArchitectureBlock['category'], string> = {
  embedding: 'border-l-accent-purple',
  normalization: 'border-l-text-tertiary',
  attention: 'border-l-forward-blue',
  mlp: 'border-l-correct-green',
  residual: 'border-l-accent-amber',
  output: 'border-l-backward-orange',
};

const categoryDotColors: Record<ArchitectureBlock['category'], string> = {
  embedding: 'bg-accent-purple',
  normalization: 'bg-text-tertiary',
  attention: 'bg-forward-blue',
  mlp: 'bg-correct-green',
  residual: 'bg-accent-amber',
  output: 'bg-backward-orange',
};

export default function ArchitectureSection() {
  const [expandedBlock, setExpandedBlock] = useState<string | null>(null);

  const handleToggle = (id: string) => {
    setExpandedBlock((prev) => (prev === id ? null : id));
  };

  return (
    <SectionWrapper id="architecture">
      <div className="mx-auto max-w-3xl px-6 py-24">
        <h2 className="font-serif text-4xl font-bold tracking-tight text-text-primary md:text-5xl">
          The Transformer Architecture
        </h2>
        <p className="mt-4 text-lg text-text-secondary leading-relaxed">
          A stack of simple operations that, together, learn language.
        </p>

        <div className="relative mt-16">
          {/* Vertical connecting line */}
          <div
            className="absolute left-6 top-0 bottom-0 w-px border-l border-dashed border-border"
            aria-hidden="true"
          />

          <div className="flex flex-col gap-3">
            {blocks.map((block, index) => {
              const isExpanded = expandedBlock === block.id;

              return (
                <div key={block.id} className="relative">
                  {/* Connecting arrow between blocks */}
                  {index > 0 && (
                    <div className="flex justify-center -mt-1 mb-1" aria-hidden="true">
                      <svg width="12" height="16" viewBox="0 0 12 16" className="text-border">
                        <path
                          d="M6 0 L6 10 M2 7 L6 13 L10 7"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  )}

                  {/* Block card */}
                  <button
                    onClick={() => handleToggle(block.id)}
                    className={`group relative w-full cursor-pointer rounded-xl border-l-4 bg-bg-card text-left shadow-sm transition-all duration-300 hover:shadow-md ${categoryColors[block.category]} ${
                      isExpanded
                        ? 'ring-1 ring-border shadow-md'
                        : 'border border-l-4 border-border'
                    }`}
                    aria-expanded={isExpanded}
                  >
                    <div className="flex items-center gap-3 px-5 py-4">
                      <span
                        className={`h-2.5 w-2.5 shrink-0 rounded-full ${categoryDotColors[block.category]}`}
                      />
                      <span className="text-base font-medium text-text-primary font-sans">
                        {block.label}
                      </span>
                      <ChevronDown
                        size={16}
                        className={`ml-auto text-text-tertiary transition-transform duration-300 ${
                          isExpanded ? 'rotate-180' : ''
                        }`}
                      />
                    </div>
                  </button>

                  {/* Expanded content */}
                  <div
                    className={`grid transition-all duration-300 ease-in-out ${
                      isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div className="rounded-b-xl border border-t-0 border-border bg-bg-card px-5 pb-5 pt-2">
                        <p className="text-sm leading-relaxed text-text-secondary">
                          {block.description}
                        </p>

                        <div className="mt-4">
                          <CodeBlock code={block.code} language="python" />
                        </div>

                        <div className="mt-4 rounded-lg bg-bg-secondary px-4 py-3">
                          <span className="font-mono text-sm text-text-primary tracking-wide">
                            {block.formula}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
