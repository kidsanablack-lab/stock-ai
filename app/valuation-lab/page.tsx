import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import ValuationHero from "@/components/valuation-lab/ValuationHero";
import MethodsOverview from "@/components/valuation-lab/MethodsOverview";
import ValuationWorkspace from "@/components/valuation-lab/ValuationWorkspace";
import LearningCenter from "@/components/valuation-lab/LearningCenter";
import "./valuation-lab.css";

// "italic" is loaded for the one emphasised phrase in the hero headline.
// Without it the browser would slant the normal font instead.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--vl-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Valuation Lab: Understand What a Business May Be Worth | Scope",
  description:
    "Explore financial ratios, discounted cash flow, and valuation assumptions using your own inputs. Educational, not investment advice.",
  openGraph: {
    title: "Valuation Lab: Understand What a Business May Be Worth | Scope",
    description:
      "Explore financial ratios, discounted cash flow, and valuation assumptions using your own inputs.",
    type: "article",
  },
};

export default function ValuationLabPage() {
  return (
    <div className={`vl-page ${fraunces.variable}`}>
      <ValuationHero />
      <MethodsOverview />
      <ValuationWorkspace />
      <LearningCenter />
    </div>
  );
}