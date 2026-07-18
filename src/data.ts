import { ExperienceItem, ProjectItem, MosaicItem, CertificationItem, StatItem } from './types';

export const JOSH_BIO = {
  name: "Vishal Kumar",
  role: "AI & Full-Stack Developer",
  tagline: "Building high-performance, AI-powered web applications using Node.js, React, Express, and LLMs.",
  location: "Uttar Pradesh, India",
  email: "vishalcse340@gmail.com",
  phone: "+91 7905239681",
  whatsapp: "https://wa.me/918279688358",
  github: "https://github.com/Vishalkumar79052",
  linkedin: "https://www.linkedin.com/in/vishal-kumar-79052v/",
  facebook: "https://www.facebook.com/profile.php?id=100075959205667",
  instagram: "https://www.instagram.com/kushawahav870?igsh=Z3Awc3IwcmVnaXBq",
  aboutParagraphs: [
    "I am an AI & Full-Stack Developer and a Computer Science & Engineering undergraduate at Roorkee Institute of Technology. Passionate about building highly interactive and modern web applications, I specialize in full-stack engineering and intelligent software workflows. My technical foundations span robust data structures, algorithms, and modular design patterns.",
    "My development stack centers around MongoDB, Express.js, React, and Node.js (MERN), as well as SQL and Java. I build and launch practical applications like my AI-based mock interview platform, which features real-time question generation with automated PDF reports, and robust scheduling utilities. I also completed virtual web development internships with Shadowfox and CodSoft, where I built responsive layouts and optimized user flows.",
    "Driven by continuous growth, I hold credentials like the Oracle AI Foundation Associate and Python training from IIT Bombay. Whether refining scalable schemas or crafting high-contrast custom layouts, I am committed to writing clean, high-performance code."
  ]
};

export const JOSH_STATS: StatItem[] = [
  { value: "7.5", label: "B.Tech CGPA" },
  { value: "10+", label: "Build Projects" },
  { value: "20+", label: "Certifications" }
];

export const ALL_EXPERIENCES: ExperienceItem[] = [
  {
    id: "ai-fullstack-dev-projects",
    period: "Aug 2023 — Present",
    role: "B.Tech in Computer Science & Engineering",
    company: "Roorkee Institute of Technology",
    description: "Focusing on core coursework including Data Structures & Algorithms, Web Development, and Machine Learning Basics. Actively building industry-aligned projects utilizing full-stack and AI technologies.",
    technologies: ["Data Structures", "Algorithms", "Web Development", "Machine Learning", "Vite + React"]
  },
  {
    id: "personal-fullstack-projects",
    period: "Virtual Internships (2024)",
    role: "Web Development Intern",
    company: "Shadowfox / CodSoft",
    description: "Designed resilient web interfaces, integrated browser storage APIs, and constructed clean responsive page layouts during highly collaborative virtual web development programs.",
    technologies: ["HTML5", "CSS3", "JavaScript", "Tailwind CSS", "React.js"]
  }
];

export const ALL_PROJECTS: ProjectItem[] = [
  {
    id: "ai-interview-project",
    title: "AI-Based Mock Interview Platform",
    description: "An AI mock interview system featuring real-time question generation, response analysis, performance feedback, and downloadable feedback reports in PDF format.",
    technologies: ["React", "Express.js", "Node.js", "MongoDB", "Tailwind CSS", "Gemini API", "PDF Generation"],
    projectType: "Full-Stack AI Application",
    iconName: "message-square",
    link: "https://ai-mearnproject-3.onrender.com"
  },
  {
    id: "workout-project",
    title: "Workout Routine & Task Scheduler",
    description: "A comprehensive fitness planner integrating custom task scheduler logic to structure workout sets, intervals, and notifications for frictionless routine management.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "Node.js", "Express.js", "MongoDB"],
    projectType: "Backend & Orchestration",
    iconName: "box",
    link: "https://github.com/Vishalkumar79052/MyWorkout"
  },
  {
    id: "todo-list-app",
    title: "To-Do OS Desktop Sandbox",
    description: "Interactive, system-styled To-Do application built with a scheduler, simulated file explorer, and fully-featured text editor overlay.",
    technologies: ["HTML", "CSS", "JavaScript", "React", "State Persistence"],
    projectType: "Front-End Analytics",
    iconName: "database",
    link: "https://github.com/Vishalkumar79052/My-to-do-app"
  },
  {
    id: "shared-calculator",
    title: "Globally Shared Sync Calculator",
    description: "A collaborative desktop calculator featuring synchronized real-time state calculation supporting multi-user sessions concurrently.",
    technologies: ["HTML", "CSS", "JavaScript", "Live Sync"],
    projectType: "Backend Utility Middleware",
    iconName: "globe",
    link: "https://github.com/Vishalkumar79052/calculator"
  },
  {
    id: "mumbai-indians-team",
    title: "Mumbai Indians Team Fanpage",
    description: "A responsive team ledger platform loaded with player profiles, 2025 scorecards, played match stats, schedules, and fan engagement layouts.",
    technologies: ["HTML", "CSS", "Tailwind CSS", "JavaScript"],
    projectType: "Front-End Analytics",
    iconName: "map",
    link: "https://github.com/Vishalkumar79052/MumbaiIndiansTeam2025"
  }
];

export const MOSAIC_PROJECTS: MosaicItem[] = [
  {
    id: "vektor",
    title: "Vektor - Semantic Vector Sandbox",
    subtitle: "(Embeddings & Math)",
    description: "A mathematical sandbox built for visualizing vector multipliers, matrix transformations, and measuring semantic similarity between natural language coordinate vectors.",
    technologies: ["React", "TypeScript", "Linear Algebra", "Vector Math"],
    link: "#sandbox",
    imageAlt: "Semantic Similarity vector projection sandbox"
  }
];

export const CERTIFICATIONS: CertificationItem[] = [
  {
    id: "codesphere-2nd-place",
    name: "2nd Position - CodeSphere 36-Hour Hackathon",
    issuer: "ACIC SGTU Community Innovation Centre",
    iconName: "award"
  },
  {
    id: "codesphere-participation",
    name: "CodeSphere 36-Hour Hackathon Participant",
    issuer: "ACIC SGTU Community Innovation Centre",
    iconName: "award"
  },
  {
    id: "infosys-arduino",
    name: "Arduino Serial Communication",
    issuer: "Infosys Springboard",
    iconName: "award"
  },
  {
    id: "adya-buildathon",
    name: "AI Buildathon Hackathon",
    issuer: "Adya AI Launch Lab",
    iconName: "award"
  },
  {
    id: "unstop-hackdays",
    name: "HackDays Participation (Team Shadow Fighter)",
    issuer: "Galgotias College (Unstop)",
    iconName: "award"
  },
  {
    id: "oracle-ai",
    name: "Oracle AI Foundation Associate",
    issuer: "Oracle & OCI",
    iconName: "award"
  },
  {
    id: "shadowfox-internship",
    name: "Web Development Internship Certificate",
    issuer: "Shadowfox",
    iconName: "award"
  },
  {
    id: "codsoft-internship",
    name: "Web Development Virtual Internship",
    issuer: "CodSoft",
    iconName: "award"
  },
  {
    id: "python-iit-bombay",
    name: "Python 3.4.3 Training Certificate",
    issuer: "IIT Bombay",
    iconName: "award"
  },
  {
    id: "mongodb-students",
    name: "Introduction to MongoDB Program",
    issuer: "MongoDB for Students",
    iconName: "award"
  }
];
