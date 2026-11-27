// Small helpers that turn numbers into the text our pages show.
// pct1() also writes a negative percent with a real minus sign ("−5.9%").
// money(): billions in, text out. Negative amounts are written with a minus sign before the dollar sign ("−$46.9B"), never "$-46.9B".
export const money = (b: number | null, d = 1) => {
  if (b === null) return "n/a";
  const sign = b < 0 ? "−" : "";
  const a = Math.abs(b);
  return a >= 1000 ? `${sign}$${(a / 1000).toFixed(2)}T` : `${sign}$${a.toFixed(d)}B`;
};
export const pct1 = (v: number | null) => (v === null ? "n/a" : `${v < 0 ? "−" : ""}${Math.abs(v).toFixed(1)}%`);
export const signed = (v: number | null) => (v === null ? "n/a" : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)}%`);
export const pts = (v: number | null) => (v === null ? "n/a" : `${v >= 0 ? "+" : "−"}${Math.abs(v).toFixed(1)} pts`);
export const round = (v: number | null, d = 3) => (v === null ? 0 : Math.round(v * 10 ** d) / 10 ** d);
export const clean = (a: (number | null)[], d = 3) => a.map((x) => round(x, d));