// Educational text for the Valuation Lab. Wording is Scope's own.
// Every number in the examples is hypothetical, and each one is checked
// against the calculation engine in summary.test.ts.

export type GlossaryKey =
  | "eps"
  | "revenue"
  | "marketCap"
  | "fcff"
  | "discountRate"
  | "terminalGrowth"
  | "terminalValue"
  | "enterpriseValue"
  | "equityValue"
  | "dilutedShares"
  | "marginOfSafety";

export interface GlossaryEntry {
  term: string;
  what: string;
  why: string;
  limit: string;
}

export const GLOSSARY: Record<GlossaryKey, GlossaryEntry> = {
  eps: {
    term: "EPS (earnings per share)",
    what: "The company's profit for a period, divided by its number of shares.",
    why: "It puts profit on a per-share basis, so it can be compared with the share price in the P/E ratio.",
    limit:
      "It is an accounting figure. One-off gains or losses can distort it, and different periods (trailing, annual, forecast) are not interchangeable.",
  },
  revenue: {
    term: "revenue",
    what: "The total sales of the business for a period, before costs are subtracted.",
    why: "It is the base for the P/S ratio and shows how large the business is.",
    limit:
      "Revenue says nothing about profit. A company can grow revenue and still lose money.",
  },
  marketCap: {
    term: "market capitalization",
    what: "The share price multiplied by the number of shares: what the market's price implies for the whole company's equity.",
    why: "It lets you compare the value of the whole company with its revenue (P/S).",
    limit:
      "It depends on which share count you use (basic or diluted) and on the price you typed. It is not the same as enterprise value, because it ignores debt and cash.",
  },
  fcff: {
    term: "free cash flow to the firm (FCFF)",
    what: "The cash a business generates after operating costs, taxes, and the investment it needs, available to all of its capital providers.",
    why: "The DCF model values a business by the cash it is expected to generate, and this is the cash flow it starts from.",
    limit:
      "There are several ways to calculate it, and a single year can be unusually high or low. A negative starting value makes the model hard to interpret.",
  },
  discountRate: {
    term: "the discount rate",
    what: "The yearly rate used to bring future cash flows back to today's value. In this model it is a firm-level rate such as WACC.",
    why: "A cash flow received later is worth less today. A higher rate means a lower present value.",
    limit:
      "There is no single correct rate. It is an estimate, and it must match the cash flow type: FCFF goes with a firm-level rate, not a cost of equity.",
  },
  terminalGrowth: {
    term: "the terminal growth rate",
    what: "The steady yearly growth assumed for cash flows after the forecast period ends, continuing indefinitely.",
    why: "A business is assumed to last beyond the forecast years, so the model needs a rate for that long-term stage.",
    limit:
      "It must be lower than the discount rate. A very high rate would imply the business outgrows the economy forever.",
  },
  terminalValue: {
    term: "terminal value",
    what: "The value, at the end of the forecast, of all the cash flows after it, calculated with a steady growth rate.",
    why: "Most of a business's value often lies beyond the explicit forecast, so the model needs a way to include it.",
    limit:
      "It is often a large share of the total and is very sensitive to the discount rate and terminal growth. Check how large that share is.",
  },
  enterpriseValue: {
    term: "enterprise value (EV)",
    what: "The estimated value of the whole business's operations: the present value of forecast cash flows plus the present value of terminal value.",
    why: "It is the value before taking the capital structure (debt and cash) into account.",
    limit:
      "It is an estimate from your assumptions. It is not the same as market capitalization.",
  },
  equityValue: {
    term: "equity value",
    what: "Enterprise value plus cash, minus debt and other claims. It is the part that belongs to shareholders.",
    why: "Shareholders own what is left after the other claims on the business are covered, so this is the number divided by shares.",
    limit:
      "It depends on balance sheet figures you enter and on their date. It can be negative if claims exceed enterprise value.",
  },
  dilutedShares: {
    term: "diluted shares outstanding",
    what: "The number of shares counting not only existing shares but also those that could be created by options and similar instruments.",
    why: "Dividing by diluted shares avoids overstating the value of each share when more shares could be issued.",
    limit:
      "The figure comes from reports and changes over time. It must use the same unit as the other amounts (for example, millions).",
  },
  marginOfSafety: {
    term: "margin of safety",
    what: "How far an estimated value per share is above or below the share price, as a percentage of the estimate.",
    why: "It shows how much your own assumptions would need to be wrong before the price and the estimate meet.",
    limit:
      "It is only as good as the estimate and the price you entered. It does not guarantee against loss, and it is not a recommendation.",
  },
};

