import Link from "next/link";
import CompanySearch from "@/components/ui/CompanySearch";
import Container from "@/components/ui/Container";
import HeroPreview from "@/components/home/HeroPreview";
import type { CompanySearchItem } from "@/lib/company-search";
import type { PreviewItem } from "@/lib/home-data";

type HomeHeroProps = {
  companies: CompanySearchItem[];
  previewItems: PreviewItem[];
};

// Quick links under the search box. Only shown if the company exists.
const QUICK_LINKS = [
  { slug: "nvidia", label: "NVIDIA" },
  { slug: "apple", label: "Apple" },
  { slug: "microsoft", label: "Microsoft" },
  { slug: "amazon", label: "Amazon" },
];

export default function HomeHero({ companies, previewItems }: HomeHeroProps) {
  const quickLinks = QUICK_LINKS.filter((link) =>
    companies.some((company) => company.slug === link.slug),
  );

  return (
    <section className="pb-16 pt-14 lg:pb-24 lg:pt-20">
      <Container className="grid items-center gap-12 lg:grid-cols-[1.02fr_1fr] lg:gap-14">
        <div>
          <h1 className="font-serif text-[clamp(40px,5.8vw,66px)] font-normal leading-[1.03] tracking-[-0.02em] text-ink">
            Understand any company in seconds.
          </h1>

          <p className="mt-5 max-w-[30em] text-lg leading-relaxed text-ink-muted">
            What it does, how it makes money, and whether it&apos;s worth your
            attention. Explained visually, not buried in filings.
          </p>

          <CompanySearch
            companies={companies}
            variant="large"
            from="home"
            submitLabel="Scope it out"
            placeholder='Search companies or ticker, like "Apple"'
            className="mt-8 max-w-[560px]"
          />

          {quickLinks.length > 0 && (
            <div className="mt-4 flex flex-wrap items-center gap-2 text-sm text-ink-muted">
              <span>Try</span>
              {quickLinks.map((link) => (
                <Link
                  key={link.slug}
                  href={`/company/${link.slug}?from=home`}
                  className="rounded-full border border-border bg-white px-3 py-1 text-[13.5px] font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          )}
        </div>

        <HeroPreview items={previewItems} />
      </Container>
    </section>
  );
}
