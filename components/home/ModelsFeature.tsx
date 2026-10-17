import Link from "next/link";
import Container from "@/components/ui/Container";
import TextLink from "@/components/ui/TextLink";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";

const FEATURED_SLUGS = ["ai", "saas", "cloud", "banking"];
const SHOWN = 8;

export default function ModelsFeature() {
  const total = MOCK_BUSINESS_MODELS.length;

  const featured = FEATURED_SLUGS.flatMap((slug) => {
    const model = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
    return model ? [model] : [];
  });
  const others = MOCK_BUSINESS_MODELS.filter(
    (m) => !FEATURED_SLUGS.includes(m.slug),
  );
  const shown = [...featured, ...others].slice(0, SHOWN);
  const remaining = total - shown.length;

  return (
    <section className="bg-surface py-16 lg:py-[72px]">
      <Container>
        <div className="mb-10 flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-[620px]">
            <h2 className="font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink">
              How do companies actually make money?
            </h2>
            <p className="mt-3.5 text-[17px] leading-relaxed text-ink-muted">
              {total} business models, from AI to Banking. See how each one
              earns, grows and faces risk.
            </p>
          </div>
          <TextLink href="/business-models">View all {total}</TextLink>
        </div>

        <ul className="grid gap-x-12 border-t border-border md:grid-cols-2">
          {shown.map((model) => (
            <li key={model.slug} className="border-b border-border">
              <Link
                href={`/business-models/${model.slug}`}
                className="group grid grid-cols-[44px_1fr_auto] items-center gap-4 py-5"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-border bg-white text-[22px] text-primary">
                  <i className={`ti ${model.icon}`} aria-hidden="true" />
                </span>
                <span className="min-w-0">
                  <b className="block text-[17px] font-semibold leading-tight text-ink">
                    {model.name}
                  </b>
                  <span className="mt-1 line-clamp-2 block text-sm text-ink-muted">
                    {model.description}
                  </span>
                </span>
                <i
                  className="ti ti-arrow-right text-ink-muted transition-transform group-hover:translate-x-1 group-hover:text-primary"
                  aria-hidden="true"
                />
              </Link>
            </li>
          ))}
        </ul>

        {remaining > 0 && (
          <p className="mt-6 text-[15px] text-ink-muted">
            Plus {remaining} more, including payments, e-commerce and
            semiconductors.{" "}
            <Link
              href="/business-models"
              className="font-semibold text-primary hover:underline hover:underline-offset-4"
            >
              Browse them all
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}
