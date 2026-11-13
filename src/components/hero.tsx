import { ArrowUpRight, Download, MapPin } from "lucide-react";
import { profile, socials } from "@/lib/content";
import type { GitHubStats, LeetCodeStats } from "@/lib/stats";
import { GitHubIcon, LinkedInIcon, LeetCodeIcon, CodeforcesIcon } from "./icons";
import { Typewriter } from "./typewriter";
import { Reveal } from "./reveal";
import { Card } from "./ui";

const socialIcons = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  codeforces: CodeforcesIcon,
} as const;

// Module-level so the array keeps a stable identity across renders.
const ROLE_PHRASES = [
  "software engineer",
  "AI systems developer",
  "full-stack builder",
  "LeetCode Knight",
];

export function Hero({
  github,
  leetcode,
}: {
  github: GitHubStats;
  leetcode: LeetCodeStats;
}) {
  const quickStats = [
    { value: `${leetcode.rating}`, label: "LeetCode rating" },
    {
      value: leetcode.totalSolved > 0 ? `${leetcode.totalSolved}+` : "Knight",
      label: leetcode.totalSolved > 0 ? "Problems solved" : "LeetCode badge",
    },
    { value: "3", label: "Internships" },
    { value: `${github.publicRepos}`, label: "Public repos" },
  ];

  return (
    <section id="top" className="relative overflow-hidden">
      <div className="bg-grid mask-fade-b pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[420px] w-[720px] -translate-x-1/2 rounded-full opacity-[0.16] blur-[120px]"
        style={{ background: "var(--accent)" }}
        aria-hidden
      />

      <div className="mx-auto grid w-full max-w-6xl gap-14 px-5 pt-32 pb-20 sm:px-8 sm:pt-40 sm:pb-28 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:gap-16">
        <div>
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-accent-soft px-3 py-1 font-mono text-[11px] text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              {profile.availability}
            </span>
          </Reveal>

          <Reveal delay={0.06}>
            <h1 className="text-gradient mt-6 text-5xl font-semibold tracking-tight sm:text-6xl lg:text-7xl">
              {profile.name}
            </h1>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="mt-4 flex flex-wrap items-baseline gap-x-3 font-mono text-base text-muted sm:text-lg">
              <span className="text-accent">$</span>
              <Typewriter className="text-fg" phrases={ROLE_PHRASES} />
            </p>
          </Reveal>

          <Reveal delay={0.18}>
            <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
              {profile.blurb}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
              <a
                href="#projects"
                className="col-span-2 inline-flex items-center justify-center gap-2 rounded-md bg-accent px-4 py-2.5 font-mono text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                View work
                <ArrowUpRight className="size-4" strokeWidth={2} />
              </a>
              <a
                href={profile.resumePath}
                download="Priyam_Garg_Resume.pdf"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-elev px-4 py-2.5 font-mono text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                <Download className="size-4" strokeWidth={1.75} />
                Résumé
              </a>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center justify-center gap-2 rounded-md border border-line bg-elev px-4 py-2.5 font-mono text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
              >
                Get in touch
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="mt-8 flex flex-wrap items-center gap-2">
              {socials
                .filter((s) => s.icon in socialIcons)
                .map((social) => {
                  const Icon = socialIcons[social.icon as keyof typeof socialIcons];
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer noopener"
                      aria-label={`${social.label} — ${social.handle}`}
                      title={`${social.label} · ${social.handle}`}
                      className="grid size-10 place-items-center rounded-md border border-line bg-elev text-muted transition-colors hover:border-line-strong hover:text-accent"
                    >
                      <Icon className="size-4" />
                    </a>
                  );
                })}
              <span className="ml-2 inline-flex items-center gap-1.5 font-mono text-xs text-dim">
                <MapPin className="size-3.5" strokeWidth={1.75} />
                {profile.location}
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} y={24} className="hidden lg:block">
          <TerminalCard />
        </Reveal>
      </div>

      <Reveal delay={0.36}>
        <div className="mx-auto w-full max-w-6xl px-5 pb-16 sm:px-8 sm:pb-24">
          <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
            {quickStats.map((stat) => (
              <div key={stat.label} className="bg-elev px-5 py-6">
                <dt className="text-[11px] font-medium tracking-wide text-dim uppercase">
                  {stat.label}
                </dt>
                <dd className="mt-1.5 font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums sm:text-3xl">
                  {stat.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Reveal>
    </section>
  );
}

/** Static "terminal window" rendering the profile as a JSON-ish record. */
function TerminalCard() {
  const rows: [string, string][] = [
    ["name", profile.name],
    ["role", "Software Engineer"],
    ["education", "B.Tech CSE · LNMIIT '27"],
    ["focus", "AI systems · Full-stack"],
    ["stack", "Next.js · Python · LangGraph"],
    ["leetcode", "Knight · top 4%"],
    ["status", "open to opportunities"],
  ];

  return (
    <Card className="overflow-hidden">
      <div className="flex items-center gap-2 border-b border-line bg-elev2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-[#ff5f57]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#febc2e]" aria-hidden />
        <span className="size-2.5 rounded-full bg-[#28c840]" aria-hidden />
        <span className="ml-2 font-mono text-xs text-dim">priyam@portfolio: ~</span>
      </div>

      <div className="space-y-3 p-5 font-mono text-[13px] leading-relaxed">
        <p className="text-muted">
          <span className="text-accent">➜</span>{" "}
          <span className="text-fg">whoami</span>
        </p>
        <dl className="space-y-1.5">
          {rows.map(([key, value]) => (
            <div key={key} className="flex flex-wrap gap-x-2">
              <dt className="text-dim">{key.padEnd(10, " ")}</dt>
              <dd className="text-fg">{value}</dd>
            </div>
          ))}
        </dl>
        <p className="pt-1 text-muted">
          <span className="text-accent">➜</span>{" "}
          <span className="text-fg">cat now.txt</span>
        </p>
        <p className="text-muted">
          Shipping AI agents that survive contact with real users.
        </p>
        <p className="text-muted">
          <span className="text-accent">➜</span> <span className="caret" aria-hidden />
        </p>
      </div>
    </Card>
  );
}
