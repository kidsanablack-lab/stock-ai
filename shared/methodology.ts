// Put this file in a "shared" folder next to apple.ts, microsoft.ts, google.ts, nvidia.ts and amazon.ts
// (path: <company data folder>/shared/methodology.ts). Nothing imports it yet, so the build is unchanged.
//
// Standard wording that was copy-pasted into every company data file.
// A company file imports what it needs and overrides only what is really different.
// Rule: no company name, fiscal year or business-specific word belongs in this file.
import type { ClosingPanelData, SourcesMethodData } from "@/lib/company-next/types";

/* ---------- Sources and method: single strings ---------- */

export const scoringIntro =
  "Six categories, each with its own inputs, weights and cut-offs. Every input is scored from 0 to 10, a category is the weighted average of its inputs, and the overall score is the weighted average of the categories. Grades: A+ from 9.0, A from 8.0, B+ from 7.5, B from 7.0, C+ from 6.0, C from 5.0, D from 3.0, F below that. Labels: Excellent from 9.0, Strong from 7.5, Good from 6.0, Fair from 5.0, Weak below that.";

export const formulasNote =
  "Scope uses reported (GAAP) figures and interest-bearing debt. Figures with different definitions are never compared without a note.";

/** Default. Alphabet and Amazon write their own sentence in their data file. */
export const valuationNote =
  "Fair value is a model output under stated assumptions, not a price the stock will reach.";

/* ---------- Score reasons: howToRead ---------- */

const SCORE_HOW_TO_READ =
  "A is the strongest grade and F the weakest. Green means strong, amber mixed, red weak. Each grade comes from a 0 to 10 category score, and the overall score is their weighted average. The inputs, weights and cut-offs are listed under Sources and method.";

/** Pass `extra` for a company-specific sentence (for example a note about one-time gains). It is added after the standard text. */
export function scoreHowToRead(extra?: string): string {
  return extra ? `${SCORE_HOW_TO_READ} ${extra}` : SCORE_HOW_TO_READ;
}

/* ---------- Closing panel: everything that is the same on every page ---------- */
// Use it as:  const closing: ClosingPanelData = { title: [...], lead: "...", companies: [...], ...closingShared };

export const closingShared: Pick<ClosingPanelData, "links" | "allLabel" | "allHref" | "note"> = {
  links: [
    { icon: "ti-git-compare", title: "Compare", href: "/compare" },
    { icon: "ti-calculator", title: "Valuation Lab", href: "/valuation-lab" },
    { icon: "ti-compass", title: "7 Powers", href: "/7-powers" },
  ],
  allLabel: "See all companies",
  allHref: "/trending",
  note: "The 7 Powers framework was developed by Hamilton Helmer in 7 Powers: The Foundations of Business Strategy (2016). Scope's explanations and examples are its own. Scope is built for understanding businesses, not for investment advice.",
};

/* ---------- Formulas ---------- */

type Formula = SourcesMethodData["formulas"][number];

export type FormulaName =
  | "Revenue growth"
  | "Operating margin"
  | "Net margin"
  | "ROE"
  | "ROIC"
  | "Debt to equity"
  | "Free cash flow"
  | "Net cash"
  | "P/E"
  | "EV/EBITDA";

/** A string replaces the note. An object can replace the note, the formula, or both. */
export type FormulaOverrides = Partial<Record<FormulaName, string | { formula?: string; note?: string }>>;

const BASE_FORMULAS: (Formula & { name: FormulaName })[] = [
  {
    name: "Revenue growth",
    formula: "(Revenue now − revenue a year earlier) ÷ revenue a year earlier × 100",
    note: "Year over year, to avoid seasonal swings. For the last 12 months, the comparison is with the 12 months before that. Quarterly and annual are never mixed.",
  },
  {
    name: "Operating margin",
    formula: "Operating income ÷ revenue × 100",
    note: "Uses reported operating income, with no add-backs.",
  },
  {
    name: "Net margin",
    formula: "Net income ÷ revenue × 100",
    note: "GAAP net income.",
  },
  {
    name: "ROE",
    formula: "Net income ÷ average shareholders’ equity × 100",
    note: "Average of start and end of period.",
  },
  {
    name: "ROIC",
    formula: "Operating income × (1 − tax rate) ÷ average (equity + debt) × 100",
    note: "Debt is interest-bearing debt. Cash is not subtracted. Other data providers define it differently, so compare ROIC only within Scope.",
  },
  {
    name: "Debt to equity",
    formula: "Interest-bearing debt ÷ shareholders’ equity",
    note: "Debt is short-term plus long-term debt, without leases.",
  },
  {
    name: "Free cash flow",
    formula: "Operating cash flow − capital spending",
    note: "Capital spending is taken from the cash flow statement. Quarterly figures come from subtracting cumulative year-to-date totals.",
  },
  {
    name: "Net cash",
    formula: "Cash and short-term investments − interest-bearing debt",
    note: "Positive means net cash.",
  },
  {
    name: "P/E",
    formula: "Share price ÷ diluted earnings per share, last 12 months",
    note: "GAAP earnings. The history uses the price at each fiscal year end and that year’s earnings.",
  },
  {
    name: "EV/EBITDA",
    formula: "(Market cap − net cash) ÷ (operating income + depreciation and amortization)",
    note: "Last 12 months. The average used in the Valuation section is the 5-year average at fiscal year ends.",
  },
];

/** The standard formula list, with company-specific notes (or formulas) replaced where given. */
export function formulas(overrides: FormulaOverrides = {}): SourcesMethodData["formulas"] {
  return BASE_FORMULAS.map((f) => {
    const o = overrides[f.name];
    if (o === undefined) return f;
    if (typeof o === "string") return { ...f, note: o };
    return { ...f, formula: o.formula ?? f.formula, note: o.note ?? f.note };
  });
}