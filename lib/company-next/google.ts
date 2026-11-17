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
import { googleScore } from "../scope-score/inputs";
import rawGoogl from "../../data/raw/GOOGL.json";
import { buildFacts, type RawFmp } from "../company-data/facts";
import { peAtYearEnd } from "../company-data/peHistory";
import { cashAndReturnsNumbers, financialHighlightsMetrics, profitHistoryNumbers, roicText } from "../company-data/sections";
import { closingShared, formulas, formulasNote, scoreHowToRead, scoringIntro } from "@/shared/methodology";
import { peerCaveat, peerCompany } from "@/shared/peers";

// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(googleScore.raw, googleScore.display);

// Numbers from filings come from the saved API data (data/raw/GOOGL.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts GOOGL
const facts = buildFacts(rawGoogl as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// P/E at each fiscal year end, read from the saved API data (shared helper). If none is found the chart shows only "Now".
const peHistory = peAtYearEnd(rawGoogl as unknown as RawFmp);

// Alphabet page data. Prices as of Nov 6, 2026 close. Latest quarter: Q3 2026 (ended Sep 30, 2026, reported Oct 28).
// Fiscal year = calendar year. FY21 to FY25 are the five full years shown (FY26 is not finished).

const hero: CompanyHeroData = {
  name: "Alphabet Inc.",
  ticker: "GOOGL",
  sector: "Technology",
  logo: "/logos/google-svgrepo-com.svg", // TODO: check this file exists in public/logos
  description:
    "The parent of Google. It earns most of its money from ads on Search and YouTube, and its fastest-growing business is Google Cloud, which sells computing power and AI to other companies.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$3.47T", note: "As of Nov 6, 2026" },
    { label: "Revenue, last 12 months", value: "$471.1B", note: "+22.2% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "14.9×", note: "Boosted by investment gains. About 26× without them" },
    { label: "Free cash flow, last 12 months", value: "$19.7B", note: "4.2% of sales", noteTone: "negative" },
  ],
  source:
    "Financials from Alphabet’s FY25 Form 10-K (year ended Dec 31, 2025) and the Q3 2026 earnings release (quarter ended Sep 30, 2026, reported Oct 28). Market data as of Nov 6, 2026. Next report: early February 2027, date not yet confirmed.",
};

const summary: CompanySummaryData = {
  title: "Alphabet in 30 seconds",
  label: "AI summary",
  text: "Alphabet runs Google Search, YouTube, Android and Google Cloud. In the last 12 months sales grew 22.2% to $471.1B, and Alphabet kept $33.30 of every $100 as operating profit. Google Cloud, now 24% of sales, more than doubled last quarter. The catch is the bill: Alphabet spent $159.8B on equipment in 12 months to build AI data centers, so only $19.7B was left as free cash flow.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "24%",
    caption: "from Google Cloud, Q3 2026",
    segments: [
      { label: "Search & other · about half", share: 49.7 },
      { label: "Google Cloud", share: 24.1 },
      { label: "YouTube ads, Network, subscriptions, other", share: 26.2 },
    ],
  },
};

const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  takeaway:
    "Alphabet scores top marks for scale and a high 9.5 for growth, with good marks for risk and valuation. Quality (6.5) is held back by cash profit that trails net income, and two inputs look better than they are: net margin and P/E are lifted by one-time gains on shares in other companies.",
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: "26.9%", label: "return on invested capital in FY25, with cash profit at 77% of net income over five years", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: "$3.47T", label: "market cap, with $471B of revenue in the last 12 months", href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: "33.3%", label: "operating margin in the last 12 months, but only 4.2% of sales kept as free cash flow", href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: "+22.2%", label: "growth in the last 12 months, and 11.8% a year from FY21 to FY25", href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "49.7%", label: "of Q3 2026 sales from Search & other. Net cash is from the FY25 balance sheet, and debt has since risen to $125.1B", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: "14.9×", label: "P/E, against its own 5-year average of about 24×, but investment gains make it look lower than it is", href: "#valuation" },
  ],
  howToRead: scoreHowToRead(
    "Net margin and P/E use reported (GAAP) profit, which includes $129.6B of pre-tax gains on equity stakes in the last 12 months, so the Profitability and Valuation grades are higher than the core business alone would earn.",
  ),
};

