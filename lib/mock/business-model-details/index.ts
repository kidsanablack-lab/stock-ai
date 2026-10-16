import type { CompanyProfile } from "@/types/company";
import {
  MOCK_BUSINESS_MODELS,
  type MockBusinessModel,
} from "../business-models";
import { AI_DETAIL } from "./ai";
import { SAAS_DETAIL } from "./saas";
import { CLOUD_DETAIL} from "./cloud";
import { SEMICONDUCTORS_DETAIL} from "./semiconductors";
import { CYBERSECURITY_DETAIL} from "./cybersecurity";
import { BANKING_DETAIL } from "./banking";
import { ENERGY_DETAIL } from "./energy";
import { TELECOM_DETAIL } from "./telecom";
import { INSURANCE_DETAIL } from "./insurance";
import { HARDWARE_DETAIL } from "./hardware";
import { MANUFACTURING_DETAIL } from "./manufacturing";
import { realEstateDetail } from "./real-estate";
import { defenseAerospaceDetail } from "./defense-aerospace";
import { biotechnologyPharmaceuticalsDetail } from "./biotechnology-pharmaceuticals";
import { paymentsDetail } from "./payments";
import { financialServicesDetail } from "./financial-services";
import { advertisingDetail } from "./advertising";
import { marketplaceDetail } from "./marketplace";
import { ecommerceDetail } from "./e-commerce";
import { healthcareDetail } from "./healthcare";
import { gamingDetail } from "./gaming";
import { consumerBrandsDetail } from "./consumer-brands";
import { logisticsDetail } from "./logistics";
import type { BusinessModelDetail, CompanyReference } from "./types";

/** To add a model: create <slug>.ts, import it here, add it below, and remove its slug from NOT_IMPLEMENTED_SLUGS. */
export const BUSINESS_MODEL_DETAILS: readonly BusinessModelDetail[] = [
  AI_DETAIL,
  SAAS_DETAIL,
  CLOUD_DETAIL,
  SEMICONDUCTORS_DETAIL,
  CYBERSECURITY_DETAIL,
  BANKING_DETAIL,
  ENERGY_DETAIL,
  TELECOM_DETAIL,
  INSURANCE_DETAIL,
  HARDWARE_DETAIL,
  MANUFACTURING_DETAIL,
  realEstateDetail,
  defenseAerospaceDetail,
  biotechnologyPharmaceuticalsDetail,
  paymentsDetail,
  financialServicesDetail,
  advertisingDetail,
  marketplaceDetail,
  ecommerceDetail,
  healthcareDetail,
  gamingDetail,
  consumerBrandsDetail,
  logisticsDetail,
];

/** Catalog slugs that intentionally have no detail page yet. The validator checks this list. */
export const NOT_IMPLEMENTED_SLUGS: readonly string[] = [

];

const BY_SLUG = new Map(BUSINESS_MODEL_DETAILS.map((d) => [d.slug, d]));

export function getBusinessModelDetail(
  slug: string,
): BusinessModelDetail | undefined {
  return BY_SLUG.get(slug);
}

/* ------------------------- Reference resolution ------------------------- */

/** Minimal shape needed from getAllCompanyProfiles() results. */
export type CompanyProfileEntry = {
  slug: string;
  company: Pick<CompanyProfile, "identity">;
};

export type ResolvedCompany = {
  slug: string;
  role: string;
  identity: CompanyProfile["identity"];
};

export function resolveCompanyReferences(
  references: readonly CompanyReference[],
  profiles: readonly CompanyProfileEntry[],
): { resolved: ResolvedCompany[]; unresolvedSlugs: string[] } {
  const resolved: ResolvedCompany[] = [];
  const unresolvedSlugs: string[] = [];

  for (const ref of references) {
    const profile = profiles.find((p) => p.slug === ref.slug);
    if (profile) {
      resolved.push({
        slug: ref.slug,
        role: ref.role,
        identity: profile.company.identity,
      });
    } else {
      unresolvedSlugs.push(ref.slug);
    }
  }
  return { resolved, unresolvedSlugs };
}

export function resolveRelatedModels(slugs: readonly string[]): {
  resolved: MockBusinessModel[];
  unresolvedSlugs: string[];
} {
  const resolved: MockBusinessModel[] = [];
  const unresolvedSlugs: string[] = [];
  for (const slug of slugs) {
    const found = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
    if (found) resolved.push(found);
    else unresolvedSlugs.push(slug);
  }
  return { resolved, unresolvedSlugs };
}