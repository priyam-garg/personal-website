import { ArrowUpRight, ChevronRight, ExternalLink } from "lucide-react";
import { projects, type Project } from "@/lib/content";
import { GitHubIcon } from "./icons";
import { Reveal } from "./reveal";
import { Card, Chip, Section, SectionHeading } from "./ui";

export function Projects() {
  const featured = projects.filter((p) => p.featured);
  const rest = projects.filter((p) => !p.featured);

  return (
    <Section id="projects">
      <SectionHeading
        index="03"
        command="ls -la ~/projects"
        title="Projects"
        description="Things I built end to end — architecture, implementation, and the unglamorous parts that make them actually work. Every card links to its source."
      />

      <div className="space-y-4">
        {featured.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.08}>
            <FeaturedCard project={project} />
          </Reveal>
        ))}
      </div>

      <h3 className="mt-16 mb-6 font-mono text-sm text-dim">
        <span className="text-accent">$</span> ls ~/projects/more
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        {rest.map((project, i) => (
          <Reveal key={project.slug} delay={i * 0.06}>
            <CompactCard project={project} />
          </Reveal>
        ))}
      </div>

      <Reveal delay={0.1}>
        <a
          href="https://github.com/priyam-garg?tab=repositories"
          target="_blank"
          rel="noreferrer noopener"
          className="mt-8 inline-flex items-center gap-2 font-mono text-sm text-muted transition-colors hover:text-accent"
        >
          <GitHubIcon className="size-4" />
          See every repository on GitHub
          <ArrowUpRight className="size-3.5" strokeWidth={2} />
        </a>
      </Reveal>
    </Section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <Card interactive className="overflow-hidden">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/60 to-transparent"
        aria-hidden
      />
      <div className="p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h3 className="text-2xl font-semibold tracking-tight text-fg">
                {project.name}
              </h3>
              <Chip tone="accent">{project.domain}</Chip>
              <span className="font-mono text-xs text-dim">{project.year}</span>
            </div>
            <p className="mt-1.5 font-mono text-sm text-accent">{project.tagline}</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-2 rounded-md bg-accent px-3.5 py-2 font-mono text-[13px] font-medium text-accent-fg transition-opacity hover:opacity-90"
              >
                <ExternalLink className="size-3.5" strokeWidth={2} />
                Live demo
              </a>
            ) : null}
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-elev2 px-3.5 py-2 font-mono text-[13px] text-fg transition-colors hover:border-accent/40 hover:text-accent"
            >
              <GitHubIcon className="size-3.5" />
              Source
            </a>
          </div>
        </div>

        <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-muted">
          {project.description}
        </p>

        <ul className="mt-6 grid gap-x-8 gap-y-3 lg:grid-cols-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-3 text-sm leading-relaxed text-muted">
              <span className="mt-2 size-1 shrink-0 rounded-full bg-accent" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap items-center gap-1.5 border-t border-line bg-elev2/50 px-6 py-4 sm:px-8">
        <span className="mr-2 font-mono text-[11px] tracking-wide text-dim uppercase">
          Stack
        </span>
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </Card>
  );
}

function CompactCard({ project }: { project: Project }) {
  return (
    <Card interactive className="flex h-full flex-col p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h4 className="text-lg font-semibold tracking-tight text-fg">
              {project.name}
            </h4>
            <span className="font-mono text-[11px] text-dim">{project.domain}</span>
          </div>
          <p className="mt-1 font-mono text-[13px] text-accent">{project.tagline}</p>
        </div>
        <a
          href={project.repo}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`${project.name} source on GitHub`}
          className="grid size-8 shrink-0 place-items-center rounded-md border border-line bg-elev2 text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <GitHubIcon className="size-3.5" />
        </a>
      </div>

      <p className="mt-4 text-sm leading-relaxed text-muted">{project.description}</p>

      <details className="group mt-4">
        <summary className="inline-flex items-center gap-1.5 font-mono text-xs text-dim transition-colors hover:text-accent">
          <ChevronRight className="details-caret size-3.5 transition-transform" strokeWidth={2} />
          <span className="group-open:hidden">Show details</span>
          <span className="hidden group-open:inline">Hide details</span>
        </summary>
        <ul className="mt-3 space-y-2">
          {project.highlights.map((h) => (
            <li key={h} className="flex gap-2.5 text-[13px] leading-relaxed text-muted">
              <span className="mt-1.5 size-1 shrink-0 rounded-full bg-accent/70" aria-hidden />
              <span>{h}</span>
            </li>
          ))}
        </ul>
      </details>

      <div className="min-h-6 flex-1" aria-hidden />
      <div className="flex flex-wrap gap-1.5 border-t border-line pt-5">
        {project.stack.map((tech) => (
          <Chip key={tech}>{tech}</Chip>
        ))}
      </div>
    </Card>
  );
}
