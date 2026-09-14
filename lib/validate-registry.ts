import {
  getAllSlugs,
  getAllTickers,
  getCompanyBySlug,
} from "@/data/companies";

export function validateRegistry(): string[] {
  const errors: string[] = [];

  const slugs = getAllSlugs();
  const tickers = getAllTickers();

  // ─────────────────────────────────────────────
  // Registry Basic Integrity
  // ─────────────────────────────────────────────

  if (slugs.length === 0) {
    errors.push("Company registry is empty.");
  }

  if (tickers.length !== slugs.length) {
    errors.push(
      `Registry mismatch: ${slugs.length} slugs but ${tickers.length} tickers.`,
    );
  }

  // ─────────────────────────────────────────────
  // Duplicate Slugs
  // ─────────────────────────────────────────────

  const duplicateSlugs = slugs.filter(
    (slug, index) => slugs.indexOf(slug) !== index,
  );

  if (duplicateSlugs.length > 0) {
    errors.push(
      `Duplicate slugs found: ${[
        ...new Set(duplicateSlugs),
      ].join(", ")}`,
    );
  }

  // ─────────────────────────────────────────────
  // Duplicate Tickers
  // ─────────────────────────────────────────────

  const duplicateTickers = tickers.filter(
    (ticker, index) => tickers.indexOf(ticker) !== index,
  );

  if (duplicateTickers.length > 0) {
    errors.push(
      `Duplicate tickers found: ${[
        ...new Set(duplicateTickers),
      ].join(", ")}`,
    );
  }

  // ─────────────────────────────────────────────
  // Cross-Company Identity Checks
  // ─────────────────────────────────────────────

  const names: string[] = [];
  const brandNames: string[] = [];

  for (const slug of slugs) {
    const company = getCompanyBySlug(slug);

    if (!company) {
      errors.push(
        `Registry entry "${slug}" does not resolve to a company.`,
      );
      continue;
    }

    const { identity } = company;

    // Slug must match registry key.
    if (slug !== slug.trim()) {
      errors.push(
        `Invalid slug "${slug}": contains leading or trailing whitespace.`,
      );
    }

    if (slug !== slug.toLowerCase()) {
      errors.push(
        `Invalid slug "${slug}": must be lowercase.`,
      );
    }

    // Ticker format.
    if (!/^[A-Z0-9.-]+$/.test(identity.ticker)) {
      errors.push(
        `${slug}: invalid ticker format "${identity.ticker}".`,
      );
    }

    if (identity.ticker !== identity.ticker.trim()) {
      errors.push(
        `${slug}: ticker contains leading or trailing whitespace.`,
      );
    }

    // Company name integrity.
    const normalizedName = identity.name.trim().toLowerCase();

    if (names.includes(normalizedName)) {
      errors.push(
        `Duplicate company name found: "${identity.name}".`,
      );
    }

    names.push(normalizedName);

    // Brand name integrity.
    if (identity.brandName) {
      const normalizedBrandName =
        identity.brandName.trim().toLowerCase();

      if (brandNames.includes(normalizedBrandName)) {
        errors.push(
          `Duplicate brand name found: "${identity.brandName}".`,
        );
      }

      brandNames.push(normalizedBrandName);

      if (
        identity.brandName !== identity.brandName.trim()
      ) {
        errors.push(
          `${slug}: brandName contains leading or trailing whitespace.`,
        );
      }
    }
  }

  return errors;
}