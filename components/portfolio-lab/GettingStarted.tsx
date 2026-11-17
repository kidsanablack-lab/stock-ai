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
    <section className="pl-section pl-start2" aria-labelledby="pl-start-title">
      <h2 id="pl-start-title" className="pl-start2-title">
        Three ways to begin
      </h2>

      <ul className="pl-start2-list">
        {STEPS.map((step, index) => (
          <li key={step.title} className="pl-start2-card">
            <div className="pl-start2-band">
              <span className="pl-start2-num">0{index + 1}</span>
              <i
                className={`ti ${step.icon} pl-start2-icon`}
                aria-hidden="true"
              />
            </div>

            <div className="pl-start2-body">
              <h3 className="pl-start2-card-title">{step.title}</h3>
              <p className="pl-start2-text">{step.text}</p>

              <a href={step.href} className="pl-start2-link">
                {step.cta}
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </a>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}