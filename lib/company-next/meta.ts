import type {
  CompanyPageData,
  CompanyHeroData,
  CompanySummaryData,
  ScoreReasonsData,
  WhatChangedData,
  SignalsToWatchData,
  WhereMoneyComesData,
  FinancialHighlightsData,
  ValuationData,
  ProfitHistoryData,
  CashAndReturnsData,
  StrengthsRisksData,
  MoatEcosystemData,
  CompetitorsData,
  SourcesMethodData,
  BottomLineData,
  ClosingPanelData,
  SpotlightData,
} from "./types";
import { applyScore } from "../scope-score/apply";
import { metaScore } from "../scope-score/inputs";
import rawMeta from "../../data/raw/META.json";
import { buildFacts, type RawFmp } from "../company-data/facts";
import { dcfCases, impliedGrowthPct, type DcfCase } from "../company-data/dcf";
import { money, pct1, signed } from "../company-data/format";
import { peAtYearEnd } from "../company-data/peHistory";
import { cashAndReturnsNumbers, financialHighlightsMetrics, heroFacts, profitHistoryNumbers, roicText } from "../company-data/sections";
import { closingShared, formulas, formulasNote, scoreHowToRead, scoringIntro, valuationNote } from "@/shared/methodology";
import { peerCaveat, peerCompany } from "@/shared/peers";

// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(metaScore.raw, metaScore.display);

// Numbers from filings come from the saved API data (data/raw/META.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts META
const facts = buildFacts(rawMeta as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// A missing number must stop the build with a clear message. A silent 0 or an invented value is worse.
function need<T>(v: T | null | undefined, what: string): T {
  if (v === null || v === undefined || (typeof v === "number" && !Number.isFinite(v))) {
    throw new Error(`meta.ts: ${what} is missing. Check data/raw/META.json (re-run fetch-company-data.ts META).`);
  }
  return v;
}
const lastOf = <T,>(a: T[]) => a[a.length - 1];
const round1 = (v: number) => Math.round(v * 10) / 10;
const round3 = (v: number) => Math.round(v * 1000) / 1000;
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0);

// P/E at each fiscal year end, read from the saved API data (shared helper), and its average.
// The average is worked out from the same bars, so the dashed line, the hero and the text always agree.
const peHistory = peAtYearEnd(rawMeta as unknown as RawFmp);
if (peHistory.length === 0) throw new Error("meta.ts: no P/E history in data/raw/META.json");
const peAverage = round1(peHistory.reduce((s, p) => s + p.value, 0) / peHistory.length);
const peAvgAbout = Math.round(peAverage);

// Meta page data. Prices as of Nov 23, 2026 close (before the planned 2-for-1 split in January 2027).
// Latest quarter: Q3 2026 (ended Sep 30, 2026, reported Oct 21). Fiscal year = calendar year.
// FY21 to FY25 are the five full years shown (FY26 is not finished).

// ---- Market numbers, all from the saved data ----
const priceNow = need(facts.price, "share price");
const epsLtm = need(facts.ttm.eps, "last-12-month diluted EPS");
const pe = priceNow / epsLtm;
const peNowText = pe.toFixed(1);
const mcap = money(facts.marketCap); // "$1.53T"
const revLtm = need(facts.ttm.revenue, "last-12-month revenue");
const opLtm = need(facts.ttm.operatingIncome, "last-12-month operating income");
const niLtm = need(facts.ttm.netIncome, "last-12-month net income");
const opMarginLtm = (opLtm / revLtm) * 100;

// ---- Recent quarters, from the saved data (oldest first: Q3 2025, Q4 2025, Q1 2026, Q2 2026, Q3 2026) ----
const last5 = <T,>(a: T[]) => a.slice(-5);
const rev5 = last5(facts.quarters.revenue).map((v) => need(v, "quarterly revenue"));
const ni5 = last5(facts.quarters.netIncome).map((v) => need(v, "quarterly net income"));
const opm5 = last5(facts.quarters.operatingMargin).map((v) => need(v, "quarterly operating margin"));
const op5 = rev5.map((r, i) => (r * opm5[i]) / 100);
const yoy5 = last5(facts.quarters.yoy);
const fcf5 = facts.fcfQuarters.map((v) => need(v, "quarterly free cash flow"));
if (rev5.length < 5 || fcf5.length < 5) throw new Error("meta.ts: fewer than 5 quarters in data/raw/META.json");
const yoyLast = need(yoy5[4], "revenue growth of the latest quarter");
const yoyYearAgo = need(yoy5[1], "revenue growth of Q4 2025");

// ---- One-time items that Meta itself discloses (used for the P/E "without one-time items" estimate) ----
const TAX_BENEFIT_Q1_2026 = 8.03; // $B, Meta: tax benefit in Q1 2026
const LEGAL_CHARGE_Q3_2026 = 9.89; // $B, Meta: charge for the August 2026 agreement with state attorneys general
const DILUTED_SHARES_Q3 = 2.57; // billions, Q3 2026 ($9.86B net income / $3.83 EPS)
const LEGAL_EPS_IMPACT_Q3 = 3.57; // $ per share, Meta: EPS would have been $3.57 higher without the charge
const legalAfterTax = LEGAL_EPS_IMPACT_Q3 * DILUTED_SHARES_Q3;
const peExItems = round1(priceNow / ((niLtm - TAX_BENEFIT_Q1_2026 + legalAfterTax) / DILUTED_SHARES_Q3));

// ---- Fair value: Scope's discounted cash flow model (lib/company-data/dcf.ts) ----
// Net cash and shares are from the Sep 30, 2026 balance sheet and Q3 2026 results, which are newer than the saved annual data.
// Debt is long-term debt plus its current part. Leases, and the legal payments Meta owes, are not deducted.
const CASH_AND_SECURITIES_SEP30 = 82.45;
const DEBT_SEP30 = 83.67;

const fcfSeries = facts.fcf.map((v) => need(v, "annual free cash flow"));
const ocfSeries = facts.ocf.map((v) => need(v, "annual operating cash flow"));
const capexSeries = facts.capex.map((v) => need(v, "annual capital spending"));
const dcfInput = {
  fcf0: need(facts.ttm.fcf, "last-12-month free cash flow"),
  netCash: CASH_AND_SECURITIES_SEP30 - DEBT_SEP30,
  shares: DILUTED_SHARES_Q3,
};
// The same three cases as Alphabet and NVIDIA: free cash flow is far below earning power because of capital spending.
const metaCases: [DcfCase, DcfCase, DcfCase] = [
  { g1: 0, g2: 0.03, gt: 0.025, r: 0.09 }, // Bear
  { g1: 0.2, g2: 0.08, gt: 0.03, r: 0.08 }, // Base
  { g1: 0.35, g2: 0.12, gt: 0.035, r: 0.08 }, // Bull
];
const model = need(dcfCases(dcfInput, metaCases), "fair value model (free cash flow must be positive)");
// The "growth the price needs" uses the same fixed years 6-10 (6%), terminal (3%) and discount rate (8%) on every page,
// whatever the three cases above say.
const impliedBase = { g2: 0.06, gt: 0.03, r: 0.08 };
const neededGrowth = need(impliedGrowthPct(dcfInput, priceNow, impliedBase), "implied growth");
const fair = model.fair;
const premium = Math.round((priceNow / fair - 1) * 100);
const aboveFair = priceNow > fair;

// The same model started from last year's (FY25) free cash flow, before the 2026 jump in capital spending.
const fcfFy25 = lastOf(fcfSeries);
const fy25Input = { ...dcfInput, fcf0: fcfFy25 };
const fy25Model = need(dcfCases(fy25Input, metaCases), "fair value model from FY25 free cash flow");
const neededFromFy25 = need(impliedGrowthPct(fy25Input, priceNow, impliedBase), "implied growth from FY25 free cash flow");
const cagr = (a: number[]) => round1(((a[a.length - 1] / a[0]) ** (1 / (a.length - 1)) - 1) * 100);
const fcfGrowth = cagr(fcfSeries);

// Analyst targets come from the saved data, so they are always the same ones the page was built with.
const targetRow = (((rawMeta as unknown as RawFmp).target ?? [])[0] ?? {}) as Record<string, unknown>;
const target = (k: string) => need(typeof targetRow[k] === "number" ? (targetRow[k] as number) : null, `analyst price target ${k}`);
const targetLow = Math.round(target("targetLow"));
const targetHigh = Math.round(target("targetHigh"));
const targetAvg = Math.round(target("targetConsensus"));

