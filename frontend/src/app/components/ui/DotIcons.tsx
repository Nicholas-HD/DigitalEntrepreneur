import React, { useEffect, useState } from "react";

/* ================================================================== */
/*  Animasi hover (meniru Cleo): gelombang titik menyusut ke pusat     */
/*  lalu mekar lagi. Aktif selama kursor ada di elemen ber-class       */
/*  "group" (baris menu / tombol silang).                              */
/* ================================================================== */
const DOT_HOVER_CSS = `
.dot-hv { transform-box: fill-box; transform-origin: center; }

/* Ikon plus: ujung lengan (jarak 3) menyusut dulu, lalu 2, lalu 1; mekar kebalikannya */
@keyframes dpW3 { 0%,12% {opacity:1;transform:scale(1)} 22%,62% {opacity:.2;transform:scale(.6)} 74%,100% {opacity:1;transform:scale(1)} }
@keyframes dpW2 { 0%,20% {opacity:1;transform:scale(1)} 30%,54% {opacity:.2;transform:scale(.6)} 66%,100% {opacity:1;transform:scale(1)} }
@keyframes dpW1 { 0%,28% {opacity:1;transform:scale(1)} 38%,46% {opacity:.2;transform:scale(.6)} 58%,100% {opacity:1;transform:scale(1)} }
.group:hover .dp-3 { animation: dpW3 1000ms ease-in-out infinite; }
.group:hover .dp-2 { animation: dpW2 1000ms ease-in-out infinite; }
.group:hover .dp-1 { animation: dpW1 1000ms ease-in-out infinite; }

/* Ikon silang: sudut (ring 2) -> tengah (ring 1) -> pusat (ring 0), kosong, lalu mekar balik */
@keyframes dxR2 { 0%,8% {opacity:1;transform:scale(1)} 20%,58% {opacity:.2;transform:scale(.6)} 70%,100% {opacity:1;transform:scale(1)} }
@keyframes dxR1 { 0%,16% {opacity:1;transform:scale(1)} 28%,50% {opacity:.2;transform:scale(.6)} 62%,100% {opacity:1;transform:scale(1)} }
@keyframes dxR0 { 0%,22% {opacity:1;transform:scale(1)} 33%,48% {opacity:.2;transform:scale(.6)} 58%,100% {opacity:1;transform:scale(1)} }
.group:hover .dx-2 { animation: dxR2 1200ms ease-in-out infinite; }
.group:hover .dx-1 { animation: dxR1 1200ms ease-in-out infinite; }
.group:hover .dx-0 { animation: dxR0 1200ms ease-in-out infinite; }

@media (prefers-reduced-motion: reduce) { .dot-hv { animation: none !important; } }
`;

/* ================================================================== */
/*  Ikon menu (hamburger <-> silang): grid 7x7, titik menyala acak     */
/* ================================================================== */
const IC_N = 7;
const IC_STEP = 3;
const IC_C = 3;
const EASE_POP = "cubic-bezier(0.34, 1.7, 0.64, 1)"; // overshoot = efek pop
const ik = (r: number, c: number) => `${r},${c}`;

// Urutan menyala (acak, dibaca dari video Cleo)
const HAMBURGER_SEQ: [number, number][] = [
  [1, 5], [5, 5], [1, 3], [5, 2], [3, 2], [1, 1], [5, 4], [3, 4],
  [1, 4], [5, 1], [3, 3], [1, 2], [5, 3], [3, 1], [3, 5],
];
const CROSS_SEQ: [number, number][] = [
  [5, 1], [4, 2], [4, 4], [2, 4], [5, 5], [1, 1], [2, 2], [1, 5], [3, 3],
];
const toOrder = (seq: [number, number][]) =>
  new Map(seq.map(([r, c], i) => [ik(r, c), i] as [string, number]));
const HAMBURGER_ORDER = toOrder(HAMBURGER_SEQ);
const CROSS_ORDER = toOrder(CROSS_SEQ);

const CENTER_ORDER = new Map<string, number>([[ik(IC_C, IC_C), 0]]);
const INTRO_DOTS = true; // false = tanpa animasi intro saat halaman dimuat

const IC_DOTS = Array.from({ length: IC_N * IC_N }, (_, i) => {
  const r = Math.floor(i / IC_N);
  const c = i % IC_N;
  return { r, c, x: 1.5 + c * IC_STEP, y: 1.5 + r * IC_STEP };
}).filter((d) => Math.hypot(d.r - IC_C, d.c - IC_C) <= 3.2);

