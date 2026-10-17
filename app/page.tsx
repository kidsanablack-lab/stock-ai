import HomeHero from "@/components/home/HomeHero";
import CompaniesSection from "@/components/home/CompaniesSection";
import CompareFeature from "@/components/home/CompareFeature";
import ModelsFeature from "@/components/home/ModelsFeature";
import PowersFeature from "@/components/home/PowersFeature";
import ValuationFeature from "@/components/home/ValuationFeature";
import PortfolioFeature from "@/components/home/PortfolioFeature";
import ProfileTour from "@/components/home/ProfileTour";
import TrustSection from "@/components/home/TrustSection";
import FinalCta from "@/components/home/FinalCta";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";
import { buildPreviewItems } from "@/lib/home-data";

export default async function Home() {
  const profiles = await getAllCompanyProfiles();
  const companies = createCompanySearchItems(profiles);
  const previewItems = buildPreviewItems(profiles);

  return (
<main>
  <HomeHero companies={companies} previewItems={previewItems} />
  <CompaniesSection profiles={profiles} />
  <ProfileTour profiles={profiles} />
  <CompareFeature profiles={profiles} />
  <ModelsFeature />
  <PowersFeature />
  <ValuationFeature />
  <PortfolioFeature />
  <TrustSection profiles={profiles} />
  <FinalCta companies={companies} profiles={profiles} />
</main>
  );
}
