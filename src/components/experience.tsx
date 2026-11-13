import { ArrowUpRight, MapPin } from "lucide-react";
import { experience } from "@/lib/content";
import { Reveal } from "./reveal";
import { Card, Chip, Section, SectionHeading } from "./ui";

export function ExperienceSection() {
  return (
    <Section id="experience">
      <SectionHeading
        index="02"
        command="git log --author='priyam' --work"
        title="Experience"
        description="Three internships on systems already carrying real traffic — logistics infrastructure at national scale, a multi-agent AI platform shipped to a live client, and a full-stack HR onboarding portal."
      />

      <ol className="relative space-y-6">
        {/* Continuous rail behind the timeline markers. */}
        <span
          className="absolute top-2 bottom-2 left-[7px] hidden w-px bg-line sm:block"
          aria-hidden
        />

        {experience.map((job, i) => (
          <li key={job.company} className="relative sm:pl-10">
            <span
              className="absolute top-8 left-0 hidden size-[15px] rounded-full border-2 border-accent bg-bg sm:block"
              aria-hidden
            />
            <Reveal delay={i * 0.08}>
              <Card interactive className="p-6 sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-fg">
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noreferrer noopener"
                          className="group inline-flex items-center gap-1 hover:text-accent"
                        >
                          {job.company}
                          <ArrowUpRight
                            className="size-4 opacity-0 transition-opacity group-hover:opacity-100"
                            strokeWidth={2}
                          />
                        </a>
                      ) : (
                        job.company
                      )}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{job.role}</p>
                  </div>
                  <div className="text-left sm:text-right">
                    <p className="font-mono text-[13px] text-accent">{job.period}</p>
                    <p className="mt-1 inline-flex items-center gap-1.5 font-mono text-xs text-dim">
                      <MapPin className="size-3" strokeWidth={1.75} />
                      {job.location} · {job.mode}
                    </p>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">{job.summary}</p>

                <ul className="mt-6 space-y-3">
                  {job.highlights.map((h) => (
                    <li key={h.text} className="flex gap-3 text-sm leading-relaxed">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
                      <span className="text-muted">
                        {h.text}
                        {h.metric ? (
                          <span className="ml-2 inline-flex rounded border border-accent/30 bg-accent-soft px-1.5 py-px font-mono text-[11px] whitespace-nowrap text-accent">
                            {h.metric}
                          </span>
                        ) : null}
                      </span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-1.5 border-t border-line pt-5">
                  {job.stack.map((tech) => (
                    <Chip key={tech}>{tech}</Chip>
                  ))}
                </div>
              </Card>
            </Reveal>
          </li>
        ))}
      </ol>
    </Section>
  );
}
