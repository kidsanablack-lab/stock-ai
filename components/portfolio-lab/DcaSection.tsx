"use client";

import { useMemo, useState } from "react";
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
import type { CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import AssumptionsList from "./AssumptionsList";
import NumberField from "./NumberField";
import ProjectionChart from "./ProjectionChart";
import "./portfolio-lab-tools.css";

type DcaSectionProps = {
  currency: CurrencyCode;
  summary: PortfolioSummary;
};

const DEFAULT_FIELDS = {
  initial: "10000",
  monthly: "500",
  years: "10",
  annualReturn: "6",
};

function yearsText(years: number): string {
  return `${years} ${years === 1 ? "year" : "years"}`;
}

function rowLabel(month: number): string {
  if (month === 0) return "Start";
  return month % 12 === 0 ? `Year ${month / 12}` : `Month ${month} (end)`;
}

export default function DcaSection({ currency, summary }: DcaSectionProps) {
  const [fields, setFields] = useState(DEFAULT_FIELDS);

  const setField = (key: keyof typeof DEFAULT_FIELDS) => (value: string) =>
    setFields((current) => ({ ...current, [key]: value }));

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
      className="pl-section"
      aria-labelledby="pl-dca-title"
    >
      <p className="pl-eyebrow">DCA Planner</p>
      <h2 id="pl-dca-title" className="pl-h2">
        Plan regular monthly investing
      </h2>
      <p className="pl-lead">
        Dollar-cost averaging (DCA) means investing a fixed amount on a regular
        schedule instead of all at once. See how an initial amount plus monthly
        contributions could add up under an assumed return. It is an
        illustration, not a prediction.
      </p>

      <div className="pl-tool-grid">
        {/* Inputs */}
        <div className="pl-panel pl-tool-inputs">
          <h3 className="pl-h3">Your plan</h3>

          <div className="pl-fields">
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

          <div className="pl-tool-actions">
            {summary.investment > 0 && (
              <button
                type="button"
                className="pl-btn pl-btn-ghost"
                onClick={() => setField("initial")(String(summary.investment))}
              >
                <i className="ti ti-arrow-back-up" aria-hidden="true" />
                Use my builder amount ({formatMoney(summary.investment, currency)})
              </button>
            )}

            <button
              type="button"
              className="pl-btn pl-btn-quiet"
              onClick={() => setFields(DEFAULT_FIELDS)}
            >
              <i className="ti ti-restore" aria-hidden="true" />
              Reset these fields
            </button>
          </div>

          <p className="pl-hint">
            Amounts use your display currency ({currency}). Nothing is
            converted.
          </p>
        </div>

        {/* Results */}
        <div className="pl-tool-results" aria-live="polite">
          {hasFieldErrors ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-alert-circle" aria-hidden="true" />
              <p className="pl-empty-title">Check the highlighted fields</p>
              <p className="pl-empty-text">
                Results appear as soon as every field has a valid number.
              </p>
            </div>
          ) : outcome && !outcome.ok ? (
            <div className="pl-panel pl-empty">
              <i className="ti ti-alert-triangle" aria-hidden="true" />
              <p className="pl-empty-title">This can&apos;t be calculated</p>
              <p className="pl-empty-text">{outcome.error}</p>
            </div>
          ) : result ? (
            <>
              <div className={`pl-result-hero${result.isLoss ? " is-loss" : ""}`}>
                <p className="pl-card-label">Hypothetical future value</p>
                <p className="pl-result-value">
                  {formatMoney(result.futureValue, currency)}
                </p>
                <p className="pl-result-growth">
                  <strong>{growthLabel(result)}:</strong>{" "}
                  {formatSignedMoney(result.growth, currency)}
                  {result.growthPercent !== null && (
                    <> ({formatSignedPercent(result.growthPercent)} of the money you put in)</>
                  )}
                </p>
                <p className="pl-result-sub">
                  After {yearsText(result.input.years)} at an assumed{" "}
                  {formatPercent(result.input.annualReturnPercent)} a year.
                  Not a forecast.
                </p>
              </div>

              <div className="pl-mini-cards">
                <div className="pl-card">
                  <p className="pl-card-label">Initial investment</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatMoney(result.initial, currency)}
                  </p>
                </div>

                <div className="pl-card">
                  <p className="pl-card-label">Additional contributions</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatMoney(result.totalContributions, currency)}
                  </p>
                  <p className="pl-card-note">
                    {result.periods} × {formatMoney(result.input.monthly, currency)}
                  </p>
                </div>

                <div className="pl-card">
                  <p className="pl-card-label">Total contributed principal</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatMoney(result.principal, currency)}
                  </p>
                  <p className="pl-card-note">What you put in</p>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>

      {result && (
        <>
          <div className="pl-panel">
            <h3 className="pl-h3">Projection over time</h3>

            <ProjectionChart
              currency={currency}
              summary={`Projection over ${yearsText(result.input.years)}.`}
              series={[
                {
                  id: "principal",
                  label: "Contributed principal",
                  color: "#8a8a86",
                  dashed: true,
                  values: result.points.map((point) => point.principal),
                },
                {
                  id: "balance",
                  label: "Hypothetical value",
                  color: "#2f5233",
                  values: result.points.map((point) => point.balance),
                },
              ]}
            />

            <ul className="pl-chart-legend" aria-label="Chart legend">
              <li>
                <span className="pl-line is-dashed" aria-hidden="true" />
                Contributed principal
                <strong>{formatMoney(result.principal, currency)}</strong>
              </li>
              <li>
                <span className="pl-line" aria-hidden="true" />
                Hypothetical value
                <strong>{formatMoney(result.futureValue, currency)}</strong>
              </li>
            </ul>

            <div
              className="pl-scroll"
              role="region"
              aria-label="Year-by-year projection table"
              tabIndex={0}
            >
              <table className="pl-table pl-proj-table">
                <caption className="pl-sr-only">
                  Year-by-year hypothetical projection: money contributed,
                  hypothetical value, and the difference
                </caption>
                <thead>
                  <tr>
                    <th scope="col">When</th>
                    <th scope="col" className="pl-num">Contributed principal</th>
                    <th scope="col" className="pl-num">Hypothetical value</th>
                    <th scope="col" className="pl-num">Growth or loss</th>
                  </tr>
                </thead>
                <tbody>
                  {yearlyPoints(result).map((point) => (
                    <tr key={point.month}>
                      <th scope="row">{rowLabel(point.month)}</th>
                      <td className="pl-num">{formatMoney(point.principal, currency)}</td>
                      <td className="pl-num">{formatMoney(point.balance, currency)}</td>
                      <td className="pl-num">
                        {formatSignedMoney(point.balance - point.principal, currency)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* How each contribution would be split */}
          <div className="pl-panel">
            <h3 className="pl-h3">How each monthly contribution could be split</h3>

            {result.input.monthly <= 0 ? (
              <p className="pl-hint">
                Add a monthly contribution to see how it would be divided.
              </p>
            ) : summary.holdingCount === 0 ? (
              <p className="pl-hint">
                Build a portfolio above and the planner will show how each
                contribution would be divided across your holdings.
              </p>
            ) : split ? (
              <>
                <div className="pl-scroll" role="region" aria-label="Contribution split table" tabIndex={0}>
                  <table className="pl-table pl-proj-table">
                    <caption className="pl-sr-only">
                      Contribution split by portfolio allocation
                    </caption>
                    <thead>
                      <tr>
                        <th scope="col">Holding</th>
                        <th scope="col" className="pl-num">Allocation</th>
                        <th scope="col" className="pl-num">Each month</th>
                        <th scope="col" className="pl-num">Over the whole plan</th>
                      </tr>
                    </thead>
                    <tbody>
                      {split.map((row) => (
                        <tr key={row.id}>
                          <th scope="row">{row.name}</th>
                          <td className="pl-num">{formatPercent(row.percent)}</td>
                          <td className="pl-num">{formatMoney(row.monthlyAmount, currency)}</td>
                          <td className="pl-num">{formatMoney(row.totalAmount, currency)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p className="pl-footnote">
                  The projection above uses one return for the whole plan. It
                  does not give each holding its own return.
                </p>
              </>
            ) : (
              <p className="pl-hint">
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
