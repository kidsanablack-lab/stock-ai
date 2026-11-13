"use client";

import { useState } from "react";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import NoteBox from "@/components/ui/NoteBox";
import { categoryColor } from "@/lib/portfolio-lab/categoryColor";
import { TEMPLATES } from "@/lib/portfolio-lab/templates";
import type { PortfolioTemplate } from "@/lib/portfolio-lab/types";
import PlSection from "./PlSection";

type TemplatesSectionProps = {
  /** True when loading a template would overwrite the user's own edits. */
  confirmNeeded: boolean;
  loadedTemplateId: string | null;
  onUseTemplate: (template: PortfolioTemplate) => void;
};

function TemplateBar({ template }: { template: PortfolioTemplate }) {
  // Quick visual summary. The list below is the accessible equivalent.
  return (
    <div className="flex h-2.5 gap-0.5 overflow-hidden rounded-full" aria-hidden="true">
      {template.holdings.map((holding, index) => (
        <span
          key={`${holding.name}-${index}`}
          className="block min-w-1"
          style={{ flex: holding.percent, background: categoryColor(holding.category) }}
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
    <PlSection
      id="portfolio-templates"
      titleId="pl-templates-title"
      title={`Learn from ${TEMPLATES.length} example portfolios`}
      lead="Each example shows one way of splitting money across asset types, and what that split can and cannot tell you. They are teaching examples, not recommendations, and none is the best choice for everyone."
      labels={["hypothetical", "analysis"]}
      source="Source: Scope teaching examples with invented percentages. No prices, returns or fund holdings are used."
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template) => {
          const isLoaded = loadedTemplateId === template.id;
          const isPending = pendingId === template.id;

          return (
            <Card as="article" key={template.id} className="flex min-w-0 flex-col">
              <header className="flex items-center justify-between gap-2">
                <h3 className="font-serif text-h4 font-normal text-ink">{template.name}</h3>
                {isLoaded && (
                  <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-primary-soft px-2.5 py-0.5 text-caption font-semibold text-primary-ink">
                    <i className="ti ti-check" aria-hidden="true" />
                    In the builder
                  </span>
                )}
              </header>

              <p className="mt-2 text-note text-ink-muted">{template.description}</p>

              <div className="mt-5">
                <TemplateBar template={template} />
              </div>

              <ul className="mt-4 grid gap-2" aria-label={`${template.name} allocation`}>
                {template.holdings.map((holding, index) => (
                  <li key={`${holding.name}-${index}`} className="flex items-center gap-3 text-note">
                    <span
                      className="size-3 shrink-0 rounded-full"
                      style={{ background: categoryColor(holding.category) }}
                      aria-hidden="true"
                    />
                    <span className="min-w-0 flex-1 text-ink">{holding.name}</span>
                    <span className="font-semibold tabular-nums text-ink">{holding.percent}%</span>
                  </li>
                ))}
              </ul>

              <div className="mt-5 rounded-2xl bg-primary-soft/45 p-4 text-note text-ink">
                <p className="text-caption font-semibold uppercase tracking-eyebrow text-primary-ink">
                  Educational objective
                </p>
                <p className="mt-1">{template.objective}</p>
              </div>

              <details className="group mt-3 text-note text-ink">
                <summary className="flex min-h-10 cursor-pointer list-none items-center justify-between gap-2 font-semibold text-primary">
                  The idea and its limits
                  <i
                    className="ti ti-chevron-down transition-transform group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>

                <div className="space-y-3 pb-2 pt-1">
                  <p>{template.idea}</p>

                  <h4 className="text-small font-semibold text-ink">
                    Main risks and limitations
                  </h4>
                  <ul className="list-disc space-y-1 pl-5">
                    {template.risks.map((risk) => (
                      <li key={risk}>{risk}</li>
                    ))}
                  </ul>

                  <p className="text-ink-muted">{template.context}</p>
                </div>
              </details>

              <div className="mt-auto pt-3">
                {isPending ? (
                  <NoteBox>
                    <div role="group" aria-label="Confirm replacing your portfolio" className="space-y-3">
                      <p>
                        Replace your current holdings with this example? Your investment amount and
                        currency stay the same.
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Button onClick={() => handleConfirm(template)}>Replace holdings</Button>
                        <Button variant="secondary" onClick={() => setPendingId(null)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  </NoteBox>
                ) : (
                  <Button
                    fullWidth
                    onClick={() => handleUse(template)}
                    aria-label={`Use this template: ${template.name}`}
                  >
                    Use this template
                    <i className="ti ti-arrow-right" aria-hidden="true" />
                  </Button>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </PlSection>
  );
}
