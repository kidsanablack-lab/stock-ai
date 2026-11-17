// Put this file at shared/peers.ts, next to methodology.ts.
// Nothing imports it yet, so the build is unchanged.
//
// One place for the numbers of every company that appears in another company's "Competitors" chart.
// All numbers come from the saved API data (data/raw/<TICKER>.json) through buildFacts, so Apple has
// the same revenue, free cash flow and net debt on every page.
//
// Basis (decided): each company uses ITS OWN latest 12 months for revenue, growth, operating margin and
// free cash flow. Net debt uses ITS OWN latest fiscal year-end balance sheet (the saved data has annual
// balance sheets only). peerCaveat() writes the exact dates into the page, so the caveat always matches.
//
// Net debt sign: positive = net debt, negative = net cash (same as the existing data files).
import type { CompetitorsData } from "@/components/company-next/Competitors";
import { buildFacts, type Facts, type RawFmp } from "@/lib/company-data/facts";
import rawAapl from "@/data/raw/AAPL.json";
import rawAmd from "@/data/raw/AMD.json";
import rawAmzn from "@/data/raw/AMZN.json";
import rawGoogl from "@/data/raw/GOOGL.json";
import rawIntc from "@/data/raw/INTC.json";
import rawMsft from "@/data/raw/MSFT.json";
import rawNvda from "@/data/raw/NVDA.json";
// A new rival: run  npx tsx --env-file=.env.local scripts/fetch-company-data.ts <TICKER>,
// then add one import and one line in RAW below.

type Company = CompetitorsData["companies"][number];
export type PeerMetrics = NonNullable<Company["metrics"]>;

const RAW = {
  AAPL: { name: "Apple", raw: rawAapl },
  MSFT: { name: "Microsoft", raw: rawMsft },
  GOOGL: { name: "Alphabet", raw: rawGoogl },
  AMZN: { name: "Amazon", raw: rawAmzn },
  NVDA: { name: "NVIDIA", raw: rawNvda },
  AMD: { name: "AMD", raw: rawAmd },
  INTC: { name: "Intel", raw: rawIntc },
} as const;

export type PeerTicker = keyof typeof RAW;

const cache = new Map<PeerTicker, Facts>();
function factsOf(ticker: PeerTicker): Facts {
  let f = cache.get(ticker);
  if (!f) {
    f = buildFacts(RAW[ticker].raw as unknown as RawFmp);
    cache.set(ticker, f);
  }
  return f;
}

const round1 = (v: number) => Math.round(v * 10) / 10;
const last = <T,>(a: T[]) => a[a.length - 1];

// A missing number must stop the build with a clear message. A silent 0 on a chart is worse.
function need(v: number | null | undefined, what: string, ticker: string): number {
  if (v === null || v === undefined || !Number.isFinite(v)) {
    throw new Error(`peers.ts: ${what} is missing for ${ticker}. Check data/raw/${ticker}.json (re-run fetch-company-data.ts).`);
  }
  return v;
}

/** The six numbers one company shows in a Competitors chart, in billions and percent. */
export function peerMetrics(ticker: PeerTicker): PeerMetrics {
  const f = factsOf(ticker);
  const rev = need(f.ttm.revenue, "last-12-month revenue", ticker);
  const op = need(f.ttm.operatingIncome, "last-12-month operating income", ticker);
  const fcf = need(f.ttm.fcf, "last-12-month free cash flow", ticker);
  const cash = need(last(f.cash), "cash", ticker);
  const debt = need(last(f.debt), "debt", ticker);
  return {
    revenue: round1(rev),
    growth: round1(need(f.ttm.growth, "last-12-month growth", ticker)),
    opMargin: round1((op / rev) * 100),
    fcf: round1(fcf),
    fcfMargin: round1((fcf / rev) * 100),
    netDebt: round1(debt - cash),
  };
}

/** A company entry for competitors.companies: your description and kind, with the numbers filled in from the saved data. */
export function peerCompany(ticker: PeerTicker, base: Omit<Company, "metrics" | "name" | "ticker">): Company {
  return { ...base, name: RAW[ticker].name, ticker, metrics: peerMetrics(ticker) };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
function fmtDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

/**
 * The caveat for the Competitors section, written from the data actually used.
 * `tickers` = the companies that have numbers in the chart (own company first).
 * `extra` = optional company-specific sentences, added before the last sentence.
 */
export function peerCaveat(tickers: PeerTicker[], extra?: string): string {
  const quarter = tickers.map((t) => `${RAW[t].name} ${fmtDate(factsOf(t).latestQuarter)}`).join("; ");
  const yearEnd = tickers.map((t) => `${RAW[t].name} ${fmtDate(factsOf(t).fiscalYearEnd)}`).join("; ");
  return [
    "All figures are US-reported. Revenue, growth, operating margin and free cash flow are each company’s own last 12 months, to its latest reported quarter, so the periods do not line up exactly (" + quarter + ").",
    "Net debt uses each company’s latest fiscal year-end balance sheet (" + yearEnd + ") and is short-term plus long-term debt minus cash and short-term investments, without leases. A negative number means net cash.",
    extra,
    "Businesses differ, so read gaps as clues, not scores.",
  ]
    .filter(Boolean)
    .join(" ");
}