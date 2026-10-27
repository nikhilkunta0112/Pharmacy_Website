import { test, expect } from "@playwright/test";
for (const width of [1920, 1440, 1280, 1024, 768, 390, 320]) {
  test(`Circular services gallery at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 1100 });
    await page.goto("/");
    const gallery = page.getByRole("region", {
      name: "Everyday pharmacy support",
    });
    await gallery.scrollIntoViewIfNeeded();
    await expect(gallery.locator(".il-row")).toHaveCount(3);
    for (let i = 0; i < 3; i++) {
      await gallery.locator(".il-row").nth(i).click();
      await expect(gallery).toHaveAttribute("data-active", String(i));
      await expect(gallery.locator('[aria-pressed="true"]')).toHaveCount(1);
    }
    const circle = await gallery
      .locator(".il-pane")
      .evaluate((e) => ({
        width: e.getBoundingClientRect().width,
        height: e.getBoundingClientRect().height,
        radius: getComputedStyle(e).borderRadius,
      }));
    expect(Math.abs(circle.width - circle.height)).toBeLessThan(1);
    expect(circle.radius).toBe("50%");
    await expect(gallery.locator(".service-care-seal")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await expect(page.locator('#services a[href="#contact"]')).toBeVisible();
    if (width >= 1024) {
      const buttons = await gallery
        .locator(".il-row")
        .evaluateAll((nodes) =>
          nodes.map((e) => e.getBoundingClientRect().top),
        );
      expect(Math.max(...buttons) - Math.min(...buttons)).toBeLessThan(1);
    }
    await expect(page.locator("#about")).toHaveCSS(
      "background-color",
      "rgb(80, 124, 67)",
    );
  });
}
