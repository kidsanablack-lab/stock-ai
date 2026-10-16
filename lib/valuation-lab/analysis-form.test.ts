import { describe, expect, it } from "vitest";
import {
  buildSensitivity,
  DEFAULT_SENSITIVITY_SETTINGS,
  evaluateScenarioForms,
  ILLUSTRATIVE_SCENARIO_FORMS,
} from "./analysis-form";
import { calculateDcf } from "./dcf";
import { buildDcfInputs, EXAMPLE_FORM } from "./form";
import { marginOfSafetyFromDcf } from "./margin-of-safety";

function valuePerShare(result: ReturnType<typeof calculateDcf>): number {
  if (result.status !== "ok") throw new Error(`expected ok, got ${result.status}`);
  return result.valuePerShare;
}

describe("scenarios from form text", () => {
  it("base case with the same assumptions equals the main DCF", () => {
    const main = valuePerShare(calculateDcf(buildDcfInputs(EXAMPLE_FORM)));
    const scenarios = evaluateScenarioForms(EXAMPLE_FORM, ILLUSTRATIVE_SCENARIO_FORMS);
    expect(valuePerShare(scenarios.base.result)).toBeCloseTo(main, 10);
  });

  it("each scenario uses its own assumptions", () => {
    const s = evaluateScenarioForms(EXAMPLE_FORM, ILLUSTRATIVE_SCENARIO_FORMS);
    const bear = valuePerShare(s.bear.result);
    const base = valuePerShare(s.base.result);
    const bull = valuePerShare(s.bull.result);
    expect(bear).toBeLessThan(base);
    expect(base).toBeLessThan(bull);
    expect(s.bear.assumptions.discountRate).toBeCloseTo(0.12, 12);
    expect(s.bull.assumptions.terminalGrowthRate).toBeCloseTo(0.03, 12);
  });

  it("changing one scenario leaves the others unchanged", () => {
    const before = evaluateScenarioForms(EXAMPLE_FORM, ILLUSTRATIVE_SCENARIO_FORMS);
    const after = evaluateScenarioForms(EXAMPLE_FORM, {
      ...ILLUSTRATIVE_SCENARIO_FORMS,
      bull: { growth: "20", discountRate: "9", terminalGrowth: "3" },
    });
    expect(after.base.result).toEqual(before.base.result);
    expect(after.bear.result).toEqual(before.bear.result);
    expect(valuePerShare(after.bull.result)).toBeGreaterThan(
      valuePerShare(before.bull.result),
    );
  });

  it("follows the forecast period of the main DCF", () => {
    const form = { ...EXAMPLE_FORM, forecastYears: "3", growthRates: ["8", "8", "8"] };
    const s = evaluateScenarioForms(form, ILLUSTRATIVE_SCENARIO_FORMS);
    expect(s.base.result.status).toBe("ok");
    if (s.base.result.status === "ok") expect(s.base.result.forecast).toHaveLength(3);
  });

  it("an incomplete scenario fails alone", () => {
    const s = evaluateScenarioForms(EXAMPLE_FORM, {
      ...ILLUSTRATIVE_SCENARIO_FORMS,
      bull: { growth: "12", discountRate: "", terminalGrowth: "3" },
    });
    expect(s.bull.result.status).toBe("missing_input");
    expect(s.base.result.status).toBe("ok");
  });
});

describe("sensitivity from form text", () => {
  it("is centered on the main model and the center cell equals it", () => {
    const build = buildSensitivity(EXAMPLE_FORM, DEFAULT_SENSITIVITY_SETTINGS);
    expect(build.status).toBe("ok");
    if (build.status !== "ok") return;

    expect(build.table.discountRates.map((r) => Math.round(r * 10000))).toEqual([
      800, 900, 1000, 1100, 1200,
    ]);
    expect(build.table.terminalGrowthRates.map((g) => Math.round(g * 10000))).toEqual([
      150, 200, 250, 300, 350,
    ]);

    const main = valuePerShare(calculateDcf(buildDcfInputs(EXAMPLE_FORM)));
    const center = build.table.cells[build.centerIndex][build.centerIndex];
    expect(center.valuePerShare).toBeCloseTo(main, 10);
  });

  it("does not change the form it reads", () => {
    const snapshot = JSON.stringify(EXAMPLE_FORM);
    buildSensitivity(EXAMPLE_FORM, DEFAULT_SENSITIVITY_SETTINGS);
    expect(JSON.stringify(EXAMPLE_FORM)).toBe(snapshot);
  });

  it("marks cells where discount rate <= terminal growth as unavailable", () => {
    const form = { ...EXAMPLE_FORM, discountRate: "3", terminalGrowth: "2.5" };
    const build = buildSensitivity(form, DEFAULT_SENSITIVITY_SETTINGS);
    expect(build.status).toBe("ok");
    if (build.status !== "ok") return;
    // First row is the lowest discount rate (1%), last column the highest growth (3.5%).
    const cell = build.table.cells[0][4];
    expect(cell.status).toBe("unavailable");
    expect(cell.result).toBeNull();
  });

  it("is unavailable when the main rates or steps are missing or invalid", () => {
    expect(
      buildSensitivity({ ...EXAMPLE_FORM, discountRate: "" }, DEFAULT_SENSITIVITY_SETTINGS).status,
    ).toBe("unavailable");
    expect(
      buildSensitivity(EXAMPLE_FORM, { ...DEFAULT_SENSITIVITY_SETTINGS, discountStep: "0" }).status,
    ).toBe("unavailable");
    expect(
      buildSensitivity(EXAMPLE_FORM, { ...DEFAULT_SENSITIVITY_SETTINGS, growthStep: "9" }).status,
    ).toBe("unavailable");
    expect(
      buildSensitivity(EXAMPLE_FORM, { ...DEFAULT_SENSITIVITY_SETTINGS, points: "4" }).status,
    ).toBe("unavailable");
  });
});

describe("margin of safety against a scenario", () => {
  it("uses the selected scenario's value per share", () => {
    const s = evaluateScenarioForms(EXAMPLE_FORM, ILLUSTRATIVE_SCENARIO_FORMS);
    const mos = marginOfSafetyFromDcf(s.base.result, 30);
    expect(mos.status).toBe("ok");
    // Base value is about 34, so (34 - 30) / 34 is about 11.8%.
    expect(mos.marginOfSafetyPercent).toBeGreaterThan(11);
    expect(mos.marginOfSafetyPercent).toBeLessThan(12.5);
  });

  it("is unavailable when the scenario cannot be calculated", () => {
    const s = evaluateScenarioForms(
      { ...EXAMPLE_FORM, dilutedShares: "" },
      ILLUSTRATIVE_SCENARIO_FORMS,
    );
    expect(marginOfSafetyFromDcf(s.base.result, 30).status).toBe("missing_input");
  });
});