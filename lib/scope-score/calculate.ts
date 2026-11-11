import { SCORE_CONFIG, MAX_MISSING_SHARE, GRADES, LABELS, type Cutoffs, type InputKey } from "./config";

export type RawInputs = Partial<Record<InputKey, number | null>>;

export type InputResult = { key: InputKey; name: string; weight: number; value: number | null; score: number | null; analyst?: boolean };
export type CategoryResult = {
  key: string; name: string; weight: number;
  score: number | null; // null means "Not enough data"
  grade: string | null;
  coverage: number; // percent of the category's weight that had data
  inputs: InputResult[];
};
export type ScoreResult = { total: number; grade: string; label: string; partial: boolean; categories: CategoryResult[] };

const SCORES = [0, 2.5, 5, 7.5, 10];

// Straight-line scoring between the 5 cut-offs. Works for rising or falling cut-offs.
export function scoreInput(x: number, cutoffs: Cutoffs): number {
  const rising = cutoffs[0] < cutoffs[4];
  if (rising ? x <= cutoffs[0] : x >= cutoffs[0]) return 0;
  if (rising ? x >= cutoffs[4] : x <= cutoffs[4]) return 10;
  for (let i = 0; i < 4; i++) {
    const a = cutoffs[i], b = cutoffs[i + 1];
    if (x >= Math.min(a, b) && x <= Math.max(a, b)) return SCORES[i] + ((x - a) / (b - a)) * 2.5;
  }
  return 0;
}

const pick = (table: [number, string][], s: number) => table.find(([min]) => s >= min)![1];
export const gradeFor = (s: number) => pick(GRADES, s);
export const labelFor = (s: number) => pick(LABELS, s);
const r2 = (n: number) => Math.round(n * 100) / 100;

export function calculateScore(raw: RawInputs): ScoreResult {
  const categories: CategoryResult[] = SCORE_CONFIG.map((cat) => {
    const inputs: InputResult[] = cat.inputs.map((inp) => {
      const v = raw[inp.key];
      const has = typeof v === "number" && Number.isFinite(v);
      return { key: inp.key, name: inp.name, weight: inp.weight, analyst: inp.analyst, value: has ? (v as number) : null, score: has ? r2(scoreInput(v as number, inp.cutoffs)) : null };
    });
    const present = inputs.filter((i) => i.score !== null);
    const presentWeight = present.reduce((a, i) => a + i.weight, 0);
    const totalWeight = inputs.reduce((a, i) => a + i.weight, 0);
    const missingShare = 1 - presentWeight / totalWeight;
    // Missing inputs: spread their weight over the others (never count them as zero).
    const score = missingShare > MAX_MISSING_SHARE || presentWeight === 0 ? null : present.reduce((a, i) => a + i.score! * i.weight, 0) / presentWeight;
    return { key: cat.key, name: cat.name, weight: cat.weight, score: score === null ? null : r2(score), grade: score === null ? null : gradeFor(score), coverage: Math.round((presentWeight / totalWeight) * 100), inputs };
  });
  const usable = categories.filter((c) => c.score !== null);
  const w = usable.reduce((a, c) => a + c.weight, 0);
  const total = usable.reduce((a, c) => a + c.score! * c.weight, 0) / w;
  return { total: r2(total), grade: gradeFor(total), label: labelFor(total), partial: usable.length < categories.length, categories };
}