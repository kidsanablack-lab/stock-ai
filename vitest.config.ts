import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // Only run Valuation Lab tests. Portfolio Lab tests use a different runner.
    include: ["lib/valuation-lab/**/*.test.ts"],
  },
});