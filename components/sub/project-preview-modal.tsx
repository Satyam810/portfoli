"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProjectItem } from "@/data/projects";

interface Props {
  project: ProjectItem | null;
  onClose: () => void;
}

const statusColors: Record<string, string> = {
  Live: "#b8f542",
  WIP: "#f6ad55",
  Academic: "#67e8f9",
};

export const ProjectPreviewModal = ({ project, onClose }: Props) => {
  /* lock body scroll */
  useEffect(() => {
    if (project) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [project]);

  /* close on Escape */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          key="backdrop"
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
          style={{ backdropFilter: "blur(16px)", background: "rgba(7,7,15,0.82)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.22 }}
          onClick={onClose}
        >
          <motion.div
            key="modal"
            className="relative w-full max-w-[700px] rounded-2xl overflow-hidden"
            style={{
              background: "rgba(11,9,26,0.99)",
              border: `1px solid ${project.accent}35`,
              borderTop: `3px solid ${project.accent}`,
              boxShadow: `0 0 80px ${project.accent}18, 0 32px 80px rgba(0,0,0,0.7)`,
              maxHeight: "90vh",
              overflowY: "auto",
            }}
            initial={{ scale: 0.90, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.90, opacity: 0, y: 16 }}
            transition={{ type: "spring", stiffness: 320, damping: 30 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close btn */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all"
              style={{
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                color: "rgba(255,255,255,0.55)",
                fontSize: 14,
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.15)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.07)";
                e.currentTarget.style.color = "rgba(255,255,255,0.55)";
              }}
            >
              ✕
            </button>

            {/* Screenshot or icon hero */}
            {project.image ? (
              <div className="relative w-full h-[240px] overflow-hidden">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(to bottom, transparent 50%, rgba(11,9,26,0.99) 100%)`,
                  }}
                />
              </div>
            ) : (
              <div
                className="w-full h-[160px] flex items-center justify-center text-6xl"
                style={{ background: project.iconBg }}
              >
                {project.icon}
              </div>
            )}

            {/* Body */}
            <div className="p-6">
              {/* number + type */}
              <p
                className="font-mono text-xs mb-1"
                style={{ color: project.accent, letterSpacing: "0.1em", textTransform: "uppercase" }}
              >
                {project.number} — {project.type}
              </p>

              {/* title */}
              <h2 className="text-2xl font-bold text-white mb-3">{project.title}</h2>

              {/* long desc */}
              <p className="text-sm leading-relaxed mb-5" style={{ color: "rgba(255,255,255,0.58)" }}>
                {project.longDesc}
              </p>

              {/* ── Impact metrics row ── */}
              <div
                className="flex gap-3 mb-5 flex-wrap"
                style={{
                  padding: "14px 16px",
                  borderRadius: 14,
                  background: `${project.accent}08`,
                  border: `1px solid ${project.accent}20`,
                }}
              >
                <MetricPill icon="📅" label="Year" value={project.year} accent={project.accent} />
                <MetricPill
                  icon="●"
                  label="Status"
                  value={project.status}
                  accent={statusColors[project.status] ?? "#a78bfa"}
                />
                <MetricPill
                  icon="⚙"
                  label="Stack size"
                  value={`${project.tech.length} techs`}
                  accent={project.accent}
                />
              </div>

              {/* tech stack */}
              <p className="text-xs font-semibold mb-2" style={{ color: "rgba(255,255,255,0.35)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                Tech Stack
              </p>
              <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="px-3 py-1 text-xs font-medium rounded-full"
                    style={{
                      border: `1px solid ${project.accent}40`,
                      color: project.accent,
                      background: `${project.accent}0d`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>

              {/* action buttons */}
              <div className="flex gap-3">
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-sm font-semibold text-center rounded-xl transition-opacity hover:opacity-85"
                    style={{
                      background: project.accent,
                      color: "#07070f",
                    }}
                  >
                    Live Site ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 text-sm font-semibold text-center rounded-xl transition-all hover:bg-white/10"
                    style={{
                      border: "1px solid rgba(255,255,255,0.2)",
                      color: "rgba(255,255,255,0.8)",
                    }}
                  >
                    GitHub →
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ─── sub-components ────────────────────────────────────────────────────────────
const MetricPill = ({
  icon,
  label,
  value,
  accent,
}: {
  icon: string;
  label: string;
  value: string;
  accent: string;
}) => (
  <div className="flex flex-col gap-0.5">
    <span style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.06em", textTransform: "uppercase" }}>
      {label}
    </span>
    <span style={{ fontSize: 14, fontWeight: 700, color: accent, display: "flex", alignItems: "center", gap: 4 }}>
      <span style={{ fontSize: 10 }}>{icon}</span>
      {value}
    </span>
  </div>
);
