type AnalysisCategory = {
  title: string;
  items: string[];
  accent: string;
  border: string;
};

type AnalysisGridProps = {
  categories: AnalysisCategory[];
};

export function AnalysisGrid({ categories }: AnalysisGridProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-2">
      {categories.map((category) => (
        <div
          key={category.title}
          className={`card-surface group rounded-2xl border ${category.border} bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-zinc-300 hover:shadow-md sm:p-5 lg:p-6`}
        >
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${category.accent}`} />
            <h3 className="text-base font-semibold tracking-tight text-zinc-950">
              {category.title}
            </h3>
          </div>
          <ul className="mt-4 space-y-3">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-6 text-zinc-600"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-zinc-300" />
                <span className="min-w-0 break-words">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
