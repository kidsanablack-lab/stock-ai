import { describe, expect, it } from "vitest";
import { buildSensitivity, DEFAULT_SENSITIVITY_SETTINGS } from "./analysis-form";
import { calculateDcf } from "./dcf";
import { buildDcfInputs, EXAMPLE_FORM, INITIAL_FORM } from "./form";
import { calculateMarginOfSafety } from "./margin-of-safety";
import { calculatePe, calculatePs } from "./relative";
import {
  collectInputGaps,
  matchesIllustrativeAssumptions,
  sensitivityRange,
} from "./summary";
import type { DcfInputs } from "./types";

describe("input gaps", () => {
  it("the cleared form lists what is missing", () => {
    const labels = collectInputGaps(INITIAL_FORM).map((g) => g.label);
    expect(labels).toContain("Share price");
    expect(labels).toContain("Diluted shares outstanding");
    expect(labels).toContain("Other claims");
  });

  it("the example form has no gaps, and a typed 0 is not a gap", () => {
    expect(EXAMPLE_FORM.otherClaims).toBe("0");
    expect(collectInputGaps(EXAMPLE_FORM)).toEqual([]);
  });

  it("unreadable text is invalid, not missing", () => {
    const gaps = collectInputGaps({ ...EXAMPLE_FORM, eps: "abc" });
    expect(gaps).toEqual([{ label: "EPS", state: "invalid", neededFor: "P/E" }]);
  });

  it("a bad growth year is reported once as invalid", () => {
    const gaps = collectInputGaps({
      ...EXAMPLE_FORM,
      growthRates: ["8", "x", "8", "8", "8"],
    });
    expect(gaps).toEqual([
      { label: "Annual FCFF growth", state: "invalid", neededFor: "DCF, main model" },
    ]);
  });
});

describe("illustrative assumptions", () => {
  it("is true for the defaults and false once the user changes one", () => {
    expect(matchesIllustrativeAssumptions(INITIAL_FORM)).toBe(true);
    expect(matchesIllustrativeAssumptions({ ...INITIAL_FORM, discountRate: "11" })).toBe(false);
    expect(
      matchesIllustrativeAssumptions({
        ...INITIAL_FORM,
        growthRates: ["8", "8", "8", "8", "9"],
      }),
    ).toBe(false);
  });
});

describe("sensitivity range", () => {
  it("covers every calculated cell and contains the main model", () => {
    const build = buildSensitivity(EXAMPLE_FORM, DEFAULT_SENSITIVITY_SETTINGS);
    const range = sensitivityRange(build);
    expect(range).not.toBeNull();
    if (!range) return;

    expect(range.calculated).toBe(25);
    expect(range.total).toBe(25);
    expect(range.min).toBeLessThan(range.max);

    const main = calculateDcf(buildDcfInputs(EXAMPLE_FORM));
    if (main.status !== "ok") throw new Error("expected ok");
    expect(main.valuePerShare).toBeGreaterThanOrEqual(range.min);
    expect(main.valuePerShare).toBeLessThanOrEqual(range.max);
  });

  it("is null when no cell can be calculated or the table is unavailable", () => {
    expect(
      sensitivityRange(buildSensitivity(INITIAL_FORM, DEFAULT_SENSITIVITY_SETTINGS)),
    ).toBeNull();
    expect(
      sensitivityRange(
        buildSensitivity({ ...EXAMPLE_FORM, discountRate: "" }, DEFAULT_SENSITIVITY_SETTINGS),
      ),
    ).toBeNull();
  });
});

describe("numbers quoted in the lessons match the engine", () => {
  const reference: DcfInputs = {
    startingFcff: 100,
    forecastYears: 3,
    growthRates: [0.1, 0.1, 0.1],
    discountRate: 0.1,
    terminalGrowthRate: 0.02,
    cash: 100,
    debt: 300,
    otherClaims: 50,
    dilutedShares: 100,
  };

  it("P/E 20.0x and P/S 3.0x", () => {
    expect(calculatePe({ sharePrice: 30, eps: 1.5, epsPeriod: "ttm" }).value).toBeCloseTo(20, 10);
    const ps = calculatePs({
      sharePrice: 30,
      sharesOutstanding: 50,
      sharesMeasure: "diluted",
      revenue: 500,
      revenuePeriod: "fiscal-year",
    });
    expect(ps.marketCapitalization).toBeCloseTo(1500, 10);
    expect(ps.value).toBeCloseTo(3, 10);
  });

  it("discounting 110 for one year", () => {
    expect(110 / 1.1).toBeCloseTo(100, 10);
    expect(110 / 1.2).toBeCloseTo(91.67, 2);
  });

  it("DCF lesson: EV 1,575, terminal value about 81% of EV", () => {
    const r = calculateDcf(reference);
    if (r.status !== "ok") throw new Error("expected ok");
    expect(r.enterpriseValue).toBeCloseTo(1575, 6);
    expect(r.terminalValueShareOfEv).toBeCloseTo(0.81, 2);
  });

  it("sensitivity lesson: discount rate 11% gives EV of about 1,398", () => {
    const r = calculateDcf({ ...reference, discountRate: 0.11 });
    if (r.status !== "ok") throw new Error("expected ok");
    expect(r.enterpriseValue).toBeCloseTo(1397.6, 0);
    expect(1 - r.enterpriseValue / 1575).toBeCloseTo(0.11, 2);
  });

  it("margin of safety lesson: +25% and -25%", () => {
    expect(calculateMarginOfSafety(40, 30).marginOfSafetyPercent).toBeCloseTo(25, 10);
    expect(calculateMarginOfSafety(40, 50).marginOfSafetyPercent).toBeCloseTo(-25, 10);
  });
});