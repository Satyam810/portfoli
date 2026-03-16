"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { HiOutlineExternalLink } from "react-icons/hi";
import type { EventItem } from "@/data/events";

interface EventCardProps {
  event: EventItem;
  index: number;
}

export const EventCard = ({ event, index }: EventCardProps) => {
  const [hovered, setHovered] = useState(false);
  const [imgError, setImgError] = useState(false);

  const accentAlpha = (opacity: number) => {
    const hex = event.accent.replace("#", "");
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r},${g},${b},${opacity})`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, root: undefined, margin: "0px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 snap-start flex flex-col rounded-[14px] overflow-hidden cursor-pointer w-[calc(100vw-80px)] md:w-[calc((min(100vw,1200px)-80px)/2.3)] lg:w-[calc((min(100vw,1200px)-80px)/3.3)]"
      style={{
        height: "420px",
        border: `1px solid ${hovered ? accentAlpha(0.35) : "rgba(255,255,255,0.07)"}`,
        background: "#0f1320",
        cursor: "pointer",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease",
        transform: hovered ? "translateY(-5px)" : "translateY(0)",
        boxShadow: hovered
          ? "0 16px 40px rgba(0,0,0,0.5)"
          : "0 4px 12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* ── IMAGE AREA (55% of card height ≈ 231px) ── */}
      <div
        style={{
          position: "relative",
          height: "231px",
          flexShrink: 0,
          overflow: "hidden",
          background: event.bgGradient,
        }}
      >
        {/* Shimmer top edge */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "1px",
            zIndex: 3,
            background: `linear-gradient(90deg, transparent, ${accentAlpha(0.4)}, transparent)`,
          }}
        />

        {/* Real photo with graceful fallback to bgGradient */}
        {!imgError && (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) calc((100vw - 80px) / 2.3), calc((min(100vw, 1200px) - 96px) / 3.3)"
            className="object-cover object-top"
            style={{
              transition: "transform 0.5s ease",
              transform: hovered ? "scale(1.04)" : "scale(1)",
            }}
            onError={() => setImgError(true)}
          />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.05) 0%, rgba(0,0,0,0.15) 40%, rgba(0,0,0,0.75) 100%)",
            zIndex: 1,
          }}
        />

        {/* Institute label — bottom-left of image */}
        <p
          style={{
            position: "absolute",
            bottom: "10px",
            left: "14px",
            zIndex: 2,
            fontSize: "9px",
            fontFamily: "'DM Mono', monospace",
            fontWeight: 400,
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.45)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {event.institute}
        </p>

        {/* ★ Featured badge — top-right */}
        {event.featured && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              zIndex: 2,
              width: "28px",
              height: "28px",
              borderRadius: "50%",
              background: "rgba(184,245,66,0.15)",
              border: "1px solid rgba(184,245,66,0.45)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#b8f542",
              boxShadow: hovered
                ? "0 0 16px rgba(184,245,66,0.45)"
                : "0 0 10px rgba(184,245,66,0.25)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            ★
          </div>
        )}
      </div>

      {/* ── BODY (45% of card) ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: `2px solid ${event.accent}`,
          boxShadow: `-3px 0 8px ${accentAlpha(0.2)}`,
          padding: "16px 16px 16px 14px",
          marginLeft: "16px",
          overflow: "hidden",
        }}
      >
        {/* Conf label */}
        <p
          style={{
            fontSize: "9px",
            fontFamily: "'DM Mono', monospace",
            fontWeight: 700,
            letterSpacing: "1.5px",
            textTransform: "uppercase",
            color: event.accent,
            marginBottom: "5px",
          }}
        >
          {event.conf}
        </p>

        {/* Event title */}
        <h3
          style={{
            fontSize: "15px",
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            color: "#dde4f0",
            lineHeight: 1.25,
            marginBottom: "5px",
          }}
        >
          {event.title}
        </h3>

        {/* Meta line */}
        <p
          style={{
            fontSize: "10px",
            fontFamily: "'DM Mono', monospace",
            fontWeight: 300,
            color: "#8896aa",
            lineHeight: 1.5,
          }}
        >
          {event.meta}
        </p>

        {/* Role badge and optional certificate link pinned to bottom */}
        <div style={{ marginTop: "auto", paddingTop: "8px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span
            style={{
              display: "inline-block",
              padding: "3px 9px",
              borderRadius: "20px",
              fontSize: "9px",
              fontFamily: "'DM Mono', monospace",
              fontWeight: 700,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              background: accentAlpha(0.09),
              color: event.accent,
              border: `1px solid ${accentAlpha(0.18)}`,
            }}
          >
            {event.badge}
          </span>

          {event.certificateLink && (
            <Link
              href={event.certificateLink}
              target="_blank"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 opacity-70 hover:opacity-100 transition-opacity"
              style={{
                fontSize: "10px",
                color: event.accent,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <HiOutlineExternalLink className="w-4 h-4" />
              <span>Cert</span>
            </Link>
          )}
        </div>
      </div>
    </motion.div>
  );
};
