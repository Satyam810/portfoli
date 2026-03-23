"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { SKILL_DATA, SkillCategory } from "@/constants";

/* ── category tabs ─────────────────────────────────────── */
const CATEGORIES: { label: string; value: SkillCategory | "All" }[] = [
  { label: "All", value: "All" },
  { label: "Languages", value: "Languages" },
  { label: "Frameworks", value: "Frameworks" },
  { label: "Databases", value: "Databases" },
  { label: "Tools", value: "Tools" },
];

/* ── category divider labels ───────────────────────────── */
const CATEGORY_LABELS: Record<SkillCategory, string> = {
  Languages: "Languages",
  Frameworks: "Frameworks & Libraries",
  Databases: "Databases",
  Tools: "Tools & Platforms",
};

/* ── per-skill icon-box colors ─────────────────────────── */
// Format: [dark bg class, icon-tint overlay class]
const SKILL_COLORS: Record<string, { bg: string; ring: string }> = {
  // Languages
  "C": { bg: "bg-[#0d1b2e]", ring: "ring-1 ring-blue-700/50" },
  "C++": { bg: "bg-[#0a1628]", ring: "ring-1 ring-cyan-700/50" },
  "Python": { bg: "bg-[#1a1a07]", ring: "ring-1 ring-yellow-600/50" },
  "JavaScript": { bg: "bg-[#0f1a04]", ring: "ring-1 ring-yellow-400/50" },
  "TypeScript": { bg: "bg-[#071628]", ring: "ring-1 ring-blue-400/50" },
  "HTML": { bg: "bg-[#1f0d03]", ring: "ring-1 ring-orange-600/50" },
  "CSS": { bg: "bg-[#071828]", ring: "ring-1 ring-blue-500/50" },
  // Frameworks
  "React": { bg: "bg-[#041a1f]", ring: "ring-1 ring-cyan-500/50" },
  "Next.js": { bg: "bg-[#090909]", ring: "ring-1 ring-white/20" },
  "Node.js": { bg: "bg-[#061a06]", ring: "ring-1 ring-green-600/50" },
  "Express": { bg: "bg-[#101010]", ring: "ring-1 ring-gray-500/30" },
  "Django": { bg: "bg-[#051a0a]", ring: "ring-1 ring-green-700/50" },
  "Flask": { bg: "bg-[#111111]", ring: "ring-1 ring-gray-400/20" },
  "PyTorch": { bg: "bg-[#1a0505]", ring: "ring-1 ring-red-600/50" },
  "Tailwind": { bg: "bg-[#041b1f]", ring: "ring-1 ring-cyan-400/50" },
  "Framer Motion": { bg: "bg-[#0d0419]", ring: "ring-1 ring-purple-500/50" },
  // Databases
  "MongoDB": { bg: "bg-[#051a07]", ring: "ring-1 ring-green-500/50" },
  "PostgreSQL": { bg: "bg-[#071428]", ring: "ring-1 ring-blue-500/50" },
  "MySQL": { bg: "bg-[#05101e]", ring: "ring-1 ring-blue-400/40" },
  "SQLite": { bg: "bg-[#08121f]", ring: "ring-1 ring-blue-300/40" },
  "Supabase": { bg: "bg-[#051a0d]", ring: "ring-1 ring-emerald-500/50" },
  "Firebase": { bg: "bg-[#1a0f02]", ring: "ring-1 ring-amber-500/50" },
  // Tools
  "Git": { bg: "bg-[#1a0505]", ring: "ring-1 ring-red-500/50" },
  "GitHub": { bg: "bg-[#0c0c0c]", ring: "ring-1 ring-white/15" },
  "Docker": { bg: "bg-[#041526]", ring: "ring-1 ring-blue-500/50" },
  "Linux": { bg: "bg-[#1a1800]", ring: "ring-1 ring-yellow-500/40" },
  "Ubuntu": { bg: "bg-[#1a0c03]", ring: "ring-1 ring-orange-500/50" },
  "Figma": { bg: "bg-[#12041f]", ring: "ring-1 ring-purple-400/50" },
  "VS Code": { bg: "bg-[#051428]", ring: "ring-1 ring-blue-400/50" },
  "Postman": { bg: "bg-[#1a0e03]", ring: "ring-1 ring-orange-500/50" },
  "Stripe": { bg: "bg-[#06103a]", ring: "ring-1 ring-indigo-500/50" },
  "Anaconda": { bg: "bg-[#041a08]", ring: "ring-1 ring-green-400/50" },
  "AutoCAD": { bg: "bg-[#1a0505]", ring: "ring-1 ring-red-500/50" },
};

