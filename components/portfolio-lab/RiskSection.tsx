import { CATEGORY_BY_ID, UNALLOCATED_COLOR } from "@/lib/portfolio-lab/categories";
import { CATEGORY_NOTES, NOT_AVAILABLE } from "@/lib/portfolio-lab/categoryNotes";
import { formatMoney, formatPercent } from "@/lib/portfolio-lab/currency";
import type { RiskAnalysis } from "@/lib/portfolio-lab/risk";
import type {
  CurrencyCode,
  Observation,
} from "@/lib/portfolio-lab/types";
import "./portfolio-lab-risk.css";

type RiskSectionProps = {
  analysis: RiskAnalysis;
  notes: Observation[];
  currency: CurrencyCode;
};

const TONE_ICON: Record<Observation["tone"], string> = {
  info: "ti-info-circle",
  notice: "ti-eye",
  warning: "ti-alert-triangle",
};

const TONE_LABEL: Record<Observation["tone"], string> = {
  info: "Note",
  notice: "Worth noticing",
  warning: "Needs attention",
};

// What this tool can work out from names, categories, and percentages.
const CALCULATED = [
  "How completely the money is allocated",
  "How large each holding is, and how evenly the money is spread",
  "How much sits in each asset category",
  "The share in individual stocks, funds, cash, and cryptocurrency",
  "Whether several holdings share a name",
];

function statusDetails(analysis: RiskAnalysis, currency: CurrencyCode) {
  switch (analysis.status) {
    case "empty":
      return {
        icon: "ti-info-circle",
        title: "There is nothing to analyze yet",
        text: "Add holdings in the builder or load a template, and this section will describe how your allocation is distributed.",
      };
    case "incomplete":
      return {
        icon: "ti-alert-circle",
        title: "Not fully allocated",
        text: `${formatPercent(analysis.totalPercent)} of the initial investment is allocated. ${formatPercent(analysis.unallocatedPercent)} (${formatMoney(analysis.unallocatedAmount, currency)}) is not, so everything below describes only the allocated part.`,
      };
    case "over":
      return {
        icon: "ti-alert-triangle",
        title: "Allocated above 100%",
        text: `The holdings add up to ${formatPercent(analysis.totalPercent)}, which is ${formatPercent(analysis.overPercent)} (${formatMoney(analysis.overAmount, currency)}) more than the initial investment. Lower an allocation before reading the results as a complete portfolio.`,
      };
    default:
      return {
        icon: "ti-circle-check",
        title: "Fully allocated",
        text: "The holdings add up to 100% of the initial investment.",
      };
  }
}

