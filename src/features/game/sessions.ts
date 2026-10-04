import type { GameState, RoundType } from "../../types/game";

export const SESSION_ORDER: RoundType[] = ["mitos_fakta", "susun_piring", "food_battle", "guru_vs_siswa", "final"];

export const SESSION_META: Record<RoundType, { label: string; icon: string; points: string }> = {
  mitos_fakta: { label: "Mitos atau Fakta", icon: "🧠", points: "+100" },
  susun_piring: { label: "Susun Piring", icon: "🍱", points: "50–250" },
  food_battle: { label: "Food Battle", icon: "⚔️", points: "+150" },
  guru_vs_siswa: { label: "Guru vs Siswa", icon: "🧑‍🏫", points: "+200" },
  final: { label: "Final Rush", icon: "🔥", points: "+500" },
};

export function completedLevel(state: GameState, round: RoundType) {
  const c = state.completed as Record<string, number | undefined>;
  return c[round] ?? 0;
}

export function isUnlocked(state: GameState, index: number) {
  if (index === 0) return true;
  const prev = SESSION_ORDER[index - 1];
  return completedLevel(state, prev) >= 5;
}

export function sessionProgress(state: GameState, round: RoundType) {
  return Math.min(5, completedLevel(state, round));
}
