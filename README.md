# Priyam Garg — Portfolio

Personal portfolio site. Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion.

Dark terminal aesthetic with a light-mode toggle, scroll-reveal animation, and live
stats pulled from GitHub, LeetCode and Codeforces at build/revalidate time.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
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

Each fetcher falls back to a verified static snapshot if the API is down or
rate-limited, and the UI marks it `live` vs `cached` with a small dot. The page is
statically rendered and revalidates every 6 hours.

## Deploying to Vercel

1. Push this folder to a GitHub repo.
2. On [vercel.com/new](https://vercel.com/new), import it. Framework auto-detects as
   Next.js — no build settings to change.
3. Deploy.

### Environment variables (both optional)

| Variable | Why |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Your real domain, e.g. `https://priyamgarg.vercel.app`. Used for canonical URL, Open Graph, sitemap and JSON-LD. Set once the domain is known. |
| `GITHUB_TOKEN` | A fine-grained PAT with **no scopes** (public data only). Raises the GitHub API rate limit — useful if builds start showing `cached` on the language chart. |

The site builds and runs correctly with neither set.

## SEO

- `metadata` in `src/app/layout.tsx` — title, description, Open Graph, Twitter card
- `src/app/opengraph-image.tsx` — generated 1200×630 social preview
- `src/app/robots.ts`, `src/app/sitemap.ts`
- JSON-LD `Person` schema in `src/app/page.tsx`
