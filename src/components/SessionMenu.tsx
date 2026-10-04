import type { GameState, RoundType } from "../types/game";
import { SESSION_META, SESSION_ORDER, isUnlocked, sessionProgress } from "../features/game/sessions";
import { sfx } from "../utils/sound";

function Stars({ n }: { n: number }) {
  return <span className="text-xl">{"⭐".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

export default function SessionMenu({ state, onOpen }: { state: GameState; onOpen: (r: RoundType) => void }) {
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 text-center">
      <h2 className="title-glow text-5xl font-black text-yellow-300">🎮 PILIH SESI GAME!</h2>
      <p className="text-xl font-bold text-neutral-200">Selesaikan berurutan — tiap sesi ada 5 level!</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SESSION_ORDER.map((r, i) => {
          const open = isUnlocked(state, i);
          const done = sessionProgress(state, r);
          const full = done >= 5;
          const meta = SESSION_META[r];
          return (
            <button
              key={r}
              disabled={!open}
              onClick={() => (open ? onOpen(r) : sfx.tick())}
              className={`card-stage animate-pop rounded-3xl p-5 text-left transition ${open ? "hover:scale-105" : "opacity-50"} ${full ? "border-2 border-green-400" : ""}`}
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="flex items-center justify-between text-3xl">
                <span>{meta.icon}</span>
                <span>{full ? "✅" : open ? "▶️" : "🔒"}</span>
              </div>
              <div className="mt-2 text-2xl font-black">Level {i + 1}: {meta.label}</div>
              <div className="text-lg font-bold text-yellow-300">{meta.points} / soal</div>
              <div className="mt-2"><Stars n={done} /></div>
              <div className="mt-1 h-3 overflow-hidden rounded-full bg-white/15">
                <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all" style={{ width: `${(done / 5) * 100}%` }} />
              </div>
            </button>
          );
        })}
        <div className="card-stage rounded-3xl p-5 text-left">
          <div className="text-3xl">🏆</div>
          <div className="mt-2 text-2xl font-black">Result</div>
          <div className="text-lg text-neutral-300">Kebuka otomatis kalau semua sesi ⭐⭐⭐⭐⭐</div>
        </div>
      </div>
    </div>
  );
}
