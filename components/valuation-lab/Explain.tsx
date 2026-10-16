import { GLOSSARY, type GlossaryKey } from "@/lib/valuation-lab/content";

export function Explain({ term }: { term: GlossaryKey }) {
  const entry = GLOSSARY[term];

  return (
    <details className="vl-explain">
      <summary>What is {entry.term}?</summary>
      <p>
        <strong>What it is.</strong> {entry.what}
      </p>
      <p>
        <strong>Why it is used.</strong> {entry.why}
      </p>
      <p>
        <strong>Limitation.</strong> {entry.limit}
      </p>
    </details>
  );
}

export function ExplainGroup({
  title,
  terms,
}: {
  title: string;
  terms: GlossaryKey[];
}) {
  return (
    <div className="vl-explain-group">
      <p className="vl-explain-title">{title}</p>
      {terms.map((term) => (
        <Explain key={term} term={term} />
      ))}
    </div>
  );
}