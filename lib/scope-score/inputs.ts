import type { RawInputs } from "./calculate";
import type { DisplayValues } from "./apply";

// The raw numbers behind each company's Scope Score.
// Later, the data system will fill `raw` automatically. `display` is the text shown on the page.

export const appleScore: { raw: RawInputs; display: DisplayValues } = {
  raw: { roic: 72.0, cashConversion: 103.7, marginRange: 3.2, marketCap: 4975, revenueTtm: 478.8, operatingMargin: 33.0, netMargin: 27.6, fcfMargin: 28.4, growthTtm: 15.1, growthForecast: 11.2, growthCagr: 5.0, topProductShare: 53.1, netDebtEbitda: -0.33, worstGrowth: -2.8, peVsAvg: 1.27, evEbitdaVsAvg: 1.31, fcfYield: 2.7 },
  display: {
    roic: { value: "72%" }, cashConversion: { value: "103.7%" }, marginRange: { value: "3.2 points" },
    marketCap: { value: "$4.98T" }, revenueTtm: { value: "$478.8B" },
    operatingMargin: { value: "33.0%" }, netMargin: { value: "27.6%" }, fcfMargin: { value: "28.4%" },
    growthTtm: { value: "+15.1%", name: "Revenue growth, last 12 months" },
    growthForecast: { value: "+11.2% a year" },
    growthCagr: { value: "+5.0% a year", name: "Revenue growth a year, FY22 to FY26" },
    topProductShare: { value: "53.1% (iPhone)" }, netDebtEbitda: { value: "−0.33" }, worstGrowth: { value: "−2.8%" },
    peVsAvg: { value: "1.27×" }, evEbitdaVsAvg: { value: "1.31×" }, fcfYield: { value: "2.7%" },
  },
};

export const microsoftScore: { raw: RawInputs; display: DisplayValues } = {
  raw: { roic: 28.8, cashConversion: 71.9, marginRange: 5.01, marketCap: 3940, revenueTtm: 346.4, operatingMargin: 47.1, netMargin: 41.2, fcfMargin: 17.29, growthTtm: 17.91, growthForecast: null, growthCagr: 13.74, topProductShare: 35.9, netDebtEbitda: -0.188, worstGrowth: 6.88, peVsAvg: 0.877, evEbitdaVsAvg: 0.962, fcfYield: 1.52 },
  display: {
    roic: { value: "28.8%" }, cashConversion: { value: "71.9%" }, marginRange: { value: "5.0 points" },
    marketCap: { value: "$3.94T" }, revenueTtm: { value: "$346.4B" },
    operatingMargin: { value: "47.1%" }, netMargin: { value: "41.2%" }, fcfMargin: { value: "17.3%" },
    growthTtm: { value: "+17.9%", name: "Revenue growth, last 12 months" },
    growthForecast: { value: "n/a" },
    growthCagr: { value: "+13.7% a year", name: "Revenue growth a year, FY22 to FY26" },
    topProductShare: { value: "35.9% (Azure)" }, netDebtEbitda: { value: "−0.19" }, worstGrowth: { value: "+6.9%" },
    peVsAvg: { value: "0.88×" }, evEbitdaVsAvg: { value: "0.96×" }, fcfYield: { value: "1.5%" },
  },
};

export const nvidiaScore: { raw: RawInputs; display: DisplayValues } = {
  raw: { roic: 87.3, cashConversion: 83.0, marginRange: 46.8, marketCap: 4498, revenueTtm: 303.0, operatingMargin: 65.2, netMargin: 63.7, fcfMargin: 41.9, growthTtm: 83.4, growthForecast: 62.4, growthCagr: 68.3, topProductShare: 92.5, netDebtEbitda: -0.37, worstGrowth: 0.2, peVsAvg: 0.4, evEbitdaVsAvg: 0.39, fcfYield: 2.82 },
  display: {
    roic: { value: "87%" }, cashConversion: { value: "83.0%" }, marginRange: { value: "46.8 points" },
    marketCap: { value: "$4.50T" }, revenueTtm: { value: "$303.0B" },
    operatingMargin: { value: "65.2%" }, netMargin: { value: "63.7%" }, fcfMargin: { value: "41.9%" },
    growthTtm: { value: "+83.4%", name: "Revenue growth, last 12 months" },
    growthForecast: { value: "+62.4% a year" },
    growthCagr: { value: "+68.3% a year", name: "Revenue growth a year, FY22 to FY26" },
    topProductShare: { value: "92.5% (Data Center)" }, netDebtEbitda: { value: "−0.37" }, worstGrowth: { value: "+0.2%" },
    peVsAvg: { value: "0.40×" }, evEbitdaVsAvg: { value: "0.39×" }, fcfYield: { value: "2.8%" },
  },
};

