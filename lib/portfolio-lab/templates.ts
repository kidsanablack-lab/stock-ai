import type { PortfolioTemplate } from "./types";

// Educational examples only. They are NOT recommendations and are not
// personalized. Every template must total exactly 100% (checked by tests).
// All percentages live here, nowhere else.

export const TEMPLATES: PortfolioTemplate[] = [
  {
    id: "conservative",
    name: "Conservative",
    description: "A mix that holds more bonds and cash than stocks.",
    objective:
      "Illustrate a portfolio with a larger allocation to bonds and cash than to equities.",
    idea: "Bonds and cash tend to behave differently from stocks, which is why some portfolios hold them alongside equities. This example keeps 80% outside equities.",
    risks: [
      "A conservative label does not mean the portfolio cannot lose value.",
      "Bond prices can fall, for example when interest rates rise or an issuer struggles to repay.",
      "Cash can lose purchasing power to inflation and may earn little interest.",
      "A smaller equity share means less exposure to stock-market growth, and also less exposure to stock-market declines.",
    ],
    context:
      "Often used in teaching to show how bonds and cash change a portfolio's mix. The right mix for a real person depends on goals, time horizon, and comfort with losses.",
    holdings: [
      { name: "Equity ETF", category: "equity-etf", percent: 20 },
      { name: "Bond ETF", category: "bond-etf", percent: 50 },
      { name: "Cash", category: "cash", percent: 30 },
    ],
  },
  {
    id: "balanced",
    name: "Balanced",
    description: "A blend of equity exposure, bond exposure, and cash.",
    objective:
      "Illustrate a combination of equity exposure, bond exposure, and cash.",
    idea: "Splitting money between equities and bonds is a common way to explain asset allocation. Here, half is in equities, 40% in bonds, and 10% in cash.",
    risks: [
      "The real risk depends on what the funds actually hold: their duration, credit quality, geographic exposure, and more.",
      "Equities and bonds can fall at the same time.",
      "A balanced label describes the mix, not a level of safety.",
    ],
    context:
      "A frequent teaching example for the idea of balancing growth-oriented and stability-oriented assets. It is not a suggestion that this mix suits anyone.",
    holdings: [
      { name: "Equity ETF", category: "equity-etf", percent: 50 },
      { name: "Bond ETF", category: "bond-etf", percent: 40 },
      { name: "Cash", category: "cash", percent: 10 },
    ],
  },
  {
    id: "long-term-growth",
    name: "Long-term Growth",
    description: "A mix with a relatively high share in equities.",
    objective:
      "Illustrate a portfolio with a relatively high equity allocation.",
    idea: "A larger equity share means the portfolio's value follows the stock market more closely. This example holds 80% in an equity ETF, 15% in a bond ETF, and 5% in cash.",
    risks: [
      "More equity exposure can mean larger swings and substantial losses.",
      "Higher equity exposure does not guarantee higher returns.",
      "Long periods of weak stock markets are possible.",
      "A single equity ETF may not be broadly diversified.",
    ],
    context:
      "Shows how a higher equity share changes a portfolio. Anyone considering a real portfolio may want to think about how long they can leave the money invested and how they would handle large declines.",
    holdings: [
      { name: "Equity ETF", category: "equity-etf", percent: 80 },
      { name: "Bond ETF", category: "bond-etf", percent: 15 },
      { name: "Cash", category: "cash", percent: 5 },
    ],
  },
  {
    id: "dividend-income",
    name: "Dividend & Income",
    description: "A mix built around assets that may pay dividends or interest.",
    objective:
      "Illustrate a portfolio focused on assets that may generate dividends, interest, or other income.",
    idea: "Some assets pay income: dividends from stocks and interest from bonds and cash. This example holds 40% in dividend stocks, 40% in a bond ETF, and 20% in cash.",
    risks: [
      "Dividends are not guaranteed and can be cut.",
      "Dividend-paying stock prices can still fall.",
      "Bond prices can fluctuate.",
      "Distributions are not the same as total return.",
      "Dividend-paying assets are not automatically safer.",
    ],
    context:
      "Useful for learning the difference between income and total return. Chasing income can lead to concentration in a few sectors.",
    holdings: [
      { name: "Dividend Stocks", category: "individual-stocks", percent: 40 },
      { name: "Bond ETF", category: "bond-etf", percent: 40 },
      { name: "Cash", category: "cash", percent: 20 },
    ],
  },
  {
    id: "global-diversification",
    name: "Global Diversification",
    description: "A mix that illustrates spreading exposure across markets.",
    objective:
      "Illustrate the idea of spreading exposure across multiple markets and asset types.",
    idea: "Holding funds that cover many countries is one way people try to avoid depending on a single market. This example holds 70% in a global equity ETF, 25% in a global bond ETF, and 5% in cash.",
    risks: [
      "Real diversification depends on what the funds hold: their countries, currencies, sectors, and largest positions.",
      "A fund called global can still be heavily concentrated in a few markets or companies.",
      "Foreign-currency exposure can add its own gains and losses.",
      "Portfolio Lab cannot confirm that this example is truly globally diversified without looking inside the funds.",
    ],
    context:
      "Introduces the idea of diversification across markets. The label alone does not guarantee it.",
    holdings: [
      { name: "Global Equity ETF", category: "equity-etf", percent: 70 },
      { name: "Global Bond ETF", category: "bond-etf", percent: 25 },
      { name: "Cash", category: "cash", percent: 5 },
    ],
  },
  {
    id: "growth-bitcoin",
    name: "Growth + Bitcoin",
    description: "An equity-focused mix with a small Bitcoin allocation.",
    objective:
      "Illustrate how a hypothetical portfolio might include a small Bitcoin allocation alongside traditional financial assets.",
    idea: "This example holds 70% in an equity ETF, 20% in a bond ETF, and 10% in Bitcoin. It shows how a small slice in a very different asset changes the mix.",
    risks: [
      "Bitcoin can be highly volatile and may fall by a large amount.",
      "Bitcoin is not a safe or guaranteed source of growth.",
      "Even a 10% allocation can account for a large share of a portfolio's swings.",
      "Rules, access, and security risks for cryptocurrency differ from traditional assets.",
    ],
    context:
      "Shows how adding a high-volatility asset changes a portfolio. It is not a view on whether Bitcoin belongs in anyone's portfolio.",
    holdings: [
      { name: "Equity ETF", category: "equity-etf", percent: 70 },
      { name: "Bond ETF", category: "bond-etf", percent: 20 },
      { name: "Bitcoin", category: "bitcoin", percent: 10 },
    ],
  },
];

export function getTemplate(id: string | null) {
  return TEMPLATES.find((template) => template.id === id) ?? null;
}