// What the stock's own P/E history says per share: the lowest, average and highest year-end P/E times last-12-month EPS.
const peValues = peHistory.map((p) => p.value);
const ownLow = Math.round(Math.min(...peValues) * epsLtm);
const ownHigh = Math.round(Math.max(...peValues) * epsLtm);
const ownMark = Math.round(peAverage * epsLtm);
const fieldMax = Math.ceil((Math.max(model.fairValues[2], targetHigh, ownHigh) * 1.1) / 100) * 100;

const fcfYield = (dcfInput.fcf0 / need(facts.marketCap, "market cap")) * 100;
const fcfMarginNow = (dcfInput.fcf0 / revLtm) * 100;
const fcfMarginPrev = need(lastOf(facts.fcfMargin), "last fiscal year free cash flow margin");
const lastFy = lastOf(facts.years); // "FY25"
const dividendYield = ((0.525 * 4) / priceNow) * 100;

// Growth since the first of the five years, from the saved data.
const revSeries = facts.revenue.map((v) => need(v, "annual revenue"));
const opSeries = facts.operatingIncome.map((v) => need(v, "annual operating income"));
const upPct = (a: number[]) => Math.round((a[a.length - 1] / a[0] - 1) * 100);
const firstFy = facts.years[0];
const opMarginSeries = facts.operatingMargin.map((v) => need(v, "annual operating margin"));
const opMarginChange = lastOf(opMarginSeries) - opMarginSeries[0];

// Five-year cash returned versus earned, from the saved data.
const dividends5 = cashNums.dividends;
const buybacks5 = cashNums.buybacks;
const returned5 = sum(dividends5) + sum(buybacks5);
const fcf5y = sum(cashNums.fcf);
const returnedLastYear = lastOf(dividends5) + lastOf(buybacks5);

// Q4 2026 guide: revenue $73B to $76B, total 2026 expenses $175B to $179B.
// Expenses already booked in the first nine months of 2026 are worked out from the quarters above.
const nineMonthExpenses = sum(rev5.slice(2)) - sum(op5.slice(2));
const q4ExpLow = 175 - nineMonthExpenses;
const q4ExpHigh = 179 - nineMonthExpenses;
const q4MarginLow = ((73 - q4ExpHigh) / 73) * 100;
const q4MarginHigh = ((76 - q4ExpLow) / 76) * 100;

const hero: CompanyHeroData = {
  name: "Meta Platforms, Inc.",
  ticker: "META",
  sector: "Social media & AI",
  logo: "/logos/meta-color.svg",
  description:
    "The company behind Facebook, Instagram, WhatsApp and Messenger. It earns almost all of its money from ads shown to 3.6 billion people a day, and is now spending heavily on AI, smart glasses and its Muse personal agent.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: heroFacts(facts, { pe, peAvg: peAverage }, "Nov 23, 2026", {
    "P/E ratio": { note: `vs ${peAverage.toFixed(1)}× 5-year average. Includes a tax benefit and a legal charge`, noteTone: "neutral" },
    "Free cash flow, last 12 months": {
      note: `${pct1(fcfMarginNow)} of sales, down from ${pct1(fcfMarginPrev)} in ${lastFy}`,
      noteTone: "negative",
    },
  }),
  source:
    "Financials from Meta’s FY25 Form 10-K (year ended Dec 31, 2025) and the Q3 2026 earnings release (quarter ended Sep 30, 2026, reported Oct 21). Market data as of Nov 23, 2026. Next report: late January 2027, date not yet confirmed.",
};

const summary: CompanySummaryData = {
  title: "Meta in 30 seconds",
  label: "AI summary",
  text: `Meta runs Facebook, Instagram, WhatsApp and Messenger and sells ads across them. In the last 12 months sales grew ${(facts.ttm.growth ?? 0).toFixed(1)}% to ${money(revLtm)}, and Meta kept $${opMarginLtm.toFixed(2).replace(/0$/, "")} of every $100 as operating profit, even after a $9.9B legal charge. Advertising is 98% of sales. The catch is the bill: Meta spent $34.9B on data centers and equipment in Q3 alone, more than the cash its business brought in, and it is now borrowing and planning to sell new shares to pay for the build-out.`,
  highlight: {
    eyebrow: "Where the sales come from",
    value: "98%",
    caption: "from advertising, Q3 2026",
    segments: [
      { label: "Advertising", share: 97.6 },
      { label: "Other revenue (WhatsApp messaging, subscriptions)", share: 1.7 },
      { label: "Reality Labs (glasses, headsets)", share: 0.7 },
    ],
  },
};

const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  // The category scores in this sentence come from the score itself, so they cannot drift from the grades below.
  // The words about what holds quality and risk back are Meta's own reading: check them if the inputs change.
  takeaway: `Meta scores a top ${scored.reason["Revenue growth"].score.toFixed(1)} for growth and high marks for profitability (${scored.reason["Profitability"].score.toFixed(1)}) and scale (${scored.reason["Scale"].score.toFixed(1)}). Quality (${scored.reason["Quality"].score.toFixed(1)}) is held back by an operating margin that swung by 17 points in five years, and risk (${scored.reason["Risk"].score.toFixed(1)}) by the fact that 98% of sales are advertising. Valuation is a middling ${scored.reason["Valuation"].score.toFixed(1)}.`,
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: `${profitNums.returns.roic}%`, label: "return on invested capital in FY25, with free cash flow at 90% of net income over five years, but the operating margin swung between 24.8% and 42.2%", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: mcap, label: `market cap, with $${Math.round(revLtm)}B of revenue in the last 12 months`, href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: pct1(opMarginLtm), label: `operating margin in the last 12 months, and ${pct1(fcfMarginNow)} of sales kept as free cash flow`, href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: signed(facts.ttm.growth), label: `growth in the last 12 months, and ${cagr(revSeries)}% a year from ${firstFy} to ${lastFy}`, href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "97.6%", label: "of Q3 2026 sales from advertising. Net cash is from the FY25 balance sheet, and by Sep 30, 2026 Meta owed about $1.2B more than it held", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: `${peNowText}×`, label: `P/E, against its own 5-year average of ${peAverage.toFixed(1)}×, but a tax benefit and a legal charge sit inside the last 12 months`, href: "#valuation" },
  ],
  howToRead: scoreHowToRead(
    "Net margin and P/E use reported (GAAP) profit, which includes a tax benefit in Q1 2026 and a $9.89B legal charge in Q3 2026, so the Profitability and Valuation grades move with those one-time items.",
  ),
};

