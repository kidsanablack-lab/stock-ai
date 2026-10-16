import type { Metadata } from "next";
import { Fraunces } from "next/font/google";
import SevenPowersHero from "@/components/seven-powers/SevenPowersHero";
import BigPictureSection from "@/components/seven-powers/BigPictureSection";
import PowerOverview from "@/components/seven-powers/PowerOverview";
import PowerDetailSection from "@/components/seven-powers/PowerDetailSection";
import PowerComparison from "@/components/seven-powers/PowerComparison";
import KeyTakeaways from "@/components/seven-powers/KeyTakeaways";
import "./seven-powers.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--sp-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "7 Powers of Business: Understanding Competitive Advantage | Scope",
  description:
    "Learn the seven sources of competitive advantage through simple explanations, visual examples, and real-world business cases.",
  openGraph: {
    title: "7 Powers of Business: Understanding Competitive Advantage | Scope",
    description:
      "Learn the seven sources of competitive advantage through simple explanations, visual examples, and real-world business cases.",
    type: "article",
  },
};

export default function SevenPowersPage() {
  return (
    <div className={`sp-page ${fraunces.variable}`}>
      <SevenPowersHero />
      <BigPictureSection />
      <PowerOverview />
      <PowerDetailSection />
      <PowerComparison />
      <KeyTakeaways />
    </div>
  );
}