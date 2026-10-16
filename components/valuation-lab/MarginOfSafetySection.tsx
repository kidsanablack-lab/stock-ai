import {
  formatCurrency,
  formatPercentValue,
  marginOfSafetyFromDcf,
  type DcfResult,
} from "@/lib/valuation-lab";
import type { ValuationSource } from "@/lib/valuation-lab/analysis-form";
import { readNumber, type FormState } from "@/lib/valuation-lab/form";
import { SelectField } from "./Fields";
import { IssueList, StatusBadge } from "./ResultBits";

const OPTIONS: { value: ValuationSource; label: string }[] = [
  { value: "base", label: "Base Case" },
  { value: "bear", label: "Bear Case" },
  { value: "bull", label: "Bull Case" },
  { value: "main", label: "Main DCF (as entered in DCF inputs)" },
];

interface Props {
  form: FormState;
  choice: ValuationSource;
  results: Record<ValuationSource, DcfResult>;
  onChoice: (value: ValuationSource) => void;
}

export default function MarginOfSafetySection({
  form,
  choice,
  results,
  onChoice,
}: Props) {
  const money = (value: number | null) => formatCurrency(value, form.currency);
  const selected = results[choice];
  const mos = marginOfSafetyFromDcf(selected, readNumber(form.sharePrice));
  const label = OPTIONS.find((o) => o.value === choice)?.label ?? choice;

  let comparison: string | null = null;
  if (mos.status === "ok" && mos.absoluteDifference !== null) {
    comparison =
      mos.absoluteDifference > 0
        ? "Under these assumptions, the estimated value per share is above the share price you entered."
        : mos.absoluteDifference < 0
          ? "Under these assumptions, the estimated value per share is below the share price you entered."
          : "Under these assumptions, the estimated value per share equals the share price you entered.";
  }

  return (
    <div className="vl-panel" aria-labelledby="vl-mos-title">
      <header className="vl-panel-head">
        <h3 id="vl-mos-title" className="vl-h3">
          Margin of Safety
        </h3>
        <StatusBadge status={mos.status} />
      </header>

      <p className="vl-formula">
        Margin of Safety (%) = (Estimated value per share − Share price) ÷
        Estimated value per share × 100
      </p>

      <div className="vl-fields vl-fields-one">
        <SelectField
          label="Valuation to compare"
          value={choice}
          options={OPTIONS}
          onChange={onChoice}
          hint="The share price comes from Company and market above."
        />
      </div>

      <dl className="vl-dl">
        <div>
          <dt>Estimated value per share ({label})</dt>
          <dd>{money(mos.estimatedValuePerShare)}</dd>
        </div>
        <div>
          <dt>Share price you entered</dt>
          <dd>{money(mos.sharePrice)}</dd>
        </div>
        <div>
          <dt>Difference per share (estimate − price)</dt>
          <dd>{money(mos.absoluteDifference)}</dd>
        </div>
      </dl>

      <p className="vl-result">
        <span className="vl-result-label">Margin of Safety</span>
        <span className="vl-result-value">
          {mos.marginOfSafetyPercent === null
            ? "N/A"
            : formatPercentValue(mos.marginOfSafetyPercent)}
        </span>
      </p>

      {selected.status !== "ok" && (
        <p className="vl-text">
          The selected valuation cannot be calculated yet. Complete or correct
          its section above first.
        </p>
      )}

      {comparison && <p className="vl-text">{comparison}</p>}

      <IssueList issues={mos.issues} />

      <details className="vl-details">
        <summary>What Margin of Safety does and does not mean</summary>
        <ul>
          <li>
            It compares one estimate with one price. Both the estimate and the
            price you typed can be wrong or out of date.
          </li>
          <li>
            A different set of assumptions can change the result a lot. Try
            the other scenarios and the sensitivity table.
          </li>
          <li>
            A positive number is not a guarantee against loss, and a negative
            number is not a verdict on the business. It is a way to see how
            much your own assumptions would need to be wrong.
          </li>
          <li>
            If the estimated value per share is zero or negative, no
            percentage is shown, because the result would not be meaningful.
          </li>
        </ul>
      </details>
    </div>
  );
}