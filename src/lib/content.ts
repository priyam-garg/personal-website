/**
 * Single source of truth for every piece of content on the site.
 * Edit here — nothing else needs to change.
 */

export const profile = {
  name: "Priyam Garg",
  handle: "priyam-garg",
  role: "Software Engineer",
  tagline: "AI systems, full-stack products, and the algorithms underneath.",
  blurb:
    "Final-year CSE undergrad at LNMIIT Jaipur. I build production AI systems — multi-agent platforms, RAG pipelines, vector search — and the full-stack products that wrap around them. Three internships shipping real infrastructure and production AI, and a LeetCode Knight rating from the years of DSA behind it.",
  location: "Jaipur, Rajasthan · India",
  email: "priyamgarg8ii@gmail.com",
  phone: "+91 72968 77630",
  resumePath: "/priyam-garg-resume.pdf",
  availability: "Open to SWE / AI Engineer roles — 2027 grad",
} as const;

export type SocialLink = {
  label: string;
  href: string;
  handle: string;
  icon: "github" | "linkedin" | "leetcode" | "codeforces" | "mail" | "phone";
};

export const socials: SocialLink[] = [
  {
    label: "GitHub",
    href: "https://github.com/priyam-garg",
    handle: "priyam-garg",
    icon: "github",
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/priyam-garg-4a2899283",
    handle: "priyam-garg",
    icon: "linkedin",
  },
  {
    label: "LeetCode",
    href: "https://leetcode.com/u/priyamgarg",
    handle: "priyamgarg",
    icon: "leetcode",
  },
  {
    label: "Codeforces",
    href: "https://codeforces.com/profile/priyamgarg8ii",
    handle: "priyamgarg8ii",
    icon: "codeforces",
  },
  {
    label: "Email",
    href: "mailto:priyamgarg8ii@gmail.com",
    handle: "priyamgarg8ii@gmail.com",
    icon: "mail",
  },
  {
    label: "Phone",
    href: "tel:+917296877630",
    handle: "+91 72968 77630",
    icon: "phone",
  },
];

/* ------------------------------------------------------------------ */
/* Experience                                                          */
/* ------------------------------------------------------------------ */

export type Experience = {
  company: string;
  companyUrl?: string;
  role: string;
  period: string;
  start: string;
  end: string;
  location: string;
  mode: "On-site" | "Remote" | "Hybrid";
  summary: string;
  highlights: { text: string; metric?: string }[];
  stack: string[];
};

export const experience: Experience[] = [
  {
    company: "Xpressbees",
    companyUrl: "https://www.xpressbees.com",
    role: "Software Engineering Intern",
    period: "May 2026 – Jul 2026",
    start: "2026-05",
    end: "2026-07",
    location: "Pune, India",
    mode: "On-site",
    summary:
      "Worked on the location intelligence stack behind one of India's largest logistics networks — the systems that decide which hub a parcel routes through and where exactly it gets dropped.",
    highlights: [
      {
        text: "Built an address cleansing pipeline and a location-data migration pipeline to a new provider, reducing incorrect address matches and improving delivery location accuracy and routing.",
      },
      {
        text: "Built a distributed hub-clustering pipeline over large-scale geolocation data to replace manually drawn hub boundaries, fixing zone gaps and overlaps.",
        metric: "0.5% fewer wrong hubs",
      },
      {
        text: "Developed analytics dashboards visualizing delivery-zone clusters and delivery-agent activity for data-driven workforce decisions.",
      },
    ],
    stack: ["Python", "React.js", "SQL", "Data Analytics", "NLP", "Geospatial"],
  },
  {
    company: "AgileDone Tech",
    role: "AI Engineering Intern",
    period: "Jan 2026 – May 2026",
    start: "2026-01",
    end: "2026-05",
    location: "Remote",
    mode: "Remote",
    summary:
      "Built a configurable multi-agent AI platform from the ground up and shipped it to a live client — going from prototype to a production system handling real users on WhatsApp.",
    highlights: [
      {
        text: "Built a customizable multi-agent AI platform supporting configurable knowledge bases and business-specific workflows.",
        metric: "7+ agent types",
      },
      {
        text: "Deployed a WhatsApp AI agent for a wellness client, automating onboarding, engagement, and progress tracking end to end.",
        metric: "1,000+ users",
      },
      {
        text: "Engineered a production-ready system with RAG pipelines, contextual conversations, and human escalation; deployed as a containerized FastAPI service.",
        metric: "5+ channels",
      },
    ],
    stack: [
      "Next.js",
      "Python",
      "FastAPI",
      "LangGraph",
      "Docker",
      "Generative AI",
      "WhatsApp API",
      "Vector DBs",
    ],
  },
  {
    company: "Runtime HRMS",
    role: "Full Stack Developer Intern",
    period: "May 2025 – Jul 2025",
    start: "2025-05",
    end: "2025-07",
    location: "Jaipur, India",
    mode: "On-site",
    summary:
      "First internship — built the onboarding flow every new hire goes through on an HR management platform.",
    highlights: [
      {
        text: "Built a responsive employee onboarding portal with progress tracking, dynamic form validation, and step-wise state management.",
        metric: "11-step flow",
      },
      {
        text: "Implemented secure storage of employee records and documents behind REST APIs.",
      },
    ],
    stack: ["React.js", "Node.js", "Express.js", "REST APIs"],
  },
];

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  featured: boolean;
  repo: string;
  demo?: string;
  year: string;
  domain: string;
  highlights: string[];
  stack: string[];
};

