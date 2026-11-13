import type { Metadata } from "next";
import Container from "@/components/ui/Container";
import Disclaimer, { DisclaimerShort } from "@/components/portfolio-lab/Disclaimer";
import GettingStarted from "@/components/portfolio-lab/GettingStarted";
import HeroSection from "@/components/portfolio-lab/HeroSection";
import LearnSection from "@/components/portfolio-lab/LearnSection";
import PortfolioLab from "@/components/portfolio-lab/PortfolioLab";

export const metadata: Metadata = {
  title: "Portfolio Lab: Build and Understand a Hypothetical Portfolio | Scope",
  description:
    "Build a hypothetical portfolio, explore educational examples, and see how your allocation is distributed. An educational tool, not investment advice.",
  openGraph: {
    title: "Portfolio Lab | Scope",
    description:
      "Build a hypothetical portfolio, explore educational examples, and see how your allocation is distributed.",
    type: "website",
  },
};

// Fraunces and Geist are loaded once in the root layout (font-serif, font-sans),
// and the design tokens are imported by globals.css. This page needs no CSS file.
export default function PortfolioLabPage() {
  return (
    <main>
      <Container className="space-y-12 py-8 sm:space-y-16 sm:py-12">
        <HeroSection />
        <DisclaimerShort />
        <GettingStarted />
        <PortfolioLab />
        <Disclaimer />
        <LearnSection />
      </Container>
    </main>
  );
}
