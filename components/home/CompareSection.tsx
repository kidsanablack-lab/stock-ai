import Link from "next/link";
import type { CompanyProfile, FinancialValue } from "@/types/company";
import "./CompareSection.css";

type Props = {
  profiles: { slug: string; company: CompanyProfile }[];
};

type Raw = { value: number; unit: string };

function fmtFinancial(v: FinancialValue | undefined): string {
  if (!v || !Number.isFinite(v.value)) return "N/A";
  const n = new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(
    v.value,
  );
  return `$${n}${v.unit}`;
}

function fmtPercent(v: number | undefined): string {
  if (v === undefined || !Number.isFinite(v)) return "N/A";
  const n = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 1,
    signDisplay: "always",
  }).format(v);
  return `${n}%`;
}

function nameOf(c: CompanyProfile) {
  return c.identity.brandName ?? c.identity.name;
}

export default function CompareSection({ profiles }: Props) {
  if (profiles.length < 2) return null;

  const a =
    profiles.find((p) => p.slug === "apple") ?? profiles[0];
  const b =
    profiles.find((p) => p.slug === "nvidia" && p.slug !== a.slug) ??
    profiles.find((p) => p.slug !== a.slug)!;

  const rows: {
    label: string;
    aText: string;
    bText: string;
    aRaw?: Raw;
    bRaw?: Raw;
  }[] = [
    {
      label: "Revenue",
      aText: fmtFinancial(a.company.overview?.revenue),
      bText: fmtFinancial(b.company.overview?.revenue),
      aRaw: a.company.overview?.revenue
        ? {
            value: a.company.overview.revenue.value,
            unit: a.company.overview.revenue.unit,
          }
        : undefined,
      bRaw: b.company.overview?.revenue
        ? {
            value: b.company.overview.revenue.value,
            unit: b.company.overview.revenue.unit,
          }
        : undefined,
    },
    {
      label: "Revenue growth",
      aText: fmtPercent(a.company.overview?.revenueYoY?.value),
      bText: fmtPercent(b.company.overview?.revenueYoY?.value),
      aRaw:
        typeof a.company.overview?.revenueYoY?.value === "number"
          ? { value: a.company.overview.revenueYoY.value, unit: "%" }
          : undefined,
      bRaw:
        typeof b.company.overview?.revenueYoY?.value === "number"
          ? { value: b.company.overview.revenueYoY.value, unit: "%" }
          : undefined,
    },
  ];

  const width = (raw: Raw | undefined, other: Raw | undefined) => {
    if (!raw || !other || raw.unit !== other.unit) return null;
    if (!Number.isFinite(raw.value) || !Number.isFinite(other.value))
      return null;
    const max = Math.max(Math.abs(raw.value), Math.abs(other.value));
    return max > 0 ? `${(Math.abs(raw.value) / max) * 100}%` : "0%";
  };

  return (
    <section className="home-compare" aria-labelledby="home-compare-title">
      <div className="home-compare-head">
        <p className="home-compare-eyebrow">Compare</p>
        <h2 id="home-compare-title" className="home-compare-title">
          Put two companies <em>side by side.</em>
        </h2>
        <p className="home-compare-sub">
          See how businesses differ in scale, growth, profitability and cash
          generation, using the same numbers from each company profile.
        </p>
      </div>

      <div className="home-compare-card">
        <div className="home-compare-grid">
          <span className="home-compare-vs" aria-hidden="true">
            vs
          </span>

          {[
            { side: "a", item: a },
            { side: "b", item: b },
          ].map(({ side, item }) => (
            <div
              key={item.slug}
              className={`home-compare-col home-compare-tone-${side}`}
            >
              <div className="home-compare-company">
                <span className="home-compare-monogram">
                  {item.company.identity.logoInitial}
                </span>
                <div>
                  <h3>{nameOf(item.company)}</h3>
                  <p>
                    <span className="home-compare-ticker">
                      {item.company.identity.ticker}
                    </span>
                    <span>{item.company.identity.industry}</span>
                  </p>
                </div>
              </div>

              {rows.map((row) => {
                const mine = side === "a" ? row.aRaw : row.bRaw;
                const other = side === "a" ? row.bRaw : row.aRaw;
                const w = width(mine, other);
                return (
                  <div className="home-compare-metric" key={row.label}>
                    <span className="home-compare-metric-label">
                      {row.label}
                    </span>
                    <span className="home-compare-metric-value">
                      {side === "a" ? row.aText : row.bText}
                    </span>
                    {w && (
                      <span className="home-compare-bar" aria-hidden="true">
                        <span
                          className="home-compare-bar-fill"
                          style={{ width: w }}
                        />
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        <div className="home-compare-footer">
          <p>
            Pick any two companies and compare revenue, growth, net income and
            free cash flow.
          </p>
          <Link href="/compare" className="home-compare-cta">
            Start comparing <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}