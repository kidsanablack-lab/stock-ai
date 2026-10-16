/**
 * Shared schema for Business Model detail content.
 *
 * Rules:
 * - Name, icon, and theme colors live in the catalog (lib/mock/business-models.ts).
 * - Companies are referenced by slug only. Name, ticker, and logo are resolved
 *   from the real company profiles at render time.
 * - Related models are referenced by catalog slug only.
 */

/** A Tabler icon class, e.g. "ti-server". */
export type TablerIcon = `ti-${string}`;

export type NonEmptyArray<T> = [T, ...T[]];

/** Educational disclaimer shown at the bottom of every detail page. */
export const SCOPE_DISCLAIMER =
  "Scope is built for understanding businesses and industries, not for investment advice.";

/** Icon + title + short text. Used by Who Pays, Make Money, Money Goes, Strength, Risks. */
export interface DetailItem {
  title: string;
  text: string;
  icon: TablerIcon;
}

/** A step in the "Business Model in One Minute" flow. */
export interface FlowStep extends DetailItem {
  examples: NonEmptyArray<string>;
}

/** One step in "How It Works". */
export interface HowItWorksStep {
  /** Short bold heading, a few words. */
  title: string;
  /** The full sentence (or phrase) explaining the step. */
  text: string;
  /** Short label shown on the right, e.g. "Customer" or "Pricing". */
  tag: string;
}

export interface MetricItem {
  /** Short label, e.g. "MRR". */
  label: string;
  /** Spelled-out name when the label is an abbreviation, e.g. "Monthly Recurring Revenue". */
  fullName?: string;
  text: string;
  icon: TablerIcon;
}

/** Reference to a company by its existing /company/[slug] slug. */
export interface CompanyReference {
  slug: string;
  /** How THIS company participates in THIS business model (name the relevant business/product). */
  role: string;
}

export interface ItemSection {
  sub: string;
  items: NonEmptyArray<DetailItem>;
}

export interface BulletPanel {
  title: string;
  items: NonEmptyArray<string>;
}

export interface BusinessModelDetail {
  /** Must equal a slug in MOCK_BUSINESS_MODELS. */
  slug: string;
  /** Hero paragraph. */
  headline: string;
  /** Unique, beginner-friendly page description (used for SEO metadata). */
  description: string;

  characteristics: { tags: NonEmptyArray<string>; note: string };

  whatIsIt: { sub: string; paragraphs: NonEmptyArray<string> };
  flow: { sub: string; steps: NonEmptyArray<FlowStep> };
  howItWorks: {
    sub: string;
    intro: string;
    chain: NonEmptyArray<HowItWorksStep>;
    outro: string;
  };

  whoPays: ItemSection;
  makeMoney: ItemSection;
  moneyGoes: ItemSection;

  growth: {
    drivers: BulletPanel;
    opportunities: BulletPanel;
    callout: string;
  };
  strength: { title: string; sub: string; items: NonEmptyArray<DetailItem> };
  competition: { compete: BulletPanel; challenges: BulletPanel };
  risks: ItemSection;

  metrics: { sub: string; items: NonEmptyArray<MetricItem>; callout: string };

  companies: { sub: string; items: NonEmptyArray<CompanyReference> };
  related: { sub: string; slugs: NonEmptyArray<string> };

  disclaimer: string;
}