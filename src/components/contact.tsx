import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import { profile, socials } from "@/lib/content";
import { CodeforcesIcon, GitHubIcon, LeetCodeIcon, LinkedInIcon } from "./icons";
import { Reveal } from "./reveal";
import { Card, Section } from "./ui";

const iconMap = {
  github: GitHubIcon,
  linkedin: LinkedInIcon,
  leetcode: LeetCodeIcon,
  codeforces: CodeforcesIcon,
  mail: Mail,
  phone: Phone,
} as const;

export function Contact() {
  return (
    <Section id="contact" className="pb-12 sm:pb-16">
      <Reveal>
        <Card className="overflow-hidden">
          <div className="relative px-6 py-14 text-center sm:px-12 sm:py-20">
            <div
              className="bg-grid pointer-events-none absolute inset-0 opacity-60"
              aria-hidden
            />
            <div className="relative">
              <p className="font-mono text-sm text-accent">
                $ ./contact --priyam
              </p>
              <h2 className="text-gradient mt-4 text-3xl font-semibold tracking-tight sm:text-5xl">
                Let&apos;s build something
              </h2>
              <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-muted">
                I&apos;m open to software engineering and AI engineering roles, and
                always up for a conversation about agents, retrieval systems, or a
                hard problem you&apos;re stuck on.
              </p>

              <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-3 font-mono text-sm font-medium text-accent-fg transition-opacity hover:opacity-90"
                >
                  <Mail className="size-4" strokeWidth={1.75} />
                  {profile.email}
                </a>
                <a
                  href={profile.resumePath}
                  download
                  className="inline-flex items-center gap-2 rounded-md border border-line bg-elev2 px-5 py-3 font-mono text-sm text-fg transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Download className="size-4" strokeWidth={1.75} />
                  Download résumé
                </a>
              </div>

              <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
                {socials.map((social) => {
                  const Icon = iconMap[social.icon];
                  const external = social.href.startsWith("http");
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      {...(external
                        ? { target: "_blank", rel: "noreferrer noopener" }
                        : {})}
                      className="group inline-flex items-center gap-2 rounded-md border border-line bg-elev2 px-3 py-2 font-mono text-[13px] text-muted transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <Icon className="size-3.5" strokeWidth={1.75} />
                      {social.handle}
                      {external ? (
                        <ArrowUpRight
                          className="size-3 opacity-0 transition-opacity group-hover:opacity-100"
                          strokeWidth={2}
                        />
                      ) : null}
                    </a>
                  );
                })}
              </div>

              <p className="mt-8 inline-flex items-center gap-1.5 font-mono text-xs text-dim">
                <MapPin className="size-3.5" strokeWidth={1.75} />
                {profile.location}
              </p>
            </div>
          </div>
        </Card>
      </Reveal>
    </Section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-3 px-5 py-8 font-mono text-xs text-dim sm:flex-row sm:px-8">
        <p>
          <span className="text-accent">©</span> {new Date().getFullYear()}{" "}
          {profile.name}
        </p>
        <p>
          Built with Next.js, TypeScript &amp; Tailwind — deployed on Vercel.
        </p>
      </div>
    </footer>
  );
}
