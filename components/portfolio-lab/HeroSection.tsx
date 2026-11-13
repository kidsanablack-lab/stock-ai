import { buttonClass } from "@/components/ui/Button";
import { HypotheticalTag } from "@/components/ui/Labels";
import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import { categoryColor } from "@/lib/portfolio-lab/categoryColor";
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
  return (
    <svg viewBox="0 0 42 42" className="h-auto w-full max-w-48" aria-hidden="true">
      <circle cx="21" cy="21" r="15.9155" fill="none" className="stroke-border" strokeWidth="5.5" />

      {ILLUSTRATION.map((segment, index) => {
        const before = ILLUSTRATION.slice(0, index).reduce((sum, s) => sum + s.share, 0);
        const dash = segment.share - 1;
        const start = before + 0.5;

        return (
          <circle
            key={segment.id}
            cx="21"
            cy="21"
            r="15.9155"
            fill="none"
            style={{ stroke: categoryColor(segment.id) }}
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
    <header className="on-primary rounded-panel bg-primary p-6 text-white sm:rounded-panel-lg sm:p-12">
      <div className="grid items-center gap-8 lg:grid-cols-5 lg:gap-12">
        <div className="lg:col-span-3">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-small font-semibold">
            <i className="ti ti-chart-donut-3" aria-hidden="true" />
            Investing toolkit
          </p>

          <h1 className="mt-5 max-w-xl font-serif text-page font-normal tracking-title">
            Build your portfolio with confidence.
          </h1>

          <p className="mt-5 max-w-xl text-lead">
            Explore different assets, build your own portfolio, understand investment risk, and
            plan your long-term contributions—all in one place.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#portfolio-builder" className={buttonClass("on-primary", "lg")}>
              Build your portfolio
              <i className="ti ti-arrow-down" aria-hidden="true" />
            </a>

            <a href="#portfolio-templates" className={buttonClass("on-primary-outline", "lg")}>
              Explore portfolio examples
            </a>
          </div>

          <p className="mt-6 font-serif text-body italic">
            Build a portfolio. Understand the risk. Plan for the future.
          </p>
        </div>

        <figure className="lg:col-span-2">
          <div className="flex flex-col items-center gap-5 rounded-3xl bg-white p-5 text-ink sm:p-6">
            <IllustrationRing />

            <ul className="grid w-full gap-2">
              {ILLUSTRATION.map((segment) => (
                <li key={segment.id} className="flex items-center gap-3 text-note">
                  <span
                    className="size-3 shrink-0 rounded-full"
                    style={{ background: categoryColor(segment.id) }}
                    aria-hidden="true"
                  />
                  {CATEGORY_BY_ID[segment.id].label}
                </li>
              ))}
            </ul>

            <figcaption className="flex flex-wrap items-center justify-center gap-2 text-caption text-ink-muted">
              <HypotheticalTag />
              Illustration only. Not a real portfolio.
            </figcaption>
          </div>
        </figure>
      </div>
    </header>
  );
}