const DEFAULT_SKILL_COLOR = { bg: "bg-[#0d0d1a]", ring: "ring-1 ring-purple-700/30" };

/* ── animation helper ──────────────────────────────────── */
const fadeUp = (delay = 0) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, delay, ease: "easeOut" } },
});

/* ════════════════════════════════════════════════════════ */
export const Skills = () => {
  const [activeTab, setActiveTab] = useState<SkillCategory | "All">("All");
  const [query, setQuery] = useState("");

  /* tab count badges */
  const counts = useMemo(() => {
    const map: Record<string, number> = { All: SKILL_DATA.length };
    SKILL_DATA.forEach((s) => {
      map[s.category] = (map[s.category] ?? 0) + 1;
    });
    return map;
  }, []);

  /* filtered skill list */
  const filtered = useMemo(() =>
    SKILL_DATA.filter((s) => {
      const matchTab = activeTab === "All" || s.category === activeTab;
      const matchQuery = s.skill_name.toLowerCase().includes(query.toLowerCase());
      return matchTab && matchQuery;
    }),
    [activeTab, query]
  );

  /* grouped for "All" tab dividers */
  const groups = useMemo(() => {
    if (activeTab !== "All") return null;
    const order: SkillCategory[] = ["Languages", "Frameworks", "Databases", "Tools"];
    return order
      .map((cat) => ({
        category: cat,
        skills: filtered.filter((s) => s.category === cat),
      }))
      .filter((g) => g.skills.length > 0);
  }, [activeTab, filtered]);

  return (
    <section
      id="skills"
      className="relative flex flex-col items-center justify-center pt-[100px] pb-24 overflow-hidden scroll-mt-[70px]"
    >
      {/* background video */}
      <div className="w-full h-full absolute pointer-events-none">
        <div className="w-full h-full opacity-30 absolute flex items-center justify-center">
          <video className="w-full h-auto" preload="false" playsInline loop muted autoPlay>
            <source src="/videos/skills-bg.webm" type="video/webm" />
          </video>
        </div>
      </div>

      {/* ── HEADER ── */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.25 }}
        className="relative z-10 flex flex-col items-center text-center px-4 w-full"
      >
        {/* pill badge */}
        <motion.div variants={fadeUp(0)} className="mb-5">
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] text-gray-300 tracking-wide"
            style={{ border: "1px solid rgba(112,66,248,0.55)", background: "rgba(112,66,248,0.08)" }}
          >
            ✦ What I Build With
          </span>
        </motion.div>

        {/* heading — pure white, no gradient */}
        <motion.h2
          variants={fadeUp(0.08)}
          className="font-bold text-white mb-3"
          style={{ fontSize: "42px", lineHeight: 1.2, color: "#ffffff" }}
        >
          Technical Skills &amp; Tools
        </motion.h2>


        {/* ── search bar ── */}
        <motion.div
          variants={fadeUp(0.25)}
          className="relative w-full mb-8"
          style={{ maxWidth: "380px" }}
        >
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
            style={{ color: "rgba(255,255,255,0.35)" }}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-4.35-4.35M17 11a6 6 0 11-12 0 6 6 0 0112 0z"
            />
          </svg>
          <input
            type="text"
            placeholder="Search skills..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-sm text-white placeholder-[rgba(255,255,255,0.35)] outline-none transition-all duration-200"
            style={{
              borderRadius: "999px",
              background: "rgba(10,7,24,0.75)",
              border: "1px solid rgba(255,255,255,0.5)",
              backdropFilter: "blur(6px)",
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.9)";
              e.currentTarget.style.boxShadow = "0 0 0 3px rgba(255,255,255,0.2)";
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "1px solid rgba(255,255,255,0.5)";
              e.currentTarget.style.boxShadow = "none";
            }}
          />
        </motion.div>

        {/* ── filter tabs (single row, no wrap) ── */}
        <motion.div
          variants={fadeUp(0.3)}
          className="flex items-center gap-2 mb-12"
          style={{ flexWrap: "nowrap", overflowX: "auto" }}
        >
          {CATEGORIES.map(({ label, value }) => {
            const isActive = activeTab === value;
            return (
              <button
                key={value}
                onClick={() => {
                  setActiveTab(value);
                  setQuery(""); // Clear the search bar when switching tabs
                }}
                style={{
                  whiteSpace: "nowrap",
                  padding: "8px 14px",
                  fontSize: "14px",
                  borderRadius: "999px",
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  transition: "all 0.2s ease",
                  cursor: "pointer",
                  border: isActive
                    ? "1px solid transparent"
                    : "1px solid rgba(112,66,248,0.4)",
                  background: isActive
                    ? "linear-gradient(135deg,#7c3aed,#0891b2)"
                    : "rgba(10,7,24,0.6)",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.85)",
                  boxShadow: isActive ? "0 4px 18px rgba(124,58,237,0.35)" : "none",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#fff";
                    e.currentTarget.style.borderColor = "rgba(255,255,255,0.8)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "rgba(255,255,255,0.85)";
                    e.currentTarget.style.borderColor = "rgba(112,66,248,0.4)";
                  }
                }}
              >
                {label}
                <span
                  style={{
                    fontSize: "11px",
                    padding: "1px 6px",
                    borderRadius: "999px",
                    fontWeight: 700,
                    background: isActive ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.15)",
                    color: isActive ? "#fff" : "#f1f5f9",
                  }}
                >
                  {counts[value] ?? 0}
                </span>
              </button>
            );
          })}
        </motion.div>
      </motion.div>

      {/* ── SKILL GRID ── */}
      <div className="relative z-10 w-full px-4" style={{ maxWidth: "1020px" }}>
        {filtered.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
            style={{ color: "rgba(255,255,255,0.35)", fontSize: "14px" }}
          >
            No skills matched your search.
          </motion.div>
        ) : activeTab === "All" && groups ? (
          /* All tab — groups with dividers */
          <div className="flex flex-col gap-10">
            {groups.map(({ category, skills }) => (
              <div key={category}>
                {/* category divider */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                  <span
                    style={{
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                    }}
                  >
                    {CATEGORY_LABELS[category]}
                  </span>
                  <div
                    className="flex-1 h-px"
                    style={{ background: "rgba(255,255,255,0.2)" }}
                  />
                </div>

                {/* cards */}
                <SkillGrid skills={skills} />
              </div>
            ))}
          </div>
        ) : (
          /* single category tab — flat grid */
          <SkillGrid skills={filtered} />
        )}
      </div>
    </section>
  );
};

