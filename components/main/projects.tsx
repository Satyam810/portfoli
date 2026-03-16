"use client";

import {
  useState,
  useRef,
  useCallback,
  useEffect,
  useMemo,
} from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { CANVAS_PROJECTS, ProjectItem } from "@/data/projects";
import { ProjectPreviewModal } from "@/components/sub/project-preview-modal";

// ─── constants ────────────────────────────────────────────────────────────────
const SNAP_GRID = 28;
const CANVAS_H_DESKTOP = 640;
const CANVAS_H_MOBILE = 520;
const CARD_W = 284;
const CARD_H = 340;

const STATUS_COLORS: Record<string, string> = {
  Live: "#b8f542",
  WIP: "#f6ad55",
  Academic: "#67e8f9",
};

const FILTER_CATEGORIES = ["All", "ML", "Full-Stack", "AI", "Backend", "Data Science"];

// ─── injected CSS ──────────────────────────────────────────────────────────
const GLOBAL_CSS = `
@keyframes sparkle-pop {
  0%   { transform: scale(0) rotate(0deg);   opacity: 1; }
  60%  { transform: scale(1.2) rotate(60deg); opacity: 0.9; }
  100% { transform: scale(0) rotate(120deg); opacity: 0; }
}
.sparkle-particle {
  position: absolute;
  pointer-events: none;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  animation: sparkle-pop 0.7s ease forwards;
}
@keyframes pulse-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50%       { opacity: 0.4; transform: scale(0.7); }
}
@keyframes dash-flow {
  to { stroke-dashoffset: -22; }
}
@keyframes drag-bounce {
  0%, 100% { transform: translateY(0) rotate(-8deg); }
  50%       { transform: translateY(-6px) rotate(8deg); }
}
@keyframes card-glow-pulse {
  0%, 100% { box-shadow: 0 0 0px transparent; }
  50%       { box-shadow: 0 0 20px var(--accent-color); }
}
`;

// ─── helper: clamp ───────────────────────────────────────────────────────────
const clamp = (v: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, v));

