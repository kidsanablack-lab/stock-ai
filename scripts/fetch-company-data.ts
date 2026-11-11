// Pulls raw numbers for one company from FMP, saves them, and computes the Scope Score inputs.
// It does NOT change any page. It prints a comparison with the numbers currently in lib/scope-score/inputs.ts.
//
// Run:  npx tsx --env-file=.env.local scripts/fetch-company-data.ts AAPL
//       npx tsx --env-file=.env.local scripts/fetch-company-data.ts MSFT

import { mkdirSync, writeFileSync } from "node:fs";
import { appleScore, microsoftScore } from "../lib/scope-score/inputs";
import type { RawInputs } from "../lib/scope-score/calculate";
import { CASH_INCLUDES_LONG_TERM_INVESTMENTS } from "../lib/company-data/policy";

const KEY = process.env.FMP_API_KEY;
const ticker = (process.argv[2] ?? "").toUpperCase();
if (!KEY) throw new Error("FMP_API_KEY not found in .env.local");
if (!ticker) throw new Error("Give a ticker, for example: AAPL");

const CURRENT: Record<string, RawInputs> = { AAPL: appleScore.raw, MSFT: microsoftScore.raw };

type Row = Record<string, unknown>;
const warnings: string[] = [];

async function get(label: string, path: string): Promise<Row[]> {
  try {
    const res = await fetch(`https://financialmodelingprep.com/stable/${path}&apikey=${KEY}`);
    const body = await res.json();
    if (!Array.isArray(body)) {
      warnings.push(`${label}: HTTP ${res.status} ${JSON.stringify(body).slice(0, 120)}`);
      return [];
    }
    return body as Row[];
  } catch (e) {
    warnings.push(`${label}: ${(e as Error).message}`);
    return [];
  }
}

// The free plan allows only 5 rows per call, and ignores page=1. So we ask for each fiscal quarter
// separately (Q1, Q2, Q3, Q4), two years each, and join them: 8 quarters, newest first.
async function getQuarters(label: string, path: string): Promise<Row[]> {
  const parts = await Promise.all(["Q1", "Q2", "Q3", "Q4"].map((q) => get(`${label} ${q}`, `${path}&period=${q}&limit=2`)));
  const seen = new Set<string>();
  return parts.flat()
    .filter((r) => { const d = String(r.date); if (seen.has(d)) return false; seen.add(d); return true; })
    .sort((a, b) => String(b.date).localeCompare(String(a.date)));
}

// Read a number from a row, trying several possible field names.
function n(row: Row | undefined, ...names: string[]): number | null {
  if (!row) return null;
  for (const k of names) {
    const v = row[k];
    if (typeof v === "number" && Number.isFinite(v)) return v;
  }
  return null;
}
const sum = (a: (number | null)[]) => (a.some((x) => x === null) ? null : (a as number[]).reduce((x, y) => x + y, 0));
const B = 1e9;
const r2 = (x: number | null) => (x === null ? null : Math.round(x * 100) / 100);

