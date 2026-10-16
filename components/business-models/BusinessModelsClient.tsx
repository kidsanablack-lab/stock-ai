import BusinessModelCard from "@/components/business-models/BusinessModelCard";
import type { MockBusinessModel } from "@/lib/mock/business-models";

export default function BusinessModelsClient({
  models,
}: {
  models: MockBusinessModel[];
}) {
  return (
    <div className="bm-grid" style={{ marginTop: 24 }}>
      {models.map((model) => (
        <BusinessModelCard key={model.slug} model={model} />
      ))}
    </div>
  );
}