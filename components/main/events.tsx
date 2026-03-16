"use client";

import { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { EventCard } from "@/components/sub/event-card";
import { events } from "@/data/events";

/* ── stagger variants ──────────────────────────────────── */
const headerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const headerItem = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

/* ════════════════════════════════════════════════════════ */
export const Events = () => {
  const trackRef = useRef<HTMLDivElement>(null);

  // Duplicate the array 12 times to essentially fake an infinite loop runway
  const loopedEvents = Array(12).fill(events).flat();

  useEffect(() => {
    // Start the scroll perfectly in the middle so the user can scroll 6 loops in either direction
    if (trackRef.current) {
      // Small timeout ensures layout has painted before calculating width
      setTimeout(() => {
        if (trackRef.current) {
          trackRef.current.scrollLeft = trackRef.current.scrollWidth / 2;
        }
      }, 100);
    }
  }, []);

  return (
    <section
      id="events"
      className="py-20 overflow-hidden scroll-mt-[70px]"
      style={{ background: "transparent" }}
    >
      {/* 
        Outer wrapper caps width at 1200px.
        The scroll container is deliberately NOT constrained to the
        max-width so that `calc(100% / 3.3)` resolves correctly
        against the full visible width.
      */}
      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* ── HEADER (unchanged markup) ── */}
        <div style={{ padding: "0 24px" }}>
          <motion.div
            variants={headerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            className="mb-8"
          >
            {/* eyebrow removed */}

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

        {/* ── DRAGGABLE SCROLL TRACK ── */}
        <div
          ref={trackRef}
          className="events-scroll-track"
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            paddingLeft: "24px",
            paddingRight: "24px",
            paddingBottom: "12px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {loopedEvents.map((ev, i) => (
            <EventCard key={`${ev.id}-${i}`} event={ev} index={i} />
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
              opacity: 1,
              transition: "opacity 0.4s ease",
              pointerEvents: "none",
              userSelect: "none",
            }}
          >
            <span>scroll to explore</span>
            <span className="events-arrow">→</span>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        /* Hide WebKit scrollbar on track */
        .events-scroll-track::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};
