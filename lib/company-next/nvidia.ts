import type { CompanyHeroData } from "@/components/company-next/CompanyHero";
import type { CompanySummaryData } from "@/components/company-next/CompanySummary";
import type { ScoreReasonsData } from "@/components/company-next/ScoreReasons";
import type { WhatChangedData } from "@/components/company-next/WhatChanged";
import type { SignalsToWatchData } from "@/components/company-next/SignalsToWatch";
import type { WhereMoneyComesData } from "@/components/company-next/WhereMoneyComes";
import type { FinancialHighlightsData } from "@/components/company-next/FinancialHighlights";
import type { ValuationData } from "@/components/company-next/Valuation";
import type { ProfitHistoryData } from "@/components/company-next/ProfitHistory";
import type { CashAndReturnsData } from "@/components/company-next/CashAndReturns";
import type { StrengthsRisksData } from "@/components/company-next/StrengthsRisks";
import type { MoatEcosystemData } from "@/components/company-next/MoatEcosystem";
import type { CompetitorsData } from "@/components/company-next/Competitors";
import type { SourcesMethodData } from "@/components/company-next/SourcesMethod";
import type { BottomLineData } from "@/components/company-next/BottomLine";
import type { ClosingPanelData } from "@/components/company-next/ClosingPanel";
import type { SpotlightData } from "@/components/company-next/Spotlight";
import type { CompanyPageData } from "./apple";
import { applyScore } from "../scope-score/apply";
import { nvidiaScore } from "../scope-score/inputs";
import rawNvda from "../../data/raw/NVDA.json";
import { buildFacts, type RawFmp } from "../company-data/facts";
import { cashAndReturnsNumbers, financialHighlightsMetrics, profitHistoryNumbers } from "../company-data/sections";

// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(nvidiaScore.raw, nvidiaScore.display);

// Numbers from filings come from the saved API data (data/raw/NVDA.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts NVDA
const facts = buildFacts(rawNvda as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// NVIDIA page data. Prices as of Nov 6, 2026 close. Latest quarter: Q2 FY27 (ended Jul 26, 2026).
// Fiscal year ends in late January: FY26 ended Jan 25, 2026. FY22 to FY26 are the five full years shown.

const hero: CompanyHeroData = {
  name: "NVIDIA Corporation",
  ticker: "NVDA",
  sector: "Technology",
  logo: "/logos/nvidia-svgrepo-com.svg", // TODO: check this file exists in public/logos
  description:
    "A chip and computing company whose graphics processors (GPUs) and software have become the main engine of AI, sold mostly to the cloud giants that build AI data centers.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$4.50T", note: "As of Nov 6, 2026" },
    { label: "Revenue, last 12 months", value: "$303.0B", note: "+83.4% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "23.6×", note: "vs 59.7× 5-year average", noteTone: "positive" },
    { label: "Free cash flow, last 12 months", value: "$127.0B", note: "41.9% of sales", noteTone: "positive" },
  ],
  source:
    "Financials from NVIDIA’s FY26 Form 10-K (fiscal year ended Jan 25, 2026) and the Q2 FY27 earnings release (quarter ended Jul 26, 2026). Market data as of Nov 6, 2026. Next report: late November 2026, date not yet confirmed.",
};

const summary: CompanySummaryData = {
  title: "NVIDIA in 30 seconds",
  label: "AI summary",
  text: "NVIDIA designs the chips and software that train and run AI. Cloud giants and AI companies buy them in huge numbers, so sales more than doubled in the latest quarter and NVIDIA kept about $65 of every $100 as operating profit. The risk is the other side of the same coin: about 93% of sales come from data centers, and two customers made up 36% of FY26 revenue.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "93%",
    caption: "from Data Center, Q2 FY27",
    segments: [
      { label: "Data Center · cloud giants", share: 50.6 },
      { label: "Data Center · other customers", share: 41.9 },
      { label: "Edge Computing", share: 7.5 },
    ],
  },
};

const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  takeaway:
    "NVIDIA scores top marks for growth, scale and profit, and a high mark for valuation because its P/E is far below its own 5-year average. Quality and risk hold the score back: margins swung a lot over five years, and almost all sales come from one business.",
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: "87%", label: "return on invested capital in FY26, but the operating margin swung between 15.7% and 62.4% in five years", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: "$4.50T", label: "market cap, with $303B of revenue in the last 12 months", href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: "65.2%", label: "operating margin in the last 12 months, and 42% of sales kept as free cash flow", href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: "+83.4%", label: "growth in the last 12 months, and 68% a year from FY22 to FY26", href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "92.5%", label: "of Q2 FY27 sales from Data Center, offset by net cash of $54.1B", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: "23.6×", label: "P/E, against its own 5-year average of 59.7×, which is inflated by years of low profit", href: "#valuation" },
  ],
  howToRead:
    "A is the strongest grade and F the weakest. Green means strong, amber mixed, red weak. Each grade comes from a 0 to 10 category score, and the overall score is their weighted average. The inputs, weights and cut-offs are listed under Sources and method.",
};

