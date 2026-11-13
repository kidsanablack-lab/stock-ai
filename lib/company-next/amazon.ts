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
import { amazonScore } from "../scope-score/inputs";
import rawAmzn from "../../data/raw/AMZN.json";
import { buildFacts, type RawFmp, type Row } from "../company-data/facts";
import { cashAndReturnsNumbers, financialHighlightsMetrics, profitHistoryNumbers } from "../company-data/sections";

// DRAFT - needs review.
// Scope Score: numbers come from lib/scope-score (inputs.ts + config.ts).
const scored = applyScore(amazonScore.raw, amazonScore.display);

// Numbers from filings come from the saved API data (data/raw/AMZN.json), not from typing.
// Update them by running: npx tsx --env-file=.env.local scripts/fetch-company-data.ts AMZN
const facts = buildFacts(rawAmzn as unknown as RawFmp);
const cashNums = cashAndReturnsNumbers(facts);
const profitNums = profitHistoryNumbers(facts);

// P/E at each fiscal year end, read from the saved API data. Field names differ between API versions,
// so we try the likely ones. Years with a loss (no positive P/E) are left out. If none is found the chart shows only "Now".
const peAtYearEnd: { year: string; value: number }[] = [...((rawAmzn as unknown as RawFmp).ratios ?? [])]
  .sort((a: Row, b: Row) => String(a.date).localeCompare(String(b.date)))
  .map((r: Row) => {
    const v = [r.priceToEarningsRatio, r.priceEarningsRatio, r.peRatio].find((x) => typeof x === "number" && Number.isFinite(x) && (x as number) > 0);
    return { year: `’${String(r.date).slice(2, 4)}`, value: typeof v === "number" ? Number(v.toFixed(1)) : NaN };
  })
  .filter((x) => Number.isFinite(x.value));

// Amazon page data. Prices as of Nov 9, 2026 close. Latest quarter: Q3 2026 (ended Sep 30, 2026, reported Oct 29).
// Fiscal year = calendar year. FY21 to FY25 are the five full years shown (FY26 is not finished).

const hero: CompanyHeroData = {
  name: "Amazon.com, Inc.",
  ticker: "AMZN",
  sector: "Retail & Cloud",
  logo: "/logos/amazon-color-svgrepo-com.svg", // TODO: check this file exists in public/logos
  description:
    "The world’s largest online store, a marketplace for other sellers, an ads business and Prime, plus AWS, the cloud business that earns most of its profit.",
  score: Number(scored.total.toFixed(1)),
  scoreLabel: scored.label,
  scoreHref: "#score",
  dataStatus: "live",
  facts: [
    { label: "Market cap", value: "$2.89T", note: "As of Nov 9, 2026" },
    { label: "Revenue, last 12 months", value: "$797.5B", note: "+15.4% vs a year earlier", noteTone: "positive" },
    { label: "P/E ratio", value: "21.6×", note: "Boosted by investment gains. About 36× without them" },
    { label: "Free cash flow, last 12 months", value: "−$46.9B", note: "−5.9% of sales", noteTone: "negative" },
  ],
  source:
    "Financials from Amazon’s FY25 Form 10-K (year ended Dec 31, 2025) and the Q3 2026 earnings release (quarter ended Sep 30, 2026, reported Oct 29). Market data as of Nov 9, 2026. Next report: early February 2027, date not yet confirmed.",
};

const summary: CompanySummaryData = {
  title: "Amazon in 30 seconds",
  label: "AI summary",
  text: "Amazon sells goods online, runs a marketplace for other sellers, sells ads and Prime memberships, and rents out computing power through AWS. In the last 12 months sales grew 15.4% to $797.5B, and Amazon kept $13.10 of every $100 as operating profit. AWS is 23% of sales but 63% of operating profit. The catch is the bill: Amazon spent $215.2B on equipment in 12 months, mostly for AI data centers, so free cash flow was −$46.9B and it is now borrowing to pay for the build-out.",
  highlight: {
    eyebrow: "Where the sales come from",
    value: "23%",
    caption: "from AWS, Q3 2026",
    segments: [
      { label: "Online stores · about a third", share: 33.9 },
      { label: "Third-party seller services", share: 23.0 },
      { label: "AWS", share: 22.8 },
      { label: "Ads, subscriptions, physical stores, other", share: 20.3 },
    ],
  },
};

const scoreReasons: ScoreReasonsData = {
  title: `Why the Scope Score is ${scored.total.toFixed(1)}`,
  takeaway:
    "Amazon scores top marks for scale and a high 9.3 for growth and 9.1 for risk. Quality (3.3) is the weak spot: free cash flow has covered only 21% of net income over five years. Profitability (4.8) is held back by negative free cash flow, and net margin and P/E look better than they are because of one-time gains on Amazon’s stake in Anthropic.",
  reasons: [
    { name: "Quality", ...scored.reason["Quality"], value: "15.8%", label: "return on invested capital in FY25, but five-year free cash flow was only 21% of net income and the operating margin swung between 2.4% and 11.2%", href: "#history" },
    { name: "Scale", ...scored.reason["Scale"], value: "$2.89T", label: "market cap, with $797B of revenue in the last 12 months", href: "#competitors" },
    { name: "Profitability", ...scored.reason["Profitability"], value: "13.1%", label: "operating margin in the last 12 months, but free cash flow was −5.9% of sales", href: "#highlights" },
    { name: "Revenue growth", ...scored.reason["Revenue growth"], value: "+15.4%", label: "growth in the last 12 months, and 11.1% a year from FY21 to FY25", href: "#latest" },
    { name: "Risk", ...scored.reason["Risk"], value: "33.9%", label: "of Q3 2026 sales from online stores, the largest line. Net cash is from the FY25 balance sheet, and by Sep 30, 2026 Amazon had about $66B more debt than cash", href: "#strengths-risks" },
    { name: "Valuation", ...scored.reason["Valuation"], value: "21.6×", label: "P/E, against its own 5-year average of 43.1×, but investment gains make it look lower than it is", href: "#valuation" },
  ],
  howToRead:
    "A is the strongest grade and F the weakest. Green means strong, amber mixed, red weak. Each grade comes from a 0 to 10 category score, and the overall score is their weighted average. The inputs, weights and cut-offs are listed under Sources and method. Net margin and P/E use reported (GAAP) profit, which includes about $69.5B of other income in the last 12 months, mostly gains on Amazon’s Anthropic stake, so the Profitability and Valuation grades are higher than the core business alone would earn.",
};

