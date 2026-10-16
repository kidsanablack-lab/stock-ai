import type { DcfBaseInputs, ScenarioSet } from "./types";

/*
  ILLUSTRATIVE EXAMPLE ONLY.
  These numbers describe a made-up company. They are not estimates for any real
  company and not predictions. The UI must label them "Hypothetical example".
*/

export const ILLUSTRATIVE_FORECAST_YEARS = 5;

export const ILLUSTRATIVE_BASE_INPUTS: DcfBaseInputs = {
  startingFcff: 100,
  forecastYears: ILLUSTRATIVE_FORECAST_YEARS,
  cash: 20,
  debt: 40,
  otherClaims: 0,
  dilutedShares: 50,
};

export function repeatRate(rate: number, years: number): number[] {
  return Array.from({ length: years }, () => rate);
}

export const ILLUSTRATIVE_SCENARIOS: ScenarioSet = {
  bear: {
    growthRates: repeatRate(0.03, ILLUSTRATIVE_FORECAST_YEARS),
    discountRate: 0.12,
    terminalGrowthRate: 0.015,
  },
  base: {
    growthRates: repeatRate(0.08, ILLUSTRATIVE_FORECAST_YEARS),
    discountRate: 0.1,
    terminalGrowthRate: 0.025,
  },
  bull: {
    growthRates: repeatRate(0.12, ILLUSTRATIVE_FORECAST_YEARS),
    discountRate: 0.09,
    terminalGrowthRate: 0.03,
  },
};