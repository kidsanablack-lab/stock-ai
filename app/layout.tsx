import Navbar from "@/components/Navbar";
import { getAllCompanyProfiles } from "@/lib/company-data";
import { createCompanySearchItems } from "@/lib/company-search";
import type { Metadata } from "next";
import "./globals.css";
import Footer from "@/components/Footer";


export const metadata: Metadata = {
  title: "Stock AI",
  description: "Understand any company before you invest.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const companies = createCompanySearchItems(
    getAllCompanyProfiles(),
  );

  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.44.0/tabler-icons.min.css"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body className="min-h-full overflow-x-hidden bg-white text-zinc-900">
  <Navbar companies={companies} />

  <div className="flex-1">{children}</div>

  <Footer />
</body>
    </html>
  );
}