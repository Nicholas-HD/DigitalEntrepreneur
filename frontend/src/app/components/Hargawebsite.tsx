// Letakkan di: frontend/src/app/components/Hargawebsite.tsx
import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router";
import ContactForm from "./Contactform";

export type SiteType = "company-profile" | "e-commerce" | "marketplace";

type Item = { text: string; isNew?: boolean };
type Group = { title: string; items: Item[]; storage?: { label: string; percent: number } };
type Plan = {
  name: string;
  desc: string;
  price: string;
  monthly: string;
  groups: Group[];
};

const companyProfilePlans: Plan[] = [
  {
    name: "Business",
    desc: "Untuk bisnis yang butuh website profesional dengan fondasi SEO.",
    price: "Rp 6.656.000",
    monthly: "382.334",
    groups: [
      {
        title: "Design & Build",
        items: [{ text: "Custom design" }, { text: "Mobile friendly" }, { text: "Revisi minor" }],
      },
      {
        title: "SEO",
        items: [
          { text: "Keyword research one page SEO" },
          { text: "GA on Dashboard" },
          { text: "Share GA (Report Monthly)" },
          { text: "SEO Basic (Title + Image)" },
        ],
      },
      {
        title: "Server",
        storage: { label: "Storage 22GB", percent: 69 },
        items: [
          { text: "Website storage 500 MB" },
          { text: "Double backup storage 1,5GB" },
          { text: "Email storage 20GB" },
          { text: "Uptime 99%" },
          { text: "Bandwidth unlimited" },
          { text: "Security (anti virus, anti spam, anti brute-force)" },
        ],
      },
      {
        title: "Support",
        items: [
          { text: "Fitur tambahan" },
          { text: "Upgraded website" },
          { text: "Update version" },
          { text: "Garansi projek selesai" },
          { text: "1x training online" },
          { text: "Video tutorial general" },
          { text: "Backup" },
        ],
      },
    ],
  },
  {
    name: "Enterprise",
    desc: "Untuk bisnis yang butuh performa, pendampingan, dan revisi lebih lengkap.",
    price: "Rp 19.631.800",
    monthly: "765.667",
    groups: [
      {
        title: "Design & Build",
        items: [
          { text: "Custom design" },
          { text: "Mobile friendly" },
          { text: "Revisi minor" },
          { text: "Revisi major", isNew: true },
          { text: "Redesignable", isNew: true },
        ],
      },
      {
        title: "SEO",
        items: [
          { text: "Keyword research one page SEO" },
          { text: "GA on Dashboard" },
          { text: "Share GA (Report Weekly)", isNew: true },
          { text: "SEO Basic (Title + Image)" },
          { text: "Website roentgen", isNew: true },
          { text: "Excellent bounce rate 40%", isNew: true },
        ],
      },
      {
        title: "Server",
        storage: { label: "Storage 32GB", percent: 100 },
        items: [
          { text: "Website storage 3GB", isNew: true },
          { text: "Double backup storage 9GB", isNew: true },
          { text: "Email storage 20GB" },
          { text: "Uptime 99.9%", isNew: true },
          { text: "Bandwidth unlimited" },
          { text: "Security (anti virus, anti spam, anti brute-force)" },
        ],
      },
      {
        title: "Support",
        items: [
          { text: "Fitur tambahan" },
          { text: "Upgraded website" },
          { text: "Update version" },
          { text: "Garansi projek selesai" },
          { text: "1x training on-site", isNew: true },
          { text: "Video tutorial personalized", isNew: true },
          { text: "Backup" },
        ],
      },
    ],
  },
];

