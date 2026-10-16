import {
  formatCurrency,
  formatMultiple,
  formatNumber,
  formatPercent,
  formatPercentValue,
  marginOfSafetyFromDcf,
  NOT_AVAILABLE,
  PERIOD_LABELS,
  SCENARIO_NAMES,
  type CalcStatus,
  type DcfResult,
  type PeResult,
  type PsResult,
  type ScenarioName,
  type ScenarioResult,
  type ValidationIssue,
} from "@/lib/valuation-lab";
import {
  ILLUSTRATIVE_SCENARIO_FORMS,
  type ScenarioFormSet,
  type SensitivityBuild,
  type ValuationSource,
} from "@/lib/valuation-lab/analysis-form";
import { readNumber, type FormState } from "@/lib/valuation-lab/form";
import {
  collectInputGaps,
  matchesIllustrativeAssumptions,
  sensitivityRange,
} from "@/lib/valuation-lab/summary";
import { IssueList, StatusBadge } from "./ResultBits";

const SCENARIO_TITLES: Record<ScenarioName, string> = {
  bear: "Bear Case",
  base: "Base Case",
  bull: "Bull Case",
};

const SOURCE_TITLES: Record<ValuationSource, string> = {
  main: "Main DCF",
  ...SCENARIO_TITLES,
};

// What the user typed: tells "not entered" apart from "invalid" and from 0.
function entered(text: string, format: (value: number) => string): string {
  const value = readNumber(text);
  if (value === null) return "Not entered";
  if (Number.isNaN(value)) return "Invalid";
  return format(value);
}

function plain(text: string): string {
  const trimmed = text.trim();
  return trimmed === "" ? "Not entered" : trimmed;
}

