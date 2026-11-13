import { applyScore } from "../lib/scope-score/apply";
import { appleScore, microsoftScore, nvidiaScore, googleScore, amazonScore } from "../lib/scope-score/inputs";

const companies = [
  { name: "Apple", expected: 8.39, data: appleScore },
  { name: "Microsoft", expected: 8.64, data: microsoftScore },
  { name: "NVIDIA", expected: 8.37, data: nvidiaScore },
  { name: "Alphabet", expected: 8.09, data: googleScore },
  { name: "Amazon", expected: 6.79, data: amazonScore },
];

let ok = true;
for (const c of companies) {
  const r = applyScore(c.data.raw, c.data.display);
  const pass = Math.abs(r.total - c.expected) < 0.02;
  ok = ok && pass;
  console.log(`${pass ? "OK  " : "FAIL"} ${c.name}: ${r.total} ${r.grade} ${r.label} (expected ${c.expected})`);
  console.log("     " + r.categories.map((x) => `${x.name} ${x.score}`).join(" | "));
}
if (process.argv.includes("--text")) {
  const r = applyScore(microsoftScore.raw, microsoftScore.display);
  console.log(JSON.stringify(r.categories[3], null, 2));
  console.log(r.categories[1].rule);
}
if (!ok) process.exit(1);