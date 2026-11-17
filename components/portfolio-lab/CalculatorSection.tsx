"use client";

import { useMemo } from "react";
import {
  formatMoney,
  formatPercent,
  formatSignedMoney,
  formatSignedPercent,
} from "@/lib/portfolio-lab/currency";
import {
  MAX_ANNUAL_RETURN,
  MIN_ANNUAL_RETURN,
  compareAnnualReturns,
  growthLabel,
  parseProjectionInputs,
  parseSignedDecimalInput,
  yearlyPoints,
  type ProjectionOutcome,
} from "@/lib/portfolio-lab/projection";
import {
  defaultCalculatorInputs,
  type CalculatorFields,
  type CalculatorInputs,
  type CalculatorMode,
} from "@/lib/portfolio-lab/toolInputs";
import type { CurrencyCode } from "@/lib/portfolio-lab/types";
import AssumptionsList from "./AssumptionsList";
import NumberField from "./NumberField";
import ProjectionChart from "./ProjectionChart";
import "./portfolio-lab-tools.css";

type CalculatorSectionProps = {
  currency: CurrencyCode;
  /** The typed values. They live in PortfolioLab so Saved Plans can keep them. */
  inputs: CalculatorInputs;
  onInputsChange: (inputs: CalculatorInputs) => void;
};

// One color per scenario. The legend also shows the values, so color is
// never the only way to tell the lines apart.
const SCENARIO_COLORS = ["#2563EB", "#7C3AED", "#0E7490"]; // --cat-1, --cat-2, --cat-3

function rowLabel(month: number): string {
  if (month === 0) return "Start";
  return month % 12 === 0 ? `Year ${month / 12}` : `Month ${month} (end)`;
}

