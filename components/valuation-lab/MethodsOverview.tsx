/**
 * Methods overview: one tinted panel with two groups, so it is clear that
 * P/E and P/S are financial ratios and DCF is a different kind of method.
 * The anchors (#relative, #dcf) point at the workspace sections.
 */
const GROUPS = [
  {
    id: "ratios",
    label: "Financial ratios",
    wide: true,
    methods: [
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
    ],
  },
  {
    id: "dcf",
    label: "Discounted cash flow",
    wide: false,
    methods: [
      {
        href: "#dcf",
        icon: "ti-timeline",
        name: "Discounted Cash Flow",
        text: "Estimates what future cash flows could be worth today, based on your assumptions.",
        formula: "Value today = future cash ÷ (1 + rate)ⁿ",
        cta: "Open the DCF model",
      },
    ],
  },
];

export default function MethodsOverview() {
  return (
    <section
      id="methods"
      className="vl-section"
      aria-labelledby="vl-methods-title"
    >
      <h2 id="vl-methods-title" className="vl-h2">
        Each method looks at value from a different side
      </h2>

      <p className="vl-section-lead">
        No single method gives the answer. Each one depends on the numbers you
        give it.
      </p>

      <div className="vl-methods-panel">
        {GROUPS.map((group) => (
          <div
            key={group.id}
            className={
              group.wide
                ? "vl-methods-group vl-methods-group-wide"
                : "vl-methods-group"
            }
          >
            <h3 className="vl-methods-group-label">{group.label}</h3>

            <ul className="vl-methods">
              {group.methods.map((method) => (
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
          </div>
        ))}
      </div>
    </section>
  );
}