// types/company.ts

/**
 * Scope Company Data Standard
 *
 * This file is the single source of truth for the shape of company data.
 *
 * Principles:
 * - Company data belongs here, not inside page components.
 * - Presentation metadata such as icons/colors may exist when needed
 *   to identify or distinguish entities.
 * - Financial display values currently remain formatted strings so the
 *   existing UI does not need a breaking refactor.
 * - Derived fields are explicitly documented and should not be treated
 *   as independent primary data sources.
 */

/* -------------------------------------------------------------------------- */
/* Identity                                                                   */
/* -------------------------------------------------------------------------- */

export interface CompanyIdentity {
  /** Legal/company name used as the primary company name. */
  name: string;

  /** Consumer-facing brand name when it differs from the legal company name. */
  brandName?: string;

  ticker: string;
  exchange: string;

  /** Broad company classification used by Scope. */
  industry: string;

  /** Fallback when the company logo cannot be displayed. */
  logoInitial: string;

  /** Primary company logo asset. */
  logo: string;

  /** Short one-line description of the company. */
  tagline: string;
}

/* -------------------------------------------------------------------------- */
/* Scope Score                                                                */
/* -------------------------------------------------------------------------- */

export interface ScopeScore {
  score: number;
  label: string;
}
/* -------------------------------------------------------------------------- */
/* Financial Data Standard                                                    */
/* -------------------------------------------------------------------------- */

export type FinancialUnit = "B" | "M" | "T";

export interface FinancialValue {
  /**
   * Numeric value expressed in the selected unit.
   *
   * Example:
   * 716.9 + "B" = $716.9B
   * 2.75 + "T" = $2.75T
   */
  value: number;
  unit: FinancialUnit;
}

export interface PercentageValue {
  /**
   * Percentage expressed as a numeric value.
   *
   * Example:
   * 12 = +12%
   * -71 = -71%
   */
  value: number;
}

/* -------------------------------------------------------------------------- */
/* Company Overview                                                           */
/* -------------------------------------------------------------------------- */

export interface CompanyOverview {
  whatItDoes: string;
  founded: string;
  headquarters: string;
  ceo: string;
  ceoSince: string;

  /** Current market-cap snapshot. */
  marketCap: FinancialValue;

  /**
   * Current approximate global market-cap ranking.
   * Still time-sensitive / derived data.
   */
  marketCapRank: string;

  /** Latest reported fiscal-year revenue. */
  revenue: FinancialValue;

  /** Year-over-year revenue growth for the reported fiscal year. */
  revenueYoY: PercentageValue;

  /** Fiscal year associated with the reported revenue. */
  revenueFiscalYear: string;
}

/* -------------------------------------------------------------------------- */
/* Snapshot Rating                                                            */
/* -------------------------------------------------------------------------- */

export type SnapshotRating =
  | {
      kind: "stars";
      value: number;
      outOf: number;
    }
  | {
      kind: "bars";
      value: number;
      outOf: number;
    }
  | {
      kind: "arrow";
      label: string;
    }
  | {
      kind: "badge";
      label: string;
    };

export interface SnapshotMetric {
  label: string;
  icon: string;
  tone: "good" | "neutral" | "risk";
  rating: SnapshotRating;
}

/* -------------------------------------------------------------------------- */
/* 30-Second Summary                                                          */
/* -------------------------------------------------------------------------- */

export interface ThirtySecondSummary {
  /** Short subtitle explaining what the section is. */
  subtitle: string;

  /** Plain-English explanation of how the company works. */
  content: string;
}

/* -------------------------------------------------------------------------- */
/* Business Segments                                                          */
/* -------------------------------------------------------------------------- */

export interface RevenueSegment {
  name: string;

  /** Revenue amount for this segment. */
  amount: FinancialValue;

  /** Percentage of total company revenue. */
  percentage: number;

  /** Year-over-year change as a numeric percentage. */
  yoyChange: PercentageValue;

  /** Visual identifier for the segment. */
  color: string;
}

export interface BusinessSegments {
  totalRevenue: FinancialValue;

  /**
   * Fiscal year represented by this revenue breakdown.
   */
  fiscalYearLabel: string;

  /**
   * Segments may represent official reportable segments or economically
   * meaningful revenue categories.
   *
   * If Scope uses categories that differ from a company's formal reporting
   * segments, the footnote should explain that distinction.
   */
  segments: RevenueSegment[];

