import { useState } from "react";
import type { Question, Team } from "../types/game";
import { sfx } from "../utils/sound";
import { useAwardKeys } from "../utils/useAwardKeys";
import TeamPicker from "./TeamPicker";

export default function Quiz({ title, q, reveal, onReveal, onToggle, teams, onScoreMany, canUndo, onUndo }: {
  title: string;
  q: Question;
  reveal: boolean;
  onReveal: () => void;
  onToggle: () => void;
  teams: Team[];
  onScoreMany: (ids: string[], points: number) => void;
  canUndo: boolean;
  onUndo: () => void;
}) {
  const [suspense, setSuspense] = useState(false);
  const [float, setFloat] = useState(0);
  const [picked, setPicked] = useState<string[]>([]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const all = () => setPicked(teams.map((t) => t.id));

  const award = () => {
    if (picked.length === 0) return;
    onScoreMany(picked, q.points);
    sfx.score();
    setFloat(picked.length);
    setPicked([]);
    setTimeout(() => setFloat(0), 1100);
  };

  useAwardKeys({ active: reveal, teams, onToggle: toggle, onAward: award });

  const doReveal = () => {
    sfx.reveal();
    setSuspense(true);
    setTimeout(() => {
      setSuspense(false);
      onReveal();
      sfx.correct();
    }, 900);
  };

  return (
    <div className="mx-auto max-w-4xl space-y-4 text-center">
      <h2 className="title-glow text-5xl font-black text-yellow-300 drop-shadow">{title}</h2>
      <p className="card-stage animate-pop rounded-3xl p-8 text-4xl font-bold">{q.question}</p>
      {q.options && (
        <div className="flex justify-center gap-4">
          {q.options.map((o) => (
            <div key={o.id} className="card-stage animate-slide-in rounded-2xl px-8 py-4 text-2xl font-bold">{o.label}</div>
          ))}
        </div>
      )}
      {suspense ? (
        <div className="count-zoom text-7xl font-black text-orange-400">😱 ...</div>
      ) : !reveal ? (
        <button className="btn-heboh px-10 py-4 text-2xl" onClick={doReveal}>💥 REVEAL! (R)</button>
      ) : (
        <div className="card-stage animate-pop relative space-y-3 rounded-3xl p-6">
          <div className="animate-pop text-6xl font-black text-green-400">💥 {q.answer.toUpperCase()}! +{q.points}</div>
          <p className="text-2xl text-neutral-100">{q.explanation}</p>
          {float > 0 && <span className="float-score absolute left-1/2 top-2 text-3xl font-black text-yellow-300">+{q.points} × {float} tim!</span>}
          <TeamPicker teams={teams} picked={picked} onToggle={toggle} onAll={all} points={q.points} onAward={award} canUndo={canUndo} onUndo={onUndo} />
          <button className="rounded-full bg-white/15 px-6 py-3 text-xl font-bold" onClick={onToggle}>🙈 Sembunyikan (R)</button>
        </div>
      )}
    </div>
  );
}
