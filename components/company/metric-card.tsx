type MetricCardProps = {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
};

export function MetricCard({ label, value, change, positive }: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md">
      <p className="text-xs font-medium tracking-wider text-zinc-400 uppercase">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold tracking-tight text-zinc-950 sm:text-3xl">
        {value}
      </p>
      {change && (
        <p
          className={`mt-2 text-sm font-medium ${
            positive ? "text-emerald-600" : "text-zinc-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}
