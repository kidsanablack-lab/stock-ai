import Link from "next/link";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";
import { POWERS } from "@/lib/seven-powers/powers";
import { getComparePair, type HomeProfile } from "@/lib/home-data";
import { formatGrowth, formatMoney, toBillions } from "@/lib/home-format";

const FEATURED_MODEL_SLUGS = ["ai", "saas", "cloud", "banking"];
const MODEL_CHIP_COUNT = 7;

// Same destinations as the previous Valuation Lab section.
const VALUATION_TOOLS = [
  { href: "/valuation-lab#relative", icon: "ti-percentage", name: "P/E and P/S ratios" },
  { href: "/valuation-lab#dcf", icon: "ti-timeline", name: "Discounted cash flow" },
  { href: "/valuation-lab#scenarios", icon: "ti-arrows-split-2", name: "Bear, Base, and Bull scenarios" },
  { href: "/valuation-lab#sensitivity", icon: "ti-grid-dots", name: "Sensitivity analysis" },
  { href: "/valuation-lab#margin-of-safety", icon: "ti-shield-check", name: "Margin of safety" },
  { href: "/valuation-lab#learning", icon: "ti-school", name: "Valuation learning center" },
];

const tileLink =
  "inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-primary hover:underline hover:underline-offset-4";

function pct(value: number, max: number) {
  return max > 0 ? Math.min(100, (Math.abs(value) / max) * 100) : 0;
}

