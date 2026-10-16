import { describe, expect, it } from "vitest";
import { calculateDcf } from "./dcf";
import {
  buildDcfInputs,
  EXAMPLE_FORM,
  INITIAL_FORM,
  readNumber,
  readPercent,
} from "./form";

describe("form conversion", () => {
  it("blank is null, unreadable text is NaN, zero stays zero", () => {
    expect(readNumber("")).toBeNull();
    expect(readNumber("   ")).toBeNull();
    expect(Number.isNaN(readNumber("abc"))).toBe(true);
    expect(readNumber("0")).toBe(0);
    expect(readNumber("1,250.5")).toBe(1250.5);
  });

  it("converts percent text to a decimal", () => {
    expect(readPercent("8")).toBeCloseTo(0.08, 12);
    expect(readPercent("2.5")).toBeCloseTo(0.025, 12);
    expect(readPercent("")).toBeNull();
    expect(Number.isNaN(readPercent("x"))).toBe(true);
  });

  it("the cleared form leaves the DCF waiting for inputs", () => {
    const result = calculateDcf(buildDcfInputs(INITIAL_FORM));
    expect(result.status).toBe("missing_input");
  });

  it("the example form gives one growth rate per year and a DCF near 34 per share", () => {
    const inputs = buildDcfInputs(EXAMPLE_FORM);
    expect(inputs.growthRates).toHaveLength(5);
    const result = calculateDcf(inputs);
    expect(result.status).toBe("ok");
    if (result.status === "ok") {
      // Hand-calculated: EV about 1720.2, equity about 1700.2, / 50 shares.
      expect(Math.abs(result.valuePerShare - 34)).toBeLessThan(0.1);
    }
  });
});