export const projects: Project[] = [
  {
    slug: "nexus",
    name: "Nexus",
    tagline: "AI-augmented project management platform",
    description:
      "Nexus unifies the three surfaces project management normally keeps apart — issue tracking, AI assistance, and the code repository — behind a single retrieval-augmented memory spanning tasks, implementation plans, and source code.",
    featured: true,
    repo: "https://github.com/priyam-garg/Project-Manager",
    demo: "https://nexus-coral-three.vercel.app",
    year: "2026",
    domain: "AI · Full-Stack",
    highlights: [
      "Architected a platform unifying Kanban boards, roadmaps, analytics, and AI chat over a RAG pipeline that indexes tasks, plans, and code together.",
      "Engineered a LangGraph agentic workflow (Planner → Critic → Finalizer) for requirement-to-task decomposition, with Zod-validated structured outputs.",
      "Designed a three-collection Qdrant vector store (tasks, roadmap, code chunks) using 768-dim Gemini embeddings with payload indexes for sub-second context retrieval.",
      "Wired GitHub webhook sync verified by HMAC-SHA256 signatures, matching commits back to the tasks they close.",
      "Enabled real-time multi-user board sync via Supabase Realtime and Zustand, with owner/admin/member role-based access control and invite-based team management.",
      "Shipped an analytics dashboard with burndown charts and completion metrics on top of Drizzle-managed PostgreSQL migrations.",
    ],
    stack: [
      "Next.js 15",
      "TypeScript",
      "React 19",
      "PostgreSQL",
      "Drizzle ORM",
      "Qdrant",
      "LangGraph",
      "Gemini API",
      "Supabase Realtime",
      "Zustand",
      "Tailwind CSS",
    ],
  },
  {
    slug: "mockview",
    name: "MOCKVIEW",
    tagline: "Real-time voice-based mock interview platform",
    description:
      "A mock interview platform that actually listens. Three interview modes, AI-generated questioning that adapts to your answers, live speech recognition, and coaching on the things nobody grades you on — communication, pacing, and confidence.",
    featured: true,
    repo: "https://github.com/priyam-garg/MOCKVIEW",
    year: "2026",
    domain: "AI · Full-Stack",
    highlights: [
      "Built a real-time voice-based interview experience with 3 modes, AI-generated questioning, speech-to-text recognition, and live coaching feedback.",
      "Implemented resume ATS analysis across 13 target roles — PDF parsing, keyword extraction, a 5-step analysis chain, role-weighted scoring, and actionable rewrite suggestions.",
      "Designed a dashboard tracking 4 performance dimensions: interview scores, streaks, and progress metrics for continuous improvement.",
      "Integrated secure authentication via NextAuth and Prisma over PostgreSQL to manage accounts, sessions, and full interview history.",
    ],
    stack: [
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "NextAuth",
      "AI SDK",
      "Speech-to-Text",
      "Framer Motion",
      "bcryptjs",
    ],
  },
  {
    slug: "nyayabot",
    name: "NyayaBot",
    tagline: "RAG legal assistant that knows when to say no",
    description:
      "A legal document Q&A assistant that ingests PDFs and answers questions over them — with a similarity threshold that makes it decline out-of-scope queries instead of hallucinating law.",
    featured: false,
    repo: "https://github.com/priyam-garg/NyayaBot",
    year: "2026",
    domain: "AI · RAG",
    highlights: [
      "RAG pipeline over legal PDFs using LangChain, Gemini Flash 2.0, and multilingual Sentence-Transformer embeddings stored in Qdrant Cloud.",
      "Similarity-threshold refusal: queries below a tunable relevance floor are declined rather than answered, cutting hallucination on out-of-domain questions.",
      "Persistent per-user, multi-session chat history in MongoDB, secured with JWT + bcrypt auth.",
    ],
    stack: [
      "Python",
      "FastAPI",
      "LangChain",
      "Gemini Flash 2.0",
      "Qdrant",
      "MongoDB",
      "React",
      "JWT",
    ],
  },
  {
    slug: "coursie",
    name: "Coursie",
    tagline: "AI-generated courses and quizzes",
    description:
      "An education platform that generates full courses and quizzes on demand — a one-stop exam-prep surface built on Groq's Llama 3.3 70B, in both English and Hindi.",
    featured: false,
    repo: "https://github.com/priyam-garg/Coursie",
    year: "2026",
    domain: "AI · EdTech",
    highlights: [
      "AI-driven course and quiz generation powered by Groq (Llama 3.3 70B), with real-time progress tracking for long-running async generation jobs.",
      "Seven-model Prisma schema (User, Course, Unit, Chapter, Quiz, QuizAttempt, GenCourse) over PostgreSQL.",
      "Bilingual English/Hindi content, light and dark themes, and a built-in AI chatbot for learning assistance.",
      "Multi-provider OAuth via NextAuth.js with bcrypt-hashed credential fallback.",
    ],
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "PostgreSQL",
      "NextAuth.js",
      "Groq / Llama 3.3",
      "Tailwind CSS",
      "Radix UI",
    ],
  },
  {
    slug: "agricult",
    name: "Crop Advisor",
    tagline: "ML crop recommendations for farmers",
    description:
      "A full-stack agricultural advisor that turns soil nutrients, live weather, and GPS location into a concrete answer: what to plant. Built as an offline-capable PWA in English and Hindi, for the field rather than the desk.",
    featured: false,
    repo: "https://github.com/priyam-garg/agricult",
    year: "2026",
    domain: "ML · Full-Stack",
    highlights: [
      "Scikit-Learn crop recommendation model served from a Python/Flask microservice behind a Node + Express TypeScript API.",
      "Live weather with 7-day forecasts and 90-day seasonal climate analysis via OpenWeather and Open-Meteo.",
      "GPS farm mapping with manual entry fallback, JWT auth, and MongoDB persistence.",
      "Progressive Web App that keeps working offline — the deployment constraint that actually matters for rural users.",
    ],
    stack: [
      "React 18",
      "TypeScript",
      "Vite",
      "Node.js",
      "Express",
      "Flask",
      "Scikit-Learn",
      "MongoDB",
      "PWA",
    ],
  },
  {
    slug: "bitcoin-xgboost",
    name: "Bitcoin XGBoost Prediction",
    tagline: "Multi-timeframe BTC movement forecasting",
    description:
      "An XGBoost pipeline forecasting Bitcoin price movement across 15-minute, 30-minute, and 1-hour timeframes, built to study how feature engineering choices change what a model can actually see.",
    featured: false,
    repo: "https://github.com/priyam-garg/-bitcoin-xgboost-prediction",
    year: "2026",
    domain: "ML · Quant",
    highlights: [
      "End-to-end notebook pipeline: ingestion, cleaning, feature engineering (returns, rolling windows, realized volatility), split, train, evaluate.",
      "XGBoost classifier and regressor variants trained across three BTC/USD timeframe datasets.",
      "Evaluation via accuracy metrics and confusion matrices on held-out buy-signal labels.",
    ],
    stack: ["Python", "XGBoost", "Pandas", "NumPy", "Scikit-learn", "Jupyter"],
  },
];

