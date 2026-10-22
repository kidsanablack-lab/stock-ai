import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: [
      "lib/valuation-lab/**/*.test.ts",
      "lib/portfolio-lab/**/*.test.ts",
    ],
  },
});