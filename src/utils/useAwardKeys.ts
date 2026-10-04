import { useEffect } from "react";
import type { Team } from "../types/game";

export function useAwardKeys({ active, teams, onToggle, onAward }: {
  active: boolean;
  teams: Team[];
  onToggle: (id: string) => void;
  onAward: () => void;
}) {
  useEffect(() => {
    if (!active) return;
    const h = (e: KeyboardEvent) => {
      if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
        const t = teams[Number(e.key) - 1];
        if (t) onToggle(t.id);
      } else if (e.key === "s" || e.key === "S") {
        onAward();
      }
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [active, teams, onToggle, onAward]);
}
