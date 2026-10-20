import type { Metadata } from "next";
import WatchlistContent, {
  type WatchlistRow,
} from "@/components/watchlist/WatchlistContent";
import { getAllCompanyProfiles } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Watchlist — Scope",
  description: "Companies you saved to follow on Scope.",
};

export default async function WatchlistPage() {
  const profiles = await getAllCompanyProfiles();

  // The saved list lives in the visitor's browser, so the server sends every
  // company and the page picks the saved ones. Display fields only.
  const rows: WatchlistRow[] = profiles.map(({ slug, company }) => ({
    slug,
    name: company.identity.name,
    ticker: company.identity.ticker,
    logo: company.identity.logo,
    logoInitial: company.identity.logoInitial,
    industry: company.identity.industry,
    marketCap: company.overview.marketCap,
    revenue: company.overview.revenue,
    growth: company.overview.revenueYoY.value,
    score: company.scopeScore.score,
    scoreLabel: company.scopeScore.label,
  }));

  return <WatchlistContent rows={rows} />;
}