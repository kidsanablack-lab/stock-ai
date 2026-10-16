import type { CSSProperties } from "react";
import { POWERS } from "@/lib/seven-powers/powers";
import { COMPARISONS, type CompareSide } from "@/lib/seven-powers/compare";
import "./seven-powers-compare.css";

function Side({ side }: { side: CompareSide }) {
  const power = POWERS.find((p) => p.slug === side.slug);
  if (!power) return null;

  const theme = {
    "--sp-accent": power.accent,
    "--sp-tint": power.tint,
    "--sp-ink": power.ink,
  } as CSSProperties;

  return (
    <div className="sp-side" style={theme}>
      <p className="sp-side-chip">
        <span className="sp-side-number">{power.number}</span>
        {power.name}
      </p>

      <p className="sp-side-label">Focus</p>
      <p className="sp-side-focus">{side.focus}</p>
      <p className="sp-side-text">{side.text}</p>
    </div>
  );
}

function nameOf(slug: CompareSide["slug"]) {
  return POWERS.find((p) => p.slug === slug)?.name ?? slug;
}

export default function PowerComparison() {
  return (
    <section
      id="compare-powers"
      className="sp-section"
      aria-labelledby="sp-compare-title"
    >
      <p className="sp-section-eyebrow">Compare the powers</p>

      <h2 id="sp-compare-title" className="sp-h2">
        Understand the Differences
      </h2>

      <p className="sp-section-lead">
        Some competitive advantages can look similar on the surface. The key
        is understanding the mechanism behind each one.
      </p>

      <p className="sp-neutral">
        <i className="ti ti-scale" aria-hidden="true" />
        Neither side is better than the other. The comparison only shows
        what each mechanism actually explains.
      </p>

      <div className="sp-compares">
        {COMPARISONS.map((comparison) => (
          <article key={comparison.id} className="sp-compare">
            <h3 className="sp-compare-title">
              {nameOf(comparison.left.slug)}
              <span> vs. </span>
              {nameOf(comparison.right.slug)}
            </h3>

            <div className="sp-compare-sides">
              <Side side={comparison.left} />

              <span className="sp-vs" aria-hidden="true">
                vs
              </span>

              <Side side={comparison.right} />
            </div>

            <p className="sp-compare-summary">
              <span className="sp-compare-summary-label">In short</span>
              {comparison.summary}
            </p>

            {comparison.note && (
              <p className="sp-compare-note">
                <i className="ti ti-info-circle" aria-hidden="true" />
                {comparison.note}
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}