const whatChanged: WhatChangedData = {
  title: "Sales grew 12% to $201.9B and AWS sped up to 39%, but spending of $75.9B turned free cash flow deeply negative",
  lead: "What changed since the last report: Q3 2026, the quarter ended Sep 30, 2026 (reported Oct 29). The next report, Q4 2026, is expected in early February 2027.",
  metrics: [
    { label: "Revenue", value: "$201.9B", change: "+12.1% vs a year ago", tone: "positive", series: [180.2, 213.4, 181.5, 200.6, 201.9], note: "AWS added $13.0B of the extra $21.8B. Prime Day moved into the June quarter this year, which held back Q3 growth." },
    { label: "Operating income", value: "$28.1B", change: "+61.2% vs a year ago", tone: "positive", series: [17.4, 25.0, 23.9, 27.5, 28.1], note: "A record operating margin of 13.9%, up from 9.7% a year ago." },
    { label: "Net income", value: "$20.7B", change: "−2.4% vs a year ago", tone: "negative", series: [21.2, 21.2, 30.3, 62.6, 20.7], note: "GAAP profit fell although operating income rose 61%, because last year’s Q3 included $9.5B of gains on Anthropic. Q2 2026 was $62.6B because of Anthropic gains, so operating income is the cleaner measure." },
    { label: "AWS revenue", value: "$46.0B", change: "+39.3% vs a year ago", tone: "positive", series: [33.0, 35.6, 37.6, 42.2, 46.0], note: "Operating income of $17.8B, a 38.7% margin, up from 34.6%. The Q2 figure is calculated by Scope from the $3.8B sequential increase Amazon reported." },
  ],
  growth: {
    bars: [
      { quarter: "Q4", fy: "FY25", value: 213.4, yoy: 13.6 },
      { quarter: "Q1", fy: "FY26", value: 181.5, yoy: 16.6 },
      { quarter: "Q2", fy: "FY26", value: 200.6, yoy: 19.6 },
      { quarter: "Q3", fy: "FY26", value: 201.9, yoy: 12.1 },
    ],
    verdictLabel: "Slower in Q3",
    before: "19.6%",
    after: "12.1%",
    verdict: "Sales growth eased to 12.1% from 19.6% a quarter earlier. Part of the swing is timing: Prime Day moved into the June quarter this year.",
    watch: "Next is the December quarter. Amazon guides net sales of $240.0B to $247.0B, or about 12% to 16% growth against $213.4B a year ago, so growth is expected to pick up slightly from Q3.",
  },
  estimates: [
    { label: "EPS (earnings per share)", unit: "$", actual: 1.89, estimate: 1.96 },
  ],
  good: [
    { title: "AWS sped up and its backlog more than doubled", detail: "$46.0B, +39%, with a 38.7% margin", meaning: "AWS is 23% of Amazon’s sales but 63% of its operating profit. Its backlog of signed contracts reached $578B, up from $244B at the end of 2025, with about 6.1 years left on average. Management says AWS growth should be above 40% in both 2027 and 2028." },
    { title: "Retail profit rose faster than sales", detail: "North America margin 7.7%, up from 4.5%", meaning: "North America operating income rose to $8.7B from $4.8B, and International to $1.6B from $1.2B. Management expects the cost to serve each unit to fall for a fourth year in a row." },
    { title: "Seller fees and subscriptions kept growing", detail: "$46.5B (+9.4%) and $14.0B (+11.4%)", meaning: "These are fees from sellers who use Amazon’s marketplace and delivery, and Prime and other memberships. Both build on the customers the stores already have." },
  ],
  watch: [
    { title: "Free cash flow is deeply negative", detail: "−$42.4B over 12 months, as Amazon reports it · Q3 capital spending $75.9B", meaning: "Amazon spent 37.6% of its quarterly sales on equipment, mostly AI data centers. It guides about $220B of capital spending for 2026 and says 2027 will be meaningfully higher." },
    { title: "Profit is flattered by investment gains", detail: "Net income $134.8B vs operating income $104.4B over 12 months", meaning: "About $69.5B of that profit is other income, mostly gains on Amazon’s Anthropic stake. These gains do not repeat and can reverse. Earnings per share of $1.89 came in below the $1.96 analysts expected, and the shares fell about 7% the next day." },
    { title: "Debt has nearly tripled", detail: "Long-term debt $173.1B, up from $65.6B at the end of 2025", meaning: "Interest expense was $1.7B in Q3, about three times last year’s $0.5B. Amazon also has $159.6B of purchase obligations for property and equipment." },
  ],
  source:
    "Sources: Amazon Q3 2026 earnings release (Form 8-K, Oct 29, 2026) and earnings call, as reported by Yahoo Finance (GuruFocus); a third-party SEC filing analysis (sec-api.io) for Q3 2026 10-Q figures such as capital spending, backlog, debt and obligations; 24/7 Wall St for the EPS estimate and the share price move; Amazon’s Q4 2025 release for the Q4 2025 operating income. Year-ago figures are from Amazon’s earlier releases. Q2 2026 AWS revenue is calculated by Scope from the reported $3.8B sequential increase. The Q1 2026 AWS figure is from a press summary (to confirm).",
};

const signalsToWatch: SignalsToWatchData = {
  title: "Next report: growth has to land inside the guided 12% to 16%, and the operating margin has to hold near 12% to 14%",
  lead: "Three numbers will show whether Amazon’s December quarter is good or not. Each one shows where last quarter, a year ago and Amazon’s own guidance sit, and what counts as strong or weak.",
  labels: ["Real data", "Scope’s own thresholds"],
  next: {
    date: "Early February 2027 (tentative)",
    note: "Q4 2026, the December quarter and Amazon’s biggest quarter of the year. Amazon reported its December quarter on Feb 5 last year, but has not confirmed this year’s date.",
  },
  howToRead:
    "Each track runs from weak (red) to strong (green). The dot is last quarter and the tick is the same quarter a year ago. The red and green zones are Scope’s own thresholds, set around Amazon’s guidance.",
  signals: [
    {
      name: "Revenue growth",
      question: "Does growth land in the guided 12% to 16% range against last year’s $213.4B December quarter?",
      guidance: "Net sales of $240.0B to $247.0B, or about 12% to 16% growth",
      format: "signedPercent",
      range: [5, 25],
      weakBelow: 12,
      strongFrom: 16,
      yearAgo: 13.6,
      lastQuarter: 12.1,
    },
    {
      name: "Operating margin",
      question: "Does the margin stay in the guided range even though most Amazon Leo satellite costs are expensed in Q4?",
      guidance: "Operating income of $28.5B to $33.5B, about 11.9% to 13.6% of guided sales, calculated by Scope",
      format: "percent",
      range: [8, 16],
      weakBelow: 12,
      strongFrom: 13.5,
      yearAgo: 11.7,
      lastQuarter: 13.9,
    },
    {
      name: "AWS revenue growth",
      question: "Does AWS growth move toward the 40% that management expects for 2027?",
      guidance: "No quarterly forecast. Management projects growth above 40% in both 2027 and 2028",
      format: "signedPercent",
      range: [20, 50],
      weakBelow: 36,
      strongFrom: 40,
      yearAgo: 24,
      lastQuarter: 39.3,
    },
  ],
  source:
    "Sources: Amazon Q3 2026 earnings release and call (Oct 29, 2026) for the guidance and management comments; Amazon’s Q4 2025 release (Feb 5, 2026) for the year-ago AWS growth (+24%). The operating margin guide is calculated by Scope: $28.5B ÷ $240.0B and $33.5B ÷ $247.0B. The next report date is tentative. Red and green zones are Scope’s own thresholds and are not a forecast.",
};

const whereMoneyComes: WhereMoneyComesData = {
  title: "A third of sales come from online stores, but AWS earns almost two thirds of the profit",
  lead: "$201.9B of revenue in Q3 2026 (quarter ended Sep 30, 2026), split by what Amazon sells, by profit and by segment. Scope uses the latest quarter here because the annual breakdown for FY25 is not loaded yet.",
  labels: ["From Q3 2026 results"],
  products: [
    { name: "Online stores", share: 33.9, value: 68.47, yoy: 1.6, note: "Goods Amazon sells itself on its websites and apps" },
    { name: "Third-party seller services", share: 23.0, value: 46.49, yoy: 9.4, note: "Fees from sellers for selling, storing and shipping through Amazon" },
    { name: "AWS", share: 22.8, value: 45.98, yoy: 39.3, note: "Cloud computing, storage and AI services for businesses" },
    { name: "Advertising services", share: 9.7, value: 19.64, yoy: 10.9, note: "Ads sold to brands and sellers on Amazon and its video services" },
    { name: "Subscription services", share: 6.9, value: 14.01, yoy: 11.4, note: "Prime and other memberships" },
    { name: "Physical stores", share: 2.8, value: 5.71, yoy: 2.4, note: "Whole Foods Market and other physical stores" },
    { name: "Other", share: 0.8, value: 1.65, yoy: 16.3, note: "Shipping services, licensing and other" },
  ],
  donutHowToRead:
    "Each slice is what Amazon sells, sized by its share of sales. Hover or tap a slice or a row to see its dollars. The pill shows growth versus Q3 2025. Online stores and advertising were held back by Prime Day moving into the June quarter.",
  profit: {
    title: "AWS is 23% of sales but 63% of operating profit",
    explain:
      "Operating profit is revenue minus the costs of that business. Amazon keeps $38.70 of every $100 of AWS sales, but only $6.60 of every $100 in its two store segments (North America and International), where it sells goods and runs delivery. The segments add up to Amazon’s $28.1B of operating income. Here “Products” means the store segments and “Services” means AWS.",
    revenueTotal: "$201.9B",
    profitTotal: "$28.1B",
    productsRevenue: 77.2,
    servicesRevenue: 22.8,
    productsProfit: 36.7,
    servicesProfit: 63.3,
    productsMargin: "6.6%",
    servicesMargin: "38.7%",
    servicesHistoryTitle: "AWS share of Amazon’s sales",
    servicesHistory: [
      { year: "Q3 ’25", share: 18.3 },
      { year: "Q3 ’26", share: 22.8 },
    ],
  },
  regions: {
    title: "North America is 56% of sales, and AWS has grown from 18% to 23% of sales in a year",
    lead: "Amazon reports three segments instead of regions: North America and International (its stores and related services) and AWS, which sells to customers worldwide. Q3 2026 sales by segment, and how each changed versus Q3 2025.",
    items: [
      { name: "North America", share: 55.9, value: 112.85, yoy: 6.2 },
      { name: "International", share: 21.3, value: 43.11, yoy: 5.4 },
      { name: "AWS", share: 22.8, value: 45.98, yoy: 39.3 },
    ],
    focus: {
      name: "AWS",
      value: 45.98,
      yoy: 39.3,
      historyTitle: "Share of Amazon’s sales",
      history: [
        { year: "Q3 ’25", share: 18.3 },
        { year: "Q3 ’26", share: 22.8 },
      ],
      note: "AWS sells to customers around the world, so it is not a region. This table does not split AWS sales by country. North America and International grew 6.2% and 5.4% as Prime Day moved out of the quarter.",
    },
    howToRead:
      "Each box’s area is the segment’s share of Q3 2026 sales. The pill shows growth versus Q3 2025. Every segment grew.",
  },
  source:
    "Source: Amazon Q3 2026 earnings release (quarter ended Sep 30, 2026): net sales by groups of similar products and services, and segment results. Q3 2025 figures are from the same release. Shares and growth rates are calculated by Scope and rounded to one decimal, so a total can differ from 100% by 0.1. Advertising growth is +10.9% as reported; press summaries of the call cite +12%, which may exclude currency effects (to confirm).",
};

