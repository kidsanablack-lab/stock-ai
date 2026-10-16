import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import Disclaimer from "@/components/portfolio-lab/Disclaimer";
import GettingStarted from "@/components/portfolio-lab/GettingStarted";
import HeroSection from "@/components/portfolio-lab/HeroSection";
import PortfolioLab from "@/components/portfolio-lab/PortfolioLab";
import "./portfolio-lab.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--pl-serif",
  display: "swap",
});

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

export default function PortfolioLabPage() {
  return (
    <div className={`pl-page ${fraunces.variable}`}>
      <HeroSection />
      <GettingStarted />
      <PortfolioLab />
      <Disclaimer />
    </div>
  );
}
