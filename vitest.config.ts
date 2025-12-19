import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: "tests/setup.ts",
    coverage: {
      provider: "v8", // fast & recommended
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      exclude: ["node_modules/", "src/tests/setup.ts", "src/tests/mocks/**"],
    },
  },
});