const financialHighlights: FinancialHighlightsData = {
  title: "Sales are up 53% since FY21 and operating profit is 3 times higher, but free cash flow is only $7.7B because spending on equipment more than doubled",
  lead: "Fiscal year 2025 (ended Dec 31, 2025) compared with FY24 and the four years before it.",
  labels: ["From FY25 10-K"],
  years: facts.years,
  metrics: financialHighlightsMetrics(facts, {
    "Revenue": "Total sales for the year. Up 53% since FY21, and up 12.4% in FY25, the fastest of the last four years.",
    "Net income": "Final profit after all costs and tax: $77.7B, up from $59.2B in FY24. It includes gains on Amazon’s Anthropic stake (at least $9.5B before tax in Q3 2025), so operating income ($80.0B, up from $68.6B) is the cleaner measure. FY22 was a loss of $2.7B.",
    "Earnings per share": "Diluted profit per share, up from $5.53. Diluted shares rose from 10.30B to 10.83B in four years, and Amazon has bought back no shares since FY22.",
    "Free cash flow": "Operating cash flow ($139.5B) minus spending on equipment and buildings ($131.8B). It was negative in FY21 and FY22, and over the last 12 months it fell to −$46.9B as capital spending kept rising.",
    "Operating margin": "Amazon keeps about $11 of every $100 sold after running the business, before tax, up from $5 in FY21.",
    "Net margin": "Amazon keeps $10.80 of every $100 sold as final profit.",
  }),
  howToRead:
    "The big number is FY25. The pill compares it with FY24: green is better, red is worse. The bars show five years and the colored bar is FY25.",
  source:
    "Source: Amazon Form 10-K for FY25 (year ended Dec 31, 2025), income statement and cash flow statement. Free cash flow is calculated by Scope as operating cash flow minus capital spending (purchases of property and equipment, before proceeds from sales and incentives).",
};

const valuation: ValuationData = {
  title: "Scope does not show a fair value for Amazon, because AI spending has pushed free cash flow below zero",
  lead: "Is the share price high or low compared with its own history and with what analysts expect? Without a cash flow model, these are the two reference points we can show.",
  labels: ["Market data as of Nov 9, 2026", "Analyst view"],
  price: 266.93,
  priceDate: "Nov 9, 2026",
  fair: null,
  noFair: {
    title: "Why there is no fair value for Amazon",
    text: "Scope’s fair value model starts from the last 12 months of free cash flow. For Amazon that number is −$46.9B, because it spent $215.2B on equipment and buildings while operations brought in $168.3B of cash. A model that starts below zero gives a negative value per share in every case, which says nothing about what Amazon is worth. The spending is meant to serve AWS contracts, whose backlog is $578B. Whether it earns a return is the real question, and one year of cash flow cannot answer it.",
    points: [
      { label: "Free cash flow, 12 months", value: "−$46.9B", note: "Amazon itself reports −$42.4B, after proceeds and incentives" },
      { label: "Capital spending guide, 2026", value: "About $220B", note: "Management says 2027 will be meaningfully higher" },
      { label: "AWS backlog", value: "$578B", note: "Up from $244B at the end of 2025" },
    ],
  },
  field: {
    max: 450,
    title: "Where today’s price sits against analyst targets",
    rows: [
      { name: "Analyst targets", low: 250, high: 390, mark: 328, markName: "Average" },
    ],
    howToRead:
      "The bar is the range of analyst price targets and the dot is their average. The dashed line is today’s price: where it sits to the left of the dot, the price is below the average target. Targets are opinions, usually for 12 months ahead, and are not Scope’s estimate.",
  },
  history: {
    title: "Amazon’s P/E of 21.6× looks low against its own average of 43×, but without Anthropic gains it is about 36×",
    years: [...peAtYearEnd, { year: "Now", value: 21.6 }],
    peSubtitle: "Price divided by the last 12 months of earnings, at each fiscal year end, and now",
    peHowToRead:
      "P/E is the price you pay for each $1 of yearly profit. The blue bar is now, and the dashed line is the average of the fiscal year ends before it. Years with a loss have no P/E and are left out. Now is low partly because profit includes about $69.5B of other income in the last 12 months, mostly gains on Amazon’s Anthropic stake.",
    multiples: [
      { name: "P/E", now: 21.6, avg: 43.1 },
      { name: "P/E without investment gains (Scope estimate)", now: 36.0, avg: 43.1 },
      { name: "EV/EBITDA", now: 11.4, avg: 20.2 },
    ],
    multiplesHowToRead:
      "Each bar shows how far Amazon’s multiple is above or below its own 5-year average, taken at fiscal year ends. A full bar means 50% or more away from it. The second row removes about $69.5B of other income, taxed at the 22.3% rate of the last 12 months, so it is an estimate, not a reported figure. EV/EBITDA adds back depreciation, which is very large for Amazon.",
  },
  source:
    "Sources: share price $266.93 (Nov 9, 2026 close), the P/E and EV/EBITDA averages, and analyst targets (low $250, high $390, average $328) from Financial Modeling Prep. Other providers show a different range: a Nov 2026 summary of 60 analysts gives $230 to $405 with an average of $332 (Stocktwits, citing Koyfin). Free cash flow, capital spending and other income are from Amazon’s Q3 2026 earnings release and 10-Q (as summarised by sec-api.io). P/E without gains is calculated by Scope: last-12-month net income of $134.8B minus $69.5B of other income taxed at 22.3%, divided by about 10.9B shares. Scope shows no fair value for Amazon. Analyst targets are opinions, not advice.",
};

