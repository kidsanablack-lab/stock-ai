import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import CompanySearch from "@/components/ui/CompanySearch";
import type { CompanySearchItem } from "@/lib/company-search";
import type { HomeProfile } from "@/lib/home-data";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";
import { POWERS } from "@/lib/seven-powers/powers";

const POPULAR = [
  { slug: "apple", label: "Apple" },
  { slug: "microsoft", label: "Microsoft" },
  { slug: "google", label: "Google" },
  { slug: "nvidia", label: "NVIDIA" },
  { slug: "amazon", label: "Amazon" },
];

type FinalCtaProps = {
  companies: CompanySearchItem[];
  profiles: HomeProfile[];
};

/** Closing section: repeats the main action of the site, searching for a company. */
export default function FinalCta({ companies, profiles }: FinalCtaProps) {
  return (
    <section className="pb-4">
      <Container>
        <div className="rounded-[28px] bg-surface px-6 py-14 text-center sm:px-8 sm:py-[72px]">
          <h2 className="mx-auto max-w-[14em] font-serif text-[clamp(32px,4.6vw,50px)] font-normal leading-[1.06] tracking-[-0.02em] text-ink">
            Explore companies through the things that actually matter.
          </h2>

          <CompanySearch
            companies={companies}
            variant="large"
            from="home"
            submitLabel="Scope it out"
            placeholder='Search companies or ticker, like "Apple"'
            className="mx-auto mt-9 max-w-[560px]"
          />

          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {POPULAR.map((item) => {
              const logo = profiles.find((p) => p.slug === item.slug)?.company
                .identity.logo;

              return (
                <Link
                  key={item.slug}
                  href={`/company/${item.slug}?from=home`}
                  className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3.5 py-1.5 text-sm font-medium text-ink transition-colors hover:border-primary hover:text-primary"
                >
                  {logo && (
                    <Image
                      src={logo}
                      alt=""
                      width={16}
                      height={16}
                      style={{ width: 16, height: 16, objectFit: "contain" }}
                    />
                  )}
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="mx-auto mt-10 flex max-w-[560px] flex-wrap items-center justify-center gap-x-7 gap-y-1 border-t border-border pt-6 text-sm text-ink-muted">
            <Link href="/trending" className="transition-colors hover:text-primary">
              {profiles.length} companies
            </Link>
            <Link href="/business-models" className="transition-colors hover:text-primary">
              {MOCK_BUSINESS_MODELS.length} business models
            </Link>
            <Link href="/7-powers" className="transition-colors hover:text-primary">
              {POWERS.length} powers of business
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
