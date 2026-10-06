import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface HeroSlide {
  id: number | string;
  image_banner?: string;
  video_banner?: string;
  isVideo?: boolean;
}

interface HeroCarouselProps {
  slides?: HeroSlide[];
}

// DEFAULT SLIDE UNTUK CREATIVA LABORATORIUM (VIDEO BANNER)
const defaultSlides: HeroSlide[] = [
  {
    id: "default-logo-video",
    video_banner: "/logo.mp4",
    isVideo: true,
  },
];

export default function HeroCarousel({ slides = defaultSlides }: HeroCarouselProps) {
  const activeSlides = slides.length > 0 ? slides : defaultSlides;
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const paginate = (dir: number) => {
    if (activeSlides.length === 0) return;
    setDirection(dir);
    setIndex((prev) => {
      const next = prev + dir;
      if (next < 0) return activeSlides.length - 1;
      if (next >= activeSlides.length) return 0;
      return next;
    });
  };

  useEffect(() => {
    if (activeSlides.length <= 1) return;
    const interval = setInterval(() => paginate(1), 6000);
    return () => clearInterval(interval);
  }, [index, activeSlides.length]);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  const currentSlide = activeSlides[index];

  return (
    <div className="relative w-full h-full md:h-[90vh] md:min-h-[680px] bg-neutral-900 overflow-hidden font-sans">
      {/* BACKGROUND SLIDER */}
      <AnimatePresence custom={direction} initial={false}>
        {currentSlide && (
          <motion.div
            key={currentSlide.id || index}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="absolute inset-0 z-0"
          >
            {currentSlide.isVideo && currentSlide.video_banner ? (
              <video
                src={currentSlide.video_banner}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
            ) : currentSlide.image_banner ? (
              <img
                src={currentSlide.image_banner}
                className="w-full h-full object-cover"
                alt="Banner Slide"
              />
            ) : null}

            {/* Overlay Gelap */}
            <div className="absolute inset-0 bg-black/40" />
          </motion.div>
        )}
      </AnimatePresence>

      {/* CONTROLS (TOMBOL KIRI & KANAN) */}
      {activeSlides.length > 1 && (
        <>
          <button
            onClick={() => paginate(-1)}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all cursor-pointer"
            aria-label="Previous Slide"
          >
            <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-white hover:bg-black/60 transition-all cursor-pointer"
            aria-label="Next Slide"
          >
            <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
          </button>
        </>
      )}

      {/* DOTS INDICATOR */}
      {activeSlides.length > 1 && (
        <div className="absolute bottom-[145px] sm:bottom-[175px] md:bottom-[210px] left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
          {activeSlides.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDirection(i > index ? 1 : -1);
                setIndex(i);
              }}
              className={`transition-all rounded-full cursor-pointer ${
                i === index
                  ? "bg-white w-8 h-2.5"
                  : "bg-white/40 hover:bg-white/70 w-2.5 h-2.5"
              }`}
            />
          ))}
        </div>
      )}

      {/* BOTTOM ARCH DIVIDER */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-20 pointer-events-none transform translate-y-[1px]">
        <div className="relative w-full flex flex-col items-center">
          <div
            className="absolute z-30 w-[1.5px] h-[75px] sm:h-[100px] md:h-[125px] top-[10px] sm:top-[15px] md:top-[20px] left-1/2 -translate-x-1/2"
            style={{
              background:
                "linear-gradient(to bottom, rgba(203, 213, 225, 0) 0%, rgba(148, 163, 184, 0.7) 45%, rgba(51, 65, 85, 0.95) 100%)",
            }}
          />

          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 200"
            preserveAspectRatio="none"
            className="relative block w-full h-[120px] sm:h-[160px] md:h-[210px]"
          >
            <path
              d="M 0,200 L 0,150 Q 600,10 1200,150 L 1200,200 Z"
              className="fill-white"
            />
          </svg>

          <div className="absolute bottom-3 sm:bottom-4 md:bottom-5 left-1/2 -translate-x-1/2 text-center pointer-events-auto z-30">
            <span className="text-[11px] sm:text-xs md:text-sm font-serif italic text-neutral-500 tracking-wider">
              Who we are?
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}