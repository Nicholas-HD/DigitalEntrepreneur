import React, { useEffect, useRef, useState } from "react";
import { DotIcon, DotChevron, DotPlus, DotArrow } from "./ui/DotIcons";
import { useNavigate, useLocation } from "react-router";
import { ChevronDown } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { useTranslation } from "react-i18next";
import { MULTILINGUAL_MENU_DATA, LANGUAGES } from "./menuData";

// Komponen yang telah dipisah (Import dari folder UI)
import LiquidGlass from "./ui/LiquidGlass";
import { SubMenuTiles, DesktopTiles } from "./ui/MenuTiles";

// Easing Apple-style smooth
const EASE = [0.16, 1, 0.3, 1] as const;
const EASE_CSS = "cubic-bezier(0.16, 1, 0.3, 1)";
const U = "calc(var(--u) * ";

// true  = tombol bahasa (desktop) / hamburger (mobile) ikut sembunyi saat scroll turun
// false = tetap diam seperti tombol "Get the app" di Cleo
const HIDE_RIGHT_ON_SCROLL = true;
const MOBILE_TOP = "max(1.25rem,env(safe-area-inset-top))";

// true = saat halaman dimuat (mobile), logo & tombol menu mulai terang lalu menggelap (meniru Cleo)
const INTRO_FLASH = true;

const glassPanel = "bg-black/40 backdrop-blur-xl backdrop-saturate-150 border border-white/20 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_16px_40px_rgba(0,0,0,0.2)]";

const MENU = {
  bg: "linear-gradient(180deg, rgb(178,178,183) 0%, rgb(167,171,177) 17%, rgb(108,106,96) 55%, rgb(91,88,74) 65%, rgb(82,79,67) 70%, rgb(87,85,73) 81%, rgb(67,67,61) 100%)",
  cardTint: "rgba(76, 36, 32, 0.30)",
  pillTint: "rgba(50, 34, 28, 0.42)",
  chipTint: "rgba(60, 50, 50, 0.30)", // logo & tombol close
  divider: "rgba(60, 30, 26, 0.28)",
  shadow:
    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 3px -1px rgba(0,0,0,0.25), 0 18px 36px -14px rgba(0,0,0,0.30)",
};

const mobilePanelStyle: React.CSSProperties = {
  backgroundColor: MENU.cardTint,
  boxShadow: MENU.shadow,
};

const GLASS_CSS = `
.hdr-reset button, .hdr-reset a { text-transform: none; font-weight: 400; letter-spacing: 0; }
@media (prefers-reduced-motion: reduce) { .dot-anim { transition: none !important; } }
.custom-scrollbar::-webkit-scrollbar { display: none; }
.custom-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
`;

const toLabelCase = (str: string) =>
  /[A-Z]/.test(str) && str === str.toUpperCase()
    ? str.toLowerCase().replace(/(^|\s)\S/g, (c) => c.toUpperCase())
    : str;

export default function Header() {
  const { i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileView, setMobileView] = useState<string | null>(null);
  const [mobileLangOpen, setMobileLangOpen] = useState(false);

  const [booted, setBooted] = useState(
  () => !INTRO_FLASH || typeof window === "undefined" || window.innerWidth >= 1024
);
useEffect(() => {
  if (booted) return;
  const t = setTimeout(() => setBooted(true), 650);
  return () => clearTimeout(t);
}, [booted]);

  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [hoverId, setHoverId] = useState<string | null>(null);
  const [hl, setHl] = useState<{ left: number; width: number } | null>(null);
  const navRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [langOpen, setLangOpen] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const reduceMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);
  const dirAcc = useRef(0);
  const lockRef = useRef(false);

  lockRef.current = mobileMenuOpen || mobileLangOpen || langOpen || !!openMenuId;

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 24);
    const diff = y - lastY.current;
    lastY.current = y;
    if (diff === 0 || reduceMotion) return;

    // Tepat di paling atas halaman: selalu tampil
    if (y <= 4) {
      dirAcc.current = 0;
      setHidden(false);
      return;
    }
    if (lockRef.current) {
      dirAcc.current = 0;
      return;
    }

    // Akumulasi jarak scroll searah; reset kalau arah berubah.
    // Cukup 1x scroll mouse: sembunyi setelah turun +-8px, muncul lagi setelah naik +-8px.
    // (Transisi yang halus diatur di hideT, bukan lewat ambang scroll.)
    if (Math.sign(diff) !== Math.sign(dirAcc.current)) dirAcc.current = 0;
    dirAcc.current += diff;
    if (dirAcc.current > 8) setHidden(true);
    else if (dirAcc.current < -8) setHidden(false);
  });

  useEffect(() => {
    if (mobileMenuOpen || openMenuId || langOpen || mobileLangOpen) setHidden(false);
  }, [mobileMenuOpen, openMenuId, langOpen, mobileLangOpen]);

  // Selalu mulai dari atas saat pindah halaman (termasuk di iOS Safari)
