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
    badge: "PARTICIPANT",
    accent: "#a78bfa",
    featured: true,
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
    certificateLink: "/certifications/OOSC_certificate.jpg",
  },
  {
    id: 2,
    image: "/images/events/iit-ropar.jpg",
    institute: "IIT ROPAR",
    conf: "ADVITIYA '25",
    title: "Annual Techfest",
    meta: "Participant · Feb 2025 · Inter-IIT event",
    badge: "PARTICIPANT",
    accent: "#a78bfa",
    featured: false,
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
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
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
  },
  {
    id: 4,
    image: "/images/events/lpu.jpg",
    institute: "LPU",
    conf: "LEADERSHIP",
    title: "Hostel President",
    meta: "Elected · 2024 · 500+ students",
    badge: "LEADERSHIP",
    accent: "#a78bfa",
    featured: false,
    bgGradient: "linear-gradient(135deg, #1a1240 0%, #0d0b20 100%)",
  },
];

