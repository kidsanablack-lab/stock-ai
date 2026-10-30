import { TAKEAWAYS } from "@/lib/seven-powers/compare";
import "./seven-powers-compare.css";

export default function KeyTakeaways() {
  return (
    <section
      id="key-takeaways"
      className="sp-section"
      aria-labelledby="sp-takeaways-title"
    >
      <p className="sp-section-eyebrow">Key takeaways</p>

      <h2 id="sp-takeaways-title" className="sp-h2">
        What Makes a Business Hard to Beat?
      </h2>

      <ol className="sp-takeaways">
        {TAKEAWAYS.map((item) => (
          <li key={item.number} className="sp-takeaway">
            <span className="sp-takeaway-number" aria-hidden="true">
              {item.number}
            </span>

            <h3 className="sp-takeaway-title">{item.title}</h3>
            <p className="sp-takeaway-text">{item.text}</p>
          </li>
        ))}
      </ol>

      <div className="mt-14 rounded-[28px] bg-ink px-6 py-14 text-center sm:px-10 lg:py-[72px]">
        <p className="mx-auto max-w-[640px] font-serif text-[clamp(30px,4.4vw,52px)] font-normal leading-[1.1] tracking-[-0.02em] text-white">
          Understand the business. Understand its advantage.
        </p>

        <a
          href="#explore-powers"
          className="mt-8 inline-flex h-12 items-center justify-center rounded-xl bg-white px-[22px] text-[15px] font-semibold text-ink transition-colors hover:bg-primary-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
        >
          Review the 7 Powers
        </a>

        <p className="mx-auto mt-8 max-w-[620px] text-[13px] leading-relaxed text-white/70">
          The 7 Powers framework was developed by Hamilton Helmer in{" "}
          <cite className="italic">
            7 Powers: The Foundations of Business Strategy
          </cite>{" "}
          (2016). Scope&apos;s explanations and examples are its own. Scope
          is built for understanding businesses, not for investment advice.
        </p>
      </div>
    </section>
  );
}