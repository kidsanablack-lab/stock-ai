// Put this file at scripts/check-company-numbers.ts. It only reads. It changes no file.
// Run:  npx tsx scripts/check-company-numbers.ts
//
// For each company page it recomputes numbers from data/raw/<TICKER>.json (through buildFacts, the same code the page uses)
// and compares them with the numbers typed by hand in the page file.
//   OK    = same within rounding
//   DIFF  = different: check which one is right, then fix the page file (or re-fetch the JSON)
//   INFO  = printed for you to read, no automatic verdict
// Prices and market cap in the JSON can be from a later day than the page text, so small differences there are expected.
import { buildFacts, type Facts, type RawFmp } from "@/lib/company-data/facts";
import { peAtYearEnd } from "@/lib/company-data/peHistory";
import { profitHistoryNumbers } from "@/lib/company-data/sections";
import type { CompanyPageData } from "@/lib/company-next/types";
import { applePage } from "@/lib/company-next/apple";
import { microsoftPage } from "@/lib/company-next/microsoft";
import { googlePage } from "@/lib/company-next/google";
import { nvidiaPage } from "@/lib/company-next/nvidia";
import { amazonPage } from "@/lib/company-next/amazon";
import rawAapl from "@/data/raw/AAPL.json";
import rawMsft from "@/data/raw/MSFT.json";
import rawGoogl from "@/data/raw/GOOGL.json";
import rawNvda from "@/data/raw/NVDA.json";
import rawAmzn from "@/data/raw/AMZN.json";

const COMPANIES: { name: string; raw: unknown; page: CompanyPageData }[] = [
  { name: "Apple (AAPL)", raw: rawAapl, page: applePage },
  { name: "Microsoft (MSFT)", raw: rawMsft, page: microsoftPage },
  { name: "Alphabet (GOOGL)", raw: rawGoogl, page: googlePage },
  { name: "NVIDIA (NVDA)", raw: rawNvda, page: nvidiaPage },
  { name: "Amazon (AMZN)", raw: rawAmzn, page: amazonPage },
];

let diffs = 0;
let oks = 0;

// First number in a text such as "+15.1% vs a year earlier", "−$46.9B" or "38.1×". Returns null if there is none.
function num(text: string | undefined): number | null {
  if (!text) return null;
  const m = text.replace(/[−–]/g, "-").replace(/[$,]/g, "").match(/-?\d+(\.\d+)?/);
  return m ? Number(m[0]) : null;
}
const last = <T,>(a: T[]) => a[a.length - 1];
const nonNull = (a: (number | null)[]) => a.filter((x): x is number => x !== null);

function compare(label: string, typed: number | null, fromJson: number | null | undefined, tol: number) {
  if (typed === null || fromJson === null || fromJson === undefined || !Number.isFinite(fromJson)) {
    console.log(`  INFO  ${label}: typed ${typed ?? "n/a"}, from JSON ${fromJson ?? "n/a"} (could not compare)`);
    return;
  }
  const ok = Math.abs(typed - fromJson) <= tol;
  if (ok) oks += 1;
  else diffs += 1;
  console.log(`  ${ok ? "OK  " : "DIFF"}  ${label}: typed ${typed}, from JSON ${Math.round(fromJson * 100) / 100}`);
}

function cagr(series: (number | null)[]): number | null {
  const v = nonNull(series);
  if (v.length < 2 || v[0] <= 0 || last(v) <= 0) return null;
  return (Math.pow(last(v) / v[0], 1 / (v.length - 1)) - 1) * 100;
}

function factValue(page: CompanyPageData, startsWith: string) {
  return page.hero.facts.find((f) => f.label.startsWith(startsWith));
}

