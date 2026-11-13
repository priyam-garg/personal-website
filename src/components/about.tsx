import { Brain, Code2, Layers, Trophy } from "lucide-react";
import { Reveal } from "./reveal";
import { Card, Section, SectionHeading } from "./ui";

const pillars = [
  {
    icon: Brain,
    title: "AI systems, not AI demos",
    body: "Multi-agent orchestration with LangGraph, RAG over real corpora, vector stores tuned for sub-second retrieval — and the guardrails that stop them hallucinating in production.",
  },
  {
    icon: Layers,
    title: "Full-stack by default",
    body: "Next.js and TypeScript on the front, FastAPI and Node behind it, PostgreSQL/MongoDB and Qdrant underneath. I own features end to end rather than handing them across a wall.",
  },
  {
    icon: Code2,
    title: "Shipped, not sandboxed",
    body: "Three internships spent on systems with real consequences — parcel routing for a national logistics network, a WhatsApp agent serving a thousand-plus live users, and an HR onboarding portal.",
  },
  {
    icon: Trophy,
    title: "Fundamentals underneath",
    body: "LeetCode Knight in the top 4% and Codeforces Specialist. Data structures, DBMS, operating systems, and low-level design are the layer everything else sits on.",
  },
];

export function About() {
  return (
    <Section id="about">
      <SectionHeading
        index="01"
        command="cat about.md"
        title="About"
        description="I'm a Computer Science undergrad at LNMIIT Jaipur, graduating in 2027. Most of my time goes into two things: building AI systems that hold up outside a notebook, and staying sharp on the algorithms that make them possible."
      />

      <div className="grid gap-4 sm:grid-cols-2">
        {pillars.map((pillar, i) => (
          <Reveal key={pillar.title} delay={i * 0.07}>
            <Card interactive className="h-full p-6">
              <pillar.icon
                className="size-5 text-accent"
                strokeWidth={1.75}
                aria-hidden
              />
              <h3 className="mt-4 text-base font-semibold tracking-tight text-fg">
                {pillar.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{pillar.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
