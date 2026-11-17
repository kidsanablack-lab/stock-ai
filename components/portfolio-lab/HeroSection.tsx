import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import type { CategoryId } from "@/lib/portfolio-lab/types";

// Decorative illustration of a HYPOTHETICAL portfolio. It is labelled
// "Hypothetical example" on the card and is not real data.
const ILLUSTRATION: { id: CategoryId; share: number; color: string }[] = [
  { id: "equity-etf", share: 46, color: "var(--cat-1)" },
  { id: "bond-etf", share: 28, color: "var(--cat-2)" },
  { id: "cash", share: 14, color: "var(--cat-3)" },
  { id: "bitcoin", share: 12, color: "var(--cat-4)" },
];

export default function HeroSection() {
  return (
    <header className="pl-hero2">
      <div className="pl-hero2-copy">
        <h1>
          Build Your Portfolio <em>With Confidence.</em>
        </h1>

        <p className="pl-hero2-lead">
          Explore different assets, build your own portfolio, understand
          investment risk, and plan your long-term contributions—all in one
          place.
        </p>

        <div className="pl-hero2-actions">
          <a
            href="#portfolio-builder"
            className="pl-hero2-btn pl-hero2-btn-primary"
          >
            Build Your Portfolio
            <i className="ti ti-arrow-down" aria-hidden="true" />
          </a>

          <a
            href="#portfolio-templates"
            className="pl-hero2-btn pl-hero2-btn-ghost"
          >
            Explore Portfolio Examples
          </a>
        </div>

        <p className="pl-hero2-tagline">
          Build a Portfolio. Understand the Risk. Plan for the Future.
        </p>
      </div>

      <figure className="pl-hero2-visual">
        <div className="pl-hero2-card">
          <div className="pl-hero2-band">
            <div className="pl-hero2-band-head">
              <span className="pl-hero2-card-title">Example portfolio</span>
              <span className="pl-hero2-badge">Hypothetical example</span>
            </div>

            <div className="pl-hero2-count">
              <span className="pl-hero2-count-num">{ILLUSTRATION.length}</span>
              asset classes
            </div>
          </div>

          <ul className="pl-hero2-bars">
            {ILLUSTRATION.map((segment) => (
              <li key={segment.id}>
                <div className="pl-hero2-bar-label">
                  <span
                    className="pl-hero2-swatch"
                    style={{ background: segment.color }}
                    aria-hidden="true"
                  />
                  {CATEGORY_BY_ID[segment.id].label}
                </div>

                <div className="pl-hero2-track" aria-hidden="true">
                  <div
                    className="pl-hero2-fill"
                    style={{ width: `${segment.share}%`, background: segment.color }}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>

        <figcaption>Illustration only. Not a real portfolio.</figcaption>
      </figure>
    </header>
  );
}