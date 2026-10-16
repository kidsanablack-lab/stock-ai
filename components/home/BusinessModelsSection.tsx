import Link from "next/link";
import type { CSSProperties } from "react";
import { Fraunces } from "next/font/google";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";


const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--bm-serif",
  display: "swap",
});

// Which models get a full card on the home page (in this order).
const FEATURED_SLUGS = ["ai", "saas", "cloud", "banking"];

// How many of the remaining models are shown as small chips.
const CHIP_COUNT = 7;

export default function BusinessModelsSection() {
  const total = MOCK_BUSINESS_MODELS.length;

  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const model = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
    return model ? [model] : [];
  });

  const others = MOCK_BUSINESS_MODELS.filter(
    (m) => !FEATURED_SLUGS.includes(m.slug),
  );
  const chips = others.slice(0, CHIP_COUNT);
  const moreCount = others.length - chips.length;

  return (
    <section className={`bmh-section ${fraunces.variable}`}>
      <div className="bmh-band">
        <div className="bmh-head">
          <div>
            <div className="bmh-eyebrow">
              Business models
              <span className="bmh-new">New</span>
            </div>

            <h2 className="bmh-title">
              How do companies actually make money?
            </h2>

            <p className="bmh-lead">
              Explore {total} business models, from AI to Banking, and see
              how each one earns, grows, and faces risk.
            </p>
          </div>

          <Link href="/business-models" className="bmh-btn bmh-btn-desktop">
            View all {total}
            <i className="ti ti-arrow-right" />
          </Link>
        </div>

        <div className="bmh-row">
          {featured.map((model) => {
            const theme = {
              "--bm-accent": model.tone.accent,
              "--bm-tint": model.tone.bg,
            } as CSSProperties;

            return (
              <Link
                key={model.slug}
                href={`/business-models/${model.slug}`}
                className="bmh-card"
                style={theme}
              >
                <div className="bmh-card-top">
                  <div className="bmh-card-icon">
                    <i className={`ti ${model.icon}`} />
                  </div>

                  <div className="bmh-card-go">
                    <i className="ti ti-arrow-up-right" />
                  </div>
                </div>

                <h3 className="bmh-card-name">{model.name}</h3>

                <p className="bmh-card-desc">{model.description}</p>
              </Link>
            );
          })}
        </div>

        <div className="bmh-also">
          <span className="bmh-also-label">Also explore</span>

          {chips.map((model) => (
            <Link
              key={model.slug}
              href={`/business-models/${model.slug}`}
              className="bmh-pill"
            >
              {model.name}
            </Link>
          ))}

          {moreCount > 0 && (
            <Link href="/business-models" className="bmh-pill is-more">
              +{moreCount} more
            </Link>
          )}
        </div>

        <Link href="/business-models" className="bmh-btn bmh-btn-mobile">
          View all {total}
          <i className="ti ti-arrow-right" />
        </Link>
      </div>
    </section>
  );
}