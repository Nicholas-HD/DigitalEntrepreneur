import React, { useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { JOBS, groupByDepartment, pickLang, ui, term, deptName } from "./careerData";
import AnimatedTitle from "./AnimatedTitle";

const EASE = [0.16, 1, 0.3, 1] as const;

const SEE_ALL = { id: "Lihat semua", en: "See all", zh: "查看全部" } as const;

export default function Karir() {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);

  const groups = groupByDepartment(JOBS);
  // Satu departemen terbuka dalam satu waktu (seperti di referensi)
  const [open, setOpen] = useState<string | null>(groups[0]?.department ?? null);

  return (
    <main className="min-h-screen bg-white text-[#3a1d13] font-sans pt-40 pb-28 px-6">
      <div className="mx-auto w-full max-w-4xl">
        <AnimatedTitle
          text={ui("listTitle", lang)}
          className="text-center text-4xl sm:text-5xl font-light tracking-tight"
        />
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: 0.1 }}
          className="mt-4 text-center text-[15px] text-[#3a1d13]/60"
        >
          {ui("listSubtitle", lang)}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.15 }}
          className="mt-6 flex justify-center"
        >
          <Link
            to="/karir/semua"
            className="rounded-full border border-[#3a1d13]/20 px-6 py-2 text-[13px] hover:bg-[#3a1d13] hover:border-[#3a1d13] hover:text-white transition-colors"
          >
            {SEE_ALL[lang]}
          </Link>
        </motion.div>

        {groups.length === 0 ? (
          <p className="mt-20 text-center text-[#3a1d13]/60">{ui("noJobs", lang)}</p>
        ) : (
          <div className="mt-16">
            {groups.map(({ department, items }, gi) => {
              const isOpen = open === department;
              return (
                <motion.section
                  key={department}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.15 + gi * 0.06 }}
                  className="border-b border-[#3a1d13]/10"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? null : department)}
                    className={`group w-full flex items-center justify-between py-7 text-left cursor-pointer transition-colors duration-300 ${
                      isOpen ? "text-[#3a1d13]" : "text-[#3a1d13]/45 hover:text-[#3a1d13]"
                    }`}
                  >
                    <span className="text-[22px] font-light">{deptName(department, lang)}</span>
                    <span className="w-9 h-9 rounded-full bg-[#3a1d13]/[0.05] border border-[#3a1d13]/10 flex items-center justify-center">
                      <ChevronDown
                        className="w-4 h-4 transition-transform duration-500"
                        style={{ transform: isOpen ? "rotate(180deg)" : "none" }}
                      />
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="panel"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.45, ease: EASE }}
                        className="overflow-hidden"
                      >
                        <ul className="pb-6">
                          {items.map((job) => (
                            <li key={job.slug}>
                              {/* Buka detail lowongan di tab browser baru */}
                              <Link
                                to={`/karir/${job.slug}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center justify-between gap-4 py-3.5 border-t border-[#3a1d13]/10 text-[15px] hover:text-[#8a6552] transition-colors"
                              >
                                <span>{job.title[lang]}</span>
                                <span className="text-[12px] text-[#3a1d13]/55 text-right">
                                  {term(job.location, lang)} ({term(job.locationType, lang)})
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.section>
              );
            })}
          </div>
        )}
      </div>
    </main>
  );
}