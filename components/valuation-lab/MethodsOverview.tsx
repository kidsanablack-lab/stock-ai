const METHODS = [
  {
    href: "#relative",
    icon: "ti-percentage",
    name: "P/E Ratio",
    text: "Compares the share price with the earnings each share produced.",
  },
  {
    href: "#relative",
    icon: "ti-receipt",
    name: "P/S Ratio",
    text: "Compares the value of the whole company with its revenue.",
  },
  {
    href: "#dcf",
    icon: "ti-timeline",
    name: "Discounted Cash Flow",
    text: "Estimates what future cash flows could be worth today, based on your assumptions.",
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
        Three Ways to Look at Value
      </h2>

      <p className="vl-section-lead">
        No single method gives the answer. Each one shows a different side of
        a business, and each depends on the numbers you give it.
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
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}