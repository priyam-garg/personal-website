import { About } from "@/components/about";
import { Contact, Footer } from "@/components/contact";
import { Dsa } from "@/components/dsa";
import { EducationSection } from "@/components/education";
import { ExperienceSection } from "@/components/experience";
import { Hero } from "@/components/hero";
import { Nav } from "@/components/nav";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { achievements, education, experience, profile, projects, socials } from "@/lib/content";
import { getAllStats } from "@/lib/stats";

// Statically rendered, refreshed on the interval defined in lib/stats.ts.
export const revalidate = 21600;

export default async function Home() {
  const { github, leetcode, codeforces } = await getAllStats();

  return (
    <>
      <Nav />
      <main id="main" className="flex-1">
        <Hero github={github} leetcode={leetcode} />
        <About />
        <ExperienceSection />
        <Projects />
        <Skills github={github} />
        <Dsa leetcode={leetcode} codeforces={codeforces} />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
      <PersonSchema />
    </>
  );
}

/** JSON-LD so search engines and AI crawlers read the profile as structured data. */
function PersonSchema() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    email: `mailto:${profile.email}`,
    telephone: profile.phone,
    description: profile.blurb,
    address: { "@type": "PostalAddress", addressLocality: "Jaipur", addressCountry: "IN" },
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://priyamgarg.vercel.app",
    sameAs: socials
      .filter((s) => s.href.startsWith("http"))
      .map((s) => s.href),
    alumniOf: education.map((e) => ({
      "@type": "EducationalOrganization",
      name: e.institution,
    })),
    worksFor: experience.map((e) => ({
      "@type": "Organization",
      name: e.company,
    })),
    knowsAbout: [
      "Artificial Intelligence",
      "Retrieval-Augmented Generation",
      "LangGraph",
      "Full-Stack Development",
      "Data Structures and Algorithms",
    ],
    award: achievements.map((a) => `${a.title} — ${a.detail}`),
    subjectOf: projects.map((p) => ({
      "@type": "SoftwareSourceCode",
      name: p.name,
      description: p.tagline,
      codeRepository: p.repo,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