useEffect(() => {
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
}, []);

useEffect(() => {
  if (location.hash) return; // biarkan link anchor (#...) bekerja
  const html = document.documentElement;
  const prev = html.style.scrollBehavior;
  html.style.scrollBehavior = "auto"; // matikan smooth scroll sementara

  const toTop = () => {
    window.scrollTo(0, 0);
    html.scrollTop = 0;
    document.body.scrollTop = 0;
  };
  toTop();
  const raf = requestAnimationFrame(toTop);
  const t = setTimeout(() => {
    toTop();
    html.style.scrollBehavior = prev;
  }, 150); // ulang sekali lagi setelah layout iOS selesai

  return () => {
    cancelAnimationFrame(raf);
    clearTimeout(t);
    html.style.scrollBehavior = prev;
  };
}, [location.pathname]);

  const isLightPage =
    location.pathname.includes("client") ||
    location.pathname.includes("klien") ||
    location.pathname.includes("testimon") ||
    location.pathname.includes("about") ||
    location.pathname.includes("company") ||
    location.pathname.includes("karir") ||
    location.pathname.includes("career") ||
    location.pathname.includes("harga");

  const currentLang = (i18n.language?.split("-")[0] || "id") as "id" | "en" | "zh";
  const activeMenuList = MULTILINGUAL_MENU_DATA[currentLang] || MULTILINGUAL_MENU_DATA.id;
  const currentLangObj = LANGUAGES.find((l) => l.code === currentLang) || LANGUAGES[0];
  const currentActiveData = activeMenuList.find((m) => m.id === openMenuId);
  const hlTargetId = hoverId ?? openMenuId;
  const mobileSubData = activeMenuList.find((m) => m.id === mobileView) || null;

  const uiLight = isLightPage && !mobileMenuOpen;
const textColor = uiLight ? "text-[#3a1d13]" : "text-white";
const logoInvert = uiLight ? "" : "brightness-0 invert";

