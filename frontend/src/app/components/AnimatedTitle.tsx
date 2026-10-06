import React from "react";
import { motion, useReducedMotion } from "framer-motion";

// Warna animasi: peach (muncul) -> oranye -> coklat tua (warna akhir judul)
const PEACH = "#f2c79a";
const ORANGE = "#e0964a";
const DARK = "#3a1d13";

const FADE_IN = 1.1; // detik: fade + blur masuk
const HOLD = 0.3; // jeda sebelum gelombang warna mulai
const STEP = 0.07; // jeda antar huruf (kiri -> kanan)
const DARKEN = 0.7; // lama tiap huruf berubah jadi coklat

// Judul dengan efek: blur-in + gelombang warna dari kiri ke kanan
export default function AnimatedTitle({ text, className = "" }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return <h1 className={className}>{text}</h1>;

  const words = text.split(" ");
  const totalChars = words.join("").length;
  const end = FADE_IN + HOLD + (totalChars - 1) * STEP + DARKEN;
  let idx = 0;

  return (
    <motion.h1
      key={text}
      aria-label={text}
      className={className}
      initial={{ opacity: 0, filter: "blur(14px)" }}
      animate={{ opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: FADE_IN, ease: [0.16, 1, 0.3, 1] }}
    >
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span aria-hidden="true" className="inline-block whitespace-nowrap">
            {Array.from(word).map((ch) => {
              const waveStart = FADE_IN + HOLD + idx * STEP;
              idx += 1;
              return (
                <motion.span
                  key={idx}
                  className="inline-block"
                  initial={{ color: PEACH }}
                  animate={{ color: [PEACH, ORANGE, ORANGE, DARK] }}
                  transition={{
                    duration: end,
                    times: [0, FADE_IN / end, waveStart / end, (waveStart + DARKEN) / end],
                    ease: "easeInOut",
                  }}
                >
                  {ch}
                </motion.span>
              );
            })}
          </span>
          {wi < words.length - 1 && " "}
        </React.Fragment>
      ))}
    </motion.h1>
  );
}