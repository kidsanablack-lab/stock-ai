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
import type { CompanyPageData } from "./types";
import { applyScore } from "../scope-score/apply";
import { microsoftScore } from "../scope-score/inputs";
import rawMsft from "../../data/raw/MSFT.json";
import { buildFacts, type RawFmp } from "../company-data/facts";
import { peAtYearEnd } from "../company-data/peHistory";
import { cashAndReturnsNumbers, financialHighlightsMetrics, profitHistoryNumbers, roicText } from "../company-data/sections";
import { closingShared, formulas, formulasNote, scoreHowToRead, scoringIntro, valuationNote } from "@/shared/methodology";
import { peerCaveat, peerCompany } from "@/shared/peers";

// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(microsoftScore.raw, microsoftScore.display);

// Numbers from filings come from the saved API data (data/raw/MSFT.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts MSFT
const facts = buildFacts(rawMsft as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// P/E at each fiscal year end, read from the saved API data (shared helper), and its average.
// The average is worked out from the same bars, so the dashed line and the text always agree.
const peHistory = peAtYearEnd(rawMsft as unknown as RawFmp);
if (peHistory.length === 0) throw new Error("microsoft.ts: no P/E history in data/raw/MSFT.json");
const peAverage = Math.round((peHistory.reduce((sum, p) => sum + p.value, 0) / peHistory.length) * 10) / 10;
const peAvg = peAverage.toFixed(1);

// A series for a chart, rounded to one decimal. A missing year stops the build instead of drawing a false 0.
const oneDecimal = (series: (number | null)[], what: string): number[] =>
  series.map((v) => {
    if (v === null) throw new Error(`microsoft.ts: ${what} is missing in data/raw/MSFT.json`);
    return Math.round(v * 10) / 10;
  });

// Microsoft page data. Prices as of Nov 6, 2026 close. Latest quarter: Q1 FY27 (ended Sep 30, 2026).
// Fiscal year ends Jun 30. FY22 to FY26 are the five full years shown.

const hero: CompanyHeroData = {
  name: "Microsoft Corporation",
  ticker: "MSFT",
  sector: "Technology",
  logo: "/logos/microsoft-svgrepo-com.svg", // TODO: check this file exists in public/logos
  description:
    "A global software and cloud company that sells the tools businesses run on, from Azure and Microsoft 365 to GitHub, and is now building AI into all of them.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$3.94T", note: "As of Nov 6, 2026" },
    { label: "Revenue, last 12 months", value: "$346.4B", note: "+17.9% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "27.7×", note: `vs ${peAvg}× 5-year average`, noteTone: "positive" },
    { label: "Free cash flow, last 12 months", value: "$59.9B", note: "17.3% of sales, down from 25.4% in FY25", noteTone: "negative" },
  ],
  source:
    "Financials from SEC filings (Q1 FY27 earnings release for the quarter ended Sep 30, 2026, and the FY26 10-K). Market data as of Nov 6, 2026. Next report: late January 2027.",
};

const summary: CompanySummaryData = {
  title: "Microsoft in 30 seconds",
  label: "AI summary",
  text: "Microsoft earns most of its money from software and cloud services that businesses pay for every month: Azure, Microsoft 365 and tools like GitHub. Those products are so woven into daily work that customers rarely leave, which gives Microsoft a profit margin near 47%. It is now spending more than $170B a year on data centers to meet AI demand, so profit is high but free cash flow has shrunk.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "83%",
    caption: "from Agents and Infra, Q1 FY27",
    segments: [
      { label: "Azure", share: 36.0 },
      { label: "Microsoft 365 cloud", share: 30.1 },
      { label: "Other", share: 33.9 },
    ],
  },
};

const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  takeaway:
    "Microsoft scores top marks for scale, profit and growth, and strong marks for risk. Cash flow quality and valuation are held back by record capital spending, which keeps free cash flow low.",
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: "28.8%", label: "return on invested capital in FY26, but free cash flow was only 72% of net income over five years because of capital spending", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: "$3.94T", label: "market cap, with $346B of revenue in the last 12 months", href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: "47.1%", label: "operating margin in the last 12 months, and 17% of sales kept as free cash flow", href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: "+17.9%", label: "growth in the last 12 months, and 13.7% a year from FY22 to FY26", href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "35.9%", label: "of sales from Azure, the largest product line, and net cash of $36.5B", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: "27.7×", label: `P/E, against its own 5-year average of ${peAvg}×, but only a 1.5% free cash flow yield`, href: "#valuation" },
  ],
  howToRead: scoreHowToRead(),
};