for (const { name, raw, page } of COMPANIES) {
  const raw2 = raw as unknown as RawFmp;
  const f: Facts = buildFacts(raw2);
  console.log(`\n=== ${name} · JSON fetched ${raw2.fetchedAt} · latest quarter ${f.latestQuarter} · fiscal year end ${f.fiscalYearEnd}`);

  // 1. Hero cards
  console.log("Hero cards");
  const rev = factValue(page, "Revenue, last 12 months");
  const fcfCard = factValue(page, "Free cash flow, last 12 months");
  const pe = factValue(page, "P/E ratio");
  const cap = factValue(page, "Market cap");
  compare("revenue, last 12 months ($B)", num(rev?.value), f.ttm.revenue, 0.15);
  compare("revenue growth, last 12 months (%)", num(rev?.note), f.ttm.growth, 0.15);
  compare("free cash flow, last 12 months ($B)", num(fcfCard?.value), f.ttm.fcf, 0.15);
  const fcfMargin = f.ttm.fcf !== null && f.ttm.revenue ? (f.ttm.fcf / f.ttm.revenue) * 100 : null;
  compare("free cash flow margin (%)", num(fcfCard?.note), fcfMargin, 0.15);
  const peNow = f.price !== null && f.ttm.eps ? f.price / f.ttm.eps : null;
  compare("P/E (JSON price may be from another day)", num(pe?.value), peNow, 0.05 * (num(pe?.value) ?? 0) + 0.1);
  compare("market cap ($T, JSON may be from another day)", num(cap?.value), f.marketCap !== null ? f.marketCap / 1000 : null, 0.05 * (num(cap?.value) ?? 0) + 0.01);
  console.log(`  INFO  share price: page ${page.valuation.price}, JSON ${f.price}`);

  // 2. ROIC
  console.log("ROIC");
  const h = profitHistoryNumbers(f);
  const roicByYear = f.years.map((y, i) => `${y}: ${f.roic[i] === null ? "n/a" : f.roic[i]!.toFixed(1) + "%"}`).join(" · ");
  console.log(`  INFO  series from JSON: ${roicByYear}`);
  console.log(`  INFO  card on the page: ${page.profitHistory.returns.roic} now, ${page.profitHistory.returns.roicFrom} from ${h.returns.roicFromYear}`);
  const quality = page.scoreReasons.reasons.find((r) => r.name === "Quality");
  compare("Quality card, ROIC now (%)", num(quality?.value), last(nonNull(f.roic)), 0.6);
  for (const m of page.profitHistory.returns.note.matchAll(/([\d.]+)% in (FY\d\d)/g)) {
    const i = f.years.indexOf(m[2]);
    compare(`note says ROIC ${m[2]} (%)`, Number(m[1]), i >= 0 ? f.roic[i] : null, 0.15);
  }

  // 3. P/E history at fiscal year ends (without the "Now" bar)
  console.log("P/E at fiscal year ends");
  const fromJson = peAtYearEnd(raw2);
  for (const t of page.valuation.history.years) {
    if (t.year === "Now") continue;
    const yy = t.year.replace(/\D/g, "").slice(-2);
    const match = fromJson.find((x) => x.year.replace(/\D/g, "").slice(-2) === yy);
    compare(`P/E ${t.year}`, t.value, match?.value ?? null, 0.15);
  }
  const missing = fromJson.filter((x) => !page.valuation.history.years.some((t) => t.year.replace(/\D/g, "").slice(-2) === x.year.replace(/\D/g, "").slice(-2)));
  if (missing.length) console.log(`  INFO  years in the JSON that the page does not show: ${missing.map((x) => `${x.year} ${x.value}`).join(", ")}`);

  // 4. Growth rates quoted in titles and text
  console.log("Growth rates in text");
  const t = page.profitHistory.title;
  const sales = t.match(/[Ss]ales grew ([\d.]+)% a year/);
  const op = t.match(/operating profit ([\d.]+)% a year/);
  if (sales) compare("sales growth a year (%)", Number(sales[1]), cagr(f.revenue), 0.15);
  if (op) compare("operating profit growth a year (%)", Number(op[1]), cagr(f.operatingIncome), 0.15);
  const implied = page.valuation.implied;
  if (implied) compare("free cash flow growth a year, 'actual' in the valuation section (%)", implied.actual, cagr(f.fcf), 0.15);

  // 5. Cash returned and free cash flow, five-year totals quoted in the title
  console.log("Cash and returns");
  const money = [...page.cashAndReturns.returned.title.matchAll(/\$([\d.]+)B/g)].map((m) => Number(m[1]));
  if (money.length >= 2) {
    const returned = nonNull(f.dividends).reduce((a, b) => a + b, 0) + nonNull(f.buybacks).reduce((a, b) => a + b, 0);
    compare("returned in five years ($B)", money[0], returned, 1.5);
    compare("free cash flow in five years ($B)", money[1], nonNull(f.fcf).reduce((a, b) => a + b, 0), 1.5);
  }
  const netCash = last(nonNull(f.cash)) - last(nonNull(f.debt));
  console.log(`  INFO  net cash at the latest fiscal year end from JSON: $${netCash.toFixed(1)}B (compare with the "net cash" numbers in the text)`);

  // 6. Spotlight numbers typed by hand (Alphabet), compared with the fiscal-year values
  const chart = page.spotlight?.chart as { kind?: string; ocf?: number[]; capex?: number[]; left?: number[]; years?: string[] } | undefined;
  if (chart?.kind === "capex-vs-cash" && chart.ocf && chart.capex && chart.years) {
    console.log("Spotlight chart");
    chart.years.forEach((y, i) => {
      const k = f.years.indexOf(y);
      if (k >= 0) {
        compare(`operating cash flow ${y} ($B)`, chart.ocf![i], f.ocf[k], 0.15);
        compare(`capital spending ${y} ($B)`, chart.capex![i], f.capex[k], 0.15);
        if (chart.left) compare(`free cash flow ${y} ($B)`, chart.left[i], f.fcf[k], 0.15);
      } else if (chart.left && /12 months/i.test(y)) {
        compare(`free cash flow, ${y} ($B)`, chart.left[i], f.ttm.fcf, 0.15);
      }
    });
  }
}

console.log(`\nDone: ${oks} OK, ${diffs} DIFF. Paste the DIFF lines (and any INFO line you want checked) back into the chat.`);