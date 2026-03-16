import { HeroContent } from "@/components/sub/hero-content";

export const Hero = () => {
  return (
    <section
      id="about-me"
      className="relative flex flex-col h-full w-full"
    >
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        className="rotate-180 absolute top-[-300px] left-0 w-full h-full object-cover -z-20"
      >
        <source src="/videos/blackhole.webm" type="video/webm" />
      </video>

      {/* Hero Content */}
      <HeroContent />
    </section>
  );
};