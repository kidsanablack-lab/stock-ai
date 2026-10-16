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

      <div className="sp-closing">
        <p className="sp-closing-line">
          Understand the business. Understand its advantage.
        </p>

        <a href="#explore-powers" className="sp-btn sp-btn-ghost">
          Review the 7 Powers
        </a>

        <p className="sp-closing-fine">
          The 7 Powers framework was developed by Hamilton Helmer in{" "}
          <cite>7 Powers: The Foundations of Business Strategy</cite>{" "}
          (2016). Scope&apos;s explanations and examples are its own. Scope
          is built for understanding businesses, not for investment advice.
        </p>
      </div>
    </section>
  );
}