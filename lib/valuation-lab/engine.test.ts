import { describe, expect, it } from "vitest";
import {
  buildAxis,
  calculateDcf,
  calculateMarginOfSafety,
  calculatePe,
  calculatePs,
  calculateSensitivity,
  evaluateScenario,
  evaluateScenarios,
  parseNumericInput,
  toEngineValue,
  type DcfInputs,
  type DcfSuccess,
} from "./index";

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

function ok(inputs: DcfInputs): DcfSuccess {
  const r = calculateDcf(inputs);
  if (r.status !== "ok") throw new Error(`expected ok, got ${r.status}`);
  return r;
}

describe("input parsing", () => {
  it("distinguishes missing, invalid and valid", () => {
    expect(parseNumericInput("  ").status).toBe("missing");
    expect(parseNumericInput("abc").status).toBe("invalid");
    expect(parseNumericInput("1,234.5")).toEqual({ status: "valid", value: 1234.5 });
    expect(toEngineValue({ status: "missing" })).toBeNull();
    expect(Number.isNaN(toEngineValue({ status: "invalid", raw: "x" }))).toBe(true);
  });
});

describe("P/E", () => {
  it("calculates 150 / 6 = 25", () => {
    const r = calculatePe({ sharePrice: 150, eps: 6, epsPeriod: "ttm" });
    expect(r.status).toBe("ok");
    expect(r.value).toBeCloseTo(25, 10);
    expect(r.epsPeriod).toBe("ttm");
  });
  it("zero EPS is undefined", () => {
    const r = calculatePe({ sharePrice: 150, eps: 0, epsPeriod: "ttm" });
    expect(r.status).toBe("undefined_result");
    expect(r.value).toBeNull();
  });
  it("negative EPS is not meaningful", () => {
    const r = calculatePe({ sharePrice: 150, eps: -2, epsPeriod: "ttm" });
    expect(r.status).toBe("not_meaningful");
    expect(r.value).toBeNull();
  });
  it("missing EPS is missing, not zero", () => {
    const r = calculatePe({ sharePrice: 150, eps: null, epsPeriod: "ttm" });
    expect(r.status).toBe("missing_input");
  });
  it("typed garbage (NaN) is invalid, not missing", () => {
    const r = calculatePe({ sharePrice: 150, eps: Number.NaN, epsPeriod: "ttm" });
    expect(r.status).toBe("invalid_input");
  });
  it("rejects currency mismatch", () => {
    const r = calculatePe({ sharePrice: 150, eps: 6, epsPeriod: "ttm", priceCurrency: "USD", epsCurrency: "THB" });
    expect(r.status).toBe("invalid_input");
  });
});

describe("P/S", () => {
  const base = { sharePrice: 20, sharesOutstanding: 50, sharesMeasure: "diluted" as const, revenue: 500, revenuePeriod: "fiscal-year" as const };
  it("market cap 1000 / revenue 500 = 2", () => {
    const r = calculatePs(base);
    expect(r.status).toBe("ok");
    expect(r.marketCapitalization).toBeCloseTo(1000, 10);
    expect(r.value).toBeCloseTo(2, 10);
    expect(r.sharesMeasure).toBe("diluted");
  });
  it("zero revenue is undefined", () => {
    expect(calculatePs({ ...base, revenue: 0 }).status).toBe("undefined_result");
  });
  it("negative revenue is invalid", () => {
    expect(calculatePs({ ...base, revenue: -5 }).status).toBe("invalid_input");
  });
  it("missing shares is missing", () => {
    expect(calculatePs({ ...base, sharesOutstanding: null }).status).toBe("missing_input");
  });
});

describe("DCF hand-calculated reference", () => {
  const r = ok(reference);
  it("forecast FCF and PV by year", () => {
    expect(r.forecast.map((f) => f.fcff)).toEqual([
      expect.closeTo(110, 9),
      expect.closeTo(121, 9),
      expect.closeTo(133.1, 9),
    ]);
    r.forecast.forEach((f) => expect(f.presentValue).toBeCloseTo(100, 9));
    expect(r.sumPvForecastFcff).toBeCloseTo(300, 9);
  });
  it("terminal value, PV, EV, equity, per share", () => {
    expect(r.terminalValue).toBeCloseTo(1697.025, 6);
    expect(r.pvTerminalValue).toBeCloseTo(1275, 6);
    expect(r.enterpriseValue).toBeCloseTo(1575, 6);
    expect(r.equityValue).toBeCloseTo(1325, 6);
    expect(r.valuePerShare).toBeCloseTo(13.25, 8);
    expect(r.terminalValueShareOfEv).toBeCloseTo(1275 / 1575, 8);
  });
  it("does not mutate the input", () => {
    expect(reference.growthRates).toEqual([0.1, 0.1, 0.1]);
  });
});