const whatChanged: WhatChangedData = {
  title: "Sales grew 25% to $127.6B and Cloud doubled, but free cash flow turned negative as spending hit $51.4B",
  lead: "What changed since the last report: Q3 2026, the quarter ended Sep 30, 2026 (reported Oct 28). The next report, Q4 2026, is expected in early February 2027.",
  metrics: [
    { label: "Revenue", value: "$127.6B", change: "+24.7% vs a year ago", tone: "positive", series: [102.3, 113.8, 109.9, 119.8, 127.6], note: "Google Cloud added $15.6B of the extra $25.2B. The 13th quarter in a row of double-digit growth." },
    { label: "Operating income", value: "$40.6B", change: "+29.9% vs a year ago", tone: "positive", series: [31.2, 35.9, 39.7, 40.8, 40.6], note: "The operating margin was 31.8%, up from 30.5% a year ago." },
    { label: "Net income", value: "$26.5B", change: "−24.3% vs a year ago", tone: "negative", series: [35.0, 34.5, 62.6, 112.2, 26.5], note: "GAAP profit fell because of an $8.7B loss on shares in other companies, mainly SpaceX. Last quarter was $112.2B because of a $99.0B gain, so operating income is the cleaner measure." },
    { label: "Google Cloud revenue", value: "$30.7B", change: "+102.6% vs a year ago", tone: "positive", series: [20.0, 24.8, 30.7], note: "Operating income of $11.1B, a 36.2% margin, up from 23.7%. Sales of TPU chip systems also added to growth." },
  ],
  growth: {
    bars: [
      { quarter: "Q3", fy: "FY25", value: 102.3, yoy: 16.0 },
      { quarter: "Q4", fy: "FY25", value: 113.8, yoy: 18.0 },
      { quarter: "Q1", fy: "FY26", value: 109.9, yoy: 21.8 },
      { quarter: "Q2", fy: "FY26", value: 119.8, yoy: 24.2 },
      { quarter: "Q3", fy: "FY26", value: 127.6, yoy: 24.7 },
    ],
    verdictLabel: "Still accelerating",
    before: "24.2%",
    after: "24.7%",
    verdict: "Sales growth edged up to 24.7% from 24.2%, the fourth quarter in a row of faster growth. All of the speed-up came from Cloud: Search & other slowed to 12% from 17%.",
    watch: "Next is the December quarter. Alphabet gives no numeric revenue forecast, but its finance chief said lapping last year’s Search speed-up will pressure growth and the currency headwind will be slightly larger.",
  },
  estimates: [
    { label: "Capital spending", unit: "B", actual: 51.36, estimate: 55.09 },
    { label: "Free cash flow", unit: "B", actual: -9.07, estimate: 2.7 },
  ],
  good: [
    { title: "Google Cloud more than doubled", detail: "$30.7B, +103%, with a 36.2% margin", meaning: "Cloud is now 24% of sales, up from 15% a year ago, and its operating profit more than tripled to $11.1B. Its backlog of signed contracts reached $561B, and just over 55% of it should become revenue within 24 months." },
    { title: "Search kept growing and queries hit a high", detail: "Search & other $63.4B, +12%", meaning: "Search is half of Alphabet’s sales. Growth slowed from 17% last quarter, but Alphabet says year-over-year query growth is the highest in five years." },
    { title: "AI use is spreading", detail: "Gemini app: 1 billion users", meaning: "Alphabet’s own AI models now process nearly 32 billion tokens a minute, more than four times a year ago. That demand feeds both Search and Cloud." },
  ],
  watch: [
    { title: "Free cash flow turned negative", detail: "−$9.1B in Q3 · +$19.7B over 12 months", meaning: "Alphabet spent $51.4B on equipment, 40% of its sales, and built inventory for TPU system sales. It guides $195B to $205B of capital spending for 2026 and says 2027 will be significantly higher." },
    { title: "Search growth slowed", detail: "+12% now, from +17% in Q2", meaning: "The finance chief said lapping last year’s Search speed-up will pressure Q4 growth. The shares fell about 10% after the report." },
    { title: "Debt and new shares are paying for the build-out", detail: "Long-term debt $125.1B, up from $46.5B in Dec 2025", meaning: "Alphabet made no buybacks in the first nine months of 2026 (against $39.8B a year earlier) and sold $12.4B of new stock in Q3, so the share count is now rising instead of falling." },
  ],
  source:
    "Sources: Alphabet Q3 2026 earnings release and call (Oct 28, 2026), Q3 2026 Form 10-Q, as reported by CNBC and Yahoo Finance; earlier quarterly releases for the year-ago figures. Capital spending and free cash flow estimates are from CNBC; revenue and earnings per share versus estimates are not shown because press reports disagree. Quarterly net income and operating income for Q4 FY25 and Q2 FY26 are calculated by Scope from full-year and year-to-date totals.",
};

const signalsToWatch: SignalsToWatchData = {
  title: "Next report: growth has to stay near 24%, and capital spending has to step up without free cash flow falling much further",
  lead: "Three numbers will show whether Alphabet’s December quarter is good or not. Alphabet gives no numeric forecast, so the zones are Scope’s own thresholds, set around last quarter and what management said.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Early February 2027 (tentative)",
    note: "Q4 2026, the December quarter. Alphabet reported its December quarter on Feb 4 last year, but has not confirmed this year’s date.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, not guidance from Alphabet.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth hold near 24% against last year’s +18% December quarter, after Search slowed?",
      guidance: "No numeric forecast. The finance chief expects tougher Search comparisons and a slightly larger currency headwind",
      format: "signedPercent",
      range: [10, 30],
      weakBelow: 20,
      strongFrom: 24,
      yearAgo: 18.0,
      lastQuarter: 24.7,
    },
    {
      name: "Operating margin",
      question: "Does the margin stay near 32% as depreciation rises and Cloud uses third-party computing capacity?",
      guidance: "No margin forecast. Management expects near-term Cloud margin pressure from third-party capacity coming online in Q4",
      format: "percent",
      range: [26, 38],
      weakBelow: 30,
      strongFrom: 32,
      yearAgo: 31.6,
      lastQuarter: 31.8,
    },
    {
      name: "Free cash flow margin",
      question: "Does free cash flow stay close to break-even as capital spending steps up to about $63B to $73B in the quarter?",
      guidance: "Full-year capital spending of $195B to $205B, which implies about $63B to $73B in Q4. Calculated by Scope from $132.0B spent in the first nine months",
      format: "percent",
      range: [-30, 25],
      weakBelow: -10,
      strongFrom: 0,
      yearAgo: 21.6,
      lastQuarter: -7.1,
    },
  ],
  source:
    "Sources: Alphabet Q3 2026 earnings release and call (Oct 28, 2026) for the capital spending guide and management comments; Q4 FY25 figures for the year-ago values. Free cash flow margin is free cash flow divided by revenue, calculated by Scope: −$9.1B on $127.6B in Q3 2026 and $24.6B on $113.8B in Q4 2025. The next report date is tentative. Red and green zones are Scope’s own thresholds and are not a forecast.",
};