const eCommercePlans: Plan[] = [
  {
    name: "Business",
    desc: "Untuk toko online yang baru mulai dengan fondasi SEO yang rapi.",
    price: "Rp 13.356.000",
    monthly: "765.667",
    groups: [
      { title: "Design & Build", items: [{ text: "Custom design" }, { text: "Mobile friendly" }, { text: "Revisi minor" }] },
      {
        title: "SEO",
        items: [
          { text: "Keyword research one page SEO" },
          { text: "GA on Dashboard" },
          { text: "Share GA (Report Monthly)" },
          { text: "SEO Basic (Title + Image)" },
        ],
      },
      {
        title: "Server",
        storage: { label: "Storage 28GB", percent: 28 },
        items: [
          { text: "Website storage 2GB" },
          { text: "Double backup storage 6GB" },
          { text: "Email storage 20GB" },
          { text: "Uptime 99%" },
          { text: "Bandwidth unlimited" },
          { text: "Security (anti virus, anti spam, anti brute-force)" },
        ],
      },
      {
        title: "Support",
        items: [
          { text: "Fitur tambahan" },
          { text: "Upgraded website" },
          { text: "Update version" },
          { text: "Garansi projek selesai" },
          { text: "1x training online" },
          { text: "Video tutorial general" },
          { text: "Backup" },
          { text: "Restore" },
        ],
      },
    ],
  },
  {
    name: "Enterprise",
    desc: "Untuk toko online dengan trafik besar dan kebutuhan pendampingan penuh.",
    price: "Rp 39.262.800",
    monthly: "2.299.000",
    groups: [
      {
        title: "Design & Build",
        items: [
          { text: "Custom design" },
          { text: "Mobile friendly" },
          { text: "Revisi minor" },
          { text: "Revisi major", isNew: true },
          { text: "Redesignable", isNew: true },
        ],
      },
      {
        title: "SEO",
        items: [
          { text: "Keyword research one page SEO" },
          { text: "GA on Dashboard" },
          { text: "Share GA (Report Weekly)", isNew: true },
          { text: "SEO Basic (Title + Image)" },
          { text: "Website roentgen", isNew: true },
          { text: "Excellent bounce rate (<40%)", isNew: true },
        ],
      },
      {
        title: "Server",
        storage: { label: "Storage 100GB", percent: 100 },
        items: [
          { text: "Website storage 20GB", isNew: true },
          { text: "Double backup storage 60GB", isNew: true },
          { text: "Email storage 20GB" },
          { text: "Uptime 99.9%", isNew: true },
          { text: "Bandwidth unlimited" },
          { text: "Security (anti virus, anti spam, anti brute-force)" },
        ],
      },
      {
        title: "Support",
        items: [
          { text: "Fitur tambahan" },
          { text: "Upgraded website" },
          { text: "Update version" },
          { text: "Garansi projek selesai" },
          { text: "1x training on-site", isNew: true },
          { text: "Video tutorial personalized", isNew: true },
          { text: "Backup" },
          { text: "Restore" },
          { text: "Transferable website", isNew: true },
        ],
      },
    ],
  },
];

// title    = judul besar di halaman (beranimasi)
// tabTitle = judul tab browser (document.title), bisa beda kata-katanya per halaman
const catalog: Record<
  SiteType,
  { title: string; tabTitle: string; intro: React.ReactNode; plans: Plan[]; layout?: "plans" | "form" }
> = {
  "company-profile": {
    title: "Harga Website Company Profile",
    tabTitle: "Harga Website Company Profile - Jasa Pembuatan Website, Profesional, ...",
    intro: (
      <>
        <strong></strong><strong></strong>
      </>
    ),
    plans: companyProfilePlans,
  },
  "e-commerce": {
    title: "Harga Website E-Commerce",
    tabTitle: "Harga Pembuatan Website E-Commerce - Jasa Pembuatan Website...",
    intro: (
      <>
        <strong></strong><strong></strong>.
      </>
    ),
    plans: eCommercePlans,
  },
  marketplace: {
    title: "Harga Website Marketplace",
    tabTitle: "Hubungi CreativaLab, Jasa Pembuatan Website, Dunia",
    intro: (
      <>
        {" "}
        <strong></strong>.
      </>
    ),
    plans: [],
    layout: "form", // Marketplace tidak menampilkan harga, langsung form konsultasi
  },
};

// Judul dengan animasi muncul, 2 fase terpisah:
// 1) blur-in (opacity 0 + blur -> jelas), stagger tipis antar huruf
// 2) gelombang warna oranye yang berjalan pelan dari kiri ke kanan, lalu menetap di warna teks
function AnimatedTitle({ text }: { text: string }) {
  let i = 0;
  return (
    <>
      {text.split(" ").map((word, w, arr) => (
        <span key={w} aria-hidden="true">
          <span className="hw-word">
            {Array.from(word).map((ch) => (
              <span key={i} className="hw-char" style={{ "--i": i++ } as React.CSSProperties}>
                {ch}
              </span>
            ))}
          </span>
          {w < arr.length - 1 ? " " : ""}
        </span>
      ))}
    </>
  );
}

function GoogleWorkspace() {
  return (
    <span className="hw-gw">
      <span style={{ color: "#4285f4" }}>G</span>
      <span style={{ color: "#ea4335" }}>o</span>
      <span style={{ color: "#fbbc05" }}>o</span>
      <span style={{ color: "#4285f4" }}>g</span>
      <span style={{ color: "#34a853" }}>l</span>
      <span style={{ color: "#ea4335" }}>e</span> <b>Workspace</b>
    </span>
  );
}

