import { SECTION_IDS } from "@/lib/seven-powers/powers";

const LEVELS = [
  {
    level: 1,
    label: "Today",
    title: "Making money today",
    text: "A business can be profitable right now thanks to a good product, strong demand, or good timing. That alone does not mean rivals cannot catch up.",
  },
  {
    level: 2,
    label: "Against rivals",
    title: "Having an advantage",
    text: "An advantage is something that helps a business perform better than its competitors, such as lower costs or customers who prefer it.",
  },
  {
    level: 3,
    label: "Over time",
    title: "Keeping it",
    text: "A durable advantage is hard for rivals to copy, so its benefit can last longer than a single good year.",
  },
];

const CHAIN = [
  "A Business Advantage",
  "Helps a Business Compete",
  "Can Make Imitation Difficult",
  "May Support Long-Term Profitability",
];

export default function BigPictureSection() {
  return (
    <section
      id={SECTION_IDS.bigPicture}
      className="sp-section"
      aria-labelledby="sp-big-picture-title"
    >
      <p className="sp-section-eyebrow">The big picture</p>

      <h2 id="sp-big-picture-title" className="sp-h2">
        What Makes a Business Hard to Beat?
      </h2>

      <p className="sp-section-lead">
        A successful business can make money today. A business with a
        durable competitive advantage has something that makes it difficult
        for competitors to match its position.
      </p>

      {/* Three levels */}
      <ol className="sp-levels">
        {LEVELS.map((item) => (
          <li key={item.level} className="sp-level">
            <div className="sp-level-bars" aria-hidden="true">
              {[1, 2, 3].map((bar) => (
                <span
                  key={bar}
                  className={bar <= item.level ? "is-on" : undefined}
                />
              ))}
            </div>

            <p className="sp-level-label">{item.label}</p>
            <h3 className="sp-level-title">{item.title}</h3>
            <p className="sp-level-text">{item.text}</p>
          </li>
        ))}
      </ol>

      {/* Advantage chain */}
      <div className="sp-chain-wrap">
        <p className="sp-chain-title">How an advantage can work</p>

        <ol className="sp-chain">
          {CHAIN.map((step, index) => (
            <li key={step} className="sp-chain-item">
              <span className="sp-chain-step">{step}</span>

              {index < CHAIN.length - 1 && (
                <i className="ti ti-arrow-right" aria-hidden="true" />
              )}
            </li>
          ))}
        </ol>
      </div>

      <div className="sp-note" role="note">
        <i className="ti ti-info-circle" aria-hidden="true" />
        <p>
          This is a way of thinking, not a guarantee. Even a strong
          advantage can fade, and every business still faces competition,
          mistakes, and changing markets.
        </p>
      </div>
    </section>
  );
}