const whereMoneyComes: WhereMoneyComesData = {
  title: "Half of sales still come from Search, but Cloud has grown from 15% to 24% of sales in a year",
  lead: "$127.6B of revenue in Q3 2026 (quarter ended Sep 30, 2026), split by business, by profit and by region. Scope uses the latest quarter here because the annual breakdown for FY25 is not loaded yet.",
  labels: ["From Q3 2026 results"],
  periodLabel: "Q3 2026",
  comparedWith: "Q3 2025",
  products: [
    { name: "Google Search & other", share: 49.7, value: 63.35, yoy: 12.0, note: "Ads next to Google Search results, plus other Search income" },
    { name: "Google Cloud", share: 24.1, value: 30.71, yoy: 102.6, note: "Cloud computing, AI services, Workspace and sales of TPU chip systems" },
    { name: "Subscriptions, platforms and devices", share: 11.2, value: 14.29, yoy: 11.0, note: "YouTube subscriptions, Google One, Google Play and consumer devices" },
    { name: "YouTube ads", share: 8.8, value: 11.21, yoy: 9.2, note: "Ads on YouTube videos" },
    { name: "Google Network", share: 5.8, value: 7.46, yoy: 1.4, note: "Ads on websites and apps outside Google" },
    { name: "Other Bets", share: 0.3, value: 0.37, yoy: 8.1, note: "Waymo self-driving rides and other long-term projects" },
  ],
  donutHowToRead:
    "Each slice is a business line, sized by its share of Alphabet’s sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus Q3 2025. The remaining 0.2% is hedging gains.",
  profit: {
    title: "Cloud is 24% of sales but 22% of segment profit",
    explain:
      "Segment operating profit is revenue minus the costs of that business. Alphabet keeps $40.70 of every $100 of Google Services sales (Search, YouTube, subscriptions, devices) and $36.20 of every $100 of Cloud sales. Cloud’s margin was $23.70 a year ago, so it is catching up fast. The figures leave out Other Bets (a $2.0B loss) and $7.7B of Alphabet-level costs, mostly shared AI research, which is why they add up to more than the company’s $40.6B operating income.",
    revenueTotal: "$127.0B",
    profitTotal: "$50.3B",
    groupNames: { a: "Google Services", b: "Google Cloud" },
    profitLabel: "segment operating profit",
    productsRevenue: 75.8,
    servicesRevenue: 24.2,
    productsProfit: 77.9,
    servicesProfit: 22.1,
    productsMargin: "40.7%",
    servicesMargin: "36.2%",
    servicesHistoryTitle: "Google Cloud share of Alphabet’s segment sales",
    servicesHistory: [
      { year: "Q3 ’25", share: 14.8 },
      { year: "Q3 ’26", share: 24.2 },
    ],
  },
  regions: {
    title: "More than half of sales now come from the United States, which grew 39% while Europe grew 9%",
    lead: "Where the revenue was earned in Q3 2026, by customer address, and how each region changed versus Q3 2025. Shares exclude hedging gains and are calculated by Scope.",
    items: [
      { name: "United States", share: 53.1, value: 67.68, yoy: 38.8 },
      { name: "Europe, Middle East & Africa", share: 25.7, value: 32.7, yoy: 9.3 },
      { name: "Asia Pacific", share: 15.6, value: 19.91, yoy: 11.7 },
      { name: "Other Americas", share: 5.6, value: 7.1, yoy: 17.1 },
    ],
    focus: {
      name: "United States",
      value: 67.68,
      yoy: 38.8,
      historyTitle: "Share of Alphabet’s sales (excluding hedging)",
      history: [
        { year: "Q3 ’25", share: 47.5 },
        { year: "Q3 ’26", share: 53.1 },
      ],
      note: "Revenue is assigned by the customer’s address. The US grew much faster than every other region this quarter. Alphabet does not say how much of that came from Cloud.",
    },
    howToRead:
      "Each box’s area is the region’s share of Q3 2026 sales. The pill shows growth versus Q3 2025. Every region grew.",
  },
  source:
    "Source: Alphabet Q3 2026 earnings release (quarter ended Sep 30, 2026): supplemental revenue table, segment results and revenue by geography. Q3 2025 figures are from the same release. Shares and growth rates are calculated by Scope and rounded to one decimal, so a total can differ from 100% by 0.1.",
};

const financialHighlights: FinancialHighlightsData = {
  title: "Sales are up 56% since FY21, but free cash flow is up only 9% because capital spending more than tripled",
  lead: "Fiscal year 2025 (ended Dec 31, 2025) compared with FY24 and the four years before it.",
  labels: ["From FY25 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Revenue": "Total sales for the year. Up 56% since FY21, and up 15.1% in FY25, the fastest year in the period.",
    "Net income": "Final profit after all costs and tax: $132.2B, up from $100.1B in FY24. It is higher than operating income ($129.0B) because of gains on shares in other companies, which can reverse.",
    "Earnings per share": "Diluted profit per share, up from $8.04. It grows faster than net income because diluted shares fell from 13.55B to 12.23B in four years. In 2026 the share count started to rise again.",
    "Free cash flow": "Operating cash flow ($164.7B) minus spending on equipment and buildings ($91.4B). Capital spending was $24.6B in FY21 and kept rising in 2026.",
    "Operating margin": "Alphabet keeps about $32 of every $100 sold after running the business, before tax.",
    "Net margin": "Alphabet keeps $32.80 of every $100 sold as final profit, helped by gains on investments.",
  }),
  howToRead:
    "The big number is FY25. The pill compares it with FY24: green is better, red is worse. The bars show five years and the colored bar is FY25.",
  source:
    "Source: Alphabet Form 10-K for FY25 (year ended Dec 31, 2025), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending.",
};

const valuation: ValuationData = {
  title: "On Scope’s standard cash flow model Alphabet looks far above fair value, because AI spending has cut free cash flow to $19.7B",
  lead: "Is the share price high or low compared with what Alphabet’s future cash is worth, what it used to trade at, and what analysts expect?",
  labels: ["Market data as of Nov 6, 2026", "Scope estimate"],
  price: 284.78,
  priceDate: "Nov 6, 2026",
  fair: 84,
  field: {
    max: 500,
    rows: [
      { name: "Cash flow (DCF)", low: 27, high: 182, mark: 84, markName: "Base" },
      { name: "Analyst targets", low: 380, high: 475, mark: 418, markName: "Average" },
    ],
    howToRead:
      "Each bar is the range of value per share from one reference point, and the dot is its middle estimate. The dashed line is today’s price: where it sits to the right of the dot, the price looks high by that measure. The two measures disagree sharply, which is the main point of this section.",
  },
  implied: {
    title: "To justify $285 from today’s $19.7B of free cash flow, it would have to grow about 58% a year for five years",
    needed: 58.1,
    actual: 2.3,
    actualLabel: "FY21 to FY25",
    text: "That is 58.1% a year for the next 5 years, then 6% a year for 5 more and 3% after that, discounted at 8% a year. The starting point is low because capital spending jumped, not because earnings fell: from the FY25 level of $73.3B, the needed growth would be about 20% a year. Free cash flow grew 2.3% a year from FY21 to FY25.",
    cases: ["Bear", "Base", "Bull"],
    assumptions: [
      { label: "Cash flow growth, years 1–5", values: ["0%", "20%", "35%"] },
      { label: "Cash flow growth, years 6–10", values: ["3%", "8%", "12%"] },
      { label: "Growth after year 10", values: ["2.5%", "3%", "3.5%"] },
      { label: "Discount rate", values: ["9%", "8%", "8%"] },
    ],
    fairValues: [27, 84, 182],
    note: "About 69% of the base-case value comes from after year 10, so a small change in growth or the discount rate moves the answer a lot. All three cases start from $19.7B of free cash flow in the last 12 months, add $49.6B of net cash and divide by 12.4B diluted shares. Net cash is the Sep 30, 2026 balance sheet: $265.1B of cash and marketable securities, minus $90.4B of shares in other companies (they are stakes, not cash), minus $125.1B of debt. A $19B convertible preferred stock is not deducted. Important limit: this is the same method used for every company, and it treats today’s record capital spending as if it never pays off. If the model started from FY25 free cash flow of $73.3B instead, the base case would be about $302, which is close to the share price. The truth depends on whether the spending earns a return.",
  },
  history: {
    title: "Alphabet’s P/E of 14.9× looks low, but without investment gains it is about 26×, close to its own 5-year average of about 24×",
    years: [...peHistory, { year: "Now", value: 14.9 }],
    peAverage: 24.4,
    averagePeriod: "5-year",
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the 5-year average, taken at fiscal year ends. Now is low because profit includes $129.6B of pre-tax gains on shares in other companies over the last 12 months.",
    multiples: [
      { name: "P/E", now: 14.9, avg: 24.4 },
      { name: "P/E without investment gains (Scope estimate)", now: 26.0, avg: 24.4 },
    ],
    multiplesHowToRead:
      "Each bar shows how far Alphabet’s multiple is above or below its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it. The second row removes the gains on equity stakes (about 22% tax assumed on them), so it is an estimate, not a reported figure.",
  },
  source:
    "Sources: share price $284.78 (Nov 6, 2026 close) and the P/E average from Financial Modeling Prep; Alphabet Q3 2026 earnings release and balance sheet (net cash, free cash flow, diluted shares) and the call (marketable equity securities of $90.4B). P/E without gains is calculated by Scope: last-12-month net income of $235.7B minus $129.6B of pre-tax equity gains taxed at about 22%, divided by about 12.3B shares. Analyst targets: the $418 average is the consensus of about 60 analysts from TIKR (Oct 30, 2026); the $380 to $475 range shows only the post-earnings targets named in press reports (BofA $380, Pivotal Research $475), not the full set, so the full range is to confirm. Fair value is Scope’s own discounted cash flow estimate under the assumptions shown, not a price target or investment advice.",
};