export default function CalculatorSection({
  currency,
  inputs,
  onInputsChange,
}: CalculatorSectionProps) {
  const { mode, fields, rates } = inputs;

  const setMode = (next: CalculatorMode) => onInputsChange({ ...inputs, mode: next });

  const setField = (key: keyof CalculatorFields) => (value: string) =>
    onInputsChange({ ...inputs, fields: { ...fields, [key]: value } });

  const setRate = (index: number) => (value: string) =>
    onInputsChange({
      ...inputs,
      rates: rates.map((rate, i) => (i === index ? value : rate)),
    });

  // Everything except the return, parsed with the same rules as the DCA planner.
  const base = useMemo(
    () =>
      parseProjectionInputs({
        initial: fields.initial,
        monthly: mode === "monthly" ? fields.monthly : "0",
        years: fields.years,
        annualReturn: "0",
      }),
    [fields, mode],
  );

  const parsedRates = useMemo(
    () =>
      rates.map((raw, index) => {
        const parsed = parseSignedDecimalInput(raw, {
          min: MIN_ANNUAL_RETURN,
          max: MAX_ANNUAL_RETURN,
          label: `Return ${index + 1}`,
        });

        return {
          value: parsed.value,
          error: parsed.isEmpty ? "Enter a rate. Use 0 for no growth." : parsed.error,
        };
      }),
    [rates],
  );

  const ratesValid = parsedRates.every((rate) => !rate.error);

  const scenarios = useMemo(() => {
    if (!base.input || !ratesValid) return null;

    return compareAnnualReturns(
      {
        initial: base.input.initial,
        monthly: base.input.monthly,
        years: base.input.years,
      },
      parsedRates.map((rate) => rate.value),
    );
  }, [base.input, parsedRates, ratesValid]);

  const baseHasErrors = Object.keys(base.errors).some(
    (key) => key !== "annualReturn",
  );

  const firstFailure = scenarios?.find(
    (scenario): scenario is { rate: number; outcome: Extract<ProjectionOutcome, { ok: false }> } =>
      !scenario.outcome.ok,
  );

  const okScenarios =
    scenarios && !firstFailure
      ? scenarios.map((scenario) => ({
          rate: scenario.rate,
          result: (scenario.outcome as Extract<ProjectionOutcome, { ok: true }>).result,
        }))
      : null;

  const lead = okScenarios?.[0]?.result;

  const yearsWord = (years: number) => (years === 1 ? "year" : "years");

  return (
    <section
      id="investment-calculator"
      className="pl-section pl-dca2"
      aria-labelledby="pl-calc-title"
    >
      <h2 id="pl-calc-title" className="pl-dca2-title">
        Compare illustrative return assumptions
      </h2>
      <p className="pl-dca2-lead">
        Try a one-time investment or regular monthly contributions, and compare
        three assumed yearly returns side by side. The rates are examples you
        can edit. They are not forecasts, and nobody can promise a return.
      </p>

      <div className="pl-dca2-panel">
        <h3 className="pl-dca2-h3">Your plan</h3>

        <fieldset className="pl-calc2-mode">
          <legend>Calculator mode</legend>

          <div className="pl-calc2-seg-group">
            {(
              [
                ["lump", "Lump sum", "Invest once and leave it"],
                ["monthly", "Monthly contributions", "Add the same amount monthly"],
              ] as const
            ).map(([value, title, note]) => (
              <label key={value} className="pl-calc2-seg">
                <input
                  type="radio"
                  name="pl-calc-mode"
                  value={value}
                  checked={mode === value}
                  onChange={() => setMode(value)}
                />
                <span>
                  {title}
                  <small>{note}</small>
                </span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="pl-dca2-fields">
          <NumberField
            id="calc-initial"
            label="Initial investment"
            value={fields.initial}
            onChange={setField("initial")}
            error={base.errors.initial}
            prefix={currency}
          />

          {mode === "monthly" && (
            <NumberField
              id="calc-monthly"
              label="Monthly contribution"
              value={fields.monthly}
              onChange={setField("monthly")}
              error={base.errors.monthly}
              hint="Added at the end of every month."
              prefix={currency}
            />
          )}

          <NumberField
            id="calc-years"
            label="Investment duration"
            value={fields.years}
            onChange={setField("years")}
            error={base.errors.years}
            hint="Up to 60 years."
            suffix="years"
          />
        </div>

        <fieldset className="pl-calc2-rates">
          <legend>Assumed annual returns to compare</legend>

          <div className="pl-calc2-rate-grid">
            {rates.map((rate, index) => (
              <NumberField
                key={index}
                id={`calc-rate-${index}`}
                label={`Scenario ${index + 1}`}
                value={rate}
                onChange={setRate(index)}
                error={parsedRates[index].error}
                suffix="%"
              />
            ))}
          </div>

          <p className="pl-dca2-hint">
            Illustrative only. You can use negative numbers such as -5, from -50
            to 50.
          </p>
        </fieldset>

        <div className="pl-dca2-actions pl-calc2-actions">
          <button
            type="button"
            className="pl-dca2-btn pl-dca2-btn-quiet"
            onClick={() => {
              // Resets the numbers only. The chosen mode is kept, as before.
              onInputsChange({ ...defaultCalculatorInputs(), mode });
            }}
          >
            <i className="ti ti-restore" aria-hidden="true" />
            Reset these fields
          </button>
        </div>

        <p className="pl-dca2-hint">
          Amounts use your display currency ({currency}). Nothing is
          converted.
        </p>
      </div>

      <div className="pl-dca2-results" aria-live="polite">
        {baseHasErrors || !ratesValid ? (
          <div className="pl-dca2-empty">
            <i className="ti ti-alert-circle" aria-hidden="true" />
            <p className="pl-dca2-empty-title">Check the highlighted fields</p>
            <p className="pl-dca2-empty-text">
              Results appear as soon as every field has a valid number.
            </p>
          </div>
        ) : firstFailure ? (
          <div className="pl-dca2-empty">
            <i className="ti ti-alert-triangle" aria-hidden="true" />
            <p className="pl-dca2-empty-title">This can&apos;t be calculated</p>
            <p className="pl-dca2-empty-text">{firstFailure.outcome.error}</p>
          </div>
        ) : okScenarios && lead ? (
          <div className="pl-dca2-hero">
            <p className="pl-dca2-hero-label">
              {mode === "lump" ? "Your investment" : "What you would put in"}
            </p>
            <p className="pl-dca2-hero-value">
              {formatMoney(lead.principal, currency)}
            </p>
            <p className="pl-dca2-hero-sub">
              {mode === "lump"
                ? `A single amount, left for ${lead.input.years} ${yearsWord(lead.input.years)}.`
                : `${formatMoney(lead.initial, currency)} at the start plus ${lead.periods} × ${formatMoney(lead.input.monthly, currency)} (${formatMoney(lead.totalContributions, currency)}) over ${lead.input.years} ${yearsWord(lead.input.years)}.`}
            </p>

            <div className="pl-dca2-hero-stats pl-calc2-stats">
              {okScenarios.map(({ rate, result }, index) => (
                <div
                  key={index}
                  className={`pl-calc2-stat${result.isLoss ? " is-loss" : ""}`}
                >
                  <p className="pl-dca2-hero-stat-label">
                    <span
                      className="pl-calc2-dot"
                      style={{ background: SCENARIO_COLORS[index] }}
                      aria-hidden="true"
                    />
                    Assumed {formatPercent(rate)} a year
                  </p>
                  <p className="pl-dca2-hero-stat-value">
                    {formatMoney(result.futureValue, currency)}
                  </p>
                  <p className="pl-dca2-hero-stat-note">
                    {growthLabel(result)}: {formatSignedMoney(result.growth, currency)}
                    {result.growthPercent !== null &&
                      ` (${formatSignedPercent(result.growthPercent)})`}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      {okScenarios && lead && (
        <>
          <div className="pl-dca2-panel">
            <h3 className="pl-dca2-h3">Projection over time</h3>

            <ProjectionChart
              currency={currency}
              summary={`Projection over ${lead.input.years} ${yearsWord(lead.input.years)} for three assumed returns.`}
              series={[
                {
                  id: "principal",
                  label: "Contributed principal",
                  color: "#8691A2", // --color-chart-compare
                  dashed: true,
                  values: lead.points.map((point) => point.principal),
                },
                ...okScenarios.map(({ rate, result }, index) => ({
                  id: `rate-${index}`,
                  label: `Assumed ${formatPercent(rate)} a year`,
                  color: SCENARIO_COLORS[index],
                  values: result.points.map((point) => point.balance),
                })),
              ]}
            />

            <ul className="pl-dca2-legend" aria-label="Chart legend">
              <li>
                <span className="pl-dca2-line is-dashed" aria-hidden="true" />
                Contributed principal
                <strong>{formatMoney(lead.principal, currency)}</strong>
              </li>

              {okScenarios.map(({ rate, result }, index) => (
                <li key={index}>
                  <span
                    className="pl-dca2-line"
                    style={{ background: SCENARIO_COLORS[index] }}
                    aria-hidden="true"
                  />
                  Assumed {formatPercent(rate)} a year
                  <strong>{formatMoney(result.futureValue, currency)}</strong>
                </li>
              ))}
            </ul>

            <div
              className="pl-dca2-scroll"
              role="region"
              aria-label="Year-by-year comparison table"
              tabIndex={0}
            >
              <table className="pl-dca2-table">
                <caption className="pl-sr-only">
                  Year-by-year hypothetical value for each assumed return
                </caption>
                <thead>
                  <tr>
                    <th scope="col">When</th>
                    <th scope="col" className="pl-dca2-num">Contributed principal</th>
                    {okScenarios.map(({ rate }, index) => (
                      <th key={index} scope="col" className="pl-dca2-num">
                        At {formatPercent(rate)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {yearlyPoints(lead).map((point) => (
                    <tr key={point.month}>
                      <th scope="row">{rowLabel(point.month)}</th>
                      <td className="pl-dca2-num">{formatMoney(point.principal, currency)}</td>
                      {okScenarios.map(({ result }, index) => (
                        <td key={index} className="pl-dca2-num">
                          {formatMoney(result.points[point.month].balance, currency)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <AssumptionsList variant={mode} />
        </>
      )}
    </section>
  );
}