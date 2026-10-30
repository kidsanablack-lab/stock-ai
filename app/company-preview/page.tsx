import type { Metadata } from "next";
import CompanyHero, { type CompanyHeroData } from "@/components/company-next/CompanyHero";
import CompanySummary, { type CompanySummaryData } from "@/components/company-next/CompanySummary";
import ScoreReasons, { type ScoreReasonsData } from "@/components/company-next/ScoreReasons";
import WhatChanged, { type WhatChangedData } from "@/components/company-next/WhatChanged";
import SignalsToWatch, { type SignalsToWatchData } from "@/components/company-next/SignalsToWatch";
import WhereMoneyComes, { type WhereMoneyComesData } from "@/components/company-next/WhereMoneyComes";
import FinancialHighlights, { type FinancialHighlightsData } from "@/components/company-next/FinancialHighlights";
import Valuation, { type ValuationData } from "@/components/company-next/Valuation";
import ProfitHistory, { type ProfitHistoryData } from "@/components/company-next/ProfitHistory";
import CashAndReturns, { type CashAndReturnsData } from "@/components/company-next/CashAndReturns";
import StrengthsRisks, { type StrengthsRisksData } from "@/components/company-next/StrengthsRisks";
import MoatEcosystem, { type MoatEcosystemData } from "@/components/company-next/MoatEcosystem";
import Competitors, { type CompetitorsData } from "@/components/company-next/Competitors";
import SourcesMethod, { type SourcesMethodData } from "@/components/company-next/SourcesMethod";
import ClosingPanel, { type ClosingPanelData } from "@/components/company-next/ClosingPanel";
export const metadata: Metadata = {
  title: "Company page preview",
  robots: { index: false, follow: false },
};

// Example data: only for reviewing the look. Replace with real data later.
const sample: CompanyHeroData = {
  name: "Apple Inc.",
  ticker: "AAPL",
  sector: "Technology",
  logo: "/logos/apple-logo-svgrepo-com.svg",
  description:
    "A global technology company that combines premium devices, software and digital services into one tightly connected ecosystem.",
  score: 7.5,
  scoreLabel: "Strong",
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$5.07T", note: "As of Oct 23, 2026" },
    { label: "Revenue, last 12 months", value: "$466.8B", note: "+14.2% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "39.9×", note: "vs 29.9× 5-year average", noteTone: "negative" },
    { label: "Free cash flow, last 12 months", value: "$136.7B", note: "29.3% of sales", noteTone: "positive" },
  ],
  source:
    "Financials from SEC filings (Q3 FY26 10-Q for the quarter ended Jun 27, 2026, and the FY25 10-K). Market data as of Oct 23, 2026. Next report: Nov 2, 2026.",
};

