# Verification report

## Typography refinement — October 23, 2026

Plein replaces both previous font families across all website text. The official variable WOFF2 is self-hosted using next/font/local; its 300–900 axis supports true 600-weight headings. One 30,888-byte file is served, with swap display, adjusted Arial fallback, and disabled synthetic styles. Source/license details are retained in `app/fonts/README.md` and `app/fonts/FFL.txt`.

The type scale now uses restrained responsive headings, medium navigation/buttons, regular body copy, reduced label tracking and larger supporting text. Existing sections, assets, colors, copy and behavior are preserved. A whitespace correction prevents words joining where the existing pathway headline line break is hidden on smaller screens.

Production build, strict TypeScript and ESLint passed. Six Playwright tests passed, including font loading/weight/synthesis assertions and the existing navigation, FAQ, reduced-motion and axe checks. Actual screenshots were compared at 375, 768, 1024 and 1440px. Browser CDP confirms that the hero glyphs render in **Plein Variable**, not merely a matching computed CSS name. All text elements inherit the same family; only one local font request occurs. The review recorded zero layout shift, horizontal overflow or clipped headings at those widths. Copy comparisons match after normalizing whitespace.

Before/after screenshots and browser measurements: `artifacts/typography/before/`, `artifacts/typography/after/`, and `artifacts/typography/after/review.json`. Reproduce with `node scripts/typography-review.mjs` against port 3001, or supply `REVIEW_URL`. Lighthouse figures below belong to the earlier build and were not remeasured for this typography-only change.

## Original implementation verification

Tested locally on October 22, 2026 (Asia/Calcutta). No deployment was performed.

## Executed checks

- Production build: passed; homepage, accessibility page, robots and sitemap statically generated.
- Strict TypeScript: passed.
- ESLint: passed with zero warnings after cleanup.
- Prettier applied to application, components, configuration and tests.
- Playwright: 6 tests passed against the production server.
- Responsive checks: 375, 768, 1024 and 1440px; no horizontal overflow, missing image loads, broken anchor targets or browser page exceptions observed.
- Interaction checks: mobile drawer opening, Escape dismissal, focus return, section navigation; FAQ keyboard opening; reduced-motion scroll behavior; accessibility page navigation.
- Axe WCAG 2/2.1/2.2 A/AA automated checks: zero violations at the four tested widths. This is not a complete manual accessibility certification.
- Desktop and mobile screenshots visually reviewed. Mobile headline and photograph sizing refined after review.

## Lighthouse mobile measurement

Local production build, Chromium headless, default Lighthouse mobile throttling. One final local run; field performance will vary.

| Category or metric       | Result      |
| ------------------------ | ----------- |
| Performance              | 92          |
| Accessibility            | 100         |
| Best practices           | 100         |
| SEO                      | 66          |
| Largest Contentful Paint | 3.0 seconds |
| Cumulative Layout Shift  | 0           |
| Total Blocking Time      | 160 ms      |

SEO is intentionally reduced by preview noindex and robots restrictions. Do not remove those until the pharmacy approves public launch. LCP remains above the 2.5-second target in simulated mobile conditions. INP was not measured; TBT is not an INP result.

Full report: `artifacts/lighthouse-mobile.json`.

## Dependency security

`npm audit --omit=dev`: zero vulnerabilities. Full audit reports five high-severity entries in the development-only chain `eslint-config-next → @next/eslint-plugin-next → fast-glob → micromatch → braces`, relating to deeply nested pattern exhaustion. Compatible `npm audit fix` did not resolve these. The proposed forced fix downgrades framework lint configuration to Next 14 and was not applied. Recheck upstream patches before production CI use; no claim of a clean full dependency audit is made.

## Screenshots

- `artifacts/hero-375.png`, `artifacts/hero-1440.png`: final viewport views.
- `artifacts/desktop-375.png`, `artifacts/desktop-768.png`, `artifacts/desktop-1024.png`, `artifacts/desktop-1440.png`: full-page responsive views (filenames describe widths; the 375px view is mobile).

## Limits

The in-app browser surface was unavailable. Browser QA used the user-requested Playwright tooling. No real device, screen-reader session, external transfer integration, production hosting, or real-world performance measurement was performed. Source control was not initialized and no commit or deployment was created. Contact information, services, mission copy, team information and legal content require approval as detailed in README.md.

## Editorial CARE hero — October 23, 2026

Replaced only the hero and adjusted header presentation/contact CTA. Preserved existing logo, navigation destinations, mobile dialog, preview disclosure, and all following sections. Plein remains locally hosted. The collage has 13 independent CSS Grid elements (8 photos, 4 real-text letters, 1 accent), with 6 visible tiles on mobile. Photo sources/crops are centralized in components/sections/hero/assets.ts; provenance and outstanding replacements are in public/images/hero/README.md.

