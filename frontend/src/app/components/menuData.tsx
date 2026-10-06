import React from "react";

export interface SubMenuItem {
  title: string;
  href: string;
}

export interface MenuCategory {
  id: string;
  label: string;
  heading: string;
  description: string;
  column1: SubMenuItem[];
  column2: SubMenuItem[];
}

export const MULTILINGUAL_MENU_DATA: Record<"id" | "en" | "zh", MenuCategory[]> = {
  id: [
    {
      id: "tentang",
      label: "TENTANG",
      heading: "TENTANG KAMI",
      description:
        "Kenali Creativa Laboratorium lebih dekat melalui profil perusahaan, klien, dan testimoni kami.",
      column1: [
        { title: "Perusahaan", href: "/tentang" },
        { title: "Karir", href: "/karir" },
        { title: "Client & Testimonials", href: "/klien" },
      ],
      column2: [],
    },
    {
      id: "Explore",
      label: "Explore",
      heading: "",
      description: "",
      column1: [
        { title: "", href: "/layanan" },
        { title: "UI/UX Design", href: "/layanan" },
      ],
      column2: [],
    },
    {
      id: "portofolio",
      label: "PORTOFOLIO",
      heading: "PORTOFOLIO",
      description: "Eksplorasi hasil karya dan proyek terbaru kami.",
      column1: [
        { title: "Studi Kasus", href: "/portofolio" },
        { title: "Proyek Unggulan", href: "/portofolio" },
      ],
      column2: [],
    },
  ],
  en: [
    {
      id: "tentang",
      label: "ABOUT",
      heading: "ABOUT US",
      description:
        "Get to know Creativa Laboratorium through our company profile, clients, and testimonials.",
      column1: [
        { title: "Company", href: "/tentang" },
        { title: "Careers", href: "/karir" },
        { title: "Clients & Testimonials", href: "/klien" },
      ],
      column2: [],
    },
    {
      id: "layanan",
      label: "SERVICES",
      heading: "OUR SERVICES",
      description: "Integrated creative and digital technology solutions.",
      column1: [
        { title: "Software Development", href: "/layanan" },
        { title: "UI/UX Design", href: "/layanan" },
      ],
      column2: [],
    },
    {
      id: "portofolio",
      label: "PORTFOLIO",
      heading: "PORTFOLIO",
      description: "Explore our latest work and projects.",
      column1: [
        { title: "Case Studies", href: "/portofolio" },
        { title: "Featured Projects", href: "/portofolio" },
      ],
      column2: [],
    },
  ],
  zh: [
    {
      id: "tentang",
      label: "关于",
      heading: "关于我们",
      description: "通过公司简介、客户与评价，进一步了解 Creativa Laboratorium。",
      column1: [
        { title: "公司简介", href: "/tentang" },
        { title: "职业发展", href: "/karir" },
        { title: "客户与评价", href: "/klien" },
      ],
      column2: [],
    },
    {
      id: "layanan",
      label: "服务",
      heading: "我们的服务",
      description: "综合创意与数字技术解决方案。",
      column1: [
        { title: "软件开发", href: "/layanan" },
        { title: "UI/UX 设计", href: "/layanan" },
      ],
      column2: [],
    },
    {
      id: "portofolio",
      label: "作品",
      heading: "作品集",
      description: "探索我们最新的项目与作品。",
      column1: [
        { title: "案例研究", href: "/portofolio" },
        { title: "精选项目", href: "/portofolio" },
      ],
      column2: [],
    },
  ],
};

export const LANGUAGES = [
  {
    code: "id",
    activeLabel: "INDONESIAN",
    dropdownLabel: "Bahasa Indonesia",
    flag: (
      <div className="w-5 h-3.5 rounded-[1px] overflow-hidden border border-neutral-600/40 flex flex-col flex-shrink-0 shadow-xs">
        <div className="h-1/2 bg-[#d80027] w-full" />
        <div className="h-1/2 bg-white w-full" />
      </div>
    ),
  },
  {
    code: "en",
    activeLabel: "ENGLISH",
    dropdownLabel: "English",
    flag: (
      <svg viewBox="0 0 60 30" className="w-5 h-3.5 rounded-[1px] shadow-xs flex-shrink-0">
        <clipPath id="s"><path d="M0,0 v30 h60 v-30 z"/></clipPath>
        <clipPath id="t"><path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z"/></clipPath>
        <g clipPath="url(#s)">
          <path d="M0,0 v30 h60 v-30 z" fill="#012169"/>
          <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6"/>
          <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10"/>
          <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6"/>
        </g>
      </svg>
    ),
  },
  {
    code: "zh",
    activeLabel: "CHINESE (SIMPLIFIED)",
    dropdownLabel: "简体中文 (Chinese (Simplified))",
    flag: (
      <svg viewBox="0 0 30 20" className="w-5 h-3.5 rounded-[1px] shadow-xs flex-shrink-0 bg-[#de2910]">
        <polygon points="5,2 6.2,5.8 2.8,3.4 7.2,3.4 3.8,5.8" fill="#ffde00" />
        <polygon points="10,1 10.5,2.5 9,1.5 11,1.5 9.5,2.5" fill="#ffde00" />
        <polygon points="12,3 12.5,4.5 11,3.5 13,3.5 11.5,4.5" fill="#ffde00" />
        <polygon points="12,6 12.5,7.5 11,6.5 13,6.5 11.5,7.5" fill="#ffde00" />
        <polygon points="10,8 10.5,9.5 9,8.5 11,8.5 9.5,9.5" fill="#ffde00" />
      </svg>
    ),
  },
];