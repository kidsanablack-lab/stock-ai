import { Suspense } from "react";
import { getAllCompanyProfiles } from "@/lib/company-data";
import TrendingContent from "./TrendingContent";

export default async function TrendingPage() {
  const profiles = await getAllCompanyProfiles();

  return (
    <Suspense fallback={null}>
      <TrendingContent profiles={profiles} />
    </Suspense>
  );
}