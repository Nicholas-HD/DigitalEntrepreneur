import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { JOBS, pickLang, ui, term, deptName, type Lang } from "./careerData";
import ApplicationForm from "./ApplicationForm";

const EASE = [0.16, 1, 0.3, 1] as const;

// Set judul tab browser. Kalau ada kode lain (mis. App/SEO) yang menimpa <title>
// tepat setelah render, judul dipasang ulang.
function useDocumentTitle(title: string) {
  useEffect(() => {
    const prev = document.title;
    document.title = title;
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
}

type Tab = "overview" | "application";

// Bar atas minimalis ala Cleo: panah kembali di kiri, logo Creativa di tengah
function TopBar({ lang }: { lang: Lang }) {
  return (
    <div className="relative flex items-center justify-center h-16">
      <Link
        to="/karir"
        aria-label={ui("back", lang)}
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
  );
}

export default function KarirDetail() {
  const { slug } = useParams();
  const { i18n } = useTranslation();
  const lang = pickLang(i18n.language);

  const job = JOBS.find((j) => j.slug === slug);
  const [tab, setTab] = useState<Tab>("overview");

  useEffect(() => {
    window.scrollTo(0, 0);
    setTab("overview");
  }, [slug]);

  // Judul tab browser: "Nama Posisi @CreativaLab"
  useDocumentTitle(`${job ? job.title[lang] : ui("notFound", lang)} @CreativaLab`);

  if (!job) {
    return (
      <main className="min-h-screen bg-white text-[#3a1d13] font-sans pt-8 pb-24 px-6">
        <div className="mx-auto w-full max-w-5xl">
          <TopBar lang={lang} />
          <div className="mt-28 text-center">
            <p className="text-xl font-light">{ui("notFound", lang)}</p>
            <Link to="/karir" className="mt-6 inline-block underline underline-offset-4 text-[15px]">
              {ui("backToList", lang)}
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const title = job.title[lang];

  const meta = [
    { label: ui("location", lang), value: term(job.location, lang) },
    { label: ui("employmentType", lang), value: term(job.employmentType, lang) },
    { label: ui("locationType", lang), value: term(job.locationType, lang) },
    { label: ui("department", lang), value: deptName(job.department, lang) },
    { label: ui("compensation", lang), value: job.compensation?.[lang] },
  ].filter((m) => m.value);

  // Tombol di tab Ringkasan: pindah ke tab Cara Melamar (form)
  const goToApplication = () => {
    setTab("application");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const ApplyButton = (
    <button
      type="button"
      onClick={goToApplication}
      className="block w-full text-center rounded-full bg-[#9c8579] hover:bg-[#8a7266] text-white text-[15px] font-medium py-4 transition-colors cursor-pointer"
    >
      {ui("apply", lang)}
    </button>
  );

  return (
    <main className="min-h-screen bg-white text-[#3a1d13] font-sans pt-8 pb-24 px-6">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto w-full max-w-5xl"
      >
        <TopBar lang={lang} />

        <h1 className="mt-12 text-3xl sm:text-4xl font-light tracking-tight">{title}</h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-16">
          {/* Sidebar info */}
          <dl className="space-y-6 text-[14px]">
            {meta.map((m) => (
              <div key={m.label}>
                <dt className="text-[12px] text-[#3a1d13]/50">{m.label}</dt>
                <dd className="mt-1">{m.value}</dd>
              </div>
            ))}
          </dl>

          {/* Konten */}
          <div>
            <div className="flex gap-8 border-b border-[#3a1d13]/10" role="tablist">
              {(["overview", "application"] as Tab[]).map((t) => (
                <button
                  key={t}
                  type="button"
                  role="tab"
                  aria-selected={tab === t}
                  onClick={() => setTab(t)}
                  className={`pb-3 -mb-px text-[14px] border-b-2 cursor-pointer transition-colors ${
                    tab === t
                      ? "border-[#3a1d13] text-[#3a1d13]"
                      : "border-transparent text-[#3a1d13]/50 hover:text-[#3a1d13]"
                  }`}
                >
                  {t === "overview" ? ui("tabOverview", lang) : ui("tabApplication", lang)}
                </button>
              ))}
            </div>

            {tab === "overview" ? (
              <motion.div
                key="overview"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="mt-8 space-y-8 text-[15px] leading-relaxed"
              >
                <div className="space-y-3">
                  {job.intro[lang].map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                <section>
                  <h2 className="text-[17px] font-medium mb-3">{ui("aboutRole", lang)}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.responsibilities[lang].map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h2 className="text-[17px] font-medium mb-3">{ui("lookingFor", lang)}</h2>
                  <ul className="list-disc pl-5 space-y-2">
                    {job.requirements[lang].map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </section>

                {ApplyButton}
              </motion.div>
            ) : (
              <motion.div
                key="application"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: EASE }}
              >
                <ApplicationForm lang={lang} jobSlug={job.slug} jobTitle={title} />
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </main>
  );
}