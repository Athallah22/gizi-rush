import { useCallback, useEffect, useState } from "react";
import Confetti from "./components/Confetti";
import Countdown from "./components/Countdown";
import Leaderboard from "./components/Leaderboard";
import Quiz from "./components/Quiz";
import SessionMenu from "./components/SessionMenu";
import SusunPiring from "./rounds/SusunPiring/SusunPiring";
import { useGame } from "./features/game/useGame";
import { SESSION_ORDER, completedLevel, isUnlocked } from "./features/game/sessions";
import mitos from "./data/mitos-fakta.json";
import battle from "./data/food-battle.json";
import gvs from "./data/guru-vs-siswa.json";
import finalQs from "./data/final.json";
import type { Question, RoundType } from "./types/game";
import { isSoundOn, setSoundOn, sfx } from "./utils/sound";

const LABEL: Record<RoundType, string> = {
  mitos_fakta: "🧠 Mitos atau Fakta",
  susun_piring: "🍱 Susun Piring",
  food_battle: "⚔️ Food Battle",
  guru_vs_siswa: "🧑‍🏫 Guru vs Siswa",
  final: "🔥 Final",
};

const QS: Record<Exclude<RoundType, "susun_piring">, Question[]> = {
  mitos_fakta: [...(mitos as Question[])].sort((a, b) => a.level - b.level),
  food_battle: [...(battle as Question[])].sort((a, b) => a.level - b.level),
  guru_vs_siswa: [...(gvs as Question[])].sort((a, b) => a.level - b.level),
  final: [...(finalQs as Question[])].sort((a, b) => a.level - b.level),
};

