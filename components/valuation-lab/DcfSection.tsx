import {
  FORECAST_YEARS_MAX,
  FORECAST_YEARS_MIN,
  formatCurrency,
  formatNumber,
  formatPercent,
  type DcfResult,
  type DcfSuccess,
} from "@/lib/valuation-lab";
import type { FormState } from "@/lib/valuation-lab/form";
import { NumberField, PERIOD_OPTIONS, SelectField } from "./Fields";
import { IssueList, StatusBadge } from "./ResultBits";

const YEAR_OPTIONS = Array.from(
  { length: FORECAST_YEARS_MAX - FORECAST_YEARS_MIN + 1 },
  (_, index) => {
    const years = FORECAST_YEARS_MIN + index;
    return {
      value: String(years),
      label: `${years} ${years === 1 ? "year" : "years"}`,
    };
  },
);

interface Props {
  form: FormState;
  result: DcfResult;
  onChange: <K extends keyof FormState>(key: K, value: FormState[K]) => void;
  onYears: (value: string) => void;
  onGrowth: (index: number, value: string) => void;
  onFillGrowth: () => void;
  onResetAssumptions: () => void;
}

/* ---------------- Results ---------------- */
function DcfResults({
  result,
  currency,
}: {
  result: DcfResult;
  currency: string;
}) {
  if (result.status !== "ok") {
    return (
      <div className="vl-panel" aria-labelledby="vl-dcf-results-title">
        <header className="vl-panel-head">
          <h3 id="vl-dcf-results-title" className="vl-h3">
            DCF Results
          </h3>
          <StatusBadge status={result.status} />
        </header>

        <p className="vl-text">
          The DCF cannot be calculated yet. Complete or correct the items
          below. Nothing is filled in for you, and no number is shown until
          every required input is valid.
        </p>

        <IssueList issues={result.issues} />
      </div>
    );
  }

  return <DcfSuccessView result={result} currency={currency} />;
}

