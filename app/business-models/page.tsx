import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import BusinessModelRow from "@/components/business-models/BusinessModelRow";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";

export const metadata: Metadata = {
  title: "Business Models | Scope",
  description:
    "Understand how different types of businesses work, how they make money, and what challenges they face.",
};

const HERO_TILE_COUNT = 7;

type Group = {
  key: string;
  title: string;
  description: string;
  slugs: string[];
};

const GROUPS: Group[] = [
  {
    key: "growth",
    title: "Growth-Oriented",
    description:
      "Businesses that can often grow revenue quickly as their markets expand.",
    slugs: ["ai", "saas", "cloud", "cybersecurity", "semiconductors"],
  },
  {
    key: "cash-flow",
    title: "Cash Flow / Income",
    description:
      "Businesses that often focus on generating steady cash flow from established operations.",
    slugs: ["banking", "insurance", "telecom", "energy"],
  },
  {
    key: "capital",
    title: "Capital-Intensive",
    description:
      "Businesses that require significant investment in physical assets, infrastructure, or specialized equipment.",
    slugs: [
      "hardware",
      "manufacturing",
      "real-estate",
      "defense-aerospace",
      "biotech-pharma",
    ],
  },
  {
    key: "platform",
    title: "Platform / Network",
    description:
      "Businesses that connect users, customers, or businesses and become more valuable as participation grows.",
    slugs: ["payments", "marketplace", "advertising", "financial-services"],
  },
  {
    key: "consumer",
    title: "Consumer / Demand-Driven",
    description:
      "Businesses that depend heavily on consumer demand, spending, and changing customer preferences.",
    slugs: [
      "e-commerce",
      "gaming",
      "consumer-brands",
      "healthcare",
      "logistics",
    ],
  },
];

export default function BusinessModelsPage() {
  const heroTiles = MOCK_BUSINESS_MODELS.slice(0, HERO_TILE_COUNT);
  const moreCount = MOCK_BUSINESS_MODELS.length - HERO_TILE_COUNT;

  return (
    <>
      {/* Hero */}
      <section className="pb-16 pt-10 lg:pb-[72px]">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)]">
            <div>
              <SectionHeading
                as="h1"
                title="Business Models"
                description="See how different kinds of businesses make money, grow, and face risk."
                className="mb-5"
              />
              <p className="flex items-center gap-2 text-[14px] tabular-nums text-ink-muted">
                <i className="ti ti-layout-grid" aria-hidden="true" />
                {MOCK_BUSINESS_MODELS.length} business models
              </p>
            </div>

            <div
              aria-hidden="true"
              className="hidden grid-cols-4 gap-3 rounded-[24px] border border-border bg-surface p-5 lg:grid"
            >
              {heroTiles.map((model) => (
                <div
                  key={model.slug}
                  className="flex min-w-0 flex-col items-center gap-2.5 rounded-2xl border border-border bg-white px-1.5 pb-3 pt-3.5"
                >
                  <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-primary-soft text-primary-ink">
                    <i className={`ti ${model.icon} text-[19px]`} />
                  </span>
                  <span className="max-w-full truncate text-[12.5px] font-medium text-ink">
                    {model.name}
                  </span>
                </div>
              ))}

              <div className="flex min-w-0 flex-col items-center gap-2.5 rounded-2xl border border-primary bg-primary px-1.5 pb-3 pt-3.5">
                <span className="grid h-9 w-9 place-items-center rounded-[11px] bg-white/20 text-white">
                  <i className="ti ti-apps text-[19px]" />
                </span>
                <span className="max-w-full truncate text-[12.5px] font-medium text-white">
                  +{moreCount} more
                </span>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Groups: alternate surface and white bands */}
      {GROUPS.map((group, index) => {
        const band = index % 2 === 0 ? "surface" : "white";
        const models = MOCK_BUSINESS_MODELS.filter((model) =>
          group.slugs.includes(model.slug),
        );

        return (
          <section
            key={group.key}
            className={`py-16 lg:py-[72px] ${band === "surface" ? "bg-surface" : ""}`}
          >
            <Container>
              <SectionHeading
                title={group.title}
                description={group.description}
                className="mb-8"
              />

              <ul className="border-t border-border">
                {models.map((model) => (
                  <BusinessModelRow
                    key={model.slug}
                    model={model}
                    band={band}
                  />
                ))}
              </ul>
            </Container>
          </section>
                );
      })}

      {/* Closing */}
      <section className="py-16 lg:py-[72px]">
        <Container>
          <div className="rounded-[28px] bg-ink px-6 py-14 text-center sm:px-10 lg:py-[72px]">
            <h2 className="mx-auto max-w-[640px] font-serif text-[clamp(30px,4.4vw,52px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
              See these business models at work in real companies.
            </h2>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                href="/trending"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-white px-[22px] text-[15px] font-semibold text-ink transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Explore companies
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>

              <Link
                href="/7-powers"
                className="inline-flex h-12 w-full items-center justify-center rounded-xl border border-white/30 px-[22px] text-[15px] font-semibold text-white transition-colors hover:border-white hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
              >
                Learn the 7 Powers
              </Link>
            </div>

            <p className="mx-auto mt-8 max-w-[520px] text-[13px] leading-relaxed text-white/70">
              Scope is built for understanding businesses, not for investment
              advice.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}