import React from "react";
import { Link } from "react-router";
import { SearchX, Home } from "lucide-react";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-4 font-sans">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-2xl"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.8, type: "spring" }}
          className="mb-8 flex justify-center"
        >
          <div className="relative">
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <SearchX className="w-32 h-32 text-white" strokeWidth={1.5} />
            </motion.div>
            <div className="absolute -top-2 -right-2 bg-white text-black rounded-full w-16 h-16 flex items-center justify-center">
              <span className="text-2xl font-bold">404</span>
            </div>
          </div>
        </motion.div>

        <h1 className="text-5xl font-bold mb-6">{t("notfound_title")}</h1>
        <p className="text-xl text-gray-400 mb-12">{t("notfound_desc")}</p>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            to="/"
            className="inline-flex items-center justify-center gap-2 bg-white text-black px-8 py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            <Home className="w-5 h-5" />
            {t("back_home")}
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
