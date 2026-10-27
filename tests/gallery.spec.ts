import { test, expect } from "@playwright/test";

async function openGallery(page: import("@playwright/test").Page) {
  await page.goto("/");
  const gallery = page.getByRole("region", {
    name: "The Elevate Care approach",
  });
  await gallery.scrollIntoViewIfNeeded();
  await expect
    .poll(() =>
      gallery
        .locator("img")
        .evaluateAll((imgs) =>
          imgs.every(
            (i) =>
              (i as HTMLImageElement).complete &&
              (i as HTMLImageElement).naturalWidth > 0,
          ),
        ),
    )
    .toBe(true);
  return gallery;
}

test("Indexed stories support hover, click, directional wraps, keyboard and rapid input", async ({
  page,
}) => {
  const gallery = await openGallery(page);
  await expect(gallery.locator(".il-row")).toHaveCount(3);
  await expect(gallery).toHaveAttribute("data-active", "0");
  const heading = await gallery.locator("h2").boundingBox();
  await gallery
    .getByRole("button", { name: "02 Everyday convenience", exact: true })
    .hover();
  await expect(gallery).toHaveAttribute("data-active", "1");
  await expect(gallery).toHaveAttribute("data-direction", "forward");
  await expect(gallery.locator(".il-caption-in")).toHaveText(
    "Care that fits into your day.",
  );
  await gallery
    .getByRole("button", { name: "03 Clear medication guidance", exact: true })
    .click();
  await expect(gallery).toHaveAttribute("data-active", "2");
  await gallery.getByRole("button", { name: "Next care story" }).click();
  await expect(gallery).toHaveAttribute("data-active", "0");
  await expect(gallery).toHaveAttribute("data-direction", "forward");
  await gallery.getByRole("button", { name: "Previous care story" }).click();
  await expect(gallery).toHaveAttribute("data-active", "2");
  await expect(gallery).toHaveAttribute("data-direction", "backward");
  const third = gallery.getByRole("button", {
    name: "03 Clear medication guidance",
    exact: true,
  });
  await third.focus();
  await page.keyboard.press("ArrowLeft");
  await expect(gallery).toHaveAttribute("data-active", "1");
  await expect(
    gallery.getByRole("button", {
      name: "02 Everyday convenience",
      exact: true,
    }),
  ).toBeFocused();
  await page.keyboard.press("Space");
  await expect(gallery.locator('[aria-expanded="true"]')).toHaveCount(1);
  await gallery
    .getByRole("button", { name: "Next care story" })
    .click({ clickCount: 5 });
  await expect(gallery.locator('[data-layer="on"]')).toHaveCount(1);
  await expect(gallery.locator('[data-layer="was"]')).toHaveCount(1);
  const after = await gallery.locator("h2").boundingBox();
  expect(Math.abs(heading!.y - after!.y)).toBeLessThan(1);
  await expect(gallery.locator(".il-sr")).not.toBeEmpty();
});

test("Autoplay respects visibility, pointer, focus, pause, hidden document and manual deferral", async ({
  page,
}) => {
  await page.clock.install();
  const gallery = await openGallery(page);
  await page.mouse.move(0, 0);
  await page.clock.runFor(6700);
  await expect(gallery).toHaveAttribute("data-active", "1");
  await gallery.hover();
  await page.clock.runFor(13000);
  await expect(gallery).toHaveAttribute("data-active", "1");
  const pause = gallery.getByRole("button", { name: "Pause care stories" });
  await pause.click();
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.clock.runFor(13000);
  await expect(gallery).toHaveAttribute("data-active", "1");
  await gallery.getByRole("button", { name: "Play care stories" }).click();
  await page.mouse.move(0, 0);
  await page.clock.runFor(13000); // Focus remains in the gallery.
  await expect(gallery).toHaveAttribute("data-active", "1");
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.evaluate(() =>
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    }),
  );
  await page.clock.runFor(13000);
  await expect(gallery).toHaveAttribute("data-active", "1");
  await page.evaluate(() => {
    delete (document as unknown as { hidden?: boolean }).hidden;
  });
  await page.clock.runFor(6700);
  await expect(gallery).toHaveAttribute("data-active", "2");
  await gallery
    .getByRole("button", { name: "01 Personal attention", exact: true })
    .click();
  await page.mouse.move(0, 0);
  await page.evaluate(() => (document.activeElement as HTMLElement)?.blur());
  await page.clock.runFor(4000);
  await expect(gallery).toHaveAttribute("data-active", "0");
  await page.evaluate(() => scrollTo(0, 0));
  await page.clock.runFor(13000);
  await expect(gallery).toHaveAttribute("data-active", "0");
});

test("Reduced motion disables autoplay and wipes; touch works with deliberate mobile order", async ({
  browser,
}) => {
  const context = await browser.newContext({
    viewport: { width: 390, height: 900 },
    hasTouch: true,
    isMobile: true,
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const gallery = await openGallery(page);
  await expect(
    gallery.getByRole("button", { name: "Play care stories" }),
  ).toBeDisabled();
  await gallery
    .getByRole("button", { name: "03 Clear medication guidance", exact: true })
    .tap();
  await expect(gallery).toHaveAttribute("data-active", "2");
  expect(
    await gallery
      .locator('[data-layer="on"]')
      .evaluate((e) => getComputedStyle(e).animationName),
  ).toBe("none");
  const positions = await gallery.evaluate((e) =>
    [".il-editorial", ".il-pane", ".il-list", ".il-controls"].map(
      (s) => e.querySelector(s)!.getBoundingClientRect().top,
    ),
  );
  expect(positions.every((v, i) => !i || v > positions[i - 1])).toBe(true);
  await context.close();
});
