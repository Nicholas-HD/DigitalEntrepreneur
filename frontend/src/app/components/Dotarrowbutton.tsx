import React, { useEffect, useRef, useState } from "react";

interface Props {
  dir: "prev" | "next";
  onClick: () => void;
  label: string;
  color?: string; // warna titik panah
}

// Grid 7x7 dengan 4 sudut dipotong (bentuk lingkaran), seperti di Cleo
const N = 7;
const CELLS: [number, number][] = [];
const MASK = new Set<string>();
for (let r = 0; r < N; r++) {
  for (let c = 0; c < N; c++) {
    const ok = r === 0 || r === N - 1 ? c >= 2 && c <= 4 : r === 1 || r === N - 2 ? c >= 1 && c <= 5 : true;
    if (ok) {
      CELLS.push([c, r]);
      MASK.add(`${c},${r}`);
    }
  }
}

// Panah "<" dari 7 titik: [kolom, baris]. Panah ">" dibuat dengan mencerminkan.
const HOME: [number, number][] = [[4, 0], [3, 1], [2, 2], [1, 3], [2, 4], [3, 5], [4, 6]];

const W = 8;       // lebar putaran: panah keluar di satu sisi, masuk lagi dari sisi seberang
const SPEED = 7.5; // kecepatan luncur (kotak per detik). Makin besar = makin cepat
const GRID_COLOR = "#e7dfe0";

// true  = panah terus meluncur selama kursor di atas tombol (efek hover lama)
// false = panah hanya meluncur SATU putaran saat tombol ditekan, lalu diam
const HOVER_LOOP = true;

const mod = (a: number, n: number) => ((a % n) + n) % n;

export default function DotArrowButton({ dir, onClick, label, color = "#3b1a12" }: Props) {
  const [offset, setOffset] = useState(0);
  const off = useRef(0);
  const goal = useRef(0);
  const hov = useRef(false);
  const raf = useRef(0);
  const last = useRef(0);

  const loop = (t: number) => {
    const dt = Math.min(0.05, (t - last.current) / 1000);
    last.current = t;
    const moving = hov.current || off.current < goal.current;
    if (!moving) {
      raf.current = 0;
      return;
    }
    off.current += SPEED * dt;
    if (!hov.current && off.current >= goal.current) {
      // selesai satu putaran penuh, panah mendarat di posisi awal
      off.current = 0;
      goal.current = 0;
      setOffset(0);
      raf.current = 0;
      return;
    }
    setOffset(off.current);
    raf.current = requestAnimationFrame(loop);
  };

  const start = () => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!raf.current) {
      last.current = performance.now();
      raf.current = requestAnimationFrame(loop);
    }
  };

  const enter = () => {
    if (!HOVER_LOOP) return;
    hov.current = true;
    start();
  };
  const leave = () => {
    hov.current = false;
    if (!HOVER_LOOP) return; // mode klik: biarkan putaran yang sedang jalan selesai
    // kursor pergi: langsung berhenti dan kembali ke posisi awal, tanpa delay
    cancelAnimationFrame(raf.current);
    raf.current = 0;
    off.current = 0;
    goal.current = 0;
    setOffset(0);
  };

  useEffect(() => () => cancelAnimationFrame(raf.current), []);

  // Hitung titik panah: tiap titik meluncur ke kiri (untuk "<"), kotak pecahan = titik pudar (jejak)
  const lit: { c: number; r: number; o: number }[] = [];
  for (const [c, r] of HOME) {
    const x = mod(c - offset + 1, W) - 1;
    const c0 = Math.floor(x);
    const f = x - c0;
    for (const [cc, w] of [[c0, 1 - f], [c0 + 1, f]] as [number, number][]) {
      if (w < 0.04 || cc < 0 || cc >= N || !MASK.has(`${cc},${r}`)) continue;
      lit.push({ c: dir === "prev" ? cc : N - 1 - cc, r, o: w });
    }
  }

  return (
    <button
      type="button"
      aria-label={label}
      onClick={() => {
        // klik = satu putaran penuh, panah "maju" ke depan
        goal.current = Math.ceil((off.current + 0.001) / W) * W;
        start();
        onClick();
      }}
      // hover hanya dari mouse sungguhan; tap di HP meniru mouseenter tanpa mouseleave
      onPointerEnter={(e) => {
        if (e.pointerType === "mouse") enter();
      }}
      onPointerLeave={(e) => {
        if (e.pointerType === "mouse") leave();
      }}
      // fokus hanya dihitung untuk keyboard; fokus sisa setelah klik mouse tidak memicu apa-apa
      onFocus={(e) => {
        if (e.currentTarget.matches(":focus-visible")) enter();
      }}
      onBlur={leave}
      className="w-11 h-11 rounded-full border border-black/15 bg-[#f4f4f4] hover:bg-white active:bg-[#dccfcd] shadow-md flex items-center justify-center cursor-pointer transition-colors duration-150"
    >
      <svg viewBox={`0 0 ${N} ${N}`} width={18} height={18} aria-hidden="true">
        {CELLS.map(([c, r]) => (
          <circle key={`g-${c}-${r}`} cx={c + 0.5} cy={r + 0.5} r={0.34} fill={GRID_COLOR} />
        ))}
        {lit.map((d, i) => (
          <circle key={`a-${i}`} cx={d.c + 0.5} cy={d.r + 0.5} r={0.34} fill={color} opacity={d.o} />
        ))}
      </svg>
    </button>
  );
}