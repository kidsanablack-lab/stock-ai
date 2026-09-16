import { NextResponse } from "next/server";
import { getCompanyWithExternalData } from "@/lib/company-data";

type RouteParams = {
  slug: string;
};

// GET /api/companies/[slug]/financial
export async function GET(
  request: Request,
  { params }: { params: Promise<RouteParams> },
) {
  const { slug } = await params;

  try {
    const result = await getCompanyWithExternalData(slug);

    if (!result) {
      return NextResponse.json(
        { error: "Company not found" },
        { status: 404 },
      );
    }

    return NextResponse.json({
      slug: result.slug,
      ticker: result.curated.identity.ticker,
      financial: result.external,
    });
  } catch (error) {
    console.error("Financial data request failed:", error);

    return NextResponse.json(
      {
        error: "Financial data unavailable",
        message:
          error instanceof Error
            ? error.message
            : "Unknown error",
      },
      { status: 502 },
    );
  }
}