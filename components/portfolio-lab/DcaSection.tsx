"use client";

import { useMemo } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import DeltaPill, { directionOf } from "@/components/ui/DeltaPill";
import NoteBox from "@/components/ui/NoteBox";
import { HowToRead } from "@/components/ui/Notes";
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
import { defaultDcaFields, type DcaFields } from "@/lib/portfolio-lab/toolInputs";
import type { CurrencyCode, PortfolioSummary } from "@/lib/portfolio-lab/types";
import AssumptionsList from "./AssumptionsList";
import DataTable from "./DataTable";
import FactList from "./FactList";
import LeadPanel from "./LeadPanel";
import NumberField from "./NumberField";
import PlSection from "./PlSection";
import ProjectionChart, { LineSample } from "./ProjectionChart";

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
    ? splitContribution(summary.rows, summary.status, result.input.monthly, result.periods)
    : null;

  return (
    <PlSection
      id="dca-planner"
      titleId="pl-dca-title"
      title="Plan regular monthly investing"
      lead="Dollar-cost averaging (DCA) means investing a fixed amount on a regular schedule instead of all at once. See how an initial amount plus monthly contributions could add up under an assumed return. It is an illustration, not a prediction."
      labels={["hypothetical"]}
      source="Source: the amounts, years and assumed return you entered. No market data is used. Hypothetical example, not a forecast. The assumptions and the formula are listed above."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        {/* Inputs */}
        <Card>
          <h3 className="font-serif text-h4 font-normal text-ink">Your plan</h3>

          <div className="mt-5 grid gap-4">
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
                  ? "Blank, so 0% is used. Negative values such as −5 are allowed."
                  : "An illustrative assumption, not a forecast. Between −50% and 50%."
              }
              suffix="% a year"
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2">
            {summary.investment > 0 && (
              <Button
                variant="secondary"
                onClick={() => setField("initial")(String(summary.investment))}
              >
                <i className="ti ti-arrow-back-up" aria-hidden="true" />
                Use my builder amount ({formatMoney(summary.investment, currency)})
              </Button>
            )}

            <Button variant="quiet" onClick={() => onFieldsChange(defaultDcaFields())}>
              <i className="ti ti-restore" aria-hidden="true" />
              Reset these fields
            </Button>
          </div>

          <p className="mt-4 text-small text-ink-muted">
            Amounts use your display currency ({currency}). Nothing is converted.
          </p>
        </Card>

        {/* Results */}
        <div className="grid min-w-0 gap-4" aria-live="polite">
          {hasFieldErrors ? (
            <NoteBox tone="problem" title="Check the highlighted fields">
              <p>Results appear as soon as every field has a valid number.</p>
            </NoteBox>
          ) : outcome && !outcome.ok ? (
            <NoteBox tone="problem" title="This can’t be calculated">
              <p>{outcome.error}</p>
            </NoteBox>
          ) : result ? (
            <>
              <LeadPanel
                label="Hypothetical future value"
                value={formatMoney(result.futureValue, currency)}
              >
                <p className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold">{growthLabel(result)}:</span>
                  <DeltaPill
                    direction={directionOf(result.growth)}
                    text={formatSignedMoney(result.growth, currency)}
                  />
                  {result.growthPercent !== null && (
                    <span>{formatSignedPercent(result.growthPercent)} of the money you put in</span>
                  )}
                </p>
                <p>
                  After {yearsText(result.input.years)} at an assumed{" "}
                  {formatPercent(result.input.annualReturnPercent)} a year. Not a forecast.
                </p>
              </LeadPanel>

              <FactList
                facts={[
                  { label: "Initial investment", value: formatMoney(result.initial, currency) },
                  {
                    label: "Additional contributions",
                    value: formatMoney(result.totalContributions, currency),
                    note: `${result.periods} × ${formatMoney(result.input.monthly, currency)}`,
                  },
                  {
                    label: "Total contributed principal",
                    value: formatMoney(result.principal, currency),
                    note: "What you put in",
                  },
                ]}
              />
            </>
          ) : null}
        </div>
      </div>

      {result && (
        <>
          <Card>
            <h3 className="font-serif text-h3 font-normal text-ink">
              The hypothetical balance reaches {formatMoney(result.futureValue, currency)} after{" "}
              {yearsText(result.input.years)}
            </h3>
            <p className="mt-3 text-note text-ink-muted">
              The solid line is the hypothetical value. The dashed line is the money you put in.
            </p>

            <figure className="mt-5">
              <ProjectionChart
                currency={currency}
                summary={`Projection over ${yearsText(result.input.years)}.`}
                series={[
                  {
                    id: "principal",
                    label: "Contributed principal",
                    tone: "principal",
                    values: result.points.map((point) => point.principal),
                  },
                  {
                    id: "balance",
                    label: "Hypothetical value",
                    tone: "balance",
                    values: result.points.map((point) => point.balance),
                  },
                ]}
              />

              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2" aria-label="Chart legend">
                <li className="flex items-center gap-2 text-small text-ink">
                  <LineSample tone="principal" />
                  Contributed principal
                  <strong className="font-semibold tabular-nums">
                    {formatMoney(result.principal, currency)}
                  </strong>
                </li>
                <li className="flex items-center gap-2 text-small text-ink">
                  <LineSample tone="balance" />
                  Hypothetical value
                  <strong className="font-semibold tabular-nums">
                    {formatMoney(result.futureValue, currency)}
                  </strong>
                </li>
              </ul>

              <HowToRead>
                Each line shows the balance month by month, in {currency}. The table below lists
                the same values for every year.
              </HowToRead>
            </figure>

            <div className="mt-5">
              <DataTable
                caption="Year-by-year hypothetical projection: money contributed, hypothetical value, and the difference"
                regionLabel="Year-by-year projection table"
                firstColumn="When"
                columns={[
                  { label: "Contributed principal", numeric: true },
                  { label: "Hypothetical value", numeric: true },
                  { label: "Growth or loss", numeric: true },
                ]}
                rows={yearlyPoints(result).map((point) => {
                  const difference = point.balance - point.principal;

                  return {
                    id: point.month,
                    header: rowLabel(point.month),
                    cells: [
                      formatMoney(point.principal, currency),
                      formatMoney(point.balance, currency),
                      <DeltaPill
                        key="delta"
                        direction={directionOf(difference)}
                        text={formatSignedMoney(difference, currency)}
                      />,
                    ],
                  };
                })}
              />
            </div>
          </Card>

          {/* How each contribution would be split */}
          <Card>
            <h3 className="font-serif text-h3 font-normal text-ink">
              How each monthly contribution could be split
            </h3>

            <div className="mt-5">
              {result.input.monthly <= 0 ? (
                <p className="text-note text-ink-muted">
                  Not available. Add a monthly contribution to see how it would be divided.
                </p>
              ) : summary.holdingCount === 0 ? (
                <p className="text-note text-ink-muted">
                  Not available. Build a portfolio above and the planner will show how each
                  contribution would be divided across your holdings.
                </p>
              ) : split ? (
                <>
                  <DataTable
                    caption="Contribution split by portfolio allocation"
                    regionLabel="Contribution split table"
                    firstColumn="Holding"
                    columns={[
                      { label: "Allocation", numeric: true },
                      { label: "Each month", numeric: true },
                      { label: "Over the whole plan", numeric: true },
                    ]}
                    rows={split.map((row) => ({
                      id: row.id,
                      header: row.name,
                      cells: [
                        formatPercent(row.percent),
                        formatMoney(row.monthlyAmount, currency),
                        formatMoney(row.totalAmount, currency),
                      ],
                    }))}
                  />
                  <p className="mt-3 text-caption text-ink-muted">
                    The projection above uses one return for the whole plan. It does not give each
                    holding its own return.
                  </p>
                </>
              ) : (
                <NoteBox>
                  <p>
                    Your portfolio is not fully allocated (it totals{" "}
                    {formatPercent(summary.totalPercent)}), so a split would not add up to your
                    contribution. Make the allocation exactly 100% in the builder to see it here.
                  </p>
                </NoteBox>
              )}
            </div>
          </Card>

          <AssumptionsList variant="dca" />
        </>
      )}
    </PlSection>
  );
}
