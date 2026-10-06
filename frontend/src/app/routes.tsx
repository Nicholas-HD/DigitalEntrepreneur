import React, { useEffect } from "react";
import { createBrowserRouter, Outlet, ScrollRestoration } from "react-router";
import { useTranslation } from "react-i18next";
import Home from "./components/Home";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Tentang from "./components/Tentang";
import HalamanSejarah from "./components/HalamanSejarah";
import Header from "./components/Header";
import Footer from "./components/Footer";
import KlienTestimoni from "./components/Klientestimoni";
import NotFound from "./components/NotFound";
import HargaWebsite from "./components/Hargawebsite";
import Karir from "./components/Karir";
import KarirSemua from "./components/Karirsemua";
import KarirDetail from "./components/KarirDetail";

// Judul bawaan dari index.html (versi Indonesia), dipakai untuk Home bahasa Indonesia.
const DEFAULT_TITLE = typeof document !== "undefined" ? document.title : "CreativaLab";

// Layout induk: reset scroll ke atas di setiap navigasi baru,
// pulihkan posisi saat back/forward, dan tetap menghormati hash (/#konsultasi).
function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

// Judul tab browser per halaman, mengikuti bahasa: "<judul> | CreativaLab".
// (Tanda "@" khusus halaman detail lowongan, ada di KarirDetail.)
// Kalau ada kode lain yang menimpa <title> tepat setelah render, judul dipasang ulang.
function PageTitle({
  titles,
  brand = true,
}: {
  titles: { id: string; en: string; zh: string };
  brand?: boolean;
}) {
  const { i18n } = useTranslation();
  const code = i18n.language?.split("-")[0];
  const lang = code === "en" || code === "zh" ? code : "id";
  const title = brand ? `${titles[lang]} | CreativaLab` : titles[lang];

  useEffect(() => {
    const prev = document.title;
    document.title = title;
    // Pasang ulang sesudah semua effect selesai, kalau ada kode lain yang menimpa <title>
    const timers = [
      setTimeout(() => {
        document.title = title;
      }, 0),
      setTimeout(() => {
        document.title = title;
      }, 300),
    ];
    return () => {
      timers.forEach(clearTimeout);
      document.title = prev;
    };
  }, [title]);

  return null;
}

export const router = createBrowserRouter([
  {
    element: <Root />,
    children: [
      {
        path: "/",
        element: (
          <>
            <PageTitle
              brand={false}
              titles={{
                id: DEFAULT_TITLE,
                en: "Website Development Services, Web Design, World",
                zh: "网站开发服务,  网页设计, 世界",
              }}
            />
            <Home />
          </>
        ),
      },
      {
        path: "/privacy-policy",
        element: (
          <>
            <PageTitle titles={{ id: "Kebijakan Privasi", en: "Privacy Policy", zh: "隐私政策" }} />
            <PrivacyPolicy />
          </>
        ),
      },
      {
        path: "/tentang",
        element: (
          <>
            <PageTitle titles={{ id: "Tentang Kami", en: "About Us", zh: "关于我们" }} />
            <Tentang />
          </>
        ),
      },
      {
        path: "/sejarah",
        element: (
          <>
            <PageTitle titles={{ id: "Sejarah, Visi & Misi", en: "History, Vision & Mission", zh: "历史、愿景与使命" }} />
            <HalamanSejarah />
          </>
        ),
      },
      {
        // Halaman Client & Testimonials
        path: "/klien",
        element: (
          <>
            <PageTitle titles={{ id: "Klien & Testimoni", en: "Clients & Testimonials", zh: "客户与评价" }} />
            <Header />
            <main className="pt-[100px] lg:pt-[140px]">
              <KlienTestimoni />
            </main>
            <Footer />
          </>
        ),
      },

      // ===== Halaman Karir =====
      // Karir & KarirDetail sudah punya <main> dan padding atas sendiri,
      // jadi di sini cukup dibungkus Header + Footer.
      {
        path: "/karir",
        element: (
          <>
            <PageTitle titles={{ id: "Karir", en: "Careers", zh: "职业发展" }} />
            <Header />
            <Karir />
            <Footer />
          </>
        ),
      },
      {
        // Daftar semua lowongan + filter: tanpa Header menu, hanya logo di tengah
        // (bar atas sudah ada di dalam KarirSemua). Harus ada sebelum /karir/:slug.
        path: "/karir/semua",
        element: (
          <>
            <PageTitle titles={{ id: "Posisi Terbuka", en: "Open Positions", zh: "开放职位" }} />
            <KarirSemua />
            <Footer />
          </>
        ),
      },
      {
        // Halaman detail: tanpa Header menu, hanya logo di tengah (lihat TopBar di KarirDetail)
        path: "/karir/:slug",
        element: (
          <>
            <KarirDetail />
            <Footer />
          </>
        ),
      },

      // ===== Halaman harga website =====
      // Padding atas diatur di dalam komponen HargaWebsite (.hw-wrap),
      // bukan di <main>, supaya background krem naik sampai ke paling atas.
      {
        path: "/harga/company-profile",
        element: (
          <>
            <PageTitle titles={{ id: "Harga Website Company Profile", en: "Company Profile Website Pricing", zh: "企业官网价格" }} />
            <Header />
            <main>
              <HargaWebsite type="company-profile" />
            </main>
            <Footer />
          </>
        ),
      },
      {
        path: "/harga/e-commerce",
        element: (
          <>
            <PageTitle titles={{ id: "Harga Website E-Commerce", en: "E-Commerce Website Pricing", zh: "电商网站价格" }} />
            <Header />
            <main>
              <HargaWebsite type="e-commerce" />
            </main>
            <Footer />
          </>
        ),
      },
      {
        path: "/harga/marketplace",
        element: (
          <>
            <PageTitle titles={{ id: "Harga Website Marketplace", en: "Marketplace Website Pricing", zh: "电商平台网站价格" }} />
            <Header />
            <main>
              <HargaWebsite type="marketplace" />
            </main>
            <Footer />
          </>
        ),
      },

      {
        // Semua URL yang tidak dikenal tampil sebagai halaman 404
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);