"use client";

import { useState } from "react";
import { CATEGORY_BY_ID } from "@/lib/portfolio-lab/categories";
import { TEMPLATES } from "@/lib/portfolio-lab/templates";
import type { PortfolioTemplate } from "@/lib/portfolio-lab/types";

type TemplatesSectionProps = {
  /** True when loading a template would overwrite the user's own edits. */
  confirmNeeded: boolean;
  loadedTemplateId: string | null;
  onUseTemplate: (template: PortfolioTemplate) => void;
};

function TemplateBar({ template }: { template: PortfolioTemplate }) {
  // Quick visual summary. The list below is the accessible equivalent.
  return (
    <div className="pl-tpl2-bar" aria-hidden="true">
      {template.holdings.map((holding, index) => (
        <span
          key={`${holding.name}-${index}`}
          style={{
            flex: holding.percent,
            background: CATEGORY_BY_ID[holding.category].color,
          }}
        />
      ))}
    </div>
  );
}

export default function TemplatesSection({
  confirmNeeded,
  loadedTemplateId,
  onUseTemplate,
}: TemplatesSectionProps) {
  const [pendingId, setPendingId] = useState<string | null>(null);

  function handleUse(template: PortfolioTemplate) {
    if (confirmNeeded) {
      setPendingId(template.id);
      return;
    }

    onUseTemplate(template);
  }

  function handleConfirm(template: PortfolioTemplate) {
    setPendingId(null);
    onUseTemplate(template);
  }

  return (
    <section
      id="portfolio-templates"
      className="pl-section pl-tpl2"
      aria-labelledby="pl-templates-title"
    >
      <h2 id="pl-templates-title" className="pl-tpl2-title">
        Learn from six example portfolios
      </h2>
      <p className="pl-tpl2-lead">
        Each example shows one way of splitting money across asset types, and
        what that split can and cannot tell you. They are teaching examples, not
        recommendations, and none is the best choice for everyone.
      </p>

      <div className="pl-tpl2-grid">
        {TEMPLATES.map((template) => {
          const isLoaded = loadedTemplateId === template.id;
          const isPending = pendingId === template.id;

          return (
            <article key={template.id} className="pl-tpl2-card">
              <header className="pl-tpl2-band">
                <div className="pl-tpl2-band-top">
                  <h3 className="pl-tpl2-name">{template.name}</h3>
                  {isLoaded && (
                    <span className="pl-tpl2-badge">In the builder</span>
                  )}
                </div>

                <p className="pl-tpl2-desc">{template.description}</p>
              </header>

              <div className="pl-tpl2-body">
                <TemplateBar template={template} />

                <ul
                  className="pl-tpl2-list"
                  aria-label={`${template.name} allocation`}
                >
                  {template.holdings.map((holding, index) => (
                    <li key={`${holding.name}-${index}`}>
                      <span
                        className="pl-tpl2-swatch"
                        style={{ background: CATEGORY_BY_ID[holding.category].color }}
                        aria-hidden="true"
                      />
                      <span className="pl-tpl2-hname">{holding.name}</span>
                      <span className="pl-tpl2-pct">{holding.percent}%</span>
                    </li>
                  ))}
                </ul>

                <p className="pl-tpl2-objective">
                  <span>Educational objective</span>
                  {template.objective}
                </p>

                <details className="pl-tpl2-details">
                  <summary>
                    The idea and its limits
                    <i className="ti ti-chevron-down" aria-hidden="true" />
                  </summary>

                  <p>{template.idea}</p>

                  <h4>Main risks and limitations</h4>
                  <ul>
                    {template.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>

                  <p className="pl-tpl2-context">{template.context}</p>
                </details>

                {isPending ? (
                  <div
                    className="pl-tpl2-confirm"
                    role="group"
                    aria-label="Confirm replacing your portfolio"
                  >
                    <p>
                      Replace your current holdings with this example? Your
                      investment amount and currency stay the same.
                    </p>
                    <div className="pl-tpl2-confirm-actions">
                      <button
                        type="button"
                        className="pl-tpl2-btn pl-tpl2-btn-solid"
                        onClick={() => handleConfirm(template)}
                      >
                        Replace holdings
                      </button>
                      <button
                        type="button"
                        className="pl-tpl2-btn"
                        onClick={() => setPendingId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    className="pl-tpl2-btn pl-tpl2-use"
                    onClick={() => handleUse(template)}
                    aria-label={`Use this template: ${template.name}`}
                  >
                    Use This Template
                    <i className="ti ti-arrow-right" aria-hidden="true" />
                  </button>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}