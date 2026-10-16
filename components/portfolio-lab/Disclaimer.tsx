export default function Disclaimer() {
  return (
    <aside className="pl-disclaimer" aria-labelledby="pl-disclaimer-title">
      <i className="ti ti-info-circle" aria-hidden="true" />

      <div>
        <h2 id="pl-disclaimer-title">Please read</h2>

        <p>
          Scope Portfolio Lab is an educational planning tool, not personalized
          investment advice. Portfolio examples and calculations are
          hypothetical and do not guarantee future results. Actual investment
          outcomes may differ significantly. The tool does not execute trades or
          connect to brokerage accounts.
        </p>

        <p>
          Example portfolios are teaching examples, not recommendations, and
          none is best for everyone. Currency selection only changes how
          amounts are displayed. No exchange rates, prices, or fund holdings
          are used.
        </p>
      </div>
    </aside>
  );
}
