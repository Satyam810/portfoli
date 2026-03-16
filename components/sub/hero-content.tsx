"use client";

import { SparklesIcon } from "@heroicons/react/24/solid";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

import {
  slideInFromLeft,
  slideInFromRight,
  slideInFromTop,
} from "@/lib/motion";

export const HeroContent = () => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      className="flex flex-col md:flex-row items-center justify-center px-6 md:px-20 mt-32 w-full z-[20]"
    >
      {/* LEFT SIDE */}
      <div className="h-full w-full flex flex-col gap-6 justify-center text-start">

        {/* Small Intro Badge */}
        <motion.div
          variants={slideInFromTop}
          className="flex items-center w-fit py-[8px] px-[10px] border border-[#7042f88b] rounded-full"
        >
          <SparklesIcon className="text-[#b49bff] mr-[8px] h-5 w-5" />

          <span className="text-[13px] text-gray-300">
            AI / Machine Learning Engineer
          </span>
        </motion.div>

        {/* Main Heading (H1 for SEO) */}
        <motion.h1
          variants={slideInFromLeft(0.5)}
          className="flex flex-col gap-4 text-5xl md:text-6xl font-bold text-white max-w-[650px]"
        >
          <span>
            Hi, I&apos;m{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Satyam Kumar
            </span>
          </span>

          <span>
            Building intelligent systems with{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-cyan-500">
              Machine Learning
            </span>
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          variants={slideInFromLeft(0.8)}
          className="text-lg text-gray-400 max-w-[600px]"
        >
          I am a Computer Science student passionate about Artificial Intelligence
          and Machine Learning. I build AI-powered applications using Python,
          Scikit-learn, Django, and modern web technologies to solve real-world
          problems and create scalable software systems.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={slideInFromLeft(1)}
          className="flex gap-4"
        >

          <Link
            href="#projects"
            className="py-2 px-6 button-primary text-center text-white cursor-pointer rounded-lg"
          >
            View Projects
          </Link>

          <Link
            href="/resume.pdf"
            target="_blank"
            className="py-2 px-6 border border-purple-500 text-white rounded-lg hover:bg-purple-600 transition"
          >
            Download CV
          </Link>

        </motion.div>
      </div>

      {/* RIGHT SIDE IMAGE */}
      <motion.div
        variants={slideInFromRight(0.8)}
        className="w-full h-full flex justify-center items-center mt-10 md:mt-0"
      >
        <Image
          src="/hero-bg.svg"
          alt="Developer Illustration"
          height={600}
          width={600}
          draggable={false}
          className="select-none"
        />
      </motion.div>

    </motion.div>
  );
};