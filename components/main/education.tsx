"use client";

import { motion } from "framer-motion";
import { slideInFromTop } from "@/lib/motion";
import { EDUCATION_DATA } from "@/data/education";
import Image from "next/image";
import { useState, useEffect } from "react";

export const Education = () => {
  return (
    <section
      id="education"
      className="relative flex flex-col items-center justify-center pt-24 pb-10 overflow-hidden w-full z-20 scroll-mt-[70px]"
    >
      <div className="w-full flex-col px-4 md:px-10 max-w-[1200px]">
        {/* HEADER */}
        <div className="flex flex-col items-center text-center mb-16 w-full gap-4">
          <motion.div
            variants={slideInFromTop}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center w-fit py-[8px] px-[12px] border border-[#7042f88b] rounded-full"
            style={{ background: "rgba(112,66,248,0.06)" }}
          >
            <span className="text-[14px] text-gray-300 font-medium">
              Academic Journey
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-bold text-white text-[40px] md:text-[50px] leading-tight"
            style={{ fontFamily: "'Syne', sans-serif" }}
          >
            Education
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="w-[80px] h-[3px] rounded-full"
            style={{
              background: "linear-gradient(90deg, #7c3aed 0%, #06b6d4 100%)",
            }}
          />
        </div>

        {/* CARDS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {EDUCATION_DATA.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative rounded-2xl overflow-hidden flex flex-col border border-white/5 transition-all duration-300 hover:-translate-y-2 hover:border-purple-500/30 group"
              style={{
                background: item.bgGradient,
                boxShadow: "0 10px 30px -15px rgba(0,0,0,0.5)",
              }}
            >
                <ImageSlider images={item.images} altText={item.institute} accent={item.accent} date={item.date} />
                {/* Gradient overlay for text contrast */}


              {/* Content Section */}
              <div className="flex flex-col flex-grow p-6 z-20 relative">
                
                {/* Top accent line */}
                <div
                  className="absolute top-0 left-6 right-6 h-[1px] opacity-20"
                  style={{ background: item.accent }}
                />

                <div 
                  className="text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: item.accent }}
                >
                  {item.degree}
                </div>

                <h3
                  className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight"
                  style={{ fontFamily: "'Syne', sans-serif" }}
                >
                  {item.institute}
                </h3>
                
                <div className="flex items-center gap-1.5 text-gray-400 text-xs mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path fillRule="evenodd" d="M11.54 22.351l.07.04.028.016a.76.76 0 00.723 0l.028-.015.071-.041a16.975 16.975 0 001.144-.742 19.58 19.58 0 002.683-2.282c1.944-1.99 3.963-4.98 3.963-8.827a8.25 8.25 0 00-16.5 0c0 3.846 2.02 6.837 3.963 8.827a19.58 19.58 0 002.682 2.282 16.975 16.975 0 001.145.742zM12 13.5a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                  {item.location}
                </div>

                <p className="text-gray-300 text-sm mb-4 flex-grow font-medium">
                  {item.major}
                </p>

                {/* Footer/Score */}
                <div className="mt-auto pt-4 border-t border-white/10 flex items-center justify-between">
                  <span className="text-sm font-semibold text-gray-200">
                    {item.score}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ImageSlider = ({ images, altText, accent, date }: { images: string[], altText: string, accent: string, date: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll logic
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 4000); // 4 seconds per slide

    return () => clearInterval(interval);
  }, [images.length]);

  const prevSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="relative w-full h-[220px] overflow-hidden bg-black/40 group/slider">
      {/* Images */}
      {images.map((img, i) => (
        <div
          key={i}
          className={`absolute inset-0 transition-opacity duration-500 ${
            i === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={img}
            alt={`${altText} image ${i + 1}`}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ))}

      {/* Gradient overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: "linear-gradient(to top, rgba(13,11,32,1) 0%, rgba(13,11,32,0) 100%)",
        }}
      />
      
      {/* Year Badge */}
      <div 
        className="absolute top-4 right-4 z-20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border shadow-black/50 shadow-md"
        style={{
          background: "rgba(10, 7, 24, 0.7)",
          borderColor: "rgba(167, 139, 250, 0.3)",
          color: accent,
          backdropFilter: "blur(8px)"
        }}
      >
        {date}
      </div>

      {/* Controls (only show if multiple images) */}
      {images.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
            </svg>
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-black/40 text-white opacity-0 group-hover/slider:opacity-100 transition-opacity hover:bg-black/70 backdrop-blur-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>

          {/* Dots */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {images.map((_, i) => (
              <div 
                key={i} 
                className={`transition-all duration-300 rounded-full ${
                  i === currentIndex ? 'bg-white w-4 h-1.5' : 'bg-white/40 w-1.5 h-1.5'
                }`} 
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
