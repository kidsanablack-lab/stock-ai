type ProgressBarProps = {
  label: string;
  value: number;
  amount: string;
  color?: string;
};

export function ProgressBar({
  label,
  value,
  amount,
  color = "bg-zinc-900",
}: ProgressBarProps) {
  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-4">
        <span className="text-sm font-medium text-zinc-900">{label}</span>
        <span className="text-sm text-zinc-500">
          {amount}{" "}
          <span className="font-medium text-zinc-700">({value}%)</span>
        </span>
      </div>
      <div className="h-2.5 overflow-hidden rounded-full bg-zinc-100">
        <div
          className={`h-full rounded-full ${color} transition-all duration-700 ease-out`}
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}
