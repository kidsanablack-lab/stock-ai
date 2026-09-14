import type { CompanyProfile } from "@/types/company";

const EPSILON = 0.2;

function round(value: number): number {
  return Math.round(value * 10) / 10;
}

export function validateCompany(
  company: CompanyProfile,
): string[] {
  const errors: string[] = [];

  const { identity, overview, businessSegments, financialHistory } = company;

  // ─────────────────────────────────────────────
  // Required Identity Fields
  // ─────────────────────────────────────────────

  if (!identity.name?.trim()) {
    errors.push("Company name is missing.");
  }

  if (!identity.ticker?.trim()) {
    errors.push("Ticker is missing.");
  }

  // ─────────────────────────────────────────────
  // Required Overview Fields
  // ─────────────────────────────────────────────

  if (!overview.whatItDoes?.trim()) {
    errors.push("Company description is missing.");
  }

  if (!overview.founded?.trim()) {
    errors.push("Founded information is missing.");
  }

  if (!overview.headquarters?.trim()) {
    errors.push("Headquarters is missing.");
  }

  if (!overview.ceo?.trim()) {
    errors.push("CEO is missing.");
  }

  if (!overview.ceoSince?.trim()) {
    errors.push("CEO since information is missing.");
  }

  if (overview.marketCap.value <= 0) {
    errors.push("Market cap must be greater than 0.");
  }

  if (!overview.marketCap.unit) {
    errors.push("Market cap unit is missing.");
  }

  if (overview.revenue.value <= 0) {
    errors.push("Revenue must be greater than 0.");
  }

  if (!overview.revenue.unit) {
    errors.push("Revenue unit is missing.");
  }

  if (!Number.isFinite(overview.revenueYoY.value)) {
    errors.push("Revenue YoY is invalid.");
  }

  // ─────────────────────────────────────────────
  // Business Segments
  // ─────────────────────────────────────────────

  const segments = businessSegments.segments;

  if (!businessSegments.totalRevenue.unit) {
    errors.push("Business segment total revenue unit is missing.");
  }

  if (segments.length === 0) {
    errors.push("Business segments are missing.");
  }

  for (const segment of segments) {
    if (!segment.name?.trim()) {
      errors.push("A business segment is missing its name.");
    }

    if (segment.amount.value < 0) {
      errors.push(
        `${segment.name || "Unnamed segment"}: revenue cannot be negative.`,
      );
    }

    if (!Number.isFinite(segment.percentage)) {
      errors.push(
        `${segment.name || "Unnamed segment"}: percentage is invalid.`,
      );
    }

    if (segment.percentage < 0 || segment.percentage > 100) {
      errors.push(
        `${segment.name || "Unnamed segment"}: percentage must be between 0 and 100.`,
      );
    }

    if (!Number.isFinite(segment.yoyChange.value)) {
      errors.push(
        `${segment.name || "Unnamed segment"}: YoY change is invalid.`,
      );
    }
  }

  const percentageTotal = round(
    segments.reduce((sum, segment) => sum + segment.percentage, 0),
  );

  if (Math.abs(percentageTotal - 100) > EPSILON) {
    errors.push(
      `Business segment percentages total ${percentageTotal}%, expected 100%.`,
    );
  }

  const segmentRevenueTotal = segments.reduce(
    (sum, segment) => sum + segment.amount.value,
    0,
  );

  if (
    Math.abs(
      segmentRevenueTotal - businessSegments.totalRevenue.value,
    ) > EPSILON
  ) {
    errors.push(
      `Business segment revenue totals ${round(
        segmentRevenueTotal,
      )}${businessSegments.totalRevenue.unit}, expected ${
        businessSegments.totalRevenue.value
      }${businessSegments.totalRevenue.unit}.`,
    );
  }
    // ─────────────────────────────────────────────
  // Segment-Level Revenue ↔ Percentage Integrity
  // ─────────────────────────────────────────────

  for (const segment of segments) {
    const expectedPercentage =
      (segment.amount.value /
        businessSegments.totalRevenue.value) *
      100;

    if (
      Math.abs(expectedPercentage - segment.percentage) >
      0.6
    ) {
      errors.push(
        `${segment.name}: percentage mismatch. Amount ${
          segment.amount.value
        }${segment.amount.unit} represents ${round(
          expectedPercentage,
        )}% of total revenue, but segment percentage is ${
          segment.percentage
        }%.`,
      );
    }
  }

  // ─────────────────────────────────────────────
  // Financial History
  // ─────────────────────────────────────────────

  if (financialHistory.panels.length === 0) {
    errors.push("Financial history panels are missing.");
  }

  const historyYearSets: string[][] = [];

  for (const panel of financialHistory.panels) {
    if (!panel.label?.trim()) {
      errors.push("A financial history panel is missing its label.");
    }

    if (!panel.unit) {
      errors.push(
        `${panel.label || "Unnamed panel"}: financial unit is missing.`,
      );
    }

    if (panel.years.length < 2) {
      errors.push(
        `${panel.label || "Unnamed panel"}: must contain at least 2 years.`,
      );
    }

    if (panel.years.length !== panel.values.length) {
      errors.push(
        `${panel.label}: years (${panel.years.length}) and values (${panel.values.length}) must have the same length.`,
      );
    }

    if (panel.values.length === 0) {
      errors.push(`${panel.label}: historical values are missing.`);
    }

    if (panel.values.some((value) => !Number.isFinite(value))) {
      errors.push(
        `${panel.label}: contains an invalid financial value.`,
      );
    }

    // Check that years are valid and strictly increasing.
    for (let i = 0; i < panel.years.length; i++) {
      const yearText = panel.years[i];
const yearMatch = yearText.match(/^'?(\d{2}|\d{4})$/);

if (!yearMatch) {
  errors.push(
    `${panel.label}: invalid year "${yearText}".`,
  );
  continue;
}

const year = Number(yearMatch[1]);

if (!Number.isInteger(year)) {
  errors.push(
    `${panel.label}: invalid year "${yearText}".`,
  );
  continue;
}

      if (i > 0) {
        const previousYearText = panel.years[i - 1];
const previousYearMatch =
  previousYearText.match(/^'?(\d{2}|\d{4})$/);

if (!previousYearMatch) {
  continue;
}

const previousYear = Number(previousYearMatch[1]);

        if (year <= previousYear) {
          errors.push(
            `${panel.label}: years must be strictly increasing.`,
          );
          break;
        }
      }
    }

    // Check for duplicate years.
    const uniqueYears = new Set(panel.years);

    if (uniqueYears.size !== panel.years.length) {
      errors.push(
        `${panel.label}: contains duplicate years.`,
      );
    }

    historyYearSets.push(panel.years);
  }

  // All financial history panels should use the same years.
  if (historyYearSets.length > 1) {
    const referenceYears = historyYearSets[0];

    for (let i = 1; i < historyYearSets.length; i++) {
      const currentYears = historyYearSets[i];

      if (
        currentYears.length !== referenceYears.length ||
        currentYears.some(
          (year, index) => year !== referenceYears[index],
        )
      ) {
        errors.push(
          "Financial history panels must use the same years.",
        );
        break;
      }
    }
  }

  // Revenue history is required for revenue integrity checks.
  const revenuePanel = financialHistory.panels.find(
    (panel) => panel.label === "Revenue",
  );

  if (!revenuePanel) {
    errors.push("Revenue financial history panel is missing.");
  }
  // ─────────────────────────────────────────────
  // Final Data Readiness Checks
  // ─────────────────────────────────────────────

  // Scope Score
  if (
    !Number.isFinite(company.scopeScore.score)
  ) {
    errors.push("Scope Score is missing or invalid.");
  } else if (
    company.scopeScore.score < 0 ||
    company.scopeScore.score > 10
  ) {
    errors.push(
      `Scope Score must be between 0 and 10, got ${company.scopeScore.score}.`,
    );
  }

  if (!company.scopeScore.label?.trim()) {
    errors.push("Scope Score label is missing.");
  }

  // Identity presentation fields
  if (!identity.exchange?.trim()) {
    errors.push("Exchange is missing.");
  }

  if (!identity.industry?.trim()) {
    errors.push("Industry is missing.");
  }

  if (!identity.tagline?.trim()) {
    errors.push("Tagline is missing.");
  }

  if (!identity.logo?.trim()) {
    errors.push("Company logo is missing.");
  }

  if (!identity.logoInitial?.trim()) {
    errors.push("Company logo initial is missing.");
  }

  // 30-Second Summary
  if (!company.thirtySecondSummary.subtitle?.trim()) {
    errors.push("30-Second Summary subtitle is missing.");
  }

  if (!company.thirtySecondSummary.content?.trim()) {
    errors.push("30-Second Summary content is missing.");
  }

  // Snapshot
  if (company.snapshot.length === 0) {
    errors.push("Snapshot data is missing.");
  }

  // Business Model
  if (company.businessModel.stages.length === 0) {
    errors.push("Business Model stages are missing.");
  }

  if (!company.businessModel.repeatNote?.trim()) {
    errors.push("Business Model repeat note is missing.");
  }

  if (!company.businessModel.insight?.trim()) {
    errors.push("Business Model insight is missing.");
  }

  // Strengths & Risks
  if (company.strengthsAndRisks.strengths.length === 0) {
    errors.push("Strengths data is missing.");
  }

  if (company.strengthsAndRisks.risks.length === 0) {
    errors.push("Risks data is missing.");
  }

  // Financial Overview
  if (company.financialOverview.metrics.length === 0) {
    errors.push("Financial Overview metrics are missing.");
  }

  if (!company.financialOverview.fiscalYearLabel?.trim()) {
    errors.push(
      "Financial Overview fiscal year is missing.",
    );
  }

  if (!company.financialOverview.insight?.trim()) {
    errors.push(
      "Financial Overview insight is missing.",
    );
  }

  // Ecosystem
  if (company.ecosystem.partners.length === 0) {
    errors.push("Ecosystem partners are missing.");
  }

  if (!company.ecosystem.centerLabel?.trim()) {
    errors.push("Ecosystem center label is missing.");
  }

  if (!company.ecosystem.centerSublabel?.trim()) {
    errors.push("Ecosystem center sublabel is missing.");
  }

  if (!company.ecosystem.output) {
    errors.push("Ecosystem output is missing.");
  }

  // Competitors
  if (company.competitors.competitors.length === 0) {
    errors.push("Competitor data is missing.");
  }

  if (!company.competitors.contextNote?.trim()) {
    errors.push("Competitor context note is missing.");
  }

  if (!company.competitors.insight?.trim()) {
    errors.push("Competitor insight is missing.");
  }
  // ─────────────────────────────────────────────
  // Revenue YoY Integrity
  // ─────────────────────────────────────────────


  if (revenuePanel && revenuePanel.values.length >= 2) {
    const previous =
      revenuePanel.values[revenuePanel.values.length - 2];

    const current =
      revenuePanel.values[revenuePanel.values.length - 1];

    if (previous !== 0) {
      const calculatedYoY =
        ((current - previous) / Math.abs(previous)) * 100;

      if (
        Math.abs(
          calculatedYoY - overview.revenueYoY.value,
        ) > 0.6
      ) {
        errors.push(
          `Revenue YoY mismatch: history calculates ${round(
            calculatedYoY,
          )}%, overview says ${overview.revenueYoY.value}%.`,
        );
      }
    }
  }

  // ─────────────────────────────────────────────
  // Latest Revenue Integrity
  // ─────────────────────────────────────────────

  if (revenuePanel && revenuePanel.values.length > 0) {
    const latestRevenue =
      revenuePanel.values[revenuePanel.values.length - 1];

    if (
      Math.abs(latestRevenue - overview.revenue.value) >
      EPSILON
    ) {
      errors.push(
        `Latest revenue mismatch: history shows ${latestRevenue}${revenuePanel.unit}, overview says ${overview.revenue.value}${overview.revenue.unit}.`,
      );
    }
  }

  return errors;
}