import type { Metadata } from "next";

export const siteConfig: Metadata = {
  metadataBase: new URL("https://satyamkumar-lpu.vercel.app"),

  title: {
    default: "Satyam Kumar | AI & ML Engineer | LPU",
    template: "%s | Satyam Kumar",
  },

  description:
    "Satyam Kumar is an AI & Machine Learning Engineer and Computer Science student at Lovely Professional University (LPU). View Satyam Kumar's portfolio, showcasing projects in Deep Learning, Python, Django, React, and data science.",

  keywords: [
    "Satyam Kumar",
    "Satyam Kumar LPU",
    "Satyam Kumar AI and ML",
    "Satyam portfolio",
    "Satyam Kumar portfolio",
    "Satyam Kumar AI ML",
    "satyam kumar machine learning",
    "satyam kumar developer",
    "satyam kumar lovely professional university",
    "AI ML engineer India",
    "deep learning engineer",
    "LPU student portfolio",
    "satyamvatsa810",
    "Satyam810",
  ],

  authors: [
    {
      name: "Satyam Kumar",
      url: "https://github.com/Satyam810",
    },
  ],
  creator: "Satyam Kumar",
  publisher: "Satyam Kumar",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://satyamkumar-lpu.vercel.app",
    siteName: "Satyam Kumar Portfolio",
    title: "Satyam Kumar | AI & ML Engineer | LPU",
    description:
      "Satyam Kumar — AI & Machine Learning engineer at LPU. Explore my projects, skills, and certifications in machine learning, deep learning, and full-stack development.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Satyam Kumar — AI & ML Engineer Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Satyam Kumar | AI & ML Engineer | LPU",
    description:
      "AI & ML engineer at LPU. Building intelligent systems with Python, Deep Learning, and React. Check out my portfolio!",
    images: ["/og-image.png"],
    creator: "@SatyamVats863",
    site: "@SatyamVats863",
  },

  alternates: {
    canonical: "https://satyamkumar-lpu.vercel.app",
  },

  icons: {
    icon: "/favicon.ico?v=2",
    apple: "/apple-icon.png",
    shortcut: "/icon1.png",
  },

  category: "technology",
  verification: {
    google: "LRz2LsE1jLINIObUQnMqiOuTpFoLGiwq4W8FCpQphXY",
  },
};