const summary: CompanySummaryData = {
  title: "Apple in 30 seconds",
  label: "AI summary",
  text: "Apple earns about half of its sales from the iPhone, then adds high-margin recurring revenue from Services, which reached 26% of sales in FY25. Its own chips, software and stores tie everything together, so customers keep buying more Apple products over time.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "26%",
    caption: "from Services, FY25",
    segments: [
      { label: "iPhone · about half", share: 50.4 },
      { label: "Services", share: 26.2 },
      { label: "Other", share: 23.4 },
    ],
  },
};
const scoreReasons: ScoreReasonsData = {
  title: "Why the Scope Score is 7.5",
  takeaway:
    "Apple scores top marks for profit, scale and business quality. Its high price is the main thing holding the score back, and growth and risk are only fair.",
  reasons: [
    { name: "Quality", grade: "A", value: "67%", label: "return on invested capital in FY25, with steady margins and cash profit above 100% of net income", href: "#history", score: 8.9, weight: 20 },
    { name: "Scale", grade: "A+", value: "$5.07T", label: "market cap, with $467B of revenue in the last 12 months", href: "#competitors", score: 10.0, weight: 10 },
    { name: "Profitability", grade: "A+", value: "33.2%", label: "operating margin in the last 12 months, and 29% of sales kept as free cash flow", href: "#highlights", score: 9.8, weight: 20 },
    { name: "Revenue growth", grade: "C+", value: "+14.2%", label: "growth in the last 12 months, but only 3.3% a year from FY21 to FY25", href: "#latest", score: 6.6, weight: 20 },
    { name: "Risk", grade: "C+", value: "49.6%", label: "of sales from iPhone, offset by net cash of $62.2B", href: "#strengths-risks", score: 6.7, weight: 15 },
    { name: "Valuation", grade: "D", value: "39.9×", label: "P/E, against its own 5-year average of 29.9×", href: "#valuation", score: 3.1, weight: 15 },
  ],
  howToRead:
    "A is the strongest grade and F the weakest. Green means strong, amber mixed, red weak. Each grade comes from a 0 to 10 category score, and the overall score is their weighted average. The inputs, weights and cut-offs are listed under Sources and method.",
};
const whatChanged: WhatChangedData = {
  title: "Sales grew 16% and profit 27%, but tariff refunds flattered the margin and growth is guided to slow",
  lead: "What changed since the last report: Q3 FY26, the quarter ended Jun 27, 2026 (reported Jul 30). The next report, Q4 FY26, is due on Nov 2, 2026.",
  metrics: [
    { label: "Revenue", value: "$109.4B", change: "+16.4% vs a year ago", tone: "positive", series: [94.036, 102.466, 143.756, 111.184, 109.417], note: "iPhone and Services made up 84% of the extra $15.4B." },
    { label: "Net income", value: "$29.8B", change: "+27.1% vs a year ago", tone: "positive", series: [23.434, 27.466, 42.097, 29.578, 29.789], note: "Profit grew faster than sales. Tariff refunds added about $0.11 per share." },
    { label: "Gross margin", value: "50.1%", change: "+3.6 pts vs a year ago", tone: "positive", series: [46.5, 47.2, 48.2, 49.3, 50.1], note: "A record, but about 2 points came from tariff refunds. Without them it was 48.1%." },
    { label: "Free cash flow", value: "$31.9B", change: "+30.8% vs a year ago", tone: "positive", series: [24.405, 26.486, 51.552, 26.731, 31.914], note: "Operating cash flow of $34.4B, a June-quarter record, minus $2.5B of capital spending." },
  ],
  growth: {
    bars: [
      { quarter: "Q4", fy: "FY24", value: 94.93, yoy: 6.1 },
      { quarter: "Q1", fy: "FY25", value: 124.3, yoy: 4.0 },
      { quarter: "Q2", fy: "FY25", value: 95.359, yoy: 5.1 },
      { quarter: "Q3", fy: "FY25", value: 94.036, yoy: 9.6 },
      { quarter: "Q4", fy: "FY25", value: 102.466, yoy: 7.9 },
      { quarter: "Q1", fy: "FY26", value: 143.756, yoy: 15.7 },
      { quarter: "Q2", fy: "FY26", value: 111.184, yoy: 16.6 },
      { quarter: "Q3", fy: "FY26", value: 109.417, yoy: 16.4 },
    ],
    verdictLabel: "Fast and steady",
    before: "11.8%",
    after: "16.5%",
    verdict: "Sales growth stepped up to about 16% in the December quarter and has held there for three quarters.",
    watch: "Next is the September quarter. Apple guides 9% to 11% growth, or $111.7B to $113.7B, against $102.5B a year ago, so growth is expected to slow.",
  },
  estimates: [
    { label: "Revenue", unit: "B", actual: 109.417, estimate: 108.86 },
    { label: "EPS (earnings per share)", unit: "$", actual: 2.02, estimate: 1.89 },
    { label: "iPhone revenue", unit: "B", actual: 54.252, estimate: 53.86 },
    { label: "Mac revenue", unit: "B", actual: 10.352, estimate: 8.74 },
    { label: "Services revenue", unit: "B", actual: 30.739, estimate: 31.22 },
    { label: "Greater China revenue", unit: "B", actual: 18.816, estimate: 19.6 },
  ],
  good: [
    { title: "iPhone had a June-quarter record", detail: "$44.6B → $54.3B (+22%)", meaning: "iPhone is about half of Apple’s sales, so its growth sets the pace for the whole company. Every region grew by double digits." },
    { title: "Mac grew the fastest", detail: "$8.0B → $10.4B (+29%)", meaning: "Its best June quarter ever, and about $1.6B above what analysts expected." },
    { title: "Cash flow set a June-quarter record", detail: "Operating cash flow $27.9B → $34.4B (+23%)", meaning: "More cash from the business pays for buybacks and dividends without borrowing. Free cash flow was $31.9B." },
  ],
  watch: [
    { title: "Margin was flattered, and memory costs are rising", detail: "50.1% now → 47% to 48% guided", meaning: "Without tariff refunds, gross margin was 48.1%. Apple paid significantly more for memory this quarter and expects to pay more next quarter." },
    { title: "Growth is guided to slow", detail: "+16% → +9% to +11%", meaning: "Supply constraints on iPhone, Mac and iPad and currency swings hold back sales. Analysts had expected about 12%, and the shares fell after hours." },
    { title: "Services and Greater China missed estimates", detail: "Services $30.7B vs $31.2B · China $18.8B vs $19.6B", meaning: "Both still grew by double digits, but Services slipped from $31.0B in the March quarter." },
  ],
  source:
    "Sources: Apple Q3 FY26 earnings release and Form 10-Q (quarter ended Jun 27, 2026), Q3 FY26 earnings call (Jul 30, 2026), and earlier quarterly releases. Analyst estimates are consensus figures from press reports and differ slightly between data providers. Free cash flow is operating cash flow minus capital spending, calculated by Scope. Growth rates are calculated from reported net sales.",
};
const signalsToWatch: SignalsToWatchData = {
  title: "Next report: growth has to hold near 10% and the margin has to absorb rising memory costs",
  lead: "Five numbers will show whether Apple’s September quarter is good or not. Each one shows where last quarter, a year ago and analysts sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Monday, Nov 2, 2026",
    note: "Q4 FY26, the September quarter and the first with John Ternus as CEO. Results come out around 1:30 p.m. PT, with the call at 2:00 p.m. PT.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter, the ring is what analysts expect, and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around Apple’s guidance where it gave one.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth hold near 10% against last year’s $102.5B September quarter?",
      guidance: "9% to 11% growth, or $111.7B to $113.7B",
      format: "signedPercent",
      range: [0, 20],
      weakBelow: 9,
      strongFrom: 11,
      yearAgo: 7.9,
      lastQuarter: 16.4,
      estimate: 10.8,
    },
    {
      name: "Gross margin",
      question: "Do rising memory costs pull the margin down to the guided range, and how much do tariff refunds still add?",
      guidance: "47% to 48%, including about 1 point from tariff refunds",
      format: "percent",
      range: [45, 51],
      weakBelow: 47,
      strongFrom: 48,
      yearAgo: 47.2,
      lastQuarter: 50.1,
    },
    {
      name: "iPhone revenue growth",
      question: "Does iPhone keep growing by double digits while supply is tight?",
      guidance: "growth in the mid-teens",
      format: "signedPercent",
      range: [0, 25],
      weakBelow: 12,
      strongFrom: 15,
      yearAgo: 6.1,
      lastQuarter: 21.7,
    },
    {
      name: "Services revenue growth",
      question: "Does Services hold its pace of about 12% after missing estimates last quarter?",
      guidance: "growth similar to June’s 12%, before about 2.5 points of currency headwind",
      format: "signedPercent",
      range: [6, 18],
      weakBelow: 9,
      strongFrom: 12,
      yearAgo: 15.1,
      lastQuarter: 12.1,
    },
    {
      name: "Greater China sales growth",
      question: "Does China keep growing after a 22% jump, or fall back?",
      format: "signedPercent",
      range: [-10, 30],
      weakBelow: 10,
      strongFrom: 20,
      yearAgo: -3.6,
      lastQuarter: 22.4,
    },
  ],
  source:
    "Sources: Apple Q3 FY26 earnings release and call (Jul 30, 2026), Apple’s announcement of the Nov 2 report date, and Q4 FY25 results for the year-ago figures. Revenue growth expected by analysts is calculated from consensus revenue of about $113.5B; no reliable consensus was found for the other signals. Red and green zones are Scope’s own thresholds and are not a forecast.",
};
const whereMoneyComes: WhereMoneyComesData = {
  title: "Half of sales come from iPhone, but Services keeps far more profit from each dollar",
  lead: "$416.2B of revenue in FY25 (year ended Sep 27, 2025), split by product line, by profit and by region.",
  labels: ["From FY25 10-K"],
  products: [
    { name: "iPhone", share: 50.4, value: 209.59, yoy: 4.2, note: "All iPhone models" },
    { name: "Services", share: 26.2, value: 109.16, yoy: 13.5, note: "App Store, iCloud, advertising, AppleCare, Apple Pay, Music" },
    { name: "Wearables, Home & Accessories", share: 8.6, value: 35.69, yoy: -3.6, note: "AirPods, Apple Watch, Apple TV, HomePod" },
    { name: "Mac", share: 8.1, value: 33.71, yoy: 12.4, note: "MacBook, iMac, Mac mini, Mac Studio" },
    { name: "iPad", share: 6.7, value: 28.02, yoy: 5.0, note: "iPad, iPad Air, iPad Pro, iPad mini" },
  ],
  donutHowToRead:
    "Each slice is a product line, sized by its share of Apple’s sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus FY24.",
  profit: {
    title: "Services is 26% of sales but 42% of gross profit",
    explain:
      "Gross profit is revenue minus the direct cost of making it. Apple keeps $75.40 of every $100 of Services sales but only $36.80 of every $100 of Products sales, because software and subscriptions cost far less to deliver than phones. Apple does not report iPhone’s margin on its own, so Products are shown as one group.",
    revenueTotal: "$416.2B",
    profitTotal: "$195.2B",
    productsRevenue: 73.8,
    servicesRevenue: 26.2,
    productsProfit: 57.8,
    servicesProfit: 42.2,
    productsMargin: "36.8%",
    servicesMargin: "75.4%",
    servicesHistoryTitle: "Services share of Apple’s sales, last 5 years",
    servicesHistory: [
      { year: "FY21", share: 18.7 },
      { year: "FY22", share: 19.8 },
      { year: "FY23", share: 22.2 },
      { year: "FY24", share: 24.6 },
      { year: "FY25", share: 26.2 },
    ],
  },
  regions: {
    title: "Almost 70% of sales come from the Americas and Europe, and Greater China is the only region that shrank",
    lead: "Where the revenue was earned in FY25, and how each region changed versus FY24.",
    items: [
      { name: "Americas", share: 42.9, value: 178.35, yoy: 6.8 },
      { name: "Europe", share: 26.7, value: 111.03, yoy: 9.6 },
      { name: "Greater China", share: 15.5, value: 64.38, yoy: -3.8 },
      { name: "Rest of Asia Pacific", share: 8.1, value: 33.7, yoy: 9.9 },
      { name: "Japan", share: 6.9, value: 28.7, yoy: 14.6 },
    ],
    focus: {
      name: "Greater China",
      value: 64.38,
      yoy: -3.8,
      historyTitle: "Share of Apple’s sales, last 5 years",
      history: [
        { year: "FY21", share: 18.7 },
        { year: "FY22", share: 18.8 },
        { year: "FY23", share: 18.9 },
        { year: "FY24", share: 17.1 },
        { year: "FY25", share: 15.5 },
      ],
      note: "Greater China covers mainland China, Hong Kong and Taiwan. Apple’s products are assembled mostly in Asia, including mainland China, so tariffs or a trade dispute can hit sales and supply at the same time.",
    },
    howToRead:
  "Each box’s area is the region’s share of FY25 sales. Red is the region that shrank. The pill shows growth versus FY24.",
  },
  source:
    "Source: Apple FY25 Form 10-K (year ended Sep 27, 2025, filed Oct 31, 2025): net sales by category, the segment note and the gross margin table. Shares are calculated by Scope and rounded to one decimal, so a total can differ from 100% by 0.1.",
};
const financialHighlights: FinancialHighlightsData = {
  title: "Sales and profit are at five-year highs, but free cash flow slipped",
  lead: "Fiscal year 2025 (ended Sep 27, 2025) compared with FY24 and the four years before it.",
  labels: ["From FY25 10-K"],
  metrics: [
    { label: "Revenue", value: "$416.2B", change: "+6.4% vs FY24", tone: "positive", series: [365.817, 394.328, 383.285, 391.035, 416.161], note: "Total sales for the year. Up 13.8% since FY21.", unit: "B" },
    { label: "Net income", value: "$112.0B", change: "+19.5% vs FY24", tone: "positive", series: [94.68, 99.803, 96.995, 93.736, 112.01], note: "Final profit after all costs and tax. FY24 had a one-time tax charge of $10.2B. Without it, FY24 would be $104.0B and growth about 7.7%.", unit: "B" },
    { label: "Earnings per share", value: "$7.46", change: "+22.7% vs FY24", tone: "positive", series: [5.61, 6.11, 6.13, 6.08, 7.46], note: "Diluted profit per share. It grows faster than net income because Apple keeps buying back shares.", unit: "$" },
    { label: "Free cash flow", value: "$98.8B", change: "−9.2% vs FY24", tone: "negative", series: [92.953, 111.443, 99.584, 108.807, 98.767], note: "Operating cash flow ($111.5B) minus spending on equipment and buildings ($12.7B). Cash paid for income taxes rose from $26.1B to $43.4B.", unit: "B" },
    { label: "Operating margin", value: "32.0%", change: "+0.5 pts vs FY24", tone: "positive", series: [29.8, 30.3, 29.8, 31.5, 32.0], note: "Apple keeps about $32 of every $100 sold after running the business, before tax.", unit: "%" },
    { label: "Net margin", value: "26.9%", change: "+2.9 pts vs FY24", tone: "positive", series: [25.9, 25.3, 25.3, 24.0, 26.9], note: "Apple keeps $26.90 of every $100 sold as final profit. FY24 was held down by the one-time tax charge.", unit: "%" },
  ],
  howToRead:
    "The big number is FY25. The pill compares it with FY24: green is better, red is worse. The bars show five years and the colored bar is FY25.",
  source:
    "Source: Apple Form 10-K for FY25 (filed Oct 31, 2025), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending.",
};
const valuation: ValuationData = {
  title: "Apple trades about 29% above our base-case fair value, and every multiple is above its own 5-year average",
  lead: "Is the share price high or low compared with what Apple’s future cash is worth, what it used to trade at, and what analysts expect?",
  labels: ["Market data as of Oct 23, 2026", "Scope estimate"],
  price: 347.73,
  priceDate: "Oct 23, 2026",
  fair: 269,
  field: {
    max: 450,
    rows: [
      { name: "Cash flow (DCF)", low: 163, high: 368, mark: 269, markName: "Base" },
      { name: "Own P/E history", low: 118, high: 325, mark: 219, markName: "10-yr avg" },
      { name: "Analyst targets", low: 215, high: 405, mark: 329, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the right of the dot, the price looks high by that measure.",
  },
  implied: {
    title: "To justify $348, free cash flow must grow about 14% a year for five years, about 1.7 times its pace since FY21",
    needed: 14.2,
    actual: 8.5,
    actualLabel: "Since FY21",
    text: "That is 14.2% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. Free cash flow grew 8.5% a year from FY21 to the last twelve months, helped by lower cash tax payments in FY26.",
    cases: ["Bear", "Base", "Bull"],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: ["4%", "8%", "12%"] },
      { label: "Cash flow growth, years 6–10", values: ["3%", "6%", "8%"] },
      { label: "Growth after year 10", values: ["2.5%", "3%", "3.5%"] },
      { label: "Discount rate", values: ["9%", "8%", "8%"] },
    ],
    fairValues: [163, 269, 368],
    note: "About 66% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. That is why there are three cases. All three start from $136.7B of free cash flow in the last twelve months, add $62.2B of net cash, and divide by 14.7B diluted shares.",
  },
  history: {
    title: "Apple’s P/E is higher than at any fiscal year end in ten years, and every multiple is 33% to 45% above its 5-year average",
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
      { year: "Now", value: 39.9 },
    ],
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the average of the ten fiscal year ends before it.",
    multiples: [
      { name: "P/E", now: 39.9, avg: 29.9 },
      { name: "Forward P/E", now: 37.9, avg: 28.4 },
      { name: "P/S", now: 10.9, avg: 7.5 },
      { name: "EV/EBITDA", now: 29.8, avg: 22.0 },
    ],
    multiplesHowToRead:
  "Each bar shows how far Apple’s multiple is above its own 5-year average, taken at fiscal year ends. A full bar means +50% or more.",
  },
  source:
    "Sources: share price $347.73 (Oct 23, 2026 close) and market data from StockAnalysis; Apple Q3 FY26 earnings release and 10-Q (net cash, diluted shares, last-twelve-month revenue, EBITDA and EPS); fiscal-year-end multiples from FullRatio and StockAnalysis annual ratios; analyst targets from Investing.com (range $215 to $405, average $329, mid-October 2026). Forward P/E differs between data providers. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.",
};
const profitHistory: ProfitHistoryData = {
  title: "Sales grew 3.3% a year and profit 4.3%, but free cash flow grew only 1.5%",
  lead: "Five years of results, FY2021 to FY2025: how fast Apple grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: ["FY21", "FY22", "FY23", "FY24", "FY25"],
  revenue: [365.817, 394.328, 383.285, 391.035, 416.161],
  grossProfit: [152.836, 170.782, 169.148, 180.683, 195.201],
  operatingIncome: [108.949, 119.437, 114.301, 123.216, 133.05],
  netIncome: [94.68, 99.803, 96.995, 93.736, 112.01],
  fcf: [92.953, 111.443, 99.584, 108.807, 98.767],
  growth: {
    title: "Slow but steady growth, with one dip in FY23",
    howToRead:
  "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales fell 2.8% in FY23 and then recovered. FY24 net income includes a one-time tax charge of $10.2B, which makes FY24 look weak and FY25 look strong. Free cash flow grew the slowest: it fell 9.2% in FY25, and cash paid for income taxes rose from $26.1B to $43.4B.",
  },
  margins: {
    title: "Apple keeps more of every sale: gross margin is up 5.1 points since FY21",
    howToRead:
      "Each line is one margin over five years, with the ring on FY25. The pill is the change in percentage points since FY21. Gross margin rose every year as high-margin Services grew faster than hardware. Net margin dipped in FY24 because of the one-time tax charge.",
  },
  returns: {
    title: "Apple earns far more on its money than the money costs",
    roic: 67,
    roicFrom: 52,
    wacc: 8,
    text: "For every $100 put into the business, Apple earns about $67 a year after tax, up from $52 in FY21.",
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as the base case in the valuation. ROE (171%) looks extreme because buybacks have shrunk shareholder equity, so ROIC is the cleaner number to compare with other companies. ROA is 31%.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Apple Form 10-K for FY21 to FY25 (income statement, balance sheet and cash flow statement). Fiscal years end in late September. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};
const cashAndReturns: CashAndReturnsData = {
  title: "Apple pays out about all the cash it earns, so its cash cushion has halved",
  lead: "How much cash Apple makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: ["FY21", "FY22", "FY23", "FY24", "FY25"],
  fcf: [92.953, 111.443, 99.584, 108.807, 98.767],
  dividends: [14.467, 14.841, 15.025, 15.234, 15.421],
  buybacks: [85.971, 89.402, 77.55, 94.949, 90.711],
  returned: {
    title: "In five years Apple returned $514B, about as much as the $512B of free cash flow it earned",
    howToRead:
  "Each year has two bars: the free cash flow Apple earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote:
      "Free cash flow is cash from operations ($111.5B in FY25) minus spending on equipment and buildings ($12.7B), which leaves $98.8B.",
  },
  how: {
    title: "85% of what Apple returns is buybacks, so each remaining share owns more",
    sharesTitle: "Diluted shares (billions)",
    shares: [16.865, 16.326, 15.813, 15.408, 15.005],
    stats: [
      { label: "Returned in FY25", value: "$106.1B", note: "107% of free cash flow" },
      { label: "Dividend per share", value: "$1.02", note: "+4.1% vs last year" },
      { label: "Dividend yield", value: "0.3%", note: "Small, so most of the return is buybacks" },
      { label: "Payout ratio", value: "13.8%", note: "of net income, so there is room to raise it" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "Apple still holds more cash than debt, but the cushion has halved since FY21",
    cash: [190.516, 169.109, 162.099, 156.65, 132.42],
    debt: [124.719, 120.069, 111.088, 106.629, 98.657],
    equity: [63.09, 50.672, 62.146, 56.95, 73.733],
    currentAssets: 147.957,
    currentLiabilities: 165.631,
    currentRatioNote:
      "Below 1 is normal for Apple: customers pay before many suppliers do, and operations bring in about $111B a year.",
    howToRead:
      "Net cash is cash and securities minus all debt. Positive means Apple could repay every loan today. The cushion is falling because Apple pays out about all it earns and also repays debt.",
  },
  source:
    "Sources: Apple Form 10-K for FY21 to FY25 (cash flow statement and balance sheet; FY25 as of Sep 27, 2025). Buybacks are the cash paid in the year, so they can differ slightly from the amount Apple reports as repurchased ($89.3B in FY25). Debt is commercial paper plus current and non-current term debt. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section.",
};
const strengthsRisks: StrengthsRisksData = {
  title: "Apple’s strengths are broad and proven, but a high price and regulation are the biggest risks, and memory costs are now squeezing margins",
  lead: "What Apple does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Apple an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Devices, chips, software and services work as one system, so customers rarely leave.", evidence: [{ value: "2.5B+", label: "active devices in use (Jan 2026), up from 2.35B a year earlier" }, { value: "$34.6B", label: "R&D in FY25, 8.3% of sales" }], why: "Keeps customers buying Apple again and supports premium prices." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "Apple keeps more of each dollar than most hardware makers, and the share has risen every year since FY21.", evidence: [{ value: "46.9%", label: "gross margin in FY25, up from 41.8% in FY21" }, { value: "33.2%", label: "operating margin, last 12 months" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-star", name: "Brand power", finding: "Customers keep paying premium prices, even when the phone market shrinks.", evidence: [{ value: "+21.7%", label: "iPhone revenue growth in Q3 FY26 (Apr to Jun)" }, { value: "22.4%", label: "share of global phone shipments in Q3 2026, in a market down 22%" }], why: "Apple can pass higher costs on to customers better than most rivals." },
    { icon: "ti-refresh", name: "Recurring revenue", finding: "A growing share of sales repeats every month or year.", evidence: [{ value: "$109.2B", label: "Services revenue in FY25, 26% of sales" }, { value: "75.4%", label: "Services gross margin in FY25" }], why: "Steadier income and higher margins than hardware." },
    { icon: "ti-flag", name: "Market position", finding: "A top player in premium phones, tablets, laptops and wearables.", evidence: [{ value: "$5.07T", label: "market cap on Oct 23, 2026" }, { value: "$466.8B", label: "revenue in the last 12 months, more than Alphabet or Microsoft" }], why: "Scale lowers costs and attracts the best app developers." },
    { icon: "ti-coin", name: "Financial strength", finding: "Apple holds more cash than debt and produces cash every year.", evidence: [{ value: "+$62.2B", label: "net cash on Jun 27, 2026" }, { value: "$136.7B", label: "free cash flow, last 12 months" }], why: "Apple can fund research, buybacks and dividends without borrowing." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-trending-up", name: "Market risk", level: 3, finding: "The share price already assumes a lot of future growth.", evidence: [{ value: "39.9×", label: "P/E, against 29.9× 5-year average" }, { value: "~29%", label: "above our base-case fair value of $269" }], why: "The price leaves little room for error, so shares can fall even if the business does fine." },
    { icon: "ti-gavel", name: "Regulatory risk", level: 3, finding: "Courts and regulators are challenging App Store rules and the Google search deal.", evidence: [{ value: "€500M", label: "EU fine, with new EU terms starting in October 2026" }, { value: "26%", label: "of FY25 sales from Services, the part under review" }], why: "The DOJ lawsuit is still open, though Apple is in early settlement talks. Google may keep paying to be Safari’s default, but not exclusively, and the DOJ is appealing. Lower fees would cut profit faster than sales." },
    { icon: "ti-cpu-2", name: "Memory costs and supply", level: 2, finding: "Memory chip prices are rising, supply is tight, and tariffs still matter.", evidence: [{ value: "47% to 48%", label: "gross margin guided for the September quarter, against 50.1% last quarter" }, { value: "−22%", label: "global phone shipments in Q3 2026 (IDC), as memory runs short" }], why: "Apple said it paid significantly more for memory and expects supply limits on iPhone, Mac and iPad next quarter. Last quarter’s margin also included about 2 points of one-time tariff refunds. Apple is better placed than most rivals, so the damage is limited." },
    { icon: "ti-chart-pie", name: "Concentration risk", level: 2, finding: "One product and one region carry a lot of sales.", evidence: [{ value: "49.6%", label: "of Q3 FY26 sales from iPhone" }, { value: "17.2%", label: "of Q3 FY26 sales from Greater China, up from 15.5% in FY25" }], why: "China swung from −3.8% in FY25 to +22% last quarter, which shows how much one region can move results. A weak iPhone cycle would hit half of sales." },
    { icon: "ti-trending-down", name: "Growth risk", level: 2, finding: "Growth is strong now, but Apple expects it to slow.", evidence: [{ value: "+16.4%", label: "revenue growth in Q3 FY26" }, { value: "+9% to +11%", label: "guided for the September quarter" }], why: "At a P/E near 40, slower growth can pull the share price down even when sales still rise." },
    
    { icon: "ti-user-star", name: "Leadership change", level: 1, finding: "Apple has a new CEO for the first time in 15 years.", evidence: [{ value: "Sep 1, 2026", label: "John Ternus became CEO" }, { value: "Nov 2", label: "his first earnings report as CEO" }], why: "Ternus is a long-time Apple executive, so the strategy is likely to continue. The first quarters under a new CEO are watched closely." },
    
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Apple FY25 10-K and Q3 FY26 earnings release, 10-Q and call (Jul 30, 2026); Apple’s Q1 FY26 earnings call (installed base); IDC smartphone data for Q3 2026; the EU Commission, the DOJ lawsuit and the Google search remedies as reported in Apple’s 10-Q and the press; Scope’s valuation. All risk ratings are Scope’s own.",
};
const moatEcosystem: MoatEcosystemData = {
  title: "Apple’s moat is wide because customers are locked in, and regulation, not rivals, is the main threat",
  lead: "Why rivals struggle to take Apple’s customers, how the loop keeps them paying, and who Apple depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Brand power", score: 9, weight: 25, test: "Can Apple charge more because of its name?", answer: "Yes. Gross margin rose every year, up 5.1 points since FY21, and Apple gained phone share while the market fell 22%.", evidence: { value: "46.9%", label: "gross margin in FY25, up from 41.8% in FY21" }, wear: "Cheaper rivals could squeeze the price gap, and rising memory costs may force price rises that test loyalty.", trend: "stable" },
    { name: "Switching costs", score: 9, weight: 30, test: "Would a customer lose something by leaving?", answer: "Yes. Photos, paid apps, messages and paired devices stay behind.", evidence: { value: "2.5B+", label: "active devices in Jan 2026, up 150 million in a year" }, wear: "Platform-opening rules make leaving easier.", trend: "eroding" },
    { name: "Intangible assets", score: 8, weight: 20, test: "Does Apple own things rivals cannot copy?", answer: "Yes. Its own chips, operating system and design are protected know-how.", evidence: { value: "$34.6B", label: "R&D spending in FY25, 8.3% of sales" }, wear: "AI could shift value to software that Apple does not control.", trend: "stable" },
    { name: "Cost advantage", score: 7, weight: 15, test: "Can Apple make or buy things cheaper than rivals?", answer: "Somewhat. Large volumes give buying power, and its own chips reduce reliance on suppliers.", evidence: { value: "33.2%", label: "operating margin, last 12 months" }, wear: "Memory prices, tariffs and manufacturing concentrated in one region could squeeze costs.", trend: "eroding" },
    { name: "Network effects", score: 5, weight: 10, test: "Does the product get better as more people join?", answer: "Partly. iMessage and the App Store link users and developers, but it is not a social network.", evidence: { value: "26%", label: "of FY25 sales from Services, which build on the user base" }, wear: "Rules on messaging compatibility.", trend: "stable" },
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
      { title: "Switching feels painful", text: "Leaving means losing the data, apps and habits." },
      { title: "Buy the next device", text: "The customer stays and buys the next iPhone." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  switching: {
    title: "What a customer gives up by leaving",
    items: [
      { icon: "ti-photo", name: "Photos", text: "Years of photos in iCloud" },
      { icon: "ti-apps", name: "Apps", text: "Paid apps and in-app purchases" },
      { icon: "ti-message-circle", name: "iMessage", text: "Chats, group chats, FaceTime" },
      { icon: "ti-device-watch", name: "Watch and AirPods", text: "Work best with an iPhone" },
      { icon: "ti-credit-card", name: "Apple Pay", text: "Cards and passes already set up" },
    ],
    closing: "Switching phones means rebuilding all five, even with transfer tools.",
  },
  reliance: {
    title: "Who Apple relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip makers, assembly partners, display and memory makers", gives: "Parts and assembly capacity", gets: "Large, steady orders", note: "A few makers build much of the product, and few can be swapped quickly. Memory is the pinch point now." },
      { group: "Partners", level: 2, who: "Mobile carriers, payment networks, content studios", gives: "Reach and content", gets: "Shared revenue and traffic", note: "Useful but replaceable, as long as Apple keeps its own channels." },
      { group: "Distributors", level: 2, who: "Retail chains, resellers, online marketplaces", gives: "Shelf space and local reach", gets: "A margin on each sale", note: "Apple also sells directly, which limits how much it needs them." },
      { group: "Competitors", level: 2, who: "Phone makers, software platforms, search companies", gives: "Pressure on price and features", gets: "A rival to beat, sometimes a partner", note: "Some rivals also supply parts or pay for placement. Google pays Apple billions of dollars a year to be Safari’s default search, which a court still allows, though not exclusively.", rival: true },
      { group: "Developers", level: 1, who: "App makers, game studios, accessory makers", gives: "Apps that make devices more useful", gets: "Access to users and payments", note: "Each side needs the other, though regulators are changing what Apple can charge."},
      { group: "Customers", level: 1, who: "Consumers, small business, enterprise and education", gives: "Money and repeat purchases", gets: "Devices, software and services", note: "Spread across a very large base, so no single customer matters much." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings are shown.",
  },
  source:
    "Sources: Apple FY25 10-K, Q3 FY26 earnings release, 10-Q (legal proceedings) and call; Apple’s Q1 FY26 call (active devices, new Mac buyers); IDC Q3 2026 smartphone data; EU, US and Japan rules as reported in Apple’s filings and the press. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
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
  companies: [
    {
      id: "aapl", name: "Apple", ticker: "AAPL", kind: "self",
      desc: "Phones, computers, wearables and services",
      metrics: { revenue: 466.8, growth: 14.2, opMargin: 33.2, fcf: 136.7, fcfMargin: 29.3, netDebt: -62.2 },
    },
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
    {
      id: "goog", name: "Alphabet", ticker: "GOOGL", kind: "indirect",
      desc: "Android software, search, cloud and Pixel phones",
      metrics: { revenue: 445.9, growth: 20.0, opMargin: 33.1, fcf: 53.3, fcfMargin: 12.0, netDebt: -121.7 },
    },
    {
      id: "msft", name: "Microsoft", ticker: "MSFT", kind: "indirect",
      desc: "PC software, cloud and business tools",
      metrics: { revenue: 331.8, growth: 17.8, opMargin: 46.8, fcf: 67.0, fcfMargin: 20.2, netDebt: 52.0 },
    },
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
  caveat:
    "All three are on the same basis: US-reported figures for the 12 months to June 2026 (Microsoft’s fiscal year ended Jun 30). Free cash flow is operating cash flow minus capital spending, and net debt can include lease obligations. Alphabet spent $132B on equipment in that period, which is why its free cash flow is low. Businesses differ, so read gaps as clues, not scores.",
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Apple, Alphabet and Microsoft filings and S&P Global data via StockAnalysis (Oct 23 to 25, 2026). Apple and Alphabet are the 12 months to June 2026; Microsoft is fiscal 2026. Growth compares with the same 12 months a year earlier; Alphabet’s is calculated by Scope. Smartphone shares are IDC’s Q3 2026 estimate. Samsung and Xiaomi facts are from their Q2 2026 results.",
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
      value: "33.2%",
      steps: [
        "Form 10-K for FY25 (filed Oct 31, 2025) and Form 10-Q for Q3 FY26 (quarter ended Jun 27, 2026)",
        "Operating income $154.9B and net sales $466.8B over the last four quarters",
        "154.9 ÷ 466.8 × 100",
        "33.2% operating margin",
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: "$136.7B",
      steps: [
        "Form 10-K for FY25 and Form 10-Q for Q3 FY26, cash flow statements",
        "Operating cash flow $146.7B and capital spending $10.0B over the last four quarters",
        "146.7 − 10.0",
        "$136.7B free cash flow",
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: "39.9×",
      steps: [
        "Closing share price on Oct 23, 2026 from market data, and earnings per share from Apple’s filings",
        "Share price $347.73 and diluted earnings per share $8.72 over the last four quarters",
        "347.73 ÷ 8.72",
        "39.9× P/E",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Apple.",
  sources: [
    { title: "SEC filings", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Apple, Alphabet and Microsoft. The primary source for financial figures." },
    { title: "Company investor relations", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and guidance come from here." },
    { title: "Market data providers", text: "Share price, market cap, analyst estimates and price targets, from StockAnalysis and S&P Global Market Intelligence. Prices are closing prices, and Scope shows the date." },
    { title: "Industry research", text: "Smartphone shipments and market shares from IDC, checked against Counterpoint and Omdia, which can differ by up to a point." },
  ],
  documents: [
    { name: "FY25 annual report", date: "Oct 31, 2025", type: "10-K", use: "Business, risks and annual financials" },
    { name: "Q3 FY26 earnings release", date: "Jul 30, 2026", type: "8-K", use: "Headline results and product-line sales" },
    { name: "Q3 FY26 quarterly report", date: "Jul 2026", type: "10-Q", use: "Balance sheet, nine-month cash flow and legal proceedings" },
    { name: "Q3 FY26 earnings call", date: "Jul 30, 2026", type: "Transcript", use: "Guidance, margin and supply comments, kept as an AI summary" },
    { name: "Alphabet Q2 2026 results", date: "Jul 2026", type: "8-K", use: "Rival financials on the same basis" },
    { name: "Microsoft FY26 annual report", date: "Jul 29, 2026", type: "10-K", use: "Rival financials on the same basis" },
    { name: "Analyst consensus and price targets", date: "Oct 2026", type: "Estimates", use: "Beat and miss figures, next-report expectations and price targets" },
    { name: "Smartphone market report", date: "Oct 2026", type: "IDC", use: "Q3 2026 shipments and market shares" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: [
    { name: "Revenue growth", formula: "(Revenue now − revenue a year earlier) ÷ revenue a year earlier × 100", note: "Year over year, to avoid seasonal swings. For the last 12 months, the comparison is with the 12 months before that. Quarterly and annual are never mixed." },
    { name: "Operating margin", formula: "Operating income ÷ revenue × 100", note: "Uses reported operating income, with no add-backs." },
    { name: "Net margin", formula: "Net income ÷ revenue × 100", note: "GAAP net income. One-time items, such as the $10.2B tax charge in FY24, are noted beside the number." },
    { name: "ROE", formula: "Net income ÷ average shareholders’ equity × 100", note: "Average of start and end of period. A company that buys back a lot of stock can show a very high ROE." },
    { name: "ROIC", formula: "Operating income × (1 − tax rate) ÷ average (equity + debt) × 100", note: "Debt is interest-bearing debt. Cash is not subtracted: for Apple that would leave little invested capital and push ROIC above 400%. Other data providers define it differently, so compare ROIC only within Scope." },
    { name: "Debt to equity", formula: "Interest-bearing debt ÷ shareholders’ equity", note: "Debt is commercial paper plus term debt. It leaves out liabilities that carry no interest, so it is not comparable with total-liabilities versions." },
    { name: "Free cash flow", formula: "Operating cash flow − capital spending", note: "Capital spending is taken from the cash flow statement. Quarterly figures come from subtracting cumulative year-to-date totals." },
    { name: "Net cash", formula: "Cash and securities − interest-bearing debt", note: "Positive means net cash. Rival figures from data providers may include lease obligations, so they are marked." },
    { name: "P/E", formula: "Share price ÷ diluted earnings per share, last 12 months", note: "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings." },
    { name: "EV/EBITDA", formula: "(Market cap − net cash) ÷ (operating income + depreciation and amortization)", note: "Last 12 months. The average used in the Valuation section is the 5-year average at fiscal year ends." },
  ],
  formulasNote: "Scope uses reported (GAAP) figures and interest-bearing debt. Figures with different definitions are never compared without a note.",
  scoringTitle: "How the Scope Score is built",
  scoringIntro:
    "Six categories, each with its own inputs, weights and cut-offs. Every input is scored from 0 to 10, a category is the weighted average of its inputs, and the overall score is the weighted average of the categories. Grades: A+ from 9.0, A from 8.0, B+ from 7.5, B from 7.0, C+ from 6.0, C from 5.0, D from 3.0, F below that. Labels: Excellent from 9.0, Strong from 7.5, Good from 6.0, Fair from 5.0, Weak below that.",
  categories: [
    {
      name: "Quality", weight: 20, coverage: 100, score: 8.88,
      inputs: [
        { name: "ROIC", weight: 40, value: "67%", score: 10 },
        { name: "Cash conversion, 5-year free cash flow ÷ net income", weight: 30, value: "102.9%", score: 8.23 },
        { name: "Operating margin range over 5 years, lower is steadier", weight: 30, value: "2.2 points", score: 8.02 },
      ],
      rule: "Cut-offs score 0, 2.5, 5, 7.5 and 10, with a straight line between. ROIC: 0%, 8%, 15%, 25%, 40%. Cash conversion: 40%, 70%, 90%, 100%, 110%. Margin range: 10, 6, 4, 2.5, 1 points.",
      missing: "No inputs missing.",
    },
    {
      name: "Scale", weight: 10, coverage: 100, score: 10,
      inputs: [
        { name: "Market cap", weight: 60, value: "$5.07T", score: 10 },
        { name: "Revenue, last 12 months", weight: 40, value: "$466.8B", score: 10 },
      ],
      rule: "Cut-offs score 0, 2.5, 5, 7.5 and 10. Market cap: $10B, $50B, $200B, $1T, $3T. Revenue: $5B, $25B, $100B, $250B, $400B. Scale is context, not a quality judgment.",
      missing: "No inputs missing.",
    },
    {
      name: "Profitability", weight: 20, coverage: 100, score: 9.79,
      inputs: [
        { name: "Operating margin", weight: 40, value: "33.2%", score: 9.54 },
        { name: "Net margin", weight: 30, value: "27.6%", score: 9.91 },
        { name: "Free cash flow margin", weight: 30, value: "29.3%", score: 10 },
      ],
      rule: "Last 12 months. Cut-offs score 0, 2.5, 5, 7.5 and 10. Operating margin: 0%, 8%, 15%, 25%, 35%. Net margin and free cash flow margin: 0%, 5%, 10%, 18%, 28%.",
      missing: "No inputs missing.",
    },
    {
      name: "Revenue growth", weight: 20, coverage: 100, score: 6.59,
      inputs: [
        { name: "Revenue growth, last 12 months", weight: 40, value: "+14.2%", score: 8.19 },
        { name: "Forecast revenue growth, next 3 years", weight: 30, analyst: true, value: "+11.2% a year", score: 7.16 },
        { name: "Revenue growth a year, FY21 to FY25", weight: 30, value: "+3.3% a year", score: 3.88 },
      ],
      rule: "Cut-offs score 0, 2.5, 5, 7.5 and 10: −5%, 0%, 6%, 12%, 20% a year for all three inputs. Forecast growth is an analyst input and is flagged.",
      missing: "No inputs missing.",
    },
    {
      name: "Risk", weight: 15, coverage: 100, score: 6.67,
      inputs: [
        { name: "Largest product’s share of sales, lower is safer", weight: 40, value: "49.6% (iPhone)", score: 4.23 },
        { name: "Net debt ÷ EBITDA, lower is safer", weight: 35, value: "−0.37", score: 9.68 },
        { name: "Worst year of revenue growth in 5 years", weight: 25, value: "−2.8%", score: 6.38 },
      ],
      rule: "Cut-offs score 0, 2.5, 5, 7.5 and 10. Product share: 80%, 60%, 45%, 30%, 15%. Net debt ÷ EBITDA: 4, 2.5, 1.5, 0.5, −0.5. Worst year: −20%, −10%, −5%, −1%, 0%.",
      missing: "No inputs missing.",
    },
    {
      name: "Valuation", weight: 15, coverage: 100, score: 3.15,
      inputs: [
        { name: "P/E against its own 5-year average", weight: 35, value: "1.33×", score: 3.16 },
        { name: "EV/EBITDA against its own 5-year average", weight: 35, value: "1.35×", score: 2.95 },
        { name: "Free cash flow yield", weight: 30, value: "2.7%", score: 3.36 },
      ],
      rule: "Cheaper than its own history scores higher. Cut-offs score 0, 2.5, 5, 7.5 and 10. Multiples against average: 1.6, 1.4, 1.15, 0.95, 0.8. Free cash flow yield: 0.5%, 2%, 4%, 6%, 8%. The fair value model is shown separately and is not in the score.",
      missing: "No inputs missing.",
    },
  ],
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list.",
  valuationTitle: "How fair value is estimated",
  valuationIntro: "Three reference points, each with its own limit. None of them is a price forecast, and only the cash flow model sets the fair value.",
  methods: [
    { name: "Discounted cash flow", what: "Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($269 in the base case).", limit: "The result moves a lot when assumptions change. About two thirds of the value comes from after year 10." },
    { name: "Historical multiples", what: "Compares today’s P/E with Apple’s own range over the last ten fiscal year ends.", limit: "The past may not repeat if the business has changed, for example with more Services." },
    { name: "Analyst price targets", what: "Shows the range and average of published targets from analysts who follow Apple.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price." },
  ],
  valuationNote: "Fair value is a model output under stated assumptions, not a price the stock will reach.",
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Jun 27, 2026", label: "Latest reporting period ends" },
    { date: "Jul 30, 2026", label: "Source date: reported 33 days later" },
    { date: "Oct 25, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q3 FY26 (ended Jun 27, 2026)", sourceDate: "Jul 30, 2026", updated: "Oct 25, 2026", status: "Verified", limit: "GAAP basis. Annual figures use FY25 (ended Sep 27, 2025) until the FY26 10-K is filed." },
    { dataset: "Balance sheet", period: "Jun 27, 2026", sourceDate: "Jul 30, 2026", updated: "Oct 25, 2026", status: "Verified", limit: "Quarter-end snapshot only." },
    { dataset: "Cash flow", period: "9 months to Jun 27, 2026", sourceDate: "Jul 30, 2026", updated: "Oct 25, 2026", status: "Verified", limit: "Quarterly figures are found by subtracting from the cumulative year-to-date total. The split of Q1 and Q2 free cash flow is estimated." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Oct 23, 2026 close", updated: "Oct 25, 2026", status: "Verified", limit: "Closing price only, and it will move before the Nov 2 report." },
    { dataset: "Analyst estimates and targets", period: "Q4 FY26 (estimate)", sourceDate: "Oct 2026", updated: "Oct 25, 2026", status: "Pending", limit: "Consensus differs between providers and changes before earnings. Shown only as analyst view." },
    { dataset: "Smartphone market shares", period: "Q3 2026 (Jul to Sep)", sourceDate: "Oct 2026", updated: "Oct 25, 2026", status: "Verified", limit: "Units shipped, not revenue. IDC, Counterpoint and Omdia differ by up to a point." },
    { dataset: "Rival financials", period: "12 months to Jun 2026", sourceDate: "Jul 2026", updated: "Oct 25, 2026", status: "Verified", limit: "Alphabet reports on Oct 28, so it will be out of step with Apple until both update. Samsung, Xiaomi and Sony are not on the same basis." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Apple does not report customer counts, so Scope shows active devices (2.5 billion) and Services share instead." },
  ],
  source:
    "Sources: Apple, Alphabet and Microsoft filings and earnings materials, StockAnalysis (S&P Global) market data and IDC smartphone data, as of Oct 25, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};
const closing: ClosingPanelData = {
  title: ["Understand the business.", "Understand its advantage."],
  buttonLabel: "Review the 7 Powers",
  href: "/7-powers",
  note: "The 7 Powers framework was developed by Hamilton Helmer in 7 Powers: The Foundations of Business Strategy (2016). Scope's explanations and examples are its own. Scope is built for understanding businesses, not for investment advice.",
};
export default function CompanyPreviewPage() {
  return (
    <main>
      {/* Who it is and the score */}
      <CompanyHero data={sample} />
 
      {/* 1. Orient: what the company is, and why the score is what it is */}
      <CompanySummary data={summary} />
      <ScoreReasons data={scoreReasons} />
 
      {/* 2. What is new: the reason to come back */}
      <WhatChanged data={whatChanged} />
 
      {/* 3. How it makes money, and how healthy the numbers are */}
      <WhereMoneyComes data={whereMoneyComes} />
      <FinancialHighlights data={financialHighlights} />
      <ProfitHistory data={profitHistory} />
      <CashAndReturns data={cashAndReturns} />
 
      {/* 4. Is the price fair, what could go wrong, what to watch */}
      <Valuation data={valuation} />
      <StrengthsRisks data={strengthsRisks} />
      <SignalsToWatch data={signalsToWatch} />
 
      {/* 5. Why it lasts, and who it competes with */}
      <MoatEcosystem data={moatEcosystem} />
      <Competitors data={competitors} />
 
      {/* 6. Trust and close */}
      <SourcesMethod data={sourcesMethod} />
      <ClosingPanel data={closing} />
    </main>
  );
}