  insight: string;
  footnote: string;
}

/* -------------------------------------------------------------------------- */
/* Business Model                                                             */
/* -------------------------------------------------------------------------- */

export interface BusinessModelTag {
  label: string;
  icon: string;
}

export interface BusinessModelStage {
  title: string;
  icon: string;

  /** Visual identity for the stage. */
  color: string;
  backgroundTint: string;
  tagTextColor: string;

  tags: BusinessModelTag[];
}

export interface BusinessModel {
  stages: BusinessModelStage[];

  /** Explains the reinforcing loop / flywheel when applicable. */
  repeatNote: string;

  insight: string;
}

/* -------------------------------------------------------------------------- */
/* Strengths & Risks                                                          */
/* -------------------------------------------------------------------------- */

export interface StrengthOrRiskItem {
  icon: string;
  title: string;
  description: string;
}

export interface StrengthsAndRisks {
  strengths: StrengthOrRiskItem[];
  risks: StrengthOrRiskItem[];
}

/* -------------------------------------------------------------------------- */
/* Financial Overview                                                         */
/* -------------------------------------------------------------------------- */

export interface FinancialOverviewMetric {
  label: string;
  icon: string;

  /** Numeric financial value with an explicit unit. */
  value: FinancialValue;

  /** Numeric year-over-year change. */
  change: PercentageValue;

  sublabel: string;
}

export interface FinancialOverview {
  fiscalYearLabel: string;
  metrics: FinancialOverviewMetric[];
  insight: string;
}

/* -------------------------------------------------------------------------- */
/* Financial History                                                           */
/* -------------------------------------------------------------------------- */

export interface FinancialHistoryPanel {
  label: string;
  icon: string;

  color: string;
  highlightColor: string;

  /**
   * Fiscal-year labels aligned with values by index.
   */
  years: string[];

  /**
   * Numeric historical values.
   * Unit is defined once for the entire panel.
   */
  values: number[];

  unit: FinancialUnit;

  currentValueLabel: string;

  changeNote: string;

}

export interface FinancialHistory {
  /**
   * Companies may have different fiscal-year ranges.
   * Do not assume every company starts at the same year.
   */
  rangeLabel: string;

  panels: FinancialHistoryPanel[];
}

/* -------------------------------------------------------------------------- */
/* Ecosystem                                                                  */
/* -------------------------------------------------------------------------- */

export interface EcosystemNode {
  name: string;
  description: string;
  icon: string;

  /** Visual identity for the ecosystem entity. */
  color: string;
  backgroundTint: string;
}

export interface BusinessEcosystem {
  /**
   * Technology providers, strategic partners, infrastructure partners,
   * and other important external relationships.
   *
   * This is intentionally broader than "suppliers" because not every
   * ecosystem relationship is a vendor/supplier relationship.
   */
  partners: EcosystemNode[];

  centerLabel: string;
  centerSublabel: string;

  output: EcosystemNode;

  flowInLabel: string;
  flowOutLabel: string;

  insight: string;
}

/* -------------------------------------------------------------------------- */
/* Competitors                                                                */
/* -------------------------------------------------------------------------- */

export interface Competitor {
  name: string;
  icon: string;

  /** Visual identity for the competitor. */
  color: string;
  backgroundTint: string;
  tagTextColor: string;

  /**
   * Current approximate market-cap snapshot.
   */
  marketCap: FinancialValue;

  /**
   * Derived relative visual size used by the current competitor UI.
   */
  relativeSize: number;

  tag: string;

  /**
   * Free-form relationship because a company can be both customer,
   * partner, and competitor depending on the business area.
   */
  relationship: string;
}

export interface CompetitorsSection {
  contextNote: string;
  competitors: Competitor[];
  insight: string;
}

/* -------------------------------------------------------------------------- */
/* Company Profile                                                            */
/* -------------------------------------------------------------------------- */

export interface CompanyProfile {
  identity: CompanyIdentity;
  scopeScore: ScopeScore;
  overview: CompanyOverview;
  snapshot: SnapshotMetric[];
  thirtySecondSummary: ThirtySecondSummary;
  businessSegments: BusinessSegments;
  businessModel: BusinessModel;
  strengthsAndRisks: StrengthsAndRisks;
  financialOverview: FinancialOverview;
  financialHistory: FinancialHistory;
  ecosystem: BusinessEcosystem;
  competitors: CompetitorsSection;
}