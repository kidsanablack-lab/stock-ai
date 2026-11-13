import type { ReactNode } from "react";
import { HypotheticalTag, LabelChip } from "@/components/ui/Labels";
import { SourceLine } from "@/components/ui/Notes";

type PlSectionProps = {
  id: string;
  /** Kept stable where code focuses the title (for example pl-builder-title). */
  titleId?: string;
  title: ReactNode;
  lead?: ReactNode;
  labels?: Array<"hypothetical" | "analysis">;
  source?: ReactNode;
  children: ReactNode;
};

/** DESIGN.md section 5 default: conclusion title, lead, labels, blocks, source line. */
export default function PlSection({
  id,
  titleId = `${id}-title`,
  title,
  lead,
  labels = [],
  source,
  children,
}: PlSectionProps) {
  return (
    <section id={id} aria-labelledby={titleId} className="scroll-mt-24">
      <h2
        id={titleId}
        tabIndex={-1}
        className="max-w-3xl font-serif text-h2 font-normal tracking-title text-ink"
      >
        {title}
      </h2>

      {lead && <p className="mt-5 max-w-prose text-lead text-ink-muted">{lead}</p>}

      {labels.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-2">
          {labels.includes("hypothetical") && <HypotheticalTag />}
          {labels.includes("analysis") && <LabelChip kind="analysis" />}
        </div>
      )}

      <div className="mt-8 space-y-12">{children}</div>

      {source && <SourceLine className="mt-12">{source}</SourceLine>}
    </section>
  );
}
