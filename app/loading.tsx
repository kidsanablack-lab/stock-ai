import Container from "@/components/ui/Container";
import Skeleton from "@/components/Skeleton";

// Slightly different widths so the rows do not look like a stamped pattern.
const ROWS = [
  { name: 140, text: "72%" },
  { name: 110, text: "64%" },
  { name: 160, text: "78%" },
  { name: 124, text: "60%" },
  { name: 148, text: "70%" },
];

/** Shared loading state: same width and spacing as the redesigned pages. */
export default function Loading() {
  return (
    <section
      role="status"
      aria-busy="true"
      aria-label="Loading"
      className="pb-16 pt-10 lg:pb-[72px]"
    >
      <Container>
        {/* Heading + description */}
        <div className="mb-10 max-w-[620px]">
          <Skeleton height={44} radius={10} style={{ maxWidth: 420 }} />
          <Skeleton height={14} style={{ marginTop: 18 }} />
          <Skeleton height={14} style={{ marginTop: 10, maxWidth: 360 }} />
        </div>

        {/* Hairline list */}
        <div className="border-t border-border">
          {ROWS.map((row, index) => (
            <div
              key={index}
              className="flex items-center gap-4 border-b border-border px-1 py-5"
            >
              <Skeleton width={44} height={44} radius={12} />

              <div className="min-w-0 flex-1">
                <Skeleton width={row.name} height={14} />
                <Skeleton
                  width={row.text}
                  height={12}
                  style={{ marginTop: 10, maxWidth: 420 }}
                />
              </div>

              <div className="hidden sm:block">
                <Skeleton width={72} height={28} radius={999} />
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}