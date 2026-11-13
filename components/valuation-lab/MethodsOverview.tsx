const METHODS = [
  {
    href: "#relative",
    icon: "ti-percentage",
    name: "P/E Ratio",
    text: "Compares the share price with the earnings each share produced.",
    formula: "P/E = share price ÷ EPS",
    cta: "Open the P/E calculator",
  },
  {
    href: "#relative",
    icon: "ti-receipt",
    name: "P/S Ratio",
    text: "Compares the value of the whole company with its revenue.",
    formula: "P/S = market capitalization ÷ revenue",
    cta: "Open the P/S calculator",
  },
  {
    href: "#dcf",
    icon: "ti-timeline",
    name: "Discounted Cash Flow",
    text: "Estimates what future cash flows could be worth today, based on your assumptions.",
    formula: "Value today = future cash ÷ (1 + rate)ⁿ",
    cta: "Open the DCF model",
  },
];

export default function MethodsOverview() {
  return (
    <section
      id="methods"
      className="vl-section"
      aria-labelledby="vl-methods-title"
    >
      <p className="vl-section-eyebrow">The methods</p>

      <h2 id="vl-methods-title" className="vl-h2">
        Each method looks at value from a different side
      </h2>

      <p className="vl-section-lead">
        No single method gives the answer. Each one depends on the numbers you
        give it.
      </p>

      <ul className="vl-methods">
        {METHODS.map((method) => (
          <li key={method.name}>
            <a href={method.href} className="vl-method">
              <span className="vl-method-icon" aria-hidden="true">
                <i className={`ti ${method.icon}`} />
              </span>
              <span className="vl-method-name">{method.name}</span>
              <span className="vl-method-text">{method.text}</span>
              <span className="vl-method-formula">{method.formula}</span>
              <span className="vl-method-cta">
                {method.cta}
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}