/* ------------------------------------------------------------------ */
/* Skills                                                              */
/* ------------------------------------------------------------------ */

export type SkillGroup = {
  title: string;
  key: string;
  items: string[];
};

export const skills: SkillGroup[] = [
  {
    title: "Languages",
    key: "languages",
    items: ["C", "C++", "Java", "JavaScript", "TypeScript", "Python", "SQL"],
  },
  {
    title: "Backend",
    key: "backend",
    items: [
      "Node.js",
      "Express.js",
      "FastAPI",
      "REST APIs",
      "WebSockets",
      "Webhooks",
      "NextAuth",
      "Prisma",
      "Drizzle ORM",
    ],
  },
  {
    title: "Frontend",
    key: "frontend",
    items: ["React.js", "Next.js", "HTML", "CSS", "Tailwind CSS", "Zustand", "Zod"],
  },
  {
    title: "Databases",
    key: "databases",
    items: ["PostgreSQL", "MySQL", "MongoDB", "Supabase", "Qdrant (Vector DB)"],
  },
  {
    title: "AI / ML",
    key: "ai",
    items: [
      "LangChain",
      "LangGraph",
      "RAG",
      "Generative AI",
      "AI Agents",
      "Embeddings",
      "Prompt Engineering",
    ],
  },
  {
    title: "Tools",
    key: "tools",
    items: ["Git", "GitHub", "Docker", "Postman", "Linux", "Figma", "Jira"],
  },
  {
    title: "CS Fundamentals",
    key: "fundamentals",
    items: [
      "Data Structures & Algorithms",
      "OOP",
      "DBMS",
      "Operating Systems",
      "Computer Networks",
      "Low-Level Design",
    ],
  },
];

