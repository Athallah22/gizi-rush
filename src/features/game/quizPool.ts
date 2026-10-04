import type { Question, RoundType } from "../../types/game";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function pick5(pool: Question[], seed: number): Question[] {
  const rand = mulberry32(seed);
  return [1, 2, 3, 4, 5].map((level) => {
    const cands = pool.filter((q) => q.level === level);
    if (cands.length === 0) return pool[Math.floor(rand() * pool.length)];
    return cands[Math.floor(rand() * cands.length)];
  });
}

export type QuizRound = Exclude<RoundType, "susun_piring">;
