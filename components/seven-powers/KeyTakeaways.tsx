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

      {/* Original look: 3 columns on wide screens, one row per item on phones. */}
      <ol className="mb-10 mt-7 grid grid-cols-1 border-t-[0.5px] border-[#dcdcd6] min-[901px]:grid-cols-3">
        {TAKEAWAYS.map((item) => (
          <li
            key={item.number}
            className="min-w-0 border-b-[0.5px] border-[#dcdcd6] py-6 last:border-b-0 min-[901px]:border-b-0 min-[901px]:border-l-[0.5px] min-[901px]:pb-2 min-[901px]:pl-7 min-[901px]:pr-7 min-[901px]:pt-7 min-[901px]:first:border-l-0 min-[901px]:first:pl-0"
          >
            <span
              className="mb-4 block font-serif text-[52px] leading-none tracking-[-1.5px] text-primary"
              aria-hidden="true"
            >
              {item.number}
            </span>

            <h3 className="mb-2.5 font-serif text-[22px] font-normal leading-[1.25] tracking-[-0.3px] text-[#1a1a18]">
              {item.title}
            </h3>
            <p className="text-[14px] leading-[1.7] text-[#6b6b68]">
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