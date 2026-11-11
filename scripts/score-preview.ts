// Shows what each company's Scope Score would be if it used the numbers fetched from the API.
// It changes nothing. Run AFTER fetch-company-data.ts:
//   npx tsx scripts/score-preview.ts

import { readFileSync, existsSync } from "node:fs";
import { calculateScore, type RawInputs } from "../lib/scope-score/calculate";
import { appleScore, microsoftScore } from "../lib/scope-score/inputs";

const list = [
  { ticker: "AAPL", name: "Apple", current: appleScore.raw },
  { ticker: "MSFT", name: "Microsoft", current: microsoftScore.raw },
];

for (const c of list) {
  const file = `data/computed/${c.ticker}.json`;
  if (!existsSync(file)) { console.log(`${c.name}: no ${file}, run fetch-company-data.ts ${c.ticker} first`); continue; }
  const data = JSON.parse(readFileSync(file, "utf8")) as { fetchedAt: string; computed: RawInputs };
  // topProductShare needs product data, which the free plan does not give: keep the manual number.
  const fromApi: RawInputs = { ...data.computed, topProductShare: c.current.topProductShare };
  const now = calculateScore(c.current);
  const next = calculateScore(fromApi);
  console.log(`\n${c.name} (data fetched ${data.fetchedAt.slice(0, 16).replace("T", " ")})`);
  console.log(`  Score on the page now: ${now.total} ${now.label}   |   with API numbers: ${next.total} ${next.label}`);
  console.log("  " + "Category".padEnd(16) + "Page".padStart(6) + "API".padStart(7));
  next.categories.forEach((cat, i) => console.log("  " + cat.name.padEnd(16) + String(now.categories[i].score).padStart(6) + String(cat.score).padStart(7)));
}