const whatChanged: WhatChangedData = {
  title: "Sales grew 19% and Azure 48%, but capital spending doubled and free cash flow fell",
  lead: "What changed since the last report: Q1 FY27, the quarter ended Sep 30, 2026 (reported Oct 28). The next report, Q2 FY27, is due in late January 2027.",
  metrics: [
    { label: "Revenue", value: "$92.3B", change: "+18.8% vs a year ago", tone: "positive", series: [77.673, 81.27, 82.89, 90.01, 92.279], note: "Azure and Microsoft 365 cloud made up about 80% of the extra $14.6B." },
    { label: "Net income", value: "$36.6B", change: "+31.9% vs a year ago", tone: "positive", series: [27.747, 38.458, 31.778, 35.766, 36.6], note: "Calculated from reported earnings of $4.92 per share. Quarters in FY26 include accounting effects from the OpenAI investment, which Microsoft excludes from its adjusted figures." },
    { label: "Operating margin", value: "49.8%", change: "+0.9 pts vs a year ago", tone: "positive", series: [48.9, 47.1, 46.3, 45.1, 49.8], note: "Costs grew 6% while sales grew 19%. Microsoft guides the margin down slightly next quarter as compute costs catch up." },
    { label: "Free cash flow", value: "$18.6B", change: "−27.5% vs a year ago", tone: "negative", series: [25.663, 5.882, 15.803, 19.639, 18.6], note: "Operating cash flow was $58.0B (+29%), but cash spent on equipment was $39.4B, double a year earlier." },
  ],
  growth: {
    bars: [
      { quarter: "Q2", fy: "FY25", value: 69.632, yoy: 12.3 },
      { quarter: "Q3", fy: "FY25", value: 70.066, yoy: 13.3 },
      { quarter: "Q4", fy: "FY25", value: 76.441, yoy: 18.1 },
      { quarter: "Q1", fy: "FY26", value: 77.673, yoy: 18.4 },
      { quarter: "Q2", fy: "FY26", value: 81.27, yoy: 16.7 },
      { quarter: "Q3", fy: "FY26", value: 82.89, yoy: 18.3 },
      { quarter: "Q4", fy: "FY26", value: 90.01, yoy: 17.8 },
      { quarter: "Q1", fy: "FY27", value: 92.279, yoy: 18.8 },
    ],
    verdictLabel: "Fast and steady",
    before: "12.8%",
    after: "18.0%",
    verdict: "Sales growth stepped up to about 18% in mid-2025 and has stayed there for five quarters in a row.",
    watch: "Next is the December quarter. Microsoft guides $96.0B to $97.1B, or 18% to 19% growth, against $81.3B a year ago, so growth is expected to hold.",
  },
  estimates: [
    { label: "Revenue", unit: "B", actual: 92.279, estimate: 90.7 },
    { label: "EPS, excluding OpenAI effects", unit: "$", actual: 4.89, estimate: 4.72 },
    { label: "Capital spending", unit: "B", actual: 45.2, estimate: 45.9 },
  ],
  good: [
    { title: "Azure grew 48%", detail: "$33.2B in the quarter, guided at 45%", meaning: "Azure is Microsoft’s cloud platform and now about 36% of all sales. Growth this fast at this size is rare, and it beat what Microsoft itself had guided." },
    { title: "Microsoft Cloud reached $63.9B", detail: "+30% vs a year ago", meaning: "This is the combined cloud business: Azure, Microsoft 365 cloud, Dynamics and the business side of LinkedIn. It is about 69% of total sales." },
    { title: "Contracted future sales hit $677B", detail: "Commercial backlog +73%", meaning: "Backlog is sales that customers have already signed for and Microsoft has not yet delivered. A bigger backlog gives more visibility, though it can include very large single contracts." },
  ],
  watch: [
    { title: "Capital spending keeps rising", detail: "$45.2B now → over $50B guided next quarter", meaning: "Microsoft is spending about $170B in calendar 2026, mostly on AI data centers. That is why free cash flow fell 27% while profit rose. The spending only pays off if AI demand keeps growing." },
    { title: "Costs are catching up with sales", detail: "Cost of revenue growing 26% to 27% vs sales 18% to 19%", meaning: "New data centers add depreciation. Microsoft guides the operating margin down slightly year over year, and a voluntary employee exit offer adds a one-off cost." },
    { title: "Windows and Xbox are shrinking", detail: "Windows OEM and devices −22% · Xbox −2%", meaning: "The consumer segment fell 3% and Microsoft guides Windows OEM and devices down by about the mid-30s percent next quarter. It is only 17% of sales, so the effect is small." },
  ],
  source:
    "Sources: Microsoft Q1 FY27 earnings release and call (Oct 28, 2026), Microsoft’s FY26 10-K, and earlier quarterly releases. Analyst estimates are consensus figures from press reports and differ slightly between providers. Net income for Q1 FY27 and free cash flow are calculated by Scope. Segment figures use Microsoft’s new two-segment structure, restated by Microsoft for earlier periods.",
};

const signalsToWatch: SignalsToWatchData = {
  title: "Next report: Azure growth has to reach the guided 49% to 50% while capital spending climbs above $50B",
  lead: "Five numbers will show whether Microsoft’s December quarter is good or not. Each one shows where last quarter, a year ago and guidance sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Late January 2027",
    note: "Q2 FY27, the December quarter. Microsoft normally reports after the US market closes on a Wednesday, and the exact date had not been confirmed when this page was updated.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around Microsoft’s guidance where it gave one.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth hold near 19% against last year’s $81.3B December quarter?",
      guidance: "18% to 19% growth, or $96.0B to $97.1B",
      format: "signedPercent",
      range: [10, 25],
      weakBelow: 17,
      strongFrom: 19,
      yearAgo: 16.7,
      lastQuarter: 18.8,
    },
    {
      name: "Azure revenue growth",
      question: "Does Azure reach the guided 49% to 50% even though some capacity arrives later than planned?",
      guidance: "49% to 50% in constant currency, which depends on more efficiency gains",
      format: "signedPercent",
      range: [35, 60],
      weakBelow: 47,
      strongFrom: 50,
      yearAgo: 39,
      lastQuarter: 48,
    },
    {
      name: "Microsoft 365 commercial cloud growth",
      question: "Does Microsoft 365 keep speeding up as Copilot seats grow?",
      guidance: "about 19% in constant currency",
      format: "signedPercent",
      range: [10, 25],
      weakBelow: 17,
      strongFrom: 19,
      yearAgo: 17,
      lastQuarter: 17.2,
    },
    {
      name: "Operating margin",
      question: "Does the margin hold close to last year’s level while depreciation from new data centers rises?",
      guidance: "down slightly vs last year’s 47.1%",
      format: "percent",
      range: [42, 52],
      weakBelow: 45,
      strongFrom: 47,
      yearAgo: 47.1,
      lastQuarter: 49.8,
    },
    {
      name: "Free cash flow margin",
      question: "Does free cash flow stay near a fifth of sales while capital spending goes above $50B?",
      format: "percent",
      range: [0, 30],
      weakBelow: 10,
      strongFrom: 20,
      yearAgo: 7.2,
      lastQuarter: 20.2,
    },
  ],
  source:
    "Sources: Microsoft Q1 FY27 earnings release and call (Oct 28, 2026) for guidance, and Q2 FY26 results for the year-ago figures. Microsoft does not give a guided range for margin or free cash flow, so the zones for those are Scope’s own thresholds and are not a forecast. The Q2 FY26 Azure growth rate is the figure Microsoft reported in January 2026.",
};

