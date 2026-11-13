/**
 * Hero with a static example card. Every number in the card is invented and
 * labelled "Hypothetical example". The card does not read the form or any
 * calculation. Bar positions use a $70 to $160 scale:
 *   $80.31 -> 11.5%, $150.81 -> 78.3% wide, $100.00 -> 33.3%, $116.04 -> 51.2%.
 */
export default function ValuationHero() {
  return (
    <header className="vl-hero">
      <div className="vl-hero-main">
        <p className="vl-eyebrow">VALUATION LAB</p>

        <h1>What a business is worth depends on the assumptions you choose</h1>

        <p className="vl-hero-lead">
          Enter your own numbers and see how financial ratios and discounted
          cash flow (DCF) turn assumptions into an estimated value. DCF
          estimates what a company&rsquo;s future cash could be worth today.
          Every step is shown, so you can check it.
        </p>

        <div className="vl-hero-actions">
          <a href="#workspace" className="vl-btn vl-btn-primary">
            Start a valuation
            <i className="ti ti-arrow-down" aria-hidden="true" />
          </a>

          <a href="#methods" className="vl-btn vl-btn-ghost">
            See the three methods
          </a>
        </div>

        <p className="vl-credit">
          Educational tool, not investment advice. Every number is entered by
          you and is not checked by Scope.
        </p>
      </div>

      <aside className="vl-hero-card" aria-label="Hypothetical example">
        <div className="vl-hero-card-head">
          <span className="vl-chip">Hypothetical example</span>
          <span className="vl-hero-card-name">Company A</span>
        </div>

        <p className="vl-hero-card-label">Estimated value per share</p>
        <p className="vl-hero-card-value">$116.04</p>
        <p className="vl-hero-card-delta">
          {/* Swap for the shared DeltaPill component if it fits here. */}
          <span className="vl-delta">▲ +16.0%</span> compared with the $100.00
          price entered
        </p>

        <figure className="vl-hero-fig">
          <div
            role="img"
            aria-label="Hypothetical Company A: estimated values from $80.31 to $150.81 per share across three scenarios, base case $116.04, against an entered price of $100.00."
            className="vl-range"
          >
            <span className="vl-range-track" />
            <span
              className="vl-range-bar"
              style={{ left: "11.5%", width: "78.3%" }}
            />
            <span className="vl-range-price" style={{ left: "33.3%" }} />
            <span className="vl-range-base" style={{ left: "51.2%" }} />
          </div>
          <figcaption>
            The bar spans $80.31 to $150.81 across three scenarios. The ring is
            the base case. The dashed line is the $100.00 price entered. This
            range is not a price target. Source: hypothetical example.
          </figcaption>
        </figure>
      </aside>
    </header>
  );
}