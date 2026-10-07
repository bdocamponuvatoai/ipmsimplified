import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { routes } from "../../content/routes";
for (const [route] of routes) {
  test(`${route}: landmarks, console, accessibility and widths`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    const response = await page.goto(route);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("main")).toBeVisible();
    expect(
      (
        await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze()
      ).violations,
    ).toEqual([]);
    for (const width of [360, 390, 768, 1024, 1440, 1920]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= window.innerWidth,
        ),
      ).toBe(true);
    }
    expect(errors).toEqual([]);
  });
}
test("mobile dialog and edition keyboard controls", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await page.getByRole("button", { name: "Open navigation" }).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await page.goto("/products/permit");
  await page.getByRole("tab", { name: "Fire", exact: true }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "All Trades" })).toHaveAttribute(
    "aria-selected",
    "true",
  );
});
test("form rejects missing product and does not fake delivery", async ({
  page,
}) => {
  await page.goto("/demo");
  await page.getByLabel("Name", { exact: true }).fill("Example Person");
  await page.getByLabel("Work email").fill("person@example.org");
  await page.getByLabel("Organisation", { exact: true }).fill("Example Office");
  await page.getByLabel("Role", { exact: true }).selectOption("Jurisdiction");
  await page.getByRole("button", { name: "Schedule a demo" }).click();
  await expect(page.getByText("Choose at least one product.")).toBeVisible();
});
test("no-JS home and reduced motion show final records", async ({
  browser,
  page,
}) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const nojs = await context.newPage();
  await nojs.goto("/");
  await expect(nojs.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(nojs.locator(".hero .flip-final")).toBeVisible();
  await context.close();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.locator(".hero .flip-final")).toBeVisible();
  await expect(page.locator(".hero .flip-initial")).not.toBeVisible();
});
