import dynamic from "next/dynamic";
import { Hero } from "@/components/main/hero";
import { Skills } from "@/components/main/skills";

// Dynamically import below-the-fold components to reduce initial JS payload
const Encryption = dynamic(() => import("@/components/main/encryption").then(mod => mod.Encryption), { ssr: true });
const Projects = dynamic(() => import("@/components/main/projects").then(mod => mod.Projects), { ssr: true });
const Certifications = dynamic(() => import("@/components/main/certifications").then(mod => mod.Certifications), { ssr: true });
const Events = dynamic(() => import("@/components/main/events").then(mod => ({ default: mod.Events })), { ssr: true });
const Connect = dynamic(() => import("@/components/main/connect").then(mod => mod.Connect), { ssr: true });
const Education = dynamic(() => import("@/components/main/education").then(mod => mod.Education), { ssr: true });

export default function Home() {
  return (
    <main className="h-full w-full">
      <div className="flex flex-col gap-12 md:gap-16 pt-20 pb-10">
        <Hero />
        <Education />
        <Skills />
        <Encryption />
        <Projects />
        <Certifications />
        <Events />
        <Connect />
      </div>
    </main>
  );
}
