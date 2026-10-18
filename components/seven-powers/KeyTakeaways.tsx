import { TAKEAWAYS } from "@/lib/seven-powers/compare";
import "./seven-powers-compare.css";

export default function KeyTakeaways() {
  return (
    <section
      id="key-takeaways"
      className="sp-section"
      aria-labelledby="sp-takeaways-title"
    >
      <p className="mb-3 text-[12.5px] font-semibold uppercase tracking-[0.14em] text-primary">
        Key takeaways
      </p>

      <h2
        id="sp-takeaways-title"
        className="mb-10 max-w-[640px] font-serif text-[clamp(30px,4vw,44px)] font-normal leading-[1.08] tracking-[-0.02em] text-ink"
      >
        What Makes a Business Hard to Beat?
      </h2>

      <ol className="border-t border-border">
        {TAKEAWAYS.map((item) => (
          <li
            key={item.number}
            className="grid gap-x-8 gap-y-2 border-b border-border px-1 py-6 md:grid-cols-[72px_minmax(0,1fr)_minmax(0,1.5fr)] md:items-baseline"
          >
            <span
              className="font-serif text-[34px] font-medium leading-none tabular-nums text-primary"
              aria-hidden="true"
            >
              {item.number}
            </span>

            <h3 className="text-[18px] font-semibold leading-snug text-ink">
              {item.title}
            </h3>
            <p className="text-[16px] leading-relaxed text-ink-muted">
              {item.text}
            </p>
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