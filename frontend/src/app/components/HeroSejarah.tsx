import React from "react";

export default function HeroSejarah() {
  return (
    <section className="relative w-full h-[350px] md:h-[450px] flex items-center justify-center overflow-hidden font-sans mt-0">
      
      {/* Latar Belakang Gambar Gedung CreativaLab */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/Gedung%20CreativaLab.jpeg')" }}
      />
      
      {/* Overlay Hitam Transparan */}
      <div className="absolute inset-0 bg-black/60"></div>
      
      {/* Teks Konten Tengah */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center justify-center">
        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight mb-4 md:mb-5 leading-tight">
          Sejarah, Visi, Misi, dan Core Values Creativa Laboratorium
        </h1>
      </div>
      
    </section>
  );
}