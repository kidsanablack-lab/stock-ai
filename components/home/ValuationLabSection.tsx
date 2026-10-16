import Link from "next/link";
import { Fraunces } from "next/font/google";
import "./valuation-lab-section.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--vl-serif",
  display: "swap",
});

const TOOLS = [
  { href: "/valuation-lab#relative", icon: "ti-percentage", name: "P/E and P/S ratios" },
  { href: "/valuation-lab#dcf", icon: "ti-timeline", name: "Discounted cash flow" },
  { href: "/valuation-lab#scenarios", icon: "ti-arrows-split-2", name: "Bear, Base, and Bull scenarios" },
  { href: "/valuation-lab#sensitivity", icon: "ti-grid-dots", name: "Sensitivity analysis" },
  { href: "/valuation-lab#margin-of-safety", icon: "ti-shield-check", name: "Margin of safety" },
  { href: "/valuation-lab#learning", icon: "ti-school", name: "Valuation learning center" },
];

export default function ValuationLabSection() {
  return (
    <section className={`vlh-section ${fraunces.variable}`}>
      <div className="vlh-band">
        <div className="vlh-copy">
          <div className="vlh-eyebrow">
            Valuation
            <span className="vlh-tag">Valuation Lab</span>
          </div>

          <h2 className="vlh-title">
            What is a business <em>really worth?</em>
          </h2>

          <p className="vlh-lead">
            Explore ratios, discounted cash flow, and scenarios using your own
            numbers and assumptions.
          </p>

          <Link href="/valuation-lab" className="vlh-btn">
            Open Valuation Lab
            <i className="ti ti-arrow-right" aria-hidden="true" />
          </Link>

          <p className="vlh-credit">
            Educational tool. Uses your own inputs, not live market data.
          </p>
        </div>

        <ul className="vlh-list">
          {TOOLS.map((tool) => (
            <li key={tool.href}>
              <Link href={tool.href} className="vlh-row">
                <span className="vlh-icon" aria-hidden="true">
                  <i className={`ti ${tool.icon}`} />
                </span>
                <span className="vlh-name">{tool.name}</span>
                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}