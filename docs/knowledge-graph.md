# Elevate Care Pharmacy — knowledge graph

Local client-review marketing site. No deployment, no forms, no analytics, and no collection of prescriptions or personal medical information. Machine-readable twin: [knowledge-graph.json](knowledge-graph.json).

## Product

**Elevate Care Pharmacy** is a Next.js 16 App Router site (React 19, TypeScript strict, Tailwind 4). Plein Variable is self-hosted from `app/fonts/Plein-Variable.woff2`. Page copy and business facts live in data modules. Sections are server components. Client JavaScript is limited to the header dialog, the FAQ accordion, and the shared image carousel.

```
layout (font, noindex, skip link)
  └─ /                         app/page.tsx
       header → Brand, nav, Contact
       hero → next steps → approach → services
            → transfer → belief → providers
            → mission → FAQ → contact → closing CTA
       footer → privacy gate, /accessibility
  └─ /accessibility            static information page
  └─ /robots.txt               disallow all
  └─ /sitemap.xml              empty until NEXT_PUBLIC_SITE_URL
```

`#faq` and the mission section are on the page. They are not in `navigation`.

## Page flow

| Order | Section | Anchor | Source | Reads |
| --- | --- | --- | --- | --- |
| 1 | Header | — | `components/header.tsx` | `navigation` |
| 2 | CARE hero | `#home` | `components/sections/HeroSection.tsx` | `heroPhotos` |
| 3 | How can we help today? | `#pathways-heading` | `components/sections/ServiceOverview.tsx` | `nextSteps` |
| 4 | Elevate Care Approach | `#about` | `components/sections/WhyElevate.tsx` | `approachSlides` |
| 5 | Care that fits into your life | `#services` | `components/sections/ServicesSection.tsx` | `serviceStories`, `services` |
| 6 | Transfer guidance | `#prescriptions` | `components/sections/TransferProcess.tsx` | `pharmacy.secureTransferUrl` |
| 7 | A simple belief | — | `components/sections/PatientCareSection.tsx` | `pharmacy.jpg` |
| 8 | For providers | `#providers` | `components/sections/ProviderSection.tsx` | — |
| 9 | Mission | — | `components/sections/MissionSection.tsx` | — |
| 10 | FAQ | `#faq` | `components/sections/FAQSection.tsx` | `faqs` |
| 11 | Contact | `#contact` | `components/sections/ContactSection.tsx` | `pharmacy` |
| 12 | Closing CTA | — | `components/sections/FinalCTA.tsx` | links to `#about` |
| 13 | Footer | — | `app/page.tsx` | `navigation`, `pharmacy.privacyUrl` |

Navigation targets: `#home`, `#services`, `#prescriptions`, `#about`, `#providers`, `#contact`.

In-page jumps that matter:

- Hero actions go to `#prescriptions` and `#contact`.
- Next-step panels go to `#prescriptions`, `#faq`, and `#contact`.
- Services guidance goes to `#prescriptions` and `#contact`.
- Transfer, when no secure URL exists, goes to `#contact`.
- Providers and confirmed service cards go to `#contact`.
- Closing CTA returns to `#about`.

## Data

All proposed business facts start unpublished.

| Module | Export | Current state |
| --- | --- | --- |
| `lib/content.ts` | `pharmacy` | Name is set. Phone, address, hours, `secureTransferUrl`, and `privacyUrl` are `null`. |
| `lib/content.ts` | `navigation` | Six in-page links. |
| `lib/content.ts` | `services` | Six proposed services. Every `confirmed` flag is `false`. |
| `lib/content.ts` | `faqs` | Five preview answers. Each refuses an on-site submission. |
| `lib/elevate-approach.ts` | `approachSlides` | Three slides for the green gallery. |
| `lib/service-stories.ts` | `serviceStories` | Three circular-gallery stories. Same themes as the approach slides, different images. |
| `components/sections/next-steps/content.ts` | `nextSteps` | Transfer, refill guidance, contact. |
| `components/sections/hero/assets.ts` | `heroPhotos` | Eight collage photos. |

`Slide` is defined on `components/ui/index-list-carousel.tsx`. Both galleries use that type. `WhyElevate` uses the default list variant. `ServicesSection` uses `variant="circular"` and mounts `CareSeal` as decoration. The seal is artwork. It is not a clinical credential.

Confirmed services render only inside `ServicesSection` when `confirmed` is true. With the current data, that block is absent. The same section ends with a prescription guidance banner: pharmacist photograph, floating privacy note, and a link to `#prescriptions`.

## Client boundaries

| File | Why it is client |
| --- | --- |
| `components/header.tsx` | Radix Dialog mobile nav |
| `components/faq.tsx` | Radix Accordion |
| `components/ui/index-list-carousel.tsx` | Slide index, autoplay, keyboard and touch |

Server sections may import the carousel. They do not become client modules themselves.

## Assets

Imagery illustrates pharmacy settings. It does not depict Elevate Care staff, patients, or premises.

| Set | Path | Used by |
| --- | --- | --- |
| Hero collage | `public/images/hero/` plus `care.jpg` and `pharmacy.jpg` | CARE hero |
| Pexels stock | `care.jpg`, `conversation.jpg`, `pharmacy.jpg` | Approach, belief, hero |
| Approach still | `public/images/approach/guidance.jpg` | Third approach slide |
| Service illustrations | `public/images/services/` | Circular gallery |
| Prescription guidance photo | `public/images/guidance/pharmacist.jpg` | Guidance banner inside `#services` |
| Next-step stills | `public/images/next-steps/` | Present on disk; the next-step panels currently render icons, and tests assert those panels have no images |
| Wordmark | `components/brand.tsx` | Header and footer. PNG logos also sit in `public/images/`. |

Provenance notes live next to each image folder and in `app/fonts/README.md`.

## Gates before launch

1. **Contact.** `ContactSection` prints “to be confirmed” while phone, address, and hours are null.
2. **Services.** A service card appears only after its `confirmed` flag is set.
3. **Transfer.** `TransferProcess` uses `secureTransferUrl` or falls back to `#contact`. Nothing is submitted.
4. **Privacy.** The footer shows “Privacy policy pending approval” until `privacyUrl` is set. It does not invent a legal page.
5. **Search.** `app/layout.tsx` sets `robots: { index: false, follow: false }` and `app/robots.ts` disallows `/`. Remove both only after publication approval. The sitemap stays empty until `NEXT_PUBLIC_SITE_URL` is set.

`next.config.ts` only turns off the `X-Powered-By` header.

## Verification

| Check | Command or file |
| --- | --- |
| Types | `npm run typecheck` |
| Lint | `npm run lint` |
| Production build | `npm run build` |
| Home, font, anchors, overflow, axe | `tests/site.spec.ts` |
| Approach gallery | `tests/gallery.spec.ts` |
| Circular services gallery | `tests/services-editorial.spec.ts` |

Playwright uses `http://127.0.0.1:3000` unless `PLAYWRIGHT_BASE_URL` is set. The dev and start scripts bind to `127.0.0.1`. Screenshot history is in `artifacts/`. Handover and the longer validation log are `HANDOVER.md` and `VERIFICATION.md`.

## What this site is not

- Not a pharmacy system of record, patient portal, or e-prescribing channel.
- Not a compliance certification. Hosting, security headers, and privacy obligations are still open.
- Not backed by a Git history in this workspace.
- React Hook Form, Zod, and Motion are intentionally unused. There is no public form and no motion library for the current CSS interactions.
