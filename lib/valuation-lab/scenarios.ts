import { calculateDcf } from "./dcf";
import type {
  DcfBaseInputs,
  DcfResult,
  ScenarioAssumptions,
  ScenarioName,
  ScenarioResult,
  ScenarioSet,
} from "./types";

export const SCENARIO_NAMES: ScenarioName[] = ["bear", "base", "bull"];

/** One scenario = shared base inputs + its own assumptions. Uses the shared DCF engine. */
export function evaluateScenario(
  base: DcfBaseInputs,
  assumptions: ScenarioAssumptions,
): DcfResult {
  return calculateDcf({
    ...base,
    growthRates: assumptions.growthRates,
    discountRate: assumptions.discountRate,
    terminalGrowthRate: assumptions.terminalGrowthRate,
  });
}

export function evaluateScenarios(
  base: DcfBaseInputs,
  scenarios: ScenarioSet,
): Record<ScenarioName, ScenarioResult> {
  const build = (name: ScenarioName): ScenarioResult => ({
    name,
    assumptions: scenarios[name],
    result: evaluateScenario(base, scenarios[name]),
  });
  return { bear: build("bear"), base: build("base"), bull: build("bull") };
}