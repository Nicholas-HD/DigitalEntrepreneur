import React from "react";

export default function LokasiGereja() {
  return (
    // Margin atas (mt) ditambah menjadi 16/20 agar ada ruang kosong untuk label yang sekarang menonjol ke atas
    <section className="relative w-full h-[320px] md:h-[480px] bg-neutral-200 mt-16 md:mt-20 font-sans">
      
      {/* 1. LABEL TAB MENGHADAP KE ATAS (100% UNTAR CLONE) */}
      {/* Posisi 'bottom-full' mendorong elemen ini 100% ke luar/ke atas garis peta. */}
      <div className="absolute bottom-full left-1/2 -translate-x-1/2 z-20">
        {/* INJEKSI: Menggunakan rounded-t-lg (lengkung atas), menghapus lengkung bawah, dan memancarkan pendaran shadow. */}
        <div className="bg-gradient-to-b from-[#3b4045] to-[#0f294a] text-white px-5 md:px-12 py-1.5 md:py-2.5 rounded-t-lg md:rounded-t-xl shadow-[0_0_30px_rgba(0,0,0,0.3)] font-bold text-xs md:text-[15px] uppercase tracking-widest whitespace-nowrap">
          Kunjungi Kami
        </div>
      </div>

      {/* 2. GOOGLE MAPS IFRAME ENGINE (RUTE AKTIF & PLACE CARD KECIL) */}
      <div className="absolute inset-0 z-0 pointer-events-auto">
        <iframe
          title="Lokasi GBI Taman Mahkota"
          // Kueri URL menggunakan format Embed standar yang menembak spesifik jalan, 
          // sehingga Place Card hanya berisi alamat (tanpa profil bisnis), tapi tombol Rute (Directions) berfungsi 100%.
          src="https://maps.google.com/maps?q=Jl.+Perumahan+Mahkota+Indah,+Benda,+Kota+Tangerang,+Banten&t=&z=16&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen={false}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full object-cover contrast-125 saturate-50 brightness-95" 
        ></iframe>
      </div>

      {/* 3. INJEKSI MUTLAK: 100% UNTAR Smooth "U" Curve (Cubic Bezier) */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10 pointer-events-none transform translate-y-[1px]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 200"
          preserveAspectRatio="none"
          className="relative block w-full h-[50px] md:h-[150px]"
        >
          {/* Layer 1: Garis Pinggir Gelap */}
          <path
            d="M0,40 C400,140 850,190 1200,20 L1200,200 L0,200 Z"
            className="fill-[#1a1a1a]"
          />
          {/* Layer 2: Fondasi Solid (Sinkronkan dengan HEX warna Footer lu) */}
          <path
            d="M0,60 C400,160 850,210 1200,40 L1200,200 L0,200 Z"
            className="fill-[#111111]" 
          />
        </svg>
      </div>
      
    </section>
  );
}