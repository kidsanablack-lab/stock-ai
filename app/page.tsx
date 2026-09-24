import HomeClient from "@/components/home/HomeClient";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";

export default async function Home() {
  const profiles = await getAllCompanyProfiles();

  const companies = createCompanySearchItems(profiles);

  return (
    <HomeClient
      companies={companies}
      profiles={profiles}
    />
  );
}