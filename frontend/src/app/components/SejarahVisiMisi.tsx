import React from "react";

export default function SejarahVisiMisi() {
  return (
    <div className="w-full font-sans bg-white pb-20">
      
      {/* SECTION 1: SEJARAH (1 Foto Tunggal Clean) */}
      <section className="w-full pt-16 md:pt-24 pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
            
            {/* SISI KIRI: 1 Foto Tunggal Gedung */}
            <div className="lg:col-span-5 w-full">
              <img 
                src="/Gedung CreativaLab.jpeg" 
                alt="Gedung CreativaLab" 
                className="object-cover w-full h-[360px] md:h-[440px] rounded-sm shadow-md"
              />
            </div>

            {/* SISI KANAN: Teks Sejarah */}
            <div className="lg:col-span-7">
              <h2 className="text-4xl md:text-5xl font-black text-[#0f110f] tracking-tight mb-8">Sejarah</h2>
              
              <div className="space-y-8 text-[15.5px] font-normal leading-[1.8] text-[#444444]">
                <div>
                  <h3 className="text-lg font-bold text-[#111111] border-b-2 border-[#1b5e20] pb-1.5 mb-3 inline-block">Akar Berdirinya Creativa Laboratorium</h3>
                  <p className="mb-3">Creativa Laboratorium didirikan sebagai bentuk komitmen untuk menghadirkan solusi teknologi dan jasa pengembangan website yang inovatif, profesional, serta berdaya saing tinggi.</p>
                  <p>Berawal dari tim kreatif yang memiliki dedikasi tinggi di bidang teknologi informasi, Creativa Laboratorium terus berkembang melayani berbagai kebutuhan digitalisasi perusahaan dan organisasi dengan standar kualitas terbaik.</p>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-[#111111] border-b-2 border-[#1b5e20] pb-1.5 mb-3 inline-block">Perjalanan & Perkembangan</h3>
                  <p className="mb-3">Setiap perjalanan memiliki cerita, dan pengembangan karya digital kami dimulai dari komitmen untuk memberikan layanan terbaik kepada setiap klien.</p>
                  <p>Hingga saat ini, Creativa Laboratorium terus bertransformasi menjadi mitra tepercaya dalam membangun ekosistem digital yang kuat, terintegrasi, dan berdampak luas.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: VISI (KEMBALI KE DESAIN ASLI KAMU) */}
      <section className="relative w-full py-24 md:py-32 bg-[#e6e6e6] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-cover bg-center grayscale mix-blend-multiply opacity-50" 
          style={{ backgroundImage: "url('/Gedung%20CreativaLab.jpeg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6e6e6]/80 to-[#e6e6e6]"></div>
        
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1b5e20] tracking-tight mb-4 md:mb-6">Visi</h2>
          <p className="text-lg md:text-2xl leading-snug text-[#111111]">Menjadi penyedia jasa website terbaik di dunia</p>
        </div>
      </section>

      {/* SECTION 3: MISI (DESAIN ASLI KAMU) */}
      <section className="w-full pt-16 md:pt-20 pb-16">
        <div className="max-w-[1100px] mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 lg:gap-8 items-start">
            
            <div className="bg-[#1b5e20] text-white flex items-center justify-center h-32 w-full rounded-sm shadow-md">
              <h2 className="text-4xl lg:text-3xl xl:text-4xl font-black tracking-tight">Misi</h2>
            </div>

            <div className="flex flex-col group">
              <div className="relative h-32 w-full mb-4 bg-neutral-100 overflow-hidden rounded-sm shadow-sm">
                <img src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80" alt="Misi 1" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-0 left-0 bg-[#1b5e20] text-white w-8 h-8 flex items-center justify-center font-bold text-lg">1</div>
              </div>
              <p className="text-[13px] leading-relaxed text-[#444444]">Menghadirkan layanan pengembangan web yang berkualitas tinggi, aman, dan mudah digunakan.</p>
            </div>

            <div className="flex flex-col group">
              <div className="relative h-32 w-full mb-4 bg-neutral-100 overflow-hidden rounded-sm shadow-sm">
                <img src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=400&q=80" alt="Misi 2" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-0 left-0 bg-[#1b5e20] text-white w-8 h-8 flex items-center justify-center font-bold text-lg">2</div>
              </div>
              <p className="text-[13px] leading-relaxed text-[#444444]">Membangun komunikasi yang jujur, transparan, dan berorientasi pada kepuasan mitra kerja.</p>
            </div>

            <div className="flex flex-col group">
              <div className="relative h-32 w-full mb-4 bg-neutral-100 overflow-hidden rounded-sm shadow-sm">
                <img src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=400&q=80" alt="Misi 3" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-0 left-0 bg-[#1b5e20] text-white w-8 h-8 flex items-center justify-center font-bold text-lg">3</div>
              </div>
              <p className="text-[13px] leading-relaxed text-[#444444]">Terus berinovasi mengikuti perkembangan teknologi digital terkini.</p>
            </div>

            <div className="flex flex-col group">
              <div className="relative h-32 w-full mb-4 bg-neutral-100 overflow-hidden rounded-sm shadow-sm">
                <img src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=400&q=80" alt="Misi 4" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-0 left-0 bg-[#1b5e20] text-white w-8 h-8 flex items-center justify-center font-bold text-lg">4</div>
              </div>
              <p className="text-[13px] leading-relaxed text-[#444444]">Memperlengkapi tim dengan standar manajemen proyek yang profesional dan efisien.</p>
            </div>

          </div>
        </div>
      </section>

      {/* SECTION 4: CORE VALUES (KEMBALI KE DESAIN ASLI KAMU) */}
      <section className="relative w-full py-24 md:py-32 bg-[#e6e6e6] overflow-hidden flex items-center justify-center">
        <div 
          className="absolute inset-y-0 left-0 w-full md:w-3/4 bg-cover bg-center grayscale mix-blend-multiply opacity-50" 
          style={{ backgroundImage: "url('/Gedung%20CreativaLab.jpeg')" }} 
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#e6e6e6]/80 to-[#e6e6e6]"></div>
        
        <div className="relative z-10 max-w-[900px] mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-black text-[#1b5e20] tracking-tight mb-4 md:mb-6">Core Values</h2>
          <p className="text-lg md:text-2xl leading-snug text-[#312d2d]">Integrity, Professionalism, Dedication</p>
        </div>
      </section>

    </div>
  );
}