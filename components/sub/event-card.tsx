"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { HiOutlineExternalLink } from "react-icons/hi";
import type { EventItem } from "@/data/events";

interface EventCardProps {
  event: EventItem;
  index: number;
}

export const EventCard = ({ event }: EventCardProps) => {
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
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="shrink-0 snap-start flex flex-col rounded-[14px] overflow-hidden cursor-pointer w-[calc(100vw-80px)] md:w-[calc((min(100vw,1200px)-80px)/2.3)] lg:w-[calc((min(100vw,1200px)-80px)/3.3)]"
      style={{
        height: "420px",
        border: `1px solid ${hovered ? accentAlpha(0.45) : "rgba(255,255,255,0.07)"}`,
        background: "#0f1320",
        transition: "border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        boxShadow: hovered
          ? `0 20px 48px rgba(0,0,0,0.6), 0 0 0 1px ${accentAlpha(0.2)}`
          : "0 4px 12px rgba(0,0,0,0.25)",
        display: "flex",
        flexDirection: "column",
        willChange: "transform",
      }}
    >
      {/* ── IMAGE AREA ── */}
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
            height: "2px",
            zIndex: 3,
            background: `linear-gradient(90deg, transparent, ${accentAlpha(0.6)}, transparent)`,
            transition: "opacity 0.3s ease",
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Real photo — eager loaded, never lazy so it never disappears */}
        {!imgError ? (
          <Image
            src={event.image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) calc(100vw - 80px), (max-width: 1024px) calc((100vw - 80px) / 2.3), calc((min(100vw, 1200px) - 96px) / 3.3)"
            className="object-cover object-top"
            loading="eager"
            priority={false}
            style={{
              transition: "transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
            }}
            onError={() => setImgError(true)}
          />
        ) : (
          /* Fallback gradient when image fails */
          <div style={{ position: "absolute", inset: 0, background: event.bgGradient }} />
        )}

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, rgba(0,0,0,0.0) 0%, rgba(0,0,0,0.15) 50%, rgba(0,0,0,0.80) 100%)",
            zIndex: 1,
          }}
        />

        {/* Institute label */}
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
            color: "rgba(255,255,255,0.55)",
            textTransform: "uppercase",
            margin: 0,
          }}
        >
          {event.institute}
        </p>

        {/* ★ Featured badge */}
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
                ? "0 0 20px rgba(184,245,66,0.55)"
                : "0 0 10px rgba(184,245,66,0.25)",
              transition: "box-shadow 0.3s ease",
            }}
          >
            ★
          </div>
        )}
      </div>

      {/* ── BODY ── */}
      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          borderLeft: `2px solid ${hovered ? event.accent : accentAlpha(0.5)}`,
          boxShadow: `-3px 0 10px ${accentAlpha(hovered ? 0.3 : 0.15)}`,
          padding: "16px 16px 16px 14px",
          marginLeft: "16px",
          overflow: "hidden",
          transition: "border-color 0.3s ease, box-shadow 0.3s ease",
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

        {/* Role badge + cert link */}
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
              background: accentAlpha(0.12),
              color: event.accent,
              border: `1px solid ${accentAlpha(0.25)}`,
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
    </div>
  );
};
