// Shape of one company page, and the shape of each section's data.
// Put this file next to apple.ts, microsoft.ts and the other company data files (lib/company-next/types.ts).
// Every company file is typed with CompanyPageData from here, so no company file depends on another company's file.
//
// D4 done: every section type lives here. The components import their type from this file and re-export it,
// so an old import from a component file still works.

/* ---------- Moved: Company hero ---------- */

export type CompanyHeroData = {
  name: string;
  ticker: string;
  sector: string;
  /** Optional. If missing, a dashed "LOGO" placeholder is shown. */
  logo?: string;
  description: string;
  score: number;
  scoreLabel: string;
  scoreHref?: string;
  dataStatus?: "example" | "partial" | "live";
  facts: {
    label: string;
    value: string;
    note?: string;
    noteTone?: "positive" | "negative" | "neutral";
  }[];
  source: string;
};

/* ---------- Moved: Company summary ---------- */

export type CompanySummaryData = {
  title: string;
  label?: string;
  text: string;
  /** Optional blue card on the right. Hidden if not provided. */
  highlight?: {
    eyebrow: string; // e.g. "Where the sales come from"
    value: string; // e.g. "26%"
    caption: string; // e.g. "from Services, FY25"
    /** Bar segments in order. Widths follow `share` (should add up to about 100). */
    segments: { label: string; share: number }[];
  };
};

/* ---------- Moved: Bottom line ---------- */

export type BottomLineTone = "positive" | "caution" | "negative" | "neutral";

export type BottomLineItem = {
  icon: string; // Tabler icon name, e.g. "ti-briefcase"
  label: string; // e.g. "The business"
  verdict: string; // one or two words, shown as a chip
  tone: BottomLineTone;
  text: string; // one short line with the evidence
  href?: string; // in-page anchor to the section that proves it
  hrefLabel?: string;
};

export type BottomLineData = {
  title: string;
  lead: string;
  score: number; // 0 to 10, same as the hero
  scoreLabel: string; // e.g. "Strong"
  scoreHref?: string;
  scoreSummary?: string; // one sentence under the score, e.g. "Top grades for quality and profit, held back by a price above our fair value and slowing growth."
  items: BottomLineItem[]; // 3 items
  note: string;
};

/* ---------- Moved: Score reasons ---------- */

export type ScoreReason = {
  name: string;
  grade: string; // e.g. "A+", "C", "D"
  value: string; // the key number or short phrase
  label: string; // one sentence of meaning
  href: string; // where the data lives further down the page
  score?: number; // 0 to 10, the category score behind the grade (drives the radar chart)
  weight?: number; // % of the overall score
};

export type ScoreReasonsData = {
  title: string;
  takeaway: string;
  reasons: ScoreReason[];
  howToRead: string;
};

/* ---------- Moved: What changed ---------- */

export type MetricCardData = {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "negative";
  series: number[];
  note: string;
};
export type QuarterBar = { quarter: string; fy: string; value: number; yoy: number };
export type EstimateRow = { label: string; unit: "B" | "$"; actual: number; estimate: number };
export type NewsItem = { title: string; detail: string; meaning: string };

export type WhatChangedData = {
  title: string;
  lead: string;
  metrics: MetricCardData[];
  growth: {
    bars: QuarterBar[];
    verdictLabel: string;
    before: string;
    after: string;
    verdict: string;
    watch: string;
  };
  estimates: EstimateRow[];
  good: NewsItem[];
  watch: NewsItem[];
  source: string;
};

/* ---------- Moved: Signals to watch ---------- */

export type SignalValueFormat = "percent" | "signedPercent" | "billions";

export type SignalItem = {
  name: string;
  /** One sentence: what to look for in the next report. */
  question: string;
  /** What the company itself said to expect, if it gave a number. */
  guidance?: string;
  format: SignalValueFormat;
  /** Left and right end of the track. */
  range: [number, number];
  /** Below this value the signal counts as weak. */
  weakBelow: number;
  /** At or above this value the signal counts as strong. */
  strongFrom: number;
  yearAgo: number;
  lastQuarter: number;
  /** Analyst estimate for the next report. Leave out if there is none. */
  estimate?: number;
};

