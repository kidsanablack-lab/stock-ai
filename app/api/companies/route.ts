import { NextResponse } from "next/server";
import {
  getAllCompanyProfiles,
  getCompanyByStockTicker,
} from "@/lib/company-data";

// GET /api/companies
// GET /api/companies?ticker=AAPL
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const ticker = searchParams.get("ticker");

  if (ticker) {
    const result = getCompanyByStockTicker(ticker);

    if (!result) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      slug: result.slug,
      ...result.company,
    });
  }

  const companies = getAllCompanyProfiles().map(
    ({ slug, company }) => ({
      slug,
      ...company,
    }),
  );

  return NextResponse.json(companies);
}