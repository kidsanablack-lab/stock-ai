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
import { appleScore } from "../scope-score/inputs";
import rawAapl from "../../data/raw/AAPL.json";
import { buildFacts, type RawFmp } from "../company-data/facts";
import { cashAndReturnsNumbers, financialHighlightsMetrics, profitHistoryNumbers } from "../company-data/sections";
import { closingShared, formulas, formulasNote, scoreHowToRead, scoringIntro, valuationNote } from "@/shared/methodology";
import { peerCaveat, peerCompany } from "@/shared/peers";

// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(appleScore.raw, appleScore.display);

// Numbers from filings come from the saved API data (data/raw/AAPL.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts AAPL
const facts = buildFacts(rawAapl as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// Apple page data. Prices as of Nov 6, 2026 close. Latest quarter: Q4 FY26 (ended Sep 26, 2026).
const hero: CompanyHeroData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  sector: "Technology",
  logo: "/logos/apple-logo-svgrepo-com.svg",
  description:
    "A global technology company that combines premium devices, software and digital services into one tightly connected ecosystem.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$4.98T", note: "As of Nov 6, 2026" },
    { label: "Revenue, last 12 months", value: "$478.8B", note: "+15.1% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "38.1×", note: "vs 29.9× 5-year average", noteTone: "negative" },
    { label: "Free cash flow, last 12 months", value: "$136.1B", note: "28.4% of sales", noteTone: "positive" },
  ],
  source:
    "Financials from Apple’s FY26 Form 10-K (fiscal year ended Sep 26, 2026) and the Q4 FY26 earnings release. Market cap and P/E use the Nov 6, 2026 close. Next report: about Feb 4, 2027.",
};