const profitHistory: ProfitHistoryData = {
  title: "Sales grew 11.1% a year and operating profit 33.9% a year, as the operating margin more than doubled from 5.3% to 11.2%",
  lead: "Five years of results, FY2021 to FY2025: how fast Amazon grew, how much profit it keeps from each sale, and how well it uses its money.",
  labels: ["From 10-K filings"],
  years: profitNums.years,
  revenue: profitNums.revenue,
  grossProfit: profitNums.grossProfit,
  operatingIncome: profitNums.operatingIncome,
  netIncome: profitNums.netIncome,
  fcf: profitNums.fcf,
  growth: {
    title: "Steady growth of 9% to 12% a year, with profit swinging much more than sales",
    howToRead:
      "Top: average growth per year over four years. Bottom: change from the year before, with one group of bars per year. Bars above the line are growth, bars below are a fall.",
    note: "Sales grew 9.4% in FY22, 11.8% in FY23, 11.0% in FY24 and 12.4% in FY25, then 15.4% over the last 12 months. Operating income fell to $12.2B in FY22 (a 2.4% margin), then rose to $36.9B, $68.6B and $80.0B. Net income was a $2.7B loss in FY22. Free cash flow was negative in FY21 and FY22, peaked at $32.9B in FY24 and fell to $7.7B in FY25 as capital spending rose from $52.7B in FY23 to $131.8B.",
  },
  margins: {
    title: "Gross margin is up 8.3 points since FY21, and operating margin 5.9 points",
    howToRead:
      "Each line is one margin over five years, with the ring on FY25. The pill is the change in percentage points since FY21. Net margin (10.8% in FY25) includes gains on Amazon’s Anthropic stake, so operating margin is the cleaner measure.",
  },
  returns: {
    title: "Amazon earns more on its money than the money costs, though returns dipped in FY25 as the balance sheet grew",
    roic: profitNums.returns.roic,
    roicFrom: profitNums.returns.roicFrom,
    wacc: 8,
    text: `For every $100 put into the business, Amazon earns about $${profitNums.returns.roic} a year after tax, up from $${profitNums.returns.roicFrom} in ${profitNums.returns.roicFromYear}.`,
    note: "ROIC is operating profit after tax divided by average shareholders’ equity plus debt. Cost of capital (8%) is Scope’s own assumption, the same as in the other company pages. ROIC was 19.8% in FY24 and 15.7% in FY25 as equity and debt grew faster than profit. ROE is about 22%. The balance sheet grew again in 2026: long-term debt rose to $173.1B and equity to $613.6B by Sep 30, so ROIC is likely to fall further.",
  },
  tableTitle: "Every number behind the charts",
  source:
    "Source: Amazon Form 10-K for FY21 to FY25 (income statement, balance sheet and cash flow statement). Fiscal years end on Dec 31. Margins, growth rates, free cash flow and returns are calculated by Scope.",
};

const cashAndReturns: CashAndReturnsData = {
  title: "Amazon pays no dividend and has not bought back shares since 2022, and it now borrows to fund AI spending",
  lead: "How much cash Amazon makes, how much it gives back through buybacks and dividends, and whether it still holds more cash than debt.",
  labels: ["From 10-K filings"],
  years: cashNums.years,
  fcf: cashNums.fcf,
  dividends: cashNums.dividends,
  buybacks: cashNums.buybacks,
  returned: {
    title: "In five years Amazon returned $6B, all of it a FY22 buyback, and earned $41B of free cash flow",
    howToRead:
      "Each year has two bars: the free cash flow Amazon earned and what it paid out as dividends and buybacks. The pill is payout as a share of free cash flow, and turns dark blue above 100%. Amazon paid out nothing in four of the five years, and free cash flow was negative in two of them.",
    fcfNote:
      "Free cash flow is cash from operations ($139.5B in FY25) minus spending on equipment and buildings ($131.8B), which leaves $7.7B. Over the last 12 months it was −$46.9B.",
  },
  how: {
    title: "Nothing is paid out, so the share count rises slowly instead of falling",
    sharesTitle: "Diluted shares (billions)",
    shares: cashNums.shares,
    stats: [
      { label: "Returned in FY25", value: "$0", note: "No dividends and no buybacks" },
      { label: "Dividend per share", value: "None", note: "Amazon pays no dividend, per its filings" },
      { label: "Dividend yield", value: "0%", note: "No cash comes back as dividends" },
      { label: "Payout ratio", value: "0%", note: "of net income" },
    ],
    // tsr: add later, when real price history is available.
  },
  cushion: {
    title: "Amazon held $57B more cash than debt at the end of 2025, but now owes about $66B more than it holds",
    cash: cashNums.cash,
    debt: cashNums.debt,
    equity: cashNums.equity,
    currentAssets: cashNums.currentAssets,
    currentLiabilities: cashNums.currentLiabilities,
    currentRatioNote:
      "A ratio near 1 is common for Amazon: customers pay before many suppliers do. On Sep 30, 2026 current assets were $255.1B against $258.0B of current liabilities, a ratio of 0.99.",
    howToRead:
      "Net cash is cash and short-term investments minus interest-bearing debt. The charts use year-end balance sheets (FY25: Dec 31, 2025), which do not yet show the 2026 borrowing. On Sep 30, 2026 Amazon had $114.2B of cash and marketable securities and $180.3B of debt, so net debt was about $66.1B. Leases are not counted: operating leases were $100.3B and finance leases $14.5B.",
  },
  source:
    "Sources: Amazon Form 10-K for FY21 to FY25 (cash flow statement and balance sheet; FY25 as of Dec 31, 2025); Amazon Q3 2026 earnings release (balance sheet at Sep 30, 2026) and a third-party SEC filing analysis (sec-api.io) for debt, leases and the dividend and buyback history. Buybacks are the cash paid in the year. Debt is short-term plus long-term debt, without leases; at Sep 30, 2026 Scope uses the $180.3B total carrying value of debt. Free cash flow is calculated by Scope.",
};

