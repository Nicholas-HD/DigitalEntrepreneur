import React, { useEffect } from "react";
import Header from "./Header";
import HeroSambutan from "./HeroSambutan";
import Footer from "./Footer";

export default function Tentang() {
  useEffect(() => {
    document.title = "Sambutan Project Manager (PM) | Creativa Laboratorium";
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <HeroSambutan />

      <main className="flex-1 w-full max-w-[1100px] mx-auto px-6 lg:px-8 py-16 md:py-24">
        
        {/* HEADER SAMBUTAN */}
        <div className="mb-10">
          <span className="block text-sm md:text-base font-bold uppercase tracking-widest text-neutral-500 mb-2">
            SAMBUTAN PROJECT MANAGER (PM)
          </span>
          <h1 className="text-[28px] sm:text-[34px] md:text-[40px] font-black text-[#111111] leading-[1.2] mb-3">
            Selamat datang di Creativa Laboratorium
          </h1>
          <p className="text-lg md:text-xl font-medium text-neutral-600">
            Perusahaan Jasa Terbesar dan Terpercaya di Indonesia.
          </p>
        </div>

        {/* ISI KATA SAMBUTAN CORPORATE / PROFESSIONAL */}
        <div className="space-y-6 text-[15.5px] font-normal leading-[1.8] text-[#333333]">
          <p>
            Bagi kami, teknologi dan kreativitas bukan sekadar tentang membuat sesuatu yang baru, melainkan tentang menghadirkan solusi yang benar-benar mempermudah dan memberi nilai nyata bagi bisnis Anda.
          </p>
          <p>
            
          </p>
          <p>
            Di Creativa Laboratorium, kami percaya bahwa kunci keberhasilan suatu proyek terletak pada manajemen yang solid, komunikasi yang transparan, serta kolaborasi yang kuat. Tim kami terdiri dari para ahli berpengalaman yang siap membantu memecahkan berbagai tantangan kompleks demi mendorong pertumbuhan dan efisiensi bisnis Anda.
          </p>
          <p>
            Kami mengucapkan terima kasih atas kepercayaan yang telah diberikan oleh seluruh klien dan mitra strategis kami. Bersama Creativa Laboratorium, mari kita ciptakan inovasi masa depan yang berkelanjutan dan berdaya saing tinggi.
          </p>
          <p className="italic font-semibold text-[#111111] pt-2">
            "Inovasi Tanpa Batas, Solusi Terpercaya untuk Masa Depan."
          </p>
        </div>

        {/* TANDA TANGAN PROJECT MANAGER */}
        <div className="mt-12 flex flex-col items-start text-[#111111] border-t border-neutral-200 pt-8">
          <span className="text-[14px] font-medium text-neutral-500 uppercase tracking-wider">Project Manager,</span>
          <span className="text-[18px] font-bold mt-1">Howard Putra Deo, S.Kom.</span>
        </div>

      </main>

      <Footer />
    </div>
  );
}