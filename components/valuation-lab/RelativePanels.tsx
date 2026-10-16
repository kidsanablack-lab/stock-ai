import {
  formatCurrency,
  formatMultiple,
  formatNumber,
  NOT_AVAILABLE,
  PERIOD_LABELS,
  type PeResult,
  type PsResult,
} from "@/lib/valuation-lab";
import { readNumber, type FormState } from "@/lib/valuation-lab/form";
import { IssueList, StatusBadge } from "./ResultBits";

// Shows what the user typed, and tells "not entered" apart from "invalid"
// and from a real zero.
function shown(text: string, format: (value: number) => string): string {
  const value = readNumber(text);
  if (value === null) return "Not entered";
  if (Number.isNaN(value)) return "Invalid";
  return format(value);
}

export function PePanel({
  form,
  result,
}: {
  form: FormState;
  result: PeResult;
}) {
  const money = (value: number) => formatCurrency(value, form.currency);

  return (
    <article className="vl-panel" aria-labelledby="vl-pe-title">
      <header className="vl-panel-head">
        <h3 id="vl-pe-title" className="vl-h3">
          P/E Ratio
        </h3>
        <StatusBadge status={result.status} />
      </header>

      <p className="vl-formula">P/E = Share Price ÷ EPS</p>

      <dl className="vl-dl">
        <div>
          <dt>Share price</dt>
          <dd>{shown(form.sharePrice, money)}</dd>
        </div>
        <div>
          <dt>EPS ({PERIOD_LABELS[result.epsPeriod]})</dt>
          <dd>{shown(form.eps, money)}</dd>
        </div>
      </dl>

      <p className="vl-result">
        <span className="vl-result-label">P/E</span>
        <span className="vl-result-value">
          {result.value === null ? NOT_AVAILABLE : formatMultiple(result.value)}
        </span>
      </p>

      <IssueList issues={result.issues} />

      {result.status === "ok" && result.value !== null && (
        <p className="vl-text">
          With the figures entered, the share price is {formatMultiple(result.value)}{" "}
          the {PERIOD_LABELS[result.epsPeriod].toLowerCase()} earnings per
          share. A higher or lower multiple does not show on its own whether a
          stock is cheap or expensive. It needs context such as growth, risk,
          and the history of the business.
        </p>
      )}

      <details className="vl-details">
        <summary>Limitations</summary>
        <ul>
          <li>EPS is an accounting figure and can include one-off items.</li>
          <li>
            Comparing P/E between companies only helps when the businesses,
            growth, and risks are similar.
          </li>
          <li>
            When EPS is zero or negative, no P/E is shown, because the result
            would not be meaningful.
          </li>
        </ul>
      </details>
    </article>
  );
}

export function PsPanel({
  form,
  result,
}: {
  form: FormState;
  result: PsResult;
}) {
  const money = (value: number) => formatCurrency(value, form.currency);
  const measure = result.sharesMeasure === "diluted" ? "diluted" : "basic";

  return (
    <article className="vl-panel" aria-labelledby="vl-ps-title">
      <header className="vl-panel-head">
        <h3 id="vl-ps-title" className="vl-h3">
          P/S Ratio
        </h3>
        <StatusBadge status={result.status} />
      </header>

      <p className="vl-formula">
        Market Cap = Share Price × Shares · P/S = Market Cap ÷ Revenue
      </p>

      <dl className="vl-dl">
        <div>
          <dt>Share price</dt>
          <dd>{shown(form.sharePrice, money)}</dd>
        </div>
        <div>
          <dt>Shares outstanding ({measure})</dt>
          <dd>{shown(form.sharesOutstanding, (value) => formatNumber(value))}</dd>
        </div>
        <div>
          <dt>Market capitalization</dt>
          <dd>
            {result.marketCapitalization === null
              ? NOT_AVAILABLE
              : money(result.marketCapitalization)}
          </dd>
        </div>
        <div>
          <dt>Revenue ({PERIOD_LABELS[result.revenuePeriod]})</dt>
          <dd>{shown(form.revenue, money)}</dd>
        </div>
      </dl>

      <p className="vl-result">
        <span className="vl-result-label">P/S</span>
        <span className="vl-result-value">
          {result.value === null ? NOT_AVAILABLE : formatMultiple(result.value)}
        </span>
      </p>

      <IssueList issues={result.issues} />

      {result.status === "ok" && result.value !== null && (
        <p className="vl-text">
          With the figures entered, the market value of the company is{" "}
          {formatMultiple(result.value)} its{" "}
          {PERIOD_LABELS[result.revenuePeriod].toLowerCase()} revenue. This
          shows how the market values each unit of sales. It does not show
          whether the company is profitable or whether the price is high or
          low.
        </p>
      )}

      <details className="vl-details">
        <summary>Limitations</summary>
        <ul>
          <li>
            Revenue and market capitalization must use the same unit (for
            example, both in millions) and the same currency.
          </li>
          <li>
            P/S ignores profit and debt, so two companies with the same P/S
            can be very different businesses.
          </li>
          <li>
            The result depends on which share count you use. This page shows
            whether it is basic or diluted.
          </li>
        </ul>
      </details>
    </article>
  );
}