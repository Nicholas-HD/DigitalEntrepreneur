import React from "react";
import { Link } from "react-router";
import { Globe, ShoppingCart, Store, Settings } from "lucide-react";
import Header from "./Header";
import Footer from "./Footer";

const googleFootnote = (
  <>
    Gratis 1 email profesional dari{" "}
    <span className="font-medium">
      <span className="text-[#4285F4]">G</span>
      <span className="text-[#EA4335]">o</span>
      <span className="text-[#FBBC05]">o</span>
      <span className="text-[#4285F4]">g</span>
      <span className="text-[#34A853]">l</span>
      <span className="text-[#EA4335]">e</span> Workspace
    </span>
  </>
);

const services = [
  {
    id: "company-profile",
    title: "Company Profile",
    icon: <Globe className="w-8 h-8 text-white" />,
    desc: (
      <>
        Di era digital <span className="font-bold text-neutral-900">memiliki website se-penting reputasi</span> memiliki kantor, toko atau nomor kontak. Hasil survei Google 7 dari 10 konsumen menemukan produk melalui website. Apa lagi yang kamu tunggu? Ada <span className="font-bold text-neutral-900">3,5 milliar konsumen menunggu di Google</span> setiap harinya.
      </>
    ),
    buttonText: "buat web perusahaan-ku sekarang",
    href: "/harga/company-profile",
    footnote: googleFootnote,
  },
  {
    id: "ecommerce",
    title: "E-Commerce",
    icon: <ShoppingCart className="w-8 h-8 text-white" />,
    desc: (
      <>
        Banyak pemilik bisnis mencari cara bagaimana menaikkan omsetnya 2x lipat setiap tahunnya. Kajian Google dari Ecommerce Europe, menyatakan bahwa{" "}
        <span className="font-bold text-neutral-900">
          cara pertama melipatgandakan pendapatan
        </span>{" "}
        adalah dengan <span className="font-bold text-neutral-900">memiliki toko online</span>.
      </>
    ),
    buttonText: "buat web toko online-ku sekarang",
    href: "/harga/e-commerce",
    footnote: googleFootnote,
  },
  {
    id: "marketplace",
    title: "Marketplace",
    icon: <Store className="w-8 h-8 text-white" />,
    desc: (
      <>
        Ciptakan pasar yang lebih besar dengan cara bekerja bersama pebisnis lain dalam lingkup satu kota untuk menjual berbagai macam kategori produk dalam 1 platform website. Berdasarkan Coresight Research,{" "}
        <span className="font-bold text-neutral-900">
          pendapatan situs marketplace pada Tahun 2022 akan bertumbuh hingga 2x lipat
        </span>.
      </>
    ),
    buttonText: "buat web mall online-ku sekarang",
    href: "/harga/marketplace",
    footnote: googleFootnote,
  },
  {
    id: "custom",
    title: "Custom",
    icon: <Settings className="w-8 h-8 text-white" />,
    desc: (
      <>
        Belum menemukan paket layanan yang sesuai dengan kebutuhanmu?{" "}
        <span className="font-bold text-neutral-900">
          Perlu jasa pembuatan website dengan layanan khusus?
        </span>{" "}
        Website dengan kebutuhan khusus, membutuhkan penanganan khusus. Hubungi tim kami yang akan membantumu dan merencanakan apa yang kamu butuhkan, untuk membuat website yang ideal dengan tujuan bisnismu.
      </>
    ),
    buttonText: "konsultasikan website custom-ku",
    href: "/#konsultasi",
    footnote: null,
  },
];

export default function Layanan() {
  return (
    <div className="min-h-screen bg-neutral-50 font-sans selection:bg-orange-500 selection:text-white">
      <Header />

      {/* SECTION PAKET LAYANAN */}
      <section className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight mb-4">
            Pilihan Paket Layanan Website
          </h1>
          <p className="text-neutral-600 max-w-2xl mx-auto text-sm sm:text-base">
            Solusi pembuatan website profesional dengan performa tinggi dan dirancang khusus sesuai dengan kebutuhan bisnis Anda.
          </p>
        </div>

        {/* GRID 4 KARTU LAYANAN */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 pt-10">
          {services.map((service) => (
            <div
              key={service.id}
              className="relative bg-white rounded-3xl p-6 sm:p-7 pt-12 flex flex-col justify-between items-center text-center shadow-[0_10px_30px_rgba(0,0,0,0.06)] border border-neutral-100 hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 group"
            >
              {/* ICON HEXAGON ATAS TENGAH */}
              <div
                className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-[#f26522] flex items-center justify-center filter drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                style={{
                  clipPath:
                    "polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)",
                }}
              >
                {service.icon}
              </div>

              {/* KONTEN KARTU */}
              <div className="w-full flex flex-col items-center">
                <h3 className="text-xl sm:text-2xl font-extrabold text-neutral-800 mb-5">
                  {service.title}
                </h3>
                <p className="text-xs sm:text-[13px] leading-relaxed text-neutral-600 font-normal mb-8">
                  {service.desc}
                </p>
              </div>

              {/* TOMBOL & FOOTNOTE */}
              <div className="w-full flex flex-col items-center">
                <Link
                  to={service.href}
                  className="w-full cursor-pointer bg-[#ea6228] hover:bg-[#d8531a] text-white text-xs sm:text-sm font-bold tracking-wide py-3.5 px-4 rounded-full transition-all duration-200 shadow-md hover:shadow-lg inline-block leading-tight uppercase sm:normal-case no-underline"
                >
                  {service.buttonText}
                </Link>

                {/* SUBTEXT GOOGLE WORKSPACE */}
                {service.footnote ? (
                  <p className="text-[11px] sm:text-xs text-neutral-800 font-normal mt-4">
                    {service.footnote}
                  </p>
                ) : (
                  <div className="h-4 mt-4" />
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}