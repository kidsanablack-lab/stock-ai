import type { Metadata } from "next";
import CompareCompanies from "@/components/CompareCompanies";
import { getAllCompanyProfiles } from "@/lib/company-data";

export const metadata: Metadata = {
  title: "Compare Companies | Scope",
  description:
    "Compare company revenue, growth, net income, and free cash flow. Understand how businesses differ with Scope.",
};

export default async function ComparePage() {
  const companies = await getAllCompanyProfiles();

  return <CompareCompanies companies={companies} />;
}