/* ------------------------------------------------------------------ */
/* Competitive programming / DSA                                       */
/* ------------------------------------------------------------------ */

export const dsa = {
  leetcode: {
    username: "priyamgarg",
    url: "https://leetcode.com/u/priyamgarg",
    badge: "Knight",
    rating: 1904,
    percentile: "Top 4% globally",
  },
  codeforces: {
    handle: "priyamgarg8ii",
    url: "https://codeforces.com/profile/priyamgarg8ii",
    rank: "Specialist",
    maxRating: 1450,
  },
  practiceRepo: {
    name: "striver-questions",
    url: "https://github.com/priyam-garg/striver-questions",
    note: "Striver SDE-sheet solutions, written up as I worked through them.",
  },
  topics: [
    "Arrays & Two Pointers",
    "Binary Search",
    "Linked Lists",
    "Stacks & Queues",
    "Trees & BST",
    "Graphs (BFS/DFS/Topo)",
    "Dynamic Programming",
    "Greedy",
    "Tries",
    "Heaps & Priority Queues",
    "Bit Manipulation",
    "Sliding Window",
  ],
} as const;

/* ------------------------------------------------------------------ */
/* Education & achievements                                            */
/* ------------------------------------------------------------------ */

export type Education = {
  institution: string;
  credential: string;
  score: string;
  period: string;
  location?: string;
};

export const education: Education[] = [
  {
    institution: "The LNM Institute of Information Technology (LNMIIT)",
    credential: "B.Tech, Computer Science & Engineering",
    score: "CGPA 7.30 / 10",
    period: "Aug 2023 – May 2027",
    location: "Jaipur, Rajasthan",
  },
  {
    institution: "Cambridge Court World School",
    credential: "Class XII — CBSE",
    score: "91 / 100",
    period: "2023",
  },
  {
    institution: "Neerja Modi School",
    credential: "Class X — CBSE",
    score: "94.66 / 100",
    period: "2021",
    location: "Jaipur",
  },
];

export type Achievement = {
  title: string;
  detail: string;
  href?: string;
  kind: "competitive" | "leadership";
};

export const achievements: Achievement[] = [
  {
    title: "LeetCode Knight",
    detail: "Top 4% globally · contest rating 1904.",
    href: "https://leetcode.com/u/priyamgarg",
    kind: "competitive",
  },
  {
    title: "Codeforces Specialist",
    detail: "Max rating 1450.",
    href: "https://codeforces.com/profile/priyamgarg8ii",
    kind: "competitive",
  },
  {
    title: "Elected Senator",
    detail: "Elected to the LNMIIT student body senate by 600+ voters.",
    kind: "leadership",
  },
  {
    title: "Head of Sponsorship",
    detail: "Led sponsorship for Desportivos, the LNMIIT sports fest.",
    kind: "leadership",
  },
];

/* ------------------------------------------------------------------ */
/* Navigation                                                          */
/* ------------------------------------------------------------------ */

export const navItems = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "dsa", label: "DSA" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
] as const;