async function main() {
  const s = ticker;
  const [quote, incA, incQ, balA, cfA, cfQ, ratios, metrics, target, estimates] = await Promise.all([
    get("quote", `quote?symbol=${s}`),
    get("income annual", `income-statement?symbol=${s}&period=annual&limit=5`),
    getQuarters("income quarterly", `income-statement?symbol=${s}`),
    get("balance annual", `balance-sheet-statement?symbol=${s}&period=annual&limit=5`),
    get("cash flow annual", `cash-flow-statement?symbol=${s}&period=annual&limit=5`),
    get("cash flow quarterly", `cash-flow-statement?symbol=${s}&period=quarter&limit=5`),
    get("ratios", `ratios?symbol=${s}&period=annual&limit=5`),
    get("key metrics", `key-metrics?symbol=${s}&period=annual&limit=5`),
    get("price target", `price-target-consensus?symbol=${s}`),
    get("analyst estimates", `analyst-estimates?symbol=${s}&period=annual&page=0&limit=10`),
  ]);

  // Save everything as received, so later steps never need to call the API again.
  mkdirSync("data/raw", { recursive: true });
  mkdirSync("data/computed", { recursive: true });
  const fetchedAt = new Date().toISOString();
  writeFileSync(`data/raw/${s}.json`, JSON.stringify({ ticker: s, fetchedAt, quote, incA, incQ, balA, cfA, cfQ, ratios, metrics, target, estimates }, null, 1));

  // Newest first in every list.
  const q4 = (rows: Row[], f: (r: Row) => number | null, from = 0) => { const part = rows.slice(from, from + 4); return part.length === 4 ? sum(part.map(f)) : null; };
  const fcfOf = (r: Row) => n(r, "freeCashFlow") ?? ((n(r, "netCashProvidedByOperatingActivities", "operatingCashFlow") ?? NaN) + (n(r, "capitalExpenditure") ?? NaN) || null);
  const revOf = (r: Row) => n(r, "revenue");
  const oiOf = (r: Row) => n(r, "operatingIncome");
  const niOf = (r: Row) => n(r, "netIncome");

  const price = n(quote[0], "price");
  const marketCap = n(quote[0], "marketCap");

  // Trailing 12 months from the 4 newest quarters
  const revTtm = q4(incQ, revOf), revPrev = q4(incQ, revOf, 4);
  const oiTtm = q4(incQ, oiOf), niTtm = q4(incQ, niOf);
  const fcfTtm = q4(cfQ, fcfOf);
  const epsTtm = q4(incQ, (r) => n(r, "epsDiluted", "epsdiluted", "eps"));
  const ebitdaTtm = q4(incQ, (r) => n(r, "ebitda") ?? ((n(r, "operatingIncome") ?? NaN) + (n(r, "depreciationAndAmortization") ?? NaN) || null));

  // Five fiscal years
  const rev5 = incA.map(revOf), oi5 = incA.map(oiOf), ni5 = incA.map(niOf), fcf5 = cfA.map(fcfOf);
  const opm5 = rev5.map((r, i) => (r && oi5[i] !== null ? (oi5[i]! / r) * 100 : null));
  const growthYoY = rev5.slice(0, -1).map((r, i) => (r && rev5[i + 1] ? (r / rev5[i + 1]! - 1) * 100 : null));

  // ROIC = operating income after tax / average (equity + debt)
  const tax0 = (n(incA[0], "incomeTaxExpense") ?? NaN) / (n(incA[0], "incomeBeforeTax") ?? NaN);
  // Scope's rule: debt = loans and bonds only (finance leases left out); cash = cash + short-term investments.
  const debtOf = (b: Row | undefined) => {
    const st = n(b, "shortTermDebt"), lt = n(b, "longTermDebt");
    if (st !== null && lt !== null) return st + lt;
    const total = n(b, "totalDebt");
    return total === null ? null : total - (n(b, "capitalLeaseObligations") ?? 0);
  };
  const cap = (b: Row | undefined) => (n(b, "totalStockholdersEquity", "totalEquity") ?? NaN) + (debtOf(b) ?? NaN);
  const roic = Number.isFinite(tax0) && Number.isFinite(cap(balA[0])) && Number.isFinite(cap(balA[1])) && oi5[0] !== null
    ? ((oi5[0]! * (1 - tax0)) / ((cap(balA[0]) + cap(balA[1])) / 2)) * 100 : null;

  const debt = debtOf(balA[0]);
  const debtWithLeases = n(balA[0], "totalDebt");
  const cash = (n(balA[0], "cashAndShortTermInvestments", "cashAndCashEquivalents") ?? NaN) + (CASH_INCLUDES_LONG_TERM_INVESTMENTS[s] ? n(balA[0], "longTermInvestments") ?? 0 : 0);
  const ebitdaFy = n(incA[0], "ebitda");

  // Own 5-year average multiples (at fiscal year ends)
  const avg = (a: (number | null)[]) => { const v = a.filter((x): x is number => x !== null && x > 0); return v.length ? v.reduce((x, y) => x + y, 0) / v.length : null; };
  const peAvg = avg(ratios.map((r) => n(r, "priceToEarningsRatio", "peRatio")));
  const evAvg = avg(metrics.map((r) => n(r, "evToEBITDA", "enterpriseValueOverEBITDA")));
  const pe = price && epsTtm ? price / epsTtm : null;
  // FMP builds enterprise value as market cap + total debt (leases included) - cash and cash equivalents only.
  // We checked this against their key-metrics rows. Using the same recipe now keeps the comparison with their history fair.
  const cashEq = n(balA[0], "cashAndCashEquivalents");
  const ev = marketCap !== null && debtWithLeases !== null && cashEq !== null ? marketCap + debtWithLeases - cashEq : null;
  const evEbitda = ev && ebitdaTtm ? ev / ebitdaTtm : null;

  // Analyst forecast: revenue growth a year over the next 3 estimated years
  const lastFyDate = String(incA[0]?.date ?? "");
  const future = estimates.filter((r) => String(r.date) > lastFyDate).sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const rev3 = n(future[2], "revenueAvg");
  const growthForecast = rev3 && rev5[0] ? (Math.pow(rev3 / rev5[0]!, 1 / 3) - 1) * 100 : null;

  const computed: RawInputs = {
    roic: r2(roic),
    cashConversion: r2(sum(fcf5) !== null && sum(ni5) ? (sum(fcf5)! / sum(ni5)!) * 100 : null),
    marginRange: r2(opm5.every((x) => x !== null) ? Math.max(...(opm5 as number[])) - Math.min(...(opm5 as number[])) : null),
    marketCap: r2(marketCap === null ? null : marketCap / B),
    revenueTtm: r2(revTtm === null ? null : revTtm / B),
    operatingMargin: r2(revTtm && oiTtm !== null ? (oiTtm / revTtm) * 100 : null),
    netMargin: r2(revTtm && niTtm !== null ? (niTtm / revTtm) * 100 : null),
    fcfMargin: r2(revTtm && fcfTtm !== null ? (fcfTtm / revTtm) * 100 : null),
    growthTtm: r2(revTtm && revPrev ? (revTtm / revPrev - 1) * 100 : String(incQ[0]?.date) === lastFyDate && rev5[0] && rev5[1] ? (rev5[0]! / rev5[1]! - 1) * 100 : null),
    growthForecast: r2(growthForecast),
    growthCagr: r2(rev5.length >= 5 && rev5[0] && rev5[4] ? (Math.pow(rev5[0]! / rev5[4]!, 1 / 4) - 1) * 100 : null),
    topProductShare: null, // needs product segment data: stays manual for now
    netDebtEbitda: r2(debt !== null && Number.isFinite(cash) && ebitdaFy ? (debt - cash) / ebitdaFy : null),
    worstGrowth: r2(growthYoY.every((x) => x !== null) && growthYoY.length ? Math.min(...(growthYoY as number[])) : null),
    peVsAvg: r2(pe && peAvg ? pe / peAvg : null),
    evEbitdaVsAvg: r2(evEbitda && evAvg ? evEbitda / evAvg : null),
    fcfYield: r2(marketCap && fcfTtm !== null ? (fcfTtm / marketCap) * 100 : null),
  };
  writeFileSync(`data/computed/${s}.json`, JSON.stringify({ ticker: s, fetchedAt, computed, extra: { price, pe, peAvg, evEbitda, evAvg, epsTtm, fiscalYearEnd: lastFyDate, latestQuarter: incQ[0]?.date, targetConsensus: n(target[0], "targetConsensus"), targetHigh: n(target[0], "targetHigh"), targetLow: n(target[0], "targetLow") } }, null, 1));

  console.log(`\n${s}: latest fiscal year ${lastFyDate}, latest quarter ${incQ[0]?.date}, price ${price}, ${incQ.length} quarters received`);
  console.log("Input".padEnd(18), "From API".padStart(10), "In inputs.ts".padStart(14), "  Note");
  const cur = CURRENT[s] ?? {};
  for (const [k, v] of Object.entries(computed)) {
    const old = (cur as Record<string, number | null | undefined>)[k];
    let note = "";
    if (v === null) note = k === "topProductShare" ? "manual" : "MISSING";
    else if (typeof old === "number" && old !== 0) { const d = ((v - old) / Math.abs(old)) * 100; note = Math.abs(d) <= 3 ? "matches" : `differs ${d > 0 ? "+" : ""}${d.toFixed(0)}%`; }
    console.log(k.padEnd(18), String(v ?? "-").padStart(10), String(old ?? "-").padStart(14), " ", note);
  }
  if (warnings.length) console.log("\nWarnings:\n" + warnings.map((w) => " - " + w).join("\n"));
  const b = balA[0] ?? {};
  console.log("\nBalance sheet fields (latest fiscal year, billions), to check how debt and cash are counted:");
  for (const k of ["cashAndCashEquivalents", "shortTermInvestments", "cashAndShortTermInvestments", "longTermInvestments", "shortTermDebt", "longTermDebt", "capitalLeaseObligations", "capitalLeaseObligationsCurrent", "capitalLeaseObligationsNonCurrent", "totalDebt", "netDebt", "totalStockholdersEquity"]) {
    const v = n(b, k);
    console.log("  " + k.padEnd(36), v === null ? "-" : (v / B).toFixed(1));
  }
  const km = metrics[0] ?? {};
  console.log("\nKey metrics row (latest fiscal year end), to check how FMP builds enterprise value:");
  for (const k of ["marketCap", "enterpriseValue", "evToEBITDA", "returnOnInvestedCapital"]) { const v = n(km, k); console.log("  " + k.padEnd(28), v === null ? "-" : k === "marketCap" || k === "enterpriseValue" ? (v / B).toFixed(1) : v.toFixed(2)); }
  console.log("  " + "ebitda (income statement)".padEnd(28), ebitdaFy === null ? "-" : (ebitdaFy / B).toFixed(1));
  console.log(`\nSaved: data/raw/${s}.json and data/computed/${s}.json`);
}
main();