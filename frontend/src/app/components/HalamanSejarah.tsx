import React, { useEffect } from "react";
import Header from "./Header";
import HeroSejarah from "./HeroSejarah";
import SejarahVisiMisi from "./SejarahVisiMisi";
import Footer from "./Footer";

export default function HalamanSejarah() {
  
  // INJEKSI MUTLAK: Pembersihan memori DOM & Modifikasi Metadata
  useEffect(() => {
    document.title = "Sejarah, Visi & Misi | GBI Taman Mahkota";
  }, []);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      <Header />
      <HeroSejarah />
      
      <main className="flex-1 w-full">
        <SejarahVisiMisi />
      </main>

      <Footer />
    </div>
  );
}