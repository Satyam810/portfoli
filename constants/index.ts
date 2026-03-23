import { FaYoutube } from "react-icons/fa";
import {
  RxGithubLogo,
  RxLinkedinLogo,
  RxTwitterLogo,
} from "react-icons/rx";

/* ======================= SKILLS ======================= */

export type SkillCategory = "Languages" | "Frameworks" | "Databases" | "Tools";

export const SKILL_DATA: {
  skill_name: string;
  image: string;
  width: number;
  height: number;
  category: SkillCategory;
}[] = [
    // --- Languages ---
    { skill_name: "C", image: "c.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "C++", image: "cpp.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "Python", image: "python.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "JavaScript", image: "js.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "TypeScript", image: "ts.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "HTML", image: "html.png", width: 70, height: 70, category: "Languages" },
    { skill_name: "CSS", image: "css.png", width: 70, height: 70, category: "Languages" },

    // --- Frameworks & Libraries ---
    { skill_name: "React", image: "react.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Next.js", image: "next.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Node.js", image: "node.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Express", image: "express.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Django", image: "Django.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Flask", image: "flask.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "PyTorch", image: "pytorch.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Tailwind", image: "tailwind.png", width: 70, height: 70, category: "Frameworks" },
    { skill_name: "Framer Motion", image: "framer.png", width: 70, height: 70, category: "Frameworks" },

    // --- Databases ---
    { skill_name: "MongoDB", image: "mongodb.png", width: 70, height: 70, category: "Databases" },
    { skill_name: "PostgreSQL", image: "postgresql.png", width: 70, height: 70, category: "Databases" },
    { skill_name: "MySQL", image: "mysql.png", width: 70, height: 70, category: "Databases" },
    { skill_name: "SQLite", image: "sqlite.png", width: 70, height: 70, category: "Databases" },
    { skill_name: "Supabase", image: "supabase.png", width: 70, height: 70, category: "Databases" },
    { skill_name: "Firebase", image: "firebase.png", width: 70, height: 70, category: "Databases" },

    // --- Tools & Platforms ---
    { skill_name: "Git", image: "Git.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "GitHub", image: "github.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Docker", image: "docker.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Linux", image: "linux.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Ubuntu", image: "ubuntu.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Figma", image: "figma.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "VS Code", image: "vscode.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Postman", image: "postman.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Stripe", image: "stripe.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "Anaconda", image: "anaconda.png", width: 70, height: 70, category: "Tools" },
    { skill_name: "AutoCAD", image: "autocad.png", width: 70, height: 70, category: "Tools" },
  ];

/* ======================= SOCIALS ======================= */

export const SOCIALS = [
  {
    name: "GitHub",
    icon: RxGithubLogo,
    link: "https://github.com/Satyam810",
  },
  {
    name: "LinkedIn",
    icon: RxLinkedinLogo,
    link: "https://www.linkedin.com/in/satyamlpu/",
  },
  {
    name: "Twitter",
    icon: RxTwitterLogo,
    link: "https://x.com/SatyamVats863",
  },
] as const;

/* ======================= CERTIFICATIONS ======================= */

export const CERTIFICATIONS = [
  {
    title: "Unsupervised Machine Learning",
    issuer: "IBM / Coursera",
    date: "Feb 2026",
    image: "/certifications/unsl.png",
    tag: "Machine Learning",
    link: "https://coursera.org/verify/HLBM86DVWSUY",
  },
  {
    title: "Certified Essentials Automation Professional",
    issuer: "Automation Anywhere",
    date: "Dec 2025",
    image: "/certifications/automation_anywhere.png",
    tag: "Automation / RPA",
    link: "https://www.automationanywhere.com",
  },
  {
    title: "Introduction to Technology Job Simulation",
    issuer: "Accenture / Forage",
    date: "Nov 2025",
    image: "/certifications/accenture_job_simulation.png",
    tag: "Industry Simulation",
    link: "https://www.theforage.com",
  },
  {
    title: "Python (Basic)",
    issuer: "HackerRank",
    date: "Feb 2026",
    image: "/certifications/python.png",
    tag: "Python",
    link: "https://www.hackerrank.com/certificates/C58B52F4AF03",
  },
  {
    title: "Software Engineer Intern",
    issuer: "HackerRank",
    date: "Jan 2026",
    image: "/certifications/software_engineer_intern.png",
    tag: "Software Engineering",
    link: "https://www.hackerrank.com/certificates/A9E527E41CA7",
  },
  {
    title: "Mastering Data Structures & Algorithms",
    issuer: "LPU — Centre for Professional Enhancement",
    date: "Aug 2025",
    image: "/certifications/summer_training_dsa.png",
    tag: "DSA",
    link: "#",
  },
] as const;

/* ======================= PROJECTS & EVENTS ======================= */

// Projects and Events have been migrated to dedicated data files:
// - data/projects.ts
// - data/events.ts

/* ======================= FOOTER ======================= */

export const FOOTER_DATA = [
  {
    title: "Community",
    data: [
      {
        name: "YouTube",
        icon: FaYoutube,
        link: "https://youtube.com",
      },
      {
        name: "GitHub",
        icon: RxGithubLogo,
        link: "https://github.com/Satyam810",
      },
    ],
  },
  {
    title: "Social",
    data: [
      {
        name: "LinkedIn",
        icon: RxLinkedinLogo,
        link: "https://www.linkedin.com/in/satyamlpu/",
      },
      {
        name: "Twitter / X",
        icon: RxTwitterLogo,
        link: "https://x.com/SatyamVats863",
      },
    ],
  },
  {
    title: "Contact",
    data: [
      {
        name: "Email",
        icon: null,
        link: "mailto:satyamvatsa810@gmail.com",
      },
    ],
  },
] as const;

/* ======================= NAVIGATION ======================= */

export const NAV_LINKS = [
  {
    title: "About",
    link: "#about-me",
  },
  {
    title: "Education",
    link: "#education",
  },
  {
    title: "Skills",
    link: "#skills",
  },
  {
    title: "Projects",
    link: "#projects",
  },
  {
    title: "Certifications",
    link: "#certifications",
  },
  {
    title: "Events",
    link: "#events",
  },
  {
    title: "Contact",
    link: "#connect",
  },
] as const;
