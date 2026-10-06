import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Scale, Users, CreditCard, AlertTriangle } from "lucide-react";

export default function TermsOfService() {
  useEffect(() => {
    document.title = "Syarat & Ketentuan | GBI Taman Mahkota";
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#fafafa] font-sans selection:bg-neutral-900 selection:text-white flex flex-col">
      <Header />

      <main className="flex-grow py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto bg-white p-8 sm:p-12 rounded-2xl border border-neutral-200 shadow-sm">
          <div className="mb-10 border-b border-neutral-100 pb-8">
            <h1 className="text-3xl font-black text-neutral-900 tracking-tight mb-3">Syarat & Ketentuan</h1>
            <p className="text-sm text-neutral-500 leading-relaxed">
              Pembaruan Terakhir: 30 Agustus 2026. Dokumen ini merupakan perjanjian hukum yang mengikat antara Anda sebagai pengguna (jemaat) dan pengelola portal LINTAM GBI Taman Mahkota terkait batasan dan kewajiban penggunaan platform.
            </p>
          </div>

          <div className="space-y-8 text-sm text-neutral-700 leading-loose">
            <section>
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-3">
                <Users className="w-5 h-5 text-[#cf2e37]" /> 1. Kewajiban & Keamanan Akun LINTAM
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pengguna wajib memberikan informasi identitas yang akurat dan sah saat proses registrasi. Pemalsuan identitas untuk mengakses layanan sakramen dapat mengakibatkan penangguhan akun dan pembatalan layanan.</li>
                <li>Pengguna bertanggung jawab penuh atas kerahasiaan kata sandi dan token akses. Segala bentuk aktivitas yang terjadi menggunakan akun Anda sepenuhnya merupakan tanggung jawab Anda.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-3">
                <Scale className="w-5 h-5 text-[#cf2e37]" /> 2. Aturan Perilaku & Larangan
              </h2>
              <ul className="list-disc pl-5 space-y-2">
                <li>Pengguna dilarang keras melakukan penyalinan massal (<em>scraping</em>), pengiriman spam, atau menyalahgunakan direktori kontak anggota COOL untuk kepentingan komersial, bisnis multi-level (MLM), maupun kampanye politik.</li>
                <li>Dilarang mengunggah materi diskusi, foto profil, atau konten apapun yang mengandung unsur SARA, ujaran kebencian, atau melanggar norma kesusilaan. Pelanggaran akan berujung pada pemblokiran akses portal permanen.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-3">
                <CreditCard className="w-5 h-5 text-[#cf2e37]" /> 3. Transaksi Finansial
              </h2>
              <p>
                Seluruh transaksi pengiriman dana yang dilakukan melalui portal LINTAM (termasuk persepuluhan, persembahan kasih, donasi diakonia, dan janji iman) bersifat <strong>final dan tidak dapat dikembalikan (non-refundable)</strong>, kecuali jika terbukti terjadi kesalahan teknis ganda (<em>double deduction</em>) yang diakibatkan oleh malfungsi sistem *payment gateway*.
              </p>
            </section>

            <section>
              <h2 className="text-lg font-bold text-neutral-900 flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-[#cf2e37]" /> 4. Penyangkalan (Disclaimer) Pastoral
              </h2>
              <p>
                Informasi bimbingan, konseling pranikah, dan materi renungan yang disediakan dalam portal ini murni bersifat dukungan spiritual (<em>pastoral care</em>). Segala keputusan turunan yang diambil oleh jemaat terkait urusan finansial, medis, atau hukum berdasarkan bimbingan tersebut sepenuhnya merupakan tanggung jawab pribadi jemaat dan membebaskan pihak gereja dari tuntutan hukum terkait.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}