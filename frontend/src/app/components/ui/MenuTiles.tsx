import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { motion } from "framer-motion";
import { Building2, BookOpen, Users, Briefcase, Sparkles } from "lucide-react";
import { DotChevron, DotArrow } from "./DotIcons";
import LiquidGlass from "./LiquidGlass";

const EASE = [0.16, 1, 0.3, 1] as const;
const TILE_IMAGES: Record<string, string> = {};

// ===== TEMA KACA DESKTOP (gaya "Plans & pricing") =====
// Semua warna kartu/pill desktop diatur di sini. Kalau terlalu keruh di background-mu,
// naikkan/turunkan angka alpha (angka terakhir) atau gelapkan warnanya.
const THEME = {
  text: "text-white",
  // kaca taupe gelap transparan (gambar 1)
  cardTint: "rgba(76, 64, 56, 0.50)",
  cardHover: "rgba(98, 84, 74, 0.58)",
  pillTint: "rgba(62, 52, 45, 0.55)",
  pillHover: "rgba(86, 74, 65, 0.62)",
  // garis tepi tipis & samar (bukan putih tebal)
  rim: "linear-gradient(180deg, rgba(255,255,255,0.50) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.30) 100%)",
  rimWidth: 1,
  shadow:
    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 3px -1px rgba(0,0,0,0.25), 0 20px 40px -12px rgba(0,0,0,0.30)",
  // warna tile icon: biru, emas, peach (urut dari card pertama)
  tileColors: [
    "linear-gradient(160deg,#5b9be6 0%,#2f6fc4 100%)",
    "linear-gradient(160deg,#e2c08c 0%,#9d7a4a 100%)",
    "linear-gradient(135deg,#ffe9dc 0%,#ffa57a 100%)",
  ],
  arrowCard: 44,
  arrowPill: 44,
  iconCard: 96,
  gridWidth: "min(80vw, 940px, 120vh)",
};

// Tema terang untuk submenu mobile (mengikuti varian terang Cleo)
const MOBILE_LIGHT = {
  text: "#ffffff",
  cardTint: "rgba(76, 36, 32, 0.30)",
  cardHover: "rgba(76, 36, 32, 0.40)",
  pillTint: "rgba(50, 34, 28, 0.42)",
  pillHover: "rgba(50, 34, 28, 0.52)",
  rim: "linear-gradient(180deg, rgba(255,255,255,0.55) 0%, rgba(255,255,255,0.18) 40%, rgba(255,255,255,0.12) 70%, rgba(255,255,255,0.30) 100%)",
  rimWidth: 1,
  shadow:
    "inset 0 1px 0 rgba(255,255,255,0.22), inset 0 -2px 3px -1px rgba(0,0,0,0.25), 0 18px 36px -14px rgba(0,0,0,0.30)",
  tileColors: THEME.tileColors,
};

function TileIcon({ title, route, size, warm = false, tint }: {
  title: string; route: string; size: number; warm?: boolean; tint?: string;
}) {
  const t = title.toLowerCase();
  const Icon = /profil|profile|company|perusahaan/.test(t)
    ? Building2
    : /sejarah|history|visi|vision|misi|mission|value/.test(t)
    ? BookOpen
    : /client|klien|testimon/.test(t)
    ? Users
    : /karir|career|lowongan|job|职业|招聘/.test(t)
    ? Briefcase
    : Sparkles;
  const img = TILE_IMAGES[route];

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4, ease: EASE, delay: 0.1 }}
      className={`relative flex-shrink-0 flex items-center justify-center overflow-hidden bg-gradient-to-br ${
        warm ? "from-[#8a6552] to-[#3a1d13]" : "from-[#eadccb] to-[#a08c7d]"
      } shadow-[inset_0_1px_0_rgba(255,255,255,0.5)]`}
      style={{ width: size, height: size, borderRadius: size * 0.27, ...(tint ? { background: tint } : {}) }}
    >
      {img ? (
        <img src={img} alt="" className="w-full h-full object-cover" />
      ) : (
        <Icon className="text-white" style={{ width: size * 0.42, height: size * 0.42 }} strokeWidth={1.5} />
      )}
      <motion.span
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.95) 1px, transparent 1.5px)",
          backgroundSize: "5px 5px",
        }}
        initial={{ opacity: 1 }}
        animate={{ opacity: 0.28 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      />
    </motion.span>
  );
}

type SubLink = { title: string; href: string };

