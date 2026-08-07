type ItemCardProps = {
  name: string;
  description: string;
  tag?: string;
  accent?: string;
};

export function ItemCard({
  name,
  description,
  tag,
  accent = "from-zinc-50 to-white",
}: ItemCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-zinc-300 hover:shadow-lg">
      <div
        className={`absolute inset-0 bg-linear-to-br ${accent} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
      />
      <div className="relative">
        {tag && (
          <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
            {tag}
          </p>
        )}
        <h3 className="mt-2 text-lg font-semibold tracking-tight text-zinc-950">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-zinc-500">{description}</p>
      </div>
    </div>
  );
}
