import React from "react";

// Warna latar footer (gradasi gelap, kiri lebih terang).
const FOOTER_BG =
  "linear-gradient(to right, #2E2F33 0%, #242528 45%, #1A1B1D 100%)";

// Warna section tepat di atas footer. Ubah kalau background Home.tsx bukan putih,
// supaya gelombangnya menyatu dengan halaman.
const PAGE_BG = "#ffffff";

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden font-sans text-neutral-400 selection:bg-neutral-900 selection:text-white"
      style={{ background: FOOTER_BG }}
    >
      {/* Gelombang berlapis di bagian atas */}
      <svg
        aria-hidden="true"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        className="absolute top-0 left-0 w-full h-16 sm:h-24"
      >
        <path
          d="M0,0 H1440 V80 C1180,10 900,120 620,85 C380,55 160,20 0,70 Z"
          fill={PAGE_BG}
          fillOpacity="0.14"
        />
        <path
          d="M0,0 H1440 V55 C1200,100 920,15 640,45 C400,70 180,95 0,45 Z"
          fill={PAGE_BG}
          fillOpacity="0.3"
        />
        <path
          d="M0,0 H1440 V25 C1220,75 940,5 660,25 C420,40 190,60 0,15 Z"
          fill={PAGE_BG}
        />
      </svg>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-32 pb-8">
        <p className="text-center text-[13px] text-neutral-400">
          © 2025 - 2026 Creativa Laboratorium. All rights reserved.
        </p>
      </div>
    </footer>
  );
}