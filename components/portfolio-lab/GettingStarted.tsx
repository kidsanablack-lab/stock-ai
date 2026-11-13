import ActionLink from "@/components/ui/ActionLink";
import Card from "@/components/ui/Card";
import PlSection from "./PlSection";

const STEPS = [
  {
    icon: "ti-adjustments-horizontal",
    title: "Build a portfolio",
    text: "Pick assets, set how much goes to each, and see how a hypothetical portfolio is distributed.",
    cta: "Start building",
    href: "#portfolio-builder",
  },
  {
    icon: "ti-books",
    title: "Explore portfolio examples",
    text: "Learn from six educational templates, see their risks, then load one and change it.",
    cta: "Explore templates",
    href: "#portfolio-templates",
  },
  {
    icon: "ti-chart-donut-3",
    title: "Understand your allocation",
    text: "View allocation percentages, allocated amounts, and basic concentration notes.",
    cta: "View portfolio overview",
    href: "#portfolio-overview",
  },
];

export default function GettingStarted() {
  return (
    <PlSection id="getting-started" titleId="pl-start-title" title="Three ways to begin">
      <ul className="grid gap-4 lg:grid-cols-3">
        {STEPS.map((step, index) => (
          <Card as="li" key={step.title} className="flex flex-col">
            <span
              className="grid size-11 place-items-center rounded-2xl bg-primary-soft text-xl text-primary-ink"
              aria-hidden="true"
            >
              <i className={`ti ${step.icon}`} />
            </span>

            <p className="mt-5 text-small text-ink-muted">Step {index + 1}</p>
            <h3 className="mt-1 font-serif text-h4 font-normal text-ink">{step.title}</h3>
            <p className="mt-2 text-note text-ink-muted">{step.text}</p>

            <ActionLink href={step.href} className="mt-auto pt-5">
              {step.cta}
            </ActionLink>
          </Card>
        ))}
      </ul>
    </PlSection>
  );
}