function DcfSuccessView({
  result,
  currency,
}: {
  result: DcfSuccess;
  currency: string;
}) {
  const money = (value: number | null) => formatCurrency(value, currency);
  const n = result.forecast.length;

  const bridge = [
    {
      label: "Sum of present value of forecast FCFF",
      formula: "Σ FCFF(t) ÷ (1 + r)^t",
      value: money(result.sumPvForecastFcff),
    },
    {
      label: `Terminal-year cash flow (Year ${n + 1})`,
      formula: "FCFF(n) × (1 + g)",
      value: money(result.terminalFcff),
    },
    {
      label: "Terminal value",
      formula: "Terminal-year cash flow ÷ (r − g)",
      value: money(result.terminalValue),
    },
    {
      label: "Present value of terminal value",
      formula: "Terminal value ÷ (1 + r)^n",
      value: money(result.pvTerminalValue),
    },
    {
      label: "Enterprise value",
      formula: "PV of forecast FCFF + PV of terminal value",
      value: money(result.enterpriseValue),
    },
    {
      label: "Plus: cash and cash equivalents",
      formula: "Entered by you",
      value: money(result.inputs.cash),
    },
    {
      label: "Less: debt",
      formula: "Entered by you",
      value: money(result.inputs.debt),
    },
    {
      label: "Less: other claims",
      formula: "Entered by you",
      value: money(result.inputs.otherClaims),
    },
    {
      label: "Equity value",
      formula: "EV + cash − debt − other claims",
      value: money(result.equityValue),
    },
    {
      label: "Diluted shares outstanding",
      formula: "Entered by you",
      value: formatNumber(result.inputs.dilutedShares),
    },
  ];

  const ev = result.enterpriseValue;
  const partA = result.sumPvForecastFcff;
  const partB = result.pvTerminalValue;
  const showBar = ev > 0 && partA >= 0 && partB >= 0;

  return (
    <div className="vl-panel" aria-labelledby="vl-dcf-results-title">
      <header className="vl-panel-head">
        <h3 id="vl-dcf-results-title" className="vl-h3">
          DCF Results
        </h3>
        <StatusBadge status="ok" />
      </header>

      <p className="vl-headline-label">Estimated value per share</p>
      <p className="vl-headline">{money(result.valuePerShare)}</p>
      <p className="vl-hint">
        An estimate based only on the assumptions entered here. It is not a
        target price, a prediction, or advice.
      </p>

      <IssueList issues={result.warnings} />

      {/* Forecast table */}
      <h4 className="vl-h4">Forecast cash flows</h4>
      <div className="vl-table-wrap">
        <table className="vl-table">
          <caption className="vl-sr-only">
            Projected free cash flow to the firm, by year
          </caption>
          <thead>
            <tr>
              <th scope="col">Year</th>
              <th scope="col">Growth</th>
              <th scope="col">FCFF</th>
              <th scope="col">Discount factor</th>
              <th scope="col">Present value</th>
            </tr>
          </thead>
          <tbody>
            {result.forecast.map((row) => (
              <tr key={row.year}>
                <th scope="row">Year {row.year}</th>
                <td>{formatPercent(row.growthRate)}</td>
                <td>{money(row.fcff)}</td>
                <td>{formatNumber(row.discountFactor, 4)}</td>
                <td>{money(row.presentValue)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* From cash flows to value per share */}
      <h4 className="vl-h4">From cash flows to value per share</h4>
      <div className="vl-table-wrap">
        <table className="vl-table">
          <caption className="vl-sr-only">
            Step-by-step bridge from forecast cash flows to estimated value per
            share
          </caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col">How it is calculated</th>
              <th scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>
            {bridge.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td className="vl-formula-cell">{row.formula}</td>
                <td>{row.value}</td>
              </tr>
            ))}
            <tr className="vl-total-row">
              <th scope="row">Estimated value per share</th>
              <td className="vl-formula-cell">Equity value ÷ diluted shares</td>
              <td>{money(result.valuePerShare)}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Where the value comes from */}
      <h4 className="vl-h4">Where the enterprise value comes from</h4>
      <p className="vl-text">
        Terminal value is{" "}
        <strong>{formatPercent(result.terminalValueShareOfEv)}</strong> of
        enterprise value
        {result.terminalValueShareOfEv === null
          ? " (not shown because enterprise value is zero or negative)"
          : ""}
        . The further this share is from the forecast years, the more the
        result depends on the long-term assumptions.
      </p>

      {showBar && (
        <>
          <div
            className="vl-bar"
            role="img"
            aria-label={`Enterprise value: ${formatPercent(
              partA / ev,
            )} from forecast cash flows and ${formatPercent(
              partB / ev,
            )} from terminal value`}
          >
            <span className="vl-bar-a" style={{ width: `${(partA / ev) * 100}%` }} />
            <span className="vl-bar-b" style={{ width: `${(partB / ev) * 100}%` }} />
          </div>
          <p className="vl-bar-legend">
            <span className="vl-key vl-key-a" aria-hidden="true" /> Forecast
            years {formatPercent(partA / ev)}
            <span className="vl-key vl-key-b" aria-hidden="true" /> Terminal
            value {formatPercent(partB / ev)}
          </p>
        </>
      )}

      <details className="vl-details">
        <summary>Assumptions and limitations of this model</summary>
        <ul>
          <li>
            This is a two-stage model of free cash flow to the firm (FCFF). The
            discount rate must therefore be a firm-level rate, such as WACC.
          </li>
          <li>
            The terminal value assumes cash flows grow at a steady rate
            forever. Small changes in the discount rate or terminal growth can
            change the result a lot.
          </li>
          <li>
            Cash, debt, and other claims are taken as entered, as of the
            valuation date. Nothing is adjusted for you.
          </li>
          <li>
            The output is an estimate from your assumptions, not an objective
            or guaranteed value.
          </li>
        </ul>
      </details>
    </div>
  );
}

