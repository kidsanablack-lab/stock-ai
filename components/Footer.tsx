import Link from "next/link";
import Logo from "@/components/ui/Logo";

type FooterLink = { label: string; href: string };

// Only routes that exist in /app. The Legal column (/legal/*) is removed
// until those pages exist.
const LINK_COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Explore",
    links: [
      { label: "All companies", href: "/trending" },
      { label: "Business Models", href: "/business-models" },
      { label: "7 Powers of Business", href: "/7-powers" },
      { label: "Compare", href: "/compare" },
      { label: "Valuation Lab", href: "/valuation-lab" },
      { label: "Portfolio Lab", href: "/portfolio-lab" },
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
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="mx-auto w-full max-w-6xl px-5 pb-8 pt-12 sm:px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr]">
          <div>
            <Link href="/" aria-label="Scope home" className="inline-block">
              <Logo />
            </Link>
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">
              AI-powered company research. Understand any business, not just
              its stock price.
            </p>
          </div>

          {LINK_COLUMNS.map((column) => (
            <div key={column.title}>
              <h2 className="mb-3 text-xs font-semibold uppercase tracking-wider text-ink">
                {column.title}
              </h2>
              <ul className="space-y-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-muted transition-colors hover:text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 border-t border-border pt-6">
          <p className="text-xs leading-relaxed text-ink-muted">
            For educational purposes only. Not investment advice. Financial
            information is based on publicly reported company data and may
            change over time.
          </p>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted">
            <span>© 2026 Scope</span>
            <span>Data updated quarterly</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
