import { VocabEntry, Token } from './microgpt-types';

export const VOCAB_SIZE = 27;

export const VOCAB: VocabEntry[] = [
  { char: '.', id: 0, label: '\u27E8BOS\u27E9' },
  { char: 'a', id: 1, label: 'a' },
  { char: 'b', id: 2, label: 'b' },
  { char: 'c', id: 3, label: 'c' },
  { char: 'd', id: 4, label: 'd' },
  { char: 'e', id: 5, label: 'e' },
  { char: 'f', id: 6, label: 'f' },
  { char: 'g', id: 7, label: 'g' },
  { char: 'h', id: 8, label: 'h' },
  { char: 'i', id: 9, label: 'i' },
  { char: 'j', id: 10, label: 'j' },
  { char: 'k', id: 11, label: 'k' },
  { char: 'l', id: 12, label: 'l' },
  { char: 'm', id: 13, label: 'm' },
  { char: 'n', id: 14, label: 'n' },
  { char: 'o', id: 15, label: 'o' },
  { char: 'p', id: 16, label: 'p' },
  { char: 'q', id: 17, label: 'q' },
  { char: 'r', id: 18, label: 'r' },
  { char: 's', id: 19, label: 's' },
  { char: 't', id: 20, label: 't' },
  { char: 'u', id: 21, label: 'u' },
  { char: 'v', id: 22, label: 'v' },
  { char: 'w', id: 23, label: 'w' },
  { char: 'x', id: 24, label: 'x' },
  { char: 'y', id: 25, label: 'y' },
  { char: 'z', id: 26, label: 'z' },
];

export const charToId: Record<string, number> = Object.fromEntries(
  VOCAB.map((v) => [v.char, v.id])
);

export const idToChar: Record<number, string> = Object.fromEntries(
  VOCAB.map((v) => [v.id, v.char])
);

export function tokenize(name: string): Token[] {
  const tokens: Token[] = [{ char: '.', id: 0, position: 0 }];
  for (let i = 0; i < name.length; i++) {
    const ch = name[i].toLowerCase();
    const id = charToId[ch];
    if (id !== undefined) {
      tokens.push({ char: ch, id, position: i + 1 });
    }
  }
  return tokens;
}

export function detokenize(ids: number[]): string {
  return ids
    .filter((id) => id !== 0)
    .map((id) => idToChar[id] ?? '')
    .join('');
}
