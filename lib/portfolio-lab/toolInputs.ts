/* =====================================================================
   Portfolio Lab — inputs of the planning tools (Phase 6A).

   The DCA Planner, Investment Calculator, and Rebalancing Tool used to keep
   their typed values inside their own components. Saved Plans needs to read
   and restore those values, so they now live in ONE place (PortfolioLab)
   and the tools receive them as props.

   Everything here is raw text, exactly as typed, like the builder's state.
   Numbers are always derived from this text.
   ===================================================================== */

import { emptyTargetInputs, type TargetInputs } from "./rebalance";

export type DcaFields = {
  initial: string;
  monthly: string;
  years: string;
  annualReturn: string;
};

export type CalculatorMode = "lump" | "monthly";

export type CalculatorFields = {
  initial: string;
  monthly: string;
  years: string;
};

export type CalculatorInputs = {
  mode: CalculatorMode;
  fields: CalculatorFields;
  /** Always three assumed yearly returns. */
  rates: string[];
};

export type ToolInputs = {
  dca: DcaFields;
  calculator: CalculatorInputs;
  target: TargetInputs;
};

export const DEFAULT_DCA_FIELDS: DcaFields = {
  initial: "10000",
  monthly: "500",
  years: "10",
  annualReturn: "6",
};

export const DEFAULT_CALCULATOR_INPUTS: CalculatorInputs = {
  mode: "lump",
  fields: { initial: "10000", monthly: "300", years: "15" },
  rates: ["3", "6", "9"],
};

/** Fresh copies every time, so nothing is ever shared between states. */
export function defaultDcaFields(): DcaFields {
  return { ...DEFAULT_DCA_FIELDS };
}

export function defaultCalculatorInputs(): CalculatorInputs {
  return {
    mode: DEFAULT_CALCULATOR_INPUTS.mode,
    fields: { ...DEFAULT_CALCULATOR_INPUTS.fields },
    rates: [...DEFAULT_CALCULATOR_INPUTS.rates],
  };
}

export function defaultToolInputs(): ToolInputs {
  return {
    dca: defaultDcaFields(),
    calculator: defaultCalculatorInputs(),
    target: emptyTargetInputs(),
  };
}
