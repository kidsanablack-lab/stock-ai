import Navbar from "@/components/Navbar";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";
import type { Metadata } from "next";
import { Fraunces, Geist } from "next/font/google";
import "./globals.css";
import "./legacy.css";
import Footer from "@/components/Footer";

// Loaded once for the whole site. Pages that still load their own Fraunces
// (portfolio-lab, valuation-lab, 7-powers, business-models) keep working.
const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-fraunces",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Scope — Understand Companies",
  description:
    "Understand what a company does, how it makes money, and what drives its business.",
  openGraph: {
    title: "Scope — Understand Companies",
    description:
      "Understand what a company does, how it makes money, and what drives its business.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const profiles = await getAllCompanyProfiles();

  const companies = createCompanySearchItems(profiles);

  return (
    <html
      lang="en"
      className={`${geist.variable} ${fraunces.variable} h-full antialiased`}
    >
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
      </head>

      <body className="min-h-full overflow-x-clip bg-white text-ink">
        <Navbar companies={companies} />

        <div className="flex-1">{children}</div>

        <Footer />
      </body>
    </html>
  );
}