// ─── Sparkle spawner ─────────────────────────────────────────────────────────
function spawnSparkles(container: HTMLElement, x: number, y: number, color: string) {
  const COUNT = 7;
  for (let i = 0; i < COUNT; i++) {
    const el = document.createElement("div");
    el.className = "sparkle-particle";
    const angle = (360 / COUNT) * i;
    const dist = 22 + Math.random() * 22;
    const rad = (angle * Math.PI) / 180;
    el.style.cssText = `
      left: ${x + Math.cos(rad) * dist}px;
      top:  ${y + Math.sin(rad) * dist}px;
      background: ${color};
      animation-delay: ${i * 0.04}s;
    `;
    container.appendChild(el);
    setTimeout(() => el.remove(), 800);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// DraggableCard
// ═══════════════════════════════════════════════════════════════════════════════
interface CardProps {
  project: ProjectItem;
  pos: { x: number; y: number };
  snapMode: boolean;
  canvasRef: React.RefObject<HTMLDivElement>;
  onDragEnd: (id: number, pos: { x: number; y: number }) => void;
  onPreview: (project: ProjectItem) => void;
  onDragStart: (id: number) => void;
  index: number;
  zIndex: number;
}

const DraggableCard = ({
  project,
  pos,
  snapMode,
  canvasRef,
  onDragEnd,
  onPreview,
  onDragStart,
  index,
  zIndex,
}: CardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);
  const offset = useRef({ x: 0, y: 0 });
  const currentPos = useRef(pos);
  const [isDragging, setIsDragging] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [imgHovered, setImgHovered] = useState(false);

  const snap = useCallback((v: number) =>
    snapMode ? Math.round(v / SNAP_GRID) * SNAP_GRID : v, [snapMode]);

  const onPointerDown = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if ((e.target as HTMLElement).closest("a, button")) return;
      dragging.current = true;
      setIsDragging(true);
      onDragStart(project.id);
      const rect = cardRef.current!.getBoundingClientRect();
      offset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
      cardRef.current!.setPointerCapture(e.pointerId);

      if (canvasRef.current) {
        const canvasRect = canvasRef.current.getBoundingClientRect();
        spawnSparkles(
          canvasRef.current,
          e.clientX - canvasRect.left,
          e.clientY - canvasRect.top,
          project.accent
        );
      }
    },
    [canvasRef, project.accent, project.id, onDragStart]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (!dragging.current || !canvasRef.current) return;
      const canvas = canvasRef.current.getBoundingClientRect();
      const rawX = e.clientX - canvas.left - offset.current.x;
      const rawY = e.clientY - canvas.top - offset.current.y;
      const x = snap(clamp(rawX, 0, canvas.width - CARD_W));
      const y = snap(clamp(rawY, 0, canvas.height - CARD_H));
      currentPos.current = { x, y };
      if (cardRef.current) {
        cardRef.current.style.left = `${x}px`;
        cardRef.current.style.top = `${y}px`;
      }
    },
    [canvasRef, snap]
  );

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;
    setIsDragging(false);
    onDragEnd(project.id, currentPos.current);
  }, [project.id, onDragEnd]);

  const hasImage = Boolean(project.image);

  return (
    <motion.div
      ref={cardRef}
      initial={{ scale: 0.82, y: 24, opacity: 0 }}
      animate={{ scale: 1, y: 0, opacity: 1 }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        position: "absolute",
        left: pos.x,
        top: pos.y,
        width: CARD_W,
        cursor: isDragging ? "grabbing" : "grab",
        userSelect: "none",
        zIndex: isDragging ? 60 : isHovered ? 20 : zIndex,
        borderRadius: 18,
        background: "rgba(11,9,26,0.94)",
        border: isDragging
          ? `1.5px solid ${project.accent}`
          : isHovered
          ? `1px solid ${project.accent}60`
          : "1px solid rgba(255,255,255,0.08)",
        boxShadow: isDragging
          ? `0 0 36px ${project.accent}55, 0 16px 48px rgba(0,0,0,0.6)`
          : isHovered
          ? `0 8px 32px rgba(0,0,0,0.5), 0 0 18px ${project.accent}28`
          : "0 4px 20px rgba(0,0,0,0.4)",
        backdropFilter: "blur(12px)",
        transform: isHovered && !isDragging ? "translateY(-3px)" : "translateY(0)",
        transition: isDragging
          ? "border 0.1s, box-shadow 0.1s"
          : "border 0.25s, box-shadow 0.25s, transform 0.25s",
        overflow: "hidden",
        // Top accent stripe
        borderTop: `2.5px solid ${project.accent}`,
      }}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
    >
      {/* ── TOP: image or icon ── */}
      {hasImage ? (
        <div
          className="relative overflow-hidden"
          style={{ height: 136 }}
          onMouseEnter={() => setImgHovered(true)}
          onMouseLeave={() => setImgHovered(false)}
        >
          <div
            style={{
              transition: "transform 0.4s ease",
              transform: imgHovered ? "scale(1.06)" : "scale(1)",
              height: "100%",
              position: "relative",
            }}
          >
            <Image
              src={project.image!}
              alt={project.title}
              fill
              className="object-cover object-top"
              draggable={false}
            />
          </div>
          {/* gradient overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(to bottom, transparent 45%, rgba(11,9,26,0.94) 100%)",
            }}
          />
          {/* preview button on hover */}
          <AnimatePresence>
            {imgHovered && (
              <motion.button
                initial={{ opacity: 0, scale: 0.75 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.75 }}
                transition={{ duration: 0.15 }}
                onClick={() => onPreview(project)}
                style={{
                  position: "absolute",
                  top: 8,
                  right: 8,
                  padding: "4px 11px",
                  borderRadius: 8,
                  fontSize: 11,
                  fontWeight: 700,
                  background: "rgba(0,0,0,0.7)",
                  border: `1px solid ${project.accent}90`,
                  color: project.accent,
                  backdropFilter: "blur(6px)",
                  cursor: "pointer",
                  letterSpacing: "0.04em",
                }}
              >
                ⤢ preview
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      ) : (
        /* Icon card top */
        <div
          style={{
            height: 136,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: project.iconBg,
            position: "relative",
          }}
        >
          <span style={{ fontSize: 48 }}>{project.icon}</span>
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: `radial-gradient(circle at 50% 60%, ${project.accent}20 0%, transparent 70%)`,
            }}
          />
        </div>
      )}

      {/* ── CARD BODY ── */}
      <div style={{ padding: "11px 14px 14px" }}>
        {/* number + type */}
        <p
          style={{
            fontFamily: "monospace",
            fontSize: 10,
            color: `${project.accent}bb`,
            marginBottom: 4,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          {project.number} · {project.type}
        </p>

        {/* title */}
        <h3
          style={{
            fontSize: 15,
            fontWeight: 700,
            color: "#f0f0f8",
            marginBottom: 5,
            lineHeight: 1.28,
          }}
        >
          {project.title}
        </h3>

        {/* short desc — 2 line clamp */}
        <p
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.48)",
            lineHeight: 1.55,
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
            marginBottom: 9,
          }}
        >
          {project.shortDesc}
        </p>

        {/* tech pills */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            marginBottom: 11,
          }}
        >
          {project.tech.slice(0, 3).map((t) => (
            <span
              key={t}
              style={{
                fontSize: 10,
                padding: "2px 8px",
                borderRadius: 999,
                border: `1px solid ${project.accent}30`,
                color: `${project.accent}cc`,
                background: `${project.accent}0a`,
              }}
            >
              {t}
            </span>
          ))}
          {project.tech.length > 3 && (
            <span
              style={{
                fontSize: 10,
                padding: "2px 7px",
                borderRadius: 999,
                border: "1px solid rgba(255,255,255,0.08)",
                color: "rgba(255,255,255,0.3)",
              }}
            >
              +{project.tech.length - 3}
            </span>
          )}
        </div>

        {/* live pulse + footer buttons */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* status indicator */}
          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span
              style={{
                width: 7,
                height: 7,
                borderRadius: "50%",
                background: STATUS_COLORS[project.status] ?? "#a78bfa",
                display: "inline-block",
                animation:
                  project.status === "Live"
                    ? "pulse-dot 1.8s ease-in-out infinite"
                    : "none",
              }}
            />
            <span
              style={{
                fontSize: 10,
                color: STATUS_COLORS[project.status] ?? "#a78bfa",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              {project.status}
            </span>
          </div>

          {/* action buttons */}
          <div style={{ display: "flex", gap: 6 }}>
            <button
              onClick={() => onPreview(project)}
              style={{
                fontSize: 11,
                fontWeight: 700,
                padding: "4px 11px",
                borderRadius: 8,
                background: project.accent,
                color: "#07070f",
                border: "none",
                cursor: "pointer",
                letterSpacing: "0.02em",
                transition: "opacity 0.15s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              View ↗
            </button>
            <a
              href={project.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 11,
                fontWeight: 600,
                padding: "4px 10px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.65)",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                transition: "border-color 0.15s, color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.35)";
                e.currentTarget.style.color = "rgba(255,255,255,0.9)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
                e.currentTarget.style.color = "rgba(255,255,255,0.65)";
              }}
            >
              Code →
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// SVG Connector Lines — animated flowing dash
// ═══════════════════════════════════════════════════════════════════════════════
interface ConnectorProps {
  positions: { x: number; y: number }[];
  projects: ProjectItem[];
}

const ConnectorLines = ({ positions, projects }: ConnectorProps) => {
  const lines: React.ReactNode[] = [];
  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i];
    const b = positions[i + 1];
    const cx1 = a.x + CARD_W / 2;
    const cy1 = a.y + CARD_H / 2;
    const cx2 = b.x + CARD_W / 2;
    const cy2 = b.y + CARD_H / 2;
    lines.push(
      <g key={i}>
        {/* shadow line */}
        <line
          x1={cx1} y1={cy1} x2={cx2} y2={cy2}
          stroke={projects[i].accent}
          strokeWidth={3}
          strokeOpacity={0.08}
        />
        {/* animated dash */}
        <line
          x1={cx1} y1={cy1} x2={cx2} y2={cy2}
          stroke={projects[i].accent}
          strokeWidth={1.4}
          strokeDasharray="6 5"
          strokeOpacity={0.45}
          style={{
            animation: `dash-flow ${1.8 + i * 0.4}s linear infinite`,
          }}
        />
        {/* dot endpoints */}
        <circle cx={cx1} cy={cy1} r={3} fill={projects[i].accent} opacity={0.5} />
        <circle cx={cx2} cy={cy2} r={3} fill={projects[i].accent} opacity={0.5} />
      </g>
    );
  }
  return (
    <svg
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 5,
      }}
    >
      {lines}
    </svg>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Mini-Map
// ═══════════════════════════════════════════════════════════════════════════════
interface MiniMapProps {
  positions: { x: number; y: number }[];
  projects: ProjectItem[];
  canvasW: number;
  canvasH: number;
}

const MINIMAP_W = 136;
const MINIMAP_H = 84;

const MiniMap = ({ positions, projects, canvasW, canvasH }: MiniMapProps) => (
  <div
    style={{
      position: "absolute",
      bottom: 14,
      right: 14,
      width: MINIMAP_W,
      height: MINIMAP_H,
      borderRadius: 10,
      background: "rgba(7,7,15,0.88)",
      border: "1px solid rgba(255,255,255,0.12)",
      backdropFilter: "blur(8px)",
      overflow: "hidden",
      zIndex: 30,
    }}
  >
    <span
      style={{
        position: "absolute",
        top: 5,
        left: 7,
        fontSize: 9,
        fontFamily: "monospace",
        color: "rgba(255,255,255,0.4)",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
      }}
    >
      MAP
    </span>
    {positions.map((p, i) => {
      const mx = (p.x / canvasW) * (MINIMAP_W - 12) + 6;
      const my = (p.y / canvasH) * (MINIMAP_H - 12) + 6;
      return (
        <div
          key={i}
          style={{
            position: "absolute",
            left: mx,
            top: my,
            width: 10,
            height: 6,
            borderRadius: 3,
            background: projects[i].accent,
            opacity: 0.85,
            transition: "left 0.1s, top 0.1s",
            boxShadow: `0 0 6px ${projects[i].accent}99`,
          }}
        />
      );
    })}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Floating Toolbar — inside canvas
// ═══════════════════════════════════════════════════════════════════════════════
interface FloatingToolbarProps {
  snapMode: boolean;
  setSnapMode: (v: boolean) => void;
  onReset: () => void;
}

const FloatingToolbar = ({ snapMode, setSnapMode, onReset }: FloatingToolbarProps) => (
  <div
    style={{
      position: "absolute",
      top: 14,
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      alignItems: "center",
      gap: 6,
      background: "rgba(7,7,15,0.82)",
      border: "1px solid rgba(255,255,255,0.12)",
      borderRadius: 999,
      padding: "5px 8px",
      backdropFilter: "blur(10px)",
      zIndex: 30,
    }}
  >
    {/* Free mode */}
    <button
      title="Free Drag"
      onClick={() => setSnapMode(false)}
      style={{
        width: 28, height: 28,
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
        cursor: "pointer",
        border: "none",
        background: !snapMode ? "linear-gradient(135deg,#7c3aed,#0891b2)" : "transparent",
        color: !snapMode ? "#fff" : "rgba(255,255,255,0.4)",
        transition: "all 0.2s",
        boxShadow: !snapMode ? "0 2px 12px rgba(124,58,237,0.5)" : "none",
      }}
    >
      ◎
    </button>

    {/* divider */}
    <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />

    {/* Snap mode */}
    <button
      title="Snap to Grid"
      onClick={() => setSnapMode(true)}
      style={{
        width: 28, height: 28,
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 13,
        cursor: "pointer",
        border: "none",
        background: snapMode ? "linear-gradient(135deg,#7c3aed,#0891b2)" : "transparent",
        color: snapMode ? "#fff" : "rgba(255,255,255,0.4)",
        transition: "all 0.2s",
        boxShadow: snapMode ? "0 2px 12px rgba(124,58,237,0.5)" : "none",
      }}
    >
      ⊞
    </button>

    {/* divider */}
    <span style={{ width: 1, height: 16, background: "rgba(255,255,255,0.12)" }} />

    {/* Reset */}
    <button
      title="Reset Layout"
      onClick={onReset}
      style={{
        width: 28, height: 28,
        borderRadius: "50%",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 14,
        cursor: "pointer",
        border: "none",
        background: "transparent",
        color: "rgba(255,255,255,0.4)",
        transition: "all 0.2s",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.color = "#b8f542";
        e.currentTarget.style.background = "rgba(184,245,66,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
        e.currentTarget.style.background = "transparent";
      }}
    >
      ⟳
    </button>
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Drag Hint — animated
// ═══════════════════════════════════════════════════════════════════════════════
const DragHint = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 4000);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.5 }}
          style={{
            position: "absolute",
            bottom: 56,
            left: "50%",
            transform: "translateX(-50%)",
            pointerEvents: "none",
            zIndex: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(7,7,15,0.7)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 999,
            padding: "6px 14px",
            backdropFilter: "blur(6px)",
          }}
        >
          <span
            style={{
              fontSize: 18,
              display: "inline-block",
              animation: "drag-bounce 1.2s ease-in-out infinite",
            }}
          >
            ✦
          </span>
          <span
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.06em",
              fontFamily: "monospace",
            }}
          >
            drag to rearrange
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// Mobile Card Grid (below 768px)
// ═══════════════════════════════════════════════════════════════════════════════
const MobileGrid = ({
  projects,
  onPreview,
}: {
  projects: ProjectItem[];
  onPreview: (p: ProjectItem) => void;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(290px, 1fr))",
      gap: 16,
      width: "100%",
      maxWidth: 960,
    }}
  >
    {projects.map((project, i) => (
      <motion.div
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderRadius: 18,
          background: "rgba(11,9,26,0.94)",
          border: `1px solid rgba(255,255,255,0.08)`,
          borderTop: `2.5px solid ${project.accent}`,
          overflow: "hidden",
          boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
        }}
      >
        {project.image ? (
          <div style={{ height: 136, position: "relative", overflow: "hidden" }}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover object-top"
            />
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, transparent 45%, rgba(11,9,26,0.94) 100%)",
              }}
            />
          </div>
        ) : (
          <div
            style={{
              height: 120,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: project.iconBg,
              fontSize: 44,
            }}
          >
            {project.icon}
          </div>
        )}
        <div style={{ padding: "12px 16px 16px" }}>
          <p
            style={{
              fontFamily: "monospace",
              fontSize: 10,
              color: `${project.accent}bb`,
              marginBottom: 4,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            {project.number} · {project.type}
          </p>
          <h3 style={{ fontSize: 16, fontWeight: 700, color: "#f0f0f8", marginBottom: 6 }}>
            {project.title}
          </h3>
          <p
            style={{
              fontSize: 12,
              color: "rgba(255,255,255,0.48)",
              lineHeight: 1.55,
              marginBottom: 10,
            }}
          >
            {project.shortDesc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 12 }}>
            {project.tech.slice(0, 3).map((t) => (
              <span
                key={t}
                style={{
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 999,
                  border: `1px solid ${project.accent}30`,
                  color: `${project.accent}cc`,
                  background: `${project.accent}0a`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={() => onPreview(project)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 10,
                background: project.accent,
                color: "#07070f",
                fontWeight: 700,
                fontSize: 13,
                border: "none",
                cursor: "pointer",
              }}
            >
              View ↗
            </button>
            <a
              href={project.githubUrl ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.16)",
                color: "rgba(255,255,255,0.7)",
                fontWeight: 600,
                fontSize: 13,
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              Code →
            </a>
          </div>
        </div>
      </motion.div>
    ))}
  </div>
);

// ═══════════════════════════════════════════════════════════════════════════════
// Main Projects Section
// ═══════════════════════════════════════════════════════════════════════════════
export const Projects = () => {
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    CANVAS_PROJECTS.map((p) => p.defaultPos)
  );
  const [snapMode, setSnapMode] = useState(false);
  const [previewProject, setPreviewProject] = useState<ProjectItem | null>(null);
  const [canvasW, setCanvasW] = useState(1000);
  const [isMobile, setIsMobile] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");
  const [zIndices, setZIndices] = useState<number[]>(
    CANVAS_PROJECTS.map((_, i) => 10 + i)
  );
  const canvasRef = useRef<HTMLDivElement>(null);

  /* measure canvas & detect mobile */
  useEffect(() => {
    const measure = () => {
      if (canvasRef.current) setCanvasW(canvasRef.current.clientWidth);
      setIsMobile(window.innerWidth < 768);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  /* inject CSS once */
  useEffect(() => {
    if (document.getElementById("projects-css")) return;
    const el = document.createElement("style");
    el.id = "projects-css";
    el.textContent = GLOBAL_CSS;
    document.head.appendChild(el);
  }, []);

  const handleDragStart = useCallback((id: number) => {
    setZIndices((prev) => {
      const maxZ = Math.max(...prev);
      return CANVAS_PROJECTS.map((p, i) =>
        p.id === id ? maxZ + 1 : prev[i]
      );
    });
  }, []);

  const handleDragEnd = useCallback(
    (id: number, pos: { x: number; y: number }) => {
      setPositions((prev) =>
        prev.map((p, i) => (CANVAS_PROJECTS[i].id === id ? pos : p))
      );
    },
    []
  );

  const handleReset = () => {
    setPositions(CANVAS_PROJECTS.map((p) => p.defaultPos));
    setZIndices(CANVAS_PROJECTS.map((_, i) => 10 + i));
  };

  const canvasH = isMobile ? CANVAS_H_MOBILE : CANVAS_H_DESKTOP;

  /* filter */
  const visibleProjects = useMemo(() => {
    if (activeCategory === "All") return CANVAS_PROJECTS;
    return CANVAS_PROJECTS.filter(
      (p) =>
        p.type.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.tech.some((t) => t.toLowerCase().includes(activeCategory.toLowerCase()))
    );
  }, [activeCategory]);

  const visiblePositions = useMemo(
    () =>
      CANVAS_PROJECTS.map((p, i) =>
        visibleProjects.find((vp) => vp.id === p.id) ? positions[i] : null
      ),
    [visibleProjects, positions]
  );

  return (
    <>
      {/* ── Preview Modal ── */}
      <ProjectPreviewModal
        project={previewProject}
        onClose={() => setPreviewProject(null)}
      />

      <section
        id="projects"
        className="flex flex-col items-center justify-center py-20 px-4 scroll-mt-[70px]"
      >
        {/* ── Section Heading ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="flex flex-col items-center mb-6"
        >
          {/* pill badge */}
          <span
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] text-gray-300 tracking-wide mb-5"
            style={{
              border: "1px solid rgba(112,66,248,0.55)",
              background: "rgba(112,66,248,0.08)",
            }}
          >
            ✦ What I&apos;ve Built
          </span>

          <h2
            className="font-bold text-white text-center"
            style={{ fontSize: "clamp(34px, 5vw, 52px)", lineHeight: 1.12 }}
          >
            Projects
          </h2>

          {/* simplified short tagline */}
          <p
            className="text-center max-w-[600px] mt-3"
            style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", fontWeight: 500 }}
          >
            Building robust solutions from idea to deployment.
          </p>
        </motion.div>

        {/* ── Category Filter Bar ── */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.18, duration: 0.4 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-6"
        >
          {FILTER_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: "6px 16px",
                borderRadius: 999,
                fontSize: 12,
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.22s",
                background:
                  activeCategory === cat
                    ? "linear-gradient(135deg,#7c3aed,#0891b2)"
                    : "rgba(10,7,24,0.7)",
                border:
                  activeCategory === cat
                    ? "1px solid transparent"
                    : "1px solid rgba(255,255,255,0.3)",
                color: activeCategory === cat ? "#fff" : "rgba(255,255,255,0.85)",
                boxShadow:
                  activeCategory === cat
                    ? "0 4px 16px rgba(124,58,237,0.35)"
                    : "none",
                letterSpacing: "0.03em",
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* ── Canvas or Mobile Grid ── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="w-full flex justify-center"
          style={{ maxWidth: 1160 }}
        >
          {isMobile ? (
            <MobileGrid
              projects={activeCategory === "All" ? CANVAS_PROJECTS : visibleProjects}
              onPreview={setPreviewProject}
            />
          ) : (
            <div
              ref={canvasRef}
              style={{
                position: "relative",
                width: "100%",
                height: canvasH,
                borderRadius: 22,
                background: "#07070f",
                border: "1px solid rgba(255,255,255,0.07)",
                overflow: "hidden",
                backgroundImage:
                  "radial-gradient(circle, rgba(255,255,255,0.10) 1px, transparent 1px)",
                backgroundSize: `${SNAP_GRID}px ${SNAP_GRID}px`,
                boxShadow:
                  "inset 0 0 80px rgba(112,66,248,0.07), 0 20px 60px rgba(0,0,0,0.5)",
              }}
            >
              {/* SVG connector lines */}
              <ConnectorLines positions={positions} projects={CANVAS_PROJECTS} />

              {/* Cards */}
              {CANVAS_PROJECTS.map((project, i) => {
                const isVisible = visibleProjects.find((vp) => vp.id === project.id);
                if (!isVisible) return null;
                return (
                  <DraggableCard
                    key={project.id}
                    project={project}
                    pos={positions[i]}
                    snapMode={snapMode}
                    canvasRef={canvasRef}
                    onDragEnd={handleDragEnd}
                    onDragStart={handleDragStart}
                    onPreview={setPreviewProject}
                    index={i}
                    zIndex={zIndices[i]}
                  />
                );
              })}

              {/* Floating toolbar */}
              <FloatingToolbar
                snapMode={snapMode}
                setSnapMode={setSnapMode}
                onReset={handleReset}
              />

              {/* Mini-map */}
              <MiniMap
                positions={positions}
                projects={CANVAS_PROJECTS}
                canvasW={canvasW}
                canvasH={canvasH}
              />

              {/* Drag hint */}
              <DragHint />
            </div>
          )}
        </motion.div>

        {/* ── Interesting line after projects ── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col items-center mt-10 gap-3"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              color: "rgba(255,255,255,0.18)",
              fontSize: 13,
              fontFamily: "monospace",
              letterSpacing: "0.08em",
            }}
          >
            <span style={{ flex: 1, height: 1, width: 80, background: "linear-gradient(to right, transparent, rgba(255,255,255,0.12))" }} />
            ✦
            <span style={{ flex: 1, height: 1, width: 80, background: "linear-gradient(to left, transparent, rgba(255,255,255,0.12))" }} />
          </div>
          <p
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.4)",
              letterSpacing: "0.06em",
              fontFamily: "monospace",
              textAlign: "center",
            }}
          >
            More projects brewing — the best code is always{" "}
            <span style={{ color: "#e5e7eb" }}>yet to be written</span>.
          </p>
        </motion.div>
      </section>
    </>
  );
};