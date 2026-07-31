import { ArrowUpRight, GraduationCap, Trophy, Users } from "lucide-react";
import { achievements, education } from "@/lib/content";
import { Reveal } from "./reveal";
import { Card, Section, SectionHeading } from "./ui";

export function EducationSection() {
  return (
    <Section id="education">
      <SectionHeading
        index="06"
        command="cat education.json && cat awards.json"
        title="Education & achievements"
      />

      <div className="grid gap-4 lg:grid-cols-[1.3fr_1fr]">
        <Reveal>
          <Card className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <GraduationCap className="size-4 text-accent" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
                Education
              </h3>
            </div>

            <ol className="mt-6 space-y-5">
              {education.map((entry, i) => (
                <li
                  key={entry.institution}
                  className={
                    i === 0
                      ? "border-l-2 border-accent pl-5"
                      : "border-l-2 border-line pl-5"
                  }
                >
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h4 className="font-semibold tracking-tight text-fg">
                      {entry.institution}
                    </h4>
                    <span className="font-mono text-xs text-accent">{entry.period}</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{entry.credential}</p>
                  <p className="mt-1.5 flex flex-wrap items-center gap-x-3 font-mono text-xs text-dim">
                    <span className="text-fg">{entry.score}</span>
                    {entry.location ? <span>· {entry.location}</span> : null}
                  </p>
                </li>
              ))}
            </ol>
          </Card>
        </Reveal>

        <Reveal delay={0.07}>
          <Card className="h-full p-6 sm:p-8">
            <div className="flex items-center gap-2.5">
              <Trophy className="size-4 text-accent" strokeWidth={1.75} />
              <h3 className="text-sm font-semibold tracking-wide text-fg uppercase">
                Achievements & leadership
              </h3>
            </div>

            <ul className="mt-6 space-y-4">
              {achievements.map((item) => (
                <li
                  key={item.title}
                  className="rounded-lg border border-line bg-elev2 p-4"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 grid size-7 shrink-0 place-items-center rounded-md border border-line bg-elev text-accent">
                      {item.kind === "leadership" ? (
                        <Users className="size-3.5" strokeWidth={1.75} />
                      ) : (
                        <Trophy className="size-3.5" strokeWidth={1.75} />
                      )}
                    </span>
                    <div className="min-w-0">
                      <h4 className="text-sm font-semibold tracking-tight text-fg">
                        {item.href ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noreferrer noopener"
                            className="group inline-flex items-center gap-1 hover:text-accent"
                          >
                            {item.title}
                            <ArrowUpRight
                              className="size-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                              strokeWidth={2}
                            />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h4>
                      <p className="mt-1 text-[13px] leading-relaxed text-muted">
                        {item.detail}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