const strengthsRisks: StrengthsRisksData = {
  title: "Amazon’s strengths are broad and AWS is accelerating, but spending is outrunning cash flow, debt is rising and a new FTC lawsuit adds legal risk",
  lead: "What Amazon does well, what could go wrong, and how big each risk is. Every point comes with a number that backs it up.",
  labels: ["Real data", "Scope’s own ratings"],
  strengthsIntro: "What gives Amazon an edge, and the numbers that back it up.",
  strengths: [
    { icon: "ti-shield-check", name: "Competitive advantage", finding: "A huge delivery network, a marketplace full of sellers and the largest cloud business all build on each other.", evidence: [{ value: "$578B", label: "AWS backlog of signed contracts, up from $244B at the end of 2025" }, { value: "+12%", label: "growth in paid units sold in Q3 2026" }], why: "Scale keeps the cost of each item and each computing task falling, and gives customers few reasons to leave." },
    { icon: "ti-cloud", name: "AWS growth", finding: "AWS is the biggest cloud and is growing faster again.", evidence: [{ value: "+39.3%", label: "AWS revenue growth in Q3 2026, to $46.0B" }, { value: "38.7%", label: "AWS operating margin in Q3 2026, up from 34.6%" }], why: "AWS made 63% of Amazon’s operating income on 23% of its sales." },
    { icon: "ti-chart-bar", name: "Improving profitability", finding: "Amazon keeps more of each dollar than it did a few years ago.", evidence: [{ value: "13.9%", label: "operating margin in Q3 2026, a record" }, { value: "11.2%", label: "operating margin in FY25, up from 2.4% in FY22" }], why: "More profit left to reinvest." },
    { icon: "ti-rocket", name: "Growth", finding: "Sales are growing faster at $800B a year than they did at $640B.", evidence: [{ value: "+15.4%", label: "revenue growth, last 12 months" }, { value: "$240B to $247B", label: "net sales guided for Q4 2026, about 12% to 16% growth" }], why: "Fast growth at this scale is rare." },
    { icon: "ti-refresh", name: "Recurring revenue", finding: "Memberships and seller fees bring repeat income, and AWS contracts last for years.", evidence: [{ value: "$14.0B", label: "subscription revenue in Q3 2026, up 11.4%" }, { value: "6.1 years", label: "average time left on the AWS backlog" }], why: "Steadier income than one-off sales." },
    { icon: "ti-coin", name: "Financial capacity", finding: "Operations produce a large amount of cash, and Amazon has raised debt in 2026 to fund the rest of its build-out.", evidence: [{ value: "$168.3B", label: "operating cash flow, last 12 months, up 29%" }, { value: "$114.2B", label: "cash and marketable securities on Sep 30, 2026" }], why: "Amazon can pay for part of its AI spending from its own cash flow, but not all of it." },
  ],
  risksIntro: "Ranked from highest to lowest. Every rating comes with the reason for it.",
  risks: [
    { icon: "ti-cash", name: "Spending and cash", level: 3, finding: "Capital spending is far above the cash Amazon earns.", evidence: [{ value: "−$42.4B", label: "free cash flow in the last 12 months, as Amazon reports it (Scope’s figure: −$46.9B)" }, { value: "About $220B", label: "capital spending guided for 2026, with meaningfully more in 2027" }], why: "Spending was $75.9B in Q3 alone, 37.6% of sales. If AI demand slows, the equipment is hard to repurpose. Purchase obligations for property and equipment were $159.6B on Sep 30, 2026." },
    { icon: "ti-gavel", name: "Regulation and lawsuits", level: 3, finding: "US regulators are suing Amazon over how it runs its ad auctions, and other antitrust cases are still open.", evidence: [{ value: "Aug 31, 2026", label: "the FTC and 22 states sued over a hidden surcharge in sponsored-ads auctions, saying Amazon took tens of billions of dollars from advertisers" }, { value: "$2.5B", label: "paid in 2025 to settle the FTC’s Prime case" }], why: "Private class actions in the UK, the US and Canada claim billions of dollars, and other antitrust cases are pending. Amazon’s response to the new suit is not in our sources." },
    { icon: "ti-building-bank", name: "Debt and funding", level: 2, finding: "Amazon now borrows heavily to pay for the build-out.", evidence: [{ value: "$173.1B", label: "long-term debt on Sep 30, 2026, up from $65.6B at the end of 2025" }, { value: "$1.7B", label: "interest expense in Q3 2026, about three times the $0.5B of a year earlier" }], why: "Net debt was about $66B on Sep 30, 2026, against net cash of $57B at the end of 2025. Interest costs will keep rising if borrowing continues." },
    { icon: "ti-trending-up", name: "Investment gains", level: 2, finding: "Reported profit depends on the value of Amazon’s stake in Anthropic.", evidence: [{ value: "$69.5B", label: "other income in the last 12 months, mostly gains on Anthropic" }, { value: "$0.04B", label: "upward adjustments to private investments in Q3 2026, against $62.9B over the first nine months" }], why: "These gains do not repeat and can reverse. Net income was $134.8B in the last 12 months against operating income of $104.4B. Scope looks at operating income for this reason." },
    { icon: "ti-swords", name: "Cloud competition and AI demand", level: 2, finding: "Rivals are growing faster in cloud, and Amazon does not say how much of its backlog comes from AI labs.", evidence: [{ value: "+103%", label: "Google Cloud growth in Q3 2026, against +48% for Azure and +39% for AWS" }, { value: "44%", label: "AWS share of the big three’s cloud revenue over 12 months, down from 48% a year earlier" }], why: "AWS is still the largest at $46.0B a quarter, but it is losing share to Microsoft and Google. Amazon does not break out how much of its $578B backlog comes from AI labs such as Anthropic or OpenAI." },
    { icon: "ti-truck-delivery", name: "Retail costs, tariffs and Leo", level: 1, finding: "Shipping costs, tariffs and the Amazon Leo satellite project squeeze the retail side.", evidence: [{ value: "+11%", label: "growth in shipping costs in Q3 2026, against 12% growth in units" }, { value: "8 times", label: "tariffs are named in the first 19 risk factors of the FY25 annual report, up from 2 the year before" }], why: "Amazon expects higher fuel and line-haul costs in Q4. Commercial service for Amazon Leo is delayed, and most Leo costs will be expensed in Q4." },
  ],
  risksHowToRead:
    "Three filled bars mean High, two mean Medium, one means Low. Ratings are Scope’s own assessment from the evidence shown, not investment advice.",
  source:
    "Sources: Amazon Q3 2026 earnings release and call (Oct 29, 2026) as reported by Yahoo Finance; a third-party SEC filing analysis of the Q3 2026 Form 10-Q (sec-api.io) for obligations, debt, backlog and legal items; the FTC press release of Aug 31, 2026; press summaries of the Q3 2026 reports of AWS, Azure and Google Cloud for the cloud comparison. All risk ratings are Scope’s own.",
};

const moatEcosystem: MoatEcosystemData = {
  title: "Amazon’s moat is wide because its scale lowers costs for shoppers, sellers and cloud customers, and the main threats are regulators and cloud rivals",
  lead: "Why rivals struggle to take Amazon’s customers, how the loop keeps them buying, and who Amazon depends on in return.",
  labels: ["Real data", "Scope’s own ratings"],
  moatTitle: "How wide is the moat",
  moatIntro: "Five possible sources of advantage. A source only scores high if we can show evidence for it. Being famous or large is not enough.",
  sources: [
    { name: "Cost advantage", score: 9, weight: 25, test: "Can Amazon make or deliver things cheaper than rivals?", answer: "Yes. Its delivery network and data centers are built at a scale few can match, and Amazon says the cost to serve each unit should fall for a fourth year in a row.", evidence: { value: "+11%", label: "growth in shipping costs in Q3 2026, against 12% growth in units" }, wear: "Fuel, line-haul costs and tariffs are rising, and the AI build-out is expensive.", trend: "stable" },
    { name: "Network effects", score: 8, weight: 25, test: "Does the product get better as more people join?", answer: "Yes. More shoppers attract more sellers, and more sellers give shoppers more choice and faster delivery.", evidence: { value: "$46.5B", label: "seller services revenue in Q3 2026, up 9.4%" }, wear: "Regulators are challenging how Amazon treats advertisers, and its marketplace rules are under review.", trend: "eroding" },
    { name: "Switching costs", score: 7, weight: 20, test: "Would a customer lose something by leaving?", answer: "Partly. AWS customers run code, data and contracts on it, but shoppers can leave Prime at any time.", evidence: { value: "6.1 years", label: "average time left on the contracts in the AWS backlog" }, wear: "Google Cloud and Azure are growing faster than AWS.", trend: "stable" },
    { name: "Brand power", score: 7, weight: 15, test: "Can Amazon charge more because of its name?", answer: "Partly. Prime and the Amazon name bring shoppers back, but comparing prices is easy.", evidence: { value: "+12%", label: "growth in paid units in Q3 2026" }, wear: "Lower-priced rivals pull on price-sensitive shoppers.", trend: "stable" },
    { name: "Intangible assets", score: 7, weight: 15, test: "Does Amazon own things rivals cannot copy?", answer: "Partly. Its own chips, cloud software and delivery know-how are hard to copy, but AI models are built by others too.", evidence: { value: "Nearly 17×", label: "growth in AI token volume through Amazon’s Bedrock service in a year" }, wear: "AI changes fast, so today’s lead has to be earned again each cycle.", trend: "stable" },
  ],
  notCounted: { name: "Efficient scale", text: "Not counted. Online retail and cloud are huge markets with strong rivals, so market size alone does not protect Amazon." },
  narrowing:
    "Court cases over advertising and seller practices could change how Amazon runs its marketplace, and faster-growing cloud rivals could narrow AWS’s lead.",
  moatHowToRead:
    "Each source is scored from 0 to 10. Strong is 8 to 10, Moderate 5 to 7, Weak 0 to 4. The moat score is a weighted average, and the weights are Scope’s own judgement for an online retail and cloud company. The scores are ratings, not measured figures.",
  loop: {
    title: "Why one customer keeps buying",
    intro: "Each turn makes the next one more likely.",
    steps: [
      { title: "Join Prime", text: "Fast delivery and Prime Video bring a shopper in. Subscription revenue was $14.0B in Q3 2026." },
      { title: "Shop more", text: "Delivery speed and a huge choice bring more purchases. Paid units grew 12% in Q3 2026." },
      { title: "Sellers follow the shoppers", text: "More sellers list on Amazon, and seller services brought in $46.5B in Q3 2026." },
      { title: "Scale cuts cost", text: "More volume spreads the cost of warehouses and delivery, and the cash helps fund AWS and new projects." },
      { title: "Better service brings them back", text: "Lower cost per unit and faster delivery keep the shopper inside Prime." },
    ],
    center: "Flywheel",
    centerSub: "each turn adds revenue",
    note: "This is a loop that can happen, not a result that is guaranteed.",
  },
  reliance: {
    title: "Who Amazon relies on",
    intro: "Ranked by how hard the group would be to replace. More filled bars mean more reliance.",
    rows: [
      { group: "Suppliers", level: 3, who: "Chip makers, server and networking suppliers, power providers and carriers", gives: "Chips, equipment, electricity and transport capacity", gets: "Very large, steady orders", note: "Amazon has $159.6B of purchase obligations for property and equipment. Few suppliers of AI chips and power can be swapped quickly, though Amazon designs its own Trainium chips." },
      { group: "Sellers", level: 2, who: "Small and large businesses selling through Amazon", gives: "Most of the products on the site, and fees", gets: "Access to shoppers, delivery and ads", note: "Seller services were $46.5B in Q3 2026. Sellers can also sell elsewhere, but Amazon’s shoppers are hard to replace." },
      { group: "AI customers and partners", level: 2, who: "AI labs, enterprises and governments, including Anthropic", gives: "Money and large multi-year contracts", gets: "Computing power and AI services", note: "The $578B backlog is not broken down by customer. Anthropic is also a stake Amazon holds, which has fed its reported profit." },
      { group: "Competitors", level: 2, who: "Walmart, Microsoft, Google and other online marketplaces", gives: "Pressure on price, speed and features", gets: "A rival to beat", note: "AWS competes mainly with Azure and Google Cloud, which grew faster than AWS in Q3 2026 (+48% and +103%, against +39%).", rival: true },
      { group: "Advertisers", level: 1, who: "Brands and sellers", gives: "Ad payments, $19.6B in Q3 2026", gets: "Access to shoppers close to the moment they buy", note: "Advertisers have other places to spend, but few reach shoppers so near a purchase. The FTC alleges that Amazon added hidden surcharges to its ad auctions." },
      { group: "Shoppers", level: 1, who: "Consumers and Prime members", gives: "Money and repeat purchases", gets: "Delivery, choice and memberships", note: "Spread across a very large base, so no single shopper matters much, but a loss of trust would." },
    ],
    howToRead: "Reliance is Scope’s assessment of how hard it would be to replace the group, not a measured figure. Only groups named in company filings are shown.",
  },
  source:
    "Sources: Amazon Q3 2026 earnings release and call (Oct 29, 2026), a third-party SEC filing analysis of the Q3 2026 Form 10-Q (sec-api.io), the FTC press release of Aug 31, 2026, and press summaries of the Q3 2026 cloud results. Scores, weights and reliance ratings are Scope’s own judgement, not measured figures.",
};

