import React, { useEffect, useRef, useState } from "react";
import DotArrowButton from "./Dotarrowbutton";

interface Testimonial {
  id: number;
  quote: string;
  name: string;
  company: string;
  image?: string; // path foto di folder public, mis. "/budi.png". Kosong = tampil inisial.
}

// =====================================================================
// DI SINI TEMPAT MENAMBAH / MENGUBAH ORANG
//
// 1. Taruh fotonya di folder `public` (nama file tanpa spasi, mis. "budi.png").
//    Paling bagus PNG transparan (latar dihapus): foto otomatis diubah jadi
//    efek titik-titik (halftone) seperti di meetcleo.
// 2. Tambahkan satu objek baru di array bawah ini.
//    Ganti id (naik satu), quote, name, company, dan image (awali dengan "/").
// 3. Simpan. Panah dan kartu samping tampil otomatis kalau isinya lebih dari satu.
// =====================================================================
const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    quote: "Tulis testimoni klien pertama di sini. Cukup beberapa kalimat supaya kartu tetap rapi.",
    name: "Howard",
    company: "Nama Perusahaan",
    image: "", // %20 = spasi. Kalau di-rename jadi howard-pm.png: "/howard-pm.png"
  },
  {
    id: 2,
    quote: "Tulis testimoni klien kedua di sini. Ceritakan hasil kerja sama dan kesan terhadap tim.",
    name: "Nama Klien",
    company: "Nama Perusahaan",
  },
  {
    id: 3,
    quote: "Tulis testimoni klien ketiga di sini. Boleh ditambah kartu lagi lewat array ini.",
    name: "Nama Klien",
    company: "Nama Perusahaan",
  },
];

// Warna: abu-abu ke putih, bergradasi.
const SECTION_BG =
  "linear-gradient(to bottom, #ffffff 0%, #ffffff 24%, #e9e9eb 60%, #efeff1 100%)";
const TILE_BG = "linear-gradient(180deg, #d4d4d8 0%, transparent 100%)";
const INK = "#1c1c1f";
const INK_SOFT = "#6e6e73";
const DOT = "#18181b"; // warna titik halftone

// Kecepatan jalan otomatis, dalam "kartu per detik".
// 0.06 = pelan (sekitar 1 kartu tiap 16 detik). 0 = mati.
const AUTO_SPEED = 0.06;
// Seberapa cepat kartu meluncur saat panah diklik (makin besar = makin cepat)
const CLICK_EASE = 5;
// Berhenti jalan sendiri selama kursor ada di atas kartu (desktop). false = tetap jalan.
const PAUSE_ON_HOVER = true;

// Halftone: jumlah titik per sisi (makin besar = titik makin halus), dan resolusi kanvas.
const DOT_COLS = 56;
const CANVAS_PX = 640;

const mod = (a: number, n: number) => ((a % n) + n) % n;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("").toUpperCase();

// Jarak antar pusat kartu dalam piksel (harus sama dengan --card-w + --gap di CSS)
const stepPx = () => {
  const w = window.innerWidth;
  return Math.min(w * 0.86, 860) + clamp(w * 0.175, 40, 290);
};

const OFFSETS = [-2, -1, 0, 1, 2, 3]; // slot kartu; yang di luar layar tidak terlihat

