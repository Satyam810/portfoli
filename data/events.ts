export interface EventItem {
  id: number;
  image: string;
  institute: string;
  conf: string;
  title: string;
  meta: string;
  badge: string;
  accent: string;
  featured: boolean;
  /** Fallback gradient used when image fails to load */
  bgGradient: string;
  /** Optional link to the actual certificate or evidence */
  certificateLink?: string;
}

export const events: EventItem[] = [
  {
    id: 1,
    image: "/images/events/iit-kanpur.jpg",
    institute: "IIT KANPUR",
    conf: "OOSC '24",
    title: "Open Source Conference",
    meta: "Speaker · Nov 2024 · 200+ attendees",
    badge: "★ SPEAKER",
    accent: "#b8f542",
    featured: true,
    bgGradient: "linear-gradient(135deg, #1a3a1a 0%, #2d5a1e 100%)",
    certificateLink: "/certifications/OOSC_certificate.jpg", // Example cert
  },
  {
    id: 2,
    image: "/images/events/iit-ropar.jpg",
    institute: "IIT ROPAR",
    conf: "ADVITIYA '25",
    title: "Annual Techfest",
    meta: "Presenter · Feb 2025 · Inter-IIT event",
    badge: "PRESENTER",
    accent: "#4df0e0",
    featured: false,
    bgGradient: "linear-gradient(135deg, #0d2d48 0%, #0a4060 100%)",
  },
  {
    id: 3,
    image: "/images/events/coding-ninjas.jpg",
    institute: "CODING NINJAS",
    conf: "HACKATHON",
    title: "National Hackathon",
    meta: "Volunteer · 2024 · Operations lead",
    badge: "VOLUNTEER",
    accent: "#a78bfa",
    featured: false,
    bgGradient: "linear-gradient(135deg, #2d1b69 0%, #1a1240 100%)",
  },
  {
    id: 4,
    image: "/images/events/lpu.jpg",
    institute: "LPU",
    conf: "LEADERSHIP",
    title: "Hostel President",
    meta: "Elected · 2024 · 500+ students",
    badge: "LEADERSHIP",
    accent: "#f6ad55",
    featured: false,
    bgGradient: "linear-gradient(135deg, #3d1f00 0%, #5a3000 100%)",
  },
];
