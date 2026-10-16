import Link from "next/link";
import type { CSSProperties } from "react";
import { Fraunces } from "next/font/google";
import type { CompanyProfile } from "@/types/company";
import "./browse-by-category.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--bm-serif",
  display: "swap",
});

type CategoryTile = {
  key: string;
  label: string;
  icon: string;
  bg: string; // pastel tile background
  accent: string; // icon, count, arrow, watermark
  labelColor: string; // category name
  href: string;
};

type BrowseByCategoryProps = {
  profiles: {
    slug: string;
    company: CompanyProfile;
  }[];
};

const CATEGORIES: CategoryTile[] = [
  {
    key: "technology",
    label: "Technology",
    icon: "ti-cpu",
    bg: "#E6F1FB",
    accent: "#185FA5",
    labelColor: "#042C53",
    href: "/trending?category=technology",
  },
  {
    key: "consumer",
    label: "Consumer",
    icon: "ti-shopping-bag",
    bg: "#FAECE7",
    accent: "#993C1D",
    labelColor: "#4A1B0C",
    href: "/trending?category=consumer",
  },
  {
    key: "finance",
    label: "Finance",
    icon: "ti-building-bank",
    bg: "#F1EFE8",
    accent: "#5F5E5A",
    labelColor: "#2C2C2A",
    href: "/trending?category=finance",
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: "ti-heartbeat",
    bg: "#FBEAF0",
    accent: "#993556",
    labelColor: "#4B1528",
    href: "/trending?category=healthcare",
  },
  {
    key: "energy",
    label: "Energy",
    icon: "ti-droplet",
    bg: "#FAEEDA",
    accent: "#854F0B",
    labelColor: "#412402",
    href: "/trending?category=energy",
  },
];

// Unchanged: maps a company's industry text to one of the categories above.
function getCategory(industry: string) {
  const value = industry.toLowerCase();

  if (
    value.includes("bank") ||
    value.includes("payment") ||
    value.includes("financial")
  ) {
    return "finance";
  }

  if (
    value.includes("pharma") ||
    value.includes("health") ||
    value.includes("medical")
  ) {
    return "healthcare";
  }

  if (
    value.includes("energy") ||
    value.includes("oil") ||
    value.includes("gas") ||
    value.includes("utility")
  ) {
    return "energy";
  }

  if (
    value.includes("consumer") ||
    value.includes("restaurant") ||
    value.includes("apparel") ||
    value.includes("automotive")
  ) {
    return "consumer";
  }

  return "technology";
}

export default function BrowseByCategory({
  profiles,
}: BrowseByCategoryProps) {
  // Unchanged: count companies per category.
  const categoryCounts = profiles.reduce<Record<string, number>>(
    (counts, profile) => {
      const category = getCategory(profile.company.identity.industry);

      counts[category] = (counts[category] ?? 0) + 1;

      return counts;
    },
    {},
  );

  return (
    <section className={`bc-section ${fraunces.variable}`}>
      <div className="bc-head">
        <div>
          <div className="bc-eyebrow">Browse by category</div>

          <h2 className="bc-title">Explore by industry</h2>

          <p className="bc-lead">
            Pick an industry and see the companies inside it.
          </p>
        </div>

        <Link href="/trending" className="bc-btn bc-btn-desktop">
          View all companies
          <i className="ti ti-arrow-right" />
        </Link>
      </div>

      <div className="bc-grid">
        {CATEGORIES.map((cat) => {
          const count = categoryCounts[cat.key] ?? 0;

          const theme = {
            "--bc-bg": cat.bg,
            "--bc-accent": cat.accent,
            "--bc-label": cat.labelColor,
          } as CSSProperties;

          return (
            <Link
              key={cat.key}
              href={cat.href}
              className="bc-tile"
              style={theme}
            >
              <i className={`ti ${cat.icon} bc-wm`} aria-hidden="true" />

              <div className="bc-top">
                <div className="bc-icon">
                  <i className={`ti ${cat.icon}`} />
                </div>

                <div className="bc-go">
                  <i className="ti ti-arrow-up-right" />
                </div>
              </div>

              <div className="bc-name">{cat.label}</div>

              <div className="bc-count">
                {count} {count === 1 ? "company" : "companies"}
              </div>
            </Link>
          );
        })}
      </div>

      <Link href="/trending" className="bc-btn bc-btn-mobile">
        View all companies
        <i className="ti ti-arrow-right" />
      </Link>
    </section>
  );
}