// Skala ukuran mengikuti lebar layar (ukuran dasar contoh = lebar 502px)
function useCleoScale() {
  const get = () =>
    typeof window === "undefined" ? 1 : Math.min(Math.max(window.innerWidth, 320), 560) / 502;
  const [k, setK] = useState(get);
  useEffect(() => {
    const on = () => setK(get());
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return k;
}

export function SubMenuTiles({
  links,
  resolveRoute,
  onNavigate,
}: {
  links: SubLink[];
  resolveRoute: (href: string, title: string) => string;
  onNavigate: () => void;
}) {
  const T = MOBILE_LIGHT;
  const k = useCleoScale();
  const px = (n: number) => Math.round(n * k);

  const wide = links[0];
  const tiles = links.slice(1, 3);
  const pills = links.slice(3);
  const gap = px(14);

  const label = (extra?: React.CSSProperties): React.CSSProperties => ({
    fontSize: px(18),
    fontWeight: 300,
    lineHeight: 1.25,
    letterSpacing: "0.01em",
    color: T.text,
    ...extra,
  });
  const glass = (pill = false) => ({
    tint: pill ? T.pillTint : T.cardTint,
    hoverTint: pill ? T.pillHover : T.cardHover,
    rim: T.rim,
    rimWidth: T.rimWidth,
  });
  const tint = (i: number) => T.tileColors[i % T.tileColors.length];
  const arrow = (size: number) => (
    <span className="relative flex flex-shrink-0">
      <DotArrow size={size}/>
    </span>
  );
  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.35, ease: EASE, delay: 0.04 + i * 0.05 },
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap }}>
      {wide && (
        <motion.div {...reveal(0)}>
          <LiquidGlass
            as={Link}
            to={resolveRoute(wide.href, wide.title)}
            onClick={onNavigate}
            {...glass()}
            className="group flex items-center active:scale-[0.985]"
            style={{
              height: px(178),
              borderRadius: px(56),
              padding: `0 ${px(40)}px 0 ${px(41)}px`,
              gap: px(16),
              boxShadow: T.shadow,
              color: T.text,
            }}
          >
            <TileIcon title={wide.title} route={resolveRoute(wide.href, wide.title)} size={px(102)} tint={tint(0)} />
            <span className="relative flex-1 text-center" style={label()}>
              {wide.title}
            </span>
            {arrow(px(30))}
          </LiquidGlass>
        </motion.div>
      )}

      {tiles.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: tiles.length > 1 ? "1fr 1fr" : "1fr", gap }}>
          {tiles.map((sub, i) => (
            <motion.div key={`${sub.href}-${i}`} {...reveal(i + 1)}>
              <LiquidGlass
                as={Link}
                to={resolveRoute(sub.href, sub.title)}
                onClick={onNavigate}
                {...glass()}
                className="group flex flex-col items-center justify-between text-center active:scale-[0.985]"
                style={{
                  height: px(285),
                  borderRadius: px(56),
                  padding: `${px(40)}px ${px(12)}px ${px(38)}px`,
                  boxShadow: T.shadow,
                  color: T.text,
                }}
              >
                <TileIcon title={sub.title} route={resolveRoute(sub.href, sub.title)} size={px(102)} tint={tint(i + 1)} />
                <span className="relative px-1" style={label()}>
                  {sub.title}
                </span>
                {arrow(px(30))}
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      )}

      {pills.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap }}>
          {pills.map((sub, i) => (
            <motion.div
              key={`${sub.href}-${i}`}
              {...reveal(i + 3)}
              style={pills.length === 1 ? { gridColumn: "1 / -1" } : undefined}
            >
              <LiquidGlass
                as={Link}
                to={resolveRoute(sub.href, sub.title)}
                onClick={onNavigate}
                {...glass(true)}
                className="group flex items-center justify-between active:scale-[0.985]"
                style={{
                  height: px(105),
                  borderRadius: 9999,
                  padding: `0 ${px(22)}px 0 ${px(31)}px`,
                  gap: px(8),
                  boxShadow: T.shadow,
                  color: T.text,
                }}
              >
                <span className="relative min-w-0" style={label({ fontSize: px(17) })}>
                  {sub.title}
                </span>
                {arrow(px(30))}
              </LiquidGlass>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}

     

export function DesktopTiles({
  links,
  resolveRoute,
  onNavigate,
}: {
  links: SubLink[];
  resolveRoute: (href: string, title: string) => string;
  onNavigate: () => void;
}) {
  // ---------- State hover: card mana yang aktif ----------
  const [active, setActive] = useState<string | null>(null);
  const leaveTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const enter = (key: string) => {
    if (leaveTimer.current) clearTimeout(leaveTimer.current);
    setActive(key);
  };
  const leave = () => {
    // jeda singkat supaya tidak berkedip saat kursor lewat celah antar card
    leaveTimer.current = setTimeout(() => setActive(null), 60);
  };

  // card aktif tajam, sisanya blur + redup
  const stateCls = (key: string) =>
    active === null || active === key ? "" : "blur-[7px] opacity-60";

  const base = `group relative block ${THEME.text} hover:scale-[1.015] active:scale-[0.985]`;
  const gap = "gap-[clamp(14px,2.6vw,32px)]";
 const cardRadius = "rounded-[clamp(32px,6vw,80px)]";

  const reveal = (i: number) => ({
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.4, ease: EASE, delay: 0.05 + i * 0.06 },
  });

  const isPillLink = (s: SubLink) => /client|klien|testimon/i.test(s.title);
  const items = [...links.filter((s) => !isPillLink(s)), ...links.filter(isPillLink)];
  const n = items.length;

  // ---------- Card vertikal ----------
    // ---------- Card vertikal ----------
  const bentoCard = (sub: SubLink, i: number, place: string) => {
    const route = resolveRoute(sub.href, sub.title);
    const key = `${sub.href}-${i}`;
    return (
      <motion.div
        key={key}
        {...reveal(i)}
        onMouseEnter={() => enter(key)}
        onMouseLeave={leave}
        className={`${place} min-h-0 min-w-0`}
      >
        <LiquidGlass
          as={Link}
          to={route}
          onClick={onNavigate}
          tint={THEME.cardTint}
          hoverTint={THEME.cardHover}
          rim={THEME.rim}
          rimWidth={THEME.rimWidth}
          style={{ boxShadow: THEME.shadow }}
          className={`${base} ${stateCls(key)} ${cardRadius} h-full w-full px-5 pt-[9%] pb-[8%] flex flex-col items-center justify-between text-center`}
        >
          <TileIcon
            title={sub.title}
            route={route}
            size={THEME.iconCard}
            warm
            tint={THEME.tileColors[i % THEME.tileColors.length]}
          />
          <span className="text-[clamp(15px,1.6vw,22px)] font-light leading-snug tracking-wide px-2">
            {sub.title}
          </span>
          <DotArrow size={THEME.arrowCard} />
        </LiquidGlass>
      </motion.div>
    );
  };

  // ---------- Pill ----------
  const pillItem = (sub: SubLink, i: number, place: string) => {
    const route = resolveRoute(sub.href, sub.title);
    const key = `${sub.href}-${i}`;
    return (
      <motion.div
        key={key}
        {...reveal(i)}
        onMouseEnter={() => enter(key)}
        onMouseLeave={leave}
        className={`${place} min-h-0 min-w-0`}
      >
        <LiquidGlass
          as={Link}
          to={route}
          onClick={onNavigate}
          tint={THEME.pillTint}
          hoverTint={THEME.pillHover}
          rim={THEME.rim}
          rimWidth={THEME.rimWidth}
          style={{ boxShadow: THEME.shadow }}
          className={`${base} ${stateCls(key)} h-full w-full rounded-full px-[9%] flex items-center justify-between gap-4 text-[clamp(16px,1.9vw,24px)] font-light whitespace-nowrap`}
        >
          <span>{sub.title}</span>
          <DotArrow size={THEME.arrowPill} />
        </LiquidGlass>
      </motion.div>
    );
  };

  // ---------- Layout bento (3 s/d 5 menu) ----------
  if (n >= 3 && n <= 5) {
    const tall = items[0];
    const mids = items.slice(1, 3);
    const pills = items.slice(3);
    const hasPills = pills.length > 0;

    return (
      <div
        className={`grid grid-cols-3 ${gap} mx-auto`}
        style={{
  width: THEME.gridWidth,
  aspectRatio: "1110 / 548",
  gridTemplateRows: "380fr 138fr",
}}
      >
        {bentoCard(tall, 0, "col-start-1 row-start-1 row-span-2")}
        {bentoCard(mids[0], 1, `col-start-2 row-start-1 ${hasPills ? "" : "row-span-2"}`)}
        {bentoCard(mids[1], 2, `col-start-3 row-start-1 ${hasPills ? "" : "row-span-2"}`)}

        {pills.length === 1 && pillItem(pills[0], 3, "col-start-2 col-span-2 row-start-2")}
        {pills.length === 2 && (
          <>
            {pillItem(pills[0], 3, "col-start-2 row-start-2")}
            {pillItem(pills[1], 4, "col-start-3 row-start-2")}
          </>
        )}
      </div>
    );
  }

  // ---------- Fallback 1-2 menu ----------
  if (n < 3) {
    return (
      <div className={`flex items-stretch justify-center ${gap}`}>
        {items.map((sub, i) =>
          bentoCard(sub, i, "w-[clamp(220px,26vw,340px)] h-[clamp(320px,46vh,420px)]")
        )}
      </div>
    );
  }

  // ---------- Fallback > 5 menu ----------
  return (
    <div className={`grid grid-cols-3 ${gap}`}>
      {items.map((sub, i) => bentoCard(sub, i, "h-[clamp(220px,30vh,280px)]"))}
    </div>
  );
}