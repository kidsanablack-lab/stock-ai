import type { CSSProperties } from "react";
import { POWERS, SECTION_IDS } from "@/lib/seven-powers/powers";

export default function PowerOverview() {
  return (
    <section
      id={SECTION_IDS.explore}
      className="sp-section"
      aria-labelledby="sp-explore-title"
    >
      <p className="sp-section-eyebrow">The framework</p>

      <h2 id="sp-explore-title" className="sp-h2">
        Explore the 7 Powers
      </h2>

      <p className="sp-section-lead">
        Seven different mechanisms can help explain why some businesses are
        difficult to compete against.
      </p>

      <ul className="sp-cards">
        {POWERS.map((power) => {
          const theme = {
            "--sp-accent": power.accent,
            "--sp-tint": power.tint,
            "--sp-ink": power.ink,
          } as CSSProperties;

          return (
            <li key={power.slug}>
              <a
                href={`#${power.slug}`}
                className="sp-card"
                style={theme}
                aria-label={`${power.name}: explore this power`}
              >
                <div className="sp-card-top">
                  <span className="sp-card-number" aria-hidden="true">
                    {power.number}
                  </span>

                  <span className="sp-card-icon" aria-hidden="true">
                    <i className={`ti ${power.icon}`} />
                  </span>
                </div>

                <h3 className="sp-card-name">{power.name}</h3>
                <p className="sp-card-desc">{power.short}</p>

                <span className="sp-card-foot" aria-hidden="true">
                  Explore this power
                  <i className="ti ti-arrow-right" />
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}