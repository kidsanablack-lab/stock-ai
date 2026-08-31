// Core company data types for the Scope Data System.
//
// These types describe WHAT information exists for a company.
// They intentionally contain no CSS classes, inline styles, spacing,
// layout, or other presentation concerns — that stays in the UI layer.
//
// Colors/icons are included only where they identify or distinguish a
// specific entity (a competitor, a segment, a supplier) — not where
// they describe how the page is laid out.

// ---------------------------------------------------------------------------
// Identity / Hero
// ---------------------------------------------------------------------------

export interface CompanyIdentity {
  name: string;
  ticker: string;
  exchange: string;
  industry: string;
  /** Single letter/character shown in the round avatar (e.g. "A") */
  logoInitial: string;
  /** Short one-line description shown under the company name */
  logo: string;
  tagline: string;
}

export interface ScopeScore {
  /** 0-10 scale */
  score: number;
  /** e.g. "Excellent" */
  label: string;
}

export interface CompanyOverview {
  whatItDoes: string;
  founded: string;
  headquarters: string;
  ceo: string;
  ceoSince: string;
  marketCap: string;
  marketCapRank: string;
  revenue: string;
  revenueYoY: string;
  revenueFiscalYear: string;
}

// ---------------------------------------------------------------------------
// Snapshot bar
// ---------------------------------------------------------------------------

export type SnapshotRating =
  | { kind: "stars"; value: number; outOf: number }
  | { kind: "bars"; value: number; outOf: number }
  | { kind: "arrow"; label: string }
  | { kind: "badge"; label: string };

export interface SnapshotMetric {
  label: string;
  /** Tabler icon name, without the "ti-" prefix duplication, e.g. "shield-check" */
  icon: string;
  tone: "good" | "neutral" | "risk";
  rating: SnapshotRating;
}

// ---------------------------------------------------------------------------
// 30-Second Summary
// ---------------------------------------------------------------------------

export interface ThirtySecondSummary {
  subtitle: string;
  content: string;
}

// ---------------------------------------------------------------------------
// Business Segments
// ---------------------------------------------------------------------------

export interface RevenueSegment {
  name: string;
  amount: string;
  /** 0-100, share of total revenue */
  percentage: number;
  yoyChange: string;
  yoyTrend: "up" | "down";
  /** Identifies this segment in the donut chart and legend */
  color: string;
}

export interface BusinessSegments {
  totalRevenue: string;
  fiscalYearLabel: string;
  segments: RevenueSegment[];
  insight: string;
  footnote: string;
}

// ---------------------------------------------------------------------------
// Business Model
// ---------------------------------------------------------------------------

export interface BusinessModelTag {
  label: string;
  icon: string;
}

export interface BusinessModelStage {
  title: string;
  icon: string;
  /** Identifies this stage's accent color (icon color, top border) */
  color: string;
  /** Light background tint for the icon circle and tag pills */
  backgroundTint: string;
  /** Text color used on this stage's tag pills */
  tagTextColor: string;
  tags: BusinessModelTag[];
}

export interface BusinessModel {
  stages: BusinessModelStage[];
  repeatNote: string;
  insight: string;
}

// ---------------------------------------------------------------------------
// Strengths & Risks
// ---------------------------------------------------------------------------

export interface StrengthOrRiskItem {
  icon: string;
  title: string;
  description: string;
}

export interface StrengthsAndRisks {
  strengths: StrengthOrRiskItem[];
  risks: StrengthOrRiskItem[];
}

// ---------------------------------------------------------------------------
// Financial Overview
// ---------------------------------------------------------------------------

export interface FinancialOverviewMetric {
  label: string;
  icon: string;
  value: string;
  changeLabel: string;
  changeTrend: "up" | "down";
  sublabel: string;
}

export interface FinancialOverview {
  fiscalYearLabel: string;
  metrics: FinancialOverviewMetric[];
  insight: string;
}

// ---------------------------------------------------------------------------
// Financial History
// ---------------------------------------------------------------------------

export interface FinancialHistoryPanel {
  label: string;
  icon: string;
  /** Identifies this panel/metric (bar color) */
  color: string;
  /** Color used to highlight the most recent year's bar */
  highlightColor: string;
  years: string[];
  /**
   * Raw historical values (in billions USD), in the same order as `years`.
   * The UI computes each bar's relative height from these values —
   * no presentation-specific percentages are stored here.
   */
  values: number[];
  currentValueLabel: string;
  changeNote: string;
  changeTrend: "up" | "down";
}

export interface FinancialHistory {
  rangeLabel: string;
  panels: FinancialHistoryPanel[];
}

// ---------------------------------------------------------------------------
// Business Ecosystem
// ---------------------------------------------------------------------------

export interface EcosystemNode {
  name: string;
  description: string;
  icon: string;
  /** Identifies this node (icon color, top border) */
  color: string;
  /** Light background tint for the icon circle */
  backgroundTint: string;
}

export interface BusinessEcosystem {
  suppliers: EcosystemNode[];
  centerLabel: string;
  centerSublabel: string;
  output: EcosystemNode;
  flowInLabel: string;
  flowOutLabel: string;
  insight: string;
}

// ---------------------------------------------------------------------------
// Competitors
// ---------------------------------------------------------------------------

export interface Competitor {
  name: string;
  icon: string;
  /** Identifies this competitor (icon color, top border, comparison bar fill) */
  color: string;
  /** Light background tint for the icon circle and tag pill */
  backgroundTint: string;
  /** Text color used on this competitor's tag pill (may differ from `color`) */
  tagTextColor: string;
  marketCap: string;
  /** 0-100, relative size vs. this company, used for the comparison bar */
  relativeSize: number;
  tag: string;
  relationship: string;
}

export interface CompetitorsSection {
  contextNote: string;
  competitors: Competitor[];
  insight: string;
}

// ---------------------------------------------------------------------------
// Root CompanyProfile
// ---------------------------------------------------------------------------

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