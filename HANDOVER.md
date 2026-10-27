# Elevate Care Pharmacy — Project Handover

**Prepared:** October 26, 2026  
**Status:** Local client-review build. No deployment has been made.

## What is implemented

The site is a responsive Next.js marketing experience for Elevate Care Pharmacy. It uses self-hosted Plein typography and has no forms, analytics, tracking, portal simulation, or collection of patient information.

Key completed experiences:

- Editorial CARE hero with the responsive image collage and primary actions.
- Connected geometric "How can we help today?" service panels aligned with the hero container.
- Interactive green **Elevate Care Approach** gallery with three slides, captions, keyboard/touch controls, visibility-aware autoplay, pause/play, and reduced-motion support.
- Editorial **Care that fits into your life** section with a circular photo carousel, connected principle selector, contact CTA, decorative personal-care seal, and retained prescription/privacy guidance.
- Responsive navigation, accessible FAQ, contact/footer sections, preview metadata, robots, sitemap, and an accessibility information page.

## Run and verify locally

Requires Node.js 20.9+ and npm. The work was last tested with Node 24.18.0.

```sh
npm ci
npm run dev
```

Open `http://127.0.0.1:3000`.

For a production-style local preview:

```sh
npm run build
npm start
```

Quality checks:

```sh
npm run typecheck
npm run lint
npm run build
npx playwright install chromium
npm test
```

`npm test` expects a local site on port 3000 unless `PLAYWRIGHT_BASE_URL` is set.

## Latest validation

The latest local validation completed successfully:

- Strict TypeScript, ESLint, and production build passed.
- All **20 Playwright tests** passed.
- The circular services gallery was checked at 1920, 1440, 1280, 1024, 768, 390, and 320px wide.
- Tests cover selected slide state, circular media sizing, keyboard/touch controls, horizontal overflow, responsive layout, font loading, key anchor targets, mobile navigation, FAQ keyboard behavior, reduced motion, and automated axe A/AA scans.
- Screenshots for the current circular section are in `artifacts/services-circle-{width}-0{1,2,3}.png`; desktop and mobile context captures are in `artifacts/services-circle-context-{1440,390}.png`.

See [VERIFICATION.md](VERIFICATION.md) for the complete implementation and validation history, including earlier Lighthouse and typography review notes.

## Important implementation map

| Area | Main files |
| --- | --- |
| Page composition | `app/page.tsx`, `app/globals.css` |
| Font and preview metadata | `app/layout.tsx`, `app/fonts/Plein-Variable.woff2` |
| Header and brand | `components/header.tsx`, `components/brand.tsx` |
| CARE hero | `components/sections/HeroSection.tsx`, `components/sections/hero/` |
| Geometric next-step panels | `components/sections/ServiceOverview.tsx`, `components/sections/next-steps/` |
| Green approach gallery | `components/sections/WhyElevate.tsx`, `lib/elevate-approach.ts` |
| Reusable gallery behavior | `components/ui/index-list-carousel.tsx`, `components/ui/index-list-carousel.css` |
| Circular editorial services section | `components/sections/ServicesSection.tsx`, `components/sections/services-editorial.css`, `lib/service-stories.ts` |
| Decorative personal-care seal | `components/sections/CareSeal.tsx` |
| Business data and confirmation gates | `lib/content.ts` |
| Browser tests | `tests/site.spec.ts`, `tests/services-editorial.spec.ts` |

## Content and asset notes

- Plein is locally served through `next/font/local`; license and provenance are in `app/fonts/README.md` and `app/fonts/FFL.txt`.
- The CARE hero, approach gallery, and service section use illustrative imagery. None of the images should be represented as Elevate Care staff, patients, or premises.
- The three circular service photos are generated illustrations in `public/images/services/`. Their prompt/provenance notes are in `public/images/services/README.md`.
- The personal-care SVG seal is decorative artwork only. It is not a clinical credential or certification.
- `lib/content.ts` intentionally leaves phone, address, hours, secure transfer URL, and privacy URL unset. Proposed services have `confirmed: false` and therefore remain unpublished.

## Before public launch

1. Supply and approve pharmacy identity, address, phone, hours, jurisdiction, official logo, team information, and client-owned photography.
2. Confirm every service claim, insurance participation, delivery details, marketing copy, and mission copy before enabling or publishing it.
3. Connect reviewed secure transfer/refill and provider workflows. No prescription or personal medical information can be submitted through the current preview.
4. Add an approved privacy-policy URL and accessibility support contact.
5. Set the production domain, canonical/metadata base, sitemap URL, and any approved structured data.
6. Remove the intentional preview `noindex` metadata and robots restriction in `app/layout.tsx` only when the pharmacy has approved publication.
7. Review hosting, security headers, privacy obligations, and final dependency advisories before production deployment.

## Known limits

- This workspace is not currently initialized as a Git repository, so no commit history accompanies this handover.
- Validation was local browser automation; no production deployment, real-device test, manual screen-reader session, or external workflow integration has been completed.
- The existing Lighthouse note in `VERIFICATION.md` was measured on an earlier local build. Re-run performance testing after final approved imagery and hosting configuration are in place.

