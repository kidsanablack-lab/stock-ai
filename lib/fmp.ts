import { unstable_cache } from "next/cache";

export type FmpQuote = {
  symbol: string;
  name: string;
  price: number;
  changePercentage: number;
  change: number;
  volume: number;
  dayLow: number;
  dayHigh: number;
  yearHigh: number;
  yearLow: number;
  marketCap: number;
  priceAvg50: number;
  priceAvg200: number;
  exchange: string;
  open: number;
  previousClose: number;
  timestamp: number;
};

async function fetchFmpQuote(
  symbol: string,
): Promise<FmpQuote> {
  const apiKey = process.env.FMP_API_KEY;

  if (!apiKey) {
    throw new Error("Missing FMP_API_KEY environment variable");
  }

  const params = new URLSearchParams({
    symbol,
    apikey: apiKey,
  });

  const url =
    `https://financialmodelingprep.com/stable/quote?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `FMP request failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data) || data.length === 0) {
    throw new Error(
      "FMP returned an invalid or empty quote response",
    );
  }

  return data[0] as FmpQuote;
}

export async function getFmpQuote(
  symbol: string,
): Promise<FmpQuote> {
  const getCachedQuote = unstable_cache(
    async () => fetchFmpQuote(symbol),
    ["fmp-quote", symbol.toUpperCase()],
    {
      revalidate: 300,
    },
  );

  return getCachedQuote();
}