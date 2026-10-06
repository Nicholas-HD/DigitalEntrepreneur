import React from "react";
import { Link } from "react-router";
import { ShieldX, Home } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next"; // Untuk deteksi bahasa

export default function Forbidden() {
  const { t, i18n } = useTranslation(); // Aktifkan fungsi t dan i18n

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        {/* Ikon */}
        <div className="mb-8 flex justify-center">
          <div className="relative">
            <ShieldX className="w-32 h-32 text-white" strokeWidth={1.5} />
            <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">403</span>
            </div>
          </div>
        </div>

        {/* TEKS TERJEMAHAN - Pastikan key ini ada di config.ts */}
        <h1 className="text-5xl font-bold mb-6">
          {t("forbidden_title")}
        </h1>
        <p className="text-xl text-gray-300 mb-12">
          {t("forbidden_desc")}
        </p>

        {/* Tombol Home */}
        <Link
          to="/"
          className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
        >
          <Home className="w-5 h-5" />
          {t("back_home")}
        </Link>

        {/* TOMBOL PENGETES BAHASA (Klik ini buat tes) */}
        <div className="mt-16 flex gap-4 justify-center border-t border-gray-800 pt-8">
          <button 
            onClick={() => i18n.changeLanguage("id")}
            className="px-4 py-2 border border-gray-600 rounded hover:bg-white hover:text-black transition-all"
          >
            Bahasa Indonesia
          </button>
          <button 
            onClick={() => i18n.changeLanguage("zh")}
            className="px-4 py-2 border border-gray-600 rounded hover:bg-white hover:text-black transition-all"
          >
            中文 (Chinese)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