const whatChanged: WhatChangedData = {
  title: "Sales grew 26% to $64.6B, but a $9.9B legal charge cut operating profit 37% and spending pushed free cash flow below zero",
  lead: "What changed since the last report: Q3 2026, the quarter ended Sep 30, 2026 (reported Oct 21). The next report, Q4 2026, is expected in late January 2027.",
  metrics: [
    { label: "Revenue", value: money(rev5[4]), change: `${signed(yoyLast)} vs a year ago`, tone: "positive", series: rev5.map(round1), note: "Advertising added $13.0B of the extra $13.4B. Ad impressions grew 10% and the average price per ad 14%." },
    { label: "Operating income", value: money(op5[4]), change: `${signed((op5[4] / op5[0] - 1) * 100)} vs a year ago`, tone: "negative", series: op5.map(round1), note: "Before the $9.89B legal charge, operating income was $22.9B, up 11%, and the margin was about 35%. The charge covers an August settlement with state attorneys general over teen mental health." },
    { label: "Net income", value: money(ni5[4]), change: `${signed((ni5[4] / ni5[0] - 1) * 100)} vs a year ago`, tone: "positive", series: ni5.map(round1), note: "Net income rose because Q3 2025 included a one-time tax charge of nearly $16B. Q1 2026 included a tax benefit of $8.0B, so operating income is the cleaner measure." },
    {
      label: "Free cash flow",
      value: money(fcf5[4]),
      change: fcf5[4] > 0 && fcf5[0] > 0 ? `${signed((fcf5[4] / fcf5[0] - 1) * 100)} vs a year ago` : `${money(fcf5[4] - fcf5[0])} vs a year ago`,
      tone: fcf5[4] >= fcf5[0] ? "positive" : "negative",
      series: fcf5.map(round1),
      note: "Calculated by Scope from operating cash flow minus purchases of property and equipment. Meta’s own figure is lower because it also subtracts payments on finance leases: −$2.1B in Q3 2026, against +$10.6B a year earlier. Capital spending was $34.9B against $32.8B of operating cash flow.",
    },
  ],
  growth: {
    bars: [
      { quarter: "Q3", fy: "FY25", value: round3(rev5[0]), yoy: 26.2 },
      { quarter: "Q4", fy: "FY25", value: round3(rev5[1]), yoy: round1(yoyYearAgo) },
      { quarter: "Q1", fy: "FY26", value: round3(rev5[2]), yoy: round1(need(yoy5[2], "Q1 2026 growth")) },
      { quarter: "Q2", fy: "FY26", value: round3(rev5[3]), yoy: round1(need(yoy5[3], "Q2 2026 growth")) },
      { quarter: "Q3", fy: "FY26", value: round3(rev5[4]), yoy: round1(yoyLast) },
    ],
    verdictLabel: "Slower but fast",
    before: `${round1(need(yoy5[3], "Q2 2026 growth"))}%`,
    after: `${round1(yoyLast)}%`,
    verdict: "Sales growth eased to 26% from 28% a quarter earlier and 33% in Q1, but it is still the fifth quarter in a row above 23%.",
    watch: "Next is the December quarter. Meta guides $73B to $76B, or about 22% to 27% growth, against $59.9B a year ago, with about 1 point of currency headwind, so growth is expected to hold near the same pace.",
  },
  estimates: [
    { label: "Revenue", unit: "B", actual: 64.6, estimate: 63.37 },
  ],
  good: [
    { title: "Ads grew 26% on more ads and higher prices", detail: "Ad revenue $63.06B · impressions +10% · price per ad +14%", meaning: "Ads are 98% of Meta’s sales. Meta says its AI systems are already adding revenue through better recommendations and engagement. Revenue also beat the $63.4B analysts expected." },
    { title: "Muse, the personal AI agent, launched strongly", detail: "10M+ people in the US and Canada set it up in six weeks", meaning: "About a quarter of them use Muse on any given day. It is built on Meta’s first frontier model, Muse Wonder, and is free in the core apps, with paid plans for extra features. It does not earn money yet, so the payoff is still a promise." },
    { title: "The core ad business is more profitable than the headline", detail: "Operating income $22.9B before the legal charge, up 11%", meaning: "Without the $9.89B charge the margin was about 35%. Headcount is down 15% to 66,775 as Meta puts money into computing power instead of people." },
  ],
  watch: [
    { title: "Free cash flow turned negative", detail: "−$2.1B as Meta reports it · capital spending $34.9B", meaning: "Spending was 54% of sales. Meta guides $135B to $145B for 2026, so Q4 alone implies about $49B to $59B. It has given no 2027 figure, but says it will keep investing aggressively." },
    { title: "Legal bills are growing", detail: "$9.89B charge in Q3 · $25B New Mexico penalty ordered on Oct 21", meaning: "The charge covers an August settlement with state attorneys general, reported at up to about $18B over ten years. The $25B New Mexico penalty is a separate case: a jury found Meta misled users about their data. The first school-district youth-harm trials start in February 2027." },
    { title: "New ways to pay for the build-out", detail: "Class C shares and a 2-for-1 split planned for January 2027 · $15B and €9B of new bonds in November", meaning: "The new non-voting shares let Meta raise money without diluting founder Mark Zuckerberg’s votes. The share plan was paused in late November after a Delaware shareholder lawsuit. Debt was $83.7B on Sep 30, up from $58.7B at the end of 2025." },
  ],
  source:
    "Sources: Meta Q3 2026 earnings release (Form 8-K, Oct 21, 2026), earnings call and Form 10-Q; press coverage of the call (Reuters, AP, Fortune, Benzinga) for analyst estimates and the share price reaction; earlier quarterly releases for the year-ago figures. Quarterly revenue, net income and free cash flow come from the saved API data; operating income is calculated by Scope from the operating margin. The revenue estimate is an approximate consensus figure and differs slightly between providers.",
};

const signalsToWatch: SignalsToWatchData = {
  title: `Next report: growth has to land inside the guided 22% to 27%, and the operating margin has to climb back above ${Math.round(q4MarginLow)}%`,
  lead: "Two numbers will show whether Meta’s December quarter is good or not. Each one shows where last quarter, a year ago and Meta’s own guidance sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Late January 2027 (tentative)",
    note: "Q4 2026, the December quarter. Meta reported its December quarter in late January last year, but has not confirmed this year’s date.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around Meta’s guidance.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth land in the guided 22% to 27% range against last year’s $59.9B December quarter?",
      guidance: "Revenue of $73B to $76B, or about 22% to 27% growth, with about 1 point of currency headwind",
      format: "signedPercent",
      range: [10, 40],
      weakBelow: 22,
      strongFrom: 27,
      yearAgo: round1(yoyYearAgo),
      lastQuarter: round1(yoyLast),
    },
    {
      name: "Operating margin",
      question: "Does the margin recover from the legal charge, even as spending on computing power rises?",
      guidance: `No margin forecast. Guided 2026 expenses of $175B to $179B leave $${q4ExpLow.toFixed(1)}B to $${q4ExpHigh.toFixed(1)}B for Q4, which is a margin of about ${Math.round(q4MarginLow)}% to ${Math.round(q4MarginHigh)}% on guided revenue, calculated by Scope`,
      format: "percent",
      range: [15, 45],
      weakBelow: Math.round(q4MarginLow),
      strongFrom: 35,
      yearAgo: round1(opm5[1]),
      lastQuarter: round1(opm5[4]),
    },
  ],
  source:
    "Sources: Meta Q3 2026 earnings release and call (Oct 21, 2026) for the revenue and expense guidance; Q4 2025 results for the year-ago values. The Q4 margin range is calculated by Scope: guided 2026 expenses minus the expenses already booked in the first nine months, set against guided revenue. The next report date is tentative. Red and green zones are Scope’s own thresholds and are not a forecast.",
};

const whereMoneyComes: WhereMoneyComesData = {
  title: "Almost all sales are advertising, and the Family of Apps earns every dollar of profit while Reality Labs loses money",
  lead: "$64.6B of revenue in Q3 2026 (quarter ended Sep 30, 2026), split by what Meta sells, by profit and by region. Scope uses the latest quarter here because the annual breakdown for FY25 is not loaded yet.",
  labels: ["From Q3 2026 results"],
  periodLabel: "Q3 2026",
  comparedWith: "Q3 2025",
  products: [
    { name: "Advertising", share: 97.6, value: 63.06, yoy: 25.9, note: "Ads shown on Facebook, Instagram, Messenger, WhatsApp and partner apps" },
    { name: "Other revenue", share: 1.7, value: 1.1, yoy: 59.0, note: "Paid business messaging on WhatsApp, Meta Verified subscriptions and other sources" },
    { name: "Reality Labs", share: 0.7, value: 0.44, yoy: -5.7, note: "Quest headsets and Meta AI glasses" },
  ],
  donutHowToRead:
    "Each slice is what Meta sells, sized by its share of sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus Q3 2025.",
  profit: {
    title: "Reality Labs is under 1% of sales but lost $4.1B in the quarter",
    explain:
      "Operating profit is revenue minus the costs of that business. The Family of Apps (Facebook, Instagram, WhatsApp and Messenger) made $17.12B of operating profit in Q3 2026, a 26.7% margin after the $9.89B legal charge (about 42% before it). Reality Labs lost $4.13B on $0.44B of sales, so its share of profit is shown as zero. Together they add up to Meta’s $12.99B of operating income.",
    revenueTotal: "$64.6B",
    profitTotal: "$13.0B",
    groupNames: { a: "Family of Apps", b: "Reality Labs" },
    profitLabel: "operating profit",
    revenueShareA: 99.3,
    revenueShareB: 0.7,
    profitShareA: 100,
    profitShareB: 0,
    marginA: "26.7%",
    marginB: "−932%",
    historyTitleB: "Reality Labs share of Meta’s sales",
    historyB: [
      { year: "Q3 ’25", share: 0.9 },
      { year: "Q3 ’26", share: 0.7 },
    ],
  },
  regions: {
    title: "Almost half of sales come from the United States and Canada, which grew 33% while Asia-Pacific grew 16%",
    lead: "Where the revenue was earned in Q3 2026, by the estimated location of the user, and how each region changed versus Q3 2025. Europe is calculated by Scope as the remainder.",
    items: [
      { name: "United States & Canada", share: 44.8, value: 28.91, yoy: 32.9 },
      { name: "Europe", share: 22.4, value: 14.46, yoy: 18.0 },
      { name: "Asia-Pacific", share: 18.4, value: 11.89, yoy: 15.8 },
      { name: "Rest of World", share: 14.5, value: 9.34, yoy: 34.4 },
    ],
    focus: {
      name: "United States & Canada",
      value: 28.91,
      yoy: 32.9,
      historyTitle: "Share of Meta’s sales",
      history: [
        { year: "Q3 ’25", share: 42.5 },
        { year: "Q3 ’26", share: 44.8 },
      ],
      note: "Revenue is assigned by where Meta estimates the user is when an ad is shown or a purchase is made, not by the advertiser’s address. People in the US and Canada bring in far more revenue each than people elsewhere, so the share is much higher than their share of users. Across all regions, revenue per person was $17.72, up 23%.",
    },
    howToRead:
      "Each box’s area is the region’s share of Q3 2026 sales. The pill shows growth versus Q3 2025. Every region grew.",
  },
  source:
    "Source: Meta Q3 2026 earnings release and 10-Q (quarter ended Sep 30, 2026): revenue by type, segment results and revenue by user geography. Q3 2025 figures are from the same release. Europe’s dollar figure is calculated by Scope as total revenue minus the other three regions, and the Q3 2025 US and Canada share is worked out from the reported growth. Shares are rounded to one decimal, so a total can differ from 100% by 0.1.",
};

