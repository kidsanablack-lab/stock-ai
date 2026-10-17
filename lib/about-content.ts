/**
 * Score and data-source content, copied from app/about/page.tsx so the home
 * page and the About page can share one source. The About page can import
 * this file later instead of keeping its own copy.
 */

export type ScoreFactor = {
  key: string;
  label: string;
  weightPct: number;
  description: string;
};

export const SCORE_FACTORS: ScoreFactor[] = [
  {
    key: "business",
    label: "Business Quality",
    weightPct: 30,
    description: "Market position, brand strength, and pricing power.",
  },
  {
    key: "growth",
    label: "Growth",
    weightPct: 25,
    description: "Revenue and earnings trajectory, and how sustainable it looks.",
  },
  {
    key: "financial",
    label: "Financial Health",
    weightPct: 25,
    description: "Balance sheet strength, cash flow, and debt levels.",
  },
  {
    key: "risk",
    label: "Risk",
    weightPct: 20,
    description: "Regulatory, competitive, and market threats to the business.",
  },
];

export type DataSource = {
  key: string;
  icon: string;
  label: string;
  description: string;
};

export const DATA_SOURCES: DataSource[] = [
  {
    key: "sec",
    icon: "ti-file-certificate",
    label: "SEC filings",
    description: "10-Ks, 10-Qs, and other public disclosures.",
  },
  {
    key: "earnings",
    icon: "ti-microphone-2",
    label: "Earnings reports & calls",
    description: "Quarterly results and management commentary.",
  },
  {
    key: "market",
    icon: "ti-chart-candle",
    label: "Market data",
    description: "Prices, volume, and valuation multiples.",
  },
];

export const DATA_REFRESH_NOTE =
  "Refreshed quarterly, or sooner when a company reports earnings.";

export const SCORE_DISCLAIMER =
  "The Scope Score is Scope's own opinion of a business. It is not investment advice, and it doesn't predict short-term stock price movements.";
