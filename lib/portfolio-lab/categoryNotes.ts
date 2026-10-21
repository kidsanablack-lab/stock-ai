import type { CategoryId } from "./types";

// General, beginner-level explanations. They describe what a category IS and
// what CAN affect it. They never say how any real asset will perform.

export type CategoryNote = {
  what: string;
  canAffect: string;
};

export const CATEGORY_NOTES: Record<CategoryId, CategoryNote> = {
  "individual-stocks": {
    what: "Shares of single companies.",
    canAffect:
      "Each company can face problems that are specific to it, so a few stocks can make the portfolio's value swing more than a broad mix would.",
  },
  "equity-etf": {
    what: "Funds that hold many stocks and trade like a stock.",
    canAffect:
      "They still move with the stock market. How diversified one is depends on what it holds, for example one country, one industry, or only the largest companies.",
  },
  bonds: {
    what: "Loans to governments or companies that pay interest.",
    canAffect:
      "Prices can fall when interest rates rise, and a borrower may fail to repay.",
  },
  "bond-etf": {
    what: "Funds that hold many bonds and trade like a stock.",
    canAffect:
      "The same things that affect bonds can apply, and the fund's price changes every day. What it holds matters: which bonds, how long they last, and who issued them.",
  },
  cash: {
    what: "Money held in cash or very short-term, low-risk accounts.",
    canAffect:
      "Its value does not swing much, but inflation can reduce what it can pay for, and the interest it earns may be low.",
  },
  bitcoin: {
    what: "A digital currency.",
    canAffect:
      "Its price can swing sharply and may fall by a large amount in a short time.",
  },
  "other-crypto": {
    what: "Digital assets other than Bitcoin.",
    canAffect:
      "Prices can swing sharply, and some projects can fail or lose most of their value. Portfolio Lab cannot judge any specific coin.",
  },
  gold: {
    what: "Gold held directly or through a fund.",
    canAffect:
      "It pays no interest or dividends, and its price can rise and fall.",
  },
  "real-estate": {
    what: "Property, or REITs (companies that own property).",
    canAffect:
      "Values can be affected by interest rates and property markets, and listed REITs can move like stocks.",
  },
  other: {
    what: "Anything that does not fit the other categories.",
    canAffect:
      "Portfolio Lab cannot say anything about it. How it behaves depends entirely on what it is.",
  },
};

// Things Portfolio Lab cannot calculate from a name, a category, and a
// percentage, and what would be needed to calculate them.
export const NOT_AVAILABLE: { title: string; reason: string }[] = [
  {
    title: "Geographic exposure",
    reason:
      "It would need each holding's real country breakdown. A name and a category do not tell us that, and a company's home country does not show where it earns its money.",
  },
  {
    title: "Currency exposure",
    reason:
      "It depends on the currency each holding is priced and earns in. The display currency setting only changes how amounts are shown.",
  },
  {
    title: "ETF overlap",
    reason:
      "It would need the real list of what each fund holds. Portfolio Lab has no fund holdings data, so it does not show an overlap number.",
  },
  {
    title: "How holdings move together",
    reason:
      "That needs historical price data. Portfolio Lab uses no prices.",
  },
  {
    title: "Future volatility or returns",
    reason:
      "Nobody can know these in advance, and Portfolio Lab makes no forecasts.",
  },
  {
    title: "Your personal risk tolerance",
    reason:
      "It depends on your goals, time horizon, and how you would react to losses, which this tool does not ask about.",
  },
];
