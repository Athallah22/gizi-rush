import type { GameState, RoundType } from "../types/game";
import { SESSION_META, SESSION_ORDER, isUnlocked, sessionProgress } from "../features/game/sessions";
import { sfx } from "../utils/sound";

function Stars({ n }: { n: number }) {
  return <span className="text-xl">{"⭐".repeat(n)}{"☆".repeat(5 - n)}</span>;
}

function SessionCard({ state, r, i, onOpen, onShuffle }: { state: GameState; r: RoundType; i: number; onOpen: (r: RoundType) => void; onShuffle: (r: RoundType) => void }) {
  const open = isUnlocked(state, i);
  const done = sessionProgress(state, r);
  const full = done >= 5;
  const resume = open && !full && done > 0;
  const meta = SESSION_META[r];
  return (
    <div
      className={`card-stage animate-pop rounded-3xl p-5 text-left transition ${open ? "hover:scale-105" : "opacity-50"} ${full ? "border-2 border-green-400" : ""}`}
      style={{ animationDelay: `${i * 0.08}s` }}
    >
      <button
        disabled={!open}
        onClick={() => (open ? onOpen(r) : sfx.tick())}
        className="block w-full text-left"
      >
        <div className="flex items-center justify-between text-3xl">
          <span>{meta.icon}</span>
          <span>{full ? "✅" : open ? "▶️" : "🔒"}</span>
        </div>
        <div className="mt-2 text-2xl font-black">Level {i + 1}: {meta.label}</div>
        <div className="text-lg font-bold text-yellow-300">{meta.points} / soal</div>
        {resume && <div className="mt-1 inline-block rounded-full bg-yellow-300 px-3 py-0.5 text-sm font-black text-black">Lanjut L{done + 1} ▶️</div>}
        <div className="mt-2"><Stars n={done} /></div>
        <div className="mt-1 h-3 overflow-hidden rounded-full bg-white/15">
          <div className="h-full rounded-full bg-gradient-to-r from-green-400 to-yellow-400 transition-all" style={{ width: `${(done / 5) * 100}%` }} />
        </div>
      </button>
      {r !== "susun_piring" && open && (
        <button
          className="mt-2 rounded-full bg-white/15 px-4 py-1 text-sm font-bold hover:bg-white/25"
          onClick={(e) => { e.stopPropagation(); onShuffle(r); sfx.tick(); }}
          title="Acak 5 soal dari bank 10"
        >
          🔀 Acak soal
        </button>
      )}
    </div>
  );
}

export default function SessionMenu({ state, onOpen, onShuffle }: { state: GameState; onOpen: (r: RoundType) => void; onShuffle: (r: RoundType) => void }) {
  const top = SESSION_ORDER.slice(0, 3);
  const mid = SESSION_ORDER.slice(3, 5);
  return (
    <div className="mx-auto w-full max-w-5xl space-y-4 text-center">
      <h2 className="title-glow text-5xl font-black text-yellow-300">🎮 PILIH SESI GAME!</h2>
      <p className="text-xl font-bold text-neutral-200">Selesaikan berurutan — tiap sesi ada 5 level!</p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {top.map((r, k) => <SessionCard key={r} state={state} r={r} i={k} onOpen={onOpen} onShuffle={onShuffle} />)}
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {mid.map((r, k) => <SessionCard key={r} state={state} r={r} i={k + 3} onOpen={onOpen} onShuffle={onShuffle} />)}
      </div>
      <div className="card-stage rounded-3xl p-5 text-center">
        <div className="text-3xl">🏆</div>
        <div className="mt-2 text-2xl font-black">Result</div>
        <div className="text-lg text-neutral-300">Kebuka otomatis kalau semua sesi ⭐⭐⭐⭐⭐</div>
      </div>
    </div>
  );
}
