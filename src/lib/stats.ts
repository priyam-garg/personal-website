/**
 * Live stats fetched on the server at build/revalidate time.
 *
 * Every fetcher degrades gracefully: if an upstream API is down, rate-limited,
 * or shape-shifts, we fall back to the known-good static values in content.ts
 * and mark the result `live: false`. The page never fails because GitHub is slow.
 */

import { dsa } from "./content";

/** Revalidate live stats every 6 hours — well inside GitHub's anonymous rate limit. */
const REVALIDATE = 60 * 60 * 6;

const GITHUB_USER = "priyam-garg";

/** Wraps a stats payload with whether it came from the live API or a fallback. */
export type Fetched<T> = T & { live: boolean };

async function safeJson<T>(
  url: string,
  init: RequestInit & { next?: { revalidate: number } },
): Promise<T | null> {
  try {
    const res = await fetch(url, init);
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/* ------------------------------------------------------------------ */
/* GitHub                                                              */
/* ------------------------------------------------------------------ */

export type GitHubStats = {
  publicRepos: number;
  followers: number;
  stars: number;
  languages: { name: string; count: number }[];
  topRepos: { name: string; url: string; stars: number; language: string | null }[];
};

type GhUser = { public_repos: number; followers: number };
type GhRepo = {
  name: string;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  fork: boolean;
  updated_at: string;
};

export async function getGitHubStats(): Promise<Fetched<GitHubStats>> {
  const fallback: Fetched<GitHubStats> = {
    publicRepos: 19,
    followers: 0,
    stars: 0,
    languages: [
      { name: "TypeScript", count: 4 },
      { name: "Python", count: 4 },
      { name: "Jupyter Notebook", count: 3 },
      { name: "C++", count: 1 },
    ],
    topRepos: [],
    live: false,
  };

  // A token is optional — it only raises the rate limit. Set GITHUB_TOKEN in Vercel if you like.
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "priyam-garg-portfolio",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };
  const init = { headers, next: { revalidate: REVALIDATE } };

  const [user, repos] = await Promise.all([
    safeJson<GhUser>(`https://api.github.com/users/${GITHUB_USER}`, init),
    safeJson<GhRepo[]>(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`,
      init,
    ),
  ]);

  if (!user || !Array.isArray(repos)) return fallback;

  const owned = repos.filter((r) => !r.fork);

  // GitHub's linguist misclassifies a few repos (e.g. tagging a Next.js app as
  // PostScript because of a stray build artifact). Drop those so the chart
  // reflects languages actually written rather than detection noise.
  const IGNORED_LANGUAGES = new Set(["PostScript", "TeX", "Roff", "Batchfile"]);

  const langCounts = new Map<string, number>();
  for (const repo of owned) {
    if (!repo.language || IGNORED_LANGUAGES.has(repo.language)) continue;
    langCounts.set(repo.language, (langCounts.get(repo.language) ?? 0) + 1);
  }

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    stars: owned.reduce((sum, r) => sum + r.stargazers_count, 0),
    languages: [...langCounts.entries()]
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 6),
    topRepos: owned.slice(0, 6).map((r) => ({
      name: r.name,
      url: r.html_url,
      stars: r.stargazers_count,
      language: r.language,
    })),
    live: true,
  };
}

/* ------------------------------------------------------------------ */
/* LeetCode                                                            */
/* ------------------------------------------------------------------ */

export type LeetCodeStats = {
  totalSolved: number;
  easy: number;
  medium: number;
  hard: number;
  rating: number;
  globalRanking: number | null;
  topPercentage: number | null;
  contests: number | null;
  badge: string;
};

type LcResponse = {
  data?: {
    matchedUser?: {
      submitStatsGlobal?: {
        acSubmissionNum?: { difficulty: string; count: number }[];
      };
    } | null;
    userContestRanking?: {
      attendedContestsCount: number;
      rating: number;
      globalRanking: number;
      topPercentage: number;
    } | null;
  };
};

const LC_QUERY = `
  query portfolioStats($username: String!) {
    matchedUser(username: $username) {
      submitStatsGlobal { acSubmissionNum { difficulty count } }
    }
    userContestRanking(username: $username) {
      attendedContestsCount
      rating
      globalRanking
      topPercentage
    }
  }
`;

export async function getLeetCodeStats(): Promise<Fetched<LeetCodeStats>> {
  // Last verified snapshot (2026-07-31). LeetCode occasionally blocks datacenter
  // IPs, so these keep the section accurate instead of blank when it does.
  const fallback: Fetched<LeetCodeStats> = {
    totalSolved: 680,
    easy: 165,
    medium: 419,
    hard: 96,
    rating: dsa.leetcode.rating,
    globalRanking: null,
    topPercentage: 4,
    contests: 18,
    badge: dsa.leetcode.badge,
    live: false,
  };

  let json: LcResponse | null = null;
  try {
    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Referer: `https://leetcode.com/u/${dsa.leetcode.username}/`,
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36",
      },
      body: JSON.stringify({
        query: LC_QUERY,
        variables: { username: dsa.leetcode.username },
      }),
      next: { revalidate: REVALIDATE },
    });
    if (!res.ok) return fallback;
    json = (await res.json()) as LcResponse;
  } catch {
    return fallback;
  }

  const buckets = json?.data?.matchedUser?.submitStatsGlobal?.acSubmissionNum;
  if (!buckets) return fallback;

  const at = (difficulty: string) =>
    buckets.find((b) => b.difficulty === difficulty)?.count ?? 0;

  const contest = json?.data?.userContestRanking ?? null;

  return {
    totalSolved: at("All"),
    easy: at("Easy"),
    medium: at("Medium"),
    hard: at("Hard"),
    rating: contest ? Math.round(contest.rating) : dsa.leetcode.rating,
    globalRanking: contest?.globalRanking ?? null,
    topPercentage: contest ? Number(contest.topPercentage.toFixed(2)) : 4,
    contests: contest?.attendedContestsCount ?? null,
    badge: dsa.leetcode.badge,
    live: true,
  };
}

