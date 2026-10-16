const STEPS = [
  {
    icon: "ti-adjustments-horizontal",
    title: "Build a Portfolio",
    text: "Pick assets, set how much goes to each, and see how a hypothetical portfolio is distributed.",
    cta: "Start Building",
    href: "#portfolio-builder",
  },
  {
    icon: "ti-books",
    title: "Explore Portfolio Examples",
    text: "Learn from six educational templates, see their risks, then load one and change it.",
    cta: "Explore Templates",
    href: "#portfolio-templates",
  },
  {
    icon: "ti-chart-donut-3",
    title: "Understand Your Allocation",
    text: "View allocation percentages, allocated amounts, and basic concentration notes.",
    cta: "View Portfolio Overview",
    href: "#portfolio-overview",
  },
];

export default function GettingStarted() {
  return (
    <section className="pl-section pl-start" aria-labelledby="pl-start-title">
      <p className="pl-eyebrow">Getting started</p>
      <h2 id="pl-start-title" className="pl-h2">
        Three ways to begin
      </h2>

      <ul className="pl-steps">
        {STEPS.map((step, index) => (
          <li key={step.title} className="pl-step">
            <span className="pl-step-icon" aria-hidden="true">
              <i className={`ti ${step.icon}`} />
            </span>

            <p className="pl-step-number">0{index + 1}</p>
            <h3 className="pl-step-title">{step.title}</h3>
            <p className="pl-step-text">{step.text}</p>

            <a href={step.href} className="pl-step-link">
              {step.cta}
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