/* ── skill grid wrapper ─────────────────────────────────── */
const SkillGrid = ({ skills }: { skills: typeof SKILL_DATA }) => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))",
        gap: "14px",
      }}
    >
      {skills.map((skill, i) => (
        <SkillCard key={skill.skill_name} skill={skill} index={i} />
      ))}
    </div>
  );
};

/* ── individual skill card ─────────────────────────────── */
const SkillCard = ({
  skill,
  index,
}: {
  skill: (typeof SKILL_DATA)[number];
  index: number;
}) => {
  const colors = SKILL_COLORS[skill.skill_name] ?? DEFAULT_SKILL_COLOR;

  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.35, delay: index * 0.025 }}
      className="group flex flex-col items-center gap-2.5 p-4 cursor-default"
      style={{
        borderRadius: "16px",
        background: "rgba(10,7,24,0.55)",
        border: "1px solid rgba(112,66,248,0.2)",
        backdropFilter: "blur(6px)",
        transition: "transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      whileHover={{
        y: -3,
        transition: { duration: 0.18 },
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,0.65)";
        (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(124,58,237,0.2)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderColor = "rgba(112,66,248,0.2)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* icon box — 54×54 with skill-specific dark tint */}
      <div
        className={`flex items-center justify-center ${colors.bg} ${colors.ring}`}
        style={{
          width: "54px",
          height: "54px",
          borderRadius: "14px",
        }}
      >
        <Image
          src={`/skills/${skill.image}`}
          alt={skill.skill_name}
          width={34}
          height={34}
          className="object-contain"
        />
      </div>

      {/* skill name */}
      <span
        className="text-center font-medium leading-tight"
        style={{ fontSize: "13px", color: "#ffffff" }}
      >
        {skill.skill_name}
      </span>
    </motion.div>
  );
};