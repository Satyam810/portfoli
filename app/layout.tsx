import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import type { PropsWithChildren } from "react";

import { Navbar } from "@/components/main/navbar";
import { StarsCanvas } from "@/components/main/star-background";
import { siteConfig } from "@/config";
import { cn } from "@/lib/utils";

import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const viewport: Viewport = {
  themeColor: "#030014",
};

export const metadata: Metadata = siteConfig;

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Satyam Kumar",
  url: "https://satyamkumar-lpu.vercel.app",
  image: "https://satyamkumar-lpu.vercel.app/logo.png",
  sameAs: [
    "https://github.com/Satyam810",
    "https://www.linkedin.com/in/satyamlpu/",
    "https://x.com/SatyamVats863",
  ],
  jobTitle: "AI & Machine Learning Engineer",
  description:
    "Computer Science student at Lovely Professional University specializing in Artificial Intelligence and Machine Learning.",
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Lovely Professional University",
    url: "https://www.lpu.in",
  },
  knowsAbout: [
    "Machine Learning",
    "Deep Learning",
    "Python",
    "Artificial Intelligence",
    "Django",
    "React",
    "Data Science",
    "Neural Networks",
  ],
  email: "satyamvatsa810@gmail.com",
};
export default function RootLayout({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={cn(
          "bg-[#030014] overflow-y-scroll overflow-x-hidden",
          inter.className
        )}
      >
        <StarsCanvas />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
