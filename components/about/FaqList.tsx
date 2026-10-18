"use client";

import { useId, useState } from "react";

type FaqItem = { question: string; answer: string };

type FaqListProps = {
  items: FaqItem[];
  /** Index of the item that starts open, or null for all closed. */
  defaultOpen?: number | null;
};

/** One-at-a-time accordion. Client component because it keeps open state. */
export default function FaqList({ items, defaultOpen = null }: FaqListProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(defaultOpen);
  const baseId = useId();

  return (
    <ul className="border-t border-border">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `${baseId}-panel-${index}`;

        return (
          <li key={item.question} className="border-b border-border">
            <h3>
              <button
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 px-1 py-5 text-left text-[17px] font-semibold text-ink transition-colors hover:text-primary"
              >
                {item.question}
                <i
                  className={`ti ${isOpen ? "ti-chevron-up" : "ti-chevron-down"} shrink-0 text-lg text-ink-muted`}
                  aria-hidden="true"
                />
              </button>
            </h3>

            <p
              id={panelId}
              hidden={!isOpen}
              className="max-w-[720px] px-1 pb-5 text-[15px] leading-relaxed text-ink-muted"
            >
              {item.answer}
            </p>
          </li>
        );
      })}
    </ul>
  );
}