export interface Lesson {
  id: string;
  title: string;
  intro: string;
  formulas?: string[];
  exampleTitle: string;
  example: string[];
  limits: string[];
  link: { href: string; label: string };
}

export const LESSONS: Lesson[] = [
  {
    id: "what-is-valuation",
    title: "What Is Stock Valuation?",
    intro:
      "Valuation is the process of estimating what a business may be worth, using information and assumptions. The share price is what the market asks today. A valuation is an estimate that depends on the inputs and views of whoever builds it. The two can differ, and neither is certain.",
    exampleTitle: "Two people, one business",
    example: [
      "Two people study the same business.",
      "One assumes its cash flows grow 3% a year. The other assumes 8%.",
      "Both can follow the method correctly and still reach different estimates.",
    ],
    limits: [
      "Every valuation depends on assumptions about the future.",
      "Data can be incomplete or out of date.",
      "A valuation organizes your thinking. It is not a prediction.",
    ],
    link: { href: "#workspace", label: "Open the workspace" },
  },
  {
    id: "pe",
    title: "P/E Ratio Explained",
    intro:
      "The price-to-earnings ratio compares the share price with the profit each share produced. It tells you how many years of that profit the price represents.",
    formulas: ["P/E = Share price ÷ EPS"],
    exampleTitle: "A made-up company",
    example: [
      "Share price: 30. EPS: 1.50.",
      "P/E = 30 ÷ 1.50 = 20.0x.",
      "In words: the price is 20 times one year of earnings per share.",
    ],
    limits: [
      "A high or low P/E does not show on its own whether a stock is cheap or expensive.",
      "With zero or negative EPS, no meaningful P/E exists.",
      "EPS can include one-off items, and the period (trailing or forecast) matters.",
    ],
    link: { href: "#relative", label: "Try the P/E calculator" },
  },
  {
    id: "ps",
    title: "P/S Ratio Explained",
    intro:
      "The price-to-sales ratio compares the value of the whole company's equity with its revenue. It is useful when profit is small or negative, but it ignores profit entirely.",
    formulas: [
      "Market cap = Share price × Shares outstanding",
      "P/S = Market cap ÷ Revenue",
    ],
    exampleTitle: "A made-up company",
    example: [
      "Share price: 30. Shares outstanding: 50 (millions).",
      "Market cap = 30 × 50 = 1,500 (millions).",
      "Revenue: 500 (millions). P/S = 1,500 ÷ 500 = 3.0x.",
    ],
    limits: [
      "Revenue and market cap must use the same unit and currency.",
      "Two companies with the same P/S can have very different profits and debt.",
      "The result depends on whether you use basic or diluted shares.",
    ],
    link: { href: "#relative", label: "Try the P/S calculator" },
  },
  {
    id: "dcf",
    title: "How DCF Works",
    intro:
      "A discounted cash flow model estimates what a business's future cash flows could be worth today. It forecasts cash flows for some years, adds a terminal value for the years after, brings everything back to today with a discount rate, and then adjusts for cash and debt.",
    formulas: [
      "FCFF(t) = FCFF(t−1) × (1 + growth)",
      "PV = FCFF(t) ÷ (1 + r)^t",
      "Terminal value = FCFF(n) × (1 + g) ÷ (r − g)",
      "EV = Σ PV of forecast + PV of terminal value",
      "Equity value = EV + cash − debt − other claims",
      "Value per share = Equity value ÷ diluted shares",
    ],
    exampleTitle: "A made-up company",
    example: [
      "Starting FCFF 100, grows 10% a year for 3 years: 110, 121, 133.1.",
      "With r = 10%, each year's present value is exactly 100, so they sum to 300.",
      "Terminal value (g = 2%) = 133.1 × 1.02 ÷ 0.08 ≈ 1,697.0. Its present value ≈ 1,275.",
      "EV ≈ 300 + 1,275 = 1,575.",
      "Add cash 100, subtract debt 300 and other claims 50: equity value 1,325. With 100 shares: 13.25 per share.",
    ],
    limits: [
      "The result is only as good as the assumptions behind it.",
      "Small changes in the rates can change the result a lot.",
      "It is an estimate, not an objective or guaranteed value.",
    ],
    link: { href: "#dcf", label: "Open the DCF" },
  },
  {
    id: "discount-rates",
    title: "Understanding Discount Rates",
    intro:
      "The discount rate turns future cash flows into today's value. Cash received later is worth less than the same cash today, because of time and risk. The more risk you see, the higher the rate you may choose, and the lower the present value.",
    formulas: ["Present value = Cash flow ÷ (1 + r)^t"],
    exampleTitle: "One cash flow",
    example: [
      "A cash flow of 110 arrives in one year.",
      "At r = 10%: 110 ÷ 1.10 = 100 today.",
      "At r = 20%: 110 ÷ 1.20 ≈ 91.67 today.",
    ],
    limits: [
      "There is no single correct discount rate. It is an estimate.",
      "FCFF must be discounted with a firm-level rate such as WACC, not a cost of equity.",
      "Choosing a rate is itself an assumption about risk.",
    ],
    link: { href: "#dcf", label: "Change the discount rate" },
  },
  {
    id: "terminal-value",
    title: "Why Terminal Value Matters",
    intro:
      "A forecast has to stop somewhere, but the business may not. Terminal value captures the cash flows after the forecast, assuming steady growth forever. It is often the largest part of a DCF.",
    formulas: ["Terminal value = FCFF(n) × (1 + g) ÷ (r − g)"],
    exampleTitle: "Using the DCF example above",
    example: [
      "Present value of terminal value ≈ 1,275. Enterprise value ≈ 1,575.",
      "Terminal value is about 81% of enterprise value.",
      "So most of this estimate depends on what happens after the 3 forecast years.",
    ],
    limits: [
      "When r and g are close, terminal value becomes very large and very sensitive.",
      "Growth forever above the growth of the economy is hard to defend.",
      "A negative terminal cash flow produces a negative terminal value, which is rarely realistic.",
    ],
    link: { href: "#dcf", label: "See the terminal value share" },
  },
  {
    id: "sensitivity",
    title: "Sensitivity Analysis Explained",
    intro:
      "Sensitivity analysis shows how an estimate changes when one or two assumptions change. Instead of one answer, you see a range, and you learn which assumptions matter most.",
    exampleTitle: "Using the DCF example above",
    example: [
      "With r = 10% and g = 2%, enterprise value ≈ 1,575.",
      "Change only the discount rate to 11%: enterprise value ≈ 1,398.",
      "That is roughly 11% lower from a 1-point change in one assumption.",
    ],
    limits: [
      "A table shows combinations you chose. The right answer may lie outside it.",
      "It tests assumptions one pair at a time, not every possible mistake.",
      "Combinations where the discount rate is not above terminal growth cannot be calculated.",
    ],
    link: { href: "#sensitivity", label: "Open the sensitivity table" },
  },
  {
    id: "margin-of-safety",
    title: "Understanding Margin of Safety",
    intro:
      "Margin of safety compares an estimated value per share with the share price. It is a way to see how much room your assumptions leave before price and estimate meet.",
    formulas: [
      "Margin of Safety (%) = (Estimated value − Price) ÷ Estimated value × 100",
    ],
    exampleTitle: "A made-up estimate",
    example: [
      "Estimated value per share: 40. Share price: 30.",
      "Margin of safety = (40 − 30) ÷ 40 = 25.0%.",
      "If the price were 50: (40 − 50) ÷ 40 = −25.0%.",
    ],
    limits: [
      "It depends on the estimate and on the price you typed. Both can be wrong.",
      "A positive number does not guarantee against loss.",
      "If the estimated value is zero or negative, no percentage is meaningful.",
    ],
    link: { href: "#margin-of-safety", label: "Open Margin of Safety" },
  },
];