const whatChanged: WhatChangedData = {
  title: "Sales more than doubled to $96.2B, and NVIDIA guides to $108B next quarter while its margin dips",
  lead: "What changed since the last report: Q2 FY27, the quarter ended Jul 26, 2026 (reported Aug 26). The next report, Q3 FY27, is expected in late November 2026.",
  metrics: [
    { label: "Revenue", value: "$96.2B", change: "+105.9% vs a year ago", tone: "positive", series: [46.7, 57.0, 68.1, 81.6, 96.2], note: "Data Center added about $48B of the extra $49.5B. Growth has sped up for four quarters in a row." },
    { label: "Operating income", value: "$63.7B", change: "+124% vs a year ago", tone: "positive", series: [28.4, 36.0, 44.3, 53.5, 63.7], note: "The operating margin was 66.2%, up from 60.8% a year ago." },
    { label: "Net income", value: "$59.7B", change: "+126% vs a year ago", tone: "positive", series: [26.4, 31.9, 43.0, 58.3, 59.7], note: "GAAP profit. NVIDIA’s adjusted figure is $54.0B, because it leaves out items such as gains on stakes in other companies." },
    { label: "Data Center revenue", value: "$89.0B", change: "+117% vs a year ago", tone: "positive", series: [62.3, 75.4, 89.0], note: "Up 18% from the quarter before. The Q1 figure is calculated by Scope from that growth rate." },
  ],
  growth: {
    bars: [
      { quarter: "Q3", fy: "FY25", value: 35.1, yoy: 94 },
      { quarter: "Q4", fy: "FY25", value: 39.3, yoy: 78 },
      { quarter: "Q1", fy: "FY26", value: 44.1, yoy: 69 },
      { quarter: "Q2", fy: "FY26", value: 46.7, yoy: 56 },
      { quarter: "Q3", fy: "FY26", value: 57.0, yoy: 62.5 },
      { quarter: "Q4", fy: "FY26", value: 68.1, yoy: 73.2 },
      { quarter: "Q1", fy: "FY27", value: 81.6, yoy: 85.2 },
      { quarter: "Q2", fy: "FY27", value: 96.2, yoy: 105.9 },
    ],
    verdictLabel: "Accelerating",
    before: "85.2%",
    after: "105.9%",
    verdict: "Sales growth sped up to 106% from 85% a quarter earlier, the fourth quarter in a row of faster growth.",
    watch: "Next is the October quarter. NVIDIA guides $108B, plus or minus 2%, which is about +89% against $57.0B a year ago, so growth is expected to slow from 106%.",
  },
  estimates: [
    { label: "Revenue", unit: "B", actual: 96.22, estimate: 92.38 },
  ],
  good: [
    { title: "Data Center more than doubled", detail: "$89.0B, +117% vs a year ago", meaning: "Data Center is about 93% of NVIDIA’s sales, so its growth sets the pace for the whole company." },
    { title: "The cloud giants spent far more", detail: "$48.7B from hyperscalers, up 13% from last quarter", meaning: "Hyperscalers are the largest cloud providers. They are about half of NVIDIA’s total sales and more than doubled their spending in a year." },
    { title: "Profit kept pace with sales", detail: "66.2% operating margin, up from 60.8%", meaning: "NVIDIA kept about $66 of every $100 sold after running the business, the highest in the last eight quarters." },
  ],
  watch: [
    { title: "Margin is expected to fall", detail: "75% now → 74% guided → 71% to 72% by Q4", meaning: "NVIDIA says rising memory costs will pull the gross margin down before it recovers to 72% to 73% in FY28." },
    { title: "No China chip sales in the outlook", detail: "$0 of Data Center compute revenue from China assumed", meaning: "The guidance leaves China out completely, so any China sales would be a bonus, but the business it lost is not coming back soon." },
    { title: "Commitments are growing fast", detail: "Purchase commitments $279B, up from $119B a quarter earlier", meaning: "NVIDIA is locking in supply, mostly memory. That protects growth if demand holds, but it is a large bill if demand slows." },
  ],
  source:
    "Sources: NVIDIA Q2 FY27 earnings release and call (quarter ended Jul 26, 2026), as reported by Verdict and Futurum; earlier quarterly releases for the year-ago figures. The revenue estimate is an approximate consensus figure from press reports and differs between data providers. Year-over-year growth for the first four quarters shown is from NVIDIA’s earlier releases (rounded). The Q1 FY27 Data Center figure is calculated by Scope.",
};

const signalsToWatch: SignalsToWatchData = {
  title: "Next report: growth has to stay near 89% and the gross margin has to hold at the guided 74%",
  lead: "Three numbers will show whether NVIDIA’s October quarter is good or not. Each one shows where last quarter, a year ago and NVIDIA’s own guidance sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Late November 2026 (tentative)",
    note: "Q3 FY27, the quarter ending in late October. NVIDIA reported its October quarter on Nov 19 last year, but has not confirmed this year’s date.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around NVIDIA’s guidance.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth hold near the guided $108B, about +89% against last year’s $57.0B?",
      guidance: "$108B, plus or minus 2%, or about +87% to +92%",
      format: "signedPercent",
      range: [40, 120],
      weakBelow: 87,
      strongFrom: 92,
      yearAgo: 62.5,
      lastQuarter: 105.9,
    },
    {
      name: "Gross margin",
      question: "Do memory costs pull the margin down to the guided 74%, or does NVIDIA do better?",
      guidance: "74%, plus or minus 0.5 points",
      format: "percent",
      range: [70, 77],
      weakBelow: 73.5,
      strongFrom: 74.5,
      yearAgo: 73.4,
      lastQuarter: 75.0,
    },
    {
      name: "Operating margin",
      question: "Does the operating margin stay near 65% as spending rises to about $9B a quarter?",
      guidance: "About 65.5%, calculated by Scope from the guided gross margin, revenue and expenses",
      format: "percent",
      range: [60, 70],
      weakBelow: 65,
      strongFrom: 66,
      yearAgo: 63.2,
      lastQuarter: 66.2,
    },
  ],
  source:
    "Sources: NVIDIA Q2 FY27 earnings release and call (Aug 26, 2026) for the guidance, and earlier releases for the year-ago figures. The operating margin guide is calculated by Scope: 74% gross margin minus $9.2B of expenses on $108B of revenue. The next report date is tentative. Red and green zones are Scope’s own thresholds and are not a forecast.",
};

