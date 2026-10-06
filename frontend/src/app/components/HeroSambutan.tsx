import React from "react";

export default function HeroSambutan() {
  return (
    <div className="relative w-full bg-[#141414] overflow-hidden font-sans select-none">
      
      {/* AREA KONTEN - Latar belakang kini murni hitam solid */}
      <div className="relative max-w-6xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between pt-24 md:pt-36 pb-20 md:pb-28 z-10">
        
        {/* Kiri: Foto Gembala Sidang (Margin bawah ekstrem agar tenggelam) */}
        <div className="w-full md:w-5/12 flex justify-center md:justify-start relative mt-8 md:mt-0 order-2 md:order-1">
          <img 
            src="/gembala-sidang.png" 
            alt="Pdt. Rinson Butar Butar M.Th." 
            className="w-72 md:w-[420px] object-contain drop-shadow-2xl relative z-10 -mb-16 md:-mb-32" 
          />
        </div>

        {/* Kanan: Teks Tipografi (Dibebaskan dari manipulasi padding) */}
        <div className="w-full md:w-7/12 text-white pl-0 md:pl-12 relative z-20 text-center md:text-left order-1 md:order-2">
          <h3 className="text-sm md:text-base font-bold tracking-widest mb-2 text-neutral-400 uppercase">
            Sambutan Gembala Sidang
          </h3>
          <h1 className="text-3xl sm:text-4xl md:text-[42px] font-black leading-[1.15] tracking-tight">
            Pdt. Rinson Butar Butar, M.Th.
          </h1>
        </div>
      </div>

      {/* SVG Kurva Asimetris (Tinggi di kiri untuk memotong figur, Rata di kanan untuk teks) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-30 pointer-events-none transform translate-y-[1px]">
        <svg 
          className="relative block w-full h-[120px] md:h-[180px] lg:h-[220px]" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,20 C400,20 700,110 1200,110 L1200,120 L0,120 Z" 
            fill="#ffffff"
          ></path>
        </svg>
      </div>

    </div>
  );
}