const whereMoneyComes: WhereMoneyComesData = {
  title: "Cloud makes two thirds of sales, and the part that sells to businesses earns far more of each dollar",
  lead: "$92.3B of revenue in Q1 FY27 (quarter ended Sep 30, 2026), split by product line, by profit and by region. Microsoft changed its segments in FY27, so the product view uses the latest quarter.",
  labels: ["From Q1 FY27 release"],
  // The region view below is for the full fiscal year FY26, compared with FY25.
  periodLabel: "FY26",
  comparedWith: "FY25",
  products: [
    { name: "Azure", share: 36.0, value: 33.2, yoy: 48, note: "Cloud computing, AI services and data platforms, billed by usage" },
    { name: "Microsoft 365 cloud", share: 30.1, value: 27.8, yoy: 17.2, note: "Office, Teams, Outlook and Copilot for businesses, billed per user" },
    { name: "Productivity and server licensing", share: 9.1, value: 8.36, yoy: -2.8, note: "Software installed on a customer’s own machines. Calculated by Scope as the remainder of the segment." },
    { name: "Search and advertising", share: 7.1, value: 6.55, yoy: 10.3, note: "Bing and Edge ads, before traffic acquisition costs" },
    { name: "Xbox", share: 5.8, value: 5.38, yoy: -2.3, note: "Games, subscriptions and consoles" },
    { name: "Industry solutions", share: 5.8, value: 5.34, yoy: 9.0, note: "Dynamics, LinkedIn business tools and sector software" },
    { name: "Windows OEM and devices", share: 3.8, value: 3.55, yoy: -22.0, note: "Windows licenses sold to PC makers, plus Surface" },
    { name: "Frontier and support services", share: 2.3, value: 2.11, yoy: 4.3, note: "Enterprise support and consulting" },
  ],
  donutHowToRead:
    "Each slice is a product line, sized by its share of Microsoft’s sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus the same quarter a year ago.",
  profit: {
    title: "Agents and Infra is 83% of sales but 88% of operating profit",
    explain:
      "Operating profit is revenue minus the cost of making it and running the business. Microsoft keeps about $52.80 of every $100 of Agents and Infra sales (Azure, Microsoft 365 cloud and business software), but only $34.60 of every $100 of Devices and Consumer sales (Windows, Xbox and search). Microsoft does not report profit for each product line, so the two new segments are shown. This view uses operating profit, because segment gross profit is not published.",
    revenueTotal: "$92.3B",
    profitTotal: "$45.9B",
    groupNames: { a: "Devices and Consumer", b: "Agents and Infra" },
    profitLabel: "operating profit",
    productsRevenue: 16.8,
    servicesRevenue: 83.2,
    productsProfit: 11.7,
    servicesProfit: 88.3,
    productsMargin: "34.6%",
    servicesMargin: "52.8%",
    servicesHistoryTitle: "Agents and Infra share of Microsoft’s sales",
    servicesHistory: [
      { year: "FY24", share: 76.2 },
      { year: "FY25", share: 77.7 },
      { year: "FY26", share: 80.8 },
      { year: "Q1 FY27", share: 83.2 },
    ],
  },
  regions: {
    title: "About half of sales come from the United States, and growth is almost the same at home and abroad",
    lead: "Where the revenue was earned in FY26 (year ended Jun 30, 2026), and how each area changed versus FY25. Microsoft reports only the US and all other countries.",
    items: [
      { name: "United States", share: 51.5, value: 170.79, yoy: 18.2 },
      { name: "Other countries", share: 48.5, value: 161.05, yoy: 17.4 },
    ],
    focus: {
      name: "Other countries",
      value: 161.05,
      yoy: 17.4,
      historyTitle: "Share of Microsoft’s sales, last 3 years",
      history: [
        { year: "FY24", share: 49.1 },
        { year: "FY25", share: 48.7 },
        { year: "FY26", share: 48.5 },
      ],
      note: "Revenue is assigned by where the customer is located. Billings to PC makers and some multinational customers are counted under other countries, because their true location cannot be worked out. Microsoft does not split Europe or Asia in its filings.",
    },
    howToRead:
      "Each box’s area is the area’s share of FY26 sales. The pill shows growth versus FY25.",
  },
  source:
    "Source: Microsoft Q1 FY27 earnings release (quarter ended Sep 30, 2026), the product and service table and the segment note; FY26 Form 10-K for the geographic split and the restated segment history. Shares are calculated by Scope and rounded to one decimal, so a total can differ from 100% by 0.1. Productivity and server licensing is the remainder of Agents and Infra after the named lines.",
};

const financialHighlights: FinancialHighlightsData = {
  title: "Sales and profit are at five-year highs, but free cash flow has not grown since FY22",
  lead: "Fiscal year 2026 (ended Jun 30, 2026) compared with FY25 and the four years before it.",
  labels: ["From FY26 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Revenue": "Total sales for the year. Up 67% since FY22.",
    "Net income": "Final profit after all costs and tax. FY26 includes accounting effects from the OpenAI investment. Operating income grew 20.8%, which is the cleaner measure.",
    "Earnings per share": "Diluted profit per share. It grows a little faster than net income because Microsoft keeps buying back shares.",
    "Free cash flow": "Operating cash flow ($182.9B) minus spending on equipment and buildings ($115.9B). Capital spending has grown from $23.9B in FY22.",
    "Operating margin": "Microsoft keeps about $47 of every $100 sold after running the business, before tax.",
    "Net margin": "Microsoft keeps $40.30 of every $100 sold as final profit. FY26 is lifted by OpenAI-related accounting effects.",
  }),
  howToRead:
    "The big number is FY26. The pill compares it with FY25: green is better, red is worse. The bars show five years and the colored bar is FY26.",
  source:
    "Source: Microsoft Form 10-K for FY26 (filed Jul 2026), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus additions to property and equipment, and excludes finance leases.",
};

