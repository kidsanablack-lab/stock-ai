/**
 * Industry grouping for the home page. Mirrors the mapping used by
 * components/home/BrowseByCategory.tsx so counts stay the same.
 */
export const HOME_CATEGORIES = [
  { key: "technology", label: "Technology" },
  { key: "consumer", label: "Consumer" },
  { key: "finance", label: "Finance" },
  { key: "healthcare", label: "Healthcare" },
  { key: "energy", label: "Energy" },
] as const;

export function getCategoryKey(industry: string): string {
  const value = industry.toLowerCase();

  if (
    value.includes("bank") ||
    value.includes("payment") ||
    value.includes("financial")
  ) {
    return "finance";
  }

  if (
    value.includes("pharma") ||
    value.includes("health") ||
    value.includes("medical")
  ) {
    return "healthcare";
  }

  if (
    value.includes("energy") ||
    value.includes("oil") ||
    value.includes("gas") ||
    value.includes("utility")
  ) {
    return "energy";
  }

  if (
    value.includes("consumer") ||
    value.includes("restaurant") ||
    value.includes("apparel") ||
    value.includes("automotive")
  ) {
    return "consumer";
  }

  return "technology";
}
