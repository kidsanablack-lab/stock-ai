"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "@/components/ui/Logo";
import CompanySearch from "@/components/ui/CompanySearch";
import type { CompanySearchItem } from "@/lib/company-search";

type NavbarProps = {
  companies: CompanySearchItem[];
};

// Only routes that exist in /app.
const NAV_LINKS = [
  { href: "/trending", label: "Companies", match: ["/trending", "/company"] },
  { href: "/business-models", label: "Business Models", match: ["/business-models"] },
  { href: "/7-powers", label: "7 Powers", match: ["/7-powers"] },
  { href: "/compare", label: "Compare", match: ["/compare"] },
  { href: "/valuation-lab", label: "Valuation Lab", match: ["/valuation-lab"] },
  { href: "/portfolio-lab", label: "Portfolio Lab", match: ["/portfolio-lab"] },
];

export default function Navbar({ companies }: NavbarProps) {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  // The home hero already has a large search box.
  const isHome = pathname === "/";

  const isActive = (match: string[]) =>
    match.some((prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white">
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-4 px-5 sm:px-6">
        <Link
          href="/"
          aria-label="Scope home"
          className="shrink-0"
          onClick={() => setMenuOpen(false)}
        >
          <Logo />
        </Link>

        <nav aria-label="Main" className="ml-4 hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => {
            const active = isActive(link.match);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={
                  active
                    ? "rounded-md px-3 py-2 text-sm font-medium text-primary transition-colors"
                    : "rounded-md px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:text-ink"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex min-w-0 flex-1 items-center justify-end gap-2 lg:flex-none">
          {!isHome && (
            <CompanySearch
              companies={companies}
              variant="compact"
              className="min-w-0 flex-1 lg:w-56 lg:flex-none xl:w-64"
            />
          )}

          <button
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((open) => !open)}
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border text-ink transition-colors hover:bg-surface lg:hidden"
          >
            <i
              className={menuOpen ? "ti ti-x text-xl" : "ti ti-menu-2 text-xl"}
              aria-hidden="true"
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav
          id="mobile-nav"
          aria-label="Main"
          className="absolute inset-x-0 top-full border-b border-border bg-white px-3 py-2 shadow-card lg:hidden"
        >
          {NAV_LINKS.map((link) => {
            const active = isActive(link.match);

            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
                className={
                  active
                    ? "block rounded-lg bg-surface px-3 py-3 text-[15px] font-medium text-primary"
                    : "block rounded-lg px-3 py-3 text-[15px] font-medium text-ink hover:bg-surface"
                }
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
      )}
    </header>
  );
}
