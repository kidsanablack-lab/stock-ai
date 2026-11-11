// Small helpers that turn numbers into the text our pages show.
export const money = (b: number | null, d = 1) => (b === null ? "n/a" : b >= 1000 ? `$${(b / 1000).toFixed(2)}T` : `$${b.toFixed(d)}B`);
export const pct1 = (v: number | null) => (v === null ? "n/a" : `${v.toFixed(1)}%`);
export const signed = (v: number | null) => (v === null ? "n/a" : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`);
export const pts = (v: number | null) => (v === null ? "n/a" : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)} pts`);
export const round = (v: number | null, d = 3) => (v === null ? 0 : Math.round(v * 10 ** d) / 10 ** d);
export const clean = (a: (number | null)[], d = 3) => a.map((x) => round(x, d));