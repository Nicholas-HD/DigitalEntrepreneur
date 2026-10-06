import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";

interface LanguageOption {
  code: "id" | "en" | "zh";
  label: string; // Teks yang tampil di bilah navbar
  fullName: string; // Teks di dalam panel dropdown
  flag: string;
}

const LANGUAGES: LanguageOption[] = [
  {
    code: "id",
    label: "INDONESIAN",
    fullName: "Indonesian (Bahasa Indonesia)",
    flag: "https://flagcdn.com/w40/id.png",
  },
  {
    code: "en",
    label: "ENGLISH",
    fullName: "English (English)",
    flag: "https://flagcdn.com/w40/gb.png",
  },
  {
    code: "zh",
    label: "简体中文",
    fullName: "简体中文 (Chinese (Simplified))",
    flag: "https://flagcdn.com/w40/cn.png",
  },
];

interface LanguageSwitcherProps {
  isDark?: boolean;
}

export default function LanguageSwitcher({ isDark = false }: LanguageSwitcherProps) {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);

  const currentLangCode = (i18n.language?.split("-")[0] || "id") as "id" | "en" | "zh";
  const currentLang = LANGUAGES.find((l) => l.code === currentLangCode) || LANGUAGES[0];
  const otherLanguages = LANGUAGES.filter((l) => l.code !== currentLangCode);

  const handleSelectLanguage = (code: string) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  return (
    <div
      className="relative flex items-center h-full cursor-pointer select-none"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* TRIGGER BAR (PUTIH KETIKA DARK MODE) */}
      <div className="flex items-center gap-2 py-2 px-1">
        <img
          src={currentLang.flag}
          alt={currentLang.label}
          className="w-4 h-3 object-cover rounded-[1px] shadow-xs flex-shrink-0"
        />
        <span
          style={{ color: isDark ? "#ffffff" : "#111827" }}
          className="text-xs font-bold tracking-wider uppercase transition-colors duration-200"
        >
          {currentLang.label}
        </span>
      </div>

      {/* FLOATING HOVER PANEL DROPDOWN */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 2 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 2 }}
            transition={{ duration: 0.12, ease: "easeOut" }}
            className="absolute right-0 top-full pt-1.5 z-[9999] min-w-[240px]"
          >
            <div className="bg-white rounded-none shadow-2xl border border-neutral-200 py-2">
              {otherLanguages.map((lang) => (
                <button
                  key={lang.code}
                  type="button"
                  onClick={() => handleSelectLanguage(lang.code)}
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-left text-xs font-semibold text-neutral-800 hover:bg-neutral-100 hover:text-black transition-colors cursor-pointer"
                >
                  <img
                    src={lang.flag}
                    alt={lang.label}
                    className="w-4 h-3 object-cover rounded-[1px] shadow-xs flex-shrink-0"
                  />
                  <span className="whitespace-nowrap">{lang.fullName}</span>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}