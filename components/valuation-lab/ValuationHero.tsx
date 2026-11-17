/**
 * Hero, "number first" layout: centered headline and buttons, then a wide
 * example card. Every number in the card is invented and labelled
 * "Hypothetical example". The card does not read the form or any calculation.
 * Bar positions use a $70 to $160 scale:
 *   $80.31 -> 11.5%, $150.81 -> 89.8% (bar is 78.3% wide),
 *   $100.00 -> 33.3%, $116.04 -> 51.2%.
 */
export default function ValuationHero() {
  return (
    <header className="vl-hero">
      <h1>
        What a business is worth depends on{" "}
        <em>the assumptions you choose</em>
      </h1>

      <p className="vl-hero-lead">
        Enter your own numbers and see how financial ratios and discounted cash
        flow (DCF) turn assumptions into an estimated value. DCF estimates what
        a company&rsquo;s future cash could be worth today. Every step is
        shown, so you can check it.
      </p>

      <div className="vl-hero-actions">
        <a href="#workspace" className="vl-btn vl-btn-solid">
          Start a valuation
          <i className="ti ti-arrow-down" aria-hidden="true" />
        </a>

        <a href="#methods" className="vl-btn vl-btn-line">
          See the three methods
        </a>
      </div>

      <aside className="vl-hero-card" aria-label="Hypothetical example">
        <div className="vl-hero-card-head">
          <span className="vl-chip">Hypothetical example</span>
          <span className="vl-hero-card-name">Company A</span>
        </div>

        <figure className="vl-hero-fig">
          <div className="vl-hero-card-body">
            <div className="vl-hero-card-main">
              <p className="vl-hero-card-label">Estimated value per share</p>
              <p className="vl-hero-card-value">$116.04</p>
              <p className="vl-hero-card-delta">
                {/* Swap for the shared DeltaPill component if it fits here. */}
                <span className="vl-delta">▲ +16.0%</span> compared with the
                $100.00 price entered
              </p>
            </div>

            <div className="vl-range-wrap">
              <div className="vl-range-top" aria-hidden="true">
                <span className="vl-range-tag" style={{ left: "33.3%" }}>
                  Price entered $100.00
                </span>
              </div>

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

              <div className="vl-range-scale" aria-hidden="true">
                <span className="vl-range-tick" style={{ left: "11.5%" }}>
                  <span className="vl-range-num">$80.31</span>
                  Low
                </span>
                <span className="vl-range-tick" style={{ left: "51.2%" }}>
                  <span className="vl-range-num">$116.04</span>
                  Base case
                </span>
                <span className="vl-range-tick" style={{ left: "89.8%" }}>
                  <span className="vl-range-num">$150.81</span>
                  High
                </span>
              </div>
            </div>
          </div>

          <figcaption>
            The bar spans $80.31 to $150.81 across three scenarios. The ring is
            the base case. The dashed line is the $100.00 price entered. This
            range is not a price target. Source: hypothetical example.
          </figcaption>
        </figure>
      </aside>

      <p className="vl-credit">
        Educational tool, not investment advice. Every number is entered by you
        and is not checked by Scope.
      </p>
    </header>
  );
}