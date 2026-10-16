import type { Metadata } from "next";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Fraunces } from "next/font/google";
import BusinessModelCard from "@/components/business-models/BusinessModelCard";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { MOCK_BUSINESS_MODELS } from "@/lib/mock/business-models";
import {
  getBusinessModelDetail,
  resolveCompanyReferences,
  resolveRelatedModels,
} from "@/lib/mock/business-model-details";
import type { DetailItem } from "@/lib/mock/business-model-details/types";
import "../business-models.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--bm-serif",
  display: "swap",
});

type PageProps = {
  params: Promise<{ slug: string }>;
};

/* =========================================================
   METADATA (per business model)
========================================================= */

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const model = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
  const detail = getBusinessModelDetail(slug);

  if (!model || !detail) {
    return { title: "Business Model Not Found | Scope" };
  }

  return {
    title: `${model.name} Business Model | Scope`,
    description: detail.description,
  };
}

/* =========================================================
   PRESENTATION CONSTANTS (not educational content)
========================================================= */

/* สีธีมของหน้า detail ทุกหน้า (ล็อกเป็นสีฟ้า ไม่เปลี่ยนตาม catalog) */
const DETAIL_THEME = { bg: "#E6F1FB", accent: "#185FA5" };

/* Jump links shown in the header. ids are set on the matching sections. */
const JUMP_LINKS = [
  { id: "what-is-it", label: "What Is It" },
  { id: "how-it-works", label: "How It Works" },
  { id: "who-pays", label: "Who Pays" },
  { id: "make-money", label: "Make Money" },
  { id: "risks", label: "Risks" },
  { id: "metrics", label: "Metrics" },
  { id: "companies", label: "Companies" },
];

/* Colors/icons for the four bullet panels. Same look for every model. */
const PANEL_STYLE = {
  drivers: { icon: "ti-seeding", iconBg: "#E6F5F1", iconColor: "#0F6E56", markIcon: "ti-check" },
  opportunities: { icon: "ti-chart-line", iconBg: "#EAF2FB", iconColor: "#185FA5", markIcon: "ti-check" },
  compete: { icon: "ti-swords", iconBg: "#F1ECFA", iconColor: "#6941C6", markIcon: "ti-check" },
  challenges: { icon: "ti-mountain", iconBg: "#FAEEDA", iconColor: "#854F0B", markIcon: "ti-minus" },
} as const;

/* =========================================================
   SMALL LOCAL COMPONENTS
========================================================= */

function SectionHeader({ title, sub }: { title: string; sub?: string }) {
  return (
    <>
      <h2 className="bm-h2">{title}</h2>
      {sub && <p className="bm-sub">{sub}</p>}
    </>
  );
}

function MiniCard({
  item,
  variant,
}: {
  item: DetailItem;
  variant?: "wide" | "strong" | "warn";
}) {
  return (
    <div className={`bm-mini${variant ? ` is-${variant}` : ""}`}>
      <div className="bm-mini-icon">
        <i className={`ti ${item.icon}`} />
      </div>

      <div>
        <h3>{item.title}</h3>
        <p>{item.text}</p>
      </div>
    </div>
  );
}

function Panel({
  style,
  title,
  items,
}: {
  style: (typeof PANEL_STYLE)[keyof typeof PANEL_STYLE];
  title: string;
  items: string[];
}) {
  const { icon, iconBg, iconColor, markIcon } = style;
  return (
    <div className="bm-panel">
      <div className="bm-panel-head">
        <div
          className="bm-mini-icon"
          style={{ background: iconBg, color: iconColor }}
        >
          <i className={`ti ${icon}`} />
        </div>

        <h2>{title}</h2>
      </div>

      {items.map((item) => (
        <div key={item} className="bm-li">
          <span
            className="bm-li-mark"
            style={{ background: iconBg, color: iconColor }}
          >
            <i className={`ti ${markIcon}`} />
          </span>
          {item}
        </div>
      ))}
    </div>
  );
}

/* =========================================================
   PAGE
========================================================= */

