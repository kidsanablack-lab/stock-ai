// Compares numbers built from the API (data/raw/<TICKER>.json) with the numbers typed by hand in the page file.
// It changes nothing.   Run:  npx tsx scripts/check-facts.ts MSFT      (or AAPL)

import { readFileSync, existsSync } from "node:fs";
import { buildFacts, type RawFmp } from "../lib/company-data/facts";
import { financialHighlightsMetrics, profitHistoryNumbers, cashAndReturnsNumbers } from "../lib/company-data/sections";
import { microsoftPage } from "../lib/company-next/microsoft";
import { applePage } from "../lib/company-next/apple";

const ticker = (process.argv[2] ?? "").toUpperCase();
const file = `data/raw/${ticker}.json`;
if (!existsSync(file)) throw new Error(`No ${file}. Run fetch-company-data.ts ${ticker} first.`);
const f = buildFacts(JSON.parse(readFileSync(file, "utf8")) as RawFmp);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const page: any = ticker === "MSFT" ? microsoftPage : applePage;

console.log(`${ticker}: years ${f.years.join(", ")} | latest quarter ${f.latestQuarter} | built ${f.fetchedAt.slice(0, 16)}`);

const ph = profitHistoryNumbers(f), cr = cashAndReturnsNumbers(f);
const pairs: [string, (number | null)[], number[], string[]][] = [
  ["revenue", ph.revenue, page.profitHistory.revenue, page.profitHistory.years],
  ["grossProfit", ph.grossProfit, page.profitHistory.grossProfit, page.profitHistory.years],
  ["operatingIncome", ph.operatingIncome, page.profitHistory.operatingIncome, page.profitHistory.years],
  ["netIncome", ph.netIncome, page.profitHistory.netIncome, page.profitHistory.years],
  ["fcf", ph.fcf, page.profitHistory.fcf, page.profitHistory.years],
  ["dividends", cr.dividends, page.cashAndReturns.dividends, page.cashAndReturns.years],
  ["buybacks", cr.buybacks, page.cashAndReturns.buybacks, page.cashAndReturns.years],
  ["shares", cr.shares, page.cashAndReturns.how.shares, page.cashAndReturns.years],
  ["cash", cr.cash, page.cashAndReturns.cushion.cash, page.cashAndReturns.years],
  ["debt", cr.debt, page.cashAndReturns.cushion.debt, page.cashAndReturns.years],
  ["equity", cr.equity, page.cashAndReturns.cushion.equity, page.cashAndReturns.years],
];
console.log("\nSeries, compared by year (only years found in both). Difference is shown in billions (shares in billions of shares).");
console.log("Series".padEnd(16) + "From API (oldest to newest)".padEnd(52) + "On the page".padEnd(46) + "Largest gap");
for (const [name, api, hand, handYears] of pairs) {
  let gap = 0, compared = 0;
  f.years.forEach((y, i) => { const j = handYears.indexOf(y); if (j >= 0 && api[i] !== null) { gap = Math.max(gap, Math.abs((api[i] as number) - hand[j])); compared++; } });
  const flag = compared === 0 ? "no overlap" : gap < 0.05 ? "OK" : `CHECK (${gap.toFixed(2)})`;
  console.log(name.padEnd(16) + api.map((x) => (x ?? 0).toFixed(1)).join(", ").padEnd(52) + hand.map((x) => x.toFixed(1)).join(", ").padEnd(46) + flag);
}
const nulls = Object.entries({ eps: f.eps, ocf: f.ocf, capex: f.capex, dividends: f.dividends, buybacks: f.buybacks, shares: f.shares, cash: f.cash, debt: f.debt, equity: f.equity }).filter(([, a]) => a.some((x) => x === null)).map(([k]) => k);
console.log(nulls.length ? `\nFields with missing values (field names may differ): ${nulls.join(", ")}` : "\nNo missing values in the annual series.");
console.log(`current assets ${f.currentAssets?.toFixed(1)}, current liabilities ${f.currentLiabilities?.toFixed(1)} (page: ${page.cashAndReturns.cushion.currentAssets}, ${page.cashAndReturns.cushion.currentLiabilities})`);
console.log(`ROIC by year: ${f.roic.map((x) => (x === null ? "-" : x.toFixed(1))).join(", ")}  (page: ${page.profitHistory.returns.roicFrom} to ${page.profitHistory.returns.roic})`);
console.log(`TTM: revenue ${f.ttm.revenue?.toFixed(1)}, growth ${f.ttm.growth?.toFixed(1)}%, FCF ${f.ttm.fcf?.toFixed(1)}, EPS ${f.ttm.eps?.toFixed(2)}`);
console.log("\nHighlight cards built from the API:");
financialHighlightsMetrics(f).forEach((m) => console.log(`  ${m.label.padEnd(20)} ${m.value.padEnd(10)} ${m.change}`));