/* ------------------------------------------------------------------ */
/* Codeforces                                                          */
/* ------------------------------------------------------------------ */

export type CodeforcesStats = {
  rating: number | null;
  maxRating: number;
  rank: string;
  maxRank: string;
};

type CfResponse = {
  status: string;
  result?: {
    rating?: number;
    maxRating?: number;
    rank?: string;
    maxRank?: string;
  }[];
};

export async function getCodeforcesStats(): Promise<Fetched<CodeforcesStats>> {
  const fallback: Fetched<CodeforcesStats> = {
    rating: null,
    maxRating: dsa.codeforces.maxRating,
    rank: dsa.codeforces.rank,
    maxRank: dsa.codeforces.rank,
    live: false,
  };

  const json = await safeJson<CfResponse>(
    `https://codeforces.com/api/user.info?handles=${dsa.codeforces.handle}`,
    { next: { revalidate: REVALIDATE } },
  );

  const user = json?.status === "OK" ? json.result?.[0] : undefined;
  if (!user) return fallback;

  const titleCase = (s: string) =>
    s.replace(/\b\w/g, (c) => c.toUpperCase());

  return {
    rating: user.rating ?? null,
    maxRating: user.maxRating ?? dsa.codeforces.maxRating,
    rank: user.rank ? titleCase(user.rank) : dsa.codeforces.rank,
    maxRank: user.maxRank ? titleCase(user.maxRank) : dsa.codeforces.rank,
    live: true,
  };
}

export async function getAllStats() {
  const [github, leetcode, codeforces] = await Promise.all([
    getGitHubStats(),
    getLeetCodeStats(),
    getCodeforcesStats(),
  ]);
  return { github, leetcode, codeforces };
}
