import Link from "next/link";
import { Fraunces } from "next/font/google";
import { POWERS } from "@/lib/seven-powers/powers";
import "./seven-powers-section.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--sp-serif",
  display: "swap",
});

export default function SevenPowersSection() {
  return (
    <section className={`sph-section ${fraunces.variable}`}>
      <div className="sph-band">
        <div className="sph-copy">
          <div className="sph-eyebrow">
            Business strategy
            <span className="sph-tag">7 Powers</span>
          </div>

          <h2 className="sph-title">
            Why are some businesses <em>hard to beat?</em>
          </h2>

          <p className="sph-lead">
            Seven sources of lasting advantage, explained with simple
            visuals and real business examples.
          </p>

          <Link href="/7-powers" className="sph-btn">
            Explore the 7 Powers
            <i className="ti ti-arrow-right" />
          </Link>

          <p className="sph-credit">Framework by Hamilton Helmer</p>
        </div>

        <ol className="sph-list">
          {POWERS.map((power) => (
            <li key={power.slug}>
              <Link
                href={`/7-powers#${power.slug}`}
                className="sph-row"
                aria-label={`Power ${power.number}: ${power.name}`}
              >
                <span
                  className="sph-num"
                  style={{ background: power.tint, color: power.ink }}
                  aria-hidden="true"
                >
                  {power.number}
                </span>

                <span className="sph-name">{power.name}</span>

                <i className="ti ti-arrow-right" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}