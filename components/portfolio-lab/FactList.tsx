import type { ReactNode } from "react";
import Card from "@/components/ui/Card";

export type Fact = {
  label: string;
  value: ReactNode;
  note?: ReactNode;
};

/** Key facts as a description list: label, value, then the note (DESIGN.md section 5). */
export default function FactList({ facts }: { facts: Fact[] }) {
  return (
    <Card>
      <dl className="divide-y divide-border">
        {facts.map((fact) => (
          <div
            key={fact.label}
            className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3 first:pt-0 last:pb-0"
          >
            <dt className="text-small text-ink-muted">{fact.label}</dt>
            <dd className="text-right">
              <span className="text-lead font-semibold tabular-nums text-ink">{fact.value}</span>
              {fact.note && (
                <span className="block text-caption text-ink-muted">{fact.note}</span>
              )}
            </dd>
          </div>
        ))}
      </dl>
    </Card>
  );
}