// ---------------------------------------------------------------------
// Foto -> titik-titik. Makin gelap bagian foto, makin besar titiknya.
// Saat kartu mendekati tengah, titik membesar dan menebal.
// ---------------------------------------------------------------------
function HalftonePortrait({
  src,
  alt,
  near,
  fallback,
}: {
  src: string;
  alt: string;
  near: number;
  fallback: React.ReactNode;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const grid = useRef<Float32Array | null>(null);
  const lastQ = useRef(-1);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  // Baca foto sekali, ubah jadi grid kegelapan (0..1) per titik
  useEffect(() => {
    let dead = false;
    const img = new Image();
    img.onload = () => {
      if (dead) return;
      const c = document.createElement("canvas");
      c.width = DOT_COLS;
      c.height = DOT_COLS;
      const ctx = c.getContext("2d", { willReadFrequently: true })!;
      // muat utuh, rata bawah (sama seperti object-contain object-bottom)
      const s = Math.min(DOT_COLS / img.width, DOT_COLS / img.height);
      const w = img.width * s;
      const h = img.height * s;
      ctx.drawImage(img, (DOT_COLS - w) / 2, DOT_COLS - h, w, h);
      const px = ctx.getImageData(0, 0, DOT_COLS, DOT_COLS).data;
      const g = new Float32Array(DOT_COLS * DOT_COLS);
      for (let i = 0; i < g.length; i++) {
        const r = px[i * 4], gr = px[i * 4 + 1], b = px[i * 4 + 2];
        const a = px[i * 4 + 3] / 255;
        const lum = (0.299 * r + 0.587 * gr + 0.114 * b) / 255;
        // bagian terang tetap kebagian titik kecil supaya subjek tidak bolong
        g[i] = a * (0.22 + 0.78 * (1 - lum));
      }
      grid.current = g;
      lastQ.current = -1;
      setReady(true);
    };
    img.onerror = () => !dead && setFailed(true);
    img.src = src;
    return () => {
      dead = true;
    };
  }, [src]);

  // Gambar titik; dilewati kalau tampilannya tidak berubah (hemat CPU)
  useEffect(() => {
    const cv = canvasRef.current;
    const g = grid.current;
    if (!ready || !cv || !g) return;
    const q = Math.round(clamp(near) * 20);
    if (q === lastQ.current) return;
    lastQ.current = q;

    const ctx = cv.getContext("2d")!;
    ctx.clearRect(0, 0, CANVAS_PX, CANVAS_PX);
    const cell = CANVAS_PX / DOT_COLS;
    const k = q / 20;
    ctx.fillStyle = DOT;
    ctx.globalAlpha = 0.6 + 0.4 * k;
    ctx.beginPath();
    for (let y = 0; y < DOT_COLS; y++) {
      for (let x = 0; x < DOT_COLS; x++) {
        const d = g[y * DOT_COLS + x];
        if (d < 0.05) continue;
        const r = cell * 0.5 * Math.sqrt(d) * (0.6 + 0.45 * k);
        if (r < 0.5) continue;
        const cx = (x + 0.5) * cell;
        const cy = (y + 0.5) * cell;
        ctx.moveTo(cx + r, cy);
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
      }
    }
    ctx.fill();
  }, [ready, near]);

  if (failed) return <>{fallback}</>;

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_PX}
      height={CANVAS_PX}
      role="img"
      aria-label={alt}
      className="w-full h-full"
    />
  );
}

