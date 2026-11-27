import Link from "next/link";
import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import BusinessModelRow from "@/components/business-models/BusinessModelRow";
import "@/components/business-models/business-models-list.css";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";

export const metadata: Metadata = {
  title: "Business Models | Scope",
  description:
    "Understand how different types of businesses work, how they make money, and what challenges they face.",
};

const HERO_TILE_COUNT = 5;

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
          <div className="bmh-panel">
            <div className="bmh-copy">
              <h1 className="bmh-title">
                Business <em>Models</em>
              </h1>
              <p className="bmh-lead">
                See how different kinds of businesses make money, grow, and face
                risk.
              </p>

              <Link href="#bm-groups" className="bmh-cta">
                Browse all {MOCK_BUSINESS_MODELS.length} models
                <i className="ti ti-arrow-down" aria-hidden="true" />
              </Link>

              <hr className="bmh-rule" />
              <p className="bmh-tagline">
                How they make money. How they grow. What can go wrong.
              </p>
            </div>

            <div aria-hidden="true" className="bmh-card">
              <div className="bmh-band">
                <span className="bmh-band-title">Featured models</span>
                <span className="bmh-band-count">
                  <span className="bmh-band-number">
                    {MOCK_BUSINESS_MODELS.length}
                  </span>
                  in total
                </span>
              </div>

              <div className="bmh-grid">
                {heroTiles.map((model) => (
                  <div key={model.slug} className="bmh-tile">
                    <span className="bmh-tile-icon">
                      <i className={`ti ${model.icon}`} />
                    </span>
                    <span className="bmh-tile-name">{model.name}</span>
                  </div>
                ))}

                <div className="bmh-tile bmh-tile-more">
                  <span className="bmh-tile-icon">
                    <i className="ti ti-apps" />
                  </span>
                  <span className="bmh-tile-name">+{moreCount} more</span>
                </div>
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
            id={index === 0 ? "bm-groups" : undefined}
            className={`scroll-mt-20 py-16 lg:py-[72px] ${band === "surface" ? "bg-surface" : ""}`}
          >
            <Container>
              <div className="bmg-card">
                <div className="bmg-band">
                  <div className="bmg-band-text">
                    <h2 className="bmg-title">{group.title}</h2>
                    <p className="bmg-description">{group.description}</p>
                  </div>
                  <p className="bmg-count">
                    <span className="bmg-count-number">{models.length}</span>
                    {models.length === 1 ? "business model" : "business models"}
                  </p>
                </div>

                <ul className="bmg-list">
                  {models.map((model) => (
                    <BusinessModelRow
                      key={model.slug}
                      model={model}
                      band={band}
                    />
                  ))}
                </ul>
              </div>
            </Container>
          </section>
        );
      })}

      {/* Closing */}
      <section className="py-16 lg:py-[72px]">
        <Container>
          <div className="bmc-panel">
            <div className="bmc-copy">
              <h2 className="bmc-title">
                See these business models at work in{" "}
                <em>real companies.</em>
              </h2>
              <hr className="bmc-rule" />
              <p className="bmc-note">
                Scope is built for understanding businesses, not for investment
                advice.
              </p>
            </div>

            <div className="bmc-card">
              <div className="bmc-band">Where to go next</div>

              <Link href="/trending" className="bmc-row">
                <span className="bmc-icon">
                  <i className="ti ti-building-skyscraper" aria-hidden="true" />
                </span>
                <span className="bmc-row-text">
                  <span className="bmc-row-title">Explore companies</span>
                  <span className="bmc-row-desc">
                    See how each model shows up in real company pages.
                  </span>
                </span>
                <i className="ti ti-arrow-right bmc-go" aria-hidden="true" />
              </Link>

              <Link href="/7-powers" className="bmc-row">
                <span className="bmc-icon">
                  <i className="ti ti-stack-2" aria-hidden="true" />
                </span>
                <span className="bmc-row-text">
                  <span className="bmc-row-title">Learn the 7 Powers</span>
                  <span className="bmc-row-desc">
                    Understand what gives a business a lasting advantage.
                  </span>
                </span>
                <i className="ti ti-arrow-right bmc-go" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}