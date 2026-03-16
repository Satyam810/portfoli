export interface ProjectItem {
  id: number;
  number: string;          // e.g. "01"
  type: string;            // e.g. "ML · Python"
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  status: string;          // "Live" | "WIP" | "Academic"
  year: string;
  accent: string;          // hex color
  image?: string;          // path to screenshot
  icon?: string;           // emoji fallback
  iconBg?: string;         // radial-gradient CSS string for icon card
  liveUrl?: string;
  githubUrl?: string;
  /** initial canvas position */
  defaultPos: { x: number; y: number };
}

export const CANVAS_PROJECTS: ProjectItem[] = [
  {
    id: 1,
    number: "01",
    type: "ML · Python",
    title: "Safe Text Monitor",
    shortDesc: "Detects toxic comments using TF-IDF & LinearSVC with high accuracy.",
    longDesc:
      "A machine learning pipeline that classifies online comments as toxic or non-toxic in real-time. Built with TF-IDF vectorization and LinearSVC, achieving 94%+ accuracy on the Jigsaw dataset. Includes a Flask REST API for easy integration.",
    tech: ["Python", "Scikit-learn", "Flask", "TF-IDF", "LinearSVC"],
    status: "Live",
    year: "2024",
    accent: "#a78bfa",
    image: "/projects/safe_text_monitor.png",
    liveUrl: "https://github.com/Satyam810",
    githubUrl: "https://github.com/Satyam810",
    defaultPos: { x: 40, y: 60 },
  },
  {
    id: 2,
    number: "02",
    type: "Full-Stack · Django",
    title: "University Management System",
    shortDesc: "Manages students, faculty & academic records with auth and CRUD.",
    longDesc:
      "A comprehensive Django web platform for university administration. Features role-based authentication, student enrollment, grade management, and faculty portals. PostgreSQL backend with a clean responsive UI.",
    tech: ["Django", "PostgreSQL", "Python", "HTML/CSS", "JavaScript"],
    status: "Academic",
    year: "2024",
    accent: "#a78bfa",
    image: "/projects/university_management_system.png",
    liveUrl: "https://university-management-system-git-main-satyams-projects-d6faeb33.vercel.app/accounts/login/",
    githubUrl: "https://github.com/Satyam810/university-management-system",
    defaultPos: { x: 440, y: 40 },
  },
  {
    id: 3,
    number: "03",
    type: "Web · Visualization",
    title: "DSA Visualizer",
    shortDesc: "Interactive platform for visualizing and learning Data Structures & Algorithms.",
    longDesc:
      "Learn Data Structures & Algorithms through visuals, interactive code, and step-by-step explanations. Features dynamic sorting, searching, tree, and graph algorithms to help students excel in coding interviews.",
    tech: ["Next.js", "React", "TypeScript", "Tailwind CSS"],
    status: "Live",
    year: "2025",
    accent: "#a78bfa",
    image: "/projects/dsa_visualizer.png",
    liveUrl: "https://dsa-visualizer-lpu.vercel.app/",
    githubUrl: "https://github.com/Satyam810/DSA_VISUALIZER",
    defaultPos: { x: 820, y: 80 },
  },
  {
    id: 4,
    number: "04",
    type: "EdTech · Platform",
    title: "Courage Library",
    shortDesc: "India’s Smart Self-Paced Learning Platform for Government Exams.",
    longDesc:
      "India’s first self-paced learning platform for SSC, Defence, Banking, Railway, and NDA exams. Offers lifetime access, structured learning journeys, progress tracking, and bite-sized lessons for serious aspirants.",
    tech: ["Next.js", "React", "Tailwind CSS", "Node.js"],
    status: "Live",
    year: "2025",
    accent: "#a78bfa",
    image: "/projects/courage_library.png",
    liveUrl: "https://www.couragelibrary.in/",
    githubUrl: "https://github.com/Satyam810/Courage_Library_Main",
    defaultPos: { x: 180, y: 300 },
  },
  {
    id: 5,
    number: "05",
    type: "Backend · API",
    title: "Django REST Inventory API",
    shortDesc: "Production-ready Inventory API with JWT auth, CRUD, and dynamic filtering.",
    longDesc:
      "A fully functional REST API for managing product inventory. Engineered with Django REST Framework, secured with JWT stateless authentication, and features server-side dynamic filtering and ordering. Built to scale with a clean layered architecture.",
    tech: ["Django", "DRF", "Python", "JWT", "SQLite"],
    status: "Live",
    year: "2025",
    accent: "#a78bfa",
    icon: "📦",
    iconBg: "radial-gradient(circle at 50% 60%, rgba(167,139,250,0.2) 0%, transparent 70%)",
    liveUrl: "https://github.com/Satyam810/django-rest-inventory-api",
    githubUrl: "https://github.com/Satyam810/django-rest-inventory-api",
    defaultPos: { x: 620, y: 300 },
  },
];
