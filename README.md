<div align="center">

# Priyam Garg — Portfolio

Personal portfolio site with a dark terminal aesthetic and live stats
pulled from GitHub, LeetCode and Codeforces.

### [priyamgarg.vercel.app](https://priyamgarg.vercel.app)

<a href="https://priyamgarg.vercel.app"><img src="https://img.shields.io/badge/Live-priyamgarg.vercel.app-4ADE80?style=for-the-badge&logo=vercel&logoColor=black&labelColor=111827" alt="Live site" /></a>
<img src="https://img.shields.io/badge/Next.js-16-111827?style=for-the-badge&logo=nextdotjs&logoColor=white" alt="Next.js 16" />
<img src="https://img.shields.io/badge/TypeScript-5-111827?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
<img src="https://img.shields.io/badge/Tailwind-v4-111827?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS v4" />

</div>

## Features

- **Live stats, not screenshots** — LeetCode rating and solved-by-difficulty, Codeforces
  rank, and a GitHub language breakdown, all fetched server-side and refreshed every
  6 hours. Each card shows a `live` / `cached` dot so a stale number is never passed off
  as fresh.
- **Terminal-inspired dark theme** with a light mode, applied before first paint so there
  is no flash on load.
- **Motion that behaves** — scroll-reveal and a typewriter headline, both fully disabled
  under `prefers-reduced-motion`.
- **Single source of truth** — every word on the page lives in one file.
- **SEO complete** — generated OG image, sitemap, robots, and JSON-LD `Person` schema.

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 16 (App Router, React 19, static + ISR) |
| Language | TypeScript |
| Styling | Tailwind CSS v4, CSS custom properties for theming |
| Animation | Motion |
| Icons | Lucide, plus hand-rolled brand SVGs |
| Hosting | Vercel |

## Project structure

```
src/
├── app/
│   ├── layout.tsx           metadata, fonts, no-flash theme script
│   ├── page.tsx             composes sections, JSON-LD schema
│   ├── globals.css          theme tokens, utilities
│   ├── opengraph-image.tsx  generated 1200×630 social card
│   ├── robots.ts
│   └── sitemap.ts
├── components/              one file per section, plus shared primitives
└── lib/
    ├── content.ts           ← all site content
    └── stats.ts             live API fetchers with fallbacks
```

## Editing content

Everything on the page comes from **`src/lib/content.ts`** — profile, socials,
internships, projects, skills, DSA, education, achievements, nav. Change it there and
nothing else needs touching.

Swap the résumé by replacing `public/priyam-garg-resume.pdf` (keep the filename, or
update `profile.resumePath`).

## Live stats

`src/lib/stats.ts` fetches from three public APIs on the server:

| Source | Endpoint | Powers |
| --- | --- | --- |
| GitHub | `api.github.com/users/priyam-garg` + `/repos` | repo count, stars, language chart |
| LeetCode | `leetcode.com/graphql` | rating, contests, solved-by-difficulty |
| Codeforces | `codeforces.com/api/user.info` | current + max rating, rank |

Every fetcher degrades gracefully: if an API is down, rate-limited, or changes shape, it
falls back to a verified static snapshot and the UI marks that card `cached` instead of
`live`. The page is statically rendered and revalidates every 6 hours, so a slow upstream
never blocks a request.

GitHub's language detection misclassifies a couple of repos, so `stats.ts` filters those
out rather than charting detection noise.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint
```

Requires Node 20+. No environment variables needed — it runs correctly with none set.

## Deployment

Deployed on Vercel, auto-deploying from `main`.

### Environment variables (both optional)

| Variable | Why |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical origin for Open Graph, sitemap and JSON-LD. Defaults to `https://priyamgarg.vercel.app`; set it only when serving from a different domain. |
| `GITHUB_TOKEN` | Fine-grained PAT with **no scopes** (public data only). Raises the GitHub API rate limit — useful if the language chart starts showing `cached`. |

## License

Code is free to reference. Please don't reuse the written content, résumé, or personal
details as your own.