export default function RiskSection({ analysis, notes, currency }: RiskSectionProps) {
  const status = statusDetails(analysis, currency);
  const hasHoldings = analysis.holdings.length > 0;
  const base = Math.max(analysis.totalPercent, 100);

  const stack = [
    ...analysis.categories.map((row) => ({
      id: row.category,
      label: CATEGORY_BY_ID[row.category].label,
      color: CATEGORY_BY_ID[row.category].color,
      percent: row.percent,
    })),
    ...(analysis.status === "incomplete"
      ? [
          {
            id: "unallocated",
            label: "Unallocated",
            color: UNALLOCATED_COLOR,
            percent: analysis.unallocatedPercent,
          },
        ]
      : []),
  ];

  const stackLabel = stack
    .map((item) => `${item.label} ${formatPercent(item.percent)}`)
    .join(", ");

  const checks: string[] = [];

  if (analysis.unnamedCount > 0) {
    checks.push(
      `${analysis.unnamedCount} ${analysis.unnamedCount === 1 ? "holding has" : "holdings have"} no name, so ${analysis.unnamedCount === 1 ? "it is" : "they are"} shown as “Unnamed holding”.`,
    );
  }

  if (analysis.zeroAllocationCount > 0) {
    checks.push(
      `${analysis.zeroAllocationCount} ${analysis.zeroAllocationCount === 1 ? "holding has" : "holdings have"} an allocation of 0%, so ${analysis.zeroAllocationCount === 1 ? "it does" : "they do"} not affect these results.`,
    );
  }

  return (
    <section
      id="risk-diversification"
      className="pl-section"
      aria-labelledby="pl-risk-title"
    >
      <p className="pl-eyebrow">Risk &amp; Diversification</p>
      <h2 id="pl-risk-title" className="pl-h2">
        Where your portfolio is concentrated
      </h2>
      <p className="pl-lead">
        This analysis uses only the names, categories, and percentages you
        entered. It describes how your hypothetical allocation is distributed.
        It is not a risk score, a forecast, or advice, and it does not judge
        whether the portfolio is right for anyone.
      </p>

      {/* 1. Completeness */}
      <div className={`pl-risk-status is-${analysis.status}`}>
        <i className={`ti ${status.icon}`} aria-hidden="true" />
        <div>
          <p className="pl-status-title">{status.title}</p>
          <p className="pl-status-text">{status.text}</p>
        </div>
      </div>

      {hasHoldings && (
        <>
          <div className="pl-risk-grid">
            {/* 2. Concentration in holdings */}
            <div className="pl-panel">
              <h3 className="pl-h3">Concentration in individual holdings</h3>

              <div className="pl-risk-stats">
                <div className="pl-card">
                  <p className="pl-card-label">Largest holding</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatPercent(analysis.topHolding?.percent ?? 0)}
                  </p>
                  <p className="pl-card-note">{analysis.topHolding?.name}</p>
                </div>

                <div className="pl-card">
                  <p className="pl-card-label">Three largest</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {formatPercent(analysis.topThreePercent)}
                  </p>
                  <p className="pl-card-note">
                    {analysis.holdings.length < 3
                      ? `All ${analysis.holdings.length} with an allocation`
                      : "Combined"}
                  </p>
                </div>

                <div className="pl-card">
                  <p className="pl-card-label">Effective holdings</p>
                  <p className="pl-card-value pl-card-value-sm">
                    {analysis.effectiveHoldings === null
                      ? "—"
                      : (Math.round(analysis.effectiveHoldings * 10) / 10).toFixed(1)}
                  </p>
                  <p className="pl-card-note">
                    of {analysis.holdings.length}{" "}
                    {analysis.holdings.length === 1 ? "holding" : "holdings"}
                  </p>
                </div>
              </div>

              <p className="pl-hint pl-risk-explain">
                <strong>Effective holdings</strong> shows how evenly the money is
                spread. It equals the number of equal-sized holdings that would
                be about as concentrated. Four equal holdings give 4.0, and one
                holding gives 1.0. It says nothing about how the holdings behave
                together.
              </p>

              <ol className="pl-rank" aria-label="Holdings ranked by size">
                {analysis.holdings.map((holding) => (
                  <li key={holding.id} className="pl-rank-item">
                    <div className="pl-rank-top">
                      <span className="pl-rank-name">
                        <span
                          className="pl-swatch"
                          style={{ background: CATEGORY_BY_ID[holding.category].color }}
                          aria-hidden="true"
                        />
                        {holding.name}
                        <small>{CATEGORY_BY_ID[holding.category].short}</small>
                      </span>
                      <span className="pl-rank-value">
                        <strong>{formatPercent(holding.percent)}</strong>
                        {formatMoney(holding.amount, currency)}
                      </span>
                    </div>

                    <div className="pl-cat-bar" aria-hidden="true">
                      <span
                        style={{
                          width: `${Math.min(100, holding.percent)}%`,
                          background: CATEGORY_BY_ID[holding.category].color,
                        }}
                      />
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* 3. Asset-class exposure */}
            <div className="pl-panel">
              <h3 className="pl-h3">Exposure by asset category</h3>

              <div
                className="pl-stack"
                role="img"
                aria-label={`Share of the initial investment by category. ${stackLabel}.`}
              >
                {stack.map((item) => (
                  <span
                    key={item.id}
                    style={{
                      width: `${(item.percent / base) * 100}%`,
                      background: item.color,
                    }}
                  />
                ))}
              </div>

              <ul className="pl-cats pl-cats-compact">
                {analysis.categories.map((row) => (
                  <li key={row.category} className="pl-cat-row">
                    <span>
                      <span
                        className="pl-swatch"
                        style={{ background: CATEGORY_BY_ID[row.category].color }}
                        aria-hidden="true"
                      />
                      {CATEGORY_BY_ID[row.category].label}
                      <small>
                        {row.holdingCount} {row.holdingCount === 1 ? "holding" : "holdings"}
                      </small>
                    </span>
                    <span className="pl-cat-values">
                      <strong>{formatPercent(row.percent)}</strong>
                      {formatMoney(row.amount, currency)}
                    </span>
                  </li>
                ))}
                {analysis.status === "incomplete" && (
                  <li className="pl-cat-row">
                    <span>
                      <span
                        className="pl-swatch"
                        style={{ background: UNALLOCATED_COLOR }}
                        aria-hidden="true"
                      />
                      Unallocated
                    </span>
                    <span className="pl-cat-values">
                      <strong>{formatPercent(analysis.unallocatedPercent)}</strong>
                      {formatMoney(analysis.unallocatedAmount, currency)}
                    </span>
                  </li>
                )}
              </ul>

              <dl className="pl-glance">
                <div>
                  <dt>Individual stocks</dt>
                  <dd>{formatPercent(analysis.individualStockPercent)}</dd>
                </div>
                <div>
                  <dt>Funds (equity and bond ETFs)</dt>
                  <dd>{formatPercent(analysis.fundPercent)}</dd>
                </div>
                <div>
                  <dt>Cash</dt>
                  <dd>{formatPercent(analysis.cashPercent)}</dd>
                </div>
                <div>
                  <dt>Cryptocurrency</dt>
                  <dd>{formatPercent(analysis.cryptoPercent)}</dd>
                </div>
              </dl>

              {analysis.absentCategories.length > 0 && (
                <p className="pl-hint">
                  No allocation in:{" "}
                  {analysis.absentCategories
                    .map((id) => CATEGORY_BY_ID[id].label)
                    .join(", ")}
                  . This is only a description, not a suggestion to add them.
                </p>
              )}
            </div>
          </div>

          {/* 4. Observations */}
          {notes.length > 0 && (
            <div className="pl-risk-block">
              <h3 className="pl-h3">What stands out</h3>

              <ul className="pl-observations">
                {notes.map((note) => (
                  <li key={note.id} className={`pl-observation is-${note.tone}`}>
                    <i className={`ti ${TONE_ICON[note.tone]}`} aria-hidden="true" />
                    <div>
                      <p className="pl-observation-tag">{TONE_LABEL[note.tone]}</p>
                      <h4 className="pl-observation-title">{note.title}</h4>
                      <p className="pl-observation-text">{note.text}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. What each category can mean */}
          <div className="pl-risk-block">
            <h3 className="pl-h3">What your categories can mean</h3>
            <p className="pl-hint">
              General explanations for the categories in your portfolio. They
              describe what each one is and what can affect it, not how any real
              asset will perform.
            </p>

            <ul className="pl-notes-grid">
              {analysis.categories.map((row) => {
                const note = CATEGORY_NOTES[row.category];

                return (
                  <li key={row.category} className="pl-note-card">
                    <div className="pl-note-head">
                      <span
                        className="pl-swatch"
                        style={{ background: CATEGORY_BY_ID[row.category].color }}
                        aria-hidden="true"
                      />
                      <h4>{CATEGORY_BY_ID[row.category].label}</h4>
                      <span>{formatPercent(row.percent)}</span>
                    </div>
                    <p>
                      <strong>What it is:</strong> {note.what}
                    </p>
                    <p>
                      <strong>What can affect it:</strong> {note.canAffect}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* 6. Input checks */}
          {checks.length > 0 && (
            <div className="pl-risk-block">
              <h3 className="pl-h3">About your entries</h3>
              <ul className="pl-checks">
                {checks.map((check) => (
                  <li key={check}>
                    <i className="ti ti-point-filled" aria-hidden="true" />
                    {check}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </>
      )}

      {/* 7. What can and cannot be measured */}
      <div className="pl-measure">
        <div className="pl-measure-col">
          <h3 className="pl-h3">What Portfolio Lab can work out</h3>
          <ul>
            {CALCULATED.map((item) => (
              <li key={item}>
                <i className="ti ti-check" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pl-measure-col is-limits">
          <h3 className="pl-h3">What it cannot tell, and why</h3>
          <ul>
            {NOT_AVAILABLE.map((item) => (
              <li key={item.title}>
                <i className="ti ti-minus" aria-hidden="true" />
                <span>
                  <strong>{item.title}.</strong> {item.reason}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p className="pl-risk-closing">
        Holding many assets does not automatically make a portfolio diversified.
        What matters is how different the holdings really are, which depends on
        what is inside them.
      </p>
    </section>
  );
}
