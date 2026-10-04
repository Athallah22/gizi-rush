import { useEffect, useState } from "react";
import type { GameState, Team } from "../../types/game";

const KEY = "gizi-rush-session";
const TEAM_ICONS = ["🍎", "🥕", "🥑", "🍌", "🍇", "🍉"];
const TEAM_NAMES = ["Apel", "Wortel", "Alpukat", "Pisang"];

const DEFAULT_TEAMS: Team[] = TEAM_NAMES.map((name, i) => ({ id: `t${i + 1}`, name, icon: TEAM_ICONS[i], score: 0 }));

const INIT: GameState = {
  status: "setup",
  currentRound: "mitos_fakta",
  currentQuestion: 0,
  teams: DEFAULT_TEAMS,
  plate: [],
  revealState: false,
  completed: {},
};

export function useGame() {
  const [lastAward, setLastAward] = useState<{ ids: string[]; points: number } | null>(null);
  const [state, setState] = useState<GameState>(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return INIT;
      const parsed = JSON.parse(raw) as Partial<GameState>;
      return { ...INIT, ...parsed, completed: { ...(parsed.completed ?? {}) } };
    } catch {
      return INIT;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(state));
    } catch {
      // ponytail: localStorage penuh, abaikan agar game tidak crash
    }
  }, [state]);

  const patch = (p: Partial<GameState>) => setState((s) => ({ ...s, ...p }));
  const setPlate = (plate: string[]) => patch({ plate });
  const resetGame = () => {
    setLastAward(null);
    patch({ ...INIT, teams: state.teams.map((t) => ({ ...t, score: 0 })), completed: {} });
  };
  const addTeam = (name: string) => {
    if (state.teams.length >= 6) return;
    const i = state.teams.length;
    patch({ teams: [...state.teams, { id: `t${Date.now()}`, name: name || `Tim ${i + 1}`, icon: TEAM_ICONS[i % TEAM_ICONS.length], score: 0 }] });
  };
  const removeTeam = (id: string) => {
    if (state.teams.length <= 2) return;
    patch({ teams: state.teams.filter((t) => t.id !== id) });
  };
  const addScoreMany = (ids: string[], points: number) => {
    if (ids.length === 0) return;
    setLastAward({ ids, points });
    patch({ teams: state.teams.map((t) => (ids.includes(t.id) ? { ...t, score: t.score + points } : t)) });
  };
  const undoLast = () => {
    if (!lastAward) return;
    const { ids, points } = lastAward;
    patch({ teams: state.teams.map((t) => (ids.includes(t.id) ? { ...t, score: t.score - points } : t)) });
    setLastAward(null);
  };
  const markDone = (level: number) =>
    patch({ completed: { ...state.completed, [state.currentRound]: Math.max(state.completed[state.currentRound] ?? 0, level) } });
  const goMenu = () => patch({ status: "menu", revealState: false });

  return { state, patch, addScoreMany, undoLast, hasUndo: lastAward !== null, setPlate, resetGame, addTeam, removeTeam, markDone, goMenu };
}
