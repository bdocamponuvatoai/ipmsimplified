import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/browser",
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://localhost:3000",
    ...devices["Desktop Chrome"],
  },
  webServer: process.env.TEST_BASE_URL
    ? undefined
    : {
        command: "npm run start",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
      },
  reporter: [["list"], ["html", { open: "never" }]],
});