const competitors: CompetitorsData = {
  title: "Amazon has by far the most sales of the three, but the lowest margin and the only negative free cash flow",
  lead: "Who Amazon competes with, how it compares with Microsoft and Alphabet on the same basis, and where AWS stands against Azure and Google Cloud.",
  labels: [],
  overviewTitle: "Who Amazon competes with",
  overviewIntro: "Rivals split by how they compete for Amazon’s customers.",
  shares: {
    title: "Cloud revenue of the three big clouds, Q3 2026, share of the combined total",
    items: [
      { name: "AWS (Amazon)", value: 41.9, self: true },
      { name: "Azure (Microsoft)", value: 30.2 },
      { name: "Google Cloud", value: 28.0 },
    ],
    note: "Share of the combined revenue of these three only, from press summaries of their Q3 2026 reports ($46.0B, $33.2B and $30.7B). It is not a market share: the segments are defined differently, and Oracle and other clouds are left out. AWS grew 39%, against 48% for Azure and 103% for Google Cloud. Over the last 12 months AWS had 44% of the three’s combined revenue, down from 48% a year earlier.",
  },
  companies: [
    {
      id: "amzn", name: "Amazon", ticker: "AMZN", kind: "self",
      desc: "Online stores, marketplace, ads, Prime and AWS cloud",
      metrics: { revenue: 797.5, growth: 15.4, opMargin: 13.1, fcf: -46.9, fcfMargin: -5.9, netDebt: 66.1 },
    },
    {
      id: "msft", name: "Microsoft", ticker: "MSFT", kind: "direct",
      desc: "Azure cloud, AI assistants and business software",
      metrics: { revenue: 346.4, growth: 17.9, opMargin: 47.1, fcf: 60.0, fcfMargin: 17.3, netDebt: -29.0 },
    },
    {
      id: "goog", name: "Alphabet", ticker: "GOOGL", kind: "direct",
      desc: "Google Cloud, Search and YouTube ads",
      metrics: { revenue: 471.1, growth: 22.2, opMargin: 33.3, fcf: 19.7, fcfMargin: 4.2, netDebt: -49.6 },
    },
    {
      id: "wmt", name: "Walmart", ticker: "WMT", kind: "direct",
      desc: "Store chain with a growing online business",
      chartNote: "Not in the charts: its figures were not loaded into Scope’s data yet.",
    },
    {
      id: "meta", name: "Meta", ticker: "META", kind: "indirect",
      desc: "Social media ads that compete for advertisers’ budgets",
      chartNote: "Not in the charts: its figures were not loaded into Scope’s data yet.",
    },
    {
      id: "nvda", name: "NVIDIA", ticker: "NVDA", kind: "indirect",
      desc: "Sells the AI chips Amazon buys, while Amazon builds its own Trainium chips",
      chartNote: "Not in the charts: it is mainly a supplier, and its fiscal year ends in January.",
    },
  ],
  compareTitle: "How Amazon compares on results",
  compareIntro: "One card per measure, one bar per company, best first. Blue is Amazon, grey bars are Microsoft and Alphabet.",
  compareHowToRead:
    "Dots to the right are higher values. The label under each line lists every company in rank order, best first. For net debt, lower is better, so rank 1 is the biggest net cash.",
  caveat:
    "All three use US-reported figures for the 12 months to Sep 30, 2026, so the periods line up. Free cash flow is operating cash flow minus capital spending. Net debt is interest-bearing debt minus cash and short-term investments on the Sep 30, 2026 balance sheet, without leases. Amazon’s $66.1B is net debt (positive), while Alphabet and Microsoft hold net cash. For Alphabet, $90.4B of shares in other companies are not counted as cash. Amazon and Alphabet both spent far more on equipment than the others, which is why their free cash flow is low. Businesses differ, so read gaps as clues, not scores.",
  valuationTitle: "Growth against profitability",
  valuationIntro: "The best place to be is fast growth and a high margin at the same time. Check both together.",
  valuationHowToRead:
    "Each dot is a company. Further right means faster growth, and further up means a higher operating margin. A dot in the top right is both fast and profitable.",
  source:
    "Sources: Amazon Q3 2026 release (Oct 29, 2026) and Financial Modeling Prep (Nov 10, 2026) for Amazon; Alphabet Q3 2026 release (Oct 28, 2026) and Financial Modeling Prep for Alphabet; Microsoft Q1 FY27 release (quarter ended Sep 30, 2026) and Financial Modeling Prep for Microsoft. Cloud revenue for AWS, Azure and Google Cloud is from press summaries of their Q3 2026 reports. Growth compares with the same 12 months a year earlier. Walmart, Meta and NVIDIA are described in words because comparable figures were not loaded.",
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
      value: "13.1%",
      steps: [
        "Form 10-K for FY25 (year ended Dec 31, 2025) and quarterly reports through Q3 2026 (quarter ended Sep 30, 2026)",
        "Operating income $104.4B and revenue $797.5B over the last four quarters",
        "104.4 ÷ 797.5 × 100",
        "13.1% operating margin",
        "Profitability score (40% of that category) and the competitor comparison",
      ],
    },
    {
      metric: "Free cash flow, last 12 months",
      value: "−$46.9B",
      steps: [
        "Cash flow statements in the FY25 Form 10-K and the quarterly reports",
        "Operating cash flow $168.3B and purchases of property and equipment $215.2B over the last four quarters",
        "168.3 − 215.2",
        "−$46.9B free cash flow, against −$42.4B as Amazon reports it after proceeds and incentives",
        "Profitability and Valuation scores, and the reason Scope shows no fair value",
      ],
    },
    {
      metric: "P/E ratio",
      value: "21.6×",
      steps: [
        "Closing share price on Nov 9, 2026 from market data, and earnings per share from Amazon’s filings",
        "Share price $266.93 and diluted earnings per share $12.37 over the last four quarters",
        "266.93 ÷ 12.37",
        "21.6× P/E, which includes about $69.5B of other income, mostly gains on Anthropic",
        "Valuation score (35% of that category), the Valuation section and Strengths and risks",
      ],
    },
  ],
  sourcesTitle: "Data sources",
  sourcesIntro: "Where each kind of data comes from, and the documents Scope reads for Amazon.",
  sources: [
    { title: "SEC filings", text: "Annual (10-K) and quarterly (10-Q) reports and event reports (8-K) for Amazon, Alphabet and Microsoft. The primary source for financial figures." },
    { title: "Company investor relations", text: "Earnings releases, slides and call transcripts published by the company. Management’s outlook and comments come from here." },
    { title: "Market data providers", text: "Share price, market cap, fiscal-year-end multiples and analyst targets from Financial Modeling Prep. Prices are closing prices, and Scope shows the date." },
    { title: "News and industry data", text: "Press summaries of the earnings call, a third-party SEC filing analysis for 10-Q details, the FTC’s own press release, and press summaries of rival cloud results. Where a figure comes only from the press, Scope says so." },
  ],
  documents: [
    { name: "FY25 annual report", date: "Feb 2026", type: "10-K", use: "Business, risks and annual financials" },
    { name: "Q3 2026 earnings release", date: "Oct 29, 2026", type: "8-K", use: "Headline results, sales by product group and segment, guidance, balance sheet and cash flow" },
    { name: "Q3 2026 quarterly report", date: "Oct 2026", type: "10-Q", use: "Backlog, obligations, debt, legal proceedings and investment gains, read through a third-party analysis" },
    { name: "Q3 2026 earnings call", date: "Oct 29, 2026", type: "Transcript", use: "Capital spending, AWS and advertising comments, kept as press summaries" },
    { name: "Q4 2025 earnings release", date: "Feb 5, 2026", type: "8-K", use: "Year-ago AWS growth and operating income" },
    { name: "FTC and 22 states lawsuit", date: "Aug 31, 2026", type: "Press release", use: "Allegations about the sponsored-ads auction" },
    { name: "Alphabet and Microsoft quarterly results", date: "Oct 2026", type: "8-K", use: "Rival financials on the same basis" },
    { name: "Analyst consensus and price targets", date: "Nov 2026", type: "Estimates", use: "Average price target and post-earnings target changes" },
  ],
  formulasTitle: "How each metric is calculated",
  formulasIntro: "The exact formula behind each metric, and the definition choices that go with it.",
  formulas: [
    { name: "Revenue growth", formula: "(Revenue now − revenue a year earlier) ÷ revenue a year earlier × 100", note: "Year over year, to avoid seasonal swings. For the last 12 months, the comparison is with the 12 months before that. Quarterly and annual are never mixed." },
    { name: "Operating margin", formula: "Operating income ÷ revenue × 100", note: "Uses reported operating income, with no add-backs." },
    { name: "Net margin", formula: "Net income ÷ revenue × 100", note: "GAAP net income. For Amazon it includes about $69.5B of other income in the last 12 months, mostly gains on its Anthropic stake, so it is above the operating margin." },
    { name: "ROE", formula: "Net income ÷ average shareholders’ equity × 100", note: "Average of start and end of period." },
    { name: "ROIC", formula: "Operating income × (1 − tax rate) ÷ average (equity + debt) × 100", note: "Debt is interest-bearing debt, without leases. Cash is not subtracted. Other data providers define it differently, so compare ROIC only within Scope." },
    { name: "Debt to equity", formula: "Interest-bearing debt ÷ shareholders’ equity", note: "Debt is short-term plus long-term debt, without leases." },
    { name: "Free cash flow", formula: "Operating cash flow − capital spending", note: "Capital spending is purchases of property and equipment from the cash flow statement, before proceeds and incentives, so Scope’s Amazon figure (−$46.9B) is lower than Amazon’s own (−$42.4B). Quarterly figures come from subtracting cumulative year-to-date totals." },
    { name: "Net cash", formula: "Cash and short-term investments − interest-bearing debt", note: "Positive means net cash, negative means net debt. Leases are not counted. Scope’s Score input uses the FY25 year-end balance sheet; the Sep 30, 2026 figures are given in the text." },
    { name: "P/E", formula: "Share price ÷ diluted earnings per share, last 12 months", note: "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings, and leaves out years with a loss. For Amazon, a second figure removes the other income (about 22.3% tax assumed) and is marked as a Scope estimate." },
    { name: "EV/EBITDA", formula: "(Market cap − net cash) ÷ (operating income + depreciation and amortization)", note: "Last 12 months. The average used in the Score is the 5-year average at fiscal year ends." },
  ],
  formulasNote: "Scope uses reported (GAAP) figures and interest-bearing debt. Figures with different definitions are never compared without a note.",
  scoringTitle: "How the Scope Score is built",
  scoringIntro:
    "Six categories, each with its own inputs, weights and cut-offs. Every input is scored from 0 to 10, a category is the weighted average of its inputs, and the overall score is the weighted average of the categories. Grades: A+ from 9.0, A from 8.0, B+ from 7.5, B from 7.0, C+ from 6.0, C from 5.0, D from 3.0, F below that. Labels: Excellent from 9.0, Strong from 7.5, Good from 6.0, Fair from 5.0, Weak below that.",
  categories: scored.categories,
  scoringNote:
    "If an input is missing, its weight is spread over the other inputs in that category, never set to zero. If more than 40% of a category’s weight is missing, the category shows “Not enough data” and the overall score is marked partial. The cut-offs are the same for every company, so a score does not depend on which other companies are on the list. For Amazon, net margin (16.9%) and the P/E against its average (0.50×) include about $69.5B of other income in the last 12 months, mostly gains on its Anthropic stake, so the Profitability and Valuation scores are more favorable than the core business alone would earn. Net debt uses the Dec 31, 2025 balance sheet, before long-term debt rose from $65.6B to $173.1B. Free cash flow yield is negative, so it scores 0 on that input.",
  valuationTitle: "How valuation is shown",
  valuationIntro: "Amazon has no Scope fair value, so two reference points are shown. Neither is a price forecast.",
  methods: [
    { name: "Discounted cash flow (not shown for Amazon)", what: "Scope’s model estimates value per share from future free cash flow under three stated cases, starting from the last 12 months. It is used on the other company pages.", limit: "It needs a positive starting cash flow. Amazon’s is −$46.9B, so the model gives a negative value in every case and Scope does not show one." },
    { name: "Historical multiples", what: "Compares today’s P/E and EV/EBITDA with Amazon’s own average over the last fiscal year ends.", limit: "Profit includes large gains on Anthropic, so the P/E looks lower than it is. Scope also shows a P/E without those gains, as an estimate." },
    { name: "Analyst price targets", what: "Shows the range and average of published targets from analysts who follow Amazon.", limit: "Targets are opinions, usually for 12 months ahead, and they often follow the share price. Providers show slightly different ranges." },
  ],
  valuationNote: "No fair value is shown for Amazon. Past multiples and analyst targets are reference points, not a price the stock will reach.",
  freshnessTitle: "Data quality and freshness",
  freshnessIntro: "When a period ended, when it was published and when Scope loaded it are three different dates.",
  timeline: [
    { date: "Sep 30, 2026", label: "Latest reporting period ends" },
    { date: "Oct 29, 2026", label: "Source date: reported 29 days later" },
    { date: "Nov 10, 2026", label: "Last updated by Scope" },
  ],
  freshness: [
    { dataset: "Income statement", period: "Q3 2026 (ended Sep 30, 2026)", sourceDate: "Oct 29, 2026", updated: "Nov 10, 2026", status: "Verified", limit: "GAAP basis. Annual figures use FY25 (ended Dec 31, 2025). Last-12-month figures add the last four quarters." },
    { dataset: "Balance sheet", period: "Dec 31, 2025 (annual) and Sep 30, 2026 (text)", sourceDate: "Feb 2026 and Oct 29, 2026", updated: "Nov 10, 2026", status: "Verified", limit: "Charts and the Score use the year-end snapshot. Debt changed a lot in 2026, so the Sep 30, 2026 figures are given in the text." },
    { dataset: "Cash flow", period: "FY25 plus the latest quarters", sourceDate: "Oct 29, 2026", updated: "Nov 10, 2026", status: "Verified", limit: "Last-12-month free cash flow (−$46.9B) is Scope’s calculation. Amazon reports −$42.4B after proceeds and incentives." },
    { dataset: "Share price and market cap", period: "Not applicable", sourceDate: "Nov 9, 2026 close", updated: "Nov 10, 2026", status: "Verified", limit: "Closing price only, and it moves every trading day." },
    { dataset: "Analyst estimates and targets", period: "Next 12 months", sourceDate: "Nov 2026", updated: "Nov 10, 2026", status: "Pending", limit: "Consensus differs between providers and changes after earnings. Scope shows the range from Financial Modeling Prep." },
    { dataset: "Rival financials", period: "12 months to Sep 2026", sourceDate: "Oct to Nov 2026", updated: "Nov 10, 2026", status: "Verified", limit: "Alphabet and Microsoft are on the same 12-month basis. Walmart, Meta and NVIDIA are not in the charts." },
    { dataset: "Cloud market comparison", period: "Q3 2026 (Jul to Sep)", sourceDate: "Oct to Nov 2026", updated: "Nov 10, 2026", status: "Pending", limit: "Azure and Google Cloud revenue come from press summaries, and the segments are defined differently." },
    { dataset: "Customer counts", period: "Not applicable", sourceDate: "Not applicable", updated: "Not applicable", status: "Unavailable", limit: "Amazon does not report customer counts, so Scope shows paid unit growth, subscription revenue and AWS backlog instead." },
  ],
  source:
    "Sources: Amazon, Alphabet and Microsoft filings and earnings materials, Financial Modeling Prep market data and press coverage of Amazon’s Q3 2026 call, as of Nov 10, 2026. The score and ratings are Scope’s own methods, shown in full above.",
};