export type SignalsToWatchData = {
  title: string;
  lead: string;
  /** Section-level labels (for example "Example data"). Kept in the data, not shown in design A. */
  labels: string[];
  /**
   * The calendar tile is built from `date`. These forms are understood:
   *   "Monday, Nov 2, 2026"                       exact day
   *   "Around Thursday, Feb 4, 2027 (tentative)"  day, marked as approximate
   *   "Early February 2027 (tentative)"           month only
   *   "Late January 2027"                         month only
   * Anything else is shown as plain text.
   */
  next: { date: string; note: string };
  howToRead: string;
  signals: SignalItem[];
  source: string;
};

/* ---------- Moved: Closing panel ---------- */

export type ClosingCompany = {
  name: string; // e.g. "Alphabet"
  ticker: string; // e.g. "GOOGL", shown as a tile
  reason: string; // one line: why this company, tied to the page's company
  href: string; // must be a real route
  /** Optional logo file under /public, e.g. "/logos/google-svgrepo-com.svg". Without it the first letter of the name is shown. */
  logo?: string;
};

export type ClosingLink = {
  icon: string; // Tabler icon name, e.g. "ti-git-compare"
  title: string;
  href: string; // must be a real route
};

export type ClosingPanelData = {
  title: string[]; // one entry per line of the headline
  lead?: string; // one sentence under the headline
  companies: ClosingCompany[]; // 1 to 3
  links: ClosingLink[]; // small tool links, 2 to 4
  allLabel: string; // e.g. "See all companies"
  allHref: string;
  note: string;
};

/* ---------- Moved: Financial highlights ---------- */

type FinancialTone = "positive" | "negative";

export type FinancialMetric = {
  label: string;
  value: string;
  change: string;
  tone: FinancialTone;
  series: number[]; // one value per year, oldest first, same length as `years`
  note: string;
  unit: "B" | "$" | "%"; // shown on the bars
};

export type FinancialHighlightsData = {
  title: string;
  lead: string;
  labels: string[];
  metrics: FinancialMetric[];
  howToRead: string;
  source: string;
  // Year labels of the series, oldest first. Required: there is no default, so a page can never show the wrong years.
  years: string[];
};

/* ---------- Moved: Valuation ---------- */

export type ValuationFieldRow = {
  name: string;
  low: number;
  high: number;
  mark: number;
  markName: string;
};

// peers is optional: leave it out when there is no reliable same-date peer data.
export type ValuationMultiple = { name: string; now: number; avg: number; peers?: number };

export type ValuationData = {
  title: string;
  lead: string;
  labels: string[];
  price: number;
  priceDate: string;
  // fair is null when Scope does not show a fair value (for example when free cash flow is negative).
  // In that case also fill noFair, and leave implied out.
  fair: number | null;
  noFair?: {
    title: string;
    text: string;
    points: { label: string; value: string; note: string }[];
  };
  field: { max: number; howToRead: string; rows: ValuationFieldRow[]; title?: string };
  implied?: {
    title: string;
    needed: number; // % per year the price needs
    actual: number; // % per year actually grown
    actualLabel: string; // e.g. "Since FY21"
    text: string;
    cases: string[];
    assumptions: { label: string; values: string[] }[];
    fairValues: number[];
    note: string;
  };
  history: {
    title: string;
    // The last item is "now"; bars before it are the fiscal year ends.
    years: { year: string; value: number }[];
    /**
     * The average P/E the dashed line shows. Give it when the average covers a different period than the bars
     * (for example a 5-year average next to ten bars). Without it, the average of the bars before "now" is used.
     */
    peAverage?: number;
    /** Length of that average, for example "5-year". Used in the wording next to the average. */
    averagePeriod?: string;
    peSubtitle: string;
    peHowToRead: string;
    multiples: ValuationMultiple[];
    multiplesHowToRead: string;
  };
  source: string;
};

/* ---------- Moved: Profit history ---------- */

