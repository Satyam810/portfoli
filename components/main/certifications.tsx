"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CERTIFICATIONS } from "@/constants";

// ── Enrich each cert with display metadata ────────────────────────────────────
const META: Record<
  string,
  { icon: string; accent: string; gradient: string; skills: string[] }
> = {
  "Unsupervised Machine Learning": {
    icon: "🧠",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(124,58,237,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["Clustering", "IBM Watson", "Python"],
  },
  "Certified Essentials Automation Professional": {
    icon: "🤖",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(249,115,22,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["RPA", "Automation", "Bots"],
  },
  "Introduction to Technology Job Simulation": {
    icon: "💼",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(232,121,249,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["Tech Consulting", "Problem Solving"],
  },
  "Python (Basic)": {
    icon: "🐍",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(74,222,128,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["Python", "HackerRank", "OOP"],
  },
  "Software Engineer Intern": {
    icon: "⚙️",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(8,145,178,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["REST APIs", "Problem Solving", "DSA"],
  },
  "Mastering Data Structures & Algorithms": {
    icon: "📐",
    accent: "#a78bfa",
    gradient:
      "linear-gradient(135deg, rgba(251,191,36,0.28) 0%, rgba(11,9,26,0.92) 60%)",
    skills: ["Arrays", "Trees", "Graphs", "DP"],
  },
};

const DEFAULT_META = {
  icon: "🏅",
  accent: "#a78bfa",
  gradient:
    "linear-gradient(135deg, rgba(245,158,11,0.22) 0%, rgba(11,9,26,0.92) 60%)",
  skills: ["Certified"],
};

// ── Global CSS ────────────────────────────────────────────────────────────────
const CERT_CSS = `
@keyframes cert-pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.35; transform: scale(0.65); }
}
`;

// ── CertCard component ────────────────────────────────────────────────────────
const CertCard = ({
  cert,
  index,
  onSelectImage,
}: {
  cert: (typeof CERTIFICATIONS)[number];
  index: number;
  onSelectImage: (img: string) => void;
}) => {
  const meta = META[cert.title] ?? DEFAULT_META;
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: 0.58,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: "relative",
        height: 240,
        borderRadius: 20,
        overflow: "hidden",
        cursor: "pointer",
        border: `1px solid ${hovered ? meta.accent + "60" : meta.accent + "25"}`,
        boxShadow: hovered
          ? `0 8px 32px ${meta.accent}35, 0 0 0 1px ${meta.accent}30`
          : `0 2px 12px rgba(0,0,0,0.3)`,
        transition: "box-shadow 0.3s ease, transform 0.3s ease, border-color 0.3s ease",
        transform: hovered ? "translateY(-4px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => setHovered((v) => !v)}
    >
      {/* ── CERTIFICATE IMAGE — always visible ── */}
      <Image
        src={cert.image}
        alt={cert.title}
        fill
        className="object-cover"
        sizes="(max-width: 560px) 100vw, (max-width: 900px) 50vw, 33vw"
      />

      {/* accent top bar */}
      <div
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: 3,
          background: meta.accent,
          zIndex: 5,
        }}
      />

      {/* bottom gradient so title is readable (hidden on hover) */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(to top, rgba(5,4,18,0.90) 0%, rgba(5,4,18,0.35) 55%, transparent 100%)",
          zIndex: 2,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.25s ease",
          pointerEvents: "none",
        }}
      />

      {/* tag pill (top-left) */}
      <span
        style={{
          position: "absolute",
          top: 12, left: 12,
          fontSize: 9,
          fontFamily: "monospace",
          letterSpacing: "0.14em",
          textTransform: "uppercase",
          color: meta.accent,
          fontWeight: 700,
          background: "rgba(5,4,18,0.78)",
          border: `1px solid ${meta.accent}50`,
          padding: "2px 8px",
          borderRadius: 999,
          zIndex: 6,
          backdropFilter: "blur(4px)",
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {cert.tag}
      </span>

      {/* icon (top-right) */}
      <span
        style={{
          position: "absolute",
          top: 10, right: 14,
          fontSize: 20,
          zIndex: 6,
          filter: `drop-shadow(0 0 8px ${meta.accent}99)`,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.2s ease",
        }}
      >
        {meta.icon}
      </span>

      {/* ── default title strip (bottom, hidden on hover) ── */}
      <div
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          padding: "10px 14px 13px",
          zIndex: 5,
          opacity: hovered ? 0 : 1,
          transition: "opacity 0.2s ease",
          pointerEvents: "none",
        }}
      >
        <h3
          style={{
            fontSize: 13,
            fontWeight: 800,
            color: "#f0f0f8",
            lineHeight: 1.3,
            marginBottom: 2,
          }}
        >
          {cert.title}
        </h3>
        <p style={{ fontSize: 11, color: "rgba(255,255,255,0.55)" }}>
          {cert.issuer}
        </p>
      </div>

      {/* ── HOVER / TAP OVERLAY — slides up with details ── */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(160deg, ${meta.accent}33 0%, rgba(5,4,18,0.99) 40%)`,
          backdropFilter: "blur(6px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "16px 18px 14px",
          zIndex: 8,
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translateY(0)" : "translateY(14px)",
          transition: "opacity 0.3s ease, transform 0.3s ease",
          pointerEvents: hovered ? "auto" : "none",
        }}
      >
        {/* top info block */}
        <div>
          {/* verified row */}
          <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 7 }}>
            <span
              style={{
                width: 8, height: 8,
                borderRadius: "50%",
                background: meta.accent,
                display: "inline-block",
                animation: hovered ? "cert-pulse-dot 1.8s ease-in-out infinite" : "none",
                boxShadow: `0 0 8px ${meta.accent}dd`,
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontSize: 14,
                fontWeight: 700,
                color: meta.accent,
                letterSpacing: "0.02em",
              }}
            >
              Verified ✓
            </span>
          </div>

          {/* title */}
          <h3
            style={{
              fontSize: 13,
              fontWeight: 800,
              color: "#f0f0f8",
              lineHeight: 1.3,
              marginBottom: 4,
            }}
          >
            {cert.title}
          </h3>

          {/* issuer + date */}
          <p
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.45)",
              fontFamily: "monospace",
              marginBottom: 10,
            }}
          >
            {cert.issuer} · 📅 {cert.date}
          </p>

          {/* skill tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {meta.skills.map((skill) => (
              <span
                key={skill}
                style={{
                  fontSize: 10,
                  fontWeight: 600,
                  padding: "2px 9px",
                  borderRadius: 999,
                  border: `1px solid ${meta.accent}45`,
                  color: meta.accent,
                  background: `${meta.accent}12`,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* View Certificate — triggers custom modal map */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelectImage(cert.image);
          }}
          style={{
            width: "100%",
            display: "block",
            textAlign: "center",
            padding: "9px 0",
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            border: `1.5px solid ${meta.accent}70`,
            color: meta.accent,
            textDecoration: "none",
            letterSpacing: "0.04em",
            transition: "background 0.2s, color 0.2s",
            background: "transparent",
            cursor: "pointer",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = `${meta.accent}22`;
            (e.currentTarget as HTMLElement).style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "transparent";
            (e.currentTarget as HTMLElement).style.color = meta.accent;
          }}
        >
          View Certificate ↗
        </button>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Certifications Section
// ═══════════════════════════════════════════════════════════════════════════════
export const Certifications = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Inject CSS once
  useEffect(() => {
    if (document.getElementById("cert-css")) return;
    const el = document.createElement("style");
    el.id = "cert-css";
    el.textContent = CERT_CSS;
    document.head.appendChild(el);
  }, []);

  return (
    <section
      id="certifications"
      className="relative flex flex-col items-center py-24 overflow-hidden scroll-mt-[70px]"
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(112,66,248,0.12) 0%, transparent 70%)",
        }}
      />

      {/* ── HEADER ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-start text-left px-6 md:px-20 w-full mb-12 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        {/* pill badge */}
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0 }}
          className="mb-5"
        >
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] text-gray-300 tracking-wide"
            style={{
              border: "1px solid rgba(112,66,248,0.55)",
              background: "rgba(112,66,248,0.08)",
            }}
          >
            🏅 Credentials
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="font-bold text-white mb-3"
          style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(36px,6vw,60px)", lineHeight: 1.1 }}
        >
          Certifications
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="text-lg max-w-[600px]"
          style={{ color: "rgba(255,255,255,0.52)" }}
        >
          Courses and credentials that sharpened my skills in AI, machine
          learning, and full-stack development.
        </motion.p>
      </motion.div>

      {/* ── GRID ── */}
      <div
        className="relative z-10 w-full px-6 md:px-20 mx-auto"
        style={{ maxWidth: "1200px" }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "22px",
          }}
          className="cert-grid"
        >
          {CERTIFICATIONS.map((cert, i) => (
            <CertCard key={cert.title} cert={cert} index={i} onSelectImage={setSelectedImage} />
          ))}
        </div>

        {/* Hint text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex items-center justify-center gap-3 mt-8"
        >
          <span
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(to right, transparent, rgba(255,255,255,0.15))",
            }}
          />
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.3)",
              letterSpacing: "0.07em",
              fontFamily: "monospace",
            }}
          >
            hover cards to reveal details
          </p>
          <span
            style={{
              width: 60,
              height: 1,
              background:
                "linear-gradient(to left, transparent, rgba(255,255,255,0.15))",
            }}
          />
        </motion.div>
      </div>

      {/* ── FULL SCREEN MODAL ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-md"
            style={{ background: "rgba(5,4,18,0.85)" }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl max-h-[90vh] rounded-[24px] overflow-hidden"
              style={{
                background: "#0a0718",
                border: "1px solid rgba(167,139,250,0.3)",
                boxShadow: "0 20px 60px rgba(0,0,0,0.8)",
              }}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full"
                style={{
                  background: "rgba(10,7,24,0.6)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  color: "#fff",
                  fontSize: 20,
                  backdropFilter: "blur(4px)",
                }}
              >
                ✕
              </button>
              <div className="relative w-full h-full min-h-[50vh] flex items-center justify-center p-2">
                 <Image
                    src={selectedImage}
                    alt="Certificate Fullscreen"
                    width={1200}
                    height={800}
                    className="object-contain w-full h-auto max-h-[85vh] rounded-[16px]"
                 />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive grid CSS */}
      <style>{`
        @media (max-width: 900px) {
          .cert-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (max-width: 560px) {
          .cert-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};