export default function HargaWebsite({ type = "company-profile" }: { type?: SiteType }) {
  const { title, tabTitle, intro, plans, layout } = catalog[type];

  // Title tab browser ikut berubah sesuai submenu (hook harus sebelum return kondisional)
  useEffect(() => {
    document.title = tabTitle;
  }, [tabTitle]);

  if (layout === "form") {
    return (
      <section className="hw">
        <style>{css}</style>
        <div className="hw-wrap">
          <div className="hw-contact">
            <div className="hw-logo">
              <img
                src="/logo.png"
                alt="Creativa Laboratorium"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
              <span className="hw-logo-name">CREATIVA</span>
              <span className="hw-logo-sub">Laboratorium</span>
            </div>
            <ContactForm />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="hw">
      <style>{css}</style>
      <div className="hw-wrap">
        <header className="hw-head">
          <h1 key={type} aria-label={title}>
            <AnimatedTitle text={title} />
          </h1>
          <p>{intro}</p>
        </header>

        {plans.length === 0 && (
          <div className="hw-empty">
            <p>Daftar paket dan harga untuk jenis website ini sedang disiapkan. Hubungi kami untuk penawaran.</p>
            <Link className="hw-btn" to="/#konsultasi">
              Minta Penawaran
            </Link>
          </div>
        )}

        {plans.length > 0 && (
          <div className="hw-grid">
            {plans.map((plan) => (
              <article className="hw-card" key={plan.name}>
                <h2>{plan.name}</h2>
                <p className="hw-sub">{plan.desc}</p>
                <div className="hw-price">{plan.price}</div>
                <p className="hw-monthly">
                  Rp <b>{plan.monthly}</b>/bulan, dibayar per tahun (mulai tahun ke 2)
                </p>
                <p className="hw-free">
                  Gratis 1 email profesional dari <GoogleWorkspace />
                </p>
                <Link className="hw-btn" to="/#konsultasi">
                  Pilih Paket Ini
                </Link>
                <hr />
                {plan.groups.map((g) => (
                  <div key={g.title}>
                    <h3>{g.title}</h3>
                    {g.storage && (
                      <>
                        <p className="hw-storage">{g.storage.label}</p>
                        <div className="hw-bar">
                          <i style={{ width: `${g.storage.percent}%` }} />
                        </div>
                      </>
                    )}
                    <ul>
                      {g.items.map((it) => (
                        <li key={it.text} className={it.isNew ? "new" : undefined}>
                          {it.text}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </article>
            ))}
          </div>
        )}

        {plans.length > 0 && <p className="hw-foot">*Termasuk domain, hosting, security &amp; support</p>}
      </div>
    </section>
  );
}

const css = `
@import url("https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500&display=swap");
.hw{--bg:#fdfcfb;--card:#efeeeb;--card-hi:#f8f7f5;--ink:#3a1f1d;--mute:#8d8680;--line:#d9d6d1;--accent:#ffc20e;
background:var(--bg);color:var(--ink);font-family:"Hanken Grotesk",system-ui,-apple-system,"Segoe UI",sans-serif;font-weight:300;line-height:1.5}
.hw *{box-sizing:border-box}

/* Padding atas ada di sini (bukan di <main>) supaya background krem naik sampai paling atas.
   135px desktop / 85px mobile = jarak aman dari navbar fixed, ala Cleo. Ubah angka ini kalau mau lebih rapat/longgar. */
.hw-wrap{max-width:1000px;margin:0 auto;padding:135px 20px 80px}
.hw-head{text-align:center;max-width:620px;margin:0 auto 56px}
.hw h1{font-weight:300;font-size:clamp(2.2rem,6vw,3.6rem);line-height:1.08;letter-spacing:-.02em;margin:0 0 22px}
.hw-word{display:inline-block;white-space:nowrap}

/* Fase 1: blur-in. Fase 2: gelombang warna oranye pelan. Delay & durasi dipisah. */
.hw-char{
display:inline-block;
animation:
hw-blur 1.6s cubic-bezier(.33,.1,.25,1) both,
hw-color 3.2s ease-in-out both;
animation-delay:
calc(.25s + var(--i) * 24ms),
calc(.55s + var(--i) * 45ms);
}
@keyframes hw-blur{
0%{opacity:0;filter:blur(14px)}
60%{opacity:1;filter:blur(3px)}
100%{opacity:1;filter:blur(0)}
}
@keyframes hw-color{
0%{color:#f6c9a3}
30%{color:#f2a65e}
65%{color:#d9782f}
100%{color:var(--ink)}
}
@media (prefers-reduced-motion:reduce){.hw-char{animation:none}}

.hw-head p{color:var(--mute);margin:0;font-size:1.02rem}
.hw-head strong{color:var(--ink);font-weight:500}
.hw-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px;max-width:820px;margin:0 auto;align-items:start}
.hw-card{background:var(--card);border-radius:28px;padding:34px 30px 30px;transition:background .25s,box-shadow .25s,transform .25s,filter .3s,opacity .3s}
.hw-card:hover,.hw-card:focus-within{background:var(--card-hi);box-shadow:0 14px 34px rgba(58,31,29,.14);transform:translateY(-4px)}
.hw h2{font-weight:400;font-size:1.5rem;margin:0 0 6px;letter-spacing:-.01em}
.hw-sub{color:var(--mute);font-size:.88rem;margin:0 0 26px}
.hw-price{font-size:2.5rem;font-weight:300;letter-spacing:-.02em;line-height:1.1}
.hw-monthly{color:var(--mute);font-size:.85rem;margin:8px 0 18px}
.hw-monthly b{color:var(--ink);font-weight:500}
.hw-free{font-size:.85rem;color:var(--mute);margin:0 0 22px}
.hw-gw{font-weight:700}
.hw-gw b{color:#4d4d4d;font-weight:700}
.hw-btn{cursor:pointer;display:block;width:100%;text-align:center;background:linear-gradient(135deg,#7c7c7c,#3f3f3f);color:#fff;font-family:Arial,Helvetica,sans-serif;font-weight:700;font-size:.95rem;text-decoration:none;padding:12px 16px;border-radius:999px;box-shadow:0 3px 8px rgba(0,0,0,.18);transition:background .2s}
.hw-btn:hover{background:linear-gradient(135deg,#6e6e6e,#303030)}
.hw-btn:focus-visible{outline:2px solid var(--ink);outline-offset:3px}
.hw hr{border:0;border-top:1px solid var(--line);margin:26px 0 8px}
.hw h3{font-size:.85rem;font-weight:500;margin:20px 0 8px}
.hw-storage{font-size:.82rem;color:var(--mute);margin:0 0 10px}
.hw-bar{height:5px;border-radius:5px;background:var(--line);margin:-2px 0 12px;overflow:hidden}
.hw-bar i{display:block;height:100%;background:var(--ink);border-radius:5px}
.hw ul{list-style:none;margin:0;padding:0}
.hw li{display:flex;gap:10px;font-size:.88rem;padding:4px 0;color:var(--mute)}
.hw li::before{content:"";flex:none;width:14px;height:14px;margin-top:4px;background:no-repeat center/contain url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none' stroke='%238d8680' stroke-width='1.4' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='M2.5 8.5l3.5 3.5 7.5-8'/%3E%3C/svg%3E")}
.hw li.new{color:var(--ink)}
.hw-empty{max-width:420px;margin:0 auto;text-align:center;background:var(--card);border-radius:28px;padding:34px 30px}
.hw-empty p{color:var(--mute);margin:0 0 22px}
.hw-contact{display:grid;grid-template-columns:260px 288px;gap:80px;justify-content:center;align-items:start}
.hw-logo{display:flex;flex-direction:column;align-items:center}
.hw-logo img{width:260px;height:260px;object-fit:contain}
.hw-logo-name{margin-top:20px;font-family:"Cinzel",serif;font-weight:900;font-size:38px;line-height:42px;letter-spacing:.04em;color:#262626}
.hw-logo-sub{margin-top:6px;font-family:"Cinzel",serif;font-size:16px;letter-spacing:.3em;padding-left:.3em;text-transform:uppercase;color:#6b6b6b}
@media (hover:hover){
.hw-grid:has(.hw-card:hover) .hw-card:not(:hover),.hw-grid:has(.hw-card:focus-within) .hw-card:not(:focus-within){filter:blur(3px);opacity:.55;transform:scale(.985)}
}
@media (max-width:760px){.hw-contact{grid-template-columns:1fr;gap:40px;justify-items:center}.hw-logo{display:none}}
.hw-foot{text-align:center;color:var(--mute);font-size:.8rem;margin-top:36px}
@media (max-width:720px){.hw-grid{grid-template-columns:1fr}.hw-wrap{padding-top:85px}}
@media (prefers-reduced-motion:reduce){.hw-card{transition:none}.hw-card:hover{transform:none}}
`;