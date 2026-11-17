import type { Facts } from "./facts";
import { clean, money, pct1, pts, signed, round } from "./format";

type Tone = "positive" | "negative";
const last = <T,>(a: T[]) => a[a.length - 1];
const prev = <T,>(a: T[]) => a[a.length - 2];
const chg = (now: number | null, before: number | null) => (now === null || before === null || before === 0 ? null : (now / before - 1) * 100);
const tone = (v: number | null, goodWhenUp = true): Tone => ((v ?? 0) >= 0) === goodWhenUp ? "positive" : "negative";

// The six big-number cards in "Financial highlights".
export function financialHighlightsMetrics(f: Facts, notes: Partial<Record<string, string>> = {}) {
  const y = f.years, py = prev(y);
  const card = (label: string, value: string, change: string, t: Tone, series: (number | null)[], unit: "B" | "$" | "%", note: string) =>
    ({ label, value, change, tone: t, series: clean(series), note: notes[label] ?? note, unit });
  const revG = chg(last(f.revenue), prev(f.revenue)), niG = chg(last(f.netIncome), prev(f.netIncome)), epsG = chg(last(f.eps), prev(f.eps)), fcfG = chg(last(f.fcf), prev(f.fcf));
  const opD = (last(f.operatingMargin) ?? 0) - (prev(f.operatingMargin) ?? 0), nmD = (last(f.netMargin) ?? 0) - (prev(f.netMargin) ?? 0);
  return [
    card("Revenue", money(last(f.revenue)), `${signed(revG)} vs ${py}`, tone(revG), f.revenue, "B", `Total sales for the year. Up ${chg(last(f.revenue), f.revenue[0])?.toFixed(0)}% since ${y[0]}.`),
    card("Net income", money(last(f.netIncome)), `${signed(niG)} vs ${py}`, tone(niG), f.netIncome, "B", "Final profit after all costs and tax."),
    card("Earnings per share", `$${(last(f.eps) ?? 0).toFixed(2)}`, `${signed(epsG)} vs ${py}`, tone(epsG), f.eps, "$", "Diluted profit per share."),
    card("Free cash flow", money(last(f.fcf)), `${signed(fcfG)} vs ${py}`, tone(fcfG), f.fcf, "B", `Operating cash flow (${money(last(f.ocf))}) minus spending on equipment and buildings (${money(last(f.capex))}).`),
    card("Operating margin", pct1(last(f.operatingMargin)), `${pts(opD)} vs ${py}`, tone(opD), f.operatingMargin, "%", `About $${Math.round(last(f.operatingMargin) ?? 0)} of every $100 sold is kept after running the business, before tax.`),
    card("Net margin", pct1(last(f.netMargin)), `${pts(nmD)} vs ${py}`, tone(nmD), f.netMargin, "%", `$${(last(f.netMargin) ?? 0).toFixed(2)} of every $100 sold is kept as final profit.`),
  ];
}

// The numbers behind the "Profit history" charts.
export function profitHistoryNumbers(f: Facts) {
  const r = f.roic.filter((x): x is number => x !== null);
  return {
    years: f.years,
    revenue: clean(f.revenue), grossProfit: clean(f.grossProfit), operatingIncome: clean(f.operatingIncome), netIncome: clean(f.netIncome), fcf: clean(f.fcf),
    returns: { roic: Math.round(last(r) ?? 0), roicFrom: Math.round(r[0] ?? 0), roicFromYear: f.years[f.years.length - r.length] },
  };
}

// The sentence under the ROIC card. It says "up from" or "down from" by the real numbers.
// `why` is an optional company-specific sentence that is added at the end.
export function roicText(
  companyName: string,
  r: { roic: number; roicFrom: number; roicFromYear?: string },
  why?: string,
): string {
  const direction = r.roic >= r.roicFrom ? "up" : "down";
  const base = `For every $100 put into the business, ${companyName} earns about $${r.roic} a year after tax, ${direction} from $${r.roicFrom} in ${r.roicFromYear ?? "the first year shown"}.`;
  return why ? `${base} ${why}` : base;
}

// The numbers behind "Cash and returns".
export function cashAndReturnsNumbers(f: Facts) {
  return {
    years: f.years,
    fcf: clean(f.fcf), dividends: clean(f.dividends), buybacks: clean(f.buybacks),
    shares: clean(f.shares),
    cash: clean(f.cash), debt: clean(f.debt), equity: clean(f.equity),
    currentAssets: round(f.currentAssets), currentLiabilities: round(f.currentLiabilities),
  };
}

// The four cards at the top of the page.
export function heroFacts(f: Facts, x: { pe: number | null; peAvg: number | null }, asOf: string) {
  const fcfMargin = f.ttm.fcf !== null && f.ttm.revenue ? (f.ttm.fcf / f.ttm.revenue) * 100 : null;
  return [
    { label: "Market cap", value: money(f.marketCap), note: `As of ${asOf}` },
    { label: "Revenue, last 12 months", value: money(f.ttm.revenue), note: `${signed(f.ttm.growth)} vs a year earlier`, noteTone: tone(f.ttm.growth) },
    { label: "P/E ratio", value: x.pe === null ? "n/a" : `${x.pe.toFixed(1)}×`, note: x.peAvg === null ? "" : `vs ${x.peAvg.toFixed(1)}× 5-year average`, noteTone: tone((x.pe ?? 0) - (x.peAvg ?? 0), false) },
    { label: "Free cash flow, last 12 months", value: money(f.ttm.fcf), note: `${pct1(fcfMargin)} of sales`, noteTone: tone(fcfMargin !== null ? 1 : null) },
  ];
}