import { skills } from "@/lib/content";
import type { Fetched, GitHubStats } from "@/lib/stats";
import { Reveal } from "./reveal";
import { Card, LiveDot, Section, SectionHeading } from "./ui";

export function Skills({ github }: { github: Fetched<GitHubStats> }) {
  // One flattened pass for the ticker; duplicated so the marquee loops seamlessly.
  const ticker = skills.flatMap((group) => group.items);

  return (
    <Section id="skills">
      <SectionHeading
        index="04"
        command="cat package.json | jq .skills"
        title="Technical skills"
        description="The tools I reach for, grouped by where they sit in the stack — plus a live breakdown of what my public repositories are actually written in."
      />

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {skills.map((group, i) => (
          <Reveal key={group.key} delay={i * 0.05}>
            <Card interactive className="h-full p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-xs text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
                  {group.title}
                </h3>
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-elev2 px-2 py-1 font-mono text-[11.5px] text-muted transition-colors hover:border-accent/35 hover:text-accent"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>

      {/* Live language breakdown straight from the GitHub API. */}
      <Reveal delay={0.1}>
        <Card className="mt-4 p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
              Languages across my repositories
            </h3>
            <LiveDot live={github.live} />
          </div>

          <div className="mt-5 space-y-3">
            {github.languages.map((lang) => {
              const max = github.languages[0]?.count || 1;
              return (
                <div key={lang.name} className="flex items-center gap-4">
                  <span className="w-36 shrink-0 truncate font-mono text-[13px] text-muted">
                    {lang.name}
                  </span>
                  <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-elev2">
                    <div
                      className="h-full rounded-full bg-accent"
                      style={{ width: `${Math.max(8, (lang.count / max) * 100)}%` }}
                    />
                  </div>
                  <span className="w-16 shrink-0 text-right font-mono text-[11px] text-dim tabular-nums">
                    {lang.count} {lang.count === 1 ? "repo" : "repos"}
                  </span>
                </div>
              );
            })}
          </div>
        </Card>
      </Reveal>

      {/* Ambient ticker — visual texture, duplicated for a seamless loop. */}
      <div className="marquee-mask mt-10 overflow-hidden" aria-hidden>
        <div className="marquee-track flex w-max gap-2">
          {[...ticker, ...ticker].map((item, i) => (
            <span
              key={`${item}-${i}`}
              className="rounded-md border border-line bg-elev px-2.5 py-1 font-mono text-[11px] whitespace-nowrap text-dim"
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </Section>
  );
}