Visual comparison used the supplied chat reference. Actual browser screenshots captured at 1648 × 928, 1440, 1024, 768, 390 and 320px: artifacts/care-{width}.png. Reviewed desktop, tablet and mobile layouts; refined patient-face placement and botanical crops after the first screenshot pass. Two-line heading, responsive CTA stacking, thin gutters, color blocks, four benefits and sharp collage edges verified. Remaining visual differences: existing cross wordmark rather than the unavailable official leaf logo; alternative stock subjects; bottle handoff rather than prescription bag; interior placeholder rather than pharmacy exterior; existing preview disclosure retained. Exact photo-level fidelity requires approved replacement photography.

Production build, TypeScript and ESLint passed. Eight Playwright tests passed, including all six widths, Plein loading, two-line heading, independent tile count, visible image loading, anchor targets, horizontal overflow, mobile navigation, keyboard FAQ, reduced motion, and axe WCAG A/AA scans. Hidden mobile photo tiles are excluded from image-load assertions because browser lazy loading intentionally defers them. Service claims remain unconfirmed; hero copy invites inquiries and does not promise delivery or refill turnaround. No deployment performed.

## Image-integrated next steps — October 23, 2026

Replaced ServiceOverview with one connected editorial composition: botanical/mint introduction plus three image/action groups. New scoped CSS and centralized content live in components/sections/next-steps/. Four independent Next.js images, square panel edges, no shadows, 230px desktop groups, pastel Lucide icon circles, subtle hover/focus treatments and existing #prescriptions/#faq/#contact destinations. Removed the redundant benefits markup from HeroSection; approved headline, description, CTAs and CARE collage remain unchanged. No other sections or navigation were edited.

The desktop composition uses 30/23.3/23.3/23.3 proportions with contiguous image strips. At 1024 and 768 it forms two columns; mobile retains a photo/text pair per stacked group. At 320px the heading size and inset are reduced to keep the introduction on two lines, with equal group heights. Reused licensed stock and created tighter handoff/shelving crops in public/images/next-steps/; provenance is documented there. Images are illustrative, not actual Elevate Care staff or premises. Stock handoff and professional portrait differ from the supplied reference; no branded bag was fabricated.

Captured and inspected actual Chromium section screenshots at 1440, 1024, 768, 390 and 320px, plus hero-transition context screenshots. Artifacts: artifacts/next-steps-{width}.png and artifacts/next-steps-context-{width}.png. Tightened pharmacy crops and corrected responsive image sizing after the first review to avoid blurry narrow strips. Typecheck, ESLint and production build passed. Browser tests cover equal group heights, square edges/no shadows, image counts/loading, removal of duplicate benefits, anchors, no horizontal overflow, Plein, mobile navigation, keyboard FAQ, reduced motion and automated axe checks.

## Hero-to-services continuity refinement — October 23, 2026

Reworked only ServiceOverview and its scoped next-steps content/styles. The desktop row shares the hero's 4% left inset, 34% copy column and 1% gap, aligning the service composition exactly with the CARE collage. At small desktop/tablet it follows the existing 39%/2% hero grid with stacked action rows. Introductory copy now reads “How can we help today?” and “From prescription transfers to refill guidance, find the support you need.” Removed the outer frame, mint introduction background and repeated botanical/portrait images. Desktop hero-to-services separation is 20px; mobile is 24px. Approved hero content and collage are unchanged; only its bottom spacing is refined through scoped transition CSS.

Three action links retain their destinations, descriptions, Lucide icons and pastel accents. Images vary between a vertical handoff strip, shallow horizontal shelving detail and offset staff detail on the right. Responsive layouts alternate the image sides while retaining readable copy and 5px gutters. The new contact.jpg is an illustrative crop of the existing licensed pharmacy.jpg, not an actual Elevate Care staff portrait. All other sections and navigation remain unchanged.

Compared combined lower-hero/service screenshots before and after rather than reviewing services alone. Before: artifacts/flow-before-1440.png. After: artifacts/flow-{1648,1440,1024,768,390,320}.png. Inspected desktop, tablet and mobile continuity, spacing, photographic rhythm and alignment. Corrected a small tablet row-height discrepancy after browser testing; action rows now share automatic equal heights. TypeScript, ESLint and production build pass. Browser coverage includes desktop column alignment and 12–24px transition spacing, three independent action images, equal action heights, sharp edges/no shadows, heading copy, loading, anchors, overflow, Plein, menu/FAQ keyboard behavior and axe checks.