const summary: CompanySummaryData = {
  title: "Apple in 30 seconds",
  label: "AI summary",
  text: "Apple makes premium devices and sells services on top of them, and the two feed each other. In FY26 sales grew 15.1% to $478.8B, and Apple kept $33.0 of every $100 as operating profit. Services, the recurring part, was 26% of sales.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "26%",
    caption: "from Services, FY26",
    segments: [
      { label: "iPhone · over half", share: 53.1 },
      { label: "Services", share: 25.8 },
      { label: "Other", share: 21.1 },
    ],
  },
};
const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  takeaway:
    "Apple scores top marks for scale and profitability and a high 9.1 for quality. Valuation is the weakest category at 4.6 out of 10, and risk (7.1) and growth (7.8) are good rather than great.",
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: "72%", label: "return on invested capital in FY26, with steady margins and cash profit above 100% of net income", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: "$4.98T", label: "market cap, with $479B of revenue in the last 12 months", href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: "33.0%", label: "operating margin in the last 12 months, and 28% of sales kept as free cash flow", href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: "+15.1%", label: "growth in the last 12 months, but only 5.0% a year from FY22 to FY26", href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "53.1%", label: "of sales from iPhone, offset by net cash of $56.8B", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: "38.1×", label: "P/E, against its own 5-year average of 29.9×", href: "#valuation" },
  ],
  howToRead: scoreHowToRead(),
};
const whatChanged: WhatChangedData = {
  title: "Sales grew 12% to a September-quarter record, but the margin is guided down to 45% to 46% as memory costs rise",
  lead: "What changed since the last report: Q4 FY26, the quarter ended Sep 26, 2026 (reported Nov 2, the first report under CEO John Ternus). The next report, Q1 FY27, is expected around Feb 4, 2027.",
  metrics: [
    { label: "Revenue", value: "$114.5B", change: "+11.7% vs a year ago", tone: "positive", series: [102.466, 143.756, 111.184, 109.417, 114.48], note: "iPhone added $8.6B of the extra $12.0B. A September-quarter record." },
    { label: "Net income", value: "$30.7B", change: "+11.8% vs a year ago", tone: "positive", series: [27.466, 42.097, 29.578, 29.789, 30.7], note: "Earnings per share rose 14% to $2.10, helped by buybacks. Tariff refunds added about $0.05 per share." },
    { label: "Gross margin", value: "47.9%", change: "+0.7 pts vs a year ago", tone: "positive", series: [47.2, 48.2, 49.3, 50.1, 47.9], note: "About 1 point came from tariff refunds, so the underlying margin was about 46.9%. It fell from 50.1% last quarter." },
    { label: "Services revenue", value: "$31.6B", change: "+9.8% vs a year ago", tone: "positive", series: [28.75, 30.01, 31.0, 30.739, 31.6], note: "An all-time high, with a 76.0% gross margin. Growth slowed from 12.1% last quarter." },
  ],
  growth: {
    bars: [
      { quarter: "Q1", fy: "FY25", value: 124.3, yoy: 4.0 },
      { quarter: "Q2", fy: "FY25", value: 95.359, yoy: 5.1 },
      { quarter: "Q3", fy: "FY25", value: 94.036, yoy: 9.6 },
      { quarter: "Q4", fy: "FY25", value: 102.466, yoy: 7.9 },
      { quarter: "Q1", fy: "FY26", value: 143.756, yoy: 15.7 },
      { quarter: "Q2", fy: "FY26", value: 111.184, yoy: 16.6 },
      { quarter: "Q3", fy: "FY26", value: 109.417, yoy: 16.4 },
      { quarter: "Q4", fy: "FY26", value: 114.48, yoy: 11.7 },
    ],
    verdictLabel: "Slower but strong",
    before: "16.4%",
    after: "11.7%",
    verdict: "Sales growth eased to about 12% from 16% a quarter earlier, but it is still the fourth quarter in a row above 11%.",
    watch: "Next is the December quarter. Apple guides 7% to 10% growth, or about $153.8B to $158.1B, against $143.8B a year ago, so growth is expected to slow again.",
  },
  estimates: [
    { label: "Revenue", unit: "B", actual: 114.48, estimate: 113.35 },
    { label: "EPS (earnings per share)", unit: "$", actual: 2.10, estimate: 2.0 },
    { label: "iPhone revenue", unit: "B", actual: 57.58, estimate: 56.5 },
    { label: "Services revenue", unit: "B", actual: 31.6, estimate: 31.6 },
  ],
  good: [
    { title: "iPhone had a September-quarter record", detail: "$49.0B → $57.6B (+17%)", meaning: "iPhone is about half of Apple’s sales, so its growth sets the pace for the whole company. It beat estimates despite tight supply." },
    { title: "Mac grew the fastest", detail: "+24% vs a year ago", meaning: "Mac was the fastest-growing product line this quarter." },
    { title: "Services reached a new all-time high", detail: "$31.6B, with a 76.0% gross margin", meaning: "Services keeps far more profit from each dollar than hardware, so each new record lifts the whole company’s margin." },
  ],
  watch: [
    { title: "Margin is guided down, and memory costs are rising", detail: "47.9% now → 45% to 46% guided", meaning: "Apple blames higher memory costs and the cost of ramping Siri AI. Analysts expected about 46% to 47%. Without the tariff refunds, this quarter’s margin was about 46.9%." },
    { title: "Guidance beat analysts, but supply is tight", detail: "+7% to +10% guided vs about 6.1% expected", meaning: "Apple says its range reflects its best view of constrained supply, and it sits on top of a +16% December quarter last year." },
    { title: "Some product lines shrank", detail: "iPad −10% · Wearables −8%", meaning: "Greater China also grew but missed estimates. Services growth of 9.8% matched estimates but slowed from last quarter." },
  ],
  source:
    "Sources: Apple Q4 FY26 earnings release (quarter ended Sep 26, 2026) and Q4 FY26 earnings call (Nov 2, 2026), and earlier quarterly releases. Analyst estimates are approximate consensus figures from press reports and differ between data providers. Quarterly net income is calculated from reported earnings per share. Year-over-year growth for revenue and net income is calculated by Scope.",
};
const signalsToWatch: SignalsToWatchData = {
  title: "Next report: growth has to hold near 8% and the gross margin has to land inside the guided 45% to 46%",
  lead: "Three numbers will show whether Apple’s December quarter is good or not. Each one shows where last quarter, a year ago and Apple’s own guidance sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Around Thursday, Feb 4, 2027 (tentative)",
    note: "Q1 FY27, the December quarter and Apple’s biggest quarter of the year. The date is not yet confirmed by Apple.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around Apple’s guidance.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth hold in the guided 7% to 10% range against last year’s $143.8B December quarter?",
      guidance: "7% to 10% growth, or about $153.8B to $158.1B",
      format: "signedPercent",
      range: [0, 20],
      weakBelow: 7,
      strongFrom: 10,
      yearAgo: 15.7,
      lastQuarter: 11.7,
    },
    {
      name: "Gross margin",
      question: "Do memory costs and Siri AI costs pull the margin down to the guided range, or does Apple do better?",
      guidance: "45% to 46%",
      format: "percent",
      range: [43, 51],
      weakBelow: 45,
      strongFrom: 46,
      yearAgo: 48.2,
      lastQuarter: 47.9,
    },
    {
      name: "Services revenue growth",
      question: "Does Services hold its pace of about 9% after slowing last quarter?",
      guidance: "8% to 9% growth, with headwinds from third-party licensing and currency",
      format: "signedPercent",
      range: [4, 16],
      weakBelow: 8,
      strongFrom: 9,
      yearAgo: 14,
      lastQuarter: 9.8,
    },
  ],
  source:
    "Sources: Apple Q4 FY26 earnings release and call (Nov 2, 2026), and Q1 FY26 results for the year-ago figures. The next report date is tentative and based on press reports. Red and green zones are Scope’s own thresholds and are not a forecast.",
};
const whereMoneyComes: WhereMoneyComesData = {
  title: "More than half of sales come from iPhone, but Services keeps far more profit from each dollar",
  lead: "$478.8B of revenue in FY26 (year ended Sep 26, 2026), split by product line, by profit and by region.",
  labels: ["From FY26 10-K"],
  periodLabel: "FY26",
  comparedWith: "FY25",
  products: [
    { name: "iPhone", share: 53.1, value: 254.1, yoy: 21.2, note: "All iPhone models" },
    { name: "Services", share: 25.8, value: 123.3, yoy: 13.0, note: "App Store, iCloud, advertising, AppleCare, Apple Pay, Music" },
    { name: "Mac", share: 7.9, value: 37.93, yoy: 12.5, note: "MacBook, iMac, Mac mini, Mac Studio" },
    { name: "Wearables, Home & Accessories", share: 7.4, value: 35.58, yoy: -0.3, note: "AirPods, Apple Watch, Apple TV, HomePod" },
    { name: "iPad", share: 5.8, value: 27.93, yoy: -0.3, note: "iPad, iPad Air, iPad Pro, iPad mini" },
  ],
  donutHowToRead:
    "Each slice is a product line, sized by its share of Apple’s sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus FY25.",
  profit: {
    title: "Services is 26% of sales but 40% of gross profit",
    explain:
      "Gross profit is revenue minus the direct cost of making it. Apple keeps $76.20 of every $100 of Services sales but only $39.30 of every $100 of Products sales, because software and subscriptions cost far less to deliver than phones. Apple does not report iPhone’s margin on its own, so Products are shown as one group.",
    revenueTotal: "$478.8B",
    profitTotal: "$233.6B",
    groupNames: { a: "Products", b: "Services" },
    profitLabel: "gross profit",
    productsRevenue: 74.2,
    servicesRevenue: 25.8,
    productsProfit: 59.8,
    servicesProfit: 40.2,
    productsMargin: "39.3%",
    servicesMargin: "76.2%",
    servicesHistoryTitle: "Services share of Apple’s sales, last 5 years",
    servicesHistory: [
      { year: "FY22", share: 19.8 },
      { year: "FY23", share: 22.2 },
      { year: "FY24", share: 24.6 },
      { year: "FY25", share: 26.2 },
      { year: "FY26", share: 25.8 },
    ],
  },
  regions: {
    title: "Two thirds of sales come from the Americas and Europe, and Greater China grew fastest, up 28%",
    lead: "Where the revenue was earned in FY26, and how each region changed versus FY25.",
    items: [
      { name: "Americas", share: 41.4, value: 198.08, yoy: 11.1 },
      { name: "Europe", share: 26.6, value: 127.6, yoy: 14.9 },
      { name: "Greater China", share: 17.2, value: 82.38, yoy: 28.0 },
      { name: "Rest of Asia Pacific", share: 8.3, value: 39.86, yoy: 18.3 },
      { name: "Japan", share: 6.5, value: 30.91, yoy: 7.7 },
    ],
    focus: {
      name: "Greater China",
      value: 82.38,
      yoy: 28.0,
      historyTitle: "Share of Apple’s sales, last 5 years",
      history: [
        { year: "FY22", share: 18.8 },
        { year: "FY23", share: 18.9 },
        { year: "FY24", share: 17.1 },
        { year: "FY25", share: 15.5 },
        { year: "FY26", share: 17.2 },
      ],
      note: "Greater China covers mainland China, Hong Kong and Taiwan. Apple’s products are assembled mostly in Asia, including mainland China, so tariffs or a trade dispute can hit sales and supply at the same time.",
    },
    howToRead:
      "Each box’s area is the region’s share of FY26 sales. The pill shows growth versus FY25. Every region grew this year.",
  },
  source:
    "Source: Apple FY26 Form 10-K (year ended Sep 26, 2026): net sales by category, the segment note and the gross margin table. FY25 figures are from the same filing. Shares are calculated by Scope and rounded to one decimal, so a total can differ from 100% by 0.1.",
};
const financialHighlights: FinancialHighlightsData = {
  title: "Sales, profit and free cash flow all hit five-year highs in FY26",
  lead: "Fiscal year 2026 (ended Sep 26, 2026) compared with FY25 and the four years before it.",
  labels: ["From FY26 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Revenue": "Total sales for the year. Up 21% since FY22. iPhone added $44.5B of the extra $62.7B.",
    "Net income": "Final profit after all costs and tax: $132.2B, up from $112.0B in FY25. FY24 ($93.7B) had a one-time tax charge of $10.2B, so it looks weaker than it was.",
    "Earnings per share": "Diluted profit per share, up from $7.46. It grows faster than net income because diluted shares fell from 16.33B to 14.72B in four years.",
    "Free cash flow": "Operating cash flow ($145.1B) minus spending on equipment and buildings ($9.0B). FY25 was held down by higher cash tax payments.",
    "Operating margin": "Apple keeps about $33 of every $100 sold after running the business, before tax.",
    "Net margin": "Apple keeps $27.60 of every $100 sold as final profit.",
  }),
  howToRead:
    "The big number is FY26. The pill compares it with FY25: green is better, red is worse. The bars show five years and the colored bar is FY26.",
  source:
    "Source: Apple Form 10-K for FY26 (year ended Sep 26, 2026), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending.",
};
const valuation: ValuationData = {
  title: "Apple trades about 28% above our base-case fair value, and every multiple is above its own 5-year average",
  lead: "Is the share price high or low compared with what Apple’s future cash is worth, what it used to trade at, and what analysts expect?",
  labels: ["Market data as of Nov 6, 2026", "Scope estimate"],
  price: 342.37,
  priceDate: "Nov 6, 2026",
  fair: 267,
  field: {
    max: 450,
    rows: [
      { name: "Cash flow (DCF)", low: 162, high: 366, mark: 267, markName: "Base" },
      { name: "Own P/E history", low: 121, high: 335, mark: 225, markName: "10-yr avg" },
      { name: "Analyst targets", low: 215, high: 405, mark: 329, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the right of the dot, the price looks high by that measure.",
  },
  implied: {
    title: "To justify $342, free cash flow must grow about 14% a year for five years, about 2.7 times its pace since FY22",
    needed: 14.0,
    actual: 5.1,
    actualLabel: "Since FY22",
    text: "That is 14.0% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. Free cash flow grew 5.1% a year from FY22 to FY26, with a jump of 38% in FY26 after a dip in FY25.",
    cases: ["Bear", "Base", "Bull"],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: ["4%", "8%", "12%"] },
      { label: "Cash flow growth, years 6–10", values: ["3%", "6%", "8%"] },
      { label: "Growth after year 10", values: ["2.5%", "3%", "3.5%"] },
      { label: "Discount rate", values: ["9%", "8%", "8%"] },
    ],
    fairValues: [162, 267, 366],
    note: "About 66% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. That is why there are three cases. All three start from $136.1B of free cash flow in FY26, add $56.8B of net cash, and divide by 14.7B diluted shares.",
  },
  history: {
    title: "Apple’s P/E is higher than at any fiscal year end in ten years, and every multiple is 27% to 39% above its 5-year average",
    years: [
      { year: "’16", value: 13.5 },
      { year: "’17", value: 16.6 },
      { year: "’18", value: 18.8 },
      { year: "’19", value: 18.3 },
      { year: "’20", value: 33.9 },
      { year: "’21", value: 25.9 },
      { year: "’22", value: 24.5 },
      { year: "’23", value: 27.8 },
      { year: "’24", value: 37.3 },
      { year: "’25", value: 34.1 },
      { year: "Now", value: 38.1 },
    ],
    peAverage: 29.9,
    averagePeriod: "5-year",
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the 5-year average, taken at fiscal year ends. The bars show ten years, so you can see how rare today’s level is.",
    multiples: [
      { name: "P/E", now: 38.1, avg: 29.9 },
      { name: "Forward P/E", now: 37.3, avg: 28.4 },
      { name: "P/S", now: 10.4, avg: 7.5 },
      { name: "EV/EBITDA", now: 28.8, avg: 22.0 },
    ],
    multiplesHowToRead:
      "Each bar shows how far Apple’s multiple is from its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it.",
  },
  source:
    "Sources: share price $342.37 (Nov 6, 2026 close) and market data from Financial Modeling Prep; Apple FY26 Form 10-K (net cash, diluted shares, revenue, free cash flow and EPS); fiscal-year-end multiples from FullRatio and StockAnalysis annual ratios; analyst targets from Investing.com (range $215 to $405, average $329, mid-October 2026). Forward P/E differs between data providers. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.",
};
const profitHistory: ProfitHistoryData = {
  title: "Sales grew 5.0% a year over four years, but most of the gain came in FY26 (+15.1%)",
  lead: "Five years of results, FY2022 to FY2026: how fast Apple grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "Steady growth, with one dip in FY23 and the fastest year in FY26",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales fell 2.8% in FY23, then grew 2.0%, 6.4% and 15.1%. FY24 net income includes a one-time tax charge of $10.2B, which makes FY24 look weak and FY25 look strong. Free cash flow fell 9.2% in FY25, when cash paid for income taxes rose, then jumped 37.8% in FY26.",
  },
  margins: {
    title: "Apple keeps more of every sale: gross margin is up 5.5 points since FY22",
    howToRead:
      "Each line is one margin over five years, with the ring on FY26. The pill is the change in percentage points since FY22. Gross margin rose every year as high-margin Services grew faster than hardware. Net margin dipped in FY24 because of the one-time tax charge.",
  },
  returns: {
    title: "Apple earns far more on its money than the money costs",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    wacc: 8,
    text: `For every $100 put into the business, Apple earns about $${profitNums.returns.roic} a year after tax, up from $${profitNums.returns.roicFrom} in ${profitNums.returns.roicFromYear}.`,
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as the base case in the valuation. ROE (about 142%) looks extreme because buybacks have shrunk shareholder equity, so ROIC is the cleaner number to compare with other companies.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Apple Form 10-K for FY22 to FY26 (income statement, balance sheet and cash flow statement). Fiscal years end in late September. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};
const cashAndReturns: CashAndReturnsData = {
  companyName: "Apple",
  title: "Apple paid out about three quarters of its free cash flow in FY26",
  lead: "How much cash Apple makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: "In five years Apple returned $515B, about 93% of the $555B of free cash flow it earned",
    howToRead:
      "Each year has two bars: the free cash flow Apple earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote:
      "Free cash flow is cash from operations ($145.1B in FY26) minus spending on equipment and buildings ($9.0B), which leaves $136.1B.",
  },
  how: {
    title: "85% of what Apple returns is buybacks, so each remaining share owns more",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: "Returned in FY26", value: "$102.1B", note: "75% of free cash flow" },
      { label: "Dividend per share", value: "$1.06", note: "+3.9% vs last year" },
      { label: "Dividend yield", value: "0.3%", note: "Small, so most of the return is buybacks" },
      { label: "Payout ratio", value: "11.9%", note: "of net income, so there is room to raise it" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "Apple holds net cash of $56.8B, up from $33.7B in FY25 as debt fell $18.6B",
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote:
      "A ratio near 1 is normal for Apple: customers pay before many suppliers do, and operations bring in about $145B a year.",
    howToRead:
      "Net cash is cash and securities minus all debt. Positive means Apple could repay every loan today. The cushion rebounded in FY26 because free cash flow grew faster than the payout and Apple repaid less debt than it earned.",
  },
  source:
    "Sources: Apple Form 10-K for FY22 to FY26 (cash flow statement and balance sheet; FY26 as of Sep 26, 2026). Buybacks are the cash paid in the year, so they can differ slightly from the amount Apple reports as repurchased ($85.8B in FY26). Debt is commercial paper plus current and non-current term debt. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section.",
};
const strengthsRisks: StrengthsRisksData = {
  title: "Apple’s strengths are broad and proven, but a high price and regulation are the biggest risks, and memory costs are now squeezing margins",
  lead: "What Apple does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Apple an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Devices, chips, software and services work as one system, so customers rarely leave.", evidence: [{ value: "2.5B+", label: "active devices in use (Jan 2026), up from 2.35B a year earlier" }, { value: "$45.8B", label: "R&D in FY26, 9.6% of sales, up 32%" }], why: "Keeps customers buying Apple again and supports premium prices." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "Apple keeps more of each dollar than most hardware makers, and the share has risen every year since FY22.", evidence: [{ value: "48.8%", label: "gross margin in FY26, up from 43.3% in FY22" }, { value: "33.0%", label: "operating margin in FY26" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-star", name: "Brand power", finding: "Customers keep paying premium prices, even when the phone market shrinks.", evidence: [{ value: "+21.2%", label: "iPhone revenue growth in FY26, to $254.1B" }, { value: "22.4%", label: "share of global phone shipments in Q3 2026, in a market down 22%" }], why: "Apple can pass higher costs on to customers better than most rivals." },
    { icon: "ti-refresh", name: "Recurring revenue", finding: "A growing share of sales repeats every month or year.", evidence: [{ value: "$123.3B", label: "Services revenue in FY26, 26% of sales" }, { value: "76.2%", label: "Services gross margin in FY26" }], why: "Steadier income and higher margins than hardware." },
    { icon: "ti-flag", name: "Market position", finding: "A top player in premium phones, tablets, laptops and wearables.", evidence: [{ value: "$4.98T", label: "market cap on Nov 6, 2026" }, { value: "$478.8B", label: "revenue in FY26, more than Alphabet or Microsoft" }], why: "Scale lowers costs and attracts the best app developers." },
    { icon: "ti-coin", name: "Financial strength", finding: "Apple holds more cash than debt and produces cash every year.", evidence: [{ value: "+$56.8B", label: "net cash on Sep 26, 2026" }, { value: "$136.1B", label: "free cash flow in FY26" }], why: "Apple can fund research, buybacks and dividends without borrowing." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-trending-up", name: "Market risk", level: 3, finding: "The share price already assumes a lot of future growth.", evidence: [{ value: "38.1×", label: "P/E, against 29.9× 5-year average" }, { value: "~28%", label: "above our base-case fair value of $267" }], why: "The price leaves little room for error, so shares can fall even if the business does fine." },
    { icon: "ti-gavel", name: "Regulatory risk", level: 3, finding: "Courts and regulators are challenging App Store rules and the Google search deal.", evidence: [{ value: "€500M", label: "EU fine, with new EU terms starting in October 2026" }, { value: "26%", label: "of FY26 sales from Services, the part under review" }], why: "The DOJ lawsuit is still open, though Apple is in early settlement talks. Google may keep paying to be Safari’s default, but not exclusively, and the DOJ is appealing. Lower fees would cut profit faster than sales." },
    { icon: "ti-cpu-2", name: "Memory costs and supply", level: 2, finding: "Memory chip prices are rising, supply is tight, and tariffs still matter.", evidence: [{ value: "45% to 46%", label: "gross margin guided for the December quarter, against 47.9% last quarter" }, { value: "−22%", label: "global phone shipments in Q3 2026 (IDC), as memory runs short" }], why: "Apple said it paid significantly more for memory and expects supply limits on iPhone, Mac and iPad next quarter. Last quarter’s margin also included about 1 point of one-time tariff refunds. Apple is better placed than most rivals, so the damage is limited." },
    { icon: "ti-chart-pie", name: "Concentration risk", level: 2, finding: "One product and one region carry a lot of sales.", evidence: [{ value: "53.1%", label: "of FY26 sales from iPhone" }, { value: "17.2%", label: "of FY26 sales from Greater China, up from 15.5% in FY25" }], why: "China swung from −3.8% in FY25 to +28% in FY26, which shows how much one region can move results. A weak iPhone cycle would hit more than half of sales." },
    { icon: "ti-trending-down", name: "Growth risk", level: 2, finding: "Growth is strong now, but Apple expects it to slow.", evidence: [{ value: "+11.7%", label: "revenue growth in Q4 FY26, down from +16.4% in Q3" }, { value: "+7% to +10%", label: "guided for the December quarter" }], why: "At a P/E near 40, slower growth can pull the share price down even when sales still rise." },
    { icon: "ti-user-star", name: "Leadership change", level: 1, finding: "Apple has a new CEO for the first time in 15 years.", evidence: [{ value: "Sep 1, 2026", label: "John Ternus became CEO" }, { value: "Nov 2", label: "his first earnings report as CEO" }], why: "Ternus is a long-time Apple executive, so the strategy is likely to continue. The first quarters under a new CEO are watched closely." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Apple FY26 10-K and Q4 FY26 earnings release and call (Nov 2, 2026); Q3 FY26 10-Q (Jul 30, 2026); Apple’s Q1 FY26 earnings call (installed base); IDC smartphone data for Q3 2026; the EU Commission, the DOJ lawsuit and the Google search remedies as reported in Apple’s 10-Q and the press; Scope’s valuation. All risk ratings are Scope’s own.",
};
const moatEcosystem: MoatEcosystemData = {
  title: "Apple’s moat is wide because customers are locked in, and regulation, not rivals, is the main threat",
  lead: "Why rivals struggle to take Apple’s customers, how the loop keeps them paying, and who Apple depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Brand power", score: 9, weight: 25, test: "Can Apple charge more because of its name?", answer: "Yes. Gross margin rose every year, up 5.5 points since FY22, and Apple gained phone share while the market fell 22%.", evidence: { value: "48.8%", label: "gross margin in FY26, up from 43.3% in FY22" }, wear: "Cheaper rivals could squeeze the price gap, and rising memory costs may force price rises that test loyalty.", trend: "stable" },
    { name: "Switching costs", score: 9, weight: 30, test: "Would a customer lose something by leaving?", answer: "Yes. Photos, paid apps, messages and paired devices stay behind.", evidence: { value: "2.5B+", label: "active devices in Jan 2026, up 150 million in a year" }, wear: "Platform-opening rules make leaving easier.", trend: "eroding" },
    { name: "Intangible assets", score: 8, weight: 20, test: "Does Apple own things rivals cannot copy?", answer: "Yes. Its own chips, operating system and design are protected know-how.", evidence: { value: "$45.8B", label: "R&D spending in FY26, 9.6% of sales" }, wear: "AI could shift value to software that Apple does not control.", trend: "stable" },
    { name: "Cost advantage", score: 7, weight: 15, test: "Can Apple make or buy things cheaper than rivals?", answer: "Somewhat. Large volumes give buying power, and its own chips reduce reliance on suppliers.", evidence: { value: "33.0%", label: "operating margin in FY26" }, wear: "Memory prices, tariffs and manufacturing concentrated in one region could squeeze costs.", trend: "eroding" },
    { name: "Network effects", score: 5, weight: 10, test: "Does the product get better as more people join?", answer: "Partly. iMessage and the App Store link users and developers, but it is not a social network.", evidence: { value: "26%", label: "of FY26 sales from Services, which build on the user base" }, wear: "Rules on messaging compatibility.", trend: "stable" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. Phones and laptops are huge markets with many sellers, so market size does not protect Apple." },
  narrowing:
    "Rules that force Apple to open its platform make switching easier, and AI could shift value toward software Apple does not control.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for a consumer technology company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why one customer keeps paying",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "Buy a device", text: "The first purchase brings the customer in. Nearly half of Mac buyers in the December quarter were new to the Mac." },
      { title: "Use apps and services", text: "Apps, photos and messages build up on the device." },
      { title: "Subscribe and store data", text: "iCloud, Apple Music and Apple TV turn into monthly payments." },
      { title: "Switching feels painful", text: "Leaving means losing years of photos, paid apps, iMessage chats, the paired Watch and AirPods, and Apple Pay cards." },
      { title: "Buy the next device", text: "The customer stays and buys the next iPhone." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    title: "Who Apple relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip makers, assembly partners, display and memory makers", gives: "Parts and assembly capacity", gets: "Large, steady orders", note: "A few makers build much of the product, and few can be swapped quickly. Memory is the pinch point now." },
      { group: "Partners", level: 2, who: "Mobile carriers, payment networks, content studios", gives: "Reach and content", gets: "Shared revenue and traffic", note: "Useful but replaceable, as long as Apple keeps its own channels." },
      { group: "Distributors", level: 2, who: "Retail chains, resellers, online marketplaces", gives: "Shelf space and local reach", gets: "A margin on each sale", note: "Apple also sells directly, which limits how much it needs them." },
      { group: "Competitors", level: 2, who: "Phone makers, software platforms, search companies", gives: "Pressure on price and features", gets: "A rival to beat, sometimes a partner", note: "Some rivals also supply parts or pay for placement. Google pays Apple billions of dollars a year to be Safari’s default search, which a court still allows, though not exclusively.", rival: true },
      { group: "Developers", level: 1, who: "App makers, game studios, accessory makers", gives: "Apps that make devices more useful", gets: "Access to users and payments", note: "Each side needs the other, though regulators are changing what Apple can charge." },
      { group: "Customers", level: 1, who: "Consumers, small business, enterprise and education", gives: "Money and repeat purchases", gets: "Devices, software and services", note: "Spread across a very large base, so no single customer matters much." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings are shown.",
  },
  source:
    "Sources: Apple FY26 10-K, Q4 FY26 earnings release and call, Q3 FY26 10-Q (legal proceedings); Apple’s Q1 FY26 call (active devices, new Mac buyers); IDC Q3 2026 smartphone data; EU, US and Japan rules as reported in Apple’s filings and the press. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};
const competitors: CompetitorsData = {
  title: "Apple is the biggest and the best at turning sales into cash, but it grows slower than Alphabet and Microsoft",
  lead: "Who Apple competes with, how it compares with the two biggest platform rivals on the same basis, and where phone shares stand.",
  labels: [],
  overviewTitle: "Who Apple competes with",
  overviewIntro: "Rivals split by how they compete for Apple’s customers.",
  shares: {
    title: "Smartphone shipments, share of the market, Q3 2026",
    items: [
      { name: "Samsung", value: 22.6 },
      { name: "Apple", value: 22.4, self: true },
      { name: "Xiaomi", value: 12.0 },
      { name: "Others", value: 43.0, muted: true },
    ],
    note: "IDC, shares of units shipped, not of revenue. The market fell 22% from a year earlier, and Apple and Samsung were the only two of the top five makers to gain share.",
  },
  // Numbers for Apple, Alphabet and Microsoft come from the saved API data through shared/peers.ts.
  companies: [
    peerCompany("AAPL", { id: "aapl", kind: "self", desc: "Phones, computers, wearables and services" }),
    {
      id: "sams", name: "Samsung", ticker: "005930", kind: "direct",
      desc: "Phones, memory chips, TVs and appliances",
      chartNote: "Not in the charts: in Q2 2026 its chip division made KRW 89.2T of the KRW 89.5T operating profit while phones made a loss, so group figures say little about phone competition.",
    },
    {
      id: "xiao", name: "Xiaomi", ticker: "1810", kind: "direct",
      desc: "Phones, smart home devices and electric cars",
      chartNote: "Not in the charts: it reports in yuan with adjusted figures. First-half 2026 revenue fell 8.4%, and Q2 phone shipments fell 26.5%.",
    },
    peerCompany("GOOGL", { id: "goog", kind: "indirect", desc: "Android software, search, cloud and Pixel phones" }),
    peerCompany("MSFT", { id: "msft", kind: "indirect", desc: "PC software, cloud and business tools" }),
    {
      id: "sony", name: "Sony", ticker: "SONY", kind: "indirect",
      desc: "Consumer electronics, gaming and media",
      chartNote: "Not in the charts: it reports in yen with a March fiscal year, so it is not on the same basis.",
    },
    { id: "meta", name: "Meta", ticker: "META", kind: "future", desc: "Smart glasses and headsets" },
  ],
  compareTitle: "How Apple compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is Apple, grey bars are Alphabet and Microsoft.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat: peerCaveat(
    ["AAPL", "GOOGL", "MSFT"],
    "Alphabet’s free cash flow is low because it spent far more on equipment than the others.",
  ),
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Apple, Alphabet and Microsoft numbers from their filings, loaded from the saved API data (Financial Modeling Prep) on the same day as the rest of this page. Growth compares with the same 12 months a year earlier. Smartphone shares are IDC’s Q3 2026 estimate. Samsung and Xiaomi facts are from their Q2 2026 results.",
};
const sourcesMethod: SourcesMethodData = {
  title: "Every number on this page can be traced to a filing, a formula and a score",
  lead: "Where Scope’s data comes from, how each figure is calculated, and how far a score can be trusted.",
  labels: ["Real data", "Scope methodology"],
  traceTitle: "Trace a number",
  traceIntro: "From the filing to the conclusion, for three numbers used across this page.",
  traces: [
    {
      metric: "Operating margin, FY26",
      value: "33.0%",
      steps: [
        "Form 10-K for FY26 (year ended Sep 26, 2026)",
        "Operating income $158.1B and net sales $478.8B for the year",
        "158.1 ÷ 478.8 × 100",
        "33.0% operating margin",
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, FY26",
      value: "$136.1B",
      steps: [
        "Form 10-K for FY26, cash flow statement",
        "Operating cash flow $145.1B and capital spending $9.0B for the year",
        "145.1 − 9.0",
        "$136.1B free cash flow",
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: "38.1×",
      steps: [
        "Closing share price on Nov 6, 2026 from market data, and earnings per share from Apple’s filings",
        "Share price $342.37 and diluted earnings per share $8.98 for FY26",
        "342.37 ÷ 8.98",
        "38.1× P/E",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Apple.",
  sources: [
    { title: "SEC filings", topic: "Reported financials", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Apple, Alphabet and Microsoft. The primary source for financial figures." },
    { title: "Company investor relations", topic: "Outlook and guidance", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and guidance come from here." },
    { title: "Market data providers", topic: "Share price, market cap, estimates and price targets", text: "Share price, market cap, analyst estimates and price targets, from StockAnalysis and S&P Global Market Intelligence. Prices are closing prices, and Scope shows the date." },
    { title: "Industry research", topic: "Industry and news context", text: "Smartphone shipments and market shares from IDC, checked against Counterpoint and Omdia, which can differ by up to a point." },
  ],
  documents: [
    { name: "FY26 annual report", date: "Oct 2026", type: "10-K", source: "SEC filings", use: "Business, risks and annual financials, product and region sales" },
    { name: "Q4 FY26 earnings release", date: "Nov 2, 2026", type: "8-K", source: "SEC filings", use: "Latest quarter, guidance and margin" },
    { name: "Q3 FY26 earnings release", date: "Jul 30, 2026", type: "8-K", source: "SEC filings", use: "Headline results and product-line sales" },
    { name: "Q3 FY26 quarterly report", date: "Jul 2026", type: "10-Q", source: "SEC filings", use: "Balance sheet, nine-month cash flow and legal proceedings" },
    { name: "Q3 FY26 earnings call", date: "Jul 30, 2026", type: "Transcript", source: "Company investor relations", use: "Guidance, margin and supply comments, kept as an AI summary" },
    { name: "Alphabet and Microsoft financials", date: "Nov 2026", type: "Data feed", source: "Market data providers", use: "Rival financials, each on its own latest 12 months" },
    { name: "Analyst consensus and price targets", date: "Oct 2026", type: "Estimates", source: "Market data providers", use: "Beat and miss figures, next-report expectations and price targets" },
    { name: "Smartphone market report", date: "Oct 2026", type: "IDC", source: "Industry research", use: "Q3 2026 shipments and market shares" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: formulas({
    "Net margin": "GAAP net income. One-time items, such as the $10.2B tax charge in FY24, are noted beside the number.",
    "ROE": "Average of start and end of period. A company that buys back a lot of stock can show a very high ROE.",
    "ROIC": "Debt is interest-bearing debt. Cash is not subtracted: for Apple that would leave little invested capital and push ROIC above 400%. Other data providers define it differently, so compare ROIC only within Scope.",
    "Debt to equity": "Debt is commercial paper plus term debt. It leaves out liabilities that carry no interest, so it is not comparable with total-liabilities versions.",
    "Net cash": {
      formula: "Cash and securities − interest-bearing debt",
      note: "Positive means net cash. Rival figures from data providers may include lease obligations, so they are marked.",
    },
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
    { name: "Discounted cash flow", what: "Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($267 in the base case).", limit: "The result moves a lot when assumptions change. About two thirds of the value comes from after year 10." },
    { name: "Historical multiples", what: "Compares today’s P/E with Apple’s own range over the last ten fiscal year ends.", limit: "The past may not repeat if the business has changed, for example with more Services." },
    { name: "Analyst price targets", what: "Shows the range and average of published targets from analysts who follow Apple.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price." },
  ],
  valuationNote,
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Sep 26, 2026", label: "Latest reporting period ends" },
    { date: "Oct 2026", label: "Source date: FY26 10-K filed" },
    { date: "Nov 7, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "FY26 (ended Sep 26, 2026)", sourceDate: "Oct 2026", updated: "Nov 7, 2026", status: "Verified", limit: "GAAP basis. Annual figures come from the FY26 10-K and the data provider, and match." },
    { dataset: "Balance sheet", period: "Sep 26, 2026", sourceDate: "Oct 2026", updated: "Nov 7, 2026", status: "Verified", limit: "Quarter-end snapshot only." },
    { dataset: "Cash flow", period: "FY26 (ended Sep 26, 2026)", sourceDate: "Oct 2026", updated: "Nov 7, 2026", status: "Verified", limit: "Full-year figures. Quarterly figures are found by subtracting from the cumulative year-to-date total." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 6, 2026 close", updated: "Nov 7, 2026", status: "Verified", limit: "Closing price only, and it moves every trading day." },
    { dataset: "Analyst estimates and targets", period: "Q4 FY26 (estimate)", sourceDate: "Oct 2026", updated: "Oct 25, 2026", status: "Pending", limit: "Consensus differs between providers and changes before earnings. Shown only as analyst view." },
    { dataset: "Smartphone market shares", period: "Q3 2026 (Jul to Sep)", sourceDate: "Oct 2026", updated: "Oct 25, 2026", status: "Verified", limit: "Units shipped, not revenue. IDC, Counterpoint and Omdia differ by up to a point." },
    { dataset: "Rival financials", period: "Each company’s latest 12 months", sourceDate: "Oct to Nov 2026", updated: "Nov 2026", status: "Verified", limit: "Each rival is on its own latest 12 months and latest fiscal year-end balance sheet, so the dates differ slightly. The exact dates are in the note under the Competitors charts. Samsung, Xiaomi and Sony are not on the same basis." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Apple does not report customer counts, so Scope shows active devices (2.5 billion) and Services share instead." },
  ],
  source:
    "Sources: Apple, Alphabet and Microsoft filings and earnings materials, StockAnalysis (S&P Global) market data and IDC smartphone data, as of Nov 7, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};
const bottomLine: BottomLineData = {
  title: "A very strong business, bought at a high price",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for quality and profit, held back by a price above our fair value and slower long-term growth.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Excellent", tone: "positive", text: "Top grades for quality and profit: 72% return on invested capital, a 33% operating margin and a wide moat. Growth and risk are only fair.", href: "#moat", hrefLabel: "See the moat" },
    { icon: "ti-tag", label: "The price", verdict: "Expensive", tone: "negative", text: "A P/E of 38.1× against 29.9× on average, and about 28% above our base-case fair value of $267.", href: "#valuation", hrefLabel: "See the valuation" },
    { icon: "ti-trending-down", label: "What to watch", verdict: "Growth to slow", tone: "caution", text: "Apple guides growth down to 7% to 10% and gross margin to 45% to 46% for the December quarter. The report around Feb 4, 2027 is the next check.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price.",
};
const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what Apple earns, what protects it and what it costs. Keep building the picture.",
  // TODO: change the company hrefs to the real company page route.
  companies: [
    { name: "Alphabet", ticker: "GOOGL", reason: "Apple’s rival and partner: it pays Apple billions to be Safari’s default search.", href: "/company/google" },
    { name: "NVIDIA", ticker: "NVDA", reason: "The chip maker at the center of the AI boom, the shift that may reshape tech.", href: "/company/nvidia" },
    { name: "Amazon", ticker: "AMZN", reason: "Another giant platform that keeps its customers inside its own ecosystem.", href: "/company/amazon" },
  ],
  ...closingShared,
};
const spotlight: SpotlightData = {
  title:
    "Services are 26% of Apple’s sales but 40% of its gross profit, and regulators are now looking at the fees behind it",
  lead:
    "Apple sells a phone once, then earns from the same customer again and again through the App Store, iCloud, AppleCare, Music and advertising. Each dollar of Services keeps far more profit than a dollar of hardware, which is why Apple’s margin has risen every year since FY22. It is also the part that courts and regulators are challenging.",
  labels: [],
  chart: {
    kind: "profit-vs-sales",
    title: "Where Apple’s sales and gross profit come from, FY26",
    howToRead:
      "Each bar adds up to 100%. The top bar splits sales between Products and Services, and the bottom bar splits gross profit (sales minus the direct cost of making them). Apple does not report iPhone’s margin on its own, so Products are shown as one group.",
    aName: "Products",
    bName: "Services",
    rows: [
      { label: "Share of sales", a: 74.2, b: 25.8 },
      { label: "Share of gross profit", a: 59.8, b: 40.2 },
    ],
    marginA: 39.3,
    marginB: 76.2,
    aColor: "#15803D",
    bColor: "#2563EB",
    callout: "On 25.8% of sales, Services earns 40.2% of Apple’s gross profit.",
  },
  numbers: [
    { value: "40.2%", label: "of gross profit comes from Services, on 25.8% of sales", tone: "positive" },
    { value: "76.2%", label: "Services gross margin in FY26, against 39.3% for Products", tone: "positive" },
    { value: "2.5B+", label: "active devices in use (Jan 2026), up from 2.35B a year earlier", tone: "neutral" },
    { value: "€500M", label: "EU fine, with new EU terms starting in October 2026", tone: "negative" },
  ],
  wins: [
    {
      title: "The customer base keeps growing",
      detail:
        "Active devices passed 2.5B in January 2026, up from 2.35B a year earlier, so the base that Services sells to keeps getting bigger.",
    },
    {
      title: "Each Services dollar lifts the margin",
      detail:
        "Apple keeps $76.20 of every $100 of Services sales against $39.30 for Products, so every new Services record lifts the whole company’s margin.",
    },
  ],
  breaks: [
    {
      title: "App Store fees are under challenge",
      detail:
        "Courts and regulators are challenging App Store rules, and the EU has fined Apple €500M. Lower fees would cut profit faster than sales.",
    },
    {
      title: "Google’s payment is no longer secure",
      detail:
        "Google pays Apple billions of dollars a year to be Safari’s default search. A court still allows it, but not exclusively, and the DOJ is appealing.",
    },
  ],
  watch: {
    title: "Next report: does Services keep growing near 9%?",
    text:
      "Services grew 9.8% in the September quarter, down from 12.1% in the quarter before, and Apple guides 8% to 9% for the December quarter, with headwinds from third-party licensing and currency. The report expected around Feb 4, 2027 (date not yet confirmed) shows whether the pace holds.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: Apple FY26 Form 10-K (year ended Sep 26, 2026): net sales by category, the segment note and the gross margin table; Apple Q4 FY26 earnings release and call (Nov 2, 2026); Apple’s Q1 FY26 earnings call (active devices); the EU Commission and the DOJ lawsuit as reported in Apple’s filings and the press. Shares are calculated by Scope and rounded to one decimal.",
};
export const applePage: CompanyPageData = {
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