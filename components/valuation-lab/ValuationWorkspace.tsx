"use client";

import { useState } from "react";
import {
  calculateDcf,
  calculatePe,
  calculatePs,
  FORECAST_YEARS_MAX,
  FORECAST_YEARS_MIN,
  REPORTING_CURRENCIES,
  type ScenarioName,
  type SharesMeasure,
} from "@/lib/valuation-lab";
import {
  buildSensitivity,
  DEFAULT_SENSITIVITY_SETTINGS,
  evaluateScenarioForms,
  ILLUSTRATIVE_SCENARIO_FORMS,
  type ScenarioForm,
  type ScenarioFormSet,
  type SensitivitySettings,
  type ValuationSource,
} from "@/lib/valuation-lab/analysis-form";
import {
  buildDcfInputs,
  EXAMPLE_FORM,
  ILLUSTRATIVE_ASSUMPTIONS,
  INITIAL_FORM,
  readNumber,
  type FormState,
} from "@/lib/valuation-lab/form";
import { parseNumericInput } from "@/lib/valuation-lab/numbers";
import DcfSection from "./DcfSection";
import { Explain, ExplainGroup } from "./Explain";
import { NumberField, PERIOD_OPTIONS, SelectField, TextField } from "./Fields";
import MarginOfSafetySection from "./MarginOfSafetySection";
import { PePanel, PsPanel } from "./RelativePanels";
import ScenarioSection from "./ScenarioSection";
import SensitivitySection, { type SelectedCell } from "./SensitivitySection";
import ValuationSummary from "./ValuationSummary";

const CURRENCY_OPTIONS = REPORTING_CURRENCIES.map((code) => ({
  value: code,
  label: code,
}));

const SHARES_OPTIONS: { value: SharesMeasure; label: string }[] = [
  { value: "diluted", label: "Diluted shares" },
  { value: "basic", label: "Basic shares" },
];

const NAV = [
  { href: "#inputs", label: "Inputs" },
  { href: "#relative", label: "P/E and P/S" },
  { href: "#dcf", label: "DCF" },
  { href: "#scenarios", label: "Scenarios" },
  { href: "#sensitivity", label: "Sensitivity" },
  { href: "#margin-of-safety", label: "Margin of Safety" },
  { href: "#summary", label: "Summary" },
  { href: "#learning", label: "Learn" },
];