describe("DCF second hand case (perpetuity)", () => {
  it("FCF 100, 1 yr, no growth, r=10%, g=0 -> EV 1000, 100 per share", () => {
    const r = ok({
      startingFcff: 100, forecastYears: 1, growthRates: [0],
      discountRate: 0.1, terminalGrowthRate: 0,
      cash: 0, debt: 0, otherClaims: 0, dilutedShares: 10,
    });
    expect(r.enterpriseValue).toBeCloseTo(1000, 8);
    expect(r.valuePerShare).toBeCloseTo(100, 8);
  });
});

describe("DCF validation and edge cases", () => {
  it("rate equal to terminal growth is undefined", () => {
    const r = calculateDcf({ ...reference, discountRate: 0.02 });
    expect(r.status).toBe("undefined_result");
  });
  it("rate below terminal growth is invalid", () => {
    const r = calculateDcf({ ...reference, discountRate: 0.01 });
    expect(r.status).toBe("invalid_input");
  });
  it("zero or negative shares are invalid", () => {
    expect(calculateDcf({ ...reference, dilutedShares: 0 }).status).toBe("invalid_input");
    expect(calculateDcf({ ...reference, dilutedShares: -1 }).status).toBe("invalid_input");
  });
  it("missing inputs are reported, never zeroed", () => {
    const r = calculateDcf({ ...reference, cash: null });
    expect(r.status).toBe("missing_input");
    if (r.status !== "ok") expect(r.issues.some((i) => i.field === "cash")).toBe(true);
  });
  it("wrong number of growth rates is invalid", () => {
    expect(calculateDcf({ ...reference, growthRates: [0.1] }).status).toBe("invalid_input");
  });
  it("growth at or below -100% is invalid", () => {
    expect(calculateDcf({ ...reference, growthRates: [0.1, -1, 0.1] }).status).toBe("invalid_input");
  });
  it("negative FCF is computed and warned, not hidden", () => {
    const r = ok({ ...reference, startingFcff: -100 });
    expect(r.terminalValue).toBeLessThan(0);
    const codes = r.warnings.map((w) => w.code);
    expect(codes).toContain("fcff_negative");
    expect(codes).toContain("terminal_value_negative");
  });
  it("zero FCF gives zero EV with a warning", () => {
    const r = ok({ ...reference, startingFcff: 0 });
    expect(r.enterpriseValue).toBe(0);
    expect(r.terminalValueShareOfEv).toBeNull();
    expect(r.warnings.map((w) => w.code)).toContain("fcff_zero");
  });
  it("negative equity value is allowed with a warning", () => {
    const r = ok({ ...reference, debt: 5000 });
    expect(r.equityValue).toBeLessThan(0);
    expect(r.warnings.map((w) => w.code)).toContain("equity_negative");
  });
  it("detects overflow instead of returning Infinity", () => {
    const r = calculateDcf({ ...reference, startingFcff: 1e308, growthRates: [1, 1, 1] });
    expect(r.status).toBe("undefined_result");
  });
  it("NaN input is invalid", () => {
    expect(calculateDcf({ ...reference, discountRate: Number.NaN }).status).toBe("invalid_input");
  });
});