export default async function BusinessModelDetailPage({ params }: PageProps) {
  const { slug } = await params;

  const model = MOCK_BUSINESS_MODELS.find((m) => m.slug === slug);
  const detail = getBusinessModelDetail(slug);
  if (!model || !detail) notFound();

  const profiles = await getAllCompanyProfiles();

  const { resolved: companies, unresolvedSlugs: missingCompanies } =
    resolveCompanyReferences(detail.companies.items, profiles);
  const { resolved: related, unresolvedSlugs: missingRelated } =
    resolveRelatedModels(detail.related.slugs);

  // Never silently accept bad references: surface them in the server log.
  if (missingCompanies.length > 0) {
    console.warn(
      `[business-models/${slug}] Company slugs with no profile (not displayed): ${missingCompanies.join(", ")}`,
    );
  }
  if (missingRelated.length > 0) {
    console.warn(
      `[business-models/${slug}] Related slugs not in the catalog (not displayed): ${missingRelated.join(", ")}`,
    );
  }

  // Every detail page uses the same blue theme (not the catalog tone).
  const theme = {
    "--bm-accent": DETAIL_THEME.accent,
    "--bm-tint": DETAIL_THEME.bg,
  } as CSSProperties;

  const chain = detail.howItWorks.chain;
  const rampSteps = Math.max(chain.length - 2, 1);

  return (
    <div className={`bm-shell ${fraunces.variable}`} style={theme}>
      {/* HEADER */}
      <header className="bm-detail-hero">
        <Link href="/business-models" className="bm-back">
          <i className="ti ti-arrow-left" />
          All business models
        </Link>

        <div className="bm-detail-row">
          <div className="bm-detail-icon">
            <i className={`ti ${model.icon}`} />
          </div>

          <h1>{model.name}</h1>

          <p>{detail.headline}</p>
        </div>

        <nav className="bm-jump" aria-label="Jump to a section">
          {JUMP_LINKS.map((link) => (
            <a key={link.id} href={`#${link.id}`}>
              {link.label}
            </a>
          ))}
        </nav>
      </header>

      <section
        className="bm-characteristics"
        aria-labelledby="bm-characteristics-title"
      >
        <div className="bm-characteristics-head">
          <h2
            id="bm-characteristics-title"
            className="bm-characteristics-title"
          >
            Business Characteristics
          </h2>
        </div>

        <ul className="bm-characteristics-list">
          {detail.characteristics.tags.map((label) => (
            <li key={label} className="bm-characteristics-tag">
              {label}
            </li>
          ))}
        </ul>

        <p className="bm-characteristics-note">{detail.characteristics.note}</p>
      </section>

      {/* WHAT IS IT */}
      <section id="what-is-it" className="bm-section">
        <SectionHeader title="What Is It?" sub={detail.whatIsIt.sub} />
        <div className="bm-note">
          {detail.whatIsIt.paragraphs.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </section>

      {/* BUSINESS MODEL IN ONE MINUTE */}
      <section className="bm-section">
        <SectionHeader
          title="Business Model in One Minute"
          sub={detail.flow.sub}
        />

        <div className="bm-flow-card">
          <div className="bm-flow">
            {detail.flow.steps.map((step, index) => {
              const isLast = index === detail.flow.steps.length - 1;

              return (
                <div
                  key={step.title}
                  className={`bm-step${isLast ? " is-last" : ""}`}
                >
                  <div className="bm-rail">
                    <div className="bm-rail-dot">
                      <i className={`ti ${step.icon}`} />
                    </div>

                    {!isLast && (
                      <>
                        <div className="bm-rail-line" />
                        <i className="ti ti-chevron-down bm-rail-arrow" />
                      </>
                    )}
                  </div>

                  <div className="bm-step-body">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>

                    <div className="bm-chips">
                      {step.examples.map((example) => (
                        <span key={example} className="bm-chip">
                          {example}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

            {/* HOW IT WORKS */}
      <section id="how-it-works" className="bm-section">
        <SectionHeader title="How It Works" sub={detail.howItWorks.sub} />

        <div className="bm-how">
          <div className="bm-how-intro">
            <p>{detail.howItWorks.intro}</p>
          </div>

          <ol className="bm-how-steps">
            {chain.map((step, index) => {
              const isLast = index === chain.length - 1;

              return (
                <li
                  key={step.title}
                  className={`bm-how-step${isLast ? " is-last" : ""}`}
                >
                  <div className="bm-how-rail">
                    <span className="bm-how-num">{index + 1}</span>
                    {!isLast && (
                      <span className="bm-how-line" aria-hidden="true" />
                    )}
                  </div>

                  <div className="bm-how-body">
                    <h3>{step.title}</h3>
                    <p>{step.text}</p>
                  </div>

                  <span className="bm-how-tag">{step.tag}</span>
                </li>
              );
            })}
          </ol>

          <div className="bm-how-takeaway">
            <small>Key takeaway</small>
            <p>{detail.howItWorks.outro}</p>
          </div>
        </div>
      </section>

      {/* WHO PAYS */}
      <section id="who-pays" className="bm-section bm-who-pays">
        <SectionHeader title="Who Pays?" sub={detail.whoPays.sub} />
        <div className="bm-grid-2">
          {detail.whoPays.items.map((item) => (
            <MiniCard key={item.title} item={item} variant="wide" />
          ))}
        </div>
      </section>

      {/* HOW THEY MAKE MONEY */}
      <section id="make-money" className="bm-section">
        <SectionHeader title="How They Make Money" sub={detail.makeMoney.sub} />
        <div className="bm-grid-2">
          {detail.makeMoney.items.map((item) => (
            <MiniCard key={item.title} item={item} variant="wide" />
          ))}
        </div>
      </section>

      {/* WHERE THE MONEY GOES */}
      <section className="bm-section">
        <SectionHeader title="Where the Money Goes" sub={detail.moneyGoes.sub} />

        <div className="bm-rows">
          {detail.moneyGoes.items.map((item) => (
            <div key={item.title} className="bm-row">
              <div className="bm-mini-icon">
                <i className={`ti ${item.icon}`} />
              </div>

              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* GROWTH / OPPORTUNITY */}
      <section className="bm-section">
        <div className="bm-split">
          <Panel
            style={PANEL_STYLE.drivers}
            title={detail.growth.drivers.title}
            items={detail.growth.drivers.items}
          />
          <Panel
            style={PANEL_STYLE.opportunities}
            title={detail.growth.opportunities.title}
            items={detail.growth.opportunities.items}
          />
        </div>

        <div className="bm-callout">
          <p>{detail.growth.callout}</p>
        </div>
      </section>

      {/* STRENGTH */}
      <section className="bm-section">
        <SectionHeader
          title={detail.strength.title}
          sub={detail.strength.sub}
        />
        <div className="bm-grid-4">
          {detail.strength.items.map((item) => (
            <MiniCard key={item.title} item={item} variant="strong" />
          ))}
        </div>
      </section>

      {/* COMPETITION / CHALLENGES */}
      <section className="bm-section">
        <div className="bm-split">
          <Panel
            style={PANEL_STYLE.compete}
            title={detail.competition.compete.title}
            items={detail.competition.compete.items}
          />
          <Panel
            style={PANEL_STYLE.challenges}
            title={detail.competition.challenges.title}
            items={detail.competition.challenges.items}
          />
        </div>
      </section>

      {/* RISKS */}
      <section id="risks" className="bm-section">
        <SectionHeader title="What Could Go Wrong?" sub={detail.risks.sub} />
        <div className="bm-grid-4">
          {detail.risks.items.map((item) => (
            <MiniCard key={item.title} item={item} variant="warn" />
          ))}
        </div>
      </section>

      {/* METRICS */}
      <section id="metrics" className="bm-section">
        <SectionHeader title="What to Look At" sub={detail.metrics.sub} />

        <div className="bm-metrics">
          {detail.metrics.items.map((metric) => (
            <div key={metric.label} className="bm-metric">
              <div className="bm-metric-ic">
                <i className={`ti ${metric.icon}`} />
              </div>

              <h3>
                {metric.label}
                {metric.fullName && (
                  <span className="bm-metric-full">{metric.fullName}</span>
                )}
              </h3>
              <p>{metric.text}</p>
            </div>
          ))}
        </div>

        <div className="bm-callout">
          <p>{detail.metrics.callout}</p>
        </div>
      </section>

      {/* COMPANIES */}
      <section id="companies" className="bm-section">
        <SectionHeader
          title="Companies Using This Model"
          sub={detail.companies.sub}
        />

        {companies.length > 0 ? (
          <div className="bm-company-list">
            {companies.map(({ slug: companySlug, role, identity }) => (
              <Link
                key={companySlug}
                href={`/company/${companySlug}`}
                className="bm-company-row"
              >
                <div className="bm-company-logo">
                  <Image
                    src={identity.logo}
                    alt={identity.name}
                    width={26}
                    height={26}
                    style={{ width: 26, height: 26, objectFit: "contain" }}
                  />
                </div>

                <div className="bm-company-main">
                  <div className="bm-company-name">
                    {identity.name}
                    <span className="pill">{identity.ticker}</span>
                  </div>

                  <p className="bm-company-role">{role}</p>
                </div>

                <i className="ti ti-chevron-right" />
              </Link>
            ))}
          </div>
        ) : (
          <div className="bm-empty">
            Company examples for this business model are not available yet.
          </div>
        )}
      </section>

      {/* RELATED */}
      {related.length > 0 && (
        <section className="bm-section">
          <SectionHeader
            title="Related Business Models"
            sub={detail.related.sub}
          />

          <div className="bm-grid">
            {related.map((item) => (
              <BusinessModelCard key={item.slug} model={item} />
            ))}
          </div>
        </section>
      )}

      {/* DISCLAIMER */}
      <p className="bm-disclaimer">{detail.disclaimer}</p>
    </div>
  );
}