## Design 04 — Geometric Accent — October 23, 2026

Replaced the image-integrated ServiceOverview with three flat geometric panels in sage (#EAF4EE), cyan (#E3F5F7) and warm yellow (#FFF3CD). The introduction retains “How can we help today?” and uses the requested new supporting copy, anchored by a solid 18px natural-green bar (14px mobile). Desktop uses a 28% intro and three equal panels, 205px minimum height, 6px gutters and large asymmetric upper curves. The middle panel has a complementary upper-right curve matching the reference. No gradients, outer frame, shadows or service photography. Icons sit beside service copy in outlined circles; ArrowUpRight sits inside a small colored circular accent. The entire service area remains the accessible link, with visible focus and reduced-motion support.

Hero markup and photography remain unchanged. Only the transition spacing changes to 32px desktop / 28px mobile through section-scoped CSS. Existing navigation, service descriptions, destinations (#prescriptions, #faq, #contact), font configuration, footer and all other sections remain unchanged. Previous service image files are retained but no longer referenced by this component. No new assets or dependencies were introduced.

Updated files: components/sections/ServiceOverview.tsx; components/sections/next-steps/content.ts; components/sections/next-steps/next-steps.css; tests/site.spec.ts; this report. Visual review includes the full hero and section together at 1648, 1440, 1024, 768, 390 and 320px in artifacts/geometric-flow-{width}.png. Refined tablet title/icon top alignment after initial screenshots. Tablet places the introduction above three balanced panels; mobile stacks all panels while retaining horizontal icon/text alignment.

TypeScript, ESLint and production build passed. Playwright covers all six widths, equal panel heights, geometric upper curves with square lower corners, no shadows or section images, anchor targets, image loading, no horizontal overflow, Plein, mobile menu/FAQ keyboard behavior, reduced motion and axe accessibility scans.

## Interactive Elevate Care approach gallery — October 23, 2026

Replaced the static image/principles in WhyElevate with an adapted version of the user-supplied IndexListCarousel. New reusable client component and scoped CSS: components/ui/index-list-carousel.tsx and index-list-carousel.css. Centralized exactly three stories in lib/elevate-approach.ts. Preserved the section label, heading, introduction, three principle titles/descriptions, Plein, mint background, shared container and distinctive lower-right image corner. Hero, service actions, navigation, footer and following sections are unchanged. No dependencies installed, canvas generation, landscape defaults, serif fonts or full-viewport sizing retained.

Interactions: mouse hover, click, touch taps, local arrow-key navigation, Enter/Space selection, Previous/Next with deterministic wrap direction, counter and Pause/Play. Layered 850ms directional clip-path wipes retain the outgoing image until the entering image covers it. Image readiness guards defer transitions until the target image has loaded; rapid changes retain only the latest requested slide. Captions fade out/in with their photographs, and only the active principle description expands. A reserved index region keeps static editorial content and controls stable. Inactive images/descriptions are hidden from assistive technology, manual selection uses a polite announcement, and autoplay does not repeatedly announce changes.

6500ms autoplay advances only when at least 55% of the gallery is visible; pointer hover, internal keyboard focus, document.hidden, explicit pause and manual-interaction deferral suspend it. Timers and observers clean up on unmount. Reduced motion disables autoplay and wipes by default while retaining manual selection. First gallery image is visible in server-rendered content; all image layers use Next.js Image with lazy loading. Image sizing was refined after first screenshots to prevent low-resolution cover crops. At 950px and below the composition stacks heading/introduction, 4:3 photograph/caption, index and controls so tablet subjects remain visible.

Photography: two existing licensed project photos plus one verified new Pexels/cottonbro photo in public/images/approach/guidance.jpg. Provenance and client-photo replacement notes: public/images/approach/README.md. All images are illustrative traditional pharmacy settings, not Elevate Care staff/premises; they do not match the preferred contemporary setting exactly. No identities, branding, prescriptions or medical instructions were generated.

Validation: TypeScript, ESLint and production build passed. All 13 Playwright tests passed: eight responsive/site/axe checks (320–1920px), existing menu/FAQ checks, and three gallery tests covering selection, hover, forward/backward wraps, rapid navigation, caption correspondence, keyboard focus, stable heading position, touch, reduced motion, autoplay and visibility/pointer/focus/pause/hidden-document/manual-delay behavior. Browser screenshots capture all three active states at 1920, 1440, 1024, 768, 390 and 320px: artifacts/approach-{width}-0{1,2,3}.png. Context captures include section transitions; additional mid-wipe captures document both directions. Actual screenshots reviewed on desktop, tablet and mobile; no horizontal overflow or axe A/AA violations in the tested views. No deployment performed.

## Gallery green background and expanded alignment — October 23, 2026

Targeted refinement to components/ui/index-list-carousel.tsx and its scoped stylesheet. Removed the centered .container class from the gallery parent. It now follows the preceding editorial sections' 4% left inset, full right boundary and 2000px maximum width on large screens. Desktop columns split the available space 47/53 with clamp(48px, 4vw, 80px) spacing; existing tablet stacking and 20px mobile gutters remain intact. Image sizes were updated to reflect the expanded viewport. Paragraph measure increases to a readable 520px maximum. Caption, counter and navigation stay aligned to the image.

#about now uses exactly #507C43 edge to edge. Scoped off-white heading/index/control colors and lighter supporting text preserve at least 4.5:1 text contrast against that background, while caption text retains dark evergreen on solid white. Dividers, active indicator, control outlines/hover and keyboard focus are adjusted for the darker background. Font family, type sizes, copy, images, curved corner and all carousel logic are unchanged; hero, services and following sections are untouched.

Measured alignment, background and overflow at 1920, 1440, 1280, 1024, 768, 390 and 320px; results in artifacts/green-gallery-alignment.json. Both outer content edges match the earlier sections within subpixel rounding and no horizontal overflow occurs. All three slides captured at each requested width: artifacts/green-gallery-{width}-0{1,2,3}.png. Context screenshots show the complete preceding service row and gallery together. Actual desktop, tablet and mobile captures were inspected.

TypeScript, ESLint and production build passed. All 13 Playwright tests passed, including explicit exact-background and hero/gallery edge-alignment assertions, image loading, no overflow, automated axe A/AA checks, gallery hover/click/touch/keyboard behavior, directional wrapping, caption updates, autoplay visibility/focus/pause behavior and reduced motion. Initial supporting color was tightened after contrast measurement; final contrast scans pass. No deployment performed.

## Circular editorial redesign applied to ServicesSection — October 23, 2026

The user clarified that the new circular editorial design belongs in the attached “Care that fits into your life” / Support for the Everyday section, not the existing Elevate Care Approach gallery. Implemented in components/sections/ServicesSection.tsx with scoped services-editorial.css. Preserved its heading and introductory copy; retained the original prescription guidance, privacy copy and #prescriptions link in a compact supporting row. Contact Our Team links to the existing #contact destination. Unconfirmed services remain unpublished; confirmed-service rendering is retained.

New composition: warm #FAFAF7 canvas, large Plein headline/CTA on the left, three horizontally connected numbered principle buttons below, circular photograph on the right, pale sage CSS accent and a crisp SVG mortar-and-pestle “PERSONAL CARE / REAL SUPPORT” seal (decorative, not accreditation). Mobile order is copy, CTA, circular photo/seal, stacked principles, compact controls. The parent uses the same 4% inset/large-screen maximum width as the preceding editorial sections. All photo masks retain a fixed 1:1 circle during directional wipes.

Reused the existing IndexListCarousel logic through an optional circular variant and decorative composition slot. Default indexed behavior remains unchanged. Both galleries independently retain 6500ms visibility-aware autoplay, hover/focus/document-hidden pauses, manual delay, Pause/Play, keyboard/touch controls and reduced-motion handling. New principle descriptions remain visible, with aria-pressed and associated accessible descriptions; inactive photographs stay hidden from assistive technology. Existing Approach gallery, hero, geometric services, header, footer and other sections remain unchanged.

Assets: three independently generated, anonymous illustrative pharmacy photographs in public/images/services/{attention,convenience,guidance}.jpg. They are not client staff/patients/premises. Built-in image_gen was used; prompt set and source location are documented in public/images/services/README.md. Centralized typed scene configuration: lib/service-stories.ts. No new dependency installed. Decorative seal: components/sections/CareSeal.tsx.

Validation: TypeScript, ESLint and production build pass. All 20 Playwright tests pass: existing gallery behavior, site font/anchor/overflow/axe checks, and seven new circular-gallery checks at 1920, 1440, 1280, 1024, 768, 390 and 320px. New tests cover each selected photo, pressed-state uniqueness, true circular dimensions, seal/CTA, horizontal principle alignment, no overflow and preserved Approach background. Corrected a subpixel accent overflow at 1280px after first browser pass. Also corrected an encoding marker introduced while extracting the shared wrapper styling; the original gallery's layout and interaction tests now pass unchanged.

All three services slide states captured at all seven requested widths: artifacts/services-circle-{width}-0{1,2,3}.png. Desktop, small desktop, tablet and mobile captures inspected and refined. Final desktop/mobile context captures: artifacts/services-circle-context-{1440,390}.png. No deployment performed.
