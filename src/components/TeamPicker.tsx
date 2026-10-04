import type { Team } from "../types/game";
import { sfx } from "../utils/sound";

export default function TeamPicker({ teams, picked, onToggle, onAll, points, onAward, canUndo, onUndo }: {
  teams: Team[];
  picked: string[];
  onToggle: (id: string) => void;
  onAll: () => void;
  points: number;
  onAward: () => void;
  canUndo: boolean;
  onUndo: () => void;
}) {
  return (
    <div className="space-y-2">
      <p className="text-lg font-bold text-neutral-200">Tim yang benar? (tap / 1-{teams.length})</p>
      <div className="flex flex-wrap justify-center gap-2">
        {teams.map((t, i) => {
          const on = picked.includes(t.id);
          return (
            <button
              key={t.id}
              onClick={() => { onToggle(t.id); sfx.tick(); }}
              className={`rounded-full px-5 py-2 text-lg font-bold transition ${on ? "scale-105 bg-green-500 text-white shadow-lg" : "bg-white/15 hover:bg-white/25"}`}
            >
              {on ? "✅ " : ""}{i + 1}. {t.icon} {t.name}
            </button>
          );
        })}
        <button className="rounded-full bg-white/10 px-4 py-2 text-sm font-bold" onClick={onAll}>Semua</button>
      </div>
      <div className="flex items-center justify-center gap-2">
        <button
          disabled={picked.length === 0}
          onClick={onAward}
          className="btn-heboh px-8 py-3 text-xl disabled:opacity-40"
        >
          🏆 +{points} Skor ({picked.length} tim) (S)
        </button>
        {canUndo && (
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={onUndo}>↩ Undo</button>
        )}
      </div>
    </div>
  );
}
