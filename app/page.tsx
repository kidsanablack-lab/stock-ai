import HomeClient from "@/components/home/HomeClient";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";

export default function Home() {
  const profiles = getAllCompanyProfiles();

  const companies = createCompanySearchItems(profiles);

  return (
    <HomeClient
      companies={companies}
      profiles={profiles}
    />
  );
}