export default function ValuationHero() {
  return (
    <header className="vl-hero">
      <p className="vl-eyebrow">VALUATION LAB</p>

      <h1>
        What Is a Business <em>Really Worth?</em>
      </h1>

      <p className="vl-hero-lead">
        Explore financial ratios and discounted cash flow using your own
        financial data and assumptions. Understand how growth, risk, and
        valuation methods influence estimated business value.
      </p>

      <div className="vl-hero-actions">
        <a href="#workspace" className="vl-btn vl-btn-primary">
          Start Valuation
          <i className="ti ti-arrow-down" aria-hidden="true" />
        </a>

        <a href="#methods" className="vl-btn vl-btn-ghost">
          Explore Valuation Methods
        </a>
      </div>

      <p className="vl-credit">
        Educational tool only, not investment advice. Every figure is entered
        by you and is not verified by Scope.
      </p>
    </header>
  );
}