export default function ValuationWorkspace() {
  const [form, setForm] = useState<FormState>(INITIAL_FORM);

  // Kept separate from the main DCF so exploring never changes it.
  const [scenarioForms, setScenarioForms] = useState<ScenarioFormSet>(
    ILLUSTRATIVE_SCENARIO_FORMS,
  );
  const [sensSettings, setSensSettings] = useState<SensitivitySettings>(
    DEFAULT_SENSITIVITY_SETTINGS,
  );
  const [selectedCell, setSelectedCell] = useState<SelectedCell | null>(null);
  const [mosChoice, setMosChoice] = useState<ValuationSource>("base");

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    setForm((current) => ({ ...current, [key]: value }));

  const resetAnalysis = () => {
    setScenarioForms(ILLUSTRATIVE_SCENARIO_FORMS);
    setSensSettings(DEFAULT_SENSITIVITY_SETTINGS);
    setSelectedCell(null);
    setMosChoice("base");
  };

  const loadExample = () => {
    setForm(EXAMPLE_FORM);
    resetAnalysis();
  };

  const clearAll = () => {
    setForm(INITIAL_FORM);
    resetAnalysis();
  };

  // Changing the forecast period keeps the growth rates already typed and
  // only adds or removes years at the end.
  const setYears = (value: string) =>
    setForm((current) => {
      const parsed = parseNumericInput(value);
      let growthRates = current.growthRates;

      if (
        parsed.status === "valid" &&
        Number.isInteger(parsed.value) &&
        parsed.value >= FORECAST_YEARS_MIN &&
        parsed.value <= FORECAST_YEARS_MAX
      ) {
        const fill =
          current.growthRates[current.growthRates.length - 1] ?? "";
        growthRates = Array.from(
          { length: parsed.value },
          (_, index) => current.growthRates[index] ?? fill,
        );
      }

      return { ...current, forecastYears: value, growthRates };
    });

  const setGrowth = (index: number, value: string) =>
    setForm((current) => ({
      ...current,
      growthRates: current.growthRates.map((rate, i) =>
        i === index ? value : rate,
      ),
    }));

  const fillGrowth = () =>
    setForm((current) => ({
      ...current,
      growthRates: current.growthRates.map(
        () => current.growthRates[0] ?? "",
      ),
    }));

  const resetAssumptions = () =>
    setForm((current) => ({ ...current, ...ILLUSTRATIVE_ASSUMPTIONS }));

  const setScenario = (
    name: ScenarioName,
    key: keyof ScenarioForm,
    value: string,
  ) =>
    setScenarioForms((current) => ({
      ...current,
      [name]: { ...current[name], [key]: value },
    }));

  const setSensitivity = (key: keyof SensitivitySettings, value: string) =>
    setSensSettings((current) => ({ ...current, [key]: value }));

  // All numbers come from the calculation engine. Nothing is calculated here.
  const pe = calculatePe({
    sharePrice: readNumber(form.sharePrice),
    eps: readNumber(form.eps),
    epsPeriod: form.epsPeriod,
  });

  const ps = calculatePs({
    sharePrice: readNumber(form.sharePrice),
    sharesOutstanding: readNumber(form.sharesOutstanding),
    sharesMeasure: form.sharesMeasure,
    revenue: readNumber(form.revenue),
    revenuePeriod: form.revenuePeriod,
  });

  const dcf = calculateDcf(buildDcfInputs(form));
  const scenarios = evaluateScenarioForms(form, scenarioForms);
  const sensitivity = buildSensitivity(form, sensSettings);

  const valuations = {
    main: dcf,
    bear: scenarios.bear.result,
    base: scenarios.base.result,
    bull: scenarios.bull.result,
  };

  return (
    <section
      id="workspace"
      className="vl-section"
      aria-labelledby="vl-workspace-title"
    >
      <p className="vl-section-eyebrow">Workspace</p>

      <h2 id="vl-workspace-title" className="vl-h2">
        Build Your Valuation
      </h2>

      <p className="vl-section-lead">
        Enter your own numbers. Each calculator shows a result as soon as its
        own inputs are complete, so you do not need to fill in everything.
      </p>

      <nav aria-label="Valuation Lab sections" className="vl-jump">
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href}>{item.label}</a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="vl-note" role="note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <p>
          All data on this page is entered by you. Scope does not check it,
          and nothing here is live market data. Results are estimates that
          depend on your assumptions. This is an educational tool, not
          personalized investment advice.
        </p>
      </div>

      <div className="vl-toolbar">
        <button
          type="button"
          className="vl-btn vl-btn-outline"
          onClick={loadExample}
        >
          Load a hypothetical example
        </button>
        <button
          type="button"
          className="vl-btn vl-btn-outline"
          onClick={clearAll}
        >
          Clear all inputs
        </button>
      </div>

      {/* Company and market */}
      <fieldset id="inputs" className="vl-group vl-scroll-target">
        <legend>Company and market</legend>

        <div className="vl-fields">
          <TextField
            label="Company name (optional)"
            value={form.companyName}
            onChange={(v) => update("companyName", v)}
            hint="Only a label. It is not needed for any calculation."
          />
          <TextField
            label="Ticker (optional)"
            value={form.ticker}
            onChange={(v) => update("ticker", v)}
            maxLength={12}
          />
          <SelectField
            label="Reporting currency"
            value={form.currency}
            options={CURRENCY_OPTIONS}
            onChange={(v) => update("currency", v)}
            hint="Used for display only. No conversion is done."
          />
          <NumberField
            label="Share price"
            value={form.sharePrice}
            onChange={(v) => update("sharePrice", v)}
            hint="The price you enter. It is not fetched from a market."
          />
          <TextField
            label="Share price date (optional)"
            type="date"
            value={form.priceDate}
            onChange={(v) => update("priceDate", v)}
          />
          <TextField
            label="Data source note (optional)"
            value={form.sourceNote}
            onChange={(v) => update("sourceNote", v)}
            maxLength={120}
            hint="For example, which report the numbers came from."
          />
        </div>
      </fieldset>

      {/* Financial inputs for the ratios */}
      <fieldset className="vl-group">
        <legend>Financial data for the ratios</legend>

        <div className="vl-fields">
          <NumberField
            label="Earnings per share (EPS)"
            value={form.eps}
            onChange={(v) => update("eps", v)}
            hint="Profit per share, in the currency above."
          />
          <SelectField
            label="EPS period"
            value={form.epsPeriod}
            options={PERIOD_OPTIONS}
            onChange={(v) => update("epsPeriod", v)}
          />
          <NumberField
            label="Revenue"
            value={form.revenue}
            onChange={(v) => update("revenue", v)}
            hint="Use the same unit as market capitalization, for example millions."
          />
          <SelectField
            label="Revenue period"
            value={form.revenuePeriod}
            options={PERIOD_OPTIONS}
            onChange={(v) => update("revenuePeriod", v)}
          />
          <NumberField
            label="Shares outstanding"
            value={form.sharesOutstanding}
            onChange={(v) => update("sharesOutstanding", v)}
            hint="Used to turn the share price into market capitalization."
          />
          <SelectField
            label="Share count measure"
            value={form.sharesMeasure}
            options={SHARES_OPTIONS}
            onChange={(v) => update("sharesMeasure", v)}
          />
        </div>

        <ExplainGroup
          title="Key terms for these fields"
          terms={["eps", "revenue", "marketCap"]}
        />
      </fieldset>

      {/* Relative valuation */}
      <div id="relative" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Relative Valuation</h2>
        <p className="vl-section-lead">
          Ratios relate the price of a business to its results. They are a
          starting point for questions, not a verdict.
        </p>

        <div className="vl-two-col">
          <PePanel form={form} result={pe} />
          <PsPanel form={form} result={ps} />
        </div>
      </div>

      {/* DCF */}
      <div id="dcf" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Discounted Cash Flow</h2>
        <p className="vl-section-lead">
          A two-stage model of free cash flow to the firm. You choose the
          growth, discount rate, and terminal growth, and the table shows
          every step.
        </p>

        <DcfSection
          form={form}
          result={dcf}
          onChange={update}
          onYears={setYears}
          onGrowth={setGrowth}
          onFillGrowth={fillGrowth}
          onResetAssumptions={resetAssumptions}
        />

        <div className="vl-panel vl-spaced">
          <ExplainGroup
            title="Key terms in the DCF"
            terms={[
              "fcff",
              "discountRate",
              "terminalGrowth",
              "terminalValue",
              "enterpriseValue",
              "equityValue",
              "dilutedShares",
            ]}
          />
        </div>
      </div>

      {/* Scenarios */}
      <div id="scenarios" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Scenario Analysis</h2>
        <p className="vl-section-lead">
          Compare three sets of assumptions side by side. Each one runs
          through the same DCF engine.
        </p>

        <ScenarioSection
          forms={scenarioForms}
          results={scenarios}
          currency={form.currency}
          onChange={setScenario}
          onReset={() => setScenarioForms(ILLUSTRATIVE_SCENARIO_FORMS)}
        />
      </div>

      {/* Sensitivity */}
      <div id="sensitivity" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Sensitivity Analysis</h2>
        <p className="vl-section-lead">
          See how much the estimate moves when the discount rate and terminal
          growth change a little. Small changes can have large effects.
        </p>

        <SensitivitySection
          currency={form.currency}
          settings={sensSettings}
          build={sensitivity}
          selected={selectedCell}
          onSettings={setSensitivity}
          onSelect={setSelectedCell}
        />
      </div>

      {/* Margin of safety */}
      <div id="margin-of-safety" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Margin of Safety</h2>
        <p className="vl-section-lead">
          Compare an estimated value per share with the share price you
          entered. It depends entirely on the assumptions behind the estimate.
        </p>

        <MarginOfSafetySection
          form={form}
          choice={mosChoice}
          results={valuations}
          onChoice={setMosChoice}
        />

        <div className="vl-panel vl-spaced">
          <Explain term="marginOfSafety" />
        </div>
      </div>

      {/* Summary */}
      <div id="summary" className="vl-anchor">
        <h2 className="vl-h2 vl-h2-sub">Valuation Summary</h2>
        <p className="vl-section-lead">
          Everything you entered and everything the calculators returned, in
          one place.
        </p>

        <ValuationSummary
          form={form}
          pe={pe}
          ps={ps}
          dcf={dcf}
          scenarios={scenarios}
          scenarioForms={scenarioForms}
          sensitivity={sensitivity}
          mosChoice={mosChoice}
          mosResults={valuations}
        />
      </div>
    </section>
  );
}