import assert from "node:assert/strict";
import data from "../../data/susun-piring.json" with { type: "json" };
import mitos from "../../data/mitos-fakta.json" with { type: "json" };
import battle from "../../data/food-battle.json" with { type: "json" };
import gvs from "../../data/guru-vs-siswa.json" with { type: "json" };
import finalQs from "../../data/final.json" with { type: "json" };
import { missionScore, plateTotal } from "./scoring.ts";
import { pick5 } from "./quizPool.ts";
import type { Food, FoodMission, Question } from "../../types/game.ts";

const FOODS = (data as { foods: Food[] }).foods;
const MISSIONS = (data as { missions: FoodMission[] }).missions;

const t = plateTotal(["nasi", "ayam"], FOODS);
assert.equal(t.kalori, 340);
assert.equal(t.protein_g, 29);

const m1 = MISSIONS[0];
const done = missionScore(["nasi", "ayam", "sayur", "apel"], FOODS, m1);
assert.equal(done.complete, true);
assert.equal(done.score, 250);
assert.equal(done.breakdown.filter((b) => b.ok).length, 5);

const partial = missionScore(["nasi"], FOODS, m1);
assert.ok(partial.score < 150);
assert.equal(partial.complete, false);

const withJunk = missionScore(["nasi", "ayam", "sayur", "apel", "boba"], FOODS, m1);
assert.equal(withJunk.junk, true);
assert.equal(withJunk.complete, false);

const spam = missionScore(["nasi", "ayam", "sayur", "apel", "kentang-goreng", "boba", "soda"], FOODS, m1);
const spam6 = missionScore(["nasi", "ayam", "sayur", "apel", "kentang-goreng", "boba"], FOODS, m1);
assert.deepEqual(spam.total, spam6.total);

const m5 = MISSIONS[4];
const ideal5 = missionScore(["nasi", "ikan", "sayur", "jeruk", "susu"], FOODS, m5);
assert.equal(ideal5.complete, true);
assert.equal(ideal5.score, 250);

const sugary = missionScore(["nasi", "ikan", "sayur", "jeruk", "susu", "boba"], FOODS, m5);
assert.equal(sugary.okGula, false);
assert.equal(sugary.complete, false);

const IDEALS: [number, string[]][] = [
  [0, ["nasi", "ayam", "sayur", "apel"]],
  [1, ["jagung", "telur", "sayur", "pisang"]],
  [2, ["kentang", "tempe", "sayur", "jeruk"]],
  [3, ["nasi", "daging-sapi", "sayur", "mangga"]],
  [4, ["nasi", "ikan", "sayur", "semangka", "yoghurt"]],
];
for (const [mi, plate] of IDEALS) {
  const r = missionScore(plate, FOODS, MISSIONS[mi]);
  assert.equal(r.complete, true, `misi ${mi + 1} harus ✅`);
  assert.equal(r.score, 250, `misi ${mi + 1} harus 250`);
}

for (const [name, bank] of [["mitos", mitos], ["battle", battle], ["gvs", gvs], ["final", finalQs]] as const) {
  const qs = bank as unknown as Question[];
  assert.equal(qs.length, 10, `${name} harus 10 soal`);
  for (const lv of [1, 2, 3, 4, 5]) {
    assert.equal(qs.filter((q) => q.level === lv).length, 2, `${name} level ${lv} harus 2 soal`);
  }
  const a = pick5(qs, 42);
  assert.deepEqual(pick5(qs, 42).map((q) => q.id), a.map((q) => q.id));
  assert.deepEqual(a.map((q) => q.level), [1, 2, 3, 4, 5]);
}
console.log("scoring OK");
