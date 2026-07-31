import { ArrowUpRight } from "lucide-react";
import { dsa } from "@/lib/content";
import type { CodeforcesStats, Fetched, LeetCodeStats } from "@/lib/stats";
import { CodeforcesIcon, GitHubIcon, LeetCodeIcon } from "./icons";
import { Reveal } from "./reveal";
import { Card, Chip, LiveDot, Section, SectionHeading } from "./ui";

export function Dsa({
  leetcode,
  codeforces,
}: {
  leetcode: Fetched<LeetCodeStats>;
  codeforces: Fetched<CodeforcesStats>;
}) {
  const difficulties = [
    { label: "Easy", count: leetcode.easy, className: "bg-[#00b8a3]" },
    { label: "Medium", count: leetcode.medium, className: "bg-[#ffb800]" },
    { label: "Hard", count: leetcode.hard, className: "bg-[#ff375f]" },
  ];
  const solvedTotal = leetcode.totalSolved || 1;

  return (
    <Section id="dsa">
      <SectionHeading
        index="05"
        command="./solve --daily"
        title="Problem solving"
        description="The part that doesn't show up in a repo. Consistent competitive programming is why I can reason about complexity before I write the first line."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        {/* LeetCode */}
        <Reveal>
          <Card interactive className="h-full p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md border border-line bg-elev2 text-accent">
                  <LeetCodeIcon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    LeetCode
                  </h3>
                  <a
                    href={dsa.leetcode.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    @{dsa.leetcode.username}
                  </a>
                </div>
              </div>
              <LiveDot live={leetcode.live} />
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="font-mono text-4xl font-semibold tracking-tight text-accent tabular-nums">
                  {leetcode.rating}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                  Contest rating
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold tracking-tight text-fg">
                  {leetcode.badge}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                  Badge · top {leetcode.topPercentage ?? 4}%
                </p>
              </div>
              {leetcode.contests !== null ? (
                <div>
                  <p className="font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums">
                    {leetcode.contests}
                  </p>
                  <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                    Contests
                  </p>
                </div>
              ) : null}
            </div>

            {leetcode.totalSolved > 0 ? (
              <div className="mt-7">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-sm text-muted">Problems solved</span>
                  <span className="font-mono text-lg font-semibold text-fg tabular-nums">
                    {leetcode.totalSolved}
                  </span>
                </div>
                <div className="mt-3 flex h-2 overflow-hidden rounded-full bg-elev2">
                  {difficulties.map((d) => (
                    <div
                      key={d.label}
                      className={d.className}
                      style={{ width: `${(d.count / solvedTotal) * 100}%` }}
                      title={`${d.label}: ${d.count}`}
                    />
                  ))}
                </div>
                <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1.5">
                  {difficulties.map((d) => (
                    <span
                      key={d.label}
                      className="inline-flex items-center gap-2 font-mono text-[11px] text-muted"
                    >
                      <span className={`size-2 rounded-full ${d.className}`} aria-hidden />
                      {d.label} <span className="text-fg tabular-nums">{d.count}</span>
                    </span>
                  ))}
                </div>
              </div>
            ) : (
              <p className="mt-7 text-sm leading-relaxed text-muted">
                {dsa.leetcode.percentile} — earned across rated contests, not just
                practice volume.
              </p>
            )}

            <a
              href={dsa.leetcode.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              View profile
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
          </Card>
        </Reveal>

        {/* Codeforces */}
        <Reveal delay={0.07}>
          <Card interactive className="h-full p-6 sm:p-8">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-md border border-line bg-elev2 text-accent">
                  <CodeforcesIcon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold tracking-tight text-fg">
                    Codeforces
                  </h3>
                  <a
                    href={dsa.codeforces.url}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-xs text-muted transition-colors hover:text-accent"
                  >
                    @{dsa.codeforces.handle}
                  </a>
                </div>
              </div>
              <LiveDot live={codeforces.live} />
            </div>

            <div className="mt-6 flex flex-wrap items-end gap-x-8 gap-y-4">
              <div>
                <p className="font-mono text-4xl font-semibold tracking-tight text-accent tabular-nums">
                  {codeforces.maxRating}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                  Max rating
                </p>
              </div>
              <div>
                <p className="font-mono text-2xl font-semibold tracking-tight text-fg">
                  {codeforces.maxRank}
                </p>
                <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                  Peak rank
                </p>
              </div>
              {codeforces.rating !== null ? (
                <div>
                  <p className="font-mono text-2xl font-semibold tracking-tight text-fg tabular-nums">
                    {codeforces.rating}
                  </p>
                  <p className="mt-1 text-[11px] tracking-wide text-dim uppercase">
                    Current
                  </p>
                </div>
              ) : null}
            </div>

            <p className="mt-7 text-sm leading-relaxed text-muted">
              Rated contest participation on Codeforces — timed problem solving under
              constraints that practice sets don&apos;t reproduce.
            </p>

            <a
              href={dsa.codeforces.url}
              target="_blank"
              rel="noreferrer noopener"
              className="mt-7 inline-flex items-center gap-2 font-mono text-[13px] text-muted transition-colors hover:text-accent"
            >
              View profile
              <ArrowUpRight className="size-3.5" strokeWidth={2} />
            </a>
          </Card>
        </Reveal>
      </div>

      {/* Topics + practice repo */}
      <Reveal delay={0.12}>
        <Card className="mt-4 p-6 sm:p-8">
          <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
            <div>
              <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
                Topics I work in
              </h3>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {dsa.topics.map((topic) => (
                  <Chip key={topic}>{topic}</Chip>
                ))}
              </div>
            </div>

            <div className="border-t border-line pt-6 lg:border-t-0 lg:border-l lg:pt-0 lg:pl-8">
              <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
                Practice log
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">
                {dsa.practiceRepo.note}
              </p>
              <a
                href={dsa.practiceRepo.url}
                target="_blank"
                rel="noreferrer noopener"
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-line bg-elev2 px-3 py-2 font-mono text-[13px] text-fg transition-colors hover:border-accent/40 hover:text-accent"
              >
                <GitHubIcon className="size-3.5" />
                {dsa.practiceRepo.name}
              </a>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}
