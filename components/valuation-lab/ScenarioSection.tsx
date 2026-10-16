import {
  formatCurrency,
  formatPercent,
  SCENARIO_NAMES,
  type DcfSuccess,
  type ScenarioName,
  type ScenarioResult,
} from "@/lib/valuation-lab";
import type {
  ScenarioForm,
  ScenarioFormSet,
} from "@/lib/valuation-lab/analysis-form";
import { readPercent } from "@/lib/valuation-lab/form";
import { NumberField } from "./Fields";
import { IssueList, StatusBadge } from "./ResultBits";

const META: Record<ScenarioName, { title: string; blurb: string }> = {
  bear: {
    title: "Bear Case",
    blurb:
      "A more cautious set of assumptions, such as lower growth or a higher discount rate.",
  },
  base: {
    title: "Base Case",
    blurb: "A middle set of assumptions that you consider reasonable.",
  },
  bull: {
    title: "Bull Case",
    blurb:
      "A more optimistic set of assumptions, such as higher growth or a lower discount rate.",
  },
};

interface Props {
  forms: ScenarioFormSet;
  results: Record<ScenarioName, ScenarioResult>;
  currency: string;
  onChange: (name: ScenarioName, key: keyof ScenarioForm, value: string) => void;
  onReset: () => void;
}

function success(result: ScenarioResult): DcfSuccess | null {
  return result.result.status === "ok" ? result.result : null;
}

function ScenarioCard({
  name,
  form,
  result,
  currency,
  onChange,
}: {
  name: ScenarioName;
  form: ScenarioForm;
  result: ScenarioResult;
  currency: string;
  onChange: Props["onChange"];
}) {
  const ok = success(result);
  const money = (value: number | null) => formatCurrency(value, currency);

  return (
    <article className="vl-panel" aria-labelledby={`vl-sc-${name}`}>
      <header className="vl-panel-head">
        <h3 id={`vl-sc-${name}`} className="vl-h3">
          {META[name].title}
        </h3>
        <StatusBadge status={result.result.status} />
      </header>

      <p className="vl-hint">{META[name].blurb}</p>

      <div className="vl-fields vl-fields-stack">
        <NumberField
          label="Annual FCFF growth"
          suffix="%"
          value={form.growth}
          onChange={(v) => onChange(name, "growth", v)}
          hint="Used for every forecast year."
        />
        <NumberField
          label="Discount rate"
          suffix="%"
          value={form.discountRate}
          onChange={(v) => onChange(name, "discountRate", v)}
        />
        <NumberField
          label="Terminal growth rate"
          suffix="%"
          value={form.terminalGrowth}
          onChange={(v) => onChange(name, "terminalGrowth", v)}
        />
      </div>

      {ok ? (
        <>
          <dl className="vl-dl">
            <div>
              <dt>Enterprise value</dt>
              <dd>{money(ok.enterpriseValue)}</dd>
            </div>
            <div>
              <dt>Equity value</dt>
              <dd>{money(ok.equityValue)}</dd>
            </div>
          </dl>
          <p className="vl-result">
            <span className="vl-result-label">Value per share</span>
            <span className="vl-result-value vl-result-value-sm">
              {money(ok.valuePerShare)}
            </span>
          </p>
          <IssueList issues={ok.warnings} />
        </>
      ) : (
        <>
          <p className="vl-text">
            This scenario cannot be calculated yet. No number is shown until
            its inputs, and the DCF inputs it shares, are valid.
          </p>
          {result.result.status !== "ok" && (
            <IssueList issues={result.result.issues} />
          )}
        </>
      )}
    </article>
  );
}

export default function ScenarioSection({
  forms,
  results,
  currency,
  onChange,
  onReset,
}: Props) {
  const money = (value: number | null) => formatCurrency(value, currency);
  const unavailable = "Unavailable";

  const rows: { label: string; cell: (name: ScenarioName) => string }[] = [
    {
      label: "Annual FCFF growth",
      cell: (name) => formatPercent(readPercent(forms[name].growth)),
    },
    {
      label: "Discount rate",
      cell: (name) => formatPercent(readPercent(forms[name].discountRate)),
    },
    {
      label: "Terminal growth rate",
      cell: (name) => formatPercent(readPercent(forms[name].terminalGrowth)),
    },
    {
      label: "Enterprise value",
      cell: (name) => {
        const ok = success(results[name]);
        return ok ? money(ok.enterpriseValue) : unavailable;
      },
    },
    {
      label: "Equity value",
      cell: (name) => {
        const ok = success(results[name]);
        return ok ? money(ok.equityValue) : unavailable;
      },
    },
    {
      label: "Terminal value share of EV",
      cell: (name) => {
        const ok = success(results[name]);
        return ok ? formatPercent(ok.terminalValueShareOfEv) : unavailable;
      },
    },
    {
      label: "Estimated value per share",
      cell: (name) => {
        const ok = success(results[name]);
        return ok ? money(ok.valuePerShare) : unavailable;
      },
    },
  ];

  return (
    <>
      <div className="vl-note vl-note-soft" role="note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <p>
          Scenarios show how value changes when assumptions change. They are{" "}
          <strong>not predictions</strong>, and the starting values are
          illustrative examples. Scenarios share the starting FCFF, cash, debt,
          shares, and forecast period from the DCF inputs, and each uses one
          growth rate for every year. Editing a scenario never changes the
          main DCF.
        </p>
      </div>

      <div className="vl-three-col">
        {SCENARIO_NAMES.map((name) => (
          <ScenarioCard
            key={name}
            name={name}
            form={forms[name]}
            result={results[name]}
            currency={currency}
            onChange={onChange}
          />
        ))}
      </div>

      <h4 className="vl-h4">Scenario comparison</h4>
      <div className="vl-table-wrap">
        <table className="vl-table vl-table-compare">
          <caption className="vl-sr-only">
            Assumptions and results of the Bear, Base, and Bull cases
          </caption>
          <thead>
            <tr>
              <th scope="col">Item</th>
              {SCENARIO_NAMES.map((name) => (
                <th key={name} scope="col">
                  {META[name].title}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row.label}
                className={index === rows.length - 1 ? "vl-total-row" : undefined}
              >
                <th scope="row">{row.label}</th>
                {SCENARIO_NAMES.map((name) => (
                  <td key={name}>{row.cell(name)}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="vl-toolbar vl-toolbar-top">
        <button
          type="button"
          className="vl-btn vl-btn-outline vl-btn-small"
          onClick={onReset}
        >
          Reset scenarios to the illustrative examples
        </button>
      </div>
    </>
  );
}