export default function ExploreSection({
  profiles,
}: {
  profiles: HomeProfile[];
}) {
  /* Compare tile: real numbers from the two profiles */
  const pair = getComparePair(profiles);

  const compareRows = pair
    ? (() => {
        const [a, b] = pair;
        const revA = toBillions(a.company.overview.revenue);
        const revB = toBillions(b.company.overview.revenue);
        const gA = a.company.overview.revenueYoY.value;
        const gB = b.company.overview.revenueYoY.value;

        return [
          {
            label: "Revenue",
            a: { text: formatMoney(a.company.overview.revenue), width: pct(revA, Math.max(revA, revB)) },
            b: { text: formatMoney(b.company.overview.revenue), width: pct(revB, Math.max(revA, revB)) },
          },
          {
            label: "Revenue growth",
            a: { text: formatGrowth(gA), width: pct(gA, Math.max(Math.abs(gA), Math.abs(gB))) },
            b: { text: formatGrowth(gB), width: pct(gB, Math.max(Math.abs(gA), Math.abs(gB))) },
          },
        ];
      })()
    : [];

  const nameOf = (p: HomeProfile) =>
    p.company.identity.brandName ?? p.company.identity.name;

  /* Business models tile */
  const totalModels = MOCK_BUSINESS_MODELS.length;
  const featured = FEATURED_MODEL_SLUGS.flatMap((slug) => {
    const model = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
    return model ? [model] : [];
  });
  const others = MOCK_BUSINESS_MODELS.filter(
    (m) => !FEATURED_MODEL_SLUGS.includes(m.slug),
  );
  const chips = [...featured, ...others].slice(0, MODEL_CHIP_COUNT);
  const moreCount = totalModels - chips.length;

  return (
    <section id="explore" className="pb-16 pt-6 lg:pb-[72px]">
      <Container>
        <SectionHeading
          title="Five ways to understand a business"
          description="Start with one company, then zoom out to how business models work, what makes some hard to beat, and what a company might be worth."
        />

        <div className="grid gap-4 lg:grid-cols-12">
          {/* Compare */}
          <div className="flex flex-col gap-3.5 rounded-[20px] border border-border p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
              Compare two companies side by side
            </h3>
            <p className="text-[15px] text-ink-muted">
              Revenue, growth, net income and free cash flow, using the same
              numbers from each company profile.
            </p>

            {pair && (
              <div className="mt-1.5 grid grid-cols-2 gap-x-7">
                <p className="pb-1 text-sm font-semibold text-ink">{nameOf(pair[0])}</p>
                <p className="pb-1 text-sm font-semibold text-ink">{nameOf(pair[1])}</p>

                {compareRows.map((row) => (
                  <div key={row.label} className="contents">
                    {[
                      { side: row.a, bar: "bg-ink" },
                      { side: row.b, bar: "bg-primary" },
                    ].map(({ side, bar }, index) => (
                      <div key={index} className="border-t border-border py-3.5">
                        <span className="block text-[12.5px] text-ink-muted">{row.label}</span>
                        <strong className="block font-serif text-[26px] font-medium leading-tight tracking-[-0.02em] tabular-nums text-ink">
                          {side.text}
                        </strong>
                        <span className="mt-2 block h-1.5 overflow-hidden rounded-full bg-border" aria-hidden="true">
                          <span className={`block h-full rounded-full ${bar}`} style={{ width: `${side.width}%` }} />
                        </span>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            )}

            <Link href="/compare" className={tileLink}>
              Start comparing
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          {/* Business models */}
          <div className="flex flex-col gap-3.5 rounded-[20px] bg-surface p-6 sm:p-8 lg:col-span-5">
            <h3 className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
              How do companies actually make money?
            </h3>
            <p className="text-[15px] text-ink-muted">
              {totalModels} business models, from AI to Banking. See how each
              one earns, grows and faces risk.
            </p>

            <div className="flex flex-wrap gap-2">
              {chips.map((model) => (
                <Link
                  key={model.slug}
                  href={`/business-models/${model.slug}`}
                  className="rounded-full border border-border bg-white px-3.5 py-1 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  {model.name}
                </Link>
              ))}
              {moreCount > 0 && (
                <Link
                  href="/business-models"
                  className="rounded-full border border-primary bg-primary px-3.5 py-1 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
                >
                  +{moreCount} more
                </Link>
              )}
            </div>

            <Link href="/business-models" className={`${tileLink} mt-auto`}>
              View all {totalModels}
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>

          {/* 7 Powers */}
          <div className="flex flex-col gap-3.5 rounded-[28px] bg-ink p-6 text-white sm:p-8 lg:col-span-5">
            <h3 className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em]">
              Why are some businesses hard to beat?
            </h3>
            <p className="text-[15px] text-white/75">
              Seven sources of lasting advantage, explained with simple visuals
              and real business examples.
            </p>

            <ul className="gap-x-7 sm:columns-2">
              {POWERS.map((power) => (
                <li key={power.slug} className="break-inside-avoid">
                  <Link
                    href={`/7-powers#${power.slug}`}
                    className="block border-b border-white/15 py-2.5 text-[15.5px] transition-colors hover:text-white/80"
                  >
                    {power.name}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/7-powers"
              className="inline-flex items-center gap-1.5 text-[14.5px] font-semibold text-white hover:underline hover:underline-offset-4"
            >
              Explore the 7 Powers
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
            <p className="text-xs text-white/60">Framework by Hamilton Helmer</p>
          </div>

          {/* Valuation Lab */}
          <div className="flex flex-col gap-3.5 rounded-[20px] border border-border p-6 sm:p-8 lg:col-span-7">
            <h3 className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
              What is a business really worth?
            </h3>
            <p className="text-[15px] text-ink-muted">
              Explore ratios, discounted cash flow and scenarios using your own
              numbers and assumptions.
            </p>

            <ul className="mt-1 border-t border-border">
              {VALUATION_TOOLS.map((tool) => (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className="group flex items-center gap-3 border-b border-border py-2.5 text-[15px] text-ink"
                  >
                    <i className={`ti ${tool.icon} text-lg text-primary`} aria-hidden="true" />
                    <span className="flex-1">{tool.name}</span>
                    <i className="ti ti-arrow-right text-ink-muted transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <Link href="/valuation-lab" className={tileLink}>
                Open Valuation Lab
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>
              <span className="text-[13px] text-ink-muted">
                Educational tool. Uses your own inputs, not live market data.
              </span>
            </div>
          </div>

          {/* Portfolio Lab */}
          <div className="flex flex-wrap items-center justify-between gap-6 rounded-[20px] bg-primary-soft px-6 py-7 sm:px-8 lg:col-span-12">
            <div>
              <h3 className="font-serif text-[26px] font-normal leading-[1.15] tracking-[-0.02em] text-ink">
                Portfolio Lab
              </h3>
              <p className="mt-2 max-w-[560px] text-[15px] text-ink">
                Build a portfolio mix and explore calculators, DCA, projections
                and risk with your own inputs.
              </p>
            </div>
            <Link href="/portfolio-lab" className={tileLink}>
              Open Portfolio Lab
              <i className="ti ti-arrow-right" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
