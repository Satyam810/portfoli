"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { HiMail } from "react-icons/hi";

import { SOCIALS } from "@/constants";

const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, delay, ease: "easeOut" } },
});



/* ════════════════════════════════════════════════════════ */
export const Connect = () => {
  return (
    <section
      id="connect"
      className="relative flex flex-col items-center overflow-hidden scroll-mt-[70px]"
      style={{ borderTop: "1px solid rgba(112,66,248,0.2)" }}
    >
      {/* ── subtle radial glow ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(112,66,248,0.1) 0%, transparent 65%)",
        }}
      />

      {/* ════ MAIN CONTENT ════ */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="relative z-10 flex flex-col md:flex-row items-center md:items-center justify-center gap-12 md:gap-20 px-6 md:px-20 pt-20 pb-20"
        style={{ maxWidth: "1200px", margin: "0 auto", width: "100%" }}
      >
        {/* ── LEFT: Profile Photo ── */}
        <motion.div variants={fadeUp(0)} className="flex-shrink-0 relative">
          <div
            className="w-56 h-56 md:w-[320px] md:h-[320px] rounded-[30px] md:rounded-[40px] overflow-hidden relative z-10"
            style={{
              background: "rgba(10,7,24,0.6)",
              border: "1px solid rgba(167,139,250,0.3)",
              boxShadow: "0 20px 60px -10px rgba(124,58,237,0.3)",
            }}
          >
            {/* The user's photo should be placed here, in public/photo.png or public/satyam.png */}
            <Image
              src="/photo.png"
              alt="Satyam Kumar"
              width={320}
              height={320}
              className="object-cover w-full h-full scale-105 hover:scale-100 transition-transform duration-500 bg-[#07070f]"
            />
          </div>

          {/* decorative floating circles around the photo */}
          <div
            className="absolute -top-6 -right-6 w-24 h-24 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(167,139,250,0.15) 0%, transparent 70%)",
              border: "1px solid rgba(167,139,250,0.2)",
            }}
          />
          <div
            className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full pointer-events-none"
            style={{
              background: "radial-gradient(circle, rgba(103,232,249,0.1) 0%, transparent 70%)",
              border: "1px dashed rgba(103,232,249,0.2)",
            }}
          />
        </motion.div>

        {/* ── RIGHT: Content ── */}
        <div className="flex flex-col gap-6 max-w-[540px] items-center text-center md:items-start md:text-left">
          {/* availability badge */}
          <motion.div variants={fadeUp(0.1)}>
            <span
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[12px] font-semibold tracking-widest uppercase"
              style={{
                background: "rgba(124,58,237,0.15)",
                border: "1px solid rgba(139,92,246,0.5)",
                color: "#a78bfa",
              }}
            >
              <span
                style={{
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: "#a78bfa",
                  boxShadow: "0 0 6px #a78bfa",
                  display: "inline-block",
                  animation: "pulse-dot 2s ease-in-out infinite",
                }}
              />
              Available for Opportunities
            </span>
          </motion.div>

          {/* heading */}
          <motion.h2 variants={fadeUp(0.2)} className="font-bold text-white leading-[1.08]" style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(38px, 5vw, 64px)" }}>
            Let&apos;s Build <br className="hidden md:block" /> Something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #a78bfa, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Great.
            </span>
          </motion.h2>

          {/* description */}
          <motion.p
            variants={fadeUp(0.3)}
            style={{ fontSize: "16px", color: "rgba(255,255,255,0.6)", lineHeight: 1.7, maxWidth: "480px" }}
          >
            I&apos;m a passionate developer focused on AI, ML, and robust backend engineering. Whether it&apos;s a new opportunity, an open-source collaboration, or just tech talk — I&apos;d love to connect!
          </motion.p>

          {/* contact pill */}
          <motion.div variants={fadeUp(0.4)} className="w-full">
            <Link
              href="mailto:satyamvatsa810@gmail.com"
              className="group flex flex-col md:flex-row items-center md:justify-between w-full p-4 rounded-2xl transition-all duration-300"
              style={{
                background: "rgba(10,7,24,0.7)",
                border: "1px solid rgba(112,66,248,0.25)",
                backdropFilter: "blur(8px)",
              }}
            >
              <div className="flex items-center gap-4 mb-3 md:mb-0">
                <div className="flex items-center justify-center w-12 h-12 rounded-full" style={{ background: "rgba(124,58,237,0.15)", border: "1px solid rgba(167,139,250,0.3)" }}>
                  <HiMail className="w-6 h-6" style={{ color: "#a78bfa" }} />
                </div>
                <div className="flex flex-col text-center md:text-left">
                  <span style={{ fontSize: "13px", color: "rgba(255,255,255,0.4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Email Me At</span>
                  <span style={{ fontSize: "16px", color: "rgba(255,255,255,0.9)", fontWeight: 600 }}>satyamvatsa810@gmail.com</span>
                </div>
              </div>
              <div className="px-5 py-2.5 rounded-xl font-bold tracking-widest uppercase transition-all duration-300 group-hover:bg-[#a78bfa] group-hover:text-[#0a0718]"
                style={{ fontSize: "12px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#fff" }}>
                Send Email ↗
              </div>
            </Link>
          </motion.div>

          {/* social & cv */}
          <motion.div variants={fadeUp(0.5)} className="flex flex-wrap justify-center md:justify-start gap-4 mt-2 w-full">
            {SOCIALS.map(({ icon: Icon, name, link }) => (
              <Link
                key={name}
                href={link}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`Visit my ${name} profile`}
                className="flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.1)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(167,139,250,0.6)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(167,139,250,0.1)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                }}
              >
                <Icon className="w-5 h-5 text-gray-300" />
              </Link>
            ))}
            <Link
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-2 rounded-xl font-bold tracking-widest uppercase transition-all duration-300"
              style={{
                fontSize: "12px",
                color: "#0a0718",
                background: "#a78bfa",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#fff";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "#a78bfa";
              }}
            >
              Download CV
            </Link>
          </motion.div>
        </div>
      </motion.div>

      {/* ════ BOTTOM LINE ════ */}
      <div
        className="relative z-10 w-full"
        style={{ borderTop: "1px solid rgba(112,66,248,0.18)" }}
      >
        <p
          className="text-center py-5"
          style={{ fontSize: "14px", color: "rgba(255,255,255,0.7)" }}
        >
          © {new Date().getFullYear()} Satyam Kumar &nbsp;&middot;&nbsp; All rights reserved.
        </p>
      </div>

      {/* pulse dot keyframe */}
      <style>{`
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; box-shadow: 0 0 6px #a78bfa; }
          50%       { opacity: 0.5; box-shadow: 0 0 2px #a78bfa; }
        }
      `}</style>
    </section>
  );
};