// Alphabet. Numbers come from data/computed/GOOGL.json (fetched Nov 9, 2026).
// topProductShare is entered by hand: Google Search & other was $63.35B of $127.58B revenue in Q3 2026 (49.7%).
// Two inputs are flattered by gains on shares in other companies (mainly SpaceX and Anthropic):
// net margin (50.0%) and the P/E against its average (0.61×). The page explains this next to the score.
export const googleScore: { raw: RawInputs; display: DisplayValues } = {
  raw: { roic: 26.92, cashConversion: 77.48, marginRange: 5.65, marketCap: 3472, revenueTtm: 471.1, operatingMargin: 33.32, netMargin: 50.03, fcfMargin: 4.19, growthTtm: 22.21, growthForecast: 24.59, growthCagr: 11.82, topProductShare: 49.7, netDebtEbitda: -0.44, worstGrowth: 8.68, peVsAvg: 0.61, evEbitdaVsAvg: 0.62, fcfYield: 0.57 },
  display: {
    roic: { value: "26.9%" }, cashConversion: { value: "77.5%" }, marginRange: { value: "5.7 points" },
    marketCap: { value: "$3.47T" }, revenueTtm: { value: "$471.1B" },
    operatingMargin: { value: "33.3%" }, netMargin: { value: "50.0%" }, fcfMargin: { value: "4.2%" },
    growthTtm: { value: "+22.2%", name: "Revenue growth, last 12 months" },
    growthForecast: { value: "+24.6% a year" },
    growthCagr: { value: "+11.8% a year", name: "Revenue growth a year, FY21 to FY25" },
    topProductShare: { value: "49.7% (Search & other)" }, netDebtEbitda: { value: "−0.44" }, worstGrowth: { value: "+8.7%" },
    peVsAvg: { value: "0.61×" }, evEbitdaVsAvg: { value: "0.62×" }, fcfYield: { value: "0.6%" },
  },
};

// Amazon. Numbers come from data/computed/AMZN.json (fetched Nov 10, 2026).
// topProductShare is entered by hand: Online stores were $68.47B of $201.94B net sales in Q3 2026 (33.9%).
// Two inputs are flattered by gains on Amazon's stake in Anthropic (about $69.5B of other income in the last 12 months):
// net margin (16.9%) and the P/E against its average (0.50×). Free cash flow is negative (−5.9% of sales).
// Net debt uses the Dec 31, 2025 balance sheet; by Sep 30, 2026 Amazon had about $66B more debt than cash.
export const amazonScore: { raw: RawInputs; display: DisplayValues } = {
  raw: { roic: 15.75, cashConversion: 20.8, marginRange: 8.77, marketCap: 2886, revenueTtm: 797.46, operatingMargin: 13.09, netMargin: 16.9, fcfMargin: -5.88, growthTtm: 15.35, growthForecast: 16.04, growthCagr: 11.14, topProductShare: 33.9, netDebtEbitda: -0.35, worstGrowth: 9.4, peVsAvg: 0.5, evEbitdaVsAvg: 0.57, fcfYield: -1.62 },
  display: {
    roic: { value: "15.8%" }, cashConversion: { value: "20.8%" }, marginRange: { value: "8.8 points" },
    marketCap: { value: "$2.89T" }, revenueTtm: { value: "$797.5B" },
    operatingMargin: { value: "13.1%" }, netMargin: { value: "16.9%" }, fcfMargin: { value: "−5.9%" },
    growthTtm: { value: "+15.4%", name: "Revenue growth, last 12 months" },
    growthForecast: { value: "+16.0% a year" },
    growthCagr: { value: "+11.1% a year", name: "Revenue growth a year, FY21 to FY25" },
    topProductShare: { value: "33.9% (Online stores)" }, netDebtEbitda: { value: "−0.35" }, worstGrowth: { value: "+9.4%" },
    peVsAvg: { value: "0.50×" }, evEbitdaVsAvg: { value: "0.57×" }, fcfYield: { value: "−1.6%" },
  },
};