const profitHistory: ProfitHistoryData = {
  title: "Sales grew 11.8% a year and operating profit 13.1% a year, with growth speeding up to 15.1% in FY25",
  lead: "Five years of results, FY2021 to FY2025: how fast Alphabet grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "Steady growth that sped up: +8.7% in FY23, then +13.9% and +15.1%",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales grew 9.8% in FY22, 8.7% in FY23, 13.9% in FY24 and 15.1% in FY25, and 22.2% in the last 12 months. Operating income fell in FY22 (margin 26.5%) and then recovered to about 32%. Free cash flow was almost flat from FY22 to FY25 ($60.0B to $73.3B) while capital spending grew from $31.5B to $91.4B.",
  },
  margins: {
    title: "Gross margin is up 2.8 points since FY21, but the operating margin has stayed near 32%",
    howToRead:
      "Each line is one margin over five years, with the ring on FY25. The pill is the change in percentage points since FY21. Net margin (32.8% in FY25) is helped by gains on shares in other companies, so operating margin is the cleaner measure.",
  },
  returns: {
    title: "Alphabet earns far more on its money than the money costs, though returns dipped in FY25 as spending grew",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    wacc: 8,
    text: roicText("Alphabet", profitNums.returns),
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as the base case in the valuation. ROIC was 29.8% in FY24 and 26.9% in FY25 as equity and debt grew faster than profit. ROE is about 36%. The balance sheet has grown a lot in 2026 (total assets up from $595B to $1,003B), so ROIC is likely to fall further.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Alphabet Form 10-K for FY21 to FY25 (income statement, balance sheet and cash flow statement). Fiscal years end on Dec 31. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};

const cashAndReturns: CashAndReturnsData = {
  companyName: "Alphabet",
  title: "Alphabet paid out about three quarters of its free cash flow in FY25, but stopped buybacks in 2026",
  lead: "How much cash Alphabet makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: "In five years Alphabet returned $296B, about 87% of the $343B of free cash flow it earned",
    howToRead:
      "Each year has two bars: the free cash flow Alphabet earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%.",
    fcfNote:
      "Free cash flow is cash from operations ($164.7B in FY25) minus spending on equipment and buildings ($91.4B), which leaves $73.3B. Alphabet paid its first dividend in 2024.",
  },
  how: {
    title: "Over 80% of what Alphabet returns is buybacks, but there were none in 2026 so far and new shares are being sold",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: "Returned in FY25", value: "$55.7B", note: "76% of free cash flow" },
      { label: "Dividend per share", value: "$0.22 a quarter", note: "Declared Oct 2026, payable Dec 14, 2026" },
      { label: "Dividend yield", value: "0.3%", note: "Small, so most of the return was buybacks" },
      { label: "Payout ratio", value: "7.6%", note: "of FY25 net income, so there is room to raise it" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "Alphabet held $80B more cash than debt at the end of 2025, but debt has since nearly tripled to $125B",
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote:
      "A ratio above 1 means current assets cover bills due within a year. At the end of 2025 it was about 2.0. On Sep 30, 2026 it was about 2.8 ($374.7B against $134.5B), helped by $265.1B of cash and marketable securities.",
    howToRead:
      "Net cash is cash and short-term investments minus interest-bearing debt. The figures are from the FY25 year-end balance sheet (Dec 31, 2025). Since then Alphabet raised long-term debt to $125.1B and sold new shares, and its marketable securities now include $90.4B of shares in other companies, which are not cash. On Sep 30, 2026, net cash excluding those shares was about $49.6B.",
  },
  source:
    "Sources: Alphabet Form 10-K for FY21 to FY25 (cash flow statement and balance sheet; FY25 as of Dec 31, 2025); Alphabet Q3 2026 earnings release (balance sheet at Sep 30, 2026, buybacks, share sales and dividend). Buybacks are the cash paid in the year. Debt is short-term plus long-term debt, without leases. Free cash flow is calculated by Scope. Dividend yield uses the share price in the valuation section and $0.88 a year ($0.22 a quarter).",
};

