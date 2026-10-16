/**
 * Pure validation helpers. No network, no Supabase, no environment variables.
 * Live company-slug checking is separate (validateCompanyReferences) and only
 * needs a list of known slugs that the caller supplies.
 */
import type { MockBusinessModel } from "../business-models";
import type { BusinessModelDetail } from "./types";

export type ValidationIssue = {
  level: "error" | "warning";
  scope: string;
  message: string;
};

/** Exact metric labels required for specific models. */
export const REQUIRED_METRIC_LABELS: Record<string, readonly string[]> = {
  saas: ["MRR", "ARR", "Churn Rate", "CAC", "Gross Margin", "LTV", "NRR"],
};

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const dupes = new Set<string>();
  for (const v of values) {
    if (seen.has(v)) dupes.add(v);
    seen.add(v);
  }
  return [...dupes];
}

/** Walk the detail object: strings must be non-blank, arrays non-empty, icons "ti-*". */
function walk(
  value: unknown,
  path: string,
  scope: string,
  issues: ValidationIssue[],
): void {
  if (typeof value === "string") {
    if (value.trim() === "") {
      issues.push({ level: "error", scope, message: `Blank text at "${path}".` });
    }
    if (path.endsWith(".icon") && !value.startsWith("ti-")) {
      issues.push({
        level: "error",
        scope,
        message: `Icon at "${path}" must start with "ti-" (got "${value}").`,
      });
    }
    return;
  }
  if (Array.isArray(value)) {
    if (value.length === 0) {
      issues.push({ level: "error", scope, message: `Empty array at "${path}".` });
    }
    value.forEach((v, i) => walk(v, `${path}[${i}]`, scope, issues));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (v === undefined) continue;
      walk(v, path ? `${path}.${k}` : k, scope, issues);
    }
  }
}

export function validateStatic(
  catalog: readonly MockBusinessModel[],
  details: readonly BusinessModelDetail[],
  notImplemented: readonly string[],
): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const err = (scope: string, message: string) =>
    issues.push({ level: "error", scope, message });

  const catalogSlugs = catalog.map((m) => m.slug);
  const catalogSet = new Set(catalogSlugs);
  const detailSlugs = details.map((d) => d.slug);
  const detailSet = new Set(detailSlugs);
  const notImplSet = new Set(notImplemented);

  for (const s of duplicates(catalogSlugs)) err("catalog", `Duplicate catalog slug "${s}".`);
  for (const s of duplicates(detailSlugs)) err("details", `Duplicate detail slug "${s}".`);
  for (const s of duplicates([...notImplemented])) err("registry", `"${s}" appears twice in NOT_IMPLEMENTED_SLUGS.`);

  for (const slug of catalogSlugs) {
    const hasDetail = detailSet.has(slug);
    const marked = notImplSet.has(slug);
    if (!hasDetail && !marked) {
      err("registry", `Catalog slug "${slug}" has no detail data and is not listed in NOT_IMPLEMENTED_SLUGS.`);
    }
    if (hasDetail && marked) {
      err("registry", `Catalog slug "${slug}" has detail data but is still listed in NOT_IMPLEMENTED_SLUGS.`);
    }
  }
  for (const slug of notImplemented) {
    if (!catalogSet.has(slug)) err("registry", `NOT_IMPLEMENTED_SLUGS contains "${slug}", which is not in the catalog.`);
  }

  for (const d of details) {
    const scope = `detail:${d.slug}`;

    if (!catalogSet.has(d.slug)) {
      err(scope, `Detail slug "${d.slug}" does not match any catalog slug.`);
    }

    walk(d, "", scope, issues);

    for (const s of duplicates(d.companies.items.map((c) => c.slug))) {
      err(scope, `Company "${s}" is referenced more than once.`);
    }
    for (const s of duplicates(d.related.slugs)) {
      err(scope, `Related model "${s}" is listed more than once.`);
    }
    for (const rel of d.related.slugs) {
      if (rel === d.slug) err(scope, `A model cannot be related to itself ("${rel}").`);
      else if (!catalogSet.has(rel)) err(scope, `Related slug "${rel}" does not exist in the catalog.`);
    }

    const required = REQUIRED_METRIC_LABELS[d.slug];
    if (required) {
      const labels = d.metrics.items.map((m) => m.label);
      const missing = required.filter((l) => !labels.includes(l));
      const extra = labels.filter((l) => !required.includes(l));
      if (missing.length) err(scope, `Missing required metrics: ${missing.join(", ")}.`);
      if (extra.length) err(scope, `Unexpected metrics (exactly ${required.length} required): ${extra.join(", ")}.`);
      if (labels.length !== required.length) {
        err(scope, `Expected exactly ${required.length} metrics, found ${labels.length}.`);
      }
    }
  }

  return issues;
}

/** Needs a list of real company slugs (from getAllCompanyProfiles) supplied by the caller. */
export function validateCompanyReferences(
  details: readonly BusinessModelDetail[],
  knownCompanySlugs: Iterable<string>,
): ValidationIssue[] {
  const known = new Set(knownCompanySlugs);
  const issues: ValidationIssue[] = [];
  for (const d of details) {
    for (const c of d.companies.items) {
      if (!known.has(c.slug)) {
        issues.push({
          level: "error",
          scope: `detail:${d.slug}`,
          message: `Company slug "${c.slug}" has no company profile. Remove it or add the profile first.`,
        });
      }
    }
  }
  return issues;
}