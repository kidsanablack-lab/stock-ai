type MetricCardProps = {
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
};

export function MetricCard({ label, value, change, positive }: MetricCardProps) {
  return (
    <div className="card-surface rounded-2xl border border-zinc-200/90 bg-white p-4 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-all duration-200 hover:border-zinc-300 hover:shadow-[0_8px_20px_rgba(15,23,42,0.05)] sm:p-5 lg:p-6">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-zinc-400">
        {label}
      </p>
      <p className="mt-3 text-2xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-[1.75rem]">
        {value}
      </p>
      {change && (
        <p
          className={`mt-2 text-sm font-medium leading-5 ${
            positive ? "text-emerald-600" : "text-zinc-500"
          }`}
        >
          {change}
        </p>
      )}
    </div>
  );
}