const strengthsRisks: StrengthsRisksData = {
  title: "Alphabet’s strengths are broad and Cloud is booming, but spending is outrunning cash flow and a lot of reported profit comes from investment gains",
  lead: "What Alphabet does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Alphabet an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "Search, YouTube, Android and Chrome reach billions of people, and Alphabet builds its own AI models and chips on top of them.", evidence: [{ value: "89.9%", label: "of worldwide searches in September 2026 (Statcounter)" }, { value: "1 billion", label: "users of the Gemini app, Alphabet says" }], why: "A huge audience gives Alphabet the data and the cash to keep improving its products." },
    { icon: "ti-cloud", name: "Cloud growth", finding: "Google Cloud is the fastest-growing of the three big clouds and now makes real profit.", evidence: [{ value: "+103%", label: "Cloud revenue growth in Q3 2026, to $30.7B" }, { value: "$561B", label: "backlog of signed contracts" }], why: "Cloud turns Alphabet’s AI spending into revenue from other companies." },
    { icon: "ti-chart-bar", name: "Strong profitability", finding: "Alphabet keeps about a third of each dollar it sells as operating profit.", evidence: [{ value: "33.3%", label: "operating margin, last 12 months" }, { value: "40.7%", label: "operating margin of Google Services in Q3 2026" }], why: "More profit left to reinvest and return to shareholders." },
    { icon: "ti-rocket", name: "Growth", finding: "Sales are growing faster at $470B a year than they did at $350B.", evidence: [{ value: "+22.2%", label: "revenue growth, last 12 months" }, { value: "13", label: "quarters in a row of double-digit revenue growth" }], why: "Fast growth at this scale is rare and supports a high value." },
    { icon: "ti-refresh", name: "Recurring revenue", finding: "A growing share of sales comes from subscriptions instead of ads alone.", evidence: [{ value: "$14.3B", label: "subscriptions, platforms and devices revenue in Q3 2026, up 11%" }, { value: "150M+", label: "YouTube Music and Premium subscribers, including trials" }], why: "Steadier income that does not depend only on advertising budgets." },
    { icon: "ti-coin", name: "Financial strength", finding: "Alphabet generates a lot of operating cash and holds a large pile of cash and securities.", evidence: [{ value: "$179.6B", label: "operating cash flow, last 12 months" }, { value: "$265.1B", label: "cash and marketable securities on Sep 30, 2026, of which $90.4B is shares in other companies" }], why: "Alphabet can fund AI spending from its own cash flow, though not all of it." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-cash", name: "Spending and cash", level: 3, finding: "Capital spending is eating almost all the cash Alphabet earns.", evidence: [{ value: "−$9.1B", label: "free cash flow in Q3 2026, against +$24.6B in Q4 2025" }, { value: "$195B to $205B", label: "capital spending guided for 2026, with a significant rise in 2027" }], why: "Depreciation of the new equipment is already up 49% a year and will keep rising. If AI demand slows, the spending is hard to reverse. A filing analysis puts purchase commitments at $924.4B." },
    { icon: "ti-gavel", name: "Regulation and lawsuits", level: 3, finding: "Courts have found that Google acted illegally in Search and in ad tech, and fixes are still being decided.", evidence: [{ value: "Dec 2025", label: "final judgment in the US Search case: data sharing and Search syndication for rivals, and limits on default deals. Alphabet appealed in Jan 2026" }, { value: "$5.2B", label: "EU Android fine paid in Q3 2026" }], why: "In the ad tech case the judge refused to force a sale of the AdX exchange (Sep 2026) but ordered changes in how it works, and the final judgment is not yet out. The DOJ and states are also appealing the Search remedies as too light." },
    { icon: "ti-trending-up", name: "Investment gains", level: 2, finding: "Reported profit depends a lot on the value of shares in other companies.", evidence: [{ value: "$129.6B", label: "pre-tax gains on equity stakes in the last 12 months" }, { value: "−$8.7B", label: "loss on equity stakes in Q3 2026, mainly SpaceX" }], why: "These gains can reverse, as the Q3 loss shows, and $75.2B of the SpaceX shares are under sale restrictions. Scope looks at operating income for this reason." },
    { icon: "ti-search", name: "AI and the future of Search", level: 2, finding: "Chatbots are a new way to look for answers, and Search is half of Alphabet’s sales.", evidence: [{ value: "+12%", label: "Search & other growth in Q3 2026, down from +17% in Q2" }, { value: "1.2 billion", label: "weekly ChatGPT users (OpenAI, autumn 2026) against 1 billion+ monthly Gemini app users" }], why: "Google’s search share slipped to 89.9% from 90.4% a year earlier, a small move so far. Alphabet is also putting AI answers inside Search, which may change how ads are shown." },
    { icon: "ti-arrows-exchange", name: "Funding and dilution", level: 2, finding: "Alphabet now borrows and sells shares to pay for the build-out.", evidence: [{ value: "$125.1B", label: "long-term debt on Sep 30, 2026, up from $46.5B at the end of 2025" }, { value: "$80B", label: "equity raise announced in June 2026, including $10B from Berkshire Hathaway" }], why: "Diluted shares rose to 12.37B from 12.20B a year earlier. More debt and more shares weigh on each existing share’s claim on future cash." },
    { icon: "ti-swords", name: "Cloud competition", level: 1, finding: "Google Cloud is growing fastest but is still the smallest of the three big clouds.", evidence: [{ value: "$46.0B", label: "AWS revenue in Q3 2026 (+39%), against $30.7B for Google Cloud" }, { value: "+48%", label: "Azure growth in Q3 2026" }], why: "Rivals are growing fast too, and Alphabet started renting third-party computing capacity at the end of Q3, which management says will pressure Cloud margins near term." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Alphabet Q3 2026 earnings release, call and Form 10-Q (Oct 28, 2026); Alphabet Form 10-Q and 10-K legal proceedings notes; the Sep 2, 2026 ad tech remedies filing as reported by AdExchanger; the June 1, 2026 equity raise announcement (Form 8-K); Statcounter, OpenAI and press reports for market data; a third-party SEC filing analysis (sec-api.io) for purchase commitments and equity gains. AWS and Azure figures are from press summaries of Amazon’s and Microsoft’s Q3 reports. All risk ratings are Scope’s own.",
};

const moatEcosystem: MoatEcosystemData = {
  title: "Alphabet’s moat is wide because billions of users feed its products, and the main threats are new ways to search and the courts",
  lead: "Why rivals struggle to take Alphabet’s customers, how the loop keeps users and advertisers coming back, and who Alphabet depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Network effects", score: 9, weight: 30, test: "Does the product get better as more people join?", answer: "Yes. More searches improve results, more viewers attract more creators to YouTube, and more Android users attract more developers.", evidence: { value: "89.9%", label: "of worldwide searches, September 2026" }, wear: "AI assistants are a new place to start a question, and they could split the audience.", trend: "stable" },
    { name: "Intangible assets", score: 9, weight: 25, test: "Does Alphabet own things rivals cannot copy?", answer: "Yes. Its search index, AI models, TPU chips and years of data are protected know-how.", evidence: { value: "$20.6B", label: "R&D spending in Q3 2026, up 36%" }, wear: "Court-ordered data sharing with rivals could shrink the Search data advantage.", trend: "stable" },
    { name: "Cost advantage", score: 8, weight: 15, test: "Can Alphabet make or buy things cheaper than rivals?", answer: "Mostly. It designs its own TPU chips and runs data centers at huge scale, and now sells TPU systems to others.", evidence: { value: "$51.4B", label: "capital spending in Q3 2026, mostly servers and networking" }, wear: "It now rents third-party capacity too, so supply is tight even for Alphabet.", trend: "stable" },
    { name: "Brand power", score: 7, weight: 15, test: "Can Alphabet charge more because of its name?", answer: "Partly. “Google” is a habit for most people, but part of that habit is paid for with default deals.", evidence: { value: "$16.4B", label: "traffic acquisition costs in Q3 2026, mostly paid to partners to send traffic" }, wear: "Courts now ban exclusive default deals, so the habit has to be earned.", trend: "eroding" },
    { name: "Switching costs", score: 5, weight: 15, test: "Would a customer lose something by leaving?", answer: "Partly. Leaving Search costs nothing, but Workspace documents, Android phones and YouTube channels are harder to move.", evidence: { value: "150M+", label: "YouTube Music and Premium subscribers, including trials" }, wear: "Rival assistants are one tap away on the same phone.", trend: "eroding" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. Search and cloud are huge markets with strong rivals, so market size alone does not protect Alphabet." },
  narrowing:
    "Court-ordered data sharing and limits on default deals could narrow the Search advantage, and AI assistants could change where people start a question.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for an internet and cloud company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why users and advertisers keep coming back",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "People use free products", text: "Search, YouTube, Maps, Android and Chrome are free, and billions of people use them." },
      { title: "Usage improves the products", text: "More searches and views give Alphabet data that makes results and recommendations better." },
      { title: "Advertisers pay for the audience", text: "Advertisers follow the audience, and Google advertising brought in $82.0B in Q3 2026." },
      { title: "The cash funds AI and chips", text: "Profit pays for AI models, TPU chips and data centers that no small rival can match." },
      { title: "Better AI improves the products", text: "New AI features go back into Search and YouTube, and the same technology is sold through Cloud." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    title: "Who Alphabet relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip and memory makers, server makers, power and land providers", gives: "Parts, computing capacity and electricity", gets: "Very large, steady orders", note: "Alphabet started using third-party computing capacity at the end of Q3 because supply is tight. Few suppliers can be swapped quickly." },
      { group: "Distribution partners", level: 2, who: "Phone makers, browser makers and carriers", gives: "Default placement and reach for Search", gets: "A share of the ad revenue", note: "Alphabet paid $16.4B of traffic acquisition costs in Q3 2026. The court still allows paid defaults but bans exclusive ones." },
      { group: "Cloud customers and AI labs", level: 2, who: "AI labs, banks, enterprises and governments", gives: "Money and large multi-year contracts", gets: "Computing power, AI models and TPU chips", note: "The $561B backlog is concentrated in big, fast-growing buyers, and some of them are also rivals in AI models." },
      { group: "Competitors", level: 2, who: "Microsoft, Amazon, Meta and OpenAI", gives: "Pressure on price and features", gets: "A rival to beat, sometimes a customer or partner", note: "Alphabet competes with Microsoft and Amazon in cloud, with Meta in ads and with OpenAI in AI assistants.", rival: true },
      { group: "Advertisers", level: 1, who: "Companies of every size", gives: "Most of Alphabet’s revenue", gets: "Access to people who are ready to buy", note: "Spread across millions of buyers, so no single advertiser matters much, but budgets rise and fall with the economy." },
      { group: "Users", level: 1, who: "Consumers and businesses worldwide", gives: "Attention and data", gets: "Free products and subscriptions", note: "No single user matters, but a shift of habits to AI assistants would matter a lot." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings are shown.",
  },
  source:
    "Sources: Alphabet Q3 2026 earnings release and call, FY25 10-K and Q3 2026 10-Q (legal proceedings); Statcounter for Search share; press reports of the Search remedies. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};

const competitors: CompetitorsData = {
  title: "Alphabet grows faster than Apple and Microsoft, but keeps far less free cash than either because it spends so much on AI",
  lead: "Who Alphabet competes with, how it compares with Apple and Microsoft on the same basis, and where Cloud stands against Amazon and Microsoft.",
  labels: [],
  overviewTitle: "Who Alphabet competes with",
  overviewIntro: "Rivals split by how they compete for Alphabet’s customers.",
  shares: {
    title: "Cloud revenue of the three big clouds, Q3 2026, share of the combined total",
    items: [
      { name: "AWS (Amazon)", value: 41.9 },
      { name: "Azure (Microsoft)", value: 30.2 },
      { name: "Google Cloud", value: 28.0, self: true },
    ],
    note: "Share of the combined revenue of these three only, from press summaries of their Q3 2026 reports ($46.0B, $33.2B and $30.7B). It is not a market share: the segments are defined differently, and Oracle and other clouds are left out. Google Cloud grew 103%, against 48% for Azure and 39% for AWS.",
  },
  // Numbers for Alphabet, Microsoft and Apple come from the saved API data through shared/peers.ts.
  companies: [
    peerCompany("GOOGL", { id: "goog", kind: "self", desc: "Search, YouTube, Android and Google Cloud" }),
    peerCompany("MSFT", { id: "msft", kind: "direct", desc: "Azure cloud, AI assistants and Bing search" }),
    {
      id: "amzn", name: "Amazon", ticker: "AMZN", kind: "direct",
      desc: "AWS cloud, online ads and product search",
      chartNote: "Not in the charts: its figures were not loaded into Scope’s data yet.",
    },
    {
      id: "meta", name: "Meta", ticker: "META", kind: "direct",
      desc: "Social media ads and AI models",
      chartNote: "Not in the charts: its figures were not loaded into Scope’s data yet.",
    },
    {
      id: "oai", name: "OpenAI", ticker: "Private", kind: "direct",
      desc: "ChatGPT, a rival way to ask questions and find answers",
      chartNote: "Not in the charts: OpenAI is a private company with no public financials.",
    },
    peerCompany("AAPL", { id: "aapl", kind: "indirect", desc: "iPhone and Safari, where Google pays to be the default search" }),
    {
      id: "nvda", name: "NVIDIA", ticker: "NVDA", kind: "indirect",
      desc: "The AI chips Alphabet buys, while building its own TPUs",
      chartNote: "Not in the charts: it is mainly a supplier, and its fiscal year ends in January.",
    },
  ],
  compareTitle: "How Alphabet compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is Alphabet, grey bars are Apple and Microsoft.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat: peerCaveat(
    ["GOOGL", "MSFT", "AAPL"],
    "Alphabet’s net cash is as of Dec 31, 2025. Since then its debt has risen to $125.1B and its marketable securities include $90.4B of shares in other companies, so the cushion today is smaller (see Cash and returns). Alphabet spent $159.8B on equipment in 12 months, which is why its free cash flow is low.",
  ),
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Alphabet, Microsoft and Apple numbers from their filings, loaded from the saved API data (Financial Modeling Prep) on the same day as the rest of this page. Growth compares with the same 12 months a year earlier. Cloud revenue for AWS and Azure is from press summaries of Amazon’s and Microsoft’s Q3 reports. Amazon, Meta, OpenAI and NVIDIA are described in words because comparable figures were not loaded.",
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
      value: "33.3%",
      steps: [
        "Form 10-K for FY25 (year ended Dec 31, 2025) and quarterly reports through Q3 2026 (quarter ended Sep 30, 2026)",
        "Operating income $157.0B and revenue $471.1B over the last four quarters",
        "157.0 ÷ 471.1 × 100",
        "33.3% operating margin",
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: "$19.7B",
      steps: [
        "Cash flow statements in the FY25 Form 10-K and the quarterly reports",
        "Operating cash flow $179.6B and capital spending $159.8B over the last four quarters",
        "179.6 − 159.8",
        "$19.7B free cash flow",
        "Profitability and Valuation scores, and the starting cash flow of the fair value model",
      ],
    },
    {
      metric: "P/E ratio",
      value: "14.9×",
      steps: [
        "Closing share price on Nov 6, 2026 from market data, and earnings per share from Alphabet’s filings",
        "Share price $284.78 and diluted earnings per share $19.16 over the last four quarters",
        "284.78 ÷ 19.16",
        "14.9× P/E, which includes $129.6B of pre-tax gains on equity stakes",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Alphabet.",
  sources: [
    { title: "SEC filings", topic: "Reported financials", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Alphabet, Microsoft and Apple. The primary source for financial figures." },
    { title: "Company investor relations", topic: "Outlook and guidance", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and comments come from here." },
    { title: "Market data providers", topic: "Share price, market cap, estimates and price targets", text: "Share price, market cap, fiscal-year-end multiples and growth forecasts from Financial Modeling Prep, and analyst targets from TIKR. Prices are closing prices, and Scope shows the date." },
    { title: "News and industry data", topic: "Industry and news context", text: "Press summaries of the earnings calls, court rulings as reported by trade press, and Statcounter and OpenAI figures for search and chatbot use. Where a figure comes only from the press, Scope says so." },
  ],
  documents: [
    { name: "FY25 annual report", date: "Feb 2026", type: "10-K", source: "SEC filings", use: "Business, risks, legal proceedings and annual financials" },
    { name: "Q3 2026 earnings release", date: "Oct 28, 2026", type: "8-K", source: "SEC filings", use: "Headline results, segments, balance sheet and cash flow" },
    { name: "Q3 2026 quarterly report", date: "Oct 2026", type: "10-Q", source: "SEC filings", use: "Equity investments, legal proceedings and geography" },
    { name: "Q3 2026 earnings call", date: "Oct 28, 2026", type: "Transcript", source: "Company investor relations", use: "Capital spending guide, margin and supply comments, kept as press summaries" },
    { name: "Equity capital raise announcement", date: "Jun 1, 2026", type: "8-K", source: "SEC filings", use: "$80B equity raise and Berkshire Hathaway investment" },
    { name: "Microsoft and Apple financials", date: "Nov 2026", type: "Data feed", source: "Market data providers", use: "Rival financials, each on its own latest 12 months" },
    { name: "Analyst consensus and price targets", date: "Oct 30, 2026", type: "Estimates", source: "Market data providers", use: "Average price target and post-earnings target changes" },
    { name: "Cloud market summaries", date: "Nov 2026", type: "Data feed", source: "Market data providers", use: "AWS and Azure revenue for the cloud comparison" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: formulas({
    "Net margin": "GAAP net income. For Alphabet it includes large gains and losses on shares in other companies ($129.6B of pre-tax gains in the last 12 months), so it is far above the operating margin.",
    "Net cash": "Positive means net cash. For Alphabet the fair value model also removes $90.4B of marketable shares in other companies, because they are stakes, not cash. Scope’s Score input uses the FY25 year-end balance sheet.",
    "P/E": "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings. For Alphabet, a second figure removes the equity gains (about 22% tax assumed) and is marked as a Scope estimate.",
    "EV/EBITDA": "Last 12 months. The average used in the Score is the 5-year average at fiscal year ends.",
  }),
  formulasNote,
  scoringTitle: "How the Scope Score is built",
  scoringIntro,
  categories: scored.categories,
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list. For Alphabet, net margin (50.0%) and the P/E against its average (0.61×) include gains on shares in other companies, so the Profitability and Valuation scores look more favorable than the core business alone would earn. Net debt uses the Dec 31, 2025 balance sheet, before debt rose to $125.1B.",
  valuationTitle: "How fair value is estimated",
  valuationIntro: "Two reference points, each with its own limit. None of them is a price forecast, and only the cash flow model sets the fair value.",
  methods: [
    { name: "Discounted cash flow", what: "Estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. This sets the fair value ($84 in the base case).", limit: "The result moves a lot when assumptions change, and about 69% of the value comes from after year 10. For Alphabet the starting cash flow is unusually low because of record capital spending, so the result is far below the share price." },
    { name: "Analyst price targets", what: "Shows the average of published targets from analysts who follow Alphabet, and the range of post-earnings targets named in the press.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price. The full range is not loaded yet." },
  ],
  // Alphabet's own sentence: its P/E history is shown separately and does not set the fair value.
  valuationNote: "Fair value is a model output under stated assumptions, not a price the stock will reach. Alphabet’s own P/E history is shown separately and does not set the fair value.",
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Sep 30, 2026", label: "Latest reporting period ends" },
    { date: "Oct 28, 2026", label: "Source date: reported 28 days later" },
    { date: "Nov 10, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q3 2026 (ended Sep 30, 2026)", sourceDate: "Oct 28, 2026", updated: "Nov 9, 2026", status: "Verified", limit: "GAAP basis. Annual figures use FY25 (ended Dec 31, 2025). Last-12-month figures add the last four quarters and match the company release." },
    { dataset: "Balance sheet", period: "Dec 31, 2025 (annual) and Sep 30, 2026 (text)", sourceDate: "Feb 2026 and Oct 28, 2026", updated: "Nov 9, 2026", status: "Verified", limit: "Charts and the Score use the year-end snapshot. Debt and marketable securities changed a lot in 2026, so the Sep 30, 2026 figures are given in the text." },
    { dataset: "Cash flow", period: "FY25 plus the latest quarters", sourceDate: "Oct 28, 2026", updated: "Nov 9, 2026", status: "Verified", limit: "Last-12-month free cash flow ($19.7B) matches the company’s own reconciliation." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 6, 2026 close", updated: "Nov 9, 2026", status: "Verified", limit: "Closing price only, and it moves every trading day." },
    { dataset: "Analyst estimates and targets", period: "Next 12 months", sourceDate: "Oct 30, 2026", updated: "Nov 10, 2026", status: "Pending", limit: "Consensus differs between providers and changes after earnings. The full range of targets is not loaded yet." },
    { dataset: "Rival financials", period: "Each company’s latest 12 months", sourceDate: "Oct to Nov 2026", updated: "Nov 2026", status: "Verified", limit: "Each company is on its own latest 12 months and latest fiscal year-end balance sheet, so the dates differ slightly. The exact dates are in the note under the Competitors charts. Amazon, Meta and OpenAI are not in the charts." },
    { dataset: "Cloud market comparison", period: "Q3 2026 (Jul to Sep)", sourceDate: "Oct to Nov 2026", updated: "Nov 10, 2026", status: "Pending", limit: "AWS and Azure revenue come from press summaries, and the segments are defined differently." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Alphabet does not report customer counts, so Scope shows Gemini users (1 billion), subscribers and cloud backlog instead." },
  ],
  source:
    "Sources: Alphabet, Microsoft and Apple filings and earnings materials, Financial Modeling Prep market data, TIKR consensus and press coverage of Alphabet’s Q3 2026 call, as of Nov 10, 2026. The score, fair value and ratings are Scope’s own methods, shown in full above.",
};

const bottomLine: BottomLineData = {
  title: "A very strong and fast-growing business, whose profit looks better than its cash",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for scale and growth, held back by cash profit that trails reported profit, and flattered by investment gains.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Strong", tone: "positive", text: "Sales up 22%, a 33% operating margin, Cloud growing 103% and a wide moat built on billions of users. The weak spot is cash: only $19.7B of free cash flow after $159.8B of capital spending.", href: "#moat", hrefLabel: "See the moat" },
    { icon: "ti-tag", label: "The price", verdict: "Hard to judge", tone: "caution", text: "A P/E of 14.9× looks cheap, but about 26× without investment gains. Our cash flow model gives a base value of $84 against $285, because it starts from a year of record spending. Starting from FY25 cash flow it would give about $302.", href: "#valuation", hrefLabel: "See the valuation" },
    { icon: "ti-alert-triangle", label: "What to watch", verdict: "Spending", tone: "caution", text: "Capital spending is guided to $195B to $205B in 2026 and to rise in 2027, paid for with new debt and new shares. Search growth slowed to 12%. The next report is in early February.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price, and a low-looking multiple can hide how the profit was made.",
};

const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what Alphabet earns, what protects it and what it costs. Keep building the picture.",
  companies: [
    { name: "Microsoft", ticker: "MSFT", reason: "Alphabet’s closest rival in cloud and AI assistants. Azure grew 48% last quarter.", href: "/company/microsoft" },
    { name: "NVIDIA", ticker: "NVDA", reason: "Sells the AI chips Alphabet buys, while Alphabet builds its own chips, called TPUs.", href: "/company/nvidia" },
    { name: "Apple", ticker: "AAPL", reason: "Alphabet pays Apple billions to be Safari’s default search, which a court still allows, though not exclusively.", href: "/company/apple" },
  ],
  ...closingShared,
};

const spotlight: SpotlightData = {
  title:
    "Alphabet’s business is booming, but AI spending cut its free cash flow from $73B to $20B in a year",
  lead:
    "Alphabet earns most of its money from ads on Search and YouTube, while Google Cloud, which sells computing power and AI to other companies, more than doubled last quarter. Keeping up costs a lot: capital spending was $159.8B in the last 12 months, so only a small part of the cash Alphabet earns is left. Reported profit also looks better than the business alone would earn, because of gains on shares in other companies.",
  labels: [],
  chart: {
    kind: "capex-vs-cash",
    title: "Cash coming in vs cash spent on data centers and equipment, FY25 and the last 12 months ($B)",
    howToRead:
      "Blue is cash from operations, red is spending on equipment and buildings. The line under each pair is what is left (free cash flow). The last 12 months run from Q4 2025 to Q3 2026.",
    years: ["FY25", "Last 12 months"],
    ocf: [164.7, 179.6],
    capex: [91.4, 159.8],
    left: [73.3, 19.7],
    callout:
      "In one year, capital spending rose from $91.4B to $159.8B, while cash from operations rose only from $164.7B to $179.6B, so free cash flow fell from $73.3B to $19.7B.",
  },
  numbers: [
    { value: "−$9.1B", label: "free cash flow in Q3 2026, against +$24.6B in Q4 2025", tone: "negative" },
    { value: "~$200B", label: "capital spending guided for 2026 ($195B to $205B), with a significant rise in 2027", tone: "negative" },
    { value: "+103%", label: "Google Cloud revenue growth in Q3 2026, to $30.7B", tone: "positive" },
    { value: "$129.6B", label: "pre-tax gains on shares in other companies in the last 12 months, which lift reported profit", tone: "neutral" },
  ],
  wins: [
    {
      title: "Cloud turns the spending into revenue",
      detail:
        "Cloud grew 103% to $30.7B with a 36.2% margin, and its backlog of signed contracts reached $561B.",
    },
    {
      title: "The core business still earns a lot",
      detail:
        "Alphabet earned $179.6B of operating cash flow in the last 12 months, at a 33.3% operating margin, so the core business is still very profitable.",
    },
  ],
  breaks: [
    {
      title: "Cash goes out faster than it comes in",
      detail:
        "Free cash flow was negative in Q3 2026, and Alphabet guides $195B to $205B of capital spending for 2026 and a significant rise in 2027. If AI demand slows, the spending is hard to reverse.",
    },
    {
      title: "New debt and new shares are paying for it",
      detail:
        "Long-term debt rose to $125.1B from $46.5B at the end of 2025, buybacks stopped in 2026 and Alphabet sold $12.4B of new stock in Q3.",
    },
  ],
  watch: {
    title: "Next report: does free cash flow stay close to break-even as spending steps up?",
    text:
      "Free cash flow was −7.1% of sales in Q3 2026. Capital spending guided for 2026 implies about $63B to $73B in the December quarter. The report expected in early February 2027 (date not yet confirmed) shows how much cash is left.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: Alphabet FY25 Form 10-K and Q3 2026 earnings release, call and Form 10-Q (Oct 28, 2026), as reported by CNBC and Yahoo Finance. Free cash flow is calculated by Scope as operating cash flow minus capital spending. Capital spending guidance is Alphabet’s own, not a result.",
};

export const googlePage: CompanyPageData & { spotlight: SpotlightData } = {
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