function Rows({ rows }: { rows: [string, string][] }) {
  return (
    <dl className="vl-dl">
      {rows.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

interface Props {
  form: FormState;
  pe: PeResult;
  ps: PsResult;
  dcf: DcfResult;
  scenarios: Record<ScenarioName, ScenarioResult>;
  scenarioForms: ScenarioFormSet;
  sensitivity: SensitivityBuild;
  mosChoice: ValuationSource;
  mosResults: Record<ValuationSource, DcfResult>;
}

interface OutputRow {
  label: string;
  value: string;
  status?: CalcStatus;
  note?: string;
}

export default function ValuationSummary({
  form,
  pe,
  ps,
  dcf,
  scenarios,
  scenarioForms,
  sensitivity,
  mosChoice,
  mosResults,
}: Props) {
  const money = (value: number | null) => formatCurrency(value, form.currency);
  const amount = (text: string) => entered(text, (n) => money(n));
  const pct = (text: string) => entered(text, (n) => `${formatNumber(n)}%`);

  const dcfOk = dcf.status === "ok" ? dcf : null;
  const mos = marginOfSafetyFromDcf(
    mosResults[mosChoice],
    readNumber(form.sharePrice),
  );
  const gaps = collectInputGaps(form);
  const range = sensitivityRange(sensitivity);

  const scenarioLine = (name: ScenarioName) => {
    const f = scenarioForms[name];
    return `Growth ${pct(f.growth)} · discount ${pct(f.discountRate)} · terminal ${pct(f.terminalGrowth)}`;
  };

  const outputs: OutputRow[] = [
    {
      label: `P/E (EPS: ${PERIOD_LABELS[pe.epsPeriod]})`,
      value: pe.value === null ? NOT_AVAILABLE : formatMultiple(pe.value),
      status: pe.status,
    },
    {
      label: `P/S (revenue: ${PERIOD_LABELS[ps.revenuePeriod]})`,
      value: ps.value === null ? NOT_AVAILABLE : formatMultiple(ps.value),
      status: ps.status,
    },
    {
      label: "Main DCF: estimated value per share",
      value: dcfOk ? money(dcfOk.valuePerShare) : NOT_AVAILABLE,
      status: dcf.status,
    },
    {
      label: "Main DCF: enterprise value",
      value: dcfOk ? money(dcfOk.enterpriseValue) : NOT_AVAILABLE,
      note: "Main DCF",
    },
    {
      label: "Main DCF: equity value",
      value: dcfOk ? money(dcfOk.equityValue) : NOT_AVAILABLE,
      note: "Main DCF",
    },
    {
      label: "Main DCF: terminal value share of EV",
      value: dcfOk ? formatPercent(dcfOk.terminalValueShareOfEv) : NOT_AVAILABLE,
      note: "Main DCF",
    },
    ...SCENARIO_NAMES.map((name): OutputRow => {
      const result = scenarios[name].result;
      return {
        label: `${SCENARIO_TITLES[name]}: value per share`,
        value: result.status === "ok" ? money(result.valuePerShare) : NOT_AVAILABLE,
        status: result.status,
      };
    }),
    {
      label: "Sensitivity range: value per share",
      value: range ? `${money(range.min)} to ${money(range.max)}` : NOT_AVAILABLE,
      note: range
        ? `${range.calculated} of ${range.total} cells`
        : "Unavailable",
    },
    {
      label: `Margin of Safety (${SOURCE_TITLES[mosChoice]})`,
      value:
        mos.marginOfSafetyPercent === null
          ? NOT_AVAILABLE
          : formatPercentValue(mos.marginOfSafetyPercent),
      status: mos.status,
    },
  ];

  // Missing inputs are listed separately, so only other issues appear here.
  const notMissing = (list: ValidationIssue[]) =>
    list.filter((issue) => issue.kind !== "missing");

  const issueGroups: { title: string; issues: ValidationIssue[] }[] = [
    { title: "P/E", issues: notMissing(pe.issues) },
    { title: "P/S", issues: notMissing(ps.issues) },
    {
      title: "Main DCF",
      issues: dcf.status === "ok" ? dcf.warnings : notMissing(dcf.issues),
    },
    { title: "Margin of Safety", issues: notMissing(mos.issues) },
  ].filter((group) => group.issues.length > 0);

  const usingExampleDcf = matchesIllustrativeAssumptions(form);
  const usingExampleScenarios =
    JSON.stringify(scenarioForms) === JSON.stringify(ILLUSTRATIVE_SCENARIO_FORMS);

  return (
    <div className="vl-panel" aria-labelledby="vl-summary-title">
      <header className="vl-panel-head">
        <h3 id="vl-summary-title" className="vl-h3">
          Your Valuation Summary
        </h3>
      </header>

      <p className="vl-hint">
        This page restates what you entered and what the calculators returned.
        It is not a recommendation, a target price, or a prediction.
      </p>

      <div className="vl-summary-grid">
        <section className="vl-summary-block" aria-labelledby="vl-sum-company">
          <h4 id="vl-sum-company" className="vl-h4">
            Entered by you: company and market
          </h4>
          <Rows
            rows={[
              ["Company", plain(form.companyName)],
              ["Ticker", plain(form.ticker)],
              ["Currency", form.currency],
              ["Share price", amount(form.sharePrice)],
              ["Share price date", plain(form.priceDate)],
              ["Data source note", plain(form.sourceNote)],
            ]}
          />
        </section>

        <section className="vl-summary-block" aria-labelledby="vl-sum-fin">
          <h4 id="vl-sum-fin" className="vl-h4">
            Entered by you: financial data
          </h4>
          <Rows
            rows={[
              [`EPS (${PERIOD_LABELS[form.epsPeriod]})`, amount(form.eps)],
              [`Revenue (${PERIOD_LABELS[form.revenuePeriod]})`, amount(form.revenue)],
              [
                `Shares outstanding (${form.sharesMeasure})`,
                entered(form.sharesOutstanding, (n) => formatNumber(n)),
              ],
              [
                `Starting FCFF (${PERIOD_LABELS[form.fcffPeriod]})`,
                amount(form.startingFcff),
              ],
              ["Cash and cash equivalents", amount(form.cash)],
              ["Debt", amount(form.debt)],
              ["Other claims", amount(form.otherClaims)],
              [
                "Diluted shares outstanding",
                entered(form.dilutedShares, (n) => formatNumber(n)),
              ],
            ]}
          />
        </section>

        <section className="vl-summary-block" aria-labelledby="vl-sum-assump">
          <h4 id="vl-sum-assump" className="vl-h4">
            Your assumptions
          </h4>
          <Rows
            rows={[
              ["Forecast period", entered(form.forecastYears, (n) => `${formatNumber(n)} years`)],
              ["Discount rate", pct(form.discountRate)],
              ["Terminal growth rate", pct(form.terminalGrowth)],
              ...form.growthRates.map(
                (g, index): [string, string] => [`Year ${index + 1} FCFF growth`, pct(g)],
              ),
              ...SCENARIO_NAMES.map(
                (name): [string, string] => [SCENARIO_TITLES[name], scenarioLine(name)],
              ),
            ]}
          />
          {(usingExampleDcf || usingExampleScenarios) && (
            <p className="vl-issue is-warning">
              <span className="vl-issue-tag">Note</span>{" "}
              {usingExampleDcf && "The main DCF assumptions are still the illustrative examples. "}
              {usingExampleScenarios && "The scenario assumptions are still the illustrative examples. "}
              They are not estimates for any real company.
            </p>
          )}
        </section>

        <section className="vl-summary-block" aria-labelledby="vl-sum-gaps">
          <h4 id="vl-sum-gaps" className="vl-h4">
            Missing or invalid inputs
          </h4>
          {gaps.length === 0 ? (
            <p className="vl-text">
              Every input used by the calculators is filled in with a readable
              number.
            </p>
          ) : (
            <ul className="vl-issues">
              {gaps.map((gap) => (
                <li key={gap.label} className="vl-issue is-warning">
                  <span className="vl-issue-tag">
                    {gap.state === "missing" ? "Not entered" : "Invalid"}
                  </span>{" "}
                  {gap.label}. Needed for {gap.neededFor}.
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <h4 className="vl-h4">Calculated results</h4>
      <div className="vl-table-wrap">
        <table className="vl-table vl-table-compare">
          <caption className="vl-sr-only">
            Results from the calculators, with the status of each
          </caption>
          <thead>
            <tr>
              <th scope="col">Output</th>
              <th scope="col">Result</th>
              <th scope="col">Status</th>
            </tr>
          </thead>
          <tbody>
            {outputs.map((row) => (
              <tr key={row.label}>
                <th scope="row">{row.label}</th>
                <td>{row.value}</td>
                <td>
                  {row.status ? <StatusBadge status={row.status} /> : row.note}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {issueGroups.length > 0 && (
        <>
          <h4 className="vl-h4">Warnings and issues</h4>
          {issueGroups.map((group) => (
            <div key={group.title}>
              <p className="vl-explain-title">{group.title}</p>
              <IssueList issues={group.issues} />
            </div>
          ))}
        </>
      )}

      <h4 className="vl-h4">Model limitations</h4>
      <ul className="vl-lesson-list">
        <li>
          All financial data and assumptions are entered by you. Scope does
          not verify them, and nothing here is live market data.
        </li>
        <li>
          Results are estimates. Different assumptions can produce materially
          different results.
        </li>
        <li>
          The DCF is a two-stage model of free cash flow to the firm. Its
          discount rate must be a firm-level rate such as WACC, and its
          terminal value assumes steady growth forever.
        </li>
        <li>
          Ratios and Margin of Safety depend on the share price you typed and
          on consistent currency, units, and reporting periods.
        </li>
        <li>
          This tool is educational and is not personalized investment advice.
          No result guarantees future performance.
        </li>
      </ul>
    </div>
  );
}