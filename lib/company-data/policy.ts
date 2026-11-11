// Company-specific choices about how to count things. Keep this list short and explain every entry on the page.

// Apple holds about $80B of long-term marketable securities (mostly bonds). Analysts count them as cash,
// so for Apple we add them to cash. For Microsoft the same FMP field is stakes in other companies (such as OpenAI),
// which are NOT cash, so Microsoft is left out.
export const CASH_INCLUDES_LONG_TERM_INVESTMENTS: Record<string, boolean> = { AAPL: true };