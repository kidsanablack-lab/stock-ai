import type { Metadata } from "next";
import BusinessModelsClient from "@/components/business-models/BusinessModelsClient";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";
import "./business-models.css";
import { Fraunces } from "next/font/google";

export const metadata: Metadata = {
  title: "Business Models | Scope",
  description:
    "Understand how different types of businesses work, how they make money, and what challenges they face.",
};
const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--bm-serif",
  display: "swap",
});
const HERO_TILE_COUNT = 7;

export default function BusinessModelsPage() {
  const heroTiles = MOCK_BUSINESS_MODELS.slice(0, HERO_TILE_COUNT);
  const moreCount = MOCK_BUSINESS_MODELS.length - HERO_TILE_COUNT;

  return (
    <div className={`bm-shell ${fraunces.variable}`}>
      <section className="bm-hero-split">
        <div>
          <h1>Business Models</h1>
          <p className="bm-hero-split-text">
            See how different kinds of businesses make money, grow, and face
            risk.
          </p>
          <div className="bm-hero-split-count">
            <i className="ti ti-layout-grid" />
            {MOCK_BUSINESS_MODELS.length} business models
          </div>
        </div>

        <div className="bm-hero-tiles" aria-hidden="true">
          {heroTiles.map((model) => (
            <div key={model.slug} className="bm-hero-tile">
                            <div
                className="bm-hero-tile-icon"
                style={{
                  background: model.tone.bg,
                  color: model.tone.accent,
                }}
              >
                <i className={`ti ${model.icon}`} />
              </div>
              <span className="bm-hero-tile-name">{model.name}</span>
            </div>
          ))}

          <div className="bm-hero-tile bm-hero-tile-more">
            <div className="bm-hero-tile-icon">
              <i className="ti ti-apps" />
            </div>
            <span className="bm-hero-tile-name">+{moreCount} more</span>
          </div>
        </div>
      </section>

      <section className={`bm-section ${fraunces.variable}`}>
  <div className="bm-head">
    <div>

      <h2 className="bm-title">Growth-Oriented</h2>

      <p className="bm-lead">
        Businesses that can often grow revenue quickly as their markets
        expand.
      </p>
    </div>
  </div>

  <BusinessModelsClient
    models={MOCK_BUSINESS_MODELS.filter((model) =>
      ["ai", "saas", "cloud", "cybersecurity", "semiconductors"].includes(
        model.slug,
      ),
    )}
  />

  <div className="bm-head" style={{ marginTop: 48 }}>
    <div>

      <h2 className="bm-title">Cash Flow / Income</h2>

      <p className="bm-lead">
        Businesses that often focus on generating steady cash flow from
        established operations.
      </p>
    </div>
  </div>

  <BusinessModelsClient
    models={MOCK_BUSINESS_MODELS.filter((model) =>
      ["banking", "insurance", "telecom", "energy"].includes(model.slug),
    )}
  />

  <div className="bm-head" style={{ marginTop: 48 }}>
  <div>

    <h2 className="bm-title">Capital-Intensive</h2>

    <p className="bm-lead">
      Businesses that require significant investment in physical assets,
      infrastructure, or specialized equipment.
    </p>
  </div>
</div>

<BusinessModelsClient
  models={MOCK_BUSINESS_MODELS.filter((model) =>
    [
      "hardware",
      "manufacturing",
      "real-estate",
      "defense-aerospace",
      "biotech-pharma",
    ].includes(model.slug),
  )}
/>

<div className="bm-head" style={{ marginTop: 48 }}>
  <div>

    <h2 className="bm-title">Platform / Network</h2>

    <p className="bm-lead">
      Businesses that connect users, customers, or businesses and become more
      valuable as participation grows.
    </p>
  </div>
</div>

<BusinessModelsClient
  models={MOCK_BUSINESS_MODELS.filter((model) =>
    ["payments", "marketplace", "advertising", "financial-services"].includes(
      model.slug,
    ),
  )}
/>

<div className="bm-head" style={{ marginTop: 48 }}>
  <div>

    <h2 className="bm-title">Consumer / Demand-Driven</h2>

    <p className="bm-lead">
      Businesses that depend heavily on consumer demand, spending, and
      changing customer preferences.
    </p>
  </div>
</div>

<BusinessModelsClient
  models={MOCK_BUSINESS_MODELS.filter((model) =>
    ["e-commerce", "gaming", "consumer-brands", "healthcare", "logistics"].includes(
      model.slug,
    ),
  )}
/>
</section>
    </div>
  );
}