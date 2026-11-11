// Turns the raw numbers saved by scripts/fetch-company-data.ts (data/raw/<TICKER>.json)
// into clean "facts" in billions, oldest year first. Page sections are generated from these facts.

import { CASH_INCLUDES_LONG_TERM_INVESTMENTS } from "./policy";

export type Row = Record<string, unknown>;
export type RawFmp = {
  ticker: string; fetchedAt: string;
  quote: Row[]; incA: Row[]; incQ: Row[]; balA: Row[]; cfA: Row[]; cfQ: Row[]; ratios: Row[]; metrics: Row[]; target: Row[]; estimates: Row[];
};

const B = 1e9;
const num = (row: Row | undefined, ...names: string[]): number | null => {
  if (!row) return null;
  for (const k of names) { const v = row[k]; if (typeof v === "number" && Number.isFinite(v)) return v; }
  return null;
};
const bn = (v: number | null) => (v === null ? null : v / B);
const abs = (v: number | null) => (v === null ? null : Math.abs(v));
const pct = (a: number | null, b: number | null) => (a === null || b === null || b === 0 ? null : (a / b) * 100);
const chg = (now: number | null, before: number | null) => (now === null || before === null || before === 0 ? null : (now / before - 1) * 100);

export type Series = (number | null)[];

export type Facts = {
  ticker: string;
  fetchedAt: string;
  price: number | null;
  marketCap: number | null; // billions
  years: string[]; // "FY22".."FY26", oldest first
  fiscalYearEnd: string;
  latestQuarter: string;
  // annual, billions (EPS in dollars, shares in billions)
  revenue: Series; grossProfit: Series; operatingIncome: Series; netIncome: Series; eps: Series; ocf: Series; capex: Series; fcf: Series;
  dividends: Series; buybacks: Series; shares: Series; cash: Series; debt: Series; equity: Series;
  currentAssets: number | null; currentLiabilities: number | null;
  // margins in %
  grossMargin: Series; operatingMargin: Series; netMargin: Series; fcfMargin: Series;
  // ROIC in %, same length as years (null where it needs a year we do not have)
  roic: Series;
  // trailing 12 months
  ttm: { revenue: number | null; operatingIncome: number | null; netIncome: number | null; fcf: number | null; eps: number | null; growth: number | null };
  // last 8 quarters, oldest first
  quarters: { date: string[]; revenue: Series; yoy: Series; netIncome: Series; operatingMargin: Series };
  fcfQuarters: Series; // last 5 quarters, oldest first
};

