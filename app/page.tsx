import HomeClient from "@/components/home/HomeClient";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";

export default function Home() {
 const companies = createCompanySearchItems(
  getAllCompanyProfiles(),
);

  return <HomeClient companies={companies} />;
}