const chipLight = uiLight || !booted; // dipakai logo & tombol menu saja

  const resolveRoute = (href: string, title: string) => {
  const t = title.toLowerCase();
  if (t.includes("perusahaan") || t.includes("company") || t.includes("公司")) return "/sejarah";
  if (t.includes("sejarah") || t.includes("visi")) return "/sejarah";
  if (t.includes("sambutan")) return "/tentang";
  return href;
};

  const linksOf = (m: { column1: { title: string; href: string }[]; column2: { title: string; href: string }[] }) =>
    [...m.column1, ...m.column2].filter((s) => s.title);

  const handleSelectLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setLangOpen(false);
    setMobileLangOpen(false);
  };

  const closeDesktop = () => {
    setOpenMenuId(null);
    setHoverId(null);
  };

  const closeMobile = () => {
    setMobileMenuOpen(false);
    setMobileLangOpen(false);
    setMobileView(null);
  };

  useEffect(() => {
    const update = () => {
      const el = hlTargetId ? navRefs.current[hlTargetId] : null;
      if (el) setHl({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [hlTargetId, currentLang]);

  useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, []);

  useEffect(() => {
  const lock = mobileMenuOpen || !!openMenuId;
  document.documentElement.style.overflow = lock ? "hidden" : "";
  document.body.style.overflow = lock ? "hidden" : "";

  const onKey = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      closeMobile();
      closeDesktop();
    }
  };
  document.addEventListener("keydown", onKey);
  return () => {
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.removeEventListener("keydown", onKey);
  };
}, [mobileMenuOpen, openMenuId]);

  // Transisi sembunyi/tampil menu & bahasa: durasi panjang + delay bertahap (tidak instan).
  // Meniru Cleo: setelah scroll berhenti sebentar (hideDelay), menu naik cepat dengan ease-in.
  // Muncul lagi lebih halus (ease-out).
  const hideT = (hideDelay: number, showDelay = 0, hideDur = 0.3) =>
    hidden
      ? { duration: hideDur, ease: [0.4, 0, 1, 1] as const, delay: hideDelay }
      : { duration: 0.55, ease: EASE, delay: showDelay };

  const intro = (delay: number) => ({
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, ease: EASE, delay },
  });

  return (
    <>
      <style>{GLASS_CSS}</style>

            {/* ===== OVERLAY MOBILE ===== */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            key="mobile-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "linear" }}
            onClick={closeMobile}
            className="hdr-reset lg:hidden fixed inset-0 z-40 select-none font-sans"
            style={{ background: MENU.bg }}
          >
            <div
              className="h-full flex flex-col px-3 pb-[max(1.625rem,env(safe-area-inset-bottom))]"
              style={{ paddingTop: `calc(${MOBILE_TOP} + 48px + 36px)` }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex-1 overflow-y-auto mb-4 custom-scrollbar">
                <AnimatePresence mode="wait" initial={false}>
                  {!mobileSubData ? (
                    <motion.div
                      key="list"
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -12 }}
                      transition={{ duration: 0.22, ease: EASE }}
                      className="rounded-[32px] border border-white/25 overflow-hidden"
                      style={mobilePanelStyle}
                    >
                      {activeMenuList.map((item, i) => (
                        <React.Fragment key={item.id}>
                          {i > 0 && (
                            <div aria-hidden="true" className="mx-[10px] h-px" style={{ background: MENU.divider }} />
                          )}
                          <button
                            type="button"
                            onClick={() => setMobileView(item.id)}
                            className="group w-full min-h-[76px] px-7 flex items-center justify-between text-left text-[17px] text-white cursor-pointer active:bg-white/10 transition-colors"
                          >
                            <span>{toLabelCase(item.label)}</span>
                            <DotPlus />
                          </button>
                        </React.Fragment>
                      ))}
                    </motion.div>
                  ) : (
                    <motion.div
                      key={`sub-${mobileSubData.id}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.2, ease: EASE }}
                    >
                      <motion.button
                        type="button"
                        initial={{ opacity: 0, x: -6 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, ease: "linear" }}
                        onClick={() => setMobileView(null)}
                        className="group cursor-pointer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 12,
                          height: 48,
                          margin: "0 0 10px",
                          padding: "0 4px",
                          background: "none",
                          border: 0,
                          boxShadow: "none",
                          borderRadius: 0,
                          color: "#ffffff",
                          fontSize: 17,
                          fontWeight: 400,
                          textTransform: "none",
                        }}
                      >
                        <span style={{ display: "flex", transform: "rotate(180deg)" }}>
                          <DotArrow size={30} />
                        </span>
                        <span>{toLabelCase(mobileSubData.label)}</span>
                      </motion.button>
                      <SubMenuTiles links={linksOf(mobileSubData)} resolveRoute={resolveRoute} onNavigate={closeMobile} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Selector Bahasa Mobile */}
              <div className={`mt-auto shrink-0 relative transition-opacity duration-300 ${mobileSubData ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
                <AnimatePresence>
                  {mobileLangOpen && (
                    <motion.ul
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.2, ease: EASE }}
                      className="absolute bottom-full mb-3 inset-x-0 rounded-3xl border border-white/25 p-2"
                      style={{ background: "rgba(50,34,28,0.72)", boxShadow: MENU.shadow }}
                    >
                      {LANGUAGES.map((l) => (
                        <li key={l.code}>
                          <button
                            type="button"
                            onClick={() => handleSelectLanguage(l.code)}
                            className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-[15px] text-left text-white cursor-pointer transition-colors ${
                              l.code === currentLang ? "bg-white/15" : "hover:bg-white/10"
                            }`}
                          >
                            {l.flag}
                            <span>{l.dropdownLabel}</span>
                          </button>
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
                <button
                  type="button"
                  onClick={() => setMobileLangOpen((v) => !v)}
                  className="w-full h-[54px] rounded-full flex items-center justify-center gap-3 text-[16px] text-white border border-white/25 cursor-pointer active:scale-[0.98] transition-transform"
                  style={{ backgroundColor: MENU.pillTint, boxShadow: MENU.shadow }}
                >
                  {currentLangObj.flag}
                  <span>{toLabelCase(currentLangObj.activeLabel)}</span>
                  <ChevronDown className="w-4 h-4 transition-transform duration-300" style={{ transform: mobileLangOpen ? "rotate(180deg)" : "none" }} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* ===== OVERLAY DESKTOP ===== */}
      <AnimatePresence>
        {currentActiveData && (
          <motion.div
            key="desktop-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={closeDesktop}
            aria-hidden="true"
            className="hidden lg:block fixed inset-0 z-40 bg-black/35 backdrop-blur-xl backdrop-saturate-150"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {currentActiveData && (
          <motion.div
            key="desktop-menu"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="hdr-reset hidden lg:flex fixed inset-0 z-[45] items-center justify-center pt-16 pb-8 pointer-events-none select-none font-sans"
          >
            <div className="pointer-events-auto">
              <DesktopTiles key={currentActiveData.id} links={linksOf(currentActiveData)} resolveRoute={resolveRoute} onNavigate={closeDesktop} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ===== MAIN HEADER ===== */}
      {/* Desktop: jarak dari tepi atas layar = 40px (px langsung, bukan dikali --u, supaya hasilnya pasti).
          Ubah angka di lg:!top-[40px] kalau mau lebih naik/turun. */}
      <motion.header
        className="hdr-reset pointer-events-none fixed lg:!top-[40px] inset-x-0 z-50 px-4 sm:px-6 lg:!px-[calc(var(--u)*40)] select-none font-sans"
        style={{ top: `calc(${MOBILE_TOP})`, "--u": "clamp(0.75px, 0.0521vw, 1.15px)" } as React.CSSProperties}
        onClick={(e) => { if (e.target === e.currentTarget) setOpenMenuId(null); }}
      >
        <div className="mx-auto flex items-center justify-between relative w-full">

          {/* LOGO */}
          <motion.div {...intro(0)} className="justify-self-start">
            <LiquidGlass
              isLight={chipLight}
tint={mobileMenuOpen ? MENU.chipTint : undefined}
hoverTint={mobileMenuOpen ? "rgba(60,50,50,0.40)" : undefined}
              dense={scrolled}
              onClick={() => { closeMobile(); closeDesktop(); navigate("/"); }}
              className="pointer-events-auto h-[42px] lg:h-[calc(var(--u)*56)] pl-3 pr-4 lg:pl-[calc(var(--u)*16)] lg:pr-[calc(var(--u)*20)] rounded-[21px] rounded-bl-[6px] lg:[border-radius:calc(var(--u)*28)_calc(var(--u)*28)_calc(var(--u)*28)_3px] flex items-center gap-2 lg:gap-[calc(var(--u)*10)] cursor-pointer hover:scale-[1.02] active:scale-95 transition-transform"
            >
              <img src="/logo.png" alt="Logo" className={`w-[26px] h-[26px] lg:w-[calc(var(--u)*34)] lg:h-[calc(var(--u)*34)] object-contain flex-shrink-0 ${chipLight ? "" : "brightness-0 invert"}`} />
              <span className={`flex flex-col leading-none ${chipLight ? "text-[#3a1d13]" : "text-white"}`} style={{ fontFamily: "'Cinzel', serif" }}>
                <span className="text-[14px] lg:text-[length:calc(var(--u)*20)] font-black tracking-[0.08em]">CREATIVA</span>
                <span className={`hidden lg:block lg:mt-[calc(var(--u)*4)] lg:text-[length:calc(var(--u)*8)] tracking-[0.28em] $chipLight ? "text-[#3a1d13]/70" : "text-white/70"}`}>LABORATORIUM</span>
              </span>
            </LiquidGlass>
          </motion.div>

          {/* MENU DESKTOP */}
          {activeMenuList.length > 0 ? (
            <motion.div {...intro(0.08)} className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <motion.div
                animate={{ y: hidden ? "-130%" : "0%", opacity: hidden ? 0 : 1 }}
                transition={hideT(0.15, 0, 0.28)}
                style={{ pointerEvents: hidden ? "none" : "auto" }}
              >
              <LiquidGlass as="nav" isLight={isLightPage} dense={scrolled} className="rounded-full flex items-center" style={{ padding: `${U}8)` }} onMouseLeave={() => setHoverId(null)}>
                <span
                  aria-hidden="true"
                  className="absolute rounded-full pointer-events-none"
                  style={{
                    top: `${U}8)`, bottom: `${U}8)`, left: hl?.left ?? 0, width: hl?.width ?? 0,
                    opacity: hlTargetId && hl ? 1 : 0,
                    backgroundColor: isLightPage ? "rgba(58, 29, 19, 0.07)" : "rgba(255, 255, 255, 0.18)",
                    boxShadow: isLightPage ? "inset 0 1.5px 0 rgba(255,255,255,0.95), inset 0 -2px 3px -1px rgba(58,29,19,0.2), 0 1px 2px rgba(58,29,19,0.06)" : "inset 0 1.5px 0 rgba(255,255,255,0.55), inset 0 -2px 3px -1px rgba(0,0,0,0.35)",
                    transition: `left 450ms ${EASE_CSS}, width 450ms ${EASE_CSS}, opacity 250ms ease`,
                  }}
                >
                  <span
                    className="absolute inset-0 rounded-[inherit]"
                    style={{
                      padding: 1,
                      background: isLightPage ? "linear-gradient(180deg, rgba(255,255,255,0.95), rgba(255,255,255,0) 45%, rgba(58,29,19,0) 55%, rgba(58,29,19,0.3))" : "linear-gradient(180deg, rgba(255,255,255,0.7), rgba(255,255,255,0) 45%, rgba(255,255,255,0) 55%, rgba(0,0,0,0.4))",
                      WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)", WebkitMaskComposite: "xor", maskComposite: "exclude",
                    }}
                  />
                </span>
                {activeMenuList.map((item, idx) => (
                  <button
                    key={item.id}
                    ref={(el) => { navRefs.current[item.id] = el; }}
                    type="button"
                    aria-haspopup="true"
                    aria-expanded={openMenuId === item.id}
                    onMouseEnter={() => setHoverId(item.id)}
                    onFocus={() => setHoverId(item.id)}
                    onBlur={() => setHoverId(null)}
                    onClick={() => setOpenMenuId((cur) => (cur === item.id ? null : item.id))}
                    className={`relative z-10 rounded-full flex items-center font-medium whitespace-nowrap cursor-pointer transition-colors ${textColor}`}
                    style={{ height: `${U}48)`, padding: `0 ${U}42)`, fontSize: `${U}16)` }}
                  >
                    <motion.span initial={{ opacity: 0, filter: "blur(6px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ duration: 0.6, ease: EASE, delay: 0.3 + idx * 0.08 }}>
                      {toLabelCase(item.label)}
                    </motion.span>
                    <span
                      aria-hidden="true"
                      className={`absolute left-1/2 -translate-x-1/2 bottom-[calc(var(--u)*6)] w-[4px] h-[4px] rounded-full transition-opacity duration-300 ${isLightPage ? "bg-[#3a1d13]" : "bg-white"}`}
                      style={{ opacity: hoverId === item.id && openMenuId !== item.id ? 0.9 : 0 }}
                    />
                  </button>
                ))}
              </LiquidGlass>
              </motion.div>
            </motion.div>
          ) : (
            <div className="hidden lg:block" />
          )}

          {/* KANAN */}
          <motion.div {...intro(0.16)} className="justify-self-end flex items-center">
            <motion.div
              className="flex items-center"
              animate={{
                y: hidden && HIDE_RIGHT_ON_SCROLL ? "-130%" : "0%",
                opacity: hidden && HIDE_RIGHT_ON_SCROLL ? 0 : 1,
              }}
              transition={hideT(0.3, 0.1, 0.32)}
              style={{ pointerEvents: hidden && HIDE_RIGHT_ON_SCROLL ? "none" : "auto" }}
            >
            {/* Bahasa Desktop */}
            <div className="hidden lg:block relative" ref={langRef}>
              <LiquidGlass
                as="button"
                type="button"
                isLight={isLightPage}
                dense={scrolled}
                onClick={() => setLangOpen((v) => !v)}
                aria-haspopup="listbox"
                aria-expanded={langOpen}
                className={`rounded-full flex items-center cursor-pointer font-medium ${textColor}`}
                style={{ height: `${U}56)`, padding: `0 ${U}30)`, gap: `${U}10)`, fontSize: `${U}16)` }}
              >
                {currentLangObj.flag}
                <span>{toLabelCase(currentLangObj.activeLabel)}</span>
                <ChevronDown className="w-3.5 h-3.5 transition-transform duration-300" style={{ transform: langOpen ? "rotate(180deg)" : "none" }} />
              </LiquidGlass>

              <AnimatePresence>
                {langOpen && (
                  <motion.ul
                    initial={{ opacity: 0, y: -6, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.98 }}
                    transition={{ duration: 0.2, ease: EASE }}
                    style={{ transformOrigin: "top right" }}
                    role="listbox"
                    className={`${glassPanel} absolute right-0 top-full mt-2 w-56 rounded-2xl p-1.5 text-white z-50`}
                  >
                    {LANGUAGES.map((l) => (
                      <li key={l.code}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={l.code === currentLang}
                          onClick={() => handleSelectLanguage(l.code)}
                          className={`w-full flex items-center gap-3 rounded-xl px-3 py-2 text-[13px] font-medium text-left transition-colors duration-200 cursor-pointer ${l.code === currentLang ? "bg-white/20" : "hover:bg-white/10"}`}
                        >
                          {l.flag}
                          <span>{l.dropdownLabel}</span>
                        </button>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </div>

            {/* Toggle Hamburger Mobile */}
            <LiquidGlass
              as="button"
              type="button"
              isLight={chipLight}
tint={mobileMenuOpen ? MENU.chipTint : undefined}
hoverTint={mobileMenuOpen ? "rgba(60,50,50,0.40)" : undefined}
style={mobileMenuOpen ? { border: "1.5px dashed rgba(255,255,255,0.9)" } : undefined}
              dense={scrolled}
              onClick={() => (mobileMenuOpen ? closeMobile() : setMobileMenuOpen(true))}
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
              aria-expanded={mobileMenuOpen}
              className="group lg:hidden w-[44px] h-[44px] rounded-full flex items-center justify-center cursor-pointer active:scale-95 transition-transform"
            >
              <DotIcon open={mobileMenuOpen} isLight={chipLight} />
            </LiquidGlass>
            </motion.div>
          </motion.div>

        </div>
      </motion.header>
    </>
  );
}