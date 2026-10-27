import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
for (const width of [320, 390, 768, 1024, 1280, 1440, 1648, 1920]) {
  test(`Layout, anchors, images, and accessibility at ${width}px`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    await page.goto("/");
    await page.evaluate(() => document.fonts.ready);
    const typography = await page.locator("h1").evaluate((heading) => ({
      family: getComputedStyle(heading).fontFamily,
      weight: getComputedStyle(heading).fontWeight,
      synthesis: getComputedStyle(heading).fontSynthesis,
      loaded: [...document.fonts].some(
        (font) => font.family.includes("plein") && font.status === "loaded",
      ),
    }));
    expect(typography.family).toContain("plein");
    expect(typography.weight).toBe("600");
    expect(typography.synthesis).toBe("none");
    expect(typography.loaded).toBe(true);
    await expect(page.getByRole("heading", { level: 1 })).toHaveText(
      "Pharmacy CareMade Simple.",
    );
    await expect(page.locator(".care-tile")).toHaveCount(13);
    await expect(page.locator(".care-letter")).toHaveCount(4);
    const lines = await page
      .locator("#care-heading span")
      .evaluateAll((spans) =>
        spans.map((span) => ({
          height: span.getBoundingClientRect().height,
          lineHeight: parseFloat(getComputedStyle(span).lineHeight),
        })),
      );
    expect(lines).toHaveLength(2);
    expect(lines.every((line) => line.height <= line.lineHeight + 1)).toBe(
      true,
    );
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.locator("h1").scrollIntoViewIfNeeded();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    expect(
      await page
        .locator('a[href^="#"]')
        .evaluateAll((links) =>
          links.every((a) =>
            document.getElementById(a.getAttribute("href")!.slice(1)),
          ),
        ),
    ).toBe(true);
    await expect(page.locator("main img")).toHaveCount(16);
    await expect(page.locator(".next-step-action")).toHaveCount(3);
    await expect(page.locator(".next-steps-section img")).toHaveCount(0);
    await expect(page.locator(".care-benefits")).toHaveCount(0);
    await expect(page.locator("#pathways-heading")).toHaveText(
      "How can we help today?",
    );
    const panels = await page
      .locator(".next-step-action")
      .evaluateAll((groups) =>
        groups.map((group) => ({
          height: group.getBoundingClientRect().height,
          curve: parseFloat(getComputedStyle(group).borderTopLeftRadius),
          lowerCorner: getComputedStyle(group).borderBottomRightRadius,
          shadow: getComputedStyle(group).boxShadow,
        })),
      );
    expect(
      Math.max(...panels.map((panel) => panel.height)) -
        Math.min(...panels.map((panel) => panel.height)),
    ).toBeLessThanOrEqual(1);
    expect(
      panels.every(
        (panel) =>
          panel.curve >= 60 &&
          panel.lowerCorner === "0px" &&
          panel.shadow === "none",
      ),
    ).toBe(true);
    if (width >= 1200) {
      const collage = await page.locator(".care-collage").boundingBox();
      const actions = await page.locator(".next-steps-actions").boundingBox();
      const copy = await page.locator(".care-hero-copy").boundingBox();
      const contact = await page.locator(".next-step-yellow").boundingBox();
      const intro = await page.locator(".next-step-intro").boundingBox();
      const accent = await page.locator(".next-step-accent").boundingBox();
      expect(accent!.width).toBeGreaterThanOrEqual(14);
      expect(Math.abs(actions!.x - collage!.x)).toBeLessThan(1);
      expect(
        Math.abs(contact!.x + contact!.width - collage!.x - collage!.width),
      ).toBeLessThan(1);
      expect(Math.abs(intro!.x - copy!.x)).toBeLessThan(1);
      expect(
        actions!.y - (collage!.y + collage!.height),
      ).toBeGreaterThanOrEqual(24);
      expect(actions!.y - (collage!.y + collage!.height)).toBeLessThanOrEqual(
        40,
      );
    }
    expect(
      await page
        .locator("#about")
        .evaluate((e) => getComputedStyle(e).backgroundColor),
    ).toBe("rgb(80, 124, 67)");
    const galleryPhoto = await page.locator("#about .il-pane").boundingBox();
    const galleryEditorial = await page
      .locator("#about .il-editorial")
      .boundingBox();
    const heroCopy = await page.locator(".care-hero-copy").boundingBox();
    const heroCollage = await page.locator(".care-collage").boundingBox();
    expect(Math.abs(galleryPhoto!.x - heroCopy!.x)).toBeLessThan(1);
    expect(
      Math.abs(
        galleryEditorial!.x +
          galleryEditorial!.width -
          heroCollage!.x -
          heroCollage!.width,
      ),
    ).toBeLessThan(1);
    await expect
      .poll(() =>
        page
          .locator("main img:visible")
          .evaluateAll((imgs) =>
            imgs.every(
              (i) =>
                (i as HTMLImageElement).complete &&
                (i as HTMLImageElement).naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    await page.screenshot({
      path: `artifacts/desktop-${width}.png`,
      fullPage: true,
    });
    expect(errors).toEqual([]);
  });
}
test("Mobile menu supports Escape, focus return, and section navigation", async ({
  page,
}) => {
  await page.setViewportSize({ width: 375, height: 850 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Open navigation" });
  await trigger.click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page
    .getByRole("navigation", { name: "Mobile navigation" })
    .getByRole("link", { name: "Services", exact: true })
    .click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page).toHaveURL(/#services$/);
});
test("FAQ keyboard control, reduced motion, and accessibility page", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const question = page.getByRole("button", {
    name: "How do I transfer my prescription?",
  });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
  await expect(
    page.getByText("A transfer cannot be started on this preview website.", {
      exact: false,
    }),
  ).toBeVisible();
  expect(
    await page.evaluate(
      () => getComputedStyle(document.documentElement).scrollBehavior,
    ),
  ).toBe("auto");
  await page.getByRole("link", { name: "Accessibility", exact: true }).click();
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Accessibility information",
  );
});
