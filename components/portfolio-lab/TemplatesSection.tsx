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
    <div className="pl-tbar" aria-hidden="true">
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
      className="pl-section"
      aria-labelledby="pl-templates-title"
    >
      <p className="pl-eyebrow">Portfolio examples</p>
      <h2 id="pl-templates-title" className="pl-h2">
        Learn from six example portfolios
      </h2>
      <p className="pl-lead">
        Each example shows one way of splitting money across asset types, and
        what that split can and cannot tell you. They are teaching examples, not
        recommendations, and none is the best choice for everyone.
      </p>

      <div className="pl-templates">
        {TEMPLATES.map((template) => {
          const isLoaded = loadedTemplateId === template.id;
          const isPending = pendingId === template.id;

          return (
            <article key={template.id} className="pl-template">
              <header className="pl-template-head">
                <h3 className="pl-h3">{template.name}</h3>
                {isLoaded && <span className="pl-badge">In the builder</span>}
              </header>

              <p className="pl-template-desc">{template.description}</p>

              <TemplateBar template={template} />

              <ul className="pl-template-list" aria-label={`${template.name} allocation`}>
                {template.holdings.map((holding, index) => (
                  <li key={`${holding.name}-${index}`}>
                    <span
                      className="pl-swatch"
                      style={{ background: CATEGORY_BY_ID[holding.category].color }}
                      aria-hidden="true"
                    />
                    <span className="pl-template-name">{holding.name}</span>
                    <span className="pl-template-pct">{holding.percent}%</span>
                  </li>
                ))}
              </ul>

              <p className="pl-template-objective">
                <span>Educational objective</span>
                {template.objective}
              </p>

              <details className="pl-details">
                <summary>The idea and its limits</summary>

                <p>{template.idea}</p>

                <h4>Main risks and limitations</h4>
                <ul>
                  {template.risks.map((risk) => (
                    <li key={risk}>{risk}</li>
                  ))}
                </ul>

                <p className="pl-details-context">{template.context}</p>
              </details>

              {isPending ? (
                <div className="pl-confirm-box" role="group" aria-label="Confirm replacing your portfolio">
                  <p>
                    Replace your current holdings with this example? Your
                    investment amount and currency stay the same.
                  </p>
                  <div className="pl-confirm-actions">
                    <button
                      type="button"
                      className="pl-btn pl-btn-primary"
                      onClick={() => handleConfirm(template)}
                    >
                      Replace holdings
                    </button>
                    <button
                      type="button"
                      className="pl-btn pl-btn-ghost"
                      onClick={() => setPendingId(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  className="pl-btn pl-btn-primary pl-template-use"
                  onClick={() => handleUse(template)}
                  aria-label={`Use the ${template.name} template`}
                >
                  Use This Template
                  <i className="ti ti-arrow-right" aria-hidden="true" />
                </button>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}
