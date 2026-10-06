import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { Globe, ShoppingCart, Monitor, Settings } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";
import HeroCarousel from "./HeroCarousel";

// Data Logo Klien
const clientLogos = [
  { name: "Universitas Nusantara", logo: "/Universitasa%20Nusantara.png" },
  { name: "Nusantara Retail", logo: "/Nusantara%20Retail.png", scale: "scale-[1.3]" },
  { name: "Digikidz", logo: "/digikidz.png", scale: "scale-[1.2]" },
  { name: "GBI Taman Mahkota", logo: "/gbitamanmahkota.png", scale: "scale-[1.2]" },
  { name: "PT Sany Makmur Perkasa", logo: "/ptsanymakmurperkasa.png", scale: "scale-[1.2]" },
  { name: "Telkom", logo: "/telkom.png", scale: "scale-[1.2]" },
  { name: "HASHMICRO", logo: "/hashmicrosquare.png", scale: "scale-[1.2]" },
];

// Data Paket Layanan
const packages = [
  {
    title: "Company Profile",
    icon: Globe,
    body: (
      <>
        Di era digital <b>memiliki website se-penting reputasi</b> memiliki kantor, toko atau
        nomor kontak. Hasil survei Google 7 dari 10 konsumen menemukan produk melalui website.
        Apa lagi yang kamu tunggu? Ada <b>3,5 miliar konsumen menunggumu di Google setiap harinya</b>.
      </>
    ),
    cta: "buat web perusahaan-ku sekarang",
    to: "/harga/company-profile",
    minH: "min-h-[308px]",
  },
  {
    title: "E-Commerce",
    icon: ShoppingCart,
    body: (
      <>
        Banyak pemilik bisnis mencari cara bagaimana menaikkan omsetnya 2x lipat setiap tahunnya.
        Kajian Google dari Ecommerce Europe, menyatakan bahwa <b>cara pertama melipatgandakan
        pendapatan</b> adalah dengan <b>memiliki toko online</b>.
      </>
    ),
    cta: "buat web toko online-ku sekarang",
    to: "/harga/e-commerce",
    minH: "min-h-[291px]",
  },
  {
    title: "Marketplace",
    icon: Monitor,
    body: (
      <>
        Ciptakan pasar yang lebih besar dengan cara bekerja bersama pebisnis lain dalam lingkup
        satu kota untuk menjual berbagai macam kategori produk dalam 1 platform website.
        Berdasarkan Coresight Research, <b>pendapatan situs marketplace pada Tahun 2022 akan
        bertumbuh hingga 2x lipat</b>.
      </>
    ),
    cta: "buat web mall online-ku sekarang",
    to: "/harga/marketplace",
    minH: "min-h-[326px]",
  },
];

