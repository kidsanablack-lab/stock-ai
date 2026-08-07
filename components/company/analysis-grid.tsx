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
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {categories.map((category) => (
        <div
          key={category.title}
          className={`rounded-2xl border ${category.border} bg-white p-6 shadow-sm transition-all duration-300 hover:shadow-md`}
        >
          <div className="flex items-center gap-3">
            <span className={`h-2.5 w-2.5 rounded-full ${category.accent}`} />
            <h3 className="text-base font-semibold text-zinc-950">
              {category.title}
            </h3>
          </div>
          <ul className="mt-4 space-y-3">
            {category.items.map((item) => (
              <li
                key={item}
                className="flex gap-3 text-sm leading-relaxed text-zinc-600"
              >
                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-300" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
