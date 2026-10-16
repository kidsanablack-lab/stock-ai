import type {
  CategoryId,
  CurrencyCode,
  HoldingDraft,
  PortfolioTemplate,
} from "./types";

/* Single source of truth for the builder.
   Raw text is stored for the investment amount and for each percentage.
   Every number on the page is derived from this state. */

export type LabState = {
  investmentInput: string;
  currency: CurrencyCode;
  holdings: HoldingDraft[];
  loadedTemplateId: string | null;
};

export const DEFAULT_INVESTMENT_INPUT = "10000";

export const initialState: LabState = {
  investmentInput: DEFAULT_INVESTMENT_INPUT,
  currency: "USD",
  holdings: [],
  loadedTemplateId: null,
};

export type LabAction =
  | { type: "setInvestment"; value: string }
  | { type: "setCurrency"; currency: CurrencyCode }
  | { type: "addHolding"; holding: HoldingDraft }
  | {
      type: "updateHolding";
      id: string;
      patch: Partial<Omit<HoldingDraft, "id">>;
    }
  | { type: "removeHolding"; id: string }
  | { type: "loadTemplate"; templateId: string; holdings: HoldingDraft[] }
  | { type: "reset" };

export function labReducer(state: LabState, action: LabAction): LabState {
  switch (action.type) {
    case "setInvestment":
      return { ...state, investmentInput: action.value };

    case "setCurrency":
      // Display setting only: numbers are kept as they are (no conversion).
      return { ...state, currency: action.currency };

    case "addHolding":
      return { ...state, holdings: [...state.holdings, action.holding] };

    case "updateHolding":
      // Only the edited holding changes. Other allocations are never touched.
      return {
        ...state,
        holdings: state.holdings.map((holding) =>
          holding.id === action.id ? { ...holding, ...action.patch } : holding,
        ),
      };

    case "removeHolding":
      return {
        ...state,
        holdings: state.holdings.filter((holding) => holding.id !== action.id),
      };

    case "loadTemplate":
      // Replaces holdings only. Investment amount and currency are kept.
      return {
        ...state,
        holdings: action.holdings,
        loadedTemplateId: action.templateId,
      };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

/* ---------- Helpers that create drafts ---------- */

let counter = 0;

/** Unique id for a holding. Never based on its position in the list. */
export function makeId(): string {
  counter += 1;
  return `h${Date.now().toString(36)}${counter}${Math.random()
    .toString(36)
    .slice(2, 6)}`;
}

export function createBlankHolding(
  category: CategoryId = "equity-etf",
): HoldingDraft {
  return { id: makeId(), name: "New holding", category, percentInput: "0" };
}

export function draftsFromTemplate(template: PortfolioTemplate): HoldingDraft[] {
  return template.holdings.map((holding) => ({
    id: makeId(),
    name: holding.name,
    category: holding.category,
    percentInput: String(holding.percent),
  }));
}
