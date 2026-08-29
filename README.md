# Megure Labs

Standalone landing page for Megure Labs. The site presents Hataya, Kaname, and the company's open-source foundations through the Megure ocean palette, the M PLUS 2 brand typeface, and a responsive visual system built for AI4Science.

## Stack

- Next.js 16 App Router
- TypeScript
- Tailwind CSS plus site-specific CSS
- Static export to `out/`
- Cloudflare Workers Static Assets or Cloudflare Pages

## Local development

```bash
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Inspect the current render

- [Continuous desktop scroll](previews/desktop-scroll/)
- [Continuous mobile scroll](previews/mobile-scroll/)
- [Desktop sections](previews/desktop-sections/)
- [Mobile sections](previews/mobile-sections/)
- [All previews and full-page diagnostics](previews/README.md)

The [`previews/`](previews/) folder is committed and visible in Finder and GitHub. Continuous scroll tiles and sectional PNGs stay below the height limits that cause full-page screenshots to appear cut off in some image viewers.

The current company-site and motion-library review is in [`research/AI_SITE_REFERENCES.md`](research/AI_SITE_REFERENCES.md).

## Verify

```bash
npm run check
```

The check runs TypeScript, lint, a production build, and browser-based visual verification at desktop, laptop, mobile, and small-mobile sizes. Inspectable full-page diagnostics and desktop/mobile sectional screenshots are written to `previews/`. The visual check fails on horizontal overflow, clipped key text, viewport escapes, or a fixed-header collision.

The visual check uses an installed Chrome or Chromium browser. On a machine without one, run `npx playwright install chromium` once.

## Deploy to Cloudflare

### Direct deploy with Wrangler

```bash
npm ci
npm run deploy
```

The deploy script builds the static site and uploads `out/` using `wrangler.toml`.

### Cloudflare Workers Builds from GitHub

Connect the production Worker to the public `megure-labs/megure-labs-site`
repository with these settings:

- Production branch: `main`
- Root directory: `/`
- Build command: `npm run build`
- Deploy command: `npx wrangler deploy`
- Custom domain: `megure.ai`

Once connected, a push to public `main` builds and deploys the static export.

No server runtime or environment variables are required.

The deployed assets use Latin-subset WOFF2 fonts and a runtime rasterization of the official logo mark. The original vector logo sources remain in `design/` for future brand work.

## Brand and content rules

- Use M PLUS 2 for all visible typography.
- Use the warm rice surface with the Megure blue, cyan, and violet palette.
- Keep the page direct, technical, and spacious.
- Use current public project names only: Orihime, Hikoboshi, Hataya, and Kaname.
- Use AI4Science in company-level positioning.
- Do not use em dashes in visible copy.
- Hataya is available for private evaluation and Kaname is available as a private preview. Neither is described as open source.
- Treat clipping, overlap, and horizontal overflow as release blockers.

## Public links

- [Orihime](https://github.com/megure-labs/orihime)
- [Hikoboshi](https://github.com/megure-labs/hikoboshi)
- [Megure Labs on GitHub](https://github.com/megure-labs)
