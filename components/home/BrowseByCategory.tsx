"use client";

import { useRouter } from "next/navigation";
import { getAllSlugs, getCompanyBySlug } from "@/data/companies";

type CategoryTile = {
  key: string;
  label: string;
  icon: string;
  bg: string;
  iconBg: string;
  labelColor: string;
  countColor: string;
  watermarkColor: string;
  href: string;
};

const CATEGORIES: CategoryTile[] = [
  {
    key: "technology",
    label: "Technology",
    icon: "ti-cpu",
    bg: "#E6F1FB",
    iconBg: "#185FA5",
    labelColor: "#042C53",
    countColor: "#185FA5",
    watermarkColor: "#185FA5",
    href: "/trending?category=technology",
  },
  {
    key: "consumer",
    label: "Consumer",
    icon: "ti-shopping-bag",
    bg: "#FAECE7",
    iconBg: "#993C1D",
    labelColor: "#4A1B0C",
    countColor: "#993C1D",
    watermarkColor: "#993C1D",
    href: "/trending?category=consumer",
  },
  {
    key: "finance",
    label: "Finance",
    icon: "ti-building-bank",
    bg: "#F1EFE8",
    iconBg: "#5F5E5A",
    labelColor: "#2C2C2A",
    countColor: "#5F5E5A",
    watermarkColor: "#5F5E5A",
    href: "/trending?category=finance",
  },
  {
    key: "healthcare",
    label: "Healthcare",
    icon: "ti-heartbeat",
    bg: "#FBEAF0",
    iconBg: "#993556",
    labelColor: "#4B1528",
    countColor: "#993556",
    watermarkColor: "#993556",
    href: "/trending?category=healthcare",
  },
  {
    key: "energy",
    label: "Energy",
    icon: "ti-droplet",
    bg: "#FAEEDA",
    iconBg: "#854F0B",
    labelColor: "#412402",
    countColor: "#854F0B",
    watermarkColor: "#854F0B",
    href: "/trending?category=energy",
  },
];

export default function BrowseByCategory() {
  const router = useRouter();
  const categoryCounts = CATEGORIES.reduce<Record<string, number>>(
  (counts, category) => {
    counts[category.key] = getAllSlugs()
      .map((slug) => getCompanyBySlug(slug))
      .filter((company) => {
        if (!company) return false;

        const industry = company.identity.industry.toLowerCase();

        if (
          category.key === "finance"
        ) {
          return (
            industry.includes("bank") ||
            industry.includes("payment") ||
            industry.includes("financial")
          );
        }

        if (
          category.key === "healthcare"
        ) {
          return (
            industry.includes("pharma") ||
            industry.includes("health") ||
            industry.includes("medical")
          );
        }

        if (
          category.key === "energy"
        ) {
          return (
            industry.includes("energy") ||
            industry.includes("oil") ||
            industry.includes("gas") ||
            industry.includes("utility")
          );
        }

        if (
          category.key === "consumer"
        ) {
          return (
            industry.includes("consumer") ||
            industry.includes("restaurant") ||
            industry.includes("apparel") ||
            industry.includes("automotive")
          );
        }

        return true;
      }).length;

    return counts;
  },
  {},
);

  return (
    <div className="section-block" style={{ marginBottom: 28 }}>
      <p
        style={{
          fontSize: 14,
          fontWeight: 700,
          color: "#1a1a18",
          margin: "0 0 16px",
          textTransform: "uppercase",
          letterSpacing: 0.5,
        }}
      >
        Browse by category
      </p>

      <div className="category-tile-grid">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.key}
            className="category-tile"
            onClick={() => router.push(cat.href)}
            style={{
              position: "relative",
              overflow: "hidden",
              background: cat.bg,
              borderRadius: 18,
              padding: 26,
              cursor: "pointer",
              minWidth: 0,
            }}
          >
            <i
              className={`ti ${cat.icon}`}
              style={{
                position: "absolute",
                right: -10,
                bottom: -14,
                fontSize: 92,
                color: cat.watermarkColor,
                opacity: 0.12,
              }}
            />
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: 14,
                background: cat.iconBg,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                marginBottom: 18,
                position: "relative",
              }}
            >
              <i className={`ti ${cat.icon}`} style={{ fontSize: 26, color: "#ffffff" }} />
            </div>
            <div style={{ fontSize: 18, fontWeight: 700, color: cat.labelColor, marginBottom: 4, position: "relative" }}>
              {cat.label}
            </div>
            <div
  style={{
    fontSize: 13,
    color: cat.countColor,
    position: "relative",
  }}
>
  {categoryCounts[cat.key]} {categoryCounts[cat.key] === 1 ? "company" : "companies"}
</div>
          </div>
        ))}

        {/* View all companies — styled differently: an action, not a category */}
        <div
          className="category-tile"
          onClick={() => router.push("/trending")}
          style={{
            position: "relative",
            overflow: "hidden",
            background: "#24391F",
            borderRadius: 18,
            padding: 26,
            cursor: "pointer",
            minWidth: 0,
          }}
        >
          <i
            className="ti ti-apps"
            style={{ position: "absolute", right: -10, bottom: -14, fontSize: 92, color: "#ffffff", opacity: 0.08 }}
          />
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "rgba(255,255,255,0.14)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginBottom: 18,
              position: "relative",
            }}
          >
            <i className="ti ti-apps" style={{ fontSize: 26, color: "#F3F5EE" }} />
          </div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#F3F5EE", marginBottom: 4, position: "relative" }}>
            View all
          </div>
          <div style={{ fontSize: 13, color: "#B9C6B4", position: "relative" }}>Every company</div>
        </div>
      </div>
    </div>
  );
}