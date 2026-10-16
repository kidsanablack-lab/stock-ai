import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import type { CategoryId } from "@/lib/portfolio-lab/types";

// Decorative illustration. It uses category colors but shows NO numbers,
// so it cannot be mistaken for real data.
const ILLUSTRATION: { id: CategoryId; share: number }[] = [
  { id: "equity-etf", share: 46 },
  { id: "bond-etf", share: 28 },
  { id: "cash", share: 14 },
  { id: "bitcoin", share: 12 },
];

function IllustrationRing() {
  let cumulative = 0;

  return (
    <svg viewBox="0 0 42 42" className="pl-hero-ring" aria-hidden="true">
      <circle cx="21" cy="21" r="15.9155" fill="none" stroke="#eeeeea" strokeWidth="5.5" />

      {ILLUSTRATION.map((segment) => {
        const dash = segment.share - 1;
        const start = cumulative + 0.5;
        cumulative += segment.share;

        return (
          <circle
            key={segment.id}
            cx="21"
            cy="21"
            r="15.9155"
            fill="none"
            stroke={CATEGORY_BY_ID[segment.id].color}
            strokeWidth="5.5"
            pathLength={100}
            strokeDasharray={`${dash} ${100 - dash}`}
            strokeDashoffset={(((25 - start) % 100) + 100) % 100}
          />
        );
      })}
    </svg>
  );
}

export default function HeroSection() {
  return (
    <header className="pl-hero">
      <div className="pl-hero-copy">
        <p className="pl-hero-eyebrow">Investing Toolkit</p>

        <h1>Build Your Portfolio With Confidence.</h1>

        <p className="pl-hero-lead">
          Explore different assets, build your own portfolio, understand
          investment risk, and plan your long-term contributions—all in one
          place.
        </p>

        <div className="pl-hero-actions">
          <a href="#portfolio-builder" className="pl-btn pl-btn-primary pl-btn-lg">
            Build Your Portfolio
            <i className="ti ti-arrow-down" aria-hidden="true" />
          </a>

          <a href="#portfolio-templates" className="pl-btn pl-btn-ghost pl-btn-lg">
            Explore Portfolio Examples
          </a>
        </div>

        <p className="pl-hero-tagline">
          Build a Portfolio. Understand the Risk. Plan for the Future.
        </p>
      </div>

      <figure className="pl-hero-visual">
        <div className="pl-hero-card">
          <IllustrationRing />

          <ul className="pl-hero-legend">
            {ILLUSTRATION.map((segment) => (
              <li key={segment.id}>
                <span
                  className="pl-swatch"
                  style={{ background: CATEGORY_BY_ID[segment.id].color }}
                  aria-hidden="true"
                />
                {CATEGORY_BY_ID[segment.id].label}
              </li>
            ))}
          </ul>
        </div>

        <figcaption>Illustration only. Not a real portfolio.</figcaption>
      </figure>
    </header>
  );
}