export type ProfitHistoryData = {
  title: string;
  lead: string;
  labels: string[];
  years: string[]; // fiscal year labels, oldest first (for example FY22..FY26)
  revenue: number[];
  grossProfit: number[];
  operatingIncome: number[];
  netIncome: number[];
  fcf: number[];
  growth: { title: string; howToRead: string; note: string };
  margins: { title: string; howToRead: string };
  returns: {
    title: string;
    roic: number;
    roicFrom: number;
    /**
     * The year `roicFrom` belongs to. ROIC needs the year before it, so the first year of a series has none.
     * Without this the card falls back to the first year of `years`, which can be one year too early.
     */
    roicFromYear?: string;
    wacc: number;
    text: string;
    note: string;
  };
  tableTitle: string;
  source: string;
};

/* ---------- Moved: Cash and returns ---------- */

export type CashStat = { label: string; value: string; note: string };

export type CashAndReturnsData = {
  /** Used in "Your slice of ...". Optional: without it the text says "the company". */
  companyName?: string;
  title: string;
  lead: string;
  labels: string[];
  years: string[]; // fiscal year labels, oldest first (for example FY22..FY26)
  fcf: number[];
  dividends: number[];
  buybacks: number[];
  returned: { title: string; howToRead: string; fcfNote: string };
  how: {
    title: string;
    shares: number[];
    sharesTitle: string;
    stats: CashStat[];
    // Optional: only shown when real price history is available.
    tsr?: {
      title: string;
      rows: { name: string; value: number; gain: string }[];
      note: string;
    };
  };
  cushion: {
    title: string;
    cash: number[];
    debt: number[];
    equity: number[];
    currentAssets: number;
    currentLiabilities: number;
    currentRatioNote: string;
    howToRead: string;
  };
  source: string;
};

/* ---------- Moved: Where the money comes from ---------- */

export type WhereMoneyProduct = {
  name: string;
  share: number;
  value: number;
  yoy: number;
  note: string;
};

export type WhereMoneyRegion = {
  name: string;
  share: number;
  value: number;
  yoy: number;
};

export type WhereMoneyComesData = {
  title: string;
  lead: string;
  labels: string[];
  /** Name of the period shown, for example "FY26" or "Q3 2026". Used in tooltips. */
  periodLabel?: string;
  /** What the growth pills are compared with, for example "FY25" or "Q3 2025". */
  comparedWith?: string;
  /** Optional brand colors (hex), used first for the product lines. The rest come from Scope's own palette. */
  palette?: string[];
  products: WhereMoneyProduct[];
  donutHowToRead: string;

  profit: {
    title: string;
    explain: string;
    revenueTotal: string;
    profitTotal: string;
    /** Names of the two groups. `a` is the larger base group, `b` is the highlighted group. */
    groupNames?: { a: string; b: string };
    /** Which profit the split uses, for example "gross profit" or "operating profit". */
    profitLabel?: string;
    // Share of revenue and of profit, in percent, for group A and group B. A and B add up to 100.
    revenueShareA: number;
    revenueShareB: number;
    profitShareA: number;
    profitShareB: number;
    // Margin of each group as text, for example "39.3%": what the group keeps from $100 of sales.
    marginA: string;
    marginB: string;
    // History of group B's share of revenue, one bar per period.
    historyTitleB: string;
    historyB: { year: string; share: number }[];
  };

  regions: {
    title: string;
    lead: string;
    items: WhereMoneyRegion[];
    focus: {
      name: string;
      value: number;
      yoy: number;
      historyTitle: string;
      history: { year: string; share: number }[];
      note: string;
    };
    howToRead: string;
  };

  source: string;
};

/* ---------- Moved: Strengths and risks ---------- */

// One number that backs a claim. Used by Strengths and risks and by Moat and ecosystem.
export type Evidence = { value: string; label: string };

export type StrengthItem = {
  icon: string; // Tabler icon name, e.g. "ti-shield-check" (not shown in design A)
  name: string;
  finding: string;
  evidence: Evidence[]; // 1 to 2 numbers that back the claim
  why: string;
};

export type RiskItem = {
  icon: string;
  name: string;
  level: 1 | 2 | 3; // 1 Low, 2 Medium, 3 High
  finding: string;
  evidence: Evidence[];
  why: string; // reason for the level and what happens if it goes wrong
};

export type StrengthsRisksData = {
  title: string;
  lead: string;
  labels: string[]; // kept in the data, but no longer shown in the header
  strengthsIntro: string;
  strengths: StrengthItem[];
  risksIntro: string;
  risks: RiskItem[];
  risksHowToRead: string;
  source: string;
};