describe("scenarios", () => {
  const { growthRates, discountRate, terminalGrowthRate, ...base } = reference;
  const scenarios = {
    bear: { growthRates: [0.02, 0.02, 0.02], discountRate: 0.12, terminalGrowthRate: 0.01 },
    base: { growthRates, discountRate, terminalGrowthRate },
    bull: { growthRates: [0.15, 0.15, 0.15], discountRate: 0.09, terminalGrowthRate: 0.03 },
  };
  it("base scenario equals the main DCF", () => {
    const set = evaluateScenarios(base, scenarios);
    expect((set.base.result as DcfSuccess).valuePerShare).toBeCloseTo(13.25, 8);
  });
  it("each scenario matches the shared engine and uses its own assumptions", () => {
    const set = evaluateScenarios(base, scenarios);
    for (const name of ["bear", "base", "bull"] as const) {
      const direct = calculateDcf({ ...base, ...scenarios[name] });
      expect(set[name].result).toEqual(direct);
    }
    const bear = set.bear.result as DcfSuccess;
    const bull = set.bull.result as DcfSuccess;
    expect(bull.valuePerShare).toBeGreaterThan(bear.valuePerShare);
  });
  it("an incomplete scenario fails alone", () => {
    const set = evaluateScenarios(base, { ...scenarios, bull: { ...scenarios.bull, discountRate: null } });
    expect(set.bull.result.status).toBe("missing_input");
    expect(set.base.result.status).toBe("ok");
  });
  it("evaluateScenario does not touch the base inputs", () => {
    evaluateScenario(base, scenarios.bear);
    expect(base.cash).toBe(100);
  });
});

describe("sensitivity", () => {
  it("builds a centered axis", () => {
    expect(buildAxis(0.1, 0.01, 3)).toEqual([0.09, 0.1, 0.11]);
    expect(buildAxis(0.1, 0, 3)).toEqual([]);
    expect(buildAxis(0.1, 0.01, 50)).toEqual([]);
  });
  it("center cell equals the main model", () => {
    const t = calculateSensitivity(reference, [0.09, 0.1, 0.11], [0.01, 0.02, 0.03]);
    expect(t.cells[1][1].valuePerShare).toBeCloseTo(13.25, 8);
  });
  it("every valid cell equals an independent DCF run", () => {
    const rates = [0.08, 0.1, 0.12];
    const growths = [0.01, 0.02, 0.03];
    const t = calculateSensitivity(reference, rates, growths);
    rates.forEach((r, i) =>
      growths.forEach((g, j) => {
        const direct = ok({ ...reference, discountRate: r, terminalGrowthRate: g });
        expect(t.cells[i][j].valuePerShare).toBeCloseTo(direct.valuePerShare, 10);
      }),
    );
  });
  it("invalid combinations are not calculated", () => {
    const t = calculateSensitivity(reference, [0.02, 0.03], [0.02, 0.03]);
    expect(t.cells[0][0].status).toBe("unavailable"); // r = g
    expect(t.cells[0][0].result).toBeNull();
    expect(t.cells[0][1].status).toBe("unavailable"); // r < g
    expect(t.cells[1][0].status).toBe("ok");
  });
  it("leaves the main assumptions unchanged", () => {
    calculateSensitivity(reference, [0.09, 0.11], [0.01, 0.03]);
    expect(reference.discountRate).toBe(0.1);
    expect(reference.terminalGrowthRate).toBe(0.02);
  });
});

describe("margin of safety", () => {
  it("positive: (13.25 - 10) / 13.25 = 24.5283%", () => {
    const r = calculateMarginOfSafety(13.25, 10);
    expect(r.status).toBe("ok");
    expect(r.marginOfSafetyPercent).toBeCloseTo(24.528301886, 6);
    expect(r.absoluteDifference).toBeCloseTo(3.25, 10);
  });
  it("zero when price equals value", () => {
    expect(calculateMarginOfSafety(13.25, 13.25).marginOfSafetyPercent).toBe(0);
  });
  it("negative when price exceeds value: -13.2075%", () => {
    expect(calculateMarginOfSafety(13.25, 15).marginOfSafetyPercent).toBeCloseTo(-13.207547, 5);
  });
  it("zero estimated value is undefined", () => {
    expect(calculateMarginOfSafety(0, 10).status).toBe("undefined_result");
  });
  it("negative estimated value is not meaningful (no misleading positive %)", () => {
    const r = calculateMarginOfSafety(-10, 5);
    expect(r.status).toBe("not_meaningful");
    expect(r.marginOfSafetyPercent).toBeNull();
  });
  it("missing or zero price is not calculated", () => {
    expect(calculateMarginOfSafety(13.25, null).status).toBe("missing_input");
    expect(calculateMarginOfSafety(13.25, 0).status).toBe("invalid_input");
    expect(calculateMarginOfSafety(null, 10).status).toBe("missing_input");
  });
});