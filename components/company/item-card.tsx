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
    <div className="card-surface group relative w-full overflow-hidden rounded-2xl border border-zinc-200/90 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-[0_10px_24px_rgba(15,23,42,0.06)] sm:p-6">
      <div
        className={`absolute inset-0 bg-linear-to-br ${accent} opacity-0 transition-opacity duration-200 group-hover:opacity-100`}
      />
      <div className="relative flex min-w-0 flex-col">
        {tag && (
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
            {tag}
          </p>
        )}
        <h3 className="mt-3 text-base font-semibold leading-6 tracking-tight text-zinc-950 sm:text-lg">
          {name}
        </h3>
        <p className="mt-2 text-sm leading-6 text-zinc-500 break-words whitespace-normal">
          {description}
        </p>
      </div>
    </div>
  );
}
