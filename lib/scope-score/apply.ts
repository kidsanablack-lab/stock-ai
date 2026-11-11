import { SCORE_CONFIG, type InputKey, type Unit } from "./config";
import { calculateScore, type RawInputs } from "./calculate";

// What the page shows for each input: the text value, and (optionally) a period-specific name.
export type DisplayValues = Partial<Record<InputKey, { value: string; name?: string }>>;

// Same shape as the "categories" the Sources and method section expects.
export type CategoryData = {
  name: string;
  weight: number;
  coverage: number;
  score: number;
  inputs: { name: string; weight: number; value: string; score: number; analyst?: boolean }[];
  rule: string;
  missing: string;
};

const fmt = (n: number, unit: Unit): string => {
  const num = (x: number) => String(Math.round(x * 100) / 100);
  if (unit === "pct") return `${num(n)}%`;
  if (unit === "x") return num(n);
  if (unit === "usdB") return n >= 1000 ? `$${num(n / 1000)}T` : `$${num(n)}B`;
  return num(n);
};

export function applyScore(raw: RawInputs, display: DisplayValues) {
  const result = calculateScore(raw);

  const categories: CategoryData[] = result.categories.map((c) => {
    const cfg = SCORE_CONFIG.find((x) => x.key === c.key)!;
    const present = c.inputs.filter((i) => i.score !== null);
    const missing = c.inputs.filter((i) => i.score === null);
    const list = cfg.inputs
      .map((i) => `${i.short}: ${i.cutoffs.map((n) => fmt(n, i.unit)).join(", ")}`)
      .join(". ");
    const rule = `Cut-offs score 0, 2.5, 5, 7.5 and 10, with a straight line between. ${list}.${cfg.note ? " " + cfg.note : ""}`;
    return {
      name: c.name,
      weight: c.weight,
      coverage: c.coverage,
      score: c.score ?? 0, // a null (not enough data) is shown as 0 here; none of our pages hit it yet
      inputs: present.map((i) => ({
        name: display[i.key]?.name ?? i.name,
        weight: i.weight,
        value: display[i.key]?.value ?? String(i.value),
        score: i.score as number,
        ...(i.analyst ? { analyst: true } : {}),
      })),
      rule,
      missing: missing.length
        ? `${missing.map((i) => `${i.name} (${i.weight}%)`).join("; ")}: not found. Its weight is spread over the other inputs.`
        : "No inputs missing.",
    };
  });

  // Grade, score and weight for each category, used by the "Why the score is ..." section.
  const reason: Record<string, { grade: string; score: number; weight: number }> = {};
  for (const c of result.categories) reason[c.name] = { grade: c.grade ?? "F", score: c.score ?? 0, weight: c.weight };

  return { total: result.total, grade: result.grade, label: result.label, partial: result.partial, categories, reason };
}