const bottomLine: BottomLineData = {
  title: "A powerful and fast-growing business that is spending more than it earns",
  lead: "Three things to take away from this page before you read the sources.",
  score: hero.score,
  scoreLabel: hero.scoreLabel,
  scoreHref: "#score",
  scoreSummary: "Top grades for scale, growth and low concentration, held back by negative free cash flow and weak cash conversion, and flattered by gains on the Anthropic stake.",
  items: [
    { icon: "ti-briefcase", label: "The business", verdict: "Strong", tone: "positive", text: "Sales up 15%, a record 13.9% operating margin, AWS growing 39% with a $578B backlog, and a wide moat built on scale. The weak spot is cash: free cash flow was −$46.9B over 12 months.", href: "#moat", hrefLabel: "See the moat" },
    { icon: "ti-tag", label: "The price", verdict: "Hard to judge", tone: "caution", text: "A P/E of 21.6× is half its 5-year average of 43×, but it is about 36× without Anthropic gains. Scope shows no fair value because free cash flow is negative. Analysts’ average target is $328, against a price of $267.", href: "#valuation", hrefLabel: "See the valuation" },
    { icon: "ti-alert-triangle", label: "What to watch", verdict: "Spending and debt", tone: "caution", text: "Capital spending is guided to about $220B in 2026 and meaningfully more in 2027, paid for partly with new debt that has nearly tripled to $173.1B. The FTC lawsuit over ad auctions is new. The next report is in early February.", href: "#strengths-risks", hrefLabel: "See the risks" },
  ],
  note: "This is Scope’s summary of the evidence above, not a call to buy or sell. A great business can still be a poor purchase at the wrong price, and a low-looking multiple can hide how the profit was made.",
};

