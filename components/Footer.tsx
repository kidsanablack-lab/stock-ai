"use client";

import { useRouter } from "next/navigation";

type FooterLink = { label: string; href: string };

const LINK_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "All companies", href: "/trending" },
      { label: "Trending", href: "/trending" },
      { label: "Categories", href: "/trending" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Scope", href: "/about" },
      { label: "How AI Score works", href: "/about#ai-score" },
      { label: "Data sources", href: "/about#data" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Disclaimer", href: "/legal/disclaimer" },
      { label: "Privacy", href: "/legal/privacy" },
      { label: "Terms", href: "/legal/terms" },
    ],
  },
];

export default function Footer() {
  const router = useRouter();

  return (
    <footer style={{ background: "#FAFAF7", borderRadius: 16, padding: "40px 32px 24px", marginTop: 40 }}>
      <div className="footer-grid">
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <svg width="28" height="28" viewBox="0 0 40 40">
  <circle
    cx="17"
    cy="17"
    r="13"
    fill="none"
    stroke="#1a1a18"
    strokeWidth="3"
  />
  <line
    x1="26.5"
    y1="26.5"
    x2="37"
    y2="37"
    stroke="#1a1a18"
    strokeWidth="3"
    strokeLinecap="round"
  />
  <path
    d="M11 17a6 6 0 0 1 6-6"
    fill="none"
    stroke="#f59e0b"
    strokeWidth="2.5"
    strokeLinecap="round"
  />
</svg>
            <span style={{ fontSize: 16, fontWeight: 700, color: "#1a1a18" }}>Scope</span>
          </div>
          <p style={{ fontSize: 13, color: "#6b6b68", lineHeight: 1.6, margin: 0, maxWidth: 240 }}>
            AI-powered company research. Understand any business, not just its stock price.
          </p>
        </div>

        {LINK_COLUMNS.map((col) => (
          <div key={col.title}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#1a1a18", marginBottom: 12 }}>
              {col.title}
            </div>
            {col.links.map((link) => (
              <a
                key={link.label}
                className="footer-link"
                onClick={() => router.push(link.href)}
              >
                {link.label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div style={{ borderTop: "0.5px solid #e5e5e2", paddingTop: 20 }}>
        <p style={{ fontSize: 11, lineHeight: 1.6, color: "#9a9a96", margin: "0 0 12px" }}>
          For educational purposes only. Not investment advice. Financial information is based on
          publicly reported company data and may change over time.
        </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <span style={{ fontSize: 11, color: "#9a9a96" }}>© 2026 Scope</span>
          <span style={{ fontSize: 11, color: "#9a9a96" }}>Data updated quarterly</span>
        </div>
      </div>
    </footer>
  );
}