/* ---------------- Inputs + results ---------------- */
export default function DcfSection({
  form,
  result,
  onChange,
  onYears,
  onGrowth,
  onFillGrowth,
  onResetAssumptions,
}: Props) {
  return (
    <div className="vl-dcf-grid">
      <div className="vl-panel">
        <header className="vl-panel-head">
          <h3 className="vl-h3">DCF Inputs</h3>
        </header>

        <div className="vl-note vl-note-soft" role="note">
          <i className="ti ti-info-circle" aria-hidden="true" />
          <p>
            The growth, discount, and terminal rates start as{" "}
            <strong>illustrative examples</strong>. They are not estimates for
            any real company. Replace them with your own assumptions.
          </p>
        </div>

        <div className="vl-fields">
          <NumberField
            label="Starting FCFF"
            value={form.startingFcff}
            onChange={(v) => onChange("startingFcff", v)}
            hint="Free cash flow to the firm for one full year. Use one unit for FCFF, cash, debt, and shares (for example, all in millions)."
          />

          <SelectField
            label="Period of starting FCFF"
            value={form.fcffPeriod}
            options={PERIOD_OPTIONS}
            onChange={(v) => onChange("fcffPeriod", v)}
          />

          <SelectField
            label="Forecast period"
            value={form.forecastYears}
            options={YEAR_OPTIONS}
            onChange={onYears}
          />

          <NumberField
            label="Discount rate"
            suffix="%"
            value={form.discountRate}
            onChange={(v) => onChange("discountRate", v)}
            hint="A firm-level rate such as WACC. Higher rates lower the estimate."
          />

          <NumberField
            label="Terminal growth rate"
            suffix="%"
            value={form.terminalGrowth}
            onChange={(v) => onChange("terminalGrowth", v)}
            hint="Long-term yearly growth after the forecast. Must be lower than the discount rate."
          />
        </div>

        {form.fcffPeriod === "quarter" && (
          <p className="vl-issue is-warning">
            <span className="vl-issue-tag">Note</span> A single quarter of FCFF
            is not annualized. The model applies yearly growth to it as if it
            were a full year.
          </p>
        )}

        <fieldset className="vl-subgroup">
          <legend>Annual FCFF growth by year</legend>

          <div className="vl-fields vl-fields-tight">
            {form.growthRates.map((rate, index) => (
              <NumberField
                key={index}
                label={`Year ${index + 1}`}
                suffix="%"
                value={rate}
                onChange={(v) => onGrowth(index, v)}
              />
            ))}
          </div>

          <button
            type="button"
            className="vl-btn vl-btn-outline vl-btn-small"
            onClick={onFillGrowth}
          >
            Copy Year 1 to all years
          </button>
        </fieldset>

        <fieldset className="vl-subgroup">
          <legend>Balance sheet items and shares</legend>

          <div className="vl-fields">
            <NumberField
              label="Cash and cash equivalents"
              value={form.cash}
              onChange={(v) => onChange("cash", v)}
              hint="Enter 0 if none."
            />
            <NumberField
              label="Debt"
              value={form.debt}
              onChange={(v) => onChange("debt", v)}
              hint="Enter 0 if none."
            />
            <NumberField
              label="Other relevant claims"
              value={form.otherClaims}
              onChange={(v) => onChange("otherClaims", v)}
              hint="For example, minority interests or similar claims. Enter 0 if none."
            />
            <NumberField
              label="Diluted shares outstanding"
              value={form.dilutedShares}
              onChange={(v) => onChange("dilutedShares", v)}
              hint="Must be greater than zero. Same unit as the amounts above."
            />
          </div>
        </fieldset>

        <button
          type="button"
          className="vl-btn vl-btn-outline vl-btn-small"
          onClick={onResetAssumptions}
        >
          Reset assumptions to the illustrative example
        </button>
      </div>

      <DcfResults result={result} currency={form.currency} />
    </div>
  );
}