const closing: ClosingPanelData = {
  title: ["That is one company.", "Here is where to go next."],
  lead: "You have seen what Amazon earns, what protects it and what it costs. Keep building the picture.",
  companies: [
    { name: "Alphabet", ticker: "GOOGL", reason: "Google Cloud grew 103% last quarter and competes with AWS, and Alphabet is also spending heavily on AI.", href: "/company/google" },
    { name: "Microsoft", ticker: "MSFT", reason: "The other big cloud. Azure grew 48% last quarter.", href: "/company/microsoft" },
    { name: "NVIDIA", ticker: "NVDA", reason: "Sells the AI chips Amazon buys, while Amazon designs its own Trainium chips.", href: "/company/nvidia" },
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
    "AWS earns 63% of Amazon’s profit on 23% of its sales, and AI spending has pushed free cash flow below zero",
  lead:
    "Amazon sells goods online, runs a marketplace for other sellers, sells ads and Prime memberships, and rents out computing power through AWS. The stores bring in most of the sales, but AWS, which is growing 39%, earns most of the profit. The build-out for AWS and AI is now so large that Amazon spent more on equipment than it earned from operations, and it is borrowing to cover the gap.",
  labels: [],
  chart: {
    kind: "profit-vs-sales",
    title: "Where Amazon’s sales and operating profit come from, Q3 2026",
    howToRead:
      "Each bar adds up to 100%. The top bar splits sales between Amazon’s store segments (North America and International) and AWS, and the bottom bar splits operating profit (sales minus the costs of running that business). The segments add up to Amazon’s $28.1B of operating income.",
    aName: "Store segments",
    bName: "AWS",
    rows: [
      { label: "Share of sales", a: 77.2, b: 22.8 },
      { label: "Share of operating profit", a: 36.7, b: 63.3 },
    ],
    marginA: 6.6,
    marginB: 38.7,
    aColor: "#232f3e",
    bColor: "#ff9900",
    callout: "On 22.8% of sales, AWS earns 63.3% of Amazon’s operating profit.",
  },
  numbers: [
    { value: "63.3%", label: "of Q3 2026 operating profit came from AWS, on 22.8% of sales", tone: "positive" },
    { value: "$578B", label: "AWS backlog of signed contracts, up from $244B at the end of 2025", tone: "positive" },
    { value: "−$46.9B", label: "free cash flow in the last 12 months, after $215.2B of capital spending", tone: "negative" },
    { value: "$173.1B", label: "long-term debt on Sep 30, 2026, up from $65.6B at the end of 2025", tone: "negative" },
  ],
  wins: [
    {
      title: "AWS keeps speeding up",
      detail:
        "AWS grew 39.3% to $46.0B with a 38.7% margin, and management says growth should be above 40% in both 2027 and 2028.",
    },
    {
      title: "Retail is getting more profitable too",
      detail:
        "North America’s operating margin rose to 7.7% from 4.5%, and Amazon expects the cost to serve each unit to fall for a fourth year in a row.",
    },
  ],
  breaks: [
    {
      title: "Spending is far above the cash earned",
      detail:
        "Capital spending was $75.9B in Q3 alone, 37.6% of sales, and Amazon guides about $220B for 2026 with meaningfully more in 2027. If AI demand slows, the equipment is hard to repurpose.",
    },
    {
      title: "Debt and a new lawsuit add pressure",
      detail:
        "Interest expense was $1.7B in Q3, about three times a year earlier, and the FTC and 22 states sued in August over a hidden surcharge in Amazon’s sponsored-ads auctions.",
    },
  ],
  watch: {
    title: "Next report: does AWS growth move toward 40%?",
    text:
      "AWS grew 39.3% in Q3 2026, and Amazon expects growth above 40% in 2027 and 2028. For the December quarter Amazon guides net sales of $240.0B to $247.0B and operating income of $28.5B to $33.5B. The report expected in early February 2027 (date not yet confirmed) shows whether AWS keeps speeding up while spending rises.",
    href: "#signals",
    hrefLabel: "See all signals to watch",
  },
  source:
    "Sources: Amazon Q3 2026 earnings release (Form 8-K, Oct 29, 2026) and call, as reported by Yahoo Finance; a third-party SEC filing analysis (sec-api.io) for Q3 2026 10-Q figures such as backlog and debt; the FTC press release of Aug 31, 2026. Segment shares and margins are for Q3 2026 and calculated by Scope. Free cash flow is calculated by Scope as operating cash flow minus capital spending.",
};
export const amazonPage: CompanyPageData & { spotlight: SpotlightData } = {
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