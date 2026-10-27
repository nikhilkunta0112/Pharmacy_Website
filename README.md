# Elevate Care Pharmacy

A responsive Next.js marketing website prepared for client review. No patient information is collected. This is a local implementation, not a deployed pharmacy service.

## Run locally

Requires Node.js 20.9+ and npm. Tested using Node 24.18.0.

```sh
npm ci
npm run dev
```

Open http://127.0.0.1:3000. For a production preview, run `npm run build` followed by `npm start`.

```sh
npm run typecheck
npm run lint
npx playwright install chromium
# Start the production preview in another terminal first:
npm test
```

Plein is self-hosted through next/font/local; font rendering and production builds need no Google Fonts or Fontshare requests. See app/fonts/README.md for provenance and licensing. Tests use port 3000 by default; set PLAYWRIGHT_BASE_URL for a different local server.

## Implementation

- Next.js 16.4.2 App Router, React 19.3.1, TypeScript 6.0.3 strict mode.
- Tailwind CSS 4.3.3 with centralized CSS tokens and self-hosted Plein Variable via next/font/local.
- Server-rendered section components; client JavaScript limited to Radix Dialog navigation and Accordion FAQ.
- Selective shadcn-style CVA button primitive; original page composition, Lucide icons.
- All requested content areas: navigation, hero, patient pathways, approach, services, transfer guidance, lifestyle story, providers, mission, FAQ, contact, closing CTA, footer.
- Metadata, robots, optional domain-based sitemap, SVG favicon, and a real accessibility information page.
- No forms, portal simulation, analytics, tracking pixels, local storage, or patient data flows. React Hook Form and Zod are intentionally unnecessary without a public submission form. CSS interactions respect reduced motion; Motion is unnecessary for these effects.

## Content and launch checklist

Edit `lib/content.ts` for business information. Every proposed service defaults to `confirmed: false` and remains unpublished. The service section currently provides general prescription guidance. Enable individual services only after confirmation.

Before public launch:

1. Confirm address, phone, operating hours, jurisdiction, pharmacy identity, and approved contact channel.
2. Confirm each service, insurance participation, delivery details, and all proposed marketing and mission copy.
3. Supply team information, credentials, real photography and approved brand assets. Current licensed stock imagery illustrates pharmacy settings and does not depict the Elevate Care team or premises.
4. Connect independently reviewed secure transfer/refill and provider workflows. Header transfer actions currently open informational steps; no transfer is submitted. Configure approved URL destinations and verify them end to end.
5. Supply an approved privacy policy; configure its URL. The footer currently displays a pending status, not a fabricated legal page. Approve accessibility support contact details.
6. Set the production domain, metadataBase/canonical, sitemap URL and accurate structured data if appropriate. Intentionally remove preview `noindex` metadata and robots disallow only after approval. Preview SEO audit results will reflect this restriction.
7. Review hosting, security headers, privacy obligations and agreements for the final architecture. This marketing website is not a compliance certification.
8. Resolve or reassess development-tool dependency advisories before maintaining the project in production CI; see `VERIFICATION.md`.

The supplied brief referenced a promotional image, but only a text attachment was available. No client contact data, photographs or logo were supplied. A text-and-cross wordmark was created for review. All references to brand approach are proposed copy for approval.

## Design research and assets

Reviewed content/navigation from [Bremo](https://bremorx.com/), [Grubbs](https://www.grubbspharmacy.com/), [PillPack](https://www.pillpack.com/) and [Capsule](https://www.capsule.com/). Findings were limited to accessible page content, not a claimed mobile or visual audit: clear patient pathways, concise process explanation, provider entry points and practical FAQs informed this original layout.

Framework setup checked against [Next.js installation](https://nextjs.org/docs/app/getting-started/installation) and [Tailwind installation](https://tailwindcss.com/docs/installation/framework-guides/nextjs). Installed stable npm versions are recorded in the lockfile.

Photography by cottonbro studio, downloaded from Pexels under the [Pexels license](https://www.pexels.com/license/):

- `public/images/care.jpg`: https://www.pexels.com/photo/a-man-giving-a-small-black-bottle-to-the-woman-8657359/
- `public/images/conversation.jpg`: https://www.pexels.com/photo/customer-by-medications-display-at-pharmacy-8657371/
- `public/images/pharmacy.jpg`: https://www.pexels.com/photo/customer-talking-with-pharmacist-by-medicaments-display-8657368/

Skills used: Sites (local workflow), Refined (adapted to supplied brand), and Computer Use guidance. The in-app browser was unavailable, so explicitly requested Playwright browser testing was used. No subagents, image generation or external deployment were used.
