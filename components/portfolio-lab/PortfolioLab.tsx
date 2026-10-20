"use client";

import { useCallback, useMemo, useReducer, useState } from "react";
import {
  MAX_INVESTMENT,
  buildChartSegments,
  calculatePortfolio,
  generateObservations,
  parseDecimalInput,
  portfolioMatchesTemplate,
  toHoldings,
} from "@/lib/portfolio-lab/calculations";
import { analyzeRisk, buildRiskNotes } from "@/lib/portfolio-lab/risk";
import {
  draftsFromTemplate,
  initialState,
  labReducer,
} from "@/lib/portfolio-lab/state";
import { getTemplate } from "@/lib/portfolio-lab/templates";
import type { PortfolioTemplate } from "@/lib/portfolio-lab/types";
import BuilderSection from "./BuilderSection";
import CalculatorSection from "./CalculatorSection";
import DcaSection from "./DcaSection";
import OverviewSection from "./OverviewSection";
import RebalanceSection from "./RebalanceSection";
import RiskSection from "./RiskSection";
import TemplatesSection from "./TemplatesSection";
import WhatIfSection from "./WhatIfSection";

function scrollToId(id: string) {
  const element = document.getElementById(id);
  if (!element) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)",
  ).matches;

  element.scrollIntoView({
    behavior: reduceMotion ? "auto" : "smooth",
    block: "start",
  });
}

export default function PortfolioLab() {
  // The ONLY state. Everything below is derived from it.
  const [state, dispatch] = useReducer(labReducer, initialState);

  const [focusId, setFocusId] = useState<string | null>(null);
  const [announcement, setAnnouncement] = useState("");

  const handleFocused = useCallback(() => setFocusId(null), []);

  /* ---------- Derived data (one calculation feeds the chart, table, and cards) ---------- */

  const investment = useMemo(
    () =>
      parseDecimalInput(state.investmentInput, {
        max: MAX_INVESTMENT,
        label: "Investment amount",
      }),
    [state.investmentInput],
  );

  const parsed = useMemo(() => toHoldings(state.holdings), [state.holdings]);

  const summary = useMemo(
    () => calculatePortfolio(investment.value, parsed.holdings),
    [investment.value, parsed.holdings],
  );

  const segments = useMemo(() => buildChartSegments(summary), [summary]);
  const analysis = useMemo(() => analyzeRisk(summary), [summary]);
  const riskNotes = useMemo(
    () => [...generateObservations(summary), ...buildRiskNotes(analysis)],
    [summary, analysis],
  );

  const loadedTemplate = getTemplate(state.loadedTemplateId);
  const templateModified = loadedTemplate
    ? !portfolioMatchesTemplate(parsed.holdings, loadedTemplate)
    : false;

  // Loading a template only needs a confirmation if it would overwrite
  // holdings the user created or changed.
  const confirmNeeded =
    state.holdings.length > 0 && (!loadedTemplate || templateModified);

  /* ---------- Handlers ---------- */

  function handleUseTemplate(template: PortfolioTemplate) {
    dispatch({
      type: "loadTemplate",
      templateId: template.id,
      holdings: draftsFromTemplate(template),
    });

    setAnnouncement(
      `Loaded the ${template.name} example. Your investment amount and currency were kept.`,
    );

    // Wait for the new holdings to render, then move to the builder.
    window.requestAnimationFrame(() => {
      scrollToId("portfolio-builder");
      document.getElementById("pl-builder-title")?.focus({ preventScroll: true });
    });
  }

  function handleEditFromTable(id: string) {
    scrollToId("portfolio-builder");
    setFocusId(id);
  }

  function handleRemoveFromTable(id: string, name: string) {
    dispatch({ type: "removeHolding", id });
    setAnnouncement(`Removed ${name}.`);
  }

  return (
    <>
      <div className="pl-sr-only" role="status" aria-live="polite">
        {announcement}
      </div>

      <TemplatesSection
        confirmNeeded={confirmNeeded}
        loadedTemplateId={state.loadedTemplateId}
        onUseTemplate={handleUseTemplate}
      />

      <BuilderSection
        state={state}
        dispatch={dispatch}
        investmentError={investment.error}
        holdingErrors={parsed.errors}
        summary={summary}
        segments={segments}
        loadedTemplate={loadedTemplate}
        templateModified={templateModified}
        focusId={focusId}
        onFocused={handleFocused}
        onRequestFocus={setFocusId}
        onAnnounce={setAnnouncement}
      />

      <OverviewSection
        summary={summary}
        currency={state.currency}
        onEdit={handleEditFromTable}
        onRemove={handleRemoveFromTable}
      />

      <RiskSection analysis={analysis} notes={riskNotes} currency={state.currency} />

      <DcaSection currency={state.currency} summary={summary} />

      <CalculatorSection currency={state.currency} />
      <WhatIfSection summary={summary} currency={state.currency} />
      <RebalanceSection summary={summary} currency={state.currency} />
    </>
  );
}
