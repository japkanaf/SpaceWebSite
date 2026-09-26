# УлыбкаFAMILY — clinic website

Single-page website of the fictional premium dental clinic УлыбкаFAMILY. All visible text is in Russian.

## Stack

- Next.js (App Router), TypeScript
- Tailwind CSS v4 (design tokens in `src/app/globals.css`)
- Framer Motion (`motion/react`)
- Lucide icons

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

Other scripts: `npm run build`, `npm run start`, `npm run typecheck`.

## Deploy

Import the repository in Vercel. No environment variables are required. Optionally set `NEXT_PUBLIC_SITE_URL` to the production origin for canonical URLs and the sitemap.

## Where things live

| Path | Purpose |
|---|---|
| `src/content/site.ts` | All Russian copy and clinic facts |
| `src/content/images.ts` | Photo URLs, alt texts and credits |
| `src/components/ui` | Design system primitives |
| `src/components/motion` | Reveal, parallax, page intro, smooth section scrolling |
| `src/components/sections` | One component per page section |
| `src/components/booking` | Booking state, validation and demo submission |
| `src/components/layout` | Header, mobile menu, footer |

## Booking form

The form is a demonstration: it validates input and shows a confirmation, but it sends no data. Real delivery can be added by implementing `BookingSubmitter` (`src/components/booking/submitter.ts`) and passing it to `BookingProvider`.

Image credits: see `docs/IMAGE_CREDITS.md`.
