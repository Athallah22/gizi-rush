import assert from "node:assert/strict";
import data from "../../data/susun-piring.json" with { type: "json" };
import { missionScore, plateTotal } from "./scoring.ts";
import type { Food, FoodMission } from "../../types/game.ts";

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
console.log("scoring OK");
