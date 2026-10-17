import Link from "next/link";
import Container from "@/components/ui/Container";

// Copy is based on the Portfolio Lab sections (builder, templates, calculator,
// DCA, projection, risk). Please check it matches the page.
const STEPS = [
  {
    title: "Build a mix",
    body: "Choose categories and weights, or start from a template.",
  },
  {
    title: "Project growth",
    body: "Use the calculator and DCA to see how contributions could grow over time.",
  },
  {
    title: "Check the risk",
    body: "Review how risky your mix may be before you decide anything.",
  },
];

export default function PortfolioFeature() {
  return (
    <section className="pb-16 lg:pb-[72px]">
      <Container>
        <div className="rounded-[28px] bg-primary-soft px-6 py-10 sm:px-12 sm:py-14">
          <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
            <div className="max-w-[620px]">
              <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
                Shape a portfolio, then test it.
              </h2>
              <p className="mt-3.5 text-[17px] leading-relaxed text-ink">
                Portfolio Lab lets you mix assets, project growth and review
                risk, all with your own inputs.
              </p>
            </div>
            <Link
              href="/portfolio-lab"
              className="inline-flex h-12 shrink-0 items-center justify-center gap-2 rounded-xl bg-ink px-[22px] text-[15px] font-semibold text-white transition-colors hover:bg-primary-ink"
            >
              Open Portfolio Lab
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
            {STEPS.map((step, index) => (
              <li key={step.title} className="border-t border-ink/20 pt-5">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-sm font-semibold text-primary">
                  {index + 1}
                </span>
                <h3 className="mt-4 text-lg font-semibold text-ink">
                  {step.title}
                </h3>
                <p className="mt-1.5 max-w-[22em] text-[15px] leading-relaxed text-ink">
                  {step.body}
                </p>
              </li>
            ))}
          </ol>

          <p className="mt-8 text-[13px] text-ink">
            Educational tool. Not investment advice.
          </p>
        </div>
      </Container>
    </section>
  );
}
