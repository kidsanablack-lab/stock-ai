import Link from "next/link";
import type { CSSProperties } from "react";
import type { MockBusinessModel } from "@/lib/mock/business-models";
import { EARNS_FROM } from "@/lib/mock/business-model-tags";

export default function BusinessModelCard({
  model,
}: {
  model: MockBusinessModel;
}) {
  const tags = EARNS_FROM[model.slug] ?? [];

  const theme = {
    "--bm-accent": model.tone.accent,
    "--bm-tint": model.tone.bg,
  } as CSSProperties;

  return (
    <Link
      href={`/business-models/${model.slug}`}
      className="bm-card"
      style={theme}
    >
      

      <div className="bm-card-top">
        <div className="bm-card-icon">
          <i className={`ti ${model.icon}`} />
        </div>

        <div className="bm-card-title">
          <h3 className="bm-card-name">{model.name}</h3>
        </div>

        <div className="bm-card-go">
          <i className="ti ti-arrow-up-right" />
        </div>
      </div>

      <p className="bm-card-desc">{model.description}</p>

      {tags.length > 0 && (
        <div className="bm-card-earn">
          <small>Earns from</small>
          <div className="bm-card-chips">
            {tags.map((tag) => (
              <span key={tag} className="bm-card-chip">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </Link>
  );
}