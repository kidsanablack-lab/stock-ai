import type { CompanyProfile } from "@/types/company";
import { formatGrowth, formatMoney, toBillions } from "@/lib/home-format";

export type HomeProfile = { slug: string; company: CompanyProfile };

export type PreviewItem = {
  slug: string;
  name: string;
  ticker: string;
  industry: string;
  logo: string;
  score: number;
  scoreLabel: string;
  marketCap: string;
  revenue: string;
  growth: string;
  growthPositive: boolean;
  segments: { name: string; percentage: number }[];
  insight: string;
  fiscalYear: string;
};

/** Companies shown as tabs in the hero preview (in this order). */
export const PREVIEW_SLUGS = ["nvidia", "apple", "microsoft", "amazon"];

export function pickProfiles(
  profiles: HomeProfile[],
  slugs: string[],
): HomeProfile[] {
  return slugs.flatMap((slug) => {
    const profile = profiles.find((p) => p.slug === slug);
    return profile ? [profile] : [];
  });
}

/** Only the fields the client-side preview needs. */
export function buildPreviewItems(profiles: HomeProfile[]): PreviewItem[] {
  return pickProfiles(profiles, PREVIEW_SLUGS).map(({ slug, company }) => ({
    slug,
    name: company.identity.name,
    ticker: company.identity.ticker,
    industry: company.identity.industry,
    logo: company.identity.logo,
    score: company.scopeScore.score,
    scoreLabel: company.scopeScore.label,
    marketCap: formatMoney(company.overview.marketCap),
    revenue: formatMoney(company.overview.revenue),
    growth: formatGrowth(company.overview.revenueYoY.value),
    growthPositive: company.overview.revenueYoY.value >= 0,
    segments: company.businessSegments.segments.map((segment) => ({
      name: segment.name,
      percentage: segment.percentage,
    })),
    insight: company.businessSegments.insight,
    fiscalYear: company.overview.revenueFiscalYear,
  }));
}

/** Apple vs NVIDIA when available, otherwise the first two profiles. */
export function getComparePair(
  profiles: HomeProfile[],
): [HomeProfile, HomeProfile] | null {
  const a = profiles.find((p) => p.slug === "apple") ?? profiles[0];
  if (!a) return null;

  const b =
    profiles.find((p) => p.slug === "nvidia" && p.slug !== a.slug) ??
    profiles.find((p) => p.slug !== a.slug);

  return b ? [a, b] : null;
}

export type CompareRow = {
  label: string;
  a: { text: string; width: number };
  b: { text: string; width: number };
};

const share = (value: number, max: number) =>
  max > 0 ? Math.min(100, (Math.abs(value) / max) * 100) : 0;

/** Revenue and growth rows for the Compare section (bar width = share of the larger value). */
export function buildCompareRows(
  pair: [HomeProfile, HomeProfile],
): CompareRow[] {
  const [a, b] = pair;

  const revenueA = toBillions(a.company.overview.revenue);
  const revenueB = toBillions(b.company.overview.revenue);
  const revenueMax = Math.max(revenueA, revenueB);

  const growthA = a.company.overview.revenueYoY.value;
  const growthB = b.company.overview.revenueYoY.value;
  const growthMax = Math.max(Math.abs(growthA), Math.abs(growthB));

  return [
    {
      label: "Revenue",
      a: { text: formatMoney(a.company.overview.revenue), width: share(revenueA, revenueMax) },
      b: { text: formatMoney(b.company.overview.revenue), width: share(revenueB, revenueMax) },
    },
    {
      label: "Revenue growth",
      a: { text: formatGrowth(growthA), width: share(growthA, growthMax) },
      b: { text: formatGrowth(growthB), width: share(growthB, growthMax) },
    },
  ];
}
