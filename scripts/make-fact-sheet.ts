// Makes a short fact sheet (numbers only) for one company, to give to Claude so it can draft the page text.
// Every number in the draft must come from this sheet. It changes nothing in the website.
// Run:  npx tsx scripts/make-fact-sheet.ts AAPL      (or MSFT)   -> writes data/facts/<TICKER>.md

import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { buildFacts, type RawFmp } from "../lib/company-data/facts";
import { applyScore } from "../lib/scope-score/apply";
import { appleScore, microsoftScore, nvidiaScore } from "../lib/scope-score/inputs";

const ticker = (process.argv[2] ?? "").toUpperCase();
const file = `data/raw/${ticker}.json`;
if (!existsSync(file)) throw new Error(`No ${file}. Run fetch-company-data.ts ${ticker} first.`);
const f = buildFacts(JSON.parse(readFileSync(file, "utf8")) as RawFmp);
const score = applyScore(...(ticker === "MSFT" ? [microsoftScore.raw, microsoftScore.display] : ticker === "NVDA" ? [nvidiaScore.raw, nvidiaScore.display] : [appleScore.raw, appleScore.display]) as [typeof appleScore.raw, typeof appleScore.display]);

const n = (x: number | null, d = 1) => (x === null ? "n/a" : x.toFixed(d));
const row = (name: string, s: (number | null)[], d = 1) => `| ${name} | ${s.map((x) => n(x, d)).join(" | ")} |`;
const growth = (s: (number | null)[]) => s.map((x, i) => (i === 0 || x === null || s[i - 1] === null || !s[i - 1] ? null : ((x / (s[i - 1] as number)) - 1) * 100));

const out = [
  `# Fact sheet: ${ticker}`,
  `Built ${f.fetchedAt.slice(0, 10)} from data/raw/${ticker}.json. Latest quarter ${f.latestQuarter}. Price ${n(f.price, 2)}, market cap $${n(f.marketCap, 0)}B.`,
  "",
  `## Annual ($B, per-share in $)`,
  `| | ${f.years.join(" | ")} |`,
  `|---|${f.years.map(() => "---").join("|")}|`,
  row("Revenue", f.revenue), row("Revenue growth %", growth(f.revenue)),
  row("Gross margin %", f.grossMargin), row("Operating income", f.operatingIncome), row("Operating margin %", f.operatingMargin),
  row("Net income", f.netIncome), row("Net margin %", f.netMargin), row("EPS", f.eps, 2),
  row("Operating cash flow", f.ocf), row("Capex", f.capex), row("Free cash flow", f.fcf), row("FCF margin %", f.fcfMargin),
  row("Dividends paid", f.dividends), row("Buybacks", f.buybacks), row("Diluted shares", f.shares, 2),
  row("Cash", f.cash), row("Debt", f.debt), row("Equity", f.equity), row("ROIC %", f.roic),
  "",
  `## Last 12 months`,
  `Revenue ${n(f.ttm.revenue)}B (growth ${n(f.ttm.growth)}%), operating income ${n(f.ttm.operatingIncome)}B, net income ${n(f.ttm.netIncome)}B, FCF ${n(f.ttm.fcf)}B, EPS ${n(f.ttm.eps, 2)}.`,
  "",
  `## Latest quarters`,
  `| | ${f.quarters.date.join(" | ")} |`,
  `|---|${f.quarters.date.map(() => "---").join("|")}|`,
  row("Revenue", f.quarters.revenue), row("YoY growth %", f.quarters.yoy), row("Net income", f.quarters.netIncome), row("Operating margin %", f.quarters.operatingMargin),
  "",
  `## Scope Score`,
  `Total ${score.total.toFixed(2)} (${score.grade}, ${score.label}).`,
  ...score.categories.map((c) => `- ${c.name}: ${c.score}`),
  "",
  `## Rules for the draft`,
  `- Use only numbers in this sheet or in sources the user names. If a number is missing, write "to confirm" instead of guessing.`,
  `- Write for a beginner. Plain English, short sentences, no advice to buy or sell.`,
  `- Mark every draft "DRAFT - needs review" until the user approves it.`,
].join("\n");

mkdirSync("data/facts", { recursive: true });
writeFileSync(`data/facts/${ticker}.md`, out);
console.log(out);
console.log(`\nSaved data/facts/${ticker}.md`);