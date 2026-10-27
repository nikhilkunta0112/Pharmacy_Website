import { chromium } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const baseURL = process.env.REVIEW_URL || "http://127.0.0.1:3001";
const directory = "artifacts/typography/after";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch();
const results = [];
try {
  const page = await browser.newPage();
  await page.addInitScript(() => {
    window.__typographyCLS = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!entry.hadRecentInput) window.__typographyCLS += entry.value;
      }
    }).observe({ type: "layout-shift", buffered: true });
  });
  for (const width of [375, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(baseURL);
    await page.evaluate(() => document.fonts.ready);
    await page.locator("footer").scrollIntoViewIfNeeded();
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => scrollTo(0, 0));
    await page.screenshot({
      path: `${directory}/full-${width}.png`,
      fullPage: true,
    });
    await page.screenshot({ path: `${directory}/hero-${width}.png` });
    const metrics = await page.evaluate(() => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      cls: window.__typographyCLS,
      fonts: [...document.fonts].map((f) => ({
        family: f.family,
        weight: f.weight,
        status: f.status,
      })),
      headings: [...document.querySelectorAll("h1,h2")].map((el) => ({
        text: el.textContent,
        size: getComputedStyle(el).fontSize,
        weight: getComputedStyle(el).fontWeight,
        lineHeight: getComputedStyle(el).lineHeight,
        clipped: el.scrollWidth > el.clientWidth,
      })),
      inconsistentFamilies: [...document.querySelectorAll("body *")]
        .filter((el) =>
          [...el.childNodes].some(
            (n) => n.nodeType === Node.TEXT_NODE && n.textContent.trim(),
          ),
        )
        .filter((el) => !getComputedStyle(el).fontFamily.includes("plein"))
        .map((el) => ({
          element: el.tagName,
          family: getComputedStyle(el).fontFamily,
        })),
      fontRequests: performance
        .getEntriesByType("resource")
        .filter((r) => /\.(woff2?|ttf)/.test(r.name))
        .map((r) => r.name),
    }));
    const session = await page.context().newCDPSession(page);
    await session.send("DOM.enable");
    await session.send("CSS.enable");
    const { root } = await session.send("DOM.getDocument");
    const { nodeId } = await session.send("DOM.querySelector", {
      nodeId: root.nodeId,
      selector: "h1",
    });
    const renderedFonts = await session.send("CSS.getPlatformFontsForNode", {
      nodeId,
    });
    await session.detach();
    results.push({ width, ...metrics, renderedFonts });
  }
  const before = await readFile(
    "artifacts/typography/before/content.txt",
    "utf8",
  );
  const after = await page.locator("body").innerText();
  const contentUnchanged =
    before.replace(/\s/g, "") === after.replace(/\s/g, "");
  await writeFile(
    `${directory}/review.json`,
    JSON.stringify({ contentUnchanged, results }, null, 2),
  );
  console.log(
    JSON.stringify(
      {
        contentUnchanged,
        results: results.map((r) => ({
          width: r.width,
          overflow: r.overflow,
          cls: r.cls,
          inconsistentFamilies: r.inconsistentFamilies,
          fontRequests: r.fontRequests,
          renderedFonts: r.renderedFonts,
        })),
      },
      null,
      2,
    ),
  );
} finally {
  await browser.close();
}
