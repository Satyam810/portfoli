"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";
import { useTypewriter } from "@/hooks/useTypewriter";

const ROLES = [
  "AI & ML Engineer",
  "Full Stack Developer",
  "Problem Solver",
  "Building Agentic AI",
];

export const HeroContent = () => {
  const typedText = useTypewriter({
    phrases: ROLES,
    typeSpeed: 75,
    deleteSpeed: 40,
    pauseAfter: 1600,
    pauseBefore: 350,
  });

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-28 w-full z-[20] gap-8 md:gap-0"
    >
      {/* ── LEFT SIDE ── */}
      <div className="w-full md:w-1/2 flex flex-col gap-5 justify-center text-start relative">

        {/* Soft background glow orb */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            top: "10%",
            left: "-20%",
            width: "480px",
            height: "480px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(124,58,237,0.13) 0%, rgba(8,145,178,0.07) 55%, transparent 75%)",
            filter: "blur(40px)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />

        {/* Intro Badge */}
        <motion.div
          variants={slideInFromTop}
          className="flex items-center w-fit py-2 px-4 border border-[#7042f88b] rounded-full relative z-10"
          style={{ background: "rgba(112,66,248,0.06)" }}
        >
          {/* Pulsing green availability dot */}
          <span className="relative flex h-2.5 w-2.5 mr-2 shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ background: "#22c55e" }}
            />
            <span
              className="relative inline-flex rounded-full h-2.5 w-2.5"
              style={{ background: "#16a34a" }}
            />
          </span>
          <span className="text-[13px] text-gray-300 font-medium whitespace-nowrap">
            Open to Opportunities
          </span>
        </motion.div>

        {/* Static H1 — always one line */}
        <motion.h1
          variants={slideInFromLeft(0.5)}
          className="font-bold text-white whitespace-nowrap text-4xl sm:text-5xl md:text-[clamp(2rem,4vw,3.5rem)] relative z-10"
          style={{ fontFamily: "'Syne', sans-serif", lineHeight: 1.1 }}
        >
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
            Satyam Kumar
          </span>
        </motion.h1>

        {/* Typewriter animated role line */}
        <motion.div
          variants={slideInFromLeft(0.65)}
          className="flex items-center"
          style={{ minHeight: "2.2rem" }}
        >
          <span
            className="text-xl sm:text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            {typedText}
          </span>
          {/* Blinking cursor — stays purple, not clipped */}
          <span
            className="ml-0.5 text-xl sm:text-2xl font-normal text-purple-400"
            style={{ animation: "blink-cursor 0.8s step-end infinite" }}
            aria-hidden="true"
          >
            |
          </span>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-sm sm:text-base text-gray-400 max-w-[500px] leading-relaxed"
        >
          I&apos;m a Computer Science student at LPU, passionate about building
          AI-driven systems and scalable software. I work with Python, Next.js,
          Django, and machine learning frameworks to create real-world
          applications — from intelligent backends to full-stack products.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex gap-4 flex-wrap pt-1"
        >
          <Link
            href="#projects"
            className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg text-sm font-medium"
          >
            View Projects
          </Link>
          <Link
            href="/resume.pdf"
            target="_blank"
            className="py-2 px-6 border border-purple-500/60 text-white rounded-lg hover:bg-purple-600/20 transition text-sm font-medium"
          >
            Download CV
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          variants={slideInFromLeft(1.1)}
          className="flex items-center gap-0 pt-1"
        >
          {[
            { value: "10+", label: "Projects Built" },
            { value: "100+", label: "DSA Problems" },
            { value: "AI", label: "& Backend Systems" },
          ].map((stat, i) => (
            <div key={stat.label} className="flex items-center">
              <div className="flex flex-col items-start px-4 first:pl-0">
                <span
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {stat.value}
                </span>
                <span className="text-[11px] text-gray-500 whitespace-nowrap">
                  {stat.label}
                </span>
              </div>
              {i < 2 && (
                <div
                  className="h-8 w-px mx-1"
                  style={{ background: "rgba(167,139,250,0.2)" }}
                />
              )}
            </div>
          ))}
        </motion.div>
      </div>

      {/* ── RIGHT SIDE ── */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full md:w-1/2 flex justify-center items-center"
      >
        <Image
          src="/hero-bg.svg"
          alt="Developer Illustration"
          height={550}
          width={550}
          draggable={false}
          className="select-none w-full max-w-[400px] md:max-w-[550px]"
        />
      </motion.div>
    </motion.div>
  );
};