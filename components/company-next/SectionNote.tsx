// SectionNote: the small explanatory note used under sections across the company page.
// Server Component. Text only; the caller passes the words.
//
//   <SectionNote title="How to read the grades">A is the strongest grade ...</SectionNote>
//   <SectionNote tone="caution" title="Worth knowing">These figures are estimates ...</SectionNote>
//
// tone "info" (default): light-blue panel, blue icon.
// tone "caution": light-purple panel, purple icon (purple = needs attention; never yellow).
// Flat colors only. Tailwind only, no separate CSS file.
import type { ReactNode } from "react";

type SectionNoteProps = {
  /** Short heading, 2 to 4 words. Optional. */
  title?: string;
  children: ReactNode;
  tone?: "info" | "caution";
  className?: string;
};

// Tailwind needs whole class names, so each tone is looked up, not built.
const TONE = {
  info: {
    panel: "bg-primary-soft/35",
    icon: "bg-primary-soft text-primary-ink",
  },
  caution: {
    panel: "bg-[color-mix(in_srgb,var(--cat-2)_8%,#ffffff)]",
    icon: "bg-[color-mix(in_srgb,var(--cat-2)_16%,#ffffff)] text-[var(--cat-2)]",
  },
} as const;

export default function SectionNote({ title, children, tone = "info", className = "" }: SectionNoteProps) {
  const t = TONE[tone];

  return (
    <aside
      className={`flex items-start gap-3.5 rounded-[20px] px-4 py-4 sm:gap-4 sm:px-6 sm:py-5 ${t.panel} ${className}`}
    >
      <span
        className={`grid size-9 shrink-0 place-items-center rounded-full text-xl ${t.icon}`}
        aria-hidden="true"
      >
        <i className="ti ti-info-circle" />
      </span>
      <div className="min-w-0">
        {title && <p className="text-[15px] font-semibold leading-snug text-ink">{title}</p>}
        <div
          className={`max-w-[820px] text-[15px] leading-relaxed text-ink-muted ${title ? "mt-1" : "pt-1.5"}`}
        >
          {children}
        </div>
      </div>
    </aside>
  );
}