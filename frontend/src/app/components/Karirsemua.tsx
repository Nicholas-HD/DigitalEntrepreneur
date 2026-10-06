import React, { useMemo, useState } from "react";
import { Link } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronDown, RotateCcw } from "lucide-react";
import { JOBS, groupByDepartment, pickLang, term, deptName, type Lang, type L10n, type Job } from "./careerData";

const EASE = [0.16, 1, 0.3, 1] as const;

const T = {
  title: { id: "Posisi Terbuka", en: "Open Positions", zh: "开放职位" },
  filters: { id: "Filter:", en: "Filters:", zh: "筛选：" },
  reset: { id: "Atur ulang filter", en: "Reset filters", zh: "重置筛选" },
  department: { id: "Departemen", en: "Department", zh: "部门" },
  employmentType: { id: "Tipe Pekerjaan", en: "Employment Type", zh: "工作类型" },
  location: { id: "Lokasi", en: "Location", zh: "地点" },
  locationType: { id: "Tipe Lokasi", en: "Location Type", zh: "办公方式" },
  empty: { id: "Tidak ada lowongan yang cocok.", en: "No roles match these filters.", zh: "没有符合条件的职位。" },
  back: { id: "Kembali", en: "Back", zh: "返回" },
} satisfies Record<string, L10n<string>>;

type FilterKey = "department" | "employmentType" | "location" | "locationType";
type Filters = Record<FilterKey, string>;

const FILTER_KEYS: FilterKey[] = ["department", "employmentType", "location", "locationType"];
const EMPTY_FILTERS: Filters = { department: "", employmentType: "", location: "", locationType: "" };

const labelOf = (key: FilterKey, value: string, lang: Lang) =>
  key === "department" ? deptName(value, lang) : term(value, lang);

function FilterSelect({
  value,
  onChange,
  placeholder,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  options: { value: string; label: string; count: number }[];
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={placeholder}
        className="w-full appearance-none rounded-lg border border-[#3a1d13]/20 bg-white pl-4 pr-10 py-3 text-[16px] text-[#3a1d13] focus:outline-none focus:border-[#3a1d13] cursor-pointer transition-colors"
      >
        <option value="">{placeholder}</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label} ({o.count})
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#3a1d13]/60" />
    </div>
  );
}

export default function KarirSemua() {
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);
  const [f, setF] = useState<Filters>(EMPTY_FILTERS);

  // Opsi tiap filter diambil dari data lowongan, lengkap dengan jumlahnya
  const optionsFor = (key: FilterKey) => {
    const counts = new Map<string, number>();
    JOBS.forEach((j) => counts.set(j[key], (counts.get(j[key]) ?? 0) + 1));
    return Array.from(counts, ([value, count]) => ({ value, count, label: labelOf(key, value, lang) }));
  };

  const filtered = useMemo(
    () => JOBS.filter((j: Job) => FILTER_KEYS.every((k) => !f[k] || j[k] === f[k])),
    [f]
  );
  const groups = groupByDepartment(filtered);
  const hasActiveFilter = FILTER_KEYS.some((k) => f[k]);
  const set = (k: FilterKey) => (v: string) => setF((p) => ({ ...p, [k]: v }));

  return (
    <main className="min-h-screen bg-white text-[#3a1d13] font-sans pt-8 pb-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto w-full max-w-3xl"
      >
        {/* Bar atas: panah kembali + logo */}
        <div className="relative flex items-center justify-center h-16">
          <Link
            to="/karir"
            aria-label={T.back[lang]}
            className="absolute left-0 w-10 h-10 -ml-2 flex items-center justify-center rounded-full text-[#3a1d13]/60 hover:text-[#3a1d13] hover:bg-[#3a1d13]/[0.05] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <Link to="/" aria-label="Creativa Laboratorium" className="flex items-center gap-3">
            <img src="/logo.png" alt="" className="w-10 h-10 object-contain flex-shrink-0" />
            <span className="flex flex-col leading-none text-[#3a1d13]" style={{ fontFamily: "'Cinzel', serif" }}>
              <span className="text-[24px] font-black tracking-[0.08em]">CREATIVA</span>
              <span className="mt-1 text-[9px] tracking-[0.28em] text-[#3a1d13]/70">LABORATORIUM</span>
            </span>
          </Link>
        </div>

        <h1 className="mt-10 text-[26px] sm:text-[28px] font-semibold tracking-tight">
          {T.title[lang]} ({filtered.length})
        </h1>

        {/* Filter */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-3 min-h-[24px]">
            <p className="text-[15px] font-semibold text-[#3a1d13]/60">{T.filters[lang]}</p>
            {hasActiveFilter && (
              <button
                type="button"
                onClick={() => setF(EMPTY_FILTERS)}
                className="inline-flex items-center gap-1.5 text-[15px] text-[#3a1d13]/70 hover:text-[#3a1d13] cursor-pointer transition-colors"
              >
                <RotateCcw className="w-4 h-4" />
                {T.reset[lang]}
              </button>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {FILTER_KEYS.map((k) => (
              <FilterSelect
                key={k}
                value={f[k]}
                onChange={set(k)}
                placeholder={T[k][lang]}
                options={optionsFor(k)}
              />
            ))}
          </div>
        </div>

        {/* Daftar lowongan per departemen */}
        {groups.length === 0 ? (
          <p className="mt-16 text-center text-[17px] text-[#3a1d13]/60">{T.empty[lang]}</p>
        ) : (
          <div className="mt-12 space-y-10">
            {groups.map(({ department, items }) => (
              <section key={department}>
                <h2 className="text-[22px] font-semibold mb-3">{deptName(department, lang)}</h2>
                <ul>
                  {items.map((job) => (
                    <li key={job.slug}>
                      {/* Buka detail di tab baru, sama seperti di halaman Karir */}
                      <Link
                        to={`/karir/${job.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block -mx-4 px-4 py-4 rounded-lg hover:bg-[#3a1d13]/[0.04] transition-colors"
                      >
                        <span className="block text-[18px] font-semibold">{job.title[lang]}</span>
                        <span className="mt-1.5 block text-[15px] text-[#3a1d13]/60">
                          {[
                            deptName(job.department, lang),
                            term(job.location, lang),
                            term(job.employmentType, lang),
                            term(job.locationType, lang),
                          ].join(" • ")}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>
        )}
      </motion.div>
    </main>
  );
}