const financialHighlights: FinancialHighlightsData = {
  title: `Sales are up ${upPct(revSeries)}% since ${firstFy} and operating profit ${upPct(opSeries)}%, but capital spending is up ${(lastOf(capexSeries) / capexSeries[0]).toFixed(1)} times`,
  lead: `Fiscal year 2025 (ended Dec 31, 2025) compared with FY24 and the four years before it.`,
  labels: ["From FY25 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Net income": "Final profit after all costs and tax. FY25 includes a one-time tax charge of nearly $16B booked in Q3 2025, so operating income is the cleaner measure.",
    "Earnings per share": "Diluted profit per share. FY25 includes the same one-time tax charge.",
    "Free cash flow": `Operating cash flow (${money(lastOf(ocfSeries))}) minus spending on equipment and buildings (${money(lastOf(capexSeries))}). Scope does not subtract payments on finance leases, so Meta’s own figure is lower.`,
  }),
  howToRead:
    "The big number is FY25. The pill compares it with FY24: green is better, red is worse. The bars show five years and the colored bar is FY25.",
  source:
    "Source: Meta Form 10-K for FY25 (year ended Dec 31, 2025), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending (purchases of property and equipment, before finance lease payments).",
};

const valuation: ValuationData = {
  title: aboveFair
    ? `Meta trades about ${premium}% above our base-case fair value, because the cash flow we start from is held down by record AI spending`
    : `Meta trades about ${Math.abs(premium)}% below our base-case fair value, even though the cash flow we start from is held down by record AI spending`,
  lead: "Is the share price high or low compared with what Meta’s future cash is worth, what it used to trade at, and what analysts expect? All prices and values are per share before the 2-for-1 split planned for January 2027.",
  labels: ["Market data as of Nov 23, 2026", "Scope estimate"],
  price: priceNow,
  priceDate: "Nov 23, 2026",
  fair,
  field: {
    max: fieldMax,
    rows: [
      { name: "Cash flow (DCF)", low: model.fairValues[0], high: model.fairValues[2], mark: fair, markName: "Base" },
      { name: "Own P/E history", low: ownLow, high: ownHigh, mark: ownMark, markName: "5-yr avg" },
      { name: "Analyst targets", low: targetLow, high: targetHigh, mark: targetAvg, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the right of the dot, the price looks high by that measure. The cash flow range is very wide because Meta’s free cash flow is small next to its profit.",
  },
  implied: {
    title: `To justify $${Math.round(priceNow)} from today’s ${money(dcfInput.fcf0)} of free cash flow, it would have to grow about ${Math.round(neededGrowth)}% a year for five years`,
    needed: neededGrowth,
    actual: fcfGrowth,
    actualLabel: `${firstFy} to ${lastFy}`,
    text: `That is ${neededGrowth.toFixed(1)}% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. The starting point is low because capital spending jumped, not because profit fell: from the ${lastFy} level of ${money(fcfFy25)}, the needed growth would be about ${Math.round(neededFromFy25)}% a year. Free cash flow grew ${fcfGrowth.toFixed(1)}% a year from ${firstFy} to ${lastFy}.`,
    cases: model.casesLabels,
    assumptions: model.assumptions,
    fairValues: model.fairValues,
    note: `About ${model.terminalSharePct}% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. All three cases start from ${money(dcfInput.fcf0)} of free cash flow in the last 12 months, add ${money(dcfInput.netCash)} of net cash (cash and marketable securities of ${money(CASH_AND_SECURITIES_SEP30)} minus ${money(DEBT_SEP30)} of debt on Sep 30, 2026) and divide by ${dcfInput.shares.toFixed(2)}B diluted shares. Not deducted: lease obligations, the legal payments Meta owes (the state agreement and the New Mexico penalty, which Meta can still appeal) and the bonds sold in November, which add cash and debt in equal amounts. Important limit: this is the same method used for every company, and it treats today’s record capital spending as if it never pays off. If the model started from ${lastFy} free cash flow of ${money(fcfFy25)} instead, the base case would be about $${fy25Model.fair}.`,
  },
  history: {
    title: `Meta’s P/E of ${peNowText}× is ${pe < peAverage ? "a little below" : "above"} its own 5-year average of about ${peAvgAbout}×, and about the same without one-time items`,
    years: [...peHistory, { year: "Now", value: round1(pe) }],
    peAverage,
    averagePeriod: "5-year",
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the 5-year average, taken at fiscal year ends. The last 12 months include an $8.0B tax benefit in Q1 2026 and a $9.89B legal charge in Q3 2026, which pull in opposite directions.",
    multiples: [
      { name: "P/E", now: round1(pe), avg: peAverage },
      { name: "P/E without the tax benefit and the legal charge (Scope estimate)", now: peExItems, avg: peAverage },
    ],
    multiplesHowToRead:
      "Each bar shows how far Meta’s multiple is above or below its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it. The second row removes the Q1 tax benefit and the after-tax effect of the Q3 legal charge, both as Meta discloses them, so it is an estimate, not a reported figure.",
  },
  source:
    `Sources: share price $${priceNow.toFixed(2)} (Nov 23, 2026 close), the P/E average and analyst targets (low $${targetLow}, high $${targetHigh}, average $${targetAvg}) from Financial Modeling Prep; Meta Q3 2026 earnings release and 10-Q (cash, debt, free cash flow, diluted shares, tax benefit and legal charge). The analyst targets were set before the 12.6% fall in the week to Nov 20 and some have since been cut. P/E without one-time items is calculated by Scope. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.`,
};

const profitHistory: ProfitHistoryData = {
  title: `Sales grew ${cagr(revSeries)}% a year and operating profit ${cagr(opSeries)}% a year, with a deep dip in FY22`,
  lead: "Five years of results, FY2021 to FY2025: how fast Meta grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "One small fall in FY22, then growth of 16%, 22% and 22%",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales fell 1.1% in FY22 when ad spending slowed and Apple’s privacy changes hurt ad targeting, then grew 15.7% in FY23, 21.9% in FY24 and 22.2% in FY25. Profit swung much more than sales: the operating margin fell to 24.8% in FY22, when Meta was spending heavily on Reality Labs, and rose to 42.2% in FY24 after the 2023 cost cuts. Net income in FY25 includes a one-time tax charge of nearly $16B.",
  },
  margins: {
    title: `Operating margin is ${Math.abs(opMarginChange).toFixed(1)} points ${opMarginChange >= 0 ? "higher" : "lower"} than in ${firstFy}, after a deep dip in FY22`,
    howToRead:
      "Each line is one margin over five years, with the ring on FY25. The pill is the change in percentage points since FY21. The margin fell in FY22, recovered in FY23 and FY24, and slipped slightly in FY25 as spending on AI rose. Net margin in FY25 is held down by the one-time tax charge.",
  },
  returns: {
    title: "Meta earns far more on its money than the money costs, though returns have eased as the balance sheet grows",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    roicFromYear: profitNums.returns.roicFromYear,
    wacc: 8,
    text: roicText("Meta", profitNums.returns),
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as in the other company pages. Debt and equity are both growing in 2026, so ROIC is likely to come under pressure. Lease obligations are not counted as debt here.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Meta Form 10-K for FY21 to FY25 (income statement, balance sheet and cash flow statement). Fiscal years end on Dec 31. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};

const cashAndReturns: CashAndReturnsData = {
  companyName: "Meta",
  title: "Meta pays a small dividend and has little cash left to return, because AI spending now takes almost all of its operating cash",
  lead: "How much cash Meta makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: `In five years Meta returned ${money(returned5)}, about ${Math.round((returned5 / fcf5y) * 100)}% of the ${money(fcf5y)} of free cash flow it earned`,
    howToRead:
      "Each year has two bars: the free cash flow Meta earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote: `Free cash flow is cash from operations (${money(lastOf(ocfSeries))} in ${lastFy}) minus spending on equipment and buildings (${money(lastOf(capexSeries))}), which leaves ${money(lastOf(fcfSeries))}. Meta paid its first dividend in 2024.`,
  },
  how: {
    title: "Buybacks shrank Meta’s share count for years, but Meta made none in late 2025 and now plans to sell new shares",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: `Returned in ${lastFy}`, value: money(returnedLastYear), note: `${Math.round((returnedLastYear / lastOf(fcfSeries)) * 100)}% of free cash flow` },
      { label: "Dividend per share", value: "$0.525 a quarter", note: "Unchanged through 2026. The latest was declared Sep 10, 2026" },
      { label: "Dividend yield", value: `${dividendYield.toFixed(1)}%`, note: "Small, so most of the past return was buybacks" },
      { label: "Payout ratio", value: pct1((lastOf(dividends5) / need(lastOf(facts.netIncome), "last fiscal year net income")) * 100), note: `of ${lastFy} net income, so the dividend is easy to cover` },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: `Meta held ${money(lastOf(cashNums.cash) - lastOf(cashNums.debt))} more cash than debt at the end of 2025, but by Sep 30, 2026 it owed about ${money(Math.abs(dcfInput.netCash))} more than it held`,
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote: `A ratio above 1 means current assets cover bills due within a year. At the end of 2025 Meta’s ratio was about ${(cashNums.currentAssets / cashNums.currentLiabilities).toFixed(1)}. It does not include the legal payments Meta now owes, which came after that date.`,
    howToRead: `Net cash is cash and short-term investments minus interest-bearing debt. The charts use the ${lastFy} year-end balance sheet (Dec 31, 2025), which does not yet show the 2026 borrowing. On Sep 30, 2026 Meta had ${money(CASH_AND_SECURITIES_SEP30, 2)} of cash and marketable securities and ${money(DEBT_SEP30, 2)} of debt, so net debt was about ${money(Math.abs(dcfInput.netCash))}. In November 2026 Meta sold a further $15B and €9B of bonds. Leases are not counted as debt.`,
  },
  source:
    "Sources: Meta Form 10-K for FY21 to FY25 (cash flow statement and balance sheet; FY25 as of Dec 31, 2025); Meta Q3 2026 earnings release (balance sheet at Sep 30, 2026); Meta’s dividend announcements. Buybacks are the cash paid in the year. Debt is short-term plus long-term debt, without leases; at Sep 30, 2026 Scope uses long-term debt plus its current part. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section and $2.10 a year ($0.525 a quarter).",
};