export function buildFacts(raw: RawFmp): Facts {
  const oldestFirst = (rows: Row[]) => [...rows].sort((a, b) => String(a.date).localeCompare(String(b.date)));
  const inc = oldestFirst(raw.incA), bal = oldestFirst(raw.balA), cf = oldestFirst(raw.cfA);
  const q = oldestFirst(raw.incQ), cfq = oldestFirst(raw.cfQ);

  const years = inc.map((r) => `FY${String(num(r, "fiscalYear") ?? String(r.date).slice(0, 4)).slice(-2)}`);
  const revenue = inc.map((r) => bn(num(r, "revenue")));
  const grossProfit = inc.map((r) => bn(num(r, "grossProfit")));
  const operatingIncome = inc.map((r) => bn(num(r, "operatingIncome")));
  const netIncome = inc.map((r) => bn(num(r, "netIncome")));
  const eps = inc.map((r) => num(r, "epsDiluted", "epsdiluted", "eps"));
  const shares = inc.map((r) => bn(num(r, "weightedAverageShsOutDil", "weightedAverageShsOut")));
  const ocf = cf.map((r) => bn(num(r, "netCashProvidedByOperatingActivities", "operatingCashFlow")));
  const capex = cf.map((r) => bn(abs(num(r, "capitalExpenditure", "investmentsInPropertyPlantAndEquipment"))));
  const fcf = cf.map((r, i) => bn(num(r, "freeCashFlow")) ?? (ocf[i] !== null && capex[i] !== null ? ocf[i]! - capex[i]! : null));
  const dividends = cf.map((r) => bn(abs(num(r, "commonDividendsPaid", "netDividendsPaid", "dividendsPaid"))));
  const buybacks = cf.map((r) => bn(abs(num(r, "commonStockRepurchased", "netCommonStockIssuance"))));

  // Scope's rule: debt = loans and bonds only (no finance leases); cash = cash + short-term investments.
  const debtOf = (b: Row) => {
    const st = num(b, "shortTermDebt"), lt = num(b, "longTermDebt");
    if (st !== null && lt !== null) return st + lt;
    const total = num(b, "totalDebt");
    return total === null ? null : total - (num(b, "capitalLeaseObligations") ?? 0);
  };
  const debtRaw = bal.map((b) => debtOf(b));
  const debt = debtRaw.map(bn);
  const addLongTerm = CASH_INCLUDES_LONG_TERM_INVESTMENTS[raw.ticker] === true;
  const cash = bal.map((b) => {
    const base = num(b, "cashAndShortTermInvestments", "cashAndCashEquivalents");
    return base === null ? null : bn(base + (addLongTerm ? num(b, "longTermInvestments") ?? 0 : 0));
  });
  const equity = bal.map((b) => bn(num(b, "totalStockholdersEquity", "totalEquity")));
  const lastBal = bal[bal.length - 1];

  const operatingMargin = revenue.map((r, i) => pct(operatingIncome[i], r));
  const roic = inc.map((r, i) => {
    if (i === 0) return null;
    const tax = (num(r, "incomeTaxExpense") ?? NaN) / (num(r, "incomeBeforeTax") ?? NaN);
    const cap = (j: number) => (equity[j] ?? NaN) + (debt[j] ?? NaN);
    const v = (operatingIncome[i] ?? NaN) * (1 - tax) / ((cap(i) + cap(i - 1)) / 2) * 100;
    return Number.isFinite(v) ? v : null;
  });

  const last4 = (rows: Row[], f: (r: Row) => number | null, from = 0) => {
    const part = rows.slice(rows.length - from - 4, rows.length - from);
    const vals = part.map(f);
    return part.length === 4 && vals.every((x) => x !== null) ? (vals as number[]).reduce((a, b) => a + b, 0) : null;
  };
  const revQ = (r: Row) => num(r, "revenue");
  const ttmRev = last4(q, revQ), prevRev = last4(q, revQ, 4);
  const fcfOfRow = (r: Row) => num(r, "freeCashFlow") ?? ((num(r, "netCashProvidedByOperatingActivities", "operatingCashFlow") ?? NaN) + (num(r, "capitalExpenditure") ?? NaN) || null);

  const quarters = {
    date: q.map((r) => String(r.date)),
    revenue: q.map((r) => bn(revQ(r))),
    yoy: q.map((r, i) => (i >= 4 ? chg(revQ(r), revQ(q[i - 4])) : null)),
    netIncome: q.map((r) => bn(num(r, "netIncome"))),
    operatingMargin: q.map((r) => pct(num(r, "operatingIncome"), revQ(r))),
  };

  return {
    ticker: raw.ticker, fetchedAt: raw.fetchedAt,
    price: num(raw.quote[0], "price"), marketCap: bn(num(raw.quote[0], "marketCap")),
    years, fiscalYearEnd: String(inc[inc.length - 1]?.date ?? ""), latestQuarter: String(q[q.length - 1]?.date ?? ""),
    revenue, grossProfit, operatingIncome, netIncome, eps, ocf, capex, fcf, dividends, buybacks, shares, cash, debt, equity,
    currentAssets: bn(num(lastBal, "totalCurrentAssets")), currentLiabilities: bn(num(lastBal, "totalCurrentLiabilities")),
    grossMargin: revenue.map((r, i) => pct(grossProfit[i], r)), operatingMargin,
    netMargin: revenue.map((r, i) => pct(netIncome[i], r)), fcfMargin: revenue.map((r, i) => pct(fcf[i], r)),
    roic,
    ttm: {
      revenue: bn(ttmRev), operatingIncome: bn(last4(q, (r) => num(r, "operatingIncome"))), netIncome: bn(last4(q, (r) => num(r, "netIncome"))),
      fcf: bn(last4(cfq, fcfOfRow)), eps: last4(q, (r) => num(r, "epsDiluted", "epsdiluted", "eps")),
      growth: ttmRev !== null && prevRev !== null ? (ttmRev / prevRev - 1) * 100 : null,
    },
    quarters,
    fcfQuarters: cfq.slice(-5).map((r) => bn(fcfOfRow(r))),
  };
}