const valuation: ValuationData = {
  title: "Microsoft trades above even our bull-case value, because the cash flow we start from is held down by record data-center spending",
  lead: "Is the share price high or low compared with what Microsoft’s future cash is worth, what it used to trade at, and what analysts expect?",
  labels: ["Market data as of Nov 6, 2026", "Scope estimate"],
  price: 530.61,
  priceDate: "Nov 6, 2026",
  fair: 336,
  field: {
    max: 750,
    rows: [
      { name: "Cash flow (DCF)", low: 173, high: 515, mark: 336, markName: "Base" },
      { name: "Own P/E history", low: 396, high: 737, mark: 601, markName: "5-yr avg" },
      { name: "Analyst targets", low: 600, high: 700, mark: 633, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the right of the dot, the price looks high by that measure.",
  },
  implied: {
    title: "To justify $531, free cash flow must grow about 29% a year for five years, because it has barely grown since FY22",
    needed: 28.8,
    actual: 0.7,
    actualLabel: "FY22 to FY26",
    text: "That is 28.8% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. Free cash flow grew only 0.7% a year from FY22 to FY26, because capital spending rose from $23.9B to $115.9B while operating cash flow grew 20% a year.",
    cases: ["Bear", "Base", "Bull"],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: ["8%", "15%", "22%"] },
      { label: "Cash flow growth, years 6–10", values: ["4%", "8%", "10%"] },
      { label: "Growth after year 10", values: ["2.5%", "3%", "3.5%"] },
      { label: "Discount rate", values: ["9%", "8%", "8%"] },
    ],
    fairValues: [173, 336, 515],
    note: "About 69% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. All three start from $59.9B of free cash flow in the last twelve months, add $36.5B of net cash, and divide by 7.45B diluted shares. Important limit: that starting cash flow is lowered by $116B a year of capital spending that is meant to build future revenue. If that spending turns into much faster growth, today’s free cash flow understates the business, and the model will look too low.",
  },
  history: {
    title: "Microsoft’s P/E is a little below its 5-year average, but its price is high compared with the cash it produces",
    years: [...peHistory, { year: "Now", value: 27.7 }],
    peAverage,
    averagePeriod: "5-year",
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the average of the five fiscal year ends before it.",
    multiples: [
      { name: "P/E", now: 27.7, avg: peAverage },
      { name: "EV/EBITDA", now: 20.1, avg: 20.9 },
    ],
    multiplesHowToRead:
      "Each bar shows how far Microsoft’s multiple is above or below its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it.",
  },
  source:
    "Sources: share price $530.61 (Nov 6, 2026 close) and market data from StockAnalysis; Microsoft Q1 FY27 earnings release and FY26 10-K (net cash, diluted shares, last-twelve-month revenue, EBITDA and EPS); fiscal-year-end P/E from Financial Modeling Prep, and the EV/EBITDA average from stockrow, StockResearch and StockAnalysis, which differ between providers, so the multiples are approximate; analyst targets from StockAnalysis (57 analysts, average $633) and individual targets published after the Oct 28 report (BofA $600 to UBS $700). The analyst bar is a spread of recent individual targets, not the full published range. Forward P/E is not shown because providers disagree. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.",
};

const profitHistory: ProfitHistoryData = {
  title: "Sales grew 13.7% a year and operating profit 16.8%, but free cash flow grew only 0.7%",
  lead: "Five years of results, FY2022 to FY2026: how fast Microsoft grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "Fast growth in four of five years, with one slow year in FY23",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales grew only 6.9% in FY23, then sped up to 15.7%, 14.9% and 17.8%. Net income grew faster than sales in FY26 partly because of OpenAI-related accounting effects. Free cash flow grew the slowest: it has been flat to down since FY24 as capital spending grew 5 times over the period.",
  },
  margins: {
    title: "Operating margin is up 4.7 points since FY22, while gross margin has slipped as cloud costs grow",
    howToRead:
      "Each line is one margin over five years, with the ring on FY26. The pill is the change in percentage points since FY22. Operating margin rose because costs grew slower than sales. Gross margin fell 0.5 points since FY22 as AI and cloud infrastructure costs rose.",
  },
  returns: {
    title: "Microsoft earns far more on its money than the money costs, although the return has eased as spending grows",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    wacc: 8,
    text: roicText("Microsoft", profitNums.returns, "New data centers add to the capital base."),
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as the base case in the valuation. ROE is 34% and ROA is 19%. Finance leases for data centers are not counted as debt here, so ROIC would be lower if they were.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Microsoft Form 10-K for FY22 to FY26 (income statement, balance sheet and cash flow statement). Fiscal years end on June 30. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};

const cashAndReturns: CashAndReturnsData = {
  companyName: "Microsoft",
  title: "Microsoft pays out about three quarters of its free cash flow, and its cash cushion is shrinking as spending rises",
  lead: "How much cash Microsoft makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: "In five years Microsoft returned $223B, about two thirds of the $337B of free cash flow it earned",
    howToRead:
      "Each year has two bars: the free cash flow Microsoft earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote:
      "Free cash flow is cash from operations ($182.9B in FY26) minus spending on equipment and buildings ($115.9B), which leaves $67.0B.",
  },
  how: {
    title: "Dividends are now the larger part of what Microsoft returns, and share count is falling slowly",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: "Returned in FY26", value: "$48.7B", note: "73% of free cash flow" },
      { label: "Dividend per share", value: "$3.64", note: "+9.6% vs last year" },
      { label: "Dividend yield", value: "0.7%", note: "Small, and the quarterly dividend is $0.91" },
      { label: "Payout ratio", value: "19.8%", note: "of net income, so there is room to raise it" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "Microsoft still holds more cash than debt, but the cushion has shrunk from $55B to $37B in four years",
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote:
      "A ratio above 1 means current assets cover bills due within a year. Microsoft’s ratio is about 1.2. It does not include $329B of data-center leases signed but not yet started, which are a large future commitment.",
    howToRead:
      "Net cash is cash and securities minus all interest-bearing debt. Positive means Microsoft could repay every loan today. Finance leases are not counted as debt here, and including them would turn the net cash into a net debt of about $30B.",
  },
  source:
    "Sources: Microsoft Form 10-K for FY22 to FY26 (cash flow statement and balance sheet; FY26 as of Jun 30, 2026). Buybacks are the cash paid in the year, so they can differ from the amount Microsoft reports as repurchased ($16.7B under the programme in FY26). Debt is short-term plus long-term debt, without finance leases. Net cash with and without leases differs between providers. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section.",
};

