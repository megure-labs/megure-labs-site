import { spawn } from "node:child_process";
import { existsSync } from "node:fs";
import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const port = 4173;
const baseUrl = `http://127.0.0.1:${port}`;
const outputDir = new URL("../previews/", import.meta.url);

const server = spawn(
  "python3",
  ["-m", "http.server", String(port), "--directory", "out"],
  { stdio: "ignore" },
);

async function waitForServer() {
  for (let attempt = 0; attempt < 40; attempt += 1) {
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // The static server is still starting.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error(`Static server did not start at ${baseUrl}`);
}

const viewports = [
  { name: "desktop", width: 1440, height: 1000, sectionPreviews: true },
  { name: "laptop", width: 1024, height: 768 },
  { name: "mobile", width: 390, height: 844, sectionPreviews: true },
  { name: "small-mobile", width: 320, height: 700 },
];

const sectionPreviews = [
  { name: "01-hero", selector: ".hero" },
  { name: "02-proof", selector: ".proof-strip" },
  { name: "03-origin", selector: "#why" },
  { name: "04-hataya", selector: "#hataya" },
  { name: "05-provenance", selector: "#provenance" },
  { name: "06-kaname", selector: "#kaname" },
  { name: "07-open-source", selector: "#open-source" },
  { name: "08-contact", selector: "#contact" },
  { name: "09-footer", selector: ".site-footer" },
];

let browser;
let failed = false;

const browserCandidates = [
  chromium.executablePath(),
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
];
const executablePath = browserCandidates.find((candidate) => existsSync(candidate));

try {
  await mkdir(outputDir, { recursive: true });
  await waitForServer();
  if (!executablePath) {
    throw new Error("No Chromium browser found. Run `npx playwright install chromium` and retry.");
  }
  browser = await chromium.launch({ executablePath, headless: true });

  const motionPage = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
  await motionPage.emulateMedia({ reducedMotion: "no-preference" });
  await motionPage.goto(baseUrl, { waitUntil: "networkidle" });
  const motionDiagnostics = await motionPage.evaluate(() => {
    const selectors = [".current-line", ".current-particle-a", ".artifact-halo", ".kaname-rail", ".kaname-pivot-glow"];
    return selectors.map((selector) => {
      const node = document.querySelector(selector);
      if (!(node instanceof Element)) return { selector, missing: true };
      const style = getComputedStyle(node);
      return {
        selector,
        animationName: style.animationName,
        animationDuration: style.animationDuration,
      };
    });
  });

  const missingMotion = motionDiagnostics.filter(
    (item) => item.missing || item.animationName === "none" || item.animationDuration === "0s",
  );
  if (missingMotion.length) {
    failed = true;
    console.error(`[motion] FAIL\nmissing active animation: ${JSON.stringify(missingMotion)}`);
  } else {
    console.log(`[motion] PASS -> ${motionDiagnostics.map((item) => item.selector).join(", ")}`);
  }

  await motionPage.emulateMedia({ reducedMotion: "reduce" });
  const reducedMotionDiagnostics = await motionPage.evaluate(() => {
    const selectors = [".current-line", ".artifact-halo", ".kaname-rail", ".kaname-pivot-glow"];
    return selectors.map((selector) => {
      const node = document.querySelector(selector);
      return node instanceof Element ? getComputedStyle(node).animationDuration : "missing";
    });
  });
  const invalidReducedMotion = reducedMotionDiagnostics.filter((duration) => {
    if (duration === "missing") return true;
    const milliseconds = duration.endsWith("ms")
      ? Number.parseFloat(duration)
      : Number.parseFloat(duration) * 1000;
    return !Number.isFinite(milliseconds) || milliseconds > 1;
  });
  if (invalidReducedMotion.length) {
    failed = true;
    console.error(`[reduced-motion] FAIL\n${JSON.stringify(reducedMotionDiagnostics)}`);
  } else {
    console.log("[reduced-motion] PASS");
  }
  await motionPage.close();

  for (const viewport of viewports) {
    const page = await browser.newPage({ viewport });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(baseUrl, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.addStyleTag({
      content: "*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}",
    });

    const diagnostics = await page.evaluate(() => {
      const root = document.documentElement;
      const horizontalOverflow = root.scrollWidth - root.clientWidth;
      const selectors = [
        "[data-no-clip]",
        "h1",
        "h2",
        "h3",
        ".button",
        ".header-cta",
        ".project-topline",
        ".benchmark-head",
        ".benchmark-foot",
        ".proof-item",
      ].join(",");

      const clipped = Array.from(document.querySelectorAll(selectors))
        .filter((node) => node instanceof HTMLElement)
        .filter((node) => {
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") return false;
          const explicitlyGuarded = node.hasAttribute("data-no-clip");
          const clipsX = ["hidden", "clip", "auto", "scroll"].includes(style.overflowX);
          const clipsY = ["hidden", "clip", "auto", "scroll"].includes(style.overflowY);
          return (
            (node.scrollWidth > node.clientWidth + 1 && (explicitlyGuarded || clipsX)) ||
            (node.scrollHeight > node.clientHeight + 1 && (explicitlyGuarded || clipsY))
          );
        })
        .map((node) => ({
          selector: node.className || node.tagName.toLowerCase(),
          client: [node.clientWidth, node.clientHeight],
          scroll: [node.scrollWidth, node.scrollHeight],
          text: node.textContent?.trim().replace(/\s+/g, " ").slice(0, 90),
        }));

      const boundedSelectors = [
        ".header-inner",
        ".hero-copy",
        ".artifact-card",
        ".proof-grid",
        ".section-intro",
        ".origin-rail",
        ".hataya-grid",
        ".identity-flow",
        ".kaname-grid",
        ".kaname-panel",
        ".project-grid",
        ".evaluation-grid",
        ".footer-grid",
      ].join(",");

      const escaped = Array.from(document.querySelectorAll(boundedSelectors))
        .filter((node) => !node.closest("[data-visual-ignore]"))
        .map((node) => ({ node, rect: node.getBoundingClientRect() }))
        .filter(({ rect }) => rect.left < -1 || rect.right > window.innerWidth + 1)
        .map(({ node, rect }) => ({
          selector: node.className || node.tagName.toLowerCase(),
          left: Math.round(rect.left),
          right: Math.round(rect.right),
          viewport: window.innerWidth,
        }));

      const header = document.querySelector(".site-header")?.getBoundingClientRect();
      const heroCopy = document.querySelector(".hero-copy")?.getBoundingClientRect();
      const headerOverlap = Boolean(header && heroCopy && heroCopy.top < header.bottom - 1);

      return { horizontalOverflow, clipped, escaped, headerOverlap };
    });

    const screenshotUrl = new URL(`${viewport.name}.png`, outputDir);
    await page.screenshot({ path: screenshotUrl.pathname, fullPage: true });

    const anchorCollisions = [];
    for (const anchor of ["why", "hataya", "provenance", "kaname", "open-source", "contact"]) {
      const collision = await page.evaluate((id) => {
        const target = document.getElementById(id);
        const header = document.querySelector(".site-header");
        if (!(target instanceof HTMLElement) || !(header instanceof HTMLElement)) {
          return { id, missing: true };
        }
        target.scrollIntoView({ block: "start" });
        const targetRect = target.getBoundingClientRect();
        const headerRect = header.getBoundingClientRect();
        return {
          id,
          targetTop: Math.round(targetRect.top),
          headerBottom: Math.round(headerRect.bottom),
          overlaps: targetRect.top < headerRect.bottom - 1,
        };
      }, anchor);
      if (collision.missing || collision.overlaps) anchorCollisions.push(collision);
    }

    if (viewport.sectionPreviews) {
      const sectionOutputDir = new URL(`${viewport.name}-sections/`, outputDir);
      const scrollOutputDir = new URL(`${viewport.name}-scroll/`, outputDir);
      await mkdir(sectionOutputDir, { recursive: true });
      await mkdir(scrollOutputDir, { recursive: true });
      await page.evaluate(() => window.scrollTo(0, 0));
      await page.addStyleTag({
        content: `.site-header{position:absolute!important}.site-shell{min-height:${viewport.height}px!important}.hero{min-height:${viewport.height}px!important}`,
      });

      const documentHeight = await page.evaluate(() => document.documentElement.scrollHeight);
      const tileHeight = 3000;
      const tileOverlap = 160;
      let tileTop = 0;
      let tileIndex = 1;
      while (tileTop < documentHeight) {
        const currentTileHeight = Math.min(tileHeight, documentHeight - tileTop);
        const tileUrl = new URL(`${String(tileIndex).padStart(2, "0")}.png`, scrollOutputDir);
        await page.setViewportSize({ width: viewport.width, height: currentTileHeight });
        await page.evaluate((top) => window.scrollTo(0, top), tileTop);
        await page.screenshot({ path: tileUrl.pathname });
        if (tileTop + currentTileHeight >= documentHeight) break;
        tileTop += tileHeight - tileOverlap;
        tileIndex += 1;
      }
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.evaluate(() => window.scrollTo(0, 0));

      for (const [index, section] of sectionPreviews.entries()) {
        if (index === 1) {
          await page.addStyleTag({ content: ".site-header{display:none!important}" });
        }
        const sectionUrl = new URL(`${section.name}.png`, sectionOutputDir);
        await page.locator(section.selector).screenshot({ path: sectionUrl.pathname });
      }
      console.log(
        `[${viewport.name}] inspectable previews -> previews/${viewport.name}-scroll/ and previews/${viewport.name}-sections/`,
      );
    }
    await page.close();

    const errors = [];
    if (diagnostics.horizontalOverflow > 1) {
      errors.push(`horizontal overflow: ${diagnostics.horizontalOverflow}px`);
    }
    if (diagnostics.clipped.length) {
      errors.push(`clipped elements: ${JSON.stringify(diagnostics.clipped)}`);
    }
    if (diagnostics.escaped.length) {
      errors.push(`viewport escapes: ${JSON.stringify(diagnostics.escaped)}`);
    }
    if (diagnostics.headerOverlap) {
      errors.push("hero copy overlaps the fixed header");
    }
    if (anchorCollisions.length) {
      errors.push(`anchor collisions: ${JSON.stringify(anchorCollisions)}`);
    }

    if (errors.length) {
      failed = true;
      console.error(`[${viewport.name}] FAIL\n${errors.join("\n")}`);
    } else {
      console.log(`[${viewport.name}] PASS -> previews/${viewport.name}.png`);
    }
  }
} finally {
  if (browser) await browser.close();
  server.kill("SIGTERM");
}

if (failed) process.exit(1);
