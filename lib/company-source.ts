import { supabase } from "@/lib/supabase";
import type { CompanyProfile } from "@/types/company";

type CompanyRow = {
  id: string;
  slug: string;
  name: string;
  brand_name: string | null;
  ticker: string;
  exchange: string;
  industry: string;
  logo_initial: string;
  logo: string;
  tagline: string;
  what_it_does: string;
  founded: string;
  headquarters: string;
  ceo: string;
  ceo_since: string;
  scope_score: number;
  scope_score_label: string;

business_segments_insight: string;
business_segments_footnote: string;
competitors_context_note: string;
competitors_insight: string;

overview: CompanyProfile["overview"];
  snapshot: CompanyProfile["snapshot"];
  thirty_second_summary: CompanyProfile["thirtySecondSummary"];
  business_model: CompanyProfile["businessModel"];
  strengths_and_risks: CompanyProfile["strengthsAndRisks"];
  financial_overview: CompanyProfile["financialOverview"];
  financial_history: CompanyProfile["financialHistory"];
  ecosystem: CompanyProfile["ecosystem"];
};

type BusinessSegmentRow = {
  company_id: string;
  name: string;
  amount_value: number;
  amount_unit: "B" | "M" | "T";
  percentage: number;
  yoy_change: number;
  color: string;
  sort_order: number;
};

type CompetitorRow = {
  company_id: string;
  name: string;
  icon: string;
  color: string;
  background_tint: string;
  tag_text_color: string;
  market_cap_value: number;
  market_cap_unit: "B" | "M" | "T";
  relative_size: number;
  tag: string;
  relationship: string;
  sort_order: number;
};

type CompanyDataRows = {
  company: CompanyRow;
  segments: BusinessSegmentRow[];
  competitors: CompetitorRow[];
};

function buildCompanyProfile({
  company,
  segments,
  competitors,
}: CompanyDataRows): CompanyProfile {
  return {
    identity: {
      name: company.name,
      brandName: company.brand_name ?? undefined,
      ticker: company.ticker,
      exchange: company.exchange,
      industry: company.industry,
      logoInitial: company.logo_initial,
      logo: company.logo,
      tagline: company.tagline,
    },

    scopeScore: {
      score: company.scope_score,
      label: company.scope_score_label,
    },

    overview: company.overview,

    snapshot: company.snapshot,

    thirtySecondSummary: company.thirty_second_summary,

    businessSegments: {
  totalRevenue: company.overview.revenue,
  fiscalYearLabel: company.financial_overview.fiscalYearLabel,
  segments: segments
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((segment) => ({
      name: segment.name,
      amount: {
        value: segment.amount_value,
        unit: segment.amount_unit,
      },
      percentage: segment.percentage,
      yoyChange: {
        value: segment.yoy_change,
      },
      color: segment.color,
    })),
  insight: company.business_segments_insight,
  footnote: company.business_segments_footnote,
},

    businessModel: company.business_model,

    strengthsAndRisks: company.strengths_and_risks,

    financialOverview: company.financial_overview,

    financialHistory: company.financial_history,

    ecosystem: company.ecosystem,

    competitors: {
  contextNote: company.competitors_context_note,
  competitors: competitors
    .sort((a, b) => a.sort_order - b.sort_order)
        .map((competitor) => ({
          name: competitor.name,
          icon: competitor.icon,
          color: competitor.color,
          backgroundTint: competitor.background_tint,
          tagTextColor: competitor.tag_text_color,
          marketCap: {
            value: competitor.market_cap_value,
            unit: competitor.market_cap_unit,
          },
          relativeSize: competitor.relative_size,
          tag: competitor.tag,
          relationship: competitor.relationship,
        })),
        insight: company.competitors_insight,
    },
  };
}

async function getCompanyData(
  filters: { slug?: string; ticker?: string },
): Promise<CompanyProfile | undefined> {
  let query = supabase
    .from("companies")
    .select(`
      *,
      business_segments (
        company_id,
        name,
        amount_value,
        amount_unit,
        percentage,
        yoy_change,
        color,
        sort_order
      ),
      competitors (
        company_id,
        name,
        icon,
        color,
        background_tint,
        tag_text_color,
        market_cap_value,
        market_cap_unit,
        relative_size,
        tag,
        relationship,
        sort_order
      )
    `);

  if (filters.slug) {
    query = query.eq("slug", filters.slug.toLowerCase());
  }

  if (filters.ticker) {
    query = query.eq("ticker", filters.ticker.toUpperCase());
  }

  const { data, error } = await query.maybeSingle();

  if (error) {
    console.error("Supabase company query error:", error);
    throw new Error(error.message);
  }

  if (!data) {
    return undefined;
  }

  const {
    business_segments: segments,
    competitors,
    ...company
  } = data as CompanyRow & {
    business_segments: BusinessSegmentRow[];
    competitors: CompetitorRow[];
  };

  return buildCompanyProfile({
    company,
    segments: segments ?? [],
    competitors: competitors ?? [],
  });
}

export async function getCompany(
  slug: string,
): Promise<CompanyProfile | undefined> {
  return getCompanyData({ slug });
}

export async function getCompanyByTicker(
  ticker: string,
): Promise<{ slug: string; company: CompanyProfile } | undefined> {
  const company = await getCompanyData({ ticker });

  if (!company) {
    return undefined;
  }

  const slug = ticker.toLowerCase() === "aapl"
    ? "apple"
    : ticker.toLowerCase() === "msft"
      ? "microsoft"
      : ticker.toLowerCase() === "googl"
        ? "google"
        : ticker.toLowerCase() === "nvda"
          ? "nvidia"
          : ticker.toLowerCase() === "amzn"
            ? "amazon"
            : ticker.toLowerCase() === "meta"
              ? "meta"
              : undefined;

  if (!slug) {
    return undefined;
  }

  return {
    slug,
    company,
  };
}

export async function getCompanySlugs(): Promise<string[]> {
  const { data, error } = await supabase
    .from("companies")
    .select("slug")
    .order("slug");

  if (error) {
    console.error("Supabase company slugs query error:", error);
    throw new Error(error.message);
  }

  return (data ?? []).map((company) => company.slug);
}

export async function getAllCompanies(): Promise<
  {
    slug: string;
    company: CompanyProfile;
  }[]
> {
  const { data, error } = await supabase
    .from("companies")
    .select(`
      *,
      business_segments (
        company_id,
        name,
        amount_value,
        amount_unit,
        percentage,
        yoy_change,
        color,
        sort_order
      ),
      competitors (
        company_id,
        name,
        icon,
        color,
        background_tint,
        tag_text_color,
        market_cap_value,
        market_cap_unit,
        relative_size,
        tag,
        relationship,
        sort_order
      )
    `)
    .order("slug");

  if (error) {
    console.error("Supabase companies query error:", error);
    throw new Error(error.message);
  }

  return (data ?? []).map((row) => {
    const {
      business_segments: segments,
      competitors,
      ...company
    } = row as CompanyRow & {
      business_segments: BusinessSegmentRow[];
      competitors: CompetitorRow[];
    };

    return {
      slug: company.slug,
      company: buildCompanyProfile({
        company,
        segments: segments ?? [],
        competitors: competitors ?? [],
      }),
    };
  });
}