'use client';

import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import SectionWrapper from '@/components/explainers/shared/SectionWrapper';
import CodeBlock from '../CodeBlock';

const CODE_SNIPPET = `# MicroGPT — The Complete Algorithm (~150 lines)
import torch
import torch.nn.functional as F

# 1. Tokenization
chars = sorted(set(open('names.txt').read()))
stoi = {c:i for i,c in enumerate(chars)}
itos = {i:c for c,i in stoi.items()}

# 2. Transformer Block
class Block(torch.nn.Module):
    def __init__(self, n_embd, n_head):
        self.attn = CausalSelfAttention(n_embd, n_head)
        self.mlp = MLP(n_embd)
        self.ln1 = RMSNorm(n_embd)
        self.ln2 = RMSNorm(n_embd)
    def forward(self, x):
        x = x + self.attn(self.ln1(x))
        x = x + self.mlp(self.ln2(x))
        return x

# 3. Training Loop
optimizer = torch.optim.AdamW(model.parameters(), lr=1e-2)
for step in range(1000):
    logits = model(xb)
    loss = F.cross_entropy(logits, yb)
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

# 4. Generation
def generate(model, max_len=10, temperature=0.8):
    idx = torch.zeros(1, 1, dtype=torch.long)
    for _ in range(max_len):
        logits = model(idx)[:, -1, :] / temperature
        probs = F.softmax(logits, dim=-1)
        next_id = torch.multinomial(probs, 1)
        idx = torch.cat([idx, next_id], dim=1)
    return decode(idx[0].tolist())`;

const SECTIONS = [
  { label: 'Tokenization', lines: [5, 6, 7, 8], color: 'text-accent-purple' },
  { label: 'Transformer Block', lines: [11, 12, 13, 14, 15, 16, 17, 18, 19, 20], color: 'text-forward-blue' },
  { label: 'Training Loop', lines: [23, 24, 25, 26, 27, 28], color: 'text-backward-orange' },
  { label: 'Generation', lines: [31, 32, 33, 34, 35, 36, 37, 38, 39], color: 'text-correct-green' },
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setActiveIndex((prev) => (prev + 1) % SECTIONS.length);
        setFading(false);
      }, 300);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const active = SECTIONS[activeIndex];

  return (
    <SectionWrapper id="hero">
      <div className="min-h-screen flex flex-col items-center justify-center py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          {/* Headline */}
          <h1 className="font-serif italic text-5xl md:text-7xl text-text-primary mb-6 leading-tight">
            The Complete Algorithm.
          </h1>

          {/* Subtitle */}
          <p className="font-sans text-xl md:text-2xl text-text-secondary mb-8">
            Everything Else Is Just Efficiency.
          </p>

          {/* Description */}
          <p className="font-sans text-base md:text-lg text-text-tertiary max-w-2xl mx-auto mb-16 leading-relaxed">
            Andrej Karpathy&apos;s MicroGPT is a ~150-line Python implementation of a
            character-level GPT. It trains a transformer to generate names. This is
            every concept, visualized.
          </p>

          {/* Section label */}
          <div className="mb-4 h-8 flex items-center justify-center">
            <span
              className={`font-mono text-sm tracking-widest uppercase transition-opacity duration-300 ${active.color} ${
                fading ? 'opacity-0' : 'opacity-100'
              }`}
            >
              {active.label}
            </span>
          </div>

          {/* Code block */}
          <div
            className={`transition-opacity duration-300 ${
              fading ? 'opacity-70' : 'opacity-100'
            }`}
          >
            <CodeBlock
              code={CODE_SNIPPET}
              language="python"
              highlightLines={active.lines}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-16">
          <ChevronDown
            size={28}
            className="text-text-tertiary"
            style={{ animation: 'bounce-down 2s ease-in-out infinite' }}
          />
        </div>
      </div>
    </SectionWrapper>
  );
}
