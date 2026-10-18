import Link from "next/link";
import { EARNS_FROM } from "@/lib/mock/business-model-tags";
import type { MockBusinessModel } from "@/lib/mock/business-models";

type BusinessModelRowProps = {
  model: MockBusinessModel;
  /** Background of the band the row sits on, so the hover color stays visible. */
  band?: "white" | "surface";
};

/** One business model as a hairline list row that links to its detail page. */
export default function BusinessModelRow({
  model,
  band = "white",
}: BusinessModelRowProps) {
  const tags = EARNS_FROM[model.slug] ?? [];
  const hover = band === "surface" ? "hover:bg-white" : "hover:bg-surface";

  return (
    <li>
      <Link
        href={`/business-models/${model.slug}`}
        className={`group grid grid-cols-[44px_minmax(0,1fr)_auto] items-start gap-x-4 gap-y-3 border-b border-border px-1 py-5 transition-colors md:grid-cols-[44px_minmax(0,1.5fr)_minmax(0,1.2fr)_auto] md:items-center md:gap-x-6 ${hover}`}
      >
        <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary-ink">
          <i className={`ti ${model.icon} text-[22px]`} aria-hidden="true" />
        </span>

        <span className="min-w-0">
          <b className="block text-[17px] font-semibold leading-tight text-ink transition-colors group-hover:text-primary">
            {model.name}
          </b>
          <span className="mt-1 block text-[15px] leading-relaxed text-ink-muted">
            {model.description}
          </span>
        </span>

        <i
          className="ti ti-arrow-right mt-3 text-lg text-ink-muted transition-colors group-hover:text-primary md:col-start-4 md:row-start-1 md:mt-0"
          aria-hidden="true"
        />

        {tags.length > 0 && (
          <span className="col-span-2 col-start-2 block md:col-span-1 md:col-start-3 md:row-start-1">
            <span className="mb-1.5 block text-[12.5px] text-ink-muted">
              Earns from
            </span>
            <span className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-border bg-white px-3 py-1 text-[12.5px] font-medium text-ink"
                >
                  {tag}
                </span>
              ))}
            </span>
          </span>
        )}
      </Link>
    </li>
  );
}