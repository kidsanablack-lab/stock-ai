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
import DataTable from "./DataTable";
import FactList from "./FactList";
import LeadPanel from "./LeadPanel";
import NumberField from "./NumberField";
import PlSection from "./PlSection";
import ProjectionChart, { LineSample, type LineTone } from "./ProjectionChart";
import Segmented from "./Segmented";

type CalculatorSectionProps = {
  currency: CurrencyCode;
  /** The typed values. They live in PortfolioLab so Saved Plans can keep them. */
  inputs: CalculatorInputs;
  onInputsChange: (inputs: CalculatorInputs) => void;
};

// Scenarios differ by color, dash pattern and number, never by color alone.
const SCENARIO_TONES: LineTone[] = ["s1", "s2", "s3"];

function yearsText(years: number): string {
  return `${years} ${years === 1 ? "year" : "years"}`;
}

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

  const baseHasErrors = Object.keys(base.errors).some((key) => key !== "annualReturn");

  const firstFailure = scenarios?.find(
    (
      scenario,
    ): scenario is { rate: number; outcome: Extract<ProjectionOutcome, { ok: false }> } =>
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

  const finalValues = okScenarios?.map(({ result }) => result.futureValue) ?? [];
  const lowest = finalValues.length ? Math.min(...finalValues) : 0;
  const highest = finalValues.length ? Math.max(...finalValues) : 0;

  return (
    <PlSection
      id="investment-calculator"
      titleId="pl-calc-title"
      title="Compare illustrative return assumptions"
      lead="Try a one-time investment or regular monthly contributions, and compare three assumed yearly returns side by side. The rates are examples you can edit. They are not forecasts, and nobody can promise a return."
      labels={["hypothetical"]}
      source="Source: the amounts, years and three assumed returns you entered. No market data is used. Hypothetical example, not a forecast. The assumptions and the formula are listed above."
    >
      <div className="grid gap-4 lg:grid-cols-2 lg:items-start">
        <Card>
          <Segmented
            legend="Calculator mode"
            name="pl-calc-mode"
            columns={2}
            value={mode}
            onChange={setMode}
            options={[
              { value: "lump", title: "Lump sum", note: "Invest once and leave it" },
              {
                value: "monthly",
                title: "Monthly contributions",
                note: "Add the same amount monthly",
              },
            ]}
          />

          <div className="mt-5 grid gap-4">
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

          <fieldset className="mt-5 min-w-0">
            <legend className="mb-2 p-0 text-small font-semibold text-ink">
              Assumed annual returns to compare
            </legend>

            <div className="grid gap-4 sm:grid-cols-3">
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

            <p className="mt-2 text-small text-ink-muted">
              Illustrative only. You can use negative numbers such as −5, from −50 to 50.
            </p>
          </fieldset>

          <div className="mt-5">
            <Button
              variant="quiet"
              onClick={() => {
                // Resets the numbers only. The chosen mode is kept.
                onInputsChange({ ...defaultCalculatorInputs(), mode });
              }}
            >
              <i className="ti ti-restore" aria-hidden="true" />
              Reset these fields
            </Button>
          </div>

          <p className="mt-4 text-small text-ink-muted">
            Amounts use your display currency ({currency}). Nothing is converted.
          </p>
        </Card>

        <div className="grid min-w-0 gap-4" aria-live="polite">
          {baseHasErrors || !ratesValid ? (
            <NoteBox tone="problem" title="Check the highlighted fields">
              <p>Results appear as soon as every field has a valid number.</p>
            </NoteBox>
          ) : firstFailure ? (
            <NoteBox tone="problem" title="This can’t be calculated">
              <p>{firstFailure.outcome.error}</p>
            </NoteBox>
          ) : okScenarios && lead ? (
            <>
              <LeadPanel
                label={mode === "lump" ? "Your investment" : "What you would put in"}
                value={formatMoney(lead.principal, currency)}
              >
                <p>
                  {mode === "lump"
                    ? `A single amount, left for ${yearsText(lead.input.years)}.`
                    : `${formatMoney(lead.initial, currency)} at the start plus ${lead.periods} × ${formatMoney(lead.input.monthly, currency)} (${formatMoney(lead.totalContributions, currency)}) over ${yearsText(lead.input.years)}.`}
                </p>
              </LeadPanel>

              <FactList
                facts={okScenarios.map(({ rate, result }, index) => ({
                  label: `Scenario ${index + 1}: assumed ${formatPercent(rate)} a year`,
                  value: formatMoney(result.futureValue, currency),
                  note: (
                    <span className="inline-flex flex-wrap items-center justify-end gap-2">
                      {growthLabel(result)}
                      <DeltaPill
                        direction={directionOf(result.growth)}
                        text={formatSignedMoney(result.growth, currency)}
                      />
                      {result.growthPercent !== null && formatSignedPercent(result.growthPercent)}
                    </span>
                  ),
                }))}
              />
            </>
          ) : null}
        </div>
      </div>

      {okScenarios && lead && (
        <>
          <Card>
            <h3 className="font-serif text-h3 font-normal text-ink">
              {okScenarios.length > 1 && lowest !== highest
                ? `After ${yearsText(lead.input.years)}, the three balances range from ${formatMoney(lowest, currency)} to ${formatMoney(highest, currency)}`
                : `After ${yearsText(lead.input.years)}, the balance reaches ${formatMoney(highest, currency)}`}
            </h3>
            <p className="mt-3 text-note text-ink-muted">
              Each scenario has its own line style and number. The dashed grey line is the money you
              put in.
            </p>

            <figure className="mt-5">
              <ProjectionChart
                currency={currency}
                summary={`Projection over ${yearsText(lead.input.years)} for three assumed returns.`}
                series={[
                  {
                    id: "principal",
                    label: "Contributed principal",
                    tone: "principal",
                    values: lead.points.map((point) => point.principal),
                  },
                  ...okScenarios.map(({ rate, result }, index) => ({
                    id: `rate-${index}`,
                    label: `Scenario ${index + 1}, assumed ${formatPercent(rate)} a year`,
                    tone: SCENARIO_TONES[index],
                    marker: String(index + 1),
                    values: result.points.map((point) => point.balance),
                  })),
                ]}
              />

              <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2" aria-label="Chart legend">
                <li className="flex items-center gap-2 text-small text-ink">
                  <LineSample tone="principal" />
                  Contributed principal
                  <strong className="font-semibold tabular-nums">
                    {formatMoney(lead.principal, currency)}
                  </strong>
                </li>

                {okScenarios.map(({ rate, result }, index) => (
                  <li key={index} className="flex items-center gap-2 text-small text-ink">
                    <LineSample tone={SCENARIO_TONES[index]} />
                    {index + 1}. Assumed {formatPercent(rate)} a year
                    <strong className="font-semibold tabular-nums">
                      {formatMoney(result.futureValue, currency)}
                    </strong>
                  </li>
                ))}
              </ul>

              <HowToRead>
                Each line shows a balance month by month, in {currency}. The number at the end of a
                line matches the scenario in the legend.
              </HowToRead>
            </figure>

            <div className="mt-5">
              <DataTable
                caption="Year-by-year hypothetical value for each assumed return"
                regionLabel="Year-by-year comparison table"
                firstColumn="When"
                columns={[
                  { label: "Contributed principal", numeric: true },
                  ...okScenarios.map(({ rate }) => ({
                    label: `At ${formatPercent(rate)}`,
                    numeric: true,
                  })),
                ]}
                rows={yearlyPoints(lead).map((point) => ({
                  id: point.month,
                  header: rowLabel(point.month),
                  cells: [
                    formatMoney(point.principal, currency),
                    ...okScenarios.map(({ result }) =>
                      formatMoney(result.points[point.month].balance, currency),
                    ),
                  ],
                }))}
              />
            </div>
          </Card>

          <AssumptionsList variant={mode} />
        </>
      )}
    </PlSection>
  );
}