export default function KlienTestimoni() {
  const n = TESTIMONIALS.length;
  const many = n > 1;

  // pos = posisi pita dalam satuan kartu (pecahan, naik terus tanpa batas)
  const [pos, setPos] = useState(0);
  const posRef = useRef(0);
  const target = useRef<number | null>(null); // dipakai saat panah / kartu samping diklik

  // drag / geser
  const [dragging, setDragging] = useState(false);
  const dragging_ = useRef(false);
  const hovering = useRef(false);
  const moved = useRef(0); // total jarak geser, untuk membedakan drag dari klik
  const drag = useRef({ x: 0, pos: 0, lastX: 0, lastT: 0, v: 0 });

  useEffect(() => {
    if (!many) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();

    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000); // batasi supaya tidak loncat saat tab sempat tidak aktif
      last = now;
      const before = posRef.current;

      if (target.current !== null) {
        const diff = target.current - posRef.current;
        if (reduced || Math.abs(diff) < 0.002) {
          posRef.current = target.current;
          target.current = null;
        } else {
          posRef.current += diff * Math.min(1, dt * CLICK_EASE);
        }
      } else if (!reduced && !dragging_.current && !(PAUSE_ON_HOVER && hovering.current)) {
        posRef.current += AUTO_SPEED * dt; // jalan terus, pelan, tanpa jeda
      }

      if (posRef.current !== before) setPos(posRef.current);
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [many]);

  const go = (delta: number) => {
    const from = target.current ?? Math.round(posRef.current);
    target.current = from + delta;
  };

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!many || (e.pointerType === "mouse" && e.button !== 0)) return;
    dragging_.current = true;
    target.current = null; // batalkan luncuran yang sedang jalan
    moved.current = 0;
    drag.current = { x: e.clientX, pos: posRef.current, lastX: e.clientX, lastT: performance.now(), v: 0 };
    e.currentTarget.setPointerCapture(e.pointerId);
    setDragging(true);
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging_.current) return;
    const d = drag.current;
    const dx = e.clientX - d.x;
    moved.current = Math.max(moved.current, Math.abs(dx));
    posRef.current = d.pos - dx / stepPx(); // geser kanan = kartu mundur
    setPos(posRef.current);
    const now = performance.now();
    const dt = Math.max(1, now - d.lastT);
    d.v = 0.8 * d.v + 0.2 * ((e.clientX - d.lastX) / dt); // piksel per ms, dihaluskan
    d.lastX = e.clientX;
    d.lastT = now;
  };

  const endDrag = () => {
    if (!dragging_.current) return;
    dragging_.current = false;
    setDragging(false);
    // lempar sedikit sesuai kecepatan, lalu pas-kan ke kartu terdekat
    const flick = (-drag.current.v * 1000) / stepPx() * 0.25;
    target.current = Math.round(posRef.current + clamp(flick, -1, 1));
  };

  const base = Math.floor(pos);
  const frac = pos - base;
  const offsets = many ? OFFSETS : [0];

  return (
    <section
      className="py-16 sm:py-24 overflow-hidden"
      style={
        {
          background: SECTION_BG,
          color: INK,
          "--card-w": "min(86vw, 860px)",
          "--gap": "clamp(40px, 17.5vw, 290px)",
        } as React.CSSProperties
      }
    >
      <div className="text-center px-4">
        <h1 className="text-3xl sm:text-[3.25rem] font-light tracking-tight leading-[1.1]">
          The internet has spoken
          <br />
          (and it likes CreativaLab)
        </h1>

        {many && (
          <div className="mt-8 flex justify-center gap-4">
            <DotArrowButton dir="prev" label="Testimoni sebelumnya" onClick={() => go(-1)} color={INK} />
            <DotArrowButton dir="next" label="Testimoni berikutnya" onClick={() => go(1)} color={INK} />
          </div>
        )}
      </div>

      {/* Semua kartu menumpuk di satu sel grid, lalu digeser dengan translateX */}
      <div
        className={`${many ? "mt-16 sm:mt-44" : "mt-12 sm:mt-24"} grid select-none`}
        style={{
          cursor: many ? (dragging ? "grabbing" : "grab") : undefined,
          touchAction: "pan-y", // geser horizontal = drag kartu, vertikal tetap scroll halaman
        }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerEnter={(e) => { if (e.pointerType === "mouse") hovering.current = true; }}
        onPointerLeave={() => { hovering.current = false; }}
      >
        {offsets.map((offset) => {
          const v = base + offset; // key tetap saat pita berjalan, jadi kartu mengalir mulus
          const t = TESTIMONIALS[mod(v, n)];
          const dist = many ? Math.abs(offset - frac) : 0; // jarak kartu dari tengah (satuan kartu)
          const near = 1 - clamp(dist); // 1 = tepat di tengah, 0 = sudah jauh
          const initialsNode = (
            <span className="text-5xl font-light" style={{ color: "#a1a1a6" }}>
              {initials(t.name)}
            </span>
          );
          return (
            <article
              key={v}
              onClick={many ? () => { if (moved.current < 6) target.current = v; } : undefined}
              aria-hidden={dist > 0.5}
              style={{
                gridArea: "1 / 1",
                justifySelf: "center",
                width: "var(--card-w)",
                transform: `translateX(calc(${many ? offset - frac : 0} * (var(--card-w) + var(--gap))))`,
              }}
              className="rounded-[2.5rem] sm:rounded-[6rem] bg-white p-3 sm:p-[30px] flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-[50px]"
            >
              <div
                className="sm:w-[41%] aspect-square flex-shrink-0 rounded-[2rem] sm:rounded-[3.75rem] overflow-hidden flex items-center justify-center"
                style={{ background: TILE_BG }}
              >
                {t.image ? (
                  <HalftonePortrait
                    src={t.image}
                    alt={t.name}
                    near={near}
                    fallback={initialsNode}
                  />
                ) : (
                  initialsNode
                )}
              </div>

              <div className="px-3 pb-4 sm:px-0 sm:pb-0 sm:pr-6">
                <p className="text-lg sm:text-2xl font-light leading-[1.28]">“{t.quote}”</p>
                <p
                  className="mt-7 text-[12px] sm:text-[13px] tracking-wider font-mono uppercase"
                  style={{ color: INK_SOFT }}
                >
                  {t.name}, {t.company}
                </p>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}