const strengthsRisks: StrengthsRisksData = {
  title: "Microsoft’s strengths are broad and proven, but record AI spending and a full price are the biggest risks",
  lead: "What Microsoft does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Microsoft an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Businesses build their daily work, data and software on Microsoft products, so switching is slow and costly.", evidence: [{ value: "$677B", label: "contracted future sales (commercial backlog), up 73%" }, { value: "30M+", label: "paid Microsoft 365 Copilot seats by mid-2026, up from about 20M three months earlier" }], why: "Customers renew and expand with Microsoft, which makes sales predictable." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "Microsoft keeps far more of each dollar than most large companies.", evidence: [{ value: "46.8%", label: "operating margin in FY26, up from 42.1% in FY22" }, { value: "49.8%", label: "operating margin in Q1 FY27" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-star", name: "Cloud growth at scale", finding: "Azure is growing almost 50% while already earning more than $100B a year.", evidence: [{ value: "+48%", label: "Azure revenue growth in Q1 FY27" }, { value: "$63.9B", label: "Microsoft Cloud revenue in the quarter, up 30%" }], why: "Fast growth on a big base lifts the whole company’s growth rate." },
    { icon: "ti-refresh", name: "Recurring revenue", finding: "Most sales repeat every month or year through subscriptions and usage.", evidence: [{ value: "$27.8B", label: "Microsoft 365 cloud revenue in Q1 FY27, up 17%" }, { value: "83%", label: "of Q1 FY27 sales from Agents and Infra" }], why: "Steadier income than selling products one at a time." },
    { icon: "ti-flag", name: "Market position", finding: "A top-two player in cloud infrastructure and the leader in workplace software.", evidence: [{ value: "$3.94T", label: "market cap on Nov 6, 2026" }, { value: "$346.4B", label: "revenue in the last 12 months" }], why: "Scale lowers costs and attracts partners and developers." },
    { icon: "ti-coin", name: "Financial strength", finding: "Microsoft holds more cash than debt and produces cash every year.", evidence: [{ value: "+$36.5B", label: "net cash on Jun 30, 2026, without finance leases" }, { value: "$182.9B", label: "operating cash flow in FY26" }], why: "Microsoft can fund its own growth, buybacks and dividends without needing outside money." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-trending-up", name: "AI spending risk", level: 3, finding: "Capital spending has nearly doubled and may not pay off as fast as planned.", evidence: [{ value: "$45.2B", label: "spent in Q1 FY27, with over $50B guided for Q2" }, { value: "−27.5%", label: "change in free cash flow in Q1 FY27" }], why: "Microsoft is betting about $170B in calendar 2026 on AI demand. If demand grows more slowly, the data centers cost money before they earn it, and profit margins could fall. About $329B of data-center leases are also signed but not yet started." },
    { icon: "ti-gavel", name: "Regulatory risk", level: 2, finding: "US regulators are looking at how Microsoft bundles products and how it works with AI partners.", evidence: [{ value: "Jan 2026", label: "FTC orders to Microsoft, OpenAI and other AI partnerships" }, { value: "Open", label: "FTC probe into cloud licensing and bundling practices" }], why: "No fine or order has been set, but a ruling could change how Microsoft sells Azure and Microsoft 365 together." },
    { icon: "ti-chart-pie", name: "OpenAI dependence", level: 2, finding: "A large stake and a lot of AI revenue are linked to one partner.", evidence: [{ value: "~27%", label: "stake in OpenAI after its restructuring, valued at about $135B" }, { value: "$12.0B", label: "equity-method investments on Jun 30, 2026" }], why: "OpenAI’s terms, finances and relationships with other cloud providers can change. They also swing Microsoft’s reported net income, which is why Microsoft publishes figures that exclude them." },
    { icon: "ti-cpu-2", name: "Margin and cost pressure", level: 2, finding: "New data centers add depreciation faster than sales are growing.", evidence: [{ value: "26% to 27%", label: "cost of revenue growth guided for Q2, against 18% to 19% sales growth" }, { value: "67.8%", label: "gross margin in Q1 FY27, down from 69.0% a year earlier" }], why: "Microsoft guides the operating margin down slightly year over year. A small slip matters because the share price already assumes high profit." },
    { icon: "ti-trending-down", name: "Market risk", level: 2, finding: "The share price is high compared with free cash flow.", evidence: [{ value: "1.5%", label: "free cash flow yield at $530.61" }, { value: "27.7×", label: `P/E, against ${peAvg}× 5-year average` }], why: "The shares rose 6.7% in a day after the Oct 28 report and have since eased to $530.61, about 5% below their 52-week high of $559. A market that expects a lot leaves little room for disappointment." },
    { icon: "ti-user-star", name: "Consumer weakness", level: 1, finding: "The Windows and Xbox side of the business is shrinking.", evidence: [{ value: "−22%", label: "Windows OEM and devices revenue in Q1 FY27" }, { value: "17%", label: "of Q1 FY27 sales from Devices and Consumer" }], why: "The effect is small because this segment is a minor part of sales and profit, but it is a drag on total growth." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Microsoft FY26 10-K and Q1 FY27 earnings release and call (Oct 28, 2026); Microsoft’s Q4 FY26 release (Copilot seats); reports on the FTC’s orders and probe; reports on the OpenAI restructuring and Microsoft’s stake; StockAnalysis (52-week range); Scope’s valuation. All risk ratings are Scope’s own.",
};

const moatEcosystem: MoatEcosystemData = {
  title: "Microsoft’s moat is wide because businesses are locked into its software, and the main threat is how fast AI changes who controls the work",
  lead: "Why rivals struggle to take Microsoft’s customers, how the loop keeps them paying, and who Microsoft depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Brand power", score: 7, weight: 25, test: "Can Microsoft charge more because of its name?", answer: "Partly. In business software, the name signals safety and compatibility, and Copilot is sold on top of existing contracts.", evidence: { value: "46.8%", label: "operating margin in FY26, up from 42.1% in FY22" }, wear: "Cheaper AI tools from newer companies could make the name less important.", trend: "stable" },
    { name: "Switching costs", score: 9, weight: 30, test: "Would a customer lose something by leaving?", answer: "Yes. Files, email, identity, security settings and team habits all live inside Microsoft products, and moving them is slow and risky.", evidence: { value: "$677B", label: "commercial backlog, up 73% from a year ago" }, wear: "AI agents that work across any software could make it easier to move.", trend: "stable" },
    { name: "Intangible assets", score: 8, weight: 20, test: "Does Microsoft own things rivals cannot copy?", answer: "Yes. Decades of enterprise software code, security certifications, and a large share of OpenAI’s technology.", evidence: { value: "~27%", label: "stake in OpenAI, valued at about $135B" }, wear: "OpenAI is free to work with other cloud companies, so its technology is not exclusive to Microsoft.", trend: "eroding" },
    { name: "Cost advantage", score: 8, weight: 15, test: "Can Microsoft make or buy things cheaper than rivals?", answer: "Yes at its scale. Large cloud volumes give buying power on chips and energy, and it spreads costs across many products.", evidence: { value: "52.8%", label: "operating margin in Agents and Infra, Q1 FY27" }, wear: "Chip shortages and rising depreciation from new data centers.", trend: "eroding" },
    { name: "Network effects", score: 6, weight: 10, test: "Does the product get better as more people join?", answer: "Partly. Teams, LinkedIn and GitHub become more useful as more people use them, but Microsoft’s main products do not depend on it.", evidence: { value: "30M+", label: "paid Microsoft 365 Copilot seats by mid-2026" }, wear: "Rival chat and meeting tools can connect to the same people.", trend: "stable" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. Cloud and productivity software are big markets with several large sellers, so size alone does not protect Microsoft." },
  narrowing:
    "AI could shift value to whoever controls the AI agents that do the work, and regulators are looking at how Microsoft bundles products.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for an enterprise software and cloud company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why one business keeps paying",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "Adopt Microsoft 365", text: "A company starts with email, documents and Teams for its staff." },
      { title: "Put data in the cloud", text: "Files, identity and security settings are stored in Azure and Microsoft 365." },
      { title: "Add Copilot and AI agents", text: "AI tools read that data to do work, so they work best inside Microsoft’s own products." },
      { title: "Switching feels painful", text: "Leaving means moving years of files, settings and trained staff, and losing the AI tools tuned to them." },
      { title: "Buy more", text: "The customer adds Azure capacity, security and more seats, and Microsoft earns more from the same customer." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    title: "Who Microsoft relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip makers, data-center builders, power and network providers", gives: "AI chips, buildings and energy", gets: "Very large, steady orders", note: "Few companies can supply AI chips at this scale. In Q1 FY27 some third-party capacity arrived late, so capital spending came in lighter than planned." },
      { group: "Partners", level: 3, who: "OpenAI, Anthropic and other AI model makers", gives: "Models that make Azure and Copilot more valuable", gets: "Computing power and a large customer", note: "Microsoft owns about 27% of OpenAI but does not control it. Anthropic has committed about $30B to Azure." },
      { group: "Competitors", level: 2, who: "Amazon, Alphabet, Oracle, Salesforce", gives: "Pressure on price and features", gets: "A rival to beat, sometimes a partner", note: "Some rivals also resell or integrate Microsoft products.", rival: true },
      { group: "Distributors", level: 2, who: "Resellers, system integrators and PC makers", gives: "Reach into small business and large accounts", gets: "A margin on each sale", note: "Microsoft sells directly to large accounts, which limits how much it needs them." },
      { group: "Developers", level: 2, who: "GitHub users, app builders and software vendors", gives: "Apps and AI tools built on Azure", gets: "Tools and access to customers", note: "Developers can choose other clouds, so Microsoft must keep GitHub and Azure attractive." },
      { group: "Customers", level: 1, who: "Companies, governments, schools and consumers", gives: "Money and repeat purchases", gets: "Software, cloud and AI", note: "Spread across a very large base, so no single customer matters much." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings or press reports are shown.",
  },
  source:
    "Sources: Microsoft FY26 10-K, Q1 FY27 earnings release and call; Microsoft’s Q4 FY26 release (Copilot seats); reports on the OpenAI restructuring and on Anthropic’s Azure commitment; FTC actions as reported in the press. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};

const competitors: CompetitorsData = {
  title: "Microsoft is the most profitable of the three biggest tech platforms, but its free cash flow is far below Apple’s",
  lead: "Who Microsoft competes with, how it compares with Apple and Alphabet on the same basis, and where cloud shares stand.",
  labels: [],
  overviewTitle: "Who Microsoft competes with",
  overviewIntro: "Rivals split by how they compete for Microsoft’s customers.",
  shares: {
    title: "Cloud infrastructure market share, 2025",
    items: [
      { name: "Amazon (AWS)", value: 31 },
      { name: "Microsoft (Azure)", value: 25, self: true },
      { name: "Google Cloud", value: 11 },
      { name: "Others", value: 33, muted: true },
    ],
    note: "Holori’s market overview for 2026, based on 2025 spending. Trackers do not agree. In Q3 2026, Azure revenue was $33.2B (+48%) and Google Cloud $30.7B (+103%), so Google is closing the gap fast. AWS revenue grew 39%.",
  },
  // Numbers for Microsoft, Alphabet and Apple come from the saved API data through shared/peers.ts.
  companies: [
    peerCompany("MSFT", { id: "msft", kind: "self", desc: "Cloud, business software, AI and Windows" }),
    {
      id: "amzn", name: "Amazon", ticker: "AMZN", kind: "direct",
      desc: "AWS cloud, online retail and advertising",
      chartNote: "Not in the charts: most of its sales and profit come from retail, which is a different business, so group figures say little about cloud competition.",
    },
    peerCompany("GOOGL", { id: "goog", kind: "direct", desc: "Google Cloud, Workspace, search and Android" }),
    {
      id: "orcl", name: "Oracle", ticker: "ORCL", kind: "direct",
      desc: "Database software and cloud infrastructure",
      chartNote: "Not in the charts: its fiscal year ends in May and its figures are not on the same basis.",
    },
    {
      id: "crm", name: "Salesforce", ticker: "CRM", kind: "indirect",
      desc: "Customer software that competes with Dynamics 365",
      chartNote: "Not in the charts: its fiscal year ends in January and its figures are not on the same basis.",
    },
    peerCompany("AAPL", { id: "aapl", kind: "indirect", desc: "Devices, operating systems and services" }),
    { id: "oai", name: "OpenAI", ticker: "Private", kind: "future", desc: "Microsoft’s AI partner, and a possible rival in business software" },
  ],
  compareTitle: "How Microsoft compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is Microsoft, grey bars are Apple and Alphabet.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat: peerCaveat(
    ["MSFT", "AAPL", "GOOGL"],
    "Microsoft’s net cash is shown without finance leases. Alphabet’s free cash flow is low because it spent far more on equipment than the others.",
  ),
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Microsoft, Apple and Alphabet numbers from their filings, loaded from the saved API data (Financial Modeling Prep) on the same day as the rest of this page. Growth compares with the same 12 months a year earlier. Cloud shares are from Holori’s 2026 market overview and revenue figures from company results for Q3 2026 as reported in the press.",
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
      value: "47.1%",
      steps: [
        "Form 10-K for FY26 (filed Jul 2026) and the Q1 FY27 earnings release (quarter ended Sep 30, 2026)",
        "Operating income $163.2B and revenue $346.4B over the last four quarters",
        "163.2 ÷ 346.4 × 100",
        "47.1% operating margin",
        "Profitability score (40% of that category, which carries 25% of the total) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: "$59.9B",
      steps: [
        "Form 10-K for FY26 and the Q1 FY27 earnings release, cash flow statements",
        "FY26 free cash flow $67.0B, plus Q1 FY27 $18.6B, minus Q1 FY26 $25.7B",
        "67.0 + 18.6 − 25.7",
        "$59.9B free cash flow",
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: "27.7×",
      steps: [
        "Closing share price on Nov 6, 2026 from market data, and earnings per share from Microsoft’s filings",
        "Share price $530.61 and diluted earnings per share $19.15 over the last four quarters",
        "530.61 ÷ 19.15",
        "27.7× P/E",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Microsoft.",
  sources: [
    { title: "SEC filings", topic: "Reported financials", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Microsoft, Apple and Alphabet. The primary source for financial figures." },
    { title: "Company investor relations", topic: "Outlook and guidance", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and guidance come from here." },
    { title: "Market data providers", topic: "Share price, market cap, estimates and price targets", text: "Share price, market cap, analyst estimates and price targets, from StockAnalysis and S&P Global Market Intelligence. Prices are closing prices, and Scope shows the date." },
    { title: "Industry research", topic: "Industry and news context", text: "Cloud market shares from Holori’s overview and press coverage of Synergy Research, which can differ by several points." },
  ],
  documents: [
    { name: "FY26 annual report", date: "Jul 2026", type: "10-K", source: "SEC filings", use: "Business, risks and annual financials" },
    { name: "Q1 FY27 earnings release", date: "Oct 28, 2026", type: "8-K", source: "SEC filings", use: "Headline results, segment and product-line sales" },
    { name: "Q1 FY27 earnings call", date: "Oct 28, 2026", type: "Transcript", source: "Company investor relations", use: "Guidance, capital spending and margin comments, kept as an AI summary" },
    { name: "Q4 FY26 earnings release", date: "Jul 29, 2026", type: "8-K", source: "SEC filings", use: "FY26 results and Copilot seat count" },
    { name: "Apple and Alphabet financials", date: "Nov 2026", type: "Data feed", source: "Market data providers", use: "Rival financials, each on its own latest 12 months" },
    { name: "Analyst consensus and price targets", date: "Oct to Nov 2026", type: "Estimates", source: "Market data providers", use: "Beat and miss figures and price targets" },
    { name: "Cloud market report", date: "Nov 2025 and Q3 2026", type: "Industry", source: "Industry research", use: "Cloud infrastructure shares" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: formulas({
    "Net margin": "GAAP net income. FY26 includes accounting effects from the OpenAI investment, noted beside the number.",
    "ROIC": "Debt is interest-bearing debt without finance leases. Cash is not subtracted. Other data providers define it differently, so compare ROIC only within Scope.",
    "Debt to equity": "Debt is short-term plus long-term debt. It leaves out liabilities that carry no interest and finance leases.",
    "Free cash flow": "Capital spending is additions to property and equipment from the cash flow statement. It excludes finance leases, which Microsoft reports separately. Quarterly figures come from subtracting cumulative year-to-date totals.",
    "Net cash": {
      formula: "Cash and securities − interest-bearing debt",
      note: "Positive means net cash. If finance leases were counted as debt, Microsoft would show net debt of about $30B.",
    },
    "P/E": "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings, and differs between providers.",
  }),
  formulasNote,
  scoringTitle: "How the Scope Score is built",
  scoringIntro,
  categories: scored.categories,
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list.",
  valuationTitle: "How fair value is estimated",
  valuationIntro: "Three reference points, each with its own limit. None of them is a price forecast, and only the cash flow model sets the fair value.",
  methods: [
    { name: "Discounted cash flow", what: "Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($336 in the base case).", limit: "The result moves a lot when assumptions change. About two thirds of the value comes from after year 10, and today’s free cash flow is lowered by record data-center spending." },
    { name: "Historical multiples", what: "Compares today’s P/E with Microsoft’s own range over the last five fiscal year ends.", limit: "The past may not repeat if the business has changed, for example with AI spending." },
    { name: "Analyst price targets", what: "Shows the average and a spread of recent published targets from analysts who follow Microsoft.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price." },
  ],
  valuationNote,
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Sep 30, 2026", label: "Latest reporting period ends" },
    { date: "Oct 28, 2026", label: "Source date: reported 28 days later" },
    { date: "Nov 6, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q1 FY27 (ended Sep 30, 2026)", sourceDate: "Oct 28, 2026", updated: "Nov 6, 2026", status: "Verified", limit: "GAAP basis. Q1 FY27 net income is calculated from reported EPS. Annual figures use FY26 (ended Jun 30, 2026)." },
    { dataset: "Balance sheet", period: "Jun 30, 2026", sourceDate: "Jul 2026", updated: "Nov 6, 2026", status: "Verified", limit: "Year-end snapshot. The Sep 30 balance sheet was not used, so net cash is as of June." },
    { dataset: "Cash flow", period: "FY26 plus Q1 FY27", sourceDate: "Oct 28, 2026", updated: "Nov 6, 2026", status: "Verified", limit: "Last-12-month free cash flow is estimated from FY26 plus Q1 FY27 minus Q1 FY26, and quarterly splits are derived from cumulative totals." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 6, 2026 close", updated: "Nov 8, 2026", status: "Verified", limit: "Closing price multiplied by shares outstanding. It moved 6.7% in a day after the report." },
    { dataset: "Analyst estimates and targets", period: "Q2 FY27 (estimate)", sourceDate: "Oct to Nov 2026", updated: "Nov 6, 2026", status: "Pending", limit: "Consensus differs between providers. Targets quoted range from about $609 to $633 on average. Shown only as analyst view." },
    { dataset: "Cloud market shares", period: "2025 and Q3 2026", sourceDate: "Nov 2025 and Oct 2026", updated: "Nov 6, 2026", status: "Verified", limit: "Trackers differ by several points. The share figures are for 2025, while revenue figures are for Q3 2026." },
    { dataset: "Rival financials", period: "Each company’s latest 12 months", sourceDate: "Oct to Nov 2026", updated: "Nov 2026", status: "Verified", limit: "Each company is on its own latest 12 months and latest fiscal year-end balance sheet, so the dates differ slightly. The exact dates are in the note under the Competitors charts. Amazon, Oracle and Salesforce are not on the same basis." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Microsoft does not report total customers. Scope shows Copilot seats and backlog instead." },
  ],
  source:
    "Sources: Microsoft, Apple and Alphabet filings and earnings materials, StockAnalysis (S&P Global) market data and press coverage of Microsoft’s Q1 FY27 call, as of Nov 6, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};

const bottomLine: BottomLineData = {
  title: "A very strong business, with a bet on AI that has not paid back yet",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for scale, profit and growth, held back by weak cash conversion and a price that already assumes success.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Excellent", tone: "positive", text: "Sales are growing 18% a year at a 47% operating margin, Azure is growing 48%, and the backlog is $677B. Quality is held back by cash conversion of only 72%.", href: "#moat", hrefLabel: "See the moat" },
    { icon: "ti-tag", label: "The price", verdict: "Full", tone: "caution", text: `A P/E of 27.7× against ${peAvg}× on average looks fair, but the free cash flow yield is just 1.5% and the price is still above our bull-case fair value of $515.`, href: "#valuation", hrefLabel: "See the valuation" },
    { icon: "ti-trending-down", label: "What to watch", verdict: "Spending payback", tone: "caution", text: "Capital spending is $45.2B a quarter and heading above $50B, while free cash flow fell 27%. The January report shows whether Azure can reach the guided 49% to 50%.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price.",
};

const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what Microsoft earns, what protects it and what it costs. Keep building the picture.",
  companies: [
    { name: "Alphabet", ticker: "GOOGL", reason: "Microsoft’s closest rival in cloud and AI, with Google Cloud growing over 100%.", href: "/company/google" },
    { name: "NVIDIA", ticker: "NVDA", reason: "The chip maker whose AI chips fill the data centers Microsoft is spending billions to build.", href: "/company/nvidia" },
    { name: "Amazon", ticker: "AMZN", reason: "Owner of AWS, the largest cloud and Azure’s biggest competitor.", href: "/company/amazon" },
  ],
  ...closingShared,
};

const spotlight: SpotlightData = {
  title:
    "Microsoft is spending about $170B on AI data centers: demand is huge, but free cash flow has not grown since FY22",
  lead:
    "Microsoft rents out computing power (Azure) and sells AI tools such as Copilot. To keep up with demand it is building data centers faster than almost anyone, so cash goes out before it comes back in. Sales and profit are rising fast, but the cash left over has barely moved.",
  labels: [],
  chart: {
    kind: "capex-vs-cash",
    title: "Cash coming in vs cash spent on data centers and equipment, FY22 to FY26 ($B)",
    howToRead:
      "Blue is cash from operations, red is spending on equipment and buildings. The line under each year is what is left (free cash flow). Capital spending excludes finance leases.",
    // Read from data/raw/MSFT.json, the same source as the "Every number behind the charts" table.
    years: facts.years,
    ocf: oneDecimal(facts.ocf, "operating cash flow"),
    capex: oneDecimal(facts.capex, "capital spending"),
    callout:
      "Capital spending is about five times its FY22 level, while cash from operations grew about 20% a year, so free cash flow grew only 0.7% a year.",
  },
  numbers: [
    { value: "$45.2B", label: "capital spending in Q1 FY27, with over $50B guided for Q2", tone: "negative" },
    { value: "−27.5%", label: "change in free cash flow in Q1 FY27, to $18.6B, while profit rose", tone: "negative" },
    { value: "$677B", label: "contracted future sales (commercial backlog), up 73%", tone: "positive" },
    { value: "$329B", label: "of data-center leases signed but not yet started", tone: "neutral" },
  ],
  wins: [
    {
      title: "Azure keeps growing near 50%",
      detail:
        "Azure grew 48% to $33.2B in Q1 FY27, and Microsoft guides 49% to 50% for the next quarter.",
    },
    {
      title: "Customers have already signed up",
      detail:
        "The $677B backlog and more than 30M paid Copilot seats mean buyers are waiting for the new capacity.",
    },
  ],
  breaks: [
    {
      title: "Demand grows slower than the buildings",
      detail:
        "If AI demand slows, data centers cost money before they earn it. About $329B of leases are also signed but not yet started.",
    },
    {
      title: "Costs rise faster than sales",
      detail:
        "Microsoft guides cost of revenue up 26% to 27% against sales up 18% to 19%, and the operating margin slightly down.",
    },
  ],
  watch: {
    title: "Next report: does free cash flow hold near a fifth of sales?",
    text:
      "In Q1 FY27 free cash flow was 20.2% of sales. The Q2 FY27 report, due in late January 2027, shows whether Azure reaches the guided 49% to 50% while capital spending goes above $50B. If it does, the spending is starting to pay off.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: Microsoft FY26 Form 10-K and Q1 FY27 earnings release and call (Oct 28, 2026). Free cash flow is calculated by Scope as operating cash flow minus additions to property and equipment. Guidance figures are Microsoft’s own, not results.",
};

export const microsoftPage: CompanyPageData = {
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