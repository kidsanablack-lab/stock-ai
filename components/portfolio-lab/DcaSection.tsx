"use client";

import { useMemo } from "react";
import {
  formatMoney,
  formatPercent,
  formatSignedMoney,
  formatSignedPercent,
} from "@/lib/portfolio-lab/currency";
import {
  calculateProjection,
  growthLabel,
  parseProjectionInputs,
  splitContribution,
  yearlyPoints,
} from "@/lib/portfolio-lab/projection";
import {
  defaultDcaFields,
  type DcaFields,
} from "@/lib/portfolio-lab/toolInputs";
import type { CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import AssumptionsList from "./AssumptionsList";
import NumberField from "./NumberField";
import ProjectionChart from "./ProjectionChart";
import "./portfolio-lab-tools.css";

type DcaSectionProps = {
  currency: CurrencyCode;
  summary: PortfolioSummary;
  /** The typed values. They live in PortfolioLab so Saved Plans can keep them. */
  fields: DcaFields;
  onFieldsChange: (fields: DcaFields) => void;
};

function yearsText(years: number): string {
  return `${years} ${years === 1 ? "year" : "years"}`;
}

function rowLabel(month: number): string {
  if (month === 0) return "Start";
  return month % 12 === 0 ? `Year ${month / 12}` : `Month ${month} (end)`;
}

export default function DcaSection({
  currency,
  summary,
  fields,
  onFieldsChange,
}: DcaSectionProps) {
  const setField = (key: keyof DcaFields) => (value: string) =>
    onFieldsChange({ ...fields, [key]: value });

  const parsed = useMemo(() => parseProjectionInputs(fields), [fields]);

  const outcome = useMemo(
    () => (parsed.input ? calculateProjection(parsed.input) : null),
    [parsed.input],
  );

  const result = outcome && outcome.ok ? outcome.result : null;
  const hasFieldErrors = Object.keys(parsed.errors).length > 0;

  const split = result
    ? splitContribution(
        summary.rows,
        summary.status,
        result.input.monthly,
        result.periods,
      )
    : null;

  return (
    <section
      id="dca-planner"
      className="pl-section pl-dca2"
      aria-labelledby="pl-dca-title"
    >
      <h2 id="pl-dca-title" className="pl-dca2-title">
        Plan regular monthly investing
      </h2>
      <p className="pl-dca2-lead">
        Dollar-cost averaging (DCA) means investing a fixed amount on a regular
        schedule instead of all at once. See how an initial amount plus monthly
        contributions could add up under an assumed return. It is an
        illustration, not a prediction.
      </p>

      {/* Inputs */}
      <div className="pl-dca2-panel">
        <h3 className="pl-dca2-h3">Your plan</h3>

        <div className="pl-dca2-fields">
          <NumberField
            id="dca-initial"
            label="Initial investment"
            value={fields.initial}
            onChange={setField("initial")}
            error={parsed.errors.initial}
            prefix={currency}
          />

          <NumberField
            id="dca-monthly"
            label="Monthly contribution"
            value={fields.monthly}
            onChange={setField("monthly")}
            error={parsed.errors.monthly}
            hint="Added at the end of every month."
            prefix={currency}
          />

          <NumberField
            id="dca-years"
            label="Investment duration"
            value={fields.years}
            onChange={setField("years")}
            error={parsed.errors.years}
            hint="Up to 60 years. Use 0.5 for six months."
            suffix="years"
          />

          <NumberField
            id="dca-return"
            label="Assumed annual return (optional)"
            value={fields.annualReturn}
            onChange={setField("annualReturn")}
            error={parsed.errors.annualReturn}
            hint={
              parsed.returnIsBlank && !parsed.errors.annualReturn
                ? "Blank, so 0% is used. Negative values such as -5 are allowed."
                : "An illustrative assumption, not a forecast. Between -50% and 50%."
            }
            suffix="% a year"
          />
        </div>

        <div className="pl-dca2-actions">
          {summary.investment > 0 && (
            <button
              type="button"
              className="pl-dca2-btn pl-dca2-btn-ghost"
              onClick={() => setField("initial")(String(summary.investment))}
            >
              <i className="ti ti-arrow-back-up" aria-hidden="true" />
              Use my builder amount ({formatMoney(summary.investment, currency)})
            </button>
          )}

          <button
            type="button"
            className="pl-dca2-btn pl-dca2-btn-quiet"
            onClick={() => onFieldsChange(defaultDcaFields())}
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

      {/* Results */}
      <div className="pl-dca2-results" aria-live="polite">
        {hasFieldErrors ? (
          <div className="pl-dca2-empty">
            <i className="ti ti-alert-circle" aria-hidden="true" />
            <p className="pl-dca2-empty-title">Check the highlighted fields</p>
            <p className="pl-dca2-empty-text">
              Results appear as soon as every field has a valid number.
            </p>
          </div>
        ) : outcome && !outcome.ok ? (
          <div className="pl-dca2-empty">
            <i className="ti ti-alert-triangle" aria-hidden="true" />
            <p className="pl-dca2-empty-title">This can&apos;t be calculated</p>
            <p className="pl-dca2-empty-text">{outcome.error}</p>
          </div>
        ) : result ? (
          <div className={`pl-dca2-hero${result.isLoss ? " is-loss" : ""}`}>
            <p className="pl-dca2-hero-label">Hypothetical future value</p>
            <p className="pl-dca2-hero-value">
              {formatMoney(result.futureValue, currency)}
            </p>
            <p className="pl-dca2-hero-growth">
              <strong>{growthLabel(result)}:</strong>{" "}
              {formatSignedMoney(result.growth, currency)}
              {result.growthPercent !== null && (
                <> ({formatSignedPercent(result.growthPercent)} of the money you put in)</>
              )}
            </p>
            <p className="pl-dca2-hero-sub">
              After {yearsText(result.input.years)} at an assumed{" "}
              {formatPercent(result.input.annualReturnPercent)} a year.
              Not a forecast.
            </p>

            <div className="pl-dca2-hero-stats">
              <div>
                <p className="pl-dca2-hero-stat-label">Initial investment</p>
                <p className="pl-dca2-hero-stat-value">
                  {formatMoney(result.initial, currency)}
                </p>
              </div>

              <div>
                <p className="pl-dca2-hero-stat-label">Additional contributions</p>
                <p className="pl-dca2-hero-stat-value">
                  {formatMoney(result.totalContributions, currency)}
                </p>
                <p className="pl-dca2-hero-stat-note">
                  {result.periods} × {formatMoney(result.input.monthly, currency)}
                </p>
              </div>

              <div>
                <p className="pl-dca2-hero-stat-label">Total contributed principal</p>
                <p className="pl-dca2-hero-stat-value">
                  {formatMoney(result.principal, currency)}
                </p>
                <p className="pl-dca2-hero-stat-note">What you put in</p>
              </div>
            </div>
          </div>
        ) : null}
      </div>

      {result && (
        <>
          <div className="pl-dca2-panel">
            <h3 className="pl-dca2-h3">Projection over time</h3>

            <ProjectionChart
              currency={currency}
              summary={`Projection over ${yearsText(result.input.years)}.`}
              series={[
                {
                  id: "principal",
                  label: "Contributed principal",
                  color: "#8691A2", // --color-chart-compare
                  dashed: true,
                  values: result.points.map((point) => point.principal),
                },
                {
                  id: "balance",
                  label: "Hypothetical value",
                  color: "#2563EB", // --color-primary
                  values: result.points.map((point) => point.balance),
                },
              ]}
            />

            <ul className="pl-dca2-legend" aria-label="Chart legend">
              <li>
                <span className="pl-dca2-line is-dashed" aria-hidden="true" />
                Contributed principal
                <strong>{formatMoney(result.principal, currency)}</strong>
              </li>
              <li>
                <span className="pl-dca2-line" aria-hidden="true" />
                Hypothetical value
                <strong>{formatMoney(result.futureValue, currency)}</strong>
              </li>
            </ul>

            <div
              className="pl-dca2-scroll"
              role="region"
              aria-label="Year-by-year projection table"
              tabIndex={0}
            >
              <table className="pl-dca2-table">
                <caption className="pl-sr-only">
                  Year-by-year hypothetical projection: money contributed,
                  hypothetical value, and the difference
                </caption>
                <thead>
                  <tr>
                    <th scope="col">When</th>
                    <th scope="col" className="pl-dca2-num">Contributed principal</th>
                    <th scope="col" className="pl-dca2-num">Hypothetical value</th>
                    <th scope="col" className="pl-dca2-num">Growth or loss</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyPoints(result).map((point) => (
                    <tr key={point.month}>
                      <th scope="row">{rowLabel(point.month)}</th>
                      <td className="pl-dca2-num">{formatMoney(point.principal, currency)}</td>
                      <td className="pl-dca2-num">{formatMoney(point.balance, currency)}</td>
                      <td className="pl-dca2-num">
                        {formatSignedMoney(point.balance - point.principal, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How each contribution would be split */}
          <div className="pl-dca2-panel">
            <h3 className="pl-dca2-h3">How each monthly contribution could be split</h3>

            {result.input.monthly <= 0 ? (
              <p className="pl-dca2-hint">
                Add a monthly contribution to see how it would be divided.
              </p>
            ) : summary.holdingCount === 0 ? (
              <p className="pl-dca2-hint">
                Build a portfolio above and the planner will show how each
                contribution would be divided across your holdings.
              </p>
            ) : split ? (
              <>
                <div className="pl-dca2-scroll" role="region" aria-label="Contribution split table" tabIndex={0}>
                  <table className="pl-dca2-table">
                    <caption className="pl-sr-only">
                      Contribution split by portfolio allocation
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Holding</th>
                        <th scope="col" className="pl-dca2-num">Allocation</th>
                        <th scope="col" className="pl-dca2-num">Each month</th>
                        <th scope="col" className="pl-dca2-num">Over the whole plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {split.map((row) => (
                        <tr key={row.id}>
                          <th scope="row">{row.name}</th>
                          <td className="pl-dca2-num">{formatPercent(row.percent)}</td>
                          <td className="pl-dca2-num">{formatMoney(row.monthlyAmount, currency)}</td>
                          <td className="pl-dca2-num">{formatMoney(row.totalAmount, currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pl-dca2-footnote">
                  The projection above uses one return for the whole plan. It
                  does not give each holding its own return.
                </p>
              </>
            ) : (
              <p className="pl-dca2-hint">
                Your portfolio is not fully allocated (it totals{" "}
                {formatPercent(summary.totalPercent)}), so a split would not add
                up to your contribution. Make the allocation exactly 100% in the
                builder to see it here.
              </p>
            )}
          </div>

          <AssumptionsList variant="dca" />
        </>
      )}
    </section>
  );
}