const strengthsRisks: StrengthsRisksData = {
  title: "Meta’s strengths are broad and its ad engine is accelerating, but legal bills, record AI spending and new borrowing are growing fast",
  lead: "What Meta does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Meta an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Facebook, Instagram, WhatsApp and Messenger reach billions of people every day, so advertisers go where the audience is.", evidence: [{ value: "3.64B", label: "daily active people across the apps in Q3 2026, up 3%" }, { value: "$17.72", label: "revenue per person in Q3 2026, up 23%" }], why: "A huge audience and years of data make Meta’s ad system hard to match." },
    { icon: "ti-rocket", name: "Ad growth", finding: "Ads are growing faster at $240B a year than they did at $200B, on both more ads and higher prices.", evidence: [{ value: "+26%", label: "ad revenue growth in Q3 2026, to $63.06B" }, { value: "+10% and +14%", label: "ad impressions and average price per ad in Q3 2026" }], why: "Meta says its AI recommendation and ad systems add revenue every quarter." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "Meta keeps about a third of each dollar as operating profit, even after legal charges.", evidence: [{ value: pct1(opMarginLtm), label: "operating margin, last 12 months" }, { value: "35.4%", label: "operating margin in Q3 2026 before the $9.89B legal charge, calculated by Scope" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-flag", name: "Market position", finding: "One of the three biggest digital ad sellers, and the owner of four of the world’s biggest apps.", evidence: [{ value: mcap, label: "market cap on Nov 23, 2026" }, { value: "38.3%", label: "share of the combined Q3 2026 ad revenue of Alphabet, Meta and Amazon" }], why: "Scale lowers costs and gives Meta the cash to keep investing in AI." },
    { icon: "ti-users", name: "Efficiency", finding: "Meta has cut jobs and says it is spending on computing power instead of people.", evidence: [{ value: "66,775", label: "employees on Sep 30, 2026, down 15% in a year" }, { value: `$${(revLtm / 66.775).toFixed(1)}M`, label: "revenue per employee over the last 12 months, calculated by Scope" }], why: "Each new dollar of revenue needs fewer extra costs." },
    { icon: "ti-coin", name: "Financial strength", finding: "Operations bring in a very large amount of cash, and Meta still holds a large pile of it.", evidence: [{ value: "$32.8B", label: "operating cash flow in Q3 2026" }, { value: "$82.5B", label: "cash and marketable securities on Sep 30, 2026" }], why: "Meta can fund much of its AI spending from its own cash flow, though not all of it." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-gavel", name: "Legal and regulation", level: 3, finding: "Courts and regulators are fining Meta over teen safety and privacy, and the bills are growing.", evidence: [{ value: "$25B", label: "civil penalty ordered in New Mexico on Oct 21, 2026, after a jury found Meta misled users about their data" }, { value: "$9.89B", label: "charge in Q3 2026 for the August agreement with state attorneys general, reported at up to about $18B over ten years" }], why: "Family and school-district youth-harm cases continue, with the first federal school-district trial in February 2027. The FTC is appealing its antitrust loss, and the EU is reviewing Meta’s ad model under the Digital Markets Act. Our sources do not say whether the New Mexico penalty is already in Meta’s accounts." },
    { icon: "ti-cash", name: "Spending and cash", level: 3, finding: "Capital spending is now larger than the cash the business brings in.", evidence: [{ value: "−$2.1B", label: "free cash flow in Q3 2026, as Meta reports it, against +$10.6B a year earlier" }, { value: "$135B to $145B", label: "capital spending guided for 2026, nearly double 2025’s $72.2B" }], why: "Spending was $34.9B in Q3, 54% of sales, and the guide implies about $49B to $59B in Q4. If AI demand or ad growth slows, the equipment is hard to repurpose." },
    { icon: "ti-arrows-exchange", name: "Funding and dilution", level: 2, finding: "Meta now borrows heavily, and plans to sell new shares, to pay for the build-out.", evidence: [{ value: "$15B and €9B", label: "of new bonds sold in November 2026" }, { value: "$83.7B", label: "debt on Sep 30, 2026, up from $58.7B at the end of 2025" }], why: "Net cash of $22.9B at the end of 2025 became net debt of about $1.2B by Sep 30. A planned sale of new non-voting Class C shares was paused in late November after a Delaware shareholder lawsuit, so the funding path is less certain." },
    { icon: "ti-chart-pie", name: "Concentration risk", level: 2, finding: "Almost all revenue is advertising, and user growth is slow.", evidence: [{ value: "97.6%", label: "of Q3 2026 revenue from advertising" }, { value: "+3%", label: "growth in daily active people in Q3 2026" }], why: "Ad budgets rise and fall with the economy. Growth now comes from higher prices and more ads per person, not from many more people." },
    { icon: "ti-trending-down", name: "Market risk", level: 2, finding: "The share price is high compared with free cash flow and has swung hard.", evidence: [{ value: `${fcfYield.toFixed(1)}%`, label: `free cash flow yield at $${priceNow.toFixed(2)}` }, { value: "−12.6%", label: "share price move in the week to Nov 20, 2026, followed by +6.5% on Nov 23" }], why: "The shares are about 23% below their 52-week high of $779.82. Swings like this show how much future cash is already priced in." },
    { icon: "ti-device-vision-pro", name: "Reality Labs and glasses", level: 1, finding: "Meta’s hardware business loses a lot of money, though the loss is small next to its profit.", evidence: [{ value: "−$4.13B", label: "Reality Labs operating loss in Q3 2026, on $0.44B of sales" }, { value: "About $15B", label: "Reality Labs loss Meta expects in 2027, down from this year" }], why: "Meta is shifting spending toward AI and glasses with Muse, and says the business should improve from here. Quest headset sales are falling." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Meta Q3 2026 earnings release, call and Form 10-Q (Oct 21, 2026); press coverage of the New Mexico ruling (NBC News, CNBC, Bloomberg Law), the state attorneys general agreement, the November 2026 bond sales and the Class C share pause (Reuters); court and regulatory status as described in Meta’s 10-Q; analyst and price data from Financial Modeling Prep and StockAnalysis. All risk ratings are Scope’s own.",
};

const moatEcosystem: MoatEcosystemData = {
  title: "Meta’s moat is wide because billions of people already use its apps, and the main threats are the courts and rivals for attention",
  lead: "Why rivals struggle to take Meta’s users and advertisers, how the loop keeps them coming back, and who Meta depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Network effects", score: 9, weight: 30, test: "Does the product get better as more people join?", answer: "Yes. People join where their friends, family and favorite creators already are, and advertisers follow the audience.", evidence: { value: "3.64B", label: "daily active people across Meta’s apps in Q3 2026" }, wear: "TikTok and YouTube compete for the same time. A US court found in 2025 that they are real rivals, which helped Meta win the FTC case.", trend: "stable" },
    { name: "Intangible assets", score: 8, weight: 25, test: "Does Meta own things rivals cannot copy?", answer: "Yes. Years of data on what people watch and buy, its own AI ranking systems and its own models are protected know-how.", evidence: { value: "+14%", label: "average price per ad in Q3 2026, which Meta credits partly to AI" }, wear: "AI models can be matched with enough money, and Meta’s Muse models are new.", trend: "stable" },
    { name: "Switching costs", score: 7, weight: 15, test: "Would a customer lose something by leaving?", answer: "Partly. Friends, photos, groups and business chats stay behind, but joining another app costs nothing.", evidence: { value: "+59%", label: "growth in other revenue (WhatsApp messaging, subscriptions) in Q3 2026, to $1.10B" }, wear: "Young people move between apps quickly, and new rules on teen accounts and data sharing make leaving easier.", trend: "eroding" },
    { name: "Cost advantage", score: 6, weight: 15, test: "Can Meta make or buy things cheaper than rivals?", answer: "Somewhat. A very large audience spreads the cost of data centers and AI, but rivals spend as much.", evidence: { value: "$34.9B", label: "capital spending in Q3 2026" }, wear: "Costs per AI task are falling, but Meta says it needs far more computing power to keep up.", trend: "stable" },
    { name: "Brand power", score: 5, weight: 15, test: "Can Meta charge more because of its name?", answer: "Partly. Instagram and WhatsApp are daily habits, but trust in Meta’s name is mixed, and advertisers buy on results.", evidence: { value: "$63.06B", label: "ad revenue in Q3 2026, up 26%" }, wear: "Court rulings and fines on privacy and child safety hurt how people see the company.", trend: "eroding" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. Digital advertising is a huge market with strong rivals, so market size alone does not protect Meta." },
  narrowing:
    "Court orders on teen accounts and data, the EU’s rules on ads and consent, and rivals for people’s time could narrow the advantage.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for a social media and advertising company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why people and advertisers keep coming back",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "People join where their friends are", text: "Facebook, Instagram, WhatsApp and Messenger reach 3.64 billion people a day." },
      { title: "AI keeps them watching", text: "Better recommendations raise the time spent on Reels and other feeds, which gives Meta more ads to show." },
      { title: "Advertisers pay for the audience", text: "Ads brought in $63.06B in Q3 2026, and nearly 10 million advertisers use Meta’s AI tools for ads." },
      { title: "The cash funds AI and data centers", text: "Profit pays for models, chips and data centers that few rivals can match." },
      { title: "Better AI improves the apps", text: "New models and Muse go back into the apps and the ad systems, which brings more engagement." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    companyName: "Meta",
    title: "Who Meta relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip makers, memory makers, data-center builders and power providers", gives: "AI chips, buildings and electricity", gets: "Very large, steady orders", note: "Meta designs some of its own chips but buys most of its AI chips from others, and few suppliers can be swapped quickly." },
      { group: "Phone platform owners", level: 3, who: "Apple and Google, which run the iPhone and Android", gives: "The phones, app stores and privacy rules Meta’s apps run on", gets: "A share of in-app payments and the most popular apps", note: "They cannot be replaced, and a change in their rules can hit Meta’s ad targeting, as Apple’s privacy changes did in 2022." },
      { group: "Competitors", level: 2, who: "TikTok, YouTube, Snap and, in AI assistants, OpenAI and Google", gives: "Pressure on time spent, ad prices and AI features", gets: "A rival to beat", note: "The FTC case showed how much of Meta’s time and ad budget is contested. A court agreed that TikTok and YouTube are real rivals.", rival: true },
      { group: "Lenders and investors", level: 2, who: "Bond buyers and, if the plan goes ahead, buyers of new Class C shares", gives: "Money for the AI build-out", gets: "Interest and a share in future profit", note: "Meta sold $15B and €9B of bonds in November 2026. The planned share sale was paused after a shareholder lawsuit." },
      { group: "Advertisers", level: 1, who: "Companies of every size, from small shops to global brands", gives: "Almost all of Meta’s revenue", gets: "Access to billions of people", note: "Spread across millions of buyers, so no single advertiser matters much, but budgets rise and fall with the economy." },
      { group: "Users", level: 1, who: "Consumers and creators in every country", gives: "Attention, content and data", gets: "Free apps and, increasingly, a personal AI agent", note: "No single user matters, but a shift of young people’s time to other apps would matter a lot." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings or press reports are shown.",
  },
  source:
    "Sources: Meta FY25 10-K, Q3 2026 earnings release, call and 10-Q; the FTC v. Meta ruling of Nov 18, 2025 as reported by CNBC and the Associated Press; press reports on the November 2026 bond sales and Class C share pause. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};

const competitors: CompetitorsData = {
  title: "Meta grows faster than Alphabet and Amazon and keeps more of each sale as free cash, but it is the smallest of the three",
  lead: "Who Meta competes with, how it compares with Alphabet and Amazon on the same basis, and how the three split advertising.",
  labels: [],
  overviewTitle: "Who Meta competes with",
  overviewIntro: "Rivals split by how they compete for Meta’s users and advertisers.",
  shares: {
    title: "Advertising revenue of the three big ad sellers, Q3 2026, share of the combined total",
      memberNoun: "ad sellers",
  measureLabel: "share of ad revenue",
    items: [
      { name: "Google (Alphabet)", value: 49.8 },
      { name: "Meta", value: 38.3, self: true },
      { name: "Amazon", value: 11.9 },
    ],
    note: "Share of the combined advertising revenue of these three only ($82.0B, $63.1B and $19.6B in Q3 2026). It is not a market share: TikTok, Microsoft, Snap, Pinterest and many others are left out. Google’s figure is Search, YouTube and Network ads together.",
  },
  // Numbers for Meta, Alphabet and Amazon come from the saved API data through shared/peers.ts.
  companies: [
    peerCompany("META", { id: "meta", kind: "self", desc: "Facebook, Instagram, WhatsApp, Messenger and smart glasses" }),
    peerCompany("GOOGL", { id: "goog", kind: "direct", desc: "YouTube, Search ads and its own AI models" }),
    peerCompany("AMZN", { id: "amzn", kind: "direct", desc: "Online ads, Prime Video ads and shopping search" }),
    {
      id: "tiktok", name: "TikTok (ByteDance)", ticker: "Private", kind: "direct",
      desc: "Short video that competes for the same time and ad budgets",
      chartNote: "Not in the charts: ByteDance is a private company with no public financials.",
    },
    {
      id: "snap", name: "Snap", ticker: "SNAP", kind: "direct",
      desc: "Snapchat, popular with teens",
      chartNote: "Not in the charts: its figures were not loaded into Scope’s data yet.",
    },
    {
      id: "oai", name: "OpenAI", ticker: "Private", kind: "indirect",
      desc: "ChatGPT and other AI assistants that compete with Meta AI and Muse",
      chartNote: "Not in the charts: OpenAI is a private company with no public financials.",
    },
    {
      id: "aapl", name: "Apple", ticker: "AAPL", kind: "indirect",
      desc: "Makes the iPhone and sets the rules Meta’s apps must follow",
      chartNote: "Not in the charts: it is mainly the owner of the phone platform, and its business is very different.",
    },
  ],
  compareTitle: "How Meta compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is Meta, grey bars are Alphabet and Amazon.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat: peerCaveat(
    ["META", "GOOGL", "AMZN"],
    "All three spent far more on equipment in 2026 than before, so free cash flow is low for each. Meta’s balance sheet here is as of Dec 31, 2025, before it borrowed more: by Sep 30, 2026 it owed about $1.2B more than it held (see Cash and returns).",
  ),
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Meta, Alphabet and Amazon numbers from their filings, loaded from the saved API data (Financial Modeling Prep) on the same day as the rest of this page. Growth compares with the same 12 months a year earlier. Advertising revenue for Alphabet and Amazon is from their Q3 2026 results. TikTok, Snap, OpenAI and Apple are described in words because comparable figures were not loaded.",
};

const sourcesMethod: SourcesMethodData = {
  title: "Every number on this page can be traced to a filing, a formula and a score",
  lead: "Where Scope’s data comes from, how each figure is calculated, and how far a score can be trusted.",
  labels: ["Real data", "Scope methodology"],
  traceTitle: "Trace a number",
  traceIntro: "From the filing to the conclusion, for three numbers used across this page.",
  traces: [
    {
      metric: "Operating margin, last 12 months",
      value: pct1(opMarginLtm),
      steps: [
        "Form 10-K for FY25 (year ended Dec 31, 2025) and quarterly reports through Q3 2026 (quarter ended Sep 30, 2026)",
        `Operating income ${money(opLtm)} and revenue ${money(revLtm)} over the last four quarters`,
        `${opLtm.toFixed(1)} ÷ ${revLtm.toFixed(1)} × 100`,
        `${pct1(opMarginLtm)} operating margin, which includes the $9.89B legal charge`,
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: money(dcfInput.fcf0),
      steps: [
        "Cash flow statements in the FY25 Form 10-K and the quarterly reports",
        "Operating cash flow minus purchases of property and equipment, added over the last four quarters",
        "Operating cash flow − capital spending",
        `${money(dcfInput.fcf0)} free cash flow, against a lower figure as Meta reports it (finance lease payments are also subtracted)`,
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: `${peNowText}×`,
      steps: [
        "Closing share price on Nov 23, 2026 from market data, and earnings per share from Meta’s filings",
        `Share price $${priceNow.toFixed(2)} and diluted earnings per share $${epsLtm.toFixed(2)} over the last four quarters`,
        `${priceNow.toFixed(2)} ÷ ${epsLtm.toFixed(2)}`,
        `${peNowText}× P/E, which includes a tax benefit in Q1 2026 and the $9.89B legal charge in Q3 2026`,
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Meta.",
  sources: [
    { title: "SEC filings", topic: "Reported financials", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Meta, Alphabet and Amazon. The primary source for financial figures." },
    { title: "Company investor relations", topic: "Outlook and guidance", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and comments come from here." },
    { title: "Market data providers", topic: "Share price, market cap, estimates and price targets", text: "Share price, market cap, fiscal-year-end multiples and analyst targets from Financial Modeling Prep. Prices are closing prices, and Scope shows the date." },
    { title: "News and industry data", topic: "Industry and news context", text: "Press coverage of the earnings call, court rulings (NBC News, CNBC, Bloomberg Law, Reuters) and bond and share offerings. Where a figure comes only from the press, Scope says so." },
  ],
  documents: [
    { name: "FY25 annual report", date: "Jan 2026", type: "10-K", source: "SEC filings", use: "Business, risks, legal proceedings and annual financials" },
    { name: "Q3 2026 earnings release", date: "Oct 21, 2026", type: "8-K", source: "SEC filings", use: "Headline results, revenue by type, segments, guidance, balance sheet and cash flow" },
    { name: "Q3 2026 quarterly report", date: "Oct 2026", type: "10-Q", source: "SEC filings", use: "Revenue by user geography, legal proceedings and regulatory matters" },
    { name: "Q3 2026 earnings call", date: "Oct 21, 2026", type: "Transcript", source: "Company investor relations", use: "Muse, capital spending, Reality Labs and Class C stock comments, kept as press summaries" },
    { name: "Bond offering documents", date: "Nov 2026", type: "424B5", source: "SEC filings", use: "The $15B and €9B notes sold in November 2026" },
    { name: "New Mexico ruling", date: "Oct 21, 2026", type: "News", source: "News and industry data", use: "The $25B civil penalty and the jury finding" },
    { name: "Alphabet and Amazon financials", date: "Nov 2026", type: "Data feed", source: "Market data providers", use: "Rival financials, each on its own latest 12 months" },
    { name: "Analyst price targets", date: "Nov 2026", type: "Estimates", source: "Market data providers", use: "Average price target and range" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: formulas({
    "Net margin": "GAAP net income. For Meta it includes a tax benefit in Q1 2026 and a $9.89B legal charge in Q3 2026.",
    "Free cash flow": "Capital spending is purchases of property and equipment from the cash flow statement. It does not subtract payments on finance leases, which Meta includes in its own capital spending and free cash flow, so Scope’s figure is higher than Meta’s. Quarterly figures come from subtracting cumulative year-to-date totals.",
    "Net cash": "Positive means net cash, negative means net debt. Leases are not counted, and neither are the legal payments Meta owes. Scope’s Score input uses the FY25 year-end balance sheet; the Sep 30, 2026 figures are given in the text.",
    "P/E": "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings. For Meta, a second figure removes the Q1 2026 tax benefit and the after-tax effect of the Q3 legal charge, and is marked as a Scope estimate.",
    "EV/EBITDA": "Last 12 months. The average used in the Score is the 5-year average at fiscal year ends.",
  }),
  formulasNote,
  scoringTitle: "How the Scope Score is built",
  scoringIntro,
  categories: scored.categories,
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list. For Meta, net margin (31.2%) and the P/E against its average (0.91×) include a tax benefit and a legal charge that pull in opposite directions. Net debt uses the Dec 31, 2025 balance sheet, before debt rose from $58.7B to $83.7B. The largest product’s share of sales is advertising in Q3 2026 (97.6%), entered by hand.",
  valuationTitle: "How fair value is estimated",
  valuationIntro: "Three reference points, each with its own limit. None of them is a price forecast, and only the cash flow model sets the fair value.",
  methods: [
    { name: "Discounted cash flow", what: `Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($${fair} in the base case).`, limit: `The result moves a lot when assumptions change, and about ${model.terminalSharePct}% of the value comes from after year 10. For Meta the starting cash flow is low because of record capital spending, so the range between the cases is very wide.` },
    { name: "Historical multiples", what: "Compares today’s P/E with Meta’s own range over the last five fiscal year ends.", limit: "The past may not repeat when spending on AI and legal costs are changing the business." },
    { name: "Analyst price targets", what: "Shows the range and average of published targets from analysts who follow Meta.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price. Many were set before the late-November share price fall." },
  ],
  valuationNote,
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Sep 30, 2026", label: "Latest reporting period ends" },
    { date: "Oct 21, 2026", label: "Source date: reported 21 days later" },
    { date: "Nov 24, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q3 2026 (ended Sep 30, 2026)", sourceDate: "Oct 21, 2026", updated: "Nov 24, 2026", status: "Verified", limit: "GAAP basis. Annual figures use FY25 (ended Dec 31, 2025). Last-12-month figures add the last four quarters." },
    { dataset: "Balance sheet", period: "Dec 31, 2025 (annual) and Sep 30, 2026 (text)", sourceDate: "Jan 2026 and Oct 21, 2026", updated: "Nov 24, 2026", status: "Verified", limit: "Charts and the Score use the year-end snapshot. Debt changed a lot in 2026, so the Sep 30, 2026 figures are given in the text." },
    { dataset: "Cash flow", period: "FY25 plus the latest quarters", sourceDate: "Oct 21, 2026", updated: "Nov 24, 2026", status: "Verified", limit: "Last-12-month free cash flow is Scope’s calculation. Meta also subtracts finance lease payments, so its own figure is lower." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 23, 2026 close", updated: "Nov 24, 2026", status: "Verified", limit: "Closing price only, before the 2-for-1 split planned for January 2027. The share price fell 12.6% in the week before and rose 6.5% on the day." },
    { dataset: "Analyst estimates and targets", period: "Next 12 months", sourceDate: "Nov 2026", updated: "Nov 24, 2026", status: "Pending", limit: "Consensus differs between providers and many targets pre-date the late-November fall. Scope shows the range from Financial Modeling Prep." },
    { dataset: "Legal matters", period: "As of Nov 24, 2026", sourceDate: "Oct to Nov 2026", updated: "Nov 24, 2026", status: "Pending", limit: "Amounts and appeals are changing. The New Mexico penalty and the state attorneys general agreement are from the press and the 10-Q, and Meta’s response to the New Mexico order is not in our sources." },
    { dataset: "Rival financials", period: "Each company’s latest 12 months", sourceDate: "Oct to Nov 2026", updated: "Nov 2026", status: "Verified", limit: "Each company is on its own latest 12 months and latest fiscal year-end balance sheet, so the dates differ slightly. The exact dates are in the note under the Competitors charts. TikTok, Snap, OpenAI and Apple are not in the charts." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Meta does not report advertiser counts, so Scope shows daily active people (3.64 billion), revenue per person and ad price and impression growth instead." },
  ],
  source:
    "Sources: Meta, Alphabet and Amazon filings and earnings materials, Financial Modeling Prep market data and press coverage of Meta’s Q3 2026 call, the New Mexico ruling and the November 2026 bond sales, as of Nov 24, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};

const bottomLine: BottomLineData = {
  title: "A very profitable ad business whose AI spending and legal bills are now bigger than ever",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for growth, profit and scale, held back by margins that swing, almost all sales coming from advertising, and a price close to our fair value.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Strong", tone: "positive", text: `Sales up 26%, ad prices up 14%, a ${pct1(opMarginLtm)} operating margin even after legal charges, and a wide moat built on 3.64 billion daily users. The weak spot is cash: free cash flow was −$2.1B in Q3 as Meta reports it.`, href: "#moat", hrefLabel: "See the moat" },
    {
      icon: "ti-tag",
      label: "The price",
      verdict: aboveFair ? "Full" : "Below our estimate",
      tone: aboveFair ? "caution" : "positive",
      text: `A P/E of ${peNowText}× against ${peAverage.toFixed(1)}× on average looks fair, but the free cash flow yield is just ${fcfYield.toFixed(1)}% and the price is about ${Math.abs(premium)}% ${aboveFair ? "above" : "below"} our base-case fair value of $${fair}, before the planned 2-for-1 split.`,
      href: "#valuation",
      hrefLabel: "See the valuation",
    },
    { icon: "ti-alert-triangle", label: "What to watch", verdict: "Legal and spending", tone: "caution", text: "Meta faces a $25B New Mexico penalty and up to about $18B to the states, and plans $135B to $145B of capital spending in 2026, paid for partly with new debt. The next report is in late January.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price, and legal amounts can change on appeal.",
};

const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what Meta earns, what protects it and what it costs. Keep building the picture.",
  companies: [
    { name: "Alphabet", ticker: "GOOGL", reason: "The other giant ad seller: Google advertising brought in $82.0B in Q3 2026, against Meta’s $63.1B.", href: "/company/google", logo: "/logos/google-svgrepo-com.svg" },
    { name: "Amazon", ticker: "AMZN", reason: "The fast-growing third ad seller, and, like Meta, spending heavily on AI data centers.", href: "/company/amazon", logo: "/logos/amazon-color-svgrepo-com.svg" },
    { name: "NVIDIA", ticker: "NVDA", reason: "Sells the AI chips that fill data centers like the ones Meta is spending $135B to $145B on this year.", href: "/company/nvidia", logo: "/logos/nvidia-svgrepo-com.svg" },
  ],
  ...closingShared,
};

const oneDecimal = (series: number[]): number[] => series.map(round1);

const spotlight: SpotlightData = {
  title: `Meta’s ad business is booming, but AI spending has cut the cash left over to ${money(dcfInput.fcf0)} a year`,
  lead:
    "Meta earns almost all of its money from ads, and AI is making those ads more valuable: revenue grew 26% in the latest quarter. Keeping up costs a great deal. Capital spending is guided to $135B to $145B in 2026, nearly double last year, so the cash left after spending has shrunk and Meta is now borrowing and planning to sell new shares. Legal bills add to the pressure.",
  labels: [],
  chart: {
    kind: "capex-vs-cash",
    title: `Cash coming in vs cash spent on data centers and equipment, ${firstFy} to ${lastFy} ($B)`,
    howToRead:
      "Blue is cash from operations, red is spending on equipment and buildings. The line under each year is what is left (free cash flow). Capital spending here does not include finance lease payments, so it is lower than the figure Meta reports.",
    years: facts.years,
    ocf: oneDecimal(ocfSeries),
    capex: oneDecimal(capexSeries),
    callout: `Capital spending rose from ${money(capexSeries[0])} in ${firstFy} to ${money(lastOf(capexSeries))} in ${lastFy}, and in the last 12 months free cash flow was ${money(dcfInput.fcf0)}.`,
  },
  numbers: [
    { value: "−$2.1B", label: "free cash flow in Q3 2026 as Meta reports it, against +$10.6B a year earlier", tone: "negative" },
    { value: "$135B to $145B", label: "capital spending guided for 2026, nearly double 2025’s $72.2B", tone: "negative" },
    { value: "+26%", label: "revenue growth in Q3 2026, on more ads and higher prices", tone: "positive" },
    { value: "$83.7B", label: "debt on Sep 30, 2026, up from $58.7B at the end of 2025", tone: "negative" },
  ],
  wins: [
    {
      title: "AI is already lifting ad revenue",
      detail:
        "Ad impressions grew 10% and the price per ad 14% in Q3, and Meta says its AI investments add revenue through better recommendations and engagement.",
    },
    {
      title: "The core business still earns a lot",
      detail:
        "Meta generated $32.8B of operating cash flow in Q3, and its operating margin was about 35% before the legal charge.",
    },
  ],
  breaks: [
    {
      title: "Spending is above the cash earned",
      detail:
        "Capital spending was $34.9B in Q3 against $32.8B of operating cash flow, and the 2026 guide implies about $49B to $59B in Q4. If AI demand or ad growth slows, the equipment is hard to repurpose.",
    },
    {
      title: "Borrowing and a paused share sale are paying for it",
      detail:
        "Meta sold $15B and €9B of bonds in November. Its plan to sell new non-voting shares was paused in late November after a Delaware shareholder lawsuit.",
    },
  ],
  watch: {
    title: "Next report: how much of the $73B to $76B of revenue reaches profit while spending steps up?",
    text:
      "Meta guides Q4 revenue of $73B to $76B, and its 2026 capital spending guide implies about $49B to $59B in the quarter. It has given no 2027 spending figure but says it will keep investing aggressively. The report expected in late January 2027 (date not yet confirmed) shows how the margin recovers from the legal charge.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: Meta FY25 Form 10-K and Q3 2026 earnings release, call and Form 10-Q (Oct 21, 2026); press coverage of the November 2026 bond sales and the Class C share pause (Reuters). Free cash flow is calculated by Scope as operating cash flow minus purchases of property and equipment. Capital spending guidance is Meta’s own, not a result.",
};

export const metaPage: CompanyPageData = {
  hero,
  summary,
  scoreReasons,
  spotlight,
  whatChanged,
  signalsToWatch,
  whereMoneyComes,
  financialHighlights,
  valuation,
  profitHistory,
  cashAndReturns,
  strengthsRisks,
  moatEcosystem,
  competitors,
  sourcesMethod,
  bottomLine,
  closing,
};