/* ---------- Moved: Moat and ecosystem ---------- */

export type MoatSource = {
  name: string;
  score: number; // 0 to 10
  weight: number; // percent, all weights add up to 100
  test: string; // the question that tests this source
  answer: string; // the short answer, with the proof
  evidence: Evidence;
  wear: string; // what could wear it down
  trend: "stable" | "eroding" | "strengthening";
};

export type LoopStep = { title: string; text: string };
export type SwitchItem = { icon: string; name: string; text: string };

export type RelianceRow = {
  group: string;
  /** Tabler icon name, e.g. "ti-users". Optional. Not shown in design A. */
  icon?: string;
  level: 1 | 2 | 3; // 1 Low, 2 Medium, 3 High
  who: string;
  gives: string;
  gets: string;
  note: string;
  rival?: boolean;
};

export type MoatEcosystemData = {
  title: string;
  lead: string;
  labels: string[]; // kept in the data, not shown in design A
  moatTitle: string;
  moatIntro: string;
  sources: MoatSource[];
  notCounted: { name: string; text: string };
  narrowing: string;
  moatHowToRead: string;
  loop: {
    title: string;
    intro: string;
    steps: LoopStep[]; // 5 steps
    center: string;
    centerSub: string;
    note: string;
  };
  switching?: { title: string; items: SwitchItem[]; closing: string };
  reliance: {
    title: string;
    intro: string;
    /** The company's name, used in "Gives <name>" and "Gets from <name>". Without it, "the company" is used. */
    companyName?: string;
    rows: RelianceRow[];
    howToRead: string;
  };
  source: string;
};

/* ---------- Moved: Competitors ---------- */

export type CompetitorMetricKey = "revenue" | "growth" | "opMargin" | "fcf" | "fcfMargin" | "netDebt";

export type CompetitorCompany = {
  id: string;
  name: string;
  ticker: string;
  kind: "self" | "direct" | "indirect" | "future";
  desc: string;
  // Leave out (or leave a measure out) when there is no comparable figure.
  // Companies without metrics stay in the list but not in the charts.
  metrics?: Partial<Record<CompetitorMetricKey, number>>;
  // Why this company is not in the charts, shown under its description.
  chartNote?: string;
};

export type CompetitorsData = {
  title: string;
  lead: string;
  labels: string[]; // shown once at section level
  overviewTitle: string;
  overviewIntro: string;
  /**
   * Market share bars (the blue card next to the orbit map).
   * Optional: leave it out when there is no reliable share data (many software and service companies).
   * Without it the card is hidden and the orbit map uses the full width.
   */
  shares?: {
    title: string;
    items: { name: string; value: number; self?: boolean; muted?: boolean }[];
    note: string;
    /** What the named players are called in the ranking text, for example "makers" or "providers". Default: "companies". */
    memberNoun?: string;
    /** What the share is measured in, for example "share of units" or "share of revenue". Default: "market share". */
    measureLabel?: string;
  };
  companies: CompetitorCompany[]; // the viewed company first
  compareTitle: string;
  compareIntro: string;
  compareHowToRead: string;
  caveat: string;
  valuationTitle: string; // title of the growth vs profitability chart
  valuationIntro: string;
  valuationHowToRead: string;
  source: string;
};

/* ---------- Moved: Sources and method ---------- */

export type TraceData = {
  metric: string;
  value: string;
  // Exactly 5 steps: source, reported figures, formula, result, where it is used
  steps: [string, string, string, string, string];
};

export type DataStatus = "Verified" | "Pending" | "Unavailable";

