import Link from "next/link";
import Container from "@/components/ui/Container";

// Same destinations as the previous Valuation Lab section.
const TOOLS = [
  { href: "/valuation-lab#relative", icon: "ti-percentage", name: "P/E and P/S ratios" },
  { href: "/valuation-lab#dcf", icon: "ti-timeline", name: "Discounted cash flow" },
  { href: "/valuation-lab#scenarios", icon: "ti-arrows-split-2", name: "Bear, Base, and Bull scenarios" },
  { href: "/valuation-lab#sensitivity", icon: "ti-grid-dots", name: "Sensitivity analysis" },
  { href: "/valuation-lab#margin-of-safety", icon: "ti-shield-check", name: "Margin of safety" },
  { href: "/valuation-lab#learning", icon: "ti-school", name: "Valuation learning center" },
];

export default function ValuationFeature() {
  return (
    <section className="py-16 lg:py-[72px]">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="max-w-[620px]">
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
              What is a business really worth?
            </h2>
            <p className="mt-3.5 text-[17px] leading-relaxed text-ink-muted">
              Explore ratios, discounted cash flow and scenarios using your own
              numbers and assumptions.
            </p>
          </div>
          <Link
            href="/valuation-lab"
            className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-hover"
          >
            Open Valuation Lab
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-3">
          {TOOLS.map((tool) => (
            <li key={tool.href} className="border-b border-r border-border">
              <Link
                href={tool.href}
                className="group flex min-h-[148px] flex-col justify-between p-6 transition-colors hover:bg-surface"
              >
                <span className="flex items-start justify-between">
                  <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-[22px] text-primary">
                    <i className={`ti ${tool.icon}`} aria-hidden="true" />
                  </span>
                  <i
                    className="ti ti-arrow-up-right text-lg text-ink-muted transition-colors group-hover:text-primary"
                    aria-hidden="true"
                  />
                </span>
                <span className="mt-8 text-[17px] font-semibold leading-snug text-ink">
                  {tool.name}
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-5 text-[13px] text-ink-muted">
          Educational tool. Uses your own inputs, not live market data.
        </p>
      </Container>
    </section>
  );
}