export default function App() {
  const { state, patch, addScoreMany, undoLast, hasUndo, setPlate, resetGame, addTeam, removeTeam, markDone, goMenu } = useGame();
  const [showBoard, setShowBoard] = useState(false);
  const [pending, setPending] = useState<RoundType | null>(null);
  const [muted, setMuted] = useState(!isSoundOn());

  const openSession = useCallback((r: RoundType) => {
    const i = SESSION_ORDER.indexOf(r);
    if (!isUnlocked(state, i)) {
      sfx.tick();
      return;
    }
    sfx.start();
    setPending(r);
  }, [state]);

  const nextQ = useCallback(() => {
    patch({ currentQuestion: Math.min(4, state.currentQuestion + 1), revealState: false });
  }, [state.currentQuestion, patch]);

  const prevQ = useCallback(() => {
    patch({ currentQuestion: Math.max(0, state.currentQuestion - 1), revealState: false });
  }, [state.currentQuestion, patch]);

  const reveal = useCallback((level: number) => {
    patch({ revealState: true });
    markDone(level);
  }, [patch, markDone]);

  const toggleReveal = useCallback((level: number) => {
    if (state.revealState) patch({ revealState: false });
    else reveal(level);
  }, [state.revealState, patch, reveal]);

  const toggleBoard = useCallback(() => setShowBoard((v) => !v), []);

  useEffect(() => {
    if (state.status !== "playing" && state.status !== "menu") return;
    if (state.status === "menu") {
      const h = (e: KeyboardEvent) => {
        if (e.key === "Tab") { e.preventDefault(); toggleBoard(); }
        else if (e.key === "m" || e.key === "M") {
          const v = isSoundOn();
          setSoundOn(!v);
          setMuted(v);
        }
        else if (e.key === "Escape") { setPending(null); setShowBoard(false); }
      };
      window.addEventListener("keydown", h);
      return () => window.removeEventListener("keydown", h);
    };
    const h = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") { e.preventDefault(); nextQ(); }
      else if (e.key === "ArrowLeft") { e.preventDefault(); prevQ(); }
      else if (e.key === "Tab") { e.preventDefault(); toggleBoard(); }
      else if (e.key === " ") { e.preventDefault(); goMenu(); }
      else if (e.key === "r" || e.key === "R") { if (state.currentRound !== "susun_piring") toggleReveal(state.currentQuestion + 1); }
      else if (e.key === "m" || e.key === "M") {
        const v = isSoundOn();
        setSoundOn(!v);
        setMuted(v);
      }
      else if (e.key === "Escape") setShowBoard(false);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [state.status, state.currentQuestion, state.currentRound, nextQ, prevQ, toggleBoard, goMenu, toggleReveal]);

  const allDone = SESSION_ORDER.every((r) => completedLevel(state, r) >= 5);

  useEffect(() => {
    if (allDone && state.status === "playing") {
      patch({ status: "finished" });
      sfx.winner();
    }
  }, [allDone, state.status, patch]);

  const toggleMute = () => {
    const v = !muted;
    setMuted(v);
    setSoundOn(!v);
  };

  if (state.status === "setup") {
    return (
      <main className="mx-auto max-w-2xl space-y-5 p-8 text-center">
        <img src="./images/maskot-gizi.svg" alt="Maskot Gizi Rush" className="animate-pop mx-auto h-40 w-40 drop-shadow-2xl" />
        <h1 className="title-glow text-7xl font-black text-yellow-300">🥗 GIZI RUSH!</h1>
        <p className="text-2xl font-bold">🔥 SIAPA PALING JAGO GIZI? (SMP) 🔥</p>
        <p className="text-xl font-bold text-neutral-200">Tulis nama kelompok, main dulu — skor belakangan!</p>
        <div className="mx-auto max-w-md space-y-1">
          {state.teams.map((t) => (
            <div key={t.id} className="flex items-center justify-center gap-2 border-b border-white/20 px-2 py-2 text-xl transition focus-within:border-yellow-300">
              <span className="text-3xl">{t.icon}</span>
              <input value={t.name} placeholder="Nama kelompok..." maxLength={24} onChange={(e) => patch({ teams: state.teams.map((x) => x.id === t.id ? { ...x, name: e.target.value.slice(0, 24) } : x) })} className="w-full bg-transparent p-1 font-bold outline-none placeholder:text-neutral-500" />
              {state.teams.length > 2 && (
                <button className="rounded-full px-2 py-1 text-lg font-bold text-neutral-500 hover:bg-red-800 hover:text-white" onClick={() => removeTeam(t.id)} title="Hapus">×</button>
              )}
            </div>
          ))}
        </div>
        {state.teams.length < 6 && (
          <button className="rounded-full bg-white/15 px-6 py-2 text-xl font-bold" onClick={() => addTeam("")}>+ Tambah Kelompok</button>
        )}
        <button className="btn-heboh px-10 py-4 text-3xl" onClick={() => { sfx.start(); patch({ status: "menu" }); }}>🚀 MULAI GAME!</button>
      </main>
    );
  }

  if (state.status === "menu") {
    return (
      <main className="flex min-h-screen flex-col p-6 pb-28">
        {pending && <Countdown onDone={() => { const r = pending; setPending(null); patch({ currentRound: r, currentQuestion: 0, revealState: false, plate: [], status: "playing" }); }} />}
        <header className="card-stage mx-auto mb-4 flex w-full max-w-6xl items-center justify-between rounded-2xl p-3 text-xl font-bold">
          <b>🎮 MENU SESI</b>
          <button className="rounded-full bg-white/15 px-3 py-1 text-lg" onClick={toggleMute} title="Sound (M)">{muted ? "🔇" : "🔊"}</button>
        </header>
        <div className="mx-auto w-full max-w-6xl flex-1">
          {showBoard ? <Leaderboard teams={state.teams} /> : <SessionMenu state={state} onOpen={openSession} />}
        </div>
        <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur">
          <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-2">
            <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={toggleBoard}>🏆 Board (Tab)</button>
            <button className="rounded-full bg-red-800 px-4 py-2 text-sm font-bold" onClick={resetGame}>Reset</button>
          </div>
        </footer>
      </main>
    );
  }

  if (state.status === "finished") {
    const win = [...state.teams].sort((a, b) => b.score - a.score)[0];
    return (
      <main className="mx-auto max-w-2xl space-y-4 p-8 pb-28 text-center">
        <Confetti />
        <div className="animate-pop text-8xl">👑</div>
        <h1 className="title-glow animate-pop text-6xl font-black text-yellow-300">🏆 {win?.icon} {win?.name} — {win?.score}!</h1>
        <Leaderboard teams={state.teams} />
        <div className="card-stage rounded-3xl p-6 text-left text-xl font-bold">
          🧠 JANGAN LUPA!<br />① Makan beragam ② Perhatikan komposisi dan porsi<br />③ Bijak pilih makanan/minuman ④ Sesuaikan kebutuhan tubuh
        </div>
        <button className="rounded-full bg-white/15 px-6 py-3 text-xl font-bold" onClick={resetGame}>🔄 MAIN LAGI</button>
      </main>
    );
  }

  const lvl = state.currentQuestion + 1;
  const q = state.currentRound === "susun_piring" ? null : QS[state.currentRound]?.[state.currentQuestion];
  const isPlate = state.currentRound === "susun_piring";

  const doRevealBtn = () => {
    if (state.revealState) patch({ revealState: false });
    else if (q) reveal(q.level);
  };

  return (
    <main className="flex min-h-screen flex-col p-6 pb-28">
      <header className="card-stage mx-auto mb-4 flex w-full max-w-6xl items-center justify-between rounded-2xl p-3 text-xl font-bold">
        <b>🥗 {LABEL[state.currentRound]} · Level {Math.min(5, lvl)}/5</b>
        <button className="rounded-full bg-white/15 px-3 py-1 text-lg" onClick={toggleMute} title="Sound (M)">{muted ? "🔇" : "🔊"}</button>
      </header>

      <div className="mx-auto w-full max-w-6xl flex-1">
      {showBoard ? <Leaderboard teams={state.teams} /> : state.currentRound === "susun_piring" ? (
        <SusunPiring level={lvl} plate={state.plate} onPlate={setPlate} teams={state.teams} onScoreMany={addScoreMany} canUndo={hasUndo} onUndo={undoLast} onDone={(lv) => markDone(lv)} />
      ) : q ? (
        <Quiz key={`${q.id}-${state.currentQuestion}`} title={`${LABEL[state.currentRound]} · Level ${q.level}/5`} q={q} reveal={state.revealState} onReveal={() => reveal(q.level)} onToggle={() => toggleReveal(q.level)} teams={state.teams} onScoreMany={addScoreMany} canUndo={hasUndo} onUndo={undoLast} />
      ) : null}
      </div>

      <footer className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-black/70 backdrop-blur">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-2 px-4 py-2">
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={prevQ}>⬅️ {isPlate ? "Misi" : "Soal"} (←)</button>
          {!isPlate && <button className="btn-heboh px-5 py-2 text-sm" onClick={doRevealBtn}>💥 Reveal (R)</button>}
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={nextQ}>{isPlate ? "Misi" : "Soal"} ➡️ (→)</button>
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={toggleBoard}>🏆 Board (Tab)</button>
          <button className="rounded-full bg-white/15 px-4 py-2 text-sm font-bold" onClick={goMenu}>🏠 Menu (Space)</button>
          <button className="rounded-full bg-red-800 px-4 py-2 text-sm font-bold" onClick={resetGame}>Reset</button>
        </div>
      </footer>
    </main>
  );
}
