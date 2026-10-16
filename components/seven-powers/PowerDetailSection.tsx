import type { CSSProperties, ReactNode } from "react";
import { POWERS } from "@/lib/seven-powers/powers";
import { POWER_DETAILS } from "@/lib/seven-powers/details";
import {
  BrandingVisual,
  CorneredVisual,
  CounterPositioningVisual,
  NetworkVisual,
  ProcessVisual,
  ScaleVisual,
  SwitchingVisual,
  VisaParticipants,
} from "./PowerVisuals";
import "./seven-powers-details.css";

// The diagram shown next to "How it works".
const VISUALS: Record<string, ReactNode> = {
  "scale-economies": <ScaleVisual />,
  "network-economies": <NetworkVisual />,
  "counter-positioning": <CounterPositioningVisual />,
  "switching-costs": <SwitchingVisual />,
  branding: <BrandingVisual />,
  "cornered-resource": <CorneredVisual />,
  "process-power": <ProcessVisual />,
};

// Optional extra diagram shown inside the business example.
const EXAMPLE_VISUALS: Record<string, ReactNode> = {
  "network-economies": <VisaParticipants />,
};

export default function PowerDetailSection() {
  return (
    <section
      id="understand-each-power"
      className="sp-section"
      aria-labelledby="sp-detail-title"
    >
      <p className="sp-section-eyebrow">The 7 Powers in detail</p>

      <h2 id="sp-detail-title" className="sp-h2">
        Understand Each Power
      </h2>

      <p className="sp-section-lead">
        Explore how each advantage works, why it matters, and where its
        limits lie.
      </p>

      {POWER_DETAILS.map((detail) => {
        const power = POWERS.find((p) => p.slug === detail.slug);
        if (!power) return null;

        const theme = {
          "--sp-accent": power.accent,
          "--sp-tint": power.tint,
          "--sp-ink": power.ink,
        } as CSSProperties;

        return (
          <article
            key={detail.slug}
            id={detail.slug}
            className="sp-detail"
            style={theme}
            aria-labelledby={`${detail.slug}-title`}
          >
            {/* Header */}
            <header className="sp-d-head">
              <span className="sp-d-number" aria-hidden="true">
                {power.number}
              </span>

              <div>
                <p className="sp-d-kicker">
                  <i className={`ti ${power.icon}`} aria-hidden="true" />
                  Power {power.number} · {power.name}
                </p>

                <h3 id={`${detail.slug}-title`} className="sp-d-title">
                  {detail.headline}
                </h3>
              </div>
            </header>

            {/* Simple explanation */}
            <div className="sp-d-simple">
              <p className="sp-d-label">In simple terms</p>
              <p className="sp-d-simple-text">{detail.simple}</p>
            </div>

            {/* How it works + diagram */}
            <div className="sp-d-grid">
              <div>
                <h4 className="sp-d-h4">How it works</h4>

                <ol className="sp-steps">
                  {detail.how.map((step, index) => (
                    <li key={step.title} className="sp-step">
                      <span className="sp-step-marker" aria-hidden="true">
                        {index + 1}
                      </span>

                      <div className="sp-step-body">
                        <p className="sp-step-title">{step.title}</p>
                        {step.text && (
                          <p className="sp-step-text">{step.text}</p>
                        )}
                      </div>
                    </li>
                  ))}
                </ol>

                {detail.loops && (
                  <p className="sp-loop">
                    <i className="ti ti-repeat" aria-hidden="true" />
                    The last step can lead back to the first.
                  </p>
                )}

                <p className="sp-d-note">{detail.howNote}</p>
              </div>

              <div className="sp-d-visual">{VISUALS[detail.slug]}</div>
            </div>

            {/* Optional extra block (for example, types of cornered resources) */}
            {detail.extra && (
              <div className="sp-extra">
                <h4 className="sp-d-h4">{detail.extra.title}</h4>

                <ul className="sp-points">
                  {detail.extra.items.map((item) => (
                    <li key={item.title} className="sp-point">
                      <span className="sp-point-icon" aria-hidden="true">
                        <i className={`ti ${item.icon}`} />
                      </span>

                      <div>
                        <p className="sp-point-title">{item.title}</p>
                        <p className="sp-point-text">{item.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Business example */}
            <div className="sp-example">
              <p className="sp-d-label">Business example</p>
              <h4 className="sp-example-company">{detail.example.company}</h4>
              <p className="sp-example-intro">{detail.example.intro}</p>

              {EXAMPLE_VISUALS[detail.slug]}

              <ul className="sp-points">
                {detail.example.points.map((point) => (
                  <li key={point.title} className="sp-point">
                    <span className="sp-point-icon" aria-hidden="true">
                      <i className={`ti ${point.icon}`} />
                    </span>

                    <div>
                      <p className="sp-point-title">{point.title}</p>
                      <p className="sp-point-text">{point.text}</p>
                    </div>
                  </li>
                ))}
              </ul>

              {detail.example.caution && (
                <p className="sp-example-caution">
                  <i className="ti ti-info-circle" aria-hidden="true" />
                  {detail.example.caution}
                </p>
              )}

              <p className="sp-sources">
                <span>Sources:</span>
                {detail.example.sources.map((source) => (
                  <a
                    key={source.url}
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {source.label}
                  </a>
                ))}
              </p>
            </div>

            {/* Why it matters + limitations */}
            <div className="sp-d-split">
              <div className="sp-panel sp-panel-why">
                <h4 className="sp-d-h4">
                  <i className="ti ti-circle-check" aria-hidden="true" />
                  Why it matters
                </h4>

                <ul>
                  {detail.why.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="sp-panel sp-panel-limits">
                <h4 className="sp-d-h4">
                  <i className="ti ti-alert-triangle" aria-hidden="true" />
                  Limitations
                </h4>

                <ul>
                  {detail.limits.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}