const HEX_CLIP = "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)";

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    document.title = "Jasa Pembuatan Website, Web Design, Asia";

    // Font Open Sans (dipakai di section paket & form)
    const id = "font-open-sans";
    if (!document.getElementById(id)) {
      const link = document.createElement("link");
      link.id = id;
      link.rel = "stylesheet";
      link.href =
        "https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap";
      document.head.appendChild(link);
    }
  }, []);

  // Scroll otomatis ke bagian tertentu, misal "/#konsultasi" (dari halaman harga & Layanan)
  useEffect(() => {
    if (!hash) return;
    const t = setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
    return () => clearTimeout(t);
  }, [hash]);

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-neutral-900 selection:text-white overflow-x-hidden">
      <Header />

      {/* HERO CAROUSEL */}
     <section className="relative h-[max(680px,90svh)] md:h-[600px] bg-black">
        <HeroCarousel />
      </section>

      {/* SECTION KLIEN */}
      <section className="w-full bg-white py-20 md:py-28 px-6 lg:px-12 overflow-visible">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center overflow-visible">
          
          {/* TEKS SEBELAH KIRI */}
          <div className="lg:col-span-6 text-neutral-800">
            <h2 className="text-3xl sm:text-4xl md:text-[42px] font-light leading-[1.18] tracking-tight mb-6">
              Jasa Pembuatan Website yang dipercaya{" "}
              <span className="font-bold text-neutral-900 block mt-1 uppercase tracking-tight">
                RIBUAN KLIEN AKTIF
              </span>{" "}
              di Asia Pasifik
            </h2>
            <p className="text-sm md:text-base text-neutral-600 font-normal leading-relaxed max-w-xl">
              Pelajari mengapa design website yang BERNILAI BISNIS itu penting, dan bagaimana sebuah perusahaan jasa website design membuat website yang BERNILAI BISNIS.
            </p>
          </div>

          {/* CLUSTER HEXAGON */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center pt-14 pb-10 overflow-visible">
            
            {/* Baris 1: 2 Hexagon */}
            <div className="flex justify-center gap-3 sm:gap-4 relative z-10 overflow-visible">
              <HexCard item={clientLogos[0]} />
              <HexCard item={clientLogos[1]} />
            </div>

            {/* Baris 2: 3 Hexagon */}
            <div className="flex justify-center gap-3 sm:gap-4 -mt-6 sm:-mt-8 relative z-20 overflow-visible">
              <HexCard item={clientLogos[2]} />
              <HexCard item={clientLogos[3]} />
              <HexCard item={clientLogos[4]} />
            </div>

            {/* Baris 3: 2 Hexagon */}
            <div className="flex justify-center gap-3 sm:gap-4 -mt-6 sm:-mt-8 relative z-10 overflow-visible">
              <HexCard item={clientLogos[5]} />
              <HexCard item={clientLogos[6]} />
            </div>

          </div>

        </div>
      </section>

      {/* WRAPPER GRADASI: putih -> abu muda (#E6E6E6), ada glow putih tipis di tengah */}
      <div
        style={{
          background:
            "radial-gradient(ellipse 70% 35% at 50% 22%, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0) 70%), linear-gradient(to bottom, #FFFFFF 0%, #F7F7F7 12%, #EFEFEF 40%, #EAEAEA 72%, #E6E6E6 100%)",
        }}
      >
      {/* SECTION PAKET LAYANAN */}
      <section
        className="w-full pt-8 pb-16 px-6"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        <div className="max-w-[780px] mx-auto">
          {/* Heading */}
          <div className="text-center text-[#262626]">
            <h3 className="text-[16px] sm:text-[20px] font-light tracking-[0.04em] leading-[1.3]">
              Apapun pilihanmu{" "}
              <span className="font-semibold underline underline-offset-4 decoration-[#8A8A8A] decoration-1">
                semua bisa diupgrade
              </span>
              .
              <br />
              Tentukan pilihanmu sekarang!
            </h3>
            <p className="mt-3 text-[11px] sm:text-[12px] leading-[1.75] tracking-[0.04em] text-[#4D4D4D]">
              Tersedia beragam paket pembuatan website yang dapat disesuaikan dengan kebutuhanmu.
              <br className="hidden sm:block" />{" "}
              Tanpa harus merekrut <b>desainer &amp; programer berkualitas</b>{" "}
              <s>yang mahal</s>.
            </p>
          </div>

          {/* Kartu paket */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-x-5 gap-y-12 items-start">
            {packages.map((pkg) => (
              <div key={pkg.title} className="flex flex-col items-center">
                <PackageCard pkg={pkg} />
                <GoogleNote />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION CUSTOM + FORM */}
      <section
        id="konsultasi"
        className="w-full pt-4 pb-10 px-6"
        style={{ fontFamily: "'Open Sans', sans-serif" }}
      >
        {/* Semua ukuran di dalam sini memakai px asli Nectar, lalu diskala lewat zoom.
            Ubah angka zoom kalau mau lebih besar / kecil (1 = ukuran asli Nectar). */}
        <div
          className="max-w-[1028px] mx-auto grid grid-cols-1 md:grid-cols-[300px_320px_288px] gap-x-[60px] gap-y-12 items-start justify-items-center md:justify-items-stretch"
          style={{ zoom: 0.75 }}
        >
          {/* Logo Creativa Laboratorium (di samping kartu Custom, sejajar puncak hexagon) */}
          <div className="hidden md:flex w-[260px] flex-col items-center md:justify-self-start">
            <img
              src="/logo.png"
              alt="Creativa Laboratorium"
              className="w-[260px] h-[260px] object-contain"
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
            <span
              className="mt-5 w-full text-center text-[38px] leading-[42px] font-black tracking-[0.04em] text-[#262626]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              CREATIVA
            </span>
            <span
              className="mt-1.5 w-full text-center pl-[0.3em] text-[16px] tracking-[0.3em] uppercase text-[#6B6B6B]"
              style={{ fontFamily: "'Cinzel', serif" }}
            >
              Laboratorium
            </span>
          </div>

          {/* Kartu Custom */}
          <div className="relative w-full max-w-[320px] pt-[39px]">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
              <HexIcon Icon={Settings} w={70} h={78} iconClass="w-9 h-9" />
            </div>
            <div className="bg-[#FAFAFA] border border-[#D9D9D9] rounded-[24px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-[38px] pt-[46px] pb-[40px] min-h-[411px] text-center">
              <h4 className="text-[21px] leading-[28px] font-semibold tracking-[0.04em] text-[#262626]">
                Custom
              </h4>
              <span className="mx-auto mt-2 block h-px w-10 bg-[#A8A8A8]" />
              <p className="mt-[12px] text-[14px] leading-[23.5px] text-[#262626]">
                Belum menemukan paket layanan yang sesuai dengan kebutuhanmu?{" "}
                <b>Perlu jasa pembuatan website dengan layanan khusus?</b> Website dengan
                kebutuhan khusus, membutuhkan penanganan khusus. Hubungi tim kami yang akan
                membantumu dan merencanakan apa yang kamu butuhkan, untuk membuat website yang
                ideal dengan tujuan bisnismu.
              </p>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </section>
      </div>

      <Footer />
    </div>
  );
}

// Hexagon charcoal dengan ring abu tipis untuk ikon di atas kartu
function HexIcon({
  Icon,
  w = 52,
  h = 60,
  iconClass = "w-6 h-6",
}: {
  Icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  w?: number;
  h?: number;
  iconClass?: string;
}) {
  return (
    <div
      className="bg-[#BDBDBD] flex items-center justify-center"
      style={{ width: w, height: h, clipPath: HEX_CLIP }}
    >
      <div
        className="bg-gradient-to-br from-[#7C7C7C] to-[#3F3F3F] flex items-center justify-center"
        style={{ width: w - 4, height: h - 5, clipPath: HEX_CLIP }}
      >
        <Icon className={`${iconClass} text-white`} strokeWidth={1.4} />
      </div>
    </div>
  );
}

// Kartu paket (dipakai 3 paket)
function PackageCard({
  pkg,
}: {
  pkg: {
    title: string;
    icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
    body: React.ReactNode;
    cta?: string;
    to?: string;
    minH: string;
  };
}) {
  return (
    <div className="relative w-full max-w-[246px] pt-[30px]">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
        <HexIcon Icon={pkg.icon} />
      </div>
      <div
        className={`bg-[#FAFAFA] border border-[#D9D9D9] rounded-[28px] shadow-[0_8px_24px_rgba(0,0,0,0.08)] px-6 pt-[27px] pb-6 text-center flex flex-col items-center ${pkg.minH}`}
      >
        <h4 className="text-[15px] font-semibold tracking-[0.04em] text-[#262626]">{pkg.title}</h4>
        <span className="mt-2 block h-px w-8 bg-[#A8A8A8]" />
        <p className="mt-2.5 text-[10.5px] leading-[18px] text-[#262626]">{pkg.body}</p>
        {pkg.cta && pkg.to && (
          <Link
            to={pkg.to}
            className="mt-4 block w-full max-w-[190px] cursor-pointer text-center no-underline rounded-full bg-gradient-to-br from-[#7C7C7C] to-[#3F3F3F] hover:from-[#6E6E6E] hover:to-[#303030] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition-colors text-white font-bold text-[12.5px] leading-[19px] py-[7px] px-3"
            style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
          >
            {pkg.cta}
          </Link>
        )}
      </div>
    </div>
  );
}

function GoogleNote() {
  return (
    <p className="mt-3 text-[10.5px] text-[#4D4D4D]">
      Gratis 1 email profesional dari{" "}
      <span className="font-semibold">
        <span className="text-[#4285F4]">G</span>
        <span className="text-[#EA4335]">o</span>
        <span className="text-[#FBBC05]">o</span>
        <span className="text-[#4285F4]">g</span>
        <span className="text-[#34A853]">l</span>
        <span className="text-[#EA4335]">e</span>
      </span>{" "}
      <span className="font-bold">Workspace</span>
    </p>
  );
}

// Form kontak (ukuran asli Nectar)
function ContactForm() {
  const [hasWebsite, setHasWebsite] = useState<"sudah" | "belum" | "">("");

  const labelCls = "block text-[#262626] mb-[9px] leading-[14px]";
  const labelStyle = { fontSize: "12px" } as const;
  const inputCls =
    "w-full h-[40px] rounded-full bg-white border border-[#D4D4D4] px-4 text-[#262626] placeholder:text-[#A3A3A3] outline-none focus:border-[#6B6B6B] focus:bg-white transition-colors";
  const inputStyle = { fontSize: "14px" } as const;
  const req = <span className="text-red-500">*</span>;

  return (
    <form
      className="w-full"
      style={{ fontFamily: "Arial, Helvetica, sans-serif" }}
      onSubmit={(e) => {
        e.preventDefault();
        // TODO: sambungkan ke endpoint backend kamu
      }}
    >
      <div className="space-y-[21px]">
        <div>
          <label className={labelCls} style={labelStyle}>Nama Lengkap :{req}</label>
          <input type="text" required className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Email :{req}</label>
          <input type="email" required placeholder="alamat e-mail bisnis" className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Nomor handphone (WhatsApp) :{req}</label>
          <input type="tel" required placeholder="081......." className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Nama Perusahaan/Bisnis :{req}</label>
          <input type="text" required placeholder="PT. ....." className={inputCls} style={inputStyle} />
        </div>
        <div>
          <label className={labelCls} style={labelStyle}>Jabatan :</label>
          <input type="text" placeholder="Owner, Direktur, Manager, IT, dll...." className={inputCls} style={inputStyle} />
        </div>

        <div>
          <label className={labelCls} style={labelStyle}>
            Sudah Ada Website<span className="text-red-500">*</span>
          </label>
          <div className="pl-[5px] space-y-[7px]">
            {(["sudah", "belum"] as const).map((v) => (
              <label
                key={v}
                className="flex items-center gap-[6px] h-5 cursor-pointer text-[#262626]"
                style={{ fontSize: "12.5px", lineHeight: "1" }}
              >
                <input
                  type="radio"
                  name="website"
                  checked={hasWebsite === v}
                  onChange={() => setHasWebsite(v)}
                  style={{ width: "13px", height: "13px", margin: 0, accentColor: "#2B2B2B" }}
                />
                {v === "sudah" ? "Sudah" : "Belum"}
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className={`${labelCls} whitespace-nowrap`} style={labelStyle}>
            Alamat Website : (Jika sudah memiliki Website)
          </label>
          <input type="text" placeholder="www......." className={inputCls} style={inputStyle} />
        </div>

        <div>
          <label className={labelCls} style={labelStyle}>Apa Masalah Websitemu? :{req}</label>
          <textarea
            required
            placeholder="Kami membutuhkan bantuan dalam..."
            className="w-full h-[66px] rounded-[18px] bg-white border border-[#D4D4D4] px-4 py-2 text-[#262626] placeholder:text-[#A3A3A3] outline-none focus:border-[#6B6B6B] focus:bg-white transition-colors resize-y overflow-hidden"
            style={{ fontSize: "14px", lineHeight: "1.4" }}
          />
        </div>

        {/* Placeholder reCAPTCHA (ganti dengan widget asli + site key kamu) */}
        <div className="flex h-[60px] w-[257px] max-w-full shadow-[0_0_5px_rgba(0,0,0,0.35)] rounded-[2px] overflow-hidden">
          <div
            className="bg-[#1A73E8] text-white font-bold flex items-center flex-1 px-4"
            style={{ fontSize: "12px" }}
          >
            protected by reCAPTCHA
          </div>
          <div className="w-[71px] bg-[#F9F9F9] flex items-center justify-center">
            <svg width="38" height="38" viewBox="0 0 64 64" aria-hidden="true">
              <path d="M32 8a24 24 0 0 1 20.8 12L44 25l18 4V8l-6 6.5A32 32 0 0 0 32 0z" fill="#1C3AA9" />
              <path d="M12 20.2A24 24 0 0 1 32 8V0A32 32 0 0 0 4.2 16z" fill="#4285F4" />
              <path d="M52.8 44A24 24 0 0 1 32 56v8a32 32 0 0 0 27.8-16z" fill="#ABABAB" />
              <path d="M12 44a24 24 0 0 1-4-12H0a32 32 0 0 0 4.2 16z" fill="#B8B8B8" />
            </svg>
          </div>
        </div>

        <div className="pt-[14px]">
          <button
            type="submit"
            className="cursor-pointer rounded-full bg-gradient-to-br from-[#7C7C7C] to-[#3F3F3F] hover:from-[#6E6E6E] hover:to-[#303030] shadow-[0_3px_8px_rgba(0,0,0,0.18)] transition-colors text-white font-bold w-[114px] h-[38px]"
            style={{ fontSize: "12.5px" }}
          >
            HUBUNGI
          </button>
        </div>
      </div>
    </form>
  );
}

// Komponen Card Hexagon dengan Filter Drop-Shadow 6 Sisi
function HexCard({ item }: { item: { name: string; logo: string } }) {
  return (
    <div className="relative group cursor-pointer transition-all duration-300 hover:-translate-y-1.5 hover:z-30 filter drop-shadow-[0_12px_20px_rgba(0,0,0,0.08)] hover:drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]">
      <div 
        className="w-28 h-32 sm:w-36 sm:h-40 bg-white flex items-center justify-center p-4 sm:p-6 transition-colors duration-300 group-hover:bg-neutral-50"
        style={{
          clipPath: "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)"
        }}
      >
        <img 
          src={item.logo} 
          alt={item.name} 
          className="max-w-[80%] max-h-[60%] object-contain transition-all duration-300 group-hover:scale-110"
          onError={(e) => {
            const target = e.currentTarget;
            target.style.display = "none";
            if (target.parentElement) {
              const textNode = document.createElement("span");
              textNode.className = "text-xs font-bold text-neutral-800 text-center px-2";
              textNode.innerText = item.name;
              target.parentElement.appendChild(textNode);
            }
          }}
        />
      </div>
    </div>
  );
}