export type SourcesMethodData = {
  title: string;
  lead: string;
  labels: string[]; // shown once at section level
  traceTitle: string;
  traceIntro: string;
  traces: TraceData[];
  sourcesTitle: string;
  sourcesIntro: string;
  sources: {
    title: string;
    text: string;
    topic: string; // what this source feeds, e.g. "Outlook and guidance"
  }[];
  documents: {
    name: string;
    date: string;
    type: string;
    use: string;
    source: string; // title of the source it belongs to, copied exactly from `sources[].title`
  }[];
  formulasTitle: string;
  formulasIntro: string;
  formulas: { name: string; formula: string; note: string }[];
  formulasNote: string;
  scoringTitle: string;
  scoringIntro: string;
  categories: {
    name: string;
    weight: number; // percent of the overall score
    coverage: number; // percent of inputs available
    score?: number; // 0 to 10, this company's category score
    inputs: {
      name: string;
      weight: number;
      analyst?: boolean;
      value?: string; // this company's figure for the input
      score?: number; // 0 to 10
    }[];
    rule: string;
    missing: string;
  }[];
  scoringNote: string;
  valuationTitle: string;
  valuationIntro: string;
  methods: { name: string; what: string; limit: string }[];
  valuationNote: string;
  freshnessTitle: string;
  freshnessIntro: string;
  timeline: { date: string; label: string }[]; // usually 3 items: period end, source date, last update. Any number works.
  freshness: {
    dataset: string;
    period: string;
    sourceDate: string;
    updated: string;
    status: DataStatus;
    limit: string;
  }[];
  source: string;
};

/* ---------- Moved: Spotlight ---------- */

export type SpotlightTone = "positive" | "negative" | "neutral";

export type CapexVsCashChart = {
  kind: "capex-vs-cash";
  title: string;
  howToRead: string;
  years: string[]; // e.g. ["FY22", ..., "FY26"]
  ocf: (number | null)[]; // operating cash flow, $B, one per year
  capex: (number | null)[]; // capital spending, $B, one per year
  // Optional: the cash left over per year, if it should match a reported figure exactly.
  // If left out, it is operating cash flow minus capital spending.
  left?: (number | null)[];
  callout: string;
};

export type ProfitVsSalesChart = {
  kind: "profit-vs-sales";
  title: string;
  howToRead: string;
  aName: string; // the larger, lower-margin group, e.g. "Products"
  bName: string; // the highlighted group, e.g. "Services"
  // Each row is one bar. a + b should add up to 100.
  rows: { label: string; a: number; b: number }[];
  // Gross margin of each group, in percent: how many dollars kept per $100 sold.
  marginA: number;
  marginB: number;
  // Optional bar colors (hex). Default: grey for the first group, blue for the second.
  aColor?: string;
  bColor?: string;
  callout: string;
};

export type StackedShareChart = {
  kind: "stacked-share";
  title: string;
  howToRead: string;
  // One entry per part of a bar, in the same order as each row's values.
  legend: { name: string; color: string }[];
  // Each row is one bar. values should add up to 100. tag is a short note on the right of the row label.
  rows: { label: string; tag?: string; values: number[] }[];
  callout: string;
};

export type SpotlightChartData = CapexVsCashChart | ProfitVsSalesChart | StackedShareChart;

export type SpotlightData = {
  title: string; // 1. conclusion headline
  lead: string; // 2. the business story, 2 to 3 sentences
  labels: string[]; // optional small chips under the headline (use [] for none)
  chart: SpotlightChartData; // 3. main proof chart
  numbers: { value: string; label: string; tone?: SpotlightTone }[]; // 4. supporting numbers (3 to 4)
  wins: { title: string; detail: string }[]; // 5a. what has to go right
  breaks: { title: string; detail: string }[]; // 5b. what could go wrong
  watch: { title: string; text: string; href?: string; hrefLabel?: string }; // 6. what to watch next
  source: string;
};

/* ---------- One company page ---------- */

export type CompanyPageData = {
  hero: CompanyHeroData;
  summary: CompanySummaryData;
  scoreReasons: ScoreReasonsData;
  /** Optional: only a company with one story that decides it has a spotlight. */
  spotlight?: SpotlightData;
  whatChanged: WhatChangedData;
  signalsToWatch: SignalsToWatchData;
  whereMoneyComes: WhereMoneyComesData;
  financialHighlights: FinancialHighlightsData;
  valuation: ValuationData;
  profitHistory: ProfitHistoryData;
  cashAndReturns: CashAndReturnsData;
  strengthsRisks: StrengthsRisksData;
  moatEcosystem: MoatEcosystemData;
  competitors: CompetitorsData;
  sourcesMethod: SourcesMethodData;
  bottomLine: BottomLineData;
  closing: ClosingPanelData;
};