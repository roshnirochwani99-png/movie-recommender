import { Movie } from "@/types/movie";

// tokenize & lowercase
function tokenize(text: string): string[] {
  return text.toLowerCase().replace(/[^a-zA-Z0-9 ]/g, "").split(/\s+/);
}

export function tfidfSimilarity(a: string, b: string): number {
  const wordsA = tokenize(a);
  const wordsB = tokenize(b);

  const freqA: Record<string, number> = {};
  const freqB: Record<string, number> = {};

  wordsA.forEach((w) => (freqA[w] = (freqA[w] || 0) + 1));
  wordsB.forEach((w) => (freqB[w] = (freqB[w] || 0) + 1));

  const uniqueWords = new Set([...Object.keys(freqA), ...Object.keys(freqB)]);

  let dot = 0;
  let magA = 0;
  let magB = 0;

  uniqueWords.forEach((w) => {
    const v1 = freqA[w] || 0;
    const v2 = freqB[w] || 0;
    dot += v1 * v2;
    magA += v1 * v1;
    magB += v2 * v2;
  });

  return dot / (Math.sqrt(magA) * Math.sqrt(magB) + 1e-10);
}
