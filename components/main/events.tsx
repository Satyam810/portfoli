"use client";

import { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/sub/event-card";
import { events } from "@/data/events";

/* ── header stagger variants ───────────────────────── */
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const headerItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ════════════════════════════════════════════════════ */
export const Events = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, scrollLeft: 0 });

  /* ── Manual drag-to-scroll (mouse) ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onMouseDown = (e: MouseEvent) => {
      setIsDragging(true);
      dragStart.current = { x: e.pageX, scrollLeft: track.scrollLeft };
      track.style.cursor = "grabbing";
    };
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const delta = e.pageX - dragStart.current.x;
      track.scrollLeft = dragStart.current.scrollLeft - delta;
    };
    const onMouseUp = () => {
      setIsDragging(false);
      track.style.cursor = "grab";
    };

    track.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
    return () => {
      track.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [isDragging]);

  /* ── Auto-scroll with seamless infinite loop ── */
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    let animFrame: number;
    let speed = 0.6; // px per frame
    let paused = false;

    const tick = () => {
      if (!paused && track) {
        track.scrollLeft += speed;
        // Seamless loop: when we've scrolled past half, jump back silently
        if (track.scrollLeft >= track.scrollWidth / 2) {
          track.scrollLeft -= track.scrollWidth / 2;
        }
      }
      animFrame = requestAnimationFrame(tick);
    };

    // Pause on hover/touch
    const pause = () => { paused = true; };
    const resume = () => { paused = false; };

    track.addEventListener("mouseenter", pause);
    track.addEventListener("mouseleave", resume);
    track.addEventListener("touchstart", pause, { passive: true });
    track.addEventListener("touchend", resume);

    animFrame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animFrame);
      track.removeEventListener("mouseenter", pause);
      track.removeEventListener("mouseleave", resume);
      track.removeEventListener("touchstart", pause);
      track.removeEventListener("touchend", resume);
    };
  }, []);

  // Duplicate 3× — enough for seamless loop without huge DOM
  const loopedEvents = [...events, ...events, ...events];

  return (
    <section
      id="events"
      className="py-20 overflow-hidden scroll-mt-[70px]"
      style={{ background: "transparent" }}
    >
      <div style={{ width: "100%", maxWidth: "1200px", margin: "0 auto" }}>

        {/* ── HEADER ── */}
        <div style={{ padding: "0 24px" }}>
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-8"
          >
            {/* title */}
            <motion.h2
              variants={headerItem}
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "32px",
                color: "#ffffff",
                letterSpacing: "-1px",
                lineHeight: 1.1,
                marginBottom: "8px",
              }}
            >
              Events &amp; Talks
            </motion.h2>

            {/* subtitle */}
            <motion.p
              variants={headerItem}
              style={{
                fontFamily: "'DM Mono', monospace",
                fontWeight: 400,
                fontSize: "14px",
                color: "#e5e7eb",
              }}
            >
              Where I&apos;ve been. What I&apos;ve built outside the classroom.
            </motion.p>
          </motion.div>
        </div>

        {/* ── SCROLL TRACK ─────────────────────────────── */}
        {/*
          Key fix: images are NOT inside any whileInView motion component,
          so they never get unmounted/remounted during scroll.
          The track uses `overflow-x: scroll` with
          `scroll-behavior: auto` (NOT smooth) so manual drags are instant.
        */}
        <div
          ref={trackRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "scroll",
            scrollBehavior: "auto",   // ← critical: 'smooth' causes lag during auto-scroll
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            cursor: "grab",
            userSelect: "none",
          }}
          className="events-scroll-track"
        >
          {loopedEvents.map((ev, i) => (
            <EventCard
              key={`${ev.id}-${i}`}
              event={ev}
              index={i % events.length}
            />
          ))}
        </div>

        {/* ── SCROLL HINT ── */}
        <div style={{ padding: "0 24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginTop: "16px",
              fontFamily: "'DM Mono', monospace",
              fontSize: "10px",
              color: "#556075",
              userSelect: "none",
              pointerEvents: "none",
            }}
          >
            <span>scroll to explore</span>
            <span className="events-arrow">→</span>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        .events-scroll-track::-webkit-scrollbar { display: none; }
        .events-arrow {
          display: inline-block;
          animation: arrow-slide 1.4s ease-in-out infinite;
        }
        @keyframes arrow-slide {
          0%, 100% { transform: translateX(0); opacity: 0.6; }
          50%       { transform: translateX(5px); opacity: 1; }
        }
      `}</style>
    </section>
  );
};
