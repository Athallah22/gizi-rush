import { useEffect, useRef, useState, type DragEvent } from "react";
import DraggableFood from "./DraggableFood";
import Plate from "./Plate";
import TeamPicker from "../../components/TeamPicker";
import data from "../../data/susun-piring.json";
import { missionScore, MAX_ITEMS } from "../../features/game/scoring";
import type { Food, FoodMission, Team } from "../../types/game";
import { sfx } from "../../utils/sound";
import { useAwardKeys } from "../../utils/useAwardKeys";

const FOODS = (data as unknown as { foods: Food[] }).foods;
const MISSIONS = (data as unknown as { missions: FoodMission[] }).missions;

export default function SusunPiring({ level, plate, onPlate, teams, onScoreMany, canUndo, onUndo, onDone }: {
  level: number;
  plate: string[];
  onPlate: (p: string[]) => void;
  teams: Team[];
  onScoreMany: (ids: string[], points: number) => void;
  canUndo: boolean;
  onUndo: () => void;
  onDone: (level: number) => void;
}) {
  const mission = MISSIONS[Math.min(5, level) - 1];
  const pool = FOODS.filter((f) => mission.pool.includes(f.id));
  const tray = pool.filter((f) => !plate.includes(f.id));
  const { score, checks, junk, total, complete, breakdown, lengkapScore } = missionScore(plate, FOODS, mission);
  const t = mission.target;
  const [picked, setPicked] = useState<string[]>([]);
  const doneRef = useRef(0);

  useEffect(() => {
    doneRef.current = 0;
    setPicked([]);
    if (plate.length === 0) return;
    onPlate([]);
    // ponytail: reset sekali per misi; skor tim sudah aman
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level]);

  useEffect(() => {
    if (complete && doneRef.current !== mission.level) {
      doneRef.current = mission.level;
      onDone(mission.level);
      sfx.correct();
    }
  }, [complete, mission.level, onDone]);

  const toggle = (id: string) => setPicked((p) => (p.includes(id) ? p.filter((x) => x !== id) : [...p, id]));
  const all = () => setPicked(teams.map((tm) => tm.id));

  const award = () => {
    if (picked.length === 0) return;
    onScoreMany(picked, score);
    sfx.score();
    setPicked([]);
  };

  useAwardKeys({ active: true, teams, onToggle: toggle, onAward: award });

  const dropToPlate = (id: string) => {
    if (!plate.includes(id) && mission.pool.includes(id) && plate.length < MAX_ITEMS) onPlate([...plate, id]);
    else sfx.tick();
  };
  const dropToTray = (e: DragEvent) => {
    e.preventDefault();
    const id = e.dataTransfer.getData("text/plain");
    if (id) onPlate(plate.filter((x) => x !== id));
  };

  return (
    <div className="space-y-4 text-center">
      <h2 className="title-glow text-5xl font-black text-yellow-300">🍱 {mission.prompt}</h2>
      <p className="text-xl font-bold text-neutral-200">Level {mission.level}/5 · 4 Sehat{mission.wajib.includes("susu") ? " 5 Sempurna 🥛" : ""} · maks {MAX_ITEMS} item</p>
      <Plate key={plate.length} plate={plate} foods={pool} onDropFood={dropToPlate} />
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={dropToTray}
        className="card-stage mx-auto grid max-w-3xl grid-cols-4 gap-3 rounded-3xl p-4 sm:grid-cols-7"
      >
        {tray.map((f) => <DraggableFood key={f.id} food={f} />)}
      </div>
      <div key={score} className="animate-pop text-4xl font-black text-yellow-300 drop-shadow">⭐ SKOR LIVE: {score}{complete ? " ✅ MISI SELESAI!" : ""}</div>
      <div className="card-stage mx-auto grid max-w-3xl grid-cols-3 gap-2 rounded-2xl p-3 text-lg font-bold sm:grid-cols-6">
        <span>🔥 {total.kalori} kkal</span>
        <span>🥩 {total.protein_g}g</span>
        <span>🍚 {total.karbo_g}g</span>
        <span>🧈 {total.lemak_g}g</span>
        <span>🥬 {total.serat_g}g</span>
        <span className={total.gula_g <= t.gula_max ? "" : "text-red-400"}>🍬 {total.gula_g}g</span>
      </div>
      <div className="mx-auto flex max-w-3xl flex-wrap justify-center gap-2 text-base font-bold">
        <span className={`rounded-full px-4 py-1 ${lengkapScore >= 100 ? "bg-green-500 text-white" : "bg-white/15 text-neutral-300"}`}>🧺 Lengkap {lengkapScore}/100</span>
        {breakdown.map((b) => (
          <span key={b.key} className={`rounded-full px-4 py-1 ${b.ok ? "bg-green-500 text-white" : "bg-white/15 text-neutral-300"}`}>
            {b.ok ? "✓" : "·"} {b.label} +{b.points}
          </span>
        ))}
      </div>
      <p className={`text-lg font-bold ${complete ? "text-green-400" : "text-neutral-300"}`}>
        🎯 Target: {t.kalori[0]}–{t.kalori[1]} kkal · protein ≥{t.protein_min}g · serat ≥{t.serat_min}g · gula ≤{t.gula_max}g · lemak ≤{t.lemak_max}g
      </p>
      <div className="flex flex-wrap justify-center gap-2 text-xl font-bold">
        {checks.map((c) => (
          <span key={c.category} className={`rounded-full px-4 py-1 ${c.ok ? "bg-green-500 text-white" : "bg-white/15 text-neutral-300"}`}>
            {c.ok ? "✓" : "·"} {c.category}
          </span>
        ))}
        {junk && <span className="animate-shake rounded-full bg-red-500 px-4 py-1 text-white">⚠️ Junk bikin gula/lemak jebol!</span>}
      </div>
      <div className="card-stage mx-auto max-w-3xl rounded-3xl p-4">
        <TeamPicker teams={teams} picked={picked} onToggle={toggle} onAll={all} points={score} onAward={award} canUndo={canUndo} onUndo={onUndo} />
      </div>
      <button className="rounded-full bg-white/15 px-6 py-3 text-xl font-bold hover:bg-white/25" onClick={() => onPlate([])}>🔄 Reset Piring</button>
    </div>
  );
}
