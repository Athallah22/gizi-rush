import type { Food, FoodCategory, FoodMission, Gizi } from "../../types/game";

const ZERO: Gizi = { kalori: 0, protein_g: 0, karbo_g: 0, lemak_g: 0, serat_g: 0, gula_g: 0 };
export const MAX_ITEMS = 6;

export const SCORE_RULES = {
  lengkap: 100,
  kalori: 50,
  protein: 30,
  serat: 20,
  gula: 30,
  lemak: 20,
} as const;

export function plateTotal(plate: string[], foods: Food[]): Gizi {
  const byId = new Map(foods.map((f) => [f.id, f]));
  return plate.reduce((acc, id) => {
    const g = byId.get(id)?.gizi;
    if (!g) return acc;
    return {
      kalori: acc.kalori + g.kalori,
      protein_g: acc.protein_g + g.protein_g,
      karbo_g: acc.karbo_g + g.karbo_g,
      lemak_g: acc.lemak_g + g.lemak_g,
      serat_g: acc.serat_g + g.serat_g,
      gula_g: acc.gula_g + g.gula_g,
    };
  }, { ...ZERO });
}

export function missionScore(plate: string[], foods: Food[], mission: FoodMission) {
  const picked = plate.slice(0, MAX_ITEMS);
  const byId = new Map(foods.map((f) => [f.id, f]));
  const cats = new Set(picked.map((id) => byId.get(id)?.category).filter(Boolean) as FoodCategory[]);
  const checks = mission.wajib.map((c) => ({ category: c, ok: cats.has(c) }));
  const lengkapOk = checks.filter((c) => c.ok).length;
  const lengkapScore = Math.round((lengkapOk / mission.wajib.length) * SCORE_RULES.lengkap);
  const junk = picked.some((id) => byId.get(id)?.category === "junk");
  const total = plateTotal(picked, foods);
  const t = mission.target;

  const inKalori = total.kalori >= t.kalori[0] && total.kalori <= t.kalori[1];
  const okProtein = total.protein_g >= t.protein_min;
  const okSerat = total.serat_g >= t.serat_min;
  const okGula = total.gula_g <= t.gula_max;
  const okLemak = total.lemak_g <= t.lemak_max;

  const breakdown = [
    { key: "kalori", label: `🔥 Kalori ${total.kalori} (${t.kalori[0]}–${t.kalori[1]})`, ok: inKalori, points: SCORE_RULES.kalori },
    { key: "protein", label: `🥩 Protein ${total.protein_g}g (≥${t.protein_min}g)`, ok: okProtein, points: SCORE_RULES.protein },
    { key: "serat", label: `🥬 Serat ${total.serat_g}g (≥${t.serat_min}g)`, ok: okSerat, points: SCORE_RULES.serat },
    { key: "gula", label: `🍬 Gula ${total.gula_g}g (≤${t.gula_max}g)`, ok: okGula, points: SCORE_RULES.gula },
    { key: "lemak", label: `🧈 Lemak ${total.lemak_g}g (≤${t.lemak_max}g)`, ok: okLemak, points: SCORE_RULES.lemak },
  ];

  const score = lengkapScore + breakdown.filter((b) => b.ok).reduce((s, b) => s + b.points, 0);
  const complete = checks.every((c) => c.ok) && !junk && inKalori && okProtein && okSerat && okGula && okLemak;
  return { score, checks, junk, total, complete, inKalori, okGula, breakdown, lengkapScore };
}