export function DotIcon({ open, isLight }: { open: boolean; isLight?: boolean }) {
  const color = isLight ? "#3a1d13" : "#ffffff";
  const step = open ? 60 : 55;

  // Intro saat halaman dimuat (meniru Cleo):
  // hamburger diam -> menyusut ke titik tengah -> menyala acak lagi
  const [intro, setIntro] = useState<0 | 1 | 2>(INTRO_DOTS ? 0 : 2);
  useEffect(() => {
    if (!INTRO_DOTS) return;
    const t1 = setTimeout(() => setIntro(1), 1500);
    const t2 = setTimeout(() => setIntro(2), 1800);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const order = open ? CROSS_ORDER : intro === 1 ? CENTER_ORDER : HAMBURGER_ORDER;

  // animasi hover baru aktif setelah animasi buka selesai, supaya tidak bentrok
  const [settled, setSettled] = useState(false);
  useEffect(() => {
    setSettled(false);
    const t = setTimeout(() => setSettled(true), 1300);
    return () => clearTimeout(t);
  }, [open]);

  return (
    <>
      <style>{DOT_HOVER_CSS}</style>
      <svg width={21} height={21} viewBox="0 0 21 21" aria-hidden="true">
        {IC_DOTS.map(({ r, c, x, y }) => {
          const o = order.get(ik(r, c));
          const on = o !== undefined;
          const delay = on ? 140 + (o as number) * step : ((r + c) % 4) * 20;
          const ring = Math.max(Math.abs(r - IC_C), Math.abs(c - IC_C));
          const hover = open && settled && on;
          return (
            <circle
              key={`${r}-${c}`}
              className={hover ? `dot-anim dot-hv dx-${ring}` : "dot-anim"}
              cx={x}
              cy={y}
              r={0.85}
              fill={color}
              style={{
                opacity: on ? 1 : 0.2,
                transform: on ? "scale(1)" : "scale(0.6)",
                transformBox: "fill-box",
                transformOrigin: "center",
                transition: on
                  ? `opacity 180ms ease-out ${delay}ms, transform 420ms ${EASE_POP} ${delay}ms, fill 300ms ease`
                  : `opacity 140ms ease-out ${delay}ms, transform 140ms ease-out ${delay}ms, fill 300ms ease`,
              }}
            />
          );
        })}
      </svg>
    </>
  );
}
/* ================================================================== */
/*  DotChevron                                                         */
/* ================================================================== */
export function DotChevron({ dir = "right", isLight }: { dir?: "left" | "right"; isLight?: boolean }) {
  const lit = new Set(["0,0", "1,1", "2,2", "1,3", "0,4"]);
  const fillColor = isLight ? "#3a1d13" : "#ffffff";

  return (
    <span className="flex-shrink-0 w-4 h-4 flex items-center justify-center" aria-hidden="true">
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        className={`w-3.5 h-3.5 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          dir === "left"
            ? "group-hover:-translate-x-1 group-active:-translate-x-1.5 rotate-180"
            : "group-hover:translate-x-1 group-active:translate-x-1.5"
        }`}
      >
        {Array.from({ length: 5 }).flatMap((_, r) =>
          Array.from({ length: 3 }).map((__, c) => {
            const on = lit.has(`${c},${r}`);
            return (
              <circle
                key={`${c}-${r}`}
                cx={2 + c * 4}
                cy={1.5 + r * 4}
                r={on ? 1.9 : 1.1}
                fill={fillColor}
                opacity={on ? 1 : 0.3}
                className="transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
            );
          })
        )}
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  DotArrow: grid bulat 7x7. Idle = chevron statis.                   */
/*  Hover (parent ber-class "group") = gelombang kiri -> kanan.        */
/* ================================================================== */
const DOT_ARROW_CSS = `
.dot-arrow-dot { transform-box: fill-box; transform-origin: center; }
.group:hover .dot-arrow-dot {
  animation: dotArrowWave 800ms ease-out infinite;
  animation-fill-mode: backwards;
}
@keyframes dotArrowWave {
  0%   { opacity: 0.2;  transform: scale(0.8); }
  10%  { opacity: 1;    transform: scale(1.3); }
  35%  { opacity: 0.55; transform: scale(1); }
  65%, 100% { opacity: 0.2; transform: scale(0.8); }
}
`;

export function DotArrow({ size = 32, isLight }: { size?: number; isLight?: boolean }) {
  const N = 7;
  const C = 3; // pusat grid
  const fillColor = isLight ? "#4a2523" : "#ffffff";
  const STEP = 100; // ms jeda antar kolom gelombang

  const dots: React.ReactNode[] = [];
  for (let r = 0; r < N; r++) {
    for (let c = 0; c < N; c++) {
      // potong sudut supaya grid berbentuk lingkaran
      if (Math.hypot(r - C, c - C) > 3.2) continue;

      const arm = C - Math.abs(r - C);
      const lit = c === 2 + arm;
      const idx = c - arm + C; // ujung panah (baris tengah) menyala duluan

      dots.push(
        <circle
          key={`${r}-${c}`}
          className="dot-arrow-dot"
          cx={2 + c * 4}
          cy={2 + r * 4}
          r={lit ? 1.55 : 1.2}
          fill={fillColor}
          opacity={lit ? 0.95 : 0.2}
          style={{ animationDelay: `${idx * STEP}ms` }}
        />
      );
    }
  }

  return (
    <span
      className="flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <style>{DOT_ARROW_CSS}</style>
      <svg width={size} height={size} viewBox="0 0 28 28">
        {dots}
      </svg>
    </span>
  );
}

/* ================================================================== */
/*  DotPlus: grid 7x7 bulat, titik terang membentuk tanda +            */
/* ================================================================== */
const PLUS_C = 3;
const PLUS_DOTS = Array.from({ length: 49 }, (_, i) => {
  const r = Math.floor(i / 7);
  const c = i % 7;
  return {
    r,
    c,
    lit: r === PLUS_C || c === PLUS_C,
    d: Math.max(Math.abs(r - PLUS_C), Math.abs(c - PLUS_C)),
  };
}).filter((p) => Math.hypot(p.r - PLUS_C, p.c - PLUS_C) <= 3.2);

export function DotPlus({ isLight, size = 22 }: { isLight?: boolean; size?: number }) {
  const fillColor = isLight ? "#3a1d13" : "#ffffff";

  return (
    <span
      className="flex-shrink-0 flex items-center justify-center"
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <style>{DOT_HOVER_CSS}</style>
      <svg width={size} height={size} viewBox="0 0 28 28">
        {PLUS_DOTS.map(({ r, c, lit, d }) => (
          <circle
            key={`${r}-${c}`}
            className={lit && d > 0 ? `dot-hv dp-${d}` : undefined}
            cx={2 + c * 4}
            cy={2 + r * 4}
            r={lit ? 1.4 : 1.1}
            fill={fillColor}
            opacity={lit ? 1 : 0.2}
          />
        ))}
      </svg>
    </span>
  );
}