const whereMoneyComes: WhereMoneyComesData = {
  title: "Nearly nine tenths of sales come from Data Center, and it earns far more of each dollar than the rest",
  lead: "$215.9B of revenue in FY26 (year ended Jan 25, 2026), split by product line, by profit and by region. In FY27 NVIDIA changed how it reports: Data Center and Edge Computing, shown in the summary at the top.",
  labels: ["From FY26 10-K"],
  products: [
    { name: "Data Center", share: 89.7, value: 193.7, yoy: 68, note: "AI chips, networking and systems sold for data centers" },
    { name: "Gaming", share: 7.4, value: 16.0, yoy: 41, note: "GeForce graphics cards and game consoles" },
    { name: "Professional Visualization", share: 1.5, value: 3.2, yoy: 70, note: "Workstation graphics for designers and engineers" },
    { name: "Automotive", share: 1.1, value: 2.3, yoy: 39, note: "Chips and software for cars and driving systems" },
  ],
  donutHowToRead:
    "Each slice is a product line, sized by its share of NVIDIA’s sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus FY25. The remaining 0.3% is OEM and other.",
  profit: {
    title: "Compute & Networking is 90% of sales but 93% of segment profit",
    explain:
      "Segment operating profit is revenue minus the costs of that business. NVIDIA keeps $67.30 of every $100 of Compute & Networking sales (the chips and networking sold to data centers) but only $40.80 of every $100 of Graphics sales (gaming and workstation cards). NVIDIA reports these two segments, not each product line, so the products are shown as two groups. The figures leave out a cost group called All Other.",
    revenueTotal: "$215.9B",
    profitTotal: "$139.3B",
    productsRevenue: 10.4,
    servicesRevenue: 89.6,
    productsProfit: 6.6,
    servicesProfit: 93.4,
    productsMargin: "40.8%",
    servicesMargin: "67.3%",
    servicesHistoryTitle: "Compute & Networking share of NVIDIA’s sales",
    servicesHistory: [
      { year: "FY25", share: 89.0 },
      { year: "FY26", share: 89.6 },
    ],
  },
  regions: {
    title: "Seven in ten dollars come from the United States, and sales outside it fell from 41% to 31% of the total",
    lead: "Where the revenue was earned in FY26, by where the customer is headquartered, and how each area changed versus FY25. NVIDIA gives only the share outside the US, so the dollars are calculated by Scope from rounded percentages.",
    items: [
      { name: "United States", share: 69, value: 149.0, yoy: 93.5 },
      { name: "Other countries", share: 31, value: 66.9, yoy: 25.1 },
    ],
    focus: {
      name: "Other countries",
      value: 66.9,
      yoy: 25.1,
      historyTitle: "Share of NVIDIA’s sales",
      history: [
        { year: "FY25", share: 41 },
        { year: "FY26", share: 31 },
      ],
      note: "The fall reflects fast growth in the US and the loss of most China data center sales after US export limits. Revenue is assigned by where the customer is headquartered, not where the chips end up.",
    },
    howToRead:
      "Each box’s area is the area’s share of FY26 sales. The pill shows growth versus FY25, calculated by Scope.",
  },
  source:
    "Source: NVIDIA FY26 Form 10-K (year ended Jan 25, 2026) and the Q4 FY26 earnings release: revenue by market platform, the segment note, and the share of revenue outside the US. FY25 platform dollars were not available, so growth rates are as NVIDIA reports them. Shares are calculated by Scope and rounded to one decimal. Segment profit totals exclude All Other.",
};

const financialHighlights: FinancialHighlightsData = {
  title: "Sales are eight times their FY22 level, and margins are near record highs",
  lead: "Fiscal year 2026 (ended Jan 25, 2026) compared with FY25 and the four years before it.",
  labels: ["From FY26 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Revenue": "Total sales for the year. Up 702% since FY22, or about eight times as much.",
    "Net income": "Final profit after all costs and tax. FY26 includes gains on stakes in other companies. Operating income grew 60%, which is the cleaner measure.",
    "Earnings per share": "Diluted profit per share. Share count fell from 25.35B to 24.51B in four years because NVIDIA buys back shares.",
    "Free cash flow": "Operating cash flow ($102.7B) minus spending on equipment and buildings ($6.0B). NVIDIA needs very little capital for its own operations because other companies build its chips.",
    "Operating margin": "NVIDIA keeps about $60 of every $100 sold after running the business, before tax.",
    "Net margin": "NVIDIA keeps $55.60 of every $100 sold as final profit.",
  }),
  howToRead:
    "The big number is FY26. The pill compares it with FY25: green is better, red is worse. The bars show five years and the colored bar is FY26.",
  source:
    "Source: NVIDIA Form 10-K for FY26 (year ended Jan 25, 2026), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending.",
};

const valuation: ValuationData = {
  title: "NVIDIA trades about 29% below our base-case fair value, and well below its own 5-year average P/E",
  lead: "Is the share price high or low compared with what NVIDIA’s future cash is worth, what it used to trade at, and what analysts expect?",
  labels: ["Market data as of Nov 6, 2026", "Scope estimate"],
  price: 186.64,
  priceDate: "Nov 6, 2026",
  fair: 264,
  field: {
    max: 900,
    rows: [
      { name: "Cash flow (DCF)", low: 77, high: 582, mark: 264, markName: "Base" },
      { name: "Own P/E history", low: 299, high: 842, mark: 472, markName: "5-yr avg" },
      { name: "Analyst targets", low: 210, high: 515, mark: 339, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the left of the dot, the price looks low by that measure.",
  },
  implied: {
    title: "To justify $187, free cash flow must grow only about 13% a year for five years, far below its pace since FY22",
    needed: 13.2,
    actual: 85.9,
    actualLabel: "FY22 to FY26",
    text: "That is 13.2% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. Free cash flow grew 85.9% a year from FY22 to FY26, but from a very low base of $8.1B, and it will be hard to repeat at today’s size.",
    cases: ["Bear", "Base", "Bull"],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: ["0%", "20%", "35%"] },
      { label: "Cash flow growth, years 6–10", values: ["3%", "8%", "12%"] },
      { label: "Growth after year 10", values: ["2.5%", "3%", "3.5%"] },
      { label: "Discount rate", values: ["9%", "8%", "8%"] },
    ],
    fairValues: [77, 264, 582],
    note: "About 69% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. That is why there are three cases, and why the bear case assumes free cash flow stops growing. All three start from $127.0B of free cash flow in the last twelve months, add $54.1B of net cash, and divide by 24.4B diluted shares. Important limit: NVIDIA’s cash flow has swung more than Apple’s or Microsoft’s, and it depends on a few customers.",
  },
  history: {
    title: "NVIDIA’s P/E is the lowest in five years, because profit grew faster than the share price",
    years: [
      { year: "FY22", value: 62.8 },
      { year: "FY23", value: 106.4 },
      { year: "FY24", value: 51.6 },
      { year: "FY25", value: 39.9 },
      { year: "FY26", value: 37.8 },
      { year: "Now", value: 23.6 },
    ],
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the average of the five fiscal year ends before it. The average is high because profit was very low in FY22 and FY23.",
    multiples: [
      { name: "P/E", now: 23.6, avg: 59.7 },
      { name: "P/S", now: 14.8, avg: 21.8 },
      { name: "EV/EBITDA", now: 19.2, avg: 48.9 },
    ],
    multiplesHowToRead:
      "Each bar shows how far NVIDIA’s multiple is above or below its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it. Every multiple is below its average, but the averages are lifted by years when profit was small.",
  },
  source:
    "Sources: share price $186.64 (Nov 6, 2026 close), fiscal-year-end multiples and analyst targets from Financial Modeling Prep (price targets: low $210, high $515, average $339, median $325); NVIDIA FY26 Form 10-K and Q2 FY27 results (net cash, diluted shares, last-twelve-month revenue, EBITDA and EPS). P/E history uses trailing earnings, so it looks high when earnings were small. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.",
};

const profitHistory: ProfitHistoryData = {
  title: "Sales grew 68% a year and operating profit 90% a year, starting from a flat FY23",
  lead: "Five years of results, FY2022 to FY2026: how fast NVIDIA grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "One flat year in FY23, then growth of 126%, 114% and 66%",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales grew only 0.2% in FY23 when demand for gaming cards fell, then AI demand lifted them 126% in FY24, 114% in FY25 and 66% in FY26. Profit swings more than sales: the operating margin fell to 15.7% in FY23 and rose to 62.4% in FY25.",
  },
  margins: {
    title: "Operating margin is up 23.1 points since FY22, but gross margin dipped to 71.1% in FY26",
    howToRead:
      "Each line is one margin over five years, with the ring on FY26. The pill is the change in percentage points since FY22. Gross margin fell from 75.0% to 71.1% in FY26, then recovered to 75% in Q2 FY27, and NVIDIA guides it lower again because of memory costs.",
  },
  returns: {
    title: "NVIDIA earns far more on its money than the money costs, with returns that have risen sharply",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    wacc: 8,
    text: `For every $100 put into the business, NVIDIA earns about $${profitNums.returns.roic} a year after tax, up from $${profitNums.returns.roicFrom} in ${profitNums.returns.roicFromYear}.`,
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as the base case in the valuation. ROIC was 100.6% in FY25 and 87.3% in FY26 as equity grew faster than profit. ROE is about 102%.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: NVIDIA Form 10-K for FY22 to FY26 (income statement, balance sheet and cash flow statement). Fiscal years end in late January. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};

const cashAndReturns: CashAndReturnsData = {
  title: "NVIDIA returns about two fifths of its free cash flow and holds far more cash than debt",
  lead: "How much cash NVIDIA makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: "In five years NVIDIA returned $96B, about half of the $197B of free cash flow it earned",
    howToRead:
      "Each year has two bars: the free cash flow NVIDIA earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote:
      "Free cash flow is cash from operations ($102.7B in FY26) minus spending on equipment and buildings ($6.0B), which leaves $96.7B.",
  },
  how: {
    title: "98% of what NVIDIA returns is buybacks, and the share count is falling slowly",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: "Returned in FY26", value: "$41.1B", note: "43% of free cash flow" },
      { label: "Dividend per share", value: "$0.04", note: "$1.0B paid in total in FY26" },
      { label: "Dividend yield", value: "<0.1%", note: "Press reports say NVIDIA will pay $0.25 a quarter from October 2026. Scope has not confirmed this." },
      { label: "Payout ratio", value: "0.8%", note: "of net income, so there is a lot of room to raise it" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "NVIDIA holds $54B more cash than debt, up from $10B in FY22",
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote:
      "A ratio above 1 means current assets cover bills due within a year. Reports say NVIDIA’s debt has since risen, and its purchase commitments grew to $279B, so this snapshot may overstate the cushion.",
    howToRead:
      "Net cash is cash and short-term investments minus interest-bearing debt. Positive means NVIDIA could repay every loan today. The figures are from the FY26 year-end balance sheet (Jan 25, 2026). Long-term investments ($22.3B, mostly stakes in other companies) are not counted as cash.",
  },
  source:
    "Sources: NVIDIA Form 10-K for FY22 to FY26 (cash flow statement and balance sheet; FY26 as of Jan 25, 2026). Buybacks are the cash paid in the year, so they can differ from the amount NVIDIA reports as repurchased. Debt is short-term plus long-term debt, without leases. Press reports say debt rose to $33.4B in 2026; that is not yet in these figures. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section.",
};

const strengthsRisks: StrengthsRisksData = {
  title: "NVIDIA’s strengths are exceptional, but its sales depend on a few customers, and a boom like this has ended before",
  lead: "What NVIDIA does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives NVIDIA an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Its chips, networking and CUDA software work together, so customers who build on them find it hard to switch.", evidence: [{ value: "$18.5B", label: "R&D in FY26, up 43% and 8.6% of sales" }, { value: "75.0%", label: "gross margin in Q2 FY27" }], why: "Keeps customers building on NVIDIA and supports premium prices." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "NVIDIA keeps far more of each dollar than almost any large company, and the share keeps rising.", evidence: [{ value: "65.2%", label: "operating margin, last 12 months" }, { value: "66.2%", label: "operating margin in Q2 FY27, up from 60.8% a year earlier" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-rocket", name: "Growth", finding: "AI demand is lifting sales faster than for any other company of this size.", evidence: [{ value: "+83.4%", label: "revenue growth, last 12 months" }, { value: "+105.9%", label: "revenue growth in Q2 FY27" }], why: "Fast growth at this scale is rare, and it makes up for a high price." },
    { icon: "ti-building-factory-2", name: "Demand", finding: "NVIDIA says it cannot make enough chips to meet demand, and the cloud giants keep spending.", evidence: [{ value: "$48.7B", label: "from cloud giants (hyperscalers) in Q2 FY27, about half of sales" }, { value: "$279B", label: "purchase commitments, up from $119B a quarter earlier" }], why: "Supply limits, not a lack of buyers, are what hold sales back today." },
    { icon: "ti-flag", name: "Market position", finding: "The leader in chips for AI data centers.", evidence: [{ value: "$4.50T", label: "market cap on Nov 6, 2026" }, { value: "$303.0B", label: "revenue in the last 12 months, more than 6 times AMD’s" }], why: "Scale lowers costs and attracts the best software developers." },
    { icon: "ti-coin", name: "Financial strength", finding: "NVIDIA holds more cash than debt and produces a lot of free cash.", evidence: [{ value: "+$54.1B", label: "net cash on Jan 25, 2026" }, { value: "$127.0B", label: "free cash flow, last 12 months" }], why: "NVIDIA can fund research, supply deals and buybacks without borrowing." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-users", name: "Customer concentration", level: 3, finding: "A handful of customers buy most of the chips.", evidence: [{ value: "22% and 14%", label: "of FY26 revenue from two direct customers, up from 12% and 11%" }, { value: "51%", label: "of Q2 FY27 sales from hyperscalers" }], why: "If one big customer cuts its spending or builds its own chips, sales fall fast. The list of top customers has narrowed, not widened." },
    { icon: "ti-activity", name: "Boom and bust risk", level: 3, finding: "Chip demand has gone up and down hard before.", evidence: [{ value: "+0.2%", label: "revenue growth in FY23, after the gaming boom ended" }, { value: "15.7%", label: "operating margin in FY23, against 62.4% in FY25" }], why: "The current boom is far bigger, so a pause in AI spending could hit profit much harder than it did in FY23." },
    { icon: "ti-world", name: "China and export limits", level: 2, finding: "US rules limit what NVIDIA can sell in China.", evidence: [{ value: "$0", label: "China Data Center compute revenue assumed in the Q3 FY27 guidance" }, { value: "31%", label: "of FY26 sales from outside the US, down from 41%" }], why: "NVIDIA has already lost most of that business, so there is little left to lose, but a change in rules could cut either way." },
    { icon: "ti-cpu-2", name: "Memory costs and supply", level: 2, finding: "Memory prices are rising and NVIDIA has locked in large purchases.", evidence: [{ value: "71% to 72%", label: "gross margin guided to bottom out in Q4 FY27, from 75.0% now" }, { value: "$279B", label: "purchase commitments, mostly memory" }], why: "Higher memory costs squeeze the margin, and large commitments are costly if demand slows." },
    { icon: "ti-arrows-exchange", name: "Financing and customer ties", level: 2, finding: "NVIDIA helps fund some of its own customers.", evidence: [{ value: ">$500B", label: "of third-party capital NVIDIA aims to help raise for AI infrastructure, subject to agreements" }, { value: "$33.4B", label: "debt reported in 2026, up from $8.5B at FY26 year end" }], why: "If customers cannot pay back what they borrow to buy chips, NVIDIA’s sales and investments are both affected. The debt figure is from press reports and is not yet in our balance sheet." },
    { icon: "ti-swords", name: "Competition", level: 2, finding: "Rivals and NVIDIA’s own customers are building alternative chips.", evidence: [{ value: "+41.9%", label: "AMD revenue growth, last 12 months, to $45.4B" }, { value: "92.5%", label: "of NVIDIA’s Q2 FY27 sales from one business, Data Center" }], why: "Custom chips from cloud giants and chip designers such as Broadcom aim at the same spending. NVIDIA’s lead is wide today, but its margin is the prize everyone wants to share." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: NVIDIA FY26 10-K and Q2 FY27 earnings release and call (Aug 26, 2026), as reported by Verdict, Futurum and Trending Topics; AMD data from Financial Modeling Prep; Scope’s valuation. The $33.4B debt figure and the $500B financing plan are from press reports. All risk ratings are Scope’s own.",
};

const moatEcosystem: MoatEcosystemData = {
  title: "NVIDIA’s moat is wide because developers build on its software, and the biggest threat is its own customers",
  lead: "Why rivals struggle to take NVIDIA’s customers, how the loop keeps them building, and who NVIDIA depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Switching costs", score: 9, weight: 30, test: "Would a customer lose something by leaving?", answer: "Yes. AI software is written for NVIDIA’s CUDA tools, so moving to another chip means rewriting and retesting code.", evidence: { value: "75.0%", label: "gross margin in Q2 FY27, even with rising customer spending" }, wear: "Cloud giants are building their own chips and software layers that reduce the need for CUDA.", trend: "eroding" },
    { name: "Intangible assets", score: 9, weight: 25, test: "Does NVIDIA own things rivals cannot copy?", answer: "Yes. Years of chip design, software and networking know-how are protected by patents and secrecy.", evidence: { value: "$18.5B", label: "R&D spending in FY26, up 43%" }, wear: "AI chips are a fast-moving field, so today’s lead must be earned again every product cycle.", trend: "stable" },
    { name: "Network effects", score: 7, weight: 15, test: "Does the product get better as more people join?", answer: "Partly. More developers on CUDA bring more tools and trained engineers, which attracts more developers.", evidence: { value: "$48.7B", label: "from hyperscalers in Q2 FY27, who build the platforms others use" }, wear: "Open software standards could let developers move more easily.", trend: "stable" },
    { name: "Cost advantage", score: 6, weight: 15, test: "Can NVIDIA make or buy things cheaper than rivals?", answer: "Somewhat. Large orders give buying power for chips and memory, but NVIDIA depends on others to build its chips.", evidence: { value: "$279B", label: "purchase commitments, which lock in supply" }, wear: "Memory costs are rising, and one manufacturing region carries much of the supply.", trend: "eroding" },
    { name: "Brand power", score: 6, weight: 15, test: "Can NVIDIA charge more because of its name?", answer: "Partly. Buyers choose it as the safe choice for AI, but business buyers judge mainly on speed and cost.", evidence: { value: "65.2%", label: "operating margin, last 12 months" }, wear: "Big customers negotiate hard and can switch part of their orders.", trend: "stable" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. The AI chip market is large and growing, with well-funded rivals, so market size alone does not protect NVIDIA." },
  narrowing:
    "Customers building their own chips and software layers could narrow the moat, and export rules limit where NVIDIA can sell.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for a chip and software company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why developers keep building on NVIDIA",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "Buy the chips", text: "Cloud providers and AI companies buy NVIDIA systems to train and run AI." },
      { title: "Write code for them", text: "Developers use NVIDIA’s CUDA tools, so their software runs fastest on NVIDIA hardware." },
      { title: "Libraries and skills grow", text: "More tools, tutorials and trained engineers appear around CUDA." },
      { title: "Switching feels costly", text: "Moving to another chip means rewriting code, retraining staff and retesting results." },
      { title: "Buy the next generation", text: "The customer stays and buys the next generation of NVIDIA systems." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    title: "Who NVIDIA relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Customers", level: 3, who: "Cloud giants, AI labs, enterprises and governments", gives: "Money and large, repeat orders", gets: "AI chips, networking and software", note: "Two direct customers were 36% of FY26 revenue, so a few buyers carry a lot of weight." },
      { group: "Suppliers", level: 3, who: "Chip manufacturers, memory makers and packaging firms", gives: "Chip manufacturing and parts", gets: "Very large, steady orders", note: "NVIDIA designs its chips but others build them, and few can be swapped quickly. Memory is the pinch point now." },
      { group: "Partners", level: 2, who: "Server makers, cloud providers, financing partners", gives: "Systems, reach and capital", gets: "Priority access to chips and shared growth", note: "Useful but replaceable, as long as NVIDIA keeps its own software and systems." },
      { group: "Developers", level: 2, who: "Software engineers, research labs, open-source projects", gives: "Code, tools and trained users", gets: "Free tools and a large base to build for", note: "Developers lock NVIDIA in, but they can also move if a good alternative appears." },
      { group: "Competitors", level: 2, who: "AMD, Broadcom, Intel and the cloud giants’ own chips", gives: "Pressure on price and features", gets: "A rival to beat, sometimes a customer", note: "Some rivals are also customers. A cloud giant can buy NVIDIA chips today and design its own tomorrow.", rival: true },
      { group: "Distributors", level: 1, who: "System integrators, resellers and PC makers", gives: "Local reach and support", gets: "A margin on each sale", note: "NVIDIA sells most data center systems directly or through large partners, which limits how much it needs them." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings are shown.",
  },
  source:
    "Sources: NVIDIA FY26 10-K, Q2 FY27 earnings release and call. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};

const competitors: CompetitorsData = {
  title: "NVIDIA is far bigger, faster growing and more profitable than AMD or Intel, but its biggest rivals may be its own customers",
  lead: "Who NVIDIA competes with, how it compares with AMD and Intel on the same basis, and where its revenue stands against theirs.",
  labels: [],
  overviewTitle: "Who NVIDIA competes with",
  overviewIntro: "Rivals split by how they compete for NVIDIA’s customers.",
  shares: {
    title: "Revenue of three chip makers, last 12 months, share of the combined total",
    items: [
      { name: "NVIDIA", value: 74.2, self: true },
      { name: "Intel", value: 14.7 },
      { name: "AMD", value: 11.1 },
    ],
    note: "Share of the combined revenue of these three companies only, not a market share. It is not measured in units shipped or in AI chips alone. Intel and AMD sell many products besides data center chips.",
  },
  companies: [
    {
      id: "nvda", name: "NVIDIA", ticker: "NVDA", kind: "self",
      desc: "AI chips, networking and software",
      metrics: { revenue: 303.0, growth: 83.4, opMargin: 65.2, fcf: 127.0, fcfMargin: 41.9, netDebt: -54.1 },
    },
    {
      id: "amd", name: "AMD", ticker: "AMD", kind: "direct",
      desc: "Data center, PC and gaming chips",
      metrics: { revenue: 45.4, growth: 41.9, opMargin: 17.7, fcf: 7.1, fcfMargin: 15.5, netDebt: -6.7 },
    },
    {
      id: "intc", name: "Intel", ticker: "INTC", kind: "direct",
      desc: "PC and server processors, and chip manufacturing",
      metrics: { revenue: 59.9, growth: 12.1, opMargin: 3.2, fcf: 3.8, fcfMargin: 6.3, netDebt: 9.2 },
    },
    {
      id: "avgo", name: "Broadcom", ticker: "AVGO", kind: "indirect",
      desc: "Networking chips and custom AI chips for cloud giants",
      chartNote: "Not in the charts: its figures were not available from Scope’s data source.",
    },
    {
      id: "goog", name: "Alphabet", ticker: "GOOGL", kind: "indirect",
      desc: "Cloud, search and its own AI chips (TPUs)",
      chartNote: "Not in the charts: it is mainly a customer, and its own chips compete only for part of its AI needs.",
    },
    { id: "msft", name: "Microsoft", ticker: "MSFT", kind: "future", desc: "Cloud giant that buys AI chips and is building its own" },
  ],
  compareTitle: "How NVIDIA compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is NVIDIA, grey bars are AMD and Intel.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat:
    "All three are US-reported figures for the last 12 months. NVIDIA’s fiscal quarter ended Jul 26, 2026; AMD’s and Intel’s ended Sep 26, 2026, so the periods do not line up exactly. Net debt uses each company’s latest fiscal year-end balance sheet (NVIDIA: Jan 2026; AMD and Intel: Dec 2025) and is short-term plus long-term debt minus cash and short-term investments. Businesses differ, so read gaps as clues, not scores.",
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: NVIDIA, AMD and Intel filings via Financial Modeling Prep (Nov 9, 2026). Growth compares with the same 12 months a year earlier. Free cash flow is operating cash flow minus capital spending. Broadcom and Alphabet are described in words because comparable figures were not loaded.",
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
      value: "65.2%",
      steps: [
        "Form 10-K for FY26 (year ended Jan 25, 2026) and quarterly reports through Q2 FY27 (quarter ended Jul 26, 2026)",
        "Operating income $197.6B and revenue $303.0B over the last four quarters",
        "197.6 ÷ 303.0 × 100",
        "65.2% operating margin",
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: "$127.0B",
      steps: [
        "Cash flow statements in the FY26 Form 10-K and the quarterly reports",
        "Operating cash flow minus capital spending, added over the last four quarters",
        "Operating cash flow − capital spending",
        "$127.0B free cash flow",
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: "23.6×",
      steps: [
        "Closing share price on Nov 6, 2026 from market data, and earnings per share from NVIDIA’s filings",
        "Share price $186.64 and diluted earnings per share $7.91 over the last four quarters",
        "186.64 ÷ 7.91",
        "23.6× P/E",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for NVIDIA.",
  sources: [
    { title: "SEC filings", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for NVIDIA, AMD and Intel. The primary source for financial figures." },
    { title: "Company investor relations", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and guidance come from here." },
    { title: "Market data providers", text: "Share price, market cap, analyst targets and fiscal-year-end multiples from Financial Modeling Prep. Prices are closing prices, and Scope shows the date." },
    { title: "News coverage", text: "Press summaries of NVIDIA’s earnings call, used for guidance and supply comments. Where a figure comes only from the press, Scope says so." },
  ],
  documents: [
    { name: "FY26 annual report", date: "Feb 2026", type: "10-K", use: "Business, risks, segments, customers and annual financials" },
    { name: "Q4 FY26 earnings release", date: "Feb 2026", type: "8-K", use: "Product-line revenue for FY26" },
    { name: "Q2 FY27 earnings release", date: "Aug 26, 2026", type: "8-K", use: "Headline results, Data Center revenue and guidance" },
    { name: "Q2 FY27 earnings call", date: "Aug 26, 2026", type: "Transcript", use: "Margin, supply and China comments, kept as press summaries" },
    { name: "AMD and Intel financials", date: "Nov 2026", type: "Data feed", use: "Rival financials on the same basis" },
    { name: "Analyst consensus and price targets", date: "Nov 2026", type: "Estimates", use: "Price targets and next-year growth expectations" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: [
    { name: "Revenue growth", formula: "(Revenue now − revenue a year earlier) ÷ revenue a year earlier × 100", note: "Year over year, to avoid seasonal swings. For the last 12 months, the comparison is with the 12 months before that. Quarterly and annual are never mixed." },
    { name: "Operating margin", formula: "Operating income ÷ revenue × 100", note: "Uses reported operating income, with no add-backs." },
    { name: "Net margin", formula: "Net income ÷ revenue × 100", note: "GAAP net income. It includes gains on stakes in other companies, which NVIDIA leaves out of its adjusted figure." },
    { name: "ROE", formula: "Net income ÷ average shareholders’ equity × 100", note: "Average of start and end of period." },
    { name: "ROIC", formula: "Operating income × (1 − tax rate) ÷ average (equity + debt) × 100", note: "Debt is interest-bearing debt. Cash is not subtracted. Other data providers define it differently, so compare ROIC only within Scope." },
    { name: "Debt to equity", formula: "Interest-bearing debt ÷ shareholders’ equity", note: "Debt is short-term plus long-term debt, without leases." },
    { name: "Free cash flow", formula: "Operating cash flow − capital spending", note: "Capital spending is taken from the cash flow statement. Quarterly figures come from subtracting cumulative year-to-date totals." },
    { name: "Net cash", formula: "Cash and short-term investments − interest-bearing debt", note: "Positive means net cash. Long-term investments (stakes in other companies) are not counted as cash for NVIDIA." },
    { name: "P/E", formula: "Share price ÷ diluted earnings per share, last 12 months", note: "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings." },
    { name: "EV/EBITDA", formula: "(Market cap − net cash) ÷ (operating income + depreciation and amortization)", note: "Last 12 months. The average used in the Valuation section is the 5-year average at fiscal year ends." },
  ],
  formulasNote: "Scope uses reported (GAAP) figures and interest-bearing debt. Figures with different definitions are never compared without a note.",
  scoringTitle: "How the Scope Score is built",
  scoringIntro:
    "Six categories, each with its own inputs, weights and cut-offs. Every input is scored from 0 to 10, a category is the weighted average of its inputs, and the overall score is the weighted average of the categories. Grades: A+ from 9.0, A from 8.0, B+ from 7.5, B from 7.0, C+ from 6.0, C from 5.0, D from 3.0, F below that. Labels: Excellent from 9.0, Strong from 7.5, Good from 6.0, Fair from 5.0, Weak below that.",
  categories: scored.categories,
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list. For NVIDIA, the valuation inputs compare today’s multiples with a 5-year average that is lifted by years of low profit, so they look more favorable than the price alone would suggest.",
  valuationTitle: "How fair value is estimated",
  valuationIntro: "Three reference points, each with its own limit. None of them is a price forecast, and only the cash flow model sets the fair value.",
  methods: [
    { name: "Discounted cash flow", what: "Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($264 in the base case).", limit: "The result moves a lot when assumptions change. About two thirds of the value comes from after year 10, and NVIDIA’s cash flow is harder to predict than most." },
    { name: "Historical multiples", what: "Compares today’s P/E with NVIDIA’s own range over the last five fiscal year ends.", limit: "The past P/Es are high because profit was small, so they say little about what is fair today." },
    { name: "Analyst price targets", what: "Shows the range and average of published targets from analysts who follow NVIDIA.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price." },
  ],
  valuationNote: "Fair value is a model output under stated assumptions, not a price the stock will reach.",
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Jul 26, 2026", label: "Latest reporting period ends" },
    { date: "Aug 26, 2026", label: "Source date: reported 31 days later" },
    { date: "Nov 9, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q2 FY27 (ended Jul 26, 2026)", sourceDate: "Aug 26, 2026", updated: "Nov 9, 2026", status: "Verified", limit: "GAAP basis. Annual figures use FY26 (ended Jan 25, 2026). Last-12-month figures add the last four quarters." },
    { dataset: "Balance sheet", period: "Jan 25, 2026", sourceDate: "Feb 2026", updated: "Nov 9, 2026", status: "Verified", limit: "Year-end snapshot. Press reports say debt has since risen to $33.4B; the newer balance sheet is not used here." },
    { dataset: "Cash flow", period: "FY26 plus the latest quarters", sourceDate: "Aug 26, 2026", updated: "Nov 9, 2026", status: "Verified", limit: "Last-12-month free cash flow adds the last four quarters. Quarterly figures come from subtracting year-to-date totals." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 6, 2026 close", updated: "Nov 9, 2026", status: "Verified", limit: "Closing price only, and it will move before the next report." },
    { dataset: "Analyst estimates and targets", period: "Next 12 months", sourceDate: "Nov 2026", updated: "Nov 9, 2026", status: "Pending", limit: "Consensus differs between providers and changes before earnings. Shown only as analyst view." },
    { dataset: "Rival financials", period: "12 months to Sep 2026", sourceDate: "Nov 2026", updated: "Nov 9, 2026", status: "Verified", limit: "AMD and Intel end on a different date from NVIDIA, so the periods do not line up exactly. Broadcom is not in the charts." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "NVIDIA does not name its largest customers, so Scope shows their share of revenue (22% and 14% in FY26) instead." },
  ],
  source:
    "Sources: NVIDIA, AMD and Intel filings and earnings materials, Financial Modeling Prep market data and press coverage of NVIDIA’s Q2 FY27 call, as of Nov 9, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};

const bottomLine: BottomLineData = {
  title: "An exceptional business, but one that depends on a few big customers and a boom that has ended before",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for growth, scale and profit, held back by swinging margins and sales that depend on one business.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Exceptional", tone: "positive", text: "87% return on invested capital, a 65% operating margin and sales that more than doubled last quarter. The moat is built on software that customers find hard to leave.", href: "#moat", hrefLabel: "See the moat" },
    { icon: "ti-tag", label: "The price", verdict: "Below our estimate", tone: "positive", text: "A P/E of 23.6× against 59.7× on average, and about 29% below our base-case fair value of $264. The estimate depends on growth holding for years.", href: "#valuation", hrefLabel: "See the valuation" },
    { icon: "ti-alert-triangle", label: "What to watch", verdict: "Concentration", tone: "caution", text: "Two customers were 36% of FY26 sales, and 93% of sales come from Data Center. The margin is guided down to 71% to 72% by Q4. The next report is in late November.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price, and a low price can reflect real risk.",
};

const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what NVIDIA earns, what protects it and what it costs. Keep building the picture.",
  companies: [
    { name: "Microsoft", ticker: "MSFT", reason: "A cloud giant that spends $115.9B a year on data centers, much of it on AI chips.", href: "/company/microsoft" },
    { name: "Apple", ticker: "AAPL", reason: "The other giant that designs its own chips, selling them inside devices instead of to data centers.", href: "/company/apple" },
    { name: "Alphabet", ticker: "GOOGL", reason: "A big NVIDIA customer that also builds its own AI chips, called TPUs.", href: "/company/google" },
  ],
  links: [
    { icon: "ti-git-compare", title: "Compare", href: "/compare" },
    { icon: "ti-calculator", title: "Valuation Lab", href: "/valuation-lab" },
    { icon: "ti-compass", title: "7 Powers", href: "/7-powers" },
  ],
  allLabel: "See all companies",
  allHref: "/trending",
  note: "The 7 Powers framework was developed by Hamilton Helmer in 7 Powers: The Foundations of Business Strategy (2016). Scope's explanations and examples are its own. Scope is built for understanding businesses, not for investment advice.",
};
const spotlight: SpotlightData = {
  title:
    "NVIDIA’s boom rests on a few big buyers: two customers made up 36% of its sales in FY26",
  lead:
    "NVIDIA sells the chips, networking and software behind AI, mostly to the cloud giants that build AI data centers. Those buyers more than doubled their spending in a year, which is why NVIDIA’s sales did too. The other side of the same coin is that a handful of customers now carry a very large share of its sales, and chip demand has fallen hard before.",
  labels: [],
  chart: {
    kind: "stacked-share",
    title: "Share of NVIDIA’s revenue from its two largest direct customers, FY25 and FY26",
    howToRead:
      "Each bar adds up to 100% of NVIDIA’s revenue that year. Customers A and B are its two largest direct customers, the ones that pay NVIDIA directly. NVIDIA does not name them. The 23% and 36% totals are added up by Scope from the percentages NVIDIA reports.",
    legend: [
      { name: "Customer A", color: "#76b900" },
      { name: "Customer B", color: "#4c7a00" },
      { name: "Everyone else", color: "#d4d4d8" },
    ],
    rows: [
      { label: "FY25", tag: "Top two customers: 23%", values: [12, 11, 77] },
      { label: "FY26", tag: "Top two customers: 36%", values: [22, 14, 64] },
    ],
    callout: "Two direct customers bought 36% of NVIDIA’s revenue in FY26, up from 23% a year earlier.",
  },
  numbers: [
    { value: "36%", label: "of FY26 revenue from two direct customers (22% and 14%)", tone: "negative" },
    { value: "51%", label: "of Q2 FY27 sales from hyperscalers, the largest cloud providers", tone: "neutral" },
    { value: "+105.9%", label: "revenue growth in Q2 FY27, to $96.2B", tone: "positive" },
    { value: "$279B", label: "purchase commitments, up from $119B a quarter earlier", tone: "neutral" },
  ],
  wins: [
    {
      title: "Big buyers keep spending more",
      detail:
        "Hyperscalers spent $48.7B in Q2 FY27, up 13% from the quarter before and more than double a year earlier.",
    },
    {
      title: "Supply, not demand, is the limit",
      detail:
        "NVIDIA says it cannot make enough chips to meet demand, so supply limits, not a lack of buyers, are what hold sales back today.",
    },
  ],
  breaks: [
    {
      title: "A few buyers can change everything",
      detail:
        "If one big customer cuts spending or builds its own chips, sales fall fast. The list of top customers has narrowed, not widened.",
    },
    {
      title: "Booms have ended before",
      detail:
        "Revenue growth fell to 0.2% in FY23 after the gaming boom ended, and the operating margin dropped to 15.7%, against 62.4% in FY25. The current boom is far bigger, so a pause would hit harder.",
    },
  ],
  watch: {
    title: "Next report: does growth hold near 89% with the same big buyers?",
    text:
      "NVIDIA guides $108B for the October quarter, about +89% against $57.0B a year ago, with a gross margin of 74%. The report expected in late November 2026 (date not yet confirmed) shows whether sales keep growing this fast while a few customers carry so much of them.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: NVIDIA FY26 Form 10-K (direct customers and sales by platform) and Q2 FY27 earnings release and call (Aug 26, 2026), as reported by Verdict, Futurum and Trending Topics. NVIDIA does not name its direct customers. The FY25 and FY26 totals for the top two customers are calculated by Scope.",
};

export const nvidiaPage: CompanyPageData & { spotlight: SpotlightData } = {
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