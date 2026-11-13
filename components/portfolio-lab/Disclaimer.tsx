import NoteBox from "@/components/ui/NoteBox";

/** Short form, shown once near the top (DESIGN.md section 2, rule 1). */
export function DisclaimerShort() {
  return (
    <NoteBox>
      <p>
        Portfolio Lab is an educational planning tool, not investment advice. Every portfolio,
        amount and result here is hypothetical.
      </p>
    </NoteBox>
  );
}

/** Full form, shown once near the bottom. */
export default function Disclaimer() {
  return (
    <aside aria-labelledby="pl-disclaimer-title">
      <NoteBox>
        <h2 id="pl-disclaimer-title" className="font-serif text-h4 font-normal">
          Please read
        </h2>

        <p>
          Scope Portfolio Lab is an educational planning tool, not personalized investment advice.
          Portfolio examples and calculations are hypothetical and do not guarantee future results.
          Actual investment outcomes may differ significantly. The tool does not execute trades or
          connect to brokerage accounts.
        </p>

        <p>
          Example portfolios are teaching examples, not recommendations, and none is best for
          everyone. Currency selection only changes how amounts are displayed. No exchange rates,
          prices, or fund holdings are used.
        </p>
      </NoteBox>
    </aside>
  );
}
