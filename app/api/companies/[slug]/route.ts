import { NextResponse } from "next/server";
import { getCompany } from "@/lib/company-data";

type RouteParams = {
  slug: string;
};

// GET /api/companies/[slug]
export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params;
  const company = await getCompany(slug);

  if (!company) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: 404 },
    );
